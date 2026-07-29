# Как создать новую воронку со стадиями в смарт-процессе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователи с административным доступом к разделу CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Воронки позволяют разделить работу в CRM на разные этапы. Например, продажа может состоять из трех воронок: продажа, доставка и постобслуживание товара. Для каждой воронки можно настроить права доступа и вид карточки элемента.

Для создания новой воронки в смарт-процессе последовательно выполним методы:

1. [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — получим числовой идентификатор типа смарт-процесса.
2. [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) — создадим новую воронку.
3. [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — получим предустановленные стадии новой воронки.
4. [crm.status.update](../../../api-reference/crm/status/crm-status-update.md) — изменим предустановленную стадию.
5. [crm.status.add](../../../api-reference/crm/status/crm-status-add.md) — создадим новую стадию.

## 1. Получим идентификатор смарт-процесса

Используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром по названию смарт-процесса `title`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'crm.type.list',
        params: {
            filter: { title: 'Закупка оборудования' }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        const types = result.getData().result.types;
        if (types.length > 0) {
            var entityTypeId = types[0].entityTypeId;
            console.log('entityTypeId:', entityTypeId);
        }
    }
    ```

- PHP
  
    ```php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $types = $serviceBuilder->getCRMScope()->type()
        ->list([], ['title' => 'Закупка оборудования'])
        ->getTypes();
    $entityTypeId = $types[0]->entityTypeId;
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

    entity_type_id = int(
        client.crm.type.list(
            filter={"title": "Закупка оборудования"},
        ).response.result["types"][0]["entityTypeId"]
    )
    ```

{% endlist %}

В результате получим и сохраним `entityTypeId` нужного смарт-процесса.

```json
{
    "result": {
        "types": [
            {
                "id": 7,
                "title": "Закупка оборудования",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 177,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "Y",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2021-11-26T10:52:17+03:00",
                "updatedTime": "2024-11-12T15:32:39+03:00",
                "updatedBy": 1,
                "isInitialized": "Y"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1751955574.022139,
        "finish": 1751955574.065841,
        "duration": 0.043701887130737305,
        "processing": 0.00709080696105957,
        "date_start": "2025-07-08T09:19:34+03:00",
        "date_finish": "2025-07-08T09:19:34+03:00",
        "operating_reset_at": 1751956174,
        "operating": 0
    }
}
```

## 2. Создадим новую воронку

Используем метод [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) с параметрами:

- `entityTypeId` — числовой идентификатор типа из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md),
- `fields[name]` — название воронки,
- `fields[sort]` — сортировка воронки. Сортировка влияет на место воронки в списке.

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.category.add',
        params: {
            entityTypeId: entityTypeId,
            fields: {
                name: 'Новая воронка',
                sort: 100
            }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        var categoryId = result.getData().result.category.id;
        console.log('categoryId:', categoryId);
    }
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->core->call(
        'crm.category.add',
        [
            'entityTypeId' => $entityTypeId,
            'fields' => [
                'name' => 'Новая воронка',
                'sort' => 100,
            ]
        ]
    );
    $categoryId = $result->getResponseData()->getResult()['category']['id'];
    ```

- Python

    ```python
    category_id = int(
        client.crm.category.add(
            entity_type_id=entity_type_id,
            fields={
                "name": "Новая воронка",
                "sort": 100,
            },
        ).response.result["category"]["id"]
    )
    ```

{% endlist %}

В результате получим и сохраним `id` созданной воронки.

```json
{
    "result": {
        "category": {
            "id": 39,
            "name": "Новая воронка",
            "sort": 100,
            "entityTypeId": 177,
            "isDefault": "N"
        }
    },
    "time": {
        "start": 1751955674.679973,
        "finish": 1751955674.87359,
        "duration": 0.1936171054840088,
        "processing": 0.1517810821533203,
        "date_start": "2025-07-08T09:21:14+03:00",
        "date_finish": "2025-07-08T09:21:14+03:00",
        "operating_reset_at": 1751956274,
        "operating": 0.15175914764404297
    }
}
```

## 3. Получим стадии созданной воронки

Используем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром:

- `ENTITY_ID` — идентификатор справочника CRM. Для стадий смарт-процессов идентификатор имеет вид `DYNAMIC_{entityTypeId}_STAGE_{categoryId}`:
	- `{entityTypeId}` — числовой идентификатор типа смарт-процесса из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md),
	- `{categoryId}` — идентификатор воронки из метода [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md).

{% list tabs %}

- JS
  
    ```javascript
    var entityId = `DYNAMIC_${entityTypeId}_STAGE_${categoryId}`;
    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.list',
        params: {
            filter: { ENTITY_ID: entityId }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        var stages = result.getData().result;
        console.log('Стадии:', stages);
    }
    ```
- PHP
  
    ```php
    $entityId = "DYNAMIC_{$entityTypeId}_STAGE_{$categoryId}";
    $stages = $serviceBuilder->getCRMScope()->status()
        ->list([], ['ENTITY_ID' => $entityId])
        ->getStatuses();
    ```

- Python

    ```python
    entity_id = f"DYNAMIC_{entity_type_id}_STAGE_{category_id}"
    stages = client.crm.status.list(
        filter={"ENTITY_ID": entity_id},
    ).response.result
    ```

{% endlist %}

В результате получим предустановленные стадии воронки. По умолчанию каждая новая воронка имеет пять стадий:

- три стадии «В работе» `SEMANTICS: ""`,
- одна стадия «Успех» `SEMANTICS: "S"`,
- одна стадия «Провал» `SEMANTIC": "F"`.
  
Каждая воронка должна иметь минимум одну стадию каждой группы. Успешная стадия в воронке может быть только одна.

```json
{
    "result": [
        {
            "ID": "737",
            "ENTITY_ID": "DYNAMIC_177_STAGE_39",
            "STATUS_ID": "DT177_39:NEW",
            "NAME": "Начало",
            "NAME_INIT": "Начало",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": "39",
            "COLOR": "#22B9FF",
            "SEMANTICS": null
        },
        {
            "ID": "739",
            "ENTITY_ID": "DYNAMIC_177_STAGE_39",
            "STATUS_ID": "DT177_39:PREPARATION",
            "NAME": "Подготовка",
            "NAME_INIT": "Подготовка",
            "SORT": "20",
            "SYSTEM": "N",
            "CATEGORY_ID": "39",
            "COLOR": "#88B9FF",
            "SEMANTICS": null
        },
        {
            "ID": "741",
            "ENTITY_ID": "DYNAMIC_177_STAGE_39",
            "STATUS_ID": "DT177_39:CLIENT",
            "NAME": "Согласование",
            "NAME_INIT": "Согласование",
            "SORT": "30",
            "SYSTEM": "N",
            "CATEGORY_ID": "39",
            "COLOR": "#10e5fc",
            "SEMANTICS": null
        },
        {
            "ID": "743",
            "ENTITY_ID": "DYNAMIC_177_STAGE_39",
            "STATUS_ID": "DT177_39:SUCCESS",
            "NAME": "Успех",
            "NAME_INIT": "Успех",
            "SORT": "40",
            "SYSTEM": "Y",
            "CATEGORY_ID": "39",
            "COLOR": "#00ff00",
            "SEMANTICS": "S"
        },
        {
            "ID": "745",
            "ENTITY_ID": "DYNAMIC_177_STAGE_39",
            "STATUS_ID": "DT177_39:FAIL",
            "NAME": "Провал",
            "NAME_INIT": "Провал",
            "SORT": "50",
            "SYSTEM": "Y",
            "CATEGORY_ID": "39",
            "COLOR": "#ff0000",
            "SEMANTICS": "F"
        }
    ],
    "total": 5,
    "time": {
        "start": 1751956021.475235,
        "finish": 1751956021.514927,
        "duration": 0.039691925048828125,
        "processing": 0.0024650096893310547,
        "date_start": "2025-07-08T09:27:01+03:00",
        "date_finish": "2025-07-08T09:27:01+03:00",
        "operating_reset_at": 1751956621,
        "operating": 0
    }
}
```

## 4. Изменим предустановленную стадию

Используем метод [crm.status.update](../../../api-reference/crm/status/crm-status-update.md) с параметрами:

- `id` — идентификатор стадии из метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md),
- `fields[name]` — новое название стадии.

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.update',
        params: {
            id: stageId,
            fields: {
                NAME: 'Новое название'
            }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        console.log('Стадия обновлена');
    }
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->status()->update(
        $stageId,
        [
            'NAME' => 'Новое название',
        ]
    );
    ```

- Python

    ```python
    client.crm.status.update(
        stage_id,
        fields={
            "NAME": "Новое название",
        },
    ).response
    ```

{% endlist %}

В результате получим `true`, изменение стадии прошло успешно. Если в результате вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.status.update](../../../api-reference/crm/status/crm-status-update.md).

```json
{
    "result": true,
    "time": {
        "start": 1751956427.737649,
        "finish": 1751956427.799632,
        "duration": 0.06198310852050781,
        "processing": 0.022645950317382812,
        "date_start": "2025-07-08T09:33:47+03:00",
        "date_finish": "2025-07-08T09:33:47+03:00",
        "operating_reset_at": 1751957027,
        "operating": 0
    }
}
```

## 5. Добавим новую стадию в воронку

Используем метод [crm.status.add](../../../api-reference/crm/status/crm-status-add.md) с параметрами `fields`:

- `ENTITY_ID` — идентификатор справочника CRM. Для стадий смарт-процессов идентификатор имеет вид `DYNAMIC_{entityTypeId}_STAGE_{categoryId}`:
	- `{entityTypeId}` — числовой идентификатор типа смарт-процесса из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md),
	- `{categoryId}` — идентификатор воронки из метода [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md).
- `STATUS_ID` — идентификатор стадии. Для стадий смарт-процессов поле должно иметь префикс `DT{entityTypeId}_{categoryId}`:
	- `{entityTypeId}` — числовой идентификатор типа смарт-процесса из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md),
	- `{categoryId}` — идентификатор воронки из метода [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md).
- `NAME` — название стадии,
- `SORT` — сортировка стадии. Сортировка влияет на порядок отображения стадии в канбане. Сортировка стадий «В работе» должна быть наименьшей, стадий «Провал» — наибольшей. Стадия «Успех» должна иметь промежуточную сортировку между значениями сортировок стадий «В работе» и «Провал».
- `SEMANTICS` — параметр принадлежности стадии к группе стадий. Укажем `F` для создания новой стадии группы «Провал».

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.add',
        params: {
            fields: {
                ENTITY_ID: entityId,
                STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`,
                NAME: 'Моя стадия',
                SORT: 60,
                SEMANTICS: "F",
            }
        }
    });

    if (!result.isSuccess) {
        console.error(result.getErrorMessages().join('; '));
    } else {
        console.log('ID новой стадии:', result.getData().result);
    }
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->status()->add(
        [
            'ENTITY_ID' => $entityId,
            'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE',
            'NAME' => 'Моя стадия',
            'SORT' => 60,
            'SEMANTICS' => 'F',
        ]
    );
    $newStageId = $result->getId();
    ```

- Python

    ```python
    new_stage_id = client.crm.status.add(
        fields={
            "ENTITY_ID": entity_id,
            "STATUS_ID": f"DT{entity_type_id}_{category_id}:MY_STAGE",
            "NAME": "Моя стадия",
            "SORT": 60,
            "SEMANTICS": "F",
        }
    ).response.result
    ```

{% endlist %}

В результате получим ID созданной стадии.

```json
{
    "result": 747,
    "time": {
        "start": 1751957029.04664,
        "finish": 1751957029.107654,
        "duration": 0.06101417541503906,
        "processing": 0.02231001853942871,
        "date_start": "2025-07-08T09:43:49+03:00",
        "date_finish": "2025-07-08T09:43:49+03:00",
        "operating_reset_at": 1751957629,
        "operating": 0
    }
}
```

## Пример кода

В примере создаем новую воронку в смарт-процессе, изменяем название первой предустановленной стадии и добавляем еще одну стадию в группу стадий «Провал». В конце повторно вызываем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и выводим таблицу с группами стадий.

{% list tabs %}

- JS
  
   ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    try {
        // 1. Получаем entityTypeId по названию смарт-процесса
        const types = (await call('crm.type.list', {
            filter: { title: 'Закупка оборудования' }
        })).types;
        const entityTypeId = types[0].entityTypeId;

        // 2. Создаем новую воронку
        const category = (await call('crm.category.add', {
            entityTypeId: entityTypeId,
            fields: {
                name: 'Новая воронка',
                sort: 100
            }
        })).category;
        const categoryId = category.id;
        const entityId = `DYNAMIC_${entityTypeId}_STAGE_${categoryId}`;

        // 3. Получаем список стадий
        let stages = await call('crm.status.list', {
            filter: { ENTITY_ID: entityId }
        });

        // 4. Изменяем первую стадию
        const firstStageId = stages[0].ID;
        await call('crm.status.update', {
            id: firstStageId,
            fields: { NAME: 'Первая стадия' }
        });

        // 5. Добавляем новую стадию
        await call('crm.status.add', {
            fields: {
                ENTITY_ID: entityId,
                STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`,
                NAME: 'Моя стадия',
                SORT: 60,
                SEMANTICS: "F"
            }
        });

        // 6. Получаем и выводим итоговую таблицу стадий
        stages = await call('crm.status.list', {
            filter: { ENTITY_ID: entityId }
        });
        printStagesTable(stages);
    } catch (error) {
        console.error(error.message);
    }

    function printStagesTable(stages) {
        const columns = {
            'В работе': [],
            'Успех': [],
            'Провал': []
        };

        stages.forEach(stage => {
            const semantics = (stage.EXTRA && stage.EXTRA.SEMANTICS) || stage.SEMANTICS;
            if (semantics === 'S') {
                columns['Успех'].push(stage.NAME);
            } else if (semantics === 'F') {
                columns['Провал'].push(stage.NAME);
            } else {
                columns['В работе'].push(stage.NAME);
            }
        });

        // Определяем максимальное количество строк
        const maxRows = Math.max(
            columns['В работе'].length,
            columns['Успех'].length,
            columns['Провал'].length
        );

        // Создаем массив объектов для console.table
        const tableData = [];

        for (let i = 0; i < maxRows; i++) {
            tableData.push({
                'В работе': columns['В работе'][i] || '',
                'Успех': columns['Успех'][i] || '',
                'Провал': columns['Провал'][i] || ''
            });
        }

        console.table(tableData);
    }
    ```

- PHP
  
    ```php
    <?php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $serviceBuilder->getCRMScope();

    try {
        // 1. Получаем entityTypeId по названию смарт-процесса
        $types = $crm->type()
            ->list([], ['title' => 'Закупка оборудования'])
            ->getTypes();
        $entityTypeId = $types[0]->entityTypeId;

        // 2. Создаем новую воронку
        $result = $serviceBuilder->core->call(
            'crm.category.add',
            [
                'entityTypeId' => $entityTypeId,
                'fields' => [
                    'name' => 'Новая воронка',
                    'sort' => 100
                ]
            ]
        );
        $categoryId = $result->getResponseData()->getResult()['category']['id'];
        $entityId = 'DYNAMIC_' . $entityTypeId . '_STAGE_' . $categoryId;

        // 3. Получаем список стадий
        $stages = $crm->status()
            ->list([], ['ENTITY_ID' => $entityId])
            ->getStatuses();

        // 4. Изменяем первую стадию
        if (!empty($stages)) {
            $firstStageId = $stages[0]->ID;
            $crm->status()->update($firstStageId, ['NAME' => 'Первая стадия']);
        }

        // 5. Добавляем новую стадию
        $crm->status()->add([
            'ENTITY_ID' => $entityId,
            'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE',
            'NAME' => 'Моя стадия',
            'SORT' => 60,
            'SEMANTICS' => 'F',
        ]);

        // 6. Получаем итоговую таблицу стадий
        $stages = $crm->status()
            ->list([], ['ENTITY_ID' => $entityId])
            ->getStatuses();
    } catch (\Throwable $e) {
        echo 'Ошибка: ' . $e->getMessage();
        exit;
    }

    // Формируем таблицу стадий
    $columns = [
        'В работе' => [],
        'Успех' => [],
        'Провал' => []
    ];

    foreach ($stages as $stage) {
        $semantics = $stage->EXTRA['SEMANTICS'] ?? $stage->SEMANTICS;
        if ($semantics === 'S') {
            $columns['Успех'][] = $stage->NAME;
        } elseif ($semantics === 'F') {
            $columns['Провал'][] = $stage->NAME;
        } else {
            $columns['В работе'][] = $stage->NAME;
        }
    }

    // Определяем максимальное количество строк
    $maxRows = max(
        count($columns['В работе']),
        count($columns['Успех']),
        count($columns['Провал'])
    );

    // Создаем массив объектов для вывода
    $tableData = [];

    for ($i = 0; $i < $maxRows; $i++) {
        $tableData[] = [
            'В работе' => $columns['В работе'][$i] ?? '',
            'Успех' => $columns['Успех'][$i] ?? '',
            'Провал' => $columns['Провал'][$i] ?? ''
        ];
    }

    // Выводим таблицу 
    echo "Таблица стадий:\n";
    foreach ($tableData as $row) {
        echo "В работе: " . $row['В работе'] . " | Успех: " . $row['Успех'] . " | Провал: " . $row['Провал'] . "\n";
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def print_stages_table(stages):
        columns = {
            "В работе": [],
            "Успех": [],
            "Провал": [],
        }

        for stage in stages:
            semantics = (stage.get("EXTRA") or {}).get("SEMANTICS") or stage.get("SEMANTICS")
            if semantics == "S":
                columns["Успех"].append(stage["NAME"])
            elif semantics == "F":
                columns["Провал"].append(stage["NAME"])
            else:
                columns["В работе"].append(stage["NAME"])

        max_rows = max(
            len(columns["В работе"]),
            len(columns["Успех"]),
            len(columns["Провал"]),
        )

        table_data = []
        for index in range(max_rows):
            table_data.append(
                {
                    "В работе": columns["В работе"][index] if index < len(columns["В работе"]) else "",
                    "Успех": columns["Успех"][index] if index < len(columns["Успех"]) else "",
                    "Провал": columns["Провал"][index] if index < len(columns["Провал"]) else "",
                }
            )

        for row in table_data:
            print(
                "В работе: "
                + row["В работе"]
                + " | Успех: "
                + row["Успех"]
                + " | Провал: "
                + row["Провал"]
            )


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    try:
        entity_type_id = int(
            client.crm.type.list(
                filter={"title": "Закупка оборудования"},
            ).response.result["types"][0]["entityTypeId"]
        )

        category_id = int(
            client.crm.category.add(
                entity_type_id=entity_type_id,
                fields={
                    "name": "Новая воронка",
                    "sort": 100,
                },
            ).response.result["category"]["id"]
        )
        entity_id = f"DYNAMIC_{entity_type_id}_STAGE_{category_id}"

        stages = client.crm.status.list(
            filter={"ENTITY_ID": entity_id},
        ).response.result

        if stages:
            first_stage_id = int(stages[0]["ID"])
            client.crm.status.update(
                first_stage_id,
                fields={
                    "NAME": "Первая стадия",
                },
            ).response

        client.crm.status.add(
            fields={
                "ENTITY_ID": entity_id,
                "STATUS_ID": f"DT{entity_type_id}_{category_id}:MY_STAGE",
                "NAME": "Моя стадия",
                "SORT": 60,
                "SEMANTICS": "F",
            }
        ).response

        stages = client.crm.status.list(
            filter={"ENTITY_ID": entity_id},
        ).response.result
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        print("Таблица стадий:")
        print_stages_table(stages)
    ```

{% endlist %}
