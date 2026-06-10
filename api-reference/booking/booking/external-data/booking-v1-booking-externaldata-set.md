# Установить связи для бронирования booking.v1.booking.externalData.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.externalData.set` устанавливает связи для указанного бронирования.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **bookingId***
[`integer`](../../../data-types.md) | Идентификатор бронирования.
Можно получить методами [booking.v1.booking.add](../booking-v1-booking-add.md) и [booking.v1.booking.list](../booking-v1-booking-list.md) ||
|| **externalData***
[`array`](../../../data-types.md) | Массив объектов, содержащий объекты для привязки [(подробное описание)](#externalData) ||
|#

### Параметр externalData {#externalData}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, например `crm` ||
|| **entityTypeId***
[`string`](../../../data-types.md) | ID типа объекта, например `DEAL` ||
|| **value***
[`string`](../../../data-types.md) | ID элемента, например `1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":14,"externalData":[{"moduleId":"crm","entityTypeId":"DEAL","value":"1"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.externalData.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"bookingId":14,"externalData":[{"moduleId":"crm","entityTypeId":"DEAL","value":"1"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.booking.externalData.set
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
        method: 'booking.v1.booking.externalData.set',
        params: {
          bookingId: 14,
          externalData: [
            {
              moduleId: 'crm',
              entityTypeId: 'DEAL',
              value: '1',
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('External data set:', result)
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
      async function setExternalData() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.booking.externalData.set',
            params: {
              bookingId: 14,
              externalData: [
                {
                  moduleId: 'crm',
                  entityTypeId: 'DEAL',
                  value: '1',
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('External data set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setExternalData)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.booking.externalData.set',
                [
                    'bookingId'    => 14,
                    'externalData' => [
                        [
                            'moduleId'     => 'crm',
                            'entityTypeId' => 'DEAL',
                            'value'        => '1',
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting external data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.booking.externalData.set",
        {
            bookingId: 14,
            externalData: [
                {
                    moduleId: "crm",
                    entityTypeId: "DEAL",
                    value: "1"
                }
            ]
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
        'booking.v1.booking.externalData.set',
        [
            'bookingId' => 14,
            'externalData' => [
                [
                    'moduleId' => 'crm',
                    'entityTypeId' => 'DEAL',
                    'value' => '1'
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `externalData` ||
|| `1021` | `Booking not found` | Бронирование с указанным `id` не найдено ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-externaldata-unset.md)
- [{#T}](./booking-v1-booking-externaldata-list.md)