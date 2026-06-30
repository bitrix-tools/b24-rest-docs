# Получить данные файла документа note.file.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Просмотр» для базы знаний документа

Метод `note.file.get` возвращает метаданные файла и готовый блок Markdown для вставки вложения в документ.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор файла.

Идентификатор файла можно получить в ответе метода [note.file.add](./note-file-add.md) ||
|| **documentId***
[`integer`](../../../data-types.md) | Идентификатор документа, к которому привязан файл.

Используйте тот же идентификатор документа, который передавали в метод [note.file.add](./note-file-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.file.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5001,"documentId":77}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.file.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":5001,"documentId":77,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.file.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FileGetResult = {
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
      const response = await $b24.actions.v3.call.make<FileGetResult>({
        method: 'note.file.get',
        params: {
          id: 5001,
          documentId: 77,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File info:', result.item.assetMarkdown)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getFile() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.file.get',
            params: {
              id: 5001,
              documentId: 77,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File info:', result.item.assetMarkdown)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFile)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.file.get',
                [
                    'id' => 5001,
                    'documentId' => 77,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting file info: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.file.get',
        {
            id: 5001,
            documentId: 77
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
        'note.file.get',
        [
            'id' => 5001,
            'documentId' => 77
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
        "start": 1780392300,
        "finish": 1780392300.194822,
        "duration": 0.19482207298278809,
        "processing": 0.15441107749938965,
        "date_start": "2026-06-16T12:25:00+03:00",
        "date_finish": "2026-06-16T12:25:00+03:00",
        "operating_reset_at": 1780392900,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом получения данных файла ||
|| **item**
[`object`](../../../data-types.md) | Объект с метаданными файла ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор файла ||
|| **documentId**
[`integer`](../../../data-types.md) | Идентификатор документа, к которому привязан файл.

Это тот же идентификатор документа, который передавали в метод [note.file.add](./note-file-add.md) ||
|| **name**
[`string`](../../../data-types.md) | Имя файла ||
|| **size**
[`integer`](../../../data-types.md) | Размер файла в байтах ||
|| **mimeType**
[`string`](../../../data-types.md) | MIME-тип файла ||
|| **assetType**
[`string`](../../../data-types.md) | Тип вложения для Markdown.

Возможные значения:

- `image` — изображение
- `video` — видео
- `file` — обычный файл ||
|| **assetMarkdown**
[`string`](../../../data-types.md) | Готовый блок Markdown для вставки в документ в формате `[[<assetType> fileId=<id>]]`.

Чтобы вложение появилось в документе, передайте этот блок в `markdown` через [note.document.update](../document/note-document-update.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
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
`documentId` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `id`
`documentId` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `documentId` | Документ не найден | Проверьте, что документ существует, не архивирован, не находится в корзине и доступен пользователю ||
|| `id` | Файл не найден | Проверьте, что файл существует и привязан к указанному документу ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-file-add.md)
- [{#T}](../document/note-document-update.md)
- [{#T}](./index.md)
