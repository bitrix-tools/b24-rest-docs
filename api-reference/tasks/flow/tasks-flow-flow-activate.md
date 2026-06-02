# Активировать/деактивировать поток tasks.flow.Flow.activate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: создатель или администратор потока

Метод `tasks.flow.Flow.activate` включает или выключает поток по его идентификатору. Если поток выключен, он его включает. Если включен, то выключает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowId*** 
[`integer`](../../data-types.md) | Идентификатор потока, который нужно включить или выключить. 

Получить идентификатор можно методом создания нового потока [tasks.flow.Flow.create](./tasks-flow-flow-create.md) или методом получения задачи [tasks.task.get](../tasks-task-get.md) для задачи из потока ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.Flow.activate
    ```

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.Flow.activate
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'tasks.flow.Flow.activate',
        params: {
          flowId: 517,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Flow activated/deactivated:', result)
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
      async function activateFlow() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.flow.Flow.activate',
            params: {
              flowId: 517,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Flow activated/deactivated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', activateFlow)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.flow.Flow.activate',
                [
                    'flowId' => 517
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error activating flow: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.activate',
        {
            flowId: 517
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
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowId = 517;

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.activate',
        [
            'flowId' => $flowId
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`boolean`](../../data-types.md) | Успешность операции ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Flow not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещен или поток не найден | Тариф портала не позволяет работать с потоками или у пользователя нет прав на выполнение операции ||
|| `0` | `Flow not found` | Поток с указанным идентификатором не найден ||
|| `0` | `Unknown error` | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-pin.md)
