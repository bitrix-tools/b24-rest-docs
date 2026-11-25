# Получить список запущенных бизнес-процессов bizproc.workflow.instances

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `bizproc.workflow.instances` получает список запущенных бизнес-процессов. В список попадают только выполняющиеся процессы: после завершения или остановки запись о процессе удаляется.

{% note info "bizproc.workflow.instance.list" %}

Метод также доступен под именем `bizproc.workflow.instance.list`. Оба имени вызывают один обработчик, принимают одинаковые параметры и возвращают одинаковый результат.

{% endnote %}

## Параметры метода

Все параметры необязательные.

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../data-types.md) | Массив содержит список полей, которые необходимо выбрать.

Можно указать только те поля, которые необходимы.

Доступные поля:
- `ID` — идентификатор бизнес-процесса
- `MODIFIED` — дата последнего изменения
- `OWNED_UNTIL` — время блокировки бизнес-процесса. Процесс считается зависшим, если это время наступило более 5 минут назад
- `MODULE_ID` — идентификатор модуля по документу
- `ENTITY` — идентификатор сущности по документу
- `DOCUMENT_ID` — идентификатор документа
- `STARTED` — дата запуска бизнес-процесса
- `STARTED_BY` — кем запущен бизнес-процесс. Для процессов, которые запустили роботы и триггеры стадий, — `0`
- `TEMPLATE_ID` — идентификатор шаблона бизнес-процесса

Значение по умолчанию: `['ID', 'MODIFIED', 'OWNED_UNTIL']` ||
|| **FILTER**
[`object`](../data-types.md) | Объект для фильтрации списка запущенных бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Список фильтруемых полей такой же, как для параметра `SELECT`.

Перед названием фильтруемого поля можно указать тип фильтрации:
- `=` — равно
- `!` или `!=` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно

Без префикса фильтр сравнивает значение на равенство. Название поля можно передавать в любом регистре.

Значение поля — строка, число или массив таких значений. Массив выбирает записи с любым из перечисленных значений, а с префиксом `!` или `!=` исключает их.

Поля и типы фильтрации, которых нет в списке, метод пропускает без ошибки. ||
|| **ORDER**
[`object`](../data-types.md) | Объект для сортировки списка запущенных бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Список полей для сортировки такой же, как для параметра `SELECT`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Любое другое значение метод считает `asc`.

Значение по умолчанию: `{'MODIFIED': 'desc'}` ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы.

Передайте `start: -1`, чтобы получить первую страницу без подсчета общего количества. В этом режиме `total` равен `0` и не отражает число найденных записей ||
|#

При постраничном обходе учитывайте, что `MODIFIED` меняется во время работы процесса. Чтобы уменьшить риск пропуска или повторного получения записей из-за изменения порядка, задайте сортировку по `ID`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","MODIFIED","OWNED_UNTIL","MODULE_ID","ENTITY","DOCUMENT_ID","STARTED","STARTED_BY","TEMPLATE_ID"],"order":{"STARTED":"DESC"},"filter":{">STARTED_BY":0}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.workflow.instances
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","MODIFIED","OWNED_UNTIL","MODULE_ID","ENTITY","DOCUMENT_ID","STARTED","STARTED_BY","TEMPLATE_ID"],"order":{"STARTED":"DESC"},"filter":{">STARTED_BY":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.instances
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.instances',
    		{
    			select: [
    				'ID',
    				'MODIFIED',
    				'OWNED_UNTIL',
    				'MODULE_ID',
    				'ENTITY',
    				'DOCUMENT_ID',
    				'STARTED',
    				'STARTED_BY',
    				'TEMPLATE_ID'
    			],
    			order: {
    				STARTED: 'DESC'
    			},
    			filter: {
    				'>STARTED_BY': 0
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.workflow.instances(
            select=[
                "ID",
                "MODIFIED",
                "OWNED_UNTIL",
                "MODULE_ID",
                "ENTITY",
                "DOCUMENT_ID",
                "STARTED",
                "STARTED_BY",
                "TEMPLATE_ID",
            ],
            order={
                "STARTED": "DESC",
            },
            filter={
                ">STARTED_BY": 0,
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.workflow.instances',
                [
                    'select' => [
                        'ID',
                        'MODIFIED',
                        'OWNED_UNTIL',
                        'MODULE_ID',
                        'ENTITY',
                        'DOCUMENT_ID',
                        'STARTED',
                        'STARTED_BY',
                        'TEMPLATE_ID'
                    ],
                    'order' => [
                        'STARTED' => 'DESC'
                    ],
                    'filter' => [
                        '>STARTED_BY' => 0
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
        'bizproc.workflow.instances',
        {
            select: [
                'ID',
                'MODIFIED',
                'OWNED_UNTIL',
                'MODULE_ID',
                'ENTITY',
                'DOCUMENT_ID',
                'STARTED',
                'STARTED_BY',
                'TEMPLATE_ID'
            ],
            order: {
                STARTED: 'DESC'
            },
            filter: {
                '>STARTED_BY': 0
            }
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.instances',
        [
            'select' => [
                'ID',
                'MODIFIED',
                'OWNED_UNTIL',
                'MODULE_ID',
                'ENTITY',
                'DOCUMENT_ID',
                'STARTED',
                'STARTED_BY',
                'TEMPLATE_ID'
            ],
            'order' => [
                'STARTED' => 'DESC'
            ],
            'filter' => [
                '>STARTED_BY' => 0
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.workflow.instances", b24.Params{
    	"SELECT": []string{"ID", "MODIFIED", "OWNED_UNTIL", "MODULE_ID", "ENTITY", "DOCUMENT_ID", "STARTED", "STARTED_BY", "TEMPLATE_ID"},
    	"ORDER": b24.Params{
    		"STARTED": "DESC",
    	},
    	"FILTER": b24.Params{
    		">STARTED_BY": 0,
    	},
    })
    if err != nil {
    	return fmt.Errorf("bizproc.workflow.instances: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "DOCUMENT_ID": "LEAD_1",
            "ENTITY": "CCrmDocumentLead",
            "ID": "66e412fdc9bd44.36306599",
            "MODIFIED": "2024-09-13T10:25:01+00:00",
            "STARTED": "2024-09-13T10:25:01+00:00",
            "MODULE_ID": "crm",
            "OWNED_UNTIL": null,
            "TEMPLATE_ID": "1",
            "STARTED_BY": "57"
        },
        {
            "DOCUMENT_ID": "DEAL_1633",
            "ENTITY": "CCrmDocumentDeal",
            "ID": "658c4d3d6a2906.51542462",
            "MODIFIED": "2023-12-27T19:13:49+03:00",
            "STARTED": "2023-12-27T19:13:49+03:00",
            "MODULE_ID": "crm",
            "OWNED_UNTIL": null,
            "TEMPLATE_ID": "212",
            "STARTED_BY": "57"
        }
    ],
    "total": 2,
    "time": {
        "start": 1726476060.581428,
        "finish": 1726476060.813776,
        "duration": 0.23234796524047852,
        "processing": 0.002630949020385742,
        "date_start": "2024-09-16T08:41:00+00:00",
        "date_finish": "2024-09-16T08:41:00+00:00",
        "operating_reset_at": 1726476660,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив объектов с полями бизнес-процессов, указанными в `SELECT` [(подробное описание)](#result) ||
|| **next**
[`integer`](../data-types.md) | Значение `start` для получения следующей страницы. Возвращается, если есть следующая страница. При `start: -1` поле не указывает на следующую страницу ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор бизнес-процесса ||
|| **MODIFIED**
[`datetime`](../data-types.md) | Дата последнего изменения ||
|| **OWNED_UNTIL**
[`datetime`](../data-types.md) | Время блокировки бизнес-процесса. Если блокировки нет — `null` ||
|| **MODULE_ID**
[`string`](../data-types.md) | Идентификатор модуля документа, например `crm` ||
|| **ENTITY**
[`string`](../data-types.md) | Идентификатор объекта документа, например `CCrmDocumentDeal` ||
|| **DOCUMENT_ID**
[`string`](../data-types.md) | Идентификатор документа, например `DEAL_1633` ||
|| **STARTED**
[`datetime`](../data-types.md) | Дата запуска бизнес-процесса ||
|| **STARTED_BY**
[`string`](../data-types.md) | Идентификатор пользователя, который запустил процесс. Для процессов, которые запустили роботы и триггеры, — `0` ||
|| **TEMPLATE_ID**
[`string`](../data-types.md) | Идентификатор шаблона бизнес-процесса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** |**Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_SELECT_VALIDATION_FAILURE` | Invalid data in SELECT parameter | Элемент массива `SELECT` не является скалярным значением ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод запустил не администратор ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-start.md)
- [{#T}](./bizproc-workflow-terminate.md)
- [{#T}](./bizproc-workflow-kill.md)
- [{#T}](../../tutorials/bizproc/how-to-kill-workflows.md)
- [{#T}](../../tutorials/bizproc/how-to-filter-and-kill-workflows.md)