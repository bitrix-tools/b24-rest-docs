# Удалить дело crm.activity.delete

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

Метод `crm.activity.delete` удаляет дело.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор дела. ||
|#

## Примеры


- B24-PHP-SDK

    ```php
        
    try {
        $itemId = 123; // Replace with the actual item ID to delete
        $result = $serviceBuilder->getCRMScope()->activity()->delete($itemId);
        
        if ($result->isSuccess()) {
            print("Item deleted successfully.");
        } else {
            print("Failed to delete item.");
        }
    } catch (Throwable $e) {
        print("Error occurred: " . $e->getMessage());
    }
    
    ```

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.activity.delete",
    { id: id },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}