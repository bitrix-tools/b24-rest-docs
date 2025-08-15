# Получить список валют crm.currency.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к настройкам CRM

Метод получает список валют, созданных на портале. 

{% note info %}

Параметры локализации (настройки, зависящие от языка) будут возвращены для текущего языка портала.

{% endnote %}

## Параметры метода

#|
||  **Название**
`тип`| **Описание** ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки записей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`, где `field_N` — идентификатор поля [crm_currency](../data-types.md#crm_currency).

Возможные значения для `order_N`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"sort":"asc","currency":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.currency.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"sort":"asc","currency":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.currency.list',
        {
          order: {
            sort: 'asc',
            currency: 'asc',
          },
        }
      );
      const items = response.getData() || [];
      for (const entity of items) {
        console.log('Entity:', entity);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.currency.list', {
        order: {
          sort: 'asc',
          currency: 'asc',
        },
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) {
          console.log('Entity:', entity);
        }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.currency.list', {
        order: {
          sort: 'asc',
          currency: 'asc',
        },
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) {
        console.log('Entity:', entity);
      }
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
                'crm.currency.list',
                [
                    'order' => [
                        'sort'     => 'asc',
                        'currency' => 'asc',
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.currency.list",
        {
            order: {
                sort: 'asc',
                currency: 'asc',
            },
        },
    )
    .then(
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data);
            }
        },
        function(error)
        {
            console.info(error);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.list',
        [
            'order' => [
                'sort' => 'asc',
                'currency' => 'asc',
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
            "CURRENCY": "RUB",
            "AMOUNT_CNT": "1",
            "AMOUNT": "1.0000",
            "SORT": "100",
            "BASE": "Y",
            "FULL_NAME": "Российский рубль",
            "LID": "ru",
            "FORMAT_STRING": "# &#8381;",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "DATE_UPDATE": "2024-01-29T12:28:40+02:00"
        },
        {
            "CURRENCY": "USD",
            "AMOUNT_CNT": "1",
            "AMOUNT": "68.7900",
            "SORT": "200",
            "BASE": "N",
            "FULL_NAME": "Доллар США",
            "LID": "ru",
            "FORMAT_STRING": "$#",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": null,
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
        {
            "CURRENCY": "EUR",
            "AMOUNT_CNT": "1",
            "AMOUNT": "78.3200",
            "SORT": "300",
            "BASE": "N",
            "FULL_NAME": "Евро",
            "LID": "ru",
            "FORMAT_STRING": "# &euro;",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
        {
            "CURRENCY": "BYN",
            "AMOUNT_CNT": "1",
            "AMOUNT": "32.2000",
            "SORT": "500",
            "BASE": "N",
            "FULL_NAME": "Белорусский рубль",
            "LID": "ru",
            "FORMAT_STRING": "# руб.",
            "DEC_POINT": ".",
            "THOUSANDS_SEP": "&nbsp;",
            "DECIMALS": "2",
            "DATE_UPDATE": "2023-03-21T15:19:50+02:00"
        },
    ],
    "total": 0,
    "time": {
        "start": 1716986687.629166,
        "finish": 1716986688.481436,
        "duration": 0.8522701263427734,
        "processing": 0.014969825744628906,
        "date_start": "2024-05-29T14:44:47+02:00",
        "date_finish": "2024-05-29T14:44:48+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`crm_currency[]`](../data-types.md#crm_currency) | Массив объектов с информацией о выбранных валютах ||
|| **total**
[`integer`](../../data-types.md) | На текущий момент всегда имеет значение `0` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | Failed to get list. General error. | Не установлен модуль currency (валюты) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-delete.md)
- [{#T}](./crm-currency-fields.md)