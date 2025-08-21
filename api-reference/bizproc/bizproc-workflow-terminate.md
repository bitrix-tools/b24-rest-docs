# Остановить активный бизнес-процесс bizproc.workflow.terminate

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод останавливает указанный бизнес-процесс. Все данные бизнес-процесса при этом сохранятся.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`string`](../data-types.md) | Идентификатор бизнес-процесса, который нужно остановить.

Идентификатор можно получить методом [bizproc.workflow.instances](./bizproc-workflow-instances.md) ||
|| **STATUS**
[`string`](../data-types.md) | Установить текст статуса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":"65e5a449e8f135.21284909","STATUS":"Terminated by rest app."}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.terminate
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":"65e5a449e8f135.21284909","STATUS":"Terminated by rest app.","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.terminate
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.terminate',
    		{
    			ID: '65e5a449e8f135.21284909',
    			STATUS: 'Terminated by rest app.',
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('response', result.answer);
    	if(result.error())
    		alert("Error: " + result.error());
    	else
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
        $workflowId = 'your_workflow_id'; // Replace with actual workflow ID
        $message = 'Workflow terminated'; // Replace with actual message
        $result = $serviceBuilder
            ->getBizProcScope()
            ->workflow()
            ->terminate($workflowId, $message);
        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print('Termination failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.workflow.terminate',
        {
            ID: '65e5a449e8f135.21284909',
            STATUS: 'Terminated by rest app.',
        },
        function(result) {
            console.log('response', result.answer);
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.terminate',
        [
            'ID' => '65e5a449e8f135.21284909',
            'STATUS' => 'Terminated by rest app.'
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
        "start": 1726476060.581428,
        "finish": 1726476060.813776,
        "duration": 0.23234796524047852,
        "processing": 0.002630949020385742,
        "date_start": "2024-09-16T08:41:00+00:00",
        "date_finish": "2024-09-16T08:41:00+00:00",
        "operating_reset_at": 1726476660,
        "operating": 0,
    },
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Корневой элемент ответа.

Содержит `true` в случае успеха ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!",
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** |**Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод запустил не администратор ||
|| `400` | `ERROR_WRONG_WORKFLOW_ID` | Empty workflow instance ID | Передали пустое значение в параметр `ID` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-start.md)
- [{#T}](./bizproc-workflow-instances.md)
- [{#T}](./bizproc-workflow-kill.md)
- [{#T}](../../tutorials/bizproc/how-to-kill-workflows.md)
- [{#T}](../../tutorials/bizproc/how-to-filter-and-kill-workflows.md)