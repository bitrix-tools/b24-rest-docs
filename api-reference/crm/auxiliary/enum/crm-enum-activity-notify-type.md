# Получить элементы перечисления «Тип уведомления о начале активности» crm.enum.activitynotifytype

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
crm.enum.activitynotifytype()
```

Возвращает элементы перечисления «Тип уведомления о начале активности» (для встреч и звонков).

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
    
    ```javascript
    BX24.callMethod(
        "crm.enum.activitynotifytype",
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
