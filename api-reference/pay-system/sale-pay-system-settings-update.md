# Обновить настройки платежной системы sale.paysystem.settings.update

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод обновляет настройки платежной системы. Структура настроек задается при добавлении обработчика платежной системы в методе [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) в ключе `CODES` параметра `SETTINGS`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы, для которой нужно получить настройки
||
|| **PERSON_TYPE_ID**
[`sale_person_type.id`](../sale/data-types.md) | Идентификатор типа плательщика, для которого нужно получить настройки
||
|| **SETTINGS***
[`object`](../data-types.md) | Настройки, которые нужно обновить. Ключами выступают названия настроек, значениями — объекты, структура которых описана [ниже](#parametr-settings)
||
|#

### Параметр SETTINGS

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../data-types.md) | Источник значения параметра ||
|| **VALUE**
[`string`](../data-types.md) | Код параметра у источника либо значение параметра (для `TYPE="VALUE"`) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":11,"PERSON_TYPE_ID":1,"SETTINGS":{"REST_SERVICE_KEY_IFRAME":{"TYPE":"VALUE","VALUE":"NEW_KEY"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.settings.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":11,"PERSON_TYPE_ID":1,"SETTINGS":{"REST_SERVICE_KEY_IFRAME":{"TYPE":"VALUE","VALUE":"NEW_KEY"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.settings.update
    ```

- JS

    ```js
    BX24.callMethod('sale.paysystem.settings.update', {
        'ID': 11,
        'PERSON_TYPE_ID': 1,
        'SETTINGS': {
            'REST_SERVICE_KEY_IFRAME': {
                'TYPE': 'VALUE',
                'VALUE': 'NEW_KEY',
            }
        }
    }, 
    function(result) 
    { 
        if(result.error()) 
            console.error(result.error()); 
        else 
        { 
            console.dir(result.data()); 
        } 
    } 
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.settings.update',
        [
            'ID' => 11,
            'PERSON_TYPE_ID' => 1,
            'SETTINGS' => [
                'REST_SERVICE_KEY_IFRAME' => [
                    'TYPE' => 'VALUE',
                    'VALUE' => 'NEW_KEY',
                ]
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
    "result": true,
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат обновления настроек платежной системы ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": " ERROR_CHECK_FAILURE",
    "error_description": "Pay system not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для чтения настроек | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение одного из обязательных полей либо не найдена указанная платежная система (детали смотрите в описании ошибки) | 400 ||
|| `ERROR_HANDLER_NOT_FOUND` | Не указано значение поля `SETTINGS` либо передан пустой объект | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-pay-invoice.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
- [{#T}](./sale-pay-system-settings-invoice-get.md)