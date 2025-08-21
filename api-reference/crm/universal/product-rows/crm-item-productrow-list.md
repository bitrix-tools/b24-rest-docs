# Получить товарные позиции объекта CRM crm.item.productrow.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта CRM, товарные позиции которого выбираются

Метод получает товарные позиции объекта CRM.  

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [`crm_item_product_row`](../../data-types.md#crm_item_product_row).

**Следующие ключи должны обязательно присутствовать:**

**=ownerType**
**=ownerId**

В `=ownerType` передавайте [Краткий символьный код типа](../../data-types.md#object_type).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `=` — равно (работает и с массивами)
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
[`object`](../../../data-types.md) | Объект для сортировки выбранных элементов табличной части отгрузки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [`crm_item_product_row`](../../data-types.md#crm_item_product_row).
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=ownerType":"D","=ownerId":13142,">price":5000},"order":{"price":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.productrow.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=ownerType":"D","=ownerId":13142,">price":5000},"order":{"price":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.productrow.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.productrow.list',
        {
          filter: {
            "=ownerType": 'D',
            "=ownerId": 13142,
            ">price": 5000,
          },
          order: {
            price: "desc"
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
      const generator = $b24.fetchListMethod('crm.item.productrow.list', {
        filter: {
          "=ownerType": 'D',
          "=ownerId": 13142,
          ">price": 5000,
        },
        order: {
          price: "desc"
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
      const response = await $b24.callMethod('crm.item.productrow.list', {
        filter: {
          "=ownerType": 'D',
          "=ownerId": 13142,
          ">price": 5000,
        },
        order: {
          price: "desc"
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
                'crm.item.productrow.list',
                [
                    'filter' => [
                        "=ownerType" => 'D',
                        "=ownerId"   => 13142,
                        ">price"     => 5000,
                    ],
                    'order'  => [
                        'price' => "desc"
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing product rows: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.productrow.list', {
            filter: {
                "=ownerType": 'D',
                "=ownerId": 13142,
                ">price": 5000,
            },
            order: {
                price: "desc"
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
        'crm.item.productrow.list',
        [
            'filter' => [
                "=ownerType" => 'D',
                "=ownerId" => 13142,
                ">price" => 5000,
            ],
            'order' => [
                'price' => "desc"
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
   "result":{
      "productRows":[
         {
            "id":17649,
            "ownerId":13142,
            "ownerType":"D",
            "productId":9621,
            "productName":"iphone 14",
            "price":90000,
            "priceAccount":90000,
            "priceExclusive":81818.18,
            "priceNetto":90909.09,
            "priceBrutto":100000,
            "quantity":3,
            "discountTypeId":2,
            "discountRate":10,
            "discountSum":9090.91,
            "taxRate":10,
            "taxIncluded":"Y",
            "customized":"Y",
            "measureCode":796,
            "measureName":"шт",
            "sort":20,
            "xmlId":"sale_basket_8147",
            "type":4,
            "storeId": 19
         },
         {
            "id":17650,
            "ownerId":13142,
            "ownerType":"D",
            "productId":9623,
            "productName":"iphone 10xs",
            "price":5550,
            "priceAccount":5550,
            "priceExclusive":5550,
            "priceNetto":5550,
            "priceBrutto":5550,
            "quantity":1,
            "discountTypeId":2,
            "discountRate":0,
            "discountSum":0,
            "taxRate":null,
            "taxIncluded":"Y",
            "customized":"Y",
            "measureCode":6,
            "measureName":"м",
            "sort":10,
            "xmlId":"sale_basket_8148",
            "type":4,
            "storeId": 17
         }
      ]
   },
   "total":2,
   "time":{
      "start":1716905609.186602,
      "finish":1716905609.434087,
      "duration":0.24748492240905762,
      "processing":0.06894516944885254,
      "date_start":"2024-05-28T17:13:29+03:00",
      "date_finish":"2024-05-28T17:13:29+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **productRows**
[`crm_item_product_row[]`](../../data-types.md#crm_item_product_row) | Массив объектов, содержащий информацию о выбранных товарных позициях объекта CRM  ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"ACCESS_DENIED",
   "error_description":"Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|| `INVALID_ARG_VALUE` | Некорректные значения входящих параметров ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-productrow-add.md)
- [{#T}](./crm-item-productrow-fields.md)
- [{#T}](./crm-item-productrow-get.md)
- [{#T}](./crm-item-productrow-set.md)
- [{#T}](./crm-item-productrow-update.md)
- [{#T}](./crm-item-productrow-get-available-for-payment.md)
- [{#T}](./crm-item-productrow-delete.md)