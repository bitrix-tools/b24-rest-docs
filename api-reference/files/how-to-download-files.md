# Как скачать файлы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Файл скачивают по ссылке из ответа метода или методом, который сразу возвращает файл. Если метод вернул ссылку для скачивания, [выполните отдельный `GET`-запрос](#request) к этой ссылке: вызов REST-метода только получает ссылку, сам файл в JSON-ответ не встраивается.

REST API не возвращает содержимое файлового поля в Base64: Base64 используется для загрузки файла в Битрикс24, а для скачивания приходит URL или файловый ответ.

## Типы файловых полей

Чтобы скачать файл, сначала определите, где он хранится.

- **Файл.** Поле не связано с Диском. В поле хранится `ID` файла, а метод чтения объекта возвращает ссылку для открытия или скачивания. Такой `ID` нельзя передать в [disk.file.get](../disk/file/disk-file-get.md)

- **Файл (диск).** Поле связано с Диском. В поле хранится `ID` объекта Диска или идентификатор привязки файла к объекту. Ссылку возвращают методы Диска или методы объекта, которому файл прикреплен

{% note warning "" %}

Ссылки для приложения содержат токен авторизации. Не публикуйте их, не передавайте в клиентский код без необходимости и не пишите в логи.

{% endnote %}

## Как выбрать способ получения файла {#methods}

#|
|| **Где находится файл** | **Как получить данные для скачивания** | **Поле или результат** ||
|| Пользовательское поле CRM типа `file` | [crm.item.get](../crm/universal/crm-item-get.md), [crm.item.list](../crm/universal/crm-item-list.md) | `urlMachine` ||
|| Комментарий таймлайна CRM | [crm.timeline.comment.get](../crm/timeline/comments/crm-timeline-comment-get.md), [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md) | `id` файла в `FILES`, затем `DOWNLOAD_URL` из [disk.file.get](../disk/file/disk-file-get.md) ||
|| Пост или комментарий в ленте | [log.blogpost.get](../log/log-blogpost-get.md), [log.blogcomment.user.get](../log/blogcomment/log-blogcomment-user-get.md) | `FILES`, затем `DOWNLOAD_URL` из [disk.file.get](../disk/file/disk-file-get.md) ||
|| Файл на Диске | [disk.file.get](../disk/file/disk-file-get.md) | `DOWNLOAD_URL` ||
|| Привязанный файл Диска, например в задаче или списке | [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) | `OBJECT_ID`, затем `DOWNLOAD_URL` из [disk.file.get](../disk/file/disk-file-get.md) ||
|| Файлы задачи | [tasks.task.get](../tasks/tasks-task-get.md), [tasks.task.get REST v3](../tasks/tasks-task-get-rest-v3.md) | `UF_TASK_WEBDAV_FILES` для отдельных файлов, `archiveLink` для архива ||
|| Элемент списка | [lists.element.get.file.url](../lists/elements/lists-element-get-file-url.md) | URL из массива `result` ||
|| Элемент хранилища данных | [entity.item.get](../entity/items/entity-item-get.md) | Значение файлового поля, имя поля зависит от настройки хранилища ||
|| Фото пользователя | [user.get](../user/user-get.md) | URL в поле `PERSONAL_PHOTO` ||
|| Товар каталога | [catalog.product.get](../catalog/product/catalog-product-get.md), [catalog.product.list](../catalog/product/catalog-product-list.md) | `urlMachine` из поля товара или метод [catalog.product.download](../catalog/product/catalog-product-download.md) ||
|| Запись звонка телефонии | [voximplant.statistic.get](../telephony/voximplant/voximplant-statistic-get.md) | `CALL_RECORD_URL` ||
|| Шаблон генератора документов | [documentgenerator.template.get](../document-generator/templates/document-generator-template-get.md), [documentgenerator.template.list](../document-generator/templates/document-generator-template-list.md), [crm.documentgenerator.template.get](../crm/document-generator/templates/crm-document-generator-template-get.md), [crm.documentgenerator.template.list](../crm/document-generator/templates/crm-document-generator-template-list.md) | `downloadMachine` ||
|| Документ генератора документов | [documentgenerator.document.add](../document-generator/document-generator-document-add.md), [documentgenerator.document.list](../document-generator/document-generator-document-list.md), [crm.documentgenerator.document.add](../crm/document-generator/documents/crm-document-generator-document-add.md), [crm.documentgenerator.document.list](../crm/document-generator/documents/crm-document-generator-document-list.md) | `downloadUrlMachine` ||
|| Подписанный документ | [sign.b2e.hcmlink.document.get](../sign/sign-b2e-hcmlink-document-get.md), [sign.b2e.mysafe.tail](../sign/sign-b2e-mysafe-tail.md), [sign.b2e.personal.tail](../sign/sign-b2e-personal-tail.md) | `fileUrl`, `file_url` ||
|| Файл Базы знаний | [note.file.get](../note/file/note-file-get.md) | Метаданные файла и `assetMarkdown` для вставки файла в документ. Ссылку для скачивания и тело файла метод не возвращает ||
|| Файл чата от имени пользователя | [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md) | `downloadUrl` ||
|| Файл чата от имени бота | [imbot.v2.File.download](../chat-bots/chat-bots-v2/imbot.v2/files/file-download.md) | `downloadUrl` ||
|#

## Виды ссылок в ответах {#links}

В ответах методов встречаются ссылки для пользователя и ссылки для приложения.

#|
|| **Поле** | **Что означает** | **Когда подходит** ||
|| `url`, `urlShow`, `DETAIL_URL` | Ссылка для открытия в интерфейсе Битрикс24 или для браузера с авторизованным пользователем | Когда файл открывает пользователь в Битрикс24 ||
|| `urlMachine`, `DOWNLOAD_URL`, `downloadMachine`, `downloadUrlMachine`, `downloadUrl`, `fileUrl`, `file_url`, `CALL_RECORD_URL`, `archiveLink` | Ссылка для скачивания. Часто содержит токен и позволяет получить файл отдельным HTTP-запросом | Когда файл скачивает интеграция или серверное приложение. Проверяйте ограничения на странице метода: например, в чатах `downloadUrl` одноразовая ||
|| `urlDownload` | Ссылка для скачивания в авторизованном контексте Битрикс24. В комментариях таймлайна CRM она не содержит REST-токен | Когда файл открывает пользователь или приложение в интерфейсе Битрикс24. Для серверного скачивания файла Диска получите `DOWNLOAD_URL` методом [disk.file.get](../disk/file/disk-file-get.md) ||
|#

Ссылки могут быть абсолютными или относительными. Например, относительными могут быть `archiveLink` задачи или `urlMachine` товара каталога. Если ссылка начинается с `/`, добавьте к ней адрес Битрикс24:

```text
https://your-domain.bitrix24.com/bitrix/tools/disk/uf.php?attachedId=10&action=download&ncc=1
```

Ссылка может быть одноразовой или ограниченной по времени. Если HTTP-ответ указывает на истекшую ссылку или отказ доступа, повторно получите ссылку методом чтения объекта и скачайте файл по новой ссылке.

## Права и ограничения

- Для скачивания нужны права на объект, из которого получена ссылка, и scope метода, которым получаете ссылку или файл. Например, для файла в поле CRM нужны права на чтение элемента CRM и scope `crm`, для файла Диска — права на файл или папку и scope `disk`, для файла чата — доступ к чату и scope `im` или `imbot`. Точный scope указан на странице каждого метода и в статье [Права доступа приложений](../scopes/permissions.md)

- Ссылка для приложения не заменяет постоянный идентификатор файла. Храните `ID` файла, идентификатор привязки или `ID` объекта, а ссылку получайте перед скачиванием

## Скачать файл из поля CRM {#crm}

Для файловых полей CRM используйте универсальные методы [crm.item.get](../crm/universal/crm-item-get.md) и [crm.item.list](../crm/universal/crm-item-list.md). Они работают с лидами, сделками, контактами, компаниями, счетами и смарт-процессами.

В ответе файловое поле содержит `id`, `url` и `urlMachine`. Для скачивания приложением используйте `urlMachine`.

```json
{
    "result": {
        "item": {
            "id": 1,
            "ufCrm_123456": [
                {
                    "id": 10,
                    "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&SITE_ID=s1&entityTypeId=2&id=1&fieldName=UF_CRM_123456&fileId=10",
                    "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=***&token=***"
                }
            ]
        }
    }
}
```

`id` в таком поле — это идентификатор файла CRM, а не `ID` объекта на Диске. Методы Диска не вернут данные по этому числу.

## Скачать файл из комментария таймлайна CRM {#timeline-comment}

Файлы комментариев таймлайна возвращают методы [crm.timeline.comment.get](../crm/timeline/comments/crm-timeline-comment-get.md) и [crm.timeline.comment.list](../crm/timeline/comments/crm-timeline-comment-list.md). В поле `FILES` ключ объекта совпадает с `id` файла.

```json
{
    "result": {
        "ID": "1",
        "ENTITY_ID": "2",
        "ENTITY_TYPE": "deal",
        "COMMENT": "New comment was added",
        "FILES": {
            "10": {
                "id": 10,
                "type": "file",
                "name": "1.txt",
                "size": 13,
                "urlPreview": null,
                "urlShow": "https://your-domain.bitrix24.com/disk/downloadFile/10/?&ncc=1&filename=1.txt",
                "urlDownload": "https://your-domain.bitrix24.com/disk/downloadFile/10/?&ncc=1&filename=1.txt"
            }
        }
    }
}
```

Ссылка `urlDownload` открывает файл в авторизованном контексте Битрикс24. Она не содержит REST-токен, поэтому для серверного скачивания через вебхук не подходит: HTTP-клиент без браузерной авторизации получит HTML-страницу, а не содержимое файла.

Чтобы скачать файл серверным приложением:

1. Возьмите `id` файла из объекта `FILES`
2. Вызовите [disk.file.get](../disk/file/disk-file-get.md) с этим `id`
3. Скачайте файл по `DOWNLOAD_URL` из ответа [disk.file.get](../disk/file/disk-file-get.md)

## Скачать файл Диска {#disk}

Если в поле хранится файл Диска, получите `ID` файла и вызовите [disk.file.get](../disk/file/disk-file-get.md). Метод вернет `DOWNLOAD_URL`.

```json
{
    "result": {
        "ID": "10",
        "NAME": "report.docx",
        "TYPE": "file",
        "SIZE": "21668",
        "DOWNLOAD_URL": "https://your-domain.bitrix24.com/rest/download.json?auth=***&token=***",
        "DETAIL_URL": "https://your-domain.bitrix24.com/company/personal/user/1/disk/file/report.docx"
    }
}
```

В некоторых полях хранится не `ID` файла, а идентификатор привязки. Например, файлы задач и часть файловых полей списков связаны с объектом через привязку. Сначала вызовите [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md), возьмите `OBJECT_ID` и получите `DOWNLOAD_URL` методом [disk.file.get](../disk/file/disk-file-get.md).

## Скачать файл из списка {#lists}

Чтобы получить URL файла из свойства элемента списка, вызовите [lists.element.get.file.url](../lists/elements/lists-element-get-file-url.md).

Для свойства типа «Файл (Диск)» метод вернет ссылку на скачивание через привязку:

```json
{
    "result": [
        "/bitrix/tools/disk/uf.php?attachedId=10&action=download&ncc=1"
    ]
}
```

Для свойства типа «Файл» метод вернет ссылку на файл списка:

```json
{
    "result": [
        "/company/lists/1/file/0/10/PROPERTY_123/20/?ncc=y&download=y"
    ]
}
```

## Скачать файл из задачи или поста ленты {#attached-files}

Файлы задач и постов ленты хранятся на Диске и привязаны к объекту через идентификатор привязки.

Метод [tasks.task.get](../tasks/tasks-task-get.md) возвращает файлы задачи в поле `UF_TASK_WEBDAV_FILES`. Значение может приходить с префиксом `n`, например `n491`. Для метода [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) передавайте число без префикса.

```json
{
    "result": {
        "task": {
            "id": 1,
            "ufTaskWebdavFiles": [
                "n10"
            ]
        }
    }
}
```

Метод [log.blogpost.get](../log/log-blogpost-get.md) возвращает идентификаторы привязок в поле `FILES`.

```json
{
    "result": [
        {
            "ID": 1,
            "FILES": [
                10
            ]
        }
    ]
}
```

Чтобы скачать отдельный файл задачи или поста:

1. Вызовите [disk.attachedObject.get](../disk/attached-object/disk-attached-object-get.md) по идентификатору привязки
2. Возьмите `OBJECT_ID` из ответа
3. Вызовите [disk.file.get](../disk/file/disk-file-get.md) и скачайте файл по `DOWNLOAD_URL`

Для задачи можно скачать все файлы архивом. Метод [tasks.task.get REST v3](../tasks/tasks-task-get-rest-v3.md) возвращает ссылку `archiveLink`.

```json
{
    "result": {
        "item": {
            "id": 1,
            "archiveLink": "/bitrix/tools/disk/uf.php?entityId=1&entity=TASKS_TASK&fieldName=UF_TASK_WEBDAV_FILES&action=downloadArchiveByEntity&ncc=1"
        }
    }
}
```

Комментарий ленты возвращает метод [log.blogcomment.user.get](../log/blogcomment/log-blogcomment-user-get.md). В поле `FILES` приходит объект с данными файлов и ссылкой `urlDownload`.

```json
{
    "result": [
        {
            "ID": "1",
            "FILES": {
                "10": {
                    "id": 10,
                    "type": "file",
                    "name": "file.txt",
                    "urlDownload": "https://your-domain.bitrix24.com/disk/downloadFile/10"
                }
            }
        }
    ]
}
```

Если серверному приложению нужна подписанная REST-ссылка, передайте `id` файла из `FILES` в [disk.file.get](../disk/file/disk-file-get.md) и используйте `DOWNLOAD_URL`.

## Скачать файл товара каталога {#catalog}

Методы [catalog.product.get](../catalog/product/catalog-product-get.md) и [catalog.product.list](../catalog/product/catalog-product-list.md) возвращают файлы товара в полях изображений и пользовательских свойствах типа «файл». В значении файла есть `id`, `url` и `urlMachine`.

```json
{
    "result": {
        "products": [
            {
                "id": 1,
                "property123": {
                    "value": {
                        "id": "10",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property123&fields%5BfileId%5D=10&fields%5BproductId%5D=1",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property123&fields%5BfileId%5D=10&fields%5BproductId%5D=1"
                    },
                    "valueId": "20"
                }
            }
        ]
    }
}
```

Для скачивания используйте `urlMachine` или вызовите [catalog.product.download](../catalog/product/catalog-product-download.md). Метод `catalog.product.download` сразу возвращает тело файла.

## Скачать шаблон или документ генератора документов {#document-generator}

Методы [documentgenerator.template.get](../document-generator/templates/document-generator-template-get.md), [documentgenerator.template.list](../document-generator/templates/document-generator-template-list.md), [crm.documentgenerator.template.get](../crm/document-generator/templates/crm-document-generator-template-get.md) и [crm.documentgenerator.template.list](../crm/document-generator/templates/crm-document-generator-template-list.md) возвращают поле `downloadMachine`.

Методы [documentgenerator.document.add](../document-generator/document-generator-document-add.md), [documentgenerator.document.list](../document-generator/document-generator-document-list.md), [crm.documentgenerator.document.add](../crm/document-generator/documents/crm-document-generator-document-add.md) и [crm.documentgenerator.document.list](../crm/document-generator/documents/crm-document-generator-document-list.md) возвращают поле `downloadUrlMachine`.

```json
{
    "template": {
        "id": 1,
        "downloadMachine": "https://your-domain.bitrix24.com/rest/documentgenerator.api.template.download.json?auth=***&token=***"
    },
    "document": {
        "id": 2,
        "downloadUrlMachine": "https://your-domain.bitrix24.com/rest/documentgenerator.api.document.getfile.json?auth=***&token=***"
    }
}
```

Для шаблона используйте `downloadMachine`, для готового документа — `downloadUrlMachine`.

## Скачать файл чата {#chat}

Файл чата скачивают отдельным методом в зависимости от контекста:

- [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md) — для файла от имени пользователя
- [imbot.v2.File.download](../chat-bots/chat-bots-v2/imbot.v2/files/file-download.md) — для файла от имени бота

Оба метода возвращают `downloadUrl`.

```json
{
    "result": {
        "downloadUrl": "https://your-domain.bitrix24.com/rest/download.json?auth=***&token=***"
    }
}
```

Ссылка `downloadUrl` одноразовая. Получайте новую ссылку перед каждым скачиванием.

## Скачать запись звонка телефонии {#telephony}

Метод [voximplant.statistic.get](../telephony/voximplant/voximplant-statistic-get.md) возвращает запись звонка в поле `CALL_RECORD_URL`, если запись прикреплена к звонку и доступна текущему пользователю.

```json
{
    "result": [
        {
            "ID": "1",
            "CALL_ID": "externalCall.example",
            "PORTAL_USER_ID": "1",
            "CALL_RECORD_URL": "https://your-domain.bitrix24.com/rest/download.json?auth=***&token=***"
        }
    ]
}
```

Если `CALL_RECORD_URL` пустой, у звонка нет доступной записи. Сначала прикрепите запись методом [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md), затем снова получите статистику звонка.

## Получить метаданные файла Базы знаний {#note}

Метод [note.file.get](../note/file/note-file-get.md) возвращает объект файла, который привязан к документу Базы знаний. В ответе есть метаданные и `assetMarkdown` — готовый блок для вставки файла в Markdown документа.

```json
{
    "result": {
        "item": {
            "id": 10,
            "documentId": 1,
            "name": "file.txt",
            "mimeType": "text/plain",
            "assetMarkdown": "[[file fileId=10]]"
        }
    }
}
```

Метод не возвращает ссылку для скачивания или тело файла. Чтобы файл появился на странице Базы знаний, вставьте `assetMarkdown` в содержимое документа методом [note.document.update](../note/document/note-document-update.md).

## Скачать подписанный документ {#sign}

Метод [sign.b2e.hcmlink.document.get](../sign/sign-b2e-hcmlink-document-get.md) возвращает ссылку на файл подписанного документа в поле `fileUrl`, методы [sign.b2e.mysafe.tail](../sign/sign-b2e-mysafe-tail.md) и [sign.b2e.personal.tail](../sign/sign-b2e-personal-tail.md) — в поле `file_url`.

```json
{
    "result": {
        "fileUrl": "https://your-domain.bitrix24.com/rest/download.json?auth=***&token=***"
    }
}
```

## Как выполнить скачивание {#request}

Ниже приведен пример скачивания файла по ссылке из ответа метода.

```bash
curl -L \
  -H "User-Agent: MyIntegration/1.0" \
  -H "Accept: */*" \
  -H "Accept-Language: ru-RU,ru;q=0.9,en;q=0.8" \
  -H "Referer: https://your-domain.bitrix24.com/" \
  -o report.pdf \
  "https://your-domain.bitrix24.com/rest/download.json?auth=***&token=***"
```

Передавайте заголовки `User-Agent`, `Accept`, `Accept-Language` и `Referer` по правилам из статьи [Как выполняется запрос](../../settings/how-to-call-rest-api/general-principles.md#headers). Если HTTP-клиент не передает эти заголовки или подставляет технический `User-Agent`, файл может не скачаться, даже если ссылка подписана корректно.

Если метод сам возвращает файл, например [catalog.product.download](../catalog/product/catalog-product-download.md), сохраните тело ответа REST-метода как файл. В таком ответе не будет JSON с `result`.

Проверяйте HTTP-статус и тип ответа. Если вместо файла пришел JSON с ошибкой, обработайте код ошибки: проверьте права, срок действия ссылки и повторно получите ссылку перед скачиванием.

Если вместо файла пришла HTML-страница авторизации, ссылка не подходит для серверного скачивания. Получите `urlMachine`, `DOWNLOAD_URL`, `downloadMachine`, `downloadUrlMachine` или другое поле скачивания из таблицы.

## Что дальше

- [Как загрузить файлы](./how-to-upload-files.md) — форматы передачи файла и загрузка нескольких файлов во множественное поле

- [Как обновить и удалить файлы](./how-to-update-files.md) — замена файла, удаление и сохранение остальных файлов множественного поля

- [Как работать с файлами](./index.md) — обзор раздела: типы полей, связь файлов с объектами Битрикс24 и основные методы Диска
