# Чек-листы шаблонов задач: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Чек-листы шаблонов задач позволяют заранее подготовить список действий для задач, которые будут создаваться по шаблону.

Методы `tasks.template.checklist.*` работают с чек-листом шаблона задачи. Они позволяют добавлять пункты, изменять их, переставлять, отмечать выполненными или возвращать в работу, а также добавлять и удалять вложения.

С чек-листами шаблонов работают две версии API. Методы прошлой версии вызываются по адресу `/rest/`, методы REST 3.0 — по адресу `/rest/api/`, у них поля в camelCase и отдельная группа `tasks.template.checklist.item.*` для работы с одним пунктом. Часть имен в двух версиях совпадает, но поведение разное: `tasks.template.checklist.get` в прошлой версии возвращает один пункт, а в REST 3.0 — весь чек-лист. Методы `complete` и `renew` в прошлой версии меняют один пункт, а в REST 3.0 — все пункты сразу.

Для чек-листов существующих задач используйте группу методов [task.checklistitem.*](../../checklist-item/index.md).

> Быстрый переход: [все методы](#all-methods) | [методы REST 3.0](#rest-v3)
> 
> Пользовательская документация:
> - [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)
> - [Чек-листы в задачах: как создать и работать с ними](https://helpdesk.bitrix24.ru/open/27333140/)

## Как начать работу

1. Создайте шаблон задачи методом [tasks.template.add](../tasks-template-add.md) или [tasks.template.add](../tasks-template-add-rest-v3.md) v 3.0. Идентификатор шаблона из ответа передавайте во все методы чек-листа в параметре `templateId`
2. Создайте чек-лист. Сначала добавьте корневой пункт — это название чек-листа, затем пункты с идентификатором корневого пункта в родителе. В прошлой версии используйте [tasks.template.checklist.add](./tasks-template-checklist-add.md) с `PARENT_ID`, в REST 3.0 — [tasks.template.checklist.item.add](./tasks-template-checklist-item-add-rest-v3.md) v 3.0 с `parentId`. Весь чек-лист одним вызовом сохраняет метод [tasks.template.checklist.save](./tasks-template-checklist-save-rest-v3.md) v 3.0
3. Получите структуру чек-листа и идентификаторы пунктов методом [tasks.template.checklist.list](./tasks-template-checklist-list.md) или [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) v 3.0
4. Измените пункт методом [tasks.template.checklist.update](./tasks-template-checklist-update.md) или [tasks.template.checklist.item.update](./tasks-template-checklist-item-update-rest-v3.md) v 3.0. Удалите пункт вместе с подпунктами методом [tasks.template.checklist.delete](./tasks-template-checklist-delete.md) или [tasks.template.checklist.item.delete](./tasks-template-checklist-item-delete-rest-v3.md) v 3.0

Порядок, статус и вложения пунктов меняют отдельные методы — они перечислены в [обзоре методов](#all-methods) и в разделе [Методы REST 3.0](#rest-v3).

## Связь с другими объектами

**Шаблон задачи.** Все методы чек-листа работают с чек-листом конкретного шаблона задачи. Идентификатор шаблона передается в параметре `templateId`. Получить идентификатор нового шаблона можно при создании методом [tasks.template.add](../tasks-template-add.md) или [tasks.template.add](../tasks-template-add-rest-v3.md) v 3.0. Для чтения данных шаблона по идентификатору используйте [tasks.template.get](../tasks-template-get.md) или [tasks.template.get](../tasks-template-get-rest-v3.md) v 3.0.

**Участники.** В REST 3.0 у пункта чек-листа можно указать соисполнителей и наблюдателей в полях `accomplices` и `auditors`. Эти пользователи добавляются и в участники шаблона. Идентификаторы пользователей можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Файлы.** К пункту чек-листа шаблона задачи можно прикрепить файлы Диска. В прошлой версии используйте метод [tasks.template.checklist.addAttachmentsFromDisk](./tasks-template-checklist-add-attachments-from-disk.md): в параметре `filesIds` передайте массив с идентификаторами файлов Диска, перед каждым идентификатором укажите префикс `n`, например: `["n428", "n345"]`. В REST 3.0 используйте метод [tasks.template.checklist.item.attachment.attach](./tasks-template-checklist-item-attachment-attach-rest-v3.md) v 3.0: в `fileIds` передайте идентификаторы файлов без префикса. Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:

- [disk.storage.uploadfile](../../../disk/storage/disk-storage-upload-file.md)
- [disk.folder.uploadfile](../../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:

- [disk.storage.getchildren](../../../disk/storage/disk-storage-get-children.md)
- [disk.folder.getchildren](../../../disk/folder/disk-folder-get-children.md)

Загрузить файл сразу в пункт можно методом [tasks.template.checklist.addAttachmentByContent](./tasks-template-checklist-add-attachment-by-content.md) или [tasks.template.checklist.item.attachment.upload](./tasks-template-checklist-item-attachment-upload-rest-v3.md) v 3.0.

## Особенности работы методов

### Прошлая версия

- **Формат ответа `list`.** Метод [tasks.template.checklist.list](./tasks-template-checklist-list.md) возвращает значения строками, а флаги — как `Y` и `N`. Остальные методы возвращают числа и `true` или `false`. Постраничной выборки у `list` нет, все пункты приходят одним ответом
- **Идентификаторы вложений.** В объекте `attachments` ключ — идентификатор прикрепления, его передают в `attachmentsIds` метода [tasks.template.checklist.removeAttachments](./tasks-template-checklist-remove-attachments.md). Значение вида `n10921` — идентификатор файла на Диске
- **Удаление пункта.** Метод [tasks.template.checklist.delete](./tasks-template-checklist-delete.md) удаляет пункт вместе со всеми подпунктами, файлы при этом остаются на Диске

### REST 3.0

- **Сохранение целиком.** Метод [tasks.template.checklist.save](./tasks-template-checklist-save-rest-v3.md) удаляет пункты, которых нет в переданном списке. Пустой список очищает чек-лист. Вложения существующих пунктов этот метод не меняет — для них есть методы `tasks.template.checklist.item.attachment.*`
- **Порядок пунктов.** Метод [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) возвращает пункты плоским списком. Дерево собирается по `parentId`: значение `0` или `null` означает корневой пункт
- **Перемещение.** Метод [tasks.template.checklist.item.move](./tasks-template-checklist-item-move-rest-v3.md) задает позицию пункта родителем и номером `sortIndex`, а не соседним пунктом, как методы прошлой версии
- **Открепление файлов.** Файл, прикрепленный с Диска, после открепления остается на Диске. Файл, загруженный методом [tasks.template.checklist.item.attachment.upload](./tasks-template-checklist-item-attachment-upload-rest-v3.md), при откреплении удаляется
- **Пункт другого шаблона.** Если передать идентификатор пункта, который не принадлежит шаблону из `templateId`, метод вернет ошибку «не найдено»

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

## Методы REST 3.0 {#rest-v3}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Методы вызываются по адресу с `/rest/api/`. Особенности вызова и формат ответа описаны в [обзоре REST 3.0](../../../rest-v3.md).

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) | Возвращает все пункты чек-листа шаблона ||
|| [tasks.template.checklist.save](./tasks-template-checklist-save-rest-v3.md) | Сохраняет чек-лист шаблона целиком ||
|| [tasks.template.checklist.complete](./tasks-template-checklist-complete-rest-v3.md) | Отмечает выполненными все пункты ||
|| [tasks.template.checklist.renew](./tasks-template-checklist-renew-rest-v3.md) | Снимает отметку о выполнении со всех пунктов ||
|| [tasks.template.checklist.item.add](./tasks-template-checklist-item-add-rest-v3.md) | Добавляет пункт ||
|| [tasks.template.checklist.item.update](./tasks-template-checklist-item-update-rest-v3.md) | Изменяет пункт ||
|| [tasks.template.checklist.item.delete](./tasks-template-checklist-item-delete-rest-v3.md) | Удаляет пункт ||
|| [tasks.template.checklist.item.move](./tasks-template-checklist-item-move-rest-v3.md) | Перемещает пункт ||
|| [tasks.template.checklist.item.complete](./tasks-template-checklist-item-complete-rest-v3.md) | Отмечает пункт выполненным ||
|| [tasks.template.checklist.item.renew](./tasks-template-checklist-item-renew-rest-v3.md) | Снимает отметку о выполнении с пункта ||
|| [tasks.template.checklist.item.collapse](./tasks-template-checklist-item-collapse-rest-v3.md) | Сворачивает пункт ||
|| [tasks.template.checklist.item.expand](./tasks-template-checklist-item-expand-rest-v3.md) | Разворачивает пункт ||
|| [tasks.template.checklist.item.attachment.attach](./tasks-template-checklist-item-attachment-attach-rest-v3.md) | Прикрепляет к пункту файлы Диска ||
|| [tasks.template.checklist.item.attachment.upload](./tasks-template-checklist-item-attachment-upload-rest-v3.md) | Загружает файл в пункт ||
|| [tasks.template.checklist.item.attachment.detach](./tasks-template-checklist-item-attachment-detach-rest-v3.md) | Открепляет файлы от пункта ||
|#
