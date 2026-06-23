# Найти документы note.document.search.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний

Метод `note.document.search.list` ищет документы по заголовку и содержимому.

{% note info "" %}

Выдача содержит документы из баз знаний, к которым у пользователя есть доступ, а также документы с прямым доступом к документу. Архивные документы не попадают в результат.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **query***
[`string`](../../../data-types.md) | Поисковый запрос.

Минимальная длина: `3` символа

Максимальная длина: `200` символов ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Размер страницы.

Допустимые значения: от `1` до `200`

По умолчанию: `50` ||
|#

{% note info "" %}

Метод возвращает только первую страницу результатов: поле `hasMore` в ответе показывает, есть ли дополнительные совпадения, но курсора на следующую страницу нет. Чтобы получить больше совпадений, уточняйте `query` или увеличивайте `limit`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.search.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"query":"рецепт борща","pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.search.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"query":"рецепт борща","pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.search.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentSearchListResult = {
      items: Array<{
        documentId: number
        collectionId: number | null
        title: string
        score: number
        snippet: string
        sharedAccess: boolean
      }>
      hasMore: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentSearchListResult>({
        method: 'note.document.search.list',
        params: {
          query: 'рецепт борща',
          pagination: {
            limit: 50,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Found documents:', result.items.length, result.hasMore)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function searchDocuments() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.search.list',
            params: {
              query: 'рецепт борща',
              pagination: {
                limit: 50,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Found documents:', result.items.length, result.hasMore)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchDocuments)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.search.list',
                [
                    'query' => 'рецепт борща',
                    'pagination' => [
                        'limit' => 50,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching documents: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.document.search.list',
        {
            query: 'рецепт борща',
            pagination: {
                limit: 50
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.document.search.list',
        [
            'query' => 'рецепт борща',
            'pagination' => [
                'limit' => 50
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
    "result": {
        "items": [
            {
                "documentId": 42,
                "collectionId": 123,
                "title": "Традиционный рецепт",
                "score": 0.853,
                "snippet": "...классический <b>рецепт</b> украинского <b>борща</b>...",
                "sharedAccess": false
            },
            {
                "documentId": 43,
                "collectionId": null,
                "title": "Рецепт из общего доступа",
                "score": 0.791,
                "snippet": "...быстрый <b>рецепт</b>...",
                "sharedAccess": true
            }
        ],
        "hasMore": true
    },
    "time": {
        "start": 1780640100,
        "finish": 1780640100.286773,
        "duration": 0.2867729663848877,
        "processing": 0.24144291877746582,
        "date_start": "2026-06-19T10:15:00+03:00",
        "date_finish": "2026-06-19T10:15:00+03:00",
        "operating_reset_at": 1780640700,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатами поиска ||
|| **items**
[`array`](../../../data-types.md) | Список найденных документов ||
|| **items[]**
[`object`](../../../data-types.md) | Объект найденного документа ||
|| **documentId**
[`integer`](../../../data-types.md) | Идентификатор найденного документа ||
|| **collectionId**
[`integer`](../../../data-types.md) | Идентификатор базы знаний или `null`, если документ доступен через прямой доступ к документу ||
|| **title**
[`string`](../../../data-types.md) | Заголовок документа ||
|| **score**
[`double`](../../../data-types.md) | Относительная релевантность совпадения ||
|| **snippet**
[`string`](../../../data-types.md) | HTML-фрагмент с выделением совпадений (теги <b>…</b>) ||
|| **sharedAccess**
[`boolean`](../../../data-types.md) | Признак прямого доступа к документу без доступа ко всей базе знаний.

Возможные значения:

- `true` — документ доступен через прямой доступ
- `false` — документ доступен через доступ к базе знаний ||
|| **hasMore**
[`boolean`](../../../data-types.md) | Значение `true`, если за пределами страницы есть еще результаты ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "NOTE_SEARCH_QUERY_TOO_SHORT",
        "message": "Поисковый запрос слишком короткий"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `query` | Обязательное поле `query` не указано | Добавьте `query` в тело запроса ||
|| `query`
`pagination` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

Код ошибки: `NOTE_SEARCH_QUERY_TOO_SHORT`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `query` | Поисковый запрос слишком короткий | Передайте строку длиной не менее `3` символов ||
|#

Код ошибки: `NOTE_SEARCH_QUERY_TOO_LONG`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `query` | Поисковый запрос слишком длинный | Сократите строку до `200` символов ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-tree-list.md)
- [{#T}](./note-document-get.md)
- [{#T}](./index.md)
