# Чек-листы шаблонов задач: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Чек-листы шаблонов задач позволяют заранее подготовить список действий для задач, которые будут создаваться по шаблону.

Методы раздела работают с чек-листом шаблона задачи. Они позволяют добавлять пункты, изменять их, переставлять, отмечать выполненными или возвращать в работу, а также добавлять и удалять вложения.

Для чек-листов существующих задач используйте методы раздела [Чек-листы задач](../../checklist-item/index.md).

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [чек-листы в задачах](https://helpdesk.bitrix24.ru/open/17657420/)

## Как начать работу

1. Создайте шаблон задачи методом [tasks.template.add](../tasks-template-add.md). Идентификатор нового шаблона можно получить в ответе метода. Он используется во всех методах раздела в параметре `templateId`
2. Создайте структуру чек-листа методом [tasks.template.checklist.add](./tasks-template-checklist-add.md). Если нужно создать вложенный пункт, передайте идентификатор родительского пункта в поле `PARENT_ID`
3. Получите информацию о пункте чек-листа методом [tasks.template.checklist.get](./tasks-template-checklist-get.md), если нужно проверить его параметры. Используйте, когда нужно получить один пункт по известному `checkListItemId`
4. Получите список пунктов методом [tasks.template.checklist.list](./tasks-template-checklist-list.md), если нужно проверить структуру чек-листа и получить идентификаторы пунктов
5. Измените содержимое пункта методом [tasks.template.checklist.update](./tasks-template-checklist-update.md), если нужно скорректировать название, описание или другие параметры
6. Измените порядок пунктов методами [tasks.template.checklist.moveAfter](./tasks-template-checklist-move-after.md) и [tasks.template.checklist.moveBefore](./tasks-template-checklist-move-before.md), если нужно переставить пункт относительно другого пункта
7. Измените статус пункта методами [tasks.template.checklist.complete](./tasks-template-checklist-complete.md) и [tasks.template.checklist.renew](./tasks-template-checklist-renew.md), если нужно отметить пункт как выполненный или вернуть его в работу
8. Добавьте вложения методами [tasks.template.checklist.addAttachmentByContent](./tasks-template-checklist-add-attachment-by-content.md) и [tasks.template.checklist.addAttachmentsFromDisk](./tasks-template-checklist-add-attachments-from-disk.md), если пункт должен содержать файлы
9. Если вложения больше не нужны, удалите их методом [tasks.template.checklist.removeAttachments](./tasks-template-checklist-remove-attachments.md)
10. Если пункт больше не нужен, удалите его методом [tasks.template.checklist.delete](./tasks-template-checklist-delete.md)

## Связь с другими объектами

**Шаблон задачи.** Все методы раздела работают с чек-листом конкретного шаблона задачи. Идентификатор шаблона передается в параметре `templateId`. Получить идентификатор нового шаблона можно при создании методом [tasks.template.add](../tasks-template-add.md). Для чтения данных шаблона по идентификатору используйте [tasks.template.get](../tasks-template-get.md).

**Файлы.** К пункту чек-листа шаблона задачи можно прикрепить файлы Диска методом [tasks.template.checklist.addAttachmentsFromDisk](./tasks-template-checklist-add-attachments-from-disk.md). В параметре `filesIds` передайте массив с идентификаторами файлов Диска. Перед каждым идентификатором укажите префикс `n`, например: `["n428", "n345"]`. Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../../../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../../../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren](../../../disk/folder/disk-folder-get-children.md)

{% note tip "Пользовательская документация" %}

- [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)

{% endnote %}

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
