# Установить статус участия в событии для текущего пользователя calendar.meeting.status.set

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает статус участия в событии для текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **eventId***
[`integer`](../../data-types.md) | Идентификатор события.

Получить идентификатор можно методом [calendar.event.get](./calendar-event-get.md) или [calendar.event.get.nearest](./calendar-event-get-nearest.md) ||
|| **status***
[`string`](../../data-types.md) | Статус участия в событии. Возможные значения: 
- `Y` — согласен
- `N` — отказался
- `Q` — приглашен, но еще не ответил ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"eventId":651,"status":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.meeting.status.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"eventId":651,"status":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.meeting.status.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'calendar.meeting.status.set',
    		{
    			eventId: 651,
    			status: 'Y'
    		}
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
                'calendar.meeting.status.set',
                [
                    'eventId' => 651,
                    'status'  => 'Y',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting meeting status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.meeting.status.set',
        {
            eventId: 651,
            status: 'Y'
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.meeting.status.set',
        [
            'eventId' => 651,
            'status' => 'Y'
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
    "result": true,
    "time": {
        "start": 1728732695.718461,
        "finish": 1728732696.029712,
        "duration": 0.3112509250640869,
        "processing": 0.051657915115356445,
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
[`boolean`](../../data-types.md) | Успешность установки статуса.

Возвращает `true` если статус установлен успешно ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "status" для метода "calendar.meeting.status.set""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "status" для метода "calendar.meeting.status.set" | Не передан обязательный параметр `status` ||
|| Пустая строка | Не задан обязательный параметр "eventId" для метода "calendar.meeting.status.set" | Не передан обязательный параметр `eventId` ||
|| Пустая строка | Недопустимое значение параметра "status" | В параметре `status` передано значение отличное от `Q`, `Y` или `N` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-meeting-status-get.md)
- [{#T}](./calendar-accessibility-get.md)
