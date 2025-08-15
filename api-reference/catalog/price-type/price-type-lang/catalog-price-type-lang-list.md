# Получить список переводов названия типов цен по фильтру catalog.priceTypeLang.list

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список переводов названий типов цен.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | 
Массив со списком полей, которые необходимо выбрать (смотрите поля объекта [catalog_price_type_lang](../../data-types.md#catalog_price_type_lang)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля переводов названий типов цен
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных переводов названий типов цен в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type_lang](../../data-types.md#catalog_price_type_lang). 

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
- `!` — не равно ||
|| **order**
[`object`](../../../data-types.md) | 
Объект для сортировки выбранных переводов названий типов цен в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_price_type_lang](../../data-types.md#catalog_price_type_lang).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","lang"],"order":{"lang":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.priceTypeLang.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","lang"],"order":{"lang":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeLang.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'catalog.priceTypeLang.list',
        {
          select: ['name', 'lang'],
          order: { 'lang': 'ASC' }
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
      const generator = $b24.fetchListMethod('catalog.priceTypeLang.list', {
        select: ['name', 'lang'],
        order: { 'lang': 'ASC' }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('catalog.priceTypeLang.list', {
        select: ['name', 'lang'],
        order: { 'lang': 'ASC' }
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
                'catalog.priceTypeLang.list',
                [
                    'select' => [
                        'name',
                        'lang',
                    ],
                    'order' => [
                        'lang' => 'ASC',
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
        'catalog.priceTypeLang.list',
        {
            select:[
                'name',
                'lang'
            ],
            order:{
                'lang': 'ASC'
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
        'catalog.priceTypeLang.list',
        [
            'select' => [
                'name',
                'lang'
            ],
            'order' => [
                'lang' => 'ASC'
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
        "priceTypeLangs": [
            {
                "lang": "ar",
                "name": "PRICE"
            },
            {
                "lang": "en",
                "name": "Retail price"
            },
            {
                "lang": "kz",
                "name": "Base Price"
            },
            {
                "lang": "ru",
                "name": "Розничная цена"
            }
        ]
    },
    "total": 4,
    "time": {
        "start": 1733844533.51186,
        "finish": 1733844533.81483,
        "duration": 0.302963972091675,
        "processing": 0.0111780166625977,
        "date_start": "2024-12-10T17:28:53+02:00",
        "date_finish": "2024-12-10T17:28:53+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **priceTypeLangs**
[`catalog_price_type_lang[]`](../../data-types.md#catalog_price_type_lang) | Массив объектов с информацией о выбранных переводах названий типов цен ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-add.md)
- [{#T}](./catalog-price-type-lang-update.md)
- [{#T}](./catalog-price-type-lang-get.md)
- [{#T}](./catalog-price-type-lang-delete.md)
- [{#T}](./catalog-price-type-lang-get-languages.md)
- [{#T}](./catalog-price-type-lang-get-fields.md)