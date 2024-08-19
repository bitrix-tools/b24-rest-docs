# Создание новой компании

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.company.add" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.company.add` создаёт новую компанию.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`array`](../../data-types.md) | Набор полей - массив вида array("поле"=>"значение"[, ...]), содержащий значения полей компании. 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.company.fields](./crm-company-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}
 ||
|| **params**
[`array`](../../data-types.md) | Набор параметров. REGISTER_SONET_EVENT - произвести регистрацию события добавления компании в живой ленте. Дополнительно будет отправлено уведомление ответственному за компанию. ||
|#

## Примеры

```js
BX24.callMethod(
    "crm.company.add",
    {
        fields:
        {
            "TITLE": "ИП Титов",
            "COMPANY_TYPE": "CUSTOMER",
            "INDUSTRY": "MANUFACTURING",
            "EMPLOYEES": "EMPLOYEES_2",
            "CURRENCY_ID": "RUB",
            "REVENUE" : 3000000,
            "LOGO": { "fileData": document.getElementById('logo') },
            "OPENED": "Y",
            "ASSIGNED_BY_ID": 1,
            "PHONE": [ { "VALUE": "555888", "VALUE_TYPE": "WORK" } ]     
        },
        params: { "REGISTER_SONET_EVENT": "Y" }        
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info("Создана компания с ID " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}