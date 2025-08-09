# Получить статус участия текущего пользователя в событии calendar.meeting.status.get

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает статус участия текущего пользователя в событии.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **eventId***
[`integer`](../../data-types.md) | Идентификатор события.

Получить идентификатор можно методом [calendar.event.get](./calendar-event-get.md) или [calendar.event.get.nearest](./calendar-event-get-nearest.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"eventId":651}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.meeting.status.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"eventId":651,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.meeting.status.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.meeting.status.get',
    		{
    			eventId: 651
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'calendar.meeting.status.get',
                [
                    'eventId' => 651
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
        echo 'Error getting meeting status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.meeting.status.get',
        {
            eventId: 651
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.meeting.status.get',
        [
            'eventId' => 651
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
    "result": "Y",
    "time": {
        "start": 1728732695.718461,
        "finish": 1728732696.029712,
        "duration": 0.256943941116333,
        "processing": 0.03064703941345215,
        "date_start": "2024-12-10T11:31:35+00:00",
        "date_finish": "2024-12-10T11:31:36+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../data-types.md) | Статус участия текущего пользователя. Возможные значения:
- `Y` — согласен
- `N` — отказался
- `Q` — приглашен, но еще не ответил
 ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "При выборке статуса произошла ошибка"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "eventId" для метода "calendar.meeting.status.set" | Не передан обязательный параметр `eventId` ||
|| Пустая строка | При выборке статуса произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-meeting-status-set.md)
- [{#T}](./calendar-accessibility-get.md)