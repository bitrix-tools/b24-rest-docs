# Получить поля и настройки свойства отгрузки для определенного типа свойств sale.shipmentproperty.getfieldsbytype

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает доступные поля свойств отгрузки по типу свойств.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../data-types.md) | Тип свойства отгрузки
Возможные значения:
`STRING`
`Y/N`
`NUMBER`
`ENUM`
`FILE`
`DATE`
`LOCATION`
`ADDRESS`
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"NUMBER"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentproperty.getfieldsbytype
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"NUMBER","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentproperty.getfieldsbytype
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldInfo = {
      isImmutable: boolean
      isReadOnly: boolean
      isRequired: boolean
      type: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetFieldsByTypeResult = {
      property: Record<string, FieldInfo>
    }

    try {
      const response = await $b24.actions.v2.call.make<GetFieldsByTypeResult>({
        method: 'sale.shipmentproperty.getfieldsbytype',
        params: {
          type: 'NUMBER',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Available property fields:', Object.keys(result.property))
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
      async function getShipmentPropertyFieldsByType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentproperty.getfieldsbytype',
            params: {
              type: 'NUMBER',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Available property fields:', Object.keys(result.property))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getShipmentPropertyFieldsByType)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipmentproperty.getfieldsbytype',
                [
                    'type' => 'NUMBER',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting shipment property fields by type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentproperty.getfieldsbytype", {
            "type": "NUMBER",
        },
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
        'sale.shipmentproperty.getfieldsbytype',
        [
            'type' => 'NUMBER'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "property":{
         "active":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "code":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"string"
         },
         "defaultValue":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"string"
         },
         "description":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"string"
         },
         "id":{
            "isImmutable":false,
            "isReadOnly":true,
            "isRequired":false,
            "type":"integer"
         },
         "isFiltered":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "multiple":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "name":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":true,
            "type":"string"
         },
         "personTypeId":{
            "isImmutable":true,
            "isReadOnly":false,
            "isRequired":true,
            "type":"integer"
         },
         "propsGroupId":{
            "isImmutable":true,
            "isReadOnly":false,
            "isRequired":true,
            "type":"integer"
         },
         "required":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "settings":{
            "fields":{
               "max":{
                  "isImmutable":false,
                  "isReadOnly":false,
                  "isRequired":false,
                  "type":"integer"
               },
               "min":{
                  "isImmutable":false,
                  "isReadOnly":false,
                  "isRequired":false,
                  "type":"integer"
               },
               "step":{
                  "isImmutable":false,
                  "isReadOnly":false,
                  "isRequired":false,
                  "type":"integer"
               }
            },
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"datatype"
         },
         "sort":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"integer"
         },
         "type":{
            "isImmutable":true,
            "isReadOnly":false,
            "isRequired":true,
            "type":"string"
         },
         "userProps":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "util":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"char"
         },
         "xmlId":{
            "isImmutable":false,
            "isReadOnly":false,
            "isRequired":false,
            "type":"string"
         }
      }
   },
   "time":{
      "start":1712325081.703631,
      "finish":1712325082.067712,
      "duration":0.36408114433288574,
      "processing":0.023890972137451172,
      "date_start":"2024-04-05T16:51:21+03:00",
      "date_finish":"2024-04-05T16:51:22+03:00"
   }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения доступных полей свойств отгрузки ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-property-add.md)
- [{#T}](./sale-shipment-property-update.md)
- [{#T}](./sale-shipment-property-get.md)
- [{#T}](./sale-shipment-property-list.md)
- [{#T}](./sale-shipment-property-delete.md)