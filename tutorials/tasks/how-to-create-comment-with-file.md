# Как создать комментарий в задаче и прикрепить к нему файл

> Scope: [`disk`, `tasks`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с доступом к разделам диск и задачи

В Битрикс24 есть два типа файловых полей: 

* **Файл.** Поле не связано с диском, в него файлы загружаются напрямую, через [строку формата Base64](../../api-reference/files/how-to-upload-files.md)
* **Файл (диск).** Поле связано с диском, в поле хранится ID объекта диска. Формат Bаse64 в поле не обрабатывается, поэтому сначала файл необходимо загрузить на диск Битрикс24

Чтобы создать комментарий в задаче и прикрепить к нему файл, последовательно выполним два метода:

1. [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на диск
2. [task.commentitem.add](../../api-reference/tasks/comment-item/task-comment-item-add.md) — метод создает комментарий

## 1. Загружаем файл на диск Битрикс24

Для загрузки файла на диск используем метод [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

* `id` — укажем значение `1739` — идентификатор папки диска, в которую загружаем файл
* `data` — укажем имя файла `NAME`, с этим именем файл сохранится на диске Битрикс24
* `fileContent` — передаем файл в формате ['имя_файла.расширение', 'файл в виде строки, закодированной в Base64']

Загрузка файла на диск — необходимый шаг, так как поле `UF_FORUM_MESSAGE_DOC` в комментариях принимает только ID файлов диска.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        "disk.folder.uploadfile",
        {
            id: 1739,
            data: {
                NAME: "file.pdf"
            },
            fileContent: [
                'file555.pdf',
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
                'NAME' => 'file.pdf'
            ],
            'fileContent' => [
                'file555.pdf',
                '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQDAwQDAwQEAwQ///+dAYq6YFKoAv/AFnAa6ArKv8AAtFJVppxCEAulxQ2DWgfMR//2Q=='
            ]
        ]
    );
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

## 2.  Создаем комментарий и прикрепляем к нему файл

Для создания комментария в задаче используем метод [task.commentitem.add](../../api-reference/tasks/comment-item/task-comment-item-add.md) с параметрами:

* `TASKID`  — ID задачи, обязательное поле. Без ID задачи комментарий не будет создан. Для получения ID задачи используем метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
* `AUTHOR_ID`  —  ID автора комментария. Параметр можно не передавать, тогда автором автоматически будет сотрудник, с аккаунта которого выполняется запрос
* `POST_MESSAGE`  —  текст комментария
* `UF_FORUM_MESSAGE_DOC`  —   укажем значение `n6687`. Это ID файла диска из результата предыдущего метода, к которому добавляем префикс `n` для загрузки файла в поле

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'task.commentitem.add',
        {
            TASKID: 3711,
            FIELDS: {
                POST_MESSAGE: 'comment for test',
                AUTHOR_ID: 29,
                UF_FORUM_MESSAGE_DOC: [
                    "n6687"
                ]
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.commentitem.add',
        [
            'TASKID' => 3711,
            'FIELDS' => [
                'POST_MESSAGE' => 'comment for test',
                'AUTHOR_ID' => 29,
                'UF_FORUM_MESSAGE_DOC' => [
                    'n6687'
                ]
            ]
        ]
    );
    ```

{% endlist %}

Мы создали комментарий с ID `9393`. 

```json
{
    "result": 9393
}
```

В полученном результате нет информации о файле, прикрепленном к комментарию. Чтобы проверить, успешно ли прикрепился файл, выполним метод  [task.commentitem.get](../../api-reference/tasks/comment-item/task-comment-item-get.md).

## Пример кода

{% list tabs %}

- JS

    ```javascript
    // Функция для загрузки файла
    function uploadFileToDisk() {
        // ID папки, в которую нужно загрузить файл
        var folderId = 'ID_папки';
        // Имя файла и его содержимое в формате Base64
        var fileName = 'имя_файла';
        var fileContentBase64 = 'содержимое_файла_Base64';

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
                    createCommentWithFile(fileId);
                }
            }
        );
    }

    // Функция для создания комментария с файлом
    function createCommentWithFile(fileId) {
        // Параметры комментария
        var taskID = 'ID_задачи';
        var commentMessage = 'текст_комментария';
        var authorId = 'ID_автора_комментария';

        // Вызываем метод task.commentitem.add
        BX24.callMethod(
            'task.commentitem.add',
            {
                TASKID: taskID,
                FIELDS: {
                    POST_MESSAGE: commentMessage,
                    AUTHOR_ID: authorId,
                    UF_FORUM_MESSAGE_DOC: ['n' + fileId] // Добавляем префикс 'n' к ID файла
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при создании комментария:', result.error());
                } else {
                    console.log('Комментарий успешно создан!', result.data());
                }
            }
        );
    }

    // Вызов функции для загрузки файла и создания комментария
    uploadFileToDisk();
    ```

- PHP

    ```php
    require_once('crest.php');

    // Функция для загрузки файла
    function uploadFileToDisk() {
        // ID папки, в которую нужно загрузить файл
        $folderId = 'ID_папки';
        // Имя файла, который вы хотите загрузить
        $fileName = 'имя_файла';
        // Путь к файлу на вашей файловой системе
        $filePath = '/путь/к/вашему/файлу';

        // Чтение содержимого файла и его кодирование в Base64
        $fileContentBase64 = base64_encode(file_get_contents($filePath));

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
            createCommentWithFile($fileId);
        }
    }

    // Функция для создания комментария с файлом
    function createCommentWithFile($fileId) {
        // Параметры комментария
        $taskID = 'ID_задачи';
        $commentMessage = 'текст_комментария';
        $authorId = 'ID_автора_комментария';

        // Вызываем метод task.commentitem.add
        $result = CRest::call(
            'task.commentitem.add',
            [
                'TASKID' => $taskID,
                'FIELDS' => [
                    'POST_MESSAGE' => $commentMessage,
                    'AUTHOR_ID' => $authorId,
                    'UF_FORUM_MESSAGE_DOC' => ['n' . $fileId] // Добавляем префикс 'n' к ID файла
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при создании комментария: ' . $result['error'];
        } else {
            echo 'Комментарий успешно создан!';
        }
    }

    // Вызов функции для загрузки файла и создания комментария
    uploadFileToDisk();
    ```

{% endlist %}

