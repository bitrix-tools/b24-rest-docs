# Изменить коммуникации отдела humanresources.node.communication.edit

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование отделов» или «Редактирование команд»

Метод `humanresources.node.communication.edit` привязывает, отвязывает или создает чат, канал или коллаб для отдела или команды.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **nodeId***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) ||
|| **communicationType***
[`string`](../../../data-types.md) | Тип коммуникации.

Возможные значения:

- `CHAT` — чат
- `CHANNEL` — канал
- `COLLAB` — коллаб ||
|| **createDefault**
[`boolean`](../../../data-types.md) | Создает коммуникацию по умолчанию для отдела или команды.

Возможные значения:

- `true` — создать коммуникацию по умолчанию
- `false` — не создавать коммуникацию по умолчанию

По умолчанию — `false` ||
|| **ids**
[`array`](../../../data-types.md) | Идентификаторы коммуникаций, которые нужно привязать.

Идентификаторы чатов и каналов можно получить методом [im.recent.list](../../../chats/im-recent-list.md), а идентификаторы коллабов — методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md) ||
|| **removeIds**
[`array`](../../../data-types.md) | Идентификаторы коммуникаций, которые нужно отвязать.

Идентификаторы связанных коммуникаций можно получить методом [humanresources.node.communication.list](./humanresources-node-communication-list.md) ||
|| **withChildren**
[`boolean`](../../../data-types.md) | Применяет изменение к дочерним отделам и командам.

Возможные значения:

- `true` — применить изменение к дочерним отделам и командам
- `false` — применить изменение только к отделу или команде из параметра `nodeId`

По умолчанию — `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/humanresources.node.communication.edit`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":15,"communicationType":"CHAT","ids":[21],"removeIds":[18],"createDefault":false,"withChildren":false}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.communication.edit
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":15,"communicationType":"CHAT","ids":[21],"removeIds":[18],"createDefault":false,"withChildren":false,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.communication.edit
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NodeCommunicationEditResult = {
      success: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<NodeCommunicationEditResult>({
        method: 'humanresources.node.communication.edit',
        params: {
          nodeId: 15,
          communicationType: 'CHAT',
          ids: [21],
          removeIds: [18],
          createDefault: false,
          withChildren: false,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Communication edited successfully:', result.success)
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
      async function editNodeCommunication() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.node.communication.edit',
            params: {
              nodeId: 15,
              communicationType: 'CHAT',
              ids: [21],
              removeIds: [18],
              createDefault: false,
              withChildren: false,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Communication edited successfully:', result.success)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', editNodeCommunication)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.communication.edit',
                [
                    'nodeId' => 15,
                    'communicationType' => 'CHAT',
                    'ids' => [21],
                    'removeIds' => [18],
                    'createDefault' => false,
                    'withChildren' => false,
                ]
            );

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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.communication.edit',
        {
            nodeId: 15,
            communicationType: 'CHAT',
            ids: [21],
            removeIds: [18],
            createDefault: false,
            withChildren: false
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.node.communication.edit',
        [
            'nodeId' => 15,
            'communicationType' => 'CHAT',
            'ids' => [21],
            'removeIds' => [18],
            'createDefault' => false,
            'withChildren' => false,
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
        "success": true
    },
    "time": {
        "start": 1780407100,
        "finish": 1780407100.186404,
        "duration": 0.18640398979187012,
        "processing": 0.1328411102294922,
        "date_start": "2026-06-02T16:31:40+03:00",
        "date_finish": "2026-06-02T16:31:40+03:00",
        "operating_reset_at": 1780407700,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом операции ||
|| **success**
[`boolean`](../../../data-types.md) | Значение `true`, если коммуникации изменены ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Parameter \"communicationType\" is required.",
                "field": "communicationType"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `nodeId` | Parameter `"nodeId"` is required. | Передайте идентификатор отдела или команды ||
|| `communicationType` | Parameter `"communicationType"` is required. | Передайте тип коммуникации ||
|| `communicationType` | Invalid `"communicationType"` value. Allowed: `CHAT`, `CHANNEL`, `COLLAB`. | Передайте одно из допустимых значений ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `nodeId` | Объект с идентификатором `#ID#` не найден | Укажите существующий идентификатор отдела или команды ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте право изменения коммуникаций отдела или команды ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-communication-list.md)
- [{#T}](./index.md)
