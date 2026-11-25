# Получить список шаблонов bizproc.workflow.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, состав списка зависит от его прав

Метод `bizproc.workflow.template.list` получает список шаблонов бизнес-процессов, которые созданы в дизайнере.

Список ограничен областью, доступной пользователю для редактирования, и видимостью шаблонов. Пользователю без прав администратора метод возвращает только пользовательские шаблоны нового конструктора бизнес-процессов без системного кода.

Шаблоны роботов, настроенных на стадиях элементов CRM, смарт-процессов или в задачах, метод не возвращает. Такие шаблоны недоступны в REST API.

## Параметры метода

Все параметры необязательные.

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../data-types.md) | Массив содержит список [полей](#fields), которые необходимо выбрать.

Названия полей можно передавать в любом регистре. Неизвестные поля пропускаются; если не выбрано ни одного допустимого поля, возвращается `ID`.

Значение по умолчанию — `['ID']` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации списка шаблонов бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) шаблона для фильтра
- `value_N` — значение поля

Перед названием фильтруемого поля можно указать тип фильтрации:
- `=` — равно
- `!` или `!=` — не равно
- `<` — меньше
- `<=` — меньше либо равно
- `>` — больше
- `>=` — больше либо равно

Без префикса фильтр сравнивает значение на равенство. Название поля можно передавать в любом регистре.

Значение поля — строка, число или массив таких значений. Массив выбирает записи с любым из перечисленных значений, а с префиксом `!` или `!=` исключает их. Значение для поля `MODIFIED` передавайте в формате [`datetime`](../../data-types.md), например `2026-01-01T00:00:00+03:00`.

Поля и типы фильтрации, которых нет в списке, метод пропускает без ошибки. По умолчанию пользовательский фильтр не задан ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки списка шаблонов бизнес-процессов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) шаблона для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Можно указать несколько полей для сортировки, например, `{NAME: 'ASC', ID: 'DESC'}`.

Неизвестные поля пропускаются. Направление `DESC` не зависит от регистра; любое другое значение означает `ASC`.

Значение по умолчанию — `{ID: 'ASC'}` ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации. По умолчанию — `0`.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы.

Для следующей страницы передайте значение `next` из ответа. При `start = -1` метод возвращает первую страницу без подсчета общего количества: `total` равен `0`, а `next` не приходит, если найдена хотя бы одна запись ||
|#

### Поля шаблона {#fields}

#|
|| **Название**
`тип` | **Описание**||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор шаблона бизнес-процесса ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля по документу. Примеры значений:
- `crm` — CRM
- `lists` — универсальные списки
- `disk` — диск ||
|| **ENTITY**
[`string`](../../data-types.md) | Идентификатор объекта по документу. Примеры значений:

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
[`array`](../../data-types.md) | Тип документа в формате `[MODULE_ID, ENTITY, тип_документа]`, например `["crm", "CCrmDocumentDeal", "DEAL"]`. Для фильтрации передавайте строку из третьего элемента массива. Первые два элемента заполнены, только если в `SELECT` переданы также `MODULE_ID` и `ENTITY`, иначе на их месте приходит `null`. Примеры значений третьего элемента:
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
[`integer`](../../data-types.md) | Битовая маска автозапуска:

- `0` — без автозапуска
- `1` — запуск на создание
- `2` — запуск на изменение
- `4` — запуск на удаление

Флаги складываются: например, `3` — запуск на создание и изменение
||
|| **NAME**
[`string`](../../data-types.md) | Название шаблона ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание шаблона бизнес-процесса ||
|| **TEMPLATE**
[`array`](../../data-types.md) | Массив с описанием структуры действий шаблона ||
|| **PARAMETERS**
[`array`](../../data-types.md) или [`object`](../../data-types.md) | Параметры шаблона ||
|| **VARIABLES**
[`array`](../../data-types.md) или [`object`](../../data-types.md) | Переменные шаблона ||
|| **CONSTANTS**
[`array`](../../data-types.md) или [`object`](../../data-types.md) | Константы шаблона ||
|| **MODIFIED**
[`datetime`](../../data-types.md) | Дата последнего изменения ||
|| **IS_MODIFIED**
[`string`](../../data-types.md) | Был ли изменен шаблон. Возможные значения:
- `Y` — да, был изменен
- `N` — нет

Опция нужна для [типовых шаблонов](https://helpdesk.bitrix24.ru/open/5415841/) бизнес-процессов ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал или изменил шаблон ||
|| **SYSTEM_CODE**
[`string`](../../data-types.md) | Системный код шаблона.

Нужен для идентификации шаблонов типовых бизнес-процессов или шаблонов, созданных приложением ||
|#

В JSON пустые `PARAMETERS`, `VARIABLES` и `CONSTANTS` могут приходить как массивы, а заполненные значения с именованными элементами — как объекты.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","NAME","USER_ID","SYSTEM_CODE"],"filter":{"MODULE_ID":"lists","AUTO_EXECUTE":0},"order":{"ID":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.workflow.template.list
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
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
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
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
        const generator = $b24.fetchListMethod('bizproc.workflow.template.list', parameters, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
        const response = await $b24.callMethod('bizproc.workflow.template.list', parameters, 0);
        const result = response.getData().result || [];
        for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.workflow.template.list(
            select=[
                "ID",
                "NAME",
                "USER_ID",
                "SYSTEM_CODE",
            ],
            filter={
                "MODULE_ID": "lists",
                "AUTO_EXECUTE": 0,
            },
            order={
                "ID": "DESC",
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.workflow.template.list(
            select=[
                "ID",
                "NAME",
                "USER_ID",
                "SYSTEM_CODE",
            ],
            filter={
                "MODULE_ID": "lists",
                "AUTO_EXECUTE": 0,
            },
            order={
                "ID": "DESC",
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

    Пример `as_list_fast`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.bizproc.workflow.template.list(
            select=[
                "ID",
                "NAME",
                "USER_ID",
                "SYSTEM_CODE",
            ],
            filter={
                "MODULE_ID": "lists",
                "AUTO_EXECUTE": 0,
            },
            order={
                "ID": "DESC",
            },
        ).as_list_fast(descending=True).response
        result = bitrix_response.result
        for item in result:
            print(item)
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
		$result = $serviceBuilder
			->getBizProcScope()
			->template()
			->list(
				['ID', 'NAME', 'USER_ID', 'SYSTEM_CODE'],
				['MODULE_ID' => 'lists', 'AUTO_EXECUTE' => 0]
			);
		foreach ($result->getTemplates() as $template) {
			print("ID: " . $template->ID . "\n");
			print("NAME: " . $template->NAME . "\n");
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.workflow.template.list", b24.Params{
    	"SELECT": []string{"ID", "NAME", "USER_ID", "SYSTEM_CODE"},
    	"FILTER": b24.Params{
    		"MODULE_ID":    "lists",
    		"AUTO_EXECUTE": 0,
    	},
    	"ORDER": b24.Params{
    		"ID": "DESC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("bizproc.workflow.template.list: %w", err)
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
            "ID": "525",
            "NAME": "Вывести время",
            "USER_ID": "503",
            "SYSTEM_CODE": "rest_app_5"
        },
        {
           "ID": "379",
           "NAME": "App template",
           "USER_ID": "503",
           "SYSTEM_CODE": "rest_app_5"
        }
    ],
    "total": 2,
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
[`array`](../../data-types.md) | Корневой элемент ответа.

Содержит массив объектов с информацией о шаблонах бизнес-процессов.

Каждый объект содержит [поля](#fields) шаблона, указанные в параметре `SELECT` ||
|| **next**
[`integer`](../../data-types.md) | Значение `start` для получения следующей страницы. Поле присутствует, когда доступна следующая страница ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_SELECT_VALIDATION_FAILURE",
    "error_description": "Invalid data in SELECT parameter"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ERROR_SELECT_VALIDATION_FAILURE` | Invalid data in SELECT parameter | Элемент массива `SELECT` не является скалярным значением ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-template-add.md)
- [{#T}](./bizproc-workflow-template-update.md)
- [{#T}](./bizproc-workflow-template-delete.md)
- [{#T}](../bizproc-workflow-start.md)
