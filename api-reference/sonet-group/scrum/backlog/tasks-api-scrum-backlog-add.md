# Добавить бэклог в Скрам tasks.api.scrum.backlog.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.backlog.add` добавляет бэклог в Скрам.

Может понадобиться, чтобы создать бэклог при импорте после создания Скрама.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект содержащий записи о группе и пользователе (подробное описание приведено ниже) в виде структуры:

```js
"fields": {
    "groupId": значение,
    "createdBy": значение,
    "modifiedBy": значение,
}    
```
||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId***
[`integer`](../../../data-types.md) | Идентификатор группы, для которой создается бэклог.

Иденитификатор группы можно получить при создании новой группы [sonet_group.create](../../sonet-group-create.md) или при получении списка существующих групп [socialnetwork-api-workgroup-list.md](../../socialnetwork-api-workgroup-list.md) ||
|| **createdBy***
[`integer`](../../../data-types.md) | Идентификатор пользователя, от кого будет создан бэклог ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, от кого будет модифицирован бэклог ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {"groupId": 1, "createdBy": 1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.backlog.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {"groupId": 1, "createdBy": 1}, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.backlog.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BacklogAddResult = {
      id: number
      groupId: number
      createdBy: number
      modifiedBy: number
    }

    try {
      const response = await $b24.actions.v2.call.make<BacklogAddResult>({
        method: 'tasks.api.scrum.backlog.add',
        params: {
          fields: {
            groupId: 125,
            createdBy: 6,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Backlog created:', result.id, 'for group:', result.groupId)
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
      async function addBacklog() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.backlog.add',
            params: {
              fields: {
                groupId: 125,
                createdBy: 6,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Backlog created:', result.id, 'for group:', result.groupId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addBacklog)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.backlog.add',
                [
                    'fields' => [
                        'groupId'   => 125,
                        'createdBy' => 6,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding backlog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.backlog.add',{
            "fields": {
                "groupId": 125,
                "createdBy": 6,
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
    'tasks.api.scrum.backlog.add',
        [
            'fields' => [
                'groupId' => 1,
                'createdBy' => 1,
            ],
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
        "id": 1,
        "groupId": 125,
        "createdBy": 6,
        "modifiedBy": 0
    },
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор бэклога ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы, для которой был создан бэклог ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал бэклог ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который изменил бэклог ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Access denied"
}
```
{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `0` | Backlog already added | Ошибка возникает при попытке создания бэклога, при этом в группе уже сущеcтвует активный бэклог ||
|| `0` | Access denied | Отсутствуют соответствующие права доступа ||
|| `0` | createdBy user not found | Переданный индентификатор пользователя невалидный. Например, пользователя с таким идентификатором не существует ||
|| `0` | modifiedBy user not found | Переданный индентификатор пользователя невалидный. Например, пользователя с таким идентификатором не существует ||
|| `0` | Unknown error | Другая ошибка ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-backlog-update.md)
- [{#T}](./tasks-api-scrum-backlog-get.md)
- [{#T}](./tasks-api-scrum-backlog-delete.md)
- [{#T}](./tasks-api-scrum-backlog-get-fields.md)