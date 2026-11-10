# Получить список стадий канбана или «Моего плана» task.stages.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь для стадий своего «Моего плана»
> - пользователь с правом просматривать задачи группы для стадий канбана группы

Метод `task.stages.get` получает стадии канбана или «Моего плана». Если стадий еще нет, метод сначала создаст стандартные стадии.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../data-types.md) | Чьи стадии получить:
- `ID` группы — стадии канбана группы. Если у пользователя нет права просматривать задачи группы, метод вернет ошибку доступа
- `0` — стадии «Моего плана» текущего пользователя ||
|| **numeric**
[`boolean`](../../data-types.md) | Если передать `true`, метод вернет стадии массивом, а не объектом с ключами-идентификаторами. По умолчанию — `false` ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если передать `true`, метод не проверяет права в группе. Параметр действует только для администратора Битрикс24, у других пользователей права проверяются как обычно. По умолчанию — `false` ||
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
    "entityId": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.stages.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
    "entityId": 0,
    "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.stages.get
    ```

- JS (TS)

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
      CAN_SORT_ITEMS?: boolean
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

- JS (UMD)

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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.task.stages.get(
            entity_id=0,
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
        $entityId = 0;
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.stages.get", b24.Params{
    	"entityId": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("task.stages.get: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "19": {
            "ID": "19",
            "TITLE": "Не спланированы",
            "SORT": "100",
            "COLOR": "00C4FB",
            "SYSTEM_TYPE": "NEW",
            "ENTITY_ID": "129",
            "ENTITY_TYPE": "U",
            "ADDITIONAL_FILTER": [],
            "TO_UPDATE": [],
            "TO_UPDATE_ACCESS": null,
            "CAN_SORT_ITEMS": true
        },
        "20": {
            "ID": "20",
            "TITLE": "В работе",
            "SORT": "200",
            "COLOR": "9DCF00",
            "SYSTEM_TYPE": null,
            "ENTITY_ID": "129",
            "ENTITY_TYPE": "U",
            "ADDITIONAL_FILTER": [],
            "TO_UPDATE": [],
            "TO_UPDATE_ACCESS": null
        }
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
[`object`](../../data-types.md) | Стадии канбана или «Моего плана». Ключ — идентификатор стадии, значение — объект стадии [(подробное описание)](#stage).

Если передать `numeric: true`, придет массив объектов стадий ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект стадии {#stage}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор стадии ||
|| **TITLE**
[`string`](../../data-types.md) | Название стадии ||
|| **SORT**
[`string`](../../data-types.md) | Порядковый номер стадии: чем меньше число, тем левее стадия в канбане ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет стадии — шестнадцатеричный код RGB без `#` ||
|| **SYSTEM_TYPE**
[`string`](../../data-types.md) | Системный тип стадии: `NEW`, `WORK`, `REVIEW` или `FINISH`. Стадию с системным типом нельзя удалить. У первой стадии всегда `NEW`. У обычной стадии — `null` или пустая строка ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор группы или пользователя, которому принадлежат стадии ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип владельца стадий: `U` — «Мой план» пользователя, `G` — канбан группы ||
|| **ADDITIONAL_FILTER**
[`array`](../../data-types.md) | Системный параметр, всегда пустой массив ||
|| **TO_UPDATE**
[`array`](../../data-types.md) | Системный параметр, всегда пустой массив ||
|| **TO_UPDATE_ACCESS**
[`null`](../../data-types.md) | Системный параметр, всегда `null` ||
|| **CAN_SORT_ITEMS**
[`boolean`](../../data-types.md) | Можно ли сортировать задачи внутри стадии. Приходит только у стадий с системным типом ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Вы не можете просматривать задачи в этой группе"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ACCESS_DENIED` | Вы не можете просматривать задачи в этой группе | У пользователя нет права просматривать задачи группы из `entityId` ||
|| `400` | `DISPATCHER_ERROR` | Argument "entityid" is required, but no value passed for task.stages.get | Не передан обязательный параметр `entityId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-stages-add.md)
- [{#T}](./task-stages-update.md)
- [{#T}](./task-stages-delete.md)
- [{#T}](./task-stages-can-move-task.md)
- [{#T}](./task-stages-move-task.md)
