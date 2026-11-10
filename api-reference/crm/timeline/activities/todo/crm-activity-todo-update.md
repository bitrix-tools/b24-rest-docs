# Обновить универсальное дело crm.activity.todo.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого обновляется дело

Метод `crm.activity.todo.update` обновляет несколько свойств универсального дела за один вызов.

{% note warning "" %}

Метод перезаписывает дело: если не передать `title`, `description` или `pingOffsets`, название и описание станут пустыми, а напоминания удалятся. Чтобы изменить одно свойство, используйте методы [crm.activity.todo.updateDeadline](./crm-activity-todo-update-deadline.md), [crm.activity.todo.updateDescription](./crm-activity-todo-update-description.md), [crm.activity.todo.updateColor](./crm-activity-todo-update-color.md) или [crm.activity.todo.updateResponsibleUser](./crm-activity-todo-update-responsible-user.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор обновляемого дела, например `999`.

Получить идентификатор можно методом [crm.activity.list](../activity-base/crm-activity-list.md) с фильтром `PROVIDER_ID` = `CRM_TODO`. Закрытое дело изменить нельзя ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), в таймлайне которого находится дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, в таймлайне которого находится дело, например `1`.

Значения `ownerTypeId` и `ownerId` возвращает метод [crm.activity.get](../activity-base/crm-activity-get.md) в полях `OWNER_TYPE_ID` и `OWNER_ID`. Если дело не относится к этому элементу, метод вернет ошибку `NOT_FOUND` ||
|| **deadline***
[`datetime`](../../../../data-types.md) | Крайний срок дела в формате ISO 8601, например `2026-11-03T15:00:00+03:00`.

Если не указать часовой пояс, время считается в часовом поясе пользователя, от имени которого выполняется запрос. Если передать только дату, например `2026-11-03`, крайним сроком станет начало дня `00:00` ||
|| **title**
[`string`](../../../../data-types.md) | Название дела. Если параметр не передан, название станет пустым ||
|| **description**
[`string`](../../../../data-types.md) | Описание дела. Поддерживает BB-код, например `[b]важно[/b]`. Если параметр не передан, описание станет пустым ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Идентификатор сотрудника, ответственного за дело, например `1`. Получить идентификатор можно методом [user.get](../../../../user/user-get.md).

Ответственным можно назначить только сотрудника компании. Если параметр не передан или равен `0`, ответственный не меняется. ||
|| **parentActivityId**
[`integer`](../../../../data-types.md) | Идентификатор другого дела в таймлайне, с которым нужно связать дело, например `888`. Получить идентификатор можно методом [crm.activity.list](../activity-base/crm-activity-list.md).

Если параметр не передан или дело не найдено, текущая связь сохраняется ||
|| **pingOffsets**
[`array`](../../../../data-types.md) | Массив целых чисел — за сколько минут до крайнего срока отправить напоминания. Например, `[0, 15]` создает 2 напоминания: за 15 минут до крайнего срока и в момент его наступления.

Отрицательные и нечисловые значения метод отбрасывает, повторяющиеся объединяет. Если параметр не передан, все напоминания удаляются ||
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

Если параметр не передан или значение не из списка, цвет не меняется. Ошибку на недопустимое значение метод не возвращает ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"deadline":"2026-11-04T15:00:00+03:00","title":"Новый заголовок дела","description":"Новое описание дела","responsibleId":1,"pingOffsets":[15,30],"colorId":"7"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.todo.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"deadline":"2026-11-04T15:00:00+03:00","title":"Новый заголовок дела","description":"Новое описание дела","responsibleId":1,"pingOffsets":[15,30],"colorId":"7","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.todo.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TodoUpdateResult = {
      id: number,
    }

    try {
      const response = await $b24.actions.v2.call.make<TodoUpdateResult>({
        method: 'crm.activity.todo.update',
        params: {
          id: 999,
          ownerTypeId: 2,
          ownerId: 1,
          deadline: '2026-11-04T15:00:00+03:00',
          title: 'New activity title',
          description: 'New activity description',
          responsibleId: 1,
          pingOffsets: [15, 30],
          colorId: '7',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated todo activity id:', result.id)
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
      async function updateTodoActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.todo.update',
            params: {
              id: 999,
              ownerTypeId: 2,
              ownerId: 1,
              deadline: '2026-11-04T15:00:00+03:00',
              title: 'New activity title',
              description: 'New activity description',
              responsibleId: 1,
              pingOffsets: [15, 30],
              colorId: '7',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated todo activity id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTodoActivity)
    </script>
    ```

- Python

    ```python
    from datetime import datetime, timedelta

    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.todo.update(
            bitrix_id=999,
            owner_type_id=2,
            owner_id=1,
            deadline=datetime.now() + timedelta(days=2),
            title="Updated follow-up",
            description="Send updated proposal",
            responsible_id=1,
            ping_offsets=[
                15,
                30,
            ],
            color_id="7",
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
                'crm.activity.todo.update',
                [
                    'id'            => 999,
                    'ownerTypeId'   => 2,
                    'ownerId'       => 1,
                    'deadline'      => (new DateTime('+1 day'))->format(DATE_ATOM),
                    'title'         => 'Новый заголовок дела',
                    'description'   => 'Новое описание дела',
                    'responsibleId' => 1,
                    'pingOffsets'   => [15, 30],
                    'colorId'       => '7'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.todo.update",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 1,
            deadline: new Date().toISOString(),
            title: 'Новый заголовок дела',
            description: 'Новое описание дела',
            responsibleId: 1,
            pingOffsets: [15, 30],
            colorId: '7'
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
        'crm.activity.todo.update',
        [
            'id' => 999,
            'ownerTypeId' => 2,
            'ownerId' => 1,
            'deadline' => date('c', strtotime('+1 day')), // Завтра в это же время в формате ISO 8601
            'title' => 'Новый заголовок дела',
            'description' => 'Новое описание дела',
            'responsibleId' => 1,
            'pingOffsets' => [15, 30],
            'colorId' => '7'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.todo.update", b24.Params{
    	"id":            999,
    	"ownerTypeId":   2,
    	"ownerId":       1,
    	"deadline":      time.Now().Add(24 * time.Hour).Format(time.RFC3339),
    	"title":         "Новый заголовок дела",
    	"description":   "Новое описание дела",
    	"responsibleId": 1,
    	"pingOffsets":   []int{15, 30},
    	"colorId":       "7",
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.todo.update: %w", err)
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
[`object`](../../../../data-types.md) | Объект с идентификатором обновленного дела [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор обновленного дела, совпадает с переданным `id` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {deadline} | Не передан обязательный параметр `ownerTypeId`, `ownerId` или `deadline`. В описании указано имя параметра ||
|| `400` | `0` | Internal server error. | Не передан обязательный параметр `id` ||
|| `400` | `100` | Invalid value {3} to match with parameter {colorId}. Should be value of type string. | Значение `colorId` передано числом, а не строкой ||
|| `400` | `WRONG_DATETIME_FORMAT` | Некорректный формат даты | Значение `deadline` не удалось распознать как дату ||
|| `400` | `NOT_FOUND` | Элемент не найден | Дело с таким `id` не найдено или не относится к элементу CRM из `ownerTypeId` и `ownerId` ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет права на редактирование элемента CRM ||
|| `400` | `0` | Операции с файлами для закрытого дела запрещены | Дело закрыто, изменять его нельзя ||
|| `400` | `0` | The specified user cannot be assigned as responsible | Пользователь из `responsibleId` не найден или не является сотрудником компании ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-todo-add.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-color.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
- [{#T}](../activity-base/crm-activity-get.md)
- [{#T}](../activity-base/crm-activity-list.md)
- [{#T}](../activity-base/crm-activity-delete.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-date-in-activity.md)
