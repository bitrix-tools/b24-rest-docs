# Получить основные настройки календаря calendar.settings.get

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает основные настройки календаря. Изменить основные настройки может только администратор портала.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.settings.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.settings.get',
    		{}
    	);
    	
    	const result = response.getData().result;
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
                'calendar.settings.get',
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
        echo 'Error getting calendar settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.settings.get',
        {}
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.settings.get',
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
        "work_time_start": "9",
        "work_time_end": "19",
        "year_holidays": "1.01,2.01,7.01,23.02,8.03,1.05,9.05,12.06,4.11",
        "year_workdays": "31.12",
        "week_holidays": [
            "SA",
            "SU"
        ],
        "week_start": "MO",
        "user_name_template": "#NAME# #LAST_NAME#",
        "sync_by_push": false,
        "user_show_login": true,
        "path_to_user": "/company/personal/user/#user_id#/",
        "path_to_user_calendar": "/company/personal/user/#user_id#/calendar/",
        "path_to_group": "/workgroups/group/#group_id#/",
        "path_to_group_calendar": "/workgroups/group/#group_id#/calendar/",
        "path_to_vr": "",
        "path_to_rm": "",
        "rm_iblock_type": "",
        "rm_iblock_id": "",
        "dep_manager_sub": true,
        "denied_superpose_types": [],
        "pathes_for_sites": "",
        "forum_id": "8",
        "rm_for_sites": true,
        "path_to_type_company_calendar": "",
        "path_to_type_location": "",
        "path_to_type_open_event": ""
    },
    "time": {
        "start": 1733924639.802569,
        "finish": 1733924640.184363,
        "duration": 0.3817939758300781,
        "processing": 0.012382984161376953,
        "date_start": "2024-12-11T13:43:59+00:00",
        "date_finish": "2024-12-11T13:44:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **work_time_start**
[`string`](../data-types.md) | Время начала рабочего дня ||
|| **work_time_end**
[`string`](../data-types.md) | Время окончания рабочего дня ||
|| **year_holidays**
[`string`](../data-types.md) | Список праздничных дней ||
|| **week_holidays**
[`array`](../data-types.md) | Массив выходных дней ||
|| **week_start**
[`string`](../data-types.md) | День начала недели ||
|| **user_name_template**
[`string`](../data-types.md) | Шаблон имени пользователя ||
|| **sync_by_push**
[`boolean`](../data-types.md) | Флаг автоматической синхронизации календарей по подписке. Push-события от Google/Office365 ||
|| **user_show_login**
[`boolean`](../data-types.md) | Флаг отображения логина пользователя ||
|| **path_to_user**
[`string`](../data-types.md) | Шаблон ссылки на профиль пользователя ||
|| **path_to_user_calendar**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря пользователя ||
|| **path_to_group**
[`string`](../data-types.md) | Шаблон ссылки на просмотр рабочей группы ||
|| **path_to_group_calendar**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря группы ||
|| **path_to_vr**
[`string`](../data-types.md) | Шаблон ссылки к видеопереговорной ||
|| **path_to_rm**
[`string`](../data-types.md) | Шаблон ссылки к переговорной ||
|| **rm_iblock_type**
[`string`](../data-types.md) | Тип инфоблока бронирования переговорных и видеопереговорных ||
|| **rm_iblock_id**
[`string`](../data-types.md) | Идентификатор инфоблока бронирования переговорных ||
|| **dep_manager_sub**
[`boolean`](../data-types.md) | Флаг разрешения начальникам просматривать календари подчиненных ||
|| **denied_superpose_types**
[`array`](../data-types.md) | Список типов календарей, которые не могут быть добавлены в избранные ||
|| **pathes_for_sites**
[`boolean`](../data-types.md) | Устанавливает шаблоны ссылок общие для всех сайтов ||
|| **forum_id**
[`string`](../data-types.md) | Идентификатор форума для комментариев ||
|| **rm_for_sites**
[`boolean`](../data-types.md) | Устанавливает параметры переговорных общие для всех сайтов ||
|| **path_to_type_company_calendar**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календарей компании ||
|| **path_to_type_location**
[`string`](../data-types.md) | Шаблон ссылки на просмотр бронирования переговорных ||
|| **path_to_type_open_event**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря открытых событий ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-user-settings-get.md)
- [{#T}](./calendar-user-settings-set.md)