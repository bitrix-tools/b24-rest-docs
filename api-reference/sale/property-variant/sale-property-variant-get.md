# Получить вариант значения свойства по id sale.propertyvariant.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.propertyvariant.get` возвращает вариант значения свойства заказа по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_property_variant.id`](../data-types.md) | Идентификатор варианта. Получить его можно методом [sale.propertyvariant.list](./sale-property-variant-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.propertyvariant.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyvariant.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PropertyVariantGetResult = {
      propertyVariant: {
        description: string
        id: number
        name: string
        orderPropsId: number
        sort: number
        value: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PropertyVariantGetResult>({
        method: 'sale.propertyvariant.get',
        params: {
          id: 6,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.propertyVariant)
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
      async function getPropertyVariant() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.propertyvariant.get',
            params: {
              id: 6,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.propertyVariant)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPropertyVariant)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.propertyvariant.get(
            bitrix_id=6,
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
                'sale.propertyvariant.get',
                [
                    'id' => 6
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
        echo 'Error getting property variant: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.propertyvariant.get", {
            "id": 6
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
        'sale.propertyvariant.get',
        [
            'id' => 6
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.propertyvariant.get", b24.Params{
    	"id": 6,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.propertyvariant.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "propertyVariant".
    raw, ok := b24.Unwrap(res.Result, "propertyVariant")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа propertyVariant")
    }

    var item struct {
    	Description  string `json:"description"`
    	ID           b24.ID `json:"id"`
    	Name         string `json:"name"`
    	OrderPropsID b24.ID `json:"orderPropsId"`
    	Sort         int    `json:"sort"`
    	Value        string `json:"value"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Description, item.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "propertyVariant":{
            "description":"Описание значения для красного цвета",
            "id":6,
            "name":"Красный",
            "orderPropsId":49,
            "sort":10,
            "value":"red"
        }
    },
    "time":{
        "start":1711632097.794569,
        "finish":1711632098.028609,
        "duration":0.2340400218963623,
        "processing":0.009068012237548828,
        "date_start":"2024-03-28T16:21:37+03:00",
        "date_finish":"2024-03-28T16:21:38+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyVariant**
[`sale_order_property_variant`](#sale_order_property_variant) | Данные варианта [(подробное описание)](#sale_order_property_variant) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### sale_order_property_variant {#sale_order_property_variant}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор варианта ||
|| **orderPropsId**
[`integer`](../../data-types.md) | Идентификатор свойства заказа, к которому относится вариант ||
|| **name**
[`string`](../../data-types.md) | Название варианта, которое видит покупатель ||
|| **value**
[`string`](../../data-types.md) | Символьный код варианта. Сохраняется в заказе как значение свойства ||
|| **sort**
[`integer`](../../data-types.md) | Порядок вывода варианта в списке ||
|| **description**
[`string`](../../data-types.md) | Описание варианта. `null`, если описание не задано ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201540400001",
    "error_description": "property variant is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `201540400001` | property variant is not exists | Вариант с переданным `id` не найден ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на чтение настроек магазина ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-variant-add.md)
- [{#T}](./sale-property-variant-update.md)
- [{#T}](./sale-property-variant-list.md)
- [{#T}](./sale-property-variant-delete.md)
- [{#T}](./sale-property-variant-get-fields.md)
