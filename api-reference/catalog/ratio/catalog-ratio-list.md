# Получить список коэффициентов единиц измерения catalog.ratio.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список коэффициентов единиц измерения.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | 
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_ratio](../data-types.md#catalog_ratio)) 
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных коэффициентов единиц измерения в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_ratio](../data-types.md#catalog_ratio). 

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
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
[`object`](../../data-types.md) | Объект для сортировки выбранных полей коэффициентов единиц измерения в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_ratio](../data-types.md#catalog_ratio).

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

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","ratio","isDefault"],"filter":{"@productId":[1,2],">ratio":0.5,"isDefault":"Y"},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.ratio.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","productId","ratio","isDefault"],"filter":{"@productId":[1,2],">ratio":0.5,"isDefault":"Y"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.ratio.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.ratio.list',
        {
          select: ['id', 'productId', 'ratio', 'isDefault'],
          filter: {
            '@productId': [1, 2],
            '>ratio': 0.5,
            'isDefault': 'Y',
          },
          order: {
            id: 'desc',
          },
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
      const generator = $b24.fetchListMethod('catalog.ratio.list', {
        select: ['id', 'productId', 'ratio', 'isDefault'],
        filter: {
          '@productId': [1, 2],
          '>ratio': 0.5,
          'isDefault': 'Y',
        },
        order: {
          id: 'desc',
        },
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('catalog.ratio.list', {
        select: ['id', 'productId', 'ratio', 'isDefault'],
        filter: {
          '@productId': [1, 2],
          '>ratio': 0.5,
          'isDefault': 'Y',
        },
        order: {
          id: 'desc',
        },
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
                'catalog.ratio.list',
                [
                    'select' => [
                        'id',
                        'productId',
                        'ratio',
                        'isDefault',
                    ],
                    'filter' => [
                        '@productId' => [1, 2],
                        '>ratio'     => 0.5,
                        'isDefault'  => 'Y',
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching ratio list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.ratio.list',
            {
                select:[
                    'id',
                    'productId',
                    'ratio',
                    'isDefault',
                ],
                filter:{
                    '@productId': [1, 2],
                    '>ratio': 0.5,
                    'isDefault': 'Y',
                },
                order:{
                    id: 'desc',
                },
            },
            function(result)
            {
                if(result.error()) {
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
        'catalog.ratio.list',
        [
            'select' => [
                'id',
                'productId',
                'ratio',
                'isDefault',
            ],
            'filter' => [
                '@productId' => [1, 2],
                '>ratio' => 0.5,
                'isDefault' => 'Y',
            ],
            'order' => [
                'id' => 'desc',
            ],
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
        "ratios": [
            {
                "id": 1,
                "isDefault": "Y",
                "productId": 1,
                "ratio": 1
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1729676806.653016,
        "finish": 1729676807.083635,
        "duration": 0.4306190013885498,
        "processing": 0.02678680419921875,
        "date_start": "2024-10-23T12:46:46+03:00",
        "date_finish": "2024-10-23T12:46:47+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **ratios**
[`catalog_ratio[]`](../data-types.md#catalog_ratio) | Массив объектов с информацией о выбранных коэффициентах единиц измерения ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога
||
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-ratio-get.md)
- [{#T}](./catalog-ratio-get-fields.md)