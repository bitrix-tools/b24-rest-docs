# Получить список документов note.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.document.list` возвращает постранично все документы, доступные пользователю во всех базах знаний.

{% note info "" %}

Метод возвращает метаданные документов без текста. Текст документа получите методом [note.document.get](./note-document-get.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. [Описание полей фильтра](#filter).

Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

По умолчанию возвращаются только активные документы всех доступных баз знаний ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination).

Для первой страницы не передавайте параметр ||
|| **select**
[`array`](../../data-types.md) | Список полей документа, которые нужно вернуть в ответе. Имена полей совпадают с полями ответа, например `["id","title","state"]`.

Поле `markdown` передавать нельзя: метод вернет ошибку валидации.

По умолчанию возвращаются все поля из раздела [Возвращаемые данные](#returned-data) ||
|#

### Параметр filter {#filter}

#|
|| **Поле** | **Описание** ||
|| **collectionId**
[`integer`](../../data-types.md) | Идентификатор базы знаний. Значение `0` возвращает документы без базы знаний — документы в корзине, база знаний которых удалена окончательно.

Идентификатор можно получить методом [note.collection.list](../collection/note-collection-list.md) ||
|| **state**
[`string`](../../data-types.md) | Состояние документа. Поддерживаются операторы `=` и `in`.

Возможные значения:

- `live` — активный документ
- `archived` — документ в архиве
- `trashed` — документ в корзине

По умолчанию: `live`.

Условие по `state` можно указывать только на верхнем уровне фильтра. Внутри логики `or` и в отрицании условие вызывает ошибку валидации.

Документы в корзине из базы знаний, которая сама находится в корзине, возвращаются только пользователю с правом «Администрирование» для этой базы знаний ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество документов на странице.

Допустимые значения: от `1` до `200`. Значения больше `200` уменьшаются до `200`, нулевое и отрицательное значение заменяется на `50`. Нечисловое значение вызывает ошибку валидации.

По умолчанию: `50` ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор следующей страницы. Передавайте значение `result.nextCursor` из предыдущего ответа без изменений.

Структура курсора служебная и может измениться. Не собирайте курсор вручную.

Порядок документов в выдаче не гарантирован, но полный обход по курсорам возвращает каждый документ один раз ||
|#

{% note warning "" %}

Завершайте обход только когда `result.nextCursor` равен `null`. Пустой массив `result.items` при непустом курсоре не означает конец списка: если остановить цикл на пустой странице, часть документов будет пропущена.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["collectionId","=",47]],"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["collectionId","=",47]],"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentListResult = {
      items: Array<{
        id: number
        collectionId: number | null
        parentId: number | null
        title: string
        position: number
        createdBy: number
        updatedBy: number
        createdAt: ISODate
        updatedAt: ISODate
        contentUpdatedAt: ISODate | null
        state: 'live' | 'archived' | 'trashed'
        isArchived: boolean
        isTrashed: boolean
        isOrphan: boolean
      }>
      nextCursor: Record<string, unknown> | null
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentListResult>({
        method: 'note.document.list',
        params: {
          filter: [
            ['collectionId', '=', 47],
          ],
          pagination: {
            limit: 2,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents:', result.items.length, result.nextCursor)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listDocuments() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.list',
            params: {
              filter: [
                ['collectionId', '=', 47],
              ],
              pagination: {
                limit: 2,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents:', result.items.length, result.nextCursor)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDocuments)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.note.document.list(
            filter=[
                ["collectionId", "=", 47],
            ],
            pagination={
                "limit": 2,
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.list',
                [
                    'filter' => [
                        ['collectionId', '=', 47],
                    ],
                    'pagination' => [
                        'limit' => 2,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'note.document.list',
        {
            filter: [
                ['collectionId', '=', 47],
            ],
            pagination: {
                limit: 2,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.document.list',
        [
            'filter' => [
                ['collectionId', '=', 47],
            ],
            'pagination' => [
                'limit' => 2,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.document.list", b24.Params{
    	"filter": []any{
    		[]any{"collectionId", "=", 47},
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("note.document.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID    int    `json:"id"`
    		Title string `json:"title"`
    		State string `json:"state"`
    	} `json:"items"`
    	// Курсор передается в следующий запрос без изменений.
    	NextCursor json.RawMessage `json:"nextCursor"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Title, item.State)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "nextCursor": {
            "stream": "collections",
            "collectionId": 47,
            "id": 127
        },
        "items": [
            {
                "id": 129,
                "collectionId": 47,
                "parentId": 125,
                "title": "Заявление на отпуск",
                "position": 1000,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2026-10-21T15:30:10+03:00",
                "updatedAt": "2026-10-21T15:30:10+03:00",
                "contentUpdatedAt": "2026-10-21T15:30:10+03:00",
                "state": "live",
                "isArchived": false,
                "isTrashed": false,
                "isOrphan": false
            },
            {
                "id": 127,
                "collectionId": 47,
                "parentId": null,
                "title": "Инструкция по VPN",
                "position": 2000,
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2026-10-21T15:30:05+03:00",
                "updatedAt": "2026-10-21T15:30:05+03:00",
                "contentUpdatedAt": "2026-10-21T15:30:05+03:00",
                "state": "live",
                "isArchived": false,
                "isTrashed": false,
                "isOrphan": false
            }
        ]
    },
    "time": {
        "start": 1792585819,
        "finish": 1792585819.986398,
        "duration": 0.9863979816436768,
        "processing": 0,
        "date_start": "2026-10-21T15:30:19+03:00",
        "date_finish": "2026-10-21T15:30:19+03:00",
        "operating_reset_at": 1792586400,
        "operating": 0
    }
}
```

### Возвращаемые данные {#returned-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком документов и курсором ||
|| **result.items**
[`array`](../../data-types.md) | Массив документов на странице. Может быть пустым, даже если `nextCursor` не равен `null` ||
|| **result.items[].id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **result.items[].collectionId**
[`integer`](../../data-types.md) или `null` | Идентификатор базы знаний. `null`, если пользователю открыт только сам документ, а не база знаний ||
|| **result.items[].parentId**
[`integer`](../../data-types.md) или `null` | Идентификатор родительского документа. `null` для документа верхнего уровня ||
|| **result.items[].title**
[`string`](../../data-types.md) | Заголовок документа ||
|| **result.items[].position**
[`integer`](../../data-types.md) | Вес сортировки среди соседних документов ||
|| **result.items[].createdBy**
[`integer`](../../data-types.md) | Идентификатор автора документа ||
|| **result.items[].updatedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил запись документа ||
|| **result.items[].createdAt**
[`datetime`](../../data-types.md) | Дата и время создания в формате ISO 8601 с часовым поясом ||
|| **result.items[].updatedAt**
[`datetime`](../../data-types.md) | Дата и время изменения записи документа: переименования, перемещения, архивации, перезаписи через REST ||
|| **result.items[].contentUpdatedAt**
[`datetime`](../../data-types.md) или `null` | Дата и время, когда было сформировано Markdown-представление текста. Меняется после правок в редакторе ||
|| **result.items[].state**
[`string`](../../data-types.md) | Состояние документа: `live` — активный, `archived` — в архиве, `trashed` — в корзине ||
|| **result.items[].isArchived**
[`boolean`](../../data-types.md) | Устаревшее поле. Используйте `state`. `true` — документ в архиве ||
|| **result.items[].isTrashed**
[`boolean`](../../data-types.md) | Устаревшее поле. Используйте `state`. `true` — документ в корзине ||
|| **result.items[].isOrphan**
[`boolean`](../../data-types.md) | Устаревшее поле. `true` — документ в корзине, а его база знаний удалена ||
|| **result.nextCursor**
[`object`](../../data-types.md) или `null` | Курсор следующей страницы. Передайте его в `pagination.afterCursor` без изменений. `null` — страниц больше нет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "markdown is not a field of this list: it answers with the metainformation of a document and never with its text. Read the text of one document with note.document.get.",
                "field": "select"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | markdown is not a field of this list: it answers with the metainformation of a document and never with its text. Read the text of one document with note.document.get. | Уберите `markdown` из `select`. Текст документа получите методом [note.document.get](./note-document-get.md) ||
|| `state` | unknown state: expected one of live, archived, trashed | Передайте `live`, `archived` или `trashed` ||
|| `state` | operator "#OPERATOR#" is not supported for state: use "=" or "in" | Используйте для `state` оператор `=` или `in` ||
|| `state` | state belongs to the top-level "and" of the filter: it cannot sit under "or" or under a negation | Перенесите условие по `state` на верхний уровень фильтра ||
|| `pagination.limit` | must be a number | Передайте число ||
|| `afterCursor.id` | must be a number | Передайте курсор из `result.nextCursor` без изменений ||
|| `afterCursor.collectionId` | must be a number | Передайте курсор из `result.nextCursor` без изменений ||
|| `stream` | unknown stream: expected one of collections, grants, orphans | Передайте курсор из `result.nextCursor` без изменений ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["collectionId","=",47]]` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DocumentItemDto` | Укажите в `select` только поля из раздела [Возвращаемые данные](#returned-data) ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `collectionId` | Запись с ID = `#ID#` не найдена | База знаний из фильтра не существует или недоступна пользователю. Проверьте идентификатор методом [note.collection.list](../collection/note-collection-list.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-get.md)
- [{#T}](./note-document-tree-list.md)
- [{#T}](./note-document-search-list.md)
- [{#T}](./index.md)
