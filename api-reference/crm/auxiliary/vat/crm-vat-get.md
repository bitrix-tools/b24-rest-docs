# Получить ставку НДС по идентификатору crm.vat.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки и успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
crm.vat.get(id)
```

Возвращает ставку НДС по идентификатору.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор ставки НДС. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS
  
    ```javascript
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.vat.get",
        { "id": id },
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