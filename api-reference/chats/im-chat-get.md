# Получить идентификатор чата im.chat.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.get` получает идентификатор чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE***
[`string`](../data-types.md) | Тип объекта для связи чата с внешним контекстом. Передается строкой.

Возможные значения:
- `VIDEOCONF` — чат видеоконференции
- `AI_ASSISTANT_PRIVATE` — приватный чат с AI-ассистентом
- `LINES` — чат открытой линии со стороны оператора
- `LIVECHAT` — чат открытой линии со стороны клиента
- `ANNOUNCEMENT` — чат объявлений
- `CALENDAR` — чат, связанный с событием календаря
- `MAIL` — чат, связанный с почтовой перепиской
- `CRM` — системный чат «для обсуждения» CRM-элемента. Метод не вернет идентификаторы других чатов, связанных с элементом CRM
- `SONET_GROUP` — чат группы социальной сети
- `TASKS_TASK` — чат задачи в [новой карточке задач](../tasks/tasks-new.md)
- `TASKS` — системный чат задачи в старой карточке задач
- `CALL` — чат, связанный со звонком
||
|| **ENTITY_ID***
[`string`](../data-types.md) | Идентификатор объекта в рамках `ENTITY_TYPE`.

Передается строкой. Формат зависит от выбранного `ENTITY_TYPE`.

Поддерживаемые форматы для распространенных типов:
- `CRM` — `<CRM_TYPE>`\|`<ID>`, например `LEAD`\|`13`, `DEAL`\|`1663`, `CONTACT`\|`25`, `COMPANY`\|`7`. Для смарт-процессов — `DYNAMIC_<entityTypeId>`\|`<itemId>`
- `LINES` — `<connectorId>`\|`<lineId>`\|`<connectorChatId>`\|`<connectorUserId>`, например `telegrambot`\|`2`\|`209607941`\|`744`
- `LIVECHAT` — `<connectorId>`\|`<lineId>`
- `TASKS`, `TASKS_TASK` — идентификатор задачи, например `8293`
- `CALENDAR` — идентификатор события календаря
- `SONET_GROUP` — идентификатор группы

Для остальных `ENTITY_TYPE` формат определяется модулем или интеграцией. Может быть произвольной строкой.

При [создании чата](./im-chat-add.md) можно передать произвольную пару `ENTITY_TYPE` и `ENTITY_ID`. Метод `im.chat.get` вернет чат, если вызвать его с той же парой значений ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.chat.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ImChatGetResult = {
      ID: number
    }

    try {
      const response = await $b24.actions.v2.call.make<ImChatGetResult>({
        method: 'im.chat.get',
        params: {
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
        console.info('Chat ID:', result.ID)
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
      async function getChatId() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.chat.get',
            params: {
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
          console.info('Chat ID:', result.ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getChatId)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.chat.get',
                [
                    'ENTITY_TYPE' => 'CRM',
                    'ENTITY_ID' => 'DEAL|1663',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'CHAT_ID: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.get',
        {
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
        'im.chat.get',
        [
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
    "result": {
        "ID": 1437
    },
    "time": {
        "start": 1772028217,
        "finish": 1772028217.949613,
        "duration": 0.949613094329834,
        "processing": 0,
        "date_start": "2026-02-25T17:03:37+03:00",
        "date_finish": "2026-02-25T17:03:37+03:00",
        "operating_reset_at": 1772028817,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Возвращает объект с идентификатором чата `ID`. 

Метод вернет `null`:
- если чат не найден
- не указаны обязательные параметры
- параметры заполнены неверно
||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-chat-add.md)
- [{#T}](./im-dialog-get.md)
- [{#T}](./chat-update/index.md)
- [{#T}](./im-recent-get.md)
- [{#T}](./im-recent-list.md)
