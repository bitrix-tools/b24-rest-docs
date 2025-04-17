# Получить связи бронирования booking.v1.booking.externalData.list

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.externalData.list` возвращает связи для указанного бронирования.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **bookingId***
[`integer`](../../../data-types.md) | Идентификатор бронирования.
Можно получить методами [booking.v1.booking.add](../booking-v1-booking-add.md) и [booking.v1.booking.list](../booking-v1-booking-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "booking.v1.booking.externalData.list",
        {
            bookingId: 123,
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":123}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.booking.externalData.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":123,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.externalData.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.booking.externalData.list',
        [
            'bookingId' => 123
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
    "result": {
        "externalData": [
            {
                "entityTypeId": "DEAL",
                "moduleId": "crm",
                "value": "1"
            },
            {
                "entityTypeId": "DEAL",
                "moduleId": "crm",
                "value": "2"
            }
        ]
    },
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит массив объектов с информацией о связях. Структура описана [ниже](#externalData) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Связи {#externalData}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`string`](../../../data-types.md) | ID типа объекта ||
|| **moduleId**
[`string`](../../../data-types.md) | Идентификатор модуля ||
|| **value**
[`string`](../../../data-types.md) | ID элемента ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1021,
    "error_description": "Booking not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1021` | `Booking not found` | Бронирование с указанным `id` не найдено ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-externaldata-set.md)
- [{#T}](./booking-v1-booking-externaldata-unset.md)