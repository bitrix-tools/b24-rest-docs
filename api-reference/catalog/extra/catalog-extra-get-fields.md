# Возвращение полей наценки

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

{% note info "catalog.extra.getFields" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
catalog.extra.getFields()
```

Метод возвращает поля наценки.

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    'catalog.extra.getFields',
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
{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор наценки | Только для чтения ||
|| **name^*^**
[`string`](../../data-types.md) | Название |  ||
|| **percentage^*^**
[`string`](../../data-types.md) | Величина наценки |  ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}