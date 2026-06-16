# Получить список отделов humanresources.node.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр отделов» или «Просмотр команд»

Метод `humanresources.node.list` возвращает список отделов или команд.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../../data-types.md) | Тип элемента структуры.

Возможные значения:

- `DEPARTMENT` — отдел
- `TEAM` — команда ||
|| **select**
[`array`](../../../data-types.md) | Список полей отдела или команды, которые нужно вернуть.

Доступные поля:

- `id` — идентификатор элемента структуры
- `name` — название отдела или команды
- `type` — тип элемента структуры
- `structureId` — идентификатор структуры компании
- `parentId` — идентификатор родительского отдела или команды
- `description` — описание элемента структуры
- `accessCode` — код доступа элемента структуры
- `userCount` — количество пользователей в отделе или команде
- `colorName` — цвет команды
- `xmlId` — внешний идентификатор элемента структуры
- `createdAt` — дата и время создания
- `updatedAt` — дата и время последнего обновления ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество записей на страницу, по умолчанию `50`, максимум `200`
- `offset` — смещение записей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt"],"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt"],"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type NodeItem = {
      id: number
      name: string
      type: string
      structureId: number
      parentId: number | null
      description: string
      accessCode: string
      userCount: number
      colorName: string | null
      xmlId: string | null
      createdAt: ISODate | null
      updatedAt: ISODate | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NodeListResult = {
      items: NodeItem[]
    }

    try {
      // humanresources.node.list returns a single page (max 200 records). For the whole result set
      // use a list helper: $b24.actions.v3.callList.make() returns every record as one
      // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + pagination variant when sort matters.
      const response = await $b24.actions.v3.call.make<NodeListResult>({
        method: 'humanresources.node.list',
        params: {
          type: 'DEPARTMENT',
          select: [
            'id',
            'name',
            'type',
            'structureId',
            'parentId',
            'description',
            'accessCode',
            'userCount',
            'colorName',
            'xmlId',
            'createdAt',
            'updatedAt',
          ],
          pagination: {
            page: 1,
            limit: 20,
            offset: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Nodes retrieved:', result.items.length, result.items)
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
      async function listNodes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // humanresources.node.list returns a single page (max 200 records). For the whole result set
          // use a list helper: $b24.actions.v3.callList.make() returns every record as one
          // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + pagination variant when sort matters.
          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.node.list',
            params: {
              type: 'DEPARTMENT',
              select: [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt',
              ],
              pagination: {
                page: 1,
                limit: 20,
                offset: 0,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Nodes retrieved:', result.items.length, result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listNodes)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.list',
                [
                    'type' => 'DEPARTMENT',
                    'select' => [
                        'id',
                        'name',
                        'type',
                        'structureId',
                        'parentId',
                        'description',
                        'accessCode',
                        'userCount',
                        'colorName',
                        'xmlId',
                        'createdAt',
                        'updatedAt'
                    ],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'offset' => 0
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.list',
        {
            type: 'DEPARTMENT',
            select: [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt'
            ],
            pagination: {
                page: 1,
                limit: 20,
                offset: 0
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
        'humanresources.node.list',
        [
            'type' => 'DEPARTMENT',
            'select' => [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt'
            ],
            'pagination' => [
                'page' => 1,
                'limit' => 20,
                'offset' => 0
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
                    "id": 1,
                    "name": "Отдел продаж",
                    "type": "DEPARTMENT",
                    "structureId": 1,
                    "parentId": null,
                    "description": "Основной отдел продаж",
                    "accessCode": "DR1",
                    "userCount": 18,
                    "colorName": null,
                    "xmlId": null,
                    "createdAt": "2026-05-20T10:15:00+03:00",
                    "updatedAt": "2026-06-02T10:30:00+03:00"
                },
                {
                    "id": 2,
                    "name": "Отдел маркетинга",
                    "type": "DEPARTMENT",
                    "structureId": 1,
                    "parentId": 1,
                    "description": "Отдел отвечает за продвижение продуктов компании",
                    "accessCode": "DR2",
                    "userCount": 9,
                    "colorName": null,
                    "xmlId": "marketing_department",
                    "createdAt": "2026-05-22T09:00:00+03:00",
                    "updatedAt": "2026-06-02T11:45:00+03:00"
                }
            ]
        },
    "time": {
        "start": 1780403500,
        "finish": 1780403500.248911,
        "duration": 0.24891114234924316,
        "processing": 0.21900415420532227,
        "date_start": "2026-06-02T15:31:40+03:00",
        "date_finish": "2026-06-02T15:31:40+03:00",
        "operating_reset_at": 1780404100,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../../data-types.md) | Массив объектов отделов или команд. Состав полей элемента зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":\"abc\"}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `limit`
`offset`
`page` | Не удается распознать параметр пагинации `#PAGE#` | Передайте числовые значения. `limit` не должен быть равен `0` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `type` | Обязательное поле `type` не указано | Передайте `type` со значением `DEPARTMENT` или `TEAM` ||
|| `type` | Передано недопустимое значение типа элемента структуры | Используйте `DEPARTMENT` для отдела или `TEAM` для команды ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `NodeDto` | Передайте только поля из списка `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["id","name"]` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права просматривать отделы и команды  ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-get.md)
- [{#T}](./humanresources-node-search.md)
- [{#T}](./index.md)
