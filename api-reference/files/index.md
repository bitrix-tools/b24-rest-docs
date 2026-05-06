# Как работать с файлами

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Файлы можно передавать в поля Битрикс24 в формате Base64 или загружать на Диск. Выбор способа зависит от типа поля и метода, который принимает файл.

> Быстрый переход: [выбор инструкции](#choose-tutorial)

## Типы файловых полей

- **Файл.** Поле не связано с Диском. В него передают строку Base64 или массив с именем файла и строкой Base64
- **Файл (диск).** Поле связано с Диском. В нем хранится `ID` объекта диска. Для загрузки и обновления таких файлов подходят методы [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md), [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md) и [disk.file.*](../disk/file/index.md)

## Связь с другими объектами

Файлы связаны с объектами CRM, Диска, каталога, чатов, задач, сайтов и других инструментов Битрикс24.

- **CRM.** Файлы можно передавать в поля объектов методами [crm.item.add](../crm/universal/crm-item-add.md) и [crm.item.update](../crm/universal/crm-item-update.md), а также прикреплять к комментариям методами [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md) и [crm.timeline.comment.update](../crm/timeline/comments/crm-timeline-comment-update.md)
- **Каталог.** Изображения товаров передают в поля методами [catalog.product.add](../catalog/product/catalog-product-add.md) и [catalog.product.update](../catalog/product/catalog-product-update.md)
- **Списки.** Файлы в полях элементов списка добавляют и обновляют методами [lists.element.add](../lists/elements/lists-element-add.md) и [lists.element.update](../lists/elements/lists-element-update.md)
- **Лента.** Файлы в сообщениях ленты добавляют и обновляют методами [log.blogpost.add](../log/log-blogpost-add.md) и [log.blogpost.update](../log/log-blogpost-update.md)
- **Документы.** Шаблоны документов загружают методами [documentgenerator.template.add](../document-generator/templates/document-generator-template-add.md) и [crm.documentgenerator.template.add](../crm/document-generator/templates/crm-document-generator-template-add.md)
- **Пользователи.** Фотографию пользователя передают методом [user.add](../user/user-add.md)
- **Чаты.** Файл в чат загружают методом [im.v2.File.upload](../chat-bots/chat-bots-v2/im.v2/files/file-upload.md), ссылку на скачивание получают методом [im.v2.File.download](../chat-bots/chat-bots-v2/im.v2/files/file-download.md)
- **Чат-боты.** Файл от имени бота загружают методом [imbot.v2.File.upload](../chat-bots/chat-bots-v2/imbot.v2/files/file-upload.md), ссылку на скачивание получают методом [imbot.v2.File.download](../chat-bots/chat-bots-v2/imbot.v2/files/file-download.md)
- **Задачи.** Файлы с Диска прикрепляют к задаче методом [tasks.task.file.attach](../rest-v3/tasks/tasks-task-file-attach.md)
- **Сайты.** Изображение для блока сайта загружают и привязывают методом [landing.block.uploadfile](../landing/block/methods/landing-block-upload-file.md)

## Основные методы работы с файлами

#|
|| **Задача** | **Методы** ||
|| Загрузить файл на Диск | [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md), [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md) ||
|| Обновить файл на Диске | [disk.file.uploadversion](../disk/file/disk-file-upload-version.md) ||
|| Получить информацию о файле на Диске | [disk.file.get](../disk/file/disk-file-get.md) ||
|| Удалить файл на Диске | [disk.file.delete](../disk/file/disk-file-delete.md) ||
|| Получить ссылку на файл на Диске | [disk.file.getExternalLink](../disk/file/disk-file-get-external-link.md) ||
|#

## Как начать работу

1. Определите тип поля: файл или файл (диск)
2. Закодируйте файл в Base64, если нужно передать файл в обычное поле
3. Закодируйте Base64-строку в urlencode, если файл передается через GET-запрос или cURL
4. Загрузите файл на Диск и передайте `ID` объекта диска, если поле связано с Диском

## Как выбрать инструкцию {#choose-tutorial}

#|
|| **Если нужно** | **Откройте** ||
|| Передать новый файл в поле Битрикс24 или загрузить его на Диск | [Как загрузить файлы](./how-to-upload-files.md) ||
|| Заменить файл, удалить файл или сохранить остальные файлы в множественном поле | [Как обновить и удалить файлы](./how-to-update-files.md) ||
|#
