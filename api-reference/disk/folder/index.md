# Папки Диска: обзор методов

Папки в Битрикс24 Диск позволяют создавать логическую структуру для хранения файлов, например по типам документов, дате или клиентам. Это облегчает поиск и доступ к нужной информации.

> Быстрый переход: [все методы](#all-methods) 

## Структура папок

Папки на Диске организованы иерархически. Каждая папка может содержать вложенные папки и файлы. Список файлов и подпапок можно получить с помощью метода [disk.folder.getchildren](./disk-folder-get-children.md).

Новую папку можно создать с помощью метода [disk.folder.addsubfolder](./disk-folder-add-subfolder.md), а файл загрузить методом [disk.folder.uploadfile](./disk-folder-upload-file.md).

Родительские и дочерние папки связаны через параметр `PARENT_ID`. Получить его можно методом [disk.folder.get](./disk-folder-get.md). Помимо `PARENT_ID`, метод вернет все параметры папки по идентификатору `id`. 

## Операции с папками

С папками Диска можно выполнить следующие операции:

- переместить по структуре с помощью метода [disk.folder.moveto](./disk-folder-move-to.md) 
- скопировать в другие папки Диска методом [disk.folder.copyto](./disk-folder-copy-to.md)
- изменить название методом [disk.folder.rename](./disk-folder-rename.md)

## Доступ внешнему пользователю

Чтобы предоставить доступ внешнему пользователю к папке, нужно создать публичную ссылку. Это позволит поделиться содержимым папки с людьми, не имеющими доступа к Битрикс24. Публичную ссылку для папки можно получить методом [disk.folder.getExternalLink](./disk-folder-get-external-link.md).

## Как удалить папки

Папки можно переместить в корзину методом [disk.folder.markdeleted](./disk-folder-mark-deleted.md). Удаленные папки можно восстановить с помощью метода [disk.folder.restore](./disk-folder-restore.md) в течение 30 дней. 

Чтобы полностью удалить папку без возможности восстановления, нужно использовать метод [disk.folder.deletetree](./disk-folder-delete-tree.md). Он уничтожит папку со всеми вложенными папками и файлами навсегда.

{% note tip "Пользовательская документация" %}

- [Корзина на диске в Битрикс24](https://helpdesk.bitrix24.ru/open/19312292/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [disk.folder.getfields](./disk-folder-get-fields.md) | Возвращает описание полей папки ||
|| [disk.folder.get](./disk-folder-get.md) | Возвращает папку по идентификатору ||
|| [disk.folder.getchildren](./disk-folder-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в папке ||
|| [disk.folder.addsubfolder](./disk-folder-add-subfolder.md) | Создает дочернюю папку ||
|| [disk.folder.copyto](./disk-folder-copy-to.md) | Копирует папку в указанную папку ||
|| [disk.folder.moveto](./disk-folder-move-to.md) | Перемещает папку в указанную папку ||
|| [disk.folder.rename](./disk-folder-rename.md) | Переименовывает папку ||
|| [disk.folder.deletetree](./disk-folder-delete-tree.md) | Уничтожает папку и все ее дочерние элементы навсегда ||
|| [disk.folder.markdeleted](./disk-folder-mark-deleted.md) | Перемещает папку в корзину ||
|| [disk.folder.restore](./disk-folder-restore.md) | Восстанавливает папку из корзины ||
|| [disk.folder.uploadfile](./disk-folder-upload-file.md) | Загружает новый файл в указанную папку ||
|| [disk.folder.getExternalLink](./disk-folder-get-external-link.md) | Возвращает публичную ссылку ||
|#