# Получить элементы перечисления «Тип адреса» crm.enum.addresstype

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
crm.enum.addresstype()
```

Возвращает элементы перечисления «Тип адреса».

## Возможные значения

```
{
    "result": [
        {
            "ID": 1,
            "NAME": "Фактический адрес"
        },
        {
            "ID": 4,
            "NAME": "Адрес регистрации"
        },
        {
            "ID": 6,
            "NAME": "Юридический адрес"
        },
        {
            "ID": 9,
            "NAME": "Адрес бенефициара"
        }
    ],
    "time": {
        "start": 1561544164.224608,
        "finish": 1561544164.245065,
        "duration": 0.020457029342651367,
        "processing": 0.008939027786254883,
        "date_start": "2019-06-26T13:16:04+03:00",
        "date_finish": "2019-06-26T13:16:04+03:00"
    }
}
```

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "crm.enum.addresstype",
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
