# Событие смены статуса звонка CallCard::CallStateChanged

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `CallCard::CallStateChanged` возникает при смене состояния текущего звонка.

{% note info "" %}

Событие работает в контексте приложения в плейсменте `CALL_CARD`.

{% endnote %}

## Что получает обработчик

Данные передаются в callback `BX24.placement.bindEvent` {.b24-info}

```js
callback(
    "idle",
    {
        "failedCode": "486"
    }
);
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **callState***
[`string`](../../../data-types.md) | Текущее состояние звонка.

Возможные значения:

- `idle` — соединение отсутствует
- `connecting` — выполняется установка соединения
- `connected` — соединение установлено ||
|| **additionalParams**
[`object`](../../../data-types.md) | Дополнительные данные [(подробное описание)](#additional_params) ||
|#

### Параметр additionalParams{#additional_params}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **failedCode**
[`string`](../../../data-types.md) | Код завершения звонка. Передается только при неуспешном завершении, когда `callState = idle` ||
|#

## Параметры подписки на событие

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../data-types.md) | Имя события интерфейса.

Для данного события — `CallCard::CallStateChanged` ||
|| **HANDLER***
[`string`](../../../data-types.md) | URL обработчика события для вызова `placement.bindEvent` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"CallCard::CallStateChanged","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/placement.bindEvent?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.bindEvent('CallCard::CallStateChanged', function (callState, additionalParams) {
        console.log(callState, additionalParams);
    });
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bindEvent',
                [
                    'PLACEMENT' => 'CallCard::CallStateChanged',
                    'HANDLER' => '**your_handler_url_here**'
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
        'placement.bindEvent',
        {
            PLACEMENT: 'CallCard::CallStateChanged',
            HANDLER: '**your_handler_url_here**'
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
        'placement.bindEvent',
        [
            'PLACEMENT' => 'CallCard::CallStateChanged',
            'HANDLER' => '**your_handler_url_here**'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./get-status.md)
- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
