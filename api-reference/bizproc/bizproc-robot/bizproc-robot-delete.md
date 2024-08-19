# Удаление зарегистрированного робота

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}


{% note info "bizproc.provider.delete" %}

{% include notitle [Скоуп bizproc админ](../_includes/scope-bizproc-admin.md) %}

{% endnote %}

Метод удаляет зарегистрированного робота.

#|
|| Параметры  | Описание ||
|| **CODE** | Идентификатор робота. ||
|#

## Примеры

```javascript
var params = {
    'CODE': 'robot'
};

BX24.callMethod(
    'bizproc.robot.delete',
    params,
    function(result) {
        if(result.error())
            alert('Error: ' + result.error());
        else
            alert("Успешно: " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}