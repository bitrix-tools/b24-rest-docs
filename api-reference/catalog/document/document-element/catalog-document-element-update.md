# Обновить товар в документе складского учета catalog.document.element.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» на документы этого типа и правом «Просмотр и выбор склада» на склады позиции

Метод `catalog.document.element.update` изменяет товарную позицию в непроведенном документе складского учета и возвращает ее поля после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document_element.id`](../../data-types.md#catalog_document_element) | Идентификатор товарной позиции.

Идентификатор можно получить методом [catalog.document.element.list](./catalog-document-element-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля позиции, которые нужно изменить ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **storeFrom**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада списания. Заполняется в документах перемещения и списания.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **storeTo**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада поступления. Заполняется в документах прихода, оприходования, перемещения и возврата.

Идентификатор можно получить методом [catalog.store.list](../../store/catalog-store-list.md) ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара. Значение, которое не является числом, метод сохраняет как `null` без ошибки — прежнее количество стирается ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена за единицу в валюте документа. Значение, которое не является числом, метод сохраняет как `0` без ошибки ||
|#

Метод меняет только переданные поля, остальные сохраняют прежние значения.

Поля `docId` и `elementId` изменить нельзя: метод пропускает их без ошибки. Чтобы заменить товар или перенести позицию в другой документ, удалите позицию методом [catalog.document.element.delete](./catalog-document-element-delete.md) и добавьте новую методом [catalog.document.element.add](./catalog-document-element-add.md).

Если в `fields` нет ни одного изменяемого поля — пустой объект, только `docId`, `elementId` или неизвестные поля, — метод вернет ошибку `Error of modifying new document`.

Метод не проверяет, что склады существуют и подходят к типу документа.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":43}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":43},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentElementUpdateResult = {
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
      const response = await $b24.actions.v2.call.make<DocumentElementUpdateResult>({
        method: 'catalog.document.element.update',
        params: {
          id: 101,
          fields: {
            amount: 12,
            purchasingPrice: 1180,
            storeTo: 43,
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
      async function updateDocumentElement() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.element.update',
            params: {
              id: 101,
              fields: {
                amount: 12,
                purchasingPrice: 1180,
                storeTo: 43,
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

      document.addEventListener('DOMContentLoaded', updateDocumentElement)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.update(
            bitrix_id=101,
            fields={
                "amount": 12,
                "purchasingPrice": 1180,
                "storeTo": 43,
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
                'catalog.document.element.update',
                [
                    'id' => 101,
                    'fields' => [
                        'amount' => 12,
                        'purchasingPrice' => 1180,
                        'storeTo' => 43,
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
        'catalog.document.element.update',
        {
            id: 101,
            fields: {
                amount: 12,
                purchasingPrice: 1180,
                storeTo: 43
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
        'catalog.document.element.update',
        [
            'id' => 101,
            'fields' => [
                'amount' => 12,
                'purchasingPrice' => 1180,
                'storeTo' => 43,
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
    res, err := client.Core().Call(ctx, "catalog.document.element.update", b24.Params{
    	"id": 101,
    	"fields": b24.Params{
    		"amount":          12,
    		"purchasingPrice": 1180,
    		"storeTo":         43,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.element.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "documentElement".
    raw, ok := b24.Unwrap(res.Result, "documentElement")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа documentElement")
    }

    // Незаполненные поля приходят как null, поэтому для них указатели.
    var item struct {
    	Amount          *float64 `json:"amount"`
    	DocID           b24.ID   `json:"docId"`
    	ElementID       *int     `json:"elementId"`
    	ID              b24.ID   `json:"id"`
    	PurchasingPrice *float64 `json:"purchasingPrice"`
    	StoreFrom       *int     `json:"storeFrom"`
    	StoreTo         *int     `json:"storeTo"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Amount)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documentElement": {
            "amount": 12,
            "docId": 371,
            "elementId": 6595,
            "id": 101,
            "purchasingPrice": 1180,
            "storeFrom": null,
            "storeTo": 43
        }
    },
    "time": {
        "start": 1793883948,
        "finish": 1793883948.402954,
        "duration": 0.4029541015625,
        "processing": 0,
        "date_start": "2026-11-05T16:05:48+03:00",
        "date_finish": "2026-11-05T16:05:48+03:00",
        "operating_reset_at": 1793884500,
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
[`catalog_document_element`](../../data-types.md#catalog_document_element) | Объект со всеми полями позиции после изменения. Незаполненные поля приходят со значением `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Error of modifying new document"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_DOCUMENT_RIGHTS` | Access denied | У пользователя нет права «Создание и редактирование» на документы этого типа или права «Просмотр и выбор склада» на склад позиции ||
|| `400` | `ERROR_DOCUMENT_STATUS` | Document not found | Позиция с указанным `id` не найдена ||
|| `400` | `ERROR_DOCUMENT_STATUS` | Conducted document | Документ проведен. Чтобы изменить его позиции, отмените проведение методом [catalog.document.cancel](../catalog-document-cancel.md) ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Error of modifying new document | В `fields` нет ни одного изменяемого поля или не удалось сохранить позицию ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-get-fields.md)
