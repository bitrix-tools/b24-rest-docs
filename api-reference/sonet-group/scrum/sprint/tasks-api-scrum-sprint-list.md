# Получить список спринтов tasks.api.scrum.sprint.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.sprint.list` возвращает список спринтов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

Все параметры необязательные. Метод возвращает только спринты Скрамов, в которых состоит пользователь, без параметров — все такие спринты. Имена полей в `order`, `filter` и `select` указывайте в верхнем регистре, доступные поля — в таблице [Доступные поля для filter, order и select](#fields).

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект вида `{'поле_сортировки': 'направление_сортировки' [, ...]}`, например `{"ID": "desc"}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **filter**
[`object`](../../../data-types.md) | Объект вида `{'фильтруемое_поле': 'значение фильтра' [, ...]}`, например `{"GROUP_ID": 1, "STATUS": "active"}`.

Перед именем поля можно указать оператор:
- `>` и `<` — больше и меньше
- `>=` и `<=` — больше или равно, меньше или равно
- `!` — не равно
- `%` — содержит подстроку

Например, `{">ID": 20}` или `{"%NAME": "Спринт"}`.

Если указано несуществующее поле, например `groupId` вместо `GROUP_ID`, метод вернет пустой массив без ошибки ||
|| **select**
[`array`](../../../data-types.md) | Массив полей, которые нужно заполнить в ответе, например `["ID", "NAME", "STATUS"]`.

Если в массиве есть значение `"*"` или массив не передан, заполняются все поля.

Ответ всегда содержит полный набор ключей спринта. Поля, которых нет в `select`, возвращаются с пустыми значениями: `0` для чисел и `""` для строк ||
|| **start**
[`integer`](../../../data-types.md) | Смещение для постраничной навигации. Метод возвращает до 50 спринтов за вызов. Чтобы получить следующую страницу, увеличьте `start` на 50. Ответ не содержит полей `total` и `next`: если пришло меньше 50 спринтов, это последняя страница ||
|#

### Доступные поля для filter, order и select {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID** 
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **GROUP_ID** 
[`integer`](../../../data-types.md) | Идентификатор Скрама. Получить идентификатор можно методом [socialnetwork.api.workgroup.list](../../socialnetwork-api-workgroup-list.md) ||
|| **ENTITY_TYPE** 
[`string`](../../../data-types.md) | Тип элемента, для спринтов всегда `sprint` ||
|| **NAME** 
[`string`](../../../data-types.md) | Название спринта ||
|| **SORT** 
[`integer`](../../../data-types.md) | Порядок сортировки спринта ||
|| **CREATED_BY** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего спринт ||
|| **MODIFIED_BY** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, изменившего спринт ||
|| **DATE_START** 
[`string`](../../../data-types.md) | Дата начала спринта. Поле можно использовать в `order` и `select`. Фильтр по дате не срабатывает: метод возвращает пустой массив при любом формате значения ||
|| **DATE_END** 
[`string`](../../../data-types.md) | Дата окончания спринта. Поле можно использовать в `order` и `select`. Фильтр по дате не срабатывает, как и для `DATE_START` ||
|| **STATUS** 
[`string`](../../../data-types.md) | Статус: `planned` — запланирован, `active` — активен, `completed` — завершен ||
|| **INFO** 
[`object`](../../../data-types.md) | Служебное поле. В ответе метода не возвращается ||
|#

Поля `GOAL` в `filter`, `order` и `select` нет: с ним метод возвращает пустой массив. Цель спринта приходит только в ответе, в поле `goal`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "filter": {
        "GROUP_ID": 1,
        "STATUS": "active"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "filter": {
        "GROUP_ID": 1,
        "STATUS": "active"
    },
    "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each sprint returned in result[]
    type Sprint = {
      id: number
      groupId: number
      entityType: string
      name: string
      goal: string
      sort: number
      createdBy: number
      modifiedBy: number
      dateStart: ISODate | null
      dateEnd: ISODate | null
      status: string
    }

    const groupId = 1

    // tasks.api.scrum.sprint.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<Sprint[]>({
        method: 'tasks.api.scrum.sprint.list',
        params: {
          filter: {
            GROUP_ID: groupId,
            STATUS: 'active',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sprints:', result.length, result)
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
      async function listScrumSprints() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const groupId = 1

          // tasks.api.scrum.sprint.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.sprint.list',
            params: {
              filter: {
                GROUP_ID: groupId,
                STATUS: 'active',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sprints:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listScrumSprints)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.sprint.list(
            filter={
                "GROUP_ID": 1,
                "STATUS": "active",
            },
            start=0,
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
    $groupId = 1;
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.sprint.list',
                [
                    'filter' => [
                        'GROUP_ID'    => $groupId,
                        'STATUS'   => 'active',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching sprint list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const groupId = 1;
    BX24.callMethod(
        'tasks.api.scrum.sprint.list',
        {
            filter: {
                GROUP_ID: groupId,
                STATUS: 'active'
            }
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

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.list',
        [
            'filter' => [
                'GROUP_ID' => 1,
                'STATUS' => 'active'
            ]
        ]
    );

    // Обработка ответа от Битрикс24
    if (isset($result['error'])) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.api.scrum.sprint.list", b24.Params{
    	"filter": b24.Params{
    		"GROUP_ID": 1,
    		"STATUS":   "active",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.sprint.list: %w", err)
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
    "result": [
        {
            "id": 3,
            "groupId": 1,
            "entityType": "sprint",
            "name": "Sprint 1",
            "goal": "",
            "sort": 1,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateStart": "2021-11-21T22:00:00+00:00",
            "dateEnd": "2021-11-28T22:00:00+00:00",
            "status": "active"
        }
    ],
    "time": {
        "start": 1790580587,
        "finish": 1790580587.569156,
        "duration": 0.5691559314727783,
        "processing": 0,
        "date_start": "2026-09-28T10:29:47+03:00",
        "date_finish": "2026-09-28T10:29:47+03:00",
        "operating_reset_at": 1790581187,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`array`](../../../data-types.md) | Массив спринтов. Если под фильтр не подошел ни один спринт, метод возвращает пустой массив, а не ошибку. Поля элемента массива [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **groupId** 
[`integer`](../../../data-types.md) | Идентификатор группы (Скрама), к которой относится спринт ||
|| **entityType** 
[`string`](../../../data-types.md) | Тип объекта, для спринтов всегда `sprint` ||
|| **name** 
[`string`](../../../data-types.md) | Название спринта ||
|| **goal** 
[`string`](../../../data-types.md) | Цель спринта. Устанавливается только в интерфейсе при запуске спринта ||
|| **sort** 
[`integer`](../../../data-types.md) | Порядок сортировки спринта ||
|| **createdBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего спринт ||
|| **modifiedBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, изменившего спринт ||
|| **dateStart** 
[`string`](../../../data-types.md) | Дата начала спринта в формате `ISO 8601` ||
|| **dateEnd** 
[`string`](../../../data-types.md) | Дата окончания спринта в формате `ISO 8601` ||
|| **status** 
[`string`](../../../data-types.md) | Статус спринта: `planned` — запланирован, `active` — активен, `completed` — завершен ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Could not load list"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | `Could not load list` | Ошибка при выполнении запроса к базе данных ||
|| `400` | `0` | Текст системной ошибки PHP, например `Cannot access offset of type string on string` | Параметр `filter`, `order` или `select` передан строкой, а не объектом или массивом ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-sprint-add.md)
- [{#T}](./tasks-api-scrum-sprint-update.md)
- [{#T}](./tasks-api-scrum-sprint-get.md)
- [{#T}](./tasks-api-scrum-sprint-delete.md)
- [{#T}](./tasks-api-scrum-sprint-start.md)
- [{#T}](./tasks-api-scrum-sprint-complete.md)
- [{#T}](./tasks-api-scrum-sprint-get-fields.md)
