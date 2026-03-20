# Получить счетчики im.counters.get

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.counters.get` получает счетчики непрочитанных сообщений и уведомлений для текущего пользователя.

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
      -d '{}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.counters.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.counters.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod('im.counters.get', {});
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
            ->call('im.counters.get', []);

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.counters.get',
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

    $result = CRest::call('im.counters.get', []);

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "TYPE": {
            "ALL": 5,
            "NOTIFY": 4,
            "CHAT": 0,
            "LINES": 0,
            "DIALOG": 1,
            "MESSENGER": 1
        },
        "CHAT": [],
        "CHAT_MUTED": {
            "1317": 1,
            "1319": 1
        },
        "CHAT_UNREAD": [],
        "LINES": [],
        "DIALOG": {
            "547": 1
        },
        "DIALOG_UNREAD": []
    },
    "time": {
        "start": 1772010465,
        "finish": 1772010465.508917,
        "duration": 0.5089170932769775,
        "processing": 0,
        "date_start": "2026-02-25T12:07:45+03:00",
        "date_finish": "2026-02-25T12:07:45+03:00",
        "operating_reset_at": 1772011065,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект со счетчиками ||
|| **TYPE**
[`object`](../data-types.md) | Суммарные счетчики по типам [(подробное описание)](#type) ||
|| **CHAT**
[`array`](../data-types.md) | Счетчики по чатам. Ключ — идентификатор чата, значение — количество непрочитанных сообщений ||
|| **CHAT_MUTED**
[`object`](../data-types.md) | Счетчики по чатам с отключенными уведомлениями. Ключ — идентификатор чата, значение — количество непрочитанных сообщений ||
|| **CHAT_UNREAD**
[`array`](../data-types.md) | Счетчики по чатам с установленной меткой «Не прочитано» ||
|| **LINES**
[`array`](../data-types.md) | Счетчики по чатам открытых линий ||
|| **DIALOG**
[`object`](../data-types.md) | Счетчики по диалогам один-на-один. Ключ — идентификатор пользователя, значение — количество непрочитанных сообщений ||
|| **DIALOG_UNREAD**
[`array`](../data-types.md) | Счетчики по диалогам один-на-один с установленной ручной меткой «Не прочитано» ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект TYPE {#type}

#|
|| **Название**
`тип` | **Описание** ||
|| **ALL**
[`integer`](../data-types.md) | Общее количество непрочитанных сообщений и уведомлений ||
|| **CHAT**
[`integer`](../data-types.md) | Общее количество непрочитанных сообщений в чатах ||
|| **DIALOG**
[`integer`](../data-types.md) | Общее количество непрочитанных сообщений в диалогах ||
|| **LINES**
[`integer`](../data-types.md) | Общее количество непрочитанных сообщений в открытых линиях ||
|| **NOTIFY**
[`integer`](../data-types.md) | Общее количество непрочитанных уведомлений ||
|| **MESSENGER**
[`integer`](../data-types.md) | Общее количество непрочитанных сообщений в мессенджере (без уведомлений) ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-recent-get.md)
- [{#T}](./im-recent-list.md)
- [{#T}](./im-dialog-get.md)
