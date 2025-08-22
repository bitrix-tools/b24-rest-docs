# Записать информацию в журнал бизнес-процесса bizproc.activity.log

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- надо пояснить, что за уникальный идентификатор и зачем он нужен
- пример непонятный. Нужно сделать описание и пояснить, как работает или добавить ссылку на туториал, где этот метод используется в реальной задаче

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод записывает информацию в журнал бизнес-процесса. Запись событий в журнал должна быть включена в шаблоне бизнес-процесса.

{% note tip "Пользовательская документация" %}

- [Журнал отладки бизнес-процессов: как включить хранение логов](https://helpdesk.bitrix24.ru/open/21994508/)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**||
|| **EVENT_TOKEN***
[`string`](../../data-types.md) | Уникальный ключ, необходимый для отправки события бизнес-процессу.

Токен поступает на обработчик действия приложения, когда бизнес-процесс доходит до выполнения этого действия.

Запись в журнал возможна, если действие приложения подписано `'USE_SUBSCRIPTION': 'Y'` на ход выполнения бизнес-процесса. ||
|| **LOG_MESSAGE***
[`string`](../../data-types.md) | Сообщение для записи в лог ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event_token":"55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90","log_message":"Please wait for answer!"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.activity.log
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event_token":"55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90","log_message":"Please wait for answer!","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.activity.log
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.activity.log',
    		{
    			event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
    			log_message: 'Please wait for answer!'
    		}
    	);
    	
    	const result = response.getData().result;
    	alert("Success: " + result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP

    ```php
    try {
        $eventToken = 'your_event_token'; // Replace with actual event token
        $message = 'Your log message'; // Replace with actual message

        $result = $serviceBuilder
            ->getBizProcScope()
            ->activity()
            ->log($eventToken, $message);

        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print('Log entry failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.activity.log',
        {
            event_token: '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            log_message: 'Please wait for answer!'
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
        'bizproc.activity.log',
        [
            'event_token' => '55c1dc1c3f0d75.78875596|A51601_82584_96831_81132|hsyUws1j4XiwqPqN45eH66CcQtEvpUIP.47dd5d888e8e549d2c984713e12a4268e6e87d0208ca1f093ba1075e77f92e90',
            'log_message' => 'Please wait for answer!'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_EMPTY_LOG_MESSAGE",
    "error_description": "Empty log message!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ERROR_EMPTY_LOG_MESSAGE` | Empty log message! | не указан текст записи в журнал ||
|#

Также метод может вернуть ошибки от бизнес-процесса.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-activity-add.md)
- [{#T}](./bizproc-activity-update.md)
- [{#T}](./bizproc-activity-list.md)
- [{#T}](./bizproc-activity-delete.md)