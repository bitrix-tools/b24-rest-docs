# Обновление полей действий

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
- не прописаны ссылки на несозданные ещё страницы.
  
  {% endnote %}

{% endif %}

{% note info "bizproc.activity.update" %}

{% include notitle [Скоуп bizproc админ](../_includes/scope-bizproc-admin.md) %}

{% endnote %}

Метод позволяет обновить поля уже добавленного действия для бизнес-процессов. Параметры метода аналогичны [bizproc.activity.add](./bizproc-activity-add.md).

## Пример

```javascript
function updateActivity1()
{
    var params = {
        'CODE': 'hash',
        'FIELDS': {
            'DOCUMENT_TYPE': '',
            'FILTER': ''
        },
    };

    BX24.callMethod(
        'bizproc.activity.update',
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