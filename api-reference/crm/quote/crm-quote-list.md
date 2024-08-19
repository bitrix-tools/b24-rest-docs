# Список предложений по фильтру
{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно описать параметры здесь
- не указаны типы параметров
- не указана обязательность параметров
- добавить ссылку на фразу "списочных методов", ссылка должна вести на страницу https://dev.1c-bitrix.ru/rest_help/rest_sum/index.php
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

{% note info "crm.quote.list" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.quote.list` возвращает список предложений по фильтру. Является реализацией списочного метода для предложений.

Cм. описание [списочных методов](.).

## Пример

```javascript
BX24.callMethod(
    "crm.quote.list",
    {
        order: { "STATUS_ID": "ASC" },
        filter: { "=COMPANY_ID": 1 },
        select: [ "ID", "TITLE", "STATUS_ID", "OPPORTUNITY", "CURRENCY_ID" ]
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