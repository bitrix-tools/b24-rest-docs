# Найти клиента в CRM по номеру телефона telephony.externalCall.searchCrmEntities

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.searchCrmEntities` возвращает CRM-объекты по номеру телефона клиента и данные ответственного сотрудника.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PHONE_NUMBER***
[`string`](../data-types.md) | Номер телефона клиента ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PHONE_NUMBER":"79062195047"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.searchCrmEntities
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PHONE_NUMBER":"79062195047","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.searchCrmEntities
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalCall.searchCrmEntities',
            {
                PHONE_NUMBER: '79062195047'
            }
        );
        
        const result = response.getData().result;
        console.log('CRM entities found:', result);
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
                'telephony.externalCall.searchCrmEntities',
                [
                    'PHONE_NUMBER' => '79062195047'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching CRM entities: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.searchCrmEntities",
        {
            PHONE_NUMBER: '79062195047'
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
        'telephony.externalCall.searchCrmEntities',
        [
            'PHONE_NUMBER' => '79062195047'
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
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 651,
        "ASSIGNED_BY_ID": 99,
        "NAME": "Иван Иванов",
        "ASSIGNED_BY": {
            "ID": "99",
            "TIMEMAN_STATUS": "CLOSED",
            "USER_PHONE_INNER": null,
            "WORK_PHONE": null,
            "PERSONAL_PHONE": null,
            "PERSONAL_MOBILE": "79062195047"
        }
        },
        {
        "CRM_ENTITY_TYPE": "COMPANY",
        "CRM_ENTITY_ID": 643,
        "ASSIGNED_BY_ID": 99,
        "NAME": "ООО Ромашка",
        "ASSIGNED_BY": {
            "ID": "99",
            "TIMEMAN_STATUS": "CLOSED",
            "USER_PHONE_INNER": null,
            "WORK_PHONE": null,
            "PERSONAL_PHONE": null,
            "PERSONAL_MOBILE": "79062195047"
        }
        }
    ],
    "time": {
        "start": 1772808159,
        "finish": 1772808159.397228,
        "duration": 0.3972280025482178,
        "processing": 0,
        "date_start": "2026-03-06T17:42:39+03:00",
        "date_finish": "2026-03-06T17:42:39+03:00",
        "operating_reset_at": 1772808759,
        "operating": 0.25037074089050293
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив найденных объектов CRM ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM.

Возможные значения:
- `CONTACT` — контакт
- `LEAD` — лид
- `COMPANY` — компания ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM ||
|| **ASSIGNED_BY_ID**
[`integer`](../data-types.md) | Идентификатор ответственного сотрудника ||
|| **NAME**
[`string`](../data-types.md) | Название или ФИО найденного объекта CRM ||
|| **ASSIGNED_BY**
[`object`](../data-types.md) | Данные [ответственного сотрудника](#result-assigned-by) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект ASSIGNED_BY {#result-assigned-by}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сотрудника ||
|| **TIMEMAN_STATUS**
[`string`](../data-types.md) | Статус рабочего времени сотрудника.

Возможные значения:
- `OPENED` — рабочий день начат
- `CLOSED` — рабочий день завершен
- `PAUSED` — перерыв
- `EXPIRED` — рабочий день истек
- `UNAVAILABLE` — учет рабочего времени отключен у сотрудника
- `NOT_INSTALLED` — модуль учета рабочего времени не установлен ||
|| **USER_PHONE_INNER**
[`string`](../data-types.md) | Внутренний номер сотрудника ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Рабочий телефон сотрудника ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон сотрудника ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Мобильный телефон сотрудника ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "PHONE_NUMBER is empty"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | PHONE_NUMBER is empty | Не передан обязательный параметр `PHONE_NUMBER` ||
|| `ERROR_CORE` | CRM is not installed. | На портале не установлен модуль CRM ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-show.md)
- [{#T}](./telephony-external-call-hide.md)
- [{#T}](./telephony-external-call-finish.md)