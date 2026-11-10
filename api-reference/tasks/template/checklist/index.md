# Чек-листы шаблонов задач: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чек-листы шаблонов задач позволяют заранее подготовить список действий для задач, которые будут создаваться по шаблону.

Методы `tasks.template.checklist.*` работают с чек-листом шаблона задачи. Они позволяют добавлять пункты, изменять их, переставлять, отмечать выполненными или возвращать в работу, а также добавлять и удалять вложения.

Для чек-листов существующих задач используйте группу методов [task.checklistitem.*](../../checklist-item/index.md).

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация:
> - [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)
> - [Чек-листы в задачах: как создать и работать с ними](https://helpdesk.bitrix24.ru/open/27333140/)

## Как начать работу

1. Создайте шаблон задачи методом [tasks.template.add](../tasks-template-add.md). Идентификатор шаблона из ответа передавайте во все методы `tasks.template.checklist.*` в параметре `templateId`
2. Создайте чек-лист методом [tasks.template.checklist.add](./tasks-template-checklist-add.md): сначала корневой пункт с `PARENT_ID` = `0` — это название чек-листа, затем пункты с `PARENT_ID` корневого пункта
3. Получите структуру чек-листа и идентификаторы пунктов методом [tasks.template.checklist.list](./tasks-template-checklist-list.md)
4. Измените пункт методом [tasks.template.checklist.update](./tasks-template-checklist-update.md) или удалите его вместе с подпунктами методом [tasks.template.checklist.delete](./tasks-template-checklist-delete.md)

Порядок, статус и вложения пунктов меняют отдельные методы — они перечислены в [обзоре методов](#all-methods).

## Связь с другими объектами

**Шаблон задачи.** Все методы `tasks.template.checklist.*` работают с чек-листом конкретного шаблона задачи. Идентификатор шаблона передается в параметре `templateId`. Получить идентификатор нового шаблона можно при создании методом [tasks.template.add](../tasks-template-add.md). Для чтения данных шаблона по идентификатору используйте [tasks.template.get](../tasks-template-get.md).

**Файлы.** К пункту чек-листа шаблона задачи можно прикрепить файлы Диска методом [tasks.template.checklist.addAttachmentsFromDisk](./tasks-template-checklist-add-attachments-from-disk.md). В параметре `filesIds` передайте массив с идентификаторами файлов Диска. Перед каждым идентификатором укажите префикс `n`, например: `["n428", "n345"]`. Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:

- [disk.storage.uploadfile](../../../disk/storage/disk-storage-upload-file.md)
- [disk.folder.uploadfile](../../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:

- [disk.storage.getchildren](../../../disk/storage/disk-storage-get-children.md)
- [disk.folder.getchildren](../../../disk/folder/disk-folder-get-children.md)

## Особенности работы методов

- **Формат ответа `list`.** Метод [tasks.template.checklist.list](./tasks-template-checklist-list.md) возвращает значения строками, а флаги — как `Y` и `N`. Остальные методы возвращают числа и `true` или `false`. Постраничной выборки у `list` нет, все пункты приходят одним ответом
- **Идентификаторы вложений.** В объекте `attachments` ключ — идентификатор прикрепления, его передают в `attachmentsIds` метода [tasks.template.checklist.removeAttachments](./tasks-template-checklist-remove-attachments.md). Значение вида `n10921` — идентификатор файла на Диске
- **Удаление пункта.** Метод [tasks.template.checklist.delete](./tasks-template-checklist-delete.md) удаляет пункт вместе со всеми подпунктами, файлы при этом остаются на Диске

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные методы

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.add](./tasks-template-checklist-add.md) | Добавляет пункт чек-листа ||
|| [tasks.template.checklist.update](./tasks-template-checklist-update.md) | Обновляет пункт чек-листа ||
|| [tasks.template.checklist.get](./tasks-template-checklist-get.md) | Получает пункт чек-листа по идентификатору ||
|| [tasks.template.checklist.list](./tasks-template-checklist-list.md) | Получает список пунктов чек-листа ||
|| [tasks.template.checklist.delete](./tasks-template-checklist-delete.md) | Удаляет пункт чек-листа ||
|#

### Порядок и статус

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.moveAfter](./tasks-template-checklist-move-after.md) | Перемещает пункт после указанного ||
|| [tasks.template.checklist.moveBefore](./tasks-template-checklist-move-before.md) | Перемещает пункт перед указанным ||
|| [tasks.template.checklist.complete](./tasks-template-checklist-complete.md) | Отмечает пункт как выполненный ||
|| [tasks.template.checklist.renew](./tasks-template-checklist-renew.md) | Возвращает пункт в невыполненное состояние ||
|#

### Вложения

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.addAttachmentByContent](./tasks-template-checklist-add-attachment-by-content.md) | Добавляет вложение из содержимого ||
|| [tasks.template.checklist.addAttachmentsFromDisk](./tasks-template-checklist-add-attachments-from-disk.md) | Добавляет вложения из Диска ||
|| [tasks.template.checklist.removeAttachments](./tasks-template-checklist-remove-attachments.md) | Удаляет вложения пункта чек-листа ||
|#
