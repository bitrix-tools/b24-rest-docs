# Получить пользовательские настройки календаря calendar.user.settings.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.get` получает пользовательские настройки календаря.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.user.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.user.settings.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CalendarUserSettingsResult = {
      view: string
      meetSection: string | boolean
      crmSection: string | boolean
      showDeclined: boolean
      denyBusyInvitation: boolean
      collapseOffHours: string
      showWeekNumbers: string
      showTasks: string
      syncTasks: string
      showCompletedTasks: string
      lastUsedSection: string | boolean
      sendFromEmail: string
      defaultSections: Record<string, string>
      syncPeriodPast: string | number
      syncPeriodFuture: string | number
      defaultReminders: {
        fullDay:
          | { type: string; count?: number; before?: number; time?: number }
          | Array<{ type: string; count?: number; before?: number; time?: number }>
        withTime:
          | { type: string; count?: number; before?: number; time?: number }
          | Array<{ type: string; count?: number; before?: number; time?: number }>
      }
      tabId?: string
      view_crm?: string
      view_tasks?: string
      timezoneName: string
      timezoneOffsetUTC: number
      timezoneDefaultName: string
      work_time_start?: string
      work_time_end?: string
      CalendarSelCont: string | boolean
      SPCalendarSelCont: string | boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<CalendarUserSettingsResult>({
        method: 'calendar.user.settings.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.view, result.timezoneName, result.defaultReminders)
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
      async function getCalendarUserSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.user.settings.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.view, result.timezoneName, result.defaultReminders)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCalendarUserSettings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.user.settings.get().response
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
                'calendar.user.settings.get',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Дальше обработайте $result в своем коде

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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "calendar.user.settings.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("calendar.user.settings.get: %w", err)
    }

    // Структура сокращена: ниже только поля, которые нужны примеру.
    // Полный список полей — в разделе «Возвращаемые данные».
    var item struct {
    	View               string `json:"view"`
    	MeetSection        any    `json:"meetSection"`
    	CrmSection         any    `json:"crmSection"`
    	ShowDeclined       bool   `json:"showDeclined"`
    	DenyBusyInvitation bool   `json:"denyBusyInvitation"`
    	CollapseOffHours   string `json:"collapseOffHours"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.View, item.MeetSection)
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
        "CalendarSelCont": "false",
        "SPCalendarSelCont": "false",
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
                    "count": "15"
                }
            ],
            "withTime": [
                {
                    "type": "min",
                    "count": 50
                }
            ]
        },
        "tabId": "month",
        "view_crm": "month",
        "view_tasks": "month",
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
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#settings) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект настроек {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **view**
[`string`](../data-types.md) | Стандартное представление для календаря. Возможные значения:
- `day` — день
- `week` — неделя
- `month` — месяц
- `list` — список ||
|| **meetSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря для приглашений. Пока настройку не сохраняли, приходит `false` ||
|| **crmSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря для CRM. Пока настройку не сохраняли, приходит `false` ||
|| **showDeclined**
[`boolean`](../data-types.md) | Показывать события, в которых пользователь отказался принять участие ||
|| **denyBusyInvitation**
[`boolean`](../data-types.md) | Запрещать приглашать в событие, если время занято ||
|| **collapseOffHours**
[`string`](../data-types.md) | Скрывать нерабочее время в календаре в недельном и дневном представлении. Возможные значения:
- `Y` — скрывать
- `N` — не скрывать ||
|| **showWeekNumbers**
[`string`](../data-types.md) | Показывать номера недель. Возможные значения:
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
- `N` — не отображать ||
|| **lastUsedSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря.

Пока настройку не сохраняли, приходит `false` — календарь не выбран ||
|| **sendFromEmail**
[`string`](../data-types.md) | E-mail для отправки почтовых приглашений ||
|| **defaultSections**
[`object`](../data-types.md) | Настройки предустановленных календарей.

Ключом объекта настроек может быть:
- `user[id]` — тип Календарь пользователя с идентификатором пользователя. Например, `user12` соответствует календарю пользователя с идентификатором `12`
- `group[id]` — тип Календарь группы с идентификатором группы. Например, `group36` соответствует календарю группы с идентификатором `36`

Значение — идентификатор календаря ||
|| **syncPeriodPast**
[```string|integer```](../data-types.md) | Количество месяцев для синхронизации в прошлом периоде. Пока настройку не сохраняли, приходит числом `3` ||
|| **syncPeriodFuture**
[```string|integer```](../data-types.md) | Количество месяцев для синхронизации в будущем периоде. Пока настройку не сохраняли, приходит числом `12` ||
|| **defaultReminders**
[`object`](../data-types.md) | Объект со стандартными настройками напоминаний о событии [(подробное описание)](#defaultReminders) ||
|| **tabId**
[`string`](../data-types.md) | Последняя открытая вкладка календаря. Поле приходит, только если его сохранил интерфейс календаря. Метод [calendar.user.settings.set](./calendar-user-settings-set.md) это поле не принимает ||
|| **view_crm**
[`string`](../data-types.md) | Представление по умолчанию для календаря CRM. Возможные значения:
- `day` — день
- `week` — неделя
- `month` — месяц
- `list` — список

Поле приходит, только если его сохранил интерфейс календаря. Метод [calendar.user.settings.set](./calendar-user-settings-set.md) это поле не принимает ||
|| **view_tasks**
[`string`](../data-types.md) | Представление по умолчанию для календаря задач. Возможные значения:
- `day` — день
- `week` — неделя
- `month` — месяц
- `list` — список

Поле приходит, только если его сохранил интерфейс календаря. Метод [calendar.user.settings.set](./calendar-user-settings-set.md) это поле не принимает ||
|| **timezoneName**
[`string`](../data-types.md) | Часовой пояс календаря ||
|| **timezoneOffsetUTC**
[`integer`](../data-types.md) | Смещение часового пояса относительно UTC в секундах ||
|| **timezoneDefaultName**
[`string`](../data-types.md) | Часовой пояс, который Битрикс24 предлагает пользователю, если `timezoneName` не установлен. Значение подобрано по смещению `timezoneOffsetUTC` ||
|| **work_time_start**
[`string`](../data-types.md) | Время начала рабочего дня. Поле приходит, только если у пользователя заполнены рабочие часы в календаре ||
|| **work_time_end**
[`string`](../data-types.md) | Время окончания рабочего дня. Поле приходит, только если у пользователя заполнены рабочие часы в календаре ||
|| **CalendarSelCont**
[```string|boolean```](../data-types.md) | Служебное поле интерфейса календаря. Пока настройку не сохраняли, приходит `false`, после сохранения — строкой `"true"` или `"false"` ||
|| **SPCalendarSelCont**
[```string|boolean```](../data-types.md) | Служебное поле интерфейса календаря. Пока настройку не сохраняли, приходит `false`, после сохранения — строкой `"true"` или `"false"` ||
|#

#### Объект defaultReminders {#defaultReminders}

#|
|| **Название**
`тип` | **Описание** ||
|| **fullDay**
[```object|array```](../data-types.md) | Настройки напоминаний для целодневных событий: один объект или массив объектов [(подробное описание)](#reminder-settings). Пока настройку не сохраняли, приходит объектом: `{"type": "daybefore", "before": 0, "time": 480}` ||
|| **withTime**
[```object|array```](../data-types.md) | Настройки напоминаний для событий с указанием времени: один объект или массив объектов [(подробное описание)](#reminder-settings). Пока настройку не сохраняли, приходит объектом: `{"type": "min", "count": 15}` ||
|#

Если настройки напоминаний передавали в [calendar.user.settings.set](./calendar-user-settings-set.md), метод вернет их в том же виде: объектом или массивом объектов.

#### Объект настроек напоминания {#reminder-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Временной тип напоминания. Возможные значения:
- `min` — минуты
- `hour` — часы
- `day` — дни
- `daybefore` — напоминание в заданное время дня события ||
|| **count**
[```integer|string```](../data-types.md) | Числовое значение временного промежутка. Используется с типами `min`, `hour` и `day`. Может прийти числом или строкой ||
|| **before**
[`integer`](../data-types.md) | Сдвиг напоминания в днях до дня события. Используется с типом `daybefore`. При `0` напоминание приходит в день события ||
|| **time**
[`integer`](../data-types.md) | Время напоминания в минутах от начала дня. Используется с типом `daybefore`. При `before: 0` и `time: 480` напоминание приходит в день события в 08:00 ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-settings-get.md)
- [{#T}](./calendar-user-settings-set.md)
