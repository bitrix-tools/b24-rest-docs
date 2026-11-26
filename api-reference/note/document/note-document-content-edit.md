# Изменить текст документа note.document.content.edit

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для нужного документа или базы знаний документа

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.content.edit` изменяет текст документа набором точечных замен или заменяет Markdown целиком.

Перед заменами получите актуальный текст методом [note.document.content.get](./note-document-content-get.md): значения `old` сопоставляются именно с ним. Открытые редакторы получают изменение как правку соавтора. Все замены применяются атомарно: если одна из них отклонена, документ не меняется.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **edits***
[`array`](../../data-types.md) | Массив от `1` до `50` замен [(подробное описание)](#edits).

Передавайте либо `edits`, либо `markdown` ||
|| **markdown***
[`string`](../../data-types.md) | Новый текст документа целиком в Markdown, не больше 1 048 576 байт.

Блоки из `opaqueBlocks`, которые новый текст сохраняет без изменений и в том же порядке, остаются как есть. Блоки, которых нет в новом тексте, удаляются. Изменить такой блок нельзя: метод вернет `NOTE_CONTENT_BLOCK_UNSUPPORTED`.

Передавайте либо `edits`, либо `markdown` ||
|#

### Параметр edits {#edits}

#|
|| **Название**
`тип` | **Описание** ||
|| **old***
[`string`](../../data-types.md) | Фрагмент актуального Markdown, который нужно заменить. Не может быть пустым или состоять из одних пробелов.

При сравнении не учитываются пробелы и табуляция в конце строк, переводы строк приводятся к `\n`.

Если совпадений несколько, а `replaceAll` не передан или равен `false`, метод вернет `NOTE_CONTENT_MATCH_AMBIGUOUS`. Области замен не должны пересекаться, в том числе одинаковый `old` нельзя передать в двух заменах ||
|| **new***
[`string`](../../data-types.md) | Новый фрагмент Markdown ||
|| **replaceAll**
[`boolean`](../../data-types.md) | Заменить все вхождения `old`.

По умолчанию `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.content.edit`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":42,"edits":[{"old":"Старый текст","new":"Новый текст","replaceAll":false}]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.content.edit
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":42,"edits":[{"old":"Старый текст","new":"Новый текст","replaceAll":false}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.content.edit
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v3.call.make({
        method: 'note.document.content.edit',
        params: {
          id: 42,
          edits: [{ old: 'Старый текст', new: 'Новый текст', replaceAll: false }]
        },
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
      async function editContent() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v3.call.make({
            method: 'note.document.content.edit',
            params: {
              id: 42,
              edits: [{ old: 'Старый текст', new: 'Новый текст', replaceAll: false }]
            },
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
      document.addEventListener('DOMContentLoaded', editContent)
    </script>
    ```

- Python

    У метода пока нет готовой обертки в `b24pysdk`, и он не входит в список методов REST 3.0 в SDK. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "note.document.content.edit"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 42,
                "edits": [
                    {"old": "Старый текст", "new": "Новый текст", "replaceAll": False},
                ],
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["changed"], item["markdown"])
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
            "changed": true,
            "markdown": "# Глава 1\n\nНовый текст",
            "lossless": true,
            "opaqueBlocks": [],
            "warnings": []
        }
    },
    "time": {
        "start": 1795591533,
        "finish": 1795591533.411631,
        "duration": 0.41163110733032227,
        "processing": 0,
        "date_start": "2026-11-25T10:25:33+03:00",
        "date_finish": "2026-11-25T10:25:33+03:00",
        "operating_reset_at": 1795592100,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **item**
[`object`](../../data-types.md) | Результат изменения документа [(подробное описание)](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **changed**
[`boolean`](../../data-types.md) | `true`, если документ изменился; `false`, если правка привела к тому же тексту и запись не выполнялась ||
|| **markdown**
[`string`](../../data-types.md) | Актуальный текст документа после правки, включая параллельные изменения соавторов ||
|| **lossless**
[`boolean`](../../data-types.md) | `true`, если Markdown полностью выражает содержимое документа ||
|| **opaqueBlocks**
[`array`](../../data-types.md) | Блоки, которые Markdown не может полностью выразить. Формат поля описан в [note.document.content.get](./note-document-content-get.md#opaque-blocks) ||
|| **warnings**
[`array`](../../data-types.md) | Предупреждения о преобразовании Markdown при применении правки [(подробное описание)](#warnings) ||
|#

### Объект warnings {#warnings}

#|
|| **Название**
`тип` | **Описание** ||
|| **editIndex**
[`integer`](../../data-types.md) | Номер замены из массива `edits`, начиная с `0`. Если передан `markdown` целиком — `null` ||
|| **code**
[`string`](../../data-types.md) | Код предупреждения:
- `DEGRADED_TO_PARAGRAPH` — блок не подходит под схему документа и стал абзацем со своим текстом
- `BLOCK_DROPPED` — блок не подходит под схему документа и не содержит текста, поэтому пропущен
- `INVALID_UTF8` — текст не в UTF-8, некорректные байты заменены
- `PARTIALLY_PARSED` — часть текста слишком длинная или запутанная для разбора как Markdown и сохранена простым текстом
- `LINK_DROPPED` — ссылка на недопустимый адрес удалена, текст ссылки сохранен
- `FILE_NOT_ACCESSIBLE` — файл из токена `[[file fileId=…]]` недоступен пользователю, токен сохранен как текст ||
|| **message**
[`string`](../../data-types.md) | Описание преобразования на английском языке ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "NOTE_CONTENT_MATCH_NOT_FOUND",
        "message": "Фрагмент old не найден в документе. Получите актуальный текст методом note.document.content.get и повторите правку",
        "details": {
            "editIndex": 0
        }
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#|
|| **HTTP-статус** | **Код** | **Описание** ||
|| `400` | `NOTE_CONTENT_EDIT_INVALID` | Запрос составлен неверно:
- переданы оба параметра `edits` и `markdown` или ни одного
- `edits` пустой или содержит больше 50 элементов
- в замене пустой `old`, нет `new`, `replaceAll` не логического типа, передано лишнее поле или текст не в UTF-8
- Markdown замены не соответствует схеме документа

Поле с ошибкой передается в `details.field`, номер замены — в `details.editIndex` ||
|| `409` | `NOTE_CONTENT_MATCH_NOT_FOUND` | Фрагмент `old` не найден в актуальном Markdown. Номер замены передается в `details.editIndex` ||
|| `409` | `NOTE_CONTENT_MATCH_AMBIGUOUS` | Найдено несколько вхождений `old`, а `replaceAll` не передан или равен `false`. Число совпадений передается в `details.matches`, номер замены — в `details.editIndex` ||
|| `400` | `NOTE_CONTENT_EDITS_OVERLAP` | Области нескольких замен пересекаются. Номера замен передаются в массиве `details.editIndexes` ||
|| `409` | `NOTE_CONTENT_BLOCK_UNSUPPORTED` | Замена или новый `markdown` изменяет блок из `opaqueBlocks`, либо граница `old` проходит внутри такого блока. Блок можно оставить без изменений или удалить целиком. Номер и тип блока передаются в `details.blockIndex` и `details.nodeType` ||
|| `409` | `NOTE_CONTENT_FORMAT_UNSUPPORTED` | Содержимое документа хранится в устаревшем формате, который метод не поддерживает ||
|| `400` | `NOTE_MARKDOWN_TOO_LARGE` | Текст превышает 1 048 576 байт: значение `markdown`, сумма всех `old`, сумма всех `new` или итоговый текст документа. В `details.limit` передается предел, в `details.field` — поле запроса: `markdown`, `edits[].old` или `edits[].new`. Для итогового текста поле не передается ||
|| `400` | `NOTE_CONTENT_MARKDOWN_TOO_COMPLEX` | Текст слишком сложный для обработки. В `details.reason` передается причина:
- `PARSE_BUDGET` — разбор Markdown превышает допустимые затраты
- `MATCH_LIMIT` — замены одного запроса находят больше 1000 мест, предел передается в `details.limit` ||
|| `400` | `NOTE_CONTENT_PATCH_TOO_LARGE` | Изменение слишком большое, чтобы передать его открытым редакторам документа: больше 921 600 байт. Разбейте правку на несколько вызовов. Размер и предел передаются в `details.size` и `details.limit` ||
|| `409` | `NOTE_CONTENT_TOO_LARGE` | Текущее содержимое документа на сервере слишком большое для обработки методом. Откройте документ в редакторе и повторите вызов ||
|| `409` | `NOTE_CONTENT_UNREADABLE` | Текущее состояние документа не удалось прочитать ||
|| `409` | `NOTE_CONTENT_LOCKED` | Документ занят другой операцией, и получить блокировку за отведенное время не удалось ||
|| `400` | `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION` | Документа нет, он в архиве или корзине, пользователь не может его просматривать, либо передан шаблон или служебный документ базы знаний ||
|| `403` | `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION` | Пользователь видит документ, но у него нет права «Редактирование» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-content-get.md)
- [{#T}](./note-document-update.md)
- [{#T}](../file/note-file-add.md)
