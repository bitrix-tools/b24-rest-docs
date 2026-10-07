# Получить список баз знаний note.collection.list

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

Метод `note.collection.list` возвращает список доступных пользователю баз знаний.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Размер страницы.

Допустимые значения: от `1` до `200`

По умолчанию: `50`.

Значение приводится к целому числу. Значения больше `200` уменьшаются до `200`; нулевое, отрицательное или нечисловое значение заменяется на `50` без ошибки валидации ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор следующей страницы. Передавайте значение `result.nextCursor` из предыдущего ответа. [Описание структуры объекта](#aftercursor).

По умолчанию: первая страница. Если курсор не содержит оба поля `position` и `id` или передан не объектом, он игнорируется без ошибки валидации ||
|#

### Параметр afterCursor {#aftercursor}

#|
|| **Название**
`тип` | **Описание** ||
|| **position***
[`integer`](../../data-types.md) | Значение поля `position` последней базы знаний из предыдущей страницы.

Обязателен, если задан `afterCursor` ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор последней базы знаний из предыдущей страницы.

Обязателен, если задан `afterCursor` ||
|#

Поля курсора приводятся к целым числам. Чтобы не начать обход заново и не пропустить записи, передавайте курсор из ответа без изменений. Для следующего запроса сохраняйте тот же `pagination.limit`; завершайте обход при `result.nextCursor = null`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    pagination = {
        "limit": 50,
        "afterCursor": {
            "position": 100,
            "id": 42,
        },
    }

    try:
        bitrix_response = client.note.collection.list(
            pagination=pagination,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.collection.list", b24.Params{
    	"pagination": b24.Params{
    		"limit": 50,
    		"afterCursor": b24.Params{
    			"position": 100,
    			"id":       42,
    		},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("note.collection.list: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "nextCursor": null,
        "items": [
            {
                "id": 9,
                "name": "База знаний 1",
                "position": 100,
                "policyLevel": "private",
                "accessLevel": "full",
                "isArchived": false,
                "createdBy": 1,
                "createdAt": "2026-06-23T22:01:03+03:00",
                "updatedBy": 1,
                "updatedAt": "2026-06-23T22:05:39+03:00",
                "markdownDescription": null
            },
            {
                "id": 7,
                "name": "База знаний 2",
                "position": 100,
                "policyLevel": "private",
                "accessLevel": "full",
                "isArchived": false,
                "createdBy": 1,
                "createdAt": "2026-06-22T12:16:33+03:00",
                "updatedBy": 1,
                "updatedAt": "2026-06-22T12:16:33+03:00",
                "markdownDescription": null
            }
        ]
    },
    "time": {
        "start": 1791206039,
        "finish": 1791206039.885758,
        "duration": 0.8857579231262207,
        "processing": 0,
        "date_start": "2026-10-05T16:13:59+03:00",
        "date_finish": "2026-10-05T16:13:59+03:00",
        "operating_reset_at": 1791206639,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком баз знаний и курсором ||
|| **result.items**
[`array`](../../data-types.md) | Массив объектов баз знаний, доступных пользователю ||
|| **result.items[].id**
[`integer`](../../data-types.md) | Идентификатор базы знаний ||
|| **result.items[].name**
[`string`](../../data-types.md) | Название базы знаний ||
|| **result.items[].position**
[`integer`](../../data-types.md) | Позиция базы знаний в списке ||
|| **result.items[].policyLevel**
[`string`](../../data-types.md) | Код политики доступа базы знаний, например `private` или `portal`. Уровень доступа текущего пользователя возвращается отдельно в `accessLevel` ||
|| **result.items[].accessLevel**
[`string`](../../data-types.md) | Код уровня доступа текущего пользователя к базе знаний. В примере — `full` ||
|| **result.items[].isArchived**
[`boolean`](../../data-types.md) | `true` — база знаний архивирована, `false` — не архивирована ||
|| **result.items[].createdBy**
[`integer`](../../data-types.md) | Идентификатор автора базы знаний ||
|| **result.items[].updatedBy**
[`integer`](../../data-types.md) | Идентификатор последнего редактора базы знаний ||
|| **result.items[].createdAt**
[`datetime`](../../data-types.md) или `null` | Дата и время создания в формате ISO 8601 с часовым поясом ||
|| **result.items[].updatedAt**
[`datetime`](../../data-types.md) или `null` | Дата и время последнего изменения в формате ISO 8601 с часовым поясом ||
|| **result.items[].markdownDescription**
[`string`](../../data-types.md) или `null` | Дополнительное описание Markdown. В приведенном ответе — `null` ||
|| **result.nextCursor**
[`object`](../../data-types.md) или `null` | Курсор следующей страницы. `null` означает, что страниц больше нет ||
|| **result.nextCursor.position**
[`integer`](../../data-types.md) | Позиция последней базы знаний на странице. Присутствует, если `nextCursor` не равен `null` ||
|| **result.nextCursor.id**
[`integer`](../../data-types.md) | Идентификатор последней базы знаний на странице. Присутствует, если `nextCursor` не равен `null` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

Выход `pagination.limit` за диапазон и неполный `pagination.afterCursor` не вызывают ошибки валидации: значения нормализуются по правилам из раздела «Параметры метода».

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-collection-add.md)
- [{#T}](./note-collection-update.md)
- [{#T}](./index.md)
