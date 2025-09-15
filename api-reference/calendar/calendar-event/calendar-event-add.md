# Добавить событие calendar.event.add

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новое событие в календарь.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../data-types.md) | Тип календаря: 
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании 
 ||
|| **ownerId***
[`integer`](../../data-types.md) | Идентификатор владельца календаря. 

Для календаря компании параметр `ownerId` имеет значение `0`||
|| **from***
[`datetime`\|`date`](../../data-types.md) | Дата и время начала события.

Можно указать дату без времени. Для этого передайте значение `Y` в параметре `skip_time` ||
|| **to***
[`datetime`\|`date`](../../data-types.md) | Дата окончания события.

Можно указать дату без времени. Для этого передайте значение `Y` в параметре `skip_time` ||
|| **from_ts**
[`integer`](../../data-types.md) | Дата и время в формате timestamp. Можно использовать вместо параметра `from` ||
|| **to_ts**
[`integer`](../../data-types.md) | Дата и время в формате timestamp. Можно использовать вместо параметра `to` ||
|| **section***
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

[Особенности работы с часовыми поясами](#timezone-features) ||
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
- `free` — свободен 
||
|| **importance**
[`string`](../../data-types.md) | Важность события: 
- `high` — высокая 
- `normal` — средняя 
- `low` — низкая ||
|| **private_event**
[`string`](../../data-types.md) | Отметка, что событие частное. Возможные значения:
- `Y` — частное
- `N` — не частное
||
|| **rrule**
[`object`](../../data-types.md) | Повторяемость события в виде объекта в терминах стандарта iCalendar. Структура описана [ниже](#rrule)
||
|| **is_meeting**
[`string`](../../data-types.md) | Признак встречи с участниками события. Возможные значения:

- `Y` — встреча с участниками
- `N` — встреча без участников

Для встречи с участниками обязательно укажите список участников `attendees` и организатора события `host`. Без заполнения этих полей событие создано не будет
||
|| **location**
[`string`](../../data-types.md) | Место проведения ||
|| **remind**
[`array`](../../data-types.md) | Массив объектов с описанием напоминаний о событии. Структура описана [ниже](#remind) ||
|| **attendees***
[`array`](../../data-types.md) | Список идентификаторов участников события. Поле обязательное, если `is_meeting` = `Y` ||
|| **host***
[`integer`](../../data-types.md) | Идентификатор организатора события. Поле обязательное, если `is_meeting` = `Y` ||
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

- **Высший приоритет.** Если в параметрах `from` и `to` указан полный формат с часовым поясом, параметры `timezone_from` и `timezone_to` игнорируются
- **Средний приоритет.** Если используется простой формат даты и указаны параметры `timezone_from` и `timezone_to`, используются они
- **Низший приоритет.** Если формат даты простой и параметры часового пояса не заданы, используется часовой пояс текущего пользователя

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
    -d '{"type":"user","ownerId":2,"name":"New Event Name","description":"Description for event","from":"2024-06-14","to":"2024-06-14","skip_time":"Y","section":5,"color":"#9cbe1c","text_color":"#283033","accessibility":"absent","importance":"normal","is_meeting":"Y","private_event":"N","remind":[{"type":"min","count":20}],"location":"London","attendees":[1,2,3],"host":2,"meeting":{"notify":true,"reinvite":false,"allow_invite":false,"hide_guests":false},"rrule":{"FREQ":"WEEKLY","BYDAY":["MO","WE"],"COUNT":10,"INTERVAL":1},"crm_fields":["C_5","L_11"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.event.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":2,"name":"New Event Name","description":"Description for event","from":"2024-06-14","to":"2024-06-14","skip_time":"Y","section":5,"color":"#9cbe1c","text_color":"#283033","accessibility":"absent","importance":"normal","is_meeting":"Y","private_event":"N","remind":[{"type":"min","count":20}],"location":"London","attendees":[1,2,3],"host":2,"meeting":{"notify":true,"reinvite":false,"allow_invite":false,"hide_guests":false},"rrule":{"FREQ":"WEEKLY","BYDAY":["MO","WE"],"COUNT":10,"INTERVAL":1},"crm_fields":["C_5","L_11"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.event.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.event.add',
    		{
    			type: 'user',
    			ownerId: 2,
    			name: 'New Event Name',
    			description: 'Description for event',
    			from: '2024-06-14',
    			to: '2024-06-14',
    			skip_time: 'Y',
    			section: 5,
    			color: '#9cbe1c',
    			text_color: '#283033',
    			accessibility: 'absent',
    			importance: 'normal',
    			is_meeting: 'Y',
    			private_event: 'N',
    			remind: [
    				{
    					type: 'min',
    					count: 20
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
    	console.log('Created event with ID:', result);
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
                'calendar.event.add',
                [
                    'type'          => 'user',
                    'ownerId'       => 2,
                    'name'          => 'New Event Name',
                    'description'   => 'Description for event',
                    'from'          => '2024-06-14',
                    'to'            => '2024-06-14',
                    'skip_time'     => 'Y',
                    'section'       => 5,
                    'color'         => '#9cbe1c',
                    'text_color'    => '#283033',
                    'accessibility' => 'absent',
                    'importance'    => 'normal',
                    'is_meeting'    => 'Y',
                    'private_event' => 'N',
                    'remind'        => [
                        [
                            'type'  => 'min',
                            'count' => 20
                        ]
                    ],
                    'location'      => 'London',
                    'attendees'     => [1, 2, 3],
                    'host'          => 2,
                    'meeting'       => [
                        'notify'      => true,
                        'reinvite'    => false,
                        'allow_invite' => false,
                        'hide_guests' => false,
                    ],
                    'rrule'         => [
                        'FREQ'     => 'WEEKLY',
                        'BYDAY'    => ['MO', 'WE'],
                        'COUNT'    => 10,
                        'INTERVAL' => 1,
                    ],
                    'crm_fields'    => ['C_5', 'L_11']
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
        echo 'Error adding calendar event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.event.add',
        {
            type: 'user',
            ownerId: 2,
            name: 'New Event Name',
            description: 'Description for event',
            from: '2024-06-14',
            to: '2024-06-14',
            skip_time: 'Y',
            section: 5,
            color: '#9cbe1c',
            text_color: '#283033',
            accessibility: 'absent',
            importance: 'normal',
            is_meeting: 'Y',
            private_event: 'N',
            remind: [
                {
                    type: 'min',
                    count: 20
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
        'calendar.event.add',
        [
            'type' => 'user',
            'ownerId' => 2,
            'name' => 'New Event Name',
            'description' => 'Description for event',
            'from' => '2024-06-14',
            'to' => '2024-06-14',
            'skip_time' => 'Y',
            'section' => 5,
            'color' => '#9cbe1c',
            'text_color' => '#283033',
            'accessibility' => 'absent',
            'importance' => 'normal',
            'is_meeting' => 'Y',
            'private_event' => 'N',
            'remind' => [
                [
                    'type' => 'min',
                    'count' => 20
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


### Как добавить повторяемое событие в календарь компании

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"company_calendar","ownerId":"","from":"2025-01-31T18:00:00","to":"2025-01-31T20:00:00","section":1,"name":"Важная встреча","skip_time":"N","timezone_from":"Europe/Moscow","timezone_to":"Europe/Moscow","description":"Описание события","color":"#FF0000","text_color":"#000000","accessibility":"busy","importance":"high","private_event":"N","rrule":{"FREQ":"WEEKLY","COUNT":10,"INTERVAL":1,"BYDAY":["MO","WE","FR"]},"is_meeting":"Y","location":"Конференц-зал","remind":[{"type":"min","count":30}],"attendees":[29,93],"host":1,"meeting":{"notify":true,"reinvite":false,"allow_invite":true,"hide_guests":false}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.event.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"company_calendar","ownerId":"","from":"2025-01-31T18:00:00","to":"2025-01-31T20:00:00","section":1,"name":"Важная встреча","skip_time":"N","timezone_from":"Europe/Moscow","timezone_to":"Europe/Moscow","description":"Описание события","color":"#FF0000","text_color":"#000000","accessibility":"busy","importance":"high","private_event":"N","rrule":{"FREQ":"WEEKLY","COUNT":10,"INTERVAL":1,"BYDAY":["MO","WE","FR"]},"is_meeting":"Y","location":"Конференц-зал","remind":[{"type":"min","count":30}],"attendees":[29,93],"host":1,"meeting":{"notify":true,"reinvite":false,"allow_invite":true,"hide_guests":false},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.event.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.event.add',
    		{
    			type: 'company_calendar',
    			ownerId: '',
    			from: '2025-01-31T18:00:00',
    			to: '2025-01-31T20:00:00',
    			section: 1,
    			name: 'Важная встреча',
    			skip_time: 'N',
    			timezone_from: 'Europe/Moscow',
    			timezone_to: 'Europe/Moscow',
    			description: 'Описание события',
    			color: '%23FF0000',
    			text_color: '%23000000',
    			accessibility: 'busy',
    			importance: 'high',
    			private_event: 'N',
    			rrule: {
    				FREQ: 'WEEKLY',
    				COUNT: 10,
    				INTERVAL: 1,
    				BYDAY: ['MO', 'WE', 'FR']
    			},
    			is_meeting: 'Y',
    			location: 'Конференц-зал',
    			remind: [
    				{ type: 'min', count: 30 }
    			],
    			attendees: [29, 93],
    			host: 1,
    			meeting: {
    				notify: true,
    				reinvite: false,
    				allow_invite: true,
    				hide_guests: false
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Event added successfully', result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.event.add',
                [
                    'type'           => 'company_calendar',
                    'ownerId'        => '',
                    'from'           => '2025-01-31T18:00:00',
                    'to'             => '2025-01-31T20:00:00',
                    'section'        => 1,
                    'name'           => 'Важная встреча',
                    'skip_time'      => 'N',
                    'timezone_from'  => 'Europe/Moscow',
                    'timezone_to'    => 'Europe/Moscow',
                    'description'    => 'Описание события',
                    'color'          => '%23FF0000',
                    'text_color'     => '%23000000',
                    'accessibility'  => 'busy',
                    'importance'     => 'high',
                    'private_event'  => 'N',
                    'rrule'          => [
                        'FREQ'     => 'WEEKLY',
                        'COUNT'    => 10,
                        'INTERVAL' => 1,
                        'BYDAY'    => ['MO', 'WE', 'FR']
                    ],
                    'is_meeting'     => 'Y',
                    'location'       => 'Конференц-зал',
                    'remind'         => [
                        ['type' => 'min', 'count' => 30]
                    ],
                    'attendees'      => [29, 93],
                    'host'           => 1,
                    'meeting'        => [
                        'notify'       => true,
                        'reinvite'     => false,
                        'allow_invite' => true,
                        'hide_guests'  => false
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Event added successfully: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'calendar.event.add',
        {
            type: 'company_calendar', // Тип календаря: календарь компании
            ownerId: '', // Для календаря компании ownerId имеет пустое значение
            from: '2025-01-31T18:00:00', // Дата и время начала события
            to: '2025-01-31T20:00:00', // Дата и время окончания события
            section: 1, // Идентификатор календаря
            name: 'Важная встреча', // Название события
            skip_time: 'N', // Использовать дату и время (N)
            timezone_from: 'Europe/Moscow', // Часовой пояс начала события
            timezone_to: 'Europe/Moscow', // Часовой пояс окончания события
            description: 'Описание события', // Описание события
            color: '%23FF0000', // Цвет фона события (красный)
            text_color: '%23000000', // Цвет текста события (черный)
            accessibility: 'busy', // Доступность на время события: занят
            importance: 'high', // Важность события: высокая
            private_event: 'N', // Событие не является частным
            rrule: { // Параметры повторяемости события
                FREQ: 'WEEKLY', // Частота повторения: еженедельно
                COUNT: 10, // Количество повторений
                INTERVAL: 1, // Интервал между повторениями
                BYDAY: ['MO', 'WE', 'FR'] // Дни недели: понедельник, среда, пятница
            },
            is_meeting: 'Y', // Признак встречи с участниками
            location: 'Конференц-зал', // Место проведения
            remind: [ // Напоминания о событии
                { type: 'min', count: 30 } // Напоминание за 30 минут до события
            ],
            attendees: [29, 93], // Список идентификаторов участников события
            host: 1, // Идентификатор организатора события
            meeting: { // Параметры встречи
                notify: true, // Оповещение о подтверждении или отказе участников
                reinvite: false, // Не запрашивать повторное подтверждение участия
                allow_invite: true, // Разрешить участникам приглашать других
                hide_guests: false // Не скрывать список участников
            }
        },
        function(result) {
            if(result.error()) {
                console.error(result.error()); // Обработка ошибки
            } else {
                console.log('Event added successfully', result.data()); // Успешное добавление события
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.event.add',
        [
            'type' => 'company_calendar', // Тип календаря: календарь компании
            'ownerId' => '', // Для календаря компании ownerId имеет пустое значение
            'from' => '2025-01-31T18:00:00', // Дата и время начала события
            'to' => '2025-01-31T20:00:00', // Дата и время окончания события
            'section' => 1, // Идентификатор календаря (замените на реальный)
            'name' => 'Важная встреча', // Название события
            'skip_time' => 'N', // Использовать дату и время (N)
            'timezone_from' => 'Europe/Moscow', // Часовой пояс начала события
            'timezone_to' => 'Europe/Moscow', // Часовой пояс окончания события
            'description' => 'Описание события', // Описание события
            'color' => '#FF0000', // Цвет фона события (красный)
            'text_color' => '#000000', // Цвет текста события (черный)
            'accessibility' => 'busy', // Доступность на время события: занят
            'importance' => 'high', // Важность события: высокая
            'private_event' => 'N', // Событие не является частным
            'rrule' => [ // Параметры повторяемости события
                'FREQ' => 'WEEKLY', // Частота повторения: еженедельно
                'COUNT' => 10, // Количество повторений
                'INTERVAL' => 1, // Интервал между повторениями
                'BYDAY' => ['MO', 'WE', 'FR'] // Дни недели: понедельник, среда, пятница
            ],
            'is_meeting' => 'Y', // Признак встречи с участниками
            'location' => 'Конференц-зал', // Место проведения
            'remind' => [ // Напоминания о событии
                ['type' => 'min', 'count' => 30] // Напоминание за 30 минут до события
            ],
            'attendees' => [29, 93], // Список идентификаторов участников события
            'host' => 1, // Идентификатор организатора события
            'meeting' => [ // Параметры встречи
                'notify' => true, // Оповещение о подтверждении или отказе участников
                'reinvite' => false, // Не запрашивать повторное подтверждение участия
                'allow_invite' => true, // Разрешить участникам приглашать других
                'hide_guests' => false // Не скрывать список участников
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description']; // Обработка ошибки
    } else {
        echo 'Событие успешно добавлено: ';
        print_r($result['result']); // Успешное добавление события
    }
    ```

{% endlist %}

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
[`integer`](../../data-types.md) | Идентификатор созданного события ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "name" для метода "calendar.event.add""
}
```
{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

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

{% include [системные ошибки](../../../_includes/system-errors.md) %}