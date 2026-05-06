# Получить список пунктов чек-листа шаблона задачи tasks.template.checklist.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

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

- JS

    ```javascript
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
        const response = await $b24.callListMethod(
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
            (progress) => { console.log('Progress:', progress) }
        );
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
        const generator = $b24.fetchListMethod('tasks.template.checklist.list', {
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
        }, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity) }
        }
    } catch (error) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
        const response = await $b24.callMethod('tasks.template.checklist.list', {
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
        }, 0);
        const result = response.getData().result || [];
        for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
    console.error('Request failed', error)
    }
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
