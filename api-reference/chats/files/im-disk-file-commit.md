# Добавить файл в чат im.disk.file.commit

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.disk.file.commit` добавляет файл в чат.

Для добавления файла укажите:
- один из параметров идентификатора чата — `CHAT_ID` или `DIALOG_ID` 
- один из параметров идентификатора файла — `FILE_ID` или `UPLOAD_ID`

Если передать несколько параметров одновременно, метод обрабатывает только первый.

Получить идентификатор нового файла можно после загрузки методом [disk.folder.upload.file](../../disk/folder/disk-folder-upload-file.md). Получить идентификатор существующего файла можно методом:
- [disk.storage.getchildren](../../disk/storage/disk-storage-get-children.md) — если файл находится в корне хранилища
- [disk.folder.getchildren](../../disk/folder/disk-folder-get-children.md) — если файл находится в папке

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Обязателен, если не передан `DIALOG_ID` ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор диалога в формате:
- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата

Обязателен, если не передан `CHAT_ID` ||
|| **FILE_ID***
[`integer`](../../data-types.md) | Идентификатор файла на Диске. Можно передать массив.

Обязателен, если не передан `UPLOAD_ID` ||
|| **UPLOAD_ID***
[`integer`](../../data-types.md) | Идентификатор файла на Диске. Можно передать массив.

Поддерживает дополнительный параметр `AS_FILE`, который позволяет отправить изображение без сжатия, в виде файла.

Обязателен, если не передан `FILE_ID` ||
|| **MESSAGE**
[`string`](../../data-types.md) | Текст сообщения с файлом ||
|| **SILENT_MODE**
[`string`](../../data-types.md) | Параметр для чата Открытых линий

Возможные значения:
- `Y` — отправлять уведомление клиенту
- `N` — не отправлять уведомление клиенту ||
|| **AS_FILE**
[`string`](../../data-types.md) | Отправить как файл. Только для `UPLOAD_ID`.

Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":1489,"FILE_ID":[5249,5250],"MESSAGE":"Документы по проекту"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.disk.file.commit
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":1489,"FILE_ID":[5249,5250],"MESSAGE":"Документы по проекту","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.disk.file.commit
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.disk.file.commit',
            {
                CHAT_ID: 1489,
                FILE_ID: [5249, 5250],
                MESSAGE: 'Документы по проекту',
            }
        );

        console.log(response.getData().result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.disk.file.commit',
                [
                    'CHAT_ID' => 1489,
                    'FILE_ID' => [5249, 5250],
                    'MESSAGE' => 'Документы по проекту',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.disk.file.commit',
        {
            CHAT_ID: 1489,
            FILE_ID: [5249, 5250],
            MESSAGE: 'Документы по проекту',
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.disk.file.commit',
        [
            'CHAT_ID' => 1489,
            'FILE_ID' => [5249, 5250],
            'MESSAGE' => 'Документы по проекту',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "FILES": {
            "upload5249": {
                "id": 5249,
                "chatId": 1489,
                "date": {},
                "type": "file",
                "name": "image.png",
                "extension": "png",
                "size": 2144,
                "image": {
                    "height": 61,
                    "width": 72
                },
                "status": "done",
                "progress": 100,
                "authorId": 503,
                "authorName": "Иван Иванов",
                "urlPreview": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5249&exact=N&_esd=hpbccd%2FZFlCVMvT8%2FoXYU%2FfMrCjiXqxIAf6V4Sv1rR0euQRiW7%2BsdhF7n1QGRL8ZBBmpuiVaX9sY2NbsyigTzBiykXGbFEbXUAmoPO8IvcdVkdoD5n6CJHZG9DZ0DRpH6i5goVbMdjo%3D&fileName=image.png",
                "urlShow": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.showImage&SITE_ID=s1&humanRE=1&fileId=5249&width=1280&height=1280&signature=9f56cfa3412e55679012a6c3bef9ff391f1fc7becf6dc42bea2b8d68656934ce&exact=N&_esd=hpbccd%2FZFlCVMvT8%2FoXYU%2FfMrCjiXqxIAf6V4Sv1rR0euQRiW7%2BsdhF7n1QGRL8ZBBmpuiVaX9sY2NbsyigTzBiykXGbFEbXUAmoPO8IvcdVkdoD5n6CJHZG9DZ0DRpH6i5goVbMdjo%3D&fileName=image.png",
                "urlDownload": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5249&exact=N&_esd=hpbccd%2FZFlCVMvT8%2FoXYU%2FfMrCjiXqxIAf6V4Sv1rR0euQRiW7%2BsdhF7n1QGRL8ZBBmpuiVaX9sY2NbsyigTzBiykXGbFEbXUAmoPO8IvcdVkdoD5n6CJHZG9DZ0DRpH6i5goVbMdjo%3D&fileName=image.png",
                "viewerAttrs": {
                    "viewer": "",
                    "viewerType": "image",
                    "src": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5249&exact=N&_esd=hpbccd%2FZFlCVMvT8%2FoXYU%2FfMrCjiXqxIAf6V4Sv1rR0euQRiW7%2BsdhF7n1QGRL8ZBBmpuiVaX9sY2NbsyigTzBiykXGbFEbXUAmoPO8IvcdVkdoD5n6CJHZG9DZ0DRpH6i5goVbMdjo%3D&fileName=image.png",
                    "viewerResized": "",
                    "objectId": "5249",
                    "viewerGroupBy": "1489",
                    "imChatId": 1489,
                    "title": "image.png",
                    "actions": "[{\"type\":\"download\"},{\"type\":\"copyToMe\",\"text\":\"Сохранить на Диск\",\"action\":\"BXIM.disk.saveToDiskAction\",\"params\":{\"fileId\":\"5249\"},\"extension\":\"disk.viewer.actions\",\"buttonIconClass\":\"ui-btn-icon-cloud\"}]"
                },
                "mediaUrl": {
                    "preview": {
                        "250": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5249&exact=N&_esd=hpbccd%2FZFlCVMvT8%2FoXYU%2FfMrCjiXqxIAf6V4Sv1rR0euQRiW7%2BsdhF7n1QGRL8ZBBmpuiVaX9sY2NbsyigTzBiykXGbFEbXUAmoPO8IvcdVkdoD5n6CJHZG9DZ0DRpH6i5goVbMdjo%3D&fileName=image.png"
                    }
                },
                "isTranscribable": false,
                "isVideoNote": false,
                "isVoiceNote": false
            }
        },
        "DISK_ID": [
            "5249"
        ],
        "FILE_MODELS": {
            "upload5249": {
                "id": 5249,
                "name": "image.png",
                "createTime": {},
                "updateTime": {},
                "deleteTime": null,
                "code": "media_original",
                "xmlId": null,
                "storageId": 663,
                "realObjectId": 5249,
                "parentId": 4821,
                "deletedType": 0,
                "createdBy": "503",
                "updatedBy": "503",
                "deletedBy": "0",
                "uniqueCode": "k7lj3sQxTRWSi6K93Vyh",
                "typeFile": 2,
                "globalContentVersion": 2,
                "fileId": 57077,
                "size": 2144,
                "etag": "73c045036a9e96943fa57316371655c2",
                "links": {
                    "download": "/bitrix/services/main/ajax.php?action=disk.file.download&SITE_ID=s1&fileId=5249",
                    "showInGrid": "/bitrix/tools/disk/focus.php?objectId=5249&action=showObjectInGrid&ncc=1",
                    "preview": "/bitrix/services/main/ajax.php?action=disk.api.file.showImage&SITE_ID=s1&humanRE=1&width=640&height=640&signature=8e152b3f4820b07a3f8ea79a6de60b0ae5a82a57467d08d1e8a8a399afb0330f&fileId=5249"
                }
            }
        },
        "MESSAGE_ID": 84779
    },
    "time": {
        "start": 1772451339,
        "finish": 1772451339.658828,
        "duration": 0.6588280200958252,
        "processing": 0,
        "date_start": "2026-03-02T14:35:39+03:00",
        "date_finish": "2026-03-02T14:35:39+03:00",
        "operating_reset_at": 1772451939,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект результата [(подробное описание)](#result-item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result-item {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILES**
[`object`](../../data-types.md) | Данные добавленных файлов [(подробное описание)](#files-item) ||
|| **DISK_ID**
[`array`](../../data-types.md) | Массив идентификаторов файлов на Диске ||
|| **FILE_MODELS**
[`object`](../../data-types.md) | Модели добавленных файлов на Диске [(подробное описание)](#file-models-item) ||
|| **MESSAGE_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения с файлами ||
|#

#### Объект FILES {#files-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **upload{id}**
[`object`](../../data-types.md) | Объект файла, где `id` — идентификатор файла загрузки [(подробное описание)](#files-upload-item) ||
|#

#### Объект FILES.upload{id} {#files-upload-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла на Диске ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **date**
[`object`](../../data-types.md) | Дата создания файла ||
|| **type**
[`string`](../../data-types.md) | Тип элемента ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **extension**
[`string`](../../data-types.md) | Расширение файла ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **image**
[`object`](../../data-types.md) | Параметры изображения [(подробное описание)](#files-upload-image) ||
|| **status**
[`string`](../../data-types.md) | Статус обработки файла ||
|| **progress**
[`integer`](../../data-types.md) | Прогресс обработки файла в процентах ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор автора файла ||
|| **authorName**
[`string`](../../data-types.md) | Имя автора файла ||
|| **urlPreview**
[`string`](../../data-types.md) | Ссылка на превью файла ||
|| **urlShow**
[`string`](../../data-types.md) | Ссылка на просмотр файла ||
|| **urlDownload**
[`string`](../../data-types.md) | Ссылка на скачивание файла ||
|| **viewerAttrs**
[`object`](../../data-types.md) | Параметры просмотрщика файла [(подробное описание)](#files-upload-viewer-attrs) ||
|| **mediaUrl**
[`object`](../../data-types.md) | Ссылки на медиафайл [(подробное описание)](#files-upload-media-url) ||
|| **isTranscribable**
[`boolean`](../../data-types.md) | Доступна ли расшифровка файла ||
|| **isVideoNote**
[`boolean`](../../data-types.md) | Является ли файл видеосообщением ||
|| **isVoiceNote**
[`boolean`](../../data-types.md) | Является ли файл голосовым сообщением ||
|#

#### Объект image {#files-upload-image}

#|
|| **Название**
`тип` | **Описание** ||
|| **height**
[`integer`](../../data-types.md) | Высота изображения ||
|| **width**
[`integer`](../../data-types.md) | Ширина изображения ||
|#

#### Объект viewerAttrs {#files-upload-viewer-attrs}

#|
|| **Название**
`тип` | **Описание** ||
|| **viewer**
[`string`](../../data-types.md) | Идентификатор просмотрщика ||
|| **viewerType**
[`string`](../../data-types.md) | Тип просмотрщика ||
|| **src**
[`string`](../../data-types.md) | Источник файла для просмотрщика ||
|| **viewerResized**
[`string`](../../data-types.md) | Источник уменьшенной версии файла ||
|| **objectId**
[`string`](../../data-types.md) | Идентификатор объекта в просмотрщике ||
|| **viewerGroupBy**
[`string`](../../data-types.md) | Идентификатор группы просмотра ||
|| **imChatId**
[`integer`](../../data-types.md) | Идентификатор чата для просмотрщика ||
|| **title**
[`string`](../../data-types.md) | Заголовок в просмотрщике ||
|| **actions**
[`string`](../../data-types.md) | Список действий в просмотрщике в формате JSON-строки ||
|#

#### Объект mediaUrl {#files-upload-media-url}

#|
|| **Название**
`тип` | **Описание** ||
|| **preview**
[`object`](../../data-types.md) | Набор ссылок на превью файла по размерам [(подробное описание)](#files-upload-media-url-preview) ||
|#

#### Объект mediaUrl.preview {#files-upload-media-url-preview}

#|
|| **Название**
`тип` | **Описание** ||
|| **250**
[`string`](../../data-types.md) | Ссылка на превью шириной 250 px ||
|#

#### Объект FILE_MODELS {#file-models-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **upload{id}**
[`object`](../../data-types.md) | Объект модели файла, где `id` — идентификатор файла загрузки [(подробное описание)](#file-models-upload-item) ||
|#

#### Объект FILE_MODELS.upload{id} {#file-models-upload-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла на Диске ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **createTime**
[`object`](../../data-types.md) | Дата создания файла ||
|| **updateTime**
[`object`](../../data-types.md) | Дата обновления файла ||
|| **deleteTime**
[`string`](../../data-types.md) | Дата удаления файла, может быть `null` ||
|| **code**
[`string`](../../data-types.md) | Код типа файла ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор, может быть `null` ||
|| **storageId**
[`integer`](../../data-types.md) | Идентификатор хранилища ||
|| **realObjectId**
[`integer`](../../data-types.md) | Идентификатор реального объекта ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительской папки ||
|| **deletedType**
[`integer`](../../data-types.md) | Тип удаления ||
|| **createdBy**
[`string`](../../data-types.md) | Идентификатор автора создания ||
|| **updatedBy**
[`string`](../../data-types.md) | Идентификатор автора обновления ||
|| **deletedBy**
[`string`](../../data-types.md) | Идентификатор автора удаления ||
|| **uniqueCode**
[`string`](../../data-types.md) | Уникальный код файла ||
|| **typeFile**
[`integer`](../../data-types.md) | Числовой код типа файла ||
|| **globalContentVersion**
[`integer`](../../data-types.md) | Глобальная версия контента ||
|| **fileId**
[`integer`](../../data-types.md) | Идентификатор связанного файла ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **etag**
[`string`](../../data-types.md) | ETag файла ||
|| **links**
[`object`](../../data-types.md) | Ссылки для работы с файлом [(подробное описание)](#file-models-upload-links) ||
|#

#### Объект links {#file-models-upload-links}

#|
|| **Название**
`тип` | **Описание** ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание файла ||
|| **showInGrid**
[`string`](../../data-types.md) | Ссылка на показ файла в сетке ||
|| **preview**
[`string`](../../data-types.md) | Ссылка на превью файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Возможные причины:
- не передан один из обязательных параметров `CHAT_ID` или `DIALOG_ID`
- передан пустой `CHAT_ID` ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Передан пустой или некорректный `DIALOG_ID` ||
|| `400` | `FILES_ERROR` | List of files in not specified | Не передан один из обязательных параметров `FILE_ID` или `UPLOAD_ID` ||
|| `400` | `SAVE_ERROR` | Error during saving file to chat | Возможные причины:
- передан пустым `FILE_ID` или `UPLOAD_ID`
- переданы несуществующие идентификаторы файлов ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | Недостаточно прав на просмотр диалога или передан несуществующий диалог ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-disk-file-save.md)
- [{#T}](./im-disk-file-delete.md)
- [{#T}](./im-disk-folder-get.md)
