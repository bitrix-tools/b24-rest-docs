# Получить Id последнего чата imopenlines.crm.chat.getLastId

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает `ID` последнего чата, который привязан к CRM сущности.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** | **С версии** ||
|| **CRM_ENTITY_TYPE***
[`unknown`](../../../data-types.md) | Тип CRM сущности: 
- LEAD — лид
- DEAL — сделка
- COMPANY — компания
- CONTACT — контакт
 | ||
|| **CRM_ENTITY***
[`unknown`](../../../data-types.md) | Идентификатор CRM сущности | ||
|#

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS


    ```js
    try
    {
    	const params = {
    		CRM_ENTITY_TYPE: 'LEAD',
    		CRM_ENTITY: 1,
    	};
    	
    	const response = await $b24.callMethod(
    		'imopenlines.crm.chat.getLastId',
    		params
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		alert("Error: " + result.error());
    	else
    		alert("Успешно: " + result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    function crmChatGetLastId() {
        try {
            $params = [
                'CRM_ENTITY_TYPE' => 'LEAD',
                'CRM_ENTITY'      => 1,
            ];
    
            $response = $b24Service
                ->core
                ->call(
                    'imopenlines.crm.chat.getLastId',
                    $params
                );
    
            $result = $response
                ->getResponseData()
                ->getResult();
    
            if ($result->error()) {
                echo 'Error: ' . $result->error();
            } else {
                echo 'Успешно: ' . $result->data();
            }
    
        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error getting last chat ID: ' . $e->getMessage();
        }
    }
    ```

- BX24.js

    ```js
    function crmChatGetLastId() {
        var params = {
            CRM_ENTITY_TYPE: 'LEAD',
            CRM_ENTITY: 1,
        };
        BX24.callMethod(
            'imopenlines.crm.chat.getLastId',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP CRest

    // пример для php

{% endlist %}