# Изменить товар документа складского учета catalog.document.element.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- нет примеров на др. языках
- уточнить тип параметра id
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

```http
catalog.document.element.update(id, fields)
```

Метод для обновления товара документа складского учёта.
Если операция успешна, возвращается `true`.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор обновляемого товара. ||
|| **fields** 
[`array`](../../../data-types.md)|  Параметры обновляемого товара. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```js
    BX24.callMethod(
    'catalog.document.element.update',
    {
        'id': 42,
        'fields': {
            'amount': 10,
            'purchasingPrice': 25,
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.log(result.data());
    }
    );
    ```

- php

    ```php
    $result = CRest::call(
        'catalog.document.element.update',
        [
            'id' => 11,
            'fields' => [
                'amount' => 10,
                'purchasingPrice' => 25,
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
