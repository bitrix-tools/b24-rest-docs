# Создать новую сделку crm.deal.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.add` создаёт новую сделку.

#|
|| **Параметр** | **Описание** ||
|| **fields** | Набор полей – массив вида `array("поле"=>"значение"[, ...])`, содержащий значения полей сделки. 

{% note info "" %} 

Чтобы узнать требуемый формат полей, выполните метод [crm.deal.fields](./crm-deal-fields.md) и посмотрите формат пришедших значений этих полей. 

{% endnote %} ||
|| **params** | Набор параметров. `REGISTER_SONET_EVENT` – произвести регистрацию события добавления сделки в живой ленте. Дополнительно будет отправлено уведомление ответственному за сделку. ||
|#

## Пример

```js
var current = new Date();
var nextMonth = new Date();
nextMonth.setMonth(current.getMonth() + 1);
var date2str = function(d)
{
     return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
};
var paddatepart = function(part)
{
     return part >= 10 ? part.toString() : '0' + part.toString();
};
    
BX24.callMethod(
    "crm.deal.add",
    {
        fields:
        {
            "TITLE": "Плановая продажа",
            "TYPE_ID": "GOODS",
            "STAGE_ID": "NEW",
            "COMPANY_ID": 3,
            "CONTACT_ID": 3,
            "OPENED": "Y",
            "ASSIGNED_BY_ID": 1,
            "PROBABILITY": 30,
            "CURRENCY_ID": "USD",
            "OPPORTUNITY": 5000,
            "CATEGORY_ID": 5,
            "BEGINDATE": date2str(current),
            "CLOSEDATE": date2str(nextMonth)                    
        },
        params: { "REGISTER_SONET_EVENT": "Y" }    
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info("Создана сделка с ID " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}


{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-add.md)

{% endnote %}