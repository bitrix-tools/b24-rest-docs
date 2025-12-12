# Поля задачи в REST 3.0

## Объект задачи {#taskdto}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **title**
[`string`](../../data-types.md) | Название задачи ||
|| **description**
[`string`](../../data-types.md) | Описание задачи ||
|| **creatorId**
[`integer`](../../data-types.md) | Идентификатор постановщика ||
|| **creator**
[`object`](#user) | Постановщик. Объект [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **created**
[`datetime`](../../data-types.md) | Дата создания ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор ответственного ||
|| **responsible**
[`object`](#user) | Исполнитель. Объект [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **deadline**
[`datetime`](../../data-types.md) | Крайний срок ||
|| **needsControl**
[`boolean`](../../data-types.md) | Требуется контроль задачи ||
|| **startPlan**
[`datetime`](../../data-types.md) | Плановая дата начала ||
|| **endPlan**
[`datetime`](../../data-types.md) | Плановая дата окончания ||
|| **fileIds**
[`array`](../../data-types.md) | Идентификаторы файлов ||
|| **checklist**
[`array`](../../data-types.md) | Чек-лист (массив идентификаторов или объектов чек-листа) ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы/проекта ||
|| **group**
[`object`](#group) | Группа/проект. Объект [группа](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **stageId**
[`integer`](../../data-types.md) | Идентификатор стадии ||
|| **stage**
[`object`](#stage) | Стадия. Объект [стадия](#stage). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **epicId**
[`integer`](../../data-types.md) | Идентификатор эпика ||
|| **storyPoints**
[`integer`](../../data-types.md) | Story points ||
|| **flowId**
[`integer`](../../data-types.md) | Идентификатор потока ||
|| **flow**
[`object`](#flow) | Поток. Объект [поток](#flow). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **priority**
[`string`](../../data-types.md) | Приоритет ||
|| **status**
[`string`](../../data-types.md) | Статус задачи ||
|| **statusChanged**
[`datetime`](../../data-types.md) | Дата изменения статуса ||
|| **accomplices**
[`array<object>`](#user) | Соисполнители. Массив объектов [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **auditors**
[`array<object>`](#user) | Наблюдатели. Массив объектов [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительской задачи ||
|| **parent**
[`object`](#taskdto) | Родительская задача. Объект [задача](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **containsChecklist**
[`boolean`](../../data-types.md) | Признак наличия чек-листа ||
|| **containsSubTasks**
[`boolean`](../../data-types.md) | Признак наличия подзадач ||
|| **containsRelatedTasks**
[`boolean`](../../data-types.md) | Признак наличия связанных задач ||
|| **containsGanttLinks**
[`boolean`](../../data-types.md) | Признак наличия связей в Гантте ||
|| **containsPlacements**
[`boolean`](../../data-types.md) | Признак наличия встройки/плейсментов ||
|| **containsResults**
[`boolean`](../../data-types.md) | Признак наличия результатов ||
|| **numberOfReminders**
[`integer`](../../data-types.md) | Количество напоминаний по задаче ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата задачи ||
|| **chat**
[`object`](#task-chat) | Чат задачи. Объект [чат задачи](#task-chat). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **plannedDuration**
[`integer`](../../data-types.md) | Плановая длительность ||
|| **actualDuration**
[`integer`](../../data-types.md) | Фактическая длительность ||
|| **durationType**
[`string`](../../data-types.md) | Тип длительности ||
|| **started**
[`datetime`](../../data-types.md) | Дата начала выполнения ||
|| **estimatedTime**
[`integer`](../../data-types.md) | Оценка времени ||
|| **replicate**
[`boolean`](../../data-types.md) | Признак повторяемой задачи ||
|| **changed**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **changedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего задачу ||
|| **changedBy**
[`object`](#user) | Кто изменил. Объект [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **statusChangedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего статус ||
|| **statusChangedBy**
[`object`](#user) | Кто изменил статус. Объект [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **closedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, закрывшего задачу ||
|| **closedBy**
[`object`](#user) | Кто закрыл. Объект [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **closed**
[`datetime`](../../data-types.md) | Дата закрытия ||
|| **activity**
[`datetime`](../../data-types.md) | Дата активности ||
|| **guid**
[`string`](../../data-types.md) | GUID задачи ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **exchangeId**
[`string`](../../data-types.md) | Идентификатор Exchange ||
|| **exchangeModified**
[`string`](../../data-types.md) | Дата изменения в Exchange ||
|| **outlookVersion**
[`integer`](../../data-types.md) | Версия синхронизации с Outlook ||
|| **mark**
[`string`](../../data-types.md) | Оценка задачи ||
|| **allowsChangeDeadline**
[`boolean`](../../data-types.md) | Можно менять дедлайн ||
|| **allowsTimeTracking**
[`boolean`](../../data-types.md) | Включен учет времени ||
|| **matchesWorkTime**
[`boolean`](../../data-types.md) | Учитывать рабочее время ||
|| **addInReport**
[`boolean`](../../data-types.md) | Добавлять в отчет ||
|| **isMultitask**
[`boolean`](../../data-types.md) | Признак множественной задачи ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **forkedByTemplateId**
[`integer`](../../data-types.md) | ID шаблона, из которого создана задача ||
|| **forkedByTemplate**
[`object`](#template) | Шаблон задачи. Объект [шаблон](#template). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **deadlineCount**
[`integer`](../../data-types.md) | Количество переносов дедлайна ||
|| **maxDeadlineChangeDate**
[`datetime`](../../data-types.md) | Дата, после которой нельзя менять крайний срок ||
|| **maxDeadlineChanges**
[`integer`](../../data-types.md) | Максимальное количество переносов дедлайна ||
|| **requireDeadlineChangeReason**
[`boolean`](../../data-types.md) | Требовать причину при изменении дедлайна ||
|| **declineReason**
[`string`](../../data-types.md) | Причина отклонения ||
|| **forumTopicId**
[`integer`](../../data-types.md) | Идентификатор темы комментариев ||
|| **tags**
[`array<object>`](#tag) | Теги. Массив объектов [тег](#tag). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **link**
[`string`](../../data-types.md) | Ссылка на задачу ||
|| **userFields**
[`array<object>`](#user-field) | Пользовательские поля. Массив объектов [пользовательское поле](#user-field). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **rights**
[`array`](../../data-types.md) | Права на задачу ||
|| **archiveLink**
[`string`](../../data-types.md) | Ссылка на архив вложений ||
|| **crmItemIds**
[`array`](../../data-types.md) | Привязки к CRM (идентификаторы) ||
|| **emailId**
[`integer`](../../data-types.md) | ID письма, из которого создана задача ||
|| **email**
[`object`](#email) | Письмо, из которого создана задача. Объект [письмо](#email). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **reminders**
[`array`](../../data-types.md) | Напоминания ||
|| **elapsedTime**
[`object`](#elapsed-time) | Учет времени. Объект [учет времени](#elapsed-time). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **requireResult**
[`boolean`](../../data-types.md) | Требовать результат ||
|| **matchesSubTasksTime**
[`boolean`](../../data-types.md) | Учитывать сроки подзадач ||
|| **autocompleteSubTasks**
[`boolean`](../../data-types.md) | Автозавершение подзадач ||
|| **allowsChangeDatePlan**
[`boolean`](../../data-types.md) | Разрешено менять плановые даты ||
|| **inFavorite**
[`array`](../../data-types.md) | Признак/данные об избранном ||
|| **inPin**
[`array`](../../data-types.md) | Признак закрепления ||
|| **inGroupPin**
[`array`](../../data-types.md) | Признак закрепления в группе ||
|| **inMute**
[`array`](../../data-types.md) | Признак отключения уведомлений ||
|| **source**
[`object`](#source) | Источник задачи. Объект [источник](#source). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **dependsOn**
[`array`](../../data-types.md) | Зависимости от задач ||
|| **scenarios**
[`array`](../../data-types.md) | Сценарии ||
|#

## Объект пользователя {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **role**
[`string`](../../data-types.md) | Роль пользователя ||
|| **image**
[`object`](#file) | Объект [файла](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **gender**
[`string`](../../data-types.md) | Пол ||
|| **email**
[`string`](../../data-types.md) | Email ||
|| **externalAuthId**
[`string`](../../data-types.md) | Внешний auth ID ||
|| **rights**
[`array`](../../data-types.md) | Права пользователя ||
|#

## Объект файла {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **src**
[`string`](../../data-types.md) | Ссылка на файл ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **width**
[`integer`](../../data-types.md) | Ширина ||
|| **height**
[`integer`](../../data-types.md) | Высота ||
|| **size**
[`integer`](../../data-types.md) | Размер ||
|| **subDir**
[`string`](../../data-types.md) | Подкаталог ||
|| **contentType**
[`string`](../../data-types.md) | MIME-тип ||
|| **file**
[`array`](../../data-types.md) | Данные файла ||
|#

## Объект группы {#group}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор группы ||
|| **name**
[`string`](../../data-types.md) | Название группы ||
|| **image**
[`object`](#file) | Объект [файла](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **type**
[`string`](../../data-types.md) | Тип группы ||
|| **isVisible**
[`boolean`](../../data-types.md) | Признак видимости ||
|#

## Объект стадии {#stage}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор стадии ||
|| **title**
[`string`](../../data-types.md) | Название стадии ||
|| **color**
[`string`](../../data-types.md) | Цвет стадии ||
|#

## Объект потока {#flow}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор потока ||
|| **name**
[`string`](../../data-types.md) | Название потока ||
|#

## Объект чата задачи {#task-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор сущности чата ||
|| **entityType**
[`string`](../../data-types.md) | Тип сущности чата ||
|#

## Объект шаблона задачи {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **task**
[`object`](#taskdto) | Объект [задачи](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **title**
[`string`](../../data-types.md) | Название ||
|| **description**
[`string`](../../data-types.md) | Описание ||
|| **creator**
[`object`](#user) | Объект [пользователя](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **responsibleCollection**
[`array`](../../data-types.md) | Коллекция ответственных ||
|| **deadlineAfterTs**
[`integer`](../../data-types.md) | Сдвиг дедлайна ||
|| **startDatePlanTs**
[`integer`](../../data-types.md) | Плановая дата начала ||
|| **endDatePlanTs**
[`integer`](../../data-types.md) | Плановая дата окончания ||
|| **replicate**
[`boolean`](../../data-types.md) | Повторение задачи из шаблона ||
|| **fileIds**
[`array`](../../data-types.md) | Идентификаторы файлов ||
|| **checklist**
[`array`](../../data-types.md) | Чек-лист ||
|| **group**
[`object`](#group) | Объект [группы](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **priority**
[`string`](../../data-types.md) | Приоритет ||
|| **accomplices**
[`array`](../../data-types.md) | Соисполнители ||
|| **auditors**
[`array`](../../data-types.md) | Наблюдатели ||
|| **parent**
[`object`](#template) | Родительский шаблон (TemplateDto) ||
|| **replicateParams**
[`object`](#template-replicate-params) | Объект [параметров повторения](#template-replicate-params). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|#

## Объект параметров повторения шаблона {#template-replicate-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **period**
[`string`](../../data-types.md) | Периодичность ||
|| **everyDay**
[`string`](../../data-types.md) | Каждый день ||
|| **workdayOnly**
[`string`](../../data-types.md) | Только рабочие дни ||
|| **dailyMonthInterval**
[`string`](../../data-types.md) | Интервал в днях месяца ||
|| **everyWeek**
[`string`](../../data-types.md) | Каждую неделю ||
|| **monthlyType**
[`string`](../../data-types.md) | Тип месячного повтора ||
|| **monthlyDayNum**
[`string`](../../data-types.md) | День месяца ||
|| **monthlyMonthNum1**
[`string`](../../data-types.md) | Первый месяц периода ||
|| **monthlyWeekDayNum**
[`string`](../../data-types.md) | Номер недели в месяце ||
|| **monthlyWeekDay**
[`string`](../../data-types.md) | День недели ||
|| **monthlyMonthNum2**
[`string`](../../data-types.md) | Второй месяц периода ||
|| **yearlyType**
[`string`](../../data-types.md) | Тип годового повтора ||
|| **yearlyDayNum**
[`string`](../../data-types.md) | День месяца для годового повтора ||
|| **yearlyMonth1**
[`string`](../../data-types.md) | Первый месяц годового повтора ||
|| **yearlyWeekDayNum**
[`string`](../../data-types.md) | Номер недели для годового повтора ||
|| **yearlyWeekDay**
[`string`](../../data-types.md) | День недели для годового повтора ||
|| **yearlyMonth2**
[`string`](../../data-types.md) | Второй месяц годового повтора ||
|| **time**
[`string`](../../data-types.md) | Время ||
|| **timezoneOffset**
[`string`](../../data-types.md) | Смещение часового пояса ||
|| **startDate**
[`string`](../../data-types.md) | Дата начала повторения ||
|| **repeatTill**
[`string`](../../data-types.md) | До какой даты повторять ||
|| **endDate**
[`string`](../../data-types.md) | Дата окончания повторения ||
|| **times**
[`string`](../../data-types.md) | Количество повторов ||
|#

## Объект тега {#tag}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор тега ||
|| **name**
[`string`](../../data-types.md) | Название тега ||
|| **ownerId**
[`integer`](../../data-types.md) | Владелец тега ||
|| **owner**
[`object`](#user) | Объект [пользователя](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы ||
|| **group**
[`object`](#group) | Объект [группы](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **task**
[`object`](#taskdto) | Объект [задачи](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|#

## Объект пользовательского поля {#user-field}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользовательского поля ||
|| **key**
[`string`](../../data-types.md) | Код поля ||
|| **value**
[`any`](../../data-types.md) | Значение ||
|#

## Объект письма {#email}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | ID письма ||
|| **taskId**
[`integer`](../../data-types.md) | ID задачи ||
|| **mailboxId**
[`integer`](../../data-types.md) | ID почтового ящика ||
|| **title**
[`string`](../../data-types.md) | Название письма ||
|| **body**
[`string`](../../data-types.md) | Тело письма ||
|| **from**
[`string`](../../data-types.md) | Отправитель письма ||
|| **dateTs**
[`integer`](../../data-types.md) | Таймстамп отправки письма ||
|| **link**
[`string`](../../data-types.md) | Ссылка на письмо ||
|#

## Объект учета времени {#elapsed-time}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи учета времени ||
|| **userId**
[`integer`](../../data-types.md) | Пользователь ||
|| **taskId**
[`integer`](../../data-types.md) | Задача ||
|| **minutes**
[`integer`](../../data-types.md) | Минуты ||
|| **seconds**
[`integer`](../../data-types.md) | Секунды ||
|| **source**
[`string`](../../data-types.md) | Источник ||
|| **text**
[`string`](../../data-types.md) | Комментарий ||
|| **createdAtTs**
[`integer`](../../data-types.md) | Дата создания ||
|| **startTs**
[`integer`](../../data-types.md) | Время старта ||
|| **stopTs**
[`integer`](../../data-types.md) | Время завершения ||
|#

## Объект источника {#source}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип источника ||
|| **data**
[`array`](../../data-types.md) | Данные источника ||
|#
