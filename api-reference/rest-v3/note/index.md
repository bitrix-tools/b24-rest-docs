# База знаний 2.0 в REST 3.0: обзор разделов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

База знаний 2.0 помогает собирать внутренние материалы компании: регламенты, инструкции, обучающие тексты и другие документы. В ней можно вести несколько баз знаний, строить иерархию страниц, разграничивать доступ и работать с содержимым совместно.

Методы раздела работают с несколькими группами объектов:

- [Базы знаний](./collection/index.md) — создают базу знаний, получают данные и схему полей, переименовывают, архивируют и переносят в корзину
- [Документы](./document/index.md) — создают документы, получают дерево и содержимое страниц, ищут документы, получают схему полей документов, дерева и поиска, архивируют и удаляют поддеревья страниц
- [Файлы](./file/index.md) — загружают файл в документ, получают данные и схему полей, возвращают блок Markdown для вставки вложения

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Битрикс24 База знаний 2.0: как создать и настроить](https://helpdesk.bitrix24.ru/open/28444346/)

## Как начать работу

1. Создайте базу знаний методом [note.collection.add](./collection/note-collection-add.md), если у вас еще нет контейнера для документов
2. Получите список доступных баз знаний методом [note.collection.list](./collection/note-collection-list.md), если нужно работать с уже существующей структурой
3. Получите данные одной базы знаний методом [note.collection.get](./collection/note-collection-get.md), если нужно открыть выбранную базу знаний по идентификатору
4. Уточните поля базы знаний методами [note.collection.field.list](./collection/note-collection-field-list.md) и [note.collection.field.get](./collection/note-collection-field-get.md), если строите форму или таблицу на своей стороне
5. Создайте корневой документ методом [note.document.add](./document/note-document-add.md)
6. Получите дерево документов методом [note.document.tree.list](./document/note-document-tree-list.md), если нужно показать структуру страниц
7. Читайте отдельный документ методом [note.document.get](./document/note-document-get.md) или ищите документы методом [note.document.search.list](./document/note-document-search-list.md)
8. Уточните поля документов, дерева и поиска методами `note.document.field.*`, `note.document.tree.field.*`, `note.document.search.field.*`
9. Обновляйте заголовок и содержимое документа методом [note.document.update](./document/note-document-update.md)
10. Загружайте изображения, видео и обычные файлы методом [note.file.add](./file/note-file-add.md)
11. Используйте `assetMarkdown` из ответа [note.file.add](./file/note-file-add.md) или получайте его методом [note.file.get](./file/note-file-get.md), а затем добавляйте вложение в документ через [note.document.update](./document/note-document-update.md)
12. Уточните поля файла методами [note.file.field.list](./file/note-file-field-list.md) и [note.file.field.get](./file/note-file-field-get.md), если строите свою форму или таблицу
13. Архивируйте или удаляйте базу знаний и документы соответствующими методами, когда нужно завершить работу с материалами

## Ограничения и рекомендации

- Методы архивации и удаления документов работают не с одной страницей, а со всем поддеревом ниже нее. Если у документа есть дочерние страницы, они тоже будут архивированы или перенесены в корзину
- Доступ к просмотру и изменению баз знаний, документов и файлов зависит от прав текущего пользователя. Один и тот же сценарий может быть доступен одним сотрудникам и недоступен другим

{% note tip "Пользовательская документация" %}

- [Как работать с Базой знаний 2.0](https://helpdesk.bitrix24.ru/open/28582016/)

{% endnote %}

## Связь с другими объектами

**Документы.** База знаний наполняется документами. Сначала можно создать корневую страницу, а затем добавлять в нее дочерние страницы, чтобы собрать дерево материалов по темам. Для этого при создании документа указывают базу знаний, в которой он должен появиться, а для вложенных страниц дополнительно передают родительский документ.

**Файлы.** Файлы добавляются не в базу знаний целиком, а в конкретный документ. Сначала файл загружают методом [note.file.add](./file/note-file-add.md), затем берут `assetMarkdown` из ответа метода или получают его методом [note.file.get](./file/note-file-get.md). После этого содержимое документа обновляют методом [note.document.update](./document/note-document-update.md), чтобы вложение появилось в тексте страницы.

## Обзор методов {#all-methods}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Базы знаний

#|
|| **Метод** | **Описание** ||
|| [note.collection.add](./collection/note-collection-add.md) | Создает базу знаний ||
|| [note.collection.update](./collection/note-collection-update.md) | Переименовывает базу знаний ||
|| [note.collection.get](./collection/note-collection-get.md) | Возвращает одну базу знаний по идентификатору ||
|| [note.collection.list](./collection/note-collection-list.md) | Возвращает список доступных пользователю баз знаний ||
|| [note.collection.delete](./collection/note-collection-delete.md) | Переносит базу знаний в корзину ||
|| [note.collection.archive](./collection/note-collection-archive.md) | Архивирует базу знаний ||
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
|| [note.document.archive](./document/note-document-archive.md) | Архивирует документ и его дочерние страницы ||
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
|| [note.file.field.get](./file/note-file-field-get.md) | Возвращает описание поля файла документа ||
|| [note.file.field.list](./file/note-file-field-list.md) | Возвращает список полей файла документа ||
|#

## Продолжить изучение

- [{#T}](./collection/index.md)
- [{#T}](./document/index.md)
- [{#T}](./file/index.md)
- [{#T}](../index.md)
