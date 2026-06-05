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

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'bizproc.workflow.instances',
        {
            filter: {
                '<STARTED': '2025-01-01T00:00:00Z'
            }
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.instances',
        [
            'filter' => [
                '<STARTED' => '2025-01-01T00:00:00Z'
            ]
        ]
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

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
        },
        {
            "ID": "66ea9200131729.26195442",
            "MODIFIED": "2024-09-18T11:42:28+03:00",
            "OWNED_UNTIL": null
        },
        {
            "ID": "65ef0868368978.47049110",
            "MODIFIED": "2024-03-11T16:34:32+03:00",
            "OWNED_UNTIL": null
        }
    ],
    "total": 4,
}
```

## 2. Завершим бизнес-процессы 

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:
- `ID` — идентификатор процесса, передаем `ID`, полученный на [шаге 1](#workflow_id)

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'bizproc.workflow.kill',
        {
            ID: '660e559f34af10.95144732',
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.kill',
        [
            'ID' => '660e559f34af10.95144732'
        ]
    );
    ```

- Python

    ```python
    response = client.bizproc.workflow.kill(
        bitrix_id="660e559f34af10.95144732",
    ).response
    ```

{% endlist %}

В результате получим `true`, удаление процесса прошло успешно. Если  вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md).

```json
{
    "result": true,
}
```

## Пример кода

В примере все найденные процессы удаляются в цикле. При удалении большого объема данных возможны ограничения на выполнение запросов. Чтобы оптимизировать код под ваш объем работы, используйте рекомендации раздела [Производительность](../../settings/performance/index.md).

{% list tabs %}

- JS
  
    ```javascript  
    // Функция для преобразования даты из формата дд.мм.гггг в формат ISO
    function convertDateToISO(dateString) {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}T00:00:00Z`;
    }

    // Запрос даты у пользователя
    const userDateInput = prompt("Введите дату в формате дд.мм.гггг:");
    const isoDate = convertDateToISO(userDateInput);

    // Вызов метода bizproc.workflow.instances с фильтром по дате
    BX24.callMethod(
        'bizproc.workflow.instances',
        {
            filter: {
                '<STARTED': isoDate
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                const instances = result.data();
                instances.forEach(instance => {
                    const instanceId = instance.ID;
                    
                    // Вызов метода bizproc.workflow.kill для каждого ID
                    BX24.callMethod(
                        'bizproc.workflow.kill',
                        {
                            ID: instanceId
                        },
                        function(killResult) {
                            if (killResult.error()) {
                                console.error(`Ошибка при удалении процесса ${instanceId}:`, killResult.error());
                            } else {
                                console.log(`Процесс ${instanceId} успешно удален.`);
                            }
                        }
                    );
                });

                if (result.more()) {
                    result.next();
                }
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Функция для преобразования даты из формата дд.мм.гггг в формат ISO
    function convertDateToISO($dateString) {
        list($day, $month, $year) = explode('.', $dateString);
        return "{$year}-{$month}-{$day}T00:00:00Z";
    }

    // Запрос даты у пользователя
    $userDateInput = readline("Введите дату в формате дд.мм.гггг: ");
    $isoDate = convertDateToISO($userDateInput);

    // Вызов метода bizproc.workflow.instances с фильтром по дате
    $result = CRest::call(
        'bizproc.workflow.instances',
        [
            'filter' => [
                '<STARTED' => $isoDate
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo "Error: " . $result['error_description'];
    } else {
        $instances = $result['result'];
        foreach ($instances as $instance) {
            $instanceId = $instance['ID'];

            // Вызов метода bizproc.workflow.kill для каждого ID
            $killResult = CRest::call(
                'bizproc.workflow.kill',
                [
                    'ID' => $instanceId
                ]
            );

            if (!empty($killResult['error'])) {
                echo "Ошибка при удалении процесса {$instanceId}: " . $killResult['error_description'] . "\n";
            } else {
                echo "Процесс {$instanceId} успешно удален.\n";
            }
        }

        // Проверка на наличие дополнительных данных
        while (!empty($result['next'])) {
            $result = CRest::call(
                'bizproc.workflow.instances',
                [
                    'filter' => [
                        '<STARTED' => $isoDate
                    ],
                    'start' => $result['next']
                ]
            );

            $instances = $result['result'];
            foreach ($instances as $instance) {
                $instanceId = $instance['ID'];

                // Вызов метода bizproc.workflow.kill для каждого ID
                $killResult = CRest::call(
                    'bizproc.workflow.kill',
                    [
                        'ID' => $instanceId
                    ]
                );

                if (!empty($killResult['error'])) {
                    echo "Ошибка при удалении процесса {$instanceId}: " . $killResult['error_description'] . "\n";
                } else {
                    echo "Процесс {$instanceId} успешно удален.\n";
                }
            }
        }
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    user_date_input = input("Введите дату в формате дд.мм.гггг: ")
    day, month, year = user_date_input.split(".")
    iso_date = f"{year}-{month}-{day}T00:00:00Z"

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

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
                client.bizproc.workflow.kill(bitrix_id=instance_id).response
            except BitrixAPIError as error:
                print(f"Ошибка при удалении процесса {instance_id}: {error}")
            else:
                print(f"Процесс {instance_id} успешно удален.")

        if response.next is None:
            break
        start = response.next
    ```

{% endlist %}
