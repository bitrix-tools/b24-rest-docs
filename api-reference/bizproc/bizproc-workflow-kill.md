# Удалить запущенный процесс bizproc.workflow.kill

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет запущенный бизнес-процесс вместе со всеми данными процесса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Идентификатор бизнес-процесса ||
|#


## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":"65e5a449e8f135.21284909"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.kill
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":"65e5a449e8f135.21284909","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.kill
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.kill',
    		{
    			ID: '65e5a449e8f135.21284909',
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
        $workflowId = 'your_workflow_id'; // Replace with your actual workflow ID
        $result = $serviceBuilder->getBizProcScope()
            ->workflow()
            ->kill($workflowId);
        if ($result->isSuccess()) {
            print_r($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print('Failed to kill workflow: ' . json_encode($result->getCoreResponse()->getResponseData()->getResult()));
        }
    } catch (Throwable $e) {
        print('Error occurred: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.workflow.kill',
        {
            ID: '65e5a449e8f135.21284909',
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
        'bizproc.workflow.kill',
        [
            'ID' => '65e5a449e8f135.21284909'
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
- [{#T}](./bizproc-workflow-terminate.md)
- [{#T}](../../tutorials/bizproc/how-to-kill-workflows.md)
- [{#T}](../../tutorials/bizproc/how-to-filter-and-kill-workflows.md)
