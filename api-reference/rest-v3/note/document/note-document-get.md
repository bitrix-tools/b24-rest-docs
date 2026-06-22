# Получить документ note.document.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Просмотр» для базы знаний документа

Метод `note.document.get` возвращает один документ с содержимым в Markdown.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [note.document.tree.list](./note-document-tree-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.document.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.document.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.document.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentGetResult = {
      item: {
        id: number
        collectionId: number | null
        parentId: number | null
        title: string
        markdown: string
        position: number
        createdBy: number
        updatedBy: number
        createdAt: ISODate
        updatedAt: ISODate
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DocumentGetResult>({
        method: 'note.document.get',
        params: {
          id: 42,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document title:', result.item.title)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getDocument() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.document.get',
            params: {
              id: 42,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document title:', result.item.title)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDocument)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.document.get',
                [
                    'id' => 42,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting document: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.document.get',
        {
            id: 42
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
        'note.document.get',
        [
            'id' => 42
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
        "item": {
            "id": 42,
            "collectionId": 123,
            "parentId": 10,
            "title": "Глава 1",
            "markdown": "# Глава 1\n\nТекст в Markdown...",
            "position": 5,
            "createdBy": 1,
            "updatedBy": 1,
            "createdAt": "2026-04-20T12:00:00+00:00",
            "updatedAt": "2026-04-21T09:15:30+00:00"
        }
    },
    "time": {
        "start": 1780639800,
        "finish": 1780639800.215441,
        "duration": 0.21544098854064941,
        "processing": 0.1772141456604004,
        "date_start": "2026-06-19T10:10:00+03:00",
        "date_finish": "2026-06-19T10:10:00+03:00",
        "operating_reset_at": 1780640400,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными документа ||
|| **item**
[`object`](../../../data-types.md) | Объект документа ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор документа ||
|| **collectionId**
[`integer`](../../../data-types.md) | Идентификатор базы знаний или `null`, если документ доступен через прямой доступ к документу ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского документа или `null` ||
|| **title**
[`string`](../../../data-types.md) | Заголовок документа ||
|| **markdown**
[`string`](../../../data-types.md) | Содержимое документа в Markdown ||
|| **position**
[`integer`](../../../data-types.md) | Позиция документа среди соседних страниц ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор автора документа ||
|| **updatedBy**
[`integer`](../../../data-types.md) | Идентификатор последнего редактора документа ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания документа ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения документа ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
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
|| `id` | Документ не найден | Проверьте, что документ существует, не архивирован, не находится в корзине и доступен пользователю ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-document-tree-list.md)
- [{#T}](./note-document-search-list.md)
- [{#T}](./index.md)
