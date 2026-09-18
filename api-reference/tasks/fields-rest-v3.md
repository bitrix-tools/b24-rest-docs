# Поля задачи в REST 3.0

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Страница помогает разобрать поля задачи в REST 3.0. Их возвращают методы [tasks.task.get](./tasks-task-get-rest-v3.md), [tasks.task.list](./tasks-task-list-rest-v3.md) и [tasks.task.add](./tasks-task-add-rest-v3.md), а принимают методы [tasks.task.add](./tasks-task-add-rest-v3.md) и [tasks.task.update](./tasks-task-update-rest-v3.md). В блоке [Объект задачи](#taskdto) описаны все поля задачи, в других блоках — поля связанных объектов.

Часть полей задачи существует в двух видах: как идентификатор и как объект, например `creatorId` и `creator`. Какой вид принимает и возвращает каждый метод, показано в таблице.

## Какие поля принимают и возвращают методы {#methods}

#|
|| **Метод** | **Принимает** | **Возвращает** ||
|| [tasks.task.add](./tasks-task-add-rest-v3.md) | Поля таблицы [Объект задачи](#taskdto) с идентификаторами связанных объектов: `creatorId`, `responsibleId`, `groupId`. Обязательные — `title`, `creatorId`, `responsibleId` | Объект задачи в том же составе, что [tasks.task.get](./tasks-task-get-rest-v3.md) без `select` ||
|| [tasks.task.update](./tasks-task-update-rest-v3.md) | Те же поля, что `tasks.task.add` | Признак успеха `true` ||
|| [tasks.task.get](./tasks-task-get-rest-v3.md) | `id` задачи и `select` | Без `select` — базовый набор полей без связанных объектов. Поля объекта перечислите в `select` через точку, например `["creator.name", "creator.email"]`. Идентификаторы постановщика, исполнителя, группы, стадии, потока, шаблона, письма и авторов изменений метод не отдает, даже если указать их в `select`. Такие поля отмечены в таблице ||
|| [tasks.task.list](./tasks-task-list-rest-v3.md) | `select`, `filter`, `order`, `pagination` | Без `select` — только `id`. Идентификаторы связанных объектов возвращает, сами объекты — нет, даже если указать их поля в `select` ||
|#

В `fields` методов `tasks.task.add` и `tasks.task.update` нельзя передать `id`, `created`, `accomplices`, `auditors`, `tags`, `userFields` и поля-объекты — `creator`, `group`, `parent` и другие. На такое поле метод вернет ошибку валидации «Поле не доступно к изменению». Поля с пометкой «изменяется автоматически» передавать не нужно: их значение вычисляет Битрикс24.

Как устроены поля связанных объектов, описано в статье [Обзор REST API 3.0](../rest-v3.md#connection).

Права на запись и изменение полей зависят от роли пользователя в задаче, настроек прав на группу, иерархии сотрудников, статуса задачи и флагов задачи, например `allowsChangeDeadline`. Перед изменением задачи проверьте объект `rights`: его поля показывают действия, доступные текущему пользователю.

Логические поля принимают и возвращают `true` или `false`. Строковые значения `Y` и `N` из классических методов задач в REST 3.0 не подходят: метод вернет ошибку валидации.

## Объект задачи {#taskdto}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор задачи ||
|| **title**
[`string`](../data-types.md) | Название задачи, обязательное поле для [создания задачи](./tasks-task-add-rest-v3.md) ||
|| **description**
[`string`](../data-types.md) | Описание задачи ||
|| **creatorId**
[`integer`](../data-types.md) | Идентификатор постановщика, обязательное поле для [создания задачи](./tasks-task-add-rest-v3.md). Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `creator` ||
|| **creator**
[`object`](#user) | Постановщик. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **created**
[`datetime`](../data-types.md) | Дата создания в формате ISO 8601. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) его нет ||
|| **responsibleId**
[`integer`](../data-types.md) | Идентификатор исполнителя, обязательное поле для [создания задачи](./tasks-task-add-rest-v3.md). Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `responsible` ||
|| **responsible**
[`object`](#user) | Исполнитель. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **deadline**
[```datetime | null```](../data-types.md) | Крайний срок в формате ISO 8601, например `2025-12-31T23:59:59+02:00` ||
|| **needsControl**
[`boolean`](../data-types.md) | Контроль задачи постановщиком: `true` — после завершения исполнителем задача ждет проверки постановщика. По умолчанию `false` ||
|| **startPlan**
[```datetime | null```](../data-types.md) | Плановая дата начала в формате ISO 8601, например `2025-12-31T06:00:00+02:00` ||
|| **endPlan**
[```datetime | null```](../data-types.md) | Плановая дата окончания в формате ISO 8601, например `2025-12-31T18:00:00+02:00` ||
|| **checklist**
[`array<integer>`](../data-types.md) | Идентификаторы пунктов чек-листов. Для работы с чек-листами используйте методы [task.checklistitem.*](./checklist-item/index.md) ||
|| **fileIds**
[```array<integer> | null```](../data-types.md) | Идентификаторы файлов Диска, которые нужно прикрепить к задаче. Поле принимают [tasks.task.add](./tasks-task-add-rest-v3.md) и [tasks.task.update](./tasks-task-update-rest-v3.md). В ответе [tasks.task.get](./tasks-task-get-rest-v3.md) поле не заполняется и приходит как `null` ||
|| **groupId**
[`integer`](../data-types.md) | Идентификатор группы/проекта. Для работы с группами используйте методы [sonet_group.*](../sonet-group/index.md). Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `group` ||
|| **group**
[`object`](#group) | Группа/проект. Объект типа [группа](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **stageId**
[`integer`](../data-types.md) | Идентификатор стадии. Используйте, если задача находится в группе/проекте. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `stage` ||
|| **stage**
[`object`](#stage) | Стадия. Объект типа [стадия](#stage). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **epicId**
[```integer | null```](../data-types.md) | Идентификатор эпика. Для работы с эпиками используйте методы [tasks.api.scrum.epic.*](../sonet-group/scrum/epic/index.md) ||
|| **storyPoints**
[```integer | null```](../data-types.md) | Стори поинты. Для изменения задачи Скрама используйте метод [tasks.api.scrum.task.update](../sonet-group/scrum/task/tasks-api-scrum-task-update.md) ||
|| **flowId**
[`integer`](../data-types.md) | Идентификатор потока. Для работы с потоком используйте методы [tasks.flow.Flow.*](./flow/index.md). Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `flow` ||
|| **flow**
[`object`](#flow) | Поток. Объект типа [поток](#flow). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **priority**
[`string`](../data-types.md) | Приоритет задачи. Возможные значения:
- `high` — высокий
- `average` — средний
- `low` — низкий ||
|| **status**
[`string`](../data-types.md) | Статус задачи. Возможные значения:
- `pending` — ждет выполнения
- `in_progress` — выполняется
- `supposedly_completed` — ожидает контроля
- `completed` — завершена
- `deferred` — отложена
- `declined` — отклонена ||
|| **statusChanged**
[```datetime | null```](../data-types.md) | Дата изменения статуса в формате ISO 8601 ||
|| **accomplices**
[`array<object>`](#user) | Соисполнители. Массив объектов типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md), например `["accomplices.id", "accomplices.name"]`.

Методы [tasks.task.add](./tasks-task-add-rest-v3.md) и [tasks.task.update](./tasks-task-update-rest-v3.md) поле не принимают. Чтобы назначить соисполнителей, используйте классический метод [tasks.task.update](./tasks-task-update.md) с полем `ACCOMPLICES` ||
|| **auditors**
[`array<object>`](#user) | Наблюдатели. Массив объектов типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md), например `["auditors.id", "auditors.name"]`.

Методы [tasks.task.add](./tasks-task-add-rest-v3.md) и [tasks.task.update](./tasks-task-update-rest-v3.md) поле не принимают. Чтобы назначить наблюдателей, используйте классический метод [tasks.task.update](./tasks-task-update.md) с полем `AUDITORS` ||
|| **parentId**
[```integer | null```](../data-types.md) | Идентификатор родительской задачи.
Имеет значение `null`, если родительской задачи нет ||
|| **parent**
[`object`](#taskdto) | Родительская задача. Объект типа [задача](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **containsChecklist**
[`boolean`](../data-types.md) | Признак наличия чек-листа. Поле изменяется автоматически ||
|| **containsSubTasks**
[`boolean`](../data-types.md) | Признак наличия подзадач. Поле изменяется автоматически ||
|| **containsRelatedTasks**
[`boolean`](../data-types.md) | Признак наличия связанных задач. Поле изменяется автоматически ||
|| **containsGanttLinks**
[`boolean`](../data-types.md) | Признак наличия связей в Гантте. Поле изменяется автоматически ||
|| **containsPlacements**
[`boolean`](../data-types.md) | Признак наличия встроек. Поле изменяется автоматически ||
|| **containsResults**
[`boolean`](../data-types.md) | Признак наличия результатов. Поле изменяется автоматически ||
|| **numberOfReminders**
[`integer`](../data-types.md) | Количество напоминаний по задаче. Поле изменяется автоматически ||
|| **chatId**
[`integer`](../data-types.md) | Идентификатор чата задачи. Для работы с чатом задачи используйте [методы сообщений](../chats/messages/index.md), подробнее — [{#T}](./tasks-new.md) ||
|| **chat**
[`object`](#task-chat) | Чат задачи. Объект типа [чат задачи](#task-chat). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **plannedDuration**
[`integer`](../data-types.md) | Плановая длительность ||
|| **actualDuration**
[`integer`](../data-types.md) | Фактическая длительность ||
|| **durationType**
[`string`](../data-types.md) | Единица плановой длительности. Возможные значения: `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, `years` ||
|| **started**
[```datetime | null```](../data-types.md) | Дата начала выполнения в формате ISO 8601 ||
|| **estimatedTime**
[`integer`](../data-types.md) | Оценка времени в секундах ||
|| **replicate**
[`boolean`](../data-types.md) | Признак регулярной задачи: `true` — задача повторяется по расписанию шаблона ||
|| **changed**
[`datetime`](../data-types.md) | Дата изменения в формате ISO 8601 ||
|| **changedById**
[`integer`](../data-types.md) | Идентификатор пользователя, изменившего задачу. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `changedBy` ||
|| **changedBy**
[`object`](#user) | Кто изменил. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **statusChangedById**
[`integer`](../data-types.md) | Идентификатор пользователя, изменившего статус. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `statusChangedBy` ||
|| **statusChangedBy**
[`object`](#user) | Кто изменил статус. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **closedById**
[`integer`](../data-types.md) | Идентификатор пользователя, закрывшего задачу. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `closedBy` ||
|| **closedBy**
[`object`](#user) | Кто закрыл. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **closed**
[```datetime | null```](../data-types.md) | Дата закрытия в формате ISO 8601 ||
|| **activity**
[`datetime`](../data-types.md) | Дата последней активности в формате ISO 8601 ||
|| **guid**
[`string`](../data-types.md) | Идентификатор `GUID` задачи ||
|| **xmlId**
[```string | null```](../data-types.md) | Внешний идентификатор ||
|| **exchangeId**
[```string | null```](../data-types.md) | Идентификатор Exchange ||
|| **exchangeModified**
[```string | null```](../data-types.md) | Дата изменения в Exchange ||
|| **outlookVersion**
[`integer`](../data-types.md) | Версия синхронизации с Outlook ||
|| **mark**
[`string`](../data-types.md) | Оценка задачи. Возможные значения:
- `positive` — положительная
- `negative` — отрицательная
- `none` — без оценки ||
|| **allowsChangeDeadline**
[`boolean`](../data-types.md) | Исполнителю разрешено менять крайний срок ||
|| **allowsTimeTracking**
[`boolean`](../data-types.md) | Включен учет времени по задаче ||
|| **matchesWorkTime**
[`boolean`](../data-types.md) | Учитывать рабочее время: пропускать выходные дни при расчете плановых дат ||
|| **addInReport**
[```boolean | null```](../data-types.md) | Добавлять задачу в отчет ||
|| **isMultitask**
[`boolean`](../data-types.md) | Признак «базовая задача с подзадачами» ||
|| **siteId**
[`string`](../data-types.md) | Идентификатор сайта ||
|| **deadlineCount**
[```integer | null```](../data-types.md) | Служебное поле счетчиков задач. В интеграциях не используйте ||
|| **declineReason**
[```string | null```](../data-types.md) | Причина отклонения задачи. Заполняется, когда исполнитель отклонил задачу ||
|| **forumTopicId**
[```integer | null```](../data-types.md) | Идентификатор темы форума с комментариями к задаче. Пока тема не создана — `null` ||
|| **forkedByTemplateId**
[`integer`](../data-types.md) | Идентификатор шаблона, если задача создана из шаблона. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `forkedByTemplate` ||
|| **forkedByTemplate**
[`object`](#template) | Шаблон задачи. Объект типа [шаблон](#template). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **maxDeadlineChangeDate**
[```datetime | null```](../data-types.md) | Дата, после которой нельзя менять крайний срок, в формате ISO 8601 ||
|| **maxDeadlineChanges**
[```integer | null```](../data-types.md) | Максимальное количество переносов крайнего срока ||
|| **requireDeadlineChangeReason**
[`boolean`](../data-types.md) | Требовать причину при переносе крайнего срока ||
|| **tags**
[`array<object>`](#tag) | Теги задачи. Массив объектов типа [тег](#tag). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md), например `["tags.id", "tags.name"]` ||
|| **link**
[`string`](../data-types.md) | Относительная ссылка на задачу в интерфейсе Битрикс24, например `/company/personal/user/1/tasks/task/view/289/` ||
|| **userFields**
[`array<object>`](#user-field) | Пользовательские поля задачи. Массив объектов типа [пользовательское поле](#user-field). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md), например `["userFields.key", "userFields.value"]` ||
|| **rights**
[`object`](../data-types.md) | Действия текущего пользователя с задачей. Ключ — код действия, значение — `true`, если действие доступно. Например, `edit` — изменить задачу, `complete` — завершить, `delegate` — делегировать, `changeResponsible` — сменить исполнителя. Полный набор ключей — в примере ответа [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **archiveLink**
[`string`](../data-types.md) | Ссылка на архив для скачивания всех файлов задачи ||
|| **crmItemIds**
[`array<string>`](../data-types.md) | Идентификаторы связанных объектов CRM в формате:
- `L_XX` — лид
- `D_XX` — сделка
- `C_XX` — контакт
- `CO_XX` — компания
- `SI_XX` — счет
- `TXX_XX` — смарт-процесс ||
|| **emailId**
[`integer`](../data-types.md) | Идентификатор письма, из которого создана задача. Поле возвращает [tasks.task.list](./tasks-task-list-rest-v3.md), в ответе [tasks.task.get](./tasks-task-get-rest-v3.md) вместо него запрашивайте объект `email` ||
|| **email**
[`object`](#email) | Письмо, из которого создана задача. Объект типа [письмо](#email). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **elapsedTime**
[`object`](#elapsed-time) | Учет времени. Объект типа [учет времени](#elapsed-time). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **requireResult**
[`boolean`](../data-types.md) | Требовать результат: задачу нельзя завершить без записи о результате ||
|| **matchesSubTasksTime**
[`boolean`](../data-types.md) | Учитывать сроки подзадач при расчете плановых дат ||
|| **autocompleteSubTasks**
[`boolean`](../data-types.md) | Завершать подзадачи автоматически вместе с базовой задачей ||
|| **allowsChangeDatePlan**
[`boolean`](../data-types.md) | Исполнителю разрешено менять плановые даты ||
|| **inFavorite**
[`array<integer>`](../data-types.md) | Признак «в избранном». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inFavorite": [29]` ||
|| **inPin**
[`array<integer>`](../data-types.md) | Признак «задача закреплена». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inPin": [29]` ||
|| **inGroupPin**
[`array<integer>`](../data-types.md) | Признак «задача закреплена в группе». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inGroupPin": [29]` ||
|| **inMute**
[`array<integer>`](../data-types.md) | Признак «выключить звук». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inMute": [29]` ||
|| **source**
[`object`](#source) | Источник задачи. Объект [источник](#source). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **dependsOn**
[`array`](../data-types.md) | Зависимости от задач ||
|| **scenarios**
[`array<string>`](../data-types.md) | Сценарии создания задачи. Возможные значения элементов:
- `default` — значение по умолчанию
- `crm` — CRM
- `mobile` — мобильное приложение
- `voice` — аудио задачи AI
- `video` — видео задачи AI ||
|#

## Объект пользователя {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../data-types.md) | Имя пользователя ||
|| **role**
[`string`](../data-types.md) | Роль пользователя ||
|| **image**
[`object`](#file) | Объект типа [файл](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **gender**
[`string`](../data-types.md) | Пол. Возможные значения:
- `M` — мужской
- `F` — женский
- `N` — не указан ||
|| **email**
[`string`](../data-types.md) | Email ||
|| **externalAuthId**
[`string`](../data-types.md) | Внешний auth ID ||
|| **rights**
[`array`](../data-types.md) | Права пользователя ||
|#

## Объект тега {#tag}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор тега ||
|| **name**
[`string`](../data-types.md) | Название тега ||
|#

## Объект пользовательского поля {#user-field}

Пользовательские поля задачи создают методы [task.item.userfield.*](./user-field/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **key**
[`string`](../data-types.md) | Код поля, например `UF_CRM_TASK` ||
|| **value**
[`any`](../data-types.md) | Значение поля. Тип зависит от настроек поля. Если поле не заполнено — `null` ||
|#

## Объект файла {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор файла ||
|| **src**
[`string`](../data-types.md) | Ссылка на файл ||
|| **name**
[`string`](../data-types.md) | Имя файла ||
|| **width**
[`integer`](../data-types.md) | Ширина ||
|| **height**
[`integer`](../data-types.md) | Высота ||
|| **size**
[`integer`](../data-types.md) | Размер ||
|| **subDir**
[`string`](../data-types.md) | Подкаталог ||
|| **contentType**
[`string`](../data-types.md) | MIME-тип ||
|| **file**
[`array`](../data-types.md) | Данные файла ||
|#

## Объект группы {#group}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **name**
[`string`](../data-types.md) | Название группы ||
|| **image**
[`object`](#file) | Объект типа [файл](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **type**
[`string`](../data-types.md) | Тип группы. Возможные значения:
- `group` — группа
- `project` — проект
- `scrum` — Скрам
- `collab` — коллаба ||
|| **isVisible**
[`boolean`](../data-types.md) | Признак видимости ||
|#

## Объект стадии {#stage}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор стадии ||
|| **title**
[`string`](../data-types.md) | Название стадии ||
|| **color**
[`string`](../data-types.md) | Цвет стадии ||
|#

## Объект потока {#flow}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор потока ||
|| **name**
[`string`](../data-types.md) | Название потока ||
|#

## Объект чата задачи {#task-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор элемента чата ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор объекта чата ||
|| **entityType**
[`string`](../data-types.md) | Тип объекта чата. Для чата задачи — `TASKS_TASK` ||
|#

## Объект шаблона задачи {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор шаблона ||
|| **task**
[`object`](#taskdto) | Объект типа [задача](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **title**
[`string`](../data-types.md) | Название ||
|| **description**
[`string`](../data-types.md) | Описание ||
|| **creator**
[`object`](#user) | Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **responsibleCollection**
[`array`](../data-types.md) | Коллекция ответственных ||
|| **deadlineAfterTs**
[`integer`](../data-types.md) | Сдвиг крайнего срока ||
|| **startDatePlanTs**
[`integer`](../data-types.md) | Плановая дата начала ||
|| **endDatePlanTs**
[`integer`](../data-types.md) | Плановая дата окончания ||
|| **replicate**
[`boolean`](../data-types.md) | Повторение задачи из шаблона ||
|| **checklist**
[`array`](../data-types.md) | Массив идентификаторов пунктов чек-листов ||
|| **group**
[`object`](#group) | Объект типа [группа](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|| **priority**
[`string`](../data-types.md) | Приоритет ||
|| **accomplices**
[`array`](../data-types.md) | Соисполнители ||
|| **auditors**
[`array`](../data-types.md) | Наблюдатели ||
|| **parent**
[`object`](#template) | Родительский шаблон. Объект типа [шаблон задачи](#template) ||
|| **replicateParams**
[`object`](#template-replicate-params) | Объект [параметров повторения](#template-replicate-params). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get-rest-v3.md) ||
|#

## Объект параметров повторения шаблона {#template-replicate-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **period**
[`string`](../data-types.md) | Периодичность. Возможные значения:
- `daily` — ежедневно
- `weekly` — еженедельно
- `monthly` — ежемесячно
- `yearly` — ежегодно ||
|| **everyDay**
[`string`](../data-types.md) | Каждый день ||
|| **workdayOnly**
[`string`](../data-types.md) | Только рабочие дни ||
|| **dailyMonthInterval**
[`string`](../data-types.md) | Интервал в днях месяца ||
|| **everyWeek**
[`string`](../data-types.md) | Каждую неделю ||
|| **monthlyType**
[`string`](../data-types.md) | Тип ежемесячного повтора ||
|| **monthlyDayNum**
[`string`](../data-types.md) | День месяца ||
|| **monthlyMonthNum1**
[`string`](../data-types.md) | Первый месяц периода ||
|| **monthlyWeekDayNum**
[`string`](../data-types.md) | Номер недели в месяце ||
|| **monthlyWeekDay**
[`string`](../data-types.md) | День недели ||
|| **monthlyMonthNum2**
[`string`](../data-types.md) | Второй месяц периода ||
|| **yearlyType**
[`string`](../data-types.md) | Тип годового повтора ||
|| **yearlyDayNum**
[`string`](../data-types.md) | День месяца для годового повтора ||
|| **yearlyMonth1**
[`string`](../data-types.md) | Первый месяц годового повтора ||
|| **yearlyWeekDayNum**
[`string`](../data-types.md) | Номер недели для годового повтора ||
|| **yearlyWeekDay**
[`string`](../data-types.md) | День недели для годового повтора ||
|| **yearlyMonth2**
[`string`](../data-types.md) | Второй месяц годового повтора ||
|| **time**
[`string`](../data-types.md) | Время ||
|| **timezoneOffset**
[`string`](../data-types.md) | Смещение часового пояса ||
|| **startDate**
[`string`](../data-types.md) | Дата начала повторения ||
|| **repeatTill**
[`string`](../data-types.md) | До какой даты повторять ||
|| **endDate**
[`string`](../data-types.md) | Дата окончания повторения ||
|| **times**
[`string`](../data-types.md) | Количество повторов ||
|#

## Объект письма {#email}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | ID письма ||
|| **taskId**
[`integer`](../data-types.md) | ID задачи ||
|| **mailboxId**
[`integer`](../data-types.md) | ID почтового ящика ||
|| **title**
[`string`](../data-types.md) | Название письма ||
|| **body**
[`string`](../data-types.md) | Тело письма ||
|| **from**
[`string`](../data-types.md) | Отправитель письма ||
|| **dateTs**
[`integer`](../data-types.md) | Таймстамп отправки письма ||
|| **link**
[`string`](../data-types.md) | Ссылка на письмо ||
|#

## Объект учета времени {#elapsed-time}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор записи учета времени ||
|| **userId**
[`integer`](../data-types.md) | Пользователь ||
|| **taskId**
[`integer`](../data-types.md) | Задача ||
|| **minutes**
[`integer`](../data-types.md) | Минуты ||
|| **seconds**
[`integer`](../data-types.md) | Секунды ||
|| **source**
[`string`](../data-types.md) | Откуда взялась запись учета времени. Возможные значения:
- `manual` — сотрудник внес время вручную
- `system` — время записал таймер задачи
- `unknown` — источник не определен ||
|| **text**
[`string`](../data-types.md) | Комментарий ||
|| **createdAtTs**
[`integer`](../data-types.md) | Дата создания ||
|| **startTs**
[`integer`](../data-types.md) | Время старта ||
|| **stopTs**
[`integer`](../data-types.md) | Время завершения ||
|#

## Объект источника {#source}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Тип источника. Возможное значение — `chat`: задача создана из сообщения чата ||
|| **data**
[`array`](../data-types.md) | Данные источника ||
|#

## Продолжите изучение

- [{#T}](./tasks-task-get-rest-v3.md)
- [{#T}](./tasks-task-list-rest-v3.md)
- [{#T}](./tasks-task-add-rest-v3.md)
- [{#T}](./tasks-task-update-rest-v3.md)
- [{#T}](../rest-v3.md)
