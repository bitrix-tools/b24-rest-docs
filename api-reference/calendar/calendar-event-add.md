# Добавить новое событие calendar.event.add

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.add` добавляет новое событие.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря: 
- user; 
- group;
- company_calendar (указывается ownerId == ""). ||
|| **ownerId***
[`integer`](../data-types.md) | Идентификатор владельца календаря. ||
|| **from***
[`datetime`](../data-types.md) | Дата начала события. Допустим формат [`date`](../data-types.md) если **skip_time == 'Y'**. ||
|| **to***
[`datetime`](../data-types.md) | Дата окончания события. Допустим формат [`date`](../data-types.md) если **skip_time == 'Y'**. ||
|| **from_ts**
[`integer`](../data-types.md) | Может быть установлен вместо **from**. ||
|| **to_ts**
[`integer`](../data-types.md) | Может быть установлен вместо **to**. ||
|| **section***
[`integer`](../data-types.md) | Идентификатор календаря. ||
|| **name***
[`string`](../data-types.md) | Наименование события. ||
|| **skip_time**
[`string`](../data-types.md) | **[Y\|N]** Указывает, что значение даты передается без времени. Формат даты по стандарту ISO-8601. ||
|| **timezone_from**
[`string`](../data-types.md) | Часовой пояс даты и времени начала события. Значение по умолчанию - таймзона текущего пользователя. Указывается в строковом виде, например: Europe/Riga. ||
|| **timezone_to**
[`string`](../data-types.md) | Часовой пояс даты и времени окончания события. Значение по умолчанию - таймзона текущего пользователя. Указывается в строковом виде, например: Europe/Riga. ||
|| **description**
[`text`](../data-types.md) | Описание события. ||
|| **color**
[`string`](../data-types.md) | Цвет фона события. При передачи цвета добавляемого события символ `#` необходимо передавать в unicode, как `%23`. ||
|| **text_color**
[`string`](../data-types.md) | Цвет текста события. При передачи цвета добавляемого события символ `#` необходимо передавать в unicode, как `%23`. ||
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
[`array`](../data-types.md) | Список участников события (если **is_meeting** == 'Y'). ||
|| **host**
[`string`](../data-types.md) | Организатор события (если **is_meeting** == 'Y'). ||
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
        'calendar.event.add',
        {
            type: 'user',
            ownerId: 2,
            name: 'New Event Name',
            description: 'Description for event',
            from: '2013-06-14',
            to: '2013-06-14',
            skip_time: 'Y',
            section: 5,
            color: '#9cbe1c',
            text_color: '#283033',
            accessibility: 'absent',
            importance: 'normal',
            is_meeting: 'Y',
            private_event: 'N',
            remind: [{type: 'min', count: 20}],
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного события ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"name\" для метода \"calendar.event.add\""
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "type" для метода "calendar.event.add" | Не передан обязательный параметр `type` ||
|| Пустая строка | Не задан обязательный параметр "ownerId" для метода "calendar.event.add" | Не передан обязательный параметр `ownerId` ||
|| Пустая строка | Не задан обязательный параметр "name" для метода "calendar.event.add" | Не передан обязательный параметр `name` ||
|| Пустая строка | Не задан обязательный параметр "from" для метода "calendar.event.add" | Не передан обязательный параметр `from` или `from_ts` ||
|| Пустая строка | Не задан обязательный параметр "to" для метода "calendar.event.add" | Не передан обязательный параметр `to` или `to_ts` ||
|| Пустая строка | Недопустимое значение параметра "name" | Передан неверный формат данных в поле `name`||
|| Пустая строка | Недопустимое значение параметра "description" | Передан неверный формат данных в поле `description` ||
|| Пустая строка | Доступ запрещен | Запрещено создание событий в указанном календаре ||
|| Пустая строка | Вы задали неверный ID секции календаря или у данного пользователя нет к ней доступа | Передан идентификатор недоступного или несуществующего календаря ||
|| Пустая строка | Список связей события с CRM должен быть массивом | Передан неверный формат данных в поле `crm_fields` ||
|| Пустая строка | При создании события произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}