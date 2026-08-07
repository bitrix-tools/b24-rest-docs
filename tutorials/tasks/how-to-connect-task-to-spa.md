# Как прикрепить задачу к смарт-процессу

> Scope: [`crm`, `task`](../../api-reference/scopes/permissions.md)
> 
> Кто может выполнять методы:
> - [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) — любой пользователь
> - [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) — любой пользователь с правом на чтение элементов объекта CRM
> - [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) и [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Задача связывается с элементом CRM через поле «Элементы CRM» — `UF_CRM_TASK`. Поле принимает значения в [формате](../../api-reference/crm/data-types.md#crm-binding-format) `{PREFIX}_{ID}`:

- `PREFIX` — краткий символьный код [типа объекта CRM](../../api-reference/crm/data-types.md#object_type). Он показывает, к чему добавляется связь: к сделке, к лиду, к определенному смарт-процессу
- `ID` — идентификатор конкретного элемента этого типа

Например, `Tb1_29` — это элемент с `id`: `29` смарт-процесса с кратким кодом `Tb1`.

Обе части значения нужно получить до создания задачи. Поэтому сценарий состоит из трех шагов.

1. Получить `entityTypeId` и `SYMBOL_CODE_SHORT` смарт-процесса методом [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

2. Получить идентификатор элемента смарт-процесса методом [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) с параметром `entityTypeId`

3. Создать задачу методом [tasks.task.add](../../api-reference/tasks/tasks-task-add.md), передав в `UF_CRM_TASK` значение, собранное из `SYMBOL_CODE_SHORT` и `id` элемента

В результате получим задачу, у которой в поле «Элементы CRM» указан элемент смарт-процесса. Проверим привязку методом [tasks.task.get](../../api-reference/tasks/tasks-task-get.md).

## Подготовьте данные

Для выполнения примера нужны:

- входящий вебхук со scope `crm` и `task`
- созданный смарт-процесс и хотя бы один его элемент
- идентификатор пользователя, которого назначим исполнителем задачи. Получить его можно методами [user.get](../../api-reference/user/user-get.md) и [user.current](../../api-reference/user/user-current.md)
- состав обязательных полей задачи. Если на портале настроены обязательные пользовательские поля, их тоже нужно передать в `tasks.task.add` — проверьте состав методом [tasks.task.getFields](../../api-reference/tasks/tasks-task-get-fields.md)

Вебхук выполняет запросы с правами создавшего его пользователя. Не публикуйте секретный код вебхука в клиентском коде и репозиториях — храните его в переменных окружения.

Смарт-процесс должен быть настроен на привязку к задачам. В методах [crm.type.add](../../api-reference/crm/universal/user-defined-object-types/crm-type-add.md) или [crm.type.update](../../api-reference/crm/universal/user-defined-object-types/crm-type-update.md) для него нужно передать две настройки сразу:

- `isUseInUserfieldEnabled`: `Y` — [разрешает использовать смарт-процесс в пользовательских полях](../../api-reference/crm/universal/user-defined-object-types/index.md)
- `linkedUserFields`: `{"TASKS_TASK|UF_CRM_TASK": "true"}` — добавляет смарт-процесс именно в поле задачи. Значение по умолчанию — пустой объект

Одной опции `isUseInUserfieldEnabled` недостаточно: без `linkedUserFields` смарт-процесс не попадет в список типов, доступных полю `UF_CRM_TASK`, и привязка не сохранится.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1. Получаем идентификаторы смарт-процесса {#SPA-ids}

Чтобы получить идентификатор смарт-процесса, используем метод [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Метод вызывается без параметров и возвращает стандартные типы объектов CRM и смарт-процессы.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const ownerTypeResponse = await $b24.actions.v2.call.make({
        method: 'crm.enum.ownertype',
        params: {},
        requestId: 'crm-enum-ownertype'
    })

    if (!ownerTypeResponse.isSuccess) {
        throw new Error(ownerTypeResponse.getErrorMessages().join('; '))
    }

    const ownerTypes = ownerTypeResponse.getData().result
    ```

- PHP

    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    $result = $serviceBuilder->getCRMScope()->enum()->ownerType()->getItems();
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    result = client.crm.enum.ownertype().response.result
    ```

- Go

    ```go
    // Метод вызывается без параметров и возвращает и предустановленные типы
    // объектов CRM, и смарт-процессы.
    res, err := core.Call(ctx, "crm.enum.ownertype", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.enum.ownertype: %w", err)
    }

    var ownerTypes []struct {
    	ID              int    `json:"ID"`
    	Name            string `json:"NAME"`
    	SymbolCode      string `json:"SYMBOL_CODE"`
    	SymbolCodeShort string `json:"SYMBOL_CODE_SHORT"`
    }
    if err := json.Unmarshal(res.Result, &ownerTypes); err != nil {
    	return fmt.Errorf("разбор типов объектов: %w", err)
    }

    // Ищем свой смарт-процесс по названию и запоминаем ДВА значения: ID — это
    // entityTypeId для поиска элемента, SYMBOL_CODE_SHORT — первая половина
    // значения привязки.
    var entityTypeIDFound int
    var symbolCodeShort string
    for _, t := range ownerTypes {
    	if t.Name == spaTitle {
    		entityTypeIDFound, symbolCodeShort = t.ID, t.SymbolCodeShort
    		break
    	}
    }
    if symbolCodeShort == "" {
    	return fmt.Errorf("смарт-процесс %q не найден в crm.enum.ownertype", spaTitle)
    }
    ```

{% endlist %}

У каждого типа объекта метод возвращает четыре поля:

- `ID` — числовой идентификатор типа `entityTypeId`. Понадобится в следующем шаге, чтобы найти элемент смарт-процесса
- `NAME` — название типа. По нему находим нужный смарт-процесс в списке
- `SYMBOL_CODE` — символьный код типа
- `SYMBOL_CODE_SHORT` — краткий символьный код. Это первая часть значения привязки, которое передадим в задачу

Сокращенный ответ:

```json
{
    "result": [
        {
            "ID": 1,
            "NAME": "Лид",
            "SYMBOL_CODE": "LEAD",
            "SYMBOL_CODE_SHORT": "L"
        },
        {
            "ID": 2,
            "NAME": "Сделка",
            "SYMBOL_CODE": "DEAL",
            "SYMBOL_CODE_SHORT": "D"
        },
        {
            "ID": 3,
            "NAME": "Контакт",
            "SYMBOL_CODE": "CONTACT",
            "SYMBOL_CODE_SHORT": "C"
        },
        {
            "ID": 4,
            "NAME": "Компания",
            "SYMBOL_CODE": "COMPANY",
            "SYMBOL_CODE_SHORT": "CO"
        },
        {
            "ID": 5,
            "NAME": "Счёт (старая версия)",
            "SYMBOL_CODE": "INVOICE",
            "SYMBOL_CODE_SHORT": "I"
        },
        {
            "ID": 31,
            "NAME": "Счёт",
            "SYMBOL_CODE": "SMART_INVOICE",
            "SYMBOL_CODE_SHORT": "SI"
        },
        {
            "ID": 7,
            "NAME": "Предложение",
            "SYMBOL_CODE": "QUOTE",
            "SYMBOL_CODE_SHORT": "Q"
        },
        {
            "ID": 8,
            "NAME": "Реквизиты",
            "SYMBOL_CODE": "REQUISITE",
            "SYMBOL_CODE_SHORT": "RQ"
        },
        {
            "ID": 36,
            "NAME": "Документ",
            "SYMBOL_CODE": "SMART_DOCUMENT",
            "SYMBOL_CODE_SHORT": "DO"
        },
        {
            "ID": 39,
            "NAME": "Документ компании",
            "SYMBOL_CODE": "SMART_B2E_DOC",
            "SYMBOL_CODE_SHORT": "SBD"
        },
        {
            "ID": 177,
            "NAME": "Закупка оборудования",
            "SYMBOL_CODE": "DYNAMIC_177",
            "SYMBOL_CODE_SHORT": "Tb1"
        },
        {
            "ID": 156,
            "NAME": "Закупка",
            "SYMBOL_CODE": "DYNAMIC_156",
            "SYMBOL_CODE_SHORT": "T9c"
        },
        ...
    ]
}
```

В результате получили типы объектов CRM с идентификаторами. Дальше работаем со смарт-процессом «Закупка оборудования» и сохраняем два его значения: `ID`: `177` для поиска элемента и `SYMBOL_CODE_SHORT`: `Tb1` для привязки.

## 2. Получаем ID элемента смарт-процесса {#element-id}

Для получения ID элемента смарт-процесса используем метод [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) с параметрами:

-  `entityTypeId` — `177`, значение равно `ID` из результата предыдущего метода

-  `filter[title]` — укажем название элемента для поиска

-  `select` — список возвращаемых полей. Для сценария достаточно `id` и `title`

{% list tabs %}

- JS
  
    ```javascript
    const itemResponse = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: {
            entityTypeId: 177, // ID из результата crm.enum.ownertype
            select: [
                'id', // выбираемые поля
                'title',
            ],
            filter: {
                'title': 'Стиральная машина', // название элемента
            },
        },
        requestId: 'crm-item-list'
    })

    if (!itemResponse.isSuccess) {
        throw new Error(itemResponse.getErrorMessages().join('; '))
    }

    const items = itemResponse.getData().result.items
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->item()->list(
        177, // ID из результата crm.enum.ownertype
        [], // сортировка
        [
            'title' => 'Стиральная машина', // название элемента
        ],
        [
            'id', // выбираемые поля
            'title',
        ]
    )->getItems();
    ```

- Python

    ```python
    result = client.crm.item.list(
        entity_type_id=177,
        select=["id", "title"],
        filter={
            "title": "Стиральная машина",
        },
    ).response.result
    ```

- Go

    ```go
    res, err = core.Call(ctx, "crm.item.list", b24.Params{
    	"entityTypeId": entityTypeIDFound,
    	"select":       []string{"id", "title"},
    	"filter":       b24.Params{"title": itemTitle},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом items. Одинаковые названия
    // никто не запрещает, поэтому ответ — список даже при точном фильтре.
    var list struct {
    	Items []struct {
    		ID    int    `json:"id"`
    		Title string `json:"title"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &list); err != nil {
    	return fmt.Errorf("разбор элементов: %w", err)
    }
    if len(list.Items) == 0 {
    	return fmt.Errorf("элемент %q не найден", itemTitle)
    }
    ```

{% endlist %}

В результате получили `id`: `29` элемента смарт-процесса — вторую часть значения привязки.

```json
{
    "result": {
        "items": [
            {
                "id": 29,
                "title": "Стиральная машина"
            }
        ]
    },
    "total": 1
}
```

Если элементов с таким названием несколько, метод вернет их все. Уточните фильтр или выберите нужный элемент по `id`.

## 3. Создаем задачу с привязкой к элементу смарт-процесса

Соберем значение привязки из двух полученных частей. Между ними ставим символ подчеркивания:

```text
SYMBOL_CODE_SHORT + "_" + id
Tb1 + "_" + 29 = Tb1_29
```

Собирайте значение из ответов методов, а не из готовой строки в примере. Краткий код смарт-процесса зависит от `entityTypeId` и на другом портале будет другим.

Для создания задачи используем метод [tasks.task.add](../../api-reference/tasks/tasks-task-add.md) с параметрами:

-  `UF_CRM_TASK` — массив привязок к элементам CRM. Передаем в нем собранное значение `Tb1_29` из [шага 1](#SPA-ids) и [шага 2](#element-id)

-  `TITLE` — название задачи, обязательное поле. Без названия задача не будет создана

-  `CREATED_BY` — ID постановщика задачи. В примере не передаем его: постановщиком станет пользователь, от имени которого выполняется запрос

-  `RESPONSIBLE_ID` — ID исполнителя задачи, обязательное поле. Без исполнителя задача не будет создана

{% list tabs %}

- JS
  
    ```javascript
    const taskResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.add',
        params: {
            fields: {
                TITLE: 'task for test', // название задачи
                RESPONSIBLE_ID: 1, // исполнитель
                UF_CRM_TASK: [ // массив элементов CRM
                    'Tb1_29'
                ]
            }
        },
        requestId: 'task-add'
    })

    if (!taskResponse.isSuccess) {
        throw new Error(taskResponse.getErrorMessages().join('; '))
    }

    const task = taskResponse.getData().result.task
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->core->call(
        'tasks.task.add',
        [
            'fields' => [
                'TITLE' => 'task for test', // название задачи
                'RESPONSIBLE_ID' => 1, // исполнитель
                'UF_CRM_TASK' => [ // массив элементов CRM
                    'Tb1_29'
                ]
            ]
        ]
    )->getResponseData()->getResult();
    ```

- Python

    ```python
    result = client.tasks.task.add(
        fields={
            "TITLE": "task for test",
            "RESPONSIBLE_ID": 1,
            "UF_CRM_TASK": [
                "Tb1_29",
            ],
        }
    ).response.result
    ```

- Go

    ```go
    // Значение привязки собирается из ответов, а не из готовой строки: краткий
    // код зависит от entityTypeId и на другом портале будет другим.
    binding := symbolCodeShort + "_" + strconv.Itoa(list.Items[0].ID)

    res, err = core.Call(ctx, "tasks.task.add", b24.Params{
    	"fields": b24.Params{
    		"TITLE":          "Проверить оборудование (b24gosdk)",
    		"RESPONSIBLE_ID": userID,
    		// UF_CRM_TASK — всегда массив, даже когда привязка одна.
    		"UF_CRM_TASK": []string{binding},
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.task.add: %w", err)
    }

    // tasks.* заворачивает ответ в объект с ключом task, и идентификатор задачи
    // приходит СТРОКОЙ ("3731"): b24.ID разбирает и число, и строку с числом.
    var added struct {
    	Task struct {
    		ID    b24.ID `json:"id"`
    		Title string `json:"title"`
    	} `json:"task"`
    }
    if err := json.Unmarshal(res.Result, &added); err != nil {
    	return fmt.Errorf("разбор созданной задачи: %w", err)
    }
    ```

{% endlist %}

В результате создали задачу с ID `3731`. Сохраните идентификатор — по нему проверим привязку. Обратите внимание: методы задач возвращают идентификаторы строками — `"id": "3731"`. В `taskId` следующего вызова метод приведет значение к числу, поэтому строка с числом подойдет. А вот нечисловое значение превратится в `0`, и метод вернет ошибку.

Метод возвращает все поля задачи, кроме привязки к элементам CRM: поля `ufCrmTask` в ответе нет.

Сокращенный ответ:

```json
{
    "result": {
        "task": {
            "id": "3731",
            "title": "task for test",
            "status": "2",
            "createdBy": "1",
            "responsibleId": "1",
            "createdDate": "2025-01-20T14:30:58+02:00",
            "changedDate": "2025-01-20T14:30:58+02:00",
            "group": [],
            "checklist": [],
            ...
        }
    }
}
```

## Запустите сценарий

Скрипт выполняет все три шага подряд: находит смарт-процесс по названию, находит его элемент, собирает значение привязки и создает задачу. Замените значения переменных на свои — в примерах выше это смарт-процесс «Закупка оборудования», элемент «Стиральная машина» и задача `task for test`.

{% list tabs %}

- JS
    
    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Переменные для ввода данных пользователем
    const smartProcessName = 'название_смарт_процесса'; // Название смарт-процесса
    const itemName = 'название_элемента'; // Название элемента смарт-процесса
    const responsibleId = 1; // ID ответственного за задачу, число
    const taskTitle = 'название_задачи'; // Название задачи

    // Функция для создания задачи с привязкой к элементу смарт-процесса
    async function createTaskWithSmartProcess() {
        // Получение идентификаторов типов сущностей и смарт-процессов
        const ownerTypeResponse = await $b24.actions.v2.call.make({
            method: 'crm.enum.ownertype',
            params: {},
            requestId: 'crm-enum-ownertype'
        });

        if (!ownerTypeResponse.isSuccess) {
            console.error('Ошибка при получении типов сущностей:', ownerTypeResponse.getErrorMessages().join('; '));
            return;
        }

        // Поиск нужного смарт-процесса
        const smartProcess = ownerTypeResponse.getData().result.find(function(process) {
            return process.NAME === smartProcessName;
        });

        if (!smartProcess) {
            console.error('Смарт-процесс не найден');
            return;
        }

        const symbolCodeShort = smartProcess.SYMBOL_CODE_SHORT;

        // Поиск элемента смарт-процесса с использованием фильтра по названию
        const itemResponse = await $b24.actions.v2.call.make({
            method: 'crm.item.list',
            params: {
                entityTypeId: smartProcess.ID,
                select: ['id', 'title'],
                filter: { 'title': itemName }
            },
            requestId: 'crm-item-list'
        });

        if (!itemResponse.isSuccess) {
            console.error('Ошибка при получении элементов смарт-процесса:', itemResponse.getErrorMessages().join('; '));
            return;
        }

        if (itemResponse.getData().result.items.length === 0) {
            console.error('Элемент смарт-процесса не найден');
            return;
        }

        const itemId = itemResponse.getData().result.items[0].id;

        // Создание задачи
        const taskResponse = await $b24.actions.v2.call.make({
            method: 'tasks.task.add',
            params: {
                fields: {
                    TITLE: taskTitle, // Используем введенное название задачи
                    RESPONSIBLE_ID: responsibleId, // Добавляем ID ответственного
                    UF_CRM_TASK: [symbolCodeShort + '_' + itemId]
                }
            },
            requestId: 'task-add'
        });

        if (!taskResponse.isSuccess) {
            console.error('Ошибка при создании задачи:', taskResponse.getErrorMessages().join('; '));
        } else {
            console.log('Задача успешно создана!', taskResponse.getData().result);
        }
    }

    // Вызов функции для создания задачи
    await createTaskWithSmartProcess();

    $b24.destroy();
    ```

- PHP
  
    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Переменные для ввода данных пользователем
    $smartProcessName = 'название_смарт_процесса'; // Название смарт-процесса
    $itemName = 'название_элемента'; // Название элемента смарт-процесса
    $responsibleId = 1; // ID ответственного за задачу, число
    $taskTitle = 'название_задачи'; // Название задачи

    // Функция для создания задачи с привязкой к элементу смарт-процесса
    function createTaskWithSmartProcess($serviceBuilder, $smartProcessName, $itemName, $responsibleId, $taskTitle) {
        // Получение идентификаторов типов сущностей и смарт-процессов
        try {
            $ownerTypes = $serviceBuilder->getCRMScope()->enum()->ownerType()->getItems();
        } catch (BaseException $e) {
            echo 'Ошибка при получении типов сущностей: ' . $e->getMessage();
            return;
        }

        // Поиск нужного смарт-процесса
        $smartProcess = null;
        foreach ($ownerTypes as $process) {
            if ($process->NAME === $smartProcessName) {
                $smartProcess = $process;
                break;
            }
        }

        if (!$smartProcess) {
            echo 'Смарт-процесс не найден';
            return;
        }

        $symbolCodeShort = $smartProcess->SYMBOL_CODE_SHORT;

        // Поиск элемента смарт-процесса с использованием фильтра по названию
        try {
            $items = $serviceBuilder->getCRMScope()->item()->list(
                $smartProcess->ID,
                [],
                ['title' => $itemName],
                ['id', 'title']
            )->getItems();
        } catch (BaseException $e) {
            echo 'Ошибка при получении элементов смарт-процесса: ' . $e->getMessage();
            return;
        }

        if (count($items) === 0) {
            echo 'Элемент смарт-процесса не найден';
            return;
        }

        $itemId = $items[0]->id;

        // Создание задачи
        try {
            $taskResult = $serviceBuilder->core->call('tasks.task.add', [
                'fields' => [
                    'TITLE' => $taskTitle, // Используем введенное название задачи
                    'RESPONSIBLE_ID' => $responsibleId, // Добавляем ID ответственного
                    'UF_CRM_TASK' => [$symbolCodeShort . '_' . $itemId]
                ]
            ])->getResponseData()->getResult();
        } catch (BaseException $e) {
            echo 'Ошибка при создании задачи: ' . $e->getMessage();
            return;
        }

        echo 'Задача успешно создана!';
        print_r($taskResult);
    }

    // Вызов функции для создания задачи
    createTaskWithSmartProcess($serviceBuilder, $smartProcessName, $itemName, $responsibleId, $taskTitle);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    smart_process_name = "название_смарт_процесса"
    item_name = "название_элемента"
    responsible_id = 1
    task_title = "название_задачи"


    def create_task_with_smart_process(client, smart_process_name, item_name, responsible_id, task_title):
        try:
            result = client.crm.enum.ownertype().response.result
        except BitrixAPIError as error:
            print(f"Ошибка получения типов сущностей: {error}")
            return

        smart_process = None
        for process in result:
            if process["NAME"] == smart_process_name:
                smart_process = process
                break

        if smart_process is None:
            print("Смарт-процесс не найден")
            return

        symbol_code_short = smart_process["SYMBOL_CODE_SHORT"]

        try:
            item_result = client.crm.item.list(
                entity_type_id=int(smart_process["ID"]),
                select=["id", "title"],
                filter={"title": item_name},
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка получения элементов смарт-процесса: {error}")
            return

        if len(item_result["items"]) == 0:
            print("Элемент смарт-процесса не найден")
            return

        item_id = item_result["items"][0]["id"]

        try:
            task_result = client.tasks.task.add(
                fields={
                    "TITLE": task_title,
                    "RESPONSIBLE_ID": responsible_id,
                    "UF_CRM_TASK": [f"{symbol_code_short}_{item_id}"],
                }
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка создания задачи: {error}")
        else:
            print("Задача успешно создана!")
            print(task_result)


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    create_task_with_smart_process(client, smart_process_name, item_name, responsible_id, task_title)
    ```

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Пример самодостаточный: он создаёт смарт-процесс, разрешённый для поля задач,
    // добавляет в него элемент, собирает значение привязки, создаёт задачу,
    // проверяет привязку и убирает за собой. Запускается на любом портале, ничего
    // править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"errors"
    	"fmt"
    	"log"
    	"os"
    	"strconv"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    const (
    	spaTitle  = "Закупка оборудования (пример b24gosdk)"
    	itemTitle = "Стиральная машина"
    )

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: смарт-процесс, который разрешено класть в поле задачи

    	entityTypeID, typeID, err := addType(ctx, core, spaTitle)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.type.delete", b24.Params{"id": typeID})

    	itemID, err := addItem(ctx, core, entityTypeID, itemTitle)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.item.delete", b24.Params{
    		"entityTypeId": entityTypeID, "id": itemID,
    	})

    	userID, err := currentUser(ctx, core)
    	if err != nil {
    		return err
    	}

    	// --- шаг 1: идентификаторы смарт-процесса
    	// Метод вызывается без параметров и возвращает и предустановленные типы
    	// объектов CRM, и смарт-процессы.
    	res, err := core.Call(ctx, "crm.enum.ownertype", nil, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.enum.ownertype: %w", err)
    	}

    	var ownerTypes []struct {
    		ID              int    `json:"ID"`
    		Name            string `json:"NAME"`
    		SymbolCode      string `json:"SYMBOL_CODE"`
    		SymbolCodeShort string `json:"SYMBOL_CODE_SHORT"`
    	}
    	if err := json.Unmarshal(res.Result, &ownerTypes); err != nil {
    		return fmt.Errorf("разбор типов объектов: %w", err)
    	}

    	// Ищем свой смарт-процесс по названию и запоминаем ДВА значения: ID — это
    	// entityTypeId для поиска элемента, SYMBOL_CODE_SHORT — первая половина
    	// значения привязки.
    	var entityTypeIDFound int
    	var symbolCodeShort string
    	for _, t := range ownerTypes {
    		if t.Name == spaTitle {
    			entityTypeIDFound, symbolCodeShort = t.ID, t.SymbolCodeShort
    			break
    		}
    	}
    	if symbolCodeShort == "" {
    		return fmt.Errorf("смарт-процесс %q не найден в crm.enum.ownertype", spaTitle)
    	}
    	fmt.Printf("смарт-процесс %q: entityTypeId=%d, краткий код %q\n",
    		spaTitle, entityTypeIDFound, symbolCodeShort)

    	// --- шаг 2: идентификатор элемента
    	res, err = core.Call(ctx, "crm.item.list", b24.Params{
    		"entityTypeId": entityTypeIDFound,
    		"select":       []string{"id", "title"},
    		"filter":       b24.Params{"title": itemTitle},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.item.list: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом items. Одинаковые названия
    	// никто не запрещает, поэтому ответ — список даже при точном фильтре.
    	var list struct {
    		Items []struct {
    			ID    int    `json:"id"`
    			Title string `json:"title"`
    		} `json:"items"`
    	}
    	if err := json.Unmarshal(res.Result, &list); err != nil {
    		return fmt.Errorf("разбор элементов: %w", err)
    	}
    	if len(list.Items) == 0 {
    		return fmt.Errorf("элемент %q не найден", itemTitle)
    	}
    	fmt.Printf("элемент %q: id=%d\n", list.Items[0].Title, list.Items[0].ID)

    	// --- шаг 3: задача с привязкой
    	// Значение привязки собирается из ответов, а не из готовой строки: краткий
    	// код зависит от entityTypeId и на другом портале будет другим.
    	binding := symbolCodeShort + "_" + strconv.Itoa(list.Items[0].ID)

    	res, err = core.Call(ctx, "tasks.task.add", b24.Params{
    		"fields": b24.Params{
    			"TITLE":          "Проверить оборудование (b24gosdk)",
    			"RESPONSIBLE_ID": userID,
    			// UF_CRM_TASK — всегда массив, даже когда привязка одна.
    			"UF_CRM_TASK": []string{binding},
    		},
    	})
    	if err != nil {
    		return fmt.Errorf("tasks.task.add: %w", err)
    	}

    	// tasks.* заворачивает ответ в объект с ключом task, и идентификатор задачи
    	// приходит СТРОКОЙ ("3731"): b24.ID разбирает и число, и строку с числом.
    	var added struct {
    		Task struct {
    			ID    b24.ID `json:"id"`
    			Title string `json:"title"`
    		} `json:"task"`
    	}
    	if err := json.Unmarshal(res.Result, &added); err != nil {
    		return fmt.Errorf("разбор созданной задачи: %w", err)
    	}
    	defer del(ctx, core, "tasks.task.delete", b24.Params{"taskId": added.Task.ID})
    	fmt.Printf("задача %d создана с привязкой %s\n", added.Task.ID, binding)

    	// --- проверка: привязка действительно сохранилась
    	// Без UF_CRM_TASK в select привязки в ответе не будет: это системное поле,
    	// по умолчанию оно не возвращается.
    	res, err = core.Call(ctx, "tasks.task.get", b24.Params{
    		"taskId": added.Task.ID,
    		"select": []string{"ID", "UF_CRM_TASK"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("tasks.task.get: %w", err)
    	}

    	// Просили UF_CRM_TASK, а в ответе поле называется ufCrmTask. UnwrapFold
    	// сравнивает имена без учёта регистра и подчёркиваний, поэтому такое
    	// переименование её не сбивает.
    	raw, ok := b24.UnwrapFold(res.Result, "task", "UF_CRM_TASK")
    	if !ok || b24.IsEmpty(raw) {
    		return fmt.Errorf("привязка не сохранилась у задачи %d", added.Task.ID)
    	}
    	var bindings []string
    	if err := json.Unmarshal(raw, &bindings); err != nil {
    		return fmt.Errorf("разбор привязок: %w", err)
    	}
    	fmt.Printf("в задаче %d поле «Элементы CRM» = %v\n", added.Task.ID, bindings)
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    // addType создаёт смарт-процесс и возвращает его entityTypeId и id.
    func addType(ctx context.Context, core *b24.Core, title string) (int, b24.ID, error) {
    	// Двух настроек мало по отдельности: isUseInUserfieldEnabled разрешает
    	// смарт-процесс в пользовательских полях вообще, а linkedUserFields кладёт
    	// его именно в поле задачи UF_CRM_TASK. Без второй привязка не сохранится.
    	//
    	// isRecyclebinEnabled выключаем осознанно: элемент в корзине всё ещё
    	// считается элементом, а crm.type.delete отказывается удалять тип, у
    	// которого есть элементы.
    	res, err := core.Call(ctx, "crm.type.add", b24.Params{
    		"fields": b24.Params{
    			"title":                   title,
    			"isUseInUserfieldEnabled": "Y",
    			"linkedUserFields":        b24.Params{"TASKS_TASK|UF_CRM_TASK": "true"},
    			"isRecyclebinEnabled":     "N",
    		},
    	})
    	if err != nil {
    		// Код ошибки сравнивается через errors.Is, а не строкой: опечатка в
    		// литерале скомпилируется и молча уведёт в другую ветку.
    		if errors.Is(err, b24.Code("CREATE_DYNAMIC_TYPE_RESTRICTED")) {
    			return 0, 0, fmt.Errorf("на этом портале нельзя создать смарт-процесс: %w", err)
    		}
    		return 0, 0, fmt.Errorf("crm.type.add: %w", err)
    	}
    	var out struct {
    		Type struct {
    			ID           b24.ID `json:"id"`
    			EntityTypeID int    `json:"entityTypeId"`
    		} `json:"type"`
    	}
    	if err := json.Unmarshal(res.Result, &out); err != nil {
    		return 0, 0, fmt.Errorf("разбор смарт-процесса: %w", err)
    	}
    	return out.Type.EntityTypeID, out.Type.ID, nil
    }

    func addItem(ctx context.Context, core *b24.Core, entityTypeID int, title string) (b24.ID, error) {
    	res, err := core.Call(ctx, "crm.item.add", b24.Params{
    		"entityTypeId": entityTypeID,
    		"fields":       b24.Params{"title": title},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("crm.item.add: %w", err)
    	}
    	raw, ok := b24.Unwrap(res.Result, "item", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет item.id в %s", res.Result)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(raw, &id)
    }

    func currentUser(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	res, err := core.Call(ctx, "user.current", nil, b24.WithIdempotent())
    	if err != nil {
    		return 0, fmt.Errorf("user.current: %w", err)
    	}
    	var u struct {
    		ID b24.ID `json:"ID"`
    	}
    	if err := json.Unmarshal(res.Result, &u); err != nil {
    		return 0, err
    	}
    	return u.ID, nil
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
    ```

{% endlist %}

## Проверим результат

Откройте созданную задачу в Битрикс24. Привязанный элемент смарт-процесса отображается в карточке задачи в поле «Элементы CRM».

Через REST привязку проверяет метод [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) с параметрами:

-  `taskId` — `3731`, ID созданной задачи из результата предыдущего метода

-  `select` — `UF_CRM_TASK`, поле «Элементы CRM». Без этого поля в `select` метод не вернет привязку: `UF_CRM_TASK` относится к системным полям, которые не возвращаются по умолчанию. В запросе имя поля пишется в верхнем регистре, а в ответе возвращается в camelCase — `ufCrmTask`

{% list tabs %}

- JS
  
    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'tasks.task.get',
        params: {
            taskId: 3731, // ID задачи
            select: ['ID', 'UF_CRM_TASK'] // выбираемые поля
        },
        requestId: 'task-get'
    })

    if (!checkResponse.isSuccess) {
        throw new Error(checkResponse.getErrorMessages().join('; '))
    }

    const checkedTask = checkResponse.getData().result.task
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->core->call(
        'tasks.task.get',
        [
            'taskId' => 3731, // ID задачи
            'select' => ['ID', 'UF_CRM_TASK'] // выбираемые поля
        ]
    )->getResponseData()->getResult();
    ```

- Python

    ```python
    result = client.tasks.task.get(
        bitrix_id=3731,
        select=["ID", "UF_CRM_TASK"],
    ).response.result
    ```

- Go

    ```go
    // Без UF_CRM_TASK в select привязки в ответе не будет: это системное поле,
    // по умолчанию оно не возвращается.
    res, err = core.Call(ctx, "tasks.task.get", b24.Params{
    	"taskId": added.Task.ID,
    	"select": []string{"ID", "UF_CRM_TASK"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.task.get: %w", err)
    }

    // Просили UF_CRM_TASK, а в ответе поле называется ufCrmTask. UnwrapFold
    // сравнивает имена без учёта регистра и подчёркиваний, поэтому такое
    // переименование её не сбивает.
    raw, ok := b24.UnwrapFold(res.Result, "task", "UF_CRM_TASK")
    if !ok || b24.IsEmpty(raw) {
    	return fmt.Errorf("привязка не сохранилась у задачи %d", added.Task.ID)
    }
    var bindings []string
    if err := json.Unmarshal(raw, &bindings); err != nil {
    	return fmt.Errorf("разбор привязок: %w", err)
    }
    ```

{% endlist %}

Сценарий выполнен успешно, если в ответе поле `ufCrmTask` содержит собранное значение `Tb1_29`.

Сокращенный ответ:

```json
{
    "result": {
        "task": {
            "id": "3731",
            "ufCrmTask": ["Tb1_29"],
            "ufTaskWebdavFiles": false,
            "ufMailMessage": null,
            "favorite": "N",
            "group": [],
            ...
        }
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` | Смарт-процесс не найден. В `entityTypeId` метода [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) передан идентификатор несуществующего смарт-процесса — возьмите `ID` из ответа [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | В `entityTypeId` передано значение, которое не относится к смарт-процессам. Берите `ID` из ответа [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md), а не подставляйте произвольное число ||
|| `ERROR_CORE` | Не введено значение обязательного поля. На портале настроены обязательные пользовательские поля задач — получите их состав методом [tasks.task.getFields](../../api-reference/tasks/tasks-task-get-fields.md) и передайте в `fields` ||
|| `INVALID_ARG_VALUE` | Поле недоступно для фильтрации или в него передано некорректное значение. Проверьте `filter` в [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) ||
|| `allowed_only_intranet_user` | Действие в [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) разрешено только интранет-пользователям. Проверьте, от имени какого пользователя создан вебхук ||
|| `ERROR_CORE` | Не указано название задачи или не указан исполнитель. Заполните `TITLE` и `RESPONSIBLE_ID` ||
|| `ERROR_CORE` | Пользователь, указанный в поле «Исполнитель», не найден. В `RESPONSIBLE_ID` передан идентификатор несуществующего пользователя ||
|| `100` | Не переданы обязательные параметры. Проверьте `fields` в [tasks.task.add](../../api-reference/tasks/tasks-task-add.md), `taskId` и `select` в [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) ||
|| `0` | В параметре `taskId` метода [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) указано значение неверного типа ||
|#

Задача может создаться без ошибки, но с пустым полем `ufCrmTask`. Тогда проверьте значение привязки и настройки смарт-процесса:

- смарт-процесс добавлен в `linkedUserFields` по ключу `TASKS_TASK|UF_CRM_TASK`, а не только помечен опцией `isUseInUserfieldEnabled`. Это самая частая причина: пока обе настройки не заданы, поле `UF_CRM_TASK` не принимает элементы этого смарт-процесса
- значение собрано по формуле из шага 3 — `Tb1_29`, а не `Tb1 29`, `Tb1-29` или `177_29` с идентификатором типа вместо идентификатора элемента

Если [tasks.task.get](../../api-reference/tasks/tasks-task-get.md) вернул пустой `result`, задачи с таким идентификатором нет или у пользователя вебхука нет к ней доступа. Это не признак того, что привязка не сохранилась.

Повторяйте сценарий с того шага, который вернул ошибку. Шаги 1 и 2 ничего не создают, их можно выполнять сколько угодно раз. Если ошибку вернул [tasks.task.add](../../api-reference/tasks/tasks-task-add.md), задача не создана: исправьте поля и повторите только шаг 3. Если задача создана, но привязка неверная, не создавайте новую задачу — обновите поле `UF_CRM_TASK` методом [tasks.task.update](../../api-reference/tasks/tasks-task-update.md).

## Что важно учитывать

- краткий код смарт-процесса вычисляется из `entityTypeId`: число переводится в шестнадцатеричный вид и получает префикс `T`. Например, `entityTypeId`: `177` дает `b1` и код `Tb1`
- `UF_CRM_TASK` принимает массив, поэтому к одной задаче можно привязать несколько объектов CRM разных типов, например `["Tb1_29", "D_10"]`
- к задаче можно привязать не только смарт-процесс. Поле `UF_CRM_TASK` по умолчанию принимает лид, контакт, компанию, сделку и заказ — подставьте краткий код нужного типа: `L`, `C`, `CO`, `D`, `O`. Для этих типов шаг с [crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) не нужен: коды постоянны и перечислены в [таблице типов объектов CRM](../../api-reference/crm/data-types.md#object_type). Предложение и счет в этот список по умолчанию не входят
- [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) возвращает 50 элементов на страницу. Если нужный элемент не нашелся, уточните фильтр или переберите страницы параметром `start`
- повторный запуск примера создает новую задачу

## Продолжите изучение

- [Создать задачу tasks.task.add](../../api-reference/tasks/tasks-task-add.md)
- [Получить задачу по идентификатору tasks.task.get](../../api-reference/tasks/tasks-task-get.md)
- [Обновить задачу tasks.task.update](../../api-reference/tasks/tasks-task-update.md)
- [Получить список типов объектов CRM crm.enum.ownertype](../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
- [Получить список элементов смарт-процесса crm.item.list](../../api-reference/crm/universal/crm-item-list.md)
- [Формат значений для привязки к элементам CRM](../../api-reference/crm/data-types.md#crm-binding-format)
- [{#T}](./how-to-create-task-with-file.md)
