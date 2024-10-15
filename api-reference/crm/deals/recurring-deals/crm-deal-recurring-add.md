# Создать новую регулярную сделку crm.deal.recurring.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.recurring.add` добавляет новую настройку для регулярной сделки.

#|
|| **Параметр** | **Описание** ||
|| **fields** | Набор полей – массив вида `array ("поле"=>"значение"[, ...])`, содержащий значения полей сделки. Обязательное поле – поле `DEAL_ID` [ID сделки, у которой задан параметр `IS_RECURRING=Y`]. 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.deal.recurring.fields](./crm-deal-recurring-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}
||
|#

## Пример

```js
var current = new Date();
var nextMonth = new Date();
var nextYear = new Date();
nextMonth.setMonth(current.getMonth() + 1);
nextYear.setYear(current.getFullYear() + 1);
var date2str = function(d)
{
    return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
};
var paddatepart = function(part)
{
    return part >= 10 ? part.toString() : '0' + part.toString();
};
BX24.callMethod(
    "crm.deal.recurring.add",
    {
        fields:
        {
            "DEAL_ID": "45",
            "CATEGORY_ID": "1",
            "IS_LIMIT": "D",
            "LIMIT_DATE": date2str(nextYear),
            "START_DATE": date2str(nextMonth),
            "PARAMS": {
                "MODE": "multiple",
                "MULTIPLE_TYPE": "month",
                "MULTIPLE_INTERVAL": 1,
                "OFFSET_BEGINDATE_TYPE": "day",
                "OFFSET_BEGINDATE_VALUE": 1,
                "OFFSET_CLOSEDATE_TYPE": "month",
                "OFFSET_CLOSEDATE_VALUE": 2,
            }
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info("Добавлены настройки регулярной сделки. ID записи - " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}