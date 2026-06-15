# Начать новый рабочий день timeman.open

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.open` начинает новый рабочий день, или продолжает рабочий день после паузы или завершения.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. 

По умолчанию — текущий пользователь ||
|| **TIME**
[`datetime`](../../data-types.md) | Время и дата начала рабочего дня в формате стандарта [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) (ISO-8601), например, `2025-02-12T15:52:01+00:00`. Дата должна совпадать с текущей календарной датой. 

Параметр `TIME` можно передать, если рабочий день находится в статусе `CLOSED`. В остальных случаях вернется ошибка.

По умолчанию рабочий день открывается с текущим временем в часовом поясе сотрудника.

Система учитывает временную зону, указанную в параметре, и считает ее временной зоной пользователя ||
|| **REPORT**
[`string`](../../data-types.md) | Причина изменения рабочего дня.

Обязателен при условиях:
- указан параметр `TIME`
- у сотрудника не свободный график ||
|| **LAT**
[`double`](../../data-types.md) | Географическая широта начала рабочего дня ||
|| **LON**
[`double`](../../data-types.md) | Географическая долгота начала рабочего дня ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"TIME":"2025-03-27T08:00:01+00:00","REPORT":"Забыла открыть рабочий день","LAT":53.548841,"LON":9.987274}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.open
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"TIME":"2025-03-27T08:00:01+00:00","REPORT":"Забыла открыть рабочий день","LAT":53.548841,"LON":9.987274,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.open
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TimemanOpenResult = {
      STATUS: string
      TIME_START: ISODate
      TIME_FINISH: ISODate | null
      DURATION: string
      TIME_LEAKS: string
      ACTIVE: boolean
      IP_OPEN: string
      IP_CLOSE: string
      LAT_OPEN: number
      LON_OPEN: number
      LAT_CLOSE: number
      LON_CLOSE: number
      TZ_OFFSET: number
      TIME_FINISH_DEFAULT?: ISODate
    }

    try {
      const response = await $b24.actions.v2.call.make<TimemanOpenResult>({
        method: 'timeman.open',
        params: {
          USER_ID: 503,
          TIME: '2025-03-27T08:00:01+00:00',
          REPORT: 'Forgot to open the working day',
          LAT: 53.548841,
          LON: 9.987274,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Status:', result.STATUS, '| Start:', result.TIME_START)
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
      async function openWorkday() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.open',
            params: {
              USER_ID: 503,
              TIME: '2025-03-27T08:00:01+00:00',
              REPORT: 'Forgot to open the working day',
              LAT: 53.548841,
              LON: 9.987274,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Status:', result.STATUS, '| Start:', result.TIME_START)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', openWorkday)
    </script>
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.open',
        {
            'USER_ID' : 503,
            'TIME': '2025-03-27T08:00:01+00:00',
            'REPORT': 'Забыла открыть рабочий день',
            'LAT': 53.548841, 
            'LON': 9.987274
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
        'timeman.open',
        [
            'USER_ID' => 503,
            'TIME' => '2025-03-27T08:00:01+00:00',
            'REPORT' => 'Забыла открыть рабочий день',
            'LAT' => 53.548841,
            'LON' => 9.987274
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
        "STATUS": "OPENED",
        "TIME_START": "2025-03-27T08:00:01+02:00",
        "TIME_FINISH": null,
        "DURATION": "00:00:00",
        "TIME_LEAKS": "00:00:00",
        "ACTIVE": false,
        "IP_OPEN": "",
        "IP_CLOSE": "",
        "LAT_OPEN": 53.548841000000003,
        "LON_OPEN": 9.9872739999999993,
        "LAT_CLOSE": 0,
        "LON_CLOSE": 0,
        "TZ_OFFSET": 7200
    },
    "time": {
        "start": 1743056587.6559751,
        "finish": 1743056587.8529301,
        "duration": 0.19695496559143066,
        "processing": 0.16714906692504883,
        "date_start": "2025-03-27T09:23:07+03:00",
        "date_finish": "2025-03-27T09:23:07+03:00",
        "operating_reset_at": 1743057187,
        "operating": 0.1671299934387207
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект c описанием рабочего дня ||
|| **STATUS**
 [`string`](../../data-types.md) | Статус текущего рабочего дня.
 
 Варианты значений:
- `OPENED` — открыт
- `CLOSED` — закрыт
- `PAUSED` — приостановлен
- `EXPIRED` — истек, то есть открыт до начала текущих календарных суток и не закрыт ||
|| **TIME_START**
[`datetime`](../../data-types.md) | Дата и время начала рабочего дня.

Часовой пояс соответствует часовому поясу начала рабочего дня ||
|| **TIME_FINISH**
[`datetime`](../../data-types.md) | Дата и время заверения рабочего дня.

Для незавершенного рабочего дня возвращается `null` ||
|| **DURATION**
[`string`](../../data-types.md) | Длительность рабочего дня в формате `HH:MM:SS`.

Для незавершенного рабочего дня возвращается `00:00:00` ||
|| **TIME_LEAKS**
[`string`](../../data-types.md) | Суммарная длительность перерыва за день в формате `HH:MM:SS` ||
|| **ACTIVE**
[`boolean`](../../data-types.md) | Подтвержденность рабочего дня.

Значение `false` означает, что изменение рабочего дня ожидает подтверждения руководителем ||
|| **IP_OPEN**
[`string`](../../data-types.md) | IP-адрес, с которого начат рабочий день ||
|| **IP_CLOSE**
[`string`](../../data-types.md) | IP-адрес, с которого завершен рабочий день.

Для незавершенного рабочего дня возвращается `null` ||
|| **LAT_OPEN**
[`double`](../../data-types.md) | Географическая широта точки начала рабочего дня ||
|| **LON_OPEN**
[`double`](../../data-types.md) | Географическая долгота точки начала рабочего дня ||
|| **LAT_CLOSE**
[`double`](../../data-types.md) | Географическая широта точки завершения рабочего дня ||
|| **LON_CLOSE**
[`double`](../../data-types.md) | Географическая долгота точки завершения рабочего дня ||
|| **TZ_OFFSET**
[`integer`](../../data-types.md) | Смещение часового пояса сотрудника в котором начат рабочий день.

Время завершения рабочего дня приводится к часовому поясу начала дня ||
|| **TIME_FINISH_DEFAULT**
[`datetime`](../../data-types.md) | Рекомендуемое значение завершения дня, которое можно выводить пользователю в качестве значения по умолчанию.

Выводится только для рабочих дней в статусе истек `EXPIRED` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"WRONG_DATETIME",
    "error_description":"Day open date should correspond to the current date"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| пустая строка | User not found | Пользователь с указанным `USER_ID` не найден ||
|| `WRONG_DATETIME` | Day open date should correspond to the current date | Дата открытия рабочего дня должна совпадать с текущей календарной датой ||
|| `TIME` | Unable to set time, work day is paused | Нельзя передавать параметр `TIME` для приостановленного рабочего дня ||

|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-pause.md)
- [{#T}](./timeman-close.md)
- [{#T}](./timeman-status.md)
- [{#T}](./timeman-settings.md)




