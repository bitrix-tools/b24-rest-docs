# Хранилища Диска: обзор методов

Хранилище — это Диск в Битрикс24, где можно хранить документы и файлы, создавать папки и получать списки содержимого.

> Быстрый переход: [все методы](#all-methods) 

## Типы хранилищ

В Битрикс24 есть три типа хранилищ:

- Мой диск — личное хранилище пользователя
- Общий диск — хранилище компании
- Диск группы — хранилище рабочей группы

Получить список типов хранилищ можно методом [disk.storage.gettypes](./disk-storage-get-types.md).

{% note tip "Пользовательская документация" %}

- [Что хранится на Моем диске в Битрикс24](https://helpdesk.bitrix24.ru/open/18634620/)
- [Общий диск в Битрикс24](https://helpdesk.bitrix24.ru/open/19228208/)

{% endnote %}

## Как получить описание хранилища

Для работы с хранилищем нужен его идентификатор.

1. Получите список доступных хранилищ методом [disk.storage.getlist](./disk-storage-get-list.md).
2. Найдите в списке нужное хранилище и используйте его `ID`.
3. Получите параметры хранилища методом [disk.storage.get](./disk-storage-get.md).

Описание всех полей хранилища возвращает метод [disk.storage.getfields](./disk-storage-get-fields.md). Для работы с хранилищем приложения используйте метод [disk.storage.getforapp](./disk-storage-get-for-app.md).

## Работа с содержимым хранилища

В корне хранилища можно выполнить следующие операции:

- получить список файлов и папок методом [disk.storage.getchildren](./disk-storage-get-children.md)
- создать папку с помощью метода [disk.storage.addfolder](./disk-storage-add-folder.md)
- загрузить файл методом [disk.storage.uploadfile](./disk-storage-upload-file.md)

Для работы с вложенными папками и файлами используйте методы [disk.folder.\*](../folder/index.md).

## Как переименовать хранилище

Переименовать можно только хранилище приложения — для этого используйте метод [disk.storage.rename](./disk-storage-rename.md). Личные, общие и групповые хранилища переименовать нельзя.

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [disk.storage.getfields](./disk-storage-get-fields.md) | Возвращает описание полей хранилища ||
|| [disk.storage.get](./disk-storage-get.md) | Возвращает хранилище по идентификатору ||
|| [disk.storage.rename](./disk-storage-rename.md) | Переименовывает хранилище приложения ||
|| [disk.storage.getlist](./disk-storage-get-list.md) | Возвращает список доступных хранилищ ||
|| [disk.storage.gettypes](./disk-storage-get-types.md) | Возвращает список типов хранилищ ||
|| [disk.storage.addfolder](./disk-storage-add-folder.md) | Создает папку в корне хранилища ||
|| [disk.storage.getchildren](./disk-storage-get-children.md) | Возвращает список файлов и папок, которые находятся в корне хранилища ||
|| [disk.storage.uploadfile](./disk-storage-upload-file.md) | Загружает новый файл в корень хранилища ||
|| [disk.storage.getforapp](./disk-storage-get-for-app.md) | Возвращает описание хранилища приложения ||
|#