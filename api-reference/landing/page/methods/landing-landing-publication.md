# Опубликовать страницу landing.landing.publication

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «публикации» сайта

Метод `landing.landing.publication` публикует страницу и делает ее активной.

Если страница находится в папке, метод опубликует эту папку и все родительские папки. После этого сайт станет активным.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
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
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.publication.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.publication.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.publication',
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
                'landing.landing.publication',
                [
                    'lid' => 351,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error publishing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.publication',
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
        'landing.landing.publication',
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
        "start": 1773794655,
        "finish": 1773794655.622698,
        "duration": 0.6226980686187744,
        "processing": 0,
        "date_start": "2026-03-18T03:44:15+03:00",
        "date_finish": "2026-03-18T03:44:15+03:00",
        "operating_reset_at": 1773795255,
        "operating": 0.2789781093597412
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат публикации. При успехе возвращается `true` ||
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
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена: в `lid` передан идентификатор несуществующей, удаленной или недоступной страницы ||
|| `PUBLIC_PAGE_REACHED` | На тарифном плане есть ограничение по количеству опубликованных страниц ||
|| `LANDING_PAYMENT_FAILED` | Страница добавлена из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `LANDING_PAYMENT_FAILED_BLOCK` | На странице есть блок из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `PUBLIC_SITE_REACHED` | На тарифном плане есть ограничение по количеству созданных или опубликованных сайтов ||
|| `PUBLIC_SITE_REACHED_FREE` | Публикация сайтов временно доступна только на платных тарифах ||
|| `PUBLIC_HTML_DISALLOWED[...]` | На тарифном плане есть ограничение по добавлению пользовательского HTML кода. В квадратных скобках метод возвращает тип объекта и его идентификатор: `S<site_id>` для сайта или `L<landing_id>` для страницы ||
|| `PHONE_NOT_CONFIRMED` | Для публикации необходимо подтверждение номера телефона ||
|| `EMAIL_NOT_CONFIRMED` | Для публикации необходимо подтверждение e-mail ||
|| `URLCHECKER_FAIL` | На странице обнаружено вредоносное содержимое ||
|| `LICENSE_EXPIRED` | Лицензия вашего продукта закончилась ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-get-public-url.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-unpublic.md)
- [{#T}](./landing-landing-update.md)
