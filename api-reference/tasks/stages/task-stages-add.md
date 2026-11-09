# Добавить стадию канбана или «Моего плана» task.stages.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий своего «Моего плана»
> - владелец или модератор группы для стадий канбана группы

Метод `task.stages.add` добавляет стадию канбана или «Моего плана».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для добавления новой стадии [(подробное описание)](#fields) ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если передать `true`, метод не проверяет права в группе. Параметр действует только для администратора Битрикс24, у других пользователей права проверяются как обычно. По умолчанию — `false` ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../data-types.md) | Название стадии ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет стадии — шестнадцатеричный код RGB из 6 символов без `#`, например `FFAAEE`.

Метод не проверяет формат. Если передать `#FFAAEE`, сохранится обрезанное значение `#FFAAE` ||
|| **AFTER_ID**
[`integer`](../../data-types.md) | Идентификатор стадии, после которой надо добавить новую стадию.

Если не передать или передать `0`, стадия встанет первой. Если стадии с таким идентификатором нет, стадия встанет последней ||
|| **ENTITY_ID**
[`integer`](../../data-types.md) | Где создать стадию:
- `ID` группы — в канбане группы
- `0` или не передан — в «Моем плане» текущего пользователя

Если пользователь не владелец и не модератор группы, метод вернет ошибку доступа ||
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
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.stages.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false,
    "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.stages.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // ID of the added stage returned in result
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StageAddResult = number

    try {
      const response = await $b24.actions.v2.call.make<StageAddResult>({
        method: 'task.stages.add',
        params: {
          fields: {
            TITLE: 'Название стадии',
            COLOR: 'FFAAEE',
            AFTER_ID: 1,
            ENTITY_ID: 1,
          },
          isAdmin: false,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New stage ID:', result)
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
      async function addTaskStage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.stages.add',
            params: {
              fields: {
                TITLE: 'Название стадии',
                COLOR: 'FFAAEE',
                AFTER_ID: 1,
                ENTITY_ID: 1,
              },
              isAdmin: false,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New stage ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskStage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "TITLE": "Название стадии",
        "COLOR": "FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1,
    }

    try:
        bitrix_response = client.task.stages.add(
            fields=fields,
            is_admin=False,
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
                'task.stages.add',
                [
                    'fields' => [
                        'TITLE'    => 'Название стадии',
                        'COLOR'    => 'FFAAEE',
                        'AFTER_ID' => 1,
                        'ENTITY_ID' => 1
                    ],
                    'isAdmin' => false,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.stages.add',
        {
            fields: {
                TITLE: 'Название стадии',
                COLOR: 'FFAAEE',
                AFTER_ID: 1,
                ENTITY_ID: 1
            },
            isAdmin: false,
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

    $fields = [
        "TITLE" => "Название стадии",
        "COLOR" => "FFAAEE",
        "AFTER_ID" => 1,
        "ENTITY_ID" => 1
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.add',
        [
            'fields' => $fields,
            'isAdmin' => false
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
    res, err := client.Core().Call(ctx, "task.stages.add", b24.Params{
    	"fields": b24.Params{
    		"TITLE":     "Название стадии",
    		"COLOR":     "FFAAEE",
    		"AFTER_ID":  1,
    		"ENTITY_ID": 1,
    	},
    	"isAdmin": false,
    })
    if err != nil {
    	return fmt.Errorf("task.stages.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1,
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
[`integer`](../../data-types.md) | Идентификатор добавленной стадии ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "EMPTY_TITLE",
    "error_description": "Не указан заголовок стадии"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `EMPTY_TITLE` | Не указан заголовок стадии | Не передан `TITLE` или передана пустая строка ||
|| `400` | `ACCESS_DENIED` | Вы не можете управлять стадиями | Пользователь не владелец и не модератор группы из `ENTITY_ID` или группы с таким идентификатором нет ||
|| `400` | `DISPATCHER_ERROR` | Argument "fields" is required, but no value passed for task.stages.add | Не передан обязательный параметр `fields` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-delete.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
