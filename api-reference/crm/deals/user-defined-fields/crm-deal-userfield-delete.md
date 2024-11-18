# Удалить пользовательское поле сделок crm.deal.userfield.delete

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

Метод `crm.deal.userfield.delete` удаляет пользовательское поле сделок.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор пользовательского поля. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.deal.userfield.delete",
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
        $userfieldId = 123; // Replace with the actual userfield ID you want to delete
        $result = $serviceBuilder
            ->getCRMScope()
            ->dealUserfield()
            ->delete($userfieldId);

        if ($result->isSuccess()) {
            print("Userfield deleted successfully.");
        } else {
            print("Failed to delete userfield.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}