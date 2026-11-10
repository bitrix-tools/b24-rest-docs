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

Сценарий состоит из трех шагов:

1. Загрузите файл на Диск методом [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
2. Передайте `ID` объекта Диска в [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md), чтобы прикрепить файл к задаче
3. Проверьте связь файла с задачей методом [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md)

В результате файл появится в существующей задаче. Проверку выполняйте после прикрепления: `attachmentId` для третьего шага возвращает метод второго шага.

## Перед началом

Для выполнения примера нужны:

- входящий вебхук со scope `disk` и `task`, созданный пользователем с правом добавления файла в папку Диска, редактирования задачи и чтения файла
- идентификатор папки Диска `folderId`, в которую нужно загрузить файл. Получите его методом [disk.storage.getChildren](../../api-reference/disk/storage/disk-storage-get-children.md) для папки в корне хранилища или [disk.folder.getChildren](../../api-reference/disk/folder/disk-folder-get-children.md) для вложенной папки. В примерах `folderId` равен `1739`
- идентификатор существующей задачи `taskId`. Получите его методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md). В примерах `taskId` равен `3709`
- файл, который нужно прикрепить к задаче, в каталоге запуска скрипта. В примерах исходное имя — `avatar.jpg`, а имя на Диске из `data.NAME` — `ava555.jpg`
- содержимое файла в виде строки Base64 без префикса `data:*/*;base64,`. Передайте в `fileContent` массив из имени файла и этой строки

Вебхук выполняет запросы с правами пользователя, который его создал. Адрес вебхука дает доступ к методам с его scope: храните его в переменных окружения сервера, не добавляйте в браузерный код и репозиторий. Для JS и PHP задайте переменную `B24_HOOK` с полным URL вебхука. Для Python задайте `B24_DOMAIN` с доменом Битрикс24 и `B24_WEBHOOK_TOKEN` со значением вида `USER_ID/TOKEN`.

Для JS-примера нужны Node.js 22 или новее и пакет `@bitrix24/b24jssdk`. Код использует ES-модули: сохраните его в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для Python-примера нужны Python 3.9 или новее и пакет `b24pysdk`. Для PHP-примера нужны PHP 8.4 или новее и пакет `bitrix24/b24phpsdk` версии `^3.0`.

Инициализируйте SDK до первого вызова метода. Разместите код инициализации и следующие фрагменты выбранного языка в одном скрипте.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { readFile } from 'node:fs/promises'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $log = new Logger('b24');
    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_HOOK'));
    ```

- Python

    ```python
    import base64
    import os
    from pathlib import Path

    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
    )
    client = Client(token)
    ```

{% endlist %}

## 1. Загружаем файл на диск Битрикс24

Для загрузки файла на Диск используем метод [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

- `id` — укажем значение `1739` — идентификатор папки Диска, в которую загружаем файл
- `data` — укажем имя файла `NAME`, с этим именем файл сохранится на Диске Битрикс24
- `fileContent` — передаем файл в формате ['имя_файла.расширение', 'файл в виде строки, закодированной в Base64']

Загрузка файла на Диск — необходимый шаг, так как поле `UF_TASK_WEBDAV_FILES` в задачах принимает только ID файлов Диска.

{% list tabs %}

- JS

    ```javascript
    const fileName = 'avatar.jpg'
    const fileBase64 = (await readFile(fileName)).toString('base64')

    const uploadResponse = await $b24.actions.v2.call.make({
        method: 'disk.folder.uploadFile',
        params: {
            id: 1739,
            data: {
                NAME: 'ava555.jpg'
            },
            fileContent: [
                fileName,
                fileBase64
            ]
        },
        requestId: 'disk-uploadfile'
    })

    if (!uploadResponse.isSuccess) {
        throw new Error(uploadResponse.getErrorMessages().join('; '))
    }

    const uploadedFile = uploadResponse.getData().result
    ```

- PHP

    ```php
    $fileName = 'avatar.jpg';
    $fileBytes = file_get_contents($fileName);
    if ($fileBytes === false) {
        throw new RuntimeException('Не удалось прочитать файл');
    }
    $fileBase64 = base64_encode($fileBytes);

    $uploadedFile = $serviceBuilder->getDiskScope()->folder()->uploadFile(
        1739,
        ['NAME' => 'ava555.jpg'],
        [
            $fileName,
            $fileBase64
        ]
    )->getFile();

    echo '<PRE>';
    print_r($uploadedFile);
    echo '</PRE>';
    ```

- Python

    ```python
    file_name = "avatar.jpg"
    file_base64 = base64.b64encode(Path(file_name).read_bytes()).decode("ascii")

    uploaded_file = client.disk.folder.uploadfile(
        bitrix_id=1739,
        data={
            "NAME": "ava555.jpg",
        },
        file_content=[
            file_name,
            file_base64,
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
- `fileId` — передайте `ID` объекта Диска из ответа предыдущего метода. В примере ответа это `6687`

{% list tabs %}

- JS

    ```javascript
    const attachResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.files.attach',
        params: {
            taskId: 3709,
            fileId: Number(uploadedFile.ID)
        },
        requestId: 'task-files-attach'
    })

    if (!attachResponse.isSuccess) {
        throw new Error(attachResponse.getErrorMessages().join('; '))
    }

    const attachment = attachResponse.getData().result
    ```

- PHP

    ```php
    // Для этого метода нет типизированной обертки, поэтому вызываем его через ядро SDK
    $attachment = $serviceBuilder->core->call(
        'tasks.task.files.attach',
        [
            'taskId' => 3709,
            'fileId' => $uploadedFile['ID']
        ]
    )->getResponseData()->getResult();

    echo '<PRE>';
    print_r($attachment);
    echo '</PRE>';
    ```

- Python

    ```python
    attachment = client.tasks.task.files.attach(
        task_id=3709,
        file_id=int(uploaded_file["ID"]),
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

Передайте `attachmentId` из ответа метода [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) в параметр `id` метода [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md). В примере ответа значение равно `423`, в коде используется идентификатор текущего прикрепления.

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'disk.attachedObject.get',
        params: {
            id: Number(attachment.attachmentId)
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
    // Для этого метода нет типизированной обертки, поэтому вызываем его через ядро SDK
    $file = $serviceBuilder->core->call(
        'disk.attachedObject.get',
        [
            'id' => $attachment['attachmentId']
        ]
    )->getResponseData()->getResult();

    print_r($file);
    ```

- Python

    ```python
    # Для этого метода нет типизированной обертки, поэтому используем прямой вызов
    file = token.call_method(
        "disk.attachedObject.get",
        {
            "id": attachment["attachmentId"],
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

Откройте задачу в Битрикс24 и проверьте, что файл `ava555.jpg` появился среди прикрепленных файлов.

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

## Что важно учитывать

Если файл уже находится на Диске, пропустите загрузку и передайте его `ID` в `fileId` метода [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md). Для другой задачи замените `taskId`. В обоих случаях проверьте права пользователя вебхука на файл и задачу.

## Продолжите изучение

- [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)
- [Загрузить файл в папку Диска disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
- [Прикрепить файл к задаче tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md)
- [Получить прикрепленный объект disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md)

