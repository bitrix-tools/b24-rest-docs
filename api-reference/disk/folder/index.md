# Папки Диска: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Папки в Битрикс24 Диск позволяют создавать логическую структуру для хранения файлов, например по типам документов, дате или клиентам. Это облегчает поиск и доступ к нужной информации.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите хранилище методом [disk.storage.getList](../storage/disk-storage-get-list.md)
2. Получите корневые папки методом [disk.storage.getChildren](../storage/disk-storage-get-children.md)
3. Создайте дочернюю папку методом [disk.folder.addSubFolder](./disk-folder-add-subfolder.md)
4. Загружайте файлы методом [disk.folder.uploadFile](./disk-folder-upload-file.md)

## Структура папок

Папки на Диске организованы иерархически. Каждая папка может содержать вложенные папки и файлы. Список файлов и подпапок можно получить с помощью метода [disk.folder.getChildren](./disk-folder-get-children.md).

Новую папку можно создать с помощью метода [disk.folder.addSubFolder](./disk-folder-add-subfolder.md), а файл загрузить методом [disk.folder.uploadFile](./disk-folder-upload-file.md).

Родительские и дочерние папки связаны через параметр `PARENT_ID`. Получить его можно методом [disk.folder.get](./disk-folder-get.md). Помимо `PARENT_ID`, метод вернет все параметры папки по идентификатору `id`.

## Операции с папками

С папками Диска можно выполнить следующие операции:

- назначить права доступа методом [disk.folder.shareToUser](./disk-folder-share-to-user.md)
- переместить по структуре с помощью метода [disk.folder.moveTo](./disk-folder-move-to.md)
- скопировать в другие папки Диска методом [disk.folder.copyTo](./disk-folder-copy-to.md)
- изменить название методом [disk.folder.rename](./disk-folder-rename.md)

## Доступ внешнему пользователю

Чтобы предоставить доступ внешнему пользователю к папке, нужно создать публичную ссылку. Это позволит поделиться содержимым папки с людьми, не имеющими доступа к Битрикс24. Метод [disk.folder.getExternalLink](./disk-folder-get-external-link.md) возвращает существующую публичную ссылку или создает новую.

## Как удалить папки

Папки можно переместить в корзину методом [disk.folder.markDeleted](./disk-folder-mark-deleted.md). Удаленные папки можно восстановить методом [disk.folder.restore](./disk-folder-restore.md), пока они хранятся в корзине. Срок хранения зависит от настроек Битрикс24.

Чтобы полностью удалить папку без возможности восстановления, нужно использовать метод [disk.folder.deleteTree](./disk-folder-delete-tree.md). Он уничтожит папку со всеми вложенными папками и файлами навсегда.

{% note tip "Пользовательская документация" %}

- [Корзина на диске в Битрикс24](https://helpdesk.bitrix24.ru/open/19312292/)

{% endnote %}

## Связь с другими объектами

**Хранилища.** Папка находится в хранилище Диска и связана с ним через поле `STORAGE_ID`. Идентификатор папки в корне хранилища можно получить методами [disk.storage.getChildren](../storage/disk-storage-get-children.md) или [disk.storage.addFolder](../storage/disk-storage-add-folder.md). Все методы хранилищ собраны в обзоре [Хранилища Диска](../storage/index.md).

**Файлы.** Папка содержит файлы и вложенные папки. Метод [disk.folder.getChildren](./disk-folder-get-children.md) возвращает их список, а [disk.folder.uploadFile](./disk-folder-upload-file.md) загружает файл в папку по ее `ID`. Другие операции с файлами перечислены в обзоре [Файлы Диска](../file/index.md).

**Права доступа.** При создании папки или загрузке файла можно передать массив `rights` с идентификатором уровня доступа `TASK_ID`. Получить доступные значения `TASK_ID` можно методом [disk.rights.getTasks](../rights/disk-rights-get-tasks.md). Особенности уровней доступа описаны в обзоре [Права доступа к Диску](../rights/index.md).

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [disk.folder.get](./disk-folder-get.md) | Возвращает папку по идентификатору ||
|| [disk.folder.getChildren](./disk-folder-get-children.md) | Возвращает список файлов и папок, которые находятся в папке ||
|| [disk.folder.addSubFolder](./disk-folder-add-subfolder.md) | Создает дочернюю папку ||
|| [disk.folder.shareToUser](./disk-folder-share-to-user.md) | Назначает права доступа на папку ||
|| [disk.folder.copyTo](./disk-folder-copy-to.md) | Копирует папку в указанную папку ||
|| [disk.folder.moveTo](./disk-folder-move-to.md) | Перемещает папку в указанную папку ||
|| [disk.folder.rename](./disk-folder-rename.md) | Переименовывает папку ||
|| [disk.folder.deleteTree](./disk-folder-delete-tree.md) | Удаляет папку и все ее содержимое навсегда ||
|| [disk.folder.markDeleted](./disk-folder-mark-deleted.md) | Перемещает папку в корзину ||
|| [disk.folder.restore](./disk-folder-restore.md) | Восстанавливает папку из корзины ||
|| [disk.folder.uploadFile](./disk-folder-upload-file.md) | Загружает новый файл в указанную папку ||
|| [disk.folder.getExternalLink](./disk-folder-get-external-link.md) | Возвращает публичную ссылку на папку ||
|| [disk.folder.getFields](./disk-folder-get-fields.md) | Возвращает описание полей папки ||
|#
