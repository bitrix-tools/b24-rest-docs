# Получить настройки пользователей voximplant.user.get

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Настройки пользователя — Изменение

Метод `voximplant.user.get` возвращает настройки пользователей.

Для приложений вызов метода требует [подтверждения администратора](../../../scopes/confirmation.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID***
[`integer/array`](../../../data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей.

Получить идентификатор можно методом [user.get](../../../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":[1269, 1271]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":[1269, 1271],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.user.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.user.get',
            {
                USER_ID: [1269, 1271]
            }
        );

        const result = response.getData().result;
        console.log('Data:', result);
    }
    catch (error)
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'voximplant.user.get',
                [
                    'USER_ID' => [1269, 1271],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.user.get',
        {
            USER_ID: [1269, 1271]
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'voximplant.user.get',
        [
            'USER_ID' => [1269, 1271],
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
    "result": [
        {
        "ID": "1269",
        "DEFAULT_LINE": null,
        "PHONE_ENABLED": "Y",
        "SIP_SERVER": "ip.b24-6059-1584795982.bitrixphone.com",
        "SIP_LOGIN": "phone1269",
        "SIP_PASSWORD": "28fec473a88a",
        "INNER_NUMBER": null
        },
        {
        "ID": "1271",
        "DEFAULT_LINE": null,
        "PHONE_ENABLED": "Y",
        "SIP_SERVER": "ip.b24-6059-158475982.bitrixphone.com",
        "SIP_LOGIN": "phone1271",
        "SIP_PASSWORD": null,
        "INNER_NUMBER": null
        }
    ],
    "time": {
        "start": 1773667386,
        "finish": 1773667386.23801,
        "duration": 0.23800992965698242,
        "processing": 0,
        "date_start": "2026-03-16T16:23:06+03:00",
        "date_finish": "2026-03-16T16:23:06+03:00",
        "operating_reset_at": 1773667986,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Массив настроек пользователей ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор пользователя ||
|| **DEFAULT_LINE**
[`string`](../../../data-types.md) | Номер исходящей линии по умолчанию ||
|| **PHONE_ENABLED**
[`string`](../../../data-types.md) | Признак наличия SIP-аппарата.

Возможные значения:
- `Y` — SIP-аппарат у пользователя активирован
- `N` — SIP-аппарат у пользователя не активирован ||
|| **SIP_SERVER**
[`string`](../../../data-types.md) | Адрес сервера для подключения SIP-аппарата ||
|| **SIP_LOGIN**
[`string`](../../../data-types.md) | Логин для подключения SIP-аппарата ||
|| **SIP_PASSWORD**
[`string`](../../../data-types.md) | Пароль для подключения SIP-аппарата ||
|| **INNER_NUMBER**
[`string`](../../../data-types.md) | Внутренний номер пользователя ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **401**, **403**

```json
{
    "error": "METHOD_CONFIRM_WAITING",
    "error_description": "Waiting for confirmation"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Parameter USER_ID is not set` | Не указан обязательный параметр `USER_ID` ||
|| `METHOD_CONFIRM_WAITING` | `Waiting for confirmation` | Ожидается подтверждение администратора портала на вызов метода ||
|| `METHOD_CONFIRM_DENIED` | `Method call denied` | Администратор запретил вызов метода для текущего токена ||
|| `ACCESS_DENIED` | `Access denied! You have no permission to query selected users` | Недостаточно прав для получения настроек пользователей ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-user-get.md)
- [{#T}](./voximplant-user-activate-phone.md)
- [{#T}](../../../scopes/confirmation.md)
