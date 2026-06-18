# Создать чат im.chat.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.add` создает новый чат.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USERS**
[`array`](../data-types.md) | Массив идентификаторов пользователей, которых нужно добавить в чат.

Создатель чата добавляет в чат автоматически в роли Владельца чата ||
|| **TYPE**
[`string`](../data-types.md) | Тип чата: 
- `OPEN` — открытый чат
- `CHAT` — закрытый чат

По умолчанию создается закрытый чат `CHAT` ||
|| **TITLE**
[`string`](../data-types.md) | Название чата. 

Если не передать параметр, название сформируется автоматически по шаблону `#COLOR# чат №#NUMBER#` или `Чат с #USERS_NAMES#` ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание чата ||
|| **COLOR**
[`string`](../data-types.md) | Цвет чата. Возможные значения:
- `RED` — красный
- `GREEN` — зеленый
- `MINT` — мятный
- `LIGHT_BLUE` — светло-синий
- `DARK_BLUE` — темно-синий
- `PURPLE` — фиолетовый
- `AQUA` — аквамариновый
- `PINK` — розовый
- `LIME` — лаймовый
- `BROWN` — коричневый
- `AZURE` — лазурный
- `KHAKI` — хаки
- `SAND` — песочный
- `MARENGO` — маренго
- `GRAY` — серый
- `GRAPHITE` — графитовый ||
|| **MESSAGE**
[`string`](../data-types.md) | Первое сообщение в чате ||
|| **AVATAR**
[`string`](../data-types.md) | Аватар чата в формате строки base64.

Максимальный размер изображения — 5000х5000.

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../files/how-to-upload-files.md)

{% endnote %}

||
|| **ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта для связи чата с внешним контекстом.

Возможные значения:
- `VIDEOCONF` — чат видеоконференции
- `AI_ASSISTANT_PRIVATE` — приватный чат с AI-ассистентом
- `LINES` — чат открытой линии со стороны оператора
- `LIVECHAT` — чат открытой линии со стороны клиента
- `ANNOUNCEMENT` — чат объявлений
- `CALENDAR` — чат, связанный с событием календаря
- `MAIL` — чат, связанный с почтовой перепиской
- `CRM` — чат, связанный с CRM-элементом
- `SONET_GROUP` — чат группы социальной сети
- `TASKS` — чат, связанный с задачей
- `CALL` — чат, связанный со звонком

||
|| **ENTITY_ID**
[`string`](../data-types.md) | Идентификатор объекта в рамках `ENTITY_TYPE`.

Передается строкой. Формат зависит от выбранного `ENTITY_TYPE`.

Поддерживаемые форматы для распространенных типов:
- `CRM` — `<CRM_TYPE>`\|`<ID>`, например `LEAD`\|`13`, `DEAL`\|`1663`, `CONTACT`\|`25`, `COMPANY`\|`7`. Для смарт-процессов — `DYNAMIC_<entityTypeId>`\|`<itemId>`
- `LINES` — `<connectorId>`\|`<lineId>`\|`<connectorChatId>`\|`<connectorUserId>`, например `telegrambot`\|`2`\|`209607941`\|`744`
- `LIVECHAT` — `<connectorId>`\|`<lineId>`
- `TASKS` — идентификатор задачи, например `8293`
- `CALENDAR` — идентификатор события календаря
- `SONET_GROUP` — идентификатор группы

Для остальных `ENTITY_TYPE` формат определяется модулем или интеграцией. Может быть произвольной строкой.

При создании чата можно передать произвольную пару `ENTITY_TYPE` и `ENTITY_ID`. Метод [получения идентификатора чата](./im-chat-get.md) вернет чат, если вызвать его с той же парой значений
||
|| **COPILOT_MAIN_ROLE**
[`string`](../data-types.md) | Код основной роли для BitrixGPT.

Возможные значения:
- `copilot_assistant` — универсальная роль по умолчанию
- любой код доступной роли BitrixGPT из библиотеки AI ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USERS":[103, 547],"TYPE":"CHAT","TITLE":"Чат по сделке","DESCRIPTION":"Здесь обсуждаем сделку","COLOR":"PINK","MESSAGE":"Добро пожаловать в чат сделки","ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USERS":[103, 547],"TYPE":"CHAT","TITLE":"Чат по сделке","DESCRIPTION":"Здесь обсуждаем сделку","COLOR":"PINK","MESSAGE":"Добро пожаловать в чат сделки","ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.chat.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'im.chat.add',
        params: {
          USERS: [103, 547],
          TYPE: 'CHAT',
          TITLE: 'Chat about deal',
          DESCRIPTION: 'Discuss the deal here',
          COLOR: 'PINK',
          MESSAGE: 'Welcome to the deal chat',
          ENTITY_TYPE: 'CRM',
          ENTITY_ID: 'DEAL|1663',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created chat ID:', result)
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
      async function createChat() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.chat.add',
            params: {
              USERS: [103, 547],
              TYPE: 'CHAT',
              TITLE: 'Chat about deal',
              DESCRIPTION: 'Discuss the deal here',
              COLOR: 'PINK',
              MESSAGE: 'Welcome to the deal chat',
              ENTITY_TYPE: 'CRM',
              ENTITY_ID: 'DEAL|1663',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created chat ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', createChat)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.chat.add',
                [
                    'USERS' => [103, 547],
                    'TYPE' => 'CHAT',
                    'TITLE' => 'Чат по сделке',
                    'DESCRIPTION' => 'Здесь обсуждаем сделку',
                    'COLOR' => 'PINK',
                    'MESSAGE' => 'Добро пожаловать в чат сделки',
                    'ENTITY_TYPE' => 'CRM',
                    'ENTITY_ID' => 'DEAL|1663',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'CHAT_ID: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.add',
        {
            USERS: [103, 547],
            TYPE: 'CHAT',
            TITLE: 'Чат по сделке',
            DESCRIPTION: 'Здесь обсуждаем сделку',
            COLOR: 'PINK',
            MESSAGE: 'Добро пожаловать в чат сделки',
            ENTITY_TYPE: 'CRM',
            ENTITY_ID: 'DEAL|1663',
        },
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

    $result = CRest::call(
        'im.chat.add',
        [
            'USERS' => [103, 547],
            'TYPE' => 'CHAT',
            'TITLE' => 'Чат по сделке',
            'DESCRIPTION' => 'Здесь обсуждаем сделку',
            'COLOR' => 'PINK',
            'MESSAGE' => 'Добро пожаловать в чат сделки',
            'ENTITY_TYPE' => 'CRM',
            'ENTITY_ID' => 'DEAL|1663',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1417,
    "time": {
        "start": 1772009915,
        "finish": 1772009915.872788,
        "duration": 0.8727879524230957,
        "processing": 0,
        "date_start": "2026-02-25T11:58:35+03:00",
        "date_finish": "2026-02-25T11:58:35+03:00",
        "operating_reset_at": 1772010515,
        "operating": 0.20950984954833984
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного чата ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-chat-get.md)
- [{#T}](./im-dialog-get.md)
- [{#T}](./im-recent-get.md)
- [{#T}](./im-recent-list.md)
