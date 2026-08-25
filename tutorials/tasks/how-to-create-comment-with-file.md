# Как создать комментарий в задаче и прикрепить к нему файл

> Scope: [`task`, `im`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с доступом к задаче и чату задачи
>
> - [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) — любой пользователь с доступом к задаче
> - [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md) — пользователь с доступом к чату задачи
> - [im.v2.File.download](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-download.md) — пользователь с доступом к чату задачи

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Комментарии задачи хранятся в чате задачи. Чтобы добавить комментарий с файлом, сначала получим идентификатор чата задачи, затем загрузим файл в этот чат методом [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md).

Метод [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md) загружает файл, прикрепляет его к чату и отправляет сообщение за один вызов. Загружать файл на Диск отдельным методом не нужно.

Сценарий состоит из двух шагов.

1. Получить `chatId` чата задачи методом [tasks.task.get](../../api-reference/tasks/tasks-task-get.md)
2. Отправить сообщение с файлом методом [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md)

В результате в чате задачи появится комментарий с прикрепленным файлом. Успешность операции подтверждают поля `messageId`, `chatId`, `dialogId` и `file.id` в ответе метода [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md).

## Перед началом

Для выполнения примера нужны:

- входящий вебхук со scope `task` и `im`
- `taskId` задачи. Получить идентификатор можно методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
- файл, который нужно прикрепить к комментарию
- имя файла с расширением, например `file.pdf`
- содержимое файла в формате Base64 без префикса `data:*/*;base64,`

Вебхук выполняет запросы с правами пользователя, который его создал. Не публикуйте секретный код вебхука в клиентском коде и репозиториях — храните его в переменных окружения.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1. Получаем chatId чата задачи

Чтобы отправить сообщение с файлом в чат задачи, нужен идентификатор диалога в формате `chat{chatId}`. Получим `chatId` методом [tasks.task.get](../../api-reference/tasks/tasks-task-get.md).

Используем параметры:

- `taskId` — идентификатор задачи
- `select` — массив полей, которые нужно вернуть. Укажем `ID` и `CHAT_ID`

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const taskResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.get',
        params: {
            taskId: 3711,
            select: ['ID', 'CHAT_ID']
        },
        requestId: 'task-get-chat'
    })

    if (!taskResponse.isSuccess) {
        throw new Error(taskResponse.getErrorMessages().join('; '))
    }

    const chatId = taskResponse.getData().result.task.chatId
    const dialogId = `chat${chatId}`
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    try:
        task = client.tasks.task.get(
            bitrix_id=3711,
            select=["ID", "CHAT_ID"],
        ).response.result["task"]
    except BitrixAPIError as error:
        print(f"Ошибка получения задачи: {error}")
        raise

    chat_id = task["chatId"]
    dialog_id = f"chat{chat_id}"
    ```


- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_HOOK'));

    try {
        $task = $serviceBuilder->core->call(
            'tasks.task.get',
            [
                'taskId' => 3711,
                'select' => ['ID', 'CHAT_ID']
            ]
        )->getResponseData()->getResult()['task'];
    } catch (BaseException $e) {
        echo 'Ошибка при получении задачи: ' . $e->getMessage();
        return;
    }

    $chatId = $task['chatId'];
    $dialogId = 'chat' . $chatId;
    ```
{% endlist %}

В результате получили `chatId` чата задачи. Значение `861` преобразуем в `dialogId`: `chat861`.

```json
{
    "result": {
        "task": {
            "id": "3711",
            "chatId": 861
        }
    }
}
```

## 2. Отправляем комментарий с файлом

Чтобы отправить файл в чат задачи, используем метод [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md).

Используем параметры:

- `dialogId` — идентификатор диалога в формате `chat{chatId}`. Для примера из предыдущего шага это `chat861`
- `fields.name` — имя файла с расширением
- `fields.content` — содержимое файла в формате Base64
- `fields.message` — текст комментария

{% list tabs %}

- JS

    ```javascript
    const uploadResponse = await $b24.actions.v2.call.make({
        method: 'im.v2.File.upload',
        params: {
            dialogId,
            fields: {
                name: 'file.pdf',
                content: 'SGVsbG8gV29ybGQh',
                message: 'Комментарий с файлом'
            }
        },
        requestId: 'file-upload-to-task-chat'
    })

    if (!uploadResponse.isSuccess) {
        throw new Error(uploadResponse.getErrorMessages().join('; '))
    }

    const result = uploadResponse.getData().result
    console.log(result.messageId, result.file.id)

    $b24.destroy()
    ```

- Python

    ```python
    import base64
    from pathlib import Path

    file_content = base64.b64encode(Path("file.pdf").read_bytes()).decode()

    try:
        result = token.call_method(
            "im.v2.File.upload",
            {
                "dialogId": dialog_id,
                "fields": {
                    "name": "file.pdf",
                    "content": file_content,
                    "message": "Комментарий с файлом",
                },
            },
        )["result"]
    except BitrixAPIError as error:
        print(f"Ошибка отправки комментария с файлом: {error}")
        raise

    print(result["messageId"], result["file"]["id"])
    ```


- PHP

    ```php
    try {
        $response = $serviceBuilder->core->call(
            'im.v2.File.upload',
            [
                'dialogId' => $dialogId,
                'fields' => [
                    'name' => 'file.pdf',
                    'content' => base64_encode(file_get_contents('/path/to/file.pdf')),
                    'message' => 'Комментарий с файлом',
                ],
            ]
        );
    } catch (BaseException $e) {
        echo 'Ошибка при отправке комментария с файлом: ' . $e->getMessage();
        return;
    }

    $result = $response->getResponseData()->getResult();
    echo 'Комментарий создан, MESSAGE_ID: ' . $result['messageId'];
    ```
{% endlist %}

Метод возвращает идентификатор сообщения `messageId`, идентификатор чата `chatId`, идентификатор диалога `dialogId` и данные файла в объекте `file`.

```json
{
    "result": {
        "file": {
            "id": 9817,
            "chatId": 861,
            "type": "file",
            "name": "file.pdf",
            "extension": "pdf",
            "size": 35341,
            "status": "done",
            "progress": 100,
            "authorId": 1
        },
        "messageId": 38655,
        "chatId": 861,
        "dialogId": "chat861"
    }
}
```

## Проверим результат

Откройте задачу с `id` `3711` и перейдите в комментарии. В чате задачи должно появиться сообщение `Комментарий с файлом` с прикрепленным файлом `file.pdf`.

Через REST проверьте, что задача связана с тем же чатом, в который отправлен файл, а файл доступен для скачивания.

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.get',
        params: {
            taskId: 3711,
            select: ['ID', 'CHAT_ID']
        },
        requestId: 'task-get-check'
    })

    if (!checkResponse.isSuccess) {
        throw new Error(checkResponse.getErrorMessages().join('; '))
    }

    const task = checkResponse.getData().result.task
    console.log(task.chatId)

    const fileResponse = await $b24.actions.v2.call.make({
        method: 'im.v2.File.download',
        params: {
            dialogId: result.dialogId,
            fileId: result.file.id
        },
        requestId: 'file-download-check'
    })

    if (!fileResponse.isSuccess) {
        throw new Error(fileResponse.getErrorMessages().join('; '))
    }

    console.log(fileResponse.getData().result)
    ```

- Python

    ```python
    task = client.tasks.task.get(
        bitrix_id=3711,
        select=["ID", "CHAT_ID"],
    ).response.result["task"]

    print(task["chatId"])

    file = token.call_method(
        "im.v2.File.download",
        {
            "dialogId": result["dialogId"],
            "fileId": result["file"]["id"],
        },
    )["result"]

    print(file)
    ```


- PHP

    ```php
    $task = $serviceBuilder->core->call(
        'tasks.task.get',
        [
            'taskId' => 3711,
            'select' => ['ID', 'CHAT_ID']
        ]
    )->getResponseData()->getResult()['task'];

    echo 'CHAT_ID: ' . $task['chatId'];

    $file = $serviceBuilder->core->call(
        'im.v2.File.download',
        [
            'dialogId' => $result['dialogId'],
            'fileId' => $result['file']['id'],
        ]
    )->getResponseData()->getResult();

    print_r($file);
    ```
{% endlist %}

Сценарий выполнен успешно, если `chatId` задачи совпадает с `result.chatId` ответа [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md), а в ответе загрузки есть поля:

- `result.messageId` — идентификатор сообщения в чате задачи
- `result.dialogId` — идентификатор диалога задачи
- `result.file.id` — идентификатор файла на Диске
- `result.file.status` — статус загрузки файла. Значение `done` означает, что файл загружен
- ответ [im.v2.File.download](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-download.md) содержит ссылку на скачивание файла в поле `result.downloadUrl`

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Ошибка** | **Причина и решение** ||
|| `FILE_EMPTY` | Не передано имя файла или содержимое файла. Проверьте `fields.name` и `fields.content` ||
|| `FILE_INVALID_CONTENT` | В `fields.content` передана не строка Base64 или строка с префиксом `data:*/*;base64,` ||
|| `FILE_TOO_LARGE` | Файл больше 100 МБ. Уменьшите файл или выберите другой способ передачи данных ||
|| `CHAT_NOT_FOUND` | Чат из `dialogId` не найден. Проверьте, что `chatId` получен из нужной задачи и передан с префиксом `chat` ||
|| `ACCESS_DENIED` | Пользователь вебхука не имеет доступа к задаче или чату задачи ||
|#

Повторяйте сценарий с того шага, который вернул ошибку. Если ошибку вернул [tasks.task.get](../../api-reference/tasks/tasks-task-get.md), проверьте `taskId` и права пользователя. Если ошибку вернул [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md), повторите только второй шаг.

## Что важно учитывать

- [im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md) заменяет устаревшую цепочку `im.disk.folder.get` + загрузка через Диск + `im.disk.file.commit`
- Файл передается в `fields.content` строкой Base64 без префикса `data:*/*;base64,`
- `dialogId` для чата задачи собирается из `chatId`: если `chatId` равен `861`, передайте `chat861`
- Повторный запуск примера создаст новое сообщение с файлом в чате задачи

## Продолжите изучение

- [Загрузить файл в чат im.v2.File.upload](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-upload.md)
- [Скачать файл из чата im.v2.File.download](../../api-reference/chat-bots/chat-bots-v2/im.v2/files/file-download.md)
- [Получить задачу по идентификатору tasks.task.get](../../api-reference/tasks/tasks-task-get.md)
- [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)
