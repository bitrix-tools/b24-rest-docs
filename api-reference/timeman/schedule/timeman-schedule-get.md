# Получить рабочий график timeman.schedule.get

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.schedule.get` получает рабочий график по идентификатору. Если графика с указанным идентификатором не существует — вернет пустой массив.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор графика.

Узнать идентификатор графика можно в списке графиков на странице *Сотрудники > Время и отчеты > Рабочие графики* ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/timeman.schedule.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.schedule.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"timeman.schedule.get",
    		{
    			id: 1
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    	if(response.more())
    		response.next();
    }
    catch(error)
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
                'timeman.schedule.get',
                [
                    'id' => 1
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
            if ($result->more()) {
                $result->next();
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting schedule: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "timeman.schedule.get",
        {
            id: 1
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'timeman.schedule.get',
        [
            'id' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 1,
        "NAME": "Для всех сотрудников",
        "SCHEDULE_TYPE": "FIXED",
        "REPORT_PERIOD": "MONTH",
        "REPORT_PERIOD_OPTIONS": {
            "START_WEEK_DAY": 0
        },
        "CALENDAR_ID": 1,
        "ALLOWED_DEVICES": {
            "browser": true
        },
        "DELETED": "0",
        "IS_FOR_ALL_USERS": true,
        "WORKTIME_RESTRICTIONS": [
            "[]"
        ],
        "CONTROLLED_ACTIONS": 3,
        "UPDATED_BY": 503,
        "DELETED_BY": 0,
        "DELETED_AT": "",
        "CREATED_BY": 0,
        "CREATED_AT": "2019-09-19T21:22:22+03:00",
        "SHIFTS": [
            {
                "ID": 1,
                "NAME": "",
                "BREAK_DURATION": 3600,
                "WORK_TIME_START": 28800,
                "WORK_TIME_END": 61200,
                "WORK_DAYS": "12345",
                "SCHEDULE_ID": 1,
                "DELETED": false
            }
        ],
        "CALENDAR": {
            "ID": 1,
            "NAME": "",
            "PARENT_CALENDAR_ID": 0,
            "SYSTEM_CODE": "",
            "EXCLUSIONS": []
        },
        "SCHEDULE_VIOLATION_RULES": {
            "ID": 1,
            "SCHEDULE_ID": 1,
            "ENTITY_CODE": "UA",
            "MAX_EXACT_START": 28859,
            "MIN_EXACT_END": 61200,
            "MAX_OFFSET_START": -1,
            "MIN_OFFSET_END": -1,
            "RELATIVE_START_FROM": -1,
            "RELATIVE_START_TO": -1,
            "RELATIVE_END_FROM": -1,
            "RELATIVE_END_TO": -1,
            "MIN_DAY_DURATION": 28800,
            "MAX_ALLOWED_TO_EDIT_WORK_TIME": 300,
            "MAX_WORK_TIME_LACK_FOR_PERIOD": 3600,
            "PERIOD_TIME_LACK_AGENT_ID": 309429,
            "MAX_SHIFT_START_DELAY": -1,
            "MISSED_SHIFT_START": 0,
            "USERS_TO_NOTIFY": {
                "FIXED_START_END": [
                    "U503"
                ],
                "FIXED_PER_RECORD": [
                    "U503"
                ],
                "FIXED_EDIT_WORKTIME": [
                    "U503"
                ],
                "FIXED_PERIODIC": [
                    "U503"
                ],
                "SHIFT_DELAY": [],
                "SHIFT_MISSED_START": []
            }
        }
    },
    "time": {
        "start": 1744036659.2339499,
        "finish": 1744036659.2655749,
        "duration": 0.031625032424926758,
        "processing": 0.008758068084716797,
        "date_start": "2025-04-07T17:37:39+03:00",
        "date_finish": "2025-04-07T17:37:39+03:00",
        "operating_reset_at": 1744037259,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с описанием графика работы сотрудников ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор графика работы ||
|| **NAME**
[`string`](../../data-types.md) | Название графика работы || 
|| **SCHEDULE_TYPE**
[`string`](../../data-types.md) | Тип графика работы.

Варианты значений:
- `FIXED` — фиксированный
- `SHIFT` — посменный
- `FLEXTIME` — свободный ||
|| **REPORT_PERIOD**
[`string`](../../data-types.md) | Периодичность формирования отчетов по графику.

Возможные значения:
- `MONTH` — месяц
- `WEEK` — неделя
- `TWO_WEEKS` — две недели
- `QUARTER`  — квартал ||
|| **REPORT_PERIOD_OPTIONS**
[`object`](../../data-types.md) | Объект с описанием [дополнительных настроек](#report_period_options) периода формирования отчетов.

Только для `REPORT_PERIOD` со значениями `WEEK` и `TWO_WEEKS` ||
|| **CALENDAR_ID**
[`integer`](../../data-types.md) | Идентификатор календаря, связанного с графиком работы ||
|| **ALLOWED_DEVICES**
[`object`](../../data-types.md) | Объект с описанием [разрешенных устройств](#allowed_devices) для учета рабочего времени ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления графика работы.

Значение `"0"` означает, что график активен. Значение `"1"` указывает на удаленное состояние ||
|| **IS_FOR_ALL_USERS**
[`boolean`](../../data-types.md) | Применимость графика ко всем сотрудникам.

Значение `true` означает, что график применяется ко всем пользователям системы ||
|| **WORKTIME_RESTRICTIONS**
[`array`](../../data-types.md) | Ограничения рабочего времени.

Содержит массив строк с правилами ограничений ||
|| **CONTROLLED_ACTIONS**
[`integer`](../../data-types.md) | Количество контролируемых действий в рамках графика работы ||
|| **UPDATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним обновил график работы ||
|| **DELETED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который удалил график работы.

Значение `0` указывает, что график не был удален ||
|| **DELETED_AT**
[`string`](../../data-types.md) | Дата и время удаления графика работы.

Пустая строка означает, что график не был удален ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал график работы.

Значение `0` указывает на системное создание ||
|| **CREATED_AT**
[`datetime`](../../data-types.md) | Дата и время создания графика работы ||
|| **SHIFTS**
[`array`](../../data-types.md) | Массив объектов смен. Каждый объект содержит описание [смены](#shifts), связанной с графиком работы ||
|| **CALENDAR**
[`object`](../../data-types.md) | Объект с информацией о [календаре](#calendar), связанном с графиком работы ||
|| **SCHEDULE_VIOLATION_RULES**
[`object`](../../data-types.md) | Объект с описанием [правил нарушения графика работы](#schedule_violation_rules) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект REPORT_PERIOD_OPTIONS {#report_period_options}

#|
|| **Название**
`тип` | **Описание** ||
|| **START_WEEK_DAY**
[`integer`](../../data-types.md) | День начала недели.

Возможные значения:
- `0` — понедельник
- `1` — вторник
- `2` — среда
- `3` — четверг
- `4` — пятница
- `5` — суббота 
- `6` — воскресенье||
|#

#### Объект ALLOWED_DEVICES {#allowed_devices}

#|
|| **Название**
`тип` | **Описание** ||
|| **browser**
[`boolean`](../../data-types.md) | Разрешен ли учет рабочего времени через браузер.

Если `true` — учет разрешен ||
|#

#### Объект SHIFTS {#shifts}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор смены ||
|| **NAME**
[`string`](../../data-types.md) | Название смены ||
|| **BREAK_DURATION**
[`integer`](../../data-types.md) | Длительность перерыва в секундах ||
|| **WORK_TIME_START**
[`integer`](../../data-types.md) | Время начала рабочего дня в секундах от полуночи ||
|| **WORK_TIME_END**
[`integer`](../../data-types.md) | Время окончания рабочего дня в секундах от полуночи ||
|| **WORK_DAYS**
[`string`](../../data-types.md) | Строка с кодами рабочих дней. Например, `12345` — с понедельника по пятницу ||
|| **SCHEDULE_ID**
[`integer`](../../data-types.md) | Идентификатор графика работы ||
|| **DELETED**
[`boolean`](../../data-types.md) | Флаг удаления смены.

Значение `true` означает, что смена удалена ||
|#

#### Объект CALENDAR {#calendar}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор календаря ||
|| **NAME**
[`string`](../../data-types.md) | Название календаря ||
|| **PARENT_CALENDAR_ID**
[`integer`](../../data-types.md) | Идентификатор родительского календаря.

Значение `0` указывает, что родительский календарь отсутствует ||
|| **SYSTEM_CODE**
[`string`](../../data-types.md) | Системный код календаря ||
|| **EXCLUSIONS**
[`array`](../../data-types.md) | Исключения из календаря.

Содержит массив строк с датами или периодами, исключенными из календаря ||
|#

#### Объект SCHEDULE_VIOLATION_RULES {#schedule_violation_rules}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор правил нарушений графика ||
|| **SCHEDULE_ID**
[`integer`](../../data-types.md) | Идентификатор графика работы ||
|| **ENTITY_CODE**
[`string`](../../data-types.md) | Код сущности, к которой применяются правила.

Например, `UA` — пользовательские действия ||
|| **MAX_EXACT_START**
[`integer`](../../data-types.md) | Максимальное точное время начала рабочего дня в секундах от полуночи ||
|| **MIN_EXACT_END**
[`integer`](../../data-types.md) | Минимальное точное время окончания рабочего дня в секундах от полуночи ||
|| **MAX_OFFSET_START**
[`integer`](../../data-types.md) | Максимальное смещение начала рабочего дня.

Значение `-1` означает, что ограничение не установлено ||
|| **MIN_OFFSET_END**
[`integer`](../../data-types.md) | Минимальное смещение окончания рабочего дня.

Значение `-1` означает, что ограничение не установлено ||
|| **RELATIVE_START_FROM**
[`integer`](../../data-types.md) | Относительное начало рабочего дня (относительно планируемого времени).

Значение `-1` означает, что ограничение не установлено ||
|| **RELATIVE_START_TO**
[`integer`](../../data-types.md) | Относительное окончание рабочего дня (относительно планируемого времени).

Значение `-1` означает, что ограничение не установлено ||
|| **RELATIVE_END_FROM**
[`integer`](../../data-types.md) | Относительное начало окончания рабочего дня.

Значение `-1` означает, что ограничение не установлено ||
|| **RELATIVE_END_TO**
[`integer`](../../data-types.md) | Относительное окончание рабочего дня.

Значение `-1` означает, что ограничение не установлено ||
|| **MIN_DAY_DURATION**
[`integer`](../../data-types.md) | Минимальная продолжительность рабочего дня в секундах ||
|| **MAX_ALLOWED_TO_EDIT_WORK_TIME**
[`integer`](../../data-types.md) | Максимальное время, на которое можно изменить рабочее время в секундах ||
|| **MAX_WORK_TIME_LACK_FOR_PERIOD**
[`integer`](../../data-types.md) | Максимальное время недоработки за период в секундах ||
|| **PERIOD_TIME_LACK_AGENT_ID**
[`integer`](../../data-types.md) | Идентификатор агента, который проверяет недоработку за период ||
|| **MAX_SHIFT_START_DELAY**
[`integer`](../../data-types.md) | Максимальная задержка начала смены в секундах.

Значение `-1` означает, что ограничение не установлено ||
|| **MISSED_SHIFT_START**
[`integer`](../../data-types.md) | Флаг пропуска начала смены.

Значение `0` означает, что пропуск не фиксировался ||
|| **USERS_TO_NOTIFY**
[`object`](../../data-types.md) | Объект с описанием пользователей для [уведомления о нарушениях графика](#users_to_notify) ||
|#

#### Объект USERS_TO_NOTIFY {#users_to_notify}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIXED_START_END**
[`array`](../../data-types.md) | Список пользователей для уведомления о фиксированном начале и окончании рабочего дня.

Каждый элемент массива содержит идентификатор пользователя в формате `U<ID>` ||
|| **FIXED_PER_RECORD**
[`array`](../../data-types.md) | Список пользователей для уведомления о фиксированных записях рабочего времени.

Каждый элемент массива содержит идентификатор пользователя в формате `U<ID>` ||
|| **FIXED_EDIT_WORKTIME**
[`array`](../../data-types.md) | Список пользователей для уведомления об изменении рабочего времени.

Каждый элемент массива содержит идентификатор пользователя в формате `U<ID>` ||
|| **FIXED_PERIODIC**
[`array`](../../data-types.md) | Список пользователей для уведомления о периодических нарушениях графика.

Каждый элемент массива содержит идентификатор пользователя в формате `U<ID>` ||
|| **SHIFT_DELAY**
[`array`](../../data-types.md) | Список пользователей для уведомления о задержке начала смены ||
|| **SHIFT_MISSED_START**
[`array`](../../data-types.md) | Список пользователей для уведомления о пропуске начала смены ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
