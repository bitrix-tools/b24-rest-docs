# Как создать задачу с прикрепленным файлом

> Scope: [`disk`, `tasks`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с доступом к разделам диск и задачи

В Битрикс24 есть два типа файловых полей: 

* **Файл.** Поле не связано с диском, в него файлы загружаются напрямую, через [строку формата Base64](../../api-reference/files/how-to-upload-files.md)
* **Файл (диск).** Поле связано с диском, в поле хранится ID объекта диска. Формат Bаse64 в поле не обрабатывается, поэтому сначала файл необходимо загрузить на диск Битрикс24

Чтобы создать задачу с  файлом, последовательно выполним два метода:

1. [disk.folder.uploadfile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на диск
2. [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) — метод создает задачу
   
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
## 2.  Создаем задачу с файлом

Для создания задачи используем метод [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) с параметрами:

* `UF_TASK_WEBDAV_FILES` — укажем значение `n6687`. Это ID файла из результата предыдущего метода, к которому добавляем префикс `n` для загрузки файла в поле
* `TITLE`  — название задачи, обязательное поле. Без названия задача не будет создана
* `CREATED_BY`  —  ID постановщика задачи, поле не может быть пустым. Если его не заполнить, постановщиком автоматически станет тот, кто отправляет запрос
* `RESPONSIBLE_ID`  —  ID исполнителя задачи, обязательное поле. Без исполнителя задача не будет создана

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'tasks.task.add',
        {
            fields: {
                TITLE: 'task for test',
                RESPONSIBLE_ID: 1,
                UF_TASK_WEBDAV_FILES: [
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
        'tasks.task.add',
        [
            'fields' => [
                'TITLE' => 'task for test',
                'RESPONSIBLE_ID' => 1,
                'UF_TASK_WEBDAV_FILES' => [
                    'n6687'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Мы создали задачу с ID `3711`. 

```json
{
    "result": {
        "task": {
            "id": "3711",
            "parentId": null,
            "title": "task for test",
            "description": "",
            "mark": null,
            "priority": "1",
            "multitask": "N",
            "notViewed": "N",
            "replicate": "N",
            "stageId": "0",
            "createdBy": "1",
            "createdDate": "2024-11-02T10:06:08+02:00",
            "responsibleId": "1",
            "changedBy": "1",
            "changedDate": "2024-11-02T10:06:08+02:00",
            "statusChangedBy": null,
            "closedBy": null,
            "closedDate": null,
            "activityDate": "2024-11-02T10:06:08+02:00",
            "dateStart": null,
            "deadline": null,
            "startDatePlan": null,
            "endDatePlan": null,
            "guid": "{c2794da9-c7fe-404d-a709-ddab4578717a}",
            "xmlId": null,
            "commentsCount": null,
            "serviceCommentsCount": null,
            "allowChangeDeadline": "N",
            "allowTimeTracking": "N",
            "taskControl": "N",
            "addInReport": "N",
            "forkedByTemplateId": null,
            "timeEstimate": "0",
            "timeSpentInLogs": null,
            "matchWorkTime": "N",
            "forumTopicId": null,
            "forumId": null,
            "siteId": "s1",
            "subordinate": "Y",
            "exchangeModified": null,
            "exchangeId": null,
            "outlookVersion": "1",
            "viewedDate": null,
            "sorting": null,
            "durationFact": null,
            "isMuted": "N",
            "isPinned": "N",
            "isPinnedInGroup": "N",
            "flowId": null,
            "descriptionInBbcode": "Y",
            "status": "2",
            "statusChangedDate": "2024-11-02T10:06:08+02:00",
            "durationPlan": null,
            "durationType": "days",
            "favorite": "N",
            "groupId": "0",
            "auditors": [],
            "accomplices": [],
            "checklist": [],
            "group": [],
            "creator": {
                "id": "1",
                "name": "Viola",
                "link": "/company/personal/user/1/",
                "icon": "https://your-domain.bitrix24.com/b13743910/resize_cache/2267/c0120a8d7c10d63c83e32398d1ec4d9e/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/d5fb56b94dc2c3cd8c006a2c595a4895.jpg",
                "workPosition": ""
            },
            "responsible": {
                "id": "1",
                "name": "Viola",
                "link": "/company/personal/user/1/",
                "icon": "https://your-domain.bitrix24.com/b13743910/resize_cache/2267/c0120a8d7c10d63c83e32398d1ec4d9e/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/d5fb56b94dc2c3cd8c006a2c595a4895.jpg",
                "workPosition": ""
            },
            "accomplicesData": [],
            "auditorsData": [],
            "newCommentsCount": 0,
            "action": {
                "accept": false,
                "decline": false,
                "complete": true,
                "approve": false,
                "disapprove": false,
                "start": true,
                "pause": false,
                "delegate": true,
                "remove": true,
                "edit": true,
                "defer": true,
                "renew": false,
                "create": true,
                "changeDeadline": true,
                "checklistAddItems": true,
                "addFavorite": true,
                "deleteFavorite": false,
                "rate": true,
                "edit.originator": false,
                "checklist.reorder": true,
                "elapsedtime.add": true,
                "dayplan.timer.toggle": false,
                "edit.plan": true,
                "checklist.add": true,
                "favorite.add": true,
                "favorite.delete": false
            },
            "checkListTree": {
                "nodeId": 0,
                "fields": {
                    "id": null,
                    "copiedId": null,
                    "entityId": null,
                    "userId": 1,
                    "createdBy": null,
                    "parentId": null,
                    "title": "",
                    "sortIndex": null,
                    "displaySortIndex": "",
                    "isComplete": false,
                    "isImportant": false,
                    "completedCount": 0,
                    "members": [],
                    "attachments": []
                },
                "action": [],
                "descendants": []
            },
            "checkListCanAdd": true
        }
    }
}
```
В полученном результате нет информации о файлах задачи. Чтобы проверить, успешно ли прикрепился файл к задаче, выполним метод  [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) с указанием поля  `UF_TASK_WEBDAV_FILES` в `SELECT`.

В результате [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) получим ID записи о прикреплении файла диска к задаче —  это ID связи, которая соединяет задачу и файл диска. Для получения информации о файле по ID связи используем метод [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md). 

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
                    createTaskWithFile(fileId);
                }
            }
        );
    }

    // Функция для создания задачи с прикрепленным файлом
    function createTaskWithFile(fileId) {
        // Параметры задачи
        var taskTitle = 'ваше_название_задачи';
        var taskDescription = 'ваше_описание_задачи';
        var responsibleId = 'ваш_ID_ответственного';

        // Вызываем метод tasks.task.add
        BX24.callMethod(
            'tasks.task.add',
            {
                fields: {
                    TITLE: taskTitle,
                    DESCRIPTION: taskDescription,
                    RESPONSIBLE_ID: responsibleId,
                    UF_TASK_WEBDAV_FILES: ['n' + fileId] // Добавляем префикс 'n' к ID файла
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при создании задачи:', result.error());
                } else {
                    console.log('Задача успешно создана!', result.data());
                }
            }
        );
    }

    // Вызов функции для загрузки файла и создания задачи
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
            createTaskWithFile($fileId);
        }
    }

    // Функция для создания задачи с прикрепленным файлом
    function createTaskWithFile($fileId) {
        // Параметры задачи
        $taskTitle = 'ваше_название_задачи';
        $taskDescription = 'ваше_описание_задачи';
        $responsibleId = 'ваш_ID_ответственного';

        // Вызываем метод tasks.task.add
        $result = CRest::call(
            'tasks.task.add',
            [
                'fields' => [
                    'TITLE' => $taskTitle,
                    'DESCRIPTION' => $taskDescription,
                    'RESPONSIBLE_ID' => $responsibleId,
                    'UF_TASK_WEBDAV_FILES' => ['n' . $fileId] // Добавляем префикс 'n' к ID файла
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при создании задачи: ' . $result['error'];
        } else {
            echo 'Задача успешно создана!';
        }
    }

    // Вызов функции для загрузки файла и создания задачи
    uploadFileToDisk();
    ```

{% endlist %}

## Продолжить изучение

* [Как загрузить файл в задачу](./how-to-upload-file-to-task.md)






