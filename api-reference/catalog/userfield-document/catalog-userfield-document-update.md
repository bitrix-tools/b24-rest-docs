# Изменить значения пользовательских полей документов складского учета catalog.userfield.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» на нужный тип документа

Метод `catalog.userfield.document.update` обновляет значения пользовательских полей документа складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentId***
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа складского учета. Идентификатор можно получить методом [catalog.document.list](../document/catalog-document-list.md) ||
|| **fields***
[`object`](#fields) | Поля для обновления ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentType***
[`string`](../../data-types.md) | Тип документа складского учета.

Допустимые значения: [типы документов складского учета](../enum/catalog-enum-get-store-document-types.md) ||
|| **fieldN**
[`mixed`](../../data-types.md) | Значение пользовательского поля, где `N` — идентификатор пользовательского поля, например `field287`.

Идентификаторы и настройки пользовательских полей можно получить методом [userfieldconfig.list](../../crm/universal/userfieldconfig/userfieldconfig-list.md) ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":81,"fields":{"documentType":"A","field7097":"Тестовое поле"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.userfield.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":81,"fields":{"documentType":"A","field7097":"Тестовое поле"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.userfield.document.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UpdateUserfieldDocumentResult = {
      document: {
        documentId: number
        documentType: string
        [field: string]: unknown
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<UpdateUserfieldDocumentResult>({
        method: 'catalog.userfield.document.update',
        params: {
          documentId: 81,
          fields: {
            documentType: 'A',
            field7097: 'Test field value',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.document)
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
      async function updateUserfieldDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.userfield.document.update',
            params: {
              documentId: 81,
              fields: {
                documentType: 'A',
                field7097: 'Test field value',
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
          console.info(result.document)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateUserfieldDocument)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.userfield.document.update',
                [
                    'documentId' => 81,
                    'fields' => [
                        'documentType' => 'A',
                        'field7097' => 'Тестовое поле',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result['document']);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.userfield.document.update',
        {
            documentId: 81,
            fields: {
                documentType: 'A',
                field7097: 'Тестовое поле'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.userfield.document.update',
        [
            'documentId' => 81,
            'fields' => [
                'documentType' => 'A',
                'field7097' => 'Тестовое поле',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result['result']['document']);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "document": {
            "documentId": 81,
            "documentType": "A",
            "field7097": "Тестовое поле"
        }
    },
    "time": {
        "start": 1774341924,
        "finish": 1774341924.459929,
        "duration": 0.4599289894104004,
        "processing": 0,
        "date_start": "2026-03-24T11:45:24+03:00",
        "date_finish": "2026-03-24T11:45:24+03:00",
        "operating_reset_at": 1774342524,
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
|| **document**
[`catalog_userfield_document`](../data-types.md#catalog_userfield_document) | Объект с обновленными значениями пользовательских полей документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "The specified document does not exist"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | The specified document does not exist | Документ с указанным `documentId` не найден ||
|| `0` | Access Denied | Недостаточно прав для изменения документа выбранного типа ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-list.md)
- [{#T}](../enum/catalog-enum-get-store-document-types.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig-list.md)
