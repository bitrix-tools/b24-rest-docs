# Удалить пользовательский блок landing.repo.unregister

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.unregister` удаляет пользовательский блок по его коду.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**^*^
[`string`](../../data-types.md) | Внешний код блока (`XML_ID`).

Код можно получить, например, из результата метода [landing.repo.getList](./landing-repo-get-list.md) в поле `XML_ID` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример удаления блока, где:
- `code` — код блока для удаления

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "myblockx"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.repo.unregister.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "myblockx",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.repo.unregister.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.unregister',
    		{
    			code: 'myblockx'
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
                'landing.repo.unregister',
                [
                    'code' => 'myblockx',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unregistering block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.unregister',
        {
            code: 'myblockx'
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
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.unregister',
        [
            'code' => 'myblockx',
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1774951693,
        "finish": 1774951693.523505,
        "duration": 0.5235049724578857,
        "processing": 0,
        "date_start": "2026-03-31T13:08:13+03:00",
        "date_finish": "2026-03-31T13:08:13+03:00",
        "operating_reset_at": 1774952293,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления:

- `true` — блок найден и удален
- `false` — `code` не строка, пустой или блок не найден ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'code' has an invalid type",
    "argument": "code"
}
```

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: code | Вызов метода без `code` ||
|| `ERROR_ARGUMENT` | The value of an argument 'code' has an invalid type | Параметр `code` передан в неверном типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|| `insufficient_scope` | Недостаточно scope у токена | Токен не содержит scope `landing` ||
|| `-` | Ошибка удаления блока | Не удалось удалить запись из репозитория ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repo-register.md)
- [{#T}](./landing-repo-get-list.md)
- [{#T}](./landing-repo-check-content.md)
- [{#T}](./index.md)
