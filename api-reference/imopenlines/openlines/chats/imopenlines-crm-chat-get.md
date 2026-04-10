# Получить чаты для объекта CRM imopenlines.crm.chat.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к объекту CRM

Метод `imopenlines.crm.chat.get` получает список чатов, которые привязаны к объекту CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип объекта CRM. Возможные значения:
- `lead` — лид
- `deal` — сделка
- `company` — компания
- `contact` — контакт
||
|| **CRM_ENTITY***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM.

Получить идентификатор можно универсальным методом [получения списка элементов CRM](../../../crm/universal/crm-item-list.md) ||
|| **ACTIVE_ONLY**
[`char`](../../../data-types.md) | Флаг возврата только активных чатов. Возможные значения:
- `Y` — вернуть только активные чаты
- `N` — вернуть все чаты

По умолчанию — `Y`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"ACTIVE_ONLY":"N"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"ACTIVE_ONLY":"N","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.crm.chat.get',
            {
                CRM_ENTITY_TYPE: 'lead',
                CRM_ENTITY: 1205,
                ACTIVE_ONLY: 'N'
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.get',
                [
                    'CRM_ENTITY_TYPE' => 'lead',
                    'CRM_ENTITY' => 1205,
                    'ACTIVE_ONLY' => 'N',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.get',
        {
            CRM_ENTITY_TYPE: 'lead',
            CRM_ENTITY: 1205,
            ACTIVE_ONLY: 'N'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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
        'imopenlines.crm.chat.get',
        [
            'CRM_ENTITY_TYPE' => 'lead',
            'CRM_ENTITY' => 1205,
            'ACTIVE_ONLY' => 'N',
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "CHAT_ID": "1763",
            "CONNECTOR_ID": "livechat",
            "CONNECTOR_TITLE": "Онлайн-чат"
        }
    ],
    "time": {
        "start": 1773758908,
        "finish": 1773758908.592458,
        "duration": 0.5924580097198486,
        "processing": 0,
        "date_start": "2026-03-17T17:48:28+03:00",
        "date_finish": "2026-03-17T17:48:28+03:00",
        "operating_reset_at": 1773759508,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Список объектов чатов [(подробное описание)](#result-item).

Возвращает пустой массив `"result":[]`, если объекта с указанным `CRM_ENTITY` не существует ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID**
[`string`](../../../data-types.md) | Идентификатор чата ||
|| **CONNECTOR_ID**
[`string`](../../../data-types.md) | Идентификатор коннектора ||
|| **CONNECTOR_TITLE**
[`string`](../../../data-types.md) | Название коннектора ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument CRM_ENTITY is null or empty"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! You dont have access to this action | У пользователя нет доступа к объекту CRM ||
|| `400` | `ERROR_ARGUMENT` | Argument CRM_ENTITY_TYPE is null or empty | Не передан или передан пустым обязательный параметр `CRM_ENTITY_TYPE` ||
|| `400` | `ERROR_ARGUMENT` | Argument CRM_ENTITY is null or empty | Не передан или передан пустым обязательный параметр `CRM_ENTITY` ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument CRM_ENTITY has an invalid type | Параметр `CRM_ENTITY` передан в неверном формате ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-crm-chat-get-last-id.md)
- [{#T}](./imopenlines-crm-chat-user-add.md)
- [{#T}](./imopenlines-crm-chat-user-delete.md)
