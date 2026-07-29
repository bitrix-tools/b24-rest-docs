# Как завершить бизнес-процессы уволенного сотрудника

> Scope: [`user_brief, user_basic, user, bizproc`](../../api-reference/scopes/permissions.md)
> 
> Кто может выполнять методы: администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

При увольнении сотрудника в Битрикс24 могут остаться незавершенные бизнес-процессы, за которые он был ответственен.

Чтобы завершить активные бизнес-процессы уволенного сотрудника, последовательно выполним три метода:

1. [user.get](../../api-reference/user/user-get.md) — получим `ID` уволенного сотрудника

2. [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) — получим список заданий процессов, за которые отвечает уволенный сотрудник

3. [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) — завершим бизнес-процессы с удалением данных. Если нужно сохранить факт запуска бизнес-процесса, используйте метод [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Оба метода вызываются одинаково

## 1. Получим ID уволенного сотрудника {#user-id}

Используем метод [user.get](../../api-reference/user/user-get.md) с фильтром:

- `NAME` — укажем имя сотрудника

- `LAST_NAME` — укажем фамилию сотрудника

- `ACTIVE` — параметр регулирует поиск по активным или уволенным сотрудникам. Если параметр не передавать, поиск будет идти по всем сотрудникам вне зависимости от их статуса. Укажем `0` для поиска только среди уволенных сотрудников

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    const response = await $b24.actions.v2.call.make({
        method: 'user.get',
        params: {
            filter: {
                NAME: "employee's name",
                LAST_NAME: "employee's last name",
                ACTIVE: 0,
            },
        },
        requestId: 'user-get',
    })

    const users = response.getData().result
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/');

    $users = $b24->getUserScope()->user()->get(
        [],
        [
            'NAME' => "employee's name",
            'LAST_NAME' => "employee's last name",
            'ACTIVE' => 0,
        ]
    )->getUsers();
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    result = client.user.get(
        filter={
            "NAME": "employee's name",
            "LAST_NAME": "employee's last name",
            "ACTIVE": 0,
        }
    ).response.result
    ```

{% endlist %}

В результате получим `ID` уволенного сотрудника.

```json
{
    "result": [
        {
            "ID": "29",
            "ACTIVE": false,
            "NAME": "employee's name",
            "LAST_NAME": "employee's last name",
            "EMAIL": "employee_email@gmail.com",
            "WORK_POSITION": "Менеджер",
            "UF_DEPARTMENT": [
                7,
                1
            ],
            "USER_TYPE": "employee"
        }
    ],
    "total": 1,
}
```

## 2. Получим список заданий процессов, за которые отвечает уволенный сотрудник {#workflow_id}

Используем метод [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) с фильтром:

- `USER_ID` — идентификатор сотрудника, передаем ID, полученный на [шаге 1](#user-id)

- `STATUS` — параметр отвечает за статус заданий, укажем `0` для отбора только невыполненных заданий

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.task.list',
        params: {
            filter: {
                USER_ID: 29,
                STATUS: 0,
            },
        },
        requestId: 'bizproc-task-list',
    })

    const tasks = response.getData().result
    ```

- PHP

    ```php
    $tasks = $b24->getBizProcScope()->task()->list(
        [],
        [
            'USER_ID' => 29,
            'STATUS' => 0,
        ]
    )->getTasks();
    ```

- Python

    ```python
    result = client.bizproc.task.list(
        filter={
            "USER_ID": 29,
            "STATUS": 0,
        }
    ).response.result
    ```

{% endlist %}

В результате получим список невыполненных заданий. У каждого задания есть параметр `WORKFLOW_ID` — это `ID` бизнес-процесса, который мы завершим в следующем шаге.

```json
{
    "result": [
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2437",
            "ID": "879",
            "WORKFLOW_ID": "67e3db8e581121.72266518",
            "DOCUMENT_NAME": "widget contact",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2437/"
        }
    ],
    "total": 1,
}
```

## 3. Завершим бизнес-процессы

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:

- `ID` — идентификатор процесса, передаем `WORKFLOW_ID`, полученный на [шаге 2](#workflow_id)
  
{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.kill',
        params: { ID: '67e3db8e581121.72266518' },
        requestId: 'bizproc-workflow-kill',
    })

    const isKilled = response.getData().result
    ```

- PHP

    ```php
    $isKilled = $b24->getBizProcScope()->workflow()
        ->kill('67e3db8e581121.72266518')
        ->isSuccess();
    ```

- Python

    ```python
    # ID бизнес-процесса — строка, а типизированный client.bizproc.workflow.kill
    # ожидает int, поэтому вызываем метод напрямую через token.call_method
    result = token.call_method(
        "bizproc.workflow.kill",
        {"ID": "67e3db8e581121.72266518"},
    )
    ```

{% endlist %}

{% note warning "" %}

В b24pysdk типизированный метод `client.bizproc.workflow.kill(bitrix_id=...)` ожидает целочисленный `bitrix_id`, а идентификатор бизнес-процесса — строка вида `67e3db8e581121.72266518`. Поэтому для завершения процесса используйте универсальный вызов `token.call_method("bizproc.workflow.kill", {"ID": workflow_id})`, где `token` — объект `BitrixWebhook`.

{% endnote %}

В результате получим `true`, удаление процесса прошло успешно. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md).

```json
{
    "result": true,
}
```

## Пример кода

В примере все найденные процессы удаляются в цикле. Если вам требуется удалить большой объем данных, вы можете столкнуться с лимитами на выполнение запросов. Чтобы оптимизировать код под ваш объем работы, используйте рекомендации раздела [Производительность](../../settings/performance/index.md).

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    async function getUserId(firstName, lastName) {
        const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: { filter: { NAME: firstName, LAST_NAME: lastName, ACTIVE: 0 } },
            requestId: 'user-get',
        })
        if (!response.isSuccess) throw new Error(response.getErrorMessages().join('; '))
        const users = response.getData().result
        return users.length ? users[0].ID : null
    }

    async function getWorkflowIds(userId) {
        const response = await $b24.actions.v2.call.make({
            method: 'bizproc.task.list',
            params: { filter: { USER_ID: userId, STATUS: 0 } },
            requestId: 'bizproc-task-list',
        })
        if (!response.isSuccess) throw new Error(response.getErrorMessages().join('; '))
        return response.getData().result.map((task) => task.WORKFLOW_ID)
    }

    async function killWorkflows(workflowIds) {
        for (const workflowId of workflowIds) {
            const response = await $b24.actions.v2.call.make({
                method: 'bizproc.workflow.kill',
                params: { ID: workflowId },
                requestId: `kill-${workflowId}`,
            })
            console.log(response.isSuccess
                ? `Workflow ${workflowId} завершен успешно.`
                : `Ошибка: ${response.getErrorMessages().join('; ')}`)
        }
    }

    // Имя и фамилия сотрудника передаются аргументами: node kill.mjs Иван Иванов
    const [firstName, lastName] = process.argv.slice(2)
    const userId = await getUserId(firstName, lastName)
    if (userId) {
        await killWorkflows(await getWorkflowIds(userId))
    }
    $b24.destroy()
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Services\ServiceBuilder;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/');

    function getUserId(ServiceBuilder $b24, string $firstName, string $lastName): ?int
    {
        $users = $b24->getUserScope()->user()->get(
            [],
            ['NAME' => $firstName, 'LAST_NAME' => $lastName, 'ACTIVE' => 0]
        )->getUsers();

        return $users === [] ? null : $users[0]->ID;
    }

    function getWorkflowIds(ServiceBuilder $b24, int $userId): array
    {
        $tasks = $b24->getBizProcScope()->task()->list(
            [],
            ['USER_ID' => $userId, 'STATUS' => 0]
        )->getTasks();

        return array_map(static fn($task) => $task->WORKFLOW_ID, $tasks);
    }

    function killWorkflows(ServiceBuilder $b24, array $workflowIds): void
    {
        foreach ($workflowIds as $workflowId) {
            $isKilled = $b24->getBizProcScope()->workflow()->kill($workflowId)->isSuccess();
            echo $isKilled
                ? "Workflow {$workflowId} завершен успешно.\n"
                : "Ошибка при удалении процесса {$workflowId}\n";
        }
    }

    $firstName = readline('Введите имя сотрудника: ');
    $lastName = readline('Введите фамилию сотрудника: ');

    $userId = getUserId($b24, $firstName, $lastName);
    if ($userId !== null) {
        killWorkflows($b24, getWorkflowIds($b24, $userId));
    }
    ```

- Python

    ```python
    from typing import Optional

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def get_user_id(client, first_name: str, last_name: str) -> Optional[int]:
        try:
            users = client.user.get(
                filter={
                    "NAME": first_name,
                    "LAST_NAME": last_name,
                    "ACTIVE": 0,
                },
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return None

        if not users:
            return None
        return int(users[0]["ID"])


    def get_user_tasks(client, user_id: int) -> list[str]:
        tasks = client.bizproc.task.list(
            filter={
                "USER_ID": user_id,
                "STATUS": 0,
            },
        ).response.result

        return [task["WORKFLOW_ID"] for task in tasks]


    def kill_workflows(token, workflow_ids: list[str]) -> None:
        # ID процесса — строка, поэтому используем универсальный token.call_method,
        # а не типизированный client.bizproc.workflow.kill (он ожидает int)
        for workflow_id in workflow_ids:
            try:
                token.call_method("bizproc.workflow.kill", {"ID": workflow_id})
            except BitrixAPIError as error:
                print(f"Ошибка: {error}")
            else:
                print(f"Workflow {workflow_id} завершен успешно.")


    def process_employee_tasks(client, token, first_name: str, last_name: str) -> None:
        user_id = get_user_id(client, first_name, last_name)
        if user_id is None:
            return
        workflow_ids = get_user_tasks(client, user_id)
        kill_workflows(token, workflow_ids)


    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    first_name = input("Введите имя сотрудника: ")
    last_name = input("Введите фамилию сотрудника: ")

    process_employee_tasks(client, token, first_name, last_name)
    ```

{% endlist %}
