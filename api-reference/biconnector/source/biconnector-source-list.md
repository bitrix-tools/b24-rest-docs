# Получить список источников biconnector.source.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/biconnector.source.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","active","dateCreate"],"filter":{"%=title":"Sql%","!description":"","@connectorId":[2,4]},"order":{"dateCreate":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each SourceItem returned in result[]
    type SourceItem = {
      id: string
      title: string
      active: boolean
      dateCreate: ISODate
    }

    try {
      // biconnector.source.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SourceItem[]>({
        method: 'biconnector.source.list',
        params: {
          select: ['id', 'title', 'active', 'dateCreate'],
          filter: {
            '%=title': 'Sql%',
            '!description': '',
            '@connectorId': [2, 4],
          },
          order: {
            dateCreate: 'DESC',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sources fetched:', result.length, result)
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
      async function fetchSourceList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // biconnector.source.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.source.list',
            params: {
              select: ['id', 'title', 'active', 'dateCreate'],
              filter: {
                '%=title': 'Sql%',
                '!description': '',
                '@connectorId': [2, 4],
              },
              order: {
                dateCreate: 'DESC',
              },
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
          console.info('Sources fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchSourceList)
    </script>
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