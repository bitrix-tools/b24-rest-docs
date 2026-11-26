# Добавить привязку свойства sale.propertyRelation.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.propertyRelation.add` привязывает свойство заказа к платежной системе, службе доставки, лендингу или торговой платформе.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля новой привязки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../data-types.md) | Идентификатор объекта привязки. Где его получить, зависит от `entityType`.

Метод не проверяет, что объект существует. Нечисловое значение сохраняется как `null` ||
|| **entityType***
[`string`](../../data-types.md) | Тип объекта привязки:
- `P` — платежная система, идентификатор из [sale.paysystem.list](../../pay-system/sale-pay-system-list.md)
- `D` — служба доставки, идентификатор из [sale.delivery.getlist](../delivery/delivery/sale-delivery-get-list.md)
- `L` — лендинг, идентификатор из [landing.landing.getList](../../landing/page/methods/landing-landing-get-list.md)
- `T` — торговая платформа, идентификатор из [sale.tradePlatform.list](../trade-platform/sale-trade-platform-list.md)

Метод не проверяет значение: любой символ сохраняется, у строки длиннее одного символа сохраняется только первый, а в ответе приходит пустой массив `[]` ||
|| **propertyId***
[`sale_order_property.id`](../data-types.md#sale_order_property) | Идентификатор свойства заказа. Получить идентификатор можно методом [sale.property.list](../property/sale-property-list.md) ||
|#

Тройка `entityType`, `entityId`, `propertyId` должна быть уникальной. Изменить привязку нельзя: удалите ее методом [sale.propertyRelation.deleteByFilter](./sale-property-relation-delete-by-filter.md) и создайте новую.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityId":6,"entityType":"D","propertyId":40}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.propertyRelation.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityId":6,"entityType":"D","propertyId":40},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyRelation.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PropertyRelationAddResult = {
      propertyRelation: {
        entityId: number
        entityType: string
        propertyId: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PropertyRelationAddResult>({
        method: 'sale.propertyRelation.add',
        params: {
          fields: {
            entityId: 6,
            entityType: 'D',
            propertyId: 40,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.propertyRelation)
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
      async function addPropertyRelation() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.propertyRelation.add',
            params: {
              fields: {
                entityId: 6,
                entityType: 'D',
                propertyId: 40,
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
          console.info(result.propertyRelation)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPropertyRelation)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "entityId": 6,
        "entityType": "D",
        "propertyId": 40,
    }

    try:
        bitrix_response = client.sale.propertyrelation.add(
            fields=fields,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.propertyRelation.add',
                [
                    'fields' => [
                        'entityId'    => 6,
                        'entityType'  => 'D',
                        'propertyId'  => 40,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.propertyRelation.add',
        {
            fields: {
                entityId: 6,
                entityType: 'D',
                propertyId: 40
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertyRelation.add',
        [
            'fields' => [
                'entityId' => 6,
               'entityType' => 'D',
                'propertyId' => 40
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.propertyRelation.add", b24.Params{
    	"fields": b24.Params{
    		"entityId":   6,
    		"entityType": "D",
    		"propertyId": 40,
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.propertyRelation.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "propertyRelation".
    raw, ok := b24.Unwrap(res.Result, "propertyRelation")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа propertyRelation")
    }

    var item struct {
    	EntityID   b24.ID `json:"entityId"`
    	EntityType string `json:"entityType"`
    	PropertyID b24.ID `json:"propertyId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.EntityID, item.EntityType)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "propertyRelation": {
            "entityId": 6,
            "entityType": "D",
            "propertyId": 40
        }
    },
    "time": {
        "start": 1712244475.495277,
        "finish": 1712244476.402808,
        "duration": 0.9075310230255127,
        "processing": 0.08538603782653809,
        "date_start": "2024-04-04T18:27:55+03:00",
        "date_finish": "2024-04-04T18:27:56+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит ключ `propertyRelation` — созданную привязку [(подробное описание)](#propertyrelation) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект propertyRelation {#propertyrelation}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор объекта привязки ||
|| **entityType**
[`string`](../../data-types.md) | Тип объекта привязки: `P`, `D`, `L` или `T` ||
|| **propertyId**
[`integer`](../../data-types.md) | Идентификатор свойства заказа ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201650000001",
    "error_description": "Duplicate entry for key [propertyId, entityId, entityType]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `201650000001` | Duplicate entry for key [propertyId, entityId, entityType] | Такая привязка уже существует ||
|| `400` | `201650000002` | property id is not exists | Свойство с указанным `propertyId` не найдено ||
|| `400` | `0` | Required fields: entityId, entityType | Не переданы обязательные поля, в тексте перечислены пропущенные ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `200040300020` | Access Denied | Нет права на изменение в модуле Интернет-магазин ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-property-relation-list.md)
- [{#T}](./sale-property-relation-delete-by-filter.md)
- [{#T}](./sale-property-relation-get-fields.md)
- [{#T}](../../../tutorials/sale/delivery-in-crm.md)
