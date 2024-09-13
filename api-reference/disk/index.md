# REST-методы, доступные при работе с Диском

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| **Версия** | ||
|| [disk.version.get](version/disk-version-get.md) | Возвращает версию по идентификатору. ||
|| **Папка** | ||
|| [disk.folder.getfields](folder/disk-folder-get-fields.md) | Возвращает описание полей папки. ||
|| [disk.folder.get](folder/disk-folder-get.md) | Возвращает папку по идентификатору. ||
|| [disk.folder.getchildren](folder/disk-folder-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в папке. ||
|| [disk.folder.addsubfolder](folder/disk-folder-add-subfolder.md) | Создает дочернюю папку. ||
|| [disk.folder.copyto](folder/disk-folder-copy-to.md) | Копирует папку в указанную папку. ||
|| [disk.folder.moveto](folder/disk-folder-move-to.md) | Перемещает папку в указанную папку. ||
|| [disk.folder.rename](folder/disk-folder-rename.md) | Переименовывает папку. ||
|| [disk.folder.deletetree](folder/disk-folder-delete-tree.md) | Уничтожает папку и всё её дочерние элементы навсегда. ||
|| [disk.folder.markdeleted](folder/disk-folder-mark-deleted.md) | Перемещает папку в корзину. ||
|| [disk.folder.restore](folder/disk-folder-restore.md) | Восстанавливает папку из корзины. ||
|| [disk.folder.uploadfile](folder/disk-folder-upload-file.md) | Загружает новый файл в указанную папку. ||
|| [disk.folder.getExternalLink](folder/disk-folder-get-external-link.md) | Метод возвращает публичную ссылку. ||
|| **Прикрепленный файл** | ||
|| [disk.attachedObject.get](attached-object/disk-attached-object-get.md) | Возвращает информацию о прикрепленном файле. ||
|| **Файл** | ||
|| [disk.file.getfields](file/disk-file-get-fields.md) | Возвращает описание полей файла. ||
|| [disk.file.get](file/disk-file-get.md) | Возвращает файл по идентификатору. ||
|| [disk.file.rename](file/disk-file-rename.md) | Переименовывает файл. ||
|| [disk.file.copyto](file/disk-file-copy-to.md) | Копирует файл в указанную папку. ||
|| [disk.file.moveto](file/disk-file-move-to.md) | Перемещает файл в указанную папку. ||
|| [disk.file.delete](file/disk-file-delete.md) | Уничтожает файл навсегда. ||
|| [disk.file.markdeleted](file/disk-file-mark-deleted.md) | Перемещает файл в корзину. ||
|| [disk.file.restore](file/disk-file-restore.md) | Восстанавливает файл из корзины. ||
|| [disk.file.uploadversion](file/disk-file-upload-version.md) | Загружает новую версию файла. ||
|| [disk.file.getVersions](file/disk-file-get-versions.md) | Возвращает список версий файла. ||
|| [disk.file.restoreFromVersion](file/disk-file-restore-from-version.md) | Восстанавливает файл из конкретной версии. ||
|| [disk.file.getExternalLink](file/disk-file-get-external-link.md) | Возвращает публичную ссылку на файл. ||
|| **Хранилище** | ||
|| [disk.storage.getfields](storage/disk-storage-get-fields.md) | Возвращает описание полей хранилища. ||
|| [disk.storage.get](storage/disk-storage-get.md) | Возвращает хранилище по идентификатору. ||
|| [disk.storage.rename](storage/disk-storage-rename.md) | Переименовывает хранилище. Допустимо переименование только хранилища приложения (см. [disk.storage.getforapp](storage/disk-storage-get-for-app.md)). ||
|| [disk.storage.getlist](storage/disk-storage-get-list.md) | Возвращает список доступных хранилищ. ||
|| [disk.storage.gettypes](storage/disk-storage-get-types.md) | Возвращает список типов хранилищ. ||
|| [disk.storage.addfolder](storage/disk-storage-add-folder.md) | Создает папку в корне хранилища. ||
|| [disk.storage.getchildren](storage/disk-storage-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в корне хранилища. ||
|| [disk.storage.uploadfile](storage/disk-storage-upload-file.md) | Загружает новый файл в корне хранилища. ||
|| [disk.storage.getforapp](storage/disk-storage-get-for-app.md) | Возвращает описание хранилища, с которым может работать приложение для хранения своих данных (файлов и папок). ||
|| **Права доступа** | ||
|| [disk.rights.getTasks](rights/disk-rights-get-tasks.md) | Метод позволяет получить список уровней доступов, которые можно использовать в назначении прав. ||
|#