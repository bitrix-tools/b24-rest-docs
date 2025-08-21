# Приостановить текущий рабочий день timeman.pause

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.pause` приостанавливает текущий рабочий день.

Если рабочий день завершен, метод возобновит его и добавит в длительность время, которое прошло после завершения.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя.

По умолчанию — идентификатор текущего пользователя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.pause
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.pause
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.pause',
    		{
    			'USER_ID' : 503
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
                'timeman.pause',
                [
                    'USER_ID' => 503
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        echo 'Info: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling timeman.pause: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.pause',
        {
            'USER_ID' : 503
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
        'timeman.pause',
        [
            'USER_ID' => 503
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
        "STATUS": "PAUSED",
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
        "start": 1743057425.9403241,
        "finish": 1743057426.0597129,
        "duration": 0.11938881874084473,
        "processing": 0.08620214462280273,
        "date_start": "2025-03-27T09:37:05+03:00",
        "date_finish": "2025-03-27T09:37:06+03:00",
        "operating_reset_at": 1743058025,
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
    "error":"",
    "error_description":"User not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| пустая строка | User not found | Пользователь с указанным `USER_ID` не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-open.md)
- [{#T}](./timeman-close.md)
- [{#T}](./timeman-status.md)
- [{#T}](./timeman-settings.md)