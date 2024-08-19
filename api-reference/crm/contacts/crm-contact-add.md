# Создание нового контакта

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

{% note info "crm.contact.add" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.add` создаёт новый контакт.

#|
|| **Параметр** | **Описание** ||
|| **fields**
| Набор [полей](./crm-contact-fields.md) – массив вида `array("поле"=>"значение"[, ...])`, содержащий значения полей контакта.

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.contact.fields](./crm-contact-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %} ||
|| **params**
| Набор параметров. `REGISTER_SONET_EVENT` – произвести регистрацию события добавления контакта в живой ленте. Дополнительно будет отправлено уведомление ответственному за контакт. ||
|#

{% note info %}

**Одно из полей** (`NAME` или `LAST_NAME`) обязательно должно быть заполнено.

{% endnote %}

## Пример

```js
BX24.callMethod(
    "crm.contact.add",
    {
        fields:
        {
            "NAME": "Глеб",
            "SECOND_NAME": "Егорович",
            "LAST_NAME": "Титов",
            "OPENED": "Y",
            "ASSIGNED_BY_ID": 1,
            "TYPE_ID": "CLIENT",
            "SOURCE_ID": "SELF",
            "PHOTO": { "fileData": document.getElementById('photo') },
            "PHONE": [ { "VALUE": "555888", "VALUE_TYPE": "WORK" } ]     
        },
        params: { "REGISTER_SONET_EVENT": "Y" }    
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info("Создан контакт с ID " + result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}