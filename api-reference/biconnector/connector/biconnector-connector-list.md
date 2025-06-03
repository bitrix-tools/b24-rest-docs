# Получить список коннекторов biconnector.connector.list

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.connector.list` возвращает список коннекторов по фильтру. Является реализацией списочного метода для коннекторов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у коннекторов в выборке. По умолчанию берутся все поля ||
|| **filter**
[`object`](../../data-types.md) | Фильтр для выборки коннекторов. Пример формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
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
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Список доступных полей для фильтрации можно узнать с помощью метода [biconnector.connector.fields](./biconnector-connector-fields.md)
||
|| **order**
[`object`](../../data-types.md) | Параметры сортировки. Пример формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка выборки коннекторов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию
||
|| **page**
[`integer`](../../data-types.md) | Управление постраничной навигацией. Размер страницы результатов — 50 записей. Для перехода по результатам передавайте номер страницы 
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список коннекторов, у которых:
- название начинается на `MyConnector`
- описание не пустое

Отобразить только необходимые поля:
- идентификатор `id`
- название `title`
- эдпоинт для проверки доступности источника `urlCheck`
- дата создания `dateCreate`

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'biconnector.connector.list',
        {
            select: [
                "id",
                "title",
                "urlCheck",
                "dateCreate"
            ],
            filter: {
                '%=title': "MyConnector%",
                '!description': ''
            },
            order: {
                dateCreate: "DESC"
            }
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "SELECT": [
                 "id",
                 "title",
                 "urlCheck",
                 "dateCreate"
             ],
             "FILTER": {
                 "%=title": "MyConnector%",
                 "!description": ""
             },
             "ORDER": {
                 "dateCreate": "DESC"
             }
             }' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.connector.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "SELECT": [
                 "id",
                 "title",
                 "urlCheck",
                 "dateCreate"
             ],
             "FILTER": {
                 "%=title": "MyConnector%",
                 "!description": ""
             },
             "ORDER": {
                 "dateCreate": "DESC"
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.list',
        [
            'select' => [
                "id",
                "title",
                "urlCheck",
                "dateCreate"
            ],
            'filter' => [
                '%=title' => "MyConnector%",
                '!description' => ''
            ],
            'order' => [
                'dateCreate' => "DESC"
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
    "result": [
        {
            "id": "11",
            "title": "MyConnector_2",
            "urlCheck": "https://new_example.com/check",
            "dateCreate": "2025-03-24 07:25:59"
        },
        {
            "id": "9",
            "title": "MyConnector",
            "urlCheck": "https://example.com/check",
            "dateCreate": "2025-03-21 12:22:32"
        }
    ],
    "time": {
        "start": 1742804947.923552,
        "finish": 1742804947.995446,
        "duration": 0.07189393043518066,
        "processing": 0.0017020702362060547,
        "date_start": "2025-03-24T08:29:07+00:00",
        "date_finish": "2025-03-24T08:29:07+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях коннекторов. 

Стоит учитывать, что структура полей может быть изменена из-за параметра `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_SELECT_TYPE",
    "error_description": "Parameter \"select\" must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_SELECT_TYPE` | `Parameter "select" must be array.` | В параметр `select` передан не объект ||
|| `VALIDATION_FILTER_TYPE` | `Parameter "filter" must be array.` | В параметр `filter` передан не объект ||
|| `VALIDATION_ORDER_TYPE` | `Parameter "order" must be array.` | В параметр `order` передан не объект ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_SELECT` | `Field "#TITLE#" is not allowed in the "select".` | Данные поля недопустимы в выборке ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_FILTER` | `Field "#TITLE#" is not allowed in the "filter".` | Данные поля недопустимы в фильтре ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_ORDER` | `Field "#TITLE#" is not allowed in the "order".` | Данные поля недопустимы для сортировки ||
|| `VALIDATION_INVALID_FILTER_LOGIC` | `Field "logic" must be either "AND" or "OR".` | Поле `logic` может иметь значение только "AND" или "OR" ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-add.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)