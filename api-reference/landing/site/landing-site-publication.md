# Опубликовать сайт landing.site.publication

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «публикации» сайта

Метод `landing.site.publication` публикует сайт и его страницы. 
Если страница неактивна (`ACTIVE = "N"`), она остается непубликованной (`PUBLIC = "N"`). При вызове метода также активируются не удаленные папки сайта (`DELETED = "N"`).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1688
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.publication.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1688,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.publication.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.publication',
    		{
    			id: 1688
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
                'landing.site.publication',
                [
                    'id' => 1688,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error publishing site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.publication',
        {
            id: 1688
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
        'landing.site.publication',
        [
            'id' => 1688,
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
    "result": 157,
    "time": {
        "start": 1773285117,
        "finish": 1773285117.990578,
        "duration": 0.9905779361724854,
        "processing": 0,
        "date_start": "2026-03-12T06:11:57+03:00",
        "date_finish": "2026-03-12T06:11:57+03:00",
        "operating_reset_at": 1773285717,
        "operating": 0.13959693908691406
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор опубликованного сайта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ на публикацию сайта запрещен."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Доступ на публикацию сайта запрещен ||
|| `PHONE_NOT_CONFIRMED` | Для публикации необходимо подтверждение номера телефона ||
|| `EMAIL_NOT_CONFIRMED` | Для публикации необходимо подтверждение e-mail ||
|| `URLCHECKER_FAIL` | На странице обнаружено вредоносное содержимое ||
|| `PUBLIC_PAGE_REACHED` | На тарифном плане есть ограничение по количеству опубликованных страниц ||
|| `LANDING_PAYMENT_FAILED` | Страница добавлена из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `LANDING_PAYMENT_FAILED_BLOCK` | Блок добавлен из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `PUBLIC_SITE_REACHED` | На тарифном плане есть ограничение по количеству созданных или опубликованных сайтов ||
|| `PUBLIC_SITE_REACHED_FREE` | Публикация сайтов временно доступна только на платных тарифах ||
|| `PUBLIC_HTML_DISALLOWED[...]` | На тарифном плане есть ограничение по добавлению пользовательского HTML кода ||
|| `LICENSE_EXPIRED` | Лицензия вашего продукта закончилась ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-get-public-url.md)
- [{#T}](./landing-site-publication-folder.md)
- [{#T}](./landing-site-unpublic.md)
- [{#T}](./landing-site-unpublic-folder.md)
