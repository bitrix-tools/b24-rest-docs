# Как передать незавершенные задачи уволенного сотрудника

> Scope: [`task`, `user_basic`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права на просмотр и делегирование задач
>
> - [user.get](../../api-reference/user/user-get.md) — любой пользователь
> - [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) — пользователь с доступом к задачам из фильтра
> - [tasks.task.getaccess](../../api-reference/tasks/tasks-task-get-access.md) — любой пользователь
> - [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md) — пользователь с правом делегирования задачи

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

После увольнения сотрудника его незавершенные задачи можно передать другому ответственному. Для этого нужно найти идентификатор уволенного сотрудника, получить задачи, где он указан ответственным, и делегировать каждую задачу новому сотруднику.

Делегирование зависит от прав пользователя, который создал вебхук. Поэтому перед вызовом метода изменения ответственного сначала получаем задачи, а затем проверяем право `DELEGATE` для каждой из них.

Сценарий состоит из четырех шагов.

1. Найти уволенного сотрудника и нового ответственного методом [user.get](../../api-reference/user/user-get.md)
2. Получить незавершенные задачи уволенного сотрудника методом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md)
3. Проверить право делегирования методом [tasks.task.getaccess](../../api-reference/tasks/tasks-task-get-access.md)
4. Передать каждую доступную задачу методом [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md)

В результате ответственный изменится у задач, для которых пользователь, создавший вебхук, имеет право `DELEGATE`. Завершенные задачи не передаются: метод делегирования вернет ошибку `Task already completed`.

## Что нужно до начала

Проверьте условия доступа и подготовьте исходные данные:

- входящий вебхук создан от имени пользователя, который видит задачи уволенного сотрудника и имеет право делегировать эти задачи

- в правах вебхука отмечены scope `task` и `user_basic`

- вы знаете имя, фамилию, e-mail или другой признак уволенного сотрудника

- вы знаете имя, фамилию, e-mail или идентификатор нового ответственного

Вебхук выполняет запросы с правами создавшего его пользователя. Администратор видит все задачи, руководитель — задачи своих сотрудников, остальные пользователи видят только доступные им задачи.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

Дальше в примерах уволенного сотрудника ищем по фамилии `Иванов`, нового ответственного — по e-mail `new.responsible@example.com`. В вашем Битрикс24 замените эти значения на свои.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1. Находим сотрудников

Метод [user.get](../../api-reference/user/user-get.md) получает пользователей по фильтру. Чтобы найти уволенного сотрудника, передайте в фильтр `ACTIVE: false` и дополнительный признак, например фамилию или e-mail. Чтобы найти нового ответственного, передайте `ACTIVE: true`.

В ответе сохраните:

- `ID` уволенного сотрудника — передадим в фильтр задач `RESPONSIBLE_ID`
- `ID` нового ответственного — передадим в параметр `userId` метода делегирования

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

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

    async function findOneUser(filter, requestId) {
        const result = await callMethod(
            'user.get',
            {
                FILTER: filter,
                SELECT: ['ID', 'ACTIVE', 'NAME', 'LAST_NAME', 'EMAIL']
            },
            requestId
        )

        if (!Array.isArray(result) || result.length !== 1) {
            throw new Error(`Ожидался один пользователь, получено: ${Array.isArray(result) ? result.length : 0}`)
        }

        return result[0]
    }

    const firedUser = await findOneUser(
        {
            ACTIVE: false,
            LAST_NAME: 'Иванов'
        },
        'user-get-fired'
    )

    const newResponsible = await findOneUser(
        {
            ACTIVE: true,
            EMAIL: 'new.responsible@example.com'
        },
        'user-get-new-responsible'
    )
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

    function callMethod($serviceBuilder, string $method, array $params): array
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function findOneUser($serviceBuilder, array $filter): array
    {
        $result = callMethod(
            $serviceBuilder,
            'user.get',
            [
                'FILTER' => $filter,
                'SELECT' => ['ID', 'ACTIVE', 'NAME', 'LAST_NAME', 'EMAIL'],
            ]
        );

        if (count($result) !== 1) {
            throw new RuntimeException('Ожидался один пользователь, получено: ' . count($result));
        }

        return $result[0];
    }

    $firedUser = findOneUser(
        $serviceBuilder,
        [
            'ACTIVE' => false,
            'LAST_NAME' => 'Иванов',
        ]
    );

    $newResponsible = findOneUser(
        $serviceBuilder,
        [
            'ACTIVE' => true,
            'EMAIL' => 'new.responsible@example.com',
        ]
    );
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

    def find_one_user(filter):
        result = client.user.get(
            filter=filter,
            select=["ID", "ACTIVE", "NAME", "LAST_NAME", "EMAIL"],
        ).response.result

        if len(result) != 1:
            raise RuntimeError(f"Ожидался один пользователь, получено: {len(result)}")

        return result[0]

    fired_user = find_one_user(
        {
            "ACTIVE": False,
            "LAST_NAME": "Иванов",
        }
    )

    new_responsible = find_one_user(
        {
            "ACTIVE": True,
            "EMAIL": "new.responsible@example.com",
        }
    )
    ```

{% endlist %}

Сокращенный ответ для уволенного сотрудника:

```json
{
    "result": [
        {
            "ID": "37",
            "ACTIVE": false,
            "NAME": "Иван",
            "LAST_NAME": "Иванов",
            "EMAIL": "i.ivanov@example.com"
        }
    ],
    "total": 1
}
```

Сокращенный ответ для нового ответственного:

```json
{
    "result": [
        {
            "ID": "547",
            "ACTIVE": true,
            "NAME": "Мария",
            "LAST_NAME": "Петрова",
            "EMAIL": "new.responsible@example.com"
        }
    ],
    "total": 1
}
```

В результате получили `ID` уволенного сотрудника `37` и `ID` нового ответственного `547`. Эти значения нужны на следующих шагах.

## 2. Получаем задачи уволенного сотрудника

Метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) получает задачи с постраничной навигацией. В фильтре передайте:

- `RESPONSIBLE_ID` — идентификатор уволенного сотрудника
- `!REAL_STATUS: 5` — исключить завершенные задачи

Завершенные задачи нужно исключить до делегирования. Метод [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md) не выполняет действие над завершенной задачей.

{% list tabs %}

- JS

    ```javascript
    async function getEmployeeTasks(employeeId) {
        const tasks = []
        let start = 0

        while (true) {
            const result = await callMethod(
                'tasks.task.list',
                {
                    order: { ID: 'asc' },
                    filter: {
                        RESPONSIBLE_ID: Number(employeeId),
                        '!REAL_STATUS': 5
                    },
                    select: ['ID', 'TITLE', 'RESPONSIBLE_ID', 'STATUS'],
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

    const tasks = await getEmployeeTasks(firedUser.ID)
    ```

- PHP

    ```php
    function getEmployeeTasks($serviceBuilder, int $employeeId): array
    {
        $tasks = [];
        $start = 0;

        do {
            $result = callMethod(
                $serviceBuilder,
                'tasks.task.list',
                [
                    'order' => ['ID' => 'asc'],
                    'filter' => [
                        'RESPONSIBLE_ID' => $employeeId,
                        '!REAL_STATUS' => 5,
                    ],
                    'select' => ['ID', 'TITLE', 'RESPONSIBLE_ID', 'STATUS'],
                    'start' => $start,
                ]
            );

            $page = $result['tasks'] ?? [];
            $tasks = array_merge($tasks, $page);
            $start += 50;
        } while (count($page) === 50);

        return $tasks;
    }

    $tasks = getEmployeeTasks($serviceBuilder, (int)$firedUser['ID']);
    ```

- Python

    ```python
    def get_employee_tasks(employee_id):
        tasks = []
        start = 0

        while True:
            result = client.tasks.task.list(
                order={"ID": "asc"},
                filter={
                    "RESPONSIBLE_ID": int(employee_id),
                    "!REAL_STATUS": 5,
                },
                select=["ID", "TITLE", "RESPONSIBLE_ID", "STATUS"],
                start=start,
            ).response.result

            page = result.get("tasks", [])
            tasks.extend(page)

            if len(page) < 50:
                break

            start += 50

        return tasks

    tasks = get_employee_tasks(fired_user["ID"])
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "tasks": [
            {
                "id": "8017",
                "title": "Подготовить презентацию",
                "responsibleId": "37",
                "status": "2"
            }
        ]
    },
    "total": 1
}
```

В результате получили массив задач. Для следующего шага нужен `id` каждой задачи. Если метод вернул 50 задач, запросите следующую страницу с `start: 50`.

## 3. Проверяем право делегирования

Метод [tasks.task.getaccess](../../api-reference/tasks/tasks-task-get-access.md) проверяет, какие действия доступны пользователю, который создал вебхук. Перед массовым изменением задач проверьте действие `DELEGATE` для каждой задачи из шага 2.

Если для задачи `DELEGATE` равен `false`, не передавайте ее в [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md). Такая задача останется у прежнего ответственного, пока пользователь с нужными правами не выполнит делегирование вручную или через другой вебхук.

{% list tabs %}

- JS

    ```javascript
    async function filterTasksAllowedToDelegate(tasks) {
        const allowed = []

        for (const task of tasks) {
            const result = await callMethod(
                'tasks.task.getaccess',
                {
                    taskId: Number(task.id)
                },
                `tasks-task-getaccess-${task.id}`
            )

            const currentUserActions = Object.values(result.allowedActions ?? {})[0] ?? {}

            if (currentUserActions.DELEGATE === true) {
                allowed.push(task)
            }
        }

        return allowed
    }

    const allowedTasks = await filterTasksAllowedToDelegate(tasks)
    ```

- PHP

    ```php
    function filterTasksAllowedToDelegate($serviceBuilder, array $tasks): array
    {
        $allowed = [];

        foreach ($tasks as $task) {
            $result = callMethod(
                $serviceBuilder,
                'tasks.task.getaccess',
                [
                    'taskId' => (int)$task['id'],
                ]
            );

            $allowedActions = $result['allowedActions'] ?? [];
            $currentUserActions = reset($allowedActions);

            if (is_array($currentUserActions) && ($currentUserActions['DELEGATE'] ?? false) === true) {
                $allowed[] = $task;
            }
        }

        return $allowed;
    }

    $allowedTasks = filterTasksAllowedToDelegate($serviceBuilder, $tasks);
    ```

- Python

    ```python
    def filter_tasks_allowed_to_delegate(tasks):
        allowed = []

        for task in tasks:
            result = client.tasks.task.getaccess(
                task_id=int(task["id"]),
            ).response.result

            allowed_actions = result.get("allowedActions", {})
            current_user_actions = next(iter(allowed_actions.values()), {})

            if current_user_actions.get("DELEGATE") is True:
                allowed.append(task)

        return allowed

    allowed_tasks = filter_tasks_allowed_to_delegate(tasks)
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "allowedActions": {
            "1269": {
                "DELEGATE": true
            }
        }
    }
}
```

Метод возвращает объект `allowedActions` со списком доступных действий по задаче. В примере код проверяет действие `DELEGATE`: если значение равно `true`, задача остается в массиве `allowedTasks`.

Массив `allowedTasks` передаем на шаг 4. Если после проверки он пустой, завершите сценарий без вызова [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md).

## 4. Делегируем задачи новому ответственному

Метод [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md) меняет ответственного в одной задаче. Чтобы передать все доступные задачи, вызовите метод для каждого `id` из массива `allowedTasks`.

В параметрах передайте:

- `taskId` — идентификатор задачи
- `userId` — идентификатор нового ответственного

{% list tabs %}

- JS

    ```javascript
    async function delegateTasks(tasks, userId) {
        const delegated = []

        for (const task of tasks) {
            const result = await callMethod(
                'tasks.task.delegate',
                {
                    taskId: Number(task.id),
                    userId: Number(userId)
                },
                `tasks-task-delegate-${task.id}`
            )

            delegated.push(result.task)
        }

        return delegated
    }

    const delegatedTasks = await delegateTasks(allowedTasks, newResponsible.ID)
    console.table(delegatedTasks.map((task) => ({
        id: task.id,
        title: task.title,
        responsibleId: task.responsibleId
    })))
    ```

- PHP

    ```php
    function delegateTasks($serviceBuilder, array $tasks, int $userId): array
    {
        $delegated = [];

        foreach ($tasks as $task) {
            $result = callMethod(
                $serviceBuilder,
                'tasks.task.delegate',
                [
                    'taskId' => (int)$task['id'],
                    'userId' => $userId,
                ]
            );

            $delegated[] = $result['task'];
        }

        return $delegated;
    }

    $delegatedTasks = delegateTasks($serviceBuilder, $allowedTasks, (int)$newResponsible['ID']);
    print_r($delegatedTasks);
    ```

- Python

    ```python
    def delegate_tasks(tasks, user_id):
        delegated = []

        for task in tasks:
            result = client.tasks.task.delegate(
                task_id=int(task["id"]),
                user_id=int(user_id),
            ).response.result

            delegated.append(result["task"])

        return delegated

    delegated_tasks = delegate_tasks(allowed_tasks, new_responsible["ID"])
    print(delegated_tasks)
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "task": {
            "id": "8017",
            "title": "Подготовить презентацию",
            "responsibleId": "547",
            "status": "2"
        }
    }
}
```

Метод возвращает объект `task` с обновленными данными задачи. Если в ответе `responsibleId` равен идентификатору нового ответственного, задача передана.

В примере код сохраняет переданные задачи в массив `delegatedTasks`. Этот массив нужен для проверки результата.

## Проверим результат

Проверьте результат повторным вызовом [tasks.task.list](../../api-reference/tasks/tasks-task-list.md): выберите задачи по `RESPONSIBLE_ID` нового ответственного и идентификаторам переданных задач.

{% list tabs %}

- JS

    ```javascript
    const delegatedTaskIds = delegatedTasks.map((task) => task.id)

    if (delegatedTaskIds.length > 0) {
        const checkResult = await callMethod(
            'tasks.task.list',
            {
                filter: {
                    '@ID': delegatedTaskIds,
                    RESPONSIBLE_ID: Number(newResponsible.ID)
                },
                select: ['ID', 'TITLE', 'RESPONSIBLE_ID']
            },
            'tasks-task-list-check'
        )

        console.table(checkResult.tasks)
    }
    ```

- PHP

    ```php
    $delegatedTaskIds = array_map(
        static fn(array $task): string => (string)$task['id'],
        $delegatedTasks
    );

    if (!empty($delegatedTaskIds)) {
        $checkResult = callMethod(
            $serviceBuilder,
            'tasks.task.list',
            [
                'filter' => [
                    '@ID' => $delegatedTaskIds,
                    'RESPONSIBLE_ID' => (int)$newResponsible['ID'],
                ],
                'select' => ['ID', 'TITLE', 'RESPONSIBLE_ID'],
            ]
        );

        print_r($checkResult['tasks'] ?? []);
    }
    ```

- Python

    ```python
    delegated_task_ids = [task["id"] for task in delegated_tasks]

    if delegated_task_ids:
        check_result = client.tasks.task.list(
            filter={
                "@ID": delegated_task_ids,
                "RESPONSIBLE_ID": int(new_responsible["ID"]),
            },
            select=["ID", "TITLE", "RESPONSIBLE_ID"],
        ).response.result

        print(check_result.get("tasks", []))
    ```

{% endlist %}

Сценарий выполнен, если количество задач в проверочном ответе совпадает с количеством переданных задач, а поле `responsibleId` у каждой задачи равно `ID` нового ответственного.

Что проверить в ответах:

- все задачи из массива `allowedTasks` есть в массиве `delegatedTasks`

- каждое значение `responsibleId` в ответе [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md) равно `ID` нового ответственного

- проверочный вызов [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) вернул те же задачи по фильтру `@ID` и `RESPONSIBLE_ID`

В интерфейсе задачи появятся у нового ответственного.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `insufficient_scope` | Вебхук не имеет нужного scope. Для методов задач нужен scope `task`, для [user.get](../../api-reference/user/user-get.md) с поиском по e-mail — `user_basic` или `user` ||
|| `Действие над задачей не разрешено` | Пользователь, создавший вебхук, не имеет права делегировать задачу. Проверьте право на действие методом [tasks.task.getaccess](../../api-reference/tasks/tasks-task-get-access.md) ||
|| `Task already completed` | Задача завершена. Исключите завершенные задачи фильтром `!REAL_STATUS: 5` ||
|| `Could not find value for parameter {userId}` | Не передан идентификатор нового ответственного в параметре `userId` ||
|| `wrong task id` | В параметре `taskId` передан неверный идентификатор задачи ||
|#

Если список задач пустой, проверьте:

- уволенный сотрудник найден методом [user.get](../../api-reference/user/user-get.md), а его `ID` передан в `RESPONSIBLE_ID`
- пользователь, создавший вебхук, видит задачи уволенного сотрудника
- в фильтре [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) не указаны лишние условия
- у уволенного сотрудника есть незавершенные задачи, которые можно делегировать

Если `allowedTasks` пустой при непустом списке задач, у пользователя, создавшего вебхук, нет права `DELEGATE` для этих задач. Выполните сценарий через вебхук пользователя с нужными правами или передайте задачи вручную в интерфейсе.

Если часть задач уже передана, повторный запуск сценария начните со шага 2. Метод [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) больше не вернет переданные задачи по фильтру `RESPONSIBLE_ID` уволенного сотрудника.

## Что важно учитывать

Перед запуском сценария учитывайте ограничения методов и прав доступа.

- [tasks.task.list](../../api-reference/tasks/tasks-task-list.md) возвращает задачи страницами по 50 элементов. Чтобы получить все задачи, перебирайте `start`: `0`, `50`, `100`
- [tasks.task.delegate](../../api-reference/tasks/tasks-task-delegate.md) делегирует одну задачу за вызов. Для передачи списка задач вызовите метод для каждой задачи
- Завершенные задачи нельзя делегировать. Сценарий передает только незавершенные задачи
- Делегирование зависит от прав пользователя, который создал вебхук. Если у пользователя нет доступа к задаче или права делегировать ее, метод вернет ошибку
- Если по фильтру [user.get](../../api-reference/user/user-get.md) найдено несколько сотрудников, уточните фильтр: добавьте `EMAIL`, `ID` или другой точный признак

## Продолжите изучение

- [{#T}](../../api-reference/user/user-get.md)
- [{#T}](../../api-reference/tasks/tasks-task-list.md)
- [{#T}](../../api-reference/tasks/tasks-task-get-access.md)
- [{#T}](../../api-reference/tasks/tasks-task-delegate.md)
- [{#T}](../../api-reference/tasks/index.md)
