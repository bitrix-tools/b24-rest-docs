# Получить список шаблонов представления landing.template.getlist

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом доступа к разделу «Сайты и магазины»

Метод `landing.template.getlist` получает список шаблонов представления текущего портала по параметрам выборки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params**
[`object`](../../data-types.md) | Объект параметров выборки шаблонов представления формата:

```json
{
    "select": ["поле_1", "поле_2"],
    "filter": {
        "поле": "значение"
    },
    "order": {
        "поле": "ASC"
    },
    "group": ["поле"],
    "limit": 50,
    "offset": 0
}
```

Список доступных полей описан [ниже](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей из [полей объекта Шаблон представления](./fields.md).

Если параметр не передан, метод возвращает все доступные поля шаблона.

Поля вида `CREATED_BY.NAME` не поддерживаются ||
|| **filter**
[`object`](../../data-types.md) | Фильтр по полям из [полей объекта Шаблон представления](./fields.md).

Если параметр не передан, метод возвращает все шаблоны текущего портала, включая неактивные.

Поля вида `CREATED_BY.NAME` не поддерживаются ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"FIELD": "ASC"}` или `{"FIELD": "DESC"}`.

Можно передать несколько полей. Если параметр не передан, метод не задает собственную сортировку ||
|| **group**
[`array`](../../data-types.md) | Массив имен полей для группировки, например `["ACTIVE"]` или `["ACTIVE", "SORT"]`.

Вычисляемые поля через `runtime` не поддерживаются ||
|| **limit**
[`integer`](../../data-types.md) | Максимальное количество элементов в ответе.

Если `limit` не указан, метод возвращает все найденные шаблоны без ограничения. Используйте вместе с `offset` для постраничной выборки ||
|| **offset**
[`integer`](../../data-types.md) | Смещение от начала выборки. Используйте вместе с `limit` для постраничной выборки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": [
            "ID",
            "TITLE",
            "XML_ID",
            "SORT",
            "ACTIVE",
            "DATE_MODIFY"
          ],
          "filter": {
            "=ACTIVE": "Y"
          },
          "order": {
            "SORT": "ASC",
            "ID": "ASC"
          },
          "limit": 2,
          "offset": 0
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.template.getlist.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": [
            "ID",
            "TITLE",
            "XML_ID",
            "SORT",
            "ACTIVE",
            "DATE_MODIFY"
          ],
          "filter": {
            "=ACTIVE": "Y"
          },
          "order": {
            "SORT": "ASC",
            "ID": "ASC"
          },
          "limit": 2,
          "offset": 0
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.template.getlist.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.template.getlist',
            {
                params: {
                    select: [
                        'ID',
                        'TITLE',
                        'XML_ID',
                        'SORT',
                        'ACTIVE',
                        'DATE_MODIFY'
                    ],
                    filter: {
                        '=ACTIVE': 'Y'
                    },
                    order: {
                        SORT: 'ASC',
                        ID: 'ASC'
                    },
                    limit: 2,
                    offset: 0
                }
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.template.getlist',
                [
                    'params' => [
                        'select' => [
                            'ID',
                            'TITLE',
                            'XML_ID',
                            'SORT',
                            'ACTIVE',
                            'DATE_MODIFY',
                        ],
                        'filter' => [
                            '=ACTIVE' => 'Y',
                        ],
                        'order' => [
                            'SORT' => 'ASC',
                            'ID' => 'ASC',
                        ],
                        'limit' => 2,
                        'offset' => 0,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting template list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.getlist',
        {
            params: {
                select: [
                    'ID',
                    'TITLE',
                    'XML_ID',
                    'SORT',
                    'ACTIVE',
                    'DATE_MODIFY'
                ],
                filter: {
                    '=ACTIVE': 'Y'
                },
                order: {
                    SORT: 'ASC',
                    ID: 'ASC'
                },
                limit: 2,
                offset: 0
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.template.getlist',
        [
            'params' => [
                'select' => [
                    'ID',
                    'TITLE',
                    'XML_ID',
                    'SORT',
                    'ACTIVE',
                    'DATE_MODIFY',
                ],
                'filter' => [
                    '=ACTIVE' => 'Y',
                ],
                'order' => [
                    'SORT' => 'ASC',
                    'ID' => 'ASC',
                ],
                'limit' => 2,
                'offset' => 0,
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1",
            "TITLE": "С шапкой и подвалом",
            "XML_ID": "header_footer",
            "SORT": "100",
            "ACTIVE": "Y",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm"
        },
        {
            "ID": "2",
            "TITLE": "С сайдбаром слева",
            "XML_ID": "sidebar_left",
            "SORT": "200",
            "ACTIVE": "Y",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm"
        }
    ],
    "time": {
        "start": 1774765200,
        "finish": 1774765200.411258,
        "duration": 0.4112579822540283,
        "processing": 0,
        "date_start": "2026-03-29T10:00:00+03:00",
        "date_finish": "2026-03-29T10:00:00+03:00",
        "operating_reset_at": 1774765800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список шаблонов представления [(подробное описание)](#template).

Если по фильтру ничего не найдено, метод возвращает `result: []` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELD**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) \| `null` | Поле шаблона представления из [полей объекта Шаблон представления](./fields.md), если оно попало в выборку.

Для полей `DATE_CREATE` и `DATE_MODIFY` метод всегда возвращает строку, например `04/20/2020 12:48:10 pm` ||
|#

Особенности ответа:

- Поле `TITLE` обычно возвращается как название на текущем языке портала
- Если для системного шаблона не найден перевод, в `TITLE` может вернуться языковой ключ вида `#...#`, например `#HEADER_ONLY#`

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для работы с разделом «Сайты и магазины» ||
|| `TYPE_ERROR` | Ошибка типа данных при обработке параметров вызова ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-template-get-landing-ref.md)
- [{#T}](./landing-template-get-site-ref.md)
- [{#T}](./landing-template-set-landing-ref.md)
- [{#T}](./landing-template-set-site-ref.md)
- [Поля объекта Шаблон представления](./fields.md)
