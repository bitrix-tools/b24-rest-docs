# Получить актуальный текст документа note.document.content.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Просмотр» для базы знаний документа

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.content.get` возвращает актуальный текст документа в Markdown и блоки, которые Markdown не может полностью выразить.

В отличие от [note.document.get](./note-document-get.md), метод читает текущее состояние совместного редактора без отставания. Именно с этим текстом сравниваются значения `old` при вызове [note.document.content.edit](./note-document-content-edit.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [note.document.tree.list](./note-document-tree-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.content.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":42}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.content.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.content.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v3.call.make({
        method: 'note.document.content.get',
        params: { id: 42 },
        requestId: Text.getUuidRfc4122()
      })
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getContent() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v3.call.make({
            method: 'note.document.content.get',
            params: { id: 42 },
            requestId: B24Js.Text.getUuidRfc4122()
          })
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }
          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }
      document.addEventListener('DOMContentLoaded', getContent)
    </script>
    ```

- Python

    У метода пока нет готовой обертки в `b24pysdk`, и он не входит в список методов REST 3.0 в SDK. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "note.document.content.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 42,
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["markdown"], item["lossless"])
    except BitrixAPIError as error:
        print(f"code: {error.code}", f"message: {error.error.message}", sep="\n")
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямые HTTP-запросы, например через curl или fetch.

- BX24.js

    JS API пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямые HTTP-запросы, например через fetch.

- PHP CRest

    CRest пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямые HTTP-запросы, например через curl.

- Go

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос.

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 42,
            "markdown": "# Глава 1\n\nТекст документа",
            "lossless": true,
            "opaqueBlocks": []
        }
    },
    "time": {
        "start": 1795591363,
        "finish": 1795591363.867149,
        "duration": 0.8671491146087644,
        "processing": 0,
        "date_start": "2026-11-25T10:22:43+03:00",
        "date_finish": "2026-11-25T10:22:43+03:00",
        "operating_reset_at": 1795591920,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **item**
[`object`](../../data-types.md) | Актуальное содержимое документа [(подробное описание)](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **markdown**
[`string`](../../data-types.md) | Актуальный текст документа в Markdown ||
|| **lossless**
[`boolean`](../../data-types.md) | `true`, если Markdown полностью выражает содержимое документа; `false`, если есть неоднозначные блоки из `opaqueBlocks` ||
|| **opaqueBlocks**
[`array`](../../data-types.md) | Массив блоков, которые Markdown не может полностью выразить [(подробное описание)](#opaque-blocks) ||
|#

### Объект opaqueBlocks {#opaque-blocks}

Каждый элемент массива содержит следующие поля.

#|
|| **Название**
`тип` | **Описание** ||
|| **index**
[`integer`](../../data-types.md) | Позиция блока среди блоков верхнего уровня документа, начиная с `0` ||
|| **nodeType**
[`string`](../../data-types.md) | Тип блока редактора ||
|| **excerpt**
[`string`](../../data-types.md) | Первые 200 символов Markdown-представления блока, пробелы схлопнуты ||
|| **reasons**
[`array`](../../data-types.md) | Причины, по которым блок не выражается в Markdown без потерь.

Например: `NODE_OUTSIDE_CORE`, `LOSSY_ATTR`, `ROUNDTRIP_MISMATCH`.

После двоеточия может быть указана дополнительная деталь ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "NOTE_CONTENT_FORMAT_UNSUPPORTED",
        "message": "Содержимое документа хранится в устаревшем формате, который этот метод не поддерживает. Получите текст методом note.document.get"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#|
|| **HTTP-статус** | **Код** | **Описание** ||
|| `409` | `NOTE_CONTENT_FORMAT_UNSUPPORTED` | Содержимое документа хранится в устаревшем формате, который метод не поддерживает. Получите текст методом [note.document.get](./note-document-get.md) ||
|| `409` | `NOTE_CONTENT_TOO_LARGE` | Текущее содержимое документа на сервере слишком большое для обработки методом. Откройте документ в редакторе и повторите вызов ||
|| `400` | `NOTE_CONTENT_MARKDOWN_TOO_COMPLEX` | Разбор содержимого документа превышает допустимые затраты ||
|| `409` | `NOTE_CONTENT_UNREADABLE` | Текущее состояние документа не удалось прочитать ||
|| `400` | `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION` | Документа нет, пользователь не может его просматривать, либо передан шаблон или служебный документ базы знаний ||
|#

Метод возвращает текст и архивного документа, и документа в корзине, если пользователь может их просматривать.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-content-edit.md)
- [{#T}](./note-document-get.md)
- [{#T}](./note-document-update.md)
