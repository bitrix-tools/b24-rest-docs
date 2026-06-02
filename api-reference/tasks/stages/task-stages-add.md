# Добавить стадию канбана или «Моего плана» task.stages.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий «Моего плана»
> - любой пользователь с доступом к группе для стадий канбана

Метод добавляет стадию канбана или «Моего плана».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой стадии ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../data-types.md) | Заголовок стадии ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет стадии в формате RGB ||
|| **AFTER_ID**
[`integer`](../../data-types.md) | Идентификатор стадии, после которой надо добавить новую стадию.

Если не указано или равно `0`, то добавится в начало ||
|| **ENTITY_ID**
[`integer`](../../data-types.md)| Идентификатор объекта.

Может равняться `ID` группы, тогда стадия добавится в канбан группы.

Если равняется `0` или отсутствует, то стадия добавляется в «Мой план» текущего пользователя.

При недостаточном уровне прав выводится ошибка доступа  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.add
    ```

- TS

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
            TITLE: 'Stage title',
            COLOR: '#FFAAEE',
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

- UMD

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
                TITLE: 'Stage title',
                COLOR: '#FFAAEE',
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
                        'COLOR'    => '#FFAAEE',
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
                COLOR: '#FFAAEE',
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
        "COLOR" => "#FFAAEE",
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`integer`](../../data-types.md) | Идентификатор добавленной стадии ||
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
|| **Код** | **Описание** ||
|| `EMPTY_TITLE` | Не указан заголовок стадии ||
|| `ACCESS_DENIED` | Вы не можете управлять стадиями ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-get.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
- [{#T}](./task-stages-delete.md)