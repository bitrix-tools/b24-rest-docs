# Получить бронирования ресурсов по фильтру calendar.resource.booking.list

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает бронирования ресурсов по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../data-types.md) | Поля фильтра ||
|#

### Параметр filter

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceTypeIdList***
[`array`](../../data-types.md) | Cписок идентификаторов ресурсов.

Получить идентификаторы можно методом [calendar.resource.list](./calendar-resource-list.md) ||
|| **from**
[`date`](../../data-types.md) | Дата начала периода ||
|| **to**
[`date`](../../data-types.md) | Дата окончания периода ||
|| **resourceIdList***
[`array`](../../data-types.md) | Список идентификаторов бронирований ресурсов из пользовательского поля типа `resourcebooking` у лидов или сделок в CRM.

Получить идентификаторы можно:
- универсальными методами — [crm.item.get](../../crm/universal/crm-item-get.md), [crm.item.list](../../crm/universal/crm-item-list.md)
- методами для лидов — [crm.lead.get](../../crm/leads/crm-lead-get.md), [crm.lead.list](../../crm/leads/crm-lead-list.md)
- методами для сделок — [crm.deal.get](../../crm/deals/crm-deal-get.md), [crm.deal.list](../../crm/deals/crm-deal-list.md) 

Узнать какие пользовательские поля имеют тип `resourcebooking` можно методом [crm.lead.userfield.list](../../crm/leads/userfield/crm-lead-userfield-list.md) для лидов и методом [crm.deal.userfield.list](../../crm/deals/user-defined-fields/crm-deal-userfield-list.md) для сделок ||
|#

{% note info " " %}

В методе `calendar.resource.booking.list` необходимо использовать только один из двух обязательных параметров: `resourceTypeIdList` или `resourceIdList`. Вместе эти параметры использовать нельзя.

{% endnote %}

## Примеры кода

**Пример 1**. Оценить занятость ресурсов за период, например, для создания собственных представлений занятости или для использования в логике приложения.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceTypeIdList":[10852,10888,10873,10871,10853],"from":"2024-06-20","to":"2024-08-20"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.resource.booking.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceTypeIdList":[10852,10888,10873,10871,10853],"from":"2024-06-20","to":"2024-08-20"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.resource.booking.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'calendar.resource.booking.list',
        {
          filter: {
            resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
            from: '2024-06-20',
            to: '2024-08-20',
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
      const generator = $b24.fetchListMethod('calendar.resource.booking.list', {
        filter: {
          resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
          from: '2024-06-20',
          to: '2024-08-20',
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
      const response = await $b24.callMethod('calendar.resource.booking.list', {
        filter: {
          resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
          from: '2024-06-20',
          to: '2024-08-20',
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

{% endlist %}


**Пример 2**. Выбрать бронирования по их идентификаторам из пользовательских полей CRM сущности.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceIdList":[10,18,17]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.resource.booking.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"resourceIdList":[10,18,17]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.resource.booking.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'calendar.resource.booking.list',
        {
          filter: {
            resourceIdList: [10, 18, 17]
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('calendar.resource.booking.list', {
        filter: {
          resourceIdList: [10, 18, 17]
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('calendar.resource.booking.list', {
        filter: {
          resourceIdList: [10, 18, 17]
        }
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
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

{% endlist %}



## Обработка ответа

HTTP-статус: **200**

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
            "DATE_FROM": "20.12.2024 00:00:00",
            "DATE_TO": "21.12.2024 00:00:00",
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "TZ_OFFSET_FROM": "7200",
            "TZ_OFFSET_TO": "7200",
            "DATE_FROM_TS_UTC": "1734652800",
            "DATE_TO_TS_UTC": "1734739200",
            "DT_SKIP_TIME": "Y",
            "DT_LENGTH": 172800,
            "EVENT_TYPE": "#resourcebooking#",
            "CREATED_BY": "1",
            "DATE_CREATE": "18.12.2024 13:55:35",
            "TIMESTAMP_X": "18.12.2024 13:55:35",
            "DESCRIPTION": "Услуга: some",
            "IS_MEETING": false,
            "MEETING_STATUS": "Y",
            "MEETING_HOST": "0",
            "VERSION": "1",
            "SECTION_ID": "198",
            "DATE_FROM_FORMATTED": "Fri Dec 20 2024",
            "DATE_TO_FORMATTED": "Sat Dec 21 2024",
            "SECT_ID": "198",
            "RESOURCE_BOOKING_ID": "10"
        },
        {
            "ID": "1409",
            ...
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
[`array`](../../data-types.md) | Массив объектов. Каждый объект описывает [бронирование](#booking) ||
|#

#### Объект бронирования {#booking}

{% note info " " %}

Технически бронирование — это событие календаря. Метод получает набор полей, аналогичный полям события календаря. Некоторые поля остаются пустыми, так как они неактуальны для бронирования. Ниже перечислены только актуальные или заполненные поля.

{% endnote %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор бронирования ||
|| **PARENT_ID**
[`string`](../../data-types.md) | Для объекта бронирования всегда равен полю `ID` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг показывает удалено ли бронирование. Возможные значения:
- `Y` — бронирование удалено
- `N` — бронирование не удалено  ||
|| **CAL_TYPE**
[`string`](../../data-types.md) | Тип календаря, в котором находится бронирование ||
|| **OWNER_ID**
[`string`](../../data-types.md) | Для объекта бронирования всегда равно `'0'` ||
|| **NAME**
[`string`](../../data-types.md) | Название бронирования ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Дата начала бронирования ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Дата окончания бронирования ||
|| **TZ_FROM**
[`string`](../../data-types.md) | Таймзона даты начала бронирования ||
|| **TZ_TO**
[`string`](../../data-types.md) | Таймзона даты окончания бронирования ||
|| **TZ_OFFSET_FROM**
[`string`](../../data-types.md) | Смещение времени начала бронирования относительно UTC в секундах ||
|| **TZ_OFFSET_TO**
[`string`](../../data-types.md) | Смещение времени окончания бронирования относительно UTC в секундах ||
|| **DATE_FROM_TS_UTC**
[`string`](../../data-types.md) | Дата и время начала бронирования в UTC в формате timestamp ||
|| **DATE_TO_TS_UTC**
[`string`](../../data-types.md) | Дата и время окончания бронирования в UTC в формате timestamp ||
|| **DT_SKIP_TIME**
[`string`](../../data-types.md) | Флаг показывает, длится ли бронирование целый день. Возможные значения:
- `Y` — целый день
- `N` — не целый день ||
|| **DT_LENGTH**
[`integer`](../../data-types.md) | Длительность бронирования в секундах ||
|| **EVENT_TYPE**
[`string`](../../data-types.md) | Тип бронирования ||
|| **CREATED_BY**
[`string`](../../data-types.md) | Идентификатор пользователя, который создал бронирование ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания бронирования ||
|| **TIMESTAMP_X**
[`datetime`](../../data-types.md) | Дата изменения бронирования ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание бронирования ||
|| **IS_MEETING**
[`boolean`](../../data-types.md) | Для объекта бронирования всегда `false` ||
|| **MEETING_STATUS**
[`string`](../../data-types.md) | Для объекта бронирования всегда `'Y'` ||
|| **MEETING_HOST**
[`string`](../../data-types.md) | Для объекта бронирования всегда `'0'` ||
|| **VERSION**
[`string`](../../data-types.md) | Версия изменений бронирования ||
|| **SECTION_ID**
[`string`](../../data-types.md) | Идентификатор ресурса, в котором расположено бронирование ||
|| **DATE_FROM_FORMATTED**
[`string`](../../data-types.md) | Форматированная дата начала бронирования ||
|| **DATE_TO_FORMATTED**
[`string`](../../data-types.md) | Форматированная дата окончания бронирования ||
|| **SECT_ID**
[`string`](../../data-types.md) | Идентификатор ресурса, в котором расположено бронирование ||
|| **RESOURCE_BOOKING_ID**
[`integer`](../../data-types.md) | Идентификатор бронирования ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "filter['resourceTypeIdList']" для метода "calendar.resource.booking.list""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|| Пустая строка | Не задан обязательный параметр "filter['resourceTypeIdList']" для метода "calendar.resource.booking.list" | Не передан ни один из обязательных параметров: `resourceTypeIdList` или `resourceIdList`. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-resource-add.md)
- [{#T}](./calendar-resource-update.md)
- [{#T}](./calendar-resource-list.md)
- [{#T}](./calendar-resource-delete.md)