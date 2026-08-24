#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](/api-reference/data-types.html) | Объект с полями события ||
|| **ID**
[`string`](/api-reference/data-types.html) | Идентификатор события ||
|| **PARENT_ID**
[`string`](/api-reference/data-types.html) | Идентификатор родительского события ||
|| **DELETED**
[`string`](/api-reference/data-types.html) | Флаг отображающий удалено ли событие. Возможные значения:
- `Y` — событие удалено
- `N` — событие не удалено  ||
|| **CAL_TYPE**
[`string`](/api-reference/data-types.html) | Тип календаря в котором находится событие ||
|| **OWNER_ID**
[`string`](/api-reference/data-types.html) | Идентификатор владельца календаря:
- `id` пользователя для типа календаря `user`
- `id` группы для типа календаря `group` ||
|| **NAME**
[`string`](/api-reference/data-types.html) | Название события ||
|| **DATE_FROM**
[`datetime`](/api-reference/data-types.html) | Дата начала события ||
|| **DATE_TO**
[`datetime`](/api-reference/data-types.html) | Дата окончания события ||
|| **ORIGINAL_DATE_FROM**
[`datetime`](/api-reference/data-types.html) | Дата начала оригинального события для повторяемых событий ||
|| **TZ_FROM**
[`string`](/api-reference/data-types.html) | Таймзона даты начала события ||
|| **TZ_TO**
[`string`](/api-reference/data-types.html) | Таймзона даты окончания события ||
|| **TZ_OFFSET_FROM**
[`string`](/api-reference/data-types.html) | Смещение времени начала события относительно UTC в секундах ||
|| **TZ_OFFSET_TO**
[`string`](/api-reference/data-types.html) | Смещение времени окончания события относительно UTC в секундах ||
|| **DATE_FROM_TS_UTC**
[`string`](/api-reference/data-types.html) | Дата и время начала события в UTC в формате timestamp ||
|| **DATE_TO_TS_UTC**
[`string`](/api-reference/data-types.html) | Дата и время окончания события в UTC в формате timestamp ||
|| **DT_SKIP_TIME**
[`string`](/api-reference/data-types.html) | Флаг отображающий что событие длится целый день. Возможные значения: 
- `Y` — целый день
- `N` — не целый день ||
|| **DT_LENGTH**
[`integer`](/api-reference/data-types.html) | Длительность события в секундах ||
|| **EVENT_TYPE**
[`string`](/api-reference/data-types.html) | Тип события ||
|| **CREATED_BY**
[`string`](/api-reference/data-types.html) | Идентификатор пользователя, который создал событие ||
|| **DATE_CREATE**
[`datetime`](/api-reference/data-types.html) | Дата создания события ||
|| **TIMESTAMP_X**
[`datetime`](/api-reference/data-types.html) | Дата изменения события ||
|| **DESCRIPTION**
[`string`](/api-reference/data-types.html) | Описание события ||
|| **PRIVATE_EVENT**
[`string`](/api-reference/data-types.html) | Отметка, что событие частное. Возможные значения:

- `Y` — частное
- `N` — не частное ||
|| **ACCESSIBILITY**
[`string`](/api-reference/data-types.html) | Доступность участников события ||
|| **IMPORTANCE**
[`string`](/api-reference/data-types.html) | Важность события ||
|| **IS_MEETING**
[`boolean`](/api-reference/data-types.html) | Признак встречи с участниками события. Возможные значения: 

- `Y` — встреча с участниками
- `N` — встреча без участников ||
|| **MEETING_STATUS**
[`string`](/api-reference/data-types.html) | Статус участия в событии. Возможные значения:
- `Y` — согласен
- `N` — отказался
- `Q` — приглашен, но еще не ответил
- `H` — организатор события ||
|| **MEETING_HOST**
[`string`](/api-reference/data-types.html) | Идентификатор пользователя, ведущего событие ||
|| **MEETING**
[`object`](/api-reference/data-types.html) | Объект описывает [настройки встречи](#meeting) ||
|| **LOCATION**
[`string`](/api-reference/data-types.html) | Идентификатор или название места проведения события ||
|| **REMIND**
[`array`](/api-reference/data-types.html) | Массив объектов с описанием [напоминаний о событии](#remind) ||
|| **COLOR**
[`string`](/api-reference/data-types.html) | Цвет фона события ||
|| **RRULE**
[`object`](/api-reference/data-types.html) | Повторяемость события в виде [объекта](#rrule) в терминах стандарта iCalendar ||
|| **EXDATE**
[`string`](/api-reference/data-types.html) | Список дат исключений из правила повторений ||
|| **DAV_XML_ID**
[`string`](/api-reference/data-types.html) | Идентификатор синхронизации ||
|| **G_EVENT_ID**
[`string`](/api-reference/data-types.html) | Идентификатор синхронизации ||
|| **CAL_DAV_LABEL**
[`string`](/api-reference/data-types.html) | Идентификатор синхронизации ||
|| **VERSION**
[`string`](/api-reference/data-types.html) | Версия изменений события ||
|| **ATTENDEES_CODES**
[`array`](/api-reference/data-types.html) | Идентификаторы участников события ||
|| **RECURRENCE_ID**
[`string`](/api-reference/data-types.html) | Идентификатор оригинального события при редактировании только текущего ||
|| **RELATIONS**
[`object`](/api-reference/data-types.html) | Объект для повторяемых событий с информацией о связях с [оригинальным событием](#relations) ||
|| **SECTION_ID**
[`string`](/api-reference/data-types.html) | Идентификатор календаря в котором расположено событие ||
|| **SYNC_STATUS**
[`string`](/api-reference/data-types.html) | Статус синхронизации события ||
|| **UF_CRM_CAL_EVENT**
[`array`](/api-reference/data-types.html) | Массив идентификаторов объектов CRM, привязанных к событию ||
|| **UF_WEBDAV_CAL_EVENT**
[`array`](/api-reference/data-types.html) | Массив идентификаторов файлов привязанных к событию ||
|| **SECTION_DAV_XML_ID**
[`array`](/api-reference/data-types.html) | Идентификатор синхронизации календаря события ||
|| **DATE_FROM_FORMATTED**
[`string`](/api-reference/data-types.html) | Форматированная дата начала события ||
|| **DATE_TO_FORMATTED**
[`string`](/api-reference/data-types.html) | Форматированная дата окончагния события ||
|| **SECT_ID**
[`string`](/api-reference/data-types.html) | Идентификатор календаря в котором расположено событие ||
|| **ATTENDEE_LIST**
[`array`](/api-reference/data-types.html) | Массив объектов, описывающих участников события и их статусы участия. Структура объекта описана [ниже](#attendee_list) ||
|| **COLLAB_ID**
[`integer`](/api-reference/data-types.html) | Идентификатор коллабы, в которой создано событие ||
|| **~RRULE_DESCRIPTION**
[`string`](/api-reference/data-types.html) | Текстовое описание правила повторения события ||
|| **attendeesEntityList**
[`array`](/api-reference/data-types.html) | Массив объектов, описывающих пользователей — [участников события](#attendeesEntityList) ||
|| **~DESCRIPTION**
[`string`](/api-reference/data-types.html) | Описание события ||
|| **~USER_OFFSET_FROM**
[`integer`](/api-reference/data-types.html) | Смещение времени начала события относительно часового пояса текущего пользователя ||
|| **~USER_OFFSET_TO**
[`integer`](/api-reference/data-types.html) | Смещение времени окончания события относительно часового пояса текущего пользователя ||
|#

### Объект MEETING {#meeting}

#|
|| **Название**
`тип` | **Описание** ||
|| **HOST_NAME**
[`string`](/api-reference/data-types.html) | имя пользователя ведущего событие ||
|| **NOTIFY**
[`boolean`](/api-reference/data-types.html) | Флаг оповещения о подтверждении или отказе участников ||
|| **REINVITE**
[`boolean`](/api-reference/data-types.html) | Флаг запроса повторного подтверждения участия при редактировании события ||
|| **ALLOW_INVITE**
[`boolean`](/api-reference/data-types.html) | Флаг разрешения участникам приглашать других в событие ||
|| **HIDE_GUESTS**
[`boolean`](/api-reference/data-types.html) | Флаг скрытия списка участников ||
|| **MEETING_CREATOR**
[`integer`](/api-reference/data-types.html) | Идентификатор создателя события ||
|| **LANGUAGE_ID**
[`string`](/api-reference/data-types.html) | Идентификатор языка для уведомлений по событию ||
|| **MAIL_FROM**
[`string`](/api-reference/data-types.html) | Адрес отправителя для уведомлений ||
|#

### Объект REMIND {#remind}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](/api-reference/data-types.html) | Временной тип напоминания
- `min` — минуты
- `hour` – часы
- `day` — дни ||
|| **count**
[`integer`](/api-reference/data-types.html) | Числовое значение временного промежутка ||
|#

### Объект RRULE {#rrule}

#|
|| **Название**
`тип` | **Описание** ||
|| **FREQ**
[`string`](/api-reference/data-types.html) | Частота повторения
- `DAILY` — ежедневно
- `WEEKLY` — еженедельно
- `MONTHLY` — ежемесячно
- `YEARLY` — ежегодно
||
||**BYDAY**
[`object`](/api-reference/data-types.html) | Дни недели
- `SU` — воскресенье
- `MO` — понедельник
- `TU` — вторник
- `WE` — среда
- `TH` — четверг
- `FR` — пятница
- `SA` — суббота ||
|| **INTERVAL**
[`integer`](/api-reference/data-types.html) | Интервал между повторениями ||
|| **UNTIL**
[`date`](/api-reference/data-types.html) | Дата окончания повторений ||
|| **~UNTIL**
[`date`](/api-reference/data-types.html) | Дата окончания повторений. Техническое поле ||
|| **UNTIL_TS**
[`integer`](/api-reference/data-types.html) | Дата окончания повторений в формате timestamp ||
|#

### Объект RELATIONS {#relations}

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINAL_RECURSION_ID**
[`integer`](/api-reference/data-types.html) | Идентификатор оригинального события для повторяемых созданных при редактировании ||
|| **COMMENT_XML_ID**
[`string`](/api-reference/data-types.html) | Идентификатор оригинального события для одиночных, созданных при редактировании из повторяемых ||
|#

### Объекты ATTENDEE_LIST {#attendee_list}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](/api-reference/data-types.html) | Идентификатор пользователя ||
|| **entryId**
[`string`](/api-reference/data-types.html) | Идентификатор события ||
|| **status**
[`string`](/api-reference/data-types.html) | Статус участника события. Возможные значения:
- `Y` — согласен
- `N` — отказался
- `Q` — приглашен, но еще не ответил
- `H` — организатор события ||
|#

### Объект attendeesEntityList {#attendeesEntityList}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId**
[`string`](/api-reference/data-types.html) | Тип объекта участника события ||
|| **id**
[`integer`](/api-reference/data-types.html) | Идентификатор участника события ||
|#
