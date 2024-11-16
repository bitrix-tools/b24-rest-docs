# Файлы Диска: обзор методов

На Диске можно хранить текстовые документы, таблицы, презентации, изображения и другую информацию. Пользователи могут загружать, редактировать, копировать файлы и настраивать права доступа к ним.

> Быстрый переход: [все методы](#all-methods) 

## Как управлять файлами

Новый файл нужно загружать методом [disk.folder.uploadfile](../folder/disk-folder-upload-file.md) в папку по ее идентификатору.   

Вы можете изменить расположение файлов в структуре Диска: переместить с помощью метода [disk.file.moveto](./disk-file-move-to.md) или скопировать в другие папки методом [disk.file.copyto](./disk-file-copy-to.md).

Получить значения полей файла можно методом [disk.file.get](./disk-file-get.md). Например, чтобы узнать, перемещен файл в корзину или нет.

Изменить название файла позволяет метод [disk.file.rename](./disk-file-rename.md).

{% note tip "Пользовательская документация" %}

- [Документы Онлайн: начало работы](https://helpdesk.bitrix24.ru/open/20338924/)
- [Как работать с документами на диске Битрикс24](https://helpdesk.bitrix24.ru/open/19629424/)
- [Как заблокировать документ на диске](https://helpdesk.bitrix24.ru/open/20962214/)

{% endnote %}

## Версии файлов

Список версий файла можно получить с помощью метода [disk.file.getVersions](./disk-file-get-versions.md). Метод использует идентификатор файла в качестве параметра. 

Чтобы получить информацию о версии, используйте метод [disk.version.get](../version/disk-version-get.md). Метод принимает параметр с идентификатором версии, а не файла.

Инструменты Диска позволяют восстановить нужную версию файла. Это выполняется с помощью метода [disk.file.restoreFromVersion](./disk-file-restore-from-version.md).

Новую версию файла можно загрузить методом [disk.file.uploadversion](./disk-file-upload-version.md).

{% note tip "Пользовательская документация" %}

- [Сколько хранятся версии документа на Диске](https://helpdesk.bitrix24.ru/open/18869612/)

{% endnote %}

## Доступ внешнему пользователю

Чтобы предоставить доступ к файлу внешнему пользователю, нужно создать публичную ссылку. Это позволит поделиться файлом с людьми, не имеющими доступа к Битрикс24. Публичную ссылку для файла можно получить методом [disk.file.getExternalLink](./disk-file-get-external-link.md).

{% note tip "Пользовательская документация" %}

- [Как использовать публичные и внутренние ссылки на файлы в Битрикс24](https://helpdesk.bitrix24.ru/open/19096030/)

{% endnote %}

## Как удалить файлы

Файлы можно переместить в корзину методом [disk.file.markdeleted](./disk-file-mark-deleted.md). Удаленные файлы можно восстановить с помощью метода [disk.file.restore](./disk-file-restore.md) в течение 30 дней. 

Чтобы полностью удалить файл без возможности восстановления, нужно использовать метод [disk.file.delete](./disk-file-delete.md). Он уничтожит файл навсегда. 

{% note tip "Пользовательская документация" %}

- [Корзина на диске в Битрикс24](https://helpdesk.bitrix24.ru/open/19312292/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [disk.file.getfields](./disk-file-get-fields.md) | Возвращает описание полей файла ||
|| [disk.file.get](./disk-file-get.md) | Возвращает файл по идентификатору ||
|| [disk.file.rename](./disk-file-rename.md) | Переименовывает файл ||
|| [disk.file.copyto](./disk-file-copy-to.md) | Копирует файл в указанную папку ||
|| [disk.file.moveto](./disk-file-move-to.md) | Перемещает файл в указанную папку ||
|| [disk.file.delete](./disk-file-delete.md) | Уничтожает файл навсегда ||
|| [disk.file.markdeleted](./disk-file-mark-deleted.md) | Перемещает файл в корзину ||
|| [disk.file.restore](./disk-file-restore.md) | Восстанавливает файл из корзины ||
|| [disk.file.uploadversion](./disk-file-upload-version.md) | Загружает новую версию файла ||
|| [disk.file.getVersions](./disk-file-get-versions.md) | Возвращает список версий файла ||
|| [disk.file.restoreFromVersion](./disk-file-restore-from-version.md) | Восстанавливает файл из конкретной версии ||
|| [disk.file.getExternalLink](./disk-file-get-external-link.md) | Возвращает публичную ссылку на файл ||
|#