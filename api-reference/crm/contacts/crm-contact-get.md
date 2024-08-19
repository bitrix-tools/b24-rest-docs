# Получение контакта по Id

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

{% note info "crm.contact.get" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.get` [возвращает контакт](./crm-contact-add.md) по идентификатору.

Для получения списка компаний, привязанных к контакту, используйте метод [crm.contact.company.items.get](./company/crm-contact-company-items-get.md).

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор контакта. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.contact.get",
    { id: id },
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