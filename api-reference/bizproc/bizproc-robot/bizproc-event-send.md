# Вернуть параметры действию или роботу bizproc.event.send

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает действию выходные параметры, заданные в описании действия.

## Параметры метода

#|
|| **Название**
`тип` | **Описание**||
|| **EVENT_TOKEN** | Специальный токен, который приходит на хендлер приложения, когда выполняется действие или робот. Значение этого токена получает обработчик робота или действия бизнес-процесса в массиве передаваемых входных данных.

Отправить событие можно, если действие приложения подписано `'USE_SUBSCRIPTION': 'Y'` на ход выполнения бизнес-процесса или роботов ||
|| **RETURN_VALUES** | Массив возвращаемых значений действия или робота. Указываются значения свойств, которые были зарегистрированы как дополнительные результаты `RETURN_PROPERTIES` методами:
- [bizproc.robot.add](./bizproc-robot-add.md), [bizproc.robot.update](./bizproc-robot-update.md)
- [bizproc.activity.add](../bizproc-activity/bizproc-activity-add.md), [bizproc.activity.update](../bizproc-activity/bizproc-activity-update.md) ||
|| **LOG_MESSAGE** | Текст для журнала бизнес-процесса.

По умолчанию имеет значение «Получен ответ от приложения».

Запись событий в журнал должна быть [включена в шаблоне](https://helpdesk.bitrix24.ru/open/21994508/) бизнес-процесса
||
|#

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
    	
    	const result = response.getData().result;
    	if(result.error())
    		alert("Error: " + result.error());
    	else
    		alert("Success: " + result);
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

## Обработка ошибок

### Возможные коды ошибок

Метод может возвращать код и текст ошибки из бизнес-процесса или робота.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
