# Вернуть параметры действию или роботу bizproc.event.send

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает роботу или действию выходные параметры, которые были заданы при регистрации или обновлении робота либо действия.

## Параметры метода

#|
|| **Название**
`тип` | **Описание**||
|| **EVENT_TOKEN**
[`string`](../../data-types.md) | Специальный токен, который приходит на обработчик приложения, когда выполняется действие или робот. Значение этого токена обработчик получает в массиве входных данных.

Отправить событие можно, если робот или действие зарегистрированы с `'USE_SUBSCRIPTION': 'Y'` ||
|| **RETURN_VALUES**
[`object`](../../data-types.md) | Массив возвращаемых значений действия или робота. Указываются значения свойств, которые были зарегистрированы как дополнительные результаты `RETURN_PROPERTIES` методами:
- [bizproc.robot.add](./bizproc-robot-add.md), [bizproc.robot.update](./bizproc-robot-update.md)
- [bizproc.activity.add](../bizproc-activity/bizproc-activity-add.md), [bizproc.activity.update](../bizproc-activity/bizproc-activity-update.md) ||
|| **LOG_MESSAGE**
[`string`](../../data-types.md) | Текст для журнала бизнес-процесса.

По умолчанию имеет значение «Получен ответ от приложения».

Запись событий в журнал должна быть включена в шаблоне бизнес-процесса
||
|#

{% note info "" %}

`EVENT_TOKEN` должен быть валидным и актуальным. Если токен невалидный или устаревший, метод вернет ошибку доступа `ACCESS_DENIED`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event_token":"55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90","return_values":{"outputString":"846c55d14f552180874a628d2615e285"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.event.send
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.event.send',
    		{
    			event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
    			return_values: {
    				outputString: '846c55d14f552180874a628d2615e285'
    			}
    		}
    	);
    	
    	if(response.error())
    		alert("Error: " + response.error());
    	else
    		alert("Success: " + response.getData().result);
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
                'bizproc.event.send',
                [
                    'event_token' => '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
                    'return_values' => [
                        'outputString' => '846c55d14f552180874a628d2615e285'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending bizproc event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.event.send',
        {
            event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            return_values: {
                outputString: '846c55d14f552180874a628d2615e285'
            }
        },
        function(result) {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.event.send',
        [
            'event_token' => '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            'return_values' => [
                'outputString' => '846c55d14f552180874a628d2615e285'
            ]
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
        "start": 1738152544.203554,
        "finish": 1738152544.248411,
        "duration": 0.044857025146484375,
        "processing": 0.0039920806884765625,
        "date_start": "2025-01-29T15:09:04+03:00",
        "date_finish": "2025-01-29T15:09:04+03:00",
        "operating_reset_at": 1738153144,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если значения успешно переданы в процесс ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение** | **Описание** ||
|| `ACCESS_DENIED` | Access denied! | Невалидный или устаревший `EVENT_TOKEN` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
