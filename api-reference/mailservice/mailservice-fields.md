# Получить поля почтового сервиса mailservice.fields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mailservice.fields` возвращает локализованные названия полей почтового сервиса.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth": "**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/mailservice.fields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod('mailservice.fields', {});
    	console.log(response.getData().result);
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
            ->call('mailservice.fields', []);

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'mailservice.fields',
        {},
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('mailservice.fields', []);
    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "ID",
        "SITE_ID": "Сайт",
        "ACTIVE": "Активность",
        "NAME": "Название",
        "SERVER": "Адрес сервера",
        "PORT": "Порт",
        "ENCRYPTION": "Защищенное соединение",
        "LINK": "Адрес веб-интерфейса",
        "ICON": "Логотип",
        "SORT": "Сортировка"
    },
    "time": {
        "start": 1710000500.123,
        "finish": 1710000500.200,
        "duration": 0.077,
        "processing": 0.020,
        "date_start": "2024-03-09T10:08:20+03:00",
        "date_finish": "2024-03-09T10:08:20+03:00",
        "operating_reset_at": 1710003600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с названиями полей. Структура объекта подробно описана [ниже](#fields-map) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#fields-map}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Название поля идентификатора ||
|| **SITE_ID**
[`string`](../data-types.md) | Название поля сайта ||
|| **ACTIVE**
[`string`](../data-types.md) | Название поля активности ||
|| **NAME**
[`string`](../data-types.md) | Название поля сервиса ||
|| **SERVER**
[`string`](../data-types.md) | Название поля адреса сервера ||
|| **PORT**
[`string`](../data-types.md) | Название поля порта ||
|| **ENCRYPTION**
[`string`](../data-types.md) | Название поля защищенного подключения ||
|| **LINK**
[`string`](../data-types.md) | Название поля адреса веб-интерфейса ||
|| **ICON**
[`string`](../data-types.md) | Название поля логотипа ||
|| **SORT**
[`string`](../data-types.md) | Название поля сортировки ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-add.md)
- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-delete.md)
