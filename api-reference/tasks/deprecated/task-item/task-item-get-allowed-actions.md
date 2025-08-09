# Получить список действий над задачей task.item.getallowedactions

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив идентификаторов допустимых действий над задачей.

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|#

## Таблица соответствия идентификаторов и допустимых действий над задачей

#|
|| **Идентификатор** | **Описание** ||
|| `1` | ACTION_ACCEPT ||
|| `2` | ACTION_DECLINE ||
|| `3` | ACTION_COMPLETE ||
|| `4` | ACTION_APPROVE ||
|| `5` | ACTION_DISAPPROVE ||
|| `6` | ACTION_START ||
|| `7` | ACTION_DELEGATE ||
|| `8` | ACTION_REMOVE ||
|| `9` | ACTION_EDIT ||
|| `10` | ACTION_DEFER ||
|| `11` | ACTION_RENEW ||
|| `12` | ACTION_CREATE ||
|| `13` | ACTION_CHANGE_DEADLINE ||
|| `14` | ACTION_CHECKLIST_ADD_ITEMS ||
|| `15` | ACTION_ELAPSED_TIME_ADD ||
|| `16` | ACTION_CHANGE_DIRECTOR ||
|| `17` | ACTION_PAUSE ||
|| `18` | ACTION_START_TIME_TRACKING ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.getallowedactions
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.getallowedactions
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.item.getallowedactions',
    		[13]
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
                'task.item.getallowedactions',
                [13]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting allowed actions: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.getallowedactions',
        [13],
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
        'task.item.getallowedactions',
        [
            'TASKID' => 13
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}