# Получить список пунктов чек-листа шаблона задачи tasks.template.checklist.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения шаблона задачи

Метод `tasks.template.checklist.list` возвращает список пунктов чек-листа шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](../tasks-template-add.md) ||
|| **filter**
[`object`](../../../data-types.md) | Фильтр выборки пунктов чек-листа вида `{ "поле": "значение", ... }`.

Фильтровать можно по полям:
- `ID` — идентификатор пункта чек-листа
- `TEMPLATE_ID` — идентификатор шаблона задачи
- `PARENT_ID` — идентификатор родительского пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта

Параметр `templateId` принудительно добавляется в фильтр как `TEMPLATE_ID`, даже если в `filter` передано другое значение ||
|| **select**
[`array`](../../../data-types.md) | Список полей для выборки.

В выборке можно указать поля:
- `ID` — идентификатор пункта чек-листа
- `TEMPLATE_ID` — идентификатор шаблона задачи
- `PARENT_ID` — идентификатор родительского пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта
- `MEMBERS` — список участников пункта
- `ATTACHMENTS` — список вложений пункта ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки результата вида `{ "поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор пункта чек-листа
- `PARENT_ID` — идентификатор родительского пункта
- `CREATED_BY` — идентификатор автора пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта
- `TOGGLED_BY` — идентификатор пользователя, который последний раз сменил статус пункта
- `TOGGLED_DATE` — дата и время изменения статуса пункта

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию результат сортируется по `ID` в порядке убывания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "filter": {
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "N"
      },
      "select": [
        "ID",
        "TEMPLATE_ID",
        "PARENT_ID",
        "TITLE",
        "SORT_INDEX",
        "IS_COMPLETE",
        "IS_IMPORTANT"
      ],
      "order": {
        "SORT_INDEX": "asc",
        "ID": "desc"
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "filter": {
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "N"
      },
      "select": [
        "ID",
        "TEMPLATE_ID",
        "PARENT_ID",
        "TITLE",
        "SORT_INDEX",
        "IS_COMPLETE",
        "IS_IMPORTANT"
      ],
      "order": {
        "SORT_INDEX": "asc",
        "ID": "desc"
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CheckListItem = {
      id: string
      templateId: string
      parentId: number | string
      title: string
      sortIndex: string
      isComplete: string
      isImportant: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CheckListItemsResult = {
      checkListItems: Record<string, CheckListItem>
    }

    try {
      // tasks.template.checklist.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CheckListItemsResult>({
        method: 'tasks.template.checklist.list',
        params: {
          templateId: 139,
          filter: {
            IS_COMPLETE: 'N',
            IS_IMPORTANT: 'N',
          },
          select: [
            'ID',
            'TEMPLATE_ID',
            'PARENT_ID',
            'TITLE',
            'SORT_INDEX',
            'IS_COMPLETE',
            'IS_IMPORTANT',
          ],
          order: {
            SORT_INDEX: 'asc',
            ID: 'desc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(
          'Checklist items count:', Object.keys(result.checkListItems).length,
          'Items:', result.checkListItems
        )
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
      async function listTemplateChecklistItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.template.checklist.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.checklist.list',
            params: {
              templateId: 139,
              filter: {
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'N',
              },
              select: [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT',
              ],
              order: {
                SORT_INDEX: 'asc',
                ID: 'desc',
              },
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
          console.info(
            'Checklist items count:', Object.keys(result.checkListItems).length,
            'Items:', result.checkListItems
          )
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplateChecklistItems)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.template.checklist.list',
                [
                    'templateId' => 139,
                    'filter' => [
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'N',
                    ],
                    'select' => [
                        'ID',
                        'TEMPLATE_ID',
                        'PARENT_ID',
                        'TITLE',
                        'SORT_INDEX',
                        'IS_COMPLETE',
                        'IS_IMPORTANT',
                    ],
                    'order' => [
                        'SORT_INDEX' => 'asc',
                        'ID' => 'desc',
                    ]
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

    ```js
    BX24.callMethod(
        'tasks.template.checklist.list',
        {
            templateId: 139,
            filter: {
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'N'
            },
            select: [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT'
            ],
            order: {
                SORT_INDEX: 'asc',
                ID: 'desc'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.template.checklist.list',
        [
            'templateId' => 139,
            'filter' => [
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'N',
            ],
            'select' => [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT',
            ],
            'order' => [
                'SORT_INDEX' => 'asc',
                'ID' => 'desc',
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "checkListItems": {
            "23": {
                "id": "23",
                "templateId": "139",
                "parentId": 0,
                "title": "Что нужно сделать",
                "sortIndex": "0",
                "isComplete": "N",
                "isImportant": "N"
            },
            "27": {
                "id": "27",
                "templateId": "139",
                "parentId": "23",
                "title": "2. Заполнить форму отчета",
                "sortIndex": "1",
                "isComplete": "N",
                "isImportant": "N"
            },
            "29": {
                "id": "29",
                "templateId": "139",
                "parentId": "23",
                "title": "3. Отправить отчет руководителю",
                "sortIndex": "3",
                "isComplete": "N",
                "isImportant": "N"
            },
            "25": {
                "id": "25",
                "templateId": "139",
                "parentId": "23",
                "title": "1. Собрать данные",
                "sortIndex": "4",
                "isComplete": "N",
                "isImportant": "N"
            }
        }
    },
    "time": {
        "start": 1773316805,
        "finish": 1773316806.016895,
        "duration": 1.016895055770874,
        "processing": 0,
        "date_start": "2026-03-12T15:00:05+03:00",
        "date_finish": "2026-03-12T15:00:06+03:00",
        "operating_reset_at": 1773317406,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **checkListItems**
[`object`](../../../data-types.md) | Объект, в котором ключ — идентификатор пункта чек-листа, а значение — описание пункта чек-листа [(подробное описание)](#checklistitems).

Набор полей в ответе зависит от параметра `select` ||
|#

{% include [Расшифровка объекта checkListItem](./_includes/checklist-item-response.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Доступ к шаблону задачи запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Доступ к шаблону задачи запрещен | Недостаточно прав на чтение шаблона ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-checklist-add.md)
- [{#T}](./tasks-template-checklist-update.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-delete.md)
- [{#T}](./tasks-template-checklist-move-after.md)
- [{#T}](./tasks-template-checklist-move-before.md)
- [{#T}](./tasks-template-checklist-complete.md)
- [{#T}](./tasks-template-checklist-renew.md)
- [{#T}](./tasks-template-checklist-add-attachment-by-content.md)
- [{#T}](./tasks-template-checklist-add-attachments-from-disk.md)
- [{#T}](./tasks-template-checklist-remove-attachments.md)
