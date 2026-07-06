# Обновить документ note.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для нужного документа или базы знаний документа

Метод `note.document.update` обновляет заголовок и/или содержимое документа.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [note.document.tree.list](./note-document-tree-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями, которые нужно изменить. [Описание структуры объекта](#fields) ||
|| **overwrite**
[`boolean`](../../../data-types.md) | Определяет, нужно ли принудительно перезаписать содержимое документа, если у него есть несохраненные изменения совместного редактора.

Возможные значения:

- `true` — перезаписать содержимое документа
- `false` — не перезаписывать содержимое, если есть несохраненные изменения

По умолчанию: `false`

Используйте, если передаете `fields.markdown` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../../data-types.md) | Новый заголовок документа.

Заголовок документа не должен превышать 255 символов.

Передайте `fields.title`, `fields.markdown` или оба поля сразу ||
|| **markdown**
[`string`](../../../data-types.md) | Новое содержимое документа в Markdown.

Чтобы добавить в документ файл, вставьте `assetMarkdown`, полученный методом [note.file.get](../file/note-file-get.md) или [note.file.add](../file/note-file-add.md), отдельной строкой с начала строки, без префикса и суффикса в той же строке.

Для изображений и видео блок можно дополнить параметрами `width` и `align`, например `[[image fileId=5001 width=30.98 align=left]]`.

Параметр `width` задает ширину в процентах от контейнера редактора. Значение может содержать до двух знаков после запятой. Для блока без `align` допустим диапазон от `10` до `100`, для `align=left` или `align=right` — от `10` до `70`.

Параметр `align` задает выравнивание. Возможные значения: `left`, `right`. Центрирование применяется по умолчанию, поэтому значение `center` передавать не нужно.

Максимальный размер: `1 048 576` байт.

Передайте `fields.title`, `fields.markdown` или оба поля сразу ||
|#

{% note info "" %}

Если в данный момент документ редактируют в интерфейсе, метод вернет ошибку `NOTE_DOCUMENT_HAS_UNSAVED_CHANGES`. Чтобы принудительно перезаписать содержимое, повторите запрос с `overwrite=true`. Всем активным редакторам через P&P-событие будет отправлен сигнал перезагрузить актуальное содержимое.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":77,"fields":{"title":"Глава 1 (обновлено)","markdown":"# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]"},"overwrite":false}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":77,"fields":{"title":"Глава 1 (обновлено)","markdown":"# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]"},"overwrite":false,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentUpdateResult = {
      item: {
        id: number
        collectionId: number | null
        parentId: number | null
        title: string
        markdown: string
        position: number
        createdBy: number
        updatedBy: number
        createdAt: string
        updatedAt: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentUpdateResult>({
        method: 'note.document.update',
        params: {
          id: 77,
          fields: {
            title: 'Глава 1 (обновлено)',
            markdown: '# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]',
          },
          overwrite: false,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document updated:', result.item.id, result.item.title)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateDocument() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.update',
            params: {
              id: 77,
              fields: {
                title: 'Глава 1 (обновлено)',
                markdown: '# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]',
              },
              overwrite: false,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document updated:', result.item.id, result.item.title)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDocument)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.update',
                [
                    'id' => 77,
                    'fields' => [
                        'title' => 'Глава 1 (обновлено)',
                        'markdown' => "# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]",
                    ],
                    'overwrite' => false,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.document.update',
        {
            id: 77,
            fields: {
                title: 'Глава 1 (обновлено)',
                markdown: '# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]'
            },
            overwrite: false
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.document.update',
        [
            'id' => 77,
            'fields' => [
                'title' => 'Глава 1 (обновлено)',
                'markdown' => "# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]"
            ],
            'overwrite' => false
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
        "item": {
            "id": 77,
            "collectionId": 42,
            "parentId": 10,
            "title": "Глава 1 (обновлено)",
            "markdown": "# Глава 1\n\nОбновленный текст\n\n[[image fileId=5001 width=30.98 align=left]]",
            "position": 5,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2026-04-20T12:00:00Z",
            "updatedAt": "2026-04-21T09:15:30Z"
        }
    },
    "time": {
        "start": 1780391100,
        "finish": 1780391100.266341,
        "duration": 0.266340970993042,
        "processing": 0.22421908378601074,
        "date_start": "2026-06-16T12:05:00+03:00",
        "date_finish": "2026-06-16T12:05:00+03:00",
        "operating_reset_at": 1780391700,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом обновления документа ||
|| **item**
[`object`](../../../data-types.md) | Объект документа после обновления ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор документа ||
|| **collectionId**
[`integer`](../../../data-types.md) | Идентификатор базы знаний или `null`, если документ доступен через прямой доступ к документу ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского документа или `null` ||
|| **title**
[`string`](../../../data-types.md) | Заголовок документа ||
|| **markdown**
[`string`](../../../data-types.md) | Содержимое документа в Markdown ||
|| **position**
[`integer`](../../../data-types.md) | Позиция документа среди соседних страниц ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор автора документа ||
|| **updatedBy**
[`integer`](../../../data-types.md) | Идентификатор последнего редактора документа ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания документа в UTC ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения документа в UTC ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "NOTE_EMPTY_UPDATE",
        "message": "Запрос не содержит изменяемых полей"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id`
`fields` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `id`
`overwrite` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title`
`markdown` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `title` | Заголовок документа не может быть пустым | Передайте непустую строку в поле `fields.title` ||
|| `title` | Заголовок документа не должен превышать 255 символов | Сократите значение `fields.title` ||
|#

Код ошибки: `NOTE_EMPTY_UPDATE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields.title`
`fields.markdown` | Запрос не содержит изменяемых полей | Передайте `fields.title`, `fields.markdown` или оба поля сразу ||
|#

Код ошибки: `NOTE_MARKDOWN_TOO_LARGE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `markdown` | Содержимое документа слишком большое. Максимально допустимый размер — `1 048 576` байт | Сократите содержимое `fields.markdown` ||
|#

#### Ошибка конфликта изменений

Код ошибки: `NOTE_DOCUMENT_HAS_UNSAVED_CHANGES`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `overwrite` | У документа есть несохраненные изменения. Передайте параметр `overwrite=true`, чтобы перезаписать содержимое | Повторите запрос с `overwrite=true`, если нужно принудительно заменить содержимое документа ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права редактировать документ ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Документ не найден | Проверьте, что документ существует, не архивирован и не находится в корзине ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-add.md)
- [{#T}](./note-document-archive.md)
- [{#T}](./note-document-delete.md)
- [{#T}](./index.md)
