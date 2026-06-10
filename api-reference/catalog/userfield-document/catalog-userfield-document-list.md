# Получить список значений пользовательских полей документов складского учета catalog.userfield.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.userfield.document.list` возвращает постраничный список значений пользовательских полей документов складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document)).

Обязательно добавьте `documentType` — [тип документа складского учета](../enum/catalog-enum-get-store-document-types.md) ||
|| **filter***
[`object`](../../data-types.md) | Объект для фильтрации выбранных записей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document).

Обязательно укажите `documentType` — [тип документа складского учета](../enum/catalog-enum-get-store-document-types.md).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение, используется по умолчанию
- `!=` — не равно
- `!` — не равно
||
|| **order**
[`object`](../../data-types.md) | Объект сортировки в формате `{"field_1": "order_1", ..., "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_userfield_document](../data-types.md#catalog_userfield_document).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

Если параметр не передан, применяется сортировка `documentId ASC` ||
|| **start** 
[`integer`](../../data-types.md)| Параметр используется для управления постраничной навигацией.

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
    -d '{"select":["documentType","documentId","field7097"],"filter":{"documentType":"A","documentId":81},"order":{"documentId":"ASC"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.userfield.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["documentType","documentId","field7097"],"filter":{"documentType":"A","documentId":81},"order":{"documentId":"ASC"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.userfield.document.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserfieldDocumentListResult = {
      documents: Array<{
        documentId: number
        documentType: string
        field7097: string
      }>
    }

    // catalog.userfield.document.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<UserfieldDocumentListResult>({
        method: 'catalog.userfield.document.list',
        params: {
          select: ['documentType', 'documentId', 'field7097'],
          filter: { documentType: 'A', documentId: 81 },
          order: { documentId: 'ASC' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.documents, `page size: ${result.documents.length}`)
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
      async function listUserfieldDocuments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.userfield.document.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.userfield.document.list',
            params: {
              select: ['documentType', 'documentId', 'field7097'],
              filter: { documentType: 'A', documentId: 81 },
              order: { documentId: 'ASC' },
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
          console.info(result.documents, `page size: ${result.documents.length}`)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listUserfieldDocuments)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.userfield.document.list',
                [
                    'select' => ['documentType', 'documentId', 'field7097'],
                    'filter' => ['documentType' => 'A', 'documentId' => 81],
                    'order' => ['documentId' => 'ASC'],
                    'start' => 0
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.userfield.document.list',
        {
            select: ['documentType', 'documentId', 'field7097'],
            filter: { documentType: 'A', documentId: 81 },
            order:  { documentId: 'ASC' }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());

                if (result.more()) {
                    result.next();
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.userfield.document.list',
        [
            'select' => ['documentType', 'documentId', 'field7097'],
            'filter' => ['documentType' => 'A', 'documentId' => 81],
            'order' => ['documentId' => 'ASC'],
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
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
            "documentId": 81,
            "documentType": "A",
            "field7097": "Тестовое поле"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1774343822,
        "finish": 1774343822.822166,
        "duration": 0.8221659660339355,
        "processing": 0,
        "date_start": "2026-03-24T12:17:02+03:00",
        "date_finish": "2026-03-24T12:17:02+03:00",
        "operating_reset_at": 1774344422,
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
[`catalog_userfield_document[]`](../data-types.md#catalog_userfield_document) | Список объектов со значениями пользовательских полей документов. Состав полей зависит от параметра `select` ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "The documentType field is not specified in the filter parameter"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | The documentType field is not specified in the select parameter | В параметре `select` не указан `documentType` ||
|| `0` | The documentType field is not specified in the filter parameter | В параметре `filter` не указан `documentType` ||
|| `0` | Access Denied | Недостаточно прав для чтения значений пользовательских полей документов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-update.md)
- [{#T}](../enum/catalog-enum-get-store-document-types.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig-list.md)
