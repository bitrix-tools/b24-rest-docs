# Получить URL превью сайта landing.site.getPreview

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайтов

Метод `landing.site.getPreview` возвращает URL превью индексной страницы сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1817
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getPreview.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1817,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getPreview.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getPreview',
    		{
    			id: 1817
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
                'landing.site.getPreview',
                [
                    'id' => 1817,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site preview: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getPreview',
        {
            id: 1817
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
        'landing.site.getPreview',
        [
            'id' => 1817,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo $result['result'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": "/preview.jpg",
    "time": {
        "start": 1773275667,
        "finish": 1773275667.66318,
        "duration": 0.6631801128387451,
        "processing": 0,
        "date_start": "2026-03-12T03:34:27+03:00",
        "date_finish": "2026-03-12T03:34:27+03:00",
        "operating_reset_at": 1773276267,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../data-types.md) | URL или относительный путь до изображения превью индексной страницы сайта. 

Метод возвращает строку с путем или URL превью. Частые варианты: `"/preview.jpg"` и `"/bitrix/images/landing/nopreview.jpg"` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MISSING_PARAMS` | error_description | Недостаточно параметров вызова, пропущены: `id` ||
|| `400` | `ACCESS_DENIED` | error_description | Недостаточно прав для вызова метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-get-public-url.md)
- [{#T}](./landing-site-get-folders.md)
