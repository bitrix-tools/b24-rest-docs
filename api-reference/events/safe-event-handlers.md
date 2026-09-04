# Безопасность в обработчиках

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В обработчиках событий приложения и исходящего вебхука нужно убедиться, что запрос отправил Битрикс24, а не посторонний сервис. Для проверки Битрикс24 передает в обработчик параметр `auth.application_token`.

Для приложения параметр впервые передается в обработчик события [`ONAPPINSTALL`](../common/events/on-app-install.md) вместе с данными авторизации пользователя, установившего приложение. Обработчик события `ONAPPINSTALL` может проверить актуальность полученного `access_token` и сохранить `application_token`. После этого другие обработчики событий должны сравнивать пришедший `auth.application_token` с сохраненным значением.

Если приложение получило событие [`ONAPPUPDATE`](../common/events/on-app-update.md), сохраненный `application_token` нужно обновить. После установки новой версии приложения Битрикс24 передает в событие новый токен.

Особенно важно проверять токен в обработчике события [`ONAPPUNINSTALL`](../common/events/on-app-uninstall.md), потому что в него не передаются данные авторизации: приложение уже удалено из Битрикс24. Для `ONAPPUNINSTALL` сравнение `application_token` с сохраненным значением становится единственным способом убедиться, что обработчик события вызван Битрикс24.

Для исходящего вебхука токен создается в интерфейсе Битрикс24 после сохранения вебхука. Сохраните значение поля *Токен приложения* в форме исходящего вебхука и сравнивайте его с `auth.application_token` во входящих запросах.

## Где приходит application_token

Фрагмент POST-запроса события `ONAPPINSTALL`:

```json
{
    "event": "ONAPPINSTALL",
    "data": {
        "VERSION": "1.0.0",
        "ACTIVE": "Y",
        "INSTALLED": "Y",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1696527000",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "scope": "crm,user,task",
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "expires_in": 3600,
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

Сохраните ключи из `auth`, которые нужны для проверки входящих событий.

#|
|| **Ключ**
`тип` | **Что хранить** | **Как использовать** ||
|| **auth.application_token**
[`string`](../data-types.md) | Для приложения сохраните значение при обработке события [`ONAPPINSTALL`](../common/events/on-app-install.md) и обновите его при обработке события [`ONAPPUPDATE`](../common/events/on-app-update.md). Для исходящего вебхука сохраните значение поля *Токен приложения* | Сравнивайте с `auth.application_token`, который приходит в каждый обработчик события ||
|| **auth.member_id**
[`string`](../data-types.md) | Сохраните идентификатор Битрикс24 вместе с токеном | Используйте для поиска сохраненного токена, если один обработчик принимает события от нескольких Битрикс24 ||
|#

Полный состав ключей `auth` описан в [общей таблице параметра auth](./index.md#auth).

{% note warning "" %}

Храните `application_token` как секрет: не выводите его в логи, не передавайте в клиентский код и не публикуйте в сообщениях об ошибках.

{% endnote %}

## Как проверить токен в обработчике

1. Получите сохраненный `application_token` по `auth.member_id`
2. Сравните сохраненный токен со значением `auth.application_token` из входящего события
3. Если токены не совпали, верните код `403` и завершите обработку события

Пример обработчика:

```php
$auth = $_POST['auth'] ?? [];
$memberId = $auth['member_id'] ?? '';
$incomingApplicationToken = $auth['application_token'] ?? '';

$storedApplicationToken = getStoredApplicationToken($memberId);

if ($storedApplicationToken === '' || $incomingApplicationToken !== $storedApplicationToken) {
    http_response_code(403);
    exit;
}

handleBitrix24Event($_POST);
```

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./index.md#auth)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./offline-events.md)
- [{#T}](../common/events/on-app-install.md)
- [{#T}](../common/events/on-app-update.md)
- [{#T}](../common/events/on-app-uninstall.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
