# Как создать комментарий в задаче и прикрепить к нему файл

> Scope: [`disk`, `tasks`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с доступом к разделам диск и задачи

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 есть два типа файловых полей: 

* **Файл.** Поле не связано с диском, в него файлы загружаются напрямую, через [строку формата Base64](../../api-reference/files/how-to-upload-files.md)
* **Файл (диск).** Поле связано с диском, в поле хранится ID объекта диска. Формат Bаse64 в поле не обрабатывается, поэтому сначала файл необходимо загрузить на диск Битрикс24

Комментарии задачи хранятся в чате задачи. Чтобы создать комментарий с файлом, последовательно выполним методы:

1. [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на диск
2. [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) — метод возвращает `chatId` чата задачи
3. [im.disk.file.commit](../../api-reference/chats/files/im-disk-file-commit.md) — метод прикрепляет файл диска к чату задачи вместе с текстом комментария

## 1. Загружаем файл на диск Битрикс24

Для загрузки файла на диск используем метод [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

* `id` — укажем значение `1739` — идентификатор папки диска, в которую загружаем файл
* `data` — укажем имя файла `NAME`, с этим именем файл сохранится на диске Битрикс24
* `fileContent` — передаем файл в формате ['имя_файла.расширение', 'файл в виде строки, закодированной в Base64']

Загрузка файла на диск — необходимый шаг, так как метод [im.disk.file.commit](../../api-reference/chats/files/im-disk-file-commit.md) прикрепляет к комментарию только файлы, уже загруженные на диск Битрикс24.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    const response = await $b24.actions.v2.call.make({
        method: 'disk.folder.uploadfile',
        params: {
            id: 1739,
            data: {
                NAME: 'file.pdf'
            },
            fileContent: [
                'file555.pdf',
                '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
            ]
        },
        requestId: 'disk-uploadfile'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const result = response.getData().result
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $result = $serviceBuilder->getDiskScope()->folder()->uploadFile(
        1739,
        ['NAME' => 'file.pdf'],
        [
            'file555.pdf',
            '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
        ]
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    response = client.disk.folder.uploadfile(
        bitrix_id=1739,
        data={
            "NAME": "file.pdf",
        },
        file_content=[
            "file555.pdf",
            "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q==",
        ],
    ).response
    ```

{% endlist %}

В результате загрузки файла на диск получили два разных значения ID файла:

* `FILE_ID`: `28073` —  внутреннее значение ID файла
* `ID`: `6687` —  ID объекта диска, это значение используем в методах для работы с полями типа «файл (диск)»
Если в запросе для изменения поля «файл (диск)» передать значение `FILE_ID`, файл либо не прикрепится к задаче, поскольку нет объекта диска с таким ID, либо прикрепится не тот файл

```json
{
    "result": {
        "ID": 6687,
        "NAME": "file.pdf",
        "CODE": null,
        "STORAGE_ID": "1",
        "TYPE": "file",
        "PARENT_ID": "1739",
        "DELETED_TYPE": 0,
        "GLOBAL_CONTENT_VERSION": 1,
        "FILE_ID": 28073,
        "SIZE": "405559",
        "CREATE_TIME": "2024-11-01T17:00:55+03:00",
        "UPDATE_TIME": "2024-11-01T17:00:55+03:00",
        "DELETE_TIME": null,
        "CREATED_BY": "1",
        "UPDATED_BY": "1",
        "DELETED_BY": null,
        "DOWNLOAD_URL": "https://your-domain.bitrix24.com/rest/download.json?sessid=9dd90ed5a58ccc41af81f5f0043739db&token=disk%7CaWQ9NjY4NyZfPTJ5ZXdvN2Fsb09SMGw1b0FHTkRMSGR5MFJkN1pLTjNS%7CImRvd25sb2FkfGRpc2t8YVdROU5qWTROeVpmUFRKNVpYZHZOMkZzYjA5U01HdzFiMEZIVGtSTVNHUjVNRkprTjFwTFRqTlN8OWRkOTBlZDVhNThjY2M0MWFmODFmNWYwMDQzNzM5ZGIi.Lup1vDbibL6twiCPfCMFnLSoDLleNX0cfMHGv5PFaJw%3D",
        "DETAIL_URL": "https://your-domain.bitrix24.com/company/personal/user/1/disk/file/Созданные файлы/Новая папка для теста процесса/file.pdf"
    }
}
```

## 2. Получаем chatId чата задачи

Чтобы прикрепить файл к комментарию, нужен идентификатор чата задачи. Получим его методом [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) с параметрами:

* `taskId`  — ID задачи. Для получения ID задачи используем метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
* `select`  —  укажем поле `CHAT_ID`, метод [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) не вернет идентификатор чата без `CHAT_ID` в `select`

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'tasks.task.get',
        params: {
            taskId: 3711,
            select: ['ID', 'CHAT_ID']
        },
        requestId: 'task-get'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const chatId = response.getData().result.task.chatId
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

    $chatId = $task['chatId'];
    ```

- Python

    ```python
    task = client.tasks.task.get(
        bitrix_id=3711,
        select=["ID", "CHAT_ID"],
    ).response.result["task"]

    chat_id = task["chatId"]
    ```

{% endlist %}

В результате получили `chatId` чата задачи.

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

## 3. Создаем комментарий с файлом

Метод [im.disk.file.commit](../../api-reference/chats/files/im-disk-file-commit.md) добавляет файл диска в чат задачи отдельным сообщением — это и есть комментарий с файлом. Используем параметры:

* `CHAT_ID`  — `chatId` чата задачи из результата предыдущего метода
* `FILE_ID`  —  ID объекта диска `6687` из результата метода [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md)
* `MESSAGE`  —  текст комментария, который будет отправлен вместе с файлом

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'im.disk.file.commit',
        params: {
            CHAT_ID: 861,
            FILE_ID: 6687,
            MESSAGE: 'comment for test'
        },
        requestId: 'im-disk-file-commit'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const result = response.getData().result
    ```

- PHP

    ```php
    $result = $serviceBuilder->getIMScope()->disk()->commitFile(
        chatId: 861,
        fileId: 6687,
        message: 'comment for test'
    );
    ```

- Python

    ```python
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    result = token.call_method(
        "im.disk.file.commit",
        {
            "CHAT_ID": 861,
            "FILE_ID": 6687,
            "MESSAGE": "comment for test",
        },
    )
    ```

{% endlist %}

Комментарий с файлом создан. Метод возвращает `MESSAGE_ID` сообщения в чате задачи и `DISK_ID` файла, добавленного в чат.

```json
{
    "result": {
        "FILES": {
            "disk1899": {
                "id": 1903,
                "chatId": 861,
                "type": "file",
                "name": "file.pdf",
                "extension": "pdf",
                "size": 70,
                "status": "done",
                "authorId": 1
            }
        },
        "DISK_ID": [
            1903
        ],
        "MESSAGE_ID": 6175
    }
}
```

Поле `MESSAGE_ID` — это идентификатор сообщения с файлом в чате задачи, а `DISK_ID` — идентификатор файла в чате. Комментарий с файлом отображается в чате задачи.

## Пример кода

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    // Функция для загрузки файла
    async function uploadFileToDisk() {
        // ID папки, в которую нужно загрузить файл
        const folderId = 'ID_папки';
        // Имя файла и его содержимое в формате Base64
        const fileName = 'имя_файла';
        const fileContentBase64 = 'содержимое_файла_Base64';

        // Вызываем метод disk.folder.uploadfile
        const response = await $b24.actions.v2.call.make({
            method: 'disk.folder.uploadfile',
            params: {
                id: folderId,
                data: {
                    NAME: fileName
                },
                fileContent: [
                    fileName,
                    fileContentBase64
                ]
            },
            requestId: 'disk-uploadfile'
        });

        if (!response.isSuccess) {
            console.error('Ошибка при загрузке файла:', response.getErrorMessages().join('; '));
            return;
        }

        console.log('Файл успешно загружен!', response.getData().result);
        const fileId = response.getData().result.ID; // Используем ID из результата
        await createCommentWithFile(fileId);
    }

    // Функция для создания комментария с файлом
    async function createCommentWithFile(fileId) {
        // Параметры комментария
        const taskID = 'ID_задачи';
        const commentMessage = 'текст_комментария';

        // Получаем chatId чата задачи
        const taskResponse = await $b24.actions.v2.call.make({
            method: 'tasks.task.get',
            params: {
                taskId: taskID,
                select: ['ID', 'CHAT_ID']
            },
            requestId: 'task-get'
        });

        if (!taskResponse.isSuccess) {
            console.error('Ошибка при получении задачи:', taskResponse.getErrorMessages().join('; '));
            return;
        }

        const chatId = taskResponse.getData().result.task.chatId;

        // Прикрепляем файл к чату задачи вместе с текстом комментария
        const fileResponse = await $b24.actions.v2.call.make({
            method: 'im.disk.file.commit',
            params: {
                CHAT_ID: chatId,
                FILE_ID: fileId,
                MESSAGE: commentMessage
            },
            requestId: 'im-disk-file-commit'
        });

        if (!fileResponse.isSuccess) {
            console.error('Ошибка при создании комментария:', fileResponse.getErrorMessages().join('; '));
            return;
        }

        console.log('Комментарий с файлом успешно создан!', fileResponse.getData().result);
    }

    // Вызов функции для загрузки файла и создания комментария
    await uploadFileToDisk();

    $b24.destroy();
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    // Функция для загрузки файла
    function uploadFileToDisk($serviceBuilder) {
        // ID папки, в которую нужно загрузить файл
        $folderId = 'ID_папки';
        // Имя файла, который вы хотите загрузить
        $fileName = 'имя_файла';
        // Путь к файлу на вашей файловой системе
        $filePath = '/путь/к/вашему/файлу';

        // Чтение содержимого файла и его кодирование в Base64
        $fileContentBase64 = base64_encode(file_get_contents($filePath));

        // Вызываем метод disk.folder.uploadfile
        try {
            $result = $serviceBuilder->getDiskScope()->folder()->uploadFile(
                (int)$folderId,
                ['NAME' => $fileName],
                [
                    $fileName,
                    $fileContentBase64
                ]
            );
        } catch (BaseException $e) {
            echo 'Ошибка при загрузке файла: ' . $e->getMessage();
            return;
        }

        echo 'Файл успешно загружен!';
        $fileId = $result->getId(); // Используем ID из результата
        createCommentWithFile($serviceBuilder, $fileId);
    }

    // Функция для создания комментария с файлом
    function createCommentWithFile($serviceBuilder, $fileId) {
        // Параметры комментария
        $taskID = 'ID_задачи';
        $commentMessage = 'текст_комментария';

        // Получаем chatId чата задачи
        try {
            $task = $serviceBuilder->core->call(
                'tasks.task.get',
                [
                    'taskId' => $taskID,
                    'select' => ['ID', 'CHAT_ID']
                ]
            )->getResponseData()->getResult()['task'];
        } catch (BaseException $e) {
            echo 'Ошибка при получении задачи: ' . $e->getMessage();
            return;
        }

        $chatId = $task['chatId'];

        // Прикрепляем файл к чату задачи вместе с текстом комментария
        try {
            $serviceBuilder->getIMScope()->disk()->commitFile(
                chatId: (int)$chatId,
                fileId: $fileId,
                message: $commentMessage
            );
        } catch (BaseException $e) {
            echo 'Ошибка при создании комментария: ' . $e->getMessage();
            return;
        }

        echo 'Комментарий с файлом успешно создан!';
    }

    // Вызов функции для загрузки файла и создания комментария
    uploadFileToDisk($serviceBuilder);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    webhook = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(webhook)


    def upload_file_to_drive(client):
        folder_id = 1739
        file_name = "имя_файла"
        file_content_base64 = "содержимое_файла_Base64"

        try:
            result = client.disk.folder.uploadfile(
                bitrix_id=folder_id,
                data={"NAME": file_name},
                file_content=[file_name, file_content_base64],
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка загрузки файла: {error}")
        else:
            print("Файл успешно загружен!")
            file_id = result["ID"]
            create_comment_with_file(client, file_id)


    def create_comment_with_file(client, file_id):
        task_id = "ID_задачи"
        comment_message = "текст_комментария"

        # Получаем chatId чата задачи
        try:
            task = client.tasks.task.get(
                bitrix_id=task_id,
                select=["ID", "CHAT_ID"],
            ).response.result["task"]
        except BitrixAPIError as error:
            print(f"Ошибка получения задачи: {error}")
            return

        chat_id = task["chatId"]

        # Прикрепляем файл к чату задачи вместе с текстом комментария
        try:
            webhook.call_method(
                "im.disk.file.commit",
                {
                    "CHAT_ID": chat_id,
                    "FILE_ID": file_id,
                    "MESSAGE": comment_message,
                },
            )
        except BitrixAPIError as error:
            print(f"Ошибка создания комментария: {error}")
        else:
            print("Комментарий с файлом успешно создан!")


    upload_file_to_drive(client)
    ```

{% endlist %}
