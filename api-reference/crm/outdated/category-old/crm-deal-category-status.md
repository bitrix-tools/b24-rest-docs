# Получить идентификатор справочника, где хранятся стадии сделок crm.dealcategory.status

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать методы воронок [`crm.category.*`](../../universal/category/index.md)

{% endnote %}

Метод возвращает идентификатор справочника для хранения стадий по идентификатору направления сделок.

Это строка вида `DEAL_STAGE_[Идентификатор направления]`. Например, для направления с идентификатором 1 будет возвращена строка `"DEAL_STAGE_1"`.

Идентификатор предназначен для работы с семейством методов [`crm.status.*`](.). Например, чтобы создать новую стадию для направления, нужно передать его в метод [`crm.status.add`](../../status/crm-status-add.md) в качестве параметра `ENTITY_ID`.

# Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор направления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.status
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.status
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.dealcategory.status",
    		{ id: id }
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
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
                'crm.dealcategory.status',
                [
                    'id' => $id,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching deal category status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.dealcategory.status",
        { id: id },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 1; // Replace 1 with the actual ID

    $result = CRest::call(
        'crm.dealcategory.status',
        [
            'id' => $id
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}