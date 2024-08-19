# Обновление полей робота

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif}

{% note info "bizproc.robot.update" %}

{% include notitle [Скоуп bizproc админ](../_includes/scope-bizproc-admin.md) %}

{% endnote %}

Метод обновляет поля робота. В массив **FIELDS** передаются те же параметры, которые используются в [bizproc.robot.add](./bizproc-robot-add.md).

## Примеры

```js
function updateRobot1()
{
    var params = {
        'CODE': 'hash',
        'FIELDS': {
            'DOCUMENT_TYPE': '',
            'FILTER': ''
        },
    };
    BX24.callMethod(
        'bizproc.robot.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
}
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
