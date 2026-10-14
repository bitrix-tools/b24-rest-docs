# Получить список доступных методов methods

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `methods` получает список доступных методов.

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [method.get](./method-get.md): он не отдает список, а проверяет конкретный метод по имени.

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **full**
[`boolean`](../../data-types.md) | Если передать `true`, метод вернет методы всех scope Битрикс24, а не только тех, что доступны приложению.

При передаче в form-data строка `false` тоже включает полный список, поэтому для списка приложения параметр не передавайте или передайте `0`.

Параметр не учитывается, если передан `scope` ||
|| **scope**
[`string`](../../data-types.md) | Код scope, методы которого нужно получить, например `user` или `crm`. Коды перечислены на странице [доступных scope](../../scopes/permissions.md).

Если передать пустую строку, метод вернет только базовые методы, которые доступны без scope: `batch`, `scope`, `method.get`, `app.option.get` и другие.

Для несуществующего кода метод вернет пустой массив ||
|#

Если метод вызван без параметров, он вернет методы scope, доступных текущему приложению или вебхуку, и базовые методы.

Список неполный: в него не попадают методы, которые Битрикс24 обрабатывает контроллерами модулей, например `tasks.task.list` и `crm.item.list`. Проверить такой метод можно только через [method.get](./method-get.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "scope": "user"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/methods
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "scope": "user",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/methods
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<string[]>({
        method: 'methods',
        params: {
          scope: 'user',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.length, result)
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
      async function fetchMethods() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'methods',
            params: {
              scope: 'user',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchMethods)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'methods',
                [
                    'scope' => 'user',
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
        echo 'Error calling method: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "methods",
        {
            "scope": "user"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'methods',
        [
            'scope' => 'user'
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
    "result": [
        "user.fields",
        "user.current",
        "user.get",
        "user.search",
        "user.add",
        "user.update",
        "user.online",
        "user.counters",
        "user.history.list",
        "user.history.fields.list"
    ],
    "time": {
        "start": 1721986432.32646,
        "finish": 1721986432.3598,
        "duration": 0.0333478450775147,
        "processing": 0.000032901763916015,
        "date_start": "2024-07-26T09:33:52+00:00",
        "date_finish": "2024-07-26T09:33:52+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string[]`](../../data-types.md) | Массив имен методов, например `user.get` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Собственных ошибок у метода нет.

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./access-name.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)




