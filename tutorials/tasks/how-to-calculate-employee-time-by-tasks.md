# Как посчитать затраченное время по задачам для каждого сотрудника

> Scope: [`task`, `user_brief`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права на просмотр задач и записей времени
>
> - [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) — пользователь с доступом к задачам из фильтра
> - [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) — пользователь с доступом к задаче
> - [user.get](../../api-reference/user/user-get.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Стандартные отчеты по задачам показывают общее затраченное время задачи и могут относить сумму к ответственному. Если над задачей работали несколько сотрудников, такой отчет не показывает, сколько времени потратил каждый участник.

Чтобы получить персональную таблицу затрат, нужно работать не с итоговым временем задачи, а с записями учета времени. Сценарий состоит из трех шагов.

1. Получить задачи методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) с фильтром по проекту, датам или участникам
2. Получить записи о затраченном времени по каждой задаче методом [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) и сгруппировать их по `USER_ID`
3. Получить имена сотрудников методом [user.get](../../api-reference/user/user-get.md) по идентификаторам из записей времени

В результате получится таблица, где строка сотрудника содержит только его время, а не сумму по всем участникам задач.

## Что нужно до начала

- входящий вебхук создан от имени пользователя, который видит нужные задачи и записи времени. Методы задач учитывают его права: он получит только доступные задачи

- в правах вебхука отмечены scope `task` и `user_brief`

- вы знаете идентификатор рабочей группы или другой фильтр, по которому нужно выбрать задачи

- вы знаете период отчета, например даты завершения задач

- в выбранных задачах включен учет времени и есть записи о затраченном времени

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

Вебхук выполняет запросы с правами создавшего его пользователя. Администратор видит все задачи, руководитель — задачи своих сотрудников, остальные пользователи видят только доступные им задачи.

Дальше в примерах используются рабочая группа `15`, период с `2026-08-01` по `2026-08-31` и сотрудник `37`. В вашем Битрикс24 эти значения будут другими: замените их на свои или подставьте значения из интерфейса.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1. Получаем список задач

Метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) получает задачи с постраничной навигацией. В примере выбираем завершенные задачи рабочей группы за период и запрашиваем поля, которые нужны для отчета:

- `ID` — идентификатор задачи
- `TITLE` — название задачи для детализации строк отчета
- `GROUP_ID` — идентификатор рабочей группы
- `CLOSED_DATE` — дата завершения задачи

Если нужно построить отчет только по задачам, где сотрудник участвует как соисполнитель, добавьте в `filter` поле `ACCOMPLICE`. Если нужно выбрать задачи, где он ответственный, используйте `RESPONSIBLE_ID`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const reportFilter = {
        GROUP_ID: 15,
        REAL_STATUS: 5,
        '>=CLOSED_DATE': '2026-08-01',
        '<=CLOSED_DATE': '2026-08-31'
    }

    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function getTasks(filter) {
        const tasks = []
        let start = 0

        while (true) {
            const result = await callMethod(
                'tasks.task.list',
                {
                    order: { ID: 'asc' },
                    filter,
                    select: [
                        'ID',
                        'TITLE',
                        'GROUP_ID',
                        'CLOSED_DATE'
                    ],
                    start
                },
                `tasks-task-list-${start}`
            )

            const page = result.tasks ?? []
            tasks.push(...page)

            if (page.length < 50) {
                break
            }

            start += 50
        }

        return tasks
    }
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    $reportFilter = [
        'GROUP_ID' => 15,
        'REAL_STATUS' => 5,
        '>=CLOSED_DATE' => '2026-08-01',
        '<=CLOSED_DATE' => '2026-08-31',
    ];

    function callMethod($serviceBuilder, string $method, array $params): array
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function getTasks($serviceBuilder, array $filter): array
    {
        $tasks = [];
        $start = 0;

        do {
            $result = callMethod(
                $serviceBuilder,
                'tasks.task.list',
                [
                    'order' => ['ID' => 'asc'],
                    'filter' => $filter,
                    'select' => [
                        'ID',
                        'TITLE',
                        'GROUP_ID',
                        'CLOSED_DATE',
                    ],
                    'start' => $start,
                ]
            );

            $page = $result['tasks'] ?? [];
            $tasks = array_merge($tasks, $page);
            $start += 50;
        } while (count($page) === 50);

        return $tasks;
    }
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    report_filter = {
        "GROUP_ID": 15,
        "REAL_STATUS": 5,
        ">=CLOSED_DATE": "2026-08-01",
        "<=CLOSED_DATE": "2026-08-31",
    }

    def get_tasks(filter):
        tasks = []
        start = 0

        while True:
            result = client.tasks.task.list(
                order={"ID": "asc"},
                filter=filter,
                select=[
                    "ID",
                    "TITLE",
                    "GROUP_ID",
                    "CLOSED_DATE",
                ],
                start=start,
            ).response.result

            page = result.get("tasks", [])
            tasks.extend(page)

            if len(page) < 50:
                break

            start += 50

        return tasks
    ```

{% endlist %}

После выполнения шага сохраните массив задач. Для следующего шага нужен `id` каждой задачи. Роли участников задачи не нужны для расчета: отчет строится по записям учета времени, а не по полям `RESPONSIBLE_ID`, `ACCOMPLICES` или `AUDITORS`.

Сокращенный ответ:

```json
{
    "result": {
        "tasks": [
            {
                "id": "8017",
                "title": "Подготовить презентацию",
                "groupId": "15",
                "closedDate": "2026-08-15T18:30:00+03:00"
            }
        ]
    },
    "total": 1
}
```

В результате получили список задач за выбранный период. Из каждой задачи возьмите `id`: эти значения передадим первым параметром на шаге 2.

## 2. Получаем время по каждой задаче и группируем по сотрудникам

Метод [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) возвращает записи о затраченном времени по задаче. Метод принимает параметры в строгом порядке:

1. `taskId` — идентификатор задачи из шага 1
2. `order` — сортировка записей
3. `filter` — фильтр записей
4. `select` — поля записи времени. Для отчета нужны `TASK_ID`, `USER_ID`, `SECONDS`, `MINUTES`, `COMMENT_TEXT`, `CREATED_DATE`
5. `params` — параметры постраничной навигации `NAV_PARAMS`. Размер страницы ограничен 50 записями

Если передать `order`, `filter`, `select` и `params` как именованные поля одного объекта, запрос выполнится с ошибкой. В JS и PHP ниже параметры передаются позиционным массивом. Python SDK принимает именованные аргументы и формирует REST-вызов сам.

Если отчет нужен по всем сотрудникам, не передавайте `USER_ID` в фильтр. Получите все записи по каждой задаче и сгруппируйте их в коде по `USER_ID`. Если нужно проверить одного сотрудника, передайте его идентификатор в `USER_ID`.

{% list tabs %}

- JS

    ```javascript
    async function getElapsedItems(taskId, userId = null) {
        const items = []
        let pageNumber = 1

        while (true) {
            const result = await callMethod(
                'task.elapseditem.getlist',
                [
                    Number(taskId),
                    { ID: 'asc' },
                    userId ? { USER_ID: Number(userId) } : {},
                    [
                        'ID',
                        'TASK_ID',
                        'USER_ID',
                        'SECONDS',
                        'MINUTES',
                        'COMMENT_TEXT',
                        'CREATED_DATE'
                    ],
                    {
                        NAV_PARAMS: {
                            nPageSize: 50,
                            iNumPage: pageNumber
                        }
                    }
                ],
                `task-elapseditem-getlist-${taskId}-${pageNumber}`
            )

            const page = Array.isArray(result) ? result : []
            items.push(...page)

            if (page.length < 50) {
                break
            }

            pageNumber += 1
        }

        return items
    }

    function addToReport(report, task, item) {
        const userId = String(item.USER_ID)

        if (!report.has(userId)) {
            report.set(userId, {
                userId,
                seconds: 0,
                minutes: 0,
                tasks: new Map()
            })
        }

        const row = report.get(userId)
        const seconds = Number(item.SECONDS ?? 0)
        row.seconds += seconds
        row.minutes = Math.round(row.seconds / 60)

        if (!row.tasks.has(task.id)) {
            row.tasks.set(task.id, {
                taskId: task.id,
                title: task.title,
                seconds: 0,
                minutes: 0
            })
        }

        const taskRow = row.tasks.get(task.id)
        taskRow.seconds += seconds
        taskRow.minutes = Math.round(taskRow.seconds / 60)
    }

    async function buildEmployeeTimeReport(userId = null) {
        const tasks = await getTasks(reportFilter)
        const report = new Map()

        for (const task of tasks) {
            const elapsedItems = await getElapsedItems(task.id, userId)

            for (const item of elapsedItems) {
                if (userId && String(item.USER_ID) !== String(userId)) {
                    continue
                }

                addToReport(report, task, item)
            }
        }

        return [...report.values()].map((row) => ({
            userId: row.userId,
            minutes: row.minutes,
            hours: Math.round((row.seconds / 3600) * 100) / 100,
            tasks: [...row.tasks.values()]
        }))
    }
    ```

- PHP

    ```php
    function getElapsedItems($serviceBuilder, int $taskId, ?int $userId = null): array
    {
        $items = [];
        $pageNumber = 1;

        do {
            $result = callMethod(
                $serviceBuilder,
                'task.elapseditem.getlist',
                [
                    $taskId,
                    ['ID' => 'asc'],
                    $userId ? ['USER_ID' => $userId] : [],
                    [
                        'ID',
                        'TASK_ID',
                        'USER_ID',
                        'SECONDS',
                        'MINUTES',
                        'COMMENT_TEXT',
                        'CREATED_DATE',
                    ],
                    [
                        'NAV_PARAMS' => [
                            'nPageSize' => 50,
                            'iNumPage' => $pageNumber,
                        ],
                    ],
                ]
            );

            $page = is_array($result) ? $result : [];
            $items = array_merge($items, $page);
            $pageNumber++;
        } while (count($page) === 50);

        return $items;
    }

    function addToReport(array &$report, array $task, array $item): void
    {
        $userId = (string)$item['USER_ID'];
        $taskId = (string)$task['id'];
        $seconds = (int)($item['SECONDS'] ?? 0);

        if (!isset($report[$userId])) {
            $report[$userId] = [
                'userId' => $userId,
                'seconds' => 0,
                'minutes' => 0,
                'tasks' => [],
            ];
        }

        $report[$userId]['seconds'] += $seconds;
        $report[$userId]['minutes'] = (int)round($report[$userId]['seconds'] / 60);

        if (!isset($report[$userId]['tasks'][$taskId])) {
            $report[$userId]['tasks'][$taskId] = [
                'taskId' => $taskId,
                'title' => $task['title'],
                'seconds' => 0,
                'minutes' => 0,
            ];
        }

        $report[$userId]['tasks'][$taskId]['seconds'] += $seconds;
        $report[$userId]['tasks'][$taskId]['minutes'] =
            (int)round($report[$userId]['tasks'][$taskId]['seconds'] / 60);
    }

    function buildEmployeeTimeReport($serviceBuilder, array $filter, ?int $userId = null): array
    {
        $tasks = getTasks($serviceBuilder, $filter);
        $report = [];

        foreach ($tasks as $task) {
            $elapsedItems = getElapsedItems($serviceBuilder, (int)$task['id'], $userId);

            foreach ($elapsedItems as $item) {
                if ($userId && (string)$item['USER_ID'] !== (string)$userId) {
                    continue;
                }

                addToReport($report, $task, $item);
            }
        }

        return array_map(
            static function (array $row): array {
                $row['hours'] = round($row['seconds'] / 3600, 2);
                $row['tasks'] = array_values($row['tasks']);

                return $row;
            },
            array_values($report)
        );
    }

    ```

- Python

    ```python
    def get_elapsed_items(task_id, user_id=None):
        items = []
        page_number = 1

        while True:
            result = client.task.elapseditem.getlist(
                taskid=int(task_id),
                order={"ID": "asc"},
                filter={"USER_ID": int(user_id)} if user_id else {},
                select=[
                    "ID",
                    "TASK_ID",
                    "USER_ID",
                    "SECONDS",
                    "MINUTES",
                    "COMMENT_TEXT",
                    "CREATED_DATE",
                ],
                params={
                    "NAV_PARAMS": {
                        "nPageSize": 50,
                        "iNumPage": page_number,
                    }
                },
            ).response.result

            page = result if isinstance(result, list) else []
            items.extend(page)

            if len(page) < 50:
                break

            page_number += 1

        return items

    def add_to_report(report, task, item):
        user_id = str(item["USER_ID"])
        task_id = str(task["id"])
        seconds = int(item.get("SECONDS", 0))

        if user_id not in report:
            report[user_id] = {
                "userId": user_id,
                "seconds": 0,
                "minutes": 0,
                "tasks": {},
            }

        row = report[user_id]
        row["seconds"] += seconds
        row["minutes"] = round(row["seconds"] / 60)

        if task_id not in row["tasks"]:
            row["tasks"][task_id] = {
                "taskId": task_id,
                "title": task["title"],
                "seconds": 0,
                "minutes": 0,
            }

        task_row = row["tasks"][task_id]
        task_row["seconds"] += seconds
        task_row["minutes"] = round(task_row["seconds"] / 60)

    def build_employee_time_report(user_id=None):
        tasks = get_tasks(report_filter)
        report = {}

        for task in tasks:
            elapsed_items = get_elapsed_items(task["id"], user_id)

            for item in elapsed_items:
                if user_id and str(item["USER_ID"]) != str(user_id):
                    continue

                add_to_report(report, task, item)

        rows = []
        for row in report.values():
            rows.append({
                "userId": row["userId"],
                "minutes": row["minutes"],
                "hours": round(row["seconds"] / 3600, 2),
                "tasks": list(row["tasks"].values()),
            })

        return rows
    ```

{% endlist %}

После выполнения шага сохраните `USER_ID` из каждой записи времени. Эти идентификаторы понадобятся для получения имен сотрудников.

Сокращенный ответ [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md):

```json
{
    "result": [
        {
            "ID": "104",
            "TASK_ID": "8017",
            "USER_ID": "37",
            "SECONDS": "14400",
            "MINUTES": "240",
            "COMMENT_TEXT": "Верстка макета",
            "CREATED_DATE": "2026-08-15T14:10:00+03:00"
        },
        {
            "ID": "105",
            "TASK_ID": "8017",
            "USER_ID": "41",
            "SECONDS": "3600",
            "MINUTES": "60",
            "COMMENT_TEXT": "Проверка",
            "CREATED_DATE": "2026-08-15T17:40:00+03:00"
        }
    ],
    "total": 2
}
```

В результате получили записи времени по задаче. Поле `USER_ID` показывает сотрудника, который добавил запись, а `SECONDS` и `MINUTES` — длительность этой записи. На шаге 3 по уникальным `USER_ID` получим имена сотрудников.

## 3. Получаем имена сотрудников

Метод [user.get](../../api-reference/user/user-get.md) получает данные пользователей по фильтру. В примерах функция получения имен сотрудников берет список уникальных `USER_ID` из отчета и запрашивает для них поля:

- `ID` — идентификатор сотрудника, который совпадает с `USER_ID` в записи времени
- `NAME` — имя сотрудника
- `LAST_NAME` — фамилия сотрудника

{% list tabs %}

- JS

    ```javascript
    async function getUserNames(userIds) {
        const users = new Map()
        const uniqueIds = [...new Set(userIds.map(String))]

        for (let i = 0; i < uniqueIds.length; i += 50) {
            const batch = uniqueIds.slice(i, i + 50)
            const result = await callMethod(
                'user.get',
                {
                    FILTER: { '@ID': batch },
                    SELECT: ['ID', 'NAME', 'LAST_NAME']
                },
                `user-get-${i}`
            )

            for (const user of Array.isArray(result) ? result : []) {
                users.set(String(user.ID), `${user.NAME ?? ''} ${user.LAST_NAME ?? ''}`.trim())
            }
        }

        return users
    }

    async function addUserNames(report) {
        const users = await getUserNames(report.map((row) => row.userId))

        return report.map((row) => ({
            ...row,
            userName: users.get(row.userId) ?? row.userId
        }))
    }

    const report = await addUserNames(await buildEmployeeTimeReport())
    console.table(report.map(({ userId, userName, hours }) => ({ userId, userName, hours })))

    const petrovReport = await addUserNames(await buildEmployeeTimeReport(37))
    console.table(petrovReport.map(({ userId, userName, hours }) => ({ userId, userName, hours })))
    ```

- PHP

    ```php
    function getUserNames($serviceBuilder, array $userIds): array
    {
        $users = [];
        $uniqueIds = array_values(array_unique(array_map('strval', $userIds)));

        foreach (array_chunk($uniqueIds, 50) as $batch) {
            $result = callMethod(
                $serviceBuilder,
                'user.get',
                [
                    'FILTER' => ['@ID' => $batch],
                    'SELECT' => ['ID', 'NAME', 'LAST_NAME'],
                ]
            );

            foreach ($result as $user) {
                $users[(string)$user['ID']] = trim(($user['NAME'] ?? '') . ' ' . ($user['LAST_NAME'] ?? ''));
            }
        }

        return $users;
    }

    function addUserNames($serviceBuilder, array $report): array
    {
        $users = getUserNames($serviceBuilder, array_column($report, 'userId'));

        return array_map(
            static function (array $row) use ($users): array {
                $row['userName'] = $users[$row['userId']] ?? $row['userId'];

                return $row;
            },
            $report
        );
    }

    $report = addUserNames($serviceBuilder, buildEmployeeTimeReport($serviceBuilder, $reportFilter));
    print_r($report);

    $petrovReport = addUserNames($serviceBuilder, buildEmployeeTimeReport($serviceBuilder, $reportFilter, 37));
    print_r($petrovReport);
    ```

- Python

    ```python
    def get_user_names(user_ids):
        users = {}
        unique_ids = list(dict.fromkeys(str(user_id) for user_id in user_ids))

        for offset in range(0, len(unique_ids), 50):
            batch = unique_ids[offset:offset + 50]
            result = client.user.get(
                filter={"@ID": batch},
                select=["ID", "NAME", "LAST_NAME"],
            ).response.result

            for user in result:
                users[str(user["ID"])] = f"{user.get('NAME', '')} {user.get('LAST_NAME', '')}".strip()

        return users

    def add_user_names(report):
        users = get_user_names(row["userId"] for row in report)

        return [
            {
                **row,
                "userName": users.get(row["userId"], row["userId"]),
            }
            for row in report
        ]

    report = add_user_names(build_employee_time_report())
    print(report)

    petrov_report = add_user_names(build_employee_time_report(37))
    print(petrov_report)
    ```

{% endlist %}

Сокращенный ответ [user.get](../../api-reference/user/user-get.md):

```json
{
    "result": [
        {
            "ID": "37",
            "NAME": "Петр",
            "LAST_NAME": "Петров"
        },
        {
            "ID": "41",
            "NAME": "Анна",
            "LAST_NAME": "Смирнова"
        }
    ],
    "total": 2
}
```

В результате получили данные сотрудников. Поля `NAME` и `LAST_NAME` используем для подписи строк отчета, а если пользователь не найден, оставляем в таблице его `USER_ID`.

Итоговая таблица отчета:

#|
|| **Сотрудник** | **Минуты** | **Часы** ||
|| Петр Петров (`37`) | `480` | `8` ||
|| Анна Смирнова (`41`) | `2580` | `43` ||
|#

Если в отчете нужен только Петров с `USER_ID = 37`, передайте `37` в функцию `buildEmployeeTimeReport` в JS и PHP или в `build_employee_time_report` в Python. Тогда итоговая сумма будет считаться только по записям, где `USER_ID` равен `37`.

## Проверим результат

Сложите поле `SECONDS` у всех записей [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) с одинаковым `USER_ID`. Полученная сумма должна совпасть с колонкой `Часы` в итоговой таблице после перевода секунд в часы. Имя сотрудника должно совпасть с пользователем, которого [user.get](../../api-reference/user/user-get.md) вернул по этому `USER_ID`.

Для проверки одного сотрудника вызовите [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) по каждой задаче с фильтром:

```json
[
    8017,
    {
        "ID": "asc"
    },
    {
        "USER_ID": 37
    },
    [
        "ID",
        "TASK_ID",
        "USER_ID",
        "SECONDS",
        "MINUTES"
    ],
    {
        "NAV_PARAMS": {
            "nPageSize": 50,
            "iNumPage": 1
        }
    }
]
```

Сценарий выполнен успешно, если в итоговой строке сотрудника учитываются только записи времени этого сотрудника. В примере задачи могли суммарно содержать 51 час по всем участникам, но строка сотрудника `37` покажет только 8 часов, если его записи времени дают `28800` секунд.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `0` | В `order` метода [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) указано поле, по которому нельзя сортировать. Используйте поля из описания параметра `order` ||
|| `ERROR_CORE` | Метод [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) не смог выполнить действие. Проверьте, есть ли у пользователя вебхука доступ к задаче ||
|| `0x100002` | Доступ запрещен. Проверьте права пользователя вебхука на задачу ||
|| `0x000100` | Переданы неверные параметры метода [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md). Проверьте порядок позиционных параметров: `taskId`, `order`, `filter`, `select`, `params` ||
|| `insufficient_scope` | Вебхук не имеет нужного scope. Для [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) и [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) нужен scope `task`, для [user.get](../../api-reference/user/user-get.md) — `user_brief`, `user_basic` или `user` ||
|#

Если итоговая таблица пустая, проверьте:

- фильтр [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) действительно возвращает задачи за выбранный период
- в задачах включен учет времени и есть записи времени
- пользователь вебхука видит эти задачи
- в [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) первым параметром передан правильный идентификатор задачи
- фильтр `USER_ID` не отсекает нужные записи
- у вебхука есть scope `task` для методов задач и scope `user_brief`, если в отчете должны быть имена сотрудников

Повторяйте сценарий с шага, на котором возникла ошибка. Если ошибку вернул [tasks.task.list](../../api-reference/tasks/tasks-task-list.md), исправьте фильтр и повторите шаг 1. Если ошибку вернул [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md), повторите шаг 2 для задачи с корректным идентификатором и порядком параметров. Если ошибку вернул [user.get](../../api-reference/user/user-get.md), добавьте нужный scope и повторите шаг 3.

## Что важно учитывать

- [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) возвращает задачи страницами по 50 элементов. Чтобы получить весь период, перебирайте `start`: `0`, `50`, `100`
- [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) ограничивает размер страницы 50 записями через `PARAMS[NAV_PARAMS][nPageSize]`
- [user.get](../../api-reference/user/user-get.md) возвращает пользователей страницами по 50 элементов. В примере идентификаторы сотрудников запрашиваются пакетами по 50
- поле `timeElapsed` или сортировка по `TIME_SPENT_IN_LOGS` относятся к общему времени задачи. Для персонального отчета используйте записи [task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md) и группировку по `USER_ID`
- фильтр `ACCOMPLICE` в [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) выбирает задачи, где пользователь является соисполнителем. Для ответственного используйте `RESPONSIBLE_ID`
- отчет учитывает записи времени независимо от роли пользователя в задаче. Если нужно ограничить отчет ответственными или соисполнителями, добавьте нужный фильтр в [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)

## Пример кода

Код проходит все три шага: получает задачи за период, собирает записи времени по каждой задаче, группирует время по `USER_ID` и добавляет имена сотрудников. Замените путь вебхука, фильтр задач и `employeeId`, если нужен отчет только по одному сотруднику.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const reportFilter = {
        GROUP_ID: 15,
        REAL_STATUS: 5,
        '>=CLOSED_DATE': '2026-08-01',
        '<=CLOSED_DATE': '2026-08-31'
    }

    const employeeId = null
    // const employeeId = 37

    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function getTasks(filter) {
        const tasks = []
        let start = 0

        while (true) {
            const result = await callMethod(
                'tasks.task.list',
                {
                    order: { ID: 'asc' },
                    filter,
                    select: ['ID', 'TITLE', 'GROUP_ID', 'CLOSED_DATE'],
                    start
                },
                `tasks-task-list-${start}`
            )

            const page = result.tasks ?? []
            tasks.push(...page)

            if (page.length < 50) {
                break
            }

            start += 50
        }

        return tasks
    }

    async function getElapsedItems(taskId, userId = null) {
        const items = []
        let pageNumber = 1

        while (true) {
            const result = await callMethod(
                'task.elapseditem.getlist',
                [
                    Number(taskId),
                    { ID: 'asc' },
                    userId ? { USER_ID: Number(userId) } : {},
                    ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
                    {
                        NAV_PARAMS: {
                            nPageSize: 50,
                            iNumPage: pageNumber
                        }
                    }
                ],
                `task-elapseditem-getlist-${taskId}-${pageNumber}`
            )

            const page = Array.isArray(result) ? result : []
            items.push(...page)

            if (page.length < 50) {
                break
            }

            pageNumber += 1
        }

        return items
    }

    function addToReport(report, task, item) {
        const userId = String(item.USER_ID)
        const taskId = String(task.id)
        const seconds = Number(item.SECONDS ?? 0)

        if (!report.has(userId)) {
            report.set(userId, {
                userId,
                seconds: 0,
                minutes: 0,
                tasks: new Map()
            })
        }

        const row = report.get(userId)
        row.seconds += seconds
        row.minutes = Math.round(row.seconds / 60)

        if (!row.tasks.has(taskId)) {
            row.tasks.set(taskId, {
                taskId,
                title: task.title,
                seconds: 0,
                minutes: 0
            })
        }

        const taskRow = row.tasks.get(taskId)
        taskRow.seconds += seconds
        taskRow.minutes = Math.round(taskRow.seconds / 60)
    }

    async function getUserNames(userIds) {
        const users = new Map()
        const uniqueIds = [...new Set(userIds.map(String))]

        for (let i = 0; i < uniqueIds.length; i += 50) {
            const batch = uniqueIds.slice(i, i + 50)
            const result = await callMethod(
                'user.get',
                {
                    FILTER: { '@ID': batch },
                    SELECT: ['ID', 'NAME', 'LAST_NAME']
                },
                `user-get-${i}`
            )

            for (const user of Array.isArray(result) ? result : []) {
                users.set(String(user.ID), `${user.NAME ?? ''} ${user.LAST_NAME ?? ''}`.trim())
            }
        }

        return users
    }

    async function buildReport(userId = null) {
        const tasks = await getTasks(reportFilter)
        const report = new Map()

        for (const task of tasks) {
            const elapsedItems = await getElapsedItems(task.id, userId)

            for (const item of elapsedItems) {
                addToReport(report, task, item)
            }
        }

        const rows = [...report.values()].map((row) => ({
            userId: row.userId,
            minutes: row.minutes,
            hours: Math.round((row.seconds / 3600) * 100) / 100,
            tasks: [...row.tasks.values()]
        }))

        const users = await getUserNames(rows.map((row) => row.userId))

        return rows.map((row) => ({
            ...row,
            userName: users.get(row.userId) ?? row.userId
        }))
    }

    console.table(await buildReport(employeeId))
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    $reportFilter = [
        'GROUP_ID' => 15,
        'REAL_STATUS' => 5,
        '>=CLOSED_DATE' => '2026-08-01',
        '<=CLOSED_DATE' => '2026-08-31',
    ];

    $employeeId = null;
    // $employeeId = 37;

    function callMethod($serviceBuilder, string $method, array $params): array
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function getTasks($serviceBuilder, array $filter): array
    {
        $tasks = [];
        $start = 0;

        do {
            $result = callMethod(
                $serviceBuilder,
                'tasks.task.list',
                [
                    'order' => ['ID' => 'asc'],
                    'filter' => $filter,
                    'select' => ['ID', 'TITLE', 'GROUP_ID', 'CLOSED_DATE'],
                    'start' => $start,
                ]
            );

            $page = $result['tasks'] ?? [];
            $tasks = array_merge($tasks, $page);
            $start += 50;
        } while (count($page) === 50);

        return $tasks;
    }

    function getElapsedItems($serviceBuilder, int $taskId, ?int $userId = null): array
    {
        $items = [];
        $pageNumber = 1;

        do {
            $result = callMethod(
                $serviceBuilder,
                'task.elapseditem.getlist',
                [
                    $taskId,
                    ['ID' => 'asc'],
                    $userId ? ['USER_ID' => $userId] : [],
                    ['ID', 'TASK_ID', 'USER_ID', 'SECONDS', 'MINUTES', 'COMMENT_TEXT', 'CREATED_DATE'],
                    [
                        'NAV_PARAMS' => [
                            'nPageSize' => 50,
                            'iNumPage' => $pageNumber,
                        ],
                    ],
                ]
            );

            $page = is_array($result) ? $result : [];
            $items = array_merge($items, $page);
            $pageNumber++;
        } while (count($page) === 50);

        return $items;
    }

    function addToReport(array &$report, array $task, array $item): void
    {
        $userId = (string)$item['USER_ID'];
        $taskId = (string)$task['id'];
        $seconds = (int)($item['SECONDS'] ?? 0);

        if (!isset($report[$userId])) {
            $report[$userId] = [
                'userId' => $userId,
                'seconds' => 0,
                'minutes' => 0,
                'tasks' => [],
            ];
        }

        $report[$userId]['seconds'] += $seconds;
        $report[$userId]['minutes'] = (int)round($report[$userId]['seconds'] / 60);

        if (!isset($report[$userId]['tasks'][$taskId])) {
            $report[$userId]['tasks'][$taskId] = [
                'taskId' => $taskId,
                'title' => $task['title'],
                'seconds' => 0,
                'minutes' => 0,
            ];
        }

        $report[$userId]['tasks'][$taskId]['seconds'] += $seconds;
        $report[$userId]['tasks'][$taskId]['minutes'] =
            (int)round($report[$userId]['tasks'][$taskId]['seconds'] / 60);
    }

    function getUserNames($serviceBuilder, array $userIds): array
    {
        $users = [];
        $uniqueIds = array_values(array_unique(array_map('strval', $userIds)));

        foreach (array_chunk($uniqueIds, 50) as $batch) {
            $result = callMethod(
                $serviceBuilder,
                'user.get',
                [
                    'FILTER' => ['@ID' => $batch],
                    'SELECT' => ['ID', 'NAME', 'LAST_NAME'],
                ]
            );

            foreach ($result as $user) {
                $users[(string)$user['ID']] = trim(($user['NAME'] ?? '') . ' ' . ($user['LAST_NAME'] ?? ''));
            }
        }

        return $users;
    }

    function buildReport($serviceBuilder, array $filter, ?int $userId = null): array
    {
        $report = [];

        foreach (getTasks($serviceBuilder, $filter) as $task) {
            foreach (getElapsedItems($serviceBuilder, (int)$task['id'], $userId) as $item) {
                addToReport($report, $task, $item);
            }
        }

        $userNames = getUserNames($serviceBuilder, array_keys($report));

        return array_map(
            static function (array $row) use ($userNames): array {
                $row['hours'] = round($row['seconds'] / 3600, 2);
                $row['tasks'] = array_values($row['tasks']);
                $row['userName'] = $userNames[$row['userId']] ?? $row['userId'];

                return $row;
            },
            array_values($report)
        );
    }

    print_r(buildReport($serviceBuilder, $reportFilter, $employeeId));
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    report_filter = {
        "GROUP_ID": 15,
        "REAL_STATUS": 5,
        ">=CLOSED_DATE": "2026-08-01",
        "<=CLOSED_DATE": "2026-08-31",
    }

    employee_id = None
    # employee_id = 37

    def get_tasks(filter):
        tasks = []
        start = 0

        while True:
            result = client.tasks.task.list(
                order={"ID": "asc"},
                filter=filter,
                select=["ID", "TITLE", "GROUP_ID", "CLOSED_DATE"],
                start=start,
            ).response.result

            page = result.get("tasks", [])
            tasks.extend(page)

            if len(page) < 50:
                break

            start += 50

        return tasks

    def get_elapsed_items(task_id, user_id=None):
        items = []
        page_number = 1

        while True:
            result = client.task.elapseditem.getlist(
                taskid=int(task_id),
                order={"ID": "asc"},
                filter={"USER_ID": int(user_id)} if user_id else {},
                select=["ID", "TASK_ID", "USER_ID", "SECONDS", "MINUTES", "COMMENT_TEXT", "CREATED_DATE"],
                params={
                    "NAV_PARAMS": {
                        "nPageSize": 50,
                        "iNumPage": page_number,
                    }
                },
            ).response.result

            page = result if isinstance(result, list) else []
            items.extend(page)

            if len(page) < 50:
                break

            page_number += 1

        return items

    def add_to_report(report, task, item):
        user_id = str(item["USER_ID"])
        task_id = str(task["id"])
        seconds = int(item.get("SECONDS", 0))

        report.setdefault(
            user_id,
            {
                "userId": user_id,
                "seconds": 0,
                "minutes": 0,
                "tasks": {},
            },
        )

        report[user_id]["seconds"] += seconds
        report[user_id]["minutes"] = round(report[user_id]["seconds"] / 60)

        report[user_id]["tasks"].setdefault(
            task_id,
            {
                "taskId": task_id,
                "title": task["title"],
                "seconds": 0,
                "minutes": 0,
            },
        )

        report[user_id]["tasks"][task_id]["seconds"] += seconds
        report[user_id]["tasks"][task_id]["minutes"] = round(
            report[user_id]["tasks"][task_id]["seconds"] / 60
        )

    def get_user_names(user_ids):
        users = {}
        unique_ids = list(dict.fromkeys(str(user_id) for user_id in user_ids))

        for offset in range(0, len(unique_ids), 50):
            batch = unique_ids[offset:offset + 50]
            result = client.user.get(
                filter={"@ID": batch},
                select=["ID", "NAME", "LAST_NAME"],
            ).response.result

            for user in result:
                users[str(user["ID"])] = f"{user.get('NAME', '')} {user.get('LAST_NAME', '')}".strip()

        return users

    def build_report(user_id=None):
        report = {}

        for task in get_tasks(report_filter):
            for item in get_elapsed_items(task["id"], user_id):
                add_to_report(report, task, item)

        users = get_user_names(report.keys())
        rows = []

        for row in report.values():
            rows.append(
                {
                    "userId": row["userId"],
                    "userName": users.get(row["userId"], row["userId"]),
                    "minutes": row["minutes"],
                    "hours": round(row["seconds"] / 3600, 2),
                    "tasks": list(row["tasks"].values()),
                }
            )

        return rows

    print(build_report(employee_id))
    ```

{% endlist %}

## Продолжите изучение

- [Получить список задач tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
- [Получить список записей о затраченном времени task.elapseditem.getlist](../../api-reference/tasks/elapsed-item/task-elapsed-item-get-list.md)
- [Получить список пользователей по фильтру user.get](../../api-reference/user/user-get.md)
- [Добавить запись о затраченном времени task.elapseditem.add](../../api-reference/tasks/elapsed-item/task-elapsed-item-add.md)
- [Задачи: обзор методов](../../api-reference/tasks/index.md)
