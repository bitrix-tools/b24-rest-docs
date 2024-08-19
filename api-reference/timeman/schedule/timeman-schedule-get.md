# Получение рабочего графика

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "timeman.schedule.get" %}

**Scope**: [`timeman`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `timeman.schedule.get` позволяет получить рабочий график по его идентификатору.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **id**
[`int`](../../data-types.md) | Идентификатор графика | ||
|#

## Пример

```javascript
BX24.callMethod(
    "timeman.schedule.get",
    {
        id: 2
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.dir(result.data());
            if(result.more())
                result.next();
        }
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
