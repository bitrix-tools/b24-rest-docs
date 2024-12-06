# Отредактировать существующее событие calendar.event.update

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.update` редактирует существующее событие.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор события. ||
|| **type***
[`string`](../data-types.md) | Тип календаря:
- user;
- group. ||
|| **ownerId***
[`integer`](../data-types.md) | Идентификатор владельца календаря. ||
|| **from**
[`datetime`](../data-types.md) | Дата начала события. Допустим формат [`date`](../data-types.md) если **skip_time == 'Y'**. ||
|| **to**
[`datetime`](../data-types.md) | Дата окончания события. Допустим формат [`date`](../data-types.md) если **skip_time == 'Y'**. ||
|| **from_ts**
[`integer`](../data-types.md) | Может быть установлен вместо **from**. ||
|| **to_ts**
[`integer`](../data-types.md) | Может быть установлен вместо **to**. ||
|| **section**
[`integer`](../data-types.md) | Идентификатор раздела. ||
|| **name***
[`string`](../data-types.md) | Наименование события. ||
|| **skip_time**
[`string`](../data-types.md) | **[Y\|N]** Указывает, что значение даты передается без времени. ||
|| **timezone_from**
[`string`](../data-types.md) | Часовой пояс даты и времени начала события. Значение по умолчанию - таймзона текущего пользователя. ||
|| **timezone_to**
[`string`](../data-types.md) | Часовой пояс даты и времени окончания события. Значение по умолчанию - таймзона текущего пользователя. ||
|| **description**
[`text`](../data-types.md) | Описание события. ||
|| **color**
[`string`](../data-types.md) | Цвет фона события. ||
|| **text_color**
[`string`](../data-types.md) | Цвет текста события. ||
|| **accessibility**
[`string`](../data-types.md) | Доступность на время события: 
- busy (занят); 
- absent (отсутствую); 
- quest (под вопросом); 
- free (свободен). ||
|| **importance**
[`string`](../data-types.md) | Важность события: 
- high (высокая); 
- normal (средняя); 
- low (низкая). ||
|| **private_event**
[`string`](../data-types.md) | **[Y\|N]** Отметка частного события. ||
|| **recurrence_mode**
[`string`](../data-types.md) | Параметр частичного редактирования повторяемого события
- this - изменения применяются только к текущему событию событию (обязательно указание current_date_from); 
- next - изменения применяются к текущему и ко всем следующим событиями (обязательно указание current_date_from); 
- all - изменения применяются ко всем событиям в цепочке повторений ||
|| **current_date_from**
[`date`](../data-types.md) | дата текущего события для частичного редактирования повторяемого события ||
|| **rrule**
[`object`](../data-types.md) | Повторяемость события. В терминах стандарта iCalendar:
- FREQ - частота повторения (DAILY, WEEKLY, MONTHLY, YEARLY);
- COUNT - количество повторений;
- INTERVAL - интервал между повторениями;
- BYDAY - дни недели ('SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA');
- UNTIL - дата окончания повторений. ||
|| **is_meeting**
[`string`](../data-types.md) | **[Y\|N]** Признак встречи с участниками события. ||
|| **location**
[`string`](../data-types.md) | Место проведения. ||
|| **remind**
[`array`](../data-types.md) | Массив напоминаний о событии:
- type [`string`](../data-types.md) - временной тип напоминания (min, hour, day); 
- count [`integer`](../data-types.md) - числовое значение временного промежутка. ||
|| **attendees**
[`array`](../data-types.md) | Список участников события (если **is_meeting** == "Y"). ||
|| **host**
[`string`](../data-types.md) | Организатор события (если **is_meeting** == "Y"). ||
|| **meeting**
[`object`](../data-types.md) | Массив параметров, включающий в себя: 
- notify [`boolean`](../data-types.md) - флаг оповещения о подтверждении\отказе участников;
- reinvite [`boolean`](../data-types.md) - флаг запроса повторного подтверждения участия (при редактировании события);
- allow_invite [`boolean`](../data-types.md) - флаг разрешения участникам приглашать других в событие;
- hide_guests [`boolean`](../data-types.md) - флаг скрытия списка участников ||
|| **crm_fields**
[`array`](../data-types.md) | Массив идентификаторов сущностей CRM для привязки к событию. Префиксы:
- **CO_** - компании;
- **C_** - контакты;
- **L_** - лиды;
- **D_** - сделки; ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.update',
        {
            id: 699,
            type: 'user',
            ownerId: 2,
            name: 'Changed Event Name',
            description: 'New description for event',
            from: '2013-06-17',
            to: '2013-06-17',
            skip_time: 'Y',
            section: 5,
            color: '#9cbe1c',
            text_color: '#283033',
            accessibility: 'free',
            importance: 'normal',
            is_meeting: 'Y',
            private_event: 'Y',
            recurrence_mode: 'next',
            current_date_from: '2024-12-04',
            remind: [{type: 'min', count: 10}],
            location: 'Kaliningrad',
            attendees: [1, 2, 3],
            host: 2,
            meeting: {
                notify: true,
                reinvite: false,
                allow_invite: false,
                hide_guests: false,
            },
            rrule: {
                FREQ: 'WEEKLY',
                BYDAY: ['MO', 'WE'],
                COUNT: 10,
                INTERVAL: 1,
            },
            crm_fields: ['C_5', 'L_11']
        }
    );
    ```
{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": 1246,
  "time": {
    "start": 1733318565.183275,
    "finish": 1733318565.695058,
    "duration": 0.5117831230163574,
    "processing": 0.29406094551086426,
    "date_start": "2024-12-04T13:22:45+00:00",
    "date_finish": "2024-12-04T13:22:45+00:00"
  }
}
```

```json
{
  "result": {
    "originalDate": "12/24/2024 05:59:00 pm",
    "originalDavXmlId": "20241205T124346Z-e3ccab8aebc16d0c5cccecb63fef2bc3@b24evo.lan",
    "instanceTz": "Europe/Kaliningrad",
    "recEventId": 1261,
    "id": 1260
  },
  "time": {
    "start": 1733402626.139122,
    "finish": 1733402626.740063,
    "duration": 0.6009409427642822,
    "processing": 0.3765721321105957,
    "date_start": "2024-12-05T12:43:46+00:00",
    "date_finish": "2024-12-05T12:43:46+00:00"
  }
}
```

### Возвращаемые данные для одиночного события
#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор редактируемого события ||
|#

### Возвращаемые данные для повторяемого события
#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **originalDate**
[`datetime`](../data-types.md) | Дата начала новой серии повторяемого события ||
|| **originalDavXmlId**
[`string`](../data-types.md) | Идентификатор события для синхронизации ||
|| **instanceTz**
[`string`](../data-types.md) | Таймзона события ||
|| **recEventId**
[`integer`](../data-types.md) | Идентификатор новой серии повторяемого события ||
|| **id**
[`integer`](../data-types.md) | Идентификатор предыдущей серии повторямого события ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"ownerId\" для метода \"calendar.event.update\""
}
```