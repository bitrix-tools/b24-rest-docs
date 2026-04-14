# Копировать страницу landing.landing.copy

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.copy` копирует страницу и возвращает идентификатор новой страницы. Метод может копировать в том числе страницу, помеченную как удаленная и находящуюся в корзине.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор исходной страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md) ||
|| **toSiteId**
[`integer`](../../../data-types.md) | Идентификатор целевого сайта. Если параметр не передавать или передать `0`, копия будет создана в том же сайте, где находится исходная страница

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **toFolderId**
[`integer`](../../../data-types.md) | Идентификатор целевой папки. Если параметр передан, копия создается в указанной папке. Папка должна относиться к целевому сайту `toSiteId`. 

Если параметр не передавать или передать `0`, копия создается в корне целевого сайта. Если папка не найдена или относится к другому сайту, метод не возвращает ошибку и создает копию в корне целевого сайта.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **skipSystem**
[`boolean`](../../../data-types.md) | Флаг копирования системного признака страницы. По умолчанию `false`.

Если передать `true`, новая страница создается как не системная (`SYS = N`)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 1688,
        "toSiteId": 305,
        "toFolderId": 95
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.copy.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 1688,
        "toSiteId": 305,
        "toFolderId": 95,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.copy.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.copy',
    		{
    			lid: 1688,
    			toSiteId: 305,
    			toFolderId: 95
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
                'landing.landing.copy',
                [
                    'lid' => 1688,
                    'toSiteId' => 305,
                    'toFolderId' => 95,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error copying landing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.copy',
        {
            lid: 1688,
            toSiteId: 305,
            toFolderId: 95
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
        'landing.landing.copy',
        [
            'lid' => 1688,
            'toSiteId' => 305,
            'toFolderId' => 95,
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
    "result": 2237,
    "time": {
        "start": 1773706491,
        "finish": 1773706492.91233,
        "duration": 1.912329912185669,
        "processing": 1,
        "date_start": "2026-03-17T03:14:51+03:00",
        "date_finish": "2026-03-17T03:14:52+03:00",
        "operating_reset_at": 1773707091,
        "operating": 0.9924919605255127
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданной копии страницы ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400 Bad Request**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `LANDING_NOT_EXIST` | Лендинг не найден. Если исходная страница не существует или недоступна текущему пользователю. Нахождение страницы в корзине само по себе не вызывает эту ошибку ||
|| `SITE_NOT_FOUND` | Сайт не найден. Если `toSiteId` указывает на несуществующий сайт ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен. Если у пользователя нет права «редактирование» сайта ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
