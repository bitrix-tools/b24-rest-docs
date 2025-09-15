# Обновить направление сделок crm.dealcategory.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.category.update`](../../universal/category/crm-category-update.md)

{% endnote %}

Метод обновляет существующее направление.

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор направления ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для обновления направления сделок.

Чтобы узнать требуемый формат полей, выполните метод [`crm.dealcategory.fields`](./crm-deal-category-fields.md) и посмотрите формат пришедших значений этих полей (кроме полей помеченных атрибутами **isReadOnly** и **isImmutable**) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","fields":{"SORT":"100"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","fields":{"SORT":"100"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.update
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const sort = prompt("Введите сортировку");
    	const parsedSort = parseInt(sort);
    	
    	if(isNaN(parsedSort) || parsedSort < 0)
    	{
    		parsedSort = 0;
    	}
    	
    	const response = await $b24.callMethod(
    		"crm.dealcategory.update",
    		{
    			id: id,
    			fields: { "SORT": parsedSort }
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    $id = (int)readline("Введите ID");
    $sort = (int)readline("Введите сортировку");
    if (is_nan($sort) || $sort < 0) {
        $sort = 0;
    }
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.dealcategory.update',
                [
                    'id'     => $id,
                    'fields' => ['SORT' => $sort],
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
        echo 'Error updating deal category: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var sort = prompt("Введите сортировку");
    sort = parseInt(sort);
    if(isNaN(sort) || sort < 0)
    {
        sort = 0;
    }

    BX24.callMethod(
        "crm.dealcategory.update",
        {
            id: id,
            fields: { "SORT": sort }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = 1; // Replace 1 with the actual ID
    $sort = 100; // Replace 100 with the actual sort value

    $result = CRest::call(
        'crm.dealcategory.update',
        [
            'id' => $id,
            'fields' => ['SORT' => $sort]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}