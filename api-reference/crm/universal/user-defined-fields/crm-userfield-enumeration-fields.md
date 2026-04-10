# Получить описание полей для пользовательского поля типа «enumeration» (список) crm.userfield.enumeration.fields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.enumeration.fields` возвращает описание полей для пользовательского поля типа "enumeration" (список).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.enumeration.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.enumeration.fields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.userfield.enumeration.fields",
    		{}
    	);

    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
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
                'crm.userfield.enumeration.fields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching CRM userfield enumeration fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.userfield.enumeration.fields",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.userfield.enumeration.fields',
        []
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
        "ID": {
            "type": "int",
            "title": "Ид",
            "isReadOnly": true
        },
        "SORT": {
            "type": "int",
            "title": "Сортировка"
        },
        "VALUE": {
            "type": "string",
            "title": "Значение"
        },
        "DEF": {
            "type": "string",
            "title": "Значение по умолчанию"
        },
        "DEL": {
            "type": "string",
            "title": "Флаг удаления элемента"
        }
    },
    "time": {
        "start": 1773992153,
        "finish": 1773992153.048253,
        "duration": 0.04825305938720703,
        "processing": 0,
        "date_start": "2026-03-20T10:35:53+03:00",
        "date_finish": "2026-03-20T10:35:53+03:00",
        "operating_reset_at": 1773992753,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с описанием полей [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор значения списка ||
|| **SORT**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **VALUE**
[`string`](../../data-types.md) | Значение элемента списка ||
|| **DEF**
[`string`](../../data-types.md) | Признак значения по умолчанию ||
|| **DEL**
[`string`](../../data-types.md) | Флаг удаления элемента ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-userfield-fields.md)
- [{#T}](./crm-userfield-types.md)
- [{#T}](./crm-userfield-settings-fields.md)
