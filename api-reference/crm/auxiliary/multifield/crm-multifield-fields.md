# Получить описание множественных полей crm.multifield.fields

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
crm.multifield.fields()
```

Возвращает описание множественных полей. Множественные поля применяются для хранения телефонов, email-адресов и другой контактной информации. В лидах, контактах и компаниях полями этого типа являются PHONE, EMAIL, WEB и IM.

## Параметры

Без параметров.

## Пример

```json
{'LEAD': [1, 2, 3], 'CONTACT': [4, 5, 6], 'COMPANY': [7, 8, 9]}
```

## Пример поиска контакта по телефону:

```javascript
BX24.callMethod(
    "crm.multifield.fields",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}