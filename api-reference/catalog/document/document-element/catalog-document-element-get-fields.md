# Получить список полей товаров для документа складского учета catalog.document.element.getFields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр и выбор склада»

Метод `catalog.document.element.getFields` возвращает описание полей товарной позиции документа складского учета: тип, обязательность и доступность для изменения.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.element.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.getFields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldDescription = {
      isImmutable: boolean
      isReadOnly: boolean
      isRequired: boolean
      type: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentElementFieldsResult = {
      documentElement: Record<string, FieldDescription>
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentElementFieldsResult>({
        method: 'catalog.document.element.getFields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(
          Object.keys(result.documentElement),
          result.documentElement
        )
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
      async function getDocumentElementFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.element.getFields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(
            Object.keys(result.documentElement),
            result.documentElement
          )
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDocumentElementFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.document.element.get_fields().response
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
                'catalog.document.element.getFields',
                []
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
        'catalog.document.element.getFields',
        {},
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
        'catalog.document.element.getFields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.element.getFields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.document.element.getFields: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "documentElement".
    raw, ok := b24.Unwrap(res.Result, "documentElement")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа documentElement")
    }

    fmt.Printf("%s\n", raw)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "documentElement": {
            "amount": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "double"
            },
            "docId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            },
            "elementId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            },
            "purchasingPrice": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "double"
            },
            "storeFrom": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            },
            "storeTo": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1793884083,
        "finish": 1793884083.308822,
        "duration": 0.3088219165802002,
        "processing": 0,
        "date_start": "2026-11-05T16:08:03+03:00",
        "date_finish": "2026-11-05T16:08:03+03:00",
        "operating_reset_at": 1793884680,
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
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [catalog_document_element](../../data-types.md#catalog_document_element), а `value` — объект типа [rest_field_description](../../data-types.md#rest_field_description).

Метаданные не все совпадают с поведением методов: `docId` отмечено как необязательное, но без него [catalog.document.element.add](./catalog-document-element-add.md) вернет ошибку `Document not found`. Поля `docId` и `elementId` с `isImmutable: true` можно задать только при добавлении, [catalog.document.element.update](./catalog-document-element-update.md) их пропускает ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_DOCUMENT_RIGHTS",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_DOCUMENT_RIGHTS` | Access denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр и выбор склада» ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-update.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-delete.md)
