# Изменить спринт tasks.api.scrum.sprint.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод `tasks.api.scrum.sprint.update` изменяет спринт.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор спринта.

Идентификатор можно получить методом [tasks.api.scrum.sprint.list](./tasks-api-scrum-sprint-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с данными спринта [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId** 
[`integer`](../../../data-types.md) | Идентификатор группы (Скрама), к которой относится спринт. 

Идентификатор можно получить методом [socialnetwork.api.workgroup.list](../../socialnetwork-api-workgroup-list.md). Группа является Скрамом, если у нее заполнено поле `SCRUM_MASTER_ID`.

Другой `groupId` переносит спринт в другой Скрам. Перенести можно только спринт без задач ||
|| **name** 
[`string`](../../../data-types.md) | Название спринта ||
|| **createdBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего спринт.

Идентификатор можно получить методом [user.get](../../../user/user-get.md) ||
|| **modifiedBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, изменившего спринт ||
|| **sort** 
[`integer`](../../../data-types.md) | Порядок сортировки спринта ||
|| **dateStart** 
[`string`](../../../data-types.md) | Дата начала спринта. Доступные форматы: `ISO 8601`, `timestamp` ||
|| **dateEnd** 
[`string`](../../../data-types.md) | Дата окончания спринта. Доступные форматы: `ISO 8601`, `timestamp` ||
|| **status** 
[`string`](../../../data-types.md) | Статус спринта. Доступные значения:
- `planned` — запланирован
- `active` — активен. В Скраме может быть только один активный спринт
- `completed` — завершен

Чтобы запустить или завершить спринт, используйте методы [tasks.api.scrum.sprint.start](./tasks-api-scrum-sprint-start.md) и [tasks.api.scrum.sprint.complete](./tasks-api-scrum-sprint-complete.md) ||
|#

Передавайте в `fields` только поля, которые нужно изменить. Остальные поля спринта сохраняют прежние значения.

{% note warning "" %}

Метод не проверяет формат дат при изменении. Если в `dateStart` или `dateEnd` передать строку, которая не является датой, метод вернет успешный ответ и запишет дату `1970-01-01`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 2,
    "fields": {
        "name": "Sprint 2",
        "groupId": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 2,
    "fields": {
        "name": "Sprint 2",
        "groupId": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SprintResult = {
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

    try {
      const response = await $b24.actions.v2.call.make<SprintResult>({
        method: 'tasks.api.scrum.sprint.update',
        params: {
          id: 2,
          fields: {
            name: 'Sprint 2',
            groupId: 1,
            dateStart: '2021-11-22T00:00:00+02:00',
            dateEnd: '2021-11-29T00:00:00+02:00',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated sprint:', result.id, result.name, result.status)
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
      async function updateSprint() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.sprint.update',
            params: {
              id: 2,
              fields: {
                name: 'Sprint 2',
                groupId: 1,
                dateStart: '2021-11-22T00:00:00+02:00',
                dateEnd: '2021-11-29T00:00:00+02:00',
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
          console.info('Updated sprint:', result.id, result.name, result.status)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSprint)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.sprint.update(
            bitrix_id=2,
            fields={
                "name": "Sprint 2",
                "groupId": 1,
                "dateStart": "2021-11-22T00:00:00+02:00",
                "dateEnd": "2021-11-29T00:00:00+02:00",
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
    $sprintId = 2;
    $groupId = 1;
    $name = 'Sprint 2';
    $dateStart = '2021-11-22T00:00:00+02:00';
    $dateEnd = '2021-11-29T00:00:00+02:00';

    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.sprint.update',
                [
                    'id' => $sprintId,
                    'fields' => [
                        'name'      => $name,
                        'groupId'   => $groupId,
                        'dateStart' => $dateStart,
                        'dateEnd'   => $dateEnd,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating sprint: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const sprintId = 2;
    const groupId = 1;
    const name = 'Sprint 2';
    const dateStart = '2021-11-22T00:00:00+02:00';
    const dateEnd = '2021-11-29T00:00:00+02:00';
    BX24.callMethod(
        'tasks.api.scrum.sprint.update',
        {
            id: sprintId,
            fields: {
                name: name,
                groupId: groupId,
                dateStart: dateStart,
                dateEnd: dateEnd,
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
        'tasks.api.scrum.sprint.update',
        [
            'id' => 2,
            'fields' => [
                'name' => 'Sprint 2',
                'groupId' => 1,
                'dateStart' => '2021-11-22T00:00:00+02:00',
                'dateEnd' => '2021-11-29T00:00:00+02:00'
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
    res, err := client.Core().Call(ctx, "tasks.api.scrum.sprint.update", b24.Params{
    	"id": 2,
    	"fields": b24.Params{
    		"name":      "Sprint 2",
    		"groupId":   1,
    		"dateStart": "2021-11-22T00:00:00+02:00",
    		"dateEnd":   "2021-11-29T00:00:00+02:00",
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.sprint.update: %w", err)
    }

    var item struct {
    	ID         b24.ID `json:"id"`
    	GroupID    b24.ID `json:"groupId"`
    	EntityType string `json:"entityType"`
    	Name       string `json:"name"`
    	Goal       string `json:"goal"`
    	Sort       int    `json:"sort"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.GroupID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 2,
        "groupId": 1,
        "entityType": "sprint",
        "name": "Sprint 2",
        "goal": "",
        "sort": 1,
        "createdBy": 1,
        "modifiedBy": 1,
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00",
        "status": "planned"
    },
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
[`object`](../../../data-types.md) | Данные спринта [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

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
    "error_description": "Sprint not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | `Access denied` | Нет доступа к Скраму ||
|| `400` | `0` | `Sprint id not found` | В параметре `id` передан `0` ||
|| `400` | `0` | `Sprint not found` | Спринт с указанным `id` не найден ||
|| `400` | `0` | `It is forbidden move a sprint with items` | Передан другой `groupId`, а в спринте есть задачи ||
|| `400` | `0` | `createdBy user not found` | Пользователь с идентификатором из поля `createdBy` не найден ||
|| `400` | `0` | `modifiedBy user not found` | Пользователь с идентификатором из поля `modifiedBy` не найден ||
|| `400` | `0` | `Unable to add two active sprint` | Спринт нельзя перевести в статус `active`: в Скраме уже есть активный спринт ||
|| `400` | `0` | `Incorrect sprint status` | Значение `status` не из списка `planned`, `active`, `completed` ||
|| `400` | `0` | `Sprint not updated` | Не удалось сохранить изменения спринта ||
|| `400` | `100` | `Could not find value for parameter {id}` | Не передан параметр `id` ||
|| `400` | `100` | `Invalid value {stringValue} to match with parameter {id}. Should be value of type int` | Параметр `id` не является числом ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан параметр `fields` ||
|| `400` | `100` | `Invalid value {stringValue} to match with parameter {fields}. Should be value of type array` | Параметр `fields` не является объектом ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-sprint-add.md)
- [{#T}](./tasks-api-scrum-sprint-get.md)
- [{#T}](./tasks-api-scrum-sprint-list.md)
- [{#T}](./tasks-api-scrum-sprint-delete.md)
- [{#T}](./tasks-api-scrum-sprint-start.md)
- [{#T}](./tasks-api-scrum-sprint-complete.md)
- [{#T}](./tasks-api-scrum-sprint-get-fields.md)
