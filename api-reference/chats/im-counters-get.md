# Получить счетчики im.counters.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CountersResult = {
      TYPE: {
        ALL: number
        NOTIFY: number
        CHAT: number
        LINES: number
        DIALOG: number
        MESSENGER: number
      }
      CHAT: Record<string, number>
      CHAT_MUTED: Record<string, number>
      CHAT_UNREAD: number[]
      LINES: Record<string, number>
      DIALOG: Record<string, number>
      DIALOG_UNREAD: number[]
    }

    try {
      const response = await $b24.actions.v2.call.make<CountersResult>({
        method: 'im.counters.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(
          'Total unread:', result.TYPE.ALL,
          'Notifications:', result.TYPE.NOTIFY,
          'Chats:', result.TYPE.CHAT,
          'Dialogs:', result.TYPE.DIALOG
        )
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getCounters() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.counters.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(
            'Total unread:', result.TYPE.ALL,
            'Notifications:', result.TYPE.NOTIFY,
            'Chats:', result.TYPE.CHAT,
            'Dialogs:', result.TYPE.DIALOG
          )
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCounters)
    </script>
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
