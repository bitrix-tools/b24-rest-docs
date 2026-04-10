# Восстановить сайт из корзины landing.site.markUnDelete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «удаления» сайтов

Метод `landing.site.markUnDelete` восстанавливает сайт из корзины и снимает признак удаления. 
После восстановления сайт остается непубликованным (`ACTIVE = "N"`).

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
        "id": 157
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.markUnDelete.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 157,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.markUnDelete.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.markUnDelete',
    		{
    			id: 157
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
                'landing.site.markUnDelete',
                [
                    'id' => 157,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error restoring site from recycle bin: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.markUnDelete',
        {
            id: 157
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
        'landing.site.markUnDelete',
        [
            'id' => 157,
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
        "start": 1773284286,
        "finish": 1773284286.396013,
        "duration": 0.3960130214691162,
        "processing": 0,
        "date_start": "2026-03-12T05:58:06+03:00",
        "date_finish": "2026-03-12T05:58:06+03:00",
        "operating_reset_at": 1773284886,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор сайта, который восстановлен из корзины ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "TOTAL_SITE_REACHED",
    "error_description": "На вашем тарифном плане есть ограничение по количеству созданных или опубликованных сайтов. Чтобы работать с большим числом сайтов, перейдите на другой тарифный план."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Недостаточно прав для изменения поля `DELETED` у сайта ||
|| `TOTAL_SITE_REACHED` | Превышен тарифный лимит на количество сайтов или баз знаний, сайт не может быть восстановлен ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-delete.md)
- [{#T}](./landing-site-mark-delete.md)
