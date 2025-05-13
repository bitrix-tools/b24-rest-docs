# Получить настройку слотов для ресурса booking.v1.resource.slots.list

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.slots.list` возвращает настройку временных слотов для указанного ресурса.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceID***
[`integer`](../../../data-types.md) | Идентификатор ресурса.
Можно получить методами [booking.v1.resource.add](../booking-v1-resource-add.md) и [booking.v1.resource.list](../booking-v1-resource-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "booking.v1.resource.slots.list",
        {
            resourceId: 257,
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
    -d '{"resourceId":257}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resource.slots.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":257,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.slots.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.resource.slots.list',
        [
            'resourceId' => 257
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
        "slots": [
            {
                "from": 100,
                "id": 171,
                "slotSize": 1,
                "timezone": "Europe/Kaliningrad",
                "to": 300,
                "weekDays": [
                    "Mon",
                    "Tue"
                ]
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
[`object`](../../../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о слотах. Структура описана [ниже](#slots)||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Слот {#slots}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор настройки слотов ||
|| **from**
[`integer`](../../../data-types.md) | Время, с которого доступна бронь слотов в течение дня. Значение в диапазоне от 0 до 1440. Например `540` — время для брони доступно с 9:00 ||
|| **to**
[`integer`](../../../data-types.md) | Время окончания слота в минутах. Значение в диапазоне от 0 до 1440, больше или равно значению `from`. Например `1080` — время для брони доступно до 18:00 ||
|| **timezone**
[`string`](../../../data-types.md) | Часовой пояс, относительно которого настроено время слота ||
|| **weekDays**
[`array`](../../../data-types.md) | Массив доступных дней недели для слота. Возможные значения: 
- `"Mon"` — понедельник
- `"Tue"` — вторник
- `"Wed"` — среда
- `"Thu"` — четверг
- `"Fri"` — пятница
- `"Sat"` — суббота
- `"Sun"` — воскресенье ||
|| **slotSize**
[`integer`](../../../data-types.md) | Длительность слота в минутах ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1009,
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1009` | `Resource not found` | Ресурс с указанным `id` не найден ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-resource-slots-set.md)
- [{#T}](./booking-v1-resource-slots-unset.md)