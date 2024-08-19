# Сущности, к которым можно привязать заказ

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

{% note info "crm.enum.getorderownertypes" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
crm.enum.getorderownertypes()
```

Метод возвращает идентификаторы типов сущностей, к которым доступна привязка заказа.

## Возможные значения

{% note info "Примечание" %}

В настоящий момент [привязку заказа](../../universal/order-entity/crm-order-entity-add.md) можно осуществить только к **Сделке**.

{% endnote %}

```
"result": [
    {
     "attribute": "DYN",
     "code": "DEAL",
     "id": "2",
     "name": "Сделка"
}
]
```

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    "crm.enum.getorderownertypes",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);    
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
