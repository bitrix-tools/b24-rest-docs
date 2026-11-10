# База знаний 2.0 в REST 3.0: обзор разделов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

База знаний 2.0 помогает собирать внутренние материалы компании: регламенты, инструкции, обучающие тексты и другие документы. В ней можно вести несколько баз знаний, строить иерархию страниц, разграничивать доступ и работать с содержимым совместно.

Методы раздела работают с несколькими группами объектов:

- [Базы знаний](./collection/index.md) — создают базу знаний, получают данные и схему полей, переименовывают, меняют порядок в списке, архивируют, переносят в корзину и возвращают обратно
- [Документы](./document/index.md) — создают документы, получают дерево, список и содержимое страниц, ищут и перемещают документы, получают схему полей документов, дерева и поиска, архивируют и удаляют поддеревья страниц и возвращают их обратно
- [Файлы](./file/index.md) — загружают файл в документ, получают данные файла и список файлов документа, схему полей, возвращают блок Markdown для вставки вложения

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Битрикс24 База знаний 2.0: как создать и настроить](https://helpdesk.bitrix24.ru/open/28444346/)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

## Как начать работу

1. Создайте базу знаний методом [note.collection.add](./collection/note-collection-add.md) или выберите существующую через [note.collection.list](./collection/note-collection-list.md)
2. Создайте документ методом [note.document.add](./document/note-document-add.md). Для вложенной страницы передайте `parentId` родительского документа
3. Получите структуру базы знаний через [note.document.tree.list](./document/note-document-tree-list.md), все доступные документы во всех базах знаний — через [note.document.list](./document/note-document-list.md), содержимое страницы — через [note.document.get](./document/note-document-get.md), а совпадения по тексту — через [note.document.search.list](./document/note-document-search-list.md)
4. При необходимости загрузите вложение через [note.file.add](./file/note-file-add.md), добавьте его `assetMarkdown` к тексту и сохраните документ методом [note.document.update](./document/note-document-update.md)
5. Для настройки интеграции уточните поля баз знаний, документов и файлов методами `*.field.list` и `*.field.get` из [таблицы методов](#all-methods)

## Ограничения и рекомендации

- Архивация и удаление базы знаний затрагивают все документы внутри нее. Удаленную базу знаний восстанавливают вместе с документами методом [note.collection.restore](./collection/note-collection-restore.md). Метод [note.collection.unarchive](./collection/note-collection-unarchive.md) возвращает из архива только саму базу знаний, документы возвращают отдельно
- Размер `markdown` при создании и обновлении документа не должен превышать 1 048 576 байт. Превышение вызывает `NOTE_MARKDOWN_TOO_LARGE`. Дополнительные ограничения приведены в обзорах [документов](./document/index.md) и [файлов](./file/index.md)
- Методы архивации и удаления документов работают не с одной страницей, а со всем поддеревом ниже нее. Если у документа есть дочерние страницы, они тоже будут архивированы или перенесены в корзину. Из корзины поддерево восстанавливается целиком, а из архива каждый документ возвращается отдельно — подробнее в [обзоре документов](./document/index.md)
- Состояние базы знаний и документа возвращается в поле `state`: `live`, `archived` или `trashed`. Методы `note.collection.list` и `note.document.list` по умолчанию возвращают только активные объекты, остальные — по фильтру `state`
- Доступ к просмотру и изменению баз знаний, документов и файлов зависит от прав текущего пользователя. Один и тот же сценарий может быть доступен одним сотрудникам и недоступен другим

{% note tip "Пользовательская документация" %}

- [Как работать с Базой знаний 2.0](https://helpdesk.bitrix24.ru/open/28582016/)

{% endnote %}

## Связь с другими объектами

**Документы.** Поле `collectionId` связывает документ с [базой знаний](./collection/index.md), а `parentId` — с родительской страницей. Модель дерева и основные поля описаны в [обзоре документов](./document/index.md).

**Файлы.** Вложения связаны с документом через `documentId` и представлены в его Markdown специальными блоками. Типы вложений и ограничения загрузки описаны в [обзоре файлов](./file/index.md).

## Обзор методов {#all-methods}

> Scope: [`note`](../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Базы знаний

#|
|| **Метод** | **Описание** ||
|| [note.collection.add](./collection/note-collection-add.md) | Создает базу знаний ||
|| [note.collection.update](./collection/note-collection-update.md) | Переименовывает базу знаний ||
|| [note.collection.get](./collection/note-collection-get.md) | Возвращает одну базу знаний по идентификатору ||
|| [note.collection.list](./collection/note-collection-list.md) | Возвращает список доступных пользователю баз знаний ||
|| [note.collection.move](./collection/note-collection-move.md) | Меняет позицию базы знаний в общем списке ||
|| [note.collection.delete](./collection/note-collection-delete.md) | Переносит базу знаний в корзину ||
|| [note.collection.restore](./collection/note-collection-restore.md) | Восстанавливает базу знаний из корзины ||
|| [note.collection.archive](./collection/note-collection-archive.md) | Архивирует базу знаний ||
|| [note.collection.unarchive](./collection/note-collection-unarchive.md) | Возвращает базу знаний из архива ||
|| [note.collection.field.get](./collection/note-collection-field-get.md) | Возвращает описание поля базы знаний ||
|| [note.collection.field.list](./collection/note-collection-field-list.md) | Возвращает список полей базы знаний ||
|#

### Документы

#|
|| **Метод** | **Описание** ||
|| [note.document.add](./document/note-document-add.md) | Создает документ ||
|| [note.document.update](./document/note-document-update.md) | Обновляет заголовок и содержимое документа ||
|| [note.document.get](./document/note-document-get.md) | Возвращает документ с содержимым в Markdown ||
|| [note.document.delete](./document/note-document-delete.md) | Переносит документ и его дочерние страницы в корзину ||
|| [note.document.restore](./document/note-document-restore.md) | Восстанавливает документ и его дочерние страницы из корзины ||
|| [note.document.archive](./document/note-document-archive.md) | Архивирует документ и его дочерние страницы ||
|| [note.document.unarchive](./document/note-document-unarchive.md) | Возвращает документ из архива ||
|| [note.document.move](./document/note-document-move.md) | Перемещает документ в другую базу знаний, под другой родительский документ или на другую позицию ||
|| [note.document.list](./document/note-document-list.md) | Возвращает постранично все доступные пользователю документы ||
|| [note.document.tree.list](./document/note-document-tree-list.md) | Возвращает дерево документов одной базы знаний ||
|| [note.document.search.list](./document/note-document-search-list.md) | Ищет документы по заголовку и содержимому ||
|| [note.document.field.get](./document/note-document-field-get.md) | Возвращает описание поля документа ||
|| [note.document.field.list](./document/note-document-field-list.md) | Возвращает список полей документа ||
|| [note.document.tree.field.get](./document/note-document-tree-field-get.md) | Возвращает описание поля дерева документов ||
|| [note.document.tree.field.list](./document/note-document-tree-field-list.md) | Возвращает список полей дерева документов ||
|| [note.document.search.field.get](./document/note-document-search-field-get.md) | Возвращает описание поля результата поиска документов ||
|| [note.document.search.field.list](./document/note-document-search-field-list.md) | Возвращает список полей результата поиска документов ||
|#

### Файлы

#|
|| **Метод** | **Описание** ||
|| [note.file.add](./file/note-file-add.md) | Загружает файл в документ ||
|| [note.file.get](./file/note-file-get.md) | Возвращает данные файла документа и блок Markdown для вставки в документ ||
|| [note.file.list](./file/note-file-list.md) | Возвращает список файлов документа с датой прикрепления ||
|| [note.file.field.get](./file/note-file-field-get.md) | Возвращает описание поля файла документа ||
|| [note.file.field.list](./file/note-file-field-list.md) | Возвращает список полей файла документа ||
|#

## Продолжить изучение

- [{#T}](./collection/index.md)
- [{#T}](./document/index.md)
- [{#T}](./file/index.md)
- [{#T}](../rest-v3.md)
