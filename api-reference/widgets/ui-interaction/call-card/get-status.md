# Получить статус звонка getStatus

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `getStatus` возвращает текущие данные карточки звонка.

{% note info "" %}

Метод работает в контексте приложения в плейсменте `CALL_CARD`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT***
[`string`](../../../data-types.md) | Имя команды интерфейса.

Для данного метода — `getStatus` ||
|| **PARAMS***
[`object`](../../../data-types.md) | Объект параметров команды.

Для данного метода передается пустой объект: `{}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PLACEMENT":"getStatus","PARAMS":{}}' \
    "https://**put_your_bitrix24_address**/rest/placement.call?auth=**put_access_token_here**"
    ```

- JS

    ```js
    BX24.placement.call('getStatus', {}, function (result) {
        console.log(result);
    });
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.call',
                [
                    'PLACEMENT' => 'getStatus',
                    'PARAMS' => []
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
        'placement.call',
        {
            PLACEMENT: 'getStatus',
            PARAMS: {}
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
        'placement.call',
        [
            'PLACEMENT' => 'getStatus',
            'PARAMS' => (object)[]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

```json
{
    "CALL_ID": "E45D40253D1C2D2F.1774588815.822533",
    "PHONE_NUMBER": "+79999996666",
    "LINE_NUMBER": "reg151083",
    "LINE_NAME": "",
    "CRM_ENTITY_TYPE": "CONTACT",
    "CRM_ENTITY_ID": 797,
    "CRM_ACTIVITY_ID": "",
    "CRM_BINDINGS": [
        {
        "ENTITY_TYPE": "DEAL",
        "ENTITY_ID": 4615
        },
        {
        "ENTITY_TYPE": "COMPANY",
        "ENTITY_ID": 643
        }
    ],
    "CALL_DIRECTION": "outgoing",
    "CALL_STATE": "idle",
    "CALL_LIST_MODE": false
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../data-types.md) | Идентификатор звонка ||
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер клиента ||
|| **LINE_NUMBER**
[`string`](../../../data-types.md) | Номер линии ||
|| **LINE_NAME**
[`string`](../../../data-types.md) | Название линии ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип текущего объекта CRM ||
|| **CRM_ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор текущего объекта CRM ||
|| **CRM_ACTIVITY_ID**
[`integer`](../../../data-types.md) | Идентификатор CRM-дела ||
|| **CRM_BINDINGS**
[`object[]`](../../../data-types.md) | Привязки звонка к объектам CRM [(подробное описание)](#crm_bindings) ||
|| **CALL_DIRECTION**
[`string`](../../../data-types.md) | Направление звонка.

Возможные значения:

- `incoming` — входящий звонок
- `outgoing` — исходящий звонок
- `callback` — обратный звонок ||
|| **CALL_STATE**
[`string`](../../../data-types.md) | Состояние звонка.

Возможные значения:

- `idle` — соединение отсутствует
- `connecting` — выполняется установка соединения
- `connected` — соединение установлено ||
|| **CALL_LIST_MODE**
[`boolean`](../../../data-types.md) | Признак режима обзвона ||
|#

### Параметр CRM_BINDINGS{#crm_bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта CRM ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|#

## Обработка ошибок

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Application context required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван вне контекста приложения в плейсменте `CALL_CARD` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
