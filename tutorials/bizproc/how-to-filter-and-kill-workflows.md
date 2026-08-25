# Как массово завершить бизнес-процессы с фильтром по дате

> Scope: [`bizproc`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 могут оставаться запущенные бизнес-процессы, которые больше не нужны: зависли, ждут устаревшие данные или были запущены до изменения регламента. Их можно найти по дате запуска и удалить методом `bizproc.workflow.kill`.

Метод `bizproc.workflow.kill` удаляет процесс вместе с данными. Если нужно остановить выполнение, но сохранить запись о запуске, используйте [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Оба метода принимают один и тот же идентификатор процесса.

Сценарий состоит из двух шагов.

1. Получить список процессов методом [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md)
2. Удалить выбранные процессы методом [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md)

## Что нужно до начала

- входящий вебхук администратора или приложение со scope `bizproc`
- дата, до которой нужно найти запущенные процессы. В примерах используется `2025-01-01T00:00:00Z`
- решение, что делать с найденными процессами: удалить методом `bizproc.workflow.kill` или остановить методом `bizproc.workflow.terminate`

Перед удалением обязательно проверьте найденные `ID`. Повторный запуск с тем же фильтром может найти другие процессы, если за это время появились новые запуски с подходящей датой.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Получим список процессов {#workflow-id}

Используем метод [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) с параметрами:

- `filter[<STARTED]` — дата запуска. Префикс `<` отбирает процессы, запущенные до указанного времени
- `select` — поля, которые нужны в сценарии. Достаточно получить `ID` и `STARTED`

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.instances',
        params: {
            select: ['ID', 'STARTED'],
            filter: { '<STARTED': '2025-01-01T00:00:00Z' },
        },
        requestId: 'workflow-instances',
    })

    const instances = response.getData().result
    const workflowIds = instances.map((instance) => instance.ID)
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    instances = client.bizproc.workflow.instances(
        select=["ID", "STARTED"],
        filter={"<STARTED": "2025-01-01T00:00:00Z"},
    ).response.result

    workflow_ids = [instance["ID"] for instance in instances]
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

    $response = $b24->core->call('bizproc.workflow.instances', [
        'select' => ['ID', 'STARTED'],
        'filter' => ['<STARTED' => '2025-01-01T00:00:00Z'],
    ]);

    $instances = $response->getResponseData()->getResult();
    $workflowIds = array_column($instances, 'ID');
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

    res, err := core.Call(ctx, "bizproc.workflow.instances", b24.Params{
        "select": []string{"ID", "STARTED"},
        "filter": b24.Params{"<STARTED": "2025-01-01T00:00:00Z"},
    }, b24.WithIdempotent())
    if err != nil {
        log.Fatal(err)
    }

    var instances []struct {
        ID      string `json:"ID"`
        Started string `json:"STARTED"`
    }
    if err := json.Unmarshal(res.Result, &instances); err != nil {
        log.Fatal(err)
    }

    workflowIDs := make([]string, 0, len(instances))
    for _, instance := range instances {
        workflowIDs = append(workflowIDs, instance.ID)
    }
    ```

{% endlist %}

В ответе сохраните `ID` процессов, которые нужно удалить или остановить.

```json
{
    "result": [
        {
            "ID": "660e559f34af10.95144732",
            "STARTED": "2024-12-04T10:04:24+03:00"
        },
        {
            "ID": "6639c7b59e9eb5.40607056",
            "STARTED": "2024-12-04T09:52:40+03:00"
        }
    ],
    "total": 2
}
```

Если `result` содержит пустой массив, подходящих процессов нет. Переходить ко второму шагу не нужно.

## 2. Завершим бизнес-процессы

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:

- `ID` — идентификатор процесса из ответа [шага 1](#workflow-id). Передавайте строку вида `660e559f34af10.95144732`

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.kill',
        params: { ID: workflowIds[0] },
        requestId: 'workflow-kill',
    })

    const isKilled = response.getData().result
    ```

- Python

    ```python
    token.call_method(
        "bizproc.workflow.kill",
        {"ID": workflow_ids[0]},
    )
    ```

- PHP

    ```php
    $isKilled = $b24->getBizProcScope()->workflow()
        ->kill($workflowIds[0])
        ->isSuccess();
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

В примере все найденные процессы сначала выводятся для проверки. Чтобы удалить процессы, запустите пример с аргументом `--confirm`. При большом объеме данных учитывайте лимиты REST и рекомендации по [производительности](../../settings/performance/index.md).

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const [day, month, year] = (process.argv[2] || '').split('.')
    if (!day || !month || !year) {
        throw new Error('Передайте дату в формате дд.мм.гггг')
    }

    const isoDate = `${year}-${month}-${day}T00:00:00Z`
    const confirmed = process.argv.includes('--confirm')

    const listResponse = await $b24.actions.v2.callList.make({
        method: 'bizproc.workflow.instances',
        params: {
            select: ['ID', 'STARTED'],
            filter: { '<STARTED': isoDate },
        },
        requestId: 'workflow-instances',
    })

    const instances = listResponse.getData()
    const workflowIds = instances.map((instance) => instance.ID)

    if (!workflowIds.length) {
        console.log('Процессы не найдены')
        $b24.destroy()
        process.exit(0)
    }

    console.log(`Найдено процессов: ${workflowIds.length}`)
    for (const workflowId of workflowIds) {
        console.log(`Процесс к удалению: ${workflowId}`)
    }

    if (!confirmed) {
        console.log('Проверьте список и запустите пример с аргументом --confirm для удаления')
        $b24.destroy()
        process.exit(0)
    }

    for (const workflowId of workflowIds) {
        const killResponse = await $b24.actions.v2.call.make({
            method: 'bizproc.workflow.kill',
            params: { ID: workflowId },
            requestId: `workflow-kill-${workflowId}`,
        })

        console.log(killResponse.isSuccess
            ? `Процесс ${workflowId} удален`
            : `Ошибка при удалении ${workflowId}: ${killResponse.getErrorMessages().join('; ')}`)
    }

    $b24.destroy()
    ```

- Python

    ```python
    import re
    import sys

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    user_date_input = input("Введите дату в формате дд.мм.гггг: ")
    if not re.match(r"^\d{2}\.\d{2}\.\d{4}$", user_date_input):
        raise ValueError("Введите дату в формате дд.мм.гггг")

    day, month, year = user_date_input.split(".")
    iso_date = f"{year}-{month}-{day}T00:00:00Z"
    confirmed = "--confirm" in sys.argv

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    start = None
    workflow_ids = []
    while True:
        params = {
            "select": ["ID", "STARTED"],
            "filter": {"<STARTED": iso_date},
        }
        if start is not None:
            params["start"] = start

        response = client.bizproc.workflow.instances(**params).response
        workflow_ids.extend(instance["ID"] for instance in response.result or [])

        if response.next is None:
            break
        start = response.next

    if not workflow_ids:
        print("Процессы не найдены")
        sys.exit(0)

    print(f"Найдено процессов: {len(workflow_ids)}")
    for workflow_id in workflow_ids:
        print(f"Процесс к удалению: {workflow_id}")

    if not confirmed:
        print("Проверьте список и запустите пример с аргументом --confirm для удаления")
        sys.exit(0)

    for workflow_id in workflow_ids:
        try:
            token.call_method("bizproc.workflow.kill", {"ID": workflow_id})
        except BitrixAPIError as error:
            print(f"Ошибка при удалении процесса {workflow_id}: {error}")
        else:
            print(f"Процесс {workflow_id} удален")
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

    $userDateInput = readline('Введите дату в формате дд.мм.гггг: ');
    if (!preg_match('/^\d{2}\.\d{2}\.\d{4}$/', $userDateInput)) {
        throw new InvalidArgumentException('Введите дату в формате дд.мм.гггг');
    }

    [$day, $month, $year] = explode('.', $userDateInput);
    $isoDate = "{$year}-{$month}-{$day}T00:00:00Z";
    $confirmed = in_array('--confirm', $argv, true);
    $workflowIds = [];
    $start = 0;

    do {
        $response = $b24->core->call('bizproc.workflow.instances', [
            'select' => ['ID', 'STARTED'],
            'filter' => ['<STARTED' => $isoDate],
            'start' => $start,
        ]);

        foreach ($response->getResponseData()->getResult() as $instance) {
            $workflowIds[] = $instance['ID'];
        }

        $start = $response->getResponseData()->getPagination()->getNextItem();
    } while ($start !== null);

    if ($workflowIds === []) {
        echo "Процессы не найдены\n";
        exit;
    }

    echo "Найдено процессов: " . count($workflowIds) . "\n";
    foreach ($workflowIds as $workflowId) {
        echo "Процесс к удалению: {$workflowId}\n";
    }

    if (!$confirmed) {
        echo "Проверьте список и запустите пример с аргументом --confirm для удаления\n";
        exit;
    }

    foreach ($workflowIds as $workflowId) {
        $isKilled = $b24->getBizProcScope()->workflow()->kill($workflowId)->isSuccess();
        echo $isKilled
            ? "Процесс {$workflowId} удален\n"
            : "Ошибка при удалении процесса {$workflowId}\n";
    }
    ```

- Go

    ```go
    // Подготовка в пустом каталоге:
    //  go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //  B24_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/" go run main.go 01.01.2025
    //  B24_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/" go run main.go 01.01.2025 --confirm

    package main

    import (
        "context"
        "encoding/json"
        "fmt"
        "os"
        "strings"

        b24 "github.com/bitrix24/b24gosdk"
    )

    type workflowInstance struct {
        ID      string `json:"ID"`
        Started string `json:"STARTED"`
    }

    func main() {
        if err := run(); err != nil {
            fmt.Fprintf(os.Stderr, "%v\n", err)
            os.Exit(1)
        }
    }

    func run() error {
        if len(os.Args) < 2 {
            return fmt.Errorf("передайте дату в формате дд.мм.гггг")
        }

        parts := strings.Split(os.Args[1], ".")
        if len(parts) != 3 || len(parts[0]) != 2 || len(parts[1]) != 2 || len(parts[2]) != 4 {
            return fmt.Errorf("передайте дату в формате дд.мм.гггг")
        }

        isoDate := fmt.Sprintf("%s-%s-%sT00:00:00Z", parts[2], parts[1], parts[0])
        confirmed := false
        for _, arg := range os.Args[2:] {
            if arg == "--confirm" {
                confirmed = true
            }
        }

        ctx := context.Background()
        core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

        workflowIDs, err := getWorkflowIDs(ctx, core, isoDate)
        if err != nil {
            return err
        }

        if len(workflowIDs) == 0 {
            fmt.Println("Процессы не найдены")
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

    func getWorkflowIDs(ctx context.Context, core *b24.Core, isoDate string) ([]string, error) {
        workflowIDs := []string{}

        for start := 0; ; start += 50 {
            res, err := core.Call(ctx, "bizproc.workflow.instances", b24.Params{
                "select": []string{"ID", "STARTED"},
                "filter": b24.Params{"<STARTED": isoDate},
                "start":  start,
            }, b24.WithIdempotent())
            if err != nil {
                return nil, fmt.Errorf("bizproc.workflow.instances: %w", err)
            }

            var instances []workflowInstance
            if err := json.Unmarshal(res.Result, &instances); err != nil {
                return nil, fmt.Errorf("decode bizproc.workflow.instances: %w", err)
            }

            for _, instance := range instances {
                workflowIDs = append(workflowIDs, instance.ID)
            }

            if len(instances) < 50 {
                break
            }
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

Через интерфейс проверьте список запущенных бизнес-процессов: удаленных процессов в нем быть не должно.

Через REST повторите запрос [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) с тем же фильтром и проверьте, что в ответе нет удаленных `ID`.

{% list tabs %}

- JS

    ```js
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.instances',
        params: {
            select: ['ID'],
            filter: { '<STARTED': '2025-01-01T00:00:00Z' },
        },
        requestId: 'workflow-instances-check',
    })

    console.log(checkResponse.getData().result.map((instance) => instance.ID))
    ```

- Python

    ```python
    check_result = client.bizproc.workflow.instances(
        select=["ID"],
        filter={"<STARTED": "2025-01-01T00:00:00Z"},
    ).response.result

    print([instance["ID"] for instance in check_result])
    ```

- PHP

    ```php
    $checkResponse = $b24->core->call('bizproc.workflow.instances', [
        'select' => ['ID'],
        'filter' => ['<STARTED' => '2025-01-01T00:00:00Z'],
    ]);

    foreach ($checkResponse->getResponseData()->getResult() as $instance) {
        echo $instance['ID'] . PHP_EOL;
    }
    ```

- Go

    ```go
    res, err := core.Call(ctx, "bizproc.workflow.instances", b24.Params{
        "select": []string{"ID"},
        "filter": b24.Params{"<STARTED": "2025-01-01T00:00:00Z"},
    }, b24.WithIdempotent())
    if err != nil {
        log.Fatal(err)
    }

    var instances []struct {
        ID string `json:"ID"`
    }
    if err := json.Unmarshal(res.Result, &instances); err != nil {
        log.Fatal(err)
    }

    for _, instance := range instances {
        log.Println(instance.ID)
    }
    ```

{% endlist %}

Сценарий выполнен, если в ответе нет `ID`, которые были переданы в `bizproc.workflow.kill`.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `ACCESS_DENIED` | Метод вызвал не администратор или у вебхука нет scope `bizproc` ||
|| `ERROR_WRONG_WORKFLOW_ID` | В `ID` передано пустое значение или значение не строкового типа ||
|| Пустой массив `result` в шаге 1 | Нет запущенных процессов, которые подходят под фильтр `<STARTED` ||
|| Ошибки при большом объеме данных | Проверьте постраничную выборку и рекомендации по [производительности](../../settings/performance/index.md) ||
|#

Повторяйте сценарий с шага, на котором произошла ошибка. Если ошибка возникла при удалении одного процесса, проверьте его `ID` и продолжайте обработку остальных процессов.

## Что важно учитывать

- `bizproc.workflow.kill` удаляет процесс вместе с данными процесса
- `bizproc.workflow.terminate` останавливает процесс и сохраняет запись о его запуске
- `ID` бизнес-процесса — строка вида `660e559f34af10.95144732`; не преобразуйте его в число
- `bizproc.workflow.instances` возвращает по 50 записей за запрос, поэтому для массовой обработки нужна постраничная выборка

## Продолжите изучение

- [Получить список запущенных бизнес-процессов](../../api-reference/bizproc/bizproc-workflow-instances.md)
- [Удалить запущенный процесс](../../api-reference/bizproc/bizproc-workflow-kill.md)
- [Остановить активный бизнес-процесс](../../api-reference/bizproc/bizproc-workflow-terminate.md)
