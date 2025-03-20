# Получить значение списочного свойства по идентификатору catalog.productPropertyEnum.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.productPropertyEnum.get(id)
```

Метод для доступа к значению списочного свойства по ID.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** 
[`integer`](../../data-types.md)| Идентификатор значения списочного свойства. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'catalog.productPropertyEnum.get',
        {
            id: 121
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
