# Получить элементы перечисления «Тип активности» crm.enum.activitytype

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
crm.enum.activitytype()
```

Возвращает элементы перечисления «Тип активности».

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "crm.enum.activitytype",
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

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": 0,
            "NAME": "",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 1,
            "NAME": "Meeting",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 2,
            "NAME": "Call",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 3,
            "NAME": "Task",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 4,
            "NAME": "E-mail",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 5,
            "NAME": "Activity",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 6,
            "NAME": "User action",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        }
    ],
    "time": {
        "start": 1737526634.82,
        "finish": 1737526634.8506,
        "duration": 0.030540943145752,
        "processing": 0.0023229122161865,
        "date_start": "2025-01-22T09:17:14+03:00",
        "date_finish": "2025-01-22T09:17:14+03:00",
        "operating_reset_at": 1737527234,
        "operating": 0
    }
}
```
