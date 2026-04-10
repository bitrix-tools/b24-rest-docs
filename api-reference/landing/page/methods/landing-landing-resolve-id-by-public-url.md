# Получить идентификатор страницы по публичному URL landing.landing.resolveIdByPublicUrl

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Сайты и магазины»

Метод `landing.landing.resolveIdByPublicUrl` возвращает идентификатор страницы по ее публичному URL в рамках указанного сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **landingUrl***
[`string`](../../../data-types.md) | Относительный публичный URL страницы внутри сайта `siteId`, например `/catalog/sale/`.

Передавайте путь от корня сайта без домена ||
|| **siteId***
[`integer`](../../../data-types.md) | Идентификатор сайта, в рамках которого нужно найти страницу.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "landingUrl": "/catalog/sale/",
        "siteId": 1817
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.resolveIdByPublicUrl.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "landingUrl": "/catalog/sale/",
        "siteId": 1817,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.resolveIdByPublicUrl.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.resolveIdByPublicUrl',
    		{
    			landingUrl: '/catalog/sale/',
    			siteId: 1817
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
                'landing.landing.resolveIdByPublicUrl',
                [
                    'landingUrl' => '/catalog/sale/',
                    'siteId' => 1817,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error resolving landing ID: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.resolveIdByPublicUrl',
        {
            landingUrl: '/catalog/sale/',
            siteId: 1817
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
        'landing.landing.resolveIdByPublicUrl',
        [
            'landingUrl' => '/catalog/sale/',
            'siteId' => 1817,
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
    "result": 2231,
    "time": {
        "start": 1773830531,
        "finish": 1773830531.858353,
        "duration": 0.8583528995513916,
        "processing": 0,
        "date_start": "2026-03-18T13:42:11+03:00",
        "date_finish": "2026-03-18T13:42:11+03:00",
        "operating_reset_at": 1773831131,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) \| `null` | Идентификатор найденной страницы.

Если страница с таким публичным URL на сайте `siteId` не найдена, метод возвращает `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: landingUrl, siteId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не переданы обязательные параметры `landingUrl`, `siteId` или один из них ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-get-preview.md)
- [{#T}](./landing-landing-get-public-url.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-update.md)
