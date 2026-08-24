# Как работать с файлами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Файл попадает в Битрикс24 двумя основными путями: его передают строкой в формате Base64 прямо в поле метода или загружают на Диск и передают в поле `ID` объекта на Диске. Для больших файлов у Диска есть третий путь — загрузка по отдельному адресу `UploadUrl`. Путь зависит от типа поля и от метода, который принимает файл.

Выбор пути определяют тип поля, форма ответа метода, права и ограничения запроса. Формат конкретного запроса, обновление и удаление файлов разобраны в отдельных статьях.

> Быстрый переход: [выбор инструкции](#choose-tutorial)

## Типы файловых полей

От типа поля зависят формат запроса и способ обновления файла. Тип поля указан в описании параметров на странице метода.

- **Файл.** Поле не связано с Диском. Файл передают прямо в поле — строкой в формате Base64 или массивом из имени файла и такой строки, например `["report.pdf", "JVBERi0xLjQKJeLj"]`. Битрикс24 декодирует строку, сохраняет файл и хранит в поле `ID` файла.

- **Файл (диск).** Поле связано с Диском, в поле хранится `ID` объекта на Диске. Такие поля есть в списках, задачах и ленте. Обычно методу нужен готовый `ID`: сначала загрузите файл методом [disk.folder.uploadFile](../disk/folder/disk-folder-upload-file.md) или [disk.storage.uploadFile](../disk/storage/disk-storage-upload-file.md), потом передайте `ID` из ответа в поле объекта. Часть методов принимает и Base64, сохраняя файл на Диск самостоятельно. Оба пути разобраны в разделе [Как передать файл в поле, связанное с Диском](./how-to-upload-files.md#disk-field).

В CRM полей типа «файл (диск)» нет: файловые поля элементов CRM — это тип «файл». Файл не становится объектом Диска, а ссылки на него приходят в ответе метода чтения элемента. Вложения комментария таймлайна — исключение уровня метода, а не тип поля: параметр `FILES` принимает Base64, а файл сохраняется на Диск.

В CRM формат зависит от метода: [crm.item.add](../crm/universal/crm-item-add.md) и [crm.item.update](../crm/universal/crm-item-update.md) принимают массив «имя — Base64» в поле вида `ufCrm_7_1739432938`, а [crm.lead.add](../crm/leads/crm-lead-add.md), [crm.deal.add](../crm/deals/crm-deal-add.md), [crm.contact.add](../crm/contacts/crm-contact-add.md) и [crm.company.add](../crm/companies/crm-company-add.md) — объект `fileData` в поле вида `UF_CRM_1711610801`. Минимальный запрос [crm.item.add](../crm/universal/crm-item-add.md) выглядит так.

```json
{
    "entityTypeId": 177,
    "fields": {
        "title": "Договор",
        "ufCrm_7_1739432938": ["report.pdf", "JVBERi0xLjQKJeLj"]
    }
}
```

## Связь с другими объектами {#objects}

Файлы хранятся не сами по себе, а в полях объектов Битрикс24. Связь работает через поле объекта или отдельный параметр метода. Формат передачи у каждого метода свой, сверяйтесь с таблицей [Как выбрать формат передачи](./how-to-upload-files.md#formats).

#|
|| **Объект** | **Куда передают файл** | **Методы** ||
|| Объект CRM | Пользовательское поле типа «файл» | [crm.item.add](../crm/universal/crm-item-add.md), [crm.item.update](../crm/universal/crm-item-update.md) ||
|| Комментарий CRM | Поле `FILES` | [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md), [crm.timeline.comment.update](../crm/timeline/comments/crm-timeline-comment-update.md) ||
|| Каталог | Поля `previewPicture` и `detailPicture` или свойство товара; у значения свойства есть свой `valueId`, он нужен при обновлении и удалении | [catalog.product.add](../catalog/product/catalog-product-add.md), [catalog.product.update](../catalog/product/catalog-product-update.md) ||
|| Дополнительные изображения товара | Параметр `fileContent` | [catalog.productImage.add](../catalog/product-image/catalog-product-image-add.md) ||
|| Списки | Свойство элемента вида `PROPERTY_1075` | [lists.element.add](../lists/elements/lists-element-add.md), [lists.element.update](../lists/elements/lists-element-update.md) ||
|| Хранилище данных | Свойство типа «файл» | [entity.item.add](../entity/items/entity-item-add.md), [entity.item.update](../entity/items/entity-item-update.md) ||
|| Лента | Поле `FILES`, у постов также `UF_BLOG_POST_FILE` | [log.blogpost.add](../log/log-blogpost-add.md), [log.blogpost.update](../log/log-blogpost-update.md), [log.blogcomment.add](../log/blogcomment/log-blogcomment-add.md) ||
|| База знаний | Параметры `fileName` и `fileContent` | [note.file.add](../note/file/note-file-add.md) ||
|| Шаблоны документов | Поле `file`, а у [documentgenerator.template.add](../document-generator/templates/document-generator-template-add.md) вместо него можно передать готовый `ID` файла на Диске в `fileId` | [documentgenerator.template.add](../document-generator/templates/document-generator-template-add.md), [crm.documentgenerator.template.add](../crm/document-generator/templates/crm-document-generator-template-add.md) ||
|| Шаблоны бизнес-процессов | Поле `TEMPLATE_DATA` | [bizproc.workflow.template.add](../bizproc/template/bizproc-workflow-template-add.md) ||
|| Пользователи | Поле `PERSONAL_PHOTO` | [user.add](../user/user-add.md), [user.update](../user/user-update.md) ||
|| Чаты | Поля `name` и `content` в объекте `fields` | [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) — от имени пользователя, [imbot.v2.File.upload](../chat-bots/chat-bots-v2/imbot.v2/files/file-upload.md) — от имени бота ||
|| Задачи | Параметр `fileIds` или поле `UF_TASK_WEBDAV_FILES` | [tasks.task.file.attach](../tasks/tasks-task-file-attach.md), [tasks.task.add](../tasks/tasks-task-add.md) ||
|| Сайты | Параметр `picture`, принимается только изображение | [landing.block.uploadfile](../landing/block/methods/landing-block-upload-file.md) ||
|| Телефония | Параметры `FILENAME` и `FILE_CONTENT` | [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md) ||
|#

Что важно знать про отдельные инструменты.

- **Имя файлового поля** возвращают методы [crm.item.fields](../crm/universal/crm-item-fields.md) и [lists.field.get](../lists/fields/lists-field-get.md). Для товара [catalog.productProperty.list](../catalog/product-property/catalog-product-property-list.md) возвращает идентификатор свойства, а имя поля собирают как `property{id}`. Значение `valueId` свойства товара отдает [catalog.product.get](../catalog/product/catalog-product-get.md).

- **В CRM выбирайте универсальные методы.** [crm.item.add](../crm/universal/crm-item-add.md) и [crm.item.update](../crm/universal/crm-item-update.md) работают со всеми объектами CRM, включая смарт-процессы. Обновлять файловые поля парными методами `crm.lead.update`, `crm.deal.update`, `crm.contact.update` и `crm.company.update` не рекомендуется — подробности в разделе [Обновить поле в объекте CRM](./how-to-update-files.md#crm-item-update).

- **Готовый файл Диска привязывают по `ID` с префиксом `n`** — в формате `["n12345"]`. Так устроены поля `UF_TASK_WEBDAV_FILES` в [tasks.task.add](../tasks/tasks-task-add.md) и `UF_BLOG_POST_FILE` в [log.blogpost.add](../log/log-blogpost-add.md). Если в том же запросе передано поле `FILES`, значение `UF_BLOG_POST_FILE` игнорируется.

- **В Базе знаний файл не вставляется в текст автоматически.** [note.file.add](../note/file/note-file-add.md) только сохраняет файл и привязывает его к документу: возьмите из ответа блок `assetMarkdown` и добавьте его в содержимое документа. Метаданные и готовый блок по идентификатору возвращает [note.file.get](../note/file/note-file-get.md). Методы относятся к [REST 3.0](../rest-v3.md): в адресе вызова добавляется `/api/`.

## Что приходит в ответе

Что придет в `result`, зависит от метода. [crm.item.add](../crm/universal/crm-item-add.md) и [crm.item.update](../crm/universal/crm-item-update.md) возвращают объект `item` целиком, вместе с файловым полем — отдельный запрос на чтение не нужен. Методы [crm.lead.add](../crm/leads/crm-lead-add.md), [lists.element.add](../lists/elements/lists-element-add.md), [log.blogpost.add](../log/log-blogpost-add.md) и [user.add](../user/user-add.md) возвращают только идентификатор созданного объекта — файлы придется запрашивать методом чтения. Точная схема — в разделе «Возвращаемые данные» на странице метода.

Форма файлового поля в ответе у каждого инструмента своя.

#|
|| **Объект** | **Что приходит в файловом поле** | **Чем получить ссылку на файл** ||
|| Элемент CRM | Объект с `id`, `url` и `urlMachine`, а у множественного поля — массив таких объектов | Ссылки приходят сразу в ответе [crm.item.get](../crm/universal/crm-item-get.md) ||
|| Элемент списка | Объект, где ключ — `ID` значения свойства, значение — `ID` файла | [lists.element.get.file.url](../lists/elements/lists-element-get-file-url.md) ||
|| Пост в ленте | Массив `ID` файлов | Ссылки в ответе нет: файлы поста лежат на Диске автора ||
|| Товар | В свойстве — массив объектов, где `value` содержит `id`, `url` и `urlMachine`, а `valueId` — идентификатор значения; в полях `previewPicture` и `detailPicture` — один объект с `id`, `url` и `urlMachine` | Ссылки приходят сразу в ответе [catalog.product.get](../catalog/product/catalog-product-get.md) ||
|| Файл на Диске | Объект файла: `ID`, имя, размер, `DOWNLOAD_URL` | Ссылка приходит сразу в ответе [disk.file.get](../disk/file/disk-file-get.md) ||
|#

В таблице частые случаи, для остальных инструментов форму файлового поля смотрите на странице метода. Ссылку на файл в чате отдают отдельные методы — [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md) и [imbot.v2.File.download](../chat-bots/chat-bots-v2/imbot.v2/files/file-download.md).

Примеры ответов и правила скачивания по подписанной ссылке — в разделе [Что вернется в ответе](./how-to-upload-files.md#chto-vernetsya-v-otvete). Ссылки `urlMachine` и `DOWNLOAD_URL` содержат токен авторизации: не публикуйте их и не пишите в логи.

Если файл не появился в поле, метод чаще всего не возвращает ошибку — поле остается пустым или теряет прежние файлы. Как метод обходится со старыми файлами, показывает таблица [Как методы обрабатывают файлы](./how-to-update-files.md#behavior), общий формат ответа с ошибкой — в статье [Коды ошибок](../../error-codes.md).

## Права и ограничения

Права пользователя и [scope](../scopes/permissions.md) указаны в начале страницы каждого метода. Права на файл в поле объекта наследуются от объекта: кто может изменить элемент, тот меняет и его файлы. У объектов Диска права свои и не наследуются от объекта, в поле которого лежит файл: они проверяются по конкретной папке, хранилищу или файлу.

Ограничения общие для методов, которые принимают файл в теле запроса.

- Файл передают POST-запросом: строка Base64 почти всегда длиннее лимита адресной строки, а это около 2048 символов у браузеров и веб-серверов.

- Строка Base64 примерно на треть длиннее исходного файла — сверяйтесь с размером строки.

- Размер POST-запроса в облаке ограничен 2 Гбайт, в коробочной версии — настройками вашего сервера.

- Время выполнения запроса в облаке ограничено 60 секундами.

Файл, который не проходит по лимиту запроса, загружают на Диск в два шага. Вызовите [disk.folder.uploadFile](../disk/folder/disk-folder-upload-file.md) без параметра `fileContent` — метод вернет адрес `UploadUrl` и имя поля формы `field`. По этому адресу файл отправляют отдельным запросом, порядок описан в разделе [Загрузка файла через URL](../disk/folder/disk-folder-upload-file.md#uploadurl).

Так же устроена загрузка записи разговора: [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md) с параметром `FILENAME` без `FILE_CONTENT` возвращает `uploadUrl` и `fieldName`. У остальных методов такого обхода нет — файл придется уместить в лимит запроса.

У отдельных методов лимит строже: [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md) принимает файл до 100 МБ и возвращает ошибку `FILE_TOO_LARGE`, [note.file.add](../note/file/note-file-add.md) ограничен настройкой `main.max_file_size`, а если она не задана — 25 МиБ. Полный список ограничений с цифрами — в разделе [Ограничения при работе с файлами](./how-to-upload-files.md#ogranicheniya-pri-rabote-s-fajlami).

## Как начать работу

1. Откройте страницу метода и посмотрите, чего он ждет в описании параметров: контент файла — строку или массив с Base64 — или готовый `ID` объекта на Диске.

2. Сверьтесь с таблицей [Как выбрать формат передачи](./how-to-upload-files.md#formats): строка, массив «имя — Base64», объект `fileData` или отдельный параметр.

3. Закодируйте файл в [Base64](./how-to-upload-files.md#kak-kodirovat-fajl-v-base64), если метод принимает контент файла.

4. Загрузите файл на Диск и передайте `ID` объекта, если метод ожидает готовый `ID`. Список доступных хранилищ возвращает метод [disk.storage.getList](../disk/storage/disk-storage-get-list.md), собственное хранилище приложения — [disk.storage.getForApp](../disk/storage/disk-storage-get-for-app.md), его вызывает администратор в контексте приложения. `ID` папки внутри хранилища отдают методы [disk.storage.getChildren](../disk/storage/disk-storage-get-children.md) и [disk.folder.getChildren](../disk/folder/disk-folder-get-children.md).

5. Запросите объект методом чтения, чтобы получить `ID` файлов и ссылки на скачивание. Эти `ID` понадобятся, когда файлы нужно будет обновить или удалить.

## Методы Диска для работы с файлами

Файл на Диске — самостоятельный объект, и работают с ним методы Диска, а не методы объекта, в поле которого он лежит. Ниже те из них, что нужны при загрузке, обновлении и удалении файла. Методы, которые принимают файл в поле своего объекта, перечислены в блоке [Связь с другими объектами](#objects), а весь раздел Диска — в статье [Диск](../disk/index.md).

#|
|| **Метод** | **Описание** ||
|| [disk.folder.uploadFile](../disk/folder/disk-folder-upload-file.md) | Загружает файл в указанную папку ||
|| [disk.storage.uploadFile](../disk/storage/disk-storage-upload-file.md) | Загружает файл в корень хранилища ||
|| [disk.file.uploadVersion](../disk/file/disk-file-upload-version.md) | Загружает новую версию файла ||
|| [disk.file.get](../disk/file/disk-file-get.md) | Возвращает параметры файла ||
|| [disk.file.getExternalLink](../disk/file/disk-file-get-external-link.md) | Возвращает публичную ссылку на файл: ее открывает любой, у кого она есть, в отличие от подписанных токеном `urlMachine` и `DOWNLOAD_URL` ||
|| [disk.file.markDeleted](../disk/file/disk-file-mark-deleted.md) | Перемещает файл в корзину, откуда его можно восстановить ||
|| [disk.file.delete](../disk/file/disk-file-delete.md) | Удаляет файл навсегда, без корзины ||
|#

## Как выбрать инструкцию {#choose-tutorial}

#|
|| **Если нужно** | **Откройте** ||
|| Передать новый файл в поле Битрикс24 или загрузить его на Диск | [Как загрузить файлы](./how-to-upload-files.md) ||
|| Заменить файл, удалить файл или сохранить остальные файлы во множественном поле | [Как обновить и удалить файлы](./how-to-update-files.md) ||
|| Передать файл в GET-запросе или через cURL | [Кодирование данных](../../settings/how-to-call-rest-api/data-encoding.md) — строку Base64 нужно закодировать в urlencode ||
|| Скачать файл по ссылке из ответа | [Что вернется в ответе](./how-to-upload-files.md#chto-vernetsya-v-otvete) ||
|| Разобрать ошибку метода | [Коды ошибок](../../error-codes.md) ||
|#
