# Получить список коммерческих предложений по фильтру crm.quote.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.list](../universal/crm-item-list.md).

{% endnote %}

Метод `crm.quote.list` возвращает список коммерческих предложений по фильтру.

Метод является реализацией [списочного метода](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) для коммерческих предложений.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../data-types.md) | Список полей, которые нужно вернуть в ответе.

При выборке можно использовать маски:
- `'*'` — для выборки всех стандартных полей (без пользовательских и множественных),
- `'UF_*'` — для выборки всех пользовательских полей.

Список доступных полей для выборки можно получить с помощью метода [crm.quote.fields](./crm-quote-fields.md).

По умолчанию возвращаются все стандартные поля и пользовательские поля (`'*'` + `'UF_*'`) ||
|| **filter**
[`object`](../data-types.md) | Объект формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля, по которому фильтруется выборка,
- `value_n` — значение фильтра.

Формат ключа фильтра: `<оператор><поле>`.  
Пример: `>=DATE_CREATE`, `@ASSIGNED_BY_ID`, `=%TITLE`.

Поддерживаемые операторы:
- `=` — равно (точное совпадение, используется по умолчанию)
- `!=` — не равно
- `!` — не равно
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `@` — IN (в значении передается массив)
- `!@` — NOT IN (в значении передается массив)
- `%` — LIKE, поиск по подстроке
- `=%` — LIKE, поиск по шаблону
- `%=` — LIKE (аналогично `=%`)

Для `LIKE`:
- `=%TITLE: "%меб"` — подстрока в любом месте
- `=%TITLE: "меб%"` — начинается с `меб`
- `=%TITLE: "%меб"` — заканчивается на `меб`

Список доступных полей для фильтрации можно получить с помощью метода [crm.quote.fields](./crm-quote-fields.md) ||
|| **order**
[`object`](../data-types.md) | Объект формата:

```json
{
    "field_1": "ASC",
    "field_2": "DESC"
}
```

где:
- `field_n` — поле сортировки,
- значение:
  - `ASC` — по возрастанию,
  - `DESC` — по убыванию.

Список доступных полей для сортировки можно получить с помощью метода [crm.quote.fields](./crm-quote-fields.md).

При сортировке по `STATUS_ID` используется внутреннее поле `STATUS_SORT` ||
|| **start**
[`integer`](../data-types.md) | Параметр постраничной навигации.

Размер страницы — `50` записей.

Формула:

`start = (N - 1) * 50`, где `N` — номер страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Выбрать коммерческие предложения:
- для компании с `COMPANY_ID = 1`,
- со стадией `SENT`,
- отсортированные по стадии и идентификатору,
- с выборкой полей: `ID`, `TITLE`, `STATUS_ID`, `OPPORTUNITY`, `CURRENCY_ID`, `ASSIGNED_BY_ID`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"STATUS_ID":"ASC","ID":"ASC"},"filter":{"=COMPANY_ID":1,"=STATUS_ID":"SENT"},"select":["ID","TITLE","STATUS_ID","OPPORTUNITY","CURRENCY_ID","ASSIGNED_BY_ID"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"STATUS_ID":"ASC","ID":"ASC"},"filter":{"=COMPANY_ID":1,"=STATUS_ID":"SENT"},"select":["ID","TITLE","STATUS_ID","OPPORTUNITY","CURRENCY_ID","ASSIGNED_BY_ID"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each QuoteItem returned in result[]
    type QuoteItem = {
      ID: string
      TITLE: string
      STATUS_ID: string
      OPPORTUNITY: string
      CURRENCY_ID: string
      ASSIGNED_BY_ID: string
    }

    try {
      // crm.quote.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<QuoteItem[]>({
        method: 'crm.quote.list',
        params: {
          order: { STATUS_ID: 'ASC', ID: 'ASC' },
          filter: { '=COMPANY_ID': 1, '=STATUS_ID': 'SENT' },
          select: ['ID', 'TITLE', 'STATUS_ID', 'OPPORTUNITY', 'CURRENCY_ID', 'ASSIGNED_BY_ID'],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Quotes on this page:', result.length, result)
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
      async function fetchQuoteList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.quote.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.list',
            params: {
              order: { STATUS_ID: 'ASC', ID: 'ASC' },
              filter: { '=COMPANY_ID': 1, '=STATUS_ID': 'SENT' },
              select: ['ID', 'TITLE', 'STATUS_ID', 'OPPORTUNITY', 'CURRENCY_ID', 'ASSIGNED_BY_ID'],
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
          console.info('Quotes on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchQuoteList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.list',
                [
                    'order' => [
                        'STATUS_ID' => 'ASC',
                        'ID' => 'ASC',
                    ],
                    'filter' => [
                        '=COMPANY_ID' => 1,
                        '=STATUS_ID' => 'SENT',
                    ],
                    'select' => [
                        'ID',
                        'TITLE',
                        'STATUS_ID',
                        'OPPORTUNITY',
                        'CURRENCY_ID',
                        'ASSIGNED_BY_ID',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching quote list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.list',
        {
            order: { STATUS_ID: 'ASC', ID: 'ASC' },
            filter: { '=COMPANY_ID': 1, '=STATUS_ID': 'SENT' },
            select: ['ID', 'TITLE', 'STATUS_ID', 'OPPORTUNITY', 'CURRENCY_ID', 'ASSIGNED_BY_ID'],
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.quote.list',
        [
            'order' => [
                'STATUS_ID' => 'ASC',
                'ID' => 'ASC',
            ],
            'filter' => [
                '=COMPANY_ID' => 1,
                '=STATUS_ID' => 'SENT',
            ],
            'select' => [
                'ID',
                'TITLE',
                'STATUS_ID',
                'OPPORTUNITY',
                'CURRENCY_ID',
                'ASSIGNED_BY_ID',
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
    "result": [
        {
            "ID": "9",
            "TITLE": "Последняя версия нашего продукта",
            "STATUS_ID": "SENT",
            "OPPORTUNITY": "45000.00",
            "CURRENCY_ID": "RUB",
            "ASSIGNED_BY_ID": "7"
        },
        {
            "ID": "43",
            "TITLE": "КП на поставку мебели",
            "STATUS_ID": "SENT",
            "OPPORTUNITY": "150000.00",
            "CURRENCY_ID": "RUB",
            "ASSIGNED_BY_ID": "1"
        }
    ],
    "total": 2,
    "time": {
        "start": 1773413037,
        "finish": 1773413037.105712,
        "duration": 0.1057119369506836,
        "processing": 0,
        "date_start": "2026-03-13T17:43:57+03:00",
        "date_finish": "2026-03-13T17:43:57+03:00",
        "operating_reset_at": 1773413637,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../data-types.md) | Массив коммерческих предложений. Состав полей зависит от параметра `select` ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **next**
[`integer`](../data-types.md) | Значение для параметра `start` в следующем запросе.

Параметр `next` возвращается, если количество элементов в выборке больше `50` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Parameter 'order' must be array.` | В `order` передан не объект ||
|| `-` | `Parameter 'filter' must be array.` | В `filter` передан не объект ||
|| `-` | `Access denied.` | У пользователя нет прав на чтение коммерческих предложений ||
|| `-` | `Failed to get list. General error.` | Общая ошибка выполнения запроса ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./crm-quote-fields.md)





