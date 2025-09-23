# Изменить счет crm.invoice.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод обновляет существующий счет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор счета ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для обновления счета.

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.fields](./crm-invoice-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": "**put_invoice_id_here**", "fields": {"DATE_BILL": "**put_date_here**", "USER_DESCRIPTION": "Комментарий для клиента (обновленный).", "PRODUCT_ROWS": [{"ID": "**put_row_id_here**", "PRODUCT_ID": 703, "QUANTITY": 4, "PRICE": 779.60}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.invoice.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": "**put_invoice_id_here**", "fields": {"DATE_BILL": "**put_date_here**", "USER_DESCRIPTION": "Комментарий для клиента (обновленный).", "PRODUCT_ROWS": [{"ID": "**put_row_id_here**", "PRODUCT_ID": 703, "QUANTITY": 4, "PRICE": 779.60}]}, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.update
    ```

- JS


    ```js
    try
    {
    	const current = new Date();
    	const date2str = function(d)
    	{
    		return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    	};
    	const paddatepart = function(part)
    	{
    		return part >= 10 ? part.toString() : '0' + part.toString();
    	};
    	const id = prompt("Введите ID");
    	
    	const response = await $b24.callMethod('crm.invoice.get', {"id": id});
    	const result = response.getData().result;
    	
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		const fields = clone(result.data());
    		const n = fields['PRODUCT_ROWS'].length;
    		let productUpdated = false;
    		
    		fields["DATE_BILL"] = date2str(current);
    		fields["USER_DESCRIPTION"] = "Комментарий для клиента (обновленный).";
    		
    		for (let i in fields['PRODUCT_ROWS'])
    		{
    			if (fields['PRODUCT_ROWS'][i]["PRODUCT_ID"] == 703)
    			{
    				const rowId = fields['PRODUCT_ROWS'][i]["ID"];
    				fields['PRODUCT_ROWS'][i] = {
    					"ID": rowId, "PRODUCT_ID": 703, "QUANTITY": 4, "PRICE": 779.60
    				};
    				productUpdated = true;
    				break;
    			}
    		}
    		
    		if (!productUpdated && n > 0)
    		{
    			fields['PRODUCT_ROWS'][n] = {
    				"ID": 0, "PRODUCT_ID": 703, "QUANTITY": 5, "PRICE": 779.60
    			};
    		}
    		
    		const updateResponse = await $b24.callMethod('crm.invoice.update', {"id": id, "fields": fields});
    		const updateResult = updateResponse.getData().result;
    		
    		console.info("Обновлен счет с ID " + updateResult);
    	}
    }
    catch(error)
    {
    	console.error(error);
    }
    
    function clone(src)
    {
    	let dst;
    	if (src instanceof Object)
    	{
    		dst = {};
    		for (let i in src)
    		{
    			if (src[i] instanceof Object)
    				dst[i] = clone(src[i]);
    			else
    				dst[i] = src[i];
    		}
    	}
    	else dst = src;
    	return dst;
    }
    ```

- PHP


    ```php
    try {
        $current = new DateTime();
        $date2str = function($d) {
            return $d->format('Y-m-d\TH:i:sP');
        };
        $id = readline("Введите ID");
    
        $response = $b24Service
            ->core
            ->call(
                'crm.invoice.get',
                ["id" => $id]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error getting invoice: ' . $result->error();
        } else {
            $fields = clone($result->data());
            $n = count($fields['PRODUCT_ROWS']);
            $productUpdated = false;
    
            $fields["DATE_BILL"] = $date2str($current);
            $fields["USER_DESCRIPTION"] = "Комментарий для клиента (обновленный).";
    
            foreach ($fields['PRODUCT_ROWS'] as $key => $row) {
                if ($row["PRODUCT_ID"] == 703) {
                    $rowId = $row["ID"];
                    $fields['PRODUCT_ROWS'][$key] = [
                        "ID"         => $rowId,
                        "PRODUCT_ID" => 703,
                        "QUANTITY"   => 4,
                        "PRICE"      => 779.60
                    ];
                    $productUpdated = true;
                    break;
                }
            }
    
            if (!$productUpdated && $n > 0) {
                $fields['PRODUCT_ROWS'][$n] = [
                    "ID"         => 0,
                    "PRODUCT_ID" => 703,
                    "QUANTITY"   => 5,
                    "PRICE"      => 779.60
                ];
            }
    
            $responseUpdate = $b24Service
                ->core
                ->call(
                    'crm.invoice.update',
                    ["id" => $id, "fields" => $fields]
                );
    
            $resultUpdate = $responseUpdate
                ->getResponseData()
                ->getResult();
    
            if ($resultUpdate->error()) {
                error_log($resultUpdate->error());
                echo 'Error updating invoice: ' . $resultUpdate->error();
            } else {
                echo 'Invoice updated with ID: ' . $resultUpdate->data();
            }
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Добавление или обновление товара в счете.
    var current = new Date();
    var date2str = function(d)
    {
        return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    };
    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };
    var id = prompt("Введите ID");
    BX24.callMethod('crm.invoice.get', {"id": id}, addProduct);
    function addProduct(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            var fields = clone(result.data());
            var n = fields['PRODUCT_ROWS'].length;
            var productUpdated = false;
            // Изменение поля "Дата выставления"
            fields["DATE_BILL"] = date2str(current);
            // Изменение поля "Комментарий (отобразится в счете)"
            fields["USER_DESCRIPTION"] = "Комментарий для клиента (обновленный).";
            // Если товар с ID 703 есть в счете, то обновляем его поля.
            // Если товара с ID 703 в счете нет, то добавляем его в счет.
            // Если используется НДС, то читается что цена его включает, а сам признак включения НДС в цену будет
            // взят из каталога.
            for (var i in fields['PRODUCT_ROWS'])
            {
                if (fields['PRODUCT_ROWS'][i]["PRODUCT_ID"] == 703)
                {
                    var rowId = fields['PRODUCT_ROWS'][i]["ID"]
                    fields['PRODUCT_ROWS'][i] = {
                        "ID": rowId, "PRODUCT_ID": 703, "QUANTITY": 4, "PRICE": 779.60
                    };
                    productUpdated = true;
                    break;
                }
            }
            if (!productUpdated && n > 0)
            {
                fields['PRODUCT_ROWS'][n] = {
                    "ID": 0, "PRODUCT_ID": 703, "QUANTITY": 5, "PRICE": 779.60
                };
            }
            BX24.callMethod('crm.invoice.update', {"id": id, "fields": fields},
                function(result)
                {
                    if(result.error())
                        console.error(result.error());
                    else
                    {
                        console.info("Обновлен счет с ID " + result.data());
                    }
                }
            );
        }
    }
    function clone(src)
    {
        var dst;
        if (src instanceof Object)
        {
            dst = {};
            for (var i in src)
            {
                if (src[i] instanceof Object)
                    dst[i] = clone(src[i]);
                else
                    dst[i] = src[i];
            }
        }
        else dst = src;
        return dst;
    }
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = $_REQUEST['id']; // Assuming ID is passed as a request parameter

    $current = new DateTime();
    $date2str = function($d) {
        return $d->format('Y-m-d\TH:i:s+03:00');
    };

    $fields = CRest::call(
        'crm.invoice.get',
        ['id' => $id]
    )['result'];

    $n = count($fields['PRODUCT_ROWS']);
    $productUpdated = false;
    $fields["DATE_BILL"] = $date2str($current);
    $fields["USER_DESCRIPTION"] = "Комментарий для клиента (обновленный).";

    foreach ($fields['PRODUCT_ROWS'] as $i => $row) {
        if ($row["PRODUCT_ID"] == 703) {
            $fields['PRODUCT_ROWS'][$i] = [
                "ID" => $row["ID"], "PRODUCT_ID" => 703, "QUANTITY" => 4, "PRICE" => 779.60
            ];
            $productUpdated = true;
            break;
        }
    }

    if (!$productUpdated && $n > 0) {
        $fields['PRODUCT_ROWS'][$n] = [
            "ID" => 0, "PRODUCT_ID" => 703, "QUANTITY" => 5, "PRICE" => 779.60
        ];
    }

    $result = CRest::call(
        'crm.invoice.update',
        ["id" => $id, "fields" => $fields]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}