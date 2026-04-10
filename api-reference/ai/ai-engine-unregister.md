# Удалить сервис ai.engine.unregister

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.engine.unregister` удаляет зарегистрированный AI-сервис.


## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Символьный код удаляемого сервиса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "code": "acme_gpt"
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_webhook_id**/**put_your_webhook_code**/ai.engine.unregister.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "code": "acme_gpt",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/ai.engine.unregister
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'ai.engine.unregister',
            {
                code: 'acme_gpt'
            }
        );

        const result = response.getData().result;
        console.log('Engine removed:', result);
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
                'ai.engine.unregister',
                [
                    'code' => 'acme_gpt',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unregistering AI engine: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'ai.engine.unregister',
        {
            code: 'acme_gpt'
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
        'ai.engine.unregister',
        [
            'code' => 'acme_gpt',
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
    "result": true,
    "time": {
        "start": 1774078200,
        "finish": 1774078200.184271,
        "duration": 0.18427085876464844,
        "processing": 0.03,
        "date_start": "2026-03-20T09:50:00+03:00",
        "date_finish": "2026-03-20T09:50:00+03:00",
        "operating_reset_at": 1774078800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат удаления сервиса:

- `true` — сервис удален
- `false` — сервис не найден, не принадлежит текущему приложению или удаление не выполнено ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./ai-engine-register.md)
- [{#T}](./ai-engine-list.md)
