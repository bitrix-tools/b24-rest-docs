# Эпики в Скраме: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Эпик — это тема или большая цель, к которой относятся задачи Скрама, например «Регистрация пользователей» или «Каталог товаров». С эпиками команда может:

- группировать задачи бэклога и спринтов по общей цели
- задавать теме цвет
- хранить описание и файлы, общие для всех задач темы

Эпики работают внутри Скрама. Как устроен Скрам и с чего начать работу с ним, описано в [обзоре методов Скрама](../index.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать в Скрам](https://helpdesk.bitrix24.ru/open/14659922/)

## Связь эпиков с другими объектами

Эпик связан со Скрамом, задачами Скрама и пользователями.

**Скрам.** Эпик относится к одному Скраму — группе, у которой заполнено поле `SCRUM_MASTER_ID`. Идентификатор Скрама передается в поле `groupId`. Найти Скрамы можно методом [socialnetwork.api.workgroup.list](../../socialnetwork-api-workgroup-list.md) с параметрами `filter: {"!SCRUM_MASTER_ID": false}` и `select: ["ID", "NAME", "SCRUM_MASTER_ID"]`: в ответе у Скрама заполнено поле `scrumMasterId`, а его `id` и есть `groupId`.

**Задача.** Задача Скрама прикрепляется к эпику через поле `epicId` метода [tasks.api.scrum.task.update](../task/tasks-api-scrum-task-update.md). Чтобы открепить задачу, передайте `epicId: 0`.

**Пользователь.** Поля `createdBy` и `modifiedBy` содержат идентификаторы пользователей, которые создали и последними изменили эпик. Получить идентификатор пользователя можно методом [user.get](../../../user/user-get.md).

## Как начать работу

1. Найдите Скрам методом [socialnetwork.api.workgroup.list](../../socialnetwork-api-workgroup-list.md) и запомните его `id`
2. Создайте эпик методом [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md): передайте `groupId` Скрама и название `name`. Идентификатор эпика вернется в `result.id`
3. Подготовьте задачу в том же Скраме: при создании задачи методом [tasks.task.add](../../../tasks/tasks-task-add.md) передайте в `GROUP_ID` идентификатор Скрама. Как добавить задачу в бэклог или спринт, описано в [обзоре методов задач Скрама](../task/index.md)
4. Прикрепите задачу к эпику методом [tasks.api.scrum.task.update](../task/tasks-api-scrum-task-update.md): в `id` передайте идентификатор задачи, в `fields.epicId` — идентификатор эпика. Если задачи еще нет в бэклоге или спринте, передайте в `fields` еще `entityId` бэклога или спринта и `createdBy` — без `createdBy` метод вернет ошибку `Item not created`
5. Проверьте результат методом [tasks.api.scrum.task.get](../task/tasks-api-scrum-task-get.md): поле `epicId` в ответе совпадет с идентификатором эпика

## Данные эпика

Методы [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md) и [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md) возвращают объект эпика в `result`, метод [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) — массив таких объектов. В `list` поля, которых нет в `select`, приходят со значением `0` или пустой строкой.

Пример объекта эпика сразу после создания — `modifiedBy` у нового эпика равен `0`:

```json
{
    "id": 2,
    "groupId": 2,
    "name": "Регистрация пользователей",
    "description": "Форма входа и восстановление пароля",
    "createdBy": 1,
    "modifiedBy": 0,
    "color": "#69dafc"
}
```

Прикрепленные файлы возвращает только метод [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md): в поле `files.VALUE` лежат идентификаторы привязок файлов. Имя файла и ссылку на скачивание по такому идентификатору возвращает метод [disk.attachedObject.get](../../../disk/attached-object/disk-attached-object-get.md).

## Как прикрепить файлы к эпику

К эпику можно прикреплять файлы Диска. Передайте в `fields.files` метода [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md) или [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md) массив идентификаторов файлов с префиксом `n`, например `"files": ["n428", "n345"]`. Идентификатор без префикса и несуществующий файл методы пропускают без ошибки.

Используйте идентификатор `ID` объекта с `TYPE: "file"` из ответа методов Диска:

- загрузки файла: [disk.storage.uploadfile](../../../disk/storage/disk-storage-upload-file.md) или [disk.folder.uploadfile](../../../disk/folder/disk-folder-upload-file.md)
- получения списка файлов: [disk.storage.getchildren](../../../disk/storage/disk-storage-get-children.md) или [disk.folder.getchildren](../../../disk/folder/disk-folder-get-children.md). Эти методы возвращают и файлы, и папки

Метод [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md) добавляет новые файлы к уже прикрепленным, а пустой массив `files` открепляет все файлы.

## Доступ к методам

Методы [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md), [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md), [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md) и [tasks.api.scrum.epic.delete](./tasks-api-scrum-epic-delete.md) работают, если у пользователя есть доступ к задачам группы Скрама. Без такого доступа методы вернут `Access denied`.

Метод [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) возвращает эпики только тех групп, в которых состоит пользователь. Метод [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md) возвращает описание полей без проверки доступа к конкретному Скраму.

Как авторизовать запросы, описано в статье [Авторизация в REST](../../../../settings/how-to-call-rest-api/authorization.md), ограничения на частоту запросов — в статье [Лимиты REST API](../../../../settings/performance/limits.md).

## Что важно учитывать

- Удаление эпика не открепляет задачи: они сохраняют `epicId` удаленного эпика. Перед [удалением](./tasks-api-scrum-epic-delete.md) открепите задачи через `epicId: 0`
- В `filter` метода [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) имена полей пишутся в верхнем регистре, например `GROUP_ID`. Поле `groupId` метод не узнает и вернет пустой список без ошибки
- Метод [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) возвращает до 50 эпиков за вызов и не отдает `total` и `next`. Следующую страницу запрашивайте с параметром `start`, увеличенным на 50

## Обзор методов {#all-methods}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md) | Добавляет эпик в Скрам ||
|| [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md) | Обновляет эпик в Скраме ||
|| [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md) | Получает значения полей эпика по его `id` ||
|| [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) | Получает список эпиков ||
|| [tasks.api.scrum.epic.delete](./tasks-api-scrum-epic-delete.md) | Удаляет эпик ||
|| [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md) | Получает доступные поля эпика ||
|#
