# Получить ссылку на публичную страницу открытых линий imopenlines.config.path.get

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.config.path.get` получает ссылку на публичную страницу открытых линий портала.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.path.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.path.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod('imopenlines.config.path.get', {});
        const result = response.getData().result;
        console.log(result);
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
            ->call('imopenlines.config.path.get', []);

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.config.path.get',
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

    $result = CRest::call('imopenlines.config.path.get', []);
    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "SERVER_ADDRESS": "https://example.bitrix24.ru",
        "PUBLIC_PATH": "/contact_center/"
    },
    "time": {
        "start": 1773666618,
        "finish": 1773666618.766981,
        "duration": 0.7669808864593506,
        "processing": 0,
        "date_start": "2026-03-16T16:10:18+03:00",
        "date_finish": "2026-03-16T16:10:18+03:00",
        "operating_reset_at": 1773667218,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с адресом портала и публичным путем [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **SERVER_ADDRESS**
[`string`](../../data-types.md) | Базовый адрес портала ||
|| **PUBLIC_PATH**
[`string`](../../data-types.md) | Относительный путь к публичной странице открытых линий ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
