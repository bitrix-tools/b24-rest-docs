# Обновить стадию канбана или «Моего плана» task.stages.update

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

Метод `task.stages.update` изменяет название, цвет или положение стадии канбана или «Моего плана».

Чтобы переместить стадию, передайте в `AFTER_ID` идентификатор стадии, после которой она должна стоять.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор стадии ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления стадии канбана или «Моего плана» [(подробное описание)](#fields) ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если передать `true`, метод не проверяет права в группе. Параметр действует только для администратора Битрикс24, у других пользователей права проверяются как обычно. По умолчанию — `false` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название стадии. Если не передать, название останется прежним ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет стадии — шестнадцатеричный код RGB из 6 символов без `#`, например `FF5733` ||
|| **AFTER_ID**
[`integer`](../../data-types.md) | Идентификатор стадии, после которой нужно поставить эту стадию.

Если передать `0`, стадия встанет первой. Если не передать, стадия останется на месте ||
|#

Другие поля метод молча пропускает. Например, `SORT` не изменит порядок стадий: положение стадии задает только `AFTER_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "COLOR": "FF5733"
    }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.stages.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "COLOR": "FF5733"
    },
    "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.stages.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'task.stages.update',
        params: {
          id: 5,
          fields: {
            TITLE: 'Новая стадия',
            COLOR: 'FF5733',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Stage updated:', result)
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
      async function updateStage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.stages.update',
            params: {
              id: 5,
              fields: {
                TITLE: 'Новая стадия',
                COLOR: 'FF5733',
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
          console.info('Stage updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateStage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "TITLE": "Новая стадия",
        "COLOR": "FF5733",
    }

    try:
        bitrix_response = client.task.stages.update(
            bitrix_id=5,
            fields=fields,
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
        $stageId = 5;
        $fields = [
            'TITLE' => "Новая стадия",
            'COLOR' => "FF5733"
        ];

        $response = $b24Service
            ->core
            ->call(
                'task.stages.update',
                [
                    'id' => $stageId,
                    'fields' => $fields
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating task stage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const stageId = 5;
    const fields = {
        TITLE: "Новая стадия",
        COLOR: "FF5733"
    };
    BX24.callMethod(
        'task.stages.update',
        {
            id: stageId,
            fields: fields
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $stageId = 5;
    $fields = [
        "TITLE" => "Новая стадия",
        "COLOR" => "FF5733"
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.update',
        [
            'id' => $stageId,
            'fields' => $fields
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
    res, err := client.Core().Call(ctx, "task.stages.update", b24.Params{
    	"id": 5,
    	"fields": b24.Params{
    		"TITLE": "Новая стадия",
    		"COLOR": "FF5733",
    	},
    })
    if err != nil {
    	return fmt.Errorf("task.stages.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
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
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного обновления стадии
||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Вы не можете управлять стадиями"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `NOT_FOUND` | Стадия не найдена | Стадии с идентификатором `id` нет ||
|| `400` | `ACCESS_DENIED` | Вы не можете управлять стадиями | Пользователь не владелец и не модератор группы, к которой относится стадия, или стадия из чужого «Моего плана» ||
|| `400` | `EMPTY_TITLE` | Не указан заголовок стадии | В `TITLE` передана пустая строка ||
|| `400` | `DISPATCHER_ERROR` | Argument "id" is required, but no value passed for task.stages.update | Не передан обязательный параметр `id`. Если не передан `fields`, в тексте ошибки будет его имя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-delete.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
