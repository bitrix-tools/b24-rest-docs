# Доступ к значению полей коэффициента единицы измерения по ID

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.ratio.get" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
catalog.ratio.get(id)
```

Метод для доступа к значению полей коэффициента единицы измерения по ID.

Если операция успешна, возвращается [ресурс коэффициента единицы измерения](resource.md) в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id^*^** 
[`string`](../../data-types.md)| Номер коэффициента единицы измерения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
BX24.callMethod(
    'catalog.ratio.get',
    {
        id: 7
    },
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