# Добавить задачу task.item.add

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новую задачу. Возвращает идентификатор добавленной задачи. Доступны следующие [поля](./index.md).

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKDATA**
[`array`](../../../data-types.md) | Массив полей данных по задаче (`TITLE`, `DESCRIPTION` и так далее) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Создание задачи.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"created via REST API at **current_datetime_here**","RESPONSIBLE_ID":1,"DEADLINE":"2013-05-13T16:06:06+03:00"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"created via REST API at **current_datetime_here**","RESPONSIBLE_ID":1,"DEADLINE":"2013-05-13T16:06:06+03:00"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.add
    ```

- JS


    ```js
    try
    {
    	const dt = new Date();
    	const response = await $b24.callMethod(
    		'task.item.add',
    		[{TITLE: 'created via REST API at ' + dt.toLocaleString(), RESPONSIBLE_ID: 1, DEADLINE: '2013-05-13T16:06:06+03:00'}]
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
        $dt = new DateTime();
        $response = $b24Service
            ->core
            ->call(
                'task.item.add',
                [
                    [
                        'TITLE'         => 'created via REST API at ' . $dt->format('Y-m-d H:i:s'),
                        'RESPONSIBLE_ID' => 1,
                        'DEADLINE'      => '2013-05-13T16:06:06+03:00',
                    ],
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
        echo 'Error adding task item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var dt = new Date();
    BX24.callMethod(
        'task.item.add',
        [{TITLE: 'created via REST API at ' + dt.toLocaleString(), RESPONSIBLE_ID: 1, DEADLINE: '2013-05-13T16:06:06+03:00'}],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $dt = new DateTime();
    $title = 'created via REST API at ' . $dt->format('Y-m-d H:i:s');

    $result = CRest::call(
        'task.item.add',
        [
            'fields' => [
                'TITLE' => $title,
                'RESPONSIBLE_ID' => 1,
                'DEADLINE' => '2013-05-13T16:06:06+03:00'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Пример записи значений с CRM.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":1,"FIELDS":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.update',
    		[1, {UF_CRM_TASK: ["L_4", "C_7", "CO_5", "D_10"]}]
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'task.item.update',
                [
                    1,
                    ['UF_CRM_TASK' => ["L_4", "C_7", "CO_5", "D_10"]],
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
        echo 'Error updating task item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.update',
        [1, {UF_CRM_TASK: ["L_4", "C_7", "CO_5", "D_10"]}],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.update',
        [
            'TASKID' => 1,
            'FIELDS' => [
                'UF_CRM_TASK' => ["L_4", "C_7", "CO_5", "D_10"]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

Цифры — это `ID` соответствующих значений. Значение `L_4` означает привязку к задаче лида с `ID = 4`. Можно задавать несколько связей одного типа, например, `L_4, L_5`.

- `L` — лид
- `C` — контакт
- `CO` — компания
- `D` — сделка
