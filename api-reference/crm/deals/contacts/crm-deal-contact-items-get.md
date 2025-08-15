# Получить набор контактов, связанных со сделкой crm.deal.contact.items.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.contact.items.get`  возвращает набор контактов, связанных с указанной сделкой.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор сделки. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.deal.contact.items.get",
    		{
    			id: id
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $dealId = 123; // Replace with the actual deal ID
        $result = $serviceBuilder
            ->getCRMScope()
            ->dealContact()
            ->itemsGet($dealId);

        foreach ($result->getDealContacts() as $item) {
            print("CONTACT_ID: " . $item->CONTACT_ID . "\n");
            print("SORT: " . $item->SORT . "\n");
            print("ROLE_ID: " . $item->ROLE_ID . "\n");
            print("IS_PRIMARY: " . $item->IS_PRIMARY . "\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.deal.contact.items.get",
        {
            id: id
        },
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

## Ответ в случае успеха

Результат возвращается в виде массива объектов, каждый из которых содержит следующие поля:

#|
|| **Поле** | **Описание** ||
|| **CONTACT_ID** | Идентификатор контакта ||
|| **SORT** | Индекс сортировки ||
|| **ROLE_ID** | Идентификатор роли (зарезервировано) ||
|| **IS_PRIMARY** | Флаг первичного контакта ||
|#
