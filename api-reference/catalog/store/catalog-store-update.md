# Изменить склад catalog.store.update

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

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.store.update(id, fields)
```

Метод для обновления склада.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор склада. ||
|| **fields** 
[`array`](../../data-types.md)|  Параметры обновляемого склада. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.store.update',
        {
            id: 42,
            fields: {
                'title': 'Склад 1',
                'sort': '100',
                'active': 'Y',
                'issuingCenter': 'Y',
                'shippingCenter': 'Y',
                'code': 'store_1',
                'address': 'пр. Московский д. 52',
                'phone': '+0 123 456 789',
                'schedule': 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                'xmlId': 'store_1',
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

    ```
    $result = CRest::call(
        'catalog.store.update',
        [
            'id' => 42,
            'fields' => [
                'title' => 'Склад 1',
                'sort' => '100',
                'active' => 'Y',
                'issuingCenter' => 'Y',
                'shippingCenter' => 'Y',
                'code' => 'store_1',
                'address' => 'пр. Московский д. 52',
                'phone' => '+0 123 456 789',
                'schedule' => 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                'xmlId' => 'store_1',
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
