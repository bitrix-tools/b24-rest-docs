# Получить список стадий канбана или «Моего плана» task.stages.get

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

Метод получает стадии канбана или «Моего плана».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../data-types.md) | Идентификатор объекта.

Возможные значения:
- `ID` группы — метод получит стадии канбана группы. При недостаточном уровне прав выводится ошибка доступа
- `0` — метод получит стадии «Моего плана» текущего пользователя ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "entityId": 0
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "entityId": 0
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.get
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each stage in the result map
    type StageInfo = {
      ID: string
      TITLE: string
      SORT: string
      COLOR: string
      SYSTEM_TYPE: string | null
      ENTITY_ID: string
      ENTITY_TYPE: string
      ADDITIONAL_FILTER: unknown[]
      TO_UPDATE: unknown[]
      TO_UPDATE_ACCESS: null
    }

    // result is a map of stage ID → StageInfo
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StagesGetResult = Record<string, StageInfo>

    try {
      const response = await $b24.actions.v2.call.make<StagesGetResult>({
        method: 'task.stages.get',
        params: {
          entityId: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Stages:', Object.values(result).map(s => `${s.ID}: ${s.TITLE}`))
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
      async function getTaskStages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.stages.get',
            params: {
              entityId: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Stages:', Object.values(result).map(s => `${s.ID}: ${s.TITLE}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskStages)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.stages.get',
                [
                    'entityId' => $entityId,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task stages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const entityId = 0;
    BX24.callMethod(
        'task.stages.get',
        {
            entityId: entityId,
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

    $entityId = 0;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.get',
        [
            'entityId' => $entityId
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

HTTP-Статус: **200**

```json
{
    "result": {
        "5": {
         "ID": "5",
         "TITLE": "Не спланированы",
         "SORT": "100",
         "COLOR": "00C4FB",
         "SYSTEM_TYPE": "NEW",
         "ENTITY_ID": "1",
         "ENTITY_TYPE": "U",
         "ADDITIONAL_FILTER": [],
         "TO_UPDATE": [],
         "TO_UPDATE_ACCESS": null
        },
        "6": {
         "ID": "6",
         "TITLE": "Сделаю на неделе",
         "SORT": "200",
         "COLOR": "47D1E2",
         "SYSTEM_TYPE": null,
         "ENTITY_ID": "1",
         "ENTITY_TYPE": "U",
         "ADDITIONAL_FILTER": [],
         "TO_UPDATE": [],
         "TO_UPDATE_ACCESS": null
        }
    }
}
```

## Возвращаемые данные

#|
|| **Поле**
`тип` | **Описание** ||
|| **result** 
`object` | Объект, содержащий данные о стадиях Канбана / Моего плана, ключами которого являются идентификаторы стадий ||
|| **ID** 
`integer` | Идентификатор стадии ||
|| **TITLE** 
`string` | Название ||
|| **SORT** 
`integer` | Сортировка ||
|| **COLOR** 
`string` | Цвет в формате RGB ||
|| **SYSTEM_TYPE** 
`string` | Системный тип. Возможные значения: `NEW`, `PROGRESS`, `WORK`, `REVIEW`, `FINISH` ||
|| **ENTITY_ID** 
`integer` | Идентификатор объекта, то есть группы или пользователя ||
|| **ENTITY_TYPE** 
`string` | Тип объекта. `U` для пользователя, `G` для группы ||
|| **ADDITIONAL_FILTER** 
`array` | Дополнительные фильтры. 

Системный параметр. Всегда имеет значение пустого массива ||
|| **TO_UPDATE** 
`array` | Массив элементов для обновления.

Системный параметр. Всегда имеет значение пустого массива ||
|| **TO_UPDATE_ACCESS** 
`null` | Функции, применяемые к задаче при переносе на эту стадию.

Системный параметр. Всегда имеет значение `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Вы не можете просматривать стадии в этой группе"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Значение** ||
|| `ACCESS_DENIED` | Вы не можете просматривать стадии в этой группе ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
- [{#T}](./task-stages-delete.md)