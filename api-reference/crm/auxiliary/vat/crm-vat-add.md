# Добавление ставки НДС

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип и обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "crm.vat.add" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
crm.vat.add(fields)
```

Метод создает новую ставку НДС.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields** | Набор полей - массив вида `array("поле"=>"значение"[, ...])`, содержащий значения ставки НДС. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

```javascript
var current = new Date();
var date2str = function(d)
{
    return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours())
        + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
};
var paddatepart = function(part)
{
    return part >= 10 ? part.toString() : '0' + part.toString();
};
BX24.callMethod(
    "crm.vat.add",
    {
        "fields":
        {
            "TIMESTAMP_X": date2str(current),
            "ACTIVE": "Y",
            "C_SORT": 110,
            "NAME": "НДС 18%",
            "RATE": 18.00
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info("Создана новая ставка НДС с ID " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}