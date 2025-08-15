# Получить список источников biconnector.source.list

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.source.list` возвращает список источников по фильтру. Является реализацией списочного метода для источников.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у источников в выборке. По умолчанию берутся все поля ||
|| **filter**
[`object`](../../data-types.md) | Фильтр для выборки источников. Пример формата:

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

Список доступных полей для фильтрации можно узнать с помощью метода [biconnector.source.fields](./biconnector-source-fields.md).

Фильтр не поддерживает поле `settings`, оно будет проигнорировано
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

- `field_n` — название поля, по которому будет произведена сортировка выборки источников
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию
||
|| **page**
[`integer`](../../data-types.md) | Управление постраничной навигацией. Размер страницы результатов — 50 записей. Для перехода по результатам передавайте номер страницы  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список источников, у которых:
- название начинается на `Sql`
- описание не пустое
- идентификатор коннектора равен `2` или `4`

Отобразить только необходимые поля:
- идентификатор `id`
- название `title`
- активность `active`
- дата создания `dateCreate`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","active","dateCreate"],"filter":{"%=title":"Sql%","!description":"","@connectorId":[2,4]},"order":{"dateCreate":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.source.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","active","dateCreate"],"filter":{"%=title":"Sql%","!description":"","@connectorId":[2,4]},"order":{"dateCreate":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const selectFields = [
        "id",
        "title",
        "active",
        "dateCreate"
    ];
    
    try {
        const response = await $b24.callListMethod(
            'biconnector.source.list',
            {
                select: selectFields,
                filter: {
                    '%=title': "Sql%",
                    '!description': "",
                    "@connectorId": [2, 4]
                },
                order: {
                    dateCreate: "DESC"
                }
            },
            (progress) => { console.log('Progress:', progress) }
        );
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const selectFields = [
        "id",
        "title",
        "active",
        "dateCreate"
    ];
    
    try {
        const generator = $b24.fetchListMethod('biconnector.source.list', {
            select: selectFields,
            filter: {
                '%=title': "Sql%",
                '!description': "",
                "@connectorId": [2, 4]
            },
            order: {
                dateCreate: "DESC"
            }
        }, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const selectFields = [
        "id",
        "title",
        "active",
        "dateCreate"
    ];
    
    try {
        const response = await $b24.callMethod('biconnector.source.list', {
            select: selectFields,
            filter: {
                '%=title': "Sql%",
                '!description': "",
                "@connectorId": [2, 4]
            },
            order: {
                dateCreate: "DESC"
            }
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
                'biconnector.source.list',
                [
                    'select' => [
                        "id",
                        "title",
                        "active",
                        "dateCreate"
                    ],
                    'filter' => [
                        '%=title'      => "Sql%",
                        '!description' => "",
                        "@connectorId" => [2, 4]
                    ],
                    'order'  => [
                        'dateCreate' => "DESC"
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching source list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.list',
        {
            select: [
                "id",
                "title",
                "active",
                "dateCreate"
            ],
            filter: {
                '%=title': "Sql%",
                '!description': "",
                "@connectorId": [2, 4]
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.source.list',
        [
            'select' => [
                "id",
                "title",
                "active",
                "dateCreate"
            ],
            'filter' => [
                '%=title' => "Sql%",
                '!description' => "",
                '@connectorId' => [2, 4]
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
            "title": "Sql_host",
            "active": true,
            "dateCreate": "2025-03-24 07:25:59"
        },
        {
            "id": "10",
            "title": "Sql_partner",
            "active": false,
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
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях источников. 

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
|| `VALIDATION_SELECT_TYPE` | Parameter "select" must be array. | В параметр `select` передан не объект ||
|| `VALIDATION_FILTER_TYPE` | Parameter "filter" must be array. | В параметр `filter` передан не объект ||
|| `VALIDATION_ORDER_TYPE` | Parameter "order" must be array. | В параметр `order` передан не объект ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_SELECT` | Field "#TITLE#" is not allowed in the "select". | Данные поля недопустимы в выборке ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_FILTER` | Field "#TITLE#" is not allowed in the "filter". | Данные поля недопустимы в фильтре ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_ORDER` | Field "#TITLE#" is not allowed in the "order". | Данные поля недопустимы для сортировки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-source-update.md)
- [{#T}](./biconnector-source-get.md)
- [{#T}](./biconnector-source-add.md)
- [{#T}](./biconnector-source-delete.md)
- [{#T}](./biconnector-source-fields.md)