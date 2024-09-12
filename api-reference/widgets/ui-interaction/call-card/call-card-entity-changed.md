# Событие смены клиента CallCard::EntityChanged

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- уточнить права и скоуп
- добавлен нестандартный блок "Подписка на событие"
- нестандартный блок "Что получает обработчик"
- не указана обязательность передаваемых параметров

{% endnote %}

{% endif %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `CallCard::EntityChanged` возникает при смене текущего клиента в режиме обзвона.

## Что получает обработчик

В обработчик события передается объект с указанными ниже полями.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер телефона клиента ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип связанного со звонком объекта CRM (`CONTACT`, `LEAD`, `COMPANY`) ||
|| **CRM_ENTITY_ID**
[`int`](../../../data-types.md) | id связанного со звонком объекта CRM ||
|#

## Подписка на событие

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"CallCard::EntityChanged","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/placement.bindEvent"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"CallCard::EntityChanged","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/placement.bindEvent?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.bindEvent("CallCard::EntityChanged", function (callState) {
        console.log(callState);
    });
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bindEvent',
        [
            'PLACEMENT' => 'CallCard::EntityChanged',
            'HANDLER' => '**your_handler_url_here**'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./get-status.md)
- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
