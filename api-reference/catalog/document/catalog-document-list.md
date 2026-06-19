# Получить список документов складского учета catalog.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.document.list` возвращает постраничный список документов складского учета. По умолчанию к запросу добавляются фильтры, ограничивающие выборку доступными типами документов и правами текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив со списком полей [catalog_document](../data-types.md#catalog_document), которые необходимо выбрать.

Если массив не передан или передан пустой массив, то будут выбраны все доступные поля документа ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных документов в формате `{"field_1": "value_1", ..., "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document](../data-types.md#catalog_document).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — точное совпадение
- `!=`, `!` — не равно
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `=` — равно, точное совпадение, используется по умолчанию
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных документов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_document](../data-types.md#catalog_document).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания 

По умолчанию документы упорядочены по возрастанию `id` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы. 
Или передавайте значение из ключа `next` ответа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
          "select": ["id","docType","docNumber","title","status","dateDocument","total"],
          "filter": {">=dateCreate":"2025-10-01T00:00:00+03:00","<=dateCreate":"2025-10-15T23:59:59+03:00"},
          "order":  {"id":"ASC"},
          "start": 50
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
          "select": ["id","docType","docNumber","title","status","dateDocument","total"],
          "filter": {">=dateCreate":"2025-10-01T00:00:00+03:00","<=dateCreate":"2025-10-15T23:59:59+03:00"},
          "order":  {"id":"ASC"},
          "start": 50,
          "auth":  "**put_access_token_here**"
        }' \
    https://**put_your_bitrix24_address**/rest/catalog.document.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentListResult = {
      documents: {
        docType: string
        id: number
        status: string
        title: string
      }[]
    }

    try {
      // catalog.document.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DocumentListResult>({
        method: 'catalog.document.list',
        params: {
          select: ['id', 'docType', 'title', 'status'],
          filter: {
            '>=dateCreate': '2025-10-01T00:00:00+03:00',
            '<=dateCreate': '2025-10-15T23:59:59+03:00',
          },
          order: { id: 'ASC' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents on this page:', result.documents.length, result.documents)
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
      async function fetchDocumentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.document.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.list',
            params: {
              select: ['id', 'docType', 'title', 'status'],
              filter: {
                '>=dateCreate': '2025-10-01T00:00:00+03:00',
                '<=dateCreate': '2025-10-15T23:59:59+03:00',
              },
              order: { id: 'ASC' },
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
          console.info('Documents on this page:', result.documents.length, result.documents)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchDocumentList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.list',
                [
                    'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
                    'filter' => [
                        '>=dateCreate' => '2025-10-01T00:00:00+03:00',
                        '<=dateCreate' => '2025-10-15T23:59:59+03:00',
                    ],
                    'order'  => ['ID' => 'ASC'],
                    'start'  => 50, // значение next из предыдущего ответа
                ]
            );

        $payload = $response
            ->getResponseData()
            ->getResult();

        print_r($payload['documents']);

        $next = $response
            ->getResponseData()
            ->getNext();

        echo PHP_EOL . 'next: ' . ($next ?? 'null');
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error loading documents: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.list',
        {
            select: ['id', 'docType', 'title', 'status'],
            filter: { '>=dateCreate': '2025-10-01T00:00:00+03:00', '<=dateCreate': '2025-10-15T23:59:59+03:00' },
            order:  { id: 'ASC' }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
                return;
            }

            console.table(result.data().documents);

            if (result.more())
            {
                result.next(); // подставит значение из ответа в start и повторит запрос
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.document.list',
        [
            'select' => ['id', 'docType', 'docNumber', 'title', 'status', 'dateDocument', 'total'],
            'filter' => [
                '>=dateCreate' => '2025-10-01T00:00:00+03:00',
                '<=dateCreate' => '2025-10-15T23:59:59+03:00',
            ],
            'order'  => ['ID' => 'ASC'],
            'start'  => 50,
        ]
    );

    echo '<PRE>';
    print_r($result['result']['documents']);
    echo PHP_EOL . 'next: ' . ($result['next'] ?? 'null');
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documents": [
            {
                "docType": "S",
                "id": 1,
                "status": "Y",
                "title": "Оприходование #2"
            },
            {
                "docType": "A",
                "id": 7,
                "status": "N",
                "title": "Тест рест"
            },
            // ...другие документы
            {
                "docType": "S",
                "id": 105,
                "status": "N",
                "title": "оприходование 10"
            }
        ]
    },
    "next": 50,
    "total": 143,
    "time": {
        "start": 1761914886,
        "finish": 1761914886.802491,
        "duration": 0.8024909496307373,
        "processing": 0,
        "date_start": "2025-10-31T15:48:06+03:00",
        "date_finish": "2025-10-31T15:48:06+03:00",
        "operating_reset_at": 1761915486,
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
|| **documents**
[`catalog_document[]`](../data-types.md#catalog_document) | Список документов, структура ответа зависит от параметра `select` ||
|| **next**
[`integer`](../../data-types.md) | Указатель смещения для следующей страницы. Передайте значение в параметр `start`, чтобы получить следующие 50 записей ||
|| **total**
[`integer`](../../data-types.md) | Общее количество документов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Недостаточно прав для сохранения документа"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | У пользователя нет права на просмотр ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-update.md)
- [{#T}](./document-element/catalog-document-element-list.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-list.md)

