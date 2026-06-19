# Обновить бронирование booking.v1.booking.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.update` обновляет информацию о бронировании.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор бронирования ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий значения полей для обновления брони [(подробное описание)](#fields)||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceIds**
[`array`](../../data-types.md#array) | Массив идентификаторов ресурсов. 
ID ресурсов можно получить методом [booking.v1.resource.list](../resource/booking-v1-resource-list.md) ||
|| **name**
[`string`](../../data-types.md) | Название бронирования ||
|| **description**
[`string`](../../data-types.md) | Описание бронирования ||
|| **datePeriod**
[`object`](../../data-types.md#object) | Объект, содержащий время брони [(подробное описание)](#datePeriod) ||
|#

### Параметр datePeriod {#datePeriod}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`object`](../../data-types.md#object) | Время начала брони в формате `{"timestamp": "1723446900", "timezone": "Europe/Moscow"}`||
|| **to***
[`object`](../../data-types.md#object) | Время окончания брони в формате `{"timestamp": "1723447800", "timezone": "Europe/Moscow"}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"name":"Название","description":"Описание","resourceIds":[1,2,3],"datePeriod":{"from":{"timestamp":1723446900,"timezone":"Europe/Moscow"},"to":{"timestamp":1723447800,"timezone":"Europe/Moscow"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.booking.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"name":"Название","description":"Описание","resourceIds":[1,2,3],"datePeriod":{"from":{"timestamp":1723446900,"timezone":"Europe/Moscow"},"to":{"timestamp":1723447800,"timezone":"Europe/Moscow"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'booking.v1.booking.update',
        params: {
          id: 10,
          fields: {
            name: 'Name',
            description: 'Description',
            resourceIds: [1, 2, 3],
            datePeriod: {
              from: {
                timestamp: 1723446900,
                timezone: 'Europe/Moscow',
              },
              to: {
                timestamp: 1723447800,
                timezone: 'Europe/Moscow',
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Booking updated:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateBooking() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.booking.update',
            params: {
              id: 10,
              fields: {
                name: 'Name',
                description: 'Description',
                resourceIds: [1, 2, 3],
                datePeriod: {
                  from: {
                    timestamp: 1723446900,
                    timezone: 'Europe/Moscow',
                  },
                  to: {
                    timestamp: 1723447800,
                    timezone: 'Europe/Moscow',
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Booking updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateBooking)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.booking.update',
                [
                    'id' => 10,
                    'fields' => [
                        'name' => 'Название',
                        'description' => 'Описание',
                        'resourceIds' => [1, 2, 3],
                        'datePeriod' => [
                            'from' => [
                                'timestamp' => 1723446900,
                                'timezone' => 'Europe/Moscow'
                            ],
                            'to' => [
                                'timestamp' => 1723447800,
                                'timezone' => 'Europe/Moscow'
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            // Нужная вам логика обработки данных
            processData($result->data());
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating booking: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.booking.update",
        {
            id: 10,
            fields: {
                name: "Название",
                description: "Описание",
                resourceIds: [1, 2, 3],
                datePeriod: {
                    from: {
                        timestamp: 1723446900,
                        timezone: "Europe/Moscow"
                    },
                    to: {
                        timestamp: 1723447800,
                        timezone: "Europe/Moscow"
                    }
                }
            }
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.booking.update',
        [
            'id' => 10,
            'fields' => [
                'name' => 'Название',
                'description' => 'Описание',
                'resourceIds' => [1, 2, 3],
                'datePeriod' => [
                    'from' => [
                        'timestamp' => 1723446900,
                        'timezone' => 'Europe/Moscow'
                    ],
                    'to' => [
                        'timestamp' => 1723447800,
                        'timezone' => 'Europe/Moscow'
                    ]
                ]
            ]
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
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 422,
    "error_description": "Invalid date period"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1019` | `Booking not found` | Запись с таким `id` не найдена ||
|| `1018` | `Empty resource collection` | Ресурсы недоступны для указанного временного промежутка, пустой массив ресурсов или таких ресурсов не существует ||
|| `0` | `Required fields:` |  Не передан обязательный параметр внутри `fields`  ||
|| `100` | `Could not find value for parameter ` | Не передан обязательный параметр ||
|| `422` | `Invalid date period` | Некорретный период времени ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-createfromwaitlist.md)
- [{#T}](./booking-v1-booking-delete.md)
- [{#T}](./booking-v1-booking-add.md)
- [{#T}](./booking-v1-booking-list.md)
- [{#T}](./booking-v1-booking-get.md)