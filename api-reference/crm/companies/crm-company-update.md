# Обновить существующую компанию crm.company.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.update` обновляет существующую компанию.

{% note warning %}

Настоятельно рекомендуется при обновлении адреса передавать полный набор полей адреса в метод обновления. Особенности обновления полей адреса описаны [здесь](../data-types.md).

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор компании. ||
|| **fields**
[`unknown`](../../data-types.md) | [Набор полей](./crm-company-add.md) - массив вида array("обновляемое поле"=>"значение"[, ...]), где "обновляемое поле" может принимать значения из возвращаемых методом [crm.company.fields](./crm-company-fields.md). 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.company.fields](./crm-company-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}

 ||
|| **params**
[`unknown`](../../data-types.md) | Набор параметров. `REGISTER_SONET_EVENT` - произвести регистрацию события изменения компании в живой ленте. Дополнительно будет отправлено уведомление ответственному за компанию. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.company.update",
    		{
    			id: id,
    			fields:
    			{
    				"CURRENCY_ID": "RUB",
    				"REVENUE" : 500000,
    				"EMPLOYEES": "EMPLOYEES_3"
    			},
    			params: { "REGISTER_SONET_EVENT": "Y" }
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
    $id = readline("Введите ID");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.update',
                [
                    'id' => $id,
                    'fields' => [
                        'CURRENCY_ID' => 'RUB',
                        'REVENUE' => 500000,
                        'EMPLOYEES' => 'EMPLOYEES_3',
                    ],
                    'params' => ['REGISTER_SONET_EVENT' => 'Y'],
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
        echo 'Error updating company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.company.update",
        {
            id: id,
            fields:
            {
                "CURRENCY_ID": "RUB",
                "REVENUE" : 500000,
                "EMPLOYEES": "EMPLOYEES_3"
            },
            params: { "REGISTER_SONET_EVENT": "Y" }
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}