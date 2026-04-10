# После создания карточки звонка BackgroundCallCard::initialized

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `BackgroundCallCard::initialized` возникает после создания карточки звонка и передачи стартовых данных.

{% note info "" %}

Событие работает в контексте приложения в плейсменте `PAGE_BACKGROUND_WORKER`.

{% endnote %}

## Что получает обработчик

Данные передаются в callback `BX24.placement.bindEvent` {.b24-info}

```js
callback({
    "CALL_ID": "E45D40253D1C2D2F.1774588815.822533",
    "PHONE_NUMBER": "+79001234567",
    "LINE_NUMBER": "reg151083",
    "LINE_NAME": "",
    "CRM_ENTITY_TYPE": "CONTACT",
    "CRM_ENTITY_ID": 123,
    "CRM_ACTIVITY_ID": 456,
    "CRM_BINDINGS": [{"ENTITY_TYPE": "DEAL", "ENTITY_ID": 789}],
    "CALL_DIRECTION": "outgoing",
    "CALL_STATE": "idle",
    "CALL_LIST_MODE": false
});
```

## Параметры обработчика события

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../../data-types.md) | Идентификатор звонка ||
|| **PHONE_NUMBER**
[`string`](../../../../data-types.md) | Номер клиента ||
|| **LINE_NUMBER**
[`string`](../../../../data-types.md) | Номер линии ||
|| **LINE_NAME**
[`string`](../../../../data-types.md) | Название линии ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../../data-types.md) | Тип текущего объекта CRM ||
|| **CRM_ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор текущего объекта CRM ||
|| **CRM_ACTIVITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор CRM-дела ||
|| **CRM_BINDINGS**
[`object[]`](../../../../data-types.md) | Привязки звонка к объектам CRM [(подробное описание)](#crm_bindings) ||
|| **CALL_DIRECTION**
[`string`](../../../../data-types.md) | Направление звонка ||
|| **CALL_STATE**
[`string`](../../../../data-types.md) | Состояние звонка ||
|| **CALL_LIST_MODE**
[`boolean`](../../../../data-types.md) | Признак режима обзвона ||
|#
### Параметр CRM_BINDINGS{#crm_bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../../../data-types.md) | Тип объекта CRM ||
|| **ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор объекта CRM ||
|#

## Параметры подписки на событие

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../../data-types.md) | Имя события интерфейса.

Для данного события — `BackgroundCallCard::initialized` ||
|| **HANDLER***
[`string`](../../../../data-types.md) | URL обработчика события для вызова `placement.bindEvent` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"BackgroundCallCard::initialized","HANDLER":"**your_handler_url_here**"}' \
    "https://**put_your_bitrix24_address**/rest/placement.bindEvent?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.bindEvent('BackgroundCallCard::initialized', function (eventData) {
        console.log(eventData);
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
                    'PLACEMENT' => 'BackgroundCallCard::initialized',
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
            PLACEMENT: 'BackgroundCallCard::initialized',
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
            'PLACEMENT' => 'BackgroundCallCard::initialized',
            'HANDLER' => '**your_handler_url_here**'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../card.md)