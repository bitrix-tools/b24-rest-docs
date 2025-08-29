# Обновить событие calendar.event.update

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет существующее событие.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор события.

Получить идентификатор можно методом [calendar.event.get](./calendar-event-get.md) или [calendar.event.get.nearest](./calendar-event-get-nearest.md) ||
|| **type***
[`string`](../../data-types.md) | Тип календаря: 
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании  ||
|| **ownerId***
[`integer`](../../data-types.md) | Идентификатор владельца календаря. 

Для календаря компании параметр `ownerId` имеет значение `0` ||
|| **from**
[`datetime`\|`date`](../../data-types.md) | Дата и время начала события.

Можно указать дату без времени. Для этого передайте значение `Y` в параметре `skip_time` ||
|| **to**
[`datetime`\|`date`](../../data-types.md) | Дата окончания события.

Можно указать дату без времени. Для этого передайте значение `Y` в параметре `skip_time` ||
|| **from_ts**
[`integer`](../../data-types.md) | Дата и время в формате timestamp. Можно использовать вместо параметра `from` ||
|| **to_ts**
[`integer`](../../data-types.md) | Дата и время в формате timestamp. Можно использовать вместо параметра `to` ||
|| **section**
[`integer`](../../data-types.md) | Идентификатор календаря ||
|| **name***
[`string`](../../data-types.md) | Название события ||
|| **skip_time**
[`string`](../../data-types.md) | Передать значение даты без времени в параметрах `from` и `to`. Возможные значения:
- `Y` — использовать только дату
- `N` — использовать дату и время

Формат даты по стандарту ISO-8601 ||
|| **timezone_from**
[`string`](../../data-types.md) | Часовой пояс даты и времени начала события. По умолчанию — таймзона текущего пользователя.

Значение нужно передавать в виде строки, например, `Europe/Riga`.

[Особенности работы с часовыми поясами](#timezone-features)||
|| **timezone_to**
[`string`](../../data-types.md) | Часовой пояс даты и времени окончания события. Значение по умолчанию — таймзона текущего пользователя.

Значение нужно передавать в виде строки, например, `Europe/Riga`.

[Особенности работы с часовыми поясами](#timezone-features) ||
|| **description**
[`text`](../../data-types.md) | Описание события ||
|| **color**
[`string`](../../data-types.md) | Цвет фона события.

Cимвол `#` в цвете необходимо передавать в формате unicode — `%23` ||
|| **text_color**
[`string`](../../data-types.md) | Цвет текста события.

Cимвол `#` в цвете необходимо передавать в формате unicode — `%23` ||
|| **accessibility**
[`string`](../../data-types.md) | Доступность на время события: 
- `busy` — занят 
- `absent` — отсутствую 
- `quest` — под вопросом 
- `free` — свободен  ||
|| **importance**
[`string`](../../data-types.md) | Важность события: 
- `high` — высокая 
- `normal` — средняя 
- `low` — низкая ||
|| **private_event**
[`string`](../../data-types.md) | Отметка, что событие частное. Возможные значения:
- `Y` — частное
- `N` — не частное ||
|| **recurrence_mode**
 [`string`](../../data-types.md) | Параметр частичного редактирования повторяемого события. Возможные значения:
 - `this` — изменения применяются только к текущему событию событию. Обязательно указать `current_date_from` 
 - `next` — изменения применяются к текущему и ко всем следующим событиями. Обязательно указать `current_date_from` 
 - `all` — изменения применяются ко всем событиям в цепочке повторений ||
|| **current_date_from**
[`date`](../../data-types.md) | Дата текущего события для частичного редактирования повторяемого события.

Нужен только для `recurrence_mode` со значениями `this` или `next` ||
|| **rrule**
[`object`](../../data-types.md) | Повторяемость события в виде объекта в терминах стандарта iCalendar. Структура описана [ниже](#rrule) ||
|| **is_meeting**
[`string`](../../data-types.md) | Признак встречи с участниками события. Возможные значения:

- `Y` — встреча с участниками
- `N` — встреча без участников

Для встречи с участниками обязательно укажите список участников `attendees` и организатора события `host`. Без заполнения этих полей событие создано не будет ||
|| **location**
[`string`](../../data-types.md) | Место проведения ||
|| **remind**
[`array`](../../data-types.md) | Массив объектов с описанием напоминаний о событии. Структура описана [ниже](#remind) ||
|| **attendees***
[`array`](../../data-types.md) | Список идентификаторов участников события. Поле обязательное, если `is_meeting` = `Y` ||
|| **host***
[`string`](../../data-types.md) | Идентиификатор организатора события. Поле обязательное, если `is_meeting` = `Y` ||
|| **meeting**
[`object`](../../data-types.md) | Объект с параметрами встречи. Структура описана [ниже](#meeting) ||
|| **crm_fields**
 [`array`](../../data-types.md) | Массив идентификаторов объектов CRM для привязки к событию. Чтобы привязать объекты, перечислите их идентификаторы с [префиксами](../../crm/data-types.md#object_type):
 - `CO_` — компания
 - `C_` — контакт 
 - `L_` — лид
 - `D_` — сделка ||
|#

### Особенности работы с часовыми поясами {#timezone-features}

При работе с датами и временем событий можно использовать два подхода:

1. Полный формат даты с часовым поясом.

    Используйте формат ISO-8601 с указанием часового пояса в параметрах `from` и `to`:
    - `2025-03-20T15:00:00+02:00` — с указанием смещения
    - `2025-08-05T10:00:00+11:00` — с указанием смещения
    - `2025-08-04T23:00:00Z` — с указанием UTC

    Параметры `timezone_from` и `timezone_to` игнорируются, так как часовой пояс уже указан в дате.

2. Простой формат даты с отдельными параметрами часового пояса.

    Используйте простой формат в параметрах `from` и `to`:
    - `2025-03-20 15:00:00`
    - `2025-08-05 10:00:00`
    - `2025-08-05T10:00:00`

    Укажите часовой пояс в параметрах `timezone_from` и `timezone_to`:
    - `Europe/Moscow`
    - `America/New_York`
    - `Asia/Tokyo`

    Если указан только `timezone_from`, его значение будет использовано и для `timezone_to`.

Приоритет обработки параметров часового пояса:

- **Высший приоритет.** Если в параметрах `from` и `to` указан полный формат с часовым поясом, параметры `timezone_from` и `timezone_to` игнорируются.
- **Средний приоритет.** Если используется простой формат даты и указаны параметры `timezone_from` и `timezone_to`, используются они.
- **Низший приоритет.** Если формат даты простой и параметры часового пояса не заданы, используется часовой пояс текущего пользователя.

### Параметр rrule {#rrule}

#|
|| **Название**
`тип` | **Описание** ||
|| **FREQ**
[`string`](../../data-types.md) | Частота повторения
- `DAILY` — ежедневно
- `WEEKLY` — еженедельно
- `MONTHLY` — ежемесячно
- `YEARLY` — ежегодно
||
|| **COUNT**
[`integer`](../../data-types.md) | Количество повторений ||
|| **INTERVAL**
[`integer`](../../data-types.md) | Интервал между повторениями ||
||**BYDAY**
[`array`](../../data-types.md) | Дни недели
- `SU` — воскресенье
- `MO` — понедельник
- `TU` — вторник
- `WE` — среда
- `TH` — четверг
- `FR` — пятница
- `SA` — суббота ||
|| **UNTIL**
[`date`](../../data-types.md) | Дата окончания повторений ||
|#

### Параметр remind {#remind}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Временной тип напоминания
- `min` — минуты
- `hour` – часы
- `day` — дни ||
|| **count**
[`integer`](../../data-types.md) | Числовое значение временного промежутка ||
|#

### Параметр meeting {#meeting}

#|
|| **Название**
`тип` | **Описание** ||
|| **notify**
[`boolean`](../../data-types.md) | Флаг оповещения о подтверждении или отказе участников ||
|| **reinvite**
[`boolean`](../../data-types.md) | Флаг запроса повторного подтверждения участия при редактировании события ||
|| **allow_invite**
[`boolean`](../../data-types.md) | Флаг разрешения участникам приглашать других в событие ||
|| **hide_guests**
[`boolean`](../../data-types.md) | Флаг скрытия списка участников ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":699,"type":"user","ownerId":2,"name":"Changed Event Name","description":"New description for event","from":"2024-06-17","to":"2024-06-17","skip_time":"Y","section":5,"color":"#9cbe1c","text_color":"#283033","accessibility":"free","importance":"normal","is_meeting":"Y","private_event":"Y","recurrence_mode":"next","current_date_from":"2024-12-04","remind":[{"type":"min","count":10}],"location":"London","attendees":[1,2,3],"host":2,"meeting":{"notify":true,"reinvite":false,"allow_invite":false,"hide_guests":false},"rrule":{"FREQ":"WEEKLY","BYDAY":["MO","WE"],"COUNT":10,"INTERVAL":1},"crm_fields":["C_5","L_11"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.event.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":699,"type":"user","ownerId":2,"name":"Changed Event Name","description":"New description for event","from":"2024-06-17","to":"2024-06-17","skip_time":"Y","section":5,"color":"#9cbe1c","text_color":"#283033","accessibility":"free","importance":"normal","is_meeting":"Y","private_event":"Y","recurrence_mode":"next","current_date_from":"2024-12-04","remind":[{"type":"min","count":10}],"location":"London","attendees":[1,2,3],"host":2,"meeting":{"notify":true,"reinvite":false,"allow_invite":false,"hide_guests":false},"rrule":{"FREQ":"WEEKLY","BYDAY":["MO","WE"],"COUNT":10,"INTERVAL":1},"crm_fields":["C_5","L_11"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.event.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.event.update',
    		{
    			id: 699,
    			type: 'user',
    			ownerId: 2,
    			name: 'Changed Event Name',
    			description: 'New description for event',
    			from: '2024-06-17',
    			to: '2024-06-17',
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
    			remind: [
    				{
    					type: 'min',
    					count: 10
    				}
    			],
    			location: 'London',
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
    	
    	const result = response.getData().result;
    	console.log('Updated event with ID:', result);
    	// Нужная вам логика обработки данных
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.event.update',
                [
                    'id'              => 699,
                    'type'            => 'user',
                    'ownerId'         => 2,
                    'name'            => 'Changed Event Name',
                    'description'     => 'New description for event',
                    'from'            => '2024-06-17',
                    'to'              => '2024-06-17',
                    'skip_time'       => 'Y',
                    'section'         => 5,
                    'color'           => '#9cbe1c',
                    'text_color'      => '#283033',
                    'accessibility'   => 'free',
                    'importance'      => 'normal',
                    'is_meeting'      => 'Y',
                    'private_event'   => 'Y',
                    'recurrence_mode' => 'next',
                    'current_date_from' => '2024-12-04',
                    'remind'          => [
                        [
                            'type'  => 'min',
                            'count' => 10
                        ]
                    ],
                    'location'        => 'London',
                    'attendees'       => [1, 2, 3],
                    'host'            => 2,
                    'meeting'         => [
                        'notify'      => true,
                        'reinvite'    => false,
                        'allow_invite' => false,
                        'hide_guests' => false,
                    ],
                    'rrule'           => [
                        'FREQ'     => 'WEEKLY',
                        'BYDAY'    => ['MO', 'WE'],
                        'COUNT'    => 10,
                        'INTERVAL' => 1,
                    ],
                    'crm_fields'      => ['C_5', 'L_11']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating calendar event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.event.update',
        {
            id: 699,
            type: 'user',
            ownerId: 2,
            name: 'Changed Event Name',
            description: 'New description for event',
            from: '2024-06-17',
            to: '2024-06-17',
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
            remind: [
                {
                    type: 'min',
                    count: 10
                }
            ],
            location: 'London',
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.event.update',
        [
            'id' => 699,
            'type' => 'user',
            'ownerId' => 2,
            'name' => 'Changed Event Name',
            'description' => 'New description for event',
            'from' => '2024-06-17',
            'to' => '2024-06-17',
            'skip_time' => 'Y',
            'section' => 5,
            'color' => '#9cbe1c',
            'text_color' => '#283033',
            'accessibility' => 'free',
            'importance' => 'normal',
            'is_meeting' => 'Y',
            'private_event' => 'Y',
            'recurrence_mode' => 'next',
            'current_date_from' => '2024-12-04',
            'remind' => [
                [
                    'type' => 'min',
                    'count' => 10
                ]
            ],
            'location' => 'London',
            'attendees' => [1, 2, 3],
            'host' => 2,
            'meeting' => [
                'notify' => true,
                'reinvite' => false,
                'allow_invite' => false,
                'hide_guests' => false,
            ],
            'rrule' => [
                'FREQ' => 'WEEKLY',
                'BYDAY' => ['MO', 'WE'],
                'COUNT' => 10,
                'INTERVAL' => 1,
            ],
            'crm_fields' => ['C_5', 'L_11']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

{% list tabs %}

- Одиночное событие

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

- Повторяемое событие

    ```json
    {
        "result": {
            "originalDate": "12/24/2024 05:59:00 pm",
            "originalDavXmlId": "20241205T124346Z-e3ccab8aebc16d0c5cccecb63fef2bc3@b24evo.lan",
            "instanceTz": "Europe/Riga",
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

{% endlist %}

### Возвращаемые данные

{% list tabs %}

- Одиночное событие

    #|
    || **Название**
    `тип` | **Описание** ||
    || **result**
    [`integer`](../../data-types.md) | Идентификатор обновленного события ||
    |#

- Повторяемое событие

    #|
    || **Название**
    `тип` | **Описание** ||
    || **result**
    [`object`](../../data-types.md) | Корневой элемент ответа ||
    || **originalDate**
    [`datetime`](../../data-types.md) | Дата начала новой серии повторяемого события ||
    || **originalDavXmlId**
    [`string`](../../data-types.md) | Идентификатор события для синхронизации ||
    || **instanceTz**
    [`string`](../../data-types.md) | Таймзона события ||
    || **recEventId**
    [`integer`](../../data-types.md) | Идентификатор новой серии повторяемого события ||
    || **id**
    [`integer`](../../data-types.md) | Идентификатор предыдущей серии повторямого события ||
    |#

{% endlist %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "ownerId" для метода "calendar.event.update""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "id" для метода "calendar.event.update" | Не передан обязательный параметр `id` ||
|| Пустая строка | Не задан обязательный параметр "ownerId" для метода "calendar.event.update" | Не передан обязательный параметр `ownerId` ||
|| Пустая строка | Не задан обязательный параметр "type" для метода "calendar.event.update" | Не передан обязательный параметр `type` ||
|| Пустая строка | Недопустимое значение параметра "name" | Передан неверный формат данных в поле `name`||
|| Пустая строка | Недопустимое значение параметра "description" | Передан неверный формат данных в поле `description` ||
|| Пустая строка | Доступ запрещен | Запрещено создание событий в указанном календаре ||
|| Пустая строка | Вы задали неверный ID секции календаря или у данного пользователя нет к ней доступа | Передан идентификатор недоступного или несуществующего календаря ||
|| Пустая строка | Указан несуществующий тип редактирования повторяемого события | Передан неверное значение поля `recurrence_mode` ||
|| Пустая строка | Список связей события с CRM должен быть массивом | Передан неверный формат данных в поле `crm_fields` ||
|| Пустая строка | При изменении события произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}