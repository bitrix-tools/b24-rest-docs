# Проверить название потока на уникальность tasks.flow.Flow.isExists

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.flow.Flow.isExists` проверяет, есть ли в Битрикс24 поток с таким названием. Название потока должно быть уникальным, поэтому проверяйте его перед созданием или переименованием потока.

Регистр букв метод не учитывает: названия `Поток продаж` и `поток продаж` для него одинаковые. Права пользователя метод не проверяет и ищет среди всех потоков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowData***
[`object`](../../data-types.md) | Объект с названием потока для проверки [(подробное описание)](#flowdata) ||
|#

### Параметр flowData {#flowdata}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название потока, которое нужно проверить.

Для пустой строки метод вернет `"exists": false` ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор потока, который метод пропустит при проверке. Передайте его, если проверяете новое название существующего потока: тогда метод не найдет сам этот поток.

Идентификатор вернет метод [tasks.flow.Flow.create](./tasks-flow-flow-create.md) при создании потока, а для задачи из потока — метод [tasks.task.get](../tasks-task-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "name": "Flow Name"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.flow.Flow.isExists
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "name": "Flow Name"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.flow.Flow.isExists
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FlowIsExistsResult = {
      exists: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<FlowIsExistsResult>({
        method: 'tasks.flow.Flow.isExists',
        params: {
          flowData: {
            name: 'Flow Name',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Flow exists:', result.exists)
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
      async function checkFlowIsExists() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.flow.Flow.isExists',
            params: {
              flowData: {
                name: 'Flow Name',
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
          console.info('Flow exists:', result.exists)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', checkFlowIsExists)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    flow_data = {
        "name": "Flow Name",
    }

    try:
        bitrix_response = client.tasks.flow.flow.is_exists(
            flow_data=flow_data,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.flow.Flow.isExists',
                [
                    'flowData' => [
                        'name' => 'Flow Name'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.isExists',
        {
            flowData: {
                name: 'Flow Name'
            }
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

    $flowData = [
        "name" => "Flow Name"
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.isExists',
        [
            'flowData' => $flowData
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.flow.Flow.isExists", b24.Params{
    	"flowData": b24.Params{
    		"name": "Flow Name",
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.flow.Flow.isExists: %w", err)
    }

    var item struct {
    	Exists bool `json:"exists"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Exists)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "exists": true
    },
    "time": {
        "start": 1793956087,
        "finish": 1793956087.677343,
        "duration": 0.6773428916931152,
        "processing": 0,
        "date_start": "2026-11-06T12:08:07+03:00",
        "date_finish": "2026-11-06T12:08:07+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом операции [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **exists**
[`boolean`](../../data-types.md) | `true`, если поток с таким названием есть, `false` — если нет ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "name: cannot be null"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | name: cannot be null | Не передан `flowData.name` ||
|| `400` | `0` | Неизвестная ошибка [Flow: 424] | Внутренняя ошибка. Число в скобках — место в коде, где произошла ошибка, оно поможет поддержке найти причину ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-activate.md)
- [{#T}](./tasks-flow-flow-pin.md)
