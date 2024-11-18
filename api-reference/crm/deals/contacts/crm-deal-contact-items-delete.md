# Удалить набор контактов, связанных с указанной сделкой crm.deal.contact.items.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.contact.items.delete` очищает набор контактов, связанных с указанной сделкой.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор сделки. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.deal.contact.items.delete",
        {
            id: id
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- B24-PHP-SDK

    ```php
    try {
        $dealId = 123; // Replace with the actual deal ID you want to delete contacts from
        $result = $serviceBuilder->getCRMScope()->dealContact()->itemsDelete($dealId);

        if ($result->isSuccess()) {
            print("Successfully deleted contacts from deal ID: $dealId");
        } else {
            print("Failed to delete contacts. Result: " . json_encode($result));
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

{% endlist %}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}