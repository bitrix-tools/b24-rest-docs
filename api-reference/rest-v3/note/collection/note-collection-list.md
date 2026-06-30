# Получить список баз знаний note.collection.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний

Метод `note.collection.list` возвращает список доступных пользователю баз знаний.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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
|| **afterCursor**
[`object`](../../../data-types.md) | Курсор следующей страницы. Передавайте значение `nextCursor` из предыдущего ответа. [Описание структуры объекта](#aftercursor) ||
|#

### Параметр afterCursor {#aftercursor}

#|
|| **Название**
`тип` | **Описание** ||
|| **position***
[`integer`](../../../data-types.md) | Значение поля `position` последней базы знаний из предыдущей страницы.

Обязателен, если задан `afterCursor` ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор последней базы знаний из предыдущей страницы.

Обязателен, если задан `afterCursor` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.collection.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":50,"afterCursor":{"position":100,"id":42}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.collection.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":50,"afterCursor":{"position":100,"id":42}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.collection.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CollectionListResult = {
      items: Array<{
        id: number
        name: string
        position: number
        policyLevel: string
        createdBy: number
        updatedBy: number
        createdAt: ISODate
        updatedAt: ISODate
      }>
      nextCursor: {
        position: number
        id: number
      } | null
    }

    try {
      const response = await $b24.actions.v3.call.make<CollectionListResult>({
        method: 'note.collection.list',
        params: {
          pagination: {
            limit: 50,
            afterCursor: {
              position: 100,
              id: 42,
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Collections:', result.items.length, result.nextCursor)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listCollections() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.collection.list',
            params: {
              pagination: {
                limit: 50,
                afterCursor: {
                  position: 100,
                  id: 42,
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Collections:', result.items.length, result.nextCursor)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCollections)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.collection.list',
                [
                    'pagination' => [
                        'limit' => 50,
                        'afterCursor' => [
                            'position' => 100,
                            'id' => 42,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing collections: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.collection.list',
        {
            pagination: {
                limit: 50,
                afterCursor: {
                    position: 100,
                    id: 42
                }
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
        'note.collection.list',
        [
            'pagination' => [
                'limit' => 50,
                'afterCursor' => [
                    'position' => 100,
                    'id' => 42,
                ],
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
    "result": {
        "items": [
            {
                "id": 1,
                "name": "Продуктовая документация",
                "position": 100,
                "policyLevel": "view",
                "createdBy": 1,
                "updatedBy": 1,
                "createdAt": "2026-04-20T12:00:00Z",
                "updatedAt": "2026-04-21T09:15:30Z"
            }
        ],
        "nextCursor": {
            "position": 100,
            "id": 1
        }
    },
    "time": {
        "start": 1780639200,
        "finish": 1780639200.224321,
        "duration": 0.2243211269378662,
        "processing": 0.18721413612365723,
        "date_start": "2026-06-19T10:00:00+03:00",
        "date_finish": "2026-06-19T10:00:00+03:00",
        "operating_reset_at": 1780639800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект со списком баз знаний ||
|| **items**
[`array`](../../../data-types.md) | Список баз знаний, доступных пользователю ||
|| **items[]**
[`object`](../../../data-types.md) | Объект базы знаний ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор базы знаний ||
|| **name**
[`string`](../../../data-types.md) | Название базы знаний ||
|| **position**
[`integer`](../../../data-types.md) | Позиция базы знаний в общем списке ||
|| **policyLevel**
[`string`](../../../data-types.md) | Базовая политика доступа базы знаний.

Возможные значения:

- `none` — нет доступа
- `view` — просмотр
- `manage` — редактирование
- `moderate` — администрирование ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор автора базы знаний ||
|| **updatedBy**
[`integer`](../../../data-types.md) | Идентификатор последнего редактора базы знаний ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания базы знаний в UTC ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения базы знаний в UTC ||
|| **nextCursor**
[`object`](../../../data-types.md) | Курсор следующей страницы или `null`, если страниц больше нет ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION",
        "message": "Доступ запрещен"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-collection-add.md)
- [{#T}](./note-collection-update.md)
- [{#T}](./index.md)
