# Обновить тип цены catalog.priceType.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

Метод `catalog.priceType.update` изменяет значения полей типа цены.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Идентификатор типа цены.

Получить идентификатор можно методом [catalog.priceType.list](./catalog-price-type-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями типа цены, которые нужно изменить [(подробное описание)](#fields).

Передавайте только изменяемые поля: непереданные поля сохраняют текущие значения. Пустой объект метод принимает без ошибки и ничего не меняет ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Код типа цены. Значение не должно быть пустым ||
|| **base**
[`string`](../../data-types.md) | Является ли тип цены базовым. Возможные значения:
- `Y` — да
- `N` — нет

Одновременно может существовать только один базовый тип цены. Если передать `Y`, текущий базовый тип перестанет быть базовым
||
|| **sort**
[`integer`](../../data-types.md) | Сортировка. Значение, которое не является числом, метод сохраняет как `100` без ошибки ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего типа цены с аналогичной позицией во внешней системе
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2,"fields":{"name":"Partner wholesale price","sort":1,"xmlId":"partnerwholesale"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceType.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2,"fields":{"name":"Partner wholesale price","sort":1,"xmlId":"partnerwholesale"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceType.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PriceTypeUpdateResult = {
      priceType: {
        base: string
        createdBy: number
        dateCreate: ISODate | null
        id: number
        modifiedBy: number
        name: string
        sort: number
        timestampX: ISODate | null
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PriceTypeUpdateResult>({
        method: 'catalog.priceType.update',
        params: {
          id: 2,
          fields: {
            name: 'Partner wholesale price',
            sort: 1,
            xmlId: 'partnerwholesale',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.priceType.id, result.priceType.name)
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
      async function updatePriceType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.priceType.update',
            params: {
              id: 2,
              fields: {
                name: 'Partner wholesale price',
                sort: 1,
                xmlId: 'partnerwholesale',
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
          console.info(result.priceType.id, result.priceType.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePriceType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price_type.update(
            bitrix_id=2,
            fields={
                "name": "Partner wholesale price",
                "sort": 1,
                "xmlId": "partnerwholesale",
            },
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
                'catalog.priceType.update',
                [
                    'id' => 2,
                    'fields' => [
                        'name'  => "Partner wholesale price",
                        'sort'  => 1,
                        'xmlId' => "partnerwholesale",
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
        'catalog.priceType.update',
        {
            id: 2,
            fields: {
                name: "Partner wholesale price",
                sort: 1,
                xmlId: "partnerwholesale"
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
        'catalog.priceType.update',
        [
            'id' => 2,
            'fields' => [
                'name' => 'Partner wholesale price',
                'sort' => 1,
                'xmlId' => 'partnerwholesale'
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
    res, err := client.Core().Call(ctx, "catalog.priceType.update", b24.Params{
    	"id": 2,
    	"fields": b24.Params{
    		"name":  "Partner wholesale price",
    		"sort":  1,
    		"xmlId": "partnerwholesale",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.priceType.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "priceType".
    raw, ok := b24.Unwrap(res.Result, "priceType")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа priceType")
    }

    var item struct {
    	Base       string `json:"base"`
    	CreatedBy  int    `json:"createdBy"`
    	DateCreate string `json:"dateCreate"`
    	ID         b24.ID `json:"id"`
    	ModifiedBy int    `json:"modifiedBy"`
    	Name       string `json:"name"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Base, item.CreatedBy)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "priceType": {
            "base": "N",
            "createdBy": 1269,
            "dateCreate": "2026-11-03T12:44:53+03:00",
            "id": 2,
            "modifiedBy": 1269,
            "name": "Partner wholesale price",
            "sort": 1,
            "timestampX": "2026-11-03T12:45:09+03:00",
            "xmlId": "partnerwholesale"
        }
    },
    "time": {
        "start": 1793699473,
        "finish": 1793699473.622972,
        "duration": 0.6229720115661621,
        "processing": 0,
        "date_start": "2026-11-03T12:51:13+03:00",
        "date_finish": "2026-11-03T12:51:13+03:00",
        "operating_reset_at": 1793700060,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.priceType**
[`catalog_price_type`](../data-types.md#catalog_price_type) | Объект с информацией об обновленном типе цены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201000000000",
    "error_description": "priceType does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300020` | Access Denied | У пользователя нет права «Управление типами цен» ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `201000000000` | priceType does not exist. | Типа цены с указанным `id` нет ||
|| `400` | `ERROR_CORE` | Не указан код типа цен`<br>` | В `name` передана пустая строка ||
|| `400` | `0` | Error updating price type | Не удалось сохранить изменения типа цены ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-add.md)
- [{#T}](./catalog-price-type-get.md)
- [{#T}](./catalog-price-type-list.md)
- [{#T}](./catalog-price-type-delete.md)
- [{#T}](./catalog-price-type-get-fields.md)
