# Получить список обработчиков служб доставки sale.delivery.handler.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод получает список обработчиков служб доставки. 

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.handler.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.handler.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each HandlerItem returned in result[]
    type HandlerItem = {
      ID: string
      NAME: string
      CODE: string
      SORT: string
      DESCRIPTION: string
      SETTINGS: {
        CALCULATE_URL: string
        CREATE_DELIVERY_REQUEST_URL: string
        CANCEL_DELIVERY_REQUEST_URL: string
        HAS_CALLBACK_TRACKING_SUPPORT: string
        CONFIG: Array<{
          TYPE: string
          NAME: string
          CODE: string
          OPTIONS?: Record<string, string>
        }>
      }
      PROFILES: Array<{
        NAME: string
        DESCRIPTION: string
        CODE: string
      }>
    }

    try {
      // sale.delivery.handler.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<HandlerItem[]>({
        method: 'sale.delivery.handler.list',
        params: {
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Delivery handlers:', result.length, result)
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
      async function listDeliveryHandlers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.delivery.handler.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.handler.list',
            params: {
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Delivery handlers:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDeliveryHandlers)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.delivery.handler.list',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching delivery handlers: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.handler.list', {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.getlist',
        [
            'SELECT' => [
                "ID",
                "PARENT_ID",
                "NAME",
                "ACTIVE",
                "DESCRIPTION",
                "SORT",
                "LOGOTIP",
                "CURRENCY",
            ],
            'FILTER' => [
                "@ID" => [196, 197, 198],
            ],
            'ORDER' => [
                "SORT" => "ASC",
                "ID" => "DESC",
            ]
        ]
    );
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":[
      {
         "ID":"14",
         "NAME":"Uber",
         "CODE":"uber",
         "SORT":"250",
         "DESCRIPTION":"Uber Description",
         "SETTINGS":{
            "CALCULATE_URL":"http:\/\/gateway.bx\/calculate.php",
            "CREATE_DELIVERY_REQUEST_URL":"http:\/\/gateway.bx\/create_delivery_request.php",
            "CANCEL_DELIVERY_REQUEST_URL":"http:\/\/gateway.bx\/cancel_delivery_request.php",
            "HAS_CALLBACK_TRACKING_SUPPORT":"Y",
            "CONFIG":[
               {
                  "TYPE":"STRING",
                  "NAME":"String Example",
                  "CODE":"SETTING_1"
               },
               {
                  "TYPE":"Y\/N",
                  "NAME":"Checkbox Example",
                  "CODE":"SETTING_2"
               },
               {
                  "TYPE":"NUMBER",
                  "NAME":"Number Example",
                  "CODE":"SETTING_3"
               },
               {
                  "TYPE":"ENUM",
                  "NAME":"Enum Example",
                  "OPTIONS":{
                     "Option1Code":"Option1Value",
                     "Option2Code":"Option2Value",
                     "Option3Code":"Option3Value",
                     "Option4Code":"Option4Value",
                     "Option5Code":"Option5Value"
                  },
                  "CODE":"SETTING_4"
               },
               {
                  "TYPE":"DATE",
                  "NAME":"Date Example",
                  "CODE":"SETTING_5"
               },
               {
                  "TYPE":"LOCATION",
                  "NAME":"Location Example",
                  "CODE":"SETTING_6"
               }
            ]
         },
         "PROFILES":[
            {
               "NAME":"Taxi",
               "DESCRIPTION":"Taxi Delivery",
               "CODE":"TAXI"
            },
            {
               "NAME":"Cargo",
               "DESCRIPTION":"Cargo Delivery",
               "CODE":"CARGO"
            }
         ]
      }
   ],
   "time":{
      "start":1713872315.334967,
      "finish":1713872315.655173,
      "duration":0.3202061653137207,
      "processing":0.013887882232666016,
      "date_start":"2024-04-23T14:38:35+03:00",
      "date_finish":"2024-04-23T14:38:35+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_delivery_handler[]`](../../data-types.md) | Массив объектов с информацией о выбранных обработчиках служб доставки  ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
   "error":"ACCESS_DENIED",
   "error_description":"Access denied!"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для получения списка служб доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-handler-add.md)
- [{#T}](./sale-delivery-handler-delete.md)
- [{#T}](./sale-delivery-handler-update.md)