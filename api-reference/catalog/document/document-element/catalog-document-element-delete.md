# Удаление товара документа складского учёта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
  
{% endnote %}

{% endif %}

{% note info "catalog.document.element.delete" %}

**Scope**: [`catalog`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.document.element.delete(id)
```

Метод для удаления товара документа складского учёта.
Если операция успешна, возвращается `true` в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор позиции документа. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.document.element.delete',
        {
            'id': 42,
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
        'catalog.document.element.delete',
        [
            'id' => 42,
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
