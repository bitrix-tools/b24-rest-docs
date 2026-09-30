# Хранилища Диска: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Хранилище — это Диск в Битрикс24, где можно хранить документы и файлы, создавать папки и получать списки содержимого.

> Быстрый переход: [все методы](#all-methods)

## Типы хранилищ

Метод [disk.storage.getTypes](./disk-storage-get-types.md) возвращает три основных типа хранилищ:

- Мой диск — личное хранилище пользователя
- Общий диск — хранилище компании
- Диск группы — хранилище рабочей группы

Для хранилища приложения используется специальный тип `restapp`. Такое хранилище можно получить или создать методом [disk.storage.getForApp](./disk-storage-get-for-app.md). В результат `disk.storage.getTypes` значение `restapp` не входит.

{% note tip "Пользовательская документация" %}

- [Что хранится на Моем диске в Битрикс24](https://helpdesk.bitrix24.ru/open/18634620/)
- [Общий диск в Битрикс24](https://helpdesk.bitrix24.ru/open/19228208/)

{% endnote %}

## Как начать работу

Для работы с хранилищем нужен его идентификатор.

1. Получите список доступных хранилищ методом [disk.storage.getList](./disk-storage-get-list.md). Для хранилища приложения используйте метод [disk.storage.getForApp](./disk-storage-get-for-app.md)
2. Выберите нужное хранилище и сохраните его `ID`
3. Получите параметры хранилища методом [disk.storage.get](./disk-storage-get.md)
4. Получите файлы и папки в корне методом [disk.storage.getChildren](./disk-storage-get-children.md)

В ответе `disk.storage.get` поле `ROOT_OBJECT_ID` содержит идентификатор корневой папки. Поля `ID` и `ROOT_OBJECT_ID` возвращаются как строки. Описание всех полей хранилища можно получить методом [disk.storage.getFields](./disk-storage-get-fields.md).

## Связь с другими объектами

Хранилище служит точкой входа для работы с папками, файлами и данными приложения.

**Папки.** Поле `ROOT_OBJECT_ID` содержит идентификатор корневой папки. Метод [disk.storage.getChildren](./disk-storage-get-children.md) возвращает ее содержимое, а [disk.storage.addFolder](./disk-storage-add-folder.md) создает в ней папку. Для вложенных папок используйте методы [disk.folder.*](../folder/index.md).

**Файлы.** Метод [disk.storage.uploadFile](./disk-storage-upload-file.md) загружает файл в корень хранилища. Для дальнейшей работы с загруженным файлом используйте его `ID` в методах [disk.file.*](../file/index.md).

**Приложение.** Метод [disk.storage.getForApp](./disk-storage-get-for-app.md) возвращает хранилище текущего приложения. Только такое хранилище можно переименовать методом [disk.storage.rename](./disk-storage-rename.md).

## Ошибки при работе с хранилищами

Методы, которые принимают идентификатор хранилища, возвращают `ERROR_NOT_FOUND`, если хранилище не найдено. При недостаточных правах методы чтения и изменения возвращают `ACCESS_DENIED`.

Метод `disk.storage.getForApp` возвращает `ACCESS_DENIED` вне контекста приложения.

## Обзор методов {#all-methods}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [disk.storage.get](./disk-storage-get.md) | Возвращает хранилище по идентификатору ||
|| [disk.storage.rename](./disk-storage-rename.md) | Переименовывает хранилище приложения ||
|| [disk.storage.getList](./disk-storage-get-list.md) | Возвращает список доступных хранилищ ||
|| [disk.storage.getTypes](./disk-storage-get-types.md) | Возвращает список типов хранилищ ||
|| [disk.storage.addFolder](./disk-storage-add-folder.md) | Создает папку в корне хранилища ||
|| [disk.storage.getChildren](./disk-storage-get-children.md) | Возвращает список файлов и папок, которые находятся в корне хранилища ||
|| [disk.storage.uploadFile](./disk-storage-upload-file.md) | Загружает новый файл в корень хранилища ||
|| [disk.storage.getForApp](./disk-storage-get-for-app.md) | Возвращает описание хранилища приложения ||
|| [disk.storage.getFields](./disk-storage-get-fields.md) | Возвращает описание полей хранилища ||
|#
