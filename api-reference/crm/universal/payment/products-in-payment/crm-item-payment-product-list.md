# Получить список товарных позиций оплаты crm.item.payment.product.list

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение заказа оплаты

Метод получает список товарных позиций (товары или услуги) по конкретной оплате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paymentId***
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты.
Можно получить с помощью метода [`sale.payment.list`](../../../../sale/payment/sale-payment-list.md) ||
|| **filter***
[`object`](../../../../data-types.md) | Объект для фильтрации выбранных товарных позиций оплаты в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field`:
- `id`
- `quantity`

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `=` — равно, точное совпадение (используется по умолчанию)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры: 
    - `"мол%"` — ищем значения начинающиеся с «мол»
    - `"%мол"` — ищем значения заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения не начинающиеся с «мол»
    - `"%мол"` — ищем значения не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)
||
|| **order**
[`object`](../../../../data-types.md) | Объект для сортировки выбранных товарных позиций оплаты в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field`:
- `id`
- `quantity`
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"filter":{"\u003E=quantity":2,"@id":[1195,1196]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.product.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"paymentId":1039,"filter":{"\u003E=quantity":2,"@id":[1195,1196]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.product.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.payment.product.list',
        {
          paymentId: 1039,
          filter: {
            ">=quantity": 2,
            "@id": [1195, 1196],
          },
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
      const generator = $b24.fetchListMethod('crm.item.payment.product.list', {
        paymentId: 1039,
        filter: {
          ">=quantity": 2,
          "@id": [1195, 1196],
        },
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.item.payment.product.list', {
        paymentId: 1039,
        filter: {
          ">=quantity": 2,
          "@id": [1195, 1196],
        },
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
                'crm.item.payment.product.list',
                [
                    'paymentId' => 1039,
                    'filter'    => [
                        '>=quantity' => 2,
                        '@id'        => [1195, 1196],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment product list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.product.list', {
            paymentId: 1039,
            filter: {
                ">=quantity": 2,
                "@id": [1195, 1196],
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.payment.product.list',
        [
            'paymentId' => 1039,
            'filter' => [
                ">=quantity" => 2,
                "@id" => [1195, 1196],
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":[
      {
         "id":1195,
         "paymentId":1039,
         "quantity":2,
         "rowId":17587
      },
      {
         "id":1196,
         "paymentId":1039,
         "quantity":3,
         "rowId":17588
      }
   ],
   "time":{
      "start":1716286140.489916,
      "finish":1716286140.802505,
      "duration":0.3125889301300049,
      "processing":0.053195953369140625,
      "date_start":"2024-05-21T13:09:00+03:00",
      "date_finish":"2024-05-21T13:09:00+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`crm_item_payment_product[]` | Массив объектов, содержащий информацию о выбранных товарных позициях оплаты ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Ключ result. Объект типа crm_item_payment_product 

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в оплате ||
|| **paymentId**
[`sale_order_payment.id`](../../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **quantity**
[`double`](../../../../data-types.md) | Количество товара ||
|| **rowId**
[`integer`](../../../../data-types.md) | Идентификатор товарной позиции в сущности CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Payment has not been found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Оплатая не найдена ||
|| `0` | Доступ запрещен ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-product-add.md)
- [{#T}](./crm-item-payment-product-set-quantity.md)
- [{#T}](./crm-item-payment-product-delete.md)
