# Получить описание полей файла disk.file.getFields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.file.getFields` возвращает описание полей файла.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.getFields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldItem = {
      TYPE: string
      USE_IN_FILTER: boolean
      USE_IN_SHOW: boolean
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DiskFileFieldsResult = Record<string, FieldItem>

    try {
      const response = await $b24.actions.v2.call.make<DiskFileFieldsResult>({
        method: 'disk.file.getFields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File fields:', Object.keys(result))
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
      async function getDiskFileFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'disk.file.getFields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File fields:', Object.keys(result))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDiskFileFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.disk.file.getfields().response
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
                'disk.file.getFields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting file fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.getFields",
        {},
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.file.getFields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "disk.file.getFields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("disk.file.getFields: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "NAME": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "TYPE": {
            "TYPE": "enum",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CODE": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "STORAGE_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "PARENT_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CREATE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "UPDATE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "DELETE_TIME": {
            "TYPE": "datetime",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CREATED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "UPDATED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "DELETED_BY": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "GLOBAL_CONTENT_VERSION": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "FILE_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "SIZE": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "DELETED_TYPE": {
            "TYPE": "enum",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        }
    },
    "time": {
        "start": 1770651518,
        "finish": 1770651518.741429,
        "duration": 0.7414290904998779,
        "processing": 0,
        "date_start": "2026-02-09T16:38:38+03:00",
        "date_finish": "2026-02-09T16:38:38+03:00",
        "operating_reset_at": 1770652118,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с описанием полей файла [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`object`](../../data-types.md) | Описание поля «Идентификатор файла» ||
|| **NAME**
[`object`](../../data-types.md) | Описание поля «Название файла» ||
|| **TYPE**
[`object`](../../data-types.md) | Описание поля «Тип объекта» ||
|| **CODE**
[`object`](../../data-types.md) | Описание поля «Символьный код файла» ||
|| **STORAGE_ID**
[`object`](../../data-types.md) | Описание поля «Идентификатор хранилища» ||
|| **PARENT_ID**
[`object`](../../data-types.md) | Описание поля «Идентификатор родительской папки» ||
|| **CREATE_TIME**
[`object`](../../data-types.md) | Описание поля «Дата и время создания файла» ||
|| **UPDATE_TIME**
[`object`](../../data-types.md) | Описание поля «Дата и время последнего обновления файла» ||
|| **DELETE_TIME**
[`object`](../../data-types.md) | Описание поля «Дата и время переноса файла в корзину» ||
|| **CREATED_BY**
[`object`](../../data-types.md) | Описание поля «Идентификатор пользователя, создавшего файл» ||
|| **UPDATED_BY**
[`object`](../../data-types.md) | Описание поля «Идентификатор пользователя, изменившего файл» ||
|| **DELETED_BY**
[`object`](../../data-types.md) | Описание поля «Идентификатор пользователя, удалившего файл» ||
|| **GLOBAL_CONTENT_VERSION**
[`object`](../../data-types.md) | Описание поля «Глобальная версия содержимого» ||
|| **FILE_ID**
[`object`](../../data-types.md) | Описание поля «Внутренний идентификатор файла» ||
|| **SIZE**
[`object`](../../data-types.md) | Описание поля «Размер файла» ||
|| **DELETED_TYPE**
[`object`](../../data-types.md) | Описание поля «Статус удаления объекта» ||
|#

Каждое поле объекта `result` содержит описание со следующей структурой.

#### Структура описания поля

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../../data-types.md) | Тип данных поля. Возможные значения: `integer`, `string`, `enum`, `datetime` ||
|| **USE_IN_FILTER**
[`boolean`](../../data-types.md) | Признак доступности поля для фильтрации ||
|| **USE_IN_SHOW**
[`boolean`](../../data-types.md) | Признак наличия поля в данных файла ||
|#

## Обработка ошибок

У метода нет собственных кодов ошибок.

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-versions.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-mark-deleted.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-search.md)
- [{#T}](./disk-file-upload-version.md)
