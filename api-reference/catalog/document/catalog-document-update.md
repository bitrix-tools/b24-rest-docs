# Обновление документа складского учёта

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

{% note info "catalog.document.update" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.document.update(id, fields)
```

Метод для обновления документа складского учёта.
Если операция успешна, возвращается `true` добавленного склада.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор документа. ||
|| **fields** 
[`array`](../../data-types.md)|  Параметры документа. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.document.update',
        {
            'id': 42,
            'fields': {
                'total': '1000', // общая сумма всех PURCHASING_PRICE умноженных на AMOUNT
                'commentary': 'first document.',
                'title': 'Новый документ', //заголовок (поле доступно с версии catalog 22.200.0)
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
        'catalog.document.update',
        [
            'id' => 42,
            'fields' => [
                'total' => '1000',
                'commentary' => 'first document.',
                'title' => 'Новый документ',
            ],
        ]
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
