# Добавление своих методов в REST API коробочной версии Битрикс24

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В коробочной версии Битрикс24 есть доступ к серверному коду, поэтому REST API можно расширить: добавить свои методы и свои разрешения — scope. Такой метод вызывается так же, как штатный: по адресу вида `/rest/mycompany.warehouse.get`, с обычной авторизацией по [вебхуку](../../../local-integrations/local-webhooks.md) или токену приложения.

Механизм подходит, когда данные лежат в самом коробочном Битрикс24, а штатных методов для них нет. Типовые задачи:

- отдать наружу данные своего модуля или таблицы: остатки склада, тарифы, записи учетной системы
- собрать в один вызов данные, которые иначе пришлось бы получать несколькими запросами и склеивать на стороне приложения
- дать внешнему сервису узкий доступ: свой scope с двумя-тремя методами вместо прав на всю CRM

Добавить свой метод можно только в коробочной версии — в облачном Битрикс24 нет доступа к серверному коду. В облаке для тех же задач используют штатные средства: пользовательские поля и [смарт-процессы CRM](../../../api-reference/crm/universal/index.md) для хранения своих данных или внешний сервис, который приложение вызывает напрямую.

Что нужно для работы:

- коробочная версия Битрикс24 с установленным модулем **rest**
- доступ к файловой системе сервера с правом править `/bitrix/php_interface/init.php`. Это права администратора сервера, а не администратора Битрикс24
- знание PHP и API ядра Битрикс24

Чтобы свой метод заработал, нужны три шага:

1. [Зарегистрировать обработчик события](#step-handler), которое описывает метод
2. [Написать функцию-обработчик](#step-callback), которая выполняет работу
3. [Выдать доступ к своему scope](#step-scope) и сбросить кэш разрешений

## Как это работает

В механизме участвуют четыре элемента:

| Элемент | Роль |
|---|---|
| Событие `OnRestServiceBuildDescription` модуля **rest** | Собирает описание всех методов REST API. Ваш обработчик добавляет в это описание свои scope и методы |
| Описание метода | Массив с ключами `callback` и `options`. Говорит модулю **rest**, какую PHP-функцию вызвать для метода |
| Функция-обработчик метода | Выполняет работу и возвращает данные, которые попадут в ответ |
| Объект `\CRestServer` | Экземпляр текущего REST-сервера. Передается в функцию-обработчик и дает доступ к данным запроса и авторизации |

Запрос к своему методу обрабатывается так:

1. Модуль **rest** вызывает событие `OnRestServiceBuildDescription` и объединяет массивы, которые вернули все обработчики события. Получается общее описание методов, сгруппированных по scope
2. Модуль ищет вызванный метод в этом описании. Если метода там нет, вызывается событие [onFindMethodDescription](#on-find-method-description), которое может подставить описание на лету. Если и оно ничего не вернуло, запрос завершается ошибкой `ERROR_METHOD_NOT_FOUND`
3. Модуль проверяет авторизацию и доступ к scope, которому принадлежит метод. Если у приложения или вебхука нужного scope нет, вызов завершается ошибкой `insufficient_scope`
4. Модуль вызывает функцию-обработчик и передает ей три параметра
5. Значение, которое вернула функция, попадает в поле `result` ответа. Исключение превращается в ошибку REST с полями `error` и `error_description`

Описания разных обработчиков события объединяются рекурсивно. Отсюда три правила:

- одинаковые имена scope безопасны, методы двух обработчиков окажутся в одном scope
- одинаковое имя метода у двух описаний не приводит к ошибке: вызов отработает, но сработает только один обработчик, а второй будет молча проигнорирован
- по той же причине своим описанием можно незаметно подменить штатный метод: сработает один обработчик из двух, и какой именно — заранее не определено. Полагаться на такую подмену нельзя, а случайно сломать чужой сценарий — можно

Начинайте имена методов с имени своего scope — так они не столкнутся ни с чужими, ни со штатными.

{% note warning "" %}

Модуль **rest** проверяет только авторизацию и доступ к scope. Права на конкретные данные он не проверяет: если приложению выдан ваш scope, метод будет вызван. Проверяйте права внутри функции-обработчика сами. К моменту вызова объект `$USER` уже проинициализирован пользователем, к которому привязан токен или вебхук, — опирайтесь на него и на API своего модуля.

{% endnote %}

## Шаг 1. Зарегистрируйте обработчик события {#step-handler}

Обработчик события `OnRestServiceBuildDescription` регистрируется в файле `/bitrix/php_interface/init.php` функцией `AddEventHandler`. Класс с методами вашего API объявляют там же или подключают в `init.php` отдельным файлом — до вызова `AddEventHandler`. Функция принимает имя модуля, имя события и callable обработчика:

```php
AddEventHandler(
    'rest',
    'OnRestServiceBuildDescription',
    ['MyClass', 'onRestServiceBuildDescription']
);
```

`OnRestServiceBuildDescription` — событие старого формата. Как ядро работает с такими событиями и какие функции для них предназначены, описано в разделе [Старые события и режим совместимости](https://docs.1c-bitrix.ru/pages/framework/events.html#starye-sobytiya-i-rezhim-sovmestimosti) документации BitrixFramework.

Обработчик возвращает массив такой структуры:

```php
return [
    'scope_name' => [
        'scope_name.object.action' => [
            'callback' => ['MyClass', 'firstMethod'],
            'options' => [],
        ],
        'scope_name.object.other_action' => [
            'callback' => ['MyClass', 'secondMethod'],
            'options' => [],
        ],
    ],
];
```

| Ключ | Описание |
|---|---|
| Имя scope | Произвольное имя разрешения, в примере — `scope_name`. Как выдать доступ к своему scope, описано в [шаге 3](#step-scope). Метод можно положить и в штатный scope, например `crm`, — тогда его вызовет любое приложение с этим разрешением, отдельно ограничить доступ не получится. Для своих данных заводите свой scope |
| Имя метода | Произвольное имя метода, в примере — `scope_name.object.action`. Регистр не важен: модуль **rest** приводит имена методов к нижнему регистру. Традиционное именование — имя scope, объект, действие |
| `callback` | PHP-тип [callable](https://www.php.net/manual/ru/language.types.callable.php). Используйте те же формы, что и штатные обработчики: имя функции или массив вида `[класс, метод]` |
| `options` | Массив дополнительных настроек метода. Сейчас поддерживается один ключ — `private`. Со значением `true` метод не попадает в выдачу [methods](../../../api-reference/common/system/methods.md), но остается доступным для вызова. Так помечают служебные и внутренние методы, которые не нужно показывать в списке |

Метод можно сделать доступным любому приложению без отдельного разрешения. Для этого вместо имени scope укажите константу `\CRestUtil::GLOBAL_SCOPE`.

{% note warning "" %}

Метод в `\CRestUtil::GLOBAL_SCOPE` вызывает любое приложение и любой вебхук этого Битрикс24, ограничить доступ к нему через разрешения нельзя. Помещайте туда только методы, которые безопасно открыть всем. Для всего остального заводите свой scope.

{% endnote %}

## Шаг 2. Напишите функцию-обработчик {#step-callback}

Функция-обработчик получает на вход три параметра:

| Параметр | Тип | Описание |
|---|---|---|
| `$query` | array | Ассоциативный массив параметров вызова без авторизационных параметров. Параметр `start` из него удален |
| `$start` | int | Значение параметра `start` из запроса. Ноль, если параметр не передан. Используется для [постраничной навигации](#navigation) |
| `$server` | \CRestServer | Объект текущего REST-сервера |

Через объект `$server` доступны данные запроса и авторизации:

| Метод | Что возвращает |
|---|---|
| `getScope()` | Scope, в котором найден вызванный метод |
| `getMethod()` | Имя вызванного метода в нижнем регистре |
| `getQuery()` | Тот же массив параметров вызова, который приходит в обработчик первым параметром |
| `getAuthType()` | Тип авторизации вызова: `oauth` — приложение, `apauth` — входящий вебхук, `sessionauth` — вызов, авторизованный сессией текущего пользователя |
| `getAppId()` | Идентификатор приложения, от имени которого сделан вызов. Для вебхука возвращает `null` |

Функция-обработчик может:

- вернуть массив или скалярное значение — оно попадет в поле `result` ответа и будет приведено к формату json или xml
- бросить исключение — оно будет перехвачено и отдано клиенту как ошибка REST

### Как вернуть ошибку

Чтобы задать HTTP-статус ошибки, бросьте исключение `\Bitrix\Rest\RestException`. Конструктор принимает три параметра: текст ошибки, код ошибки и HTTP-статус.

```php
throw new \Bitrix\Rest\RestException(
    'Parameter id is required',
    'WAREHOUSE_ID_REQUIRED',
    \CRestServer::STATUS_WRONG_REQUEST
);
```

Текст попадет в поле `error_description` ответа, код — в поле `error`. Если статус не указан, ответ отдается со статусом `400 Bad Request`.

HTTP-статусы заданы константами класса `\CRestServer`. В исключение передают только статусы ошибок — первые две константы относятся к успешному ответу и в `RestException` не используются.

| Константа | HTTP-статус |
|---|---|
| `STATUS_OK` | 200 OK |
| `STATUS_CREATED` | 201 Created |
| `STATUS_WRONG_REQUEST` | 400 Bad Request |
| `STATUS_UNAUTHORIZED` | 401 Unauthorized |
| `STATUS_PAYMENT_REQUIRED` | 402 Payment Required |
| `STATUS_FORBIDDEN` | 403 Forbidden |
| `STATUS_NOT_FOUND` | 404 Not Found |
| `STATUS_TO_MANY_REQUESTS` | 429 Too Many Requests |
| `STATUS_INTERNAL` | 500 Internal Server Error |

Любое другое исключение тоже превращается в ошибку REST. По умолчанию это статус `400 Bad Request` и код `ERROR_CORE`, но если у исключения задан свой код, в ответ попадет он. Исключения ядра обрабатываются отдельно: `\Bitrix\Main\ArgumentException` дает код `ERROR_ARGUMENT`, ошибка SQL — код `ERROR_CORE` и статус `500 Internal Server Error`.

{% note warning "" %}

Если до выброса исключения ядро сгенерировало старую ошибку через `$APPLICATION->ThrowException()`, она перезапишет код и текст в ответе. Проверяйте, что в функции-обработчике метода не остается необработанных ошибок старого ядра.

{% endnote %}

## Шаг 3. Выдайте доступ к своему scope {#step-scope}

Свой scope появляется в списке разрешений при создании [локального приложения](../../../local-integrations/local-apps.md) и [входящего вебхука](../../../local-integrations/local-webhooks.md) — в разделе *Приложения > Разработчикам*. Отображается он своим кодом, например `mycompany`: названия на языке интерфейса у него нет.

Список scope кэшируется на семь дней. Принудительно кэш сбрасывается только при установке и удалении модулей, а обработчик события в `init.php` модулем не является. Поэтому после добавления нового scope сбросьте кэш вызовом `\Bitrix\Rest\Engine\ScopeManager::cleanCache()`.

Вызов нужен один раз, после регистрации нового scope. Не оставляйте его в `init.php`: там он будет срабатывать на каждом запросе к Битрикс24 и сбрасывать кэш постоянно. Выполните его разово — например, отдельным скриптом в корне сайта:

```php
<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php';

\Bitrix\Main\Loader::includeModule('rest');
\Bitrix\Rest\Engine\ScopeManager::cleanCache();
```

Откройте скрипт в браузере один раз и удалите его с сервера. Если кэш Битрикс24 хранится в файлах, тот же результат дает полная очистка кэша: страница `/bitrix/admin/cache.php` административного раздела, вкладка *Очистка файлов кеша*, вариант *Все*.

Тот же вызов `cleanCache()` сбрасывает и кэш результатов `method.get` — он лежит в том же каталоге кэша. Отдельно чистить его не нужно.

Проверьте результат вызовами:

- [method.get](../../../api-reference/common/system/method-get.md) с параметром `name` — вернет `isExisting` и `isAvailable`: зарегистрирован ли метод и доступен ли он с текущими разрешениями
- [scope](../../../api-reference/common/system/scope.md) с параметром `full` — новый scope должен появиться в полном списке разрешений. Без параметров метод вернет только те разрешения, которые уже выданы приложению или вебхуку

Как читать ответ `method.get`:

- `isExisting: false` — метод не зарегистрирован. Проверьте, подключен ли обработчик события и сброшен ли кэш
- `isExisting: true` и `isAvailable: false` — метод есть, но нужный scope не выдан приложению или вебхуку. При вызове такой метод вернет ошибку `insufficient_scope`

## Пример: свой scope и метод

Код регистрирует scope `mycompany` и метод `mycompany.warehouse.get` в нем. Метод проверяет обязательный параметр и права пользователя, а затем возвращает данные.

```php
class MyCompanyRestApi
{
    public static function onRestServiceBuildDescription(): array
    {
        return [
            'mycompany' => [
                'mycompany.warehouse.get' => [
                    'callback' => [__CLASS__, 'getWarehouse'],
                    'options' => [],
                ],
            ],
        ];
    }

    public static function getWarehouse($query, $start, \CRestServer $server): array
    {
        global $USER;

        $warehouseId = (int)($query['id'] ?? 0);

        if ($warehouseId <= 0)
        {
            throw new \Bitrix\Rest\RestException(
                'Parameter id is required',
                'WAREHOUSE_ID_REQUIRED',
                \CRestServer::STATUS_WRONG_REQUEST
            );
        }

        // права на данные проверяет сам обработчик, модуль rest этого не делает
        if (!$USER->IsAdmin())
        {
            throw new \Bitrix\Rest\RestException(
                'Access to warehouse data denied',
                'ACCESS_DENIED',
                \CRestServer::STATUS_FORBIDDEN
            );
        }

        return [
            'id' => $warehouseId,
            'title' => 'Central warehouse',
            'scope' => $server->getScope(),
        ];
    }
}

AddEventHandler(
    'rest',
    'OnRestServiceBuildDescription',
    ['MyCompanyRestApi', 'onRestServiceBuildDescription']
);
```

Запросы к своему методу строятся по общим правилам REST — они описаны в статье [{#T}](../../how-to-call-rest-api/general-principles.md). Успешный вызов:

```http
GET /rest/mycompany.warehouse.get?auth=**put_access_token_here**&id=12

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

```json
{
    "result": {
        "id": 12,
        "title": "Central warehouse",
        "scope": "mycompany"
    },
    "time": {
        "start": 1791536400.123456,
        "finish": 1791536400.234567,
        "duration": 0.111111,
        "processing": 0.021,
        "date_start": "2026-10-09T12:00:00+03:00",
        "date_finish": "2026-10-09T12:00:00+03:00"
    }
}
```

Вызов без обязательного параметра, в формате xml:

```http
GET /rest/mycompany.warehouse.get.xml?auth=**put_access_token_here**

HTTP/1.1 400 Bad Request
Content-Type: text/xml; charset=utf-8
```

```xml
<?xml version="1.0" ?>
<response>
    <error>WAREHOUSE_ID_REQUIRED</error>
    <error_description>Parameter id is required</error_description>
</response>
```

## Постраничная навигация в своих методах {#navigation}

Если метод возвращает список, унаследуйте класс от `\IRestService` и используйте его методы `getNavData` и `setNavData`. Они формируют такую же навигацию, как у штатных методов: размер страницы — 50 записей, позиция следующей страницы возвращается в поле `next`, общее количество — в поле `total`. Ваш метод будет вести себя так же, как штатные списочные методы, — их общий контракт описан в статье [{#T}](../../how-to-call-rest-api/list-methods-pecularities.md).

`getNavData` принимает два параметра: значение `start` из запроса и признак ORM-класса. Со значением `true` метод возвращает массив с ключами `limit` и `offset` для ORM-методов, со значением `false` — массив с ключами `nPageSize` и `iNumPage` для методов старого ядра.

`setNavData` принимает выбранные записи и массив навигации с ключами `count` — общее количество записей и `offset` — смещение текущей страницы. Метод добавляет к результату поля `next` и `total`, которые модуль **rest** выносит на верхний уровень ответа.

```php
\Bitrix\Main\Loader::includeModule('rest');

class MyCompanyRestList extends \IRestService
{
    public static function onRestServiceBuildDescription(): array
    {
        return [
            'mycompany' => [
                'mycompany.user.list' => [
                    'callback' => [__CLASS__, 'getUserList'],
                    'options' => [],
                ],
            ],
        ];
    }

    public static function getUserList($query, $start, \CRestServer $server): array
    {
        $navData = static::getNavData($start, true);

        $result = \Bitrix\Main\UserTable::getList([
            'filter' => $query['filter'] ?? [],
            'select' => $query['select'] ?? ['ID', 'NAME', 'LAST_NAME'],
            'order' => $query['order'] ?? ['ID' => 'ASC'],
            'limit' => $navData['limit'],
            'offset' => $navData['offset'],
            'count_total' => true,
        ]);

        return static::setNavData(
            $result->fetchAll(),
            [
                'count' => $result->getCount(),
                'offset' => $navData['offset'],
            ]
        );
    }
}

AddEventHandler(
    'rest',
    'OnRestServiceBuildDescription',
    ['MyCompanyRestList', 'onRestServiceBuildDescription']
);
```

Вызов `\Bitrix\Main\Loader::includeModule('rest')` нужен до объявления класса: без него класс `\IRestService` еще не загружен и код в `init.php` завершится ошибкой.

Пример запроса:

```http
GET /rest/mycompany.user.list?auth=**put_access_token_here**&order[ID]=ASC&filter[<ID]=1000&select[]=ID&select[]=NAME&start=50
```

В ответе `next` появляется, только если есть следующая страница. Массив `result` в примере сокращен до двух записей из пятидесяти:

```json
{
    "result": [
        {"ID": "51", "NAME": "Ivan"},
        {"ID": "52", "NAME": "Anna"}
    ],
    "next": 100,
    "total": 137
}
```

## Как подставить описание метода на лету {#on-find-method-description}

Событие `onFindMethodDescription` позволяет описать метод в момент вызова, а не заранее. Оно нужно, когда набор методов неизвестен на старте: например, имя метода собирается из названия объекта, созданного пользователем.

Обработчик получает два параметра: имя вызванного метода в нижнем регистре и запрошенный scope. Чтобы обработать вызов, верните массив с ключом `scope` и описанием метода. Чтобы отказаться от обработки, верните `null` — тогда модуль **rest** опросит остальные обработчики.

```php
AddEventHandler('rest', 'onFindMethodDescription', 'myCompanyFindMethodDescription');

function myCompanyFindMethodDescription($method, $scope)
{
    if (mb_strpos($method, 'mycompany.dynamic.') !== 0)
    {
        return null;
    }

    return [
        'scope' => 'mycompany',
        'callback' => ['MyCompanyDynamicRest', 'getDynamicItem'],
        'options' => [],
    ];
}
```

Класс `MyCompanyDynamicRest` с методом `getDynamicItem` пишется так же, как обработчик метода из шага 2: те же три параметра на входе, тот же способ вернуть данные или ошибку.

Такие методы не попадают в выдачу [methods](../../../api-reference/common/system/methods.md): в общем описании их нет.

## Продолжите изучение

- [{#T}](index.md)
- [{#T}](versions.md)
- [{#T}](custom-auth-provider.md)
- [{#T}](../../../local-integrations/local-apps.md)
- [{#T}](../../../api-reference/common/system/method-get.md)
- [{#T}](../../../api-reference/common/system/scope.md)
