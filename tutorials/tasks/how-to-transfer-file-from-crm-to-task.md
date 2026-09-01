# Как перенести файл из поля CRM в задачу

> Scope: [`crm`, `disk`, `task`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права на чтение элемента CRM, добавление файла в папку Диска и редактирование задачи
>
> - [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM
> - [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) — пользователь с правом «Добавление» для папки Диска
> - [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) — постановщик задачи или пользователь с правом редактирования задачи и чтения файла

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Менеджер прикрепил договор к сделке, а работать с ним будет исполнитель в задаче. Скопировать файл между объектами одним вызовом нельзя: сделка и задача хранят файлы по-разному.

Файловое поле сделки — это поле типа «Файл»: в нем лежит идентификатор файла CRM. Задача устроена иначе. Вложения она хранит в поле `UF_TASK_WEBDAV_FILES` типа «Файл (диск)», а такое поле принимает только идентификатор объекта на Диске.

Это две независимые нумерации. Идентификатор из сделки для Диска ничего не значит: методы Диска вернут по нему ошибку или посторонний файл, у которого совпал номер.

Полей типа «Файл (диск)» в CRM нет, поэтому готовый идентификатор Диска в сделке взять негде. Файл переносят вручную: скачивают из сделки, загружают на Диск и уже оттуда прикрепляют к задаче.

Сценарий состоит из четырех шагов.

1. Получим ссылку на файл методом [crm.item.get](../../api-reference/crm/universal/crm-item-get.md)
2. Скачаем файл по этой ссылке обычным HTTP-запросом
3. Загрузим файл на Диск методом [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
4. Прикрепим файл к задаче методом [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md)

Сценарий показан на одном файле.

## Что нужно до начала

Подготовьте данные сценария:

- **Элемент CRM с заполненным файловым полем.** Понадобятся `entityTypeId` объекта, `id` элемента и имя поля вида `ufCrm_1688736288`. В примерах используется сделка, у нее `entityTypeId` равен `2`. Список полей вернет метод [crm.item.fields](../../api-reference/crm/universal/crm-item-fields.md), у файловых полей тип `file`
- **Задача, к которой прикрепим файл.** Понадобится `ID` задачи, его вернет метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
- **Папка на Диске для загрузки.** Понадобится `ID` папки. Хранилища и их содержимое вернут методы [disk.storage.getlist](../../api-reference/disk/storage/disk-storage-get-list.md) и [disk.storage.getchildren](../../api-reference/disk/storage/disk-storage-get-children.md)
- **Доступ к REST.** Вебхук или приложение с правами `crm`, `disk` и `task`

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Получим ссылку на файл из элемента CRM

Прочитаем сделку методом [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) с параметрами:

- `entityTypeId` — укажем `2`, идентификатор типа «сделка»
- `id` — укажем `6533`, идентификатор сделки с файлом

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: {
            entityTypeId: 2,
            id: 6533
        },
        requestId: 'crm-item-get'
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const item = response.getData().result.item
    const file = item.ufCrm_1688736288
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    # Вызов через ядро SDK: типизированная обертка не возвращает пользовательские поля
    item = token.call_method("crm.item.get", {
        "entityTypeId": 2,
        "id": 6533,
    })["result"]["item"]

    file = item["ufCrm_1688736288"]
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    // Вызов через ядро SDK: типизированная обертка не возвращает пользовательские поля
    $item = $serviceBuilder->core->call(
        'crm.item.get',
        ['entityTypeId' => 2, 'id' => 6533]
    )->getResponseData()->getResult()['item'];

    $file = $item['ufCrm_1688736288'];
    ```
{% endlist %}

В файловом поле придут три значения:

- `id` — идентификатор файла CRM. На Диске такого объекта нет, методам Диска это число передавать нельзя
- `url` — ссылка для интерфейса Битрикс24. Открывается в браузере авторизованного пользователя, интеграции не подходит
- `urlMachine` — ссылка для интеграции. Содержит токен доступа и подпись файла, поэтому скачивается обычным HTTP-запросом. Ее и берем на следующем шаге

```json
{
    "result": {
        "item": {
            "id": 6533,
            "title": "Поставка оборудования",
            "ufCrm_1688736288": {
                "id": 27807,
                "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=2&id=6533&fieldName=UF_CRM_1688736288&fileId=27807",
                "urlMachine": "https://your-domain.bitrix24.com/rest/1/xxxxxxxxxxxxxxxx/crm.controller.item.getFile/?token=xxxxxxxx"
            }
        }
    }
}
```

Если поле множественное, вместо объекта придет массив таких объектов — тогда шаги 2, 3 и 4 повторяются для каждого файла.

## 2. Скачаем файл

На этом шаге метод не вызываем: файл забираем обычным HTTP-запросом по ссылке `urlMachine`.

Отдельная авторизация запросу не нужна — токен уже внутри ссылки. Передавайте ее целиком и не разбирайте на части: набор параметров может измениться. Обычно ссылка абсолютная, но если в ответе она начинается с `/`, добавьте к ней адрес своего Битрикс24.

Дальше файл нужно закодировать в Base64 — в этом виде его принимает Диск. Как устроено кодирование, разобрано в статье [Как загрузить файлы](../../api-reference/files/how-to-upload-files.md).

{% list tabs %}

- JS

    ```javascript
    const fileResponse = await fetch(file.urlMachine)

    if (!fileResponse.ok) {
        throw new Error('Не удалось скачать файл: ' + fileResponse.status)
    }

    const buffer = Buffer.from(await fileResponse.arrayBuffer())
    const fileContent = buffer.toString('base64')
    ```

- Python

    ```python
    import base64

    import requests

    file_response = requests.get(file["urlMachine"], timeout=30)
    file_response.raise_for_status()

    file_content = base64.b64encode(file_response.content).decode()
    ```

- PHP

    ```php
    $binary = file_get_contents($file['urlMachine']);

    if ($binary === false) {
        throw new RuntimeException('Не удалось скачать файл');
    }

    $fileContent = base64_encode($binary);
    ```
{% endlist %}

Исходное имя файла приходит в заголовке `Content-Disposition`. В примерах ниже имя задается вручную, поэтому на Диске и в задаче файл будет называться так, как указано в `data.NAME`, а не так, как он назывался в сделке. Чтобы сохранить исходное имя, возьмите его из заголовка и передайте на следующем шаге.

## 3. Загрузим файл на Диск

Загрузим файл методом [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) с параметрами:

- `id` — укажем `1739`, идентификатор папки Диска
- `data` — передадим имя `NAME`, с ним файл сохранится на Диске
- `fileContent` — передадим массив из имени файла и строки Base64 с прошлого шага

{% list tabs %}

- JS

    ```javascript
    const uploadResponse = await $b24.actions.v2.call.make({
        method: 'disk.folder.uploadFile',
        params: {
            id: 1739,
            data: {
                NAME: 'contract.pdf'
            },
            fileContent: [
                'contract.pdf',
                fileContent
            ]
        },
        requestId: 'disk-uploadfile'
    })

    if (!uploadResponse.isSuccess) {
        throw new Error(uploadResponse.getErrorMessages().join('; '))
    }

    const diskFile = uploadResponse.getData().result
    ```

- Python

    ```python
    disk_file = client.disk.folder.uploadfile(
        bitrix_id=1739,
        data={
            "NAME": "contract.pdf",
        },
        file_content=[
            "contract.pdf",
            file_content,
        ],
    ).response.result
    ```

- PHP

    ```php
    $diskFile = $serviceBuilder->getDiskScope()->folder()->uploadFile(
        1739,
        ['NAME' => 'contract.pdf'],
        ['contract.pdf', $fileContent]
    )->getFile();
    ```
{% endlist %}

В ответе придут два разных идентификатора, их важно не перепутать:

- `ID` — идентификатор объекта Диска. Именно его передаем в задачу
- `FILE_ID` — внутренний идентификатор файла. В поля типа «Файл (диск)» его передавать нельзя

```json
{
    "result": {
        "ID": 6687,
        "NAME": "contract.pdf",
        "TYPE": "file",
        "PARENT_ID": "1739",
        "FILE_ID": 28073,
        "SIZE": "405559"
    }
}
```

## 4. Прикрепим файл к задаче

Прикрепим файл методом [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) с параметрами:

- `taskId` — укажем `3709`, идентификатор задачи
- `fileId` — укажем `6687`, значение `ID` из ответа предыдущего шага

{% list tabs %}

- JS

    ```javascript
    const attachResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.files.attach',
        params: {
            taskId: 3709,
            fileId: diskFile.ID
        },
        requestId: 'task-files-attach'
    })

    if (!attachResponse.isSuccess) {
        throw new Error(attachResponse.getErrorMessages().join('; '))
    }

    const attachment = attachResponse.getData().result
    ```

- Python

    ```python
    attachment = client.tasks.task.files.attach(
        task_id=3709,
        file_id=disk_file["ID"],
    ).response.result
    ```

- PHP

    ```php
    $attachment = $serviceBuilder->core->call(
        'tasks.task.files.attach',
        [
            'taskId' => 3709,
            'fileId' => $diskFile['ID']
        ]
    )->getResponseData()->getResult();
    ```
{% endlist %}

Метод вернет `attachmentId` — идентификатор связи между файлом Диска и задачей.

```json
{
    "result": {
        "attachmentId": 423
    }
}
```

## Проверим результат

Файл должен появиться в задаче. Проверить это можно двумя способами.

В интерфейсе Битрикс24 откройте задачу — файл будет в блоке вложений.

Через REST передайте `attachmentId` в параметр `id` метода [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md).

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'disk.attachedObject.get',
        params: {
            id: attachment.attachmentId
        },
        requestId: 'disk-attached-object-get'
    })

    console.log(checkResponse.getData().result)
    ```

- Python

    ```python
    check = token.call_method(
        "disk.attachedObject.get",
        {
            "id": attachment["attachmentId"],
        },
    )["result"]

    print(check)
    ```

- PHP

    ```php
    $check = $serviceBuilder->core->call(
        'disk.attachedObject.get',
        ['id' => $attachment['attachmentId']]
    )->getResponseData()->getResult();

    print_r($check);
    ```
{% endlist %}

Сценарий выполнен успешно, если:

- `ENTITY_TYPE` равен `tasks_task`
- `ENTITY_ID` равен идентификатору задачи
- `OBJECT_ID` равен `ID` файла на Диске из третьего шага
- `NAME` содержит имя, под которым файл сохранен на Диске

```json
{
    "result": {
        "ID": "423",
        "OBJECT_ID": "6687",
        "MODULE_ID": "tasks",
        "ENTITY_TYPE": "tasks_task",
        "ENTITY_ID": "3709",
        "NAME": "contract.pdf",
        "SIZE": "405559"
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` в [crm.item.get](../../api-reference/crm/universal/crm-item-get.md) | Элемента с таким `id` нет или у пользователя нет права на его чтение ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Неверный `entityTypeId`. Сверьтесь со [справочником типов объектов CRM](../../api-reference/crm/data-types.md#object_type) ||
|| В файловом поле пришло `null` | У этого элемента поле не заполнено. Возьмите элемент с файлом ||
|| Файлового поля нет в ответе | Указано неверное имя поля. Проверьте имя методом [crm.item.fields](../../api-reference/crm/universal/crm-item-fields.md) ||
|| Вместо файла скачалась HTML-страница входа | Использована ссылка `url` вместо `urlMachine` ||
|| `ERROR_NOT_FOUND` в [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md) | Папка с указанным `id` не найдена или у пользователя нет к ней доступа ||
|| `DISK_BASE_SERVICE_22001` | Не передано имя файла в `data.NAME` ||
|| `DISK_OBJ_22000` | В папке уже есть файл с таким именем. Задайте другое имя или передайте `generateUniqueName` со значением `true` ||
|| `DISK_FOLDER_22002` | Файл не удалось сохранить. Проверьте свободное место на Диске и корректность Base64 ||
|| `ERROR_CORE` с текстом «Не удалось найти файл» в [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) | В `fileId` передан не `ID` объекта Диска. Частая причина — передали `FILE_ID` или `id` файла из CRM ||
|| `ERROR_NOT_FOUND` в [disk.attachedObject.get](../../api-reference/disk/attached-object/disk-attached-object-get.md) | Передан не `attachmentId` из ответа [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) ||
|#

Если ошибки не было, а файла в задаче нет, проверьте:

- `taskId` указывает на существующую задачу. При неверном идентификаторе метод [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md) все равно вернет `attachmentId`, но файл в задаче не появится
- в `fileId` передан `ID` объекта Диска из ответа [disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md), а не `FILE_ID`
- файл загрузился в папку, к которой у пользователя есть доступ

Повторяйте сценарий с того шага, который вернул ошибку. Если файл уже загружен на Диск, не загружайте его заново: исправьте `taskId` или `fileId` и повторите только вызов [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md).

## Что важно учитывать

- Файл в поле CRM не является объектом Диска. Передать его в задачу напрямую или строкой Base64 нельзя: поле `UF_TASK_WEBDAV_FILES` принимает только идентификатор объекта Диска
- Если прикрепляете файл не методом [tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md), а записью в поле `UF_TASK_WEBDAV_FILES` — например при создании задачи методом [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) — передавайте значение в формате `n<идентификатор>`, например `["n6687"]`. Число без префикса поле не примет
- Ссылка `urlMachine` содержит токен доступа и подпись файла. Не записывайте ее в логи, не сохраняйте в базе и не передавайте третьим лицам
- Сценарий работает не только со сделками. Для другого объекта CRM поменяйте `entityTypeId`, а имя файлового поля возьмите из [crm.item.fields](../../api-reference/crm/universal/crm-item-fields.md). У смарт-процессов в имени поля появляется номер процесса, например `ufCrm_7_1739432938`
- Файл копируется, а не перемещается. В сделке он остается, а на Диске появляется отдельный объект. Если исходный файл в сделке потом заменят, копия в задаче не обновится

## Пример кода

Код проходит все четыре шага: читает элемент CRM, скачивает файл, загружает его на Диск и прикрепляет к задаче.

Замените вебхук, идентификаторы элемента, папки и задачи, а также имя файлового поля.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const entityTypeId = 2
    const itemId = 6533
    const fieldName = 'ufCrm_1688736288'
    const folderId = 1739
    const taskId = 3709
    const fileName = 'contract.pdf'

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(method + ': ' + response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    // 1. Читаем элемент CRM и берем машинную ссылку
    const { item } = await call('crm.item.get', { entityTypeId, id: itemId }, 'crm-item-get')
    const file = item[fieldName]

    if (!file || !file.urlMachine) {
        throw new Error('В поле ' + fieldName + ' нет файла или ссылки urlMachine')
    }

    // 2. Скачиваем файл и кодируем в Base64
    const fileResponse = await fetch(file.urlMachine)

    if (!fileResponse.ok) {
        throw new Error('Не удалось скачать файл: ' + fileResponse.status)
    }

    const fileContent = Buffer.from(await fileResponse.arrayBuffer()).toString('base64')

    // 3. Загружаем файл на Диск
    const diskFile = await call('disk.folder.uploadFile', {
        id: folderId,
        data: { NAME: fileName },
        fileContent: [fileName, fileContent]
    }, 'disk-uploadfile')

    // 4. Прикрепляем файл Диска к задаче
    const attachment = await call('tasks.task.files.attach', {
        taskId: taskId,
        fileId: diskFile.ID
    }, 'task-files-attach')

    console.log('Файл прикреплен, attachmentId:', attachment.attachmentId)
    ```

- Python

    ```python
    import base64

    import requests
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    entity_type_id = 2
    item_id = 6533
    field_name = "ufCrm_1688736288"
    folder_id = 1739
    task_id = 3709
    file_name = "contract.pdf"

    # 1. Читаем элемент CRM и берем машинную ссылку
    item = token.call_method("crm.item.get", {
        "entityTypeId": entity_type_id,
        "id": item_id,
    })["result"]["item"]

    file = item.get(field_name)

    if not file or not file.get("urlMachine"):
        raise ValueError(f"В поле {field_name} нет файла или ссылки urlMachine")

    # 2. Скачиваем файл и кодируем в Base64
    file_response = requests.get(file["urlMachine"], timeout=30)
    file_response.raise_for_status()
    file_content = base64.b64encode(file_response.content).decode()

    # 3. Загружаем файл на Диск
    disk_file = client.disk.folder.uploadfile(
        bitrix_id=folder_id,
        data={"NAME": file_name},
        file_content=[file_name, file_content],
    ).response.result

    # 4. Прикрепляем файл Диска к задаче
    attachment = client.tasks.task.files.attach(
        task_id=task_id,
        file_id=disk_file["ID"],
    ).response.result

    print("Файл прикреплен, attachmentId:", attachment["attachmentId"])
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $entityTypeId = 2;
    $itemId = 6533;
    $fieldName = 'ufCrm_1688736288';
    $folderId = 1739;
    $taskId = 3709;
    $fileName = 'contract.pdf';

    // 1. Читаем элемент CRM и берем машинную ссылку
    $item = $serviceBuilder->core->call(
        'crm.item.get',
        ['entityTypeId' => $entityTypeId, 'id' => $itemId]
    )->getResponseData()->getResult()['item'];

    $file = $item[$fieldName] ?? null;

    if (!$file || empty($file['urlMachine'])) {
        throw new RuntimeException('В поле ' . $fieldName . ' нет файла или ссылки urlMachine');
    }

    // 2. Скачиваем файл и кодируем в Base64
    $binary = file_get_contents($file['urlMachine']);

    if ($binary === false) {
        throw new RuntimeException('Не удалось скачать файл');
    }

    $fileContent = base64_encode($binary);

    // 3. Загружаем файл на Диск
    $diskFile = $serviceBuilder->getDiskScope()->folder()->uploadFile(
        $folderId,
        ['NAME' => $fileName],
        [$fileName, $fileContent]
    )->getFile();

    // 4. Прикрепляем файл Диска к задаче
    $attachment = $serviceBuilder->core->call(
        'tasks.task.files.attach',
        ['taskId' => $taskId, 'fileId' => $diskFile['ID']]
    )->getResponseData()->getResult();

    echo 'Файл прикреплен, attachmentId: ' . $attachment['attachmentId'];
    ```
{% endlist %}

## Продолжите изучение

- [Как загрузить файл в задачу](./how-to-upload-file-to-task.md)
- [Как создать задачу с прикрепленным файлом](./how-to-create-task-with-file.md)
- [Как скачать файлы](../../api-reference/files/how-to-download-files.md)
- [Как загрузить файлы](../../api-reference/files/how-to-upload-files.md)
- [Получить элемент CRM crm.item.get](../../api-reference/crm/universal/crm-item-get.md)
- [Загрузить файл в папку Диска disk.folder.uploadFile](../../api-reference/disk/folder/disk-folder-upload-file.md)
- [Прикрепить файл к задаче tasks.task.files.attach](../../api-reference/tasks/tasks-task-files-attach.md)
