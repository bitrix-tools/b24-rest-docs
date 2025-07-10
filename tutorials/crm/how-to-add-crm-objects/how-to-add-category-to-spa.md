# Как создать новую воронку со стадиями в смарт-процессе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователи с административным доступом к разделу CRM

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
    BX24.callMethod(
        'crm.type.list',
        {
            filter: { title: 'Закупка оборудования' }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }
            var types = result.data().types;
            if (types.length > 0) {
                var entityTypeId = types[0].entityTypeId;
                console.log('entityTypeId:', entityTypeId);
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');
    $result = CRest::call(
        'crm.type.list',
        [ 'filter' => [ 'title' => 'Закупка оборудования' ] ]
    );
    $entityTypeId = $result['result']['types'][0]['entityTypeId'];
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
    BX24.callMethod(
        'crm.category.add',
        {
            entityTypeId: entityTypeId, 
            fields: {
                name: 'Новая воронка',
                sort: 100
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }
            var categoryId = result.data().category.id;
            console.log('categoryId:', categoryId);
        }
    );
    ```

- PHP
  
    ```php
    $result = CRest::call(
        'crm.category.add',
        [
            'entityTypeId' => $entityTypeId,
            'fields' => [
                'name' => 'Новая воронка',
                'sort' => 100,
            ]
        ]
    );
    $categoryId = $result['result']['category']['id'];
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
    BX24.callMethod(
        'crm.status.list',
        {
            filter: { ENTITY_ID: entityId }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }
            var stages = result.data();
            console.log('Стадии:', stages);
        }
    );
    ```
- PHP
  
    ```php
    $entityId = "DYNAMIC_{$entityTypeId}_STAGE_{$categoryId}";
    $result = CRest::call(
        'crm.status.list',
        [ 'filter' => [ 'ENTITY_ID' => $entityId ] ]
    );
    $stages = $result['result'];
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
    BX24.callMethod(
        'crm.status.update',
        {
            id: stageId, 
            fields: {
                NAME: 'Новое название'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }
            console.log('Стадия обновлена');
        }
    );
    ```

- PHP
  
    ```php
    $result = CRest::call(
        'crm.status.update',
        [
            'id' => $stageId,
            'fields' => [
                'NAME' => 'Новое название',
            ]
        ]
    );
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
    BX24.callMethod(
        'crm.status.add',
        {
            fields: {
                ENTITY_ID: entityId,
                STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`,
                NAME: 'Моя стадия',
                SORT: 60,
                SEMANTICS: "F",
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }
            console.log('ID новой стадии:', result.data());
        }
    );
    ```

- PHP
  
    ```php
    $result = CRest::call(
        'crm.status.add',
        [
            'fields' => [
                'ENTITY_ID' => $entityId,
                'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE',,
                'SORT' => 60,
                'SEMANTICS' => 'F',
            ]
        ]
    );
    $newStageId = $result['result'];
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
    // 1. Получаем entityTypeId по названию смарт-процесса
    BX24.callMethod('crm.type.list', {
        filter: {
            title: 'Закупка оборудования'
        }
    }, function(result) {
        if (result.error()) return;
        var entityTypeId = result.data().types[0].entityTypeId;

        // 2. Создаем новую воронку
        BX24.callMethod('crm.category.add', {
            entityTypeId: entityTypeId,
            fields: {
                name: 'Новая воронка',
                sort: 100
            }
        }, function(result) {
            if (result.error()) return;
            var categoryId = result.data().category.id;
            var entityId = `DYNAMIC_${entityTypeId}_STAGE_${categoryId}`;

            // 3. Получаем список стадий
            BX24.callMethod('crm.status.list', {
                filter: {
                    ENTITY_ID: entityId
                }
            }, function(result) {
                if (result.error()) return;
                var stages = result.data();

                // 4. Изменяем первую стадию
                var firstStageId = stages[0].ID;
                BX24.callMethod('crm.status.update', {
                    id: firstStageId,
                    fields: {
                        NAME: 'Первая стадия'
                    }
                }, function() {
                    // 5. Добавляем новую стадию
                    BX24.callMethod('crm.status.add', {
                        fields: {
                            ENTITY_ID: entityId,
                            STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`,
                            NAME: 'Моя стадия',
                            SORT: 60,
                            SEMANTICS: "F"
                        }
                    }, function() {
                        // 6. Получаем и выводим итоговую таблицу стадий
                        BX24.callMethod('crm.status.list', {
                            filter: {
                                ENTITY_ID: entityId
                            }
                        }, function(result) {
                            if (result.error()) return;
                            printStagesTable(result.data());
                        });
                    });
                });
            });
        });
    });

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
    require_once('crest.php');

    // 1. Получаем entityTypeId по названию смарт-процесса
    $result = CRest::call(
        'crm.type.list',
        [
            'filter' => [
                'title' => 'Закупка оборудования'
            ]
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    $entityTypeId = $result['result']['types'][0]['entityTypeId'];

    // 2. Создаем новую воронку
    $result = CRest::call(
        'crm.category.add',
        [
            'entityTypeId' => $entityTypeId,
            'fields' => [
                'name' => 'Новая воронка',
                'sort' => 100
            ]
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    $categoryId = $result['result']['category']['id'];
    $entityId = 'DYNAMIC_' . $entityTypeId . '_STAGE_' . $categoryId;

    // 3. Получаем список стадий
    $result = CRest::call(
        'crm.status.list',
        [
            'filter' => [
                'ENTITY_ID' => $entityId
            ]
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    $stages = $result['result'];

    // 4. Изменяем первую стадию
    if (!empty($stages)) {
        $firstStageId = $stages[0]['ID'];
        $result = CRest::call(
            'crm.status.update',
            [
                'id' => $firstStageId,
                'fields' => [
                    'NAME' => 'Первая стадия'
                ]
            ]
        );

        if ($result['error']) {
            echo 'Ошибка: ' . $result['error_description'];
            exit;
        }
    }

    // 5. Добавляем новую стадию
    $result = CRest::call(
        'crm.status.add',
        [
            'fields' => [
                'ENTITY_ID' => $entityId,
                'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE',
                'NAME' => 'Моя стадия',
                'SORT' => 60,
                'SEMANTICS' => 'F',
            ]
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    // 6. Получаем и выводим итоговую таблицу стадий
    $result = CRest::call(
        'crm.status.list',
        [
            'filter' => [
                'ENTITY_ID' => $entityId
            ]
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    $stages = $result['result'];

    // Формируем таблицу стадий
    $columns = [
        'В работе' => [],
        'Успех' => [],
        'Провал' => []
    ];

    foreach ($stages as $stage) {
        $semantics = ($stage['EXTRA'] && $stage['EXTRA']['SEMANTICS']) ? $stage['EXTRA']['SEMANTICS'] : $stage['SEMANTICS'];
        if ($semantics === 'S') {
            $columns['Успех'][] = $stage['NAME'];
        } elseif ($semantics === 'F') {
            $columns['Провал'][] = $stage['NAME'];
        } else {
            $columns['В работе'][] = $stage['NAME'];
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

{% endlist %}
