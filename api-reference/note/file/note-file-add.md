# Загрузить файл в документ note.file.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для базы знаний документа

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.file.add` загружает файл в документ и возвращает объект файла.

{% note info "" %}

Метод не вставляет вложение в содержимое документа автоматически. Он только сохраняет файл и привязывает его к документу.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentId***
[`integer`](../../data-types.md) | Идентификатор документа, к которому нужно привязать файл.

Идентификатор можно получить методом [note.document.tree.list](../document/note-document-tree-list.md) ||
|| **fileName***
[`string`](../../data-types.md) | Имя файла с расширением.

Допустимые расширения: `png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `pdf`, `txt`, `md`, `csv`, `doc`, `docx`, `xls`, `xlsx`, `ppt`, `pptx`, `mp4`, `webm`, `mov` ||
|| **fileContent***
[`string`](../../data-types.md) | Бинарное содержимое файла в кодировке [Base64](../../files/how-to-upload-files.md).

Максимальный размер файла зависит от настройки `main.max_file_size` в Битрикс24. Если она не задана, используется ограничение `25 МиБ (25 * 1024 * 1024 байт)` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.file.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":77,"fileName":"diagram.png","fileContent":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.file.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":77,"fileName":"diagram.png","fileContent":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.file.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FileAddResult = {
      item: {
        id: number
        documentId: number
        name: string
        size: number
        mimeType: string
        assetType: string
        assetMarkdown: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FileAddResult>({
        method: 'note.file.add',
        params: {
          documentId: 77,
          fileName: 'diagram.png',
          fileContent: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File uploaded:', result.item.id, result.item.assetMarkdown)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addFile() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.file.add',
            params: {
              documentId: 77,
              fileName: 'diagram.png',
              fileContent: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File uploaded:', result.item.id, result.item.assetMarkdown)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addFile)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.file.add',
                [
                    'documentId' => 77,
                    'fileName' => 'diagram.png',
                    'fileContent' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error uploading file: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.file.add',
        {
            documentId: 77,
            fileName: 'diagram.png',
            fileContent: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
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
        'note.file.add',
        [
            'documentId' => 77,
            'fileName' => 'diagram.png',
            'fileContent' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
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
            "id": 5001,
            "documentId": 77,
            "name": "diagram.png",
            "size": 6321,
            "mimeType": "image/png",
            "assetType": "image",
            "assetMarkdown": "[[image fileId=5001]]"
        }
    },
    "time": {
        "start": 1780392000,
        "finish": 1780392000.284521,
        "duration": 0.28452086448669434,
        "processing": 0.2413930892944336,
        "date_start": "2026-06-16T12:20:00+03:00",
        "date_finish": "2026-06-16T12:20:00+03:00",
        "operating_reset_at": 1780392600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом загрузки файла ||
|| **item**
[`object`](../../data-types.md) | Объект загруженного файла ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор загруженного файла ||
|| **documentId**
[`integer`](../../data-types.md) | Идентификатор документа, к которому привязан файл ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **mimeType**
[`string`](../../data-types.md) | MIME-тип файла ||
|| **assetType**
[`string`](../../data-types.md) | Тип вложения для Markdown-блока ||
|| **assetMarkdown**
[`string`](../../data-types.md) | Готовый Markdown-блок для вставки файла в документ через [note.document.update](../document/note-document-update.md).

Перед вставкой изображения или видео блок можно дополнить параметрами масштаба и выравнивания. Подробнее о параметрах читайте в описании поля `markdown` метода [note.document.update](../document/note-document-update.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "invalid base64 payload",
                "field": "fileContent"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `documentId`
`fileName`
`fileContent` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `documentId`
`fileName`
`fileContent` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `fileContent` | Передано некорректное содержимое Base64 | Проверьте, что `fileContent` содержит непустую Base64-строку без поврежденных символов ||
|| `fileContent` | Не удалось сохранить файл | Повторите запрос позже или проверьте корректность передаваемых данных ||
|#

Код ошибки: `NOTE_FILE_TOO_LARGE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fileContent` | Размер файла превышает допустимое значение | Уменьшите размер файла или измените настройку `main.max_file_size` в Битрикс24 ||
|#

Код ошибки: `NOTE_FILE_TYPE_NOT_ALLOWED`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fileName` | Тип файла не поддерживается | Используйте файл с разрешенным расширением ||
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
|| `documentId` | Документ не найден | Проверьте, что документ существует, не архивирован и не находится в корзине ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-file-get.md)
- [{#T}](../document/note-document-update.md)
- [{#T}](./index.md)
