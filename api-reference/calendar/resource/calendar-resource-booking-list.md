# Получить бронирования ресурсов по фильтру calendar.resource.booking.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, кроме экстранет-пользователей

Метод `calendar.resource.booking.list` получает бронирования ресурсов. Как устроено бронирование ресурсов, описано в [обзоре методов](./index.md).

Бронирования можно выбрать двумя способами:

- по ресурсам за период — параметр `filter.resourceTypeIdList` с идентификаторами ресурсов, а также необязательные параметры `filter.from` и `filter.to`
- по идентификаторам бронирований из пользовательского поля CRM типа `resourcebooking` — параметр `filter.resourceIdList`

Постраничной навигации у метода нет: он возвращает все найденные бронирования одним ответом.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../data-types.md) | Условия выборки бронирований [(подробное описание)](#filter) ||
|#

### Параметр filter {#filter}

В `filter` обязательно передайте `resourceTypeIdList` или `resourceIdList`. Если передан непустой `resourceIdList`, метод использует только его, а `resourceTypeIdList`, `from` и `to` игнорирует.

Если не переданы ни `from`, ни `to`, метод берет период с даты за 30 дней до текущей по дату через 90 дней после нее. Если значение `from` или `to` не удается распознать как дату, метод считает параметр непереданным и не возвращает ошибку.

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceTypeIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов ресурсов. Несмотря на название, это идентификаторы самих ресурсов, а не их типов. Значение должно быть массивом.

Получить идентификаторы можно методом [calendar.resource.list](./calendar-resource-list.md) ||
|| **from**
[`date`](../../data-types.md) | Дата начала периода, например `2024-06-20`. Если передан только `to`, нижней границы нет ||
|| **to**
[`date`](../../data-types.md) | Дата окончания периода, например `2024-08-20`. Если передан только `from`, верхней границы нет ||
|| **resourceIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов бронирований из пользовательского поля типа `resourcebooking` у лидов или сделок в CRM. Можно передать одно число вместо массива.

Получить идентификаторы можно:
- универсальными методами — [crm.item.get](../../crm/universal/crm-item-get.md), [crm.item.list](../../crm/universal/crm-item-list.md)
- методами для лидов — [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.lead.list](../../crm/leads/crm-lead-list.md)
- методами для сделок — [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.deal.list](../../crm/deals/crm-deal-list.md)

Узнать, какие пользовательские поля имеют тип `resourcebooking`, можно методом [crm.lead.userfield.list](../../crm/leads/userfield/crm-lead-userfield-list.md) для лидов и методом [crm.deal.userfield.list](../../crm/deals/user-defined-fields/crm-deal-userfield-list.md) для сделок ||
|#

## Примеры кода

**Пример 1**. Получить бронирования ресурсов за период, например чтобы показать занятость в своем приложении.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceTypeIdList":[10852,10888,10873,10871,10853],"from":"2024-06-20","to":"2024-08-20"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.resource.booking.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceTypeIdList":[10852,10888,10873,10871,10853],"from":"2024-06-20","to":"2024-08-20"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.resource.booking.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each booking returned in result[]
    type ResourceBooking = {
      ID: string
      PARENT_ID: string
      DELETED: string
      CAL_TYPE: string
      OWNER_ID: string
      NAME: string
      DATE_FROM: string
      DATE_TO: string
      TZ_FROM: string
      TZ_TO: string
      TZ_OFFSET_FROM: string
      TZ_OFFSET_TO: string
      DATE_FROM_TS_UTC: string
      DATE_TO_TS_UTC: string
      DT_SKIP_TIME: string
      DT_LENGTH: number
      EVENT_TYPE: string
      CREATED_BY: string
      DATE_CREATE: string
      TIMESTAMP_X: string
      DESCRIPTION: string
      IS_MEETING: boolean
      MEETING_STATUS: string
      MEETING_HOST: string
      VERSION: string
      SECTION_ID: string
      DATE_FROM_FORMATTED: string
      DATE_TO_FORMATTED: string
      SECT_ID: string
      RESOURCE_BOOKING_ID: string | null
    }

    try {
      // calendar.resource.booking.list has no pagination: it returns all matching records in one response
      const response = await $b24.actions.v2.call.make<ResourceBooking[]>({
        method: 'calendar.resource.booking.list',
        params: {
          filter: {
            resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
            from: '2024-06-20',
            to: '2024-08-20',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bookings:', result.length, result)
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
      async function fetchResourceBookings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // calendar.resource.booking.list has no pagination: it returns all matching records in one response
          const response = await $b24.actions.v2.call.make({
            method: 'calendar.resource.booking.list',
            params: {
              filter: {
                resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
                from: '2024-06-20',
                to: '2024-08-20',
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
          console.info('Bookings:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchResourceBookings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.resource.booking.list(
            filter={
                "resourceTypeIdList": [
                    10852,
                    10888,
                    10873,
                    10871,
                    10853,
                ],
                "from": "2024-06-20",
                "to": "2024-08-20",
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
        $response = $b24Service
            ->core
            ->call(
                'calendar.resource.booking.list',
                [
                    'filter' => [
                        'resourceTypeIdList' => [10852, 10888, 10873, 10871, 10853],
                        'from'              => '2024-06-20',
                        'to'                => '2024-08-20',
                    ],
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
        echo 'Error fetching resource booking list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.resource.booking.list',
        {
            filter: {
                resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
                from: '2024-06-20',
                to: '2024-08-20',
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.resource.booking.list',
        [
            'filter' => [
                'resourceTypeIdList' => [10852, 10888, 10873, 10871, 10853],
                'from' => '2024-06-20',
                'to' => '2024-08-20'
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
    res, err := client.Core().Call(ctx, "calendar.resource.booking.list", b24.Params{
    	"filter": b24.Params{
    		"resourceTypeIdList": []int{10852, 10888, 10873, 10871, 10853},
    		"from":               "2024-06-20",
    		"to":                 "2024-08-20",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("calendar.resource.booking.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

**Пример 2**. Получить бронирования по идентификаторам из пользовательских полей CRM.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceIdList":[10,18,17]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.resource.booking.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceIdList":[10,18,17]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.resource.booking.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each booking returned in result[]
    type ResourceBooking = {
      ID: string
      PARENT_ID: string
      DELETED: string
      CAL_TYPE: string
      OWNER_ID: string
      NAME: string
      DATE_FROM: string
      DATE_TO: string
      TZ_FROM: string
      TZ_TO: string
      TZ_OFFSET_FROM: string
      TZ_OFFSET_TO: string
      DATE_FROM_TS_UTC: string
      DATE_TO_TS_UTC: string
      DT_SKIP_TIME: string
      DT_LENGTH: number
      EVENT_TYPE: string
      CREATED_BY: string
      DATE_CREATE: string
      TIMESTAMP_X: string
      DESCRIPTION: string
      IS_MEETING: boolean
      MEETING_STATUS: string
      MEETING_HOST: string
      VERSION: string
      SECTION_ID: string
      DATE_FROM_FORMATTED: string
      DATE_TO_FORMATTED: string
      SECT_ID: string
      RESOURCE_BOOKING_ID: number
    }

    try {
      // calendar.resource.booking.list has no pagination: it returns all matching records in one response
      const response = await $b24.actions.v2.call.make<ResourceBooking[]>({
        method: 'calendar.resource.booking.list',
        params: {
          filter: {
            resourceIdList: [10, 18, 17],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bookings:', result.length, result)
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
      async function fetchResourceBookings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // calendar.resource.booking.list has no pagination: it returns all matching records in one response
          const response = await $b24.actions.v2.call.make({
            method: 'calendar.resource.booking.list',
            params: {
              filter: {
                resourceIdList: [10, 18, 17],
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
          console.info('Bookings:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchResourceBookings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.resource.booking.list(
            filter={
                "resourceIdList": [
                    10,
                    18,
                    17,
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
        $response = $b24Service
            ->core
            ->call(
                'calendar.resource.booking.list',
                [
                    'filter' => [
                        'resourceIdList' => [10, 18, 17]
                    ]
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
        echo 'Error fetching resource booking list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.resource.booking.list',
        {
            filter: {
                resourceIdList: [10, 18, 17]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.resource.booking.list',
        [
            'filter' => [
                'resourceIdList' => [10, 18, 17]
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
    res, err := client.Core().Call(ctx, "calendar.resource.booking.list", b24.Params{
    	"filter": b24.Params{
    		"resourceIdList": []int{10, 18, 17},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("calendar.resource.booking.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ на запрос из примера 1. В примере оставлены только поля, которые есть у каждого бронирования, остальные поля события опущены.

```json
{
    "result": [
        {
            "ID": "1408",
            "PARENT_ID": "1408",
            "DELETED": "N",
            "CAL_TYPE": "resource",
            "OWNER_ID": "0",
            "NAME": "Бронирование",
            "DATE_FROM": "15.07.2024 00:00:00",
            "DATE_TO": "16.07.2024 00:00:00",
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "TZ_OFFSET_FROM": "10800",
            "TZ_OFFSET_TO": "10800",
            "DATE_FROM_TS_UTC": "1721001600",
            "DATE_TO_TS_UTC": "1721088000",
            "DT_SKIP_TIME": "Y",
            "DT_LENGTH": 172800,
            "EVENT_TYPE": "#resourcebooking#",
            "CREATED_BY": "1",
            "DATE_CREATE": "10.07.2024 13:55:35",
            "TIMESTAMP_X": "10.07.2024 13:55:35",
            "DESCRIPTION": "Услуга: some",
            "IS_MEETING": false,
            "MEETING_STATUS": "Y",
            "MEETING_HOST": "0",
            "VERSION": "1",
            "SECTION_ID": "10852",
            "DATE_FROM_FORMATTED": "Mon Jul 15 2024",
            "DATE_TO_FORMATTED": "Tue Jul 16 2024",
            "SECT_ID": "10852",
            "RESOURCE_BOOKING_ID": "10"
        },
        {
            "ID": "1409",
            "PARENT_ID": "1409",
            "DELETED": "N",
            "CAL_TYPE": "resource",
            "OWNER_ID": "0",
            "NAME": "Бронирование",
            "DATE_FROM": "18.07.2024 10:00:00",
            "DATE_TO": "18.07.2024 11:00:00",
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "TZ_OFFSET_FROM": "10800",
            "TZ_OFFSET_TO": "10800",
            "DATE_FROM_TS_UTC": "1721286000",
            "DATE_TO_TS_UTC": "1721289600",
            "DT_SKIP_TIME": "N",
            "DT_LENGTH": 3600,
            "EVENT_TYPE": "#resourcebooking#",
            "CREATED_BY": "1",
            "DATE_CREATE": "10.07.2024 14:10:02",
            "TIMESTAMP_X": "10.07.2024 14:10:02",
            "DESCRIPTION": "Услуга: some",
            "IS_MEETING": false,
            "MEETING_STATUS": "",
            "MEETING_HOST": "0",
            "VERSION": "1",
            "SECTION_ID": "10852",
            "DATE_FROM_FORMATTED": "Thu Jul 18 2024 10:00:00",
            "DATE_TO_FORMATTED": "Thu Jul 18 2024 11:00:00",
            "SECT_ID": "10852",
            "RESOURCE_BOOKING_ID": "11"
        }
    ],
    "time": {
        "start": 1733318565.183275,
        "finish": 1733318565.695058,
        "duration": 0.5117831230163574,
        "processing": 0.29406094551086426,
        "date_start": "2024-12-04T13:22:45+00:00",
        "date_finish": "2024-12-04T13:22:45+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов. Каждый объект описывает [бронирование](#booking). Если бронирований нет, возвращается пустой массив ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект бронирования {#booking}

{% note info "" %}

В ответе есть все поля события календаря, например `ACCESSIBILITY`, `REMIND`, `ATTENDEE_LIST`. Ниже перечислены поля, которые есть у каждого бронирования. Остальные поля описаны в [объекте события](../calendar-event/calendar-event-get-by-id.md#event) метода `calendar.event.getbyid`.

{% endnote %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор события календаря, в котором хранится бронирование. Не путайте его с `RESOURCE_BOOKING_ID` — идентификатором бронирования из поля CRM ||
|| **PARENT_ID**
[`string`](../../data-types.md) | Идентификатор родительского события. Для бронирования всегда равен `ID` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления. Метод не возвращает удаленные бронирования, поэтому значение всегда `N` ||
|| **CAL_TYPE**
[`string`](../../data-types.md) | Тип календаря. Для бронирования всегда `resource` ||
|| **OWNER_ID**
[`string`](../../data-types.md) | Идентификатор владельца календаря. Для бронирования всегда `"0"` ||
|| **NAME**
[`string`](../../data-types.md) | Название бронирования ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Дата и время начала бронирования в часовом поясе `TZ_FROM`. Формат зависит от настроек Битрикс24, например `20.12.2024 00:00:00` или `12/20/2024 12:00:00 am` ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Дата и время окончания бронирования в часовом поясе `TZ_TO`. Формат зависит от настроек Битрикс24 ||
|| **TZ_FROM**
[`string`](../../data-types.md) | Часовой пояс даты начала бронирования ||
|| **TZ_TO**
[`string`](../../data-types.md) | Часовой пояс даты окончания бронирования ||
|| **TZ_OFFSET_FROM**
[`string`](../../data-types.md) | Смещение времени начала бронирования относительно UTC в секундах ||
|| **TZ_OFFSET_TO**
[`string`](../../data-types.md) | Смещение времени окончания бронирования относительно UTC в секундах ||
|| **DATE_FROM_TS_UTC**
[`string`](../../data-types.md) | Время начала бронирования в формате timestamp. Значение сдвинуто на смещение часового пояса сервера. Точное время задают поля `DATE_FROM` и `TZ_FROM` ||
|| **DATE_TO_TS_UTC**
[`string`](../../data-types.md) | Время окончания бронирования в формате timestamp. Значение сдвинуто на смещение часового пояса сервера. Точное время задают поля `DATE_TO` и `TZ_TO` ||
|| **DT_SKIP_TIME**
[`string`](../../data-types.md) | Флаг показывает, длится ли бронирование целый день. Возможные значения:
- `Y` — целый день
- `N` — не целый день ||
|| **DT_LENGTH**
[`integer`](../../data-types.md) | Длительность бронирования в секундах ||
|| **EVENT_TYPE**
[`string`](../../data-types.md) | Тип события. Для бронирования всегда `#resourcebooking#` ||
|| **CREATED_BY**
[`string`](../../data-types.md) | Идентификатор пользователя, который создал бронирование ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания бронирования ||
|| **TIMESTAMP_X**
[`datetime`](../../data-types.md) | Дата изменения бронирования ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание бронирования ||
|| **IS_MEETING**
[`boolean`](../../data-types.md) | Признак встречи с участниками. Для бронирования всегда `false` ||
|| **MEETING_STATUS**
[`string`](../../data-types.md) | Служебное поле события календаря. Для бронирования не используется, может быть пустой строкой, `Y` или `H` ||
|| **MEETING_HOST**
[`string`](../../data-types.md) | Идентификатор организатора встречи. Для бронирования всегда `"0"` ||
|| **VERSION**
[`string`](../../data-types.md) | Версия изменений бронирования ||
|| **SECTION_ID**
[`string`](../../data-types.md) | Идентификатор ресурса, в котором расположено бронирование ||
|| **DATE_FROM_FORMATTED**
[`string`](../../data-types.md) | Форматированная дата начала бронирования ||
|| **DATE_TO_FORMATTED**
[`string`](../../data-types.md) | Форматированная дата окончания бронирования ||
|| **SECT_ID**
[`string`](../../data-types.md) | Дублирует `SECTION_ID` ||
|| **RESOURCE_BOOKING_ID**
[```string|integer|null```](../../data-types.md) | Идентификатор бронирования из пользовательского поля CRM типа `resourcebooking`. По нему бронирование можно найти в лиде или сделке.

Тип значения зависит от фильтра: при выборке по `resourceTypeIdList` — строка, например `"10"`; при выборке по `resourceIdList` — число, например `10`. Если у события нет записи о бронировании, при выборке по `resourceTypeIdList` поле равно `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр \"filter['resourceTypeIdList']\" для метода \"calendar.resource.booking.list\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Доступ запрещен | Метод вызывает экстранет-пользователь ||
|| `400` | Пустое значение | Не задан обязательный параметр "filter['resourceTypeIdList']" для метода "calendar.resource.booking.list" | Не передан ни `resourceIdList`, ни `resourceTypeIdList`, или `resourceTypeIdList` передан не массивом ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-resource-add.md)
- [{#T}](./calendar-resource-update.md)
- [{#T}](./calendar-resource-list.md)
- [{#T}](./calendar-resource-delete.md)
