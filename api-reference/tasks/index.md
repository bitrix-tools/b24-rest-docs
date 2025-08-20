# Задачи: обзор методов

Задачи в Битрикс24 — единое пространство, которое помогает организовать работу команды: поручать небольшие задания и управлять крупными проектами. В задачах можно отслеживать процесс работы сотрудников, контролировать сроки и распределять обязанности.

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [задачи Битрикс24](https://helpdesk.bitrix24.ru/open/17962166/) 

## Особенности методов задач

В методах задач нужно соблюдать порядок следования параметров в запросе, указанный в таблицах параметров. Иначе запрос выполнится с ошибками.

## Карточка задачи

Карточку задачи можно разделить на блоки:

- описание
- системные и пользовательские поля
- комментарии, история и учет времени

Описание задачи содержит информацию о том, что нужно сделать. К тексту можно добавить чек-листы, файлы и связи с другими задачами.

Чек-листы помогут составить список шагов для выполнения задачи. Управлять чек-листами можно с помощью группы методов [task.checklistitem.*](./checklist-item/index.md).

Связь с задачами создавайте методом [task.dependence.add](./task-dependence-add.md). Удаляйте — методом [task.dependence.delete](./task-dependence-delete.md).

При создании задачи заполните системные поля: укажите исполнителя, наблюдателей, крайний срок выполнения, теги и так далее. 

Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, дата со временем и да/нет. Создавать, изменять, получать или удалять пользовательские поля задач можно группой методов [task.item.userfield.*](./user-field/index.md).

В комментариях обсуждайте задачу и пишите о результатах работы.  Для работы с комментариями используйте группу методов [task.commentitem.*](./comment-item/index.md).

Итог работы над задачей можно записать в комментарий и зафиксировать как результат. Управляйте результатами задачи группой методов [tasks.task.result.*](./result/index.md).

Учет времени в задачах отслеживает время, затраченное сотрудником на задачу. Работать с записями о затраченном времени можно с помощью группы методов [task.elapseditem.*](./elapsed-item/index.md).

Все действия с задачей фиксируются и сохраняются в истории задачи. Чтобы получить историю используйте метод [tasks.task.history.list](./tasks-task-history-list.md).

{% note tip "Пользовательская документация" %}

  - [Как создать задачу](https://helpdesk.bitrix24.ru/open/17958164/)
  - [Чек-листы в задачах](https://helpdesk.bitrix24.ru/open/17657420/)
  - [Учет времени в задачах](https://helpdesk.bitrix24.ru/open/17980006/)
  - [Дополнительные возможности задач](https://helpdesk.bitrix24.ru/open/17821400/)

{% endnote %}

## Связь задач с другими объектами

**Родительская задача.** У задачи могут быть подзадачи. В этом случае она считается родительской. Добавить привязку к родительской задаче можно в параметре `PARENT_ID`. Получить идентификатор задачи можно методом [создания задачи](./tasks-task-add.md) или [получения списка задач](./tasks-task-list.md).

**Группа или Проект.** Задача привязывается по идентификатору группы `GROUP_ID`. Получить идентификатор можно методом [создания новой группы](../sonet-group/sonet-group-create.md) или методом [получения списка групп](../sonet-group/socialnetwork-api-workgroup-list.md).

**Пользователь.** Задача имеет привязку к пользователям по числовым идентификаторам в полях:
  - `CREATED_BY` — постановщик
  - `RESPONSIBLE_ID` — исполнитель
  - `ACCOMPLICES` — соисполнители
  - `AUDITORS` — наблюдатели
  - `CHANGED_BY`  — последний пользователь, который изменил задачу
  - `STATUS_CHANGED_BY` — последний пользователь, который изменил статус задачи 
  - `CLOSED_BY` — пользователь, который завершил задачу

Получить идентификатор пользователя можно с помощью метода [user.get](../user/user-get.md).

**CRM.** К задаче можно привязать объекты CRM: контакты, компании, лиды, сделки, счета и смарт-процессы. Чтобы привязать объект, укажите в параметре `UF_CRM_TASK` его [идентификатор с префиксом](../crm/data-types.md#object_type). Например, `C_3` для контакта с `id = 3`. Получить идентификатор можно методом [создания нового элемента CRM](../crm/universal/crm-item-add.md) или методом [получения списка элементов](../crm/universal/crm-item-list.md).

**Почта.** Задача может быть связана с письмом по идентификатору через параметр `UF_MAIL_MESSAGE`.

{% note tip "Пользовательская документация" %}

  - [Как создать подзадачу](https://helpdesk.bitrix24.ru/open/17750248/)
  - [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

{% endnote %}

## Файлы Диска

К описанию задачи можно прикрепить файлы Диска. В параметре `UF_TASK_WEBDAV_FILES` передайте массив с идентификаторами файлов Диска. Перед каждым идентификатором укажите префикс `n`, например: `"UF_TASK_WEBDAV_FILES": ["n428", "n345"]`. Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren ](../disk/folder/disk-folder-get-children.md)

Прикрепляйте файлы к задаче методом [tasks.task.files.attach](./tasks-task-files-attach.md), если задача уже создана.

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)

{% endnote %}

## Потоки

Потоки — это инструмент, который автоматизирует распределение и выполнение задач. Сотрудникам не нужно искать, кто будет делать задачу. Они ставят задачи в поток отдела, и он автоматически назначает исполнителя.

Управлять Потоками можно группой методов [tasks.flow.Flow.*](./flow/index.md). 

{% note tip "Пользовательская документация" %}

  - [Битрикс24 Потоки: начало работы](https://helpdesk.bitrix24.ru/open/21307026/)

{% endnote %}

## Задачи в Скраме

Задачи в Скраме — это стандартные задачи Битрикс24 с расширенными возможностями для работы по методологии Скрам. В скраме команда может:

  - оценивать сложность задач с помощью сторипоинтов
  - прикреплять задачи к эпикам
  - размещать задачи в бэклоге и спринтах
  - передвигать задачи по стадиям спринта в процессе работы

Подробнее о Скраме и его методах — в статье [Скрам: обзор методов](../sonet-group/scrum/index.md).

{% note tip "Пользовательская документация" %}

  - [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/)

{% endnote %}

## Режимы работы с задачами

Канбан — это инструмент, который помогает визуально представить работу с задачами в виде колонок и карточек. Колонки — это стадии работы, карточки — задачи. Канбан используется для работы с задачами в группах и проектах.

«Мой план» — это режим управления своими задачами в виде канбана. У каждого сотрудника будут свои стадии «Моего плана».

Управлять стадиями канбана и «Моего плана» можно группой методов [task.stages.*](./stages/index.md).

## Задачи в «Плане на день»

«План на день» — это список дел, задач и встреч, которые вы запланировали на рабочий день. Метод [task.planner.getlist](./planner/index.md) получает список задач из «Плана на день».

## Виджеты

В карточку задачи можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку. 

- [Вкладка в карточке задачи](../widgets/task/view-tab.md) `TASK_VIEW_TAB`
- [Правая панель карточки задачи](../widgets/task/view-sidebar.md) `TASK_VIEW_SIDEBAR`
- [Ссылка в верхней части карточки задачи](../widgets/task/view-top-panel.md) `TASK_VIEW_TOP_PANEL`

Приложение можно встроить в списке задач:

- [Пункт контекстного меню списка](../widgets/task/index.md) `TASK_LIST_CONTEXT_MENU` 

В режимах работы с задачами канбан или «Мой план» есть ещё два специальных места для встройки:

- [Пункт основного выпадающего меню](../widgets/task/list-toolbar.md) `TASK_USER_LIST_TOOLBAR`, `TASK_GROUP_LIST_TOOLBAR`
- [Пункт основного выпадающего меню около настроек роботов](../widgets/task/robot-designer-toolbar.md) `TASK_ROBOT_DESIGNER_TOOLBAR`


## Обзор методов и событий {#all-methods}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [tasks.task.add](./tasks-task-add.md) | Создает задачу ||
    || [tasks.task.update](./tasks-task-update.md) | Обновляет задачу ||
    || [tasks.task.get](./tasks-task-get.md) | Получает информацию о задаче по `id` ||
    || [tasks.task.list](./tasks-task-list.md) | Получает список задач ||
    || [tasks.task.files.attach](./tasks-task-files-attach.md) | Прикрепляет файлы к задаче ||
    || [tasks.task.delegate](./tasks-task-delegate.md) | Делегирует задачи ||
    || [tasks.task.counters.get](./tasks-task-counters-get.md) | Получает счетчики пользователя ||
    || [tasks.task.start](./tasks-task-start.md) | Переводит задачу в статус «выполняется» ||
    || [tasks.task.pause](./tasks-task-pause.md) | Останавливает выполнение задачи и переводит в статус «ждет выполнения» ||
    || [tasks.task.defer](./tasks-task-defer.md) | Переводит задачу в статус «отложена» ||
    || [tasks.task.complete](./tasks-task-complete.md) | Переводит задачу в статус «завершена» ||
    || [tasks.task.renew](./tasks-task-renew.md) | Возобновляет задачу после ее завершения ||
    || [tasks.task.approve](./tasks-task-approve.md) | Принимает задачу ||
    || [tasks.task.disapprove](./tasks-task-disapprove.md) | Отклоняет задачу ||
    || [tasks.task.delete](./tasks-task-delete.md) | Удаляет задачу ||
    || [tasks.task.startwatch](./tasks-task-start-watch.md) | Позволяет наблюдать за задачей ||
    || [tasks.task.stopwatch](./tasks-task-stop-watch.md) | Останавливает наблюдение за задачей ||
    || [tasks.task.favorite.add](./tasks-task-favorite-add.md) | Добавляет задачи в избранное ||
    || [tasks.task.favorite.remove](./tasks-task-favorite-remove.md) | Удаляет задачи из избранного ||
    || [tasks.task.getFields](./tasks-task-get-fields.md) |	Получает доступные поля ||
    || [tasks.task.getaccess](./tasks-task-get-access.md) |	Проверяет доступ к задаче ||
    || [tasks.task.history.list](./tasks-task-history-list.md) | Получает историю задачи ||
    || [tasks.task.mute](./tasks-task-mute.md) | Включает режим «Без звука» ||
    || [tasks.task.unmute](./tasks-task-unmute.md) | Выключает режим «Без звука» ||
    || [task.dependence.add](./task-dependence-add.md) | Создает зависимость одной задачи от другой ||
    || [task.dependence.delete](./task-dependence-delete.md) | Удаляет зависимость одной задачи от другой ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnTaskAdd](./events-tasks/on-task-add.md) | При добавлении задачи ||
    || [OnTaskUpdate](./events-tasks/on-task-update.md) | При обновлении задачи ||
    || [OnTaskDelete](./events-tasks/on-task-delete.md) | При удалении задачи ||
    |#

{% endlist %}

### Результат задачи

#|
|| **Метод** | **Описание** ||
|| [tasks.task.result.addFromCommentt](./result/tasks-task-result-add-from-comment.md) | Добавляет комментарий в результат ||
|| [tasks.task.result.list](./result/tasks-task-result-list.md) | Получает список результатов задачи ||
|| [tasks.task.result.deleteFromComment](./result/tasks-task-result-delete-from-comment.md) | Удаляет комментарий из результата задачи ||
|#

### Чек-листы

#|
|| **Метод** | **Описание** ||
|| [task.checklistitem.add](./checklist-item/task-checklist-item-add.md) | Добавляет новый элемент чек-листа к задаче ||
|| [task.checklistitem.update](./checklist-item/task-checklist-item-update.md) | Обновляет данные элемента чек-листа ||
|| [task.checklistitem.get](./checklist-item/task-checklist-item-get.md) | Получает элемент чек-листа по его `id` ||
|| [task.checklistitem.getlist](./checklist-item/task-checklist-item-get-list.md) | Получает список элементов чек-листа в задаче ||
|| [task.checklistitem.moveafteritem](./checklist-item/task-checklist-item-move-after-item.md) | Помещает элемент чек-листа в списке после указанного ||
|| [task.checklistitem.complete](./checklist-item/task-checklist-item-complete.md) | Отмечает элемент чек-листа как выполненный ||
|| [task.checklistitem.renew](./checklist-item/task-checklist-item-renew.md) | Отмечает выполненный элемент чек-листа как вновь активный ||
|| [task.checklistitem.delete](./checklist-item/task-checklist-item-delete.md) | Удаляет элемент чек-листа ||
|| [task.checklistitem.isactionallowed](./checklist-item/task-checklist-item-is-action-allowed.md) | Проверяет, разрешено ли действие для элемента чек-листа ||
|| [task.checklistitem.getmanifest](./checklist-item/task-checklist-item-get-manifest.md) | Получает список методов и их описание ||
|#

### Комментарии

#|
|| **Метод** | **Описание** ||
|| [task.commentitem.add](./comment-item/task-comment-item-add.md) | Создает новый комментарий к задаче ||
|| [task.commentitem.update](./comment-item/task-comment-item-update.md) | Обновляет данные комментария ||
|| [task.commentitem.get](./comment-item/task-comment-item-get.md) | Получает комментарий к задаче ||
|| [task.commentitem.getlist](./comment-item/task-comment-item-get-list.md) | Получает список комментариев к задаче ||
|| [task.commentitem.delete](./comment-item/task-comment-item-delete.md) | Удаляет комментарий ||
|#

### Затраченное время

#|
|| **Метод** | **Описание** ||
|| [task.elapseditem.add](./elapsed-item/task-elapsed-item-add.md) | Добавляет затраченное время к задаче ||
|| [task.elapseditem.update](./elapsed-item/task-elapsed-item-update.md) | Обновляет параметры записи о затраченном времени ||
|| [task.elapseditem.get](./elapsed-item/task-elapsed-item-get.md) | Получает запись о затраченном времени по ее идентификатору ||
|| [task.elapseditem.getlist](./elapsed-item/task-elapsed-item-get-list.md) | Получает список записей о затраченном времени по задаче ||
|| [task.elapseditem.delete](./elapsed-item/task-elapsed-item-delete.md) | Удаляет запись о затраченном времени ||
|| [task.elapseditem.isactionallowed](./elapsed-item/task-elapsed-item-is-action-allowed.md) | Проверяет разрешено ли действие ||
|| [task.elapseditem.getmanifest](./elapsed-item/task-elapsed-item-get-manifest.md) | Получает список методов и их описание ||
|#

### Пользовательские поля

#|
|| **Метод** | **Описание** ||
|| [task.item.userfield.add](./user-field/task-item-user-field-add.md) | Создает новое поле ||
|| [task.item.userfield.update](./user-field/task-item-user-field-update.md) | Обновляет параметры поля ||
|| [task.item.userfield.get](./user-field/task-item-user-field-get.md) | Получает поле по идентификатору ||
|| [task.item.userfield.getlist](./user-field/task-item-user-field-get-list.md) | Получает список полей ||
|| [task.item.userfield.delete](./user-field/task-item-user-field-delete.md) | Удаляет поле ||
|| [task.item.userfield.gettypes](./user-field/task-item-user-field-get-types.md) | Получает все доступные типы данных ||
|| [task.item.userfield.getfields](./user-field/task-item-user-field-get-fields.md) | Получает все доступные поля пользовательского поля ||
|#

### Стадии канбана и «Моего плана»

#|
|| **Метод** | **Описание** ||
|| [task.stages.add](./stages/task-stages-add.md) | Добавляет стадии канбана или «Моего плана» ||
|| [task.stages.update](./stages/task-stages-update.md) | Обновляет стадии канбана или «Моего плана» ||
|| [task.stages.get](./stages/task-stages-get.md) | Получает стадии канбана или «Моего плана» ||
|| [task.stages.canmovetask](./stages/task-stages-can-move-task.md) | Определяет, может ли текущий пользователь перемещать задачи в указанном объекте ||
|| [task.stages.movetask](./stages/task-stages-move-task.md) | Перемещает задачи из одной стадии в другую ||
|| [task.stages.delete](./stages/task-stages-delete.md) | Удаляет стадии канбана или «Моего плана» ||
|#

### Задачи в «Плане на день»

#|
|| **Метод** | **Описание** ||
|| [task.planer.getList](./planner/task-planner-get-list.md) | Получает список задач из «Плана на день» ||
|#

### Потоки

#|
|| **Метод** | **Описание** ||
|| [tasks.flow.Flow.create](./flow/tasks-flow-flow-create.md) | Создать поток ||
|| [tasks.flow.Flow.get](./flow/tasks-flow-flow-get.md) | Получить поток ||
|| [tasks.flow.Flow.update](./flow/tasks-flow-flow-update.md) | Изменить поток ||
|| [tasks.flow.Flow.delete](./flow/tasks-flow-flow-delete.md) | Удалить поток ||
|| [tasks.flow.Flow.isExists](./flow/tasks-flow-flow-is-exists.md) | Проверить, существует ли поток с таким названием ||
|| [tasks.flow.Flow.activate](./flow/tasks-flow-flow-activate.md) | Включить или выключить поток ||
|#
