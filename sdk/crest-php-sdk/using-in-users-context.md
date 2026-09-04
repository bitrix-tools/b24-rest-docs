# Работа в контексте текущего пользователя

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

По умолчанию CRest выполняет запросы под пользователем, который установил приложение. Чтобы запрос выполнялся под тем, кто открыл приложение во фрейме, переопределите в классе `CRest` источник токенов.

Токены приходят от Битрикс24 при каждом открытии приложения во фрейме: `AUTH_ID`, `REFRESH_ID`, `DOMAIN` и `APP_SID` передаются POST-запросом на адрес обработчика. Полный состав данных разобран в статье [Упрощенный вариант получения токенов OAuth 2.0](../../settings/oauth/simple-way.md), а состав POST-запроса для точек встраивания — в [обзоре виджетов](../../api-reference/widgets/index.md).

## Что нужно перед началом

- приложение установлено, и рядом с `crest.php` лежит `settings.json`. Класс подменяет только токены пользователя, а `client_endpoint`, `client_id` и `client_secret` библиотека по-прежнему берет из файла настроек
- обработчик проверяет, что запрос пришел от Битрикс24. Адрес обработчика доступен из внешней сети, поэтому сверяйте `APPLICATION_TOKEN` со значением, которое приложение сохранило при установке — как это делается, описано в [обзоре виджетов](../../api-reference/widgets/index.md)
- значения `AUTH_ID` и `REFRESH_ID` не попадают в логи и не передаются третьим лицам

## Как работает переопределение

CRest вызывает `getSettingData` перед каждым запросом, чтобы получить настройки приложения. Базовая реализация читает `settings.json` целиком. Наследник оставляет из файла все остальное и подменяет четыре значения: `access_token`, `domain`, `refresh_token` и `application_token`.

Источник этих значений зависит от того, вызывали ли `setDataExt`. Если вызывали — токены берутся из переданного массива, если нет — напрямую из `$_REQUEST`.

{% note warning "" %}

`APP_SID` и `APPLICATION_TOKEN` — разные значения, и подставлять одно вместо другого нельзя. `APP_SID` — идентификатор сессии, Битрикс24 создает его заново при каждой отрисовке приложения. `APPLICATION_TOKEN` — постоянный токен приложения, по которому обработчик проверяет, что запрос пришел от Битрикс24.

В настройку `application_token` класс кладет `APP_SID` — так же делает сам CRest при установке. Библиотека эту настройку никуда не отправляет и ни с чем не сравнивает: она нужна ей только чтобы считать настройки заполненными. Для проверки источника запроса берите `APPLICATION_TOKEN` из запроса, а не настройку CRest.

{% endnote %}

```php
require_once(__DIR__ . '/crest.php');
class CRestCurrent extends CRest
{
    protected static $dataExt = [];
    protected static function getSettingData()
    {
        $return = static::expandData(file_get_contents(__DIR__ . '/settings.json'));
        if(is_array($return))
        {
            if(!empty(static::$dataExt))
            {
                $return['access_token'] = htmlspecialchars(static::$dataExt['AUTH_ID']);
                $return['domain'] = htmlspecialchars(static::$dataExt['DOMAIN']);
                $return['refresh_token'] = htmlspecialchars(static::$dataExt['REFRESH_ID']);
                $return['application_token'] = htmlspecialchars(static::$dataExt['APP_SID']);
            }
            else
            {
                $return['access_token'] = htmlspecialchars($_REQUEST['AUTH_ID']);
                $return['domain'] = htmlspecialchars($_REQUEST['DOMAIN']);
                $return['refresh_token'] = htmlspecialchars($_REQUEST['REFRESH_ID']);
                $return['application_token'] = htmlspecialchars($_REQUEST['APP_SID']);
            }
        }
        return $return;
    }
    public static function setDataExt($data)
    {
        static::$dataExt = $data;
    }
}
```

Сохраните класс в отдельный файл рядом с `crest.php` — например `crestcurrent.php` — и подключайте его на страницах приложения.

## Как передать токены явно

Битрикс24 передает токены только при открытии приложения во фрейме. Последующие запросы со страницы — например, AJAX — приходят уже без них.

Порядок работы обработчика:

1. Битрикс24 открывает страницу приложения POST-запросом с токенами.
2. Обработчик сверяет `APPLICATION_TOKEN` со значением, сохраненным при установке.
3. Обработчик сохраняет токены — например, в сессию.
4. Страница подключает `crestcurrent.php`, передает токены методом `setDataExt` и вызывает методы через `CRestCurrent`.

На последующих запросах первые три шага не выполняются, и `setDataExt` подставляет сохраненные токены:

```php
session_start();
require_once(__DIR__ . '/crestcurrent.php');

// Токены приходят только в запросе от Битрикс24
if (isset($_REQUEST['AUTH_ID'])) {

    // $savedApplicationToken — APPLICATION_TOKEN, сохраненный приложением при установке
    if (!hash_equals($savedApplicationToken, $_REQUEST['APPLICATION_TOKEN'] ?? '')) {
        http_response_code(403);
        exit;
    }

    $_SESSION['b24_tokens'] = [
        'AUTH_ID'    => $_REQUEST['AUTH_ID'],
        'REFRESH_ID' => $_REQUEST['REFRESH_ID'],
        'DOMAIN'     => $_REQUEST['DOMAIN'],
        'APP_SID'    => $_REQUEST['APP_SID'],
    ];
}

CRestCurrent::setDataExt($_SESSION['b24_tokens'] ?? []);
```

Массив должен содержать все четыре ключа: при пустом значении хотя бы одного из них CRest считает настройки неполными.

Токены выданы на пользователя, который открыл приложение, поэтому вызовы ограничены его правами в Битрикс24 и скоупами приложения. Список выданных скоупов приходит в том же запросе в параметре `APPLICATION_SCOPE`.

## Что происходит при истечении токена

`AUTH_ID` действует один час. Когда он истекает, CRest получает новую пару токенов по `refresh_token` и сохраняет ее методом `setSettingData` — то есть записывает в `settings.json`.

Класс выше переопределяет только чтение настроек. Запись остается базовой, поэтому в файл попадут токены пользователя, который открыл приложение, поверх сохраненных при установке. Если приложением пользуется несколько человек, переопределите и `setSettingData`, чтобы хранить токены отдельно по каждому пользователю. О собственном хранении токенов сказано в разделе «Что важно учитывать» обзора [CRest PHP SDK](./index.md).

## Проверка

```php
$result = CRestCurrent::call('user.current');

echo '<pre>';
    print_r($result);
echo '</pre>';
```

Метод вернет данные пользователя, который открыл приложение, а не того, кто его установил.

Если вместо результата пришла ошибка `no_install_app`, дело не обязательно в установке. CRest возвращает ее и тогда, когда в настройках пусто хотя бы одно из значений `access_token`, `domain`, `refresh_token`, `application_token`, `client_endpoint`. Самая частая причина — страницу открыли напрямую по адресу, без POST-запроса от Битрикс24, и подставить в настройки оказалось нечего.

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../../settings/oauth/simple-way.md)
- [{#T}](../../settings/oauth/auto-renewal.md)
- [{#T}](../../api-reference/widgets/index.md)
- [{#T}](../../local-integrations/serverside-local-app-with-ui.md)
