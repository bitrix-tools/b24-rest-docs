# Получить список торговых платформ

> Название метода: **sale.tradePlatform.list**
>
> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «Просмотр каталога товаров»

Метод получает список торговых платформ.

## Параметры метода

#|
|| **Название**
`Тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержащий список полей, которые необходимо выбрать (смотрите поля объекта [sale_order_trade_platform](../data-types.md#sale_order_trade_platform))
  ||
|| **filter**
[`object`](../../data-types.md) | Список полей для фильтрации. При указании нескольких полей используется логика AND.

Поля соответствуют соответствуют полям объекта [sale_order_trade_platform](../data-types.md#sale_order_trade_platform).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше или равно
- `<=` — меньше или равно
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
[`object`](../../data-types.md) | Параметры сортировки. Формат: `{поле: направление (ASC, DESC)}`. 

Поля соответствуют соответствуют полям объекта [sale_order_trade_platform](../data-types.md#sale_order_trade_platform). ||
|| **start**
[`int`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
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
    -d '{"select":["id","code"],"filter":{"%code":"smart"},"order":{"code":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.tradePlatform.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","code"],"filter":{"%code":"smart"},"order":{"code":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.tradePlatform.list
    ```

- JS

    ```js
    BX24.callMethod( 
        "sale.tradePlatform.list", 
        {
            select: ['id', 'code'],
            filter: {'%code': 'smart'},
            order: {'code': 'asc'},
            start: 0,
        }, 
        function(result) 
        { 
            if(result.error()) 
            {
                console.error(result);
            }
            else
            {
                console.dir(result);
            } 
        } 
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.tradePlatform.list',
        [
            'select' => ['id', 'code'],
            'filter' => ['%code' => 'smart'],
            'order' => ['code' => 'asc'],
            'start' => 0,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

Метод возвращает объект, содержащий ключ `tradePlatforms` — список торговых платформ.

HTTP-статус: **200**

```json
{
    "result": {
        "tradePlatforms": [
            {
                "code": "smart_invoice",
                "id": 2
            }
        ]
    },
    "total": 1,
    "time": { 
        "start": 1712135957.057659, 
        "finish": 1712135957.407821, 
        "duration": 0.3501620292663574, 
        "processing": 0.011919021606445312, 
        "date_start": "2024-04-03T11:19:17+02:00", 
        "date_finish": "2024-04-03T11:19:17+02:00", 
        "operating_reset_at": 1705765533, 
        "operating": 3.3076241016387939 
    } 
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **tradePlatforms**
[`sale_order_trade_platform[]`](../data-types.md) | Массив объектов с информацией о торговых платформах ||
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
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для выполнения метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-trade-platform-get-fields.md)
