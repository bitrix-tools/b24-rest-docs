# Получить список записей из листа ожидания booking.v1.waitlist.list

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.waitlist.list` возвращает список записей из листа ожидания по фильтру.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации записей листа ожидания. 
Передавайте внутри фильтра объект `createdWithin` для фильтрации по дате создания, [(подробное описание)](#createdWithin)  ||
|#

### Параметр createdWithin {#createdWithin}

#|
|| **from***
[`string`](../../data-types.md) | Дата начала периода фильтрации в формате `dd.mm.yyyy`, включительно ||
|| **to***
[`string`](../../data-types.md) | Дата окончания периода фильтрации в формате `dd.mm.yyyy`, не включительно ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"createdWithin":{"from":"01.04.2025","to":"16.04.2025"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.waitlist.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"createdWithin":{"from":"01.04.2025","to":"16.04.2025"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.waitlist.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'booking.v1.waitlist.list',
        {
          filter: {
            createdWithin: {
              from: "01.04.2025",
              to: "16.04.2025",
            }
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
      const generator = $b24.fetchListMethod('booking.v1.waitlist.list', {
        filter: {
          createdWithin: {
            from: "01.04.2025",
            to: "16.04.2025",
          }
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
      const response = await $b24.callMethod('booking.v1.waitlist.list', {
        filter: {
          createdWithin: {
            from: "01.04.2025",
            to: "16.04.2025",
          }
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
                'booking.v1.waitlist.list',
                [
                    'filter' => [
                        'createdWithin' => [
                            'from' => '01.04.2025',
                            'to'   => '16.04.2025', //не включительно, будут отобраны записи с самой поздней датой 15.04.2025
                        ],
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
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing waitlist: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.waitlist.list",
        {
            filter: {
                createdWithin: {
                    from: "01.04.2025", 
                    to: "16.04.2025", //не включительно, будут отобраны записи с самой поздней датой 15.04.2025
                }
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
        'booking.v1.waitlist.list',
        [
            'filter' => [
                'createdWithin' => [
                    'from' => '01.04.2025',
                    'to' => '16.04.2025' //не включительно, будут отобраны записи с самой поздней датой 15.04.2025
                ]
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
        "waitList": [
            {
                "id": 15,
                "note": "заметка"
            },
            {
                "id": 16,
                "note": "заметка"
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
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит массив записей в листе ожидания. Структура описана [ниже](#waitList) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Запись в листе ожидания {#waitList} 

#|
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи в листе ожидания ||
|| **note**
[`string`](../../data-types.md) | Заметка, связанная с записью в листе ожидания. Может быть `null` ||
|#


## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 422,
    "error_description": "Invalid date"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields: ` | Не передан обязательный параметр внутри `createdWithin` ||
|| `422` | `Invalid date` | Некорректная дата ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-waitlist-createfrombooking.md)
- [{#T}](./booking-v1-waitlist-update.md)
- [{#T}](./booking-v1-waitlist-get.md)
- [{#T}](./booking-v1-waitlist-add.md)
- [{#T}](./booking-v1-waitlist-delete.md)