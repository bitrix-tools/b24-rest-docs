# Обновить существующую ставку НДС crm.vat.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность и тип параметров
- отсутствует ответ в случае ошибки 
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
crm.vat.update(id, fields)
```

Метод обновляет существующую ставку НДС.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор ставки НДС. ||
|| **fields** | Набор полей - массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.vat.fields](crm-vat-fields.md). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

```javascript
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.vat.update",
    {
        "id": id,
        "fields":
        {
            "ACTIVE": "N"
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.info(result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
