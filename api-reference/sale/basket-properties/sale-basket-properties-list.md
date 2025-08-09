#  Получить список свойств корзины sale.basketproperties.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: менеджер магазина

Метод возвращает набор свойств элементов (позиций) корзины, выбранных по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (см. поля объекта [`sale_basket_item_property`](../data-types.md#sale_basket_item_property)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля свойств элементов (позиций) корзины ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных  секций каталога в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [`sale_basket_item_property`](../data-types.md#sale_basket_item_property).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаeтся массив)
- `!@` — NOT IN (в качестве значения передаeтся массив)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (см. описание выше)
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения, не начинающиеся с «мол»
  - `"%мол"` — ищем значения, не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` – NOT LIKE (см. описание выше)
- `=` равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных групп свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`. 
Возможные значения для `field` соответствуют полям объекта [`sale_basket_item_property`](../data-types.md#sale_basket_item_property).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
Размер страницы результатов всегда статичный - 50 записей.
Чтобы выбрать вторую страницу результатов, необходимо передавать значение - 50. Чтобы выбрать третью страницу результатов значение - 100 и т.д.
Формула расчета значения параметра start:
start = (N-1) * 50, где N – номер нужной страницы
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
    -d '{"select":["id","basketId","value","name","code"],"filter":{"basketId":6806},"order":{"id":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketproperties.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","basketId","value","name","code"],"filter":{"basketId":6806},"order":{"id":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketproperties.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.basketproperties.list',
        {
          select: [
            'id',
            'basketId',
            'value',
            'name',
            'code',
          ],
          filter: {
            'basketId': 6806,
          },
          order: {
            id: 'desc',
          },
          start: 0,
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
      const generator = $b24.fetchListMethod('sale.basketproperties.list', {
        select: [
          'id',
          'basketId',
          'value',
          'name',
          'code',
        ],
        filter: {
          'basketId': 6806,
        },
        order: {
          id: 'desc',
        },
        start: 0,
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
      const response = await $b24.callMethod('sale.basketproperties.list', {
        select: [
          'id',
          'basketId',
          'value',
          'name',
          'code',
        ],
        filter: {
          'basketId': 6806,
        },
        order: {
          id: 'desc',
        },
        start: 0,
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
                'sale.basketproperties.list',
                [
                    'select' => [
                        'id',
                        'basketId',
                        'value',
                        'name',
                        'code',
                    ],
                    'filter' => [
                        'basketId' => 6806,
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                    'start' => 0,
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
        "sale.basketproperties.list",
        {
            select: [
                'id',
                'basketId',
                'value',
                'name',
                'code',
            ],
            filter: {
                'basketId': 6806,
            },
            order: {
                id: 'desc',
            },
            start: 0,
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
        'sale.basketproperties.list',
        [
            'select' => ['id', 'basketId', 'value', 'name', 'code'],
            'filter' => ['basketId' => 6806],
            'order' => ['id' => 'desc'],
            'start' => 0
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
        "basketProperties": [
            {
                "basketId": 6806,
                "code": "PARTNUM",
                "id": 18,
                "name": "Номер партии",
                "value": "Ф45ТК266"
            },
            {
                "basketId": 6806,
                "code": "ARTICUL",
                "id": 17,
                "name": "Артикул",
                "value": "123-456-789"
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1714052872.323321,
        "finish": 1714052872.818371,
        "duration": 0.49504995346069336,
        "processing": 0.0272219181060791,
        "date_start": "2024-04-25T15:47:52+02:00",
        "date_finish": "2024-04-25T15:47:52+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **basketProperties**
[`sale_basket_item_property[]`](../data-types.md#sale_basket_item_property) | Массив объектов с информацией о выбранных свойствах элементов (позиций) корзины в заказах ||
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
|| `200040300010` | Недостаточно прав для чтения  ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-properties-add.md)
- [{#T}](./sale-basket-properties-update.md)
- [{#T}](./sale-basket-properties-get.md)
- [{#T}](./sale-basket-properties-delete.md)
- [{#T}](./sale-basket-properties-get-fields.md)