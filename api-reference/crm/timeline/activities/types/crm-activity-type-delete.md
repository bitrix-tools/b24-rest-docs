# Удалить пользовательский тип дел crm.activity.type.delete

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

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.type.delete` удаляет подтип дел.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **TYPE_ID**
[`unknown`](../../../../data-types.md) | Идентификатор типа дела провайдера. | ||
|#

## Пример

```js
BX24.callMethod(
    'crm.activity.type.delete',
    {
        TYPE_ID: id
    },
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
        {
            alert("Success: " + result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}