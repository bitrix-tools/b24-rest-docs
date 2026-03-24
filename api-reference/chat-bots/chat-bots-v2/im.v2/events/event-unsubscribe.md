# Отписаться от событий im.v2.Event.unsubscribe

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `im.v2.Event.unsubscribe` отменяет подписку текущего пользователя на запись событий. Прекращает запись новых событий в лог. Уже записанные события остаются доступными через [im.v2.Event.get](./event-get.md) до истечения срока хранения (24 часа) или до подтверждения через `offset`.

Метод идемпотентный: повторный вызов безопасен и не приводит к ошибке.

## Параметры метода

Метод не принимает параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.Event.unsubscribe
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.Event.unsubscribe
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.v2.Event.unsubscribe', {});

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.v2.Event.unsubscribe',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: ' . print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.v2.Event.unsubscribe',
        {},
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('im.v2.Event.unsubscribe', []);

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Unsubscribed';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | `true` при успешной отписке ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./event-subscribe.md)
- [{#T}](./event-get.md)
