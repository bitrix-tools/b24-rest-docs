# Добавить универсальное дело crm.activity.todo.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого дабавляется дело

Метод `crm.activity.todo.add` добавляет универсальное дело в таймлайн. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому привязано дело, например, `1` ||
|| **deadline***
[`datetime`](../../../../data-types.md) | Крайний срок дела, например  `2025-02-03T15:00:00` ||
|| **title**
[`string`](../../../../data-types.md) | Название дела, по умолчанию пустая строка ||
|| **description**
[`string`](../../../../data-types.md) | Описание дела, по умолчанию пустая строка ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Идентификатор пользователя, ответственного за дело, например `1` ||
|| **parentActivityId**
[`integer`](../../../../data-types.md) | Идентификатор дела в таймлайне, с которым можно связать создаваемое дело, например `888` ||
|| **pingOffsets**
[`array`](../../../../data-types.md) | Массив, который содержит целочисленные значения в минутах, позволяющие настроить время напоминания о деле. Например `[0, 15]` означает, что будет создано 2 напоминания, которые придут за 15 минут до крайнего срока и в момент, когда крайний срок наступит. По умолчанию пустой массив, без напоминаний ||
|| **colorId**
[`string`](../../../../data-types.md) | Идентификатор цвета дела в таймлайне, например `1`. Для выбора доступно 8 цветов, значения от 1 до 7 и цвет по умолчанию, если ничего не указано:

![Доступные цвета](./_images/colors.png)

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerTypeId":2,"ownerId":1,"deadline":"'"$(date -Iseconds)"'","title":"Заголовок дела","description":"Описание дела","responsibleId":5,"pingOffsets":[0,15],"colorId":"2"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.todo.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerTypeId":2,"ownerId":1,"deadline":"'"$(date -Iseconds)"'","title":"Заголовок дела","description":"Описание дела","responsibleId":5,"pingOffsets":[0,15],"colorId":"2","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.todo.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TodoAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<TodoAddResult>({
        method: 'crm.activity.todo.add',
        params: {
          ownerTypeId: 2,
          ownerId: 1,
          deadline: new Date().toISOString(),
          title: 'Todo activity title',
          description: 'Todo activity description',
          responsibleId: 5,
          pingOffsets: [0, 15],
          colorId: '2',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added todo activity ID:', result.id)
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
      async function addTodoActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.todo.add',
            params: {
              ownerTypeId: 2,
              ownerId: 1,
              deadline: new Date().toISOString(),
              title: 'Todo activity title',
              description: 'Todo activity description',
              responsibleId: 5,
              pingOffsets: [0, 15],
              colorId: '2',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added todo activity ID:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTodoActivity)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.todo.add',
                [
                    'ownerTypeId'   => 2,
                    'ownerId'       => 1,
                    'deadline'      => (new DateTime()),
                    'title'         => 'Заголовок дела',
                    'description'   => 'Описание дела',
                    'responsibleId' => 5,
                    'pingOffsets'   => [0, 15],
                    'colorId'       => '2'
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
        echo 'Error adding todo activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.todo.add",
        {
            ownerTypeId: 2,
            ownerId: 1,
            deadline: (new Date()),
            title: 'Заголовок дела',
            description: 'Описание дела',
            responsibleId: 5,
            pingOffsets: [0, 15],
            colorId: '2'
        }, 
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.todo.add',
        [
            'ownerTypeId' => 2,
            'ownerId' => 1,
            'deadline' => date('c'), // Текущие дата и время в формате ISO 8601
            'title' => 'Заголовок дела',
            'description' => 'Описание дела',
            'responsibleId' => 5,
            'pingOffsets' => [0, 15],
            'colorId' => '2'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from datetime import datetime, timedelta

    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.activity.todo.add(
            owner_type_id=2,
            owner_id=101,
            deadline=datetime.now() + timedelta(days=1),
            title="Follow up with customer",
            description="Discuss proposal details",
            responsible_id=1,
            parent_activity_id=998,
            ping_offsets=[0, 15],
            color_id="2",
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 999
    },
    "time": {
       "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | В случае успеха возвращает объект, содержащий идентификатор добавленного дела `id`, в случае ошибки = `null` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент CRM не найден ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `WRONG_DATETIME_FORMAT` | Некорректный формат даты ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-color.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
- [{#T}](../../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-objects-with-crm-mode.md)
