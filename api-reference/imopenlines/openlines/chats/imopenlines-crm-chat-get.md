# Получить чат для объекта CRM

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Название метода: **imopenlines.crm.chat.get**
>
> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает чат для объекта CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`unknown`](../../../data-types.md) | Тип CRM сущности 
- lead
- deal
- company
- contact
 ||
|| **CRM_ENTITY***
[`unknown`](../../../data-types.md) | Идентификатор CRM сущности ||
|#

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.get',
        {
            CRM_ENTITY_TYPE: 'deal',
            CRM_ENTITY: 288,
        }, function(result) {
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    // пример для php

{% endlist %}

## Ответ в случае успеха

Массив объектов с идентификатором чата, идентификатором коннектора и названием коннектора.

```json
{
    "result": [
        {
            "CHAT_ID": "9852",
            "CONNECTOR_ID": "livechat",
            "CONNECTOR_TITLE": "Онлайн-чат"
        }
    ]
}
```
## Ответ в случае ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа ||
|| **ERROR_ARGUMENT** | Один из аргументов не указан или указан неверно ||
|#