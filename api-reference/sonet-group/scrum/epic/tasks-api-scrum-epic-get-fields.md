# Получить список доступных полей эпика tasks.api.scrum.epic.getFields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.epic.getFields` возвращает доступные поля эпика.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.getFields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EpicFieldItem = {
      type: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EpicFieldsResult = {
      fields: Record<string, EpicFieldItem>
    }

    try {
      const response = await $b24.actions.v2.call.make<EpicFieldsResult>({
        method: 'tasks.api.scrum.epic.getFields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result.fields), result.fields)
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
      async function getEpicFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.epic.getFields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result.fields), result.fields)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEpicFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.get_fields().response
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
                'tasks.api.scrum.epic.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting epic fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.api.scrum.epic.getFields',
        {},
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.getFields',
    []
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    }
    else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.api.scrum.epic.getFields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.epic.getFields: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "fields": {
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "groupId": {
                "type": "integer"
            },
            "color": {
                "type": "string"
            },
            "files": {
                "type": "array"
            },
            "createdBy": {
                "type": "integer"
            },
            "modifiedBy": {
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1790262925,
        "finish": 1790262925.771081,
        "duration": 0.7710809707641602,
        "processing": 0,
        "date_start": "2026-09-24T18:15:25+03:00",
        "date_finish": "2026-09-24T18:15:25+03:00",
        "operating_reset_at": 1790263525,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с ключом `fields` [(подробное описание)](#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект fields {#fields}

Ключ — имя поля эпика в методах [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md) и [tasks.api.scrum.epic.update](./tasks-api-scrum-epic-update.md), значение — объект с типом поля `type`. В методе [tasks.api.scrum.epic.list](./tasks-api-scrum-epic-list.md) те же поля передаются в верхнем регистре.

#|
|| **Поле**
`type` | **Описание** ||
|| **name**
`string` | Название эпика ||
|| **description**
`string` | Описание эпика ||
|| **groupId**
`integer` | Идентификатор Скрама, к которому относится эпик ||
|| **color**
`string` | Цвет эпика ||
|| **files**
`array` | Идентификаторы файлов Диска с префиксом `n` ||
|| **createdBy**
`integer` | Идентификатор пользователя, создавшего эпик ||
|| **modifiedBy**
`integer` | Идентификатор пользователя, который последним изменил эпик ||
|#

## Обработка ошибок

У метода нет своих ошибок. Пример общей ошибки — токен приложения без scope `task`:

HTTP-статус: **401**

```json
{
    "error": "insufficient_scope",
    "error_description": "The request requires higher privileges than provided by the access token"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-update.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-list.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
