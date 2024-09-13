# Событие смены статуса звонка CallCard::CallStateChanged

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- уточнить права и скоуп
- добавлен нестандартный блок "Подписка на событие"
- нестандартный блок "Что получает обработчик"

{% endnote %}

{% endif %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `CallCard::CallStateChanged` возникает при смене состояния текущего звонка.

## Что получает обработчик

В обработчик передаются указанные ниже аргументы.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **PHONE_NUMBER***
[`callState`](../../../data-types.md) |  Текущее состояние звонка (`idle`, `connecting`, `connected`) ||
|| **additionalParams**
[`object`](../../../data-types.md) | Объект с дополнительными полями ||
|#

### Параметр data[]

#|
|| **Параметр**
`тип` | **Описание** ||
|| **failedCode**
[`string`](../../../data-types.md) | Код завершения звонка. Передается только в случае неуспешного завершения звонка при переходе в состояние `idle` ||
|#

## Подписка на событие

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"CallCard::CallStateChanged","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/placement.bindEvent"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"CallCard::CallStateChanged","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/placement.bindEvent?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.bindEvent("CallCard::CallStateChanged", function (callState) {
        console.log(callState);
    });
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bindEvent',
        [
            'PLACEMENT' => 'CallCard::CallStateChanged',
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
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
