# Обновить товар в документе складского учета catalog.document.element.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - пользователь с правом «Cоздание и редактирование» на тип документа в запросе,
> - и «Просмотр и выбор склада» на склад прихода или списания.

Метод `catalog.document.element.update` изменяет существующую позицию документа складского учета и возвращает обновленные данные товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document_element.id`](../../data-types.md#catalog_document_element) | Идентификатор товара документа, можно получить методом [catalog.document.element.list](./catalog-document-element-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля, которые нужно изменить (подробное описание ниже) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **storeFrom**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-источника, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Используйте для документов списания. Если параметр не передавать, сохранится текущее значение ||
|| **storeTo**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-получателя, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Подходит для документов поступления и перемещения. Если параметр не передавать, сохранится текущее значение ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара в единицах учета документа. Если параметр не передавать, сохранится текущее значение ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа. Если параметр не передавать, сохранится текущее значение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":148,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":148,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":2},"auth":"**put_access_token_here**"}' \
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
        amount: number
        docId: number
        elementId: number
        id: number
        purchasingPrice: number
        storeFrom: number | null
        storeTo: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentElementUpdateResult>({
        method: 'catalog.document.element.update',
        params: {
          id: 148,
          fields: {
            amount: 12,
            purchasingPrice: 1180,
            storeTo: 2,
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
              id: 148,
              fields: {
                amount: 12,
                purchasingPrice: 1180,
                storeTo: 2,
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

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.element.update',
                [
                    'id' => 148,
                    'fields' => [
                        'amount' => 12,
                        'purchasingPrice' => 1180,
                        'storeTo' => 2,
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
        echo 'Error updating document element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.update',
        {
            id: 148,
            fields: {
                amount: 12,
                purchasingPrice: 1180,
                storeTo: 2
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
            'id' => 148,
            'fields' => [
                'amount' => 12,
                'purchasingPrice' => 1180,
                'storeTo' => 2,
            ],
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
    "result": {
        "documentElement": {
            "amount": 12,
            "docId": 64,
            "elementId": 312,
            "id": 148,
            "purchasingPrice": 1180,
            "storeFrom": null,
            "storeTo": 2
        }
    },
    "time": {
        "start": 1759482203.22173,
        "finish": 1759482203.33928,
        "duration": 0.11754989624023438,
        "processing": 0.02244114875793457,
        "date_start": "2025-11-02T12:23:23+03:00",
        "date_finish": "2025-11-02T12:23:23+03:00",
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
|| **documentElement**
[`catalog_document_element`](../../data-types.md#catalog_document_element) | Обновленные данные товара документа. ||
|| **time**
[`time`](../../../data-types.md#time) | Служебная информация о времени обработки запроса. ||
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
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_DOCUMENT_RIGHTS` | Access denied | Недостаточно прав на изменение документа или просмотр складов ||
|| `ERROR_DOCUMENT_STATUS` | Document not found / Conducted document | Позиция не найдена, документ удален, недоступен или уже проведен ||
|| `0` | Error of modifying new document | Внутренняя ошибка при сохранении ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-get-fields.md)
