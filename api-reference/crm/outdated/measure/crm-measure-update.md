# Изменить единицу измерения crm.measure.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет существующую единицу измерения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** | Идентификатор единицы измерения ||
|| **fields**
[`array`](../../data-types.md) | [Набор полей](./crm-measure-add.md) — массив вида `array("обновляемое поле"=>"значение"[, ...])`, где обновляемое поле может принимать значения из возвращаемых методом [crm.measure.fields](./crm-measure-fields.md). 

Чтобы узнать требуемый формат полей, выполните метод [crm.measure.fields](./crm-measure-fields.md) и посмотрите формат пришедших значений этих полей 
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"**put_id_here**","fields":{"MEASURE_TITLE":"**put_new_title_here**"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.measure.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"**put_id_here**","fields":{"MEASURE_TITLE":"**put_new_title_here**"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.measure.update
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const title = prompt("Введите новое наименование для единицы измерения");
    	
    	const response = await $b24.callMethod(
    		"crm.measure.update",
    		{
    			id: id,
    			fields: {
    				"MEASURE_TITLE": title
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    $id = readline("Введите ID");
    $title = readline("Введите новое наименование для единицы измерения");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.measure.update',
                [
                    'id' => $id,
                    'fields' => [
                        'MEASURE_TITLE' => $title
                    ]
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
        echo 'Error updating measure: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var title = prompt("Введите новое наименование для единицы измерения");
    BX24.callMethod(
        "crm.measure.update",
        {
            id: id,
            fields: {
                "MEASURE_TITLE": title
            }
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = ''; // Set the ID here
    $title = ''; // Set the new title here

    $result = CRest::call(
        'crm.measure.update',
        [
            'id' => $id,
            'fields' => [
                'MEASURE_TITLE' => $title
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./crm-measure-add.md)
- [{#T}](./crm-measure-get.md)
- [{#T}](./crm-measure-list.md)
- [{#T}](./crm-measure-delete.md)
- [{#T}](./crm-measure-fields.md)