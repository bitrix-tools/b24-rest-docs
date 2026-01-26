# Поля задачи 

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

Написать статью, в ней должно быть написано какие поля можно модифицировать, какие только читать. Упомянуть, что системные поля модифицируются только с админскими правами и почему. Отдельно указать, как реализуется связь с CRM
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

Запись и изменение полей производится согласно бизнес-логике и с учетом прав пользователя. То есть зависит от роли пользователя, настроек прав на группу, иерархии, статуса задачи и некоторых флагов в задаче, например, `allowChangeDeadline`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор задачи ||
|| **parentId**
[`string`](../data-types.md) | Идентификатор родительской задачи.

Имеет значение `null`, если родительской задачи нет ||
|| **title**
[`string`](../data-types.md) | Название задачи ||
|| **description**
[`string`](../data-types.md) | Описание задачи ||
|| **chatId**
[`integer`](../data-types.md) | Идентификатор чата для [новой карточки задачи](tasks-new.md) ||
|| **mark**
[`string`](../data-types.md) | Оценка задачи. Возможные значения:
`N` — отрицательная
`P` — положительная
`null` — без оценки ||
|| **priority**
[`string`](../data-types.md) | Приоритет задачи. Возможные значения:
- `2` — высокий
- `1` — средний
- `0` — низкий ||
|| **multitask**
[`string`](../data-types.md) | Признак «базовая задача с подзадачами». Возможные значения: 
- `Y` — да
- `N` — нет  ||
|| **notViewed**
[`string`](../data-types.md) | Признак «не просмотрено». Возможные значения: 
- `Y` — не просмотрено
- `N` — просмотрено  ||
|| **replicate**
[`string`](../data-types.md) | Признак «повторять задачу». Возможные значения: 
- `Y` — да, сделать задачу регулярной
- `N` — не повторять ||
|| **stageId**
[`string`](../data-types.md) | Идентификатор стадии ||
|| **sprintId**
[`string`](../data-types.md) | Идентификатор спринта ||
|| **backlogId**
[`string`](../data-types.md) | Идентификатор бэклога ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор постановщика ||
|| **createdDate**
[`string`](../data-types.md) | Дата создания в формате `ISO 8601` ||
|| **responsibleId**
[`string`](../data-types.md) | Идентификатор ответственного ||
|| **changedBy**
[`string`](../data-types.md) | Идентификатор пользователя, изменившего задачу ||
|| **changedDate**
[`string`](../data-types.md) | Дата изменения в формате `ISO 8601` ||
|| **statusChangedBy**
[`string`](../data-types.md) | Идентификатор пользователя, изменившего статус задачи ||
|| **closedBy**
[`string`](../data-types.md) | Идентификатор пользователя, завершившего задачу. Имеет значение `0`, если задача не завершена ||
|| **closedDate**
[`string`](../data-types.md) | Дата завершения в формате `ISO 8601`. Имеет значение `null`, если задача не завершена ||
|| **activityDate**
[`string`](../data-types.md) | Дата последней активности в формате `ISO 8601` ||
|| **dateStart**
[`string`](../data-types.md) | Дата начала ||
|| **deadline**
[`string`](../data-types.md) | Крайний срок ||
|| **startDatePlan**
[`string`](../data-types.md) | Плановая дата начала ||
|| **endDatePlan**
[`string`](../data-types.md) | Плановая дата окончания ||
|| **guid**
[`string`](../data-types.md) | Идентификатор `GUID` задачи ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор ||
|| **commentsCount**
[`string`](../data-types.md) | Количество комментариев ||
|| **serviceCommentsCount**
[`string`](../data-types.md) | Количество системных комментариев ||
|| **allowChangeDeadline**
[`string`](../data-types.md) | Разрешено менять крайний срок. Возможные значения: 
- `Y` — разрешено
- `N` — не разрешено ||
|| **allowTimeTracking**
[`string`](../data-types.md) | Разрешено учитывать время. Возможные значения: 
- `Y` — разрешено
- `N` — не разрешено ||
|| **taskControl**
[`string`](../data-types.md) | Контроль задачи включен. Возможные значения: 
- `Y` — включен
- `N` — отключен ||
|| **addInReport**
[`string`](../data-types.md) | Добавлять в отчет. Возможные значения: 
- `Y` — добавлять 
- `N` — не добавлять  ||
|| **forkedByTemplateId**
[`string`](../data-types.md) | Идентификатор шаблона, если задача создана из шаблона ||
|| **timeEstimate**
[`string`](../data-types.md) | Оценка времени в секундах ||
|| **timeSpentInLogs**
[`string`](../data-types.md) | Фактически затраченное время ||
|| **matchWorkTime**
[`string`](../data-types.md) | Учитывать рабочее время. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **forumTopicId**
[`string`](../data-types.md) | Идентификатор темы комментариев ||
|| **forumId**
[`string`](../data-types.md) | Идентификатор форума ||
|| **siteId**
[`string`](../data-types.md) | Идентификатор сайта ||
|| **subordinate**
[`string`](../data-types.md) | Признак того, что задача я вляется подзадачей. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **exchangeModified**
[`string`](../data-types.md) | Дата изменения синхронизацией в формате `ISO 8601` ||
|| **exchangeId**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **outlookVersion**
[`string`](../data-types.md) | Версия ||
|| **viewedDate**
[`string`](../data-types.md) | Дата просмотра задачи в формате `ISO 8601` ||
|| **sorting**
[`string`](../data-types.md) | Значение сортировки ||
|| **durationFact**
[`string`](../data-types.md) | Фактическая длительность ||
|| **isMuted**
[`string`](../data-types.md) | Признак «без звука». Возможные значения: 
- `Y` — включен
- `N` — выключен ||
|| **isPinned**
[`string`](../data-types.md) | Признак «закреплено». Возможные значения: 
- `Y` — включен
- `N` — выключен ||
|| **isPinnedInGroup**
[`string`](../data-types.md) | Признак «закреплена в группе». Возможные значения: 
- `Y` — закреплена
- `N` — не закреплена  ||
|| **flowId**
[`string`](../data-types.md) | Идентификатор потока ||
|| **descriptionInBbcode**
[`string`](../data-types.md) | Описание в формате BBCode. Возможные значения: 
- `Y` — включено
- `N` — выключено  ||
|| **status**
[`string`](../data-types.md) | Статус задачи. Возможные значения:
- `2` — ждет выполнения
- `3` — выполняется
- `4` — ожидает контроля
- `5` — завершена
- `6` — отложена ||
|| **statusChangedDate**
[`string`](../data-types.md) | Дата изменения статуса в формате `ISO 8601` ||
|| **durationPlan**
[`string`](../data-types.md) | Плановая длительность ||
|| **durationType**
[`string`](../data-types.md) | Единица плановой длительности. Возможные значения: `secs`, `mins`, `hours`, `days`, `weeks`, `monts`, `years` ||
|| **favorite**
[`string`](../data-types.md) | Признак «в избранном». Возможные значения: 
- `Y` — добавлено в избранное
- `N` — не добавлено в избранное ||
|| **groupId**
[`string`](../data-types.md) | Идентификатор группы, к которой привязана задача ||
|| **auditors**
[`array`](../data-types.md) | Список идентификаторов пользователей — наблюдателей за задачей ||
|| **accomplices**
[`array`](../data-types.md) | Список идентификаторов пользователей — соисполнителей ||
|| **checklist**
[`object`](../data-types.md) | Объект с пунктами чек-листа. Ключ — идентификатор пункта, значение — объект с [описанием пункта](#checklist-item) ||
|| **group**
[`object`](../data-types.md) | Объект с [описанием группы](#group) ||
|| **creator**
[`object`](../data-types.md) | Объект с [описанием пользователя](#user) — постановщика задачи ||
|| **responsible**
[`object`](../data-types.md) | Объект с [описанием пользователя](#user) — ответственного за задачу ||
|| **accomplicesData**
[`array`](../data-types.md) | Объект с описанием пользователей — соисполнителей. 

Ключ объекта — идентификатор пользователя, а значение — объект с [описанием пользователя](#user) ||
|| **auditorsData**
[`object`](../data-types.md) | Объект с описанием пользователей — наблюдателей за задачей. 

Ключ объекта — идентификатор пользователя, а значение — объект с [описанием пользователя](#user) ||
|| **newCommentsCount**
[`integer`](../data-types.md) | Количество новых комментариев ||
|| **action**
[`object`](../data-types.md) | Объект с [описанием доступных действий](#action) над задачей ||
|| **checkListTree**
[`object`](../data-types.md) | Объект с [описанием дерева чек-листа](#checklisttree) ||
|| **checkListCanAdd**
[`boolean`](../data-types.md) | Можно ли добавлять пункты чек-листа ||
|| **UF_CRM_TASK**
[`array`](../data-types.md) | Список привязок к элементам CRM в формате:
- `L_XX` — лид,
- `D_XX` — сделка
- `C_XX` — контакт
- `CO_XX` — компания
- `SI_XX` — счет
- `TXX_XX` — смарт-процесс | ||
|| **UF_TASK_WEBDAV_FILES**
[`array`](../data-types.md) | Список файлов с Диска | ||
|| **UF_MAIL_MESSAGE**
[`string`](../data-types.md) | Письмо email | ||
|| **UF_\***
[`any`](../data-types.md) | Пользовательские поля. 

Подробнее в статье [{#T}](./user-field/index.md) | ||
|#

{% note info "" %}

Чтобы получить пользовательские поля задачи, используйте методы выборки [tasks.task.get](./tasks-task-get.md) и [tasks.task.list](./tasks-task-list.md). Укажите нужные поля в параметре `SELECT`. Таким же образом можно получить системные пользовательские поля: `UF_CRM_TASK`, `UF_TASK_WEBDAV_FILES`, `UF_MAIL_MESSAGE`.

{% endnote %}

## Объект checklist.item {#checklist-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор пункта ||
|| **taskId**
[`string`](../data-types.md) | Идентификатор задачи ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор автора пункта ||
|| **parentId**
[`string`](../data-types.md) | Родительский пункт. Значение `0` означает корневой пункт ||
|| **title**
[`string`](../data-types.md) | Заголовок пункта ||
|| **sortIndex**
[`string`](../data-types.md) | Индекс сортировки ||
|| **isComplete**
[`string`](../data-types.md) | Признак завершенности. Возможные значения: 
- `Y` — пункт выполнен
- `N` — пункт не выполнен ||
|| **isImportant**
[`string`](../data-types.md) | Признак важности. Возможные значения: 
- `Y` — важный
- `N` — не важный ||
|| **toggledBy**
[`string`](../data-types.md) | Идентификатор пользователя, изменившего статус пункта ||
|| **toggledDate**
[`string`](../data-types.md) | Дата изменения статуса пункта в формате `ISO 8601` ||
|| **ufChecklistFiles**
[`boolean`](../data-types.md) | Признак наличия файлов в пункте ||
|| **members**
[`array`](../data-types.md) | Список участников пункта ||
|| **attachments**
[`array`](../data-types.md) | Список вложений пункта ||
|| **entityId**
[`string`](../data-types.md) | Идентификатор задачи ||
|| **action**
[`object`](../data-types.md) | Объект с [описанием доступных действий](#checklist-item-action) над пунктом ||
|#

### Объект checklist.item.action {#checklist-item-action}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`boolean`](../data-types.md) | Доступно изменение пункта ||
|| **remove**
[`boolean`](../data-types.md) | Доступно удаление пункта ||
|| **toggle**
[`boolean`](../data-types.md) | Доступно переключение статуса пункта ||
|| **add**
[`boolean`](../data-types.md) | Доступно добавление подпункта ||
|| **addAccomplice**
[`boolean`](../data-types.md) | Доступно добавление соисполнителя в пункт ||
|#

## Объект group {#group}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор группы ||
|| **name**
[`string`](../data-types.md) | Название группы ||
|| **opened**
[`boolean`](../data-types.md) | Признак открытой группы ||
|| **membersCount**
[`integer`](../data-types.md) | Количество участников группы ||
|| **image**
[`string`](../data-types.md) | URL изображения группы ||
|| **additionalData**
[`array`](../data-types.md) | Дополнительные данные группы ||
|#

## Объект с описанием пользователя {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../data-types.md) | Имя и фамилия пользователя ||
|| **link**
[`string`](../data-types.md) | Ссылка на профиль пользователя ||
|| **icon**
[`string`](../data-types.md) | URL аватара пользователя ||
|| **workPosition**
[`string`](../data-types.md) | Должность пользователя ||
|#

## Объект action {#action}

#|
|| **Название**
`тип` | **Описание** ||
|| **accept**
[`boolean`](../data-types.md) | Доступно принять задачу. Устаревшее поле, больше не используется ||
|| **decline**
[`boolean`](../data-types.md) | Доступно отказаться от задачи. Устаревшее поле, больше не используется ||
|| **complete**
[`boolean`](../data-types.md) | Доступно завершить задачу ||
|| **approve**
[`boolean`](../data-types.md) | Доступно принять работу исполнителя по задаче при включенном контроле `taskControl` ||
|| **disapprove**
[`boolean`](../data-types.md) | Доступно выбрать, что исполнителю нужно доделать работу по задаче при включенном контроле `taskControl` ||
|| **start**
[`boolean`](../data-types.md) | Доступно начать выполнение ||
|| **pause**
[`boolean`](../data-types.md) | Доступно приостановить выполнение ||
|| **delegate**
[`boolean`](../data-types.md) | Доступно делегирование ||
|| **remove**
[`boolean`](../data-types.md) | Доступно удаление задачи ||
|| **edit**
[`boolean`](../data-types.md) | Доступно редактирование ||
|| **defer**
[`boolean`](../data-types.md) | Доступно отложить задачу ||
|| **renew**
[`boolean`](../data-types.md) | Доступно возобновление ||
|| **create**
[`boolean`](../data-types.md) | Доступно создание связанных задач ||
|| **changeDeadline**
[`boolean`](../data-types.md) | Доступно изменение крайнего срока ||
|| **checklistAddItems**
[`boolean`](../data-types.md) | Доступно добавление пунктов чек-листа ||
|| **addFavorite**
[`boolean`](../data-types.md) | Доступно добавление в избранное ||
|| **deleteFavorite**
[`boolean`](../data-types.md) | Доступно удаление из избранного ||
|| **rate**
[`boolean`](../data-types.md) | Доступно выставление оценки ||
|| **take**
[`boolean`](../data-types.md) | Доступно взять задачу в работу ||
|| **edit.originator**
[`boolean`](../data-types.md) | Доступно редактирование постановщика ||
|| **checklist.reorder**
[`boolean`](../data-types.md) | Доступна смена порядка пунктов чек-листа ||
|| **elapsedtime.add**
[`boolean`](../data-types.md) | Доступно добавление трудозатрат ||
|| **dayplan.timer.toggle**
[`boolean`](../data-types.md) | Доступно управление таймером в плане на день ||
|| **edit.plan**
[`boolean`](../data-types.md) | Доступно редактирование плановых параметров ||
|| **checklist.add**
[`boolean`](../data-types.md) | Доступно добавление чек-листа ||
|| **favorite.add**
[`boolean`](../data-types.md) | Доступно добавление в избранное ||
|| **favorite.delete**
[`boolean`](../data-types.md) | Доступно удаление из избранного ||
|#

## Объект checkListTree {#checklisttree}

#|
|| **Название**
`тип` | **Описание** ||
|| **nodeId**
[`integer`](../data-types.md) | Идентификатор корневого узла дерева чек-листа ||
|| **fields**
[`object`](../data-types.md) | Объект с [описанием полей узла](#checklisttree-fields) ||
|| **action**
[`array`](../data-types.md) | Массив доступных действий для узла ||
|| **descendants**
[`array`](../data-types.md) | Массив дочерних узлов ||
|#

### Объект checkListTree.fields {#checklisttree-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор пункта для корня ||
|| **copiedId**
[`string`](../data-types.md) | Идентификатор источника при копировании ||
|| **entityId**
[`string`](../data-types.md) | Идентификатор задачи ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя, формирующего дерево ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор автора пункта ||
|| **parentId**
[`string`](../data-types.md) | Идентификатор родителя ||
|| **title**
[`string`](../data-types.md) | Заголовок пункта ||
|| **sortIndex**
[`string`](../data-types.md) | Индекс сортировки ||
|| **displaySortIndex**
[`string`](../data-types.md) | Отображаемый индекс сортировки ||
|| **isComplete**
[`boolean`](../data-types.md) | Признак завершенности пункта ||
|| **isImportant**
[`boolean`](../data-types.md) | Признак важности пункта ||
|| **completedCount**
[`integer`](../data-types.md) | Количество завершенных подпунктов ||
|| **members**
[`array`](../data-types.md) | Массив участников пункта ||
|| **attachments**
[`array`](../data-types.md) | Массив вложений пункта ||
|| **nodeId**
[`string`](../data-types.md) | Идентификатор узла ||
|#

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

#|
|| **Поле** / **Тип** | **Описание** | Значение ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор задачи. | ||
|| **PARENT_ID**
[`integer`](../data-types.md) | ID родительской задачи. | По умолчанию — 0 ||
|| **TITLE^*^**
[`string`](../data-types.md) | Название. Длина поля TITLE не должна превышать 460 символов. В противном случае название задачи без предупреждения будет обрезано с конца. | ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание. | ||
|| **MARK**
[`enum`](../data-types.md) | Оценка. | N — Отрицательная,
P — Положительная.
По умолчанию — null ||
|| **PRIORITY**
[`enum`](../data-types.md) | Приоритет. | 2 — Высокий,
1 — Средний,
0 — Низкий.
По умолчанию — 1 ||
|| **STATUS**
[`enum`](../data-types.md) | Статус. | 2 — Ждет выполнения,
3 — Выполняется,
4 — Ожидает контроля,
5 — Завершена,
6 — Отложена.
По умолчанию — 2 ||
|| **MULTITASK**
[`enum`](../data-types.md) | Множественная задача. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **NOT_VIEWED**
[`enum`](../data-types.md) | NOT_VIEWED | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **REPLICATE**
[`enum`](../data-types.md) | Повторяемая задача. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **GROUP_ID**
[`integer`](../data-types.md) | Группа или проект | По умолчанию — 0 ||
|| **FLOW_ID**
[`integer`](../data-types.md) | Поток | null ||
|| **STAGE_ID**
[`integer`](../data-types.md) | Стадия. | По умолчанию — 0 ||
|| **CREATED_BY^*^**
[`integer`](../data-types.md) | Постановщик. | ||
|| **CREATED_DATE**
[`datetime`](../data-types.md) | Дата создания. | ||
|| **RESPONSIBLE_ID^*^**
[`integer`](../data-types.md) | Исполнитель. | ||
|| **ACCOMPLICES**
[`array`](../data-types.md) | Соисполнители. | ||
|| **AUDITORS**
[`array`](../data-types.md) | Наблюдатели. | ||
|| **CHANGED_BY**
[`integer`](../data-types.md) | Изменил. | ||
|| **CHANGED_DATE**
[`integer`](../data-types.md) | Дата изменения. | ||
|| **STATUS_CHANGED_BY**
[`integer`](../data-types.md) | Изменил статус. | ||
|| **CLOSED_BY**
[`integer`](../data-types.md) | Закрыл задачу. | ||
|| **CLOSED_DATE**
[`datetime`](../data-types.md) | Дата закрытия. | ||
|| **DATE_START**
[`datetime`](../data-types.md) | Дата начала. | null ||
|| **DEADLINE**
[`datetime`](../data-types.md) | Крайний срок. | null ||
|| **START_DATE_PLAN**
[`datetime`](../data-types.md) | Плановое начало. | null ||
|| **END_DATE_PLAN**
[`datetime`](../data-types.md) | Плановое завершение. | null ||
|| **GUID**
[`string`](../data-types.md) | GUID | null ||
|| **XML_ID**
[`string`](../data-types.md) | XML_ID | null ||
|| **COMMENTS_COUNT**
[`integer`](../data-types.md) | Кол-во комментариев | ||
|| **NEW_COMMENTS_COUNT**
[`integer`](../data-types.md) | Кол-во новых комментариев. | ||
|| **ALLOW_CHANGE_DEADLINE**
[`enum`](../data-types.md) | Разрешить менять сроки. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **ALLOW_TIME_TRACKING**
[`enum`](../data-types.md) | Разрешить учет времени для задачи | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **TASK_CONTROL**
[`enum`](../data-types.md) | Принять работу. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **ADD_IN_REPORT**
[`enum`](../data-types.md) | Добавить в отчёт. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **FORKED_BY_TEMPLATE_ID**
[`enum`](../data-types.md) | Создано из шаблона. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **TIME_ESTIMATE**
[`integer`](../data-types.md) | Время, выделенное на задачу. | ||
|| **TIME_SPENT_IN_LOGS**
[`integer`](../data-types.md) | Затраченное время из истории изменений. | ||
|| **MATCH_WORK_TIME**
[`integer`](../data-types.md) | Пропустить выходные дни. | ||
|| **FORUM_TOPIC_ID**
[`integer`](../data-types.md) | Идентификатор темы форума. | ||
|| **FORUM_ID**
[`integer`](../data-types.md) | Идентификатор форума. | ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта. | ||
|| **SUBORDINATE**
[`enum`](../data-types.md) | Задача подчиненного. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **FAVORITE**
[`enum`](../data-types.md) | Добавлен в Избранное. | ||
|| **EXCHANGE_MODIFIED**
[`datetime`](../data-types.md) | EXCHANGE_MODIFIED | null ||
|| **EXCHANGE_ID**
[`integer`](../data-types.md) | EXCHANGE_ID | null ||
|| **OUTLOOK_VERSION**
[`integer`](../data-types.md) | OUTLOOK_VERSION | null ||
|| **VIEWED_DATE**
[`datetime`](../data-types.md) | Дата последнего просмотра. | ||
|| **SORTING**
[`double`](../data-types.md) | Индекс сортировки. | ||
|| **DURATION_PLAN**
[`integer`](../data-types.md) | Затрачено (план). | ||
|| **DURATION_FACT**
[`integer`](../data-types.md) | Затрачено (фактически). | ||
|| **CHECKLIST**
[`array`](../data-types.md) | Чеклист. | ||
|| **DURATION_TYPE**
[`enum`](../data-types.md) | DURATION_TYPE. | \[0\] => secs
\[1\] => mins
\[2\] => hours
\[3\] => days
\[4\] => weeks
\[5\] => monts
\[6\] => years.
По умолчанию — 3 ||
|| **UF_CRM_TASK**
[`crm`](../data-types.md) | Привязка к элементам CRM
L_XX — lead,
C_XX — contact ,
D_XX — deal | ||
|| **UF_TASK_WEBDAV_FILES**
[`disk_file`](../data-types.md) | Файл (Диск). | ||
|| **UF_MAIL_MESSAGE**
[`mail_message`](../data-types.md) | Письмо (email). | ||
|| **IS_MUTED**
[`enum`](../data-types.md) | Уведомления. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **IS_PINNED**
[`enum`](../data-types.md) | Закреплён. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **IS_PINNED_IN_GROUP**
[`enum`](../data-types.md) | Закреплён в группе. | Y — Да,
N — Нет.
По умолчанию — Нет. ||
|| **SERVICE_COMMENTS_COUNT**
[`integer`](../data-types.md) | SERVICE_COMMENTS_COUNT | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

**Поля даты/времени, которые читаются/записываются в формате ISO 8601:**

- DEADLINE
- START_DATE_PLAN
- END_DATE_PLAN
- DATE_START
- CREATED_DATE
- CLOSED_DATE
- CHANGED_DATE
- STATUS_CHANGED_DATE
- VIEWED_DATE

{% endnote %}

{% endif %}