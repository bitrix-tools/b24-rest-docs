# Как загрузить файл в задачу

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

Чтобы прикрепить файл в задачу, последовательно выполните два метода:

1. [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на диск
2. [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) — метод прикрепляет файл диска к задаче
   
## 1. Загружаем файл на диск Битрикс24

Для загрузки файла на диск используем метод [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

* `id` — укажем значение `1739` — идентификатор папки диска, в которую загружаем файл
* `data` — укажем имя файла `NAME`, с этим именем файл сохранится на диске Битрикс24
* `fileContent` — передаем файл в формате ['имя_файла.расширение', 'файл в виде строки, закодированной в Base64']

Загрузка файла на диск — необходимый шаг, так как поле `UF_TASK_WEBDAV_FILES` в задачах принимает только ID файлов диска.

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
                NAME: 'ava555.jpg'
            },
            fileContent: [
                'avatar.jpg',
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
        ['NAME' => 'ava555.jpg'],
        [
            'avatar.jpg',
            '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
        ]
    );

    echo '<PRE>';
    print_r($result->getFile());
    echo '</PRE>';
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

    result = client.disk.folder.uploadfile(
        bitrix_id=1739,
        data={
            "NAME": "ava555.jpg",
        },
        file_content=[
            "avatar.jpg",
            "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q==",
        ],
    ).response.result
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
        "NAME": "ava555.jpg",
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
        "DETAIL_URL": "https://your-domain.bitrix24.com/company/personal/user/1/disk/file/Созданные файлы/Новая папка для теста процесса/ava555.jpg"
    }
}
```
## 2. Прикрепляем файл к задаче

Для прикрепления файла к задаче используем метод [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) с параметрами:

* `taskId`  —   ID задачи. Для получения значения ID используйте метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
* `fileId`  — укажем ID файла из результата предыдущего метода `6687`

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'tasks.task.files.attach',
        params: {
            taskId: 3709,
            fileId: 6687
        },
        requestId: 'task-files-attach'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const result = response.getData().result
    ```

- PHP

    ```php
    $result = $serviceBuilder->core->call(
        'tasks.task.files.attach',
        [
            'taskId' => 3709,
            'fileId' => 6687
        ]
    )->getResponseData()->getResult();

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    ```python
    result = client.tasks.task.files.attach(
        task_id=3709,
        file_id=6687,
    ).response.result
    ```

{% endlist %}

Мы загрузили файл в задачу и в ответ получили ID связи между файлом диска и задачей `423`. Чтобы проверить прикрепление файла к задаче по ID связи используем метод [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md). 

```json
{
    "result": {
        "attachmentId": 423
    },
    "time": {
        "start": 1730795703.5871601,
        "finish": 1730795703.8165951,
        "duration": 0.22943496704101562,
        "processing": 0.18604612350463867,
        "date_start": "2024-11-05T11:35:03+03:00",
        "date_finish": "2024-11-05T11:35:03+03:00",
        "operating_reset_at": 1730796303,
        "operating": 0.18602108955383301
    }
}
```

## Пример кода

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    // Функция для загрузки файла
    async function uploadFileToDisk() {
        // ID папки, в которую вы хотите загрузить файл
        const folderId = 'ваш_ID_папки';
        // Имя файла и его содержимое в формате Base64
        const fileName = 'ваше_имя_файла';
        const fileContentBase64 = 'ваше_содержимое_файла_Base64';
        // ID задачи, к которой нужно прикрепить файл
        const taskId = 'ваш_ID_задачи';

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
        await attachFileToTask(taskId, fileId);
    }

    // Функция для прикрепления файла к существующей задаче
    async function attachFileToTask(taskId, fileId) {
        // Вызываем метод tasks.task.files.attach
        const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.files.attach',
            params: {
                taskId: taskId,
                fileId: fileId
            },
            requestId: 'task-files-attach'
        });

        if (!response.isSuccess) {
            console.error('Ошибка при прикреплении файла к задаче:', response.getErrorMessages().join('; '));
            return;
        }

        console.log('Файл успешно прикреплен к задаче!', response.getData().result);
    }

    // Вызов функции для загрузки файла и прикрепления его к задаче
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
        // ID папки, в которую вы хотите загрузить файл
        $folderId = 'ваш_ID_папки';
        // Имя файла, который вы хотите загрузить
        $fileName = 'ваше_имя_файла';
        // Путь к файлу на вашей файловой системе
        $filePath = '/путь/к/вашему/файлу';

        // Чтение содержимого файла и его кодирование в Base64
        $fileContentBase64 = base64_encode(file_get_contents($filePath));

        // ID задачи, к которой нужно прикрепить файл
        $taskId = 'ваш_ID_задачи';

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
        attachFileToTask($serviceBuilder, $taskId, $fileId);
    }

    // Функция для прикрепления файла к существующей задаче
    function attachFileToTask($serviceBuilder, $taskId, $fileId) {
        // Вызываем метод tasks.task.files.attach
        try {
            $serviceBuilder->core->call(
                'tasks.task.files.attach',
                [
                    'taskId' => $taskId,
                    'fileId' => $fileId
                ]
            );
        } catch (BaseException $e) {
            echo 'Ошибка при прикреплении файла к задаче: ' . $e->getMessage();
            return;
        }

        echo 'Файл успешно прикреплен к задаче!';
    }

    // Вызов функции для загрузки файла и прикрепления его к задаче
    uploadFileToDisk($serviceBuilder);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def upload_file_to_disk(client):
        folder_id = "ваш_ID_папки"
        file_name = "ваше_имя_файла"
        file_content_base64 = "ваше_содержимое_файла_Base64"
        task_id = "ваш_ID_задачи"

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
            attach_file_to_task(client, task_id, file_id)


    def attach_file_to_task(client, task_id, file_id):
        try:
            client.tasks.task.files.attach(
                task_id=task_id,
                file_id=file_id,
            ).response
        except BitrixAPIError as error:
            print(f"Ошибка прикрепления файла к задаче: {error}")
        else:
            print("Файл успешно прикреплен к задаче!")


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    upload_file_to_disk(client)
    ```

{% endlist %}

## Продолжить изучение

* [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)

