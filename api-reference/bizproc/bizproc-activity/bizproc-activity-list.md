# Список установленных действий

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "bizproc.activity.list" %}

{% include notitle [Скоуп bizproc админ](../_includes/scope-bizproc-admin.md) %}

{% endnote %}

Метод возвращает список установленных приложением действий.

## Примеры

```javascript
BX24.callMethod(
    'bizproc.activity.list',
    {},
    function(result) {
        if(result.error())
            alert("Ошибка: " + result.error());
        else
            alert("Успешно: " + result.data().join(', '));
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}