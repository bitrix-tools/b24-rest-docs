# Обновить эпик в Скраме tasks.api.scrum.epic.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод обновляет эпик в Скраме.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор эпика.

Получить идентификаторы эпиков можно методом [`tasks.api.scrum.epic.list`](./tasks-api-scrum-epic-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля эпика, которые нужно изменить [(подробное описание)](#fields), в виде структуры:

```js
fields: {
    name: 'значение',
    groupId: 'значение',
    description: 'значение',
    color: 'значение',
    files: [
        'файл1',
        'файл2',
        ...
    ]

}
```
||
|#

### Параметр fields {#fields}

Передайте только те поля, которые нужно изменить. Остальные поля эпика метод оставит без изменений.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название эпика, до 255 символов. Пустую строку метод не сохраняет ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор Скрама, в который нужно перенести эпик. Нужен доступ к задачам обеих групп ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика, например `#bbecf1`, до 18 символов ||
|| **files**
[`array`](../../../data-types.md) | Массив идентификаторов файлов Диска с префиксом `n`, например `["n429"]`.

Новые файлы добавляются к уже прикрепленным.

{% note warning "Внимание" %}

Если передать пустой массив, метод открепит от эпика все файлы. Идентификатор без префикса `n` метод пропускает без ошибки

{% endnote %}

||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который будет указан создателем эпика ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который будет указан последним изменившим эпик. По умолчанию — текущий пользователь ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1,
    "fields": {
        "name": "Updated epic name",
        "description": "Updated description text",
        "color": "#bbecf1",
        "files": ["n429", "n243"]
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1,
    "fields": {
        "name": "Updated epic name",
        "description": "Updated description text",
        "color": "#bbecf1",
        "files": ["n429", "n243"]
    },
    "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EpicUpdateResult = {
      id: number
      groupId: number
      name: string
      description: string
      createdBy: number
      modifiedBy: number
      color: string
    }

    try {
      const response = await $b24.actions.v2.call.make<EpicUpdateResult>({
        method: 'tasks.api.scrum.epic.update',
        params: {
          id: 1,
          fields: {
            name: 'Updated epic name',
            description: 'Updated description text',
            color: '#bbecf1',
            files: ['n429', 'n243'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated epic:', result.id, result.name, result.color)
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
      async function updateEpic() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.epic.update',
            params: {
              id: 1,
              fields: {
                name: 'Updated epic name',
                description: 'Updated description text',
                color: '#bbecf1',
                files: ['n429', 'n243'],
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
          console.info('Updated epic:', result.id, result.name, result.color)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEpic)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.update(
            bitrix_id=1,
            fields={
                "name": "Updated epic name",
                "description": "Updated description text",
                "color": "#bbecf1",
                "files": [
                    "n429",
                    "n243",
                ],
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
        $epicId = 1;
        $name = 'Updated epic name';
        $description = 'Updated description text';
        $color = '#bbecf1';
        $files = ['n429', 'n243'];
    
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.epic.update',
                [
                    'id' => $epicId,
                    'fields' => [
                        'name' => $name,
                        'description' => $description,
                        'color' => $color,
                        'files' => $files
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating epic: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const epicId = 1;
    const name = 'Updated epic name';
    const description = 'Updated description text';
    const color = '#bbecf1';
    const files = ['n429', 'n243'];
    BX24.callMethod(
        'tasks.api.scrum.epic.update',
        {
            id: epicId,
            fields:{
                name: name,
                description: description,
                color: color,
                files: files
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
    $epicId = 1;
    $name = 'Updated epic name';
    $description = 'Updated description text';
    $color = '#bbecf1';
    $files = ['n429', 'n243'];

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.update',
    [
        'id' => $epicId,
        'fields' => [
            'name' => $name,
            'description' => $description,
            'color' => $color,
            'files' => $files
        ]
    ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    }
    else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 1,
        "groupId": 143,
        "name": "Updated epic name",
        "description": "Updated description text",
        "createdBy": 1,
        "modifiedBy": 1,
        "color": "#bbecf1"
    },
    "time": {
        "start": 1790263154,
        "finish": 1790263154.532794,
        "duration": 0.5327939987182617,
        "processing": 0,
        "date_start": "2026-09-24T18:19:14+03:00",
        "date_finish": "2026-09-24T18:19:14+03:00",
        "operating_reset_at": 1790263754,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные эпика после изменения [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор Скрама, к которому относится эпик ||
|| **name**
[`string`](../../../data-types.md) | Название эпика ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего эпик ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил эпик ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика ||
|#

Прикрепленные файлы метод не возвращает. Получить их можно методом [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Epic not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Epic not found | Эпика с таким `id` не существует ||
|| `400` | `0` | Access denied | У пользователя нет доступа к задачам группы эпика или группы из `groupId`, либо такой группы не существует ||
|| `400` | `0` | createdBy user not found | Пользователя из `createdBy` не существует ||
|| `400` | `0` | modifiedBy user not found | Пользователя из `modifiedBy` не существует ||
|| `400` | `0` | Epic not updated | Не удалось сохранить изменения, например название длиннее 255 символов или цвет длиннее 18 символов ||
|| `400` | `0` | Epic files not attached | Изменения сохранены, но файлы прикрепить не удалось ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-list.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)