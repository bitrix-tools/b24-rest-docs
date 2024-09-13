# Получить статус звонка getStatus

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- уточнить права и скоуп
- в блоке "Обработка ответа" нет примера
- нет блока "Обработка ошибок"

{% endnote %}

{% endif %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает информацию о текущем звонке.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Вызов метода плейсмента. Результат приходит в колбэке.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"getStatus","PARAMS":{}}' \
    "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/placement.call"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"getStatus","PARAMS":{}}' \
    "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call('getStatus', {}, function (result) {
        console.log(result);
    });
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.call',
        [
            'PLACEMENT' => 'getStatus',
            'PARAMS' => (object)[]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../data-types.md) | id текущего звонка ||
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер телефона клиента ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип связанного со звонком объекта CRM (`CONTACT`, `LEAD`, `COMPANY`) ||
|| **CRM_ENTITY_ID**
[`int`](../../../data-types.md) | id связанного со звонком объекта CRM ||
|| **CRM_ACTIVITY_ID**
[`int`](../../../data-types.md) | id дела CRM, связанного со звонком ||
|| **CALL_DIRECTION**
[`string`](../../../data-types.md) | Направление звонка (`incoming`, `outgoing`, `incomingTransfer`, `callback`) ||
|| **CALL_LIST_MODE**
[`bool`](../../../data-types.md) | Признак работы в режиме обзвона ||
|| **CRM_BINDINGS** | Массив привязок звонка к объектам CRM ||
|#

## Продолжите изучение

- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
