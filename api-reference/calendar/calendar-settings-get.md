# Получить основные настройки календаря calendar.settings.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.settings.get` получает основные настройки календаря: рабочий график компании, выходные и праздничные дни, шаблоны ссылок и параметры переговорных.

Изменить основные настройки может только администратор Битрикс24 в интерфейсе. Пользовательские настройки сотрудника получают и изменяют методы [calendar.user.settings.get](./calendar-user-settings-get.md) и [calendar.user.settings.set](./calendar-user-settings-set.md).

Экстранет-пользователям метод возвращает только `work_time_start` и `work_time_end`, остальные поля в ответе отсутствуют. Значения этих полей для экстранет-пользователей фиксированы — `9` и `19`, а не рабочий график компании.

## Параметры метода

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
      work_time_start: string | number
      work_time_end: string | number
      year_holidays: string
      year_workdays: string
      week_holidays: string[]
      week_start: string
      user_name_template: string
      sync_by_push: string | boolean
      user_show_login: string | boolean
      path_to_user: string
      path_to_user_calendar: string
      path_to_group: string
      path_to_group_calendar: string
      path_to_vr: string
      path_to_rm: string
      rm_iblock_type: string
      rm_iblock_id: string
      dep_manager_sub: string | boolean
      denied_superpose_types: string[]
      pathes_for_sites: string | boolean
      pathes: Array<Record<string, string>>
      forum_id: string
      rm_for_sites: string | boolean
      path_to_type_company_calendar: string
      path_to_type_location: string
      path_to_type_events: string
      path_to_type_resource: string
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.settings.get().response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
        // Дальше обработайте $result в своем коде

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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "calendar.settings.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("calendar.settings.get: %w", err)
    }

    // Структура сокращена: ниже только поля, которые нужны примеру.
    // Полный список полей — в разделе «Возвращаемые данные».
    var item struct {
    	WorkTimeStart    any    `json:"work_time_start"`
    	WorkTimeEnd      any    `json:"work_time_end"`
    	YearHolidays     string `json:"year_holidays"`
    	YearWorkdays     string `json:"year_workdays"`
    	WeekStart        string `json:"week_start"`
    	UserNameTemplate string `json:"user_name_template"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.WorkTimeStart, item.WorkTimeEnd)
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
        "sync_by_push": "",
        "user_show_login": "1",
        "path_to_user": "/company/personal/user/#user_id#/",
        "path_to_user_calendar": "/company/personal/user/#user_id#/calendar/",
        "path_to_group": "/workgroups/group/#group_id#/",
        "path_to_group_calendar": "/workgroups/group/#group_id#/calendar/",
        "path_to_vr": "",
        "path_to_rm": "",
        "rm_iblock_type": "",
        "rm_iblock_id": "",
        "dep_manager_sub": "1",
        "denied_superpose_types": [],
        "pathes_for_sites": "",
        "pathes": [],
        "forum_id": "8",
        "rm_for_sites": "1",
        "path_to_type_company_calendar": "",
        "path_to_type_location": "",
        "path_to_type_events": "",
        "path_to_type_resource": ""
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
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#settings) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект настроек {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **work_time_start**
[```string|integer```](../data-types.md) | Время начала рабочего дня. Пока настройку не сохраняли, приходит числом `9`, после сохранения — обычно строкой. Если сохраненное значение больше `23`, метод возвращает число `23` ||
|| **work_time_end**
[```string|integer```](../data-types.md) | Время окончания рабочего дня. Пока настройку не сохраняли, приходит числом `19`, после сохранения — обычно строкой. Если окончание не позже начала, метод возвращает число — время начала плюс один час. Если значение больше `23.30`, метод возвращает число `23.3` ||
|| **year_holidays**
[`string`](../data-types.md) | Праздничные дни в году: даты через запятую в формате `день.месяц`, например `1.01,2.01,7.01` ||
|| **year_workdays**
[`string`](../data-types.md) | Рабочие дни в году: даты через запятую в формате `день.месяц`, например `31.12` ||
|| **week_holidays**
[`array`](../data-types.md) | Массив выходных дней. Элемент массива — [`string`](../data-types.md), двухбуквенный код дня недели: `MO`, `TU`, `WE`, `TH`, `FR`, `SA`, `SU` ||
|| **week_start**
[`string`](../data-types.md) | День начала недели ||
|| **user_name_template**
[`string`](../data-types.md) | Шаблон имени пользователя ||
|| **sync_by_push**
[```string|boolean```](../data-types.md) | Флаг автоматической синхронизации календарей по подписке на push-события Google и Office365. Пока настройку не сохраняли, приходит `false`; после сохранения — строкой: `'1'` — включено, пустая строка — выключено ||
|| **user_show_login**
[```string|boolean```](../data-types.md) | Флаг отображения логина пользователя. Пока настройку не сохраняли, приходит `true`; после сохранения — строкой: `'1'` — включено, пустая строка — выключено ||
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
[```string|boolean```](../data-types.md) | Флаг разрешения начальникам просматривать календари подчиненных. Пока настройку не сохраняли, приходит `true`; после сохранения — строкой: `'1'` — включено, пустая строка — выключено ||
|| **denied_superpose_types**
[`array`](../data-types.md) | Список типов календарей, которые не могут быть добавлены в избранные. Элемент массива — [`string`](../data-types.md), например `user` или `group` ||
|| **pathes_for_sites**
[```string|boolean```](../data-types.md) | Флаг, который включает общие шаблоны ссылок для всех сайтов. Пока настройку не сохраняли, приходит `true`; после сохранения — строкой. Пустая строка означает, что шаблоны задаются отдельно для каждого сайта ||
|| **pathes**
[`array`](../data-types.md) | Массив шаблонов ссылок. Метод не передает код сайта, поэтому шаблоны ссылок, заданные отдельно для сайтов, в ответ не попадают. Если массив не пустой, его элемент — объект, в котором ключ — имя пути, например `path_to_user`, а значение — шаблон ссылки ||
|| **forum_id**
[`string`](../data-types.md) | Идентификатор форума для комментариев ||
|| **rm_for_sites**
[```string|boolean```](../data-types.md) | Флаг общих для всех сайтов параметров переговорных. Пока настройку не сохраняли, приходит `true`; после сохранения — строкой: `'1'` — включено, пустая строка — выключено ||
|| **path_to_type_company_calendar**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календарей компании ||
|| **path_to_type_location**
[`string`](../data-types.md) | Шаблон ссылки на просмотр бронирования переговорных ||
|| **path_to_type_events**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря событий ||
|| **path_to_type_open_event**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря открытых событий ||
|| **path_to_type_resource**
[`string`](../data-types.md) | Шаблон ссылки на просмотр календаря ресурса ||
|#

Ключи `path_to_type_*` метод строит по типам календарей, которые заведены в Битрикс24: для каждого типа, кроме `user` и `group`, приходит ключ `path_to_type_<XML_ID>`. Например, для типа с кодом `open_event` приходит `path_to_type_open_event`. Набор ключей в разных Битрикс24 отличается.

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-user-settings-get.md)
- [{#T}](./calendar-user-settings-set.md)
