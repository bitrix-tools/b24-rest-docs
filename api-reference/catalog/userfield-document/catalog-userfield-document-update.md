# Изменить значения пользовательских полей документов складского учета catalog.userfield.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Просмотр» и «Создание и редактирование» для документов этого типа, а также «Просмотр каталога товаров» и «Просмотр раздела Складской учет»

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
[`string`](../../data-types.md) | Тип документа складского учета. Должен совпадать с типом документа `documentId`, иначе метод вернет ошибку.

Допустимые значения: [типы документов складского учета](../enum/catalog-enum-get-store-document-types.md) ||
|| **fieldN**
[`any`](../../data-types.md) | Значение пользовательского поля, где `N` — идентификатор пользовательского поля, например `field287`.

Идентификаторы и настройки пользовательских полей можно получить методом [userfieldconfig.list](../../crm/universal/userfieldconfig/userfieldconfig-list.md). Ключи `fieldN` для документов нужного типа также возвращает метод [catalog.userfield.document.list](./catalog-userfield-document-list.md).

Чтобы очистить значение, передайте пустую строку или `null`. Для поля с одним значением передавайте строку или число: массив в таком поле вызывает ошибку `Internal server error.` ||
|#

Метод меняет только переданные пользовательские поля. Ключи в другом формате, например коды `UF_*`, и поля, которых нет у документов этого типа, метод пропускает без ошибки. Значения можно изменить и у проведенного документа.


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":351,"fields":{"documentType":"A","field7097":"Поставка по договору № 15"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.userfield.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":351,"fields":{"documentType":"A","field7097":"Поставка по договору № 15"},"auth":"**put_access_token_here**"}' \
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
          documentId: 351,
          fields: {
            documentType: 'A',
            field7097: 'Поставка по договору № 15',
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
              documentId: 351,
              fields: {
                documentType: 'A',
                field7097: 'Поставка по договору № 15',
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.userfield.document.update(
            document_id=351,
            fields={
                "documentType": "A",
                "field7097": "Поставка по договору № 15",
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
                'catalog.userfield.document.update',
                [
                    'documentId' => 351,
                    'fields' => [
                        'documentType' => 'A',
                        'field7097' => 'Поставка по договору № 15',
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
            documentId: 351,
            fields: {
                documentType: 'A',
                field7097: 'Поставка по договору № 15'
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
            'documentId' => 351,
            'fields' => [
                'documentType' => 'A',
                'field7097' => 'Поставка по договору № 15',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result['result']['document']);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.userfield.document.update", b24.Params{
    	"documentId": 351,
    	"fields": b24.Params{
    		"documentType": "A",
    		"field7097":    "Поставка по договору № 15",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.userfield.document.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "document".
    raw, ok := b24.Unwrap(res.Result, "document")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа document")
    }

    var item struct {
    	DocumentID   b24.ID  `json:"documentId"`
    	DocumentType string  `json:"documentType"`
    	Field7097    *string `json:"field7097"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.DocumentID, item.DocumentType)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "documentId": 351,
            "documentType": "A",
            "field7097": "Поставка по договору № 15"
        }
    },
    "time": {
        "start": 1793875710,
        "finish": 1793875710.096168,
        "duration": 0.09616804122924805,
        "processing": 0,
        "date_start": "2026-11-05T13:48:30+03:00",
        "date_finish": "2026-11-05T13:48:30+03:00",
        "operating_reset_at": 1793876280,
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
|| **result.document**
[`catalog_userfield_document`](../data-types.md#catalog_userfield_document) | Объект с обновленными значениями пользовательских полей документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "The specified document does not exist"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Access Denied | У пользователя нет права «Создание и редактирование» или «Просмотр» для документов этого типа, либо права «Просмотр каталога товаров» или «Просмотр раздела Складской учет» ||
|| `400` | `0` | The specified document does not exist | Документ с указанным `documentId` не найден. Ту же ошибку метод возвращает, если в `documentId` передано не число ||
|| `400` | `100` | Could not find value for parameter {documentId} | Не передан параметр `documentId` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Required fields: documentType | В `fields` нет поля `documentType`, в том числе если `fields` пустой ||
|| `400` | `0` | The DOC_TYPE field does not match the document | Значение `documentType` не совпадает с типом документа ||
|| `400` | `0` | Internal server error. | В пользовательское поле с одним значением передан массив ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-list.md)
- [{#T}](../enum/catalog-enum-get-store-document-types.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig-list.md)
