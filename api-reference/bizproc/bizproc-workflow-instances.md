# Получить список запущенных бизнес-процессов bizproc.workflow.instances

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список запущенных бизнес-процессов.

{% note info "bizproc.workflow.instance.list" %}

Существует старый метод `bizproc.workflow.instance.list` — алиас метода `bizproc.workflow.instances`. Он принимает те же параметры и возвращает такие же результаты.

Поддержка `bizproc.workflow.instance.list` не гарантирована в будущем, поэтому рекомендуем использовать `bizproc.workflow.instances`.

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../data-types.md) | Массив содержит список полей, которые необходимо выбрать.

Можно указать только те поля, которые необходимы.

Доступные поля:
- `ID` — идентификатор бизнес-процесса
- `MODIFIED` — дата последнего изменения
- `OWNED_UNTIL` — время блокировки бизнес-процесса. Процесс считается зависшим, если разница времени блокировки с текущим временем более 5 минут
- `MODULE_ID` — идентификатор модуля по документу
- `ENTITY` — идентификатор сущности по документу
- `DOCUMENT_ID` — идентификатор документа
- `STARTED` — дата запуска бизнес-процесса
- `STARTED_BY` — кем запущен бизнес-процесс
- `TEMPLATE_ID` — идентификатор шаблона бизнес-процесса

Значение по умолчанию: `['ID', 'MODIFIED', 'OWNED_UNTIL']` ||
|| **FILTER**
[`object`](../data-types.md) | Объект для фильтрации списка запущенных бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Список фильтруемых полей такой же, как для параметра `SELECT`.

Перед названием фильтруемого поля можно указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно | ||
|| **ORDER**
[`object`](../data-types.md) | Объект для сортировки списка запущенных бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Список полей для сортировки такой же, как для параметра `SELECT`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Значение по умолчанию: `{'MODIFIED': 'desc'}` ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","MODIFIED","OWNED_UNTIL","MODULE_ID","ENTITY","DOCUMENT_ID","STARTED","STARTED_BY","TEMPLATE_ID"],"order":{"STARTED":"DESC"},"filter":{">STARTED_BY":0}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.instances
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
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching workflow instances: ' . $e->getMessage();
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":[
        {
            "DOCUMENT_ID": "LEAD_1",
            "ENTITY": "CCrmDocumentLead",
            "ID": "66e412fdc9bd44.36306599",
            "STARTED": "2024-09-13T10:25:01+00:00",
            "MODULE_ID": "crm",
            "OWNED_UNTIL": null,
            "TEMPLATE_ID": "1",
            "STARTED_BY": "0",
        },
        {
            "DOCUMENT_ID":"DEAL_1633",
            "ENTITY":"CCrmDocumentDeal",
            "ID":"658c4d3d6a2906.51542462",
            "STARTED":"2023-12-27T19:13:49+03:00",
            "MODULE_ID":"crm",
            "OWNED_UNTIL":null,
            "TEMPLATE_ID":"212",
            "STARTED_BY":"57",
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
        "operating": 0,
    },
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о запущенных бизнес-процессах ||
|| **total**
[`inreger`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

 
## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!",
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** |**Код** | **Описание** | **Значение** ||
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