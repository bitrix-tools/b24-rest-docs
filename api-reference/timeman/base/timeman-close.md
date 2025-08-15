# Завершить текущий день timeman.close

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.close` завершает текущий рабочий день.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. 

По умолчанию — текущий пользователь ||
|| **TIME**
[`datetime`](../../data-types.md) | Время и дата окончания рабочего дня в формате стандарта [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) (ISO-8601), например, `2025-02-12T15:52:01+00:00`. Дата должна совпадать с датой начала рабочего дня.

По умолчанию рабочий день закрывается текущим моментом с часовым поясом, в котором рабочий день был начат.

Если часовой пояс окончания дня отличается от пояса начала дня, время окончания автоматически пересчитывается в часовой пояс, в котором день был начат. ||
|| **REPORT**
[`string`](../../data-types.md) | Причина изменения рабочего дня.

Обязателен при условиях:
- указан параметр `TIME`
- у сотрудника не свободный график ||
|| **LAT**
[`double`](../../data-types.md) | Географическая широта окончания рабочего дня ||
|| **LON**
[`double`](../../data-types.md) | Географическая долгота окончания рабочего дня ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"TIME":"2025-03-27T17:00:01+00:00","REPORT":"Забыла закрыть рабочий день","LAT":53.548841,"LON":9.987274}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.close
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"TIME":"2025-03-27T17:00:01+00:00","REPORT":"Забыла закрыть рабочий день","LAT":53.548841,"LON":9.987274,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.close
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.close',
    		{
    			'USER_ID' : 503,
    			'TIME': '2025-03-27T17:00:01+00:00',
    			'REPORT': 'Забыла закрыть рабочий день',
    			'LAT': 53.548841, 
    			'LON': 9.987274
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'timeman.close',
                [
                    'USER_ID' => 503,
                    'TIME'    => '2025-03-27T17:00:01+00:00',
                    'REPORT'  => 'Забыла закрыть рабочий день',
                    'LAT'     => 53.548841,
                    'LON'     => 9.987274,
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
        echo 'Error closing timeman: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.close',
        {
            'USER_ID' : 503,
            'TIME': '2025-03-27T17:00:01+00:00',
            'REPORT': 'Забыла закрыть рабочий день',
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
        'timeman.close',
        [
            'USER_ID' => 503,
            'TIME' => '2025-03-27T17:00:01+00:00',
            'REPORT' => 'Забыла закрыть рабочий день',
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
        "STATUS": "CLOSED",
        "TIME_START": "2025-03-27T08:00:01+02:00",
        "TIME_FINISH": "2025-03-27T19:00:01+02:00",
        "DURATION": "09:37:04",
        "TIME_LEAKS": "01:22:56",
        "ACTIVE": false,
        "IP_OPEN": "",
        "IP_CLOSE": "83.219.151.30",
        "LAT_OPEN": 53.548841000000003,
        "LON_OPEN": 9.9872739999999993,
        "LAT_CLOSE": 53.548841000000003,
        "LON_CLOSE": 9.9872739999999993,
        "TZ_OFFSET": 7200
    },
    "time": {
        "start": 1743057653.725821,
        "finish": 1743057654.0894129,
        "duration": 0.36359190940856934,
        "processing": 0.3278491497039795,
        "date_start": "2025-03-27T09:40:53+03:00",
        "date_finish": "2025-03-27T09:40:54+03:00",
        "operating_reset_at": 1743058253,
        "operating": 0.32782983779907227
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
[`string`](../../data-types.md) | Суммарная длительность перерыва за день в формате `HH:MM:SS`. ||
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
    "error_description":"Day close date should correspond to the day open date"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| пустая строка | User not found | Пользователь с указанным `USER_ID` не найден ||
|| `WRONG_DATETIME` | Day close date should correspond to the day open date | Дата закрытия рабочего дня должна совпадать с датой открытия ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-open.md)
- [{#T}](./timeman-pause.md)
- [{#T}](./timeman-status.md)
- [{#T}](./timeman-settings.md)