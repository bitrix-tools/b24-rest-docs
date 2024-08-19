# Возвращение элементов перечисления «Тип владельца»

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

{% note info "crm.enum.ownertype" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```js
crm.enum.ownertype()
```

Метод возвращает идентификаторы типов сущностей CRM и смарт-процессов.

## Возможные значения

```json
{
"result": [
    {
     "ID": 1,
     "NAME": "Лид",
     "SYMBOL_CODE": "LEAD",
     "SYMBOL_CODE_SHORT": "L"
},
{
     "ID": 2,
     "NAME": "Сделка",
     "SYMBOL_CODE": "DEAL",
     "SYMBOL_CODE_SHORT": "D"
},
{
     "ID": 3,
     "NAME": "Контакт",
     "SYMBOL_CODE": "CONTACT",
     "SYMBOL_CODE_SHORT": "C"
},
{
     "ID": 4,
     "NAME": "Компания",
     "SYMBOL_CODE": "COMPANY",
     "SYMBOL_CODE_SHORT": "CO"
},
{
     "ID": 5,
     "NAME": "Счёт (старая версия)",
     "SYMBOL_CODE": "INVOICE",
     "SYMBOL_CODE_SHORT": "I"
},
{
     "ID": 31,
     "NAME": "Счёт",
     "SYMBOL_CODE": "SMART_INVOICE",
     "SYMBOL_CODE_SHORT": "SI"
},
{
     "ID": 7,
     "NAME": "Предложение",
     "SYMBOL_CODE": "QUOTE",
     "SYMBOL_CODE_SHORT": "Q"
},
{
     "ID": 8,
     "NAME": "Реквизиты",
     "SYMBOL_CODE": "REQUISITE",
     "SYMBOL_CODE_SHORT": "RQ"
},
{
     "ID": 130,
     "NAME": "Всё включено",
     "SYMBOL_CODE": "DYNAMIC_130",
     "SYMBOL_CODE_SHORT": "T82"
}
],
"time": {
"start": 1652769631.135543,
"finish": 1652769631.151046,
"duration": 0.0155029296875,
"processing": 0.0014200210571289062,
"date_start": "2022-05-17T09:40:31+03:00",
"date_finish": "2022-05-17T09:40:31+03:00",
"operating": 0
}
}
```

## Параметры

Без параметров.

## Примеры

```javascript
BX24.callMethod(
    "crm.enum.ownertype",
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
