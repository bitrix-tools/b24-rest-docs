# Получить элементы перечисления «Тип содержания» crm.enum.contenttype

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
crm.enum.contenttype()
```

Возвращает элементы перечисления «Тип содержания».

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "crm.enum.contenttype",
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
            "NAME": "Plain text",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 2,
            "NAME": "bbCode",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        },
        {
            "ID": 3,
            "NAME": "HTML",
            "SYMBOL_CODE": "",
            "SYMBOL_CODE_SHORT": ""
        }
    ],
    "time": {
        "start": 1737527499.922,
        "finish": 1737527499.9578,
        "duration": 0.035794973373413,
        "processing": 0.0021491050720215,
        "date_start": "2025-01-22T09:31:39+03:00",
        "date_finish": "2025-01-22T09:31:39+03:00",
        "operating_reset_at": 1737528099,
        "operating": 0
    }
}
```
