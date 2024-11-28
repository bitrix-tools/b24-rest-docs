# Получить значения параметра свойства товаров или торговых предложений catalog.productPropertyFeature.get

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
catalog.productPropertyFeature.get(id)
```

Метод для доступа к значению параметра свойства товров или торговых предложений по ID.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** 
[`integer`](../../data-types.md)| Идентификатор параметра свойства товров или торговых предложений. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.productPropertyFeature.get',
        {
            id: 144
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