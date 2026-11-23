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

- входящий вебхук администратора со scope `bizproc`: примеры инициализируют SDK через вебхук
- дата, до которой нужно найти запущенные процессы. В примерах используется `2025-01-01T00:00:00Z`
- если нужно остановить процессы, а не удалить, замените в примерах `bizproc.workflow.kill` на `bizproc.workflow.terminate`. В PHP типизированный вызов `workflow()->kill(...)` замените на `$b24->core->call('bizproc.workflow.terminate', ['ID' => ...])`: в шаге 2 с `$workflowIds[0]`, в полном примере с `$workflowId`

Перед удалением обязательно проверьте найденные `ID`. Полный пример выводит список и спрашивает подтверждение в том же запуске: удаляются только `ID` из показанного списка, новый поиск перед удалением не выполняется.

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1. Получим список процессов {#workflow-id}

Используем метод [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) с параметрами:

- `filter[<STARTED]` — дата запуска. Префикс `<` отбирает процессы, запущенные до указанного времени
- `select` — поля, которые нужны в сценарии. Достаточно получить `ID` и `STARTED`

Если меняете фильтр, проверьте имя поля и префикс операции: неизвестное поле или операцию метод пропускает без ошибки, и запрос вернет процессы без ограничения по дате. Примеры шага получают первую страницу — до 50 процессов. Для массовой обработки используйте [полный пример](#full-example).

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_WEBHOOK_URL)
    // B24_WEBHOOK_URL = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

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
        domain="your-domain.bitrix24.ru",
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

Примеры ниже удаляют первый процесс из списка без запроса подтверждения. Сначала проверьте его `ID` и дату запуска. Чтобы проверить и подтвердить весь список, используйте [полный пример](#full-example).

{% list tabs %}

- JS

    ```js
    const killResponse = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.kill',
        params: { ID: workflowIds[0] },
        requestId: 'workflow-kill',
    })

    const isKilled = killResponse.getData().result
    ```

- Python

    ```python
    is_killed = client.bizproc.workflow.kill(workflow_ids[0]).response.result
    ```

- PHP

    ```php
    $isKilled = $b24->getBizProcScope()->workflow()
        ->kill($workflowIds[0])
        ->isSuccess();
    ```

- Go

    ```go
    killRes, killErr := core.Call(ctx, "bizproc.workflow.kill", b24.Params{
        "ID": workflowIDs[0],
    })
    if killErr != nil {
        log.Fatal(killErr)
    }

    var isKilled bool
    if err := json.Unmarshal(killRes.Result, &isKilled); err != nil {
        log.Fatal(err)
    }
    log.Println(isKilled)
    ```

{% endlist %}

Успешный ответ содержит `true`. Значение `false` метод не возвращает: если процесс удалить не удалось, придет ошибка. Как ее разобрать — в разделе [Ошибки и диагностика](#errors).

```json
{
    "result": true
}
```

## Пример кода {#full-example}

Во время постраничного поиска работающие процессы могут завершаться, поэтому в список могут попасть не все подходящие процессы. После обработки повторите поиск для нового списка. В примере все найденные процессы сначала выводятся для проверки вместе с датой запуска. Проверьте идентификаторы и даты и подтверждайте удаление, только если все процессы из списка можно удалить. Чтобы удалить их, введите `yes` в ответ на запрос подтверждения, любой другой ответ отменяет удаление.

Установите SDK для выбранного языка: `npm install @bitrix24/b24jssdk`, `pip install b24pysdk`, `composer require bitrix24/b24phpsdk:"^3.0"` или `go get github.com/bitrix24/b24gosdk`. Сохраните пример в файл и передайте адрес вебхука через переменные окружения, а не в коде: `B24_WEBHOOK_URL` для JS, PHP и Go, `B24_DOMAIN` и `B24_WEBHOOK_TOKEN` для Python. JS-пример запускается как ES-модуль, например `node kill.mjs 01.01.2025`, и принимает дату аргументом, как и Go. Python и PHP запрашивают дату при запуске. Граница задается как 00:00 UTC указанной даты. При большом объеме данных учитывайте лимиты REST и рекомендации по [производительности](../../settings/performance/index.md).

{% list tabs %}

- JS

    ```js
    import readline from 'node:readline/promises'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_WEBHOOK_URL)

    const [day, month, year] = (process.argv[2] || '').split('.')
    const isoDate = `${year}-${month}-${day}T00:00:00Z`
    const parsed = new Date(isoDate)
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== isoDate.slice(0, 10)) {
        throw new Error('Введите существующую дату в формате дд.мм.гггг')
    }

    // ID процесса строковый, поэтому страницы обходим через start, а не callList
    const instances = []
    for (let start = 0; ; start += 50) {
        const pageResponse = await $b24.actions.v2.call.make({
            method: 'bizproc.workflow.instances',
            params: {
                select: ['ID', 'STARTED'],
                filter: { '<STARTED': isoDate },
                order: { ID: 'ASC' },
                start,
            },
            requestId: `workflow-instances-${start}`,
        })

        if (!pageResponse.isSuccess) {
            throw new Error(pageResponse.getErrorMessages().join('; '))
        }

        const page = pageResponse.getData().result
        instances.push(...page)
        if (page.length < 50) {
            break
        }
    }

    const workflowIds = instances.map((instance) => instance.ID)

    if (!workflowIds.length) {
        console.log('Процессы не найдены')
        $b24.destroy()
        process.exit(0)
    }

    console.log(`Найдено процессов: ${workflowIds.length}`)
    for (const instance of instances) {
        console.log(`Процесс к удалению: ${instance.ID}, запущен: ${instance.STARTED}`)
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const answer = await rl.question(`Удалить процессы из списка (${workflowIds.length})? Введите yes: `)
    rl.close()

    if (answer.trim() !== 'yes') {
        console.log('Удаление отменено')
        $b24.destroy()
        process.exit(0)
    }

    for (const workflowId of workflowIds) {
        try {
            const killResponse = await $b24.actions.v2.call.make({
                method: 'bizproc.workflow.kill',
                params: { ID: workflowId },
                requestId: `workflow-kill-${workflowId}`,
            })

            console.log(killResponse.isSuccess
                ? `Процесс ${workflowId} удален`
                : `Ошибка при удалении ${workflowId}: ${killResponse.getErrorMessages().join('; ')}`)
        } catch (error) {
            console.log(`Ошибка при удалении ${workflowId}: ${error.message}`)
        }
    }

    $b24.destroy()
    ```

- Python

    ```python
    import os
    import sys
    from datetime import datetime

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    user_date_input = input("Введите дату в формате дд.мм.гггг: ")
    try:
        date = datetime.strptime(user_date_input, "%d.%m.%Y")
    except ValueError:
        raise SystemExit("Введите существующую дату в формате дд.мм.гггг")

    iso_date = date.strftime("%Y-%m-%dT00:00:00Z")

    token = BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],  # your-domain.bitrix24.ru
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],  # user_id/webhook_key
    )
    client = Client(token)

    start = None
    workflow_ids = []
    started = {}
    while True:
        params = {
            "select": ["ID", "STARTED"],
            "filter": {"<STARTED": iso_date},
            "order": {"ID": "ASC"},
        }
        if start is not None:
            params["start"] = start

        response = client.bizproc.workflow.instances(**params).response
        for instance in response.result or []:
            workflow_ids.append(instance["ID"])
            started[instance["ID"]] = instance["STARTED"]

        if response.next is None:
            break
        start = response.next

    if not workflow_ids:
        print("Процессы не найдены")
        sys.exit(0)

    print(f"Найдено процессов: {len(workflow_ids)}")
    for workflow_id in workflow_ids:
        print(f"Процесс к удалению: {workflow_id}, запущен: {started[workflow_id]}")

    answer = input(f"Удалить процессы из списка ({len(workflow_ids)})? Введите yes: ")
    if answer.strip() != "yes":
        print("Удаление отменено")
        sys.exit(0)

    for workflow_id in workflow_ids:
        try:
            client.bizproc.workflow.kill(workflow_id).response
        except BitrixAPIError as error:
            print(f"Ошибка при удалении процесса {workflow_id}: {error}")
        else:
            print(f"Процесс {workflow_id} удален")
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_WEBHOOK_URL'));

    $userDateInput = (string)readline('Введите дату в формате дд.мм.гггг: ');
    $date = DateTimeImmutable::createFromFormat('!d.m.Y', $userDateInput);
    if ($date === false || $date->format('d.m.Y') !== $userDateInput) {
        throw new InvalidArgumentException('Введите существующую дату в формате дд.мм.гггг');
    }

    $isoDate = $date->format('Y-m-d') . 'T00:00:00Z';
    $workflowIds = [];
    $started = [];
    $start = 0;

    do {
        $response = $b24->core->call('bizproc.workflow.instances', [
            'select' => ['ID', 'STARTED'],
            'filter' => ['<STARTED' => $isoDate],
            'order' => ['ID' => 'ASC'],
            'start' => $start,
        ]);

        foreach ($response->getResponseData()->getResult() as $instance) {
            $workflowIds[] = $instance['ID'];
            $started[$instance['ID']] = $instance['STARTED'];
        }

        $start = $response->getResponseData()->getPagination()->getNextItem();
    } while ($start !== null);

    if ($workflowIds === []) {
        echo "Процессы не найдены\n";
        exit;
    }

    echo "Найдено процессов: " . count($workflowIds) . "\n";
    foreach ($workflowIds as $workflowId) {
        echo "Процесс к удалению: {$workflowId}, запущен: {$started[$workflowId]}\n";
    }

    $answer = readline('Удалить процессы из списка (' . count($workflowIds) . ')? Введите yes: ');
    if (trim((string)$answer) !== 'yes') {
        echo "Удаление отменено\n";
        exit;
    }

    foreach ($workflowIds as $workflowId) {
        try {
            $b24->getBizProcScope()->workflow()->kill($workflowId);
            echo "Процесс {$workflowId} удален\n";
        } catch (BaseException $e) {
            echo "Ошибка при удалении процесса {$workflowId}: {$e->getMessage()}\n";
        }
    }
    ```

- Go

    ```go
    // Подготовка в пустом каталоге:
    //  go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //  B24_WEBHOOK_URL="https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/" go run main.go 01.01.2025

    package main

    import (
        "bufio"
        "context"
        "encoding/json"
        "fmt"
        "os"
        "strings"
        "time"

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

        date, err := time.Parse("02.01.2006", os.Args[1])
        if err != nil {
            return fmt.Errorf("введите существующую дату в формате дд.мм.гггг")
        }

        isoDate := date.Format("2006-01-02") + "T00:00:00Z"
        ctx := context.Background()
        core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

        workflows, err := getWorkflows(ctx, core, isoDate)
        if err != nil {
            return err
        }

        workflowIDs := make([]string, 0, len(workflows))
        for _, workflow := range workflows {
            workflowIDs = append(workflowIDs, workflow.ID)
        }

        if len(workflowIDs) == 0 {
            fmt.Println("Процессы не найдены")
            return nil
        }

        fmt.Printf("Найдено процессов: %d\n", len(workflowIDs))
        for _, workflow := range workflows {
            fmt.Printf("Процесс к удалению: %s, запущен: %s\n", workflow.ID, workflow.Started)
        }

        fmt.Printf("Удалить процессы из списка (%d)? Введите yes: ", len(workflowIDs))
        answer, _ := bufio.NewReader(os.Stdin).ReadString('\n')
        if strings.TrimSpace(answer) != "yes" {
            fmt.Println("Удаление отменено")
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

    func getWorkflows(ctx context.Context, core *b24.Core, isoDate string) ([]workflowInstance, error) {
        workflows := []workflowInstance{}

        for start := 0; ; start += 50 {
            res, err := core.Call(ctx, "bizproc.workflow.instances", b24.Params{
                "select": []string{"ID", "STARTED"},
                "filter": b24.Params{"<STARTED": isoDate},
                "order":  b24.Params{"ID": "ASC"},
                "start":  start,
            }, b24.WithIdempotent())
            if err != nil {
                return nil, fmt.Errorf("bizproc.workflow.instances: %w", err)
            }

            var instances []workflowInstance
            if err := json.Unmarshal(res.Result, &instances); err != nil {
                return nil, fmt.Errorf("decode bizproc.workflow.instances: %w", err)
            }

            workflows = append(workflows, instances...)

            if len(instances) < 50 {
                break
            }
        }

        return workflows, nil
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

Через REST повторите запрос [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) с тем же фильтром и проверьте, что в ответе нет удаленных `ID`. Запрос ниже проверяет первую страницу, для всех страниц используйте полный пример и откажитесь от удаления.

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
    checkRes, checkErr := core.Call(ctx, "bizproc.workflow.instances", b24.Params{
        "select": []string{"ID"},
        "filter": b24.Params{"<STARTED": "2025-01-01T00:00:00Z"},
    }, b24.WithIdempotent())
    if checkErr != nil {
        log.Fatal(checkErr)
    }

    var checkInstances []struct {
        ID string `json:"ID"`
    }
    if err := json.Unmarshal(checkRes.Result, &checkInstances); err != nil {
        log.Fatal(err)
    }

    for _, instance := range checkInstances {
        log.Println(instance.ID)
    }
    ```

{% endlist %}

Сценарий выполнен, если среди результатов на всех страницах нет `ID`, которые были переданы в `bizproc.workflow.kill`.

## Ошибки и диагностика {#errors}

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `ACCESS_DENIED` | Метод вызвал пользователь без прав администратора. Создайте вебхук от имени администратора и повторите запрос ||
|| `insufficient_scope` | У вебхука или приложения нет scope `bizproc`. Добавьте scope в настройках вебхука или приложения ||
|| `ERROR_WRONG_WORKFLOW_ID` | В `ID` передано пустое значение или значение не строкового типа ||
|| Пустой код ошибки и `Бизнес-процесс не найден` | Процесса с таким `ID` нет: его уже удалили, например при повторном запуске сценария, или `ID` скопирован с ошибкой. Пропустите этот `ID` и продолжайте обработку остальных ||
|| Пустой массив `result` в шаге 1 | Нет запущенных процессов, которые подходят под фильтр `<STARTED` ||
|#

Если запрос не выполнен из-за ошибки соединения или авторизации, проверьте доступность Битрикс24 и адрес вебхука, затем повторите поиск и заново проверьте список перед подтверждением.

Повторяйте сценарий с шага, на котором произошла ошибка. Если ошибка возникла при удалении одного процесса, проверьте его `ID` и продолжайте обработку остальных процессов.

## Что важно учитывать

- `bizproc.workflow.instances` возвращает по 50 записей за запрос, поэтому для массовой обработки нужна постраничная выборка. По умолчанию список отсортирован по `MODIFIED`, а у работающих процессов это поле меняется, поэтому в примерах задана сортировка по `ID`. Метод `callList.make()` из b24jssdk для этого списка не подходит: он приводит `ID` к числу, а `ID` процесса строковый

## Продолжите изучение

- [Получить список запущенных бизнес-процессов](../../api-reference/bizproc/bizproc-workflow-instances.md)
- [Удалить запущенный процесс](../../api-reference/bizproc/bizproc-workflow-kill.md)
- [Остановить активный бизнес-процесс](../../api-reference/bizproc/bizproc-workflow-terminate.md)
