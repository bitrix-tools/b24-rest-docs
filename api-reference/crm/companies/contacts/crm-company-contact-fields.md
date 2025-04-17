# Получить описание полей для связи компания-контакт crm.company.contact.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.contact.fields` возвращает для связи компания-контакт описание полей, используемых методами семейства `crm.company.contact.*`, то есть `crm.company.contact.items.get`, `crm.company.contact.items.set`, `crm.company.contact.add` и т.д.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS
  
    ```js
    BX24.callMethod(
        "crm.company.contact.fields",
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

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}