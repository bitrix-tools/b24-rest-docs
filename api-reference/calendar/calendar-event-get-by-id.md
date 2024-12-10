# Просмотреть событие календаря по идентификатору calendar.event.getbyid

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.getbyid` возвращает событие календаря по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор события. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.getbyid',
        {
            id: 324
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "ID": "1265",
    "PARENT_ID": "1265",
    "DELETED": "N",
    "CAL_TYPE": "user",
    "OWNER_ID": "1",
    "NAME": "Event Name",
    "DATE_FROM": "12/11/2024 05:59:00 pm",
    "DATE_TO": "12/11/2024 06:59:00 pm",
    "ORIGINAL_DATE_FROM": null,
    "TZ_FROM": "Europe/Kaliningrad",
    "TZ_TO": "Europe/Kaliningrad",
    "TZ_OFFSET_FROM": "7200",
    "TZ_OFFSET_TO": "7200",
    "DATE_FROM_TS_UTC": "1733932740",
    "DATE_TO_TS_UTC": "1733936340",
    "DT_SKIP_TIME": "N",
    "DT_LENGTH": 3600,
    "EVENT_TYPE": null,
    "CREATED_BY": "1",
    "DATE_CREATE": "12/05/2024 01:48:41 pm",
    "TIMESTAMP_X": "12/05/2024 01:48:41 pm",
    "DESCRIPTION": "Description for event",
    "PRIVATE_EVENT": "",
    "ACCESSIBILITY": "free",
    "IMPORTANCE": "normal",
    "IS_MEETING": true,
    "MEETING_STATUS": "H",
    "MEETING_HOST": "1",
    "MEETING": {
      "HOST_NAME": "User Name",
      "NOTIFY": false,
      "REINVITE": false,
      "ALLOW_INVITE": false,
      "HIDE_GUESTS": false,
      "MEETING_CREATOR": 1,
      "LANGUAGE_ID": "ru",
      "MAIL_FROM": ""
    },
    "LOCATION": "test location",
    "REMIND": [
      {
        "type": "min",
        "count": 50
      }
    ],
    "COLOR": "#9dcf00",
    "RRULE": {
      "FREQ": "WEEKLY",
      "BYDAY": {
        "MO": "MO",
        "WE": "WE"
      },
      "INTERVAL": 1,
      "UNTIL": "12/24/2024",
      "~UNTIL": "12/24/2024",
      "UNTIL_TS": 1734998400
    },
    "EXDATE": "11/28/2024;12/05/2024;12/12/2024;12/19/2024;12/26/2024",
    "DAV_XML_ID": "20241211T155900Z-534185204b362e9be7e261e92ccd9078@b24evo.lan",
    "G_EVENT_ID": "",
    "DAV_EXCH_LABEL": "",
    "CAL_DAV_LABEL": "",
    "VERSION": "1",
    "ATTENDEES_CODES": [
      "U1"
    ],
    "RECURRENCE_ID": 1272,
    "RELATIONS": {
      "ORIGINAL_RECURSION_ID": 1271,
      "COMMENT_XML_ID": "EVENT_1271_12/23/2024"
    },
    "SECTION_ID": "4",
    "SYNC_STATUS": null,
    "UF_CRM_CAL_EVENT": [
      "CO_1",
      "L_5"
    ],
    "UF_WEBDAV_CAL_EVENT": false,
    "SECTION_DAV_XML_ID": null,
    "DATE_FROM_FORMATTED": "Wed Dec 11 2024 17:59:00",
    "DATE_TO_FORMATTED": "Wed Dec 11 2024 18:59:00",
    "SECT_ID": "4",
    "ATTENDEE_LIST": [
      {
        "id": 1,
        "entryId": "1265",
        "status": "H"
      }
    ],
    "COLLAB_ID": null,
    "~RRULE_DESCRIPTION": "каждую неделю по: Пн, Ср, от 12/11/2024 до 12/24/2024",
    "attendeesEntityList": [
      {
        "entityId": "user",
        "id": 1
      }
    ],
    "~DESCRIPTION": "Description for event",
    "~USER_OFFSET_FROM": 7200,
    "~USER_OFFSET_TO": 7200
  },
  "time": {
    "start": 1733406529.495513,
    "finish": 1733406529.744687,
    "duration": 0.2491741180419922,
    "processing": 0.0327458381652832,
    "date_start": "2024-12-05T13:48:49+00:00",
    "date_finish": "2024-12-05T13:48:49+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Все доступные поля объекта события ||
|| **ID**
[`string`](../data-types.md) | Идентификатор события ||
|| **PARENT_ID**
[`string`](../data-types.md) | Идентификатор родительского события ||
|| **DELETED**
[`string`](../data-types.md) | Флаг отображающий удалено ли событие [Y\|N] ||
|| **CAL_TYPE**
[`string`](../data-types.md) | Тип календаря в котором находится событие ||
|| **OWNER_ID**
[`string`](../data-types.md) | Идентификатор пользователя (если тип календаря `user`) либо группы (если тип календаря `group`) ||
|| **NAME**
[`string`](../data-types.md) | Название события ||
|| **DATE_FROM**
[`datetime`](../data-types.md) | Дата начала события ||
|| **DATE_TO**
[`datetime`](../data-types.md) | Дата окончания события ||
|| **ORIGINAL_DATE_FROM**
[`datetime`](../data-types.md) | Дата начала оригинального события (для повторяемых событий) ||
|| **TZ_FROM**
[`string`](../data-types.md) | Таймзона даты начала события ||
|| **TZ_TO**
[`string`](../data-types.md) | Таймзона даты окончания события ||
|| **TZ_OFFSET_FROM**
[`string`](../data-types.md) | Смещение времени начала события относительно UTC в секундах ||
|| **TZ_OFFSET_TO**
[`string`](../data-types.md) | Смещение времени окончания события относительно UTC в секундах ||
|| **DATE_FROM_TS_UTC**
[`string`](../data-types.md) | Таймстамп начала события в UTC ||
|| **DATE_TO_TS_UTC**
[`string`](../data-types.md) | Таймстамп окончания события в UTC ||
|| **DT_SKIP_TIME**
[`string`](../data-types.md) | Флаг отображающий что событие длится целый день [Y\|N] ||
|| **DT_LENGTH**
[`integer`](../data-types.md) | Длительность события в секундах ||
|| **EVENT_TYPE**
[`string`](../data-types.md) | Тип события ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор пользователя создавшего событие ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания события ||
|| **TIMESTAMP_X**
[`datetime`](../data-types.md) | Дата изменения события ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание события ||
|| **PRIVATE_EVENT**
[`string`](../data-types.md) | Флаг частного события [Y\|N] ||
|| **ACCESSIBILITY**
[`string`](../data-types.md) | Доступность участников события ||
|| **IMPORTANCE**
[`string`](../data-types.md) | Важность события ||
|| **IS_MEETING**
[`string`](../data-types.md) | Флаг отображающий является ли событие встречей [Y\|N] ||
|| **MEETING_STATUS**
[`string`](../data-types.md) | Статус участия в событии [Y\|N\|Q\|H] ||
|| **MEETING_HOST**
[`string`](../data-types.md) | Идентификатор пользователя ведущего событие ||
|| **MEETING**
[`object`](../data-types.md) | Объект настроек встречи:
- HOST_NAME [`string`](../data-types.md) - имя пользователя ведущего событие;
- NOTIFY [`boolean`](../data-types.md) - флаг оповещения о подтверждении\отказе участников;
- REINVITE [`boolean`](../data-types.md) - флаг запроса повторного подтверждения участия;
- ALLOW_INVITE [`boolean`](../data-types.md) - флаг разрешения участникам приглашать других в событие;
- HIDE_GUESTS [`boolean`](../data-types.md) - флаг скрытия списка участников;
- MEETING_CREATOR [`integer`](../data-types.md) - идентификатор создателя события;
- LANGUAGE_ID [`string`](../data-types.md) - идентификатор языка для уведомлений по событию;
- MAIL_FROM [`string`](../data-types.md) - адрес отправителя для уведомлений.||
|| **LOCATION**
[`string`](../data-types.md) | Идентификатор или название места проведения события ||
|| **REMIND**
[`array`](../data-types.md) | Массив объектов напоминаний:
- type [`string`](../data-types.md) - временной тип напоминания (min, hour, day);
- count [`integer`](../data-types.md) - числовое значение временного промежутка. ||
|| **COLOR**
[`string`](../data-types.md) | Цвет фона события ||
|| **RRULE**
[`object`](../data-types.md) | Повторяемость события. В терминах стандарта iCalendar:
- FREQ [`string`](../data-types.md) - частота повторения (DAILY, WEEKLY, MONTHLY, YEARLY);
- BYDAY [`object`](../data-types.md) - дни недели ('SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA');
- INTERVAL [`integer`](../data-types.md) - интервал между повторениями;
- UNTIL [`date`](../data-types.md) - дата окончания повторений;
- ~UNTIL [`date`](../data-types.md) - дата окончания повторений;
- UNTIL_TS [`integer`](../data-types.md) - таймстамп окончания повторений. ||
|| **EXDATE**
[`string`](../data-types.md) | Список дат исключений из правила повторений ||
|| **DAV_XML_ID**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **G_EVENT_ID**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **CAL_DAV_LABEL**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **VERSION**
[`string`](../data-types.md) | Версия изменений события ||
|| **ATTENDEES_CODES**
[`array`](../data-types.md) | Идентификаторы участников события ||
|| **RECURRENCE_ID**
[`string`](../data-types.md) | Идентификатор оригинального события при редактировании только текущего ||
|| **RELATIONS**
[`object`](../data-types.md) |
- ORIGINAL_RECURSION_ID [`integer`](../data-types.md) - идентификатор оригинального события для повторяемых созданных при редактировании;
- COMMENT_XML_ID [`string`](../data-types.md) - идентификатор оригинального события для одиночных, созданных при редактировании из повторяемых.||
|| **SECTION_ID**
[`string`](../data-types.md) | Идентификатор календаря в котором расположено событие ||
|| **SYNC_STATUS**
[`string`](../data-types.md) | Статус синхронизации события ||
|| **UF_CRM_CAL_EVENT**
[`array`](../data-types.md) | Массив идентификаторов сущностей CRM привязанных к событию ||
|| **UF_WEBDAV_CAL_EVENT**
[`array`](../data-types.md) | Массив идентификаторов файлов привязанных к событию ||
|| **SECTION_DAV_XML_ID**
[`array`](../data-types.md) | Идентификатор синхронизации календаря события ||
|| **DATE_FROM_FORMATTED**
[`string`](../data-types.md) | Форматированная дата начала события ||
|| **DATE_TO_FORMATTED**
[`string`](../data-types.md) | Форматированная дата окончагния события ||
|| **SECT_ID**
[`string`](../data-types.md) | Идентификатор календаря в котором расположено событие ||
|| **ATTENDEE_LIST**
[`array`](../data-types.md) | Массив пользователей участников события:
- id [`integer`](../data-types.md) - идентификатор пользователя;
- entryId [`string`](../data-types.md) - идентификатор события;
- status [`string`](../data-types.md) - статус участника события [Y\|N\|Q\|H].||
|| **COLLAB_ID**
[`integer`](../data-types.md) | Идентификатор коллабы, в которой создано событие ||
|| **~RRULE_DESCRIPTION**
[`integer`](../data-types.md) | Текстовое описание правила повторения события ||
|| **attendeesEntityList**
[`array`](../data-types.md) | Массив участников события:
- entityId [`string`](../data-types.md) - тип сущности участника события;
- id [`integer`](../data-types.md) - идентификатор участника события.||
|| **~DESCRIPTION**
[`string`](../data-types.md) | Описание события ||
|| **~USER_OFFSET_FROM**
[`integer`](../data-types.md) | Смещение времени начала события относительно часового пояса текущего пользователя ||
|| **~USER_OFFSET_TO**
[`integer`](../data-types.md) | Смещение времени окончания события относительно часового пояса текущего пользователя ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"id\" для метода \"calendar.event.getbyid\""
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "id" для метода "calendar.event.getbyid" | Не передан обязательный параметр `id` ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}