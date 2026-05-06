# Получить статус SIP-регистрации voximplant.sip.status

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.status` возвращает текущий статус SIP-регистрации для облачной АТС.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **REG_ID***
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации.

Идентификатор можно получить с помощью метода [voximplant.sip.get](./voximplant-sip-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REG_ID":150907}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.status
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REG_ID":150907,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.status
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.sip.status',
            {
                REG_ID: 150907
            }
        );
        
        const result = response.getData().result;
        console.log('Data:', result);
        
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
                'voximplant.sip.status',
                [
                    'REG_ID' => 150907
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.status',
        {
            REG_ID: 150907
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
        'voximplant.sip.status',
        [
            'REG_ID' => 150907
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
    "result": {
        "REG_ID": 150907,
        "LAST_UPDATED": "2026-03-12 09:10:51",
        "ERROR_MESSAGE": "",
        "STATUS_CODE": 200,
        "STATUS_RESULT": "success"
    },
    "time": {
        "start": 1773323644,
        "finish": 1773323644.70319,
        "duration": 0.7031900882720947,
        "processing": 0,
        "date_start": "2026-03-12T16:54:04+03:00",
        "date_finish": "2026-03-12T16:54:04+03:00",
        "operating_reset_at": 1773324244,
        "operating": 0.15053892135620117
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект со статусом SIP-регистрации ||
|| **REG_ID**
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации ||
|| **LAST_UPDATED**
[`string`](../../../data-types.md) | Дата и время последнего обновления статуса SIP-регистрации ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Текстовое описание ошибки регистрации ||
|| **STATUS_CODE**
[`integer`](../../../data-types.md) | Числовой код состояния или ошибки регистрации ||
|| **STATUS_RESULT**
[`string`](../../../data-types.md) | Результат регистрации.

Возможные значения:

- `success` — SIP-регистрация успешно выполнена
- `error` — при SIP-регистрации произошла ошибка
- `in_progress` — SIP-регистрация выполняется в данный момент
- `wait` — SIP-регистрация ожидает запуска ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "REG_ID_NOT_FOUND",
    "error_description": "Настройки не найдены"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `REG_ID_NOT_FOUND` | `Настройки не найдены` | SIP-регистрация с указанным `REG_ID` не найдена ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для получения статуса SIP-регистрации ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-connector-status.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-update.md)
