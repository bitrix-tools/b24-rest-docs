# Методы работы с хранилищем

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [disk.storage.getfields](./disk-storage-get-fields.md) | Возвращает описание полей хранилища. ||
|| [disk.storage.get](./disk-storage-get.md) | Возвращает хранилище по идентификатору. ||
|| [disk.storage.rename](./disk-storage-rename.md) | Переименовывает хранилище. Допустимо переименование только хранилища приложения (см. [disk.storage.getforapp](./disk-storage-get-for-app.md)). ||
|| [disk.storage.getlist](./disk-storage-get-list.md) | Возвращает список доступных хранилищ. ||
|| [disk.storage.gettypes](./disk-storage-get-types.md) | Возвращает список типов хранилищ. ||
|| [disk.storage.addfolder](./disk-storage-add-folder.md) | Создает папку в корне хранилища. ||
|| [disk.storage.getchildren](./disk-storage-get-children.md) | Возвращает список файлов и папок, которые находятся непосредственно в корне хранилища. ||
|| [disk.storage.uploadfile](./disk-storage-upload-file.md) | Загружает новый файл в корне хранилища. ||
|| [disk.storage.getforapp](./disk-storage-get-for-app.md) | Возвращает описание хранилища, с которым может работать приложение для хранения своих данных (файлов и папок). ||
|#