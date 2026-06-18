# Получить отчет о выявленных отсутствиях timeman.timecontrol.reports.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом просмотра отчетов

Метод `timeman.timecontrol.reports.get` получает отчет о выявленных отсутствиях.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя, для которого запрашиваются отчеты.

Получить идентификатор пользователя можно методом [user.get](../../user/user-get.md) ||
|| **MONTH***
[`integer`](../../data-types.md) | Номер месяца ||
|| **YEAR***
[`integer`](../../data-types.md) | Год ||
|| **IDLE_MINUTES**
[`integer`](../../data-types.md) | Максимальное время отсутствия на рабочем месте, которое не учитывается как отсутствие.

Параметр доступен руководителю и администратору.

Если не указывать, используется время из настроек модуля ||
|| **WORKDAY_HOURS**
[`integer`](../../data-types.md) | Продолжительность рабочего дня в часах.

По умолчанию — 8 часов ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":3,"MONTH":5,"YEAR":2025,"IDLE_MINUTES":15,"WORKDAY_HOURS":8}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.reports.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":3,"MONTH":5,"YEAR":2025,"IDLE_MINUTES":15,"WORKDAY_HOURS":8,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.reports.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TimecontrolReportResult = {
      report: {
        month_title: string
        date_start: ISODate
        date_finish: ISODate
        days: {
          index: string
          day_title: string
          workday_date_start: ISODate
          workday_date_finish: ISODate
          workday_complete: boolean
          workday_time_leaks_user: number
          workday_time_leaks_final: number
          workday_duration: number
          workday_duration_final: number
          workday_duration_config: number
          reports: {
            id: string
            user_id: string
            type: string
            date_start: ISODate
            date_finish: ISODate
            duration: number
            active: boolean
            entry_id: string
            report_type: string
            report_text: string
            system_text: string | null
            source_start: string
            source_finish: string
            ip_start: string
            ip_finish: string
            ip_start_network: boolean | object
            ip_finish_network: boolean | object
          }[]
          workday_time_leaks_real: number
        }[]
      }
      user: {
        id: number
        active: boolean
        name: string
        first_name: string
        last_name: string
        work_position: string
        avatar: string
        personal_gender: string
        last_activity_date: ISODate
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<TimecontrolReportResult>({
        method: 'timeman.timecontrol.reports.get',
        params: {
          USER_ID: 3,
          MONTH: 5,
          YEAR: 2025,
          IDLE_MINUTES: 15,
          WORKDAY_HOURS: 8,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.report.month_title, result.report.days.length, result.user.name)
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
      async function getTimecontrolReport() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.timecontrol.reports.get',
            params: {
              USER_ID: 3,
              MONTH: 5,
              YEAR: 2025,
              IDLE_MINUTES: 15,
              WORKDAY_HOURS: 8,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.report.month_title, result.report.days.length, result.user.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTimecontrolReport)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.timecontrol.reports.get',
                [
                    'USER_ID'       => 3,
                    'MONTH'         => 5,
                    'YEAR'          => 2025,
                    'IDLE_MINUTES'  => 15,
                    'WORKDAY_HOURS' => 8
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        echo 'Info: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting time control reports: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.reports.get',
        {
            'USER_ID': 3,
            'MONTH': 5,
            'YEAR': 2025,
            'IDLE_MINUTES': 15,
            'WORKDAY_HOURS': 8
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'timeman.timecontrol.reports.get',
        [
            'USER_ID' => 3,
            'MONTH' => 5,
            'YEAR' => 2025,
            'IDLE_MINUTES' => 15,
            'WORKDAY_HOURS' => 8
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
        "report": {
            "month_title": "Май",
            "date_start": "2025-05-01T00:00:00+03:00",
            "date_finish": "2025-05-31T23:59:59+03:00",
            "days": [
                {
                    "index": "20250526",
                    "day_title": "26.05.2025",
                    "workday_date_start": "2025-05-26T14:44:47+03:00",
                    "workday_date_finish": "2025-05-26T14:45:29+03:00",
                    "workday_complete": true,
                    "workday_time_leaks_user": 0,
                    "workday_time_leaks_final": 28758,
                    "workday_duration": 42,
                    "workday_duration_final": 42,
                    "workday_duration_config": 28800,
                    "reports": [
                        {
                            "id": "27",
                            "user_id": "503",
                            "type": "TM_START",
                            "date_start": "2025-05-26T14:44:47+03:00",
                            "date_finish": "2025-05-26T14:44:47+03:00",
                            "duration": 0,
                            "active": false,
                            "entry_id": "2237",
                            "report_type": "WORK",
                            "report_text": "Работал над проектом",
                            "system_text": null,
                            "source_start": "TM_EVENT",
                            "source_finish": "TM_EVENT",
                            "ip_start": "83.219.151.30",
                            "ip_finish": "83.219.151.30",
                            "ip_start_network": false,
                            "ip_finish_network": false
                        },
                        {
                            "id": "29",
                            ...
                        }
                    ],
                    "workday_time_leaks_real": 0
                }
            ]
        },
        "user": {
            "id": 3,
            "active": true,
            "name": "Мария Ившина",
            "first_name": "Мария",
            "last_name": "Ившина",
            "work_position": "IT-специалист",
            "avatar": "http://test.bitrix24.com/upload/resize_cache/45749/7acf4ca766af5d8/main/c89/c89c6b73470635c/4R5A1256.png",
            "personal_gender": "F",
            "last_activity_date": "2025-05-29T17:15:56+03:00"
        },
        "time": {
            "start": 1748528193.688745,
            "finish": 1748528193.730104,
            "duration": 0.04135894775390625,
            "processing": 0.014277935028076172,
            "date_start": "2025-05-29T17:16:33+03:00",
            "date_finish": "2025-05-29T17:16:33+03:00",
            "operating_reset_at": 1748528793,
            "operating": 0
        }
    }
}
```

### Если в ответе пустой days

Если метод возвращает пустой массив `days`, настройте инструмент контроля времени.
1. Выполните под администратором метод [timeman.timecontrol.settings.set](./timeman-timecontrol-settings-set.md) с параметрами:

    ```js
    BX24.callMethod(
        'timeman.timecontrol.settings.set',
        {
            active: true,
            REPORT_SIMPLE_TYPE: 'all',
            REPORT_FULL_TYPE: 'all',
            report_request_type: 'user',
            report_request_users: 3,
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

2. Откройте или закройте рабочий день пользователя.
3. Выполните метод `timeman.timecontrol.reports.get`. В ответе появятся данные в `days`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **report**
[`object`](../../data-types.md) | Информация об отчете ||
|| **month_title**
[`string`](../../data-types.md) | Название месяца ||
|| **date_start**
[`datetime`](../../data-types.md) | Дата начала периода выборки в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|| **date_finish**
[`datetime`](../../data-types.md) | Дата окончания периода выборки в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|| **days**
[`array`](../../data-types.md) | Список объектов с описанием [отработанных дней](#days) ||
|| **user**
[`object`](../../data-types.md) | Объект с информацией о [пользователе](#user) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#  

### Объекты days {#days}

#|
|| **Название**
`тип` | **Описание** ||
|| **index**
[`integer`](../../data-types.md) | Индекс дня недели формате `ГГГГММДД`, например, `20250526` для 26 мая 2025 года ||
|| **day_title**
[`string`](../../data-types.md) | Дата в формате сайта ||
|| **workday_date_start**
[`datetime`](../../data-types.md) | Дата начала рабочего дня в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|| **workday_date_finish**
[`datetime`](../../data-types.md) | Дата окончания рабочего дня в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom).

Если `workday_complete = false`, указывается дата на момент формирования отчета ||
|| **workday_complete**
[`boolean`](../../data-types.md) | Рабочий день завершен ||
|| **workday_time_leaks_user**
[`integer`](../../data-types.md) | Продолжительность перерыва в секундах ||
|| **workday_time_leaks_final**
[`integer`](../../data-types.md) | Продолжительность времени в секундах, которое пользователь недоработал или переработал. 
- Положительное число — количество не доработанного времени в секундах
- Отрицательное число — количество времени, отработанного сверх положенного времени, то есть переработка ||
|| **workday_duration**
[`integer`](../../data-types.md) | Продолжительность рабочего дня по табелю в секундах, с учетом перерыва ||
|| **workday_duration_final**
[`integer`](../../data-types.md) | Продолжительность рабочего дня по фактической выработке в секундах. Учитываются:
- перерыв
- не подтвержденные отсутствия
- отсутствия по личным делам ||
|| **workday_duration_config**
[`integer`](../../data-types.md) | Необходимая продолжительность рабочего дня в секундах ||
|| **reports**
[`array`](../../data-types.md) | Список объектов с записями [выявленных отсутствий](#reports). 

Значения выводятся в полной детализации отчета и для руководителя  ||
|| **workday_time_leaks_real**
[`integer`](../../data-types.md) | Продолжительность перерыва установленного автоматической системой фиксации. Содержит не подтвержденные отсутствия и отсутствия по личным делам ||
|#  

#### Объекты reports {#reports}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор записи ||
|| **user_id**
[`string`](../../data-types.md) | Идентификатор пользователя ||
|| **type**
[`string`](../../data-types.md) | Тип записи. Возможные значения:

- `IDLE` — отошел, фиксируется с помощью десктоп приложения
- `OFFLINE` — офлайн
- `DESKTOP_ONLINE` — запустил приложение. Только для руководителя
- `DESKTOP_OFFLINE` — выключил приложение. Только для руководителя
- `DESKTOP_START` — запустил приложение. Только для руководителя
- `TM_START` — начал рабочий день
- `TM_PAUSE` — ушел на перерыв
- `TM_CONTINUE` — продолжил день
- `TM_END` — завершил рабочий день ||
|| **date_start**
[`datetime`](../../data-types.md) | Дата начала фиксации в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|| **date_finish**
[`datetime`](../../data-types.md) | Дата окончания фиксации в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom).

Если `active = true`, поле содержит дату на момент формирования отчета ||
|| **duration**
[`integer`](../../data-types.md) | Длительность ||
|| **active**
[`boolean`](../../data-types.md) | Активность записи ||
|| **entry_id**
[`string`](../../data-types.md) | Идентификатор записи времени ||
|| **report_type**
[`string`](../../data-types.md) | Тип отсутствия. Возможные значения:
- `work` — по рабочим вопросам
- `private` — по личным делам
- `none` — тип не задан, приравнивается к `private` ||
|| **report_text**
[`string`](../../data-types.md) | Описание причины отсутствия ||
|| **system_text**
[`string`](../../data-types.md) | Системное описание причины отсутствия. Только для руководителя ||
|| **source_start**
[`string`](../../data-types.md) | Поставщик данных начала записи. Возможные значения:

- `ONLINE_EVENT` — событие авторизации пользователя
- `OFFLINE_AGENT` — агент, который устанавливает статус Офлайн
- `DESKTOP_OFFLINE_AGENT` — агент, который устанавливает признак выключенного приложения
- `DESKTOP_ONLINE_EVENT` — событие, которое устанавливает признак включенного приложения
- `DESKTOP_START_EVENT` — событие, которое устанавливает признак включенного приложения
- `IDLE_EVENT` — событие изменения статуса Отошел. Фиксируется приложением
- `TM_EVENT` — событие изменения рабочего дня: начало, перерыв, окончание ||
|| **source_finish**
[`string`](../../data-types.md) | Поставщик данных окончания записи. Возможные значения:

- `ONLINE_EVENT` — событие авторизации пользователя
- `OFFLINE_AGENT` — агент, который устанавливает статус Офлайн
- `DESKTOP_OFFLINE_AGENT` — агент, который устанавливает признак выключенного приложения
- `DESKTOP_ONLINE_EVENT` — событие, которое устанавливает признак включенного приложения
- `DESKTOP_START_EVENT` — событие, которое устанавливает признак включенного приложения
- `IDLE_EVENT` — событие изменения статуса Отошел. Фиксируется приложением
- `TM_EVENT` — событие изменения рабочего дня: начало, перерыв, окончание ||
|| **ip_start**
[`string`](../../data-types.md) | IP-адрес на момент начала записи. Только для руководителя ||
|| **ip_finish**
[`string`](../../data-types.md) | IP-адрес на момент окончания записи. Только для руководителя ||
|| **ip_start_network**
[`boolean`](../../data-types.md) \| [`object`](../../data-types.md) | Объект с [расшифровкой IP-адреса](#ip_network) для начала записи, если IP-адрес не входит в офисную сеть. Для офисной сети вернет `false`.

Только для руководителя ||
|| **ip_finish_network**
[`boolean`](../../data-types.md) \| [`object`](../../data-types.md) | Объект с [расшифровкой IP-адреса](#ip_network) для окончания записи, если IP-адрес не входит в офисную сеть. Для офисной сети вернет `false`.

Только для руководителя ||
|#  

#### Объект ip_network {#ip_network}

#|
|| **Название**
`тип` | **Описание** ||
|| **ip**
[`string`](../../data-types.md) | IP-адрес ||
|| **range**
[`string`](../../data-types.md) | Диапазон, в который входит указанный IP-адрес ||
|| **name**
[`string`](../../data-types.md) | Название диапазона, в который входит указанный IP-адрес ||
|#   

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Активность ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара пользователя.

Если значение пустое, у пользователя нет аватара ||
|| **personal_gender**
[`string`](../../data-types.md) | Пол пользователя ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последнего действия пользователя в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|#  
 
## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "USER_ACCESS_ERROR",
    "error_description": "You don't have access to report for this user"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to this method | У вас нет доступа к этому методу ||
|| `USER_ACCESS_ERROR` | You don't have access to report for this user | У вас нет доступа к отчетам этого пользователя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md) 