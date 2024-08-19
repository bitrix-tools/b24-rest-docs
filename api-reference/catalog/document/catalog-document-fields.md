# Возвращение списка полей документа (уст.)

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "Внимание!" %}

Метод устарел с версии **22.400.0**. Рекомендуется использовать метод [catalog.document.getFields](./catalog-document-get-fields.md).

{% endnote %}

{% note info "catalog.document.fields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.document.fields()
```

Метод возвращает список полей документов.

## Параметры

Без параметров.

## Примеры


{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.document.fields',
        {},
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
        'catalog.document.fields'
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор. | ||
|| **docType** 
[`char`](../../data-types.md) | Тип документа. |  ||
|| **siteId** 
[`char`](../../data-types.md) | Привязка к сайту. |  ||
|| **contractorId** 
[`integer`](../../data-types.md) | Поставщик. |  ||
|| **responsibleId^*^** 
[`integer`](../../data-types.md) | Ответственный. |  ||
|| **dateModify** 
[`datetime`](../../data-types.md) | Дата изменения. |  ||
|| **dateCreate** 
[`datetime`](../../data-types.md) | Дата создания. |  ||
|| **createdBy** 
[`integer`](../../data-types.md) | Создатель. |  ||
|| **modifiedBy** 
[`integer`](../../data-types.md) | Кем изменён. |  ||
|| **currency^*^** 
[`char`](../../data-types.md) | Валюта. |  ||
|| **status** 
[`char`](../../data-types.md) | Статус. |  ||
|| **dateStatus** 
[`datetime`](../../data-types.md) | Дата установки статуса. | ||
|| **dateDocument** 
[`datetime`](../../data-types.md) | Дата документа. | ||
|| **statusBy** 
[`integer`](../../data-types.md) | Кем установлен статус. |  ||
|| **total** 
[`double`](../../data-types.md) | Общая сумма товаров. |  ||
|| **commentary** 
[`char`](../../data-types.md) | Комментарий. |  ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
