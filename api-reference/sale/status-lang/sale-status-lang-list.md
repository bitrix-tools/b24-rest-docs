# Получить список локализаций статусов sale.statusLang.list

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список локализаций статусов заказа или доставки.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержащий список полей, которые необходимо выбрать (смотрите поля объекта [sale_status_lang](../data-types.md#sale_status_lang)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля локализаций статусов ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных элементов табличной части отгрузки в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_status_lang](../data-types.md#sale_status_lang).

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
[`object`](../../data-types.md) | Объект для сортировки выбранных статусов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_status_lang](../data-types.md#sale_status_lang).

Возможные значения для order:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["statusId","lid","name","description"],"filter":{"statusId":"N","lid":"ru"},"order":{"statusId":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.statuslang.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["statusId","lid","name","description"],"filter":{"statusId":"N","lid":"ru"},"order":{"statusId":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.statuslang.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.statuslang.list',
        {
          "select": [
            "statusId",
            "lid",
            "name",
            "description",
          ],
          "filter": {
            "statusId": "N",
            "lid": "ru",
          },
          "order": {
            "statusId": "asc",
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
      const generator = $b24.fetchListMethod('sale.statuslang.list', {
        "select": [
          "statusId",
          "lid",
          "name",
          "description",
        ],
        "filter": {
          "statusId": "N",
          "lid": "ru",
        },
        "order": {
          "statusId": "asc",
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
      const response = await $b24.callMethod('sale.statuslang.list', {
        "select": [
          "statusId",
          "lid",
          "name",
          "description",
        ],
        "filter": {
          "statusId": "N",
          "lid": "ru",
        },
        "order": {
          "statusId": "asc",
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
                'sale.statuslang.list',
                [
                    'select' => [
                        'statusId',
                        'lid',
                        'name',
                        'description',
                    ],
                    'filter' => [
                        'statusId' => 'N',
                        'lid'      => 'ru',
                    ],
                    'order'  => [
                        'statusId' => 'asc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching sale status languages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.statuslang.list", {
            "select": [
                "statusId",
                "lid",
                "name",
                "description",
            ],
            "filter": {
                "statusId": "N",
                "lid": "ru",
            },
            "order": {
                "statusId": "asc",
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
        'sale.statuslang.list',
        [
            'select' => [
                'statusId',
                'lid',
                'name',
                'description',
            ],
            'filter' => [
                'statusId' => 'N',
                'lid' => 'ru',
            ],
            'order' => [
                'statusId' => 'asc',
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
        "statusLangs":[
            {
                "description":"Заказ принят, но пока не обрабатывается (например, заказ только что создан или ожидается оплата заказа)",
                "lid":"ru",
                "name":"Принят, ожидается оплата",
                "statusId":"N"
            }
        ]
    },
    "total":1,
    "time":{
        "start":1712656146.769524,
        "finish":1712656146.98067,
        "duration":0.21114587783813477,
        "processing":0.02018594741821289,
        "date_start":"2024-04-09T12:49:06+03:00",
        "date_finish":"2024-04-09T12:49:06+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **statusLangs**
[`sale_status_lang[]`](../data-types.md) | Массив объектов с информацией о выбранных локализациях статусов ||
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
|| `200040300010` | Недостаточно прав для чтения локализаций статусов ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-status-lang-get-list-langs.md)
- [{#T}](./sale-status-lang-add.md)
- [{#T}](./sale-status-lang-delete-by-filter.md)
- [{#T}](./sale-status-lang-get-fields.md)