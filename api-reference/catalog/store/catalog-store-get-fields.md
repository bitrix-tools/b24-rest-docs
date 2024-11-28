# Получить поля склада catalog.store.getFields

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
catalog.store.getFields()
```

Метод возвращает поля складов.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.store.getFields',
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
|| **active** 
[`char`](../../data-types.md) | Активность. | ||
|| **address^*^** 
[`string`](../../data-types.md) | Адрес. |  ||
|| **code** 
[`string`](../../data-types.md) | Символьный код. |  ||
|| **dateCreate** 
[`datetime`](../../data-types.md) | Дата создания. |  ||
|| **dateModify** 
[`datetime`](../../data-types.md) | Дата изменения. |  ||
|| **description** 
[`string`](../../data-types.md) | Описание. |  ||
|| **email** 
[`string`](../../data-types.md) | Email. |  ||
|| **gpsN** 
[`double`](../../data-types.md) | GPS широта. |  ||
|| **gpsS** 
[`double`](../../data-types.md) | GPS долгота. | ||
|| **id** 
[`integer`](../../data-types.md) | Идентификатор склада. | Только для чтения. ||
|| **imageId** 
[`integer`](../../data-types.md) | Идентификатор изображения. |  ||
|| **issuingCenter** 
[`char`](../../data-types.md) | Пункт выдачи. |  ||
|| **locationId** 
[`integer`](../../data-types.md) | Идентификатор местоположения. |  ||
|| **modifiedBy** 
[`integer`](../../data-types.md) | Кем изменен. |  ||
|| **phone** 
[`string`](../../data-types.md) | Телефон. |  ||
|| **schedule** 
[`string`](../../data-types.md) | График работы. |  ||
|| **shippingCenter** 
[`char`](../../data-types.md) | Для отгрузки. |  ||
|| **siteId** 
[`string`](../../data-types.md) | Идентификатор сайта. |  ||
|| **sort** 
[`integer`](../../data-types.md) | Сортировка. |  ||
|| **title** 
[`string`](../../data-types.md) | Название. |  ||
|| **userId** 
[`integer`](../../data-types.md) | Кем создан. |  ||
|| **xmlId** 
[`string`](../../data-types.md) | Внешний код. |  ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
