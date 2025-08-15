# Получить пользовательские настройки календаря calendar.user.settings.get

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает пользовательские настройки календаря.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.user.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.user.settings.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.user.settings.get',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log('Result:', result);
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
                'calendar.user.settings.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting user calendar settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.user.settings.get',
        {}
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.user.settings.get',
        []
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
        "view": "month",
        "meetSection": "4",
        "crmSection": "4",
        "showDeclined": true,
        "denyBusyInvitation": false,
        "collapseOffHours": "N",
        "showWeekNumbers": "N",
        "showTasks": "Y",
        "syncTasks": "N",
        "showCompletedTasks": "N",
        "lastUsedSection": "false",
        "sendFromEmail": "",
        "defaultSections": {
            "user1": "4",
            "group6": "49"
        },
        "syncPeriodPast": "3",
        "syncPeriodFuture": "12",
        "defaultReminders": {
            "fullDay": [
                {
                    "type": "min",
                    "count": 15
                }
            ],
            "withTime": [
                {
                    "type": "min",
                    "count": 50
                }
            ]
        },
        "timezoneName": "Europe/Riga",
        "timezoneOffsetUTC": 7200,
        "timezoneDefaultName": "",
        "work_time_start": "9.00",
        "work_time_end": "19.00"
    },
    "time": {
        "start": 1734434829.455204,
        "finish": 1734434829.797482,
        "duration": 0.34227800369262695,
        "processing": 0.0038161277770996094,
        "date_start": "2024-12-17T11:27:09+00:00",
        "date_finish": "2024-12-17T11:27:09+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **view**
[`string`](../data-types.md) | Стандартное представление для календаря. Возможные значения:
- `day` — день
- `week` — неделя
- `month` — месяц
- `list` — список ||
|| **meetSection**
[`string`](../data-types.md) | Календарь для приглашений ||
|| **crmSection**
[`string`](../data-types.md) | Календарь для CRM ||
|| **showDeclined**
[`boolean`](../data-types.md) | Показывать события, в которых пользователь отказался принять участие ||
|| **denyBusyInvitation**
[`boolean`](../data-types.md) | Запрещать приглашать в событие, если время занято ||
|| **collapseOffHours**
[`string`](../data-types.md) | Скрывать нерабочее время в календаре в недельном и дневном представлении. Возможные значения:
- `Y` — скрывать
- `N` — не скрывать ||
|| **showWeekNumbers**
[`string`](../data-types.md) | Показывать номер недель. Возможные значения:
- `Y` — показывать
- `N` — не показывать ||
|| **showTasks**
[`string`](../data-types.md) | Отображать задачи в календаре. Возможные значения:
- `Y` — отображать
- `N` — не отображать ||
|| **syncTasks**
[`string`](../data-types.md) | Синхронизировать календарь задач. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **showCompletedTasks**
[`string`](../data-types.md) | Отображать завершенные задачи. Возможные значения:
- `Y` — отображать
- `N` — не отображать  ||
|| **lastUsedSection**
[`string`](../data-types.md) | Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря. 

Значение по умолчанию — `false` ||
|| **sendFromEmail**
[`string`](../data-types.md) | E-mail для отправки почтовых приглашений ||
|| **defaultSections**
[`object`](../data-types.md) | Настройки предустановленных календарей.

Ключем объекта настроек может быть:
- `user[id]` — тип Календарь пользователя c идентификатором пользователя. Например, `user12` соответствует календарю пользователя с идентификатором `12`
- `group[id]` — тип Календарь группы с идентификатором группы. Например, `group36` соответствует календарю группы с идентификатором `36`

Значением объекта является идентификатор календаря ||
|| **syncPeriodPast**
[`string`](../data-types.md) | Количество месяцев для синхронизации в прошлом периоде ||
|| **syncPeriodFuture**
[`string`](../data-types.md) | Количество месяцев для синхронизации в будущем периоде ||
|| **defaultReminders**
[`object`](../data-types.md) | Объект со стандартными настройками [напоминаний о событии](#defaultReminders) ||
|| **timezoneName**
[`string`](../data-types.md) | Таймзона календаря ||
|| **timezoneOffsetUTC**
[`integer`](../data-types.md) | Смешение таймзоны относительно UTC в секундах ||
|| **timezoneDefaultName**
[`string`](../data-types.md) | Если параметр `timezoneName` не установлен, здесь будет указан часовой пояс из параметра `timezoneOffsetUTC` ||
|| **work_time_start**
[`string`](../data-types.md) | Время начала рабочего дня ||
|| **work_time_end**
[`string`](../data-types.md) | Время окончания рабочего дня ||
|#

#### Объект defaultReminders {#defaultReminders}

#|
|| **Название**
`тип` | **Описание** ||
|| **fullDay**
[`array`](../data-types.md) | Массив [стандартных настроек напоминаний](#reminder-settings) для целодневных событий ||
|| **withTime**
[`array`](../data-types.md) | Массив [стандартных настроек напоминаний](#reminder-settings) для событий с указанием времени ||
|#

#### Объект настроек напоминания {#reminder-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Временной тип напоминания. Возможные значения:
- `min` — минуты
- `hour` — часы
- `day` — дни ||
|| **count**
[`integer`](../data-types.md) | Числовое значение временного промежутка ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-settings-get.md)
- [{#T}](./calendar-user-settings-set.md)
