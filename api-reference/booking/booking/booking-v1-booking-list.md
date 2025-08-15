# Получить список бронирований booking.v1.booking.list

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.booking.list` возвращает список бронирований по фильтру. Является реализацией списочного метода для бронирований.

## Параметры метода

#|
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации списка бронирований, описание доступных полей [ниже](#filter) ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки списка бронирований. Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Значение по умолчанию — `{id: 'ASC'}`. Описание доступных полей [ниже](#order) ||
|#

### Параметры filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **within**
[`object`](../../data-types.md) | Объект для фильтрации по времени брони в формате `{"dateFrom": "0", "dateTo": "1739262600"}`, где
- `dateFrom` — начало периода, число в формате timestamp
- `dateTo` — конец периода, число в формате timestamp
  
Если объект передан, все параметры внутри него обязательны ||
|| **client**
[`object`](../../data-types.md) | Объект для фильтрации по клиенту, принимает массив объектов `entities` с полями
- `code` — код типа клиента
- `module` — модуль 
- `id` — идентификатор элемента

Доступные типы и модуль для клиентов возвращает метод [booking.v1.clienttype.list](../booking-v1-clienttype-list.md). 

Если объект передан, все параметры внутри него обязательны ||
|#

### Параметры order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Сортировка по идентификатору ||
|| **dateFrom**
[`string`](../../data-types.md) | Сортировка по дате начала ||
|| **dateTo**
[`string`](../../data-types.md) | Сортировка по дате окончания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"within":{"dateFrom":0,"dateTo":1739262600},"client":{"entities":[{"code":"CONTACT","module":"crm","id":"1"},{"code":"COMPANY","module":"crm","id":"1"}]}},"order":{"id":"ASC","dateFrom":"DESC","dateTo":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.booking.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"within":{"dateFrom":0,"dateTo":1739262600},"client":{"entities":[{"code":"CONTACT","module":"crm","id":"1"},{"code":"COMPANY","module":"crm","id":"1"}]}},"order":{"id":"ASC","dateFrom":"DESC","dateTo":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.booking.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'booking.v1.booking.list',
        {
          filter: {
            within: {
              dateFrom: 0,
              dateTo: 1739262600,
            },
            client: {
              entities: [
                {
                  "code": "CONTACT",
                  "module": "crm",
                  "id": "1"
                },
                {
                  "code": "COMPANY",
                  "module": "crm",
                  "id": "1"
                }
              ]
            }
          },
          order: {
            id: "ASC",
            dateFrom: "DESC",
            dateTo: "ASC",
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
      const generator = $b24.fetchListMethod('booking.v1.booking.list', {
        filter: {
          within: {
            dateFrom: 0,
            dateTo: 1739262600,
          },
          client: {
            entities: [
              {
                "code": "CONTACT",
                "module": "crm",
                "id": "1"
              },
              {
                "code": "COMPANY",
                "module": "crm",
                "id": "1"
              }
            ]
          }
        },
        order: {
          id: "ASC",
          dateFrom: "DESC",
          dateTo: "ASC",
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
      const response = await $b24.callMethod('booking.v1.booking.list', {
        filter: {
          within: {
            dateFrom: 0,
            dateTo: 1739262600,
          },
          client: {
            entities: [
              {
                "code": "CONTACT",
                "module": "crm",
                "id": "1"
              },
              {
                "code": "COMPANY",
                "module": "crm",
                "id": "1"
              }
            ]
          }
        },
        order: {
          id: "ASC",
          dateFrom: "DESC",
          dateTo: "ASC",
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
                'booking.v1.booking.list',
                [
                    'filter' => [
                        'within' => [
                            'dateFrom' => 0,
                            'dateTo'   => 1739262600,
                        ],
                        'client' => [
                            'entities' => [
                                [
                                    'code'   => 'CONTACT',
                                    'module' => 'crm',
                                    'id'     => '1',
                                ],
                                [
                                    'code'   => 'COMPANY',
                                    'module' => 'crm',
                                    'id'     => '1',
                                ],
                            ],
                        ],
                    ],
                    'order' => [
                        'id'       => 'ASC',
                        'dateFrom' => 'DESC',
                        'dateTo'   => 'ASC',
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
        echo 'Error fetching booking list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.booking.list",
        {
            filter: {
                within: {
                    dateFrom: 0,
                    dateTo: 1739262600,
                },
                client: {
                    entities: [
                        {
                            "code": "CONTACT",
                            "module": "crm",
                            "id": "1"
                        },
                        {
                            "code": "COMPANY",
                            "module": "crm",
                            "id": "1"
                        }
                    ]
                }
            },
            order: {
                id: "ASC",
                dateFrom: "DESC",
                dateTo: "ASC",
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
        'booking.v1.booking.list',
        [
            'filter' => [
                'within' => [
                    'dateFrom' => 0,
                    'dateTo' => 1739262600,
                ],
                'client' => [
                    'entities' => [
                        [
                            'code' => 'CONTACT',
                            'module' => 'crm',
                            'id' => '1'
                        ],
                        [
                            'code' => 'COMPANY',
                            'module' => 'crm',
                            'id' => '1'
                        ]
                    ]
                ]
            ],
            'order' => [
                'id' => 'ASC',
                'dateFrom' => 'DESC',
                'dateTo' => 'ASC',
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
        "booking": [
            {
                "datePeriod": {
                    "from": {
                        "timestamp": 1723446900,
                        "timezone": "Europe/Kaliningrad"
                    },
                    "to": {
                        "timestamp": 1723447800,
                        "timezone": "Europe/Kaliningrad"
                    }
                },
                "description": null,
                "id": 15,
                "name": "бронирование 15",
                "resourceIds": [
                    1,
                    2
                ]
            }
        ]
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
[`object`](../../data-types.md) | Корневой элемент ответа. 

Содержит массив объектов с информацией о бронированиях. Структура описана [ниже](#booking)  ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Бронирование {#booking}

#|
|| **datePeriod**
[`object`](../../data-types.md) | Период времени бронирования. Содержит поля `from` и `to` с информацией о времени начала и окончания бронирования ||
|| **description**
[`string`](../../data-types.md) | Описание бронирования. Может быть `null` ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор бронирования ||
|| **name**
[`string`](../../data-types.md) | Название бронирования ||
|| **resourceIds**
[`array`](../../data-types.md) | Массив идентификаторов ресурсов, связанных с бронированием. Описание ресурсов можно получить методом [booking.v1.resource.get](../resource/booking-v1-resource-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 422,
    "error_description": "Invalid date period"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1018` | `Empty resource collection` | Пустой массив ресурсов или таких ресурсов не существует ||
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `filter` ||
|| `100` | `Could not find value for parameter ` | Не передан обязательный параметр ||
|| `422` | `Invalid date period` | Некорретный период времени ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-booking-createfromwaitlist.md)
- [{#T}](./booking-v1-booking-delete.md)
- [{#T}](./booking-v1-booking-add.md)
- [{#T}](./booking-v1-booking-update.md)
- [{#T}](./booking-v1-booking-get.md)