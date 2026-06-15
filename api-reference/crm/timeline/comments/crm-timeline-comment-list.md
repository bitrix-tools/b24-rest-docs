# Получить список комментариев crm.timeline.comment.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение элементов CRM

Метод `crm.timeline.comment.list` получает список всех дел типа «Комментарий» указанного элемента CRM.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив полей, которые необходимо выбрать. Передавайте поля объекта [result](./crm-timeline-comment-fields.md#fields). Если не передан или передан пустой массив, будут возвращены все поля ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации выбранных комментариев в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Фильтр работает по двум обязательным полям:
- `ENTITY_ID` — ID элемента CRM, к которому привязан комментарий
- `ENTITY_TYPE` — [тип объекта CRM](../../data-types.md#object_type), например: `deal`, `lead`, `contact`, `company`
||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных комментариев в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Поддерживаются только поля `ID`, `CREATED`, `AUTHOR_ID`.

Возможные значения для `order`:

- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания
 ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Если параметр не передан, используется значение `0` (первая страница).

Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ENTITY_ID":10,"ENTITY_TYPE":"deal"},"select":["ID","CREATED","ENTITY_ID","ENTITY_TYPE","AUTHOR_ID","COMMENT","FILES"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.comment.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ENTITY_ID":10,"ENTITY_TYPE":"deal"},"select":["ID","CREATED","ENTITY_ID","ENTITY_TYPE","AUTHOR_ID","COMMENT","FILES"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CommentFile = {
      id: number
      date: ISODate
      type: string
      name: string
      size: number
      image?: { width: number; height: number }
      authorId: number
      authorName: string
      urlPreview: string
      urlShow: string
      urlDownload: string
    }

    // Shape of each CommentItem returned in result[]
    type CommentItem = {
      ID: string
      ENTITY_ID: string
      ENTITY_TYPE: string
      CREATED: ISODate | null
      COMMENT: string
      AUTHOR_ID: string
      FILES: Record<string, CommentFile>
    }

    try {
      // crm.timeline.comment.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CommentItem[]>({
        method: 'crm.timeline.comment.list',
        params: {
          filter: {
            ENTITY_ID: 10,
            ENTITY_TYPE: 'deal',
          },
          select: [
            'ID',
            'CREATED',
            'ENTITY_ID',
            'ENTITY_TYPE',
            'AUTHOR_ID',
            'COMMENT',
            'FILES',
          ],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comments count:', result.length, 'first comment:', result[0])
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
      async function fetchTimelineComments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.timeline.comment.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.comment.list',
            params: {
              filter: {
                ENTITY_ID: 10,
                ENTITY_TYPE: 'deal',
              },
              select: [
                'ID',
                'CREATED',
                'ENTITY_ID',
                'ENTITY_TYPE',
                'AUTHOR_ID',
                'COMMENT',
                'FILES',
              ],
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
          console.info('Comments count:', result.length, 'first comment:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTimelineComments)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.comment.list',
                [
                    'filter' => [
                        'ENTITY_ID'   => 10,
                        'ENTITY_TYPE' => 'deal',
                    ],
                    'select' => [
                        'ID',
                        'CREATED',
                        'ENTITY_ID',
                        'ENTITY_TYPE',
                        'AUTHOR_ID',
                        'COMMENT',
                        'FILES',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching timeline comments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.list",
        {
            filter: {
                "ENTITY_ID": 10,
                "ENTITY_TYPE": "deal",
            },
            select: [
                "ID",
                "CREATED",
                "ENTITY_ID",
                "ENTITY_TYPE",
                "AUTHOR_ID",
                "COMMENT", 
                "FILES",
            ],
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.list',
        [
            'filter' => [
                'ENTITY_ID' => 10,
                'ENTITY_TYPE' => 'deal',
            ],
            'select' => [
                'ID',
                'CREATED',
                'ENTITY_ID',
                'ENTITY_TYPE',
                'AUTHOR_ID',
                'COMMENT',
                'FILES',
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
            "ID": "999",
            "ENTITY_ID": "2",
            "ENTITY_TYPE": "deal",
            "CREATED": "2020-03-02T12:00:00+03:00",
            "COMMENT": "New comment was added",
            "AUTHOR_ID": "1",
            "FILES": {
                "1": {
                    "id": 1,
                    "date": "2020-03-02T12:00:00+03:00",
                    "type": "image",
                    "name": "1.gif",
                    "size": 43,
                    "image": {
                        "width": 1,
                        "height": 1
                    },
                    "authorId": 1,
                    "authorName": "John Dou",
                    "urlPreview": "https://my.bitrix24.com/disk/showFile/930/?&ncc=1&width=640&height=640&signature=292f450929833cd881070155e05a2c41b5bb265ea8c8c1bc2108dbcbb56f667f&ts=1718366521&filename=1.gif",
                    "urlShow": "https://my.bitrix24.com/disk/showFile/930/?&ncc=1&ts=1718366521&filename=1.gif",
                    "urlDownload": "https://my.bitrix24.com/disk/downloadFile/930/?&ncc=1&filename=1.gif"
                },
                "2": {
                    "id": 2,
                    "date": "2020-03-02T12:00:00+03:00",
                    "type": "image",
                    "name": "2.gif",
                    "size": 43,
                    "image": {
                        "width": 1,
                        "height": 1
                    },
                    "authorId": 1,
                    "authorName": "John Dou",
                    "urlPreview": "https://my.bitrix24.com/disk/showFile/931/?&ncc=1&width=640&height=640&signature=118de010a40eff06fb9d691ee9235e2ef809a17780e46927bf8b12f8dc3224db&ts=1718366521&filename=2.gif",
                    "urlShow": "https://my.bitrix24.com/disk/showFile/931/?&ncc=1&ts=1718366521&filename=2.gif",
                    "urlDownload": "https://my.bitrix24.com/disk/downloadFile/931/?&ncc=1&filename=2.gif"
                }
            }
        },
        {
            "ID": "1000",
            "ENTITY_ID": "2",
            "ENTITY_TYPE": "deal",
            "CREATED": "2020-03-02T12:00:00+03:00",
            "COMMENT": "Test comment",
            "AUTHOR_ID": "1",
            "FILES": {}
        }
    ],
    "total": 2,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Корневой элемент ответа, содержащий массив объектов с информацией о выбранных комментариях ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Access denied | Отсутствуют права на указанный элемент CRM ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-comment-add.md)
- [{#T}](./crm-timeline-comment-update.md)
- [{#T}](./crm-timeline-comment-get.md)
- [{#T}](./crm-timeline-comment-delete.md)
- [{#T}](./crm-timeline-comment-fields.md)
