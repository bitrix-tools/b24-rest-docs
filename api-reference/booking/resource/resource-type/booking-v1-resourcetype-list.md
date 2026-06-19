# Получить список типов ресурсов booking.v1.resourceType.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resourceType.list` возвращает список типов ресурсов по фильтру. Является реализацией списочного метода для типов ресурсов.

## Параметры метода

#|
|| **FILTER**
[`object`](../../../data-types.md) | Объект для фильтрации списка типов ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#filter) типа ресурса для фильтра
- `value_N` — значение поля ||
|| **ORDER**
[`object`](../../../data-types.md) | Объект для сортировки списка типа ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#order) типа ресурса для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Значение по умолчанию — `{ID: 'ASC'}` ||
|#

### Параметры filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **searchQuery**
[`string`](../../../data-types.md) | Поисковой запрос. Ищет по подстроке в названии типа ресурса ||
|| **moduleId**
[`string`](../../../data-types.md) | Модуль типа ресурса ||
|| **name**
[`string`](../../../data-types.md) | Название типа ресурса ||
|| **code**
[`string`](../../../data-types.md) | Код типа ресурса ||
|#

Используйте или `searchQuery` для поиска по подстроке или `name` для поиска по полному совпадению. 

### Параметры order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Сортировка по идентификатору ||
|| **name**
[`string`](../../../data-types.md) | Сортировка по названию ||
|| **code**
[`string`](../../../data-types.md) | Сортировка по коду ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"рес","moduleId":"booking"},"order":{"id":"ASC","name":"DESC","code":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resourceType.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"рес","moduleId":"booking"},"order":{"id":"ASC","name":"DESC","code":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resourceType.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ResourceTypeResult = {
      resource: ResourceType[]
    }

    type ResourceType = {
      code: string
      confirmationCounterDelay: number
      confirmationNotificationDelay: number
      confirmationNotificationRepetitions: number | null
      confirmationNotificationRepetitionsInterval: number
      delayedCounterDelay: number
      delayedNotificationDelay: number
      id: number
      infoNotificationDelay: number | null
      isConfirmationNotificationOn: string
      isDelayedNotificationOn: string
      isFeedbackNotificationOn: string
      isReminderNotificationOn: string
      name: string
      reminderNotificationDelay: number
      templateTypeConfirmation: string
      templateTypeDelayed: string
      templateTypeFeedback: string
      templateTypeReminder: string
    }

    try {
      // booking.v1.resourceType.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ResourceTypeResult>({
        method: 'booking.v1.resourceType.list',
        params: {
          filter: {
            searchQuery: 'res',
            moduleId: 'booking',
          },
          order: {
            id: 'ASC',
            name: 'DESC',
            code: 'DESC',
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
        console.info('Resource types:', result.resource.length, result.resource)
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
      async function listResourceTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // booking.v1.resourceType.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resourceType.list',
            params: {
              filter: {
                searchQuery: 'res',
                moduleId: 'booking',
              },
              order: {
                id: 'ASC',
                name: 'DESC',
                code: 'DESC',
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
          console.info('Resource types:', result.resource.length, result.resource)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listResourceTypes)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.resourceType.list',
                [
                    'filter' => [
                        'searchQuery' => 'рес',
                        'moduleId'    => 'booking',
                    ],
                    'order'  => [
                        'id'   => 'ASC',
                        'name' => 'DESC',
                        'code' => 'DESC',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing resource types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resourceType.list",
        {
            filter: {
                    "searchQuery": "рес",
                    "moduleId": "booking"
        },
        order: {
                id: "ASC",
                name: "DESC",
                code: "DESC"
            }
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
        'booking.v1.resourceType.list',
        [
            'filter' => [
                'searchQuery' => 'рес',
                'moduleId' => 'booking'
            ],
            'order' => [
                'id' => 'ASC',
                'name' => 'DESC',
                'code' => 'DESC'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "resource": [
            {
                "code": "equipment",
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "id": 3,
                "infoNotificationDelay": null,
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isReminderNotificationOn": "Y",
                "name": "ресурс",
                "reminderNotificationDelay": -1,
                "templateTypeConfirmation": "inanimate",
                "templateTypeDelayed": "inanimate",
                "templateTypeFeedback": "inanimate",
                "templateTypeReminder": "base"
            },
            {
                "code": "expert",
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "id": 5,
                "infoNotificationDelay": null,
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isReminderNotificationOn": "Y",
                "name": "ресурс 2",
                "reminderNotificationDelay": -1,
                "templateTypeConfirmation": "animate",
                "templateTypeDelayed": "animate",
                "templateTypeFeedback": "animate",
                "templateTypeReminder": "base"
            },
        ]
    },
    "time": {
        "start": 1746540063.20403,
        "finish": 1746540063.261006,
        "duration": 0.0569760799407959,
        "processing": 0.020888090133666992,
        "date_start": "2025-05-06T17:01:03+03:00",
        "date_finish": "2025-05-06T17:01:03+03:00",
        "operating_reset_at": 1746540663,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о типах ресурсов. Структура описана [ниже](#resource) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип {#resource}

#|
|| **code**
[`string`](../../../data-types.md) | Код типа ресурса ||
|| **confirmationCounterDelay**
[`integer`](../../../data-types.md) | Время до записи в секундах, после которого загорается счетчик не подтвержденной записи ||
|| **confirmationDelay**
[`integer`](../../../data-types.md) | Время до записи в секундах, когда клиенту приходит первое сообщение для подтверждения записи ||
|| **confirmationRepetitions**
[`integer`](../../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, не учитывая первого ||
|| **confirmationRepetitionsInterval**
[`integer`](../../../data-types.md) | Интервал между сообщениями о подтверждении записи, в секундах ||
|| **delayedCounterDelay**
[`integer`](../../../data-types.md) | Время в секундах, через сколько включить счетчик в календаре ||
|| **delayedDelay**
[`integer`](../../../data-types.md) | Время в секундах, через сколько отправить клиенту сообщение об опоздании ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор типа ресурса ||
|| **infoDelay**
[`integer`](../../../data-types.md) | Задержка в секундах, после которой клиенту приходит сообщение о записи ||
|| **isConfirmationNotificationOn**
[`string`](../../../data-types.md) | Автоматическое подтверждение записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isDelayedNotificationOn**
[`string`](../../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isFeedbackNotificationOn**
[`string`](../../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isReminderNotificationOn**
[`string`](../../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **name**
[`string`](../../../data-types.md) | Название ресурса ||
|| **reminderDelay**
[`integer`](../../../data-types.md) | Время до записи в секундах, за которое клиенту приходит напоминание о записи.
Значение `-1` — утром в день записи ||
|| **templateTypeConfirmation**
[`string`](../../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeDelayed**
[`string`](../../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeFeedback**
[`string`](../../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeReminder**
[`string`](../../../data-types.md) | Тип шаблона сообщения для напоминания. Возможные значения: `base` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Invalid value {ASC} to match with parameter {order}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Invalid value to match with parameter {order}. Should be value of type array` | В параметр `order` передан не объект ||
|| `100` | `Invalid value to match with parameter {filter}. Should be value of type array` | В параметр `filter` передан не объект ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](./booking-v1-resourcetype-add.md)
- [{#T}](./booking-v1-resourcetype-update.md)
- [{#T}](./booking-v1-resourcetype-delete.md)
- [{#T}](./booking-v1-resourcetype-get.md)