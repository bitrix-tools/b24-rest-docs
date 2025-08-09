# Получить занятость пользователей из списка calendar.accessibility.get

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает занятость пользователей из списка.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|s
|| **Название**
`тип` | **Описание** ||
|| **users***
[`array`](../../data-types.md) | Массив идентификаторов пользователей ||
|| **from***
[`date`](../../data-types.md) | Дата начала периода для определения занятости в формате `ГГГГ-ММ-ДД`.

Например, `2024-06-20` ||
|| **to***
[`date`](../../data-types.md) | Дата окончания периода для определения занятости в формате `ГГГГ-ММ-ДД`.

Например, `2024-12-20`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"2024-06-20","to":"2024-12-20","users":[1,2,34]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.accessibility.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"2024-06-20","to":"2024-12-20","users":[1,2,34],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.accessibility.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.accessibility.get',
    		{
    			from: '2024-06-20',
    			to: '2024-12-20',
    			users: [1, 2, 34]
    		}
    	);
    	
    	const result = response.getData().result;
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
                'calendar.accessibility.get',
                [
                    'from'  => '2024-06-20',
                    'to'    => '2024-12-20',
                    'users' => [1, 2, 34]
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
        echo 'Error getting calendar accessibility: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.accessibility.get',
        {
            from: '2024-06-20',
            to: '2024-12-20',
            users: [1, 2, 34]
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.accessibility.get',
        [
            'from' => '2024-06-20',
            'to' => '2024-12-20',
            'users' => [1, 2, 34]
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
        "1": [
            {
                "ID": "1213",
                "NAME": "Event name",
                "DATE_FROM": "02.12.2024 11:00:00",
                "DATE_TO": "02.12.2024 12:00:00",
                "DATE_FROM_TS_UTC": "1733158800",
                "DATE_TO_TS_UTC": "1733162400",
                "~USER_OFFSET_FROM": -21600,
                "~USER_OFFSET_TO": -21600,
                "DT_SKIP_TIME": "N",
                "TZ_FROM": "America/Managua",
                "TZ_TO": "America/Managua",
                "ACCESSIBILITY": "busy",
                "IMPORTANCE": "normal",
                "EVENT_TYPE": "#collab#"
            },
            {
                "ID": "1216",
                ...
            }
        ],
        "2": [
            {
                "ID": 1,
                ...
            },
            {
                "ID": 2,
                ...
            }
        ],
        "34": []
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат содержит объект.

Ключ объекта — это идентификатор пользователя из запроса.

Значение — массив объектов, каждый из которых описывает [событие](#event), в котором занят пользователь в указанный период ||
|#

#### Объект события {#event}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор события ||
|| **NAME**
[`string`](../../data-types.md) | Название события ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Дата и время начала события ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Дата и время окончания события ||
|| **DATE_FROM_TS_UTC**
[`string`](../../data-types.md) | Дата и время начала события в UTC в формате timestamp ||
|| **DATE_TO_TS_UTC**
[`string`](../../data-types.md) | Дата и время окончания события в UTC в формате timestamp ||
|| **~USER_OFFSET_FROM**
[`integer`](../../data-types.md) | Смещение времени начала события относительно UTC в секундах ||
|| **~USER_OFFSET_TO**
[`integer`](../../data-types.md) | Смещение времени окончания события относительно UTC в секундах ||
|| **DT_SKIP_TIME**
[`integer`](../../data-types.md) | Флаг отображающий что событие длится целый день. Возможные значения:
- `Y` — целый день
- `N` — не целый день ||
|| **TZ_FROM**
[`integer`](../../data-types.md) | Таймзона даты начала события ||
|| **TZ_TO**
[`integer`](../../data-types.md) | Таймзона даты окончания события ||
|| **ACCESSIBILITY**
[`integer`](../../data-types.md) | Доступность участников события. Возможные значения:

- `busy` — занят
- `absent` — отсутствую
- `quest` — под вопросом
- `free` — свободен ||
|| **IMPORTANCE**
[`string`](../../data-types.md) | Важность события. Возможные значения:

- `high` — высокая
- `normal` — средняя
- `low`— низкая ||
|| **EVENT_TYPE**
[`string`](../../data-types.md) | Некоторые события содержат информацию о способе создания.

Событие может быть создано через:

- `#shared#` — слоты календаря
- `#shared_crm#` — слоты CRM
- `#collab#` — коллабу
- `#shared_collab#` — слоты коллабы
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "from" для метода "calendar.accessibility.get""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "from" для метода "calendar.accessibility.get" | Не передан обязательный параметр `from` ||
|| Пустая строка | Не задан обязательный параметр "to" для метода "calendar.accessibility.get" | Не передан обязательный параметр `to` ||
|| Пустая строка | Не задан обязательный параметр "users" для метода "calendar.accessibility.get" | Не передан обязательный параметр `users` ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-meeting-status-get.md)
- [{#T}](./calendar-meeting-status-set.md)