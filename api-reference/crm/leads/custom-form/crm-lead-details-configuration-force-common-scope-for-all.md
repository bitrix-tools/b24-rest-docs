# Установить общую карточку для всех пользователей crm.lead.details.configuration.forceCommonScopeForAll

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.lead.details.configuration.forceCommonScopeForAll` принудительно устанавливает общую карточку лидов для всех пользователей.

{% note warning %}

Обратите внимание, что настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов применяется параметр **leadCustomerType**.

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **extras**
[`unknown`](../../../data-types.md) | Дополнительные параметры. Здесь для лидов может быть задан параметр `leadCustomerType`, с допустимыми значениями:

- **1** - простые лиды,
- **2** - повторные лиды 
  ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.lead.details.configuration.forceCommonScopeForAll",
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.details.configuration.forceCommonScopeForAll',
                []
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
        echo 'Error setting common lead card for all users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //---
    //Установить общую карточку лидов для всех пользователей.
    BX24.callMethod(
        "crm.lead.details.configuration.forceCommonScopeForAll",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //---
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}