# Получить события пользователя im.v2.Event.get

> Scope: [`im`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `im.v2.Event.get` получает события для текущего пользователя в режиме опроса.

{% note info "" %}

Для получения событий пользователь должен быть предварительно подписан через [im.v2.Event.subscribe](./event-subscribe.md). Без подписки события не записываются и метод вернет пустой массив.

{% endnote %}

Метод подтверждает получение событий с ID меньше переданного `offset`. При следующем вызове возвращаются только новые события.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **offset**
[`integer`](../../../../data-types.md) | Подтверждает все события с ID меньше указанного значения. При первом вызове не передается ||
|| **limit**
[`integer`](../../../../data-types.md) | Максимальное количество возвращаемых событий (1–1000). По умолчанию `100` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"offset":2000,"limit":50}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.v2.Event.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"offset":2000,"limit":50,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.v2.Event.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.v2.Event.get', {
        offset: 2000,
        limit: 50,
      });

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
                'im.v2.Event.get',
                [
                    'offset' => 2000,
                    'limit' => 50,
                ]
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
        'im.v2.Event.get',
        {
            offset: 2000,
            limit: 50,
        },
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

    $result = CRest::call(
        'im.v2.Event.get',
        [
            'offset' => 2000,
            'limit' => 50,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        foreach ($result['result']['events'] as $event) {
            echo $event['type'] . ': ' . $event['eventId'] . "\n";
        }
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "events": [
            {
                "eventId": 2001,
                "type": "ONIMV2MESSAGEADD",
                "date": "2025-01-15T10:30:00+03:00",
                "data": {}
            }
        ],
        "lastEventId": 2001,
        "hasMore": false
    },
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
[`object`](../../../../data-types.md) | Результат операции ||
|| **result.events**
[`object[]`](../../../../data-types.md) | Массив событий ||
|| **result.events[].eventId**
[`integer`](../../../../data-types.md) | ID события. Передайте в следующем вызове как `offset` для подтверждения ||
|| **result.events[].type**
[`string`](../../../../data-types.md) | Тип события. Список типов описан [ниже](#event-types) ||
|| **result.events[].date**
[`datetime`](../../../../data-types.md) | Дата и время события ||
|| **result.events[].data**
[`object`](../../../../data-types.md) | Данные события. Формат зависит от типа события: [описание событий](./events.md) ||
|| **result.lastEventId**
[`integer`](../../../../data-types.md) | ID последнего возвращенного события ||
|| **result.hasMore**
[`boolean`](../../../../data-types.md) | `true`, если есть еще необработанные события ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Типы событий {#event-types}

#|
|| **Тип** | **Описание** ||
|| `ONIMV2MESSAGEADD` | Новое сообщение в чате ||
|| `ONIMV2MESSAGEUPDATE` | Сообщение отредактировано ||
|| `ONIMV2MESSAGEDELETE` | Сообщение удалено ||
|| `ONIMV2REACTIONCHANGE` | Реакция на сообщение изменена ||
|| `ONIMV2JOINCHAT` | Новый участник добавлен в чат ||
|#

Подробное описание формата данных каждого события: [{#T}](./events.md).

## Эксклюзивность получения событий

События конкретного пользователя может получать только **одно приложение**. Если несколько приложений подпишут одного пользователя, вызов с `offset` подтверждает и удаляет записи для всех — приложения будут «отбирать» события друг у друга.

Это ограничение намеренное: предполагается, что один агент должен мгновенно реагировать на события. Несколько агентов, обрабатывающих одни и те же события одного пользователя, приводят к дублирующимся и противоречивым ответам.

Если нужно несколько независимых обработчиков — используйте разные пользовательские контексты или webhook-подписки.

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./event-subscribe.md)
- [{#T}](./event-unsubscribe.md)
- [{#T}](./events.md)
