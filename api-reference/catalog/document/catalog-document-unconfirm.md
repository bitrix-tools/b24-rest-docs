# Отменить проведение документа (уст.) catalog.document.unconfirm

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

{% note info "Внимание!" %}

Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.cancel](./catalog-document-cancel.md).

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.unconfirm(id)
```

Метод для отмены проведения документа.
Если операция успешна, возвращается `true` добавленного склада.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md)| Номер документа. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS
  
    ```js
    BX24.callMethod(
        'catalog.document.unconfirm',
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

- PHP
  
    ```php
    $result = CRest::call(
        'catalog.document.unconfirm',
        [
            'id' => 42,
        ]
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}