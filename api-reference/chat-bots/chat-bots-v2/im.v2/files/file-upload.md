# Загрузить файл в чат im.v2.File.upload

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `im.v2.File.upload` загружает файл в чат от имени текущего пользователя. Объединяет три шага устаревшего API в один вызов: загрузку файла на диск, прикрепление к чату и отправку сообщения.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **file***
[`object`](../../../../data-types.md) | Объект с данными файла. Структура описана [ниже](#file) ||
|| **message**
[`string`](../../../../data-types.md) | Текст сообщения, отправляемого вместе с файлом ||
|#

### Параметр file {#file}

#|
|| **Название**
`Тип` | **Описание** ||
|| **name***
[`string`](../../../../data-types.md) | Имя файла с расширением ||
|| **content***
[`string`](../../../../data-types.md) | Содержимое файла в кодировке [Base64](../../../../files/how-to-upload-files.md). Максимальный размер — 100 МБ ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","file":{"name":"report.pdf","content":"SGVsbG8gV29ybGQh"},"message":"Here is the report"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.File.upload
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","file":{"name":"report.pdf","content":"SGVsbG8gV29ybGQh"},"message":"Here is the report","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.File.upload
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.v2.File.upload', {
        dialogId: 'chat5',
        file: { name: 'report.pdf', content: 'SGVsbG8gV29ybGQh' },
        message: 'Here is the report',
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
                    'file' => [
                        'name' => 'report.pdf',
                        'content' => base64_encode(file_get_contents('/path/to/report.pdf')),
                    ],
                    'message' => 'Here is the report',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.v2.File.upload',
        {
            dialogId: 'chat5',
            file: { name: 'report.pdf', content: btoa('...') },
            message: 'Here is the report',
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
            'file' => [
                'name' => 'report.pdf',
                'content' => base64_encode(file_get_contents('/path/to/report.pdf')),
            ],
            'message' => 'Here is the report',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'File ID: ' . $result['result']['file']['id'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "dialogId": "chat5",
        "chatId": 5,
        "messageId": 123,
        "file": {
            "id": 138,
            "chatId": 5,
            "name": "report.pdf",
            "extension": "pdf",
            "size": 35341
        }
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.dialogId**
[`string`](../../../../data-types.md) | ID диалога ||
|| **result.chatId**
[`integer`](../../../../data-types.md) | Числовой ID чата ||
|| **result.messageId**
[`integer`](../../../../data-types.md) | ID созданного сообщения с файлом ||
|| **result.file**
[`File`](../../entities.md#file) | Данные загруженного файла. Описание полей объекта — [File](../../entities.md#file) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "FILE_TOO_LARGE",
    "error_description": "File too large"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FILE_EMPTY` | File name or content is empty | Не указано имя или содержимое файла ||
|| `INVALID_CONTENT` | Invalid base64 content | Невалидный Base64 ||
|| `FOLDER_ERROR` | Failed to get chat folder | Не удалось получить папку чата ||
|| `UPLOAD_FAILED` | File upload failed | Ошибка загрузки файла ||
|| `SEND_FAILED` | Failed to send message | Ошибка отправки сообщения ||
|| `FILE_TOO_LARGE` | File is too large | Размер файла превышает 100 МБ ||
|| `ACCESS_DENIED` | Access denied | Нет доступа к чату ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./file-download.md)
