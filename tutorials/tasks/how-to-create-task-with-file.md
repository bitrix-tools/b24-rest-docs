# Как создать задачу с прикрепленным файлом

> Scope: [`disk`, `task`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права на добавление файла в папку Диска и создание задачи
>
> - [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) — пользователь с правом «Добавление» для папки Диска
> - [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) — любой пользователь
> - [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) — пользователь с доступом к задаче
> - [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md) — пользователь с правом «Чтение» для файла

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 есть два типа файловых полей:

- **Файл.** Поле не связано с Диском, в него файлы загружаются напрямую, через [строку формата Base64](../../api-reference/files/how-to-upload-files.md)
- **Файл (диск).** Поле связано с Диском, в поле хранится ID объекта Диска. Формат Base64 в поле не обрабатывается, поэтому сначала файл необходимо загрузить на Диск Битрикс24

Чтобы создать задачу с файлом, последовательно выполним два метода:

1. [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) — метод загружает файл на Диск
2. [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) — метод создает задачу

## Перед началом

Для выполнения примера нужны:

- входящий вебхук со scope `disk` и `task`
- идентификатор папки Диска `folderId`, в которую нужно загрузить файл. Получить папку можно методами [disk.storage.getchildren](../../api-reference/disk/storage/disk-storage-get-children.md) или [disk.folder.getchildren](../../api-reference/disk/folder/disk-folder-get-children.md)
- идентификатор исполнителя задачи `RESPONSIBLE_ID`
- файл, который нужно прикрепить к задаче
- имя файла с расширением, например `ava555.jpg`
- содержимое файла в формате Base64 без префикса `data:*/*;base64,`

Вебхук выполняет запросы с правами пользователя, который его создал. Не публикуйте секретный код вебхука в клиентском коде и репозиториях — храните его в переменных окружения.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

В Go-примерах предполагается, что заранее созданы `ctx` и `core`, прочитан файл в переменную `content`, известны `folderID` и `userID`, а также импортированы `base64`, `encoding/json`, `fmt`, `strconv` и `github.com/bitrix24/b24gosdk`.

## 1. Загружаем файл на Диск Битрикс24

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

- Go

    ```go
    // fileContent — это транспорт файлов в Битрикс24: массив из двух элементов,
    // [имя файла, содержимое в base64]. Тело запроса и так JSON, поэтому обычный
    // []string сериализуется ровно так, как ждет метод: ни multipart, ни ручного
    // url-кодирования не нужно. Base64 раздувает данные примерно на треть —
    // этот путь для небольших файлов.
    res, err := core.Call(ctx, "disk.folder.uploadFile", b24.Params{
        "id":          folderID,
        "data":        b24.Params{"NAME": "отчет.txt"},
        "fileContent": []string{"отчет.txt", base64.StdEncoding.EncodeToString(content)},
        // Повторный запуск примера не должен падать из-за совпадения имен.
        "generateUniqueName": true,
    })
    if err != nil {
        return fmt.Errorf("disk.folder.uploadFile: %w", err)
    }

    var file struct {
        // ID — идентификатор объекта Диска, именно его принимают поля типа
        // «файл (диск)».
        ID b24.ID `json:"ID"`
        // FILE_ID — внутренний идентификатор файла. Если подставить в поле
        // задачи его, файл либо не прикрепится, либо прикрепится чужой.
        FileID b24.ID `json:"FILE_ID"`
        Name   string `json:"NAME"`
    }
    if err := json.Unmarshal(res.Result, &file); err != nil {
        return fmt.Errorf("разбор загруженного файла: %w", err)
    }
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

## 2. Создаем задачу с файлом

Для создания задачи используем метод [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) с параметрами:

- `UF_TASK_WEBDAV_FILES` — укажем значение `n6687`. Это ID файла из результата предыдущего метода, к которому добавляем префикс `n` для загрузки файла в поле
- `TITLE` — название задачи, обязательное поле. Без названия задача не будет создана
- `RESPONSIBLE_ID` — ID исполнителя задачи, обязательное поле. Без исполнителя задача не будет создана

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'tasks.task.add',
        params: {
            fields: {
                TITLE: 'task for test',
                RESPONSIBLE_ID: 1,
                UF_TASK_WEBDAV_FILES: [
                    'n6687'
                ]
            }
        },
        requestId: 'task-add'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const result = response.getData().result
    ```

- Python

    ```python
    result = client.tasks.task.add(
        fields={
            "TITLE": "task for test",
            "RESPONSIBLE_ID": 1,
            "UF_TASK_WEBDAV_FILES": [
                "n6687",
            ],
        }
    ).response.result
    ```

- PHP

    ```php
    $result = $serviceBuilder->core->call(
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
    )->getResponseData()->getResult();

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // Префикс "n" перед идентификатором объекта диска означает «прикрепить вот
    // этот уже существующий объект». Голое число метод не примет. Поле всегда
    // массив, даже когда файл один.
    res, err = core.Call(ctx, "tasks.task.add", b24.Params{
        "fields": b24.Params{
            "TITLE":                "Задача с файлом (b24gosdk)",
            "RESPONSIBLE_ID":       userID,
            "UF_TASK_WEBDAV_FILES": []string{"n" + strconv.FormatInt(int64(file.ID), 10)},
        },
    })
    if err != nil {
        return fmt.Errorf("tasks.task.add: %w", err)
    }

    // tasks.* заворачивает ответ в объект с ключом task — в отличие от crm.*.add,
    // который отвечает голым идентификатором. И идентификатор здесь приходит
    // СТРОКОЙ ("3711"): b24.ID разбирает оба написания, обычный int — нет.
    var out struct {
        Task struct {
            ID    b24.ID `json:"id"`
            Title string `json:"title"`
        } `json:"task"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
        return fmt.Errorf("разбор созданной задачи: %w", err)
    }
    ```

{% endlist %}

Мы создали задачу с ID `3711`.

```json
{
    "result": {
        "task": {
            "id": "3711",
            "title": "task for test",
            "responsibleId": "1"
        }
    }
}
```
В полученном результате нет информации о файлах задачи. Чтобы проверить, успешно ли прикрепился файл к задаче, выполним метод [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) с указанием поля `UF_TASK_WEBDAV_FILES` в `SELECT`.

В результате [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) получим ID записи о прикреплении файла Диска к задаче — это ID связи, которая соединяет задачу и файл Диска. Для получения информации о файле по ID связи используем метод [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md).

## Проверим результат

Получим задачу методом [tasks.task.get](../../api-reference/tasks/tasks-task-get.md). В `select` нужно указать поле `UF_TASK_WEBDAV_FILES`, потому что по умолчанию системные пользовательские поля задачи не возвращаются.

{% list tabs %}

- JS

    ```javascript
    const taskCheckResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.get',
        params: {
            taskId: 3711,
            select: ['ID', 'TITLE', 'UF_TASK_WEBDAV_FILES']
        },
        requestId: 'task-get-files'
    })

    if (!taskCheckResponse.isSuccess) {
        throw new Error(taskCheckResponse.getErrorMessages().join('; '))
    }

    const task = taskCheckResponse.getData().result.task
    const attachmentId = task.ufTaskWebdavFiles[0]

    const fileCheckResponse = await $b24.actions.v2.call.make({
        method: 'disk.attachedObject.get',
        params: {
            id: attachmentId
        },
        requestId: 'disk-attached-object-get'
    })

    if (!fileCheckResponse.isSuccess) {
        throw new Error(fileCheckResponse.getErrorMessages().join('; '))
    }

    console.log(fileCheckResponse.getData().result)
    ```

- Python

    ```python
    task = client.tasks.task.get(
        bitrix_id=3711,
        select=["ID", "TITLE", "UF_TASK_WEBDAV_FILES"],
    ).response.result["task"]

    attachment_id = task["ufTaskWebdavFiles"][0]

    file = token.call_method(
        "disk.attachedObject.get",
        {
            "id": attachment_id,
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
            'select' => ['ID', 'TITLE', 'UF_TASK_WEBDAV_FILES']
        ]
    )->getResponseData()->getResult()['task'];

    $attachmentId = $task['ufTaskWebdavFiles'][0];

    $file = $serviceBuilder->core->call(
        'disk.attachedObject.get',
        [
            'id' => $attachmentId
        ]
    )->getResponseData()->getResult();

    print_r($file);
    ```

- Go

    ```go
    res, err = core.Call(ctx, "tasks.task.get", b24.Params{
        "taskId": out.Task.ID,
        "select": []string{"ID", "TITLE", "UF_TASK_WEBDAV_FILES"},
    })
    if err != nil {
        return fmt.Errorf("tasks.task.get: %w", err)
    }

    var taskCheck struct {
        Task struct {
            ID                 b24.ID   `json:"id"`
            Title              string   `json:"title"`
            UfTaskWebdavFiles  []b24.ID `json:"ufTaskWebdavFiles"`
        } `json:"task"`
    }
    if err := json.Unmarshal(res.Result, &taskCheck); err != nil {
        return fmt.Errorf("разбор задачи: %w", err)
    }
    if len(taskCheck.Task.UfTaskWebdavFiles) == 0 {
        return fmt.Errorf("у задачи нет прикрепленных файлов")
    }

    res, err = core.Call(ctx, "disk.attachedObject.get", b24.Params{
        "id": taskCheck.Task.UfTaskWebdavFiles[0],
    })
    if err != nil {
        return fmt.Errorf("disk.attachedObject.get: %w", err)
    }

    var attachment struct {
        ID         b24.ID `json:"ID"`
        ObjectID   b24.ID `json:"OBJECT_ID"`
        EntityType string `json:"ENTITY_TYPE"`
        EntityID   b24.ID `json:"ENTITY_ID"`
        Name       string `json:"NAME"`
    }
    if err := json.Unmarshal(res.Result, &attachment); err != nil {
        return fmt.Errorf("разбор прикрепленного файла: %w", err)
    }
    ```

{% endlist %}

В ответе поле `ufTaskWebdavFiles` содержит идентификаторы связей задачи с файлами Диска. Это не `ID` файла, а `ID` прикрепления.

```json
{
    "result": {
        "task": {
            "id": "3711",
            "title": "task for test",
            "ufTaskWebdavFiles": [
                423
            ]
        }
    }
}
```

Чтобы получить данные прикрепленного файла, передайте значение `423` в параметр `id` метода [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md). Успешность сценария подтверждают поля ответа:

- `ID` — идентификатор прикрепления файла к задаче
- `OBJECT_ID` — идентификатор файла на Диске
- `ENTITY_TYPE` — тип объекта, к которому прикреплен файл. Для задачи значение будет `tasks_task`
- `ENTITY_ID` — идентификатор задачи
- `NAME` — имя прикрепленного файла

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Ошибка** | **Причина и решение** ||
|| `ERROR_NOT_FOUND` в [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) | Папка с указанным `id` не найдена ||
|| `DISK_BASE_SERVICE_22001` | В `data.NAME` не передано имя файла ||
|| `ERROR_COULD_NOT_SAVE_FILE` | Файл не удалось сохранить. Проверьте свободное место на Диске и корректность Base64 ||
|| `ACCESS_DENIED` | Пользователь вебхука не имеет прав на добавление файла в папку ||
|| `ERROR_CORE` в [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) | Проверьте `TITLE`, `RESPONSIBLE_ID` и обязательные пользовательские поля задачи ||
|| Пустое `UF_TASK_WEBDAV_FILES` при проверке | В поле передан `FILE_ID` вместо `ID` объекта Диска или не добавлен префикс `n` ||
|#

Повторяйте сценарий с того шага, который вернул ошибку. Если файл уже загружен на Диск, не загружайте его повторно: исправьте параметры задачи и повторите только вызов [tasks.task.add](../../api-reference/tasks/tasks-task-add.md).

## Что важно учитывать

- В поле `UF_TASK_WEBDAV_FILES` передавайте `ID` объекта Диска из ответа [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md), а не `FILE_ID`
- При создании задачи добавляйте к `ID` объекта Диска префикс `n`, например `n6687`
- Поле `UF_TASK_WEBDAV_FILES` всегда передается массивом, даже если файл один
- Повторный запуск примера создает новую задачу и может загрузить новый файл с тем же именем, если в запросе загрузки включено создание уникального имени

## Продолжите изучение

- [Как загрузить файл в задачу](./how-to-upload-file-to-task.md)
- [Загрузить файл в папку Диска disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
- [Получить содержимое папки disk.folder.getchildren](../../api-reference/disk/folder/disk-folder-get-children.md)
- [Создать задачу tasks.task.add](../../api-reference/tasks/tasks-task-add.md)
- [Получить прикрепленный объект disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md)

