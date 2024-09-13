# Получить типы справочников crm.status.entity.types

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
crm.status.entity.types()
```

Метод возвращает описание типов справочников.  Результат - массив вида  `array(array("ID"=>"символьный идентификатор справочника", "NAME":"название справочника")[, ...])`.

## Параметры

Без параметров.

## Пример

```javascript
BX24.callMethod(
    "crm.status.entity.types",
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}