# Обновить значения свойств отгрузки sale.shipmentpropertyvalue.modify

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет значения свойств отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Корневой элемент, в котором передаются параметры запроса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipment***
[`object`](../../data-types.md) | Объект, содержащий значения идентификатора отгрузки и значения свойств отгрузки (подробное описание приведено [ниже](#shipment)) ||
|#

### Параметр shipment {#shipment}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment.id`](../data-types.md#sale_order_shipment) | Идентификатор отгрузки ||
|| **propertyValues***
[`object[]`](../../data-types.md) | Массив объектов, содержащих идентификатор свойства отгрузки и значение свойства (подробное описание приведено [ниже](#propertyvalues)) ||
|#

### Параметр propertyValues {#propertyvalues}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **shipmentPropsId***
[`sale_shipment_property.id`](../data-types.md#sale_shipment_property) | Идентификатор свойства отгрузки ||
|| **value***
[`string`](../../data-types.md) | Значение свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipment":{"id":4120,"propertyValues":[{"shipmentPropsId":105,"value":"Comments value"},{"shipmentPropsId":106,"value":"Description value"}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentpropertyvalue.modify
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"shipment":{"id":4120,"propertyValues":[{"shipmentPropsId":105,"value":"Comments value"},{"shipmentPropsId":106,"value":"Description value"}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentpropertyvalue.modify
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ModifyResult = {
      propertyValues: {
        code: string | null
        id: number
        name: string
        value: string
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<ModifyResult>({
        method: 'sale.shipmentpropertyvalue.modify',
        params: {
          fields: {
            shipment: {
              id: 4120,
              propertyValues: [
                {
                  shipmentPropsId: 105,
                  value: 'Comments value',
                },
                {
                  shipmentPropsId: 106,
                  value: 'Description value',
                },
              ],
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
        console.info(result.propertyValues)
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
      async function modifyShipmentPropertyValues() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentpropertyvalue.modify',
            params: {
              fields: {
                shipment: {
                  id: 4120,
                  propertyValues: [
                    {
                      shipmentPropsId: 105,
                      value: 'Comments value',
                    },
                    {
                      shipmentPropsId: 106,
                      value: 'Description value',
                    },
                  ],
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
          console.info(result.propertyValues)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', modifyShipmentPropertyValues)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipmentpropertyvalue.modify',
                [
                    'fields' => [
                        'shipment' => [
                            'id'            => 4120,
                            'propertyValues' => [
                                [
                                    'shipmentPropsId' => 105,
                                    'value'           => 'Comments value'
                                ],
                                [
                                    'shipmentPropsId' => 106,
                                    'value'           => 'Description value'
                                ],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error modifying shipment property value: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipmentpropertyvalue.modify', {
            fields: {
                shipment: {
                    id: 4120,
                    propertyValues: [{
                            shipmentPropsId: 105,
                            value: 'Comments value'
                        },
                        {
                            shipmentPropsId: 106,
                            value: 'Description value'
                        },
                    ],
                },
            }
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
        'sale.shipmentpropertyvalue.modify',
        [
            'fields' => [
                'shipment' => [
                    'id' => 4120,
                    'propertyValues' => [
                        [
                            'shipmentPropsId' => 105,
                            'value' => 'Comments value'
                        ],
                        [
                            'shipmentPropsId' => 106,
                            'value' => 'Description value'
                        ],
                    ],
                ],
            ]
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
        "propertyValues":[
            {
                "code":null,
                "id":38164,
                "name":"Comments",
                "value":"Comments value"
            },
            {
                "code":null,
                "id":38165,
                "name":"Description",
                "value":"Description value"
            }
        ]
    },
    "time":{
        "start":1718022201.149589,
        "finish":1718022201.726496,
        "duration":0.5769069194793701,
        "processing":0.38397693634033203,
        "date_start":"2024-06-10T15:23:21+03:00",
        "date_finish":"2024-06-10T15:23:21+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyValues**
[`sale_shipment_property_value[]`](../data-types.md#sale_shipment_property_value) | Массив объектов, содержащих информацию о значениях свойств отгрузок ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":100,
    "error_description":"Could not find value for parameter {fields}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для изменения значений свойств ||
|| `100` | Не указаны обязательные параметры ||
|| `201040400006` | Некорректный идентификатор отгрузки ||
|| `201040400007` | Отгрузка не найдена ||
|| `201040400008` | Ошибка сохранения заказа ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-shipment-property-value-get.md)
- [{#T}](./sale-shipment-property-value-list.md)
- [{#T}](./sale-shipment-propertyvalue-delete.md)
- [{#T}](./sale-shipment-property-value-get-fields.md)