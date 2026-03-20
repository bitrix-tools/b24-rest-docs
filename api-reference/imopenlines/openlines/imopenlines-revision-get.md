# Получить информацию о ревизиях API imopenlines.revision.get

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.revision.get` получает информацию о ревизиях API Открытых линий.

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
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.revision.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.revision.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod('imopenlines.revision.get', {});
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
            ->call(
                'imopenlines.revision.get',
                []
            );

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
        'imopenlines.revision.get',
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

    $result = CRest::call('imopenlines.revision.get', []);

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "rest": 2,
        "web": 1,
        "mobile": 1
    },
    "time": {
        "start": 1773660116,
        "finish": 1773660116.269681,
        "duration": 0.2696809768676758,
        "processing": 0,
        "date_start": "2026-03-16T14:21:56+03:00",
        "date_finish": "2026-03-16T14:21:56+03:00",
        "operating_reset_at": 1773660716,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект с ревизиями API [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **rest**
[`integer`](../../data-types.md) | Ревизия API для REST-клиентов ||
|| **web**
[`integer`](../../data-types.md) | Ревизия API для веб- и десктоп-клиента ||
|| **mobile**
[`integer`](../../data-types.md) | Ревизия API для мобильного клиента ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
