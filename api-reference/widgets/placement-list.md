# Получить список доступных приложению мест встраивания placement.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, авторизованный в приложении

Метод `placement.list` возвращает список доступных приложению мест встраивания.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SCOPE**
[`string`](../data-types.md) | Ограничивает список мест встраивания одним scope приложения.

Если параметр передан и не пустой, метод возвращает места встраивания только для указанного scope ||
|| **FULL**
[`boolean`](../data-types.md) | Флаг получения полного списка мест встраивания.

Если параметр не передан или передан как `false`, метод возвращает места встраивания для scope текущего приложения и глобальные места встраивания.

Если параметр передан как `true`, метод возвращает места встраивания для всех scope сервиса.

Параметр учитывается, только если не передан `SCOPE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример получения списка мест встраивания, доступных приложению, где:
- `SCOPE` — scope приложения, для которого нужно получить места встраивания

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "SCOPE": "crm",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/placement.list.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.list',
    		{
    			SCOPE: 'crm'
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
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
                'placement.list',
                [
                    'SCOPE' => 'crm',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting placement list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.list',
        {
            SCOPE: 'crm'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'placement.list',
        [
            'SCOPE' => 'crm',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        "CRM_DEAL_LIST_TOOLBAR",
        "CRM_LEAD_LIST_TOOLBAR",
        "CRM_CONTACT_LIST_TOOLBAR",
        "CRM_COMPANY_LIST_TOOLBAR",
        "CRM_INVOICE_LIST_TOOLBAR",
        "CRM_QUOTE_LIST_TOOLBAR",
        "CRM_ORDER_LIST_TOOLBAR",
        "CRM_DYNAMIC_136_LIST_TOOLBAR",
        "CRM_DYNAMIC_1038_LIST_TOOLBAR",
        "CRM_SMART_INVOICE_LIST_TOOLBAR",
        "CRM_DEAL_DETAIL_TOOLBAR",
        "CRM_LEAD_DETAIL_TOOLBAR",
        "CRM_CONTACT_DETAIL_TOOLBAR",
        "CRM_COMPANY_DETAIL_TOOLBAR",
        "CRM_INVOICE_DETAIL_TOOLBAR",
        "CRM_QUOTE_DETAIL_TOOLBAR",
        "CRM_DYNAMIC_136_DETAIL_TOOLBAR",
        "CRM_DYNAMIC_1038_DETAIL_TOOLBAR",
        "CRM_SMART_INVOICE_DETAIL_TOOLBAR",
        "CRM_DEAL_ACTIVITY_TIMELINE_MENU",
        "CRM_LEAD_ACTIVITY_TIMELINE_MENU",
        "CRM_QUOTE_ACTIVITY_TIMELINE_MENU"
    ],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string[]`](../data-types.md) | Список кодов мест встраивания, доступных приложению.

Каждый элемент массива — строковый код места встраивания ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Вызов метода не из контекста приложения ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-get.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
