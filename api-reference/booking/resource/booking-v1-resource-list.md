# Получить список ресурсов booking.v1.resource.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.list` возвращает список ресурсов по фильтру. За один вызов приходит одна страница — до 50 ресурсов. Удаленные ресурсы в список не попадают.

## Параметры метода

Все параметры необязательные. Без параметров приходит первая страница всех ресурсов Битрикс24.

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации списка ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#filter) ресурса для фильтра
- `value_N` — значение поля

Условия фильтра объединяются логическим И. Поля, которых нет в списке ниже, метод игнорирует без ошибки ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки списка ресурсов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#order) ресурса для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Регистр значения не важен. Если параметр не передан, порядок записей не гарантирован — задавайте сортировку явно ||
|| **start**
[`integer`](../../data-types.md) | Параметр для управления постраничной навигацией.

Размер страницы результатов всегда фиксированный: 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`, чтобы выбрать третью — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Значение, не кратное 50, округляется вниз до границы страницы: при `start` от `1` до `49` придет первая страница.

Значение `-1` отключает подсчет навигации — поля `total` в ответе не будет.

Значение по умолчанию — `0` ||
|#

Метод распознает названия параметров и полей только в том виде, в каком они приведены в таблицах: записи `FILTER` или `SEARCH_QUERY` он игнорирует.

### Параметры filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **searchQuery**
[`string`](../../data-types.md) | Поисковый запрос. Метод ищет по подстроке в названии ресурса без учета регистра. Описание ресурса в поиск не входит ||
|| **isMain**
[`string`](../../data-types.md) | Фильтр по настройке показа ресурса. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов

Передавайте значение строкой. Значения других типов, например `true`, метод игнорирует ||
|| **typeId**
[`integer`](../../data-types.md) \| [`array`](../../data-types.md) | Идентификатор типа ресурса или массив идентификаторов. По массиву метод вернет ресурсы всех перечисленных типов.

Список доступных типов можно узнать с помощью метода [booking.v1.resourceType.list](./resource-type/booking-v1-resourcetype-list.md) ||
|| **name**
[`string`](../../data-types.md) | Название ресурса. Метод ищет по полному совпадению ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса. Метод ищет по полному совпадению ||
|#

Операторы сравнения, например `%name` или `>id`, метод не поддерживает. Остальные поля фильтра принимают одно значение.

### Параметры order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Сортировка по идентификатору ||
|| **name**
[`string`](../../data-types.md) | Сортировка по названию ||
|#

Сортировка по другим полям не поддерживается — такие поля метод игнорирует.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"авто","typeId":[3,7]},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resource.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"searchQuery":"авто","typeId":[3,7]},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.list
    ```

- JS (TS)

    ```ts
    // Сниппет — ES-модуль: для top-level await нужен type="module" или сборщик
    // $b24 — уже инициализированный экземпляр SDK, смотрите руководство по началу работы с SDK
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Структура одного ресурса в result.resource[]
    type ResourceItem = {
      cancellationNotificationDelay: number | null
      confirmationCounterDelay: number | null
      confirmationNotificationDelay: number | null
      confirmationNotificationRepetitions: number | null
      confirmationNotificationRepetitionsInterval: number | null
      delayedCounterDelay: number | null
      delayedNotificationDelay: number | null
      description: string | null
      id: number
      infoNotificationDelay: number | null
      isCancellationNotificationOn: string
      isConfirmationNotificationOn: string
      isDelayedNotificationOn: string
      isFeedbackNotificationOn: string
      isInfoNotificationOn: string
      isMain: string
      isReminderNotificationOn: string
      name: string | null
      reminderNotificationDelay: number | null
      senderCode: string
      templateTypeConfirmation: string
      templateTypeDelayed: string
      templateTypeFeedback: string
      templateTypeInfo: string
      templateTypeReminder: string
      typeId: number
    }

    try {
      // Списочные обертки callList.make() и fetchList.make() для этого метода не подходят:
      // они листают по курсору '>id', а фильтр по id и операторы метод не поддерживает.
      // Следующие страницы запрашивайте через call.make() с start: 50, 100 и так далее
      const response = await $b24.actions.v2.call.make<{ resource: ResourceItem[] }>({
        method: 'booking.v1.resource.list',
        params: {
          filter: {
            searchQuery: 'авто',
            typeId: [3, 7],
          },
          order: {
            id: 'ASC',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Ресурсы:', result.resource, 'Получено:', result.resource.length)
      }
    } catch (error) {
      // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключаем SDK в UMD-сборке, он доступен как глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function fetchResourceList() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          // Списочные обертки callList.make() и fetchList.make() для этого метода не подходят:
          // они листают по курсору '>id', а фильтр по id и операторы метод не поддерживает.
          // Следующие страницы запрашивайте через call.make() с start: 50, 100 и так далее
          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resource.list',
            params: {
              filter: {
                searchQuery: 'авто',
                typeId: [3, 7],
              },
              order: {
                id: 'ASC',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Ресурсы:', result.resource, 'Получено:', result.resource.length)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchResourceList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException
    try:
        bitrix_response = client.booking.v1.resource.list(filter={
            "searchQuery": "авто",
            "typeId": [3, 7],
        }, order={
            "id": "ASC",
        }).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print('Ошибка Bitrix API', f'error: {error.error}', f'error_description: {error.error_description}', sep='\n')
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
                'booking.v1.resource.list',
                [
                    'filter' => [
                        'searchQuery' => 'авто',
                        'typeId'      => [3, 7],
                    ],
                    'order' => [
                        'id' => 'ASC',
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
        echo 'Error calling booking.v1.resource.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.list",
        {
            filter: {
                searchQuery: "авто",
                typeId: [3, 7]
            },
            order: {
                id: "ASC"
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
        'booking.v1.resource.list',
        [
            'filter' => [
                'searchQuery' => 'авто',
                'typeId' => [3, 7]
            ],
            'order' => [
                'id' => 'ASC'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.resource.list", b24.Params{
    	"filter": b24.Params{
    		"searchQuery": "авто",
    		"typeId":      []int{3, 7},
    	},
    	"order": b24.Params{
    		"id": "ASC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("booking.v1.resource.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "resource".
    raw, ok := b24.Unwrap(res.Result, "resource")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа resource")
    }

    var items []struct {
    	ID     b24.ID `json:"id"`
    	Name   string `json:"name"`
    	TypeID int    `json:"typeId"`
    	IsMain string `json:"isMain"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name, it.TypeID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "resource": [
            {
                "cancellationNotificationDelay": 600,
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "description": null,
                "id": 5,
                "infoNotificationDelay": null,
                "isCancellationNotificationOn": "Y",
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isInfoNotificationOn": "Y",
                "isMain": "Y",
                "isReminderNotificationOn": "Y",
                "name": "Легковой автомобиль 1",
                "reminderNotificationDelay": -1,
                "senderCode": "bitrix24",
                "templateTypeConfirmation": "inanimate",
                "templateTypeDelayed": "inanimate",
                "templateTypeFeedback": "inanimate",
                "templateTypeInfo": "inanimate",
                "templateTypeReminder": "base",
                "typeId": 3
            },
            {
                "cancellationNotificationDelay": 600,
                "confirmationCounterDelay": 10800,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": null,
                "confirmationNotificationRepetitionsInterval": 10800,
                "delayedCounterDelay": 300,
                "delayedNotificationDelay": 300,
                "description": null,
                "id": 7,
                "infoNotificationDelay": null,
                "isCancellationNotificationOn": "Y",
                "isConfirmationNotificationOn": "Y",
                "isDelayedNotificationOn": "Y",
                "isFeedbackNotificationOn": "N",
                "isInfoNotificationOn": "Y",
                "isMain": "N",
                "isReminderNotificationOn": "Y",
                "name": "Легковой автомобиль 2",
                "reminderNotificationDelay": -1,
                "senderCode": "bitrix24",
                "templateTypeConfirmation": "inanimate",
                "templateTypeDelayed": "inanimate",
                "templateTypeFeedback": "inanimate",
                "templateTypeInfo": "inanimate",
                "templateTypeReminder": "base",
                "typeId": 7
            }
        ]
    },
    "total": 0,
    "time": {
        "start": 1746540454.261779,
        "finish": 1746540454.303483,
        "duration": 0.04170393943786621,
        "processing": 0.009412050247192383,
        "date_start": "2025-05-06T17:07:34+03:00",
        "date_finish": "2025-05-06T17:07:34+03:00",
        "operating_reset_at": 1746541054,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственное поле `resource` — массив объектов с информацией о ресурсах, структура объекта описана [ниже](#resource) ||
|| **total**
[`integer`](../../data-types.md) | Служебное поле. Метод всегда возвращает `0`, поля `next` в ответе нет. При вызове со `start: -1` поля `total` в ответе не будет — ориентироваться на них при обходе страниц нельзя ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Признак последней страницы — в ответе меньше 50 записей.

#### Ресурс {#resource}

Числовые и строковые поля возвращаются как `null`, если значение не задано. Например, при задержке уведомления `0` в ответе придет `null`. Флаги `is*`, поля `templateType*` и `senderCode` приходят заполненными всегда.

#|
|| **Название**
`тип` | **Описание** ||
|| **cancellationNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах после отмены записи, через которое клиенту приходит сообщение об отмене ||
|| **confirmationCounterDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, после которого включается счетчик неподтвержденной записи ||
|| **confirmationNotificationDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, когда клиенту приходит первое сообщение для подтверждения записи ||
|| **confirmationNotificationRepetitions**
[`integer`](../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, без учета первого ||
|| **confirmationNotificationRepetitionsInterval**
[`integer`](../../data-types.md) | Интервал между сообщениями о подтверждении записи, в секундах ||
|| **delayedCounterDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое в календаре включается счетчик ||
|| **delayedNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое клиенту отправляется сообщение об опоздании ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ресурса ||
|| **infoNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое клиенту приходит сообщение о записи ||
|| **isCancellationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту после отмены записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isConfirmationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту с запросом подтвердить запись. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isDelayedNotificationOn**
[`string`](../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isFeedbackNotificationOn**
[`string`](../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isInfoNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isMain**
[`string`](../../data-types.md) | Как показывать ресурс. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов ||
|| **isReminderNotificationOn**
[`string`](../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **name**
[`string`](../../data-types.md) | Название ресурса ||
|| **reminderNotificationDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, за которое клиенту приходит напоминание.

Значение `-1` — напоминание приходит утром в день записи ||
|| **senderCode**
[`string`](../../data-types.md) | Код сервиса, который отправляет клиенту сообщения. Возможные значения:
- `bitrix24` — уведомления Битрикс24
- `ai_call` — звонок AI-агента ||
|| **templateTypeConfirmation**
[`string`](../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **templateTypeDelayed**
[`string`](../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeFeedback**
[`string`](../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeInfo**
[`string`](../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **templateTypeReminder**
[`string`](../../data-types.md) | Тип шаблона сообщения для напоминания. Единственное значение — `base` ||
|| **typeId**
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Получить информацию о типе можно с помощью метода [booking.v1.resourceType.get](./resource-type/booking-v1-resourcetype-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {ASC} to match with parameter {order}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Invalid value {value} to match with parameter {order}. Should be value of type array.` | В параметр `order` передан не объект ||
|| `100` | `Invalid value {value} to match with parameter {filter}. Should be value of type array.` | В параметр `filter` передан не объект ||
|| `100` | `Invalid order "XXX"` | В параметре `order` передано направление сортировки, отличное от `asc` и `desc` ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resource-add.md)
- [{#T}](./booking-v1-resource-update.md)
- [{#T}](./booking-v1-resource-get.md)
- [{#T}](./booking-v1-resource-delete.md)
- [{#T}](./resource-type/index.md)
- [{#T}](./slots/index.md)
