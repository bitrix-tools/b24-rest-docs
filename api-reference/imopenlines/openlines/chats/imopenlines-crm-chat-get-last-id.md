# Получить Id последнего чата

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Название метода: **imopenlines.crm.chat.getLastId**
>
> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает `ID` последнего чата, который привязан к CRM сущности.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** | **С версии** ||
|| **CRM_ENTITY_TYPE***
[`unknown`](../../../data-types.md) | Тип CRM сущности: 
- LEAD — лид
- DEAL — сделка
- COMPANY — компания
- CONTACT — контакт
 | ||
|| **CRM_ENTITY***
[`unknown`](../../../data-types.md) | Идентификатор CRM сущности | ||
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
    function crmChatGetLastId() {
        var params = {
            CRM_ENTITY_TYPE: 'LEAD',
            CRM_ENTITY: 1,
        };
        BX24.callMethod(
            'imopenlines.crm.chat.getLastId',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP

    // пример для php

{% endlist %}