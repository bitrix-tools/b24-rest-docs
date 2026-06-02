# Получить счетчики пользователя tasks.task.counters.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.counters.get` получает значения счетчиков задач для указанного пользователя.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя, для которого нужно получить счетчики.

По умолчанию используется текущий пользователь.

Идентификатор пользователя можно получить методом [получения списка пользователей](../user/user-get.md) ||
|| **groupId**
[`integer`](../data-types.md) | Идентификатор группы, для задач которой нужно получилось счетчики.

Передайте `0` или не указывайте параметр, чтобы учитывать все группы.

Получить идентификатор можно методом [создания новой группы](../sonet-group/sonet-group-create.md) или методом [получения списка групп](../sonet-group/socialnetwork-api-workgroup-list.md). ||
|| **type**
[`string`](../data-types.md) | Роль, для которой нужно получить счетчики. Возможные роли:
- `view_all` — все роли
- `view_role_responsible` — делаю
- `view_role_accomplice` — помогаю
- `view_role_auditor` — наблюдаю
- `view_role_originator` — поручил
 
По умолчанию используется роль `view_all` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":547,"groupId":0,"type":"view_all"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.counters.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"userId":547,"groupId":0,"type":"view_all","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.counters.get
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CounterInfo = {
      counter: number
      code: number
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CountersGetResult = {
      expired?: CounterInfo
      new_comments?: CounterInfo
    }

    try {
      const response = await $b24.actions.v2.call.make<CountersGetResult>({
        method: 'tasks.task.counters.get',
        params: {
          userId: 547,
          groupId: 0,
          type: 'view_all',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task counters:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getTaskCounters() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.task.counters.get',
            params: {
              userId: 547,
              groupId: 0,
              type: 'view_all',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task counters:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskCounters)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.counters.get',
                [
                    'userId' => 547,
                    'groupId' => 0,
                    'type' => 'view_all'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task counters: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.counters.get',
        {
            userId: 547,
            groupId: 0,
            type: 'view_all'
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.counters.get',
        [
            'userId' => 547,
            'groupId' => 0,
            'type' => 'view_all'
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
        "expired": {
            "counter": 1,
            "code": 6291456
        },
        "new_comments": {
            "counter": 7,
            "code": 12582912
        }
    },
    "total": 1,
    "time": {
        "start": 1758868152,
        "finish": 1758868152.929809,
        "duration": 0.9298090934753418,
        "processing": 0,
        "date_start": "2025-09-26T09:29:12+03:00",
        "date_finish": "2025-09-26T09:29:12+03:00",
        "operating_reset_at": 1758868752,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект, в котором ключ — название счетчика, а значение — объект с [описанием счетчика](#counter).

Значения счетчиков:
- `new_comments` — непрочитанные комментарии
- `expired` — просроченные задачи

Возвращает пустой массив `"result":[]`, если пользователь не существует или нет прав на получение счетчиков указанного пользователя
 ||
|| **total**
[`integer`](../data-types.md) | На текущий момент не используется. Всегда возвращает значение `1` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект счетчика {#counter}

#|
|| **Название**
`тип` | **Описание** ||
|| **counter**
[`integer`](../data-types.md) | Количество ||
|| **code**
[`integer`](../data-types.md) | Внутренний код счетчика ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Group not found or access denied. (internal error)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Invalid value {value} to match with parameter {userId}. Should be value of type int. | В параметре `userId` указано значение неверного типа ||
|| `0` | Group not found or access denied. (internal error) | Группа не существует или к ней нет прав доступа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
