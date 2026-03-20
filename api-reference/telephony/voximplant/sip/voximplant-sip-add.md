# Создать SIP-линию voximplant.sip.add

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.add` создает новую SIP-линию с привязкой к приложению.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SERVER***
[`string`](../../../data-types.md) | Адрес сервера SIP-регистрации ||
|| **LOGIN***
[`string`](../../../data-types.md) | Логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Пароль для подключения к серверу. Максимальная длина — 100 символов.

Необязателен для вызова метода, но необходим для рабочей регистрации у оператора ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип АТС.

Возможные значения:

- `cloud` - облачная АТС
- `office` - офисная АТС

По умолчанию: `cloud` ||
|| **TITLE**
[`string`](../../../data-types.md) | Название подключения.

Если параметр не передан, в интерфейсе для линии будет отображаться системное название по типу подключения:

- для `cloud` — Облачная АТС (ID)
- для `office` — Офисная АТС (ID)

где `ID` — внутренний идентификатор записи SIP-линии.

Поле `TITLE` в ответе метода при этом будет пустым ||
|#

{% note info "" %}

Можно подключить не более 10 облачных SIP-линий. При превышении лимита метод возвращает ошибку `MAX_CLOUD_PBX`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TYPE":"cloud","TITLE":"SIP line 1","SERVER":"sip.provider.com","LOGIN":"sip_user","PASSWORD":"secret"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TYPE":"cloud","TITLE":"SIP line 1","SERVER":"sip.provider.com","LOGIN":"sip_user","PASSWORD":"secret","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.sip.add',
            {
                TYPE: 'cloud',
                TITLE: 'SIP line 1',
                SERVER: 'sip.provider.com',
                LOGIN: 'sip_user',
                PASSWORD: 'secret'
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
                'voximplant.sip.add',
                [
                    'TYPE' => 'cloud',
                    'TITLE' => 'SIP line 1',
                    'SERVER' => 'sip.provider.com',
                    'LOGIN' => 'sip_user',
                    'PASSWORD' => 'secret',
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
        'voximplant.sip.add',
        {
            TYPE: 'cloud',
            TITLE: 'SIP line 1',
            SERVER: 'sip.provider.com',
            LOGIN: 'sip_user',
            PASSWORD: 'secret'
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
        'voximplant.sip.add',
        [
            'TYPE' => 'cloud',
            'TITLE' => 'SIP line 1',
            'SERVER' => 'sip.provider.com',
            'LOGIN' => 'sip_user',
            'PASSWORD' => 'secret',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}


## Обработка ответа

HTTP-статус: **200**

### Пример ответа при создании облачной АТС

```json
{
    "result": {
        "ID": "5",
        "TYPE": "cloud",
        "CONFIG_ID": "5",
        "REG_ID": 151082,
        "TITLE": "SIP line 1",
        "SERVER": "sip.provider.com",
        "LOGIN": "sip_user",
        "PASSWORD": "secret",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": null,
        "REGISTRATION_ERROR_MESSAGE": null
    },
    "time": {
        "start": 1773654128,
        "finish": 1773654129.048472,
        "duration": 1.0484719276428223,
        "processing": 1,
        "date_start": "2026-03-16T12:42:08+03:00",
        "date_finish": "2026-03-16T12:42:09+03:00",
        "operating_reset_at": 1773654728,
        "operating": 0.2883341312408447
    }
}
```

### Пример ответа при создании офисной АТС

```json
{
    "result": {
        "ID": "7",
        "TYPE": "office",
        "CONFIG_ID": "7",
        "SERVER": "office.provider.local",
        "LOGIN": "office_user",
        "PASSWORD": "secret",
        "INCOMING_SERVER": "ip.b24-6058-1587535982.bitrixphone.com",
        "INCOMING_LOGIN": "sip7",
        "INCOMING_PASSWORD": "71747503265fb091223eb31776a4a225",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": null,
        "REGISTRATION_ERROR_MESSAGE": null,
        "TITLE": "Office PBX 1"
    },
    "time": {
        "start": 1773654928,
        "finish": 1773654928.708338,
        "duration": 0.7083380222320557,
        "processing": 0,
        "date_start": "2026-03-16T12:55:28+03:00",
        "date_finish": "2026-03-16T12:55:28+03:00",
        "operating_reset_at": 1773655528,
        "operating": 0.24362492561340332
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с созданной SIP-линией ||
|| **ID**
[`string`](../../../data-types.md) | Внутренний идентификатор записи SIP-линии ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип АТС ||
|| **CONFIG_ID**
[`string`](../../../data-types.md) | Идентификатор настройки SIP-линии ||
|| **REG_ID**
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации.

Возвращается при создании облачной АТС ||
|| **TITLE**
[`string`](../../../data-types.md) | Название подключения ||
|| **SERVER**
[`string`](../../../data-types.md) | Адрес сервера SIP-регистрации ||
|| **LOGIN**
[`string`](../../../data-types.md) | Логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Пароль для подключения к серверу ||
|| **AUTH_USER**
[`string`](../../../data-types.md) | Пользователь для SIP-авторизации ||
|| **OUTBOUND_PROXY**
[`string`](../../../data-types.md) | Адрес SIP-прокси для исходящего подключения к оператору или АТС ||
|| **DETECT_LINE_NUMBER**
[`string`](../../../data-types.md) | Признак определения номера линии.

Возможные значения:

- `Y` — определение номера линии включено
- `N` — определение номера линии выключено ||
|| **LINE_DETECT_HEADER_ORDER**
[`string`](../../../data-types.md) | Порядок заголовков для определения номера линии ||
|| **REGISTRATION_STATUS_CODE**
[`integer`](../../../data-types.md) | Код статуса регистрации SIP-линии ||
|| **REGISTRATION_ERROR_MESSAGE**
[`string`](../../../data-types.md) | Текст ошибки SIP-регистрации ||
|| **INCOMING_SERVER**
[`string`](../../../data-types.md) | Адрес сервера для входящих звонков.

Возвращается при создании офисной АТС ||
|| **INCOMING_LOGIN**
[`string`](../../../data-types.md) | Логин для входящих звонков.

Возвращается при создании офисной АТС ||
|| **INCOMING_PASSWORD**
[`string`](../../../data-types.md) | Пароль для входящих звонков.

Возвращается при создании офисной АТС ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHECK_FIELDS_ERROR",
    "error_description": "Не указан адрес сервера"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHECK_FIELDS_ERROR` | `Не указан адрес сервера` | Не указан обязательный параметр `SERVER` ||
|| `CHECK_FIELDS_ERROR` | `Не указан логин для подключения к серверу` | Не указан обязательный параметр `LOGIN` ||
|| `CHECK_FIELDS_ERROR` | `Пароль для подключения к серверу не может быть более 100 символов` | Превышен лимит значения для параметра `PASSWORD` ||
|| `TITLE_EXISTS` | `Указанное название подключения уже зарегистрировано в системе` | Линия с таким названием уже существует ||
|| `MAX_CLOUD_PBX` | `Вы не можете подключить более 10 виртуальных АТС.` | Превышен лимит облачных SIP-линий ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для создания SIP-линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)