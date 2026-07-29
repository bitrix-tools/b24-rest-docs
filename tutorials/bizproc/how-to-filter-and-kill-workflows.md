# Как массово завершить бизнес-процессы с фильтром по дате

> Scope: [`bizproc`](../../api-reference/scopes/permissions.md)
> 
> Кто может выполнять методы: администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В процессе работы с Битрикс24 могут накапливаться зависшие бизнес-процессы или процессы, которые остаются в статусе «Выполняется» слишком долго и становятся неактуальными.

Чтобы массово завершить старые бизнес-процессы, последовательно выполним два метода:
1. [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) — получим отфильтрованный список процессов
2. [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) — завершим бизнес-процессы с удалением данных. Если нужно сохранить факт запуска бизнес-процесса, используйте метод [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Оба метода вызываются одинаково

## 1. Получим список процессов {#workflow_id}

Используем метод [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md) с фильтром:

- `<STARTED` — укажем дату запуска с префиксом `<`, будут отобраны только те процессы, которые были запущены до этой даты

{% list tabs %}

- JS
  
    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.instances',
        params: {
            filter: { '<STARTED': '2025-01-01T00:00:00Z' },
        },
        requestId: 'workflow-instances',
    })

    const instances = response.getData().result
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

    $instances = $b24->getBizProcScope()->workflow()->instances(
        filter: ['<STARTED' => '2025-01-01T00:00:00Z']
    )->getInstances();
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    response = client.bizproc.workflow.instances(
        filter={
            "<STARTED": "2025-01-01T00:00:00Z",
        }
    ).response
    ```

{% endlist %}

В результате получим `ID` всех активных бизнес-процессов, запущенных до указанной даты.

```json
{
    "result": [
        {
            "ID": "660e559f34af10.95144732",
            "MODIFIED": "2024-12-04T10:04:24+03:00",
            "OWNED_UNTIL": null
        },
        {
            "ID": "6639c7b59e9eb5.40607056",
            "MODIFIED": "2024-12-04T09:52:40+03:00",
            "OWNED_UNTIL": null
        }
    ],
    "total": 2,
}
```

## 2. Завершим бизнес-процессы 

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:
- `ID` — идентификатор процесса, передаем `ID`, полученный на [шаге 1](#workflow_id)

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.workflow.kill',
        params: { ID: '660e559f34af10.95144732' },
        requestId: 'workflow-kill',
    })

    const isKilled = response.getData().result
    ```

- PHP

    ```php
    $isKilled = $b24->getBizProcScope()->workflow()
        ->kill('660e559f34af10.95144732')
        ->isSuccess();
    ```

- Python

    ```python
    # ID процесса — строка, поэтому вызываем метод напрямую через token.call_method
    # (типизированный client.bizproc.workflow.kill ожидает int)
    response = token.call_method(
        "bizproc.workflow.kill",
        {"ID": "660e559f34af10.95144732"},
    )
    ```

{% endlist %}

В результате получим `true`, удаление процесса прошло успешно. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md).

```json
{
    "result": true,
}
```

## Пример кода

В примере все найденные процессы удаляются в цикле. При удалении большого объема данных возможны ограничения на выполнение запросов. Чтобы оптимизировать код под ваш объем работы, используйте рекомендации раздела [Производительность](../../settings/performance/index.md).

{% list tabs %}

- JS
  
    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    // Дату вводим в формате дд.мм.гггг аргументом: node kill.mjs 01.01.2025
    const [day, month, year] = (process.argv[2] || '').split('.')
    const isoDate = `${year}-${month}-${day}T00:00:00Z`

    // callList сам обходит все страницы выборки; getData() возвращает массив элементов
    const listResponse = await $b24.actions.v2.callList.make({
        method: 'bizproc.workflow.instances',
        params: { filter: { '<STARTED': isoDate }, select: ['ID'] },
        requestId: 'workflow-instances',
    })

    const instances = listResponse.getData()

    for (const instance of instances) {
        const response = await $b24.actions.v2.call.make({
            method: 'bizproc.workflow.kill',
            params: { ID: instance.ID },
            requestId: `kill-${instance.ID}`,
        })
        console.log(response.isSuccess
            ? `Процесс ${instance.ID} успешно удален.`
            : `Ошибка при удалении процесса ${instance.ID}: ${response.getErrorMessages().join('; ')}`)
    }

    $b24.destroy()
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

    $userDateInput = readline('Введите дату в формате дд.мм.гггг: ');
    [$day, $month, $year] = explode('.', $userDateInput);
    $isoDate = "{$year}-{$month}-{$day}T00:00:00Z";

    // Метод instances() возвращает одну страницу. Для постраничного обхода
    // вызываем метод напрямую через ядро и читаем смещение следующей страницы.
    $start = 0;
    do {
        $response = $b24->core->call('bizproc.workflow.instances', [
            'filter' => ['<STARTED' => $isoDate],
            'start' => $start,
        ]);

        foreach ($response->getResponseData()->getResult() as $instance) {
            $isKilled = $b24->getBizProcScope()->workflow()->kill($instance['ID'])->isSuccess();
            echo $isKilled
                ? "Процесс {$instance['ID']} успешно удален.\n"
                : "Ошибка при удалении процесса {$instance['ID']}\n";
        }

        $start = $response->getResponseData()->getPagination()->getNextItem();
    } while ($start !== null);
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    user_date_input = input("Введите дату в формате дд.мм.гггг: ")
    day, month, year = user_date_input.split(".")
    iso_date = f"{year}-{month}-{day}T00:00:00Z"

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    start = None
    while True:
        kwargs = {"filter": {"<STARTED": iso_date}}
        if start is not None:
            kwargs["start"] = start

        response = client.bizproc.workflow.instances(**kwargs).response
        instances = response.result or []

        for instance in instances:
            instance_id = instance["ID"]
            try:
                token.call_method("bizproc.workflow.kill", {"ID": instance_id})
            except BitrixAPIError as error:
                print(f"Ошибка при удалении процесса {instance_id}: {error}")
            else:
                print(f"Процесс {instance_id} успешно удален.")

        if response.next is None:
            break
        start = response.next
    ```

{% endlist %}
