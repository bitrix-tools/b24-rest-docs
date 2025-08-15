# Получить список привязок элементов корзины к оплатам sale.paymentitembasket.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список привязок элементов корзины к оплатам.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей, которые необходимо выбрать (см. поля объекта [sale_payment_item_basket](../data-types.md)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля привязок элементов корзины к оплатам
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных привязок элементов корзины к оплатам в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_payment_item_basket](../data-types.md).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных привязок элементов корзины к оплатам в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_payment_item_basket](../data-types.md).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","paymentId","basketId","quantity","xmlId","dateInsert"],"filter":{"paymentId":1025,">quantity":2},"order":{"quantity":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paymentitembasket.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","paymentId","basketId","quantity","xmlId","dateInsert"],"filter":{"paymentId":1025,">quantity":2},"order":{"quantity":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paymentitembasket.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        select: [
            "id",
            "paymentId",
            "basketId",
            "quantity",
            "xmlId",
            "dateInsert",
        ],
        filter: {
            "paymentId": 1025,
            ">quantity": 2,
        },
        "order": {
            "quantity": "desc",
        }
    };
    
    try {
        const response = await $b24.callListMethod('sale.paymentitembasket.list', parameters);
        const items = response.getData() || [];
        for (const entity of items) {
            console.log('Entity:', entity);
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
        const generator = $b24.fetchListMethod('sale.paymentitembasket.list', parameters, 'ID');
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
        const response = await $b24.callMethod('sale.paymentitembasket.list', parameters, 0);
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
                'sale.paymentitembasket.list',
                [
                    'select' => [
                        "id",
                        "paymentId",
                        "basketId",
                        "quantity",
                        "xmlId",
                        "dateInsert",
                    ],
                    'filter' => [
                        "paymentId" => 1025,
                        ">quantity" => 2,
                    ],
                    'order' => [
                        "quantity" => "desc",
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment items from basket: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.paymentitembasket.list', {
            select: [
                "id",
                "paymentId",
                "basketId",
                "quantity",
                "xmlId",
                "dateInsert",
            ],
            filter: {
                "paymentId": 1025,
                ">quantity": 2,
            },
            "order": {
                "quantity": "desc",
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paymentitembasket.list',
        [
            'select' => [
                "id",
                "paymentId",
                "basketId",
                "quantity",
                "xmlId",
                "dateInsert",
            ],
            'filter' => [
                "paymentId" => 1025,
                ">quantity" => 2,
            ],
            'order' => [
                "quantity" => "desc",
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
    "result":{
        "paymentItemsBasket":[
            {
                "basketId":2722,
                "dateInsert":"2024-04-17T10:51:03+03:00",
                "id":1186,
                "paymentId":1025,
                "quantity":3,
                "xmlId":"myXmlId"
            }
        ]
    },
    "total":1,
    "time":{
        "start":1713344692.788531,
        "finish":1713344693.055679,
        "duration":0.2671480178833008,
        "processing":0.017076969146728516,
        "date_start":"2024-04-17T12:04:52+03:00",
        "date_finish":"2024-04-17T12:04:53+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **paymentItemBasket**
[`sale_payment_item_basket[]`](../data-types.md) | Массив объектов с информацией о выбранных привязках элементов корзины к оплатам ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения привязок элементов корзины к оплатам ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-payment-item-basket-add.md)
- [{#T}](./sale-payment-item-basket-update.md)
- [{#T}](./sale-payment-item-basket-get.md)
- [{#T}](./sale-payment-item-basket-delete.md)
- [{#T}](./sale-payment-item-basket-get-fields.md)