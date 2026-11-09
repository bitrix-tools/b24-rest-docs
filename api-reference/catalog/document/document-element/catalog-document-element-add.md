# Добавить товар в документ складского учета catalog.document.element.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» на документы этого типа и правом «Просмотр и выбор склада» на склады позиции

Метод `catalog.document.element.add` добавляет товарную позицию в непроведенный документ складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Поля товарной позиции ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **docId***
[`catalog_document.id`](../../data-types.md#catalog_document) | Идентификатор документа складского учета. Документ должен быть не проведен, то есть иметь статус `N`.

Идентификатор можно получить методом [catalog.document.list](../catalog-document-list.md) ||
|| **elementId**
[`catalog_product.id`](../../data-types.md#catalog_product) | Идентификатор простого товара или вариации.

Идентификатор можно получить методами [catalog.product.list](../../product/catalog-product-list.md) и [catalog.product.offer.list](../../product/offer/catalog-product-offer-list.md).

Метод не проверяет, что товар существует. Если поле не передано, метод создаст позицию без товара ||
|| **storeFrom**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада списания. Заполняется в документах перемещения и списания.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **storeTo**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада поступления. Заполняется в документах прихода, оприходования, перемещения и возврата.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара. Значение, которое не является числом, метод сохраняет как `null` без ошибки ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена за единицу в валюте документа. Значение, которое не является числом, метод сохраняет как `0` без ошибки ||
|#

Непереданные поля `elementId`, `storeFrom`, `storeTo`, `amount` и `purchasingPrice` в ответе равны `null`. Поле `id` метод заполняет сам: переданное значение и неизвестные поля метод пропускает без ошибки.

Метод не проверяет, что склады существуют и подходят к типу документа. Идентификаторы складов передавайте числом: массив, например `[43]`, метод сохраняет как склад с идентификатором `1`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":371,"elementId":6595,"storeTo":43,"amount":15,"purchasingPrice":1250.5}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":371,"elementId":6595,"storeTo":43,"amount":15,"purchasingPrice":1250.5},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentElementResult = {
      documentElement: {
        amount: number | null
        docId: number
        elementId: number | null
        id: number
        purchasingPrice: number | null
        storeFrom: number | null
        storeTo: number | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentElementResult>({
        method: 'catalog.document.element.add',
        params: {
          fields: {
            docId: 371,
            elementId: 6595,
            storeTo: 43,
            amount: 15,
            purchasingPrice: 1250.5,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.documentElement)
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
      async function addDocumentElement() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.element.add',
            params: {
              fields: {
                docId: 371,
                elementId: 6595,
                storeTo: 43,
                amount: 15,
                purchasingPrice: 1250.5,
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
          console.info(result.documentElement)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDocumentElement)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.add(
            fields={
                "docId": 371,
                "elementId": 6595,
                "storeTo": 43,
                "amount": 15,
                "purchasingPrice": 1250.5,
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
                'catalog.document.element.add',
                [
                    'fields' => [
                        'docId' => 371,
                        'elementId' => 6595,
                        'storeTo' => 43,
                        'amount' => 15,
                        'purchasingPrice' => 1250.5,
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
        'catalog.document.element.add',
        {
            fields: {
                docId: 371,
                elementId: 6595,
                storeTo: 43,
                amount: 15,
                purchasingPrice: 1250.5
            }
        },
        function(result)
        {
            if (result.error())
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
        'catalog.document.element.add',
        [
            'fields' => [
                'docId' => 371,
                'elementId' => 6595,
                'storeTo' => 43,
                'amount' => 15,
                'purchasingPrice' => 1250.5,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.element.add", b24.Params{
    	"fields": b24.Params{
    		"docId":           371,
    		"elementId":       6595,
    		"storeTo":         43,
    		"amount":          15,
    		"purchasingPrice": 1250.5,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.element.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "documentElement".
    raw, ok := b24.Unwrap(res.Result, "documentElement")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа documentElement")
    }

    var item struct {
    	Amount          int     `json:"amount"`
    	DocID           b24.ID  `json:"docId"`
    	ElementID       b24.ID  `json:"elementId"`
    	ID              b24.ID  `json:"id"`
    	PurchasingPrice float64 `json:"purchasingPrice"`
    	StoreTo         int     `json:"storeTo"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.DocID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documentElement": {
            "amount": 15,
            "docId": 371,
            "elementId": 6595,
            "id": 101,
            "purchasingPrice": 1250.5,
            "storeFrom": null,
            "storeTo": 43
        }
    },
    "time": {
        "start": 1793883862,
        "finish": 1793883862.684503,
        "duration": 0.6845030784606934,
        "processing": 0,
        "date_start": "2026-11-05T16:04:22+03:00",
        "date_finish": "2026-11-05T16:04:22+03:00",
        "operating_reset_at": 1793884440,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.documentElement**
[`catalog_document_element`](../../data-types.md#catalog_document_element) | Объект с полями добавленной позиции. Незаполненные поля приходят со значением `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_DOCUMENT_STATUS",
    "error_description": "Document not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_DOCUMENT_RIGHTS` | Access denied | У пользователя нет права «Создание и редактирование» на документы этого типа или права «Просмотр и выбор склада» на склад позиции ||
|| `400` | `ERROR_DOCUMENT_STATUS` | Document not found | Документ с указанным `docId` не найден, `docId` не передан или не является числом ||
|| `400` | `ERROR_DOCUMENT_STATUS` | Conducted document | Документ проведен. Чтобы изменить его позиции, отмените проведение методом [catalog.document.cancel](../catalog-document-cancel.md) ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | Error of adding new document element | Не удалось сохранить позицию ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-update.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-get-fields.md)
