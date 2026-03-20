# Получить URL превью страницы landing.landing.getpreview

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.landing.getpreview` возвращает URL или относительный путь до изображения превью страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить с помощью метода [landing.landing.getList](./landing-landing-get-list.md) или из результата метода [landing.landing.add](./landing-landing-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.getpreview.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.getpreview.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.getpreview',
    		{
    			lid: 351
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
                'landing.landing.getpreview',
                [
                    'lid' => 351,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting landing preview: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.getpreview',
        {
            lid: 351
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
        'landing.landing.getpreview',
        [
            'lid' => 351,
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
    "result": "https://example.bitrix24.site/preview.jpg",
    "time": {
        "start": 1773717121,
        "finish": 1773717121.107574,
        "duration": 0.1075739860534668,
        "processing": 0,
        "date_start": "2026-03-17T06:12:01+03:00",
        "date_finish": "2026-03-17T06:12:01+03:00",
        "operating_reset_at": 1773717721,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../data-types.md) | URL или относительный путь до изображения превью страницы.

Метод возвращает URL превью страницы, путь к изображению или `"/bitrix/images/landing/nopreview.jpg"`, если превью не задано ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

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
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: `lid` ||
|| `LANDING_NOT_EXIST` | Лендинг не найден. Метод возвращает этот код, если страница не найдена или у текущего пользователя нет прав на ее просмотр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-get-public-url.md)
- [{#T}](./landing-landing-update.md)
