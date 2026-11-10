# Добавить универсальное дело crm.activity.todo.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, в таймлайн которого добавляется дело

Метод `crm.activity.todo.add` добавляет универсальное дело в таймлайн элемента CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), в таймлайн которого добавляется дело, например `2` для сделки. Если тип не существует, метод вернет ошибку `NOT_FOUND` ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, в таймлайн которого добавляется дело, например `1`.

Получить идентификатор можно методом [crm.item.list](../../../universal/crm-item-list.md) ||
|| **deadline***
[`datetime`](../../../../data-types.md) | Крайний срок дела в формате ISO 8601, например `2026-11-03T15:00:00+03:00`.

Если не указать часовой пояс, время считается в часовом поясе пользователя, от имени которого выполняется запрос. Если передать только дату, например `2026-11-03`, крайним сроком станет начало дня `00:00` ||
|| **title**
[`string`](../../../../data-types.md) | Название дела. По умолчанию — пустая строка ||
|| **description**
[`string`](../../../../data-types.md) | Описание дела. Поддерживает BB-код, например `[b]важно[/b]`. По умолчанию — пустая строка ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Идентификатор сотрудника, ответственного за дело, например `1`. Получить идентификатор можно методом [user.get](../../../../user/user-get.md).

Ответственным можно назначить только сотрудника компании. Если пользователь не найден или это внешний пользователь, метод вернет ошибку `0` с описанием `The specified user cannot be assigned as responsible`.

По умолчанию, а также при значении `0`, ответственным становится пользователь, от имени которого выполняется запрос. Если ответственный отличается от этого пользователя, он получит уведомление о новом деле ||
|| **parentActivityId**
[`integer`](../../../../data-types.md) | Идентификатор предыдущего дела в таймлайне, например `888`. Получить идентификатор можно методом [crm.activity.list](../activity-base/crm-activity-list.md).

Новое дело связывается с предыдущим, а предыдущее дело закрывается. Если дело с таким идентификатором не найдено, параметр игнорируется ||
|| **pingOffsets**
[`array`](../../../../data-types.md) | Массив целых чисел — за сколько минут до крайнего срока отправить напоминания. Например, `[0, 15]` создает 2 напоминания: за 15 минут до крайнего срока и в момент его наступления.

Отрицательные и нечисловые значения метод отбрасывает, повторяющиеся объединяет. По умолчанию — пустой массив, напоминаний нет ||
|| **colorId**
[`string`](../../../../data-types.md) | Идентификатор цвета дела в таймлайне. Передавайте значение строкой, например `"3"`: число вызовет ошибку `100`. Возможные значения:

- `default` — желтый, цвет по умолчанию
- `1` — синий
- `2` — бирюзовый
- `3` — оранжевый
- `4` — зеленый
- `5` — фиолетовый
- `6` — серый
- `7` — розовый

Если параметр не передан или значение не из списка, дело получает цвет по умолчанию. Ошибку на недопустимое значение метод не возвращает ||
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

- Python

    ```python
    from datetime import datetime, timedelta

    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.todo.add(
            owner_type_id=2,
            owner_id=1,
            deadline=datetime.now() + timedelta(days=1),
            title="Follow up with customer",
            description="Discuss proposal details",
            responsible_id=5,
            ping_offsets=[
                0,
                15,
            ],
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
                    'deadline'      => (new DateTime())->format(DATE_ATOM),
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
            deadline: new Date().toISOString(),
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.todo.add", b24.Params{
    	"ownerTypeId":   2,
    	"ownerId":       1,
    	"deadline":      time.Now().Format(time.RFC3339),
    	"title":         "Заголовок дела",
    	"description":   "Описание дела",
    	"responsibleId": 5,
    	"pingOffsets":   []int{0, 15},
    	"colorId":       "2",
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.todo.add: %w", err)
    }

    var item struct {
    	ID b24.ID `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID)
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
[`object`](../../../../data-types.md) | Объект с идентификатором добавленного дела [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор добавленного дела. Используйте его в параметре `id` методов [crm.activity.todo.update](./crm-activity-todo-update.md), [crm.activity.get](../activity-base/crm-activity-get.md) и [crm.activity.delete](../activity-base/crm-activity-delete.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "WRONG_DATETIME_FORMAT",
    "error_description": "Некорректный формат даты"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {deadline} | Не передан обязательный параметр `ownerTypeId`, `ownerId` или `deadline`. В описании указано имя параметра ||
|| `400` | `100` | Invalid value {3} to match with parameter {colorId}. Should be value of type string. | Значение `colorId` передано числом, а не строкой ||
|| `400` | `WRONG_DATETIME_FORMAT` | Некорректный формат даты | Значение `deadline` не удалось распознать как дату ||
|| `400` | `NOT_FOUND` | Элемент не найден | Передан несуществующий тип объекта CRM в `ownerTypeId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет права на редактирование элемента CRM ||
|| `400` | `0` | The specified user cannot be assigned as responsible | Пользователь из `responsibleId` не найден или не является сотрудником компании ||
|| `400` | `CAN_NOT_COMPLETE` | Текст ошибки закрытия дела | Дело создано, но предыдущее дело из `parentActivityId` закрыть не удалось ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-color.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
- [{#T}](../activity-base/crm-activity-get.md)
- [{#T}](../activity-base/crm-activity-list.md)
- [{#T}](../activity-base/crm-activity-delete.md)
- [{#T}](../../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-objects-with-crm-mode.md)
