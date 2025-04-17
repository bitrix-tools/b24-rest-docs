# Обновить существующую кассу sale.cashbox.update

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод обновляет существующую кассу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_cashbox.ID`](../data-types.md#sale_cashbox) | Идентификатор обновляемой кассы ||
|| **FIELDS***
[`object`](../../data-types.md) | Значения обновляемых полей (подробное описание приведено [ниже](#fields)) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название кассы ||
|| **EMAIL**
[`string`](../../data-types.md) | Адрес электронной почты, на который будут отправляться уведомления в случае возникновения ошибок при печати чеков ||
|| **OFD**
[`string`](../../data-types.md) | Код обработчика ОФД. Доступные обработчики ОФД: 
- `bx_firstofd` — Первый ОФД 
- `bx_platformaofd` — Платформа ОФД 
- `bx_yarusofd` — ОФД ЯРУС 
- `bx_taxcomofd` — Такском ОФД 
- `bx_ofdruofd` — OFD.RU 
- `bx_tenzorofd` — Тензор ОФД 
- `bx_conturofd` — Контур ОФД

По умолчанию без ОФД
||
|| **OFD_SETTINGS**
[`object`](../../data-types.md) | Настройки ОФД (подробное описание приведено [ниже](#ofd_settings)) 
||
|| **NUMBER_KKM**
[`string`](../../data-types.md) | Внешний идентификатор кассы ||
|| **ACTIVE**
[`string`](../../data-types.md) со значением `Y/N` | Активность кассы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **USE_OFFLINE**
[`string`](../../data-types.md) | Используется ли касса офлайн. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SETTINGS**
[`object`](../../data-types.md) | Настройки кассы в соответствии со структурой настроек, переданной в ключе `CONFIG` поля `SETTINGS` метода [sale.cashbox.handler.add](./sale-cashbox-handler-add.md) ||
|#

### Параметр OFD_SETTINGS {#ofd_settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Настройки для всех ОФД** |  ||
|| **OFD_MODE**
[`object`](../../data-types.md) | Настройки, относящиеся к режиму работы ОФД. Передается параметр `IS_TEST` ([`string`](../../data-types.md) со значениями `Y/N`) — режим работы ОФД: 
- `Y` — тестовый режим 
- `N` — рабочий режим ||
|| **Дополнительные настройки для OFD.RU** |  ||
|| **SELLER_INFO**
[`object`](../../data-types.md) | Настройки раздела «Информация о продавце». Передается обязательный параметр `INN` ([`string`](../../data-types.md)) — ИНН продавца
||
|| **Дополнительные настройки для ОФД ЯРУС** |  ||
|| **AUTH**
[`object`](../../data-types.md) | Настройки авторизации. Передается параметр `INN` ([`string`](../../data-types.md)) — ключ безопасности
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Новое имя"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.cashbox.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"FIELDS":{"NAME":"Новое имя"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.update
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.cashbox.update",
        {
            "ID": 1,
            "FIELDS": {
                "NAME": "Новое имя",
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.cashbox.update',
        [
            'ID' => 1,
            'FIELDS' =>
            [
                'NAME' => 'Новое имя',
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
[`boolean`](../../data-types.md) | Результат обновления полей кассы ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CASHBOX_NOT_FOUND",
    "error_description": "Cashbox not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для обновления кассы либо приложение пытается изменить кассу, добавленную другим приложением | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение полей `ID` или `FIELDS` | 400 ||
|| `ERROR_CASHBOX_NOT_FOUND` | Касса с указанным `ID` не найдена | 400 ||
|| `ERROR_CASHBOX_UPDATE` | Прочие ошибки. Более подробную информацию об ошибке можно найти в `error_description` | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-add.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)