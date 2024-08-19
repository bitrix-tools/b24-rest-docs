# Добавление товара документа складского учёта

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

{% note info "catalog.document.element.add" %}

**Scope**: [`catalog`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.document.element.add(fields)
```

Метод добавляет товар документа складского учёта.
Если операция успешна, возвращается `id` добавленного товара.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`array`](../../../data-types.md)| Параметры добавляемого товара. Поля соответствуют доступному списку полей [`fields`](catalog-document-element-get-fields.md) ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.document.element.add',
        {
            'fields': {
                'docId': 1,
                'storeFrom': 0,
                'storeTo': 1,
                'elementId': 42,
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
  
    ```
    $result = CRest::call(
        'catalog.document.element.add',
        [
            'fields' => [
                'docId' => 1,
                'storeFrom' => 0,
                'storeTo' => 1,
                'elementId' => 42,
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