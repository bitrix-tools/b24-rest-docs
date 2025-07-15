# Обновить существующую ставку НДС crm.vat.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами администратора CRM

Метод `crm.vat.update` обновляет параметры существующей ставки НДС.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../../data-types.md) | Идентификатор ставки НДС, которую нужно обновить. Получить список ставок можно методом [crm.vat.list](./crm-vat-list.md) ||
|| **fields*** 
[`object`](../../../data-types.md) | Массив полей для обновления. Список доступных полей описан [ниже](#fields)  ||
|#

### Параметр fields {#fields}

#|
|| **Название**
 `тип` | **Описание** ||
|| **ACTIVE** 
[`string`](../../../data-types.md) | Активность ставки:
- `Y` — активна,
- `N` — неактивна.
||
|| **C_SORT** 
[`integer`](../../../data-types.md) | Сортировка||
|| **NAME***
[`string`](../../../data-types.md) | Название ставки ||
|| **RATE*** 
[`double`](../../../data-types.md) | Значение ставки НДС, % ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.vat.update",
        {
            id: 7,
            fields: {
                ACTIVE: "N",
                NAME: "НДС 20% (неактивна)"
            }
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":7,"fields":{"ACTIVE":"N","NAME":"НДС 20% (неактивна)"}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7,"fields":{"ACTIVE":"N","NAME":"НДС 20% (неактивна)"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.update
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.vat.update',
        [
            'id' => 7,
            'fields' => [
                'ACTIVE' => 'N',
                'NAME' => 'НДС 20% (неактивна)'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 13,
    "time": {
        "start": 1752045209.496356,
        "finish": 1752045209.539975,
        "duration": 0.04361891746520996,
        "processing": 0.009280920028686523,
        "date_start": "2025-07-09T10:13:29+03:00",
        "date_finish": "2025-07-09T10:13:29+03:00",
        "operating_reset_at": 1752045809,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит идентификатор обновленной ставки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid identifier.",
    "error_description": "Передан некорректный идентификатор."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `The Commercial Catalog module is not installed.` | Модуль catalog не установлен ||
|| `400`     | `Invalid parameters.` | Переданы некорректные параметры ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `Invalid identifier.` | Передан некорректный идентификатор ||
|| `400`     | `Error on updating VAT rate.` | Ошибка при обновлении ставки НДС ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-fields.md)
- [{#T}](./crm-vat-list.md)
- [{#T}](./crm-vat-get.md)
- [{#T}](./crm-vat-add.md)
- [{#T}](./crm-vat-delete.md) 