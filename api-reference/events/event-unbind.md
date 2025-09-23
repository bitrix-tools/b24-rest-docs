# Отменить зарегистрированный обработчик события event.unbind

> Кто может выполнять метод: администратор

Метод `event.unbind` выполняет отмену зарегистрированного обработчика события.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md) и только при авторизации под пользователем с правами администрирования портала.

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
[`integer`](../data-types.md) | Идентификатор пользователя, под которым авторизуется обработчик события.

{% note info %}

Если требуется удалить обработчики события, установленные с пустым `auth_type` (с авторизацией от имени пользователя, вызвавшего событие), но оставить остальные обработчики, указывайте `auth_type=0` или пустое значение параметра.

{% endnote %} 
||
|| **event_type**
[`string`](../data-types.md) | Значения: `online\|offline`. По умолчанию `event_type=online`, и поведение метода не меняется. Если вызывается `event_type=offline`, то метод работает с [офлайн-событиями](./offline-events.md) ||
|#

Если какие-либо параметры не указаны, то будут удалены все обработчики события, удовлетворяющие остальным требованиям.

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
    https://**put_your_bitrix24_address**/rest/event.unbind
        ```

- JS

    ```js
    BX24.callUnbind(
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
        'event.unbind',
        [
            'EVENT' => 'ONCRMLEADADD',
            'HANDLER' => 'https://www.my-domain.ru/handler/',
            'AUTH_TYPE' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- PHP (B24PhpSdk)

    ```php        
    try {
        $eventCode = 'your_event_code'; // Replace with your actual event code
        $handlerUrl = 'https://your.handler.url'; // Replace with your actual handler URL
        $userId = null; // Replace with your actual user ID or leave as null
        $result = $serviceBuilder
            ->getMainScope()
            ->event()
            ->unbind($eventCode, $handlerUrl, $userId);
        print($result->getUnbindedHandlersCount());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает количество удаленных при вызове обработчиков событий.

```json
{
    "result": {
        "count": 1
    },
    "time": {
        "start": 1721298360.468008,
        "finish": 1721298360.553977,
        "duration": 0.0859689712524414,
        "processing": 0.0023431777954101562,
        "date_start": "2024-07-18T12:26:00+02:00",
        "date_finish": "2024-07-18T12:26:00+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Смотрите также

- [{#T}](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-unbind.md)

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)