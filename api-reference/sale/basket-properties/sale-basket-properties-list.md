#  Получить список свойств корзины sale.basketproperties.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketproperties.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","basketId","value","name","code"],"filter":{"basketId":6806},"order":{"id":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketproperties.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BasketPropertiesListResult = {
      basketProperties: {
        id: number
        basketId: number
        name: string
        code: string
        value: string
      }[]
    }

    // sale.basketproperties.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<BasketPropertiesListResult>({
        method: 'sale.basketproperties.list',
        params: {
          select: [
            'id',
            'basketId',
            'value',
            'name',
            'code',
          ],
          filter: { basketId: 6806 },
          order: { id: 'desc' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Basket properties count:', result.basketProperties.length)
        console.info('First basket property:', result.basketProperties[0])
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
      async function getBasketPropertiesList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.basketproperties.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.basketproperties.list',
            params: {
              select: [
                'id',
                'basketId',
                'value',
                'name',
                'code',
              ],
              filter: { basketId: 6806 },
              order: { id: 'desc' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Basket properties count:', result.basketProperties.length)
          console.info('First basket property:', result.basketProperties[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBasketPropertiesList)
    </script>
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

                    if (result.more())
                    {
                        result.next();
                    }
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