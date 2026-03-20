# Получить SIP-линии приложения voximplant.sip.get

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.get` возвращает список SIP-линий, созданных текущим приложением.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILTER**
[`object`](../../../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Смотрите ниже [список доступных полей для фильтрации](#filterable).

Поддерживаемые операторы в ключе фильтра:
- `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `><` — между (диапазон, включительно)
- `!><` — не между (вне диапазона)
- `?` — поиск по строке
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `%` — LIKE, поиск по подстроке
- `!%` — NOT LIKE, поиск по подстроке

По умолчанию — без фильтрации.

Метод всегда добавляет системный фильтр по `APP_ID` текущего приложения ||
|| **SORT**
[`string`](../../../data-types.md) | Поле сортировки.

Используются поля из [списка полей для фильтрации](#filterable).

По умолчанию — без сортировки ||
|| **ORDER**
[`string`](../../../data-types.md) | Направление сортировки.

Возможные значения:
- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию

По умолчанию — без сортировки ||
|| **start**
[`integer`](../../../data-types.md) | Параметр постраничной навигации.

Размер страницы результатов — 50 записей.

Чтобы получить вторую страницу, передайте `50`; третью — `100` и так далее.

Формула:

`start = (N - 1) * 50`, где `N` — номер страницы ||
|#

### Доступные поля для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Внутренний идентификатор записи SIP-линии.

В ответе метода поле не возвращается ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип АТС.

Возможные значения:

- `cloud` — облачная АТС
- `office` — офисная АТС ||
|| **TITLE**
[`string`](../../../data-types.md) | Название подключения ||
|| **CONFIG_ID**
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии ||
|| **REG_ID**
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации.

Актуально для облачной АТС ||
|| **APP_ID**
[`string`](../../../data-types.md) | Идентификатор приложения.

Фильтр по этому полю принудительно ограничивается текущим приложением ||
|| **SERVER**
[`string`](../../../data-types.md) | Адрес сервера SIP-регистрации ||
|| **LOGIN**
[`string`](../../../data-types.md) | Логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Пароль для подключения к серверу ||
|| **INCOMING_SERVER**
[`string`](../../../data-types.md) | Адрес сервера для входящих звонков.

Актуально для офисной АТС ||
|| **INCOMING_LOGIN**
[`string`](../../../data-types.md) | Логин для входящих звонков.

Актуально для офисной АТС ||
|| **INCOMING_PASSWORD**
[`string`](../../../data-types.md) | Пароль для входящих звонков.

Актуально для офисной АТС ||
|| **AUTH_USER**
[`string`](../../../data-types.md) | Имя пользователя для авторизации ||
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
[`integer`](../../../data-types.md) | Код статуса SIP-регистрации ||
|| **REGISTRATION_ERROR_MESSAGE**
[`string`](../../../data-types.md) | Текст ошибки SIP-регистрации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"CONFIG_ID":[3,7,9]},"SORT":"CONFIG_ID","ORDER":"ASC"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"CONFIG_ID":[3,7,9]},"SORT":"CONFIG_ID","ORDER":"ASC","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.sip.get',
            {
                FILTER: {
                    CONFIG_ID: [3, 7, 9]
                },
                SORT: 'CONFIG_ID',
                ORDER: 'ASC'
            }
        );
        
        const result = response.getData().result;
        console.log('Fetched SIP data:', result);
        processResult(result);
    }
    catch( error )
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
                'voximplant.sip.get',
                [
                    'FILTER' => [
                        'CONFIG_ID' => [3, 7, 9]
                    ],
                    'SORT' => 'CONFIG_ID',
                    'ORDER' => 'ASC'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching SIP data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.get',
        {
            FILTER: {
                CONFIG_ID: [3, 7, 9]
            },
            SORT: 'CONFIG_ID',
            ORDER: 'ASC'
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
        'voximplant.sip.get',
        [
            'FILTER' => [
                'CONFIG_ID' => [3, 7, 9]
            ],
            'SORT' => 'CONFIG_ID',
            'ORDER' => 'ASC'
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
        "TYPE": "cloud",
        "CONFIG_ID": "3",
        "REG_ID": "150907",
        "SERVER": "sipnet.ru",
        "LOGIN": "0045281811",
        "PASSWORD": "N7K4mCG9",
        "AUTH_USER": "",
        "OUTBOUND_PROXY": "",
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "200",
        "REGISTRATION_ERROR_MESSAGE": "",
        "TITLE": "SIP line"
        },
        {
        "TYPE": "office",
        "CONFIG_ID": "7",
        "SERVER": "office.provider.local",
        "LOGIN": "office_user",
        "PASSWORD": "secret",
        "INCOMING_SERVER": "ip.b24-6068-1537535782.bitrixphone.com",
        "INCOMING_LOGIN": "sip7",
        "INCOMING_PASSWORD": "71747523265mb091225eb31996a4a225",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "0",
        "REGISTRATION_ERROR_MESSAGE": null,
        "TITLE": "Office PBX 1"
        },
        {
        "TYPE": "cloud",
        "CONFIG_ID": "9",
        "REG_ID": "151083",
        "SERVER": "sip.provider.com",
        "LOGIN": "sip_user",
        "PASSWORD": "secret",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "502",
        "REGISTRATION_ERROR_MESSAGE": "Unable to resolve hostname",
        "TITLE": ""
        }
    ],
    "total": 3,
    "time": {
        "start": 1773662224,
        "finish": 1773662224.187874,
        "duration": 0.18787407875061035,
        "processing": 0,
        "date_start": "2026-03-16T14:57:04+03:00",
        "date_finish": "2026-03-16T14:57:04+03:00",
        "operating_reset_at": 1773662824,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив записей SIP-линий, созданных текущим приложением. Состав записей зависит от условий `FILTER`.

Пустой массив означает, что записи, соответствующие условиям `FILTER`, отсутствуют ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество записей в выборке ||
|| **next**
[`integer`](../../../data-types.md) | Смещение следующей страницы (если есть) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для получения списка SIP-линий ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)
