# Получить основные настройки календаря calendar.settings.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.settings.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CalendarSettingsResult = {
      work_time_start: string
      work_time_end: string
      year_holidays: string
      year_workdays: string
      week_holidays: string[]
      week_start: string
      user_name_template: string
      sync_by_push: boolean
      user_show_login: boolean
      path_to_user: string
      path_to_user_calendar: string
      path_to_group: string
      path_to_group_calendar: string
      path_to_vr: string
      path_to_rm: string
      rm_iblock_type: string
      rm_iblock_id: string
      dep_manager_sub: boolean
      denied_superpose_types: string[]
      pathes_for_sites: string
      forum_id: string
      rm_for_sites: boolean
      path_to_type_company_calendar: string
      path_to_type_location: string
      path_to_type_open_event: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CalendarSettingsResult>({
        method: 'calendar.settings.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Calendar settings:', result.work_time_start, result.work_time_end)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getCalendarSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.settings.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Calendar settings:', result.work_time_start, result.work_time_end)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCalendarSettings)
    </script>
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