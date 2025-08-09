# Получить список ставок НДС по фильтру catalog.vat.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список ставок НДС по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select** 
[`array`](../../data-types.md)| Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_vat](../data-types.md#catalog_vat)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля ставки НДС
||
|| **filter** 
[`object`](../../data-types.md)| Объект для фильтрации выбранных ставок НДС в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_vat](../data-types.md#catalog_vat).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@` — NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md)| Объект для сортировки выбранных ставок НДС в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_vat](../data-types.md#catalog_vat).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start** 
[`integer`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

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

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate"],"filter":{">=sort":200},"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.vat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","rate"],"filter":{">=sort":200},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.vat.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.vat.list',
        {
          select: [
            'id',
            'name',
            'rate'
          ],
          filter: {
            '>=sort': 200
          },
          order: {
            'id': "ASC"
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
      const generator = $b24.fetchListMethod('catalog.vat.list', {
        select: [
          'id',
          'name',
          'rate'
        ],
        filter: {
          '>=sort': 200
        },
        order: {
          'id': "ASC"
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
      const response = await $b24.callMethod('catalog.vat.list', {
        select: [
          'id',
          'name',
          'rate'
        ],
        filter: {
          '>=sort': 200
        },
        order: {
          'id': "ASC"
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
                'catalog.vat.list',
                [
                    'select' => [
                        'id',
                        'name',
                        'rate'
                    ],
                    'filter' => [
                        '>=sort' => 200
                    ],
                    'order' => [
                        'id' => "ASC"
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
        echo 'Error listing VAT: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.vat.list',
        {
            select: [
                'id',
                'name',
                'rate'
            ],
            filter: {
                '>=sort': 200
            },
            order: {
                'id': "ASC"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.vat.list',
        [
            'select' => [
                'id',
                'name',
                'rate'
            ],
            'filter' => [
                '>=sort' => 200
            ],
            'order' => [
                'id' => 'ASC'
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
    "vats": [
        {
            "id": 2,
            "name": "НДС 0%",
            "rate": 0
        },
        {
            "id": 3,
            "name": "НДС 20%",
            "rate": 20
        }
    ],
    "total": 2,
    "time": {
        "start": 1712326352.63409,
        "finish": 1712326352.8319,
        "duration": 0.197818040847778,
        "processing": 0.00833678245544434,
        "date_start": "2024-04-05T16:12:32+02:00",
        "date_finish": "2024-04-05T16:12:32+02:00",
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
|| **vat**
[`catalog_vat[]`](../data-types.md#catalog_vat) | Массив объектов с информацией о выбранных ставках НДС
||
|| **total**
[`integer`](../../data-types.md#time) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения
||
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-add.md)
- [{#T}](./catalog-vat-update.md)
- [{#T}](./catalog-vat-get.md)
- [{#T}](./catalog-vat-delete.md)
- [{#T}](./catalog-vat-get-fields.md)