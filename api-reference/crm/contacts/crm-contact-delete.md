# Удаление контакта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.contact.delete" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.delete` удаляет контакт и все связанные с ним объекты.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор контакта. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.contact.delete",
    { id: id },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}