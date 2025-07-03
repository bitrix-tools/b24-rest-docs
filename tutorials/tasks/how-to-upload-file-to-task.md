# Как загрузить файл в задачу

> Scope: [`disk`, `tasks`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с доступом к разделам диск и задачи

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
    BX24.callMethod(
        "disk.folder.uploadfile",
        {
            id: 1739,
            data: {
                NAME: "ava555.jpg"
            },
            fileContent: [
                'avatar.jpg',
                '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
            ]
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.folder.uploadfile',
        [
            'id' => 1739,
            'data' => [
                'NAME' => 'ava555.jpg'
            ],
            'fileContent' => [
                'avatar.jpg',
                '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
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
    BX24.callMethod(
        'tasks.task.files.attach',
        {
            taskId: 3709,
            fileId: 6687
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.files.attach',
        [
            'taskId' => 3709,
            'fileId' => 6687
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
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
    // Функция для загрузки файла
    function uploadFileToDisk() {
        // ID папки, в которую вы хотите загрузить файл
        var folderId = 'ваш_ID_папки';
        // Имя файла и его содержимое в формате Base64
        var fileName = 'ваше_имя_файла';
        var fileContentBase64 = 'ваше_содержимое_файла_Base64';
        // ID задачи, к которой нужно прикрепить файл
        var taskId = 'ваш_ID_задачи';

        // Вызываем метод disk.folder.uploadfile
        BX24.callMethod(
            'disk.folder.uploadfile',
            {
                id: folderId,
                data: {
                    NAME: fileName
                },
                fileContent: [
                    fileName,
                    fileContentBase64
                ]
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при загрузке файла:', result.error());
                } else {
                    console.log('Файл успешно загружен!', result.data());
                    var fileId = result.data().ID; // Используем ID из результата
                    attachFileToTask(taskId, fileId);
                }
            }
        );
    }

    // Функция для прикрепления файла к существующей задаче
    function attachFileToTask(taskId, fileId) {
        // Вызываем метод tasks.task.files.attach
        BX24.callMethod(
            'tasks.task.files.attach',
            {
                taskId: taskId,
                fileIds: [fileId]
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при прикреплении файла к задаче:', result.error());
                } else {
                    console.log('Файл успешно прикреплен к задаче!', result.data());
                }
            }
        );
    }

    // Вызов функции для загрузки файла и прикрепления его к задаче
    uploadFileToDisk();
    ```
    
- PHP

    ```php
    require_once('crest.php');

    // Функция для загрузки файла
    function uploadFileToDisk() {
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
        $result = CRest::call(
            'disk.folder.uploadfile',
            [
                'id' => $folderId,
                'data' => [
                    'NAME' => $fileName
                ],
                'fileContent' => [
                    $fileName,
                    $fileContentBase64
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при загрузке файла: ' . $result['error'];
        } else {
            echo 'Файл успешно загружен!';
            $fileId = $result['result']['ID']; // Используем ID из результата
            attachFileToTask($taskId, $fileId);
        }
    }

    // Функция для прикрепления файла к существующей задаче
    function attachFileToTask($taskId, $fileId) {
        // Вызываем метод tasks.task.files.attach
        $result = CRest::call(
            'tasks.task.files.attach',
            [
                'taskId' => $taskId,
                'fileIds' => [$fileId]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при прикреплении файла к задаче: ' . $result['error'];
        } else {
            echo 'Файл успешно прикреплен к задаче!';
        }
    }

    // Вызов функции для загрузки файла и прикрепления его к задаче
    uploadFileToDisk();
    ```

{% endlist %}

## Продолжить изучение

* [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)







