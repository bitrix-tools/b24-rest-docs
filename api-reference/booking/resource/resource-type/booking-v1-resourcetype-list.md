# Получить список типов ресурсов booking.v1.resourceType.list

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.resourceType.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"рес","moduleId":"booking"},"order":{"id":"ASC","name":"DESC","code":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resourceType.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'booking.v1.resourceType.list',
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
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('booking.v1.resourceType.list', {
        filter: {
          "searchQuery": "рес",
          "moduleId": "booking"
        },
        order: {
          id: "ASC",
          name: "DESC",
          code: "DESC"
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('booking.v1.resourceType.list', {
        filter: {
          "searchQuery": "рес",
          "moduleId": "booking"
        },
        order: {
          id: "ASC",
          name: "DESC",
          code: "DESC"
        }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
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