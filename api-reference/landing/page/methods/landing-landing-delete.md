# Удалить страницу landing.landing.delete

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «удаление» сайта

Метод `landing.landing.delete` удаляет страницу вместе с ее блоками и связанными файлами.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 350
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.delete.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 350,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.delete.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.delete',
    		{
    			lid: 350
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
                'landing.landing.delete',
                [
                    'lid' => 350,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.delete',
        {
            lid: 350
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
        'landing.landing.delete',
        [
            'lid' => 350,
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
        "start": 1773708969,
        "finish": 1773708969.844789,
        "duration": 0.8447890281677246,
        "processing": 0,
        "date_start": "2026-03-17T03:56:09+03:00",
        "date_finish": "2026-03-17T03:56:09+03:00",
        "operating_reset_at": 1773709569,
        "operating": 0.18627595901489258
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления, при успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ на удаление страницы запрещен."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Недостаточно прав для удаления страницы ||
|| `LANDING_IS_LOCK` | Страница заблокирована на удаление ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-mark-undelete.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
