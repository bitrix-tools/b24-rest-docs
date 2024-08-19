# Методы работы с папками диска

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "disk.folder.*" %}

**Scope**: [`disk`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [disk.folder.getfields](./disk-folder-get-fields.md) | Возвращает описание полей папки. ||
|| [disk.folder.get](./disk-folder-get.md) | Возвращает папку по идентификатору. ||
|| [disk.folder.getchildren](./disk-folder-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в папке. ||
|| [disk.folder.addsubfolder](./disk-folder-add-subfolder.md) | Создает дочернюю папку. ||
|| [disk.folder.copyto](./disk-folder-copy-to.md) | Копирует папку в указанную папку. ||
|| [disk.folder.moveto](./disk-folder-move-to.md) | Перемещает папку в указанную папку. ||
|| [disk.folder.rename](./disk-folder-rename.md) | Переименовывает папку. ||
|| [disk.folder.deletetree](./disk-folder-delete-tree.md) | Уничтожает папку и всё её дочерние элементы навсегда. ||
|| [disk.folder.markdeleted](./disk-folder-mark-deleted.md) | Перемещает папку в корзину. ||
|| [disk.folder.restore](./disk-folder-restore.md) | Восстанавливает папку из корзины. ||
|| [disk.folder.uploadfile](./disk-folder-upload-file.md) | Загружает новый файл в указанную папку. ||
|| [disk.folder.getExternalLink](./disk-folder-get-external-link.md) | Метод возвращает публичную ссылку. ||
|#