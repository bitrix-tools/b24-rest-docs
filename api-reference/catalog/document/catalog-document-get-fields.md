# Получить поля документов складского учета catalog.document.getFields

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

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.getFields()
```

Метод возвращает список полей документов складского учёта.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting document fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.getFields',
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **commentary** 
[`char`](../../data-types.md) | Комментарий. |  ||
|| **createdBy** 
[`integer`](../../data-types.md) | Кем создан. |  Неизменяемое поле. ||
|| **currency^*^** 
[`char`](../../data-types.md) | Валюта. | Неизменяемое поле. ||
|| **dateCreate** 
[`datetime`](../../data-types.md) | Дата создания. | Неизменяемое поле. ||
|| **dateDocument** 
[`datetime`](../../data-types.md) | Дата проведения документа. |  ||
|| **dateModify** 
[`datetime`](../../data-types.md) | Дата изменения. |  ||
|| **dateStatus** 
[`datetime`](../../data-types.md) | Дата установки статуса. | Только для чтения. ||
|| **docNumber** 
[`string`](../../data-types.md) | Номер документа. |  ||
|| **docType^*^**
[`char`](../../data-types.md) | Тип документа:
- `A` – Приход товара на склад; 
- `S` – Оприходование товара; 
- `M` – Перемещение товара между складами; 
- `R` – Возврат товара; 
- `D` – Списание товара. |  Неизменяемое поле. ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор документа. | Только для чтения. ||
|| **modifiedBy** 
[`integer`](../../data-types.md) | Кем изменён. |  ||
|| **responsibleId^*^** 
[`integer`](../../data-types.md) | Ответственный. |  ||
|| **status** 
[`char`](../../data-types.md) | Статус. | Только для чтения. ||
|| **statusBy** 
[`integer`](../../data-types.md) | Кем установлен статус. |  ||
|| **title** 
[`string`](../../data-types.md) | Заголовок документа. |  ||
|| **total** 
[`double`](../../data-types.md) | Общая сумма товаров. |  ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
