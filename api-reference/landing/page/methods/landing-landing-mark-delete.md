# Пометить страницу как удаленную landing.landing.markDelete

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «удаление» сайта

Метод `landing.landing.markDelete` помечает страницу как удаленную, переносит ее в корзину и снимает с публикации.

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
        "lid": 350
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.markDelete.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 350,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.markDelete.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.markDelete',
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
                'landing.landing.markDelete',
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
        echo 'Error marking landing page as deleted: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.markDelete',
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
        'landing.landing.markDelete',
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
    "result": 2255,
    "time": {
        "start": 1773785858,
        "finish": 1773785858.434948,
        "duration": 0.4349479675292969,
        "processing": 0,
        "date_start": "2026-03-18T01:17:38+03:00",
        "date_finish": "2026-03-18T01:17:38+03:00",
        "operating_reset_at": 1773786458,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор страницы, которая помечена как удаленная ||
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
|| `ACCESS_DENIED` | Недостаточно прав для удаления страницы ||
|| `CANT_DELETE_MAIN` | Нельзя пометить как удаленную главную страницу сайта, если в сайте есть другие неудаленные страницы ||
|| `UNABLE_DELETE_INCLUDE` | Нельзя пометить как удаленную область шаблона сайта ||
|| `TYPE_ERROR` | Текст зависит от сообщения PHP `TypeError`, которое возникает при некорректном типе параметра ||
|| `SYSTEM_ERROR` | Текст зависит от внутреннего исключения, которое возникло при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-mark-undelete.md)
