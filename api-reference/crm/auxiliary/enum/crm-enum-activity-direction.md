# Получить элементы перечисления «Направление активности» crm.enum.activitydirection

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
crm.enum.activitydirection()
```

Возвращает элементы перечисления «Направление активности» (для писем и звонков). Значения: 1 - входящее, 2 - исходящее.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "crm.enum.activitydirection",
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
            "NAME": "Incoming",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 2,
            "NAME": "Outgoing",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        }
    ],
    "time": {
        "start": 1737527595.9598,
        "finish": 1737527595.9931,
        "duration": 0.033305883407593,
        "processing": 0.0027921199798584,
        "date_start": "2025-01-22T09:33:15+03:00",
        "date_finish": "2025-01-22T09:33:15+03:00",
        "operating_reset_at": 1737528195,
        "operating": 0
    },
    "code": 200
}
```


{% include [Сноска о примерах](../../../../_includes/examples.md) %}
