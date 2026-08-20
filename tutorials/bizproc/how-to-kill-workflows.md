# Как завершить бизнес-процессы уволенного сотрудника

> Scope: [`user_brief`](../../api-reference/scopes/permissions.md), [`user_basic`](../../api-reference/scopes/permissions.md), [`user`](../../api-reference/scopes/permissions.md), [`bizproc`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права администратора
>
> - [user.get](../../api-reference/user/user-get.md) — любой пользователь
> - [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) — администратор для просмотра заданий любого пользователя
> - [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) и [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md) — администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

После увольнения сотрудника в Битрикс24 могут остаться невыполненные задания бизнес-процессов, назначенные на него. По заданиям можно получить `WORKFLOW_ID` и завершить связанные процессы.

Метод `bizproc.workflow.kill` удаляет процесс вместе с данными. Если нужно остановить выполнение, но сохранить запись о запуске, используйте [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Оба метода принимают один и тот же идентификатор процесса.

Сценарий состоит из трех шагов.

1. Получить `ID` уволенного сотрудника методом [user.get](../../api-reference/user/user-get.md)
2. Получить невыполненные задания сотрудника методом [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md)
3. Удалить связанные процессы методом [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md)

## Что нужно до начала

- входящий вебхук администратора или приложение со scope `bizproc` и одним из scope для пользователей: `user`, `user_basic` или `user_brief`
- имя и фамилия уволенного сотрудника
- решение, что делать с найденными процессами: удалить методом `bizproc.workflow.kill` или остановить методом `bizproc.workflow.terminate`

Администратор может получать задания любых пользователей. Обычный пользователь видит только свои задания или задания подчиненного, поэтому для всего сценария нужна авторизация администратора.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Получим ID уволенного сотрудника {#user-id}

Используем метод [user.get](../../api-reference/user/user-get.md) с фильтром:

- `NAME` — имя сотрудника
- `LAST_NAME` — фамилия сотрудника
- `ACTIVE = 0` — поиск только среди уволенных сотрудников

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'user.get',
        params: {
            filter: {
                NAME: 'Иван',
                LAST_NAME: 'Петров',
                ACTIVE: 0,
            },
        },
        requestId: 'user-get',
    })

    const users = response.getData().result
    const userId = users.length ? Number(users[0].ID) : null
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $users = $b24->getUserScope()->user()->get(
        [],
        [
            'NAME' => 'Иван',
            'LAST_NAME' => 'Петров',
            'ACTIVE' => 0,
        ]
    )->getUsers();

    $userId = $users === [] ? null : $users[0]->ID;
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    users = client.user.get(
        filter={
            "NAME": "Иван",
            "LAST_NAME": "Петров",
            "ACTIVE": 0,
        }
    ).response.result

    user_id = int(users[0]["ID"]) if users else None
    ```

- Go

    ```go
    import (
        "context"
        "encoding/json"
        "log"
        "os"

        b24 "github.com/bitrix24/b24gosdk"
    )

    ctx := context.Background()
    core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    res, err := core.Call(ctx, "user.get", b24.Params{
        "filter": b24.Params{
            "NAME":      "Иван",
            "LAST_NAME": "Петров",
            "ACTIVE":    0,
        },
    }, b24.WithIdempotent())
    if err != nil {
        log.Fatal(err)
    }

    var users []struct {
        ID string `json:"ID"`
    }
    if err := json.Unmarshal(res.Result, &users); err != nil {
        log.Fatal(err)
    }

    userID := ""
    if len(users) > 0 {
        userID = users[0].ID
    }
    ```

{% endlist %}

В ответе сохраните `ID` сотрудника. Этот идентификатор нужен для фильтра `USER_ID` на следующем шаге.

```json
{
    "result": [
        {
            "ID": "29",
            "ACTIVE": false,
            "NAME": "Иван",
            "LAST_NAME": "Петров",
            "EMAIL": "employee@example.com",
            "USER_TYPE": "employee"
        }
    ],
    "total": 1
}
```

Если `result` содержит пустой массив, уволенный сотрудник с указанным именем и фамилией не найден. Уточните данные поиска и повторите первый шаг.

## 2. Получим задания сотрудника {#workflow-id}

Используем метод [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) с фильтром:

- `USER_ID` — идентификатор сотрудника из [шага 1](#user-id)
- `STATUS = 0` — только невыполненные задания

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.task.list',
        params: {
            select: ['ID', 'WORKFLOW_ID', 'NAME', 'DOCUMENT_NAME'],
            filter: {
                USER_ID: userId,
                STATUS: 0,
            },
        },
        requestId: 'bizproc-task-list',
    })

    const tasks = response.getData().result
    const workflowIds = [...new Set(tasks.map((task) => task.WORKFLOW_ID))]
    ```

- PHP

    ```php
    $response = $b24->core->call('bizproc.task.list', [
        'select' => ['ID', 'WORKFLOW_ID', 'NAME', 'DOCUMENT_NAME'],
        'filter' => [
            'USER_ID' => $userId,
            'STATUS' => 0,
        ],
    ]);

    $tasks = $response->getResponseData()->getResult();
    $workflowIds = array_values(array_unique(array_column($tasks, 'WORKFLOW_ID')));
    ```

- Python

    ```python
    tasks = client.bizproc.task.list(
        select=["ID", "WORKFLOW_ID", "NAME", "DOCUMENT_NAME"],
        filter={
            "USER_ID": user_id,
            "STATUS": 0,
        },
    ).response.result

    workflow_ids = list({task["WORKFLOW_ID"] for task in tasks})
    ```

- Go

    ```go
    res, err := core.Call(ctx, "bizproc.task.list", b24.Params{
        "select": []string{"ID", "WORKFLOW_ID", "NAME", "DOCUMENT_NAME"},
        "filter": b24.Params{
            "USER_ID": userID,
            "STATUS":  0,
        },
    }, b24.WithIdempotent())
    if err != nil {
        log.Fatal(err)
    }

    var tasks []struct {
        WorkflowID string `json:"WORKFLOW_ID"`
    }
    if err := json.Unmarshal(res.Result, &tasks); err != nil {
        log.Fatal(err)
    }

    seen := map[string]struct{}{}
    workflowIDs := []string{}
    for _, task := range tasks {
        if _, ok := seen[task.WorkflowID]; ok {
            continue
        }

        seen[task.WorkflowID] = struct{}{}
        workflowIDs = append(workflowIDs, task.WorkflowID)
    }
    ```

{% endlist %}

В ответе сохраните `WORKFLOW_ID`. Это строковый идентификатор бизнес-процесса, который нужно передать в `ID` метода `bizproc.workflow.kill`.

```json
{
    "result": [
        {
            "ID": "879",
            "WORKFLOW_ID": "67e3db8e581121.72266518",
            "DOCUMENT_NAME": "Контакт клиента",
            "NAME": "Согласовать адрес"
        }
    ],
    "total": 1
}
```

Если `result` содержит пустой массив, у сотрудника нет невыполненных заданий бизнес-процессов. Завершать процессы по этому сценарию не нужно.

## 3. Завершим бизнес-процессы

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:

- `ID` — идентификатор процесса. Передайте `WORKFLOW_ID` из [шага 2](#workflow-id)

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.kill',
        params: { ID: workflowIds[0] },
        requestId: 'bizproc-workflow-kill',
    })

    const isKilled = response.getData().result
    ```

- PHP

    ```php
    $isKilled = $b24->getBizProcScope()->workflow()
        ->kill($workflowIds[0])
        ->isSuccess();
    ```

- Python

    ```python
    token.call_method(
        "bizproc.workflow.kill",
        {"ID": workflow_ids[0]},
    )
    ```

- Go

    ```go
    res, err := core.Call(ctx, "bizproc.workflow.kill", b24.Params{
        "ID": workflowIDs[0],
    })
    if err != nil {
        log.Fatal(err)
    }

    var isKilled bool
    if err := json.Unmarshal(res.Result, &isKilled); err != nil {
        log.Fatal(err)
    }
    log.Println(isKilled)
    ```

{% endlist %}

Успешный ответ содержит `true`.

```json
{
    "result": true
}
```

## Пример кода

В примере найденные процессы сначала выводятся для проверки. Чтобы удалить процессы, запустите пример с аргументом `--confirm`.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    async function getUserId(firstName, lastName) {
        const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: { filter: { NAME: firstName, LAST_NAME: lastName, ACTIVE: 0 } },
            requestId: 'user-get',
        })

        const users = response.getData().result
        return users.length ? Number(users[0].ID) : null
    }

    async function getWorkflowIds(userId) {
        const response = await $b24.actions.v2.call.make({
            method: 'bizproc.task.list',
            params: {
                select: ['ID', 'WORKFLOW_ID', 'NAME', 'DOCUMENT_NAME'],
                filter: { USER_ID: userId, STATUS: 0 },
            },
            requestId: 'bizproc-task-list',
        })

        return [...new Set(response.getData().result.map((task) => task.WORKFLOW_ID))]
    }

    async function killWorkflows(workflowIds) {
        if (!workflowIds.length) {
            console.log('Невыполненные задания бизнес-процессов не найдены')
            return
        }

        console.log(`Найдено процессов: ${workflowIds.length}`)
        for (const workflowId of workflowIds) {
            console.log(`Процесс к удалению: ${workflowId}`)
        }

        if (!process.argv.includes('--confirm')) {
            console.log('Проверьте список и запустите пример с аргументом --confirm для удаления')
            return
        }

        for (const workflowId of workflowIds) {
            const response = await $b24.actions.v2.call.make({
                method: 'bizproc.workflow.kill',
                params: { ID: workflowId },
                requestId: `workflow-kill-${workflowId}`,
            })

            console.log(response.isSuccess
                ? `Процесс ${workflowId} удален`
                : `Ошибка при удалении ${workflowId}: ${response.getErrorMessages().join('; ')}`)
        }
    }

    const [firstName, lastName] = process.argv.slice(2)
    if (!firstName || !lastName) {
        throw new Error('Передайте имя и фамилию сотрудника')
    }

    const userId = await getUserId(firstName, lastName)
    if (userId === null) {
        console.log('Уволенный сотрудник не найден')
    } else {
        await killWorkflows(await getWorkflowIds(userId))
    }

    $b24.destroy()
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilder;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

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
        $response = $b24->core->call('bizproc.task.list', [
            'select' => ['ID', 'WORKFLOW_ID', 'NAME', 'DOCUMENT_NAME'],
            'filter' => ['USER_ID' => $userId, 'STATUS' => 0],
        ]);

        return array_values(array_unique(array_column(
            $response->getResponseData()->getResult(),
            'WORKFLOW_ID'
        )));
    }

    function killWorkflows(ServiceBuilder $b24, array $workflowIds): void
    {
        if ($workflowIds === []) {
            echo "Невыполненные задания бизнес-процессов не найдены\n";
            return;
        }

        echo "Найдено процессов: " . count($workflowIds) . "\n";
        foreach ($workflowIds as $workflowId) {
            echo "Процесс к удалению: {$workflowId}\n";
        }

        if (!in_array('--confirm', $_SERVER['argv'], true)) {
            echo "Проверьте список и запустите пример с аргументом --confirm для удаления\n";
            return;
        }

        foreach ($workflowIds as $workflowId) {
            $isKilled = $b24->getBizProcScope()->workflow()->kill($workflowId)->isSuccess();
            echo $isKilled
                ? "Процесс {$workflowId} удален\n"
                : "Ошибка при удалении процесса {$workflowId}\n";
        }
    }

    $firstName = readline('Введите имя сотрудника: ');
    $lastName = readline('Введите фамилию сотрудника: ');

    $userId = getUserId($b24, $firstName, $lastName);
    if ($userId === null) {
        echo "Уволенный сотрудник не найден\n";
    } else {
        killWorkflows($b24, getWorkflowIds($b24, $userId));
    }
    ```

- Python

    ```python
    import sys

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    def get_user_id(first_name: str, last_name: str) -> int | None:
        users = client.user.get(
            filter={
                "NAME": first_name,
                "LAST_NAME": last_name,
                "ACTIVE": 0,
            },
        ).response.result

        return int(users[0]["ID"]) if users else None

    def get_workflow_ids(user_id: int) -> list[str]:
        tasks = client.bizproc.task.list(
            select=["ID", "WORKFLOW_ID", "NAME", "DOCUMENT_NAME"],
            filter={"USER_ID": user_id, "STATUS": 0},
        ).response.result

        return list({task["WORKFLOW_ID"] for task in tasks})

    def kill_workflows(workflow_ids: list[str]) -> None:
        if not workflow_ids:
            print("Невыполненные задания бизнес-процессов не найдены")
            return

        print(f"Найдено процессов: {len(workflow_ids)}")
        for workflow_id in workflow_ids:
            print(f"Процесс к удалению: {workflow_id}")

        if "--confirm" not in sys.argv:
            print("Проверьте список и запустите пример с аргументом --confirm для удаления")
            return

        for workflow_id in workflow_ids:
            try:
                token.call_method("bizproc.workflow.kill", {"ID": workflow_id})
            except BitrixAPIError as error:
                print(f"Ошибка при удалении процесса {workflow_id}: {error}")
            else:
                print(f"Процесс {workflow_id} удален")

    first_name = input("Введите имя сотрудника: ")
    last_name = input("Введите фамилию сотрудника: ")

    user_id = get_user_id(first_name, last_name)
    if user_id is None:
        print("Уволенный сотрудник не найден")
    else:
        kill_workflows(get_workflow_ids(user_id))
    ```

- Go

    ```go
    // Подготовка в пустом каталоге:
    //  go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //  B24_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/" go run main.go Иван Петров
    //  B24_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/" go run main.go Иван Петров --confirm

    package main

    import (
        "context"
        "encoding/json"
        "fmt"
        "os"

        b24 "github.com/bitrix24/b24gosdk"
    )

    type user struct {
        ID string `json:"ID"`
    }

    type task struct {
        WorkflowID string `json:"WORKFLOW_ID"`
    }

    func main() {
        if err := run(); err != nil {
            fmt.Fprintf(os.Stderr, "%v\n", err)
            os.Exit(1)
        }
    }

    func run() error {
        if len(os.Args) < 3 {
            return fmt.Errorf("передайте имя и фамилию сотрудника")
        }

        firstName := os.Args[1]
        lastName := os.Args[2]
        confirmed := false
        for _, arg := range os.Args[3:] {
            if arg == "--confirm" {
                confirmed = true
            }
        }

        ctx := context.Background()
        core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

        userID, err := getUserID(ctx, core, firstName, lastName)
        if err != nil {
            return err
        }
        if userID == "" {
            fmt.Println("Уволенный сотрудник не найден")
            return nil
        }

        workflowIDs, err := getWorkflowIDs(ctx, core, userID)
        if err != nil {
            return err
        }
        if len(workflowIDs) == 0 {
            fmt.Println("Невыполненные задания бизнес-процессов не найдены")
            return nil
        }

        fmt.Printf("Найдено процессов: %d\n", len(workflowIDs))
        for _, workflowID := range workflowIDs {
            fmt.Printf("Процесс к удалению: %s\n", workflowID)
        }

        if !confirmed {
            fmt.Println("Проверьте список и запустите пример с аргументом --confirm для удаления")
            return nil
        }

        for _, workflowID := range workflowIDs {
            if err := killWorkflow(ctx, core, workflowID); err != nil {
                fmt.Printf("Ошибка при удалении процесса %s: %v\n", workflowID, err)
                continue
            }

            fmt.Printf("Процесс %s удален\n", workflowID)
        }

        return nil
    }

    func getUserID(ctx context.Context, core *b24.Core, firstName string, lastName string) (string, error) {
        res, err := core.Call(ctx, "user.get", b24.Params{
            "filter": b24.Params{
                "NAME":      firstName,
                "LAST_NAME": lastName,
                "ACTIVE":    0,
            },
        }, b24.WithIdempotent())
        if err != nil {
            return "", fmt.Errorf("user.get: %w", err)
        }

        var users []user
        if err := json.Unmarshal(res.Result, &users); err != nil {
            return "", fmt.Errorf("decode user.get: %w", err)
        }

        if len(users) == 0 {
            return "", nil
        }

        return users[0].ID, nil
    }

    func getWorkflowIDs(ctx context.Context, core *b24.Core, userID string) ([]string, error) {
        res, err := core.Call(ctx, "bizproc.task.list", b24.Params{
            "select": []string{"ID", "WORKFLOW_ID", "NAME", "DOCUMENT_NAME"},
            "filter": b24.Params{
                "USER_ID": userID,
                "STATUS":  0,
            },
        }, b24.WithIdempotent())
        if err != nil {
            return nil, fmt.Errorf("bizproc.task.list: %w", err)
        }

        var tasks []task
        if err := json.Unmarshal(res.Result, &tasks); err != nil {
            return nil, fmt.Errorf("decode bizproc.task.list: %w", err)
        }

        seen := map[string]struct{}{}
        workflowIDs := []string{}
        for _, task := range tasks {
            if _, ok := seen[task.WorkflowID]; ok {
                continue
            }

            seen[task.WorkflowID] = struct{}{}
            workflowIDs = append(workflowIDs, task.WorkflowID)
        }

        return workflowIDs, nil
    }

    func killWorkflow(ctx context.Context, core *b24.Core, workflowID string) error {
        _, err := core.Call(ctx, "bizproc.workflow.kill", b24.Params{
            "ID": workflowID,
        })
        if err != nil {
            return fmt.Errorf("bizproc.workflow.kill: %w", err)
        }

        return nil
    }
    ```

{% endlist %}

## Проверим результат

Через интерфейс проверьте задания уволенного сотрудника: заданий удаленных процессов быть не должно. Если вместо удаления использовали `bizproc.workflow.terminate`, процесс должен остановиться, а запись о запуске процесса должна сохраниться.

Через REST повторите запрос [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) с тем же `USER_ID` и `STATUS = 0`.

{% list tabs %}

- JS

    ```js
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'bizproc.task.list',
        params: {
            select: ['ID', 'WORKFLOW_ID'],
            filter: { USER_ID: userId, STATUS: 0 },
        },
        requestId: 'bizproc-task-list-check',
    })

    console.log(checkResponse.getData().result.map((task) => task.WORKFLOW_ID))
    ```

- PHP

    ```php
    $checkResponse = $b24->core->call('bizproc.task.list', [
        'select' => ['ID', 'WORKFLOW_ID'],
        'filter' => ['USER_ID' => $userId, 'STATUS' => 0],
    ]);

    foreach ($checkResponse->getResponseData()->getResult() as $task) {
        echo $task['WORKFLOW_ID'] . PHP_EOL;
    }
    ```

- Python

    ```python
    check_result = client.bizproc.task.list(
        select=["ID", "WORKFLOW_ID"],
        filter={"USER_ID": user_id, "STATUS": 0},
    ).response.result

    print([task["WORKFLOW_ID"] for task in check_result])
    ```

- Go

    ```go
    res, err := core.Call(ctx, "bizproc.task.list", b24.Params{
        "select": []string{"ID", "WORKFLOW_ID"},
        "filter": b24.Params{
            "USER_ID": userID,
            "STATUS":  0,
        },
    }, b24.WithIdempotent())
    if err != nil {
        log.Fatal(err)
    }

    var tasks []struct {
        WorkflowID string `json:"WORKFLOW_ID"`
    }
    if err := json.Unmarshal(res.Result, &tasks); err != nil {
        log.Fatal(err)
    }

    for _, task := range tasks {
        log.Println(task.WorkflowID)
    }
    ```

{% endlist %}

Сценарий выполнен, если в ответе нет `WORKFLOW_ID`, которые были переданы в `bizproc.workflow.kill`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `ACCESS_DENIED` | Метод вызвал пользователь без нужных прав или у вебхука нет нужного scope ||
|| `ERROR_WRONG_WORKFLOW_ID` | В `ID` передано пустое значение или значение не строкового типа ||
|| Пустой массив `result` в `user.get` | Уволенный сотрудник с указанным именем и фамилией не найден ||
|| Пустой массив `result` в `bizproc.task.list` | У сотрудника нет невыполненных заданий бизнес-процессов ||
|| Метод `bizproc.*` недоступен | Проверьте, что бизнес-процессы доступны на Битрикс24 и запрос выполняет администратор ||
|#

Повторяйте сценарий с шага, на котором произошла ошибка. Если ошибка возникла при удалении одного процесса, проверьте его `WORKFLOW_ID` и продолжайте обработку остальных процессов.

## Что важно учитывать

- `bizproc.workflow.kill` удаляет процесс вместе с данными процесса
- `bizproc.workflow.terminate` останавливает процесс и сохраняет запись о его запуске
- идентификатор пользователя из [user.get](../../api-reference/user/user-get.md) передается в `USER_ID` метода [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md)
- `WORKFLOW_ID` из [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) передается в `ID` метода [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md)
- `WORKFLOW_ID` — строка вида `67e3db8e581121.72266518`; не преобразуйте его в число

## Продолжите изучение

- [Получить список пользователей по фильтру](../../api-reference/user/user-get.md)
- [Получить список заданий бизнес-процесса](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md)
- [Удалить запущенный процесс](../../api-reference/bizproc/bizproc-workflow-kill.md)
- [Остановить активный бизнес-процесс](../../api-reference/bizproc/bizproc-workflow-terminate.md)
