# Загрузить файл в чат im.v2.File.upload

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к чату

Метод `im.v2.File.upload` загружает файл в чат от имени текущего пользователя. Объединяет три шага устаревшего API в один вызов: загрузку файла на диск, прикрепление к чату и отправку сообщения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с параметрами файла и сообщения [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../../data-types.md) | Имя файла с расширением ||
|| **content***
[`string`](../../../../data-types.md) | Содержимое файла в кодировке [Base64](../../../../files/how-to-upload-files.md). Максимальный размер — 100 МБ ||
|| **message**
[`string`](../../../../data-types.md) | Текст сообщения, отправляемого вместе с файлом ||
|#

{% note info "" %}

Как подготовить значение для `fields.content`:

1. Прочитайте файл в бинарном виде.
2. Закодируйте содержимое в Base64.
3. Передайте только строку Base64, без префикса `data:*/*;base64,`.

Подробнее: [Как загружать файлы](../../../../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","fields":{"name":"report.pdf","content":"SGVsbG8gV29ybGQh","message":"Here is the report"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.File.upload
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","fields":{"name":"report.pdf","content":"SGVsbG8gV29ybGQh","message":"Here is the report"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.File.upload
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.v2.File.upload', {
        dialogId: 'chat5',
        fields: {
          name: 'report.pdf',
          content: 'SGVsbG8gV29ybGQh',
          message: 'Here is the report',
        },
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.v2.File.upload',
                [
                    'dialogId' => 'chat5',
                    'fields' => [
                        'name' => 'report.pdf',
                        'content' => base64_encode(file_get_contents('/path/to/report.pdf')),
                        'message' => 'Here is the report',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.v2.File.upload',
        {
            dialogId: 'chat5',
            fields: {
                name: 'report.pdf',
                content: btoa('...'),
                message: 'Here is the report',
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
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
        'im.v2.File.upload',
        [
            'dialogId' => 'chat5',
            'fields' => [
                'name' => 'report.pdf',
                'content' => base64_encode(file_get_contents('/path/to/report.pdf')),
                'message' => 'Here is the report',
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'File ID: '. $result['result']['file']['id'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.v2.File.upload", b24.Params{
    	"dialogId": "chat5",
    	"fields": b24.Params{
    		"name":    "report.pdf",
    		"content": "SGVsbG8gV29ybGQh",
    		"message": "Here is the report",
    	},
    })
    if err != nil {
    	return fmt.Errorf("im.v2.File.upload: %w", err)
    }

    var item struct {
    	DialogID  string `json:"dialogId"`
    	ChatID    b24.ID `json:"chatId"`
    	MessageID b24.ID `json:"messageId"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.DialogID, item.ChatID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "file": {
            "id": 9817,
            "chatId": 4415,
            "date": "2026-08-11T15:28:50+03:00",
            "type": "file",
            "name": "report.pdf",
            "extension": "pdf",
            "size": 35341,
            "image": false,
            "status": "done",
            "progress": 100,
            "authorId": 1,
            "authorName": "Иван Иванов",
            "urlPreview": "",
            "urlShow": "https://mysite.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=9817&exact=N&fileName=report.pdf",
            "urlDownload": "https://mysite.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=9817&exact=N&fileName=report.pdf",
            "viewerAttrs": {
                "viewer": "",
                "viewerType": "code",
                "src": "https://mysite.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=9817&exact=N&fileName=report.pdf",
                "objectId": "9817",
                "viewerGroupBy": "4415",
                "imChatId": 4415,
                "title": "report.pdf",
                "unifiedLink": "https://mysite.bitrix24.ru/file/5tqNA6utERA5MIWnKpFX",
                "actions": "[{\"type\":\"download\"}]"
            },
            "mediaUrl": {
                "preview": {
                    "250": ""
                }
            },
            "isTranscribable": false,
            "isVideoNote": false,
            "isVoiceNote": false
        },
        "messageId": 38655,
        "chatId": 4415,
        "dialogId": "chat4415"
    },
    "time": {
        "start": 1786451330,
        "finish": 1786451330.233862,
        "duration": 0.23386192321777344,
        "processing": 0,
        "date_start": "2026-08-11T15:28:50+03:00",
        "date_finish": "2026-08-11T15:28:50+03:00",
        "operating_reset_at": 1786451790,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.dialogId**
[`string`](../../../../data-types.md) | Идентификатор диалога ||
|| **result.chatId**
[`integer`](../../../../data-types.md) | Числовой идентификатор чата ||
|| **result.messageId**
[`integer`](../../../../data-types.md) | Идентификатор созданного сообщения с файлом ||
|| **result.file**
[`File`](../../entities.md#file) | Данные загруженного файла [(подробное описание)](#file-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект File {#file-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор файла на Диске ||
|| **chatId**
[`integer`](../../../../data-types.md) | Идентификатор чата ||
|| **date**
[`datetime`](../../../../data-types.md) | Дата загрузки файла ||
|| **type**
[`string`](../../../../data-types.md) | Тип файла: `file`, `image`, `video`, `audio` ||
|| **name**
[`string`](../../../../data-types.md) | Имя файла ||
|| **extension**
[`string`](../../../../data-types.md) | Расширение файла ||
|| **size**
[`integer`](../../../../data-types.md) | Размер файла в байтах ||
|| **image**
[`boolean`](../../../../data-types.md) | `false` для обычного файла. Для изображения — объект с шириной и высотой ||
|| **status**
[`string`](../../../../data-types.md) | Статус загрузки, например `done` ||
|| **progress**
[`integer`](../../../../data-types.md) | Прогресс загрузки в процентах ||
|| **authorId**
[`integer`](../../../../data-types.md) | Идентификатор пользователя, который загрузил файл ||
|| **authorName**
[`string`](../../../../data-types.md) | Имя пользователя, который загрузил файл ||
|| **urlPreview**
[`string`](../../../../data-types.md) | Ссылка на превью файла или пустая строка ||
|| **urlShow**
[`string`](../../../../data-types.md) | Ссылка для просмотра файла ||
|| **urlDownload**
[`string`](../../../../data-types.md) | Ссылка для скачивания файла ||
|| **viewerAttrs**
[`object`](../../../../data-types.md) | Атрибуты для встроенного просмотрщика Битрикс24 ||
|| **mediaUrl**
[`object`](../../../../data-types.md) | Ссылки на превью медиафайла по размерам ||
|| **isTranscribable**
[`boolean`](../../../../data-types.md) | Признак файла, который можно расшифровать в текст ||
|| **isVideoNote**
[`boolean`](../../../../data-types.md) | Признак видеосообщения ||
|| **isVoiceNote**
[`boolean`](../../../../data-types.md) | Признак голосового сообщения ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md).

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "FILE_TOO_LARGE",
    "error_description": "File too large"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FILE_EMPTY` | File name and content are required | Не передано имя или содержимое файла ||
|| `FILE_INVALID_CONTENT` | Invalid base64 content | Содержимое файла — не строка Base64 ||
|| `CHAT_NOT_FOUND` | CHAT_NOT_FOUND | Чат из `dialogId` не найден ||
|| `FOLDER_ERROR` | Failed to get chat folder | Не удалось получить папку чата ||
|| `UPLOAD_FAILED` | File upload failed | Ошибка загрузки файла ||
|| `SEND_FAILED` | Failed to send message | Ошибка отправки сообщения ||
|| `FILE_TOO_LARGE` | File is too large | Размер файла превышает 100 МБ ||
|| `ACCESS_DENIED` | Access denied | Нет доступа к чату ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./file-download.md)
- [{#T}](../../../../chats/files/index.md)
