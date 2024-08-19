# Изменение контакта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

{% note info "crm.contact.update" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.update` обновляет существующий контакт.

{% note warning %}

Настоятельно рекомендуется при обновлении адреса передавать полный набор полей адреса в метод обновления. Особенности обновления полей адреса описаны [здесь](http://dev.1c-bitrix.ru/rest_help/crm/fields.php#important).

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор контакта. ||
|| **fields** | [Набор полей](./crm-contact-fields.md) – массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.contact.fields](./crm-contact-fields.md).

{% note info %}

**Примечание**: чтобы узнать требуемый формат полей, выполните метод [crm.contact.fields](./crm-contact-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %} ||

|| **params** | Набор параметров. `REGISTER_SONET_EVENT` – произвести регистрацию события изменения контакта в живой ленте. Дополнительно будет отправлено уведомление ответственному за контакт. ||
|#

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.contact.update",
    {
        id: id,
        fields:
        {
            "TYPE_ID": "JOURNALIST",
            "SOURCE_ID": "CONFERENCE"
        },
        params: { "REGISTER_SONET_EVENT": "Y" }            
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.info(result.data());                        
        }
    }
);    
```

Чтобы удалить одно из значений множественного поля, например поля EMAIL, нужно передать ID этого значения и обнулить `VALUE`.

```js
BX24.callMethod(
    "crm.contact.update", {
        id: 46467,
        fields: {
            "EMAIL": [{
                "ID": 83153,
                "VALUE": ""
            }]
        }
    },
    function(result) {
        if (result.error())
            console.error(result.error());
        else {
            console.info(result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}