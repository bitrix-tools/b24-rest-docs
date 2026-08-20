# Как загрузить файл в задачу

> Scope: [`disk`, `task`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права на добавление файла в папку Диска, редактирование задачи и чтение файла
>
> - [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) — пользователь с правом «Добавление» для папки Диска
> - [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) — постановщик задачи или пользователь с правом редактирования задачи и чтения файла
> - [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md) — пользователь с правом «Чтение» для файла

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 есть два типа файловых полей:

- **Файл.** Поле не связано с Диском, в него файлы загружаются напрямую, через [строку формата Base64](../../api-reference/files/how-to-upload-files.md)
- **Файл (диск).** Поле связано с Диском, в поле хранится ID объекта Диска. Формат Base64 в поле не обрабатывается, поэтому сначала файл необходимо загрузить на Диск Битрикс24

Чтобы прикрепить файл в задачу, последовательно выполните два метода:

1. [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на Диск
2. [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) — метод прикрепляет файл Диска к задаче

## 1. Загружаем файл на диск Битрикс24

Для загрузки файла на Диск используем метод [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

- `id` — укажем значение `1739` — идентификатор папки Диска, в которую загружаем файл
- `data` — укажем имя файла `NAME`, с этим именем файл сохранится на Диске Битрикс24
- `fileContent` — передаем файл в формате ['имя_файла.расширение', 'файл в виде строки, закодированной в Base64']

Загрузка файла на Диск — необходимый шаг, так как поле `UF_TASK_WEBDAV_FILES` в задачах принимает только ID файлов Диска.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'disk.folder.uploadFile',
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

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

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

В результате загрузки файла на Диск получили два разных значения ID файла:

- `FILE_ID`: `28073` — внутреннее значение ID файла
- `ID`: `6687` — ID объекта Диска, это значение используем в методах для работы с полями типа «файл (диск)»

Если в запросе для изменения поля «файл (диск)» передать значение `FILE_ID`, файл либо не прикрепится к задаче, поскольку нет объекта Диска с таким ID, либо прикрепится не тот файл

```json
{
    "result": {
        "ID": 6687,
        "NAME": "ava555.jpg",
        "TYPE": "file",
        "PARENT_ID": "1739",
        "FILE_ID": 28073,
        "SIZE": "405559"
    }
}
```

## 2. Прикрепляем файл к задаче

Для прикрепления файла к задаче используем метод [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) с параметрами:

- `taskId` — ID задачи. Для получения значения ID используйте метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
- `fileId` — укажем ID файла из результата предыдущего метода `6687`

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

Мы загрузили файл в задачу и в ответ получили ID связи между файлом Диска и задачей `423`. Чтобы проверить прикрепление файла к задаче по ID связи, используем метод [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md).

```json
{
    "result": {
        "attachmentId": 423
    }
}
```

## Проверим результат

Передайте `attachmentId` из ответа метода [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) в параметр `id` метода [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md).

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'disk.attachedObject.get',
        params: {
            id: result.attachmentId
        },
        requestId: 'disk-attached-object-get'
    })

    if (!checkResponse.isSuccess) {
        throw new Error(checkResponse.getErrorMessages().join('; '))
    }

    console.log(checkResponse.getData().result)
    ```

- PHP

    ```php
    $file = $serviceBuilder->core->call(
        'disk.attachedObject.get',
        [
            'id' => $result['attachmentId']
        ]
    )->getResponseData()->getResult();

    print_r($file);
    ```

- Python

    ```python
    file = token.call_method(
        "disk.attachedObject.get",
        {
            "id": result["attachmentId"],
        },
    )["result"]

    print(file)
    ```

{% endlist %}

Метод вернет данные прикрепленного файла. Сценарий выполнен успешно, если:

- `ID` совпадает с `attachmentId` из предыдущего шага
- `OBJECT_ID` содержит идентификатор файла на Диске
- `ENTITY_TYPE` равен `tasks_task`
- `ENTITY_ID` равен идентификатору задачи
- `NAME` содержит имя прикрепленного файла

```json
{
    "result": {
        "ID": "423",
        "OBJECT_ID": "6687",
        "MODULE_ID": "tasks",
        "ENTITY_TYPE": "tasks_task",
        "ENTITY_ID": "3709",
        "NAME": "ava555.jpg",
        "SIZE": "405559"
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Ошибка** | **Причина и решение** ||
|| `ERROR_NOT_FOUND` в [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) | Папка с указанным `id` не найдена ||
|| `DISK_BASE_SERVICE_22001` | В `data.NAME` не передано имя файла ||
|| `ERROR_COULD_NOT_SAVE_FILE` | Файл не удалось сохранить. Проверьте свободное место на Диске и корректность Base64 ||
|| `ACCESS_DENIED` | Пользователь вебхука не имеет прав на добавление файла в папку или чтение файла ||
|| `wrong task id` | В `taskId` передано значение неверного типа ||
|| `Could not find value for parameter {fileId}` | Не передан обязательный параметр `fileId` ||
|| `Invalid value {value} to match with parameter {fileId}` | В `fileId` передан не `ID` объекта Диска ||
|| Пустой результат проверки через [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md) | Передан не `attachmentId` из ответа [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) ||
|#

Повторяйте сценарий с того шага, который вернул ошибку. Если файл уже загружен на Диск, не загружайте его повторно: исправьте `taskId` или `fileId` и повторите только вызов [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md).

## Продолжите изучение

- [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)
- [Загрузить файл в папку Диска disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
- [Прикрепить файл к задаче tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md)
- [Получить прикрепленный объект disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md)

