# Получить поля для связи сделка-контакт crm.deal.contact.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.contact.fields` возвращает для связи сделка-контакт описание полей, используемых методами семейства `crm.deal.contact.*`, то есть [crm.deal.contact.items.get](./crm-deal-contact-items-get.md), [crm.deal.contact.items.set](./crm-deal-contact-items-set.md), [crm.deal.contact.add](./crm-deal-contact-add.md) и т.д.

Без параметров.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.deal.contact.fields",
    		{}
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
                'crm.deal.contact.fields',
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
        echo 'Error fetching deal contact fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.deal.contact.fields",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки (число). Определяет, в каком порядке привязанные контакты будут показаны в сделке. ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | [Y/N] Является ли привязка основной. В сделке всегда есть основной контакт. Для него будет `IS_PRIMARY=Y`, для остальных `IS_PRIMARY=N`. ||
|| **CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор контакта, привязанного к сделке (число). ||
|#

