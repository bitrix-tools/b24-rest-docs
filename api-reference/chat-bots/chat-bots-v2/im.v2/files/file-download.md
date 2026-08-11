# Получить ссылку для скачивания файла im.v2.File.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к чату

Метод `im.v2.File.download` возвращает ссылку для скачивания файла из чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dialogId***
[`string`](../../../../data-types.md) | ID диалога. Для групповых чатов — `chat{chatId}`, для личных — `{userId}` ||
|| **fileId***
[`integer`](../../../../data-types.md) | ID файла на Диске. Можно получить из ответа метода [im.v2.File.upload](./file-upload.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","fileId":138}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.File.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"dialogId":"chat5","fileId":138,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.File.download
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.v2.File.download', {
        dialogId: 'chat5',
        fileId: 138,
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
                'im.v2.File.download',
                [
                    'dialogId' => 'chat5',
                    'fileId' => 138,
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
        'im.v2.File.download',
        {
            dialogId: 'chat5',
            fileId: 138,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                const downloadUrl = result.data().downloadUrl;
                window.open(downloadUrl);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.v2.File.download',
        [
            'dialogId' => 'chat5',
            'fileId' => 138,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Download URL: ' . $result['result']['downloadUrl'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.v2.File.download", b24.Params{
    	"dialogId": "chat5",
    	"fileId":   138,
    })
    if err != nil {
    	return fmt.Errorf("im.v2.File.download: %w", err)
    }

    var item struct {
    	DownloadUrl string `json:"downloadUrl"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.DownloadUrl)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "downloadUrl": "https://**put_your_bitrix24_address**/rest/download.json?token=im%7CaW..."
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.downloadUrl**
[`string`](../../../../data-types.md) | Одноразовая ссылка для скачивания файла. Ссылка содержит авторизационный токен, повторное использование не гарантируется ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "FILE_NOT_FOUND",
    "error_description": "File not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FILE_NOT_FOUND` | File not found | Файл с таким идентификатором не найден ||
|| `ACCESS_DENIED` | Access denied | Нет доступа к чату ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./file-upload.md)
- [{#T}](../../../../chats/files/index.md)
