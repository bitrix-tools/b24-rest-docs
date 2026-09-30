# Файлы Диска: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На Диске можно хранить текстовые документы, таблицы, презентации, изображения и другую информацию. Пользователи могут загружать, редактировать, копировать файлы и настраивать права доступа к ним.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите список доступных хранилищ методом [disk.storage.getList](../storage/disk-storage-get-list.md). Для хранилища приложения используйте метод [disk.storage.getForApp](../storage/disk-storage-get-for-app.md)
2. Получите файлы и папки в корне методом [disk.storage.getChildren](../storage/disk-storage-get-children.md). Для перехода по вложенным папкам используйте [disk.folder.getChildren](../folder/disk-folder-get-children.md)
3. Загрузите файл в корень хранилища методом [disk.storage.uploadFile](../storage/disk-storage-upload-file.md) или в выбранную папку методом [disk.folder.uploadFile](../folder/disk-folder-upload-file.md)
4. Используйте `ID` из ответа загрузки, чтобы получить параметры файла методом [disk.file.get](./disk-file-get.md)
5. При необходимости переместите файл методом [disk.file.moveTo](./disk-file-move-to.md), скопируйте методом [disk.file.copyTo](./disk-file-copy-to.md), переименуйте методом [disk.file.rename](./disk-file-rename.md) или удалите методом [disk.file.delete](./disk-file-delete.md)

Если идентификатор файла неизвестен, найдите файл по имени или тексту внутри документа методом [disk.file.search](./disk-file-search.md). Поиск можно ограничить одним хранилищем или папкой.

## Формат ответа и ошибки

Методы, которые получают или изменяют файл, возвращают в `result` объект файла. Состав результата зависит от метода.

Типовые ошибки раздела: `ERROR_ARGUMENT` при неверных параметрах, `ERROR_NOT_FOUND` для отсутствующего файла, `ACCESS_DENIED` при недостаточных правах и `DISK_OBJ_22000` при конфликте имен. Точный набор ошибок указан на странице каждого метода.

## Ограничения и права

- Для чтения, копирования и получения публичной ссылки нужно право «Чтение» на файл
- Для переименования, перемещения и работы с корзиной нужно право «Редактирование»
- Для управления версиями нужно право «Полный доступ»
- Размер POST-запроса в облачном Битрикс24 ограничен 2 Гбайт, при передаче Base64 учитывайте увеличение объема примерно на треть
- Срок хранения файлов в корзине зависит от настроек Битрикс24

{% note tip "Пользовательская документация" %}

- [Документы Онлайн: начало работы](https://helpdesk.bitrix24.ru/open/20338924/)
- [Как работать с документами на диске Битрикс24](https://helpdesk.bitrix24.ru/open/19629424/)
- [Как заблокировать документ на диске](https://helpdesk.bitrix24.ru/open/20962214/)

{% endnote %}

## Версии файлов

Методы `disk.file.*` управляют списком версий файла, а метод [disk.version.get](../version/disk-version-get.md) возвращает отдельную версию по ее идентификатору. Восстановление старой версии создает новую текущую версию и не удаляет историю.

{% note tip "Пользовательская документация" %}

- [Сколько хранятся версии документа на Диске](https://helpdesk.bitrix24.ru/open/18869612/)

{% endnote %}

## Доступ внешнему пользователю

Метод [disk.file.getExternalLink](./disk-file-get-external-link.md) создает публичную ссылку для людей без доступа к Битрикс24. Администратор может запретить публичные ссылки в настройках Битрикс24.

{% note tip "Пользовательская документация" %}

- [Как использовать публичные и внутренние ссылки на файлы в Битрикс24](https://helpdesk.bitrix24.ru/open/19096030/)

{% endnote %}

## Связь с другими объектами

Файлы находятся в хранилищах и папках, используют права доступа и могут иметь историю версий.

**Хранилища.** Хранилище содержит корневую папку Диска. Получить файлы в корне можно методом [disk.storage.getChildren](../storage/disk-storage-get-children.md), а загрузить — методом [disk.storage.uploadFile](../storage/disk-storage-upload-file.md).

**Папки.** Папка содержит файлы и вложенные папки. Метод [disk.folder.getChildren](../folder/disk-folder-get-children.md) возвращает их список, а [disk.folder.uploadFile](../folder/disk-folder-upload-file.md) загружает файл в папку.

**Права доступа.** Уровень доступа определяет, какие операции с файлом доступны пользователю. Получить уровни можно методом [disk.rights.getTasks](../rights/disk-rights-get-tasks.md).

**Версии.** Предыдущие состояния содержимого файла хранятся как версии. Получить список версий можно методом [disk.file.getVersions](./disk-file-get-versions.md), а данные одной версии — методом [disk.version.get](../version/disk-version-get.md).

## Удаление файлов

Метод [disk.file.markDeleted](./disk-file-mark-deleted.md) перемещает файл в корзину, а [disk.file.restore](./disk-file-restore.md) восстанавливает его, пока он хранится в корзине. Метод [disk.file.delete](./disk-file-delete.md) удаляет файл без возможности восстановления.

{% note tip "Пользовательская документация" %}

- [Корзина на диске в Битрикс24](https://helpdesk.bitrix24.ru/open/19312292/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [disk.file.get](./disk-file-get.md) | Возвращает файл по идентификатору ||
|| [disk.file.search](./disk-file-search.md) | Находит файлы и папки по текстовому запросу ||
|| [disk.file.rename](./disk-file-rename.md) | Переименовывает файл ||
|| [disk.file.copyTo](./disk-file-copy-to.md) | Копирует файл в указанную папку ||
|| [disk.file.moveTo](./disk-file-move-to.md) | Перемещает файл в указанную папку ||
|| [disk.file.delete](./disk-file-delete.md) | Удаляет файл навсегда ||
|| [disk.file.markDeleted](./disk-file-mark-deleted.md) | Перемещает файл в корзину ||
|| [disk.file.restore](./disk-file-restore.md) | Восстанавливает файл из корзины ||
|| [disk.file.uploadVersion](./disk-file-upload-version.md) | Загружает новую версию файла ||
|| [disk.file.getVersions](./disk-file-get-versions.md) | Возвращает список версий файла ||
|| [disk.file.restoreFromVersion](./disk-file-restore-from-version.md) | Восстанавливает файл из конкретной версии ||
|| [disk.file.getExternalLink](./disk-file-get-external-link.md) | Возвращает публичную ссылку на файл ||
|| [disk.file.getFields](./disk-file-get-fields.md) | Возвращает описание полей файла ||
|#
