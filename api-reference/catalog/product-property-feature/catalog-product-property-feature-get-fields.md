# Получить поля параметров свойств товаров или вариаций catalog.productPropertyFeature.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.productPropertyFeature.getFields()
```

Метод возвращает поля параметров свойств товаров или вариаций.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.productPropertyFeature.getFields',
        {},
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

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **featureId^*^**
[`string`](../../data-types.md)| Код параметра. |  ||
|| **id**
[`integer`](../../data-types.md)| Идентификатор параметра свойства. | Только для чтения. ||
|| **isEnabled^*^**
[`char`](../../data-types.md)| Включен ли параметр. |  ||
|| **moduleId^*^**
[`string`](../../data-types.md)| Идентификатор модуля. |  ||
|| **propertyId^*^**
[`integer`](../../data-types.md)| Идентификатор свойства. |  ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}