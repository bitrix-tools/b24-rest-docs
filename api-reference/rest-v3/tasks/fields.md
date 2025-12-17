# Поля задачи в REST 3.0

В блоке [Объект задачи](#taskdto) описаны все поля задачи, в других блоках — поля связанных объектов. Часть полей задачи доступна как число идентификатор и как объект, например `creatorId` и `creator`. Поле идентификатор используйте в методах [создания](./tasks-task-add.md) и [изменения](./tasks-task-update.md) задачи. Поле объект в методе [получения задачи](./tasks-task-get.md). Как работать с полями связанных объектов описано в статье [Обзор REST API 3.0](../index.md#connection). 

Права на запись и изменение полей зависят от роли пользователя в задаче, настроек прав на группу, иерархии сотрудников, статуса задачи и некоторых флагов в задаче, например `allowChangeDeadline`. 

## Объект задачи {#taskdto}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **title**
[`string`](../../data-types.md) | Название задачи, обязательное поле для [создания задачи](./tasks-task-add.md) ||
|| **description**
[`string`](../../data-types.md) | Описание задачи ||
|| **creatorId**
[`integer`](../../data-types.md) | Идентификатор постановщика, обязательное поле для [создания задачи](./tasks-task-add.md) ||
|| **creator**
[`object`](#user) | Постановщик. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **created**
[`datetime`](../../data-types.md) | Дата создания в формате ISO-8601 ||
|| **responsibleId**
[`integer`](../../data-types.md) | Идентификатор исполнителя, обязательное поле для [создания задачи](./tasks-task-add.md) ||
|| **responsible**
[`object`](#user) | Исполнитель. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **deadline**
[`datetime`](../../data-types.md) | Крайний срок в формате ISO-8601, например `2025-12-31T23:59:59+02:00` ||
|| **needsControl**
[`boolean`](../../data-types.md) | Контроль задачи постановщиком. Возможные значения:
`Y` — включен
`N` — отключен, значение по умолчанию ||
|| **startPlan**
[`datetime`](../../data-types.md) | Плановая дата начала в формате ISO-8601, например `2025-12-31T06:00:00+02:00` ||
|| **endPlan**
[`datetime`](../../data-types.md) | Плановая дата окончания в формате ISO-8601, например `2025-12-31T18:00:00+02:00`||
|| **checklist**
[`array`](../../data-types.md) | Идентификаторы пунктов чек-листов. Для работы с чек-листами используйте методы [task.checklistitem.*](../../tasks/checklist-item/index.md)||
|| **groupId**
[`integer`](../../data-types.md) | Идентификатор группы/проекта. Для работы с группами используйте методы [sonet_group.*](../../sonet-group/index.md) ||
|| **group**
[`object`](#group) | Группа/проект. Объект типа [группа](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **stageId**
[`integer`](../../data-types.md) | Идентификатор стадии. Используйте, если задача находится в группе/проекте ||
|| **stage**
[`object`](#stage) | Стадия. Объект типа [стадия](#stage). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **epicId**
[`integer`](../../data-types.md) | Идентификатор эпика. Для работы с эпиками используйте методы [tasks.api.scrum.epic.*](../../sonet-group/scrum/epic/index.md) ||
|| **storyPoints**
[`integer`](../../data-types.md) | Стори поинты. Для изменения задачи Скрама используйте метод [tasks.api.scrum.task.update](../../sonet-group/scrum/task/tasks-api-scrum-task-update.md) ||
|| **flowId**
[`integer`](../../data-types.md) | Идентификатор потока. Для работы с потоком используйте методы [tasks.flow.Flow.*](../../tasks/flow/index.md) ||
|| **flow**
[`object`](#flow) | Поток. Объект типа [поток](#flow). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **priority**
[`string`](../../data-types.md) | Приоритет задачи. Возможные значения:
- `2` — высокий
- `1` — средний
- `0` — низкий ||
|| **status**
[`string`](../../data-types.md) | Статус задачи. Возможные значения:
- `2` — ждет выполнения
- `3` — выполняется
- `4` — ожидает контроля
- `5` — завершена
- `6` — отложена ||
|| **statusChanged**
[`datetime`](../../data-types.md) | Дата изменения статуса в формате ISO 8601 ||
|| **accomplices**
[`array<object>`](#user) | Список идентификаторов пользователей — соисполнителей в методах [создания](./tasks-task-add.md) или [изменения](./tasks-task-update.md) задачи.
Массив объектов типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **auditors**
[`array<object>`](#user) | Список идентификаторов пользователей — наблюдателей за задачей в методах [создания](./tasks-task-add.md) или [изменения](./tasks-task-update.md) задачи.
Массив объектов типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **parentId**
[`integer`](../../data-types.md) | Идентификатор родительской задачи.
Имеет значение `null`, если родительской задачи нет ||
|| **parent**
[`object`](#taskdto) | Родительская задача. Объект типа [задача](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **containsChecklist**
[`boolean`](../../data-types.md) | Признак наличия чек-листа. Поле изменяется автоматически ||
|| **containsSubTasks**
[`boolean`](../../data-types.md) | Признак наличия подзадач. Поле изменяется автоматически ||
|| **containsRelatedTasks**
[`boolean`](../../data-types.md) | Признак наличия связанных задач. Поле изменяется автоматически ||
|| **containsGanttLinks**
[`boolean`](../../data-types.md) | Признак наличия связей в Гантте. Поле изменяется автоматически ||
|| **containsPlacements**
[`boolean`](../../data-types.md) | Признак наличия встроек. Поле изменяется автоматически ||
|| **containsResults**
[`boolean`](../../data-types.md) | Признак наличия результатов. Поле изменяется автоматически ||
|| **numberOfReminders**
[`integer`](../../data-types.md) | Количество напоминаний по задаче. Поле изменяется автоматически ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата задачи. Для работы с чатом задачи используйте методы [im.message.*](../../tasks/tasks-new.md#comments) ||
|| **chat**
[`object`](#task-chat) | Чат задачи. Объект типа [чат задачи](#task-chat). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **plannedDuration**
[`integer`](../../data-types.md) | Плановая длительность ||
|| **actualDuration**
[`integer`](../../data-types.md) | Фактическая длительность ||
|| **durationType**
[`string`](../../data-types.md) | Единица плановой длительности. Возможные значения: `secs`, `mins`, `hours`, `days`, `weeks`, `monts`, `years` ||
|| **started**
[`datetime`](../../data-types.md) | Дата начала выполнения в формате ISO 8601 ||
|| **estimatedTime**
[`integer`](../../data-types.md) | Оценка времени в секундах ||
|| **replicate**
[`boolean`](../../data-types.md) | Признак повторяемой задачи. Возможные значения: 
- `Y` — да, сделать задачу регулярной
- `N` — не повторять  ||
|| **changed**
[`datetime`](../../data-types.md) | Дата изменения в формате ISO 8601 ||
|| **changedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего задачу ||
|| **changedBy**
[`object`](#user) | Кто изменил. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **statusChangedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего статус ||
|| **statusChangedBy**
[`object`](#user) | Кто изменил статус. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **closedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, закрывшего задачу ||
|| **closedBy**
[`object`](#user) | Кто закрыл. Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **closed**
[`datetime`](../../data-types.md) | Дата закрытия в формате ISO 8601 ||
|| **activity**
[`datetime`](../../data-types.md) | Дата последней активности в формате ISO 8601 ||
|| **guid**
[`string`](../../data-types.md) | Идентификатор `GUID` задачи ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **exchangeId**
[`string`](../../data-types.md) | Идентификатор Exchange ||
|| **exchangeModified**
[`string`](../../data-types.md) | Дата изменения в Exchange ||
|| **outlookVersion**
[`integer`](../../data-types.md) | Версия синхронизации с Outlook ||
|| **mark**
[`string`](../../data-types.md) | Оценка задачи. Возможные значения:
`N` — отрицательная
`P` — положительная
`null` — без оценки ||
|| **allowsChangeDeadline**
[`boolean`](../../data-types.md) | Разрешено менять крайний срок. Возможные значения: 
- `Y` — разрешено
- `N` — не разрешено ||
|| **allowsTimeTracking**
[`boolean`](../../data-types.md) | Включен учет времени по задаче. Возможные значения: 
- `Y` — включен
- `N` — не включен ||
|| **matchesWorkTime**
[`boolean`](../../data-types.md) | Учитывать рабочее время. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **addInReport**
[`boolean`](../../data-types.md) | Добавлять в отчет. Возможные значения: 
- `Y` — добавлять 
- `N` — не добавлять ||
|| **isMultitask**
[`boolean`](../../data-types.md) | Признак «базовая задача с подзадачами». Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **siteId**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **forkedByTemplateId**
[`integer`](../../data-types.md) |  Идентификатор шаблона, если задача создана из шаблона ||
|| **forkedByTemplate**
[`object`](#template) | Шаблон задачи. Объект типа [шаблон](#template). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **maxDeadlineChangeDate**
[`datetime`](../../data-types.md) | Дата, после которой нельзя менять крайний срок, в формате ISO 8601 ||
|| **maxDeadlineChanges**
[`integer`](../../data-types.md) | Максимальное количество переносов крайнего срока ||
|| **requireDeadlineChangeReason**
[`boolean`](../../data-types.md) | Требовать причину при изменении крайнего срока. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **link**
[`string`](../../data-types.md) | Ссылка на задачу ||
|| **rights**
[`array`](../../data-types.md) | Массив действий, которые пользователь может совершить с задачей ||
|| **archiveLink**
[`string`](../../data-types.md) | Ссылка на архив для скачивания всех файлов задачи ||
|| **crmItemIds**
[`array`](../../data-types.md) | Массив идентификаторов связанных объектов CRM в формате:
- `L_XX` — лид,
- `D_XX` — сделка
- `C_XX` — контакт
- `CO_XX` — компания
- `SI_XX` — счет
- `TXX_XX` — смарт-процесс ||
|| **emailId**
[`integer`](../../data-types.md) | Идентификатор письма, из которого создана задача ||
|| **email**
[`object`](#email) | Письмо, из которого создана задача. Объект типа [письмо](#email). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **elapsedTime**
[`object`](#elapsed-time) | Учет времени. Объект типа [учет времени](#elapsed-time). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **requireResult**
[`boolean`](../../data-types.md) | Требовать результат. Возможные значения: 
- `Y` — да
- `N` — нет  ||
|| **matchesSubTasksTime**
[`boolean`](../../data-types.md) | Учитывать сроки подзадач. Возможные значения: 
- `Y` — да
- `N` — нет  ||
|| **autocompleteSubTasks**
[`boolean`](../../data-types.md) | Автозавершение подзадач. Возможные значения: 
- `Y` — да
- `N` — нет  ||
|| **allowsChangeDatePlan**
[`boolean`](../../data-types.md) | Разрешено менять плановые даты. Возможные значения: 
- `Y` — да
- `N` — нет  ||
|| **inFavorite**
[`array`](../../data-types.md) | Признак «в избранном». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inFavorite": [29]` ||
|| **inPin**
[`array`](../../data-types.md) | Признак «задача закреплена». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inPin": [29]` ||
|| **inGroupPin**
[`array`](../../data-types.md) | Признак «задача закреплена в группе». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inGroupPin": [29]` ||
|| **inMute**
[`array`](../../data-types.md) | Признак «выключить звук». В поле возвращается массив, в котором лежит ID текущего пользователя, если у него настройка активна `"inMute": [29]` ||
|| **source**
[`object`](#source) | Источник задачи. Объект [источник](#source). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **dependsOn**
[`array`](../../data-types.md) | Зависимости от задач ||
|| **scenarios**
[`array`](../../data-types.md) | Сценарий создания задачи. Возможные значения: 
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
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **role**
[`string`](../../data-types.md) | Роль пользователя ||
|| **image**
[`object`](#file) | Объект типа [файл](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
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
[`object`](#file) | Объект типа [файл](#file). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
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
[`integer`](../../data-types.md) | Идентификатор элемента чата ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор объекта чата ||
|| **entityType**
[`string`](../../data-types.md) | Тип объекта чата ||
|#

## Объект шаблона задачи {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **task**
[`object`](#taskdto) | Объект типа [задача](#taskdto). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **title**
[`string`](../../data-types.md) | Название ||
|| **description**
[`string`](../../data-types.md) | Описание ||
|| **creator**
[`object`](#user) | Объект типа [пользователь](#user). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **responsibleCollection**
[`array`](../../data-types.md) | Коллекция ответственных ||
|| **deadlineAfterTs**
[`integer`](../../data-types.md) | Сдвиг крайнего срока ||
|| **startDatePlanTs**
[`integer`](../../data-types.md) | Плановая дата начала ||
|| **endDatePlanTs**
[`integer`](../../data-types.md) | Плановая дата окончания ||
|| **replicate**
[`boolean`](../../data-types.md) | Повторение задачи из шаблона ||
|| **checklist**
[`array`](../../data-types.md) | Массив идентификаторов пунктов чек-листов ||
|| **group**
[`object`](#group) | Объект типа [группа](#group). Используйте для запроса данных в параметре `select` [tasks.task.get](./tasks-task-get.md) ||
|| **priority**
[`string`](../../data-types.md) | Приоритет ||
|| **accomplices**
[`array`](../../data-types.md) | Соисполнители ||
|| **auditors**
[`array`](../../data-types.md) | Наблюдатели ||
|| **parent**
[`object`](#template) | Родительский шаблон. Объект типа [шаблон задачи]{#template} ||
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
[`string`](../../data-types.md) | Тип ежемесячного повтора ||
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
