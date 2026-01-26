# Зарегистрировать новый обработчик события event.bind

> Кто может выполнять метод: любой пользователь

Метод `event.bind` регистрирует новый обработчик события. 

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Может работать как при авторизации под пользователем с правами администрирования портала, так и под обычным пользователем. Метод для пользователя без прав администратора доступен с ограничениями:

1. Офлайн-события недоступны, попытка установки будет порождать исключение
2. События устанавливаются от имени текущего пользователя (см. описание параметра `auth_type`). Явное указание `auth_type`, отличного от `ID` текущего пользователя, также будет порождать исключение

{% note info %}

Поскольку запросы будут идти с серверов Битрикс, то любой URL должен быть доступен для GET/POST запросов извне.

{% endnote %}

Интерфейс для данного метода — [BX24.callBind](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-bind.md).

{% note info %}

При удалении и обновлении приложения его действия будут удаляться. Поэтому в инсталляторе каждой версии нужно их выставлять с нуля.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../data-types.md) | Имя события ||
|| **handler***
[`string`](../data-types.md) | Ссылка на обработчик события ||
|| **auth_type**
[`integer`](../data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события. По умолчанию будет использоваться авторизация пользователя, действия которого привели к срабатыванию события ||
|| **event_type**
[`string`](../data-types.md) | Значения: `online\|offline`. По умолчанию `event_type=online`, и поведение метода не меняется. Если вызывается `event_type=offline`, то метод работает с [офлайн-событиями](./offline-events.md) ||
|| **auth_connector**
[`string`](../data-types.md) |  Ключ источника. Параметр предназначен для [офлайн-событий](./offline-events.md). Позволяет исключать ложные срабатывания событий ||
|| **options**
[`string`](../data-types.md) | Дополнительные настройки для регистрируемого события, при наличии ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "event": "ONCRMLEADADD",
        "handler": "https://www.my-domain.ru/handler/",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.bind
    ```

- JS

    ```js
    BX24.callBind(
        'ONCRMLEADADD',
        'https://www.my-domain.ru/handler/',
        15,
        (result) => console.log(result)
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.bind',
        [
            'event' => 'ONCRMLEADADD',
            'handler' => 'https://www.my-domain.ru/handler/',
            'auth_type' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1721296536.908506,
        "finish": 1721296537.007365,
        "duration": 0.09885907173156738,
        "processing": 0.03251290321350098,
        "date_start": "2024-07-18T11:55:36+02:00",
        "date_finish": "2024-07-18T11:55:37+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Успешность выполнения ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_EVENT_NOT_FOUND",
    "error_description":"Event not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_EVENT_NOT_FOUND` | Event not found | Неверно указано событие ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
- [{#T}](../../tutorials/openlines/example-connector.md)s