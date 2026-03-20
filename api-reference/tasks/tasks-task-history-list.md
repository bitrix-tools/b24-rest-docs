# Получить историю задачи tasks.task.history.list

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче на чтение

Метод `tasks.task.history.list` получает историю изменений задачи.

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../data-types.md) | Идентификатор задачи, для которой нужно получить историю.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add.md) или методом [получения списка задач](./tasks-task-list.md) ||
|| **filter**
[`object`](../data-types.md) | Фильтр по типу события в формате `{FIELD: 'EVENT'}`. Список возможных значений для `FIELD` описан [ниже](#lists)
||
|| **order**
[`object`](../data-types.md) | Объект для сортировки результата вида `{"поле": "значение сортировки", ... }`.

Направление сортировки может принимать значения:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию записи сортируются по убыванию по времени создания, то есть от новых к старым ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8137,"filter":{"FIELD":"COMMENT"},"order":{"createdDate":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.history.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8137,"filter":{"FIELD":"COMMENT"},"order":{"createdDate":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.history.list
    ```

- JS

    ```javascript
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'tasks.task.history.list',
        {
            taskId: 8137,
            filter: { FIELD: 'COMMENT' },
            order: { createdDate: 'ASC' }
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
    const generator = $b24.fetchListMethod('tasks.task.history.list', {
        taskId: 8137,
        filter: { FIELD: 'COMMENT' },
        order: { createdDate: 'ASC' }
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
    const response = await $b24.callMethod('tasks.task.history.list', {
        taskId: 8137,
        filter: { FIELD: 'COMMENT' },
        order: { createdDate: 'ASC' }
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
                'tasks.task.history.list',
                [
                    'taskId' => 8137,
                    'filter' => ['FIELD' => 'COMMENT'],
                    'order' => ['createdDate' => 'ASC']
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task history: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.history.list',
        {
            taskId: 8137,
            filter: { FIELD: 'COMMENT' },
            order: {createdDate: 'ASC'},
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.history.list',
        [
            'taskId' => 8137,
            'filter' => ['FIELD' => 'COMMENT'],
            'order' => ['createdDate' => 'ASC']
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
        "list": [
            {
                "id": 16359,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "NEW",
                "value": {
                    "from": null,
                    "to": null
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16361,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "COMMENT",
                "value": {
                    "from": null,
                    "to": "3409"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16363,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "CHECKLIST_ITEM_CREATE",
                "value": {
                    "from": "",
                    "to": "Что сделать"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16365,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "CHECKLIST_ITEM_CREATE",
                "value": {
                    "from": "",
                    "to": "Связаться с клиентом"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16367,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "CHECKLIST_ITEM_CREATE",
                "value": {
                    "from": "",
                    "to": "Подготовить договор"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16369,
                "createdDate": "2025-09-25T14:09:45+03:00",
                "field": "CHECKLIST_ITEM_CREATE",
                "value": {
                    "from": "",
                    "to": "Подписать договор"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16371,
                "createdDate": "2025-09-25T14:09:57+03:00",
                "field": "AUDITORS",
                "value": {
                    "from": "",
                    "to": "547"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16375,
                "createdDate": "2025-09-25T14:09:57+03:00",
                "field": "COMMENT",
                "value": {
                    "from": null,
                    "to": "3411"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            },
            {
                "id": 16373,
                "createdDate": "2025-09-25T14:09:58+03:00",
                "field": "COMMENT",
                "value": {
                    "from": null,
                    "to": "3413"
                },
                "user": {
                    "id": 503,
                    "name": "Мария",
                    "lastName": "Иванова",
                    "secondName": "",
                    "login": "maria@mysite.ru"
                }
            }
        ],
    },
    "time": {
        "start": 1758798620,
        "finish": 1758798620.969019,
        "duration": 0.9690189361572266,
        "processing": 0,
        "date_start": "2025-09-25T14:10:20+03:00",
        "date_finish": "2025-09-25T14:10:20+03:00",
        "operating_reset_at": 1758799220,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит массив `list`, который содержит объекты с [описанием событий](#lists) в задаче.

Возвращает пустой массив `"list":[]`, если задача не существует ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объекты lists {#lists}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор события истории ||
|| **createdDate**
[`string`](../data-types.md) | Дата и время создания события в формате ISO 8601 ||
|| **field**
[`string`](../data-types.md) | Тип события истории. Возможные значения `field`:

- `TITLE` — изменение названия задачи
- `DESCRIPTION` — изменение описания задачи
- `REAL_STATUS` — изменение фактического статуса
- `STATUS` — изменение статуса задачи
- `PRIORITY` — изменение приоритета
- `MARK` — изменение оценки задачи
- `COMMENT` — добавление комментария
- `DELETE` — удаление задачи
- `NEW` — создание новой задачи
- `RENEW` — восстановление задачи
- `MOVE_TO_BACKLOG` — перемещение задачи в бэклог
- `MOVE_TO_SPRINT` — перемещение задачи в спринт
- `PARENT_ID` — изменение родительской задачи
- `GROUP_ID` — изменение рабочей группы/проекта
- `STAGE_ID` — изменение стадии
- `CREATED_BY` — изменение автора задачи
- `RESPONSIBLE_ID` — изменение исполнителя
- `ACCOMPLICES` — изменение соисполнителей
- `AUDITORS` — изменение наблюдателей
- `DEADLINE` — изменение крайнего срока
- `START_DATE_PLAN` — изменение плановой даты начала
- `END_DATE_PLAN` — изменение плановой даты окончания
- `DURATION_PLAN` — изменение плановой длительности
- `DURATION_PLAN_SECONDS` — изменение плановой длительности в секундах
- `DURATION_FACT` — изменение фактической длительности
- `TIME_ESTIMATE` — изменение оценки времени
- `TIME_SPENT_IN_LOGS` — изменение фактически затраченного времени по логу
- `TAGS` — изменение тегов задачи
- `DEPENDS_ON` — изменение зависимостей задачи
- `FILES` — изменение списка файлов
- `UF_TASK_WEBDAV_FILES` — изменение пользовательского поля с файлами
- `CHECKLIST_ITEM_CREATE` — создание пункта чек-листа
- `CHECKLIST_ITEM_RENAME` — переименование пункта чек-листа
- `CHECKLIST_ITEM_REMOVE` — удаление пункта чек-листа
- `CHECKLIST_ITEM_CHECK` — отметка пункта чек-листа как выполненного
- `CHECKLIST_ITEM_UNCHECK` — снятие отметки выполнения пункта чек-листа
- `ADD_IN_REPORT` — изменение признака «добавлять в отчет»
- `TASK_CONTROL` — изменение контроля результата
- `ALLOW_TIME_TRACKING` — включение или выключение учета времени
- `ALLOW_CHANGE_DEADLINE` — разрешение или запрет изменения дедлайна
- `FLOW_ID` — изменение потока ||
|| **value**
[`object`](../data-types.md) | Объект описывает, какое изменение произошло:
- `from` — значение до изменения
- `to` — значение после изменения

Тип значения зависит от события: для нового комментария — `ID` комментария, для изменения пункта чек-листа — текст пункта, для добавления наблюдателя — идентификатор пользователя, и так далее ||
|| **user**
[`object`](../data-types.md) | Объект с [описанием пользователя](#user), который выполнил действие ||
|#

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../data-types.md) | Имя ||
|| **lastName**
[`string`](../data-types.md) | Фамилия ||
|| **secondName**
[`string`](../data-types.md) | Отчество ||
|| **login**
[`string`](../data-types.md) | Логин ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Access denied. (internal error)"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | CTaskItem All parameters in the constructor must have real class type (internal error) | Не указан обязательный параметр `taskId` ||
|| `0` | wrong task id (internal error) | В параметре `taskId` указано значение неверного типа ||
|| `0` | Access denied. (internal error) | У пользователя нет доступа к задаче ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./tasks-task-get.md)
- [{#T}](./tasks-task-list.md)
