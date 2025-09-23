# Получить список шаблонов bizproc.workflow.template.list

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список шаблонов бизнес-процессов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../data-types.md) | Массив содержит список [полей](#fields), которые необходимо выбрать.

Можно указать только те поля, которые необходимы.

Значение по умолчанию — `['ID']` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации списка шаблонов бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) шаблона для фильтра
- `value_N` — значение поля

Перед названием фильтруемого поля можно указать тип фильтрации:
- `!` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно | ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки списка запущенных бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) шаблона для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Можно указать несколько полей для сортировки, например, `{NAME: 'ASC', ID: 'DESC'}`.

Значение по умолчанию — `{ID: 'ASC'}` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

### Поля шаблона {#fields}

#|
|| **Название**
`тип` | **Описание**||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор шаблона бизнес-процесса ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля по документу. Возможные значения:
- `crm` — CRM
- `lists` — универсальные списки
- `disk` — диск ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор объекта по документу. Возможные значения:

CRM
- `CCrmDocumentLead` — лиды
- `CCrmDocumentContact` — контакты
- `CCrmDocumentCompany` — компании
- `CCrmDocumentDeal` — сделки
- `Bitrix\Crm\Integration\BizProc\Document\Quote` — коммерческие предложения
- `Bitrix\Crm\Integration\BizProc\Document\SmartInvoice` — счета
- `Bitrix\Crm\Integration\BizProc\Document\Dynamic` — смарт-процессы

Списки
- `BizprocDocument` — процессы в ленте новостей
- `Bitrix\Lists\BizprocDocumentLists` — списки в группах

Диск
- `Bitrix\Disk\BizProcDocument` ||
|| **DOCUMENT_TYPE**
[`integer`](../../data-types.md) | Тип документа. Возможные значения:
crm:
- `LEAD` — лиды
- `CONTACT` — контакты
- `COMPANY` — компании
- `DEAL` — сделки
- `QUOTE` — коммерческие предложения
- `SMART_INVOICE` — счета
- `DYNAMIC_XXX` — смарт-процессы, где XXX — идентификатор смарт-процесса

списки:
- `iblock_XXX` — информационный блок, где XXX — идентификатор информационного блока

диск:
- `STORAGE_XXX` — хранилище диска, где XXX — идентификатор хранилища
 ||
|| **AUTO_EXECUTE**
[`integer`](../../data-types.md) | Флаг автозапуска. Может принимать значения:

- `0` — без автозапуска
- `1` — запуск на создание
- `2` — запуск на изменение
- `3` — запуск на создание и изменение
||
|| **NAME**
[`string`](../../data-types.md) | Название шаблона ||
|| **TEMPLATE**
[`array`](../../data-types.md) | Массив с описанием структуры действий шаблона ||
|| **PARAMETERS**
[`array`](../../data-types.md) | Параметры шаблона ||
|| **VARIABLES**
[`array`](../../data-types.md) | Переменные шаблона ||
|| **CONSTANTS**
[`array`](../../data-types.md) | Константы шаблона ||
|| **MODIFIED**
[`datetime`](../../data-types.md) | Дата последнего изменения ||
|| **IS_MODIFIED**
[`boolean`](../../data-types.md) | Был ли изменен шаблон. Возможные значения:
- `Y` — да, был изменен
- `N` — нет

Опция нужна для [типовых шаблонов](https://helpdesk.bitrix24.ru/open/5415841/) бизнес-процессов ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал или изменил шаблон ||
|| **SYSTEM_CODE**
[`string`](../../data-types.md) | Системный код шаблона.

Нужен для идентификации шаблонов типовых бизнес-процессов или шаблонов, созданных приложением ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","NAME","USER_ID","SYSTEM_CODE"],"filter":{"MODULE_ID":"lists","AUTO_EXECUTE":0},"order":{"ID":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.template.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","NAME","USER_ID","SYSTEM_CODE"],"filter":{"MODULE_ID":"lists","AUTO_EXECUTE":0},"order":{"ID":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        select: [
            'ID',
            'NAME',
            'USER_ID',
            'SYSTEM_CODE'
        ],
        filter: {
            MODULE_ID: 'lists',
            AUTO_EXECUTE: 0
        },
        order: {
            ID: 'DESC'
        }
    };
    
    try {
        const response = await $b24.callListMethod('bizproc.workflow.template.list', parameters);
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
        const generator = $b24.fetchListMethod('bizproc.workflow.template.list', parameters, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
        const response = await $b24.callMethod('bizproc.workflow.template.list', parameters, 0);
        const result = response.getData().result || [];
        for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    ```

- PHP

	```php
	try {
		$result = $serviceBuilder
			->getBizProcScope()
			->template()
			->list(
				['ID', 'MODULE_ID', 'ENTITY', 'DOCUMENT_TYPE', 'AUTO_EXECUTE', 'NAME', 'TEMPLATE', 'PARAMETERS', 'VARIABLES', 'CONSTANTS', 'MODIFIED', 'IS_MODIFIED', 'USER_ID', 'SYSTEM_CODE'],
				[]
			);
		foreach ($result->getTemplates() as $template) {
			print("ID: " . $template->ID . "\n");
			print("MODULE_ID: " . $template->MODULE_ID . "\n");
			print("ENTITY: " . $template->ENTITY . "\n");
			print("DOCUMENT_TYPE: " . json_encode($template->DOCUMENT_TYPE) . "\n");
			print("AUTO_EXECUTE: " . ($template->AUTO_EXECUTE ? $template->AUTO_EXECUTE->value : 'null') . "\n");
			print("NAME: " . $template->NAME . "\n");
			print("TEMPLATE: " . json_encode($template->TEMPLATE) . "\n");
			print("PARAMETERS: " . json_encode($template->PARAMETERS) . "\n");
			print("VARIABLES: " . json_encode($template->VARIABLES) . "\n");
			print("CONSTANTS: " . json_encode($template->CONSTANTS) . "\n");
			print("MODIFIED: " . ($template->MODIFIED ? $template->MODIFIED->format(DATE_ATOM) : 'null') . "\n");
			print("IS_MODIFIED: " . ($template->IS_MODIFIED ? 'true' : 'false') . "\n");
			print("USER_ID: " . $template->USER_ID . "\n");
			print("SYSTEM_CODE: " . $template->SYSTEM_CODE . "\n");
			print("\n");
		}
	} catch (Throwable $e) {
		print("Error: " . $e->getMessage() . "\n");
	}
	```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.workflow.template.list',
        {
            select: [
                'ID',
                'NAME',
                'USER_ID',
                'SYSTEM_CODE'
            ],
            filter: {
                MODULE_ID: 'lists',
                AUTO_EXECUTE: 0
            },
            order: {
                ID: 'DESC'
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
        'bizproc.workflow.template.list',
        [
            'select' => [
                'ID',
                'NAME',
                'USER_ID',
                'SYSTEM_CODE'
            ],
            'filter' => [
                'MODULE_ID' => 'lists',
                'AUTO_EXECUTE' => 0
            ],
            'order' => [
                'ID' => 'DESC'
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
    "result": [
        {
            "ID": "525",
            "NAME": "Вывести время",
            "USER_ID": "503",
            "SYSTEM_CODE": "rest_app_5"
        },
        {
           "ID": "379",
           ... 
        }
        ...
    ],
    "total": 34,
    "time": {
        "start": 1737535822.539526,
        "finish": 1737535822.564579,
        "duration": 0.025053024291992188,
        "processing": 0.0019738674163818359,
        "date_start": "2025-01-22T11:50:22+03:00",
        "date_finish": "2025-01-22T11:50:22+03:00",
        "operating_reset_at": 1737536422,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о шаблонах бизнес-процессов.

Каждый объект содержит [поля](#fields) шаблона, указанные в параметре `SELECT` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!",
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Access denied! | Метод запустил не администратор ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-template-add.md)
- [{#T}](./bizproc-workflow-template-update.md)
- [{#T}](./bizproc-workflow-template-delete.md)