# Получить список записей о затраченном времени task.elapseditem.getlist

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.elapseditem.getlist` возвращает список записей о затраченном времени по задаче.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки результата (подробное описание приведено ниже) ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации результата (подробное описание приведено ниже) ||
|| **select**
[`array`](../../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля. 

По умолчанию будут возвращены все поля основной таблицы запроса ||
|| **params**
[`object`](../../data-types.md) | Объект для опций вызова. Элементом является объект `NAV_PARAMS` вида `{'опция вызова': 'значение' [, ...]}` (подробное описание приведено ниже) в виде структуры ||
|#

{% note warning %}

Метод принимает параметры позиционно. Соблюдайте порядок из таблицы: `taskId`, `order`, `filter`, `select`, `params`. Если передать `order`, `filter`, `select` и `params` как именованные поля одного объекта, запрос выполнится с ошибкой.

{% endnote %}


{% note info %}

Особенности ручного добавления информации о времени работы, которая была фактически выполнена несколько дней назад. В этом случае меняется значение некоторых полей:
- `CREATED_DATE` — дата начала
- `DATE_START` — дата создания записи
- `DATE_STOP` — дата окончания записи

{% endnote %}

### Параметр order

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор записи о затраченном времени. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, от имени которого была сделана запись о затраченном времени. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **MINUTES**
[`string`](../../data-types.md) | Затраченное время, минуты. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **SECONDS**
[`string`](../../data-types.md) | Затраченное время, секунды. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **CREATED_DATE**
[`string`](../../data-types.md) | Дата создания записи. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **DATE_START**
[`string`](../../data-types.md) | Дата начала. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **DATE_STOP**
[`string`](../../data-types.md) | Дата конца. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|#


### Параметр filter

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор записи о затраченном времени ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого была сделана запись о затраченном времени ||
|| **CREATED_DATE**
[`datetime`](../../data-types.md) | Дата создания записи ||
|#

{% note info %}

Перед названием фильтруемого поля можно указать тип фильтрации:
- "!" — не равно
- "<" — меньше
- "<=" — меньше либо равно
- ">" — больше
- ">=" — больше либо равно

*'значения фильтра'* — одиночное значение или массив

{% endnote %}

### Параметр NAV_PARAMS

#|
|| **Название**
`тип` | **Описание** ||
|| **nPageSize**
[`integer`](../../data-types.md) | Количество элементов на странице. В целях ограничения нагрузки на постраничную навигацию наложено ограничение в 50 записей ||
|| **iNumPage**
[`integer`](../../data-types.md) | Номер страницы при постраничной навигации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '[3839,{"ID":"asc"},{"USER_ID":1},["ID","TASK_ID","USER_ID","SECONDS","MINUTES","COMMENT_TEXT","CREATED_DATE"],{"NAV_PARAMS":{"nPageSize":2,"iNumPage":1}}]' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.elapseditem.getlist
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '[3839,{"ID":"asc"},{"USER_ID":1},["ID","TASK_ID","USER_ID","SECONDS","MINUTES","COMMENT_TEXT","CREATED_DATE"],{"NAV_PARAMS":{"nPageSize":2,"iNumPage":1}}]' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.getlist?auth=**put_access_token_here**
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ElapsedItem = {
      ID: string
      TASK_ID: string
      USER_ID: string
      COMMENT_TEXT: string
      SECONDS: string
      MINUTES: string
      SOURCE: string
      CREATED_DATE: ISODate | null
      DATE_START: ISODate | null
      DATE_STOP: ISODate | null
    }

    try {
      // task.elapseditem.getlist returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make variant when sort matters.
      const response = await $b24.actions.v2.call.make<ElapsedItem[]>({
        method: 'task.elapseditem.getlist',
        params: [
          3839,
          { ID: 'asc' },
          { USER_ID: 1 },
          ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
          { NAV_PARAMS: { nPageSize: 2, iNumPage: 1 } },
        ],
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Elapsed items count:', result.length, 'First item:', result[0])
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
      async function getElapsedItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // task.elapseditem.getlist returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'task.elapseditem.getlist',
            params: [
              3839,
              { ID: 'asc' },
              { USER_ID: 1 },
              ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
              { NAV_PARAMS: { nPageSize: 2, iNumPage: 1 } },
            ],
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Elapsed items count:', result.length, 'First item:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getElapsedItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    order = {
        "ID": "asc",
    }

    filter = {
        "USER_ID": 1,
    }

    try:
        bitrix_response = client.task.elapseditem.getlist(
            taskid=3839,
            order=order,
            filter=filter,
            select=["ID", "TASK_ID", "USER_ID", "SECONDS", "MINUTES", "COMMENT_TEXT", "CREATED_DATE"],
            params={
                "NAV_PARAMS": {
                    "nPageSize": 2,
                    "iNumPage": 1,
                },
            },
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
                'task.elapseditem.getlist',
                [
                    3839,
                    ['ID' => 'asc'],
                    ['USER_ID' => 1],
                    ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
                    [
                        'NAV_PARAMS' => [
                            'nPageSize' => 2,
                            'iNumPage' => 1,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting elapsed time records: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.elapseditem.getlist',
        [
            3839,
            {'ID': 'asc'},
            {'USER_ID': 1},
            ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
            {"NAV_PARAMS":{
                    "nPageSize":2,
                    "iNumPage":1
                }
            },
        ],
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
    require_once('crest.php');

    $result = CRest::call(
        'task.elapseditem.getlist',
        [
            3839,
            ['ID' => 'asc'],
            ['USER_ID' => 1],
            ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
            [
                'NAV_PARAMS' => [
                    'nPageSize' => 2,
                    'iNumPage' => 1,
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "task.elapseditem.getlist", []any{
        3839,
        b24.Params{
            "ID": "asc",
        },
        b24.Params{
            "USER_ID": 1,
        },
        []string{"ID", "TASK_ID", "USER_ID", "SECONDS", "MINUTES", "COMMENT_TEXT", "CREATED_DATE"},
        b24.Params{
            "NAV_PARAMS": b24.Params{
                "nPageSize": 2,
                "iNumPage": 1,
            },
        },
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("task.elapseditem.getlist: %w", err)
    }

    var items []struct {
    	ID          b24.ID `json:"ID"`
    	TaskID      b24.ID `json:"TASK_ID"`
    	UserID      b24.ID `json:"USER_ID"`
    	CommentText string `json:"COMMENT_TEXT"`
    	Seconds     string `json:"SECONDS"`
    	Minutes     string `json:"MINUTES"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.TaskID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":[
        {
            "ID": "153",
            "TASK_ID": "3839",
            "USER_ID": "1",
            "COMMENT_TEXT": "",
            "SECONDS": "5100",
            "MINUTES": "85",
            "CREATED_DATE": "2025-12-18T14:16:51+03:00"
        },
        {
            "ID": "155",
            "TASK_ID": "3839",
            "USER_ID": "1",
            "COMMENT_TEXT": "",
            "SECONDS": "23",
            "MINUTES": "0",
            "CREATED_DATE": "2025-12-18T14:16:37+03:00"
        }
    ],
    "total": 2,
    "time":{
        "start":1787829762,
        "finish":1787829762.985642,
        "duration":0.9856419563293457,
        "processing":0,
        "date_start":"2026-08-27T14:22:42+03:00",
        "date_finish":"2026-08-27T14:22:42+03:00",
        "operating_reset_at":1787830362,
        "operating":0.11980605125427246
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с информацией о записях о затраченном времени по задаче ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"ACTION_NOT_ALLOWED"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0x100002` | Доступ запрещен ||
|| `0x000004` | Действие не разрешено ||
|| `0x000040` | Неизвестная ошибка ||
|| `0x000100` | Переданы неверные параметры метода ||
|| `ERROR_CORE` | Ошибка выполнения действия. Проверьте доступ к задаче и порядок позиционных параметров метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-elapsed-item-add.md)
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)
