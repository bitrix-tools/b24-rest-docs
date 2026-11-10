# Обновить цвет универсального дела crm.activity.todo.updateColor

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого обновляется дело

Метод `crm.activity.todo.updateColor` обновляет цвет универсального дела.

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
|| **colorId***
[`string`](../../../../data-types.md) | Идентификатор нового цвета дела в таймлайне. Передавайте значение строкой, например `"3"`: число вызовет ошибку `100`. Возможные значения:

- `default` — желтый, цвет по умолчанию
- `1` — синий
- `2` — бирюзовый
- `3` — оранжевый
- `4` — зеленый
- `5` — фиолетовый
- `6` — серый
- `7` — розовый

Если значение не из списка, метод вернет ошибку `0` с описанием `Некорректное значение цвета` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"colorId":"3"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.todo.updateColor
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"colorId":"3","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.todo.updateColor
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UpdateColorResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<UpdateColorResult>({
        method: 'crm.activity.todo.updateColor',
        params: {
          id: 999,
          ownerTypeId: 2,
          ownerId: 1,
          colorId: '3',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated todo color, activity id:', result.id)
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
      async function updateTodoColor() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.todo.updateColor',
            params: {
              id: 999,
              ownerTypeId: 2,
              ownerId: 1,
              colorId: '3',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated todo color, activity id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTodoColor)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.todo.update_color(
            bitrix_id=999,
            owner_type_id=2,
            owner_id=1,
            color_id="3",
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
                'crm.activity.todo.updateColor',
                [
                    'id'          => 999,
                    'ownerTypeId' => 2,
                    'ownerId'     => 1,
                    'colorId'     => '3',
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
        "crm.activity.todo.updateColor",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 1,
            colorId: '3'
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
        'crm.activity.todo.updateColor',
        [
            'id' => 999,
            'ownerTypeId' => 2,
            'ownerId' => 1,
            'colorId' => '3'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.todo.updateColor", b24.Params{
    	"id":          999,
    	"ownerTypeId": 2,
    	"ownerId":     1,
    	"colorId":     "3",
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.todo.updateColor: %w", err)
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
    "error": "0",
    "error_description": "Некорректное значение цвета"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {colorId} | Не передан обязательный параметр `id`, `ownerTypeId`, `ownerId` или `colorId`. В описании указано имя параметра ||
|| `400` | `NOT_FOUND` | Элемент не найден | Дело с таким `id` не найдено или не относится к элементу CRM из `ownerTypeId` и `ownerId` ||
|| `400` | `100` | Invalid value {3} to match with parameter {colorId}. Should be value of type string. | Значение `colorId` передано числом, а не строкой ||
|| `400` | `0` | Некорректное значение цвета | Значение `colorId` не входит в список допустимых ||
|| `400` | `0` | Невозможно изменить цвет в закрытом деле | Дело закрыто, изменять его нельзя ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет права на редактирование элемента CRM ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-todo-add.md)
- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
- [{#T}](../activity-base/crm-activity-get.md)
- [{#T}](../activity-base/crm-activity-list.md)
- [{#T}](../activity-base/crm-activity-delete.md)
