# Установить исходящую SIP-линию voximplant.line.outgoing.sip.set

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.line.outgoing.sip.set` устанавливает SIP-линию в качестве исходящей линии по умолчанию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии.

Получить идентификатор можно с помощью метода [voximplant.sip.get](../sip/voximplant-sip-get.md)  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":9}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.line.outgoing.sip.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":9,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.line.outgoing.sip.set
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.line.outgoing.sip.set',
            {
                CONFIG_ID: 9
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
                'voximplant.line.outgoing.sip.set',
                [
                    'CONFIG_ID' => 9,
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
        'voximplant.line.outgoing.sip.set',
        {
            CONFIG_ID: 9
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
        'voximplant.line.outgoing.sip.set',
        [
            'CONFIG_ID' => 9,
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
    "result": 1,
    "time": {
        "start": 1773665506,
        "finish": 1773665506.748929,
        "duration": 0.7489290237426758,
        "processing": 0,
        "date_start": "2026-03-16T15:51:46+03:00",
        "date_finish": "2026-03-16T15:51:46+03:00",
        "operating_reset_at": 1773666106,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Результат выполнения метода.

`1` — SIP-линия установлена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Specified CONFIG_ID is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | `Specified CONFIG_ID is not found` | SIP-линия с указанным `CONFIG_ID` не найдена ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для изменения исходящей SIP-линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-line-get.md)
- [{#T}](./voximplant-line-outgoing-get.md)
- [{#T}](./voximplant-line-outgoing-set.md)
- [{#T}](./voximplant-line-outgoing-sip-set.md)
