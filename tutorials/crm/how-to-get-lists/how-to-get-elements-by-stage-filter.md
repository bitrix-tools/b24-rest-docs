# Как отфильтровать элементы по названию стадии

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение элементов CRM

Название стадии не хранится в поле «Стадия» элемента CRM. Поле «Стадия» содержит идентификатор. Соотнести название и идентификатор стадии можно используя методы для работы со [справочниками](../../../api-reference/crm/status/index.md) — системными полями типа «список». Для поиска элементов по названию стадии последовательно выполним три метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получим идентификатор воронки
2. [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — получим идентификатор стадии в воронке
3. [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — получим список элементов на стадии

## 1. Получим идентификатор воронки

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:
- `entityTypeId` — укажем `2` для сделок. Это идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Чтобы узнать идентификатор смарт-процесса, выполните метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) без параметров.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript  
    BX24.callMethod(
        "crm.category.list",
        {
            entityTypeId: 2,
        },
    );
    ```
- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.list',
        [
            'entityTypeId' => 2
        ]
    );
    ```

{% endlist %}

В результате получили воронки сделок. Определим нужную воронку по названию в поле `name`. Идентификатор воронки возьмем из поля `id`.

```json
{
    "result": {
        "categories": [
            {
                "id": 9,
                "name": "Воронка с оригинальным названием",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 10,
                "name": "Лидовый маршрут",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 11,
                "name": "Путь успеха",
                "sort": 200,
                "entityTypeId": 2,
                "isDefault": "N",
                "originId": "",
                "originatorId": ""
            },
            {
                "id": 0,
                "name": "Общая",
                "sort": 300,
                "entityTypeId": 2,
                "isDefault": "Y"
            }
        ]
    },
    "total": 4,
}
```

## 2. Получим идентификатор стадии

Используем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром:

- `ENTITY_ID` — укажем `DEAL_STAGE_10`, где `10` — идентификатор воронки, полученный на шаге 1.
 Для получения стадий смарт-процесса используйте формулу вида `DYNAMIC_185_STAGE_11`, где `185` — `ID` смарт-процесса, `11` — `ID` воронки.
 Если `ID` воронки равно `0`, запрос стадий делайте без добавления `_ID`.

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "crm.status.list",
        {
            filter: { "ENTITY_ID": "DEAL_STAGE_10"}
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.status.list',
        [
            'filter' => [
                'ENTITY_ID' => 'DEAL_STAGE_10'
            ]
        ]
    );
    ```

{% endlist %}

В результате получили список стадий. Определим нужную стадию по названию в поле `NAME`. Идентификатор стадии возьмем из поля `STATUS_ID`.

```json
{
    "result": [
        {
            "ID": "331",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:NEW",
            "NAME": "Новая",
            "NAME_INIT": "Новая",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": "5",
            "COLOR": "#39A8EF",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#39A8EF"
            }
        },
        {
            "ID": "333",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:PREPARATION",
            "NAME": "Подготовка документов",
            "NAME_INIT": "",
            "SORT": "20",
            "SYSTEM": "N",
            "CATEGORY_ID": "5",
            "COLOR": "#2FC6F6",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#2FC6F6"
            }
        },
        {
            "ID": "335",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:PREPAYMENT_INVOICE",
            "NAME": "Согласование",
            "NAME_INIT": "",
            "SORT": "30",
            "SYSTEM": "N",
            "CATEGORY_ID": "5",
            "COLOR": "#55d0e0",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#55d0e0"
            }
        },
        {
            "ID": "337",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:EXECUTING",
            "NAME": "В работе",
            "NAME_INIT": "",
            "SORT": "40",
            "SYSTEM": "N",
            "CATEGORY_ID": "5",
            "COLOR": "#47E4C2",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#47E4C2"
            }
        },
        {
            "ID": "339",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:FINAL_INVOICE",
            "NAME": "Финальный счёт",
            "NAME_INIT": "",
            "SORT": "50",
            "SYSTEM": "N",
            "CATEGORY_ID": "5",
            "COLOR": "#FFA900",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#FFA900"
            }
        },
        {
            "ID": "341",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:WON",
            "NAME": "Сделка успешна",
            "NAME_INIT": "Сделка успешна",
            "SORT": "60",
            "SYSTEM": "Y",
            "CATEGORY_ID": "5",
            "COLOR": "#7BD500",
            "SEMANTICS": "S",
            "EXTRA": {
                "SEMANTICS": "success",
                "COLOR": "#7BD500"
            }
        },
        {
            "ID": "343",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:LOSE",
            "NAME": "Сделка провалена",
            "NAME_INIT": "Сделка провалена",
            "SORT": "70",
            "SYSTEM": "Y",
            "CATEGORY_ID": "5",
            "COLOR": "#FF5752",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "failure",
                "COLOR": "#FF5752"
            }
        },
        {
            "ID": "345",
            "ENTITY_ID": "DEAL_STAGE_10",
            "STATUS_ID": "C10:APOLOGY",
            "NAME": "Анализ причины провала",
            "NAME_INIT": "",
            "SORT": "80",
            "SYSTEM": "N",
            "CATEGORY_ID": "5",
            "COLOR": "#FF5752",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "apology",
                "COLOR": "#FF5752"
            }
        }
    ],
    "total": 8,
}
```

## 3. Получим список элементов на стадии

Используем метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметрами:
- `entityTypeId` — укажем `2` для сделок. Это идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Чтобы узнать идентификатор смарт-процесса, выполните метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) без параметров.
- `filter[stageId]` — укажем `C10:PREPAYMENT_INVOICE`. Это идентификатор стадии, полученный на шаге 2.
- `select[]` — укажем поля элементов, которые хотим получить. Без параметра `select` будут возвращены все поля, в том числе пользовательские.

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'crm.item.list',
        {
            entityTypeId: 2,
            select: [
                "id", 
                "title",
                "assignedById", 
                "opportunity", 
            ],
            filter: {
                "stageId": ["C10:PREPAYMENT_INVOICE"],
            },
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 2,
            'select' => [
                "id",
                "title",
                "assignedById",
                "opportunity",
            ],
            'filter' => [
                "stageId" => ["C10:PREPAYMENT_INVOICE"],
            ],
        ]
    );
    ```

{% endlist %}

В результате получили список элементов на запрошенной стадии.

```json
{
    "result": {
        "items": [
            {
                "id": 5111,
                "assignedById": 1,
                "title": "Закупка печей",
                "opportunity": 500
            },
            {
                "id": 5199,
                "assignedById": 29,
                "title": "Закупка обогревателей",
                "opportunity": 250
            },
            {
                "id": 5257,
                "assignedById": 29,
                "title": "Закупка хлебопечек",
                "opportunity": 200
            },
            {
                "id": 5273,
                "assignedById": 29,
                "title": "Закупка машин",
                "opportunity": 0
            },
            {
                "id": 5317,
                "assignedById": 29,
                "title": "Закупка блендеров",
                "opportunity": 100
            }
        ]
    },
    "total": 5,
}
```

## Получим данные ответственного

В полученном результате указан `ID` ответственного за элемент сотрудника. Чтобы вывести имя и фамилию сотрудника, используем метод [user.get](../../../api-reference/user/user-get.md) с фильтром:

- `ID` — укажем значение из параметра `assignedById`, полученное на шаге 3.

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        "user.get",
        {
            "ID": 29
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'ID' => 29
        ]
    );
    ```

{% endlist %}

В результате получим данные по сотруднику, в том числе поля `NAME` и `LAST_NAME`.

```json
    {
        "result": [
            {
                "ID": "29",
                "ACTIVE": true,
                "NAME": "Вадим",
                "LAST_NAME": "Валеев",
                "SECOND_NAME": "",
                "EMAIL": "v.r.valeev@bitrix.com",
                "LAST_LOGIN": "2025-05-15T13:06:54+00:00",
                "DATE_REGISTER": "2024-07-15T00:00:00+00:00",
                "TIME_ZONE": "",
                "IS_ONLINE": "Y",
                "TIMESTAMP_X": {
                },
                "LAST_ACTIVITY_DATE": {
                },
                "PERSONAL_GENDER": "",
                "PERSONAL_WWW": "",
                "PERSONAL_BIRTHDAY": "2000-07-14T00:00:00+00:00",
                "PERSONAL_MOBILE": "",
                "PERSONAL_CITY": "",
                "WORK_PHONE": "",
                "WORK_POSITION": "",
                "UF_EMPLOYMENT_DATE": "",
                "UF_DEPARTMENT": [1],
                "USER_TYPE": "employee"
            },
        ],
    }
```

## Пример кода

{% list tabs %}

- JS
  
    ```javascript
    // Шаг 1: Запрос названия воронки у пользователя
    let funnelName = prompt("Введите название воронки сделок:");

    // Шаг 2: Получаем список воронок
    BX24.callMethod(
        "crm.category.list",
        {
            entityTypeId: 2,
        },
        function (result) {
            if (result.error()) {
                console.error(result.error().ex);
                return;
            }

            let categories = result.data().categories;
            let selectedFunnel = categories.find(cat => cat.name === funnelName);

            if (!selectedFunnel) {
                alert("Воронка не найдена.");
                return;
            }

            let funnelId = selectedFunnel.id;

            // Шаг 3: Запрос названия стадии у пользователя
            let stageName = prompt("Введите название стадии:");

            // Шаг 4: Получаем список стадий для выбранной воронки
            let entityID = funnelId === 0 ? "DEAL_STAGE" : `DEAL_STAGE_${funnelId}`;

            BX24.callMethod(
                "crm.status.list",
                {
                    filter: { "ENTITY_ID": entityID }
                },
                function (result) {
                    if (result.error()) {
                        console.error(result.error().ex);
                        return;
                    }

                    let stages = result.data();
                    let selectedStage = stages.find(stage => stage.NAME === stageName);

                    if (!selectedStage) {
                        alert("Стадия не найдена.");
                        return;
                    }

                    let stageId = selectedStage.STATUS_ID;

                    // Шаг 5: Получаем список сделок на выбранной стадии
                    BX24.callMethod(
                        "crm.item.list",
                        {
                            entityTypeId: 2,
                            select: ["id", "title", "assignedById", "opportunity"],
                            filter: {
                                "stageId": stageId,
                            },
                        },
                        function (result) {
                            if (result.error()) {
                                console.error(result.error().ex);
                                return;
                            }

                            let deals = result.data().items;
                            let uniqueResponsibleIds = [...new Set(deals.map(deal => deal.assignedById))];

                            let userMap = {};

                            // Шаг 6: Получаем информацию о пользователях
                            uniqueResponsibleIds.forEach(userId => {
                                BX24.callMethod(
                                    "user.get",
                                    {
                                        "ID": userId
                                    },
                                    function (userResult) {
                                        if (userResult.error()) {
                                            console.error(userResult.error().ex);
                                            return;
                                        }

                                        let user = userResult.data()[0];
                                        userMap[userId] = {
                                            name: user.NAME,
                                            lastName: user.LAST_NAME
                                        };
                                    }
                                );
                            });

                            // Шаг 7: Выводим результаты в консоль в виде текстовой таблицы
                            setTimeout(() => {
                                let table = [];

                                // Заголовок
                                table.push([
                                    "ID сделки",
                                    "Название",
                                    "Имя ответственного",
                                    "Фамилия ответственного",
                                    "Ожидаемый доход"
                                ]);

                                // Строки данных
                                deals.forEach(deal => {
                                    let responsible = userMap[deal.assignedById] || { name: "Неизвестно", lastName: "Неизвестно" };
                                    table.push([
                                        deal.id,
                                        deal.title,
                                        responsible.name,
                                        responsible.lastName,
                                        deal.opportunity || 0
                                    ]);
                                });

                                // Выводим таблицу в консоль
                                console.table(table);
                            }, 1000); // Задержка для завершения всех запросов
                        }
                    );
                }
            );
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Шаг 1: Запрос названия воронки у пользователя
    $funnelName = readline("Введите название воронки сделок: ");

    // Шаг 2: Получаем список воронок
    $result = CRest::call(
        'crm.category.list',
        [
            'entityTypeId' => 2
        ]
    );

    if (!empty($result['error'])) {
        echo "Ошибка: " . $result['error_description'] . "\n";
        exit;
    }

    $categories = $result['result']['categories'];
    $selectedFunnel = null;

    foreach ($categories as $category) {
        if ($category['NAME'] === $funnelName) {
            $selectedFunnel = $category;
            break;
        }
    }

    if (!$selectedFunnel) {
        echo "Воронка не найдена.\n";
        exit;
    }

    $funnelId = $selectedFunnel['ID'];

    // Шаг 3: Запрос названия стадии у пользователя
    $stageName = readline("Введите название стадии: ");

    // Шаг 4: Получаем список стадий для выбранной воронки
    $entityID = $funnelId === 0 ? "DEAL_STAGE" : "DEAL_STAGE_{$funnelId}";

    $result = CRest::call(
        'crm.status.list',
        [
            'filter' => [
                'ENTITY_ID' => $entityID
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo "Ошибка: " . $result['error_description'] . "\n";
        exit;
    }

    $stages = $result['result'];
    $selectedStage = null;

    foreach ($stages as $stage) {
        if ($stage['NAME'] === $stageName) {
            $selectedStage = $stage;
            break;
        }
    }

    if (!$selectedStage) {
        echo "Стадия не найдена.\n";
        exit;
    }

    $stageId = $selectedStage['STATUS_ID'];

    // Шаг 5: Получаем список сделок на выбранной стадии
    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 2,
            'select' => [
                "id",
                "title",
                "assignedById",
                "opportunity"
            ],
            'filter' => [
                "stageId" => $stageId
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo "Ошибка: " . $result['error_description'] . "\n";
        exit;
    }

    $deals = $result['result']['items'];
    $uniqueResponsibleIds = array_unique(array_column($deals, 'assignedById'));

    $userMap = [];

    // Шаг 6: Получаем информацию о пользователях
    foreach ($uniqueResponsibleIds as $userId) {
        $result = CRest::call(
            'user.get',
            [
                'ID' => $userId
            ]
        );

        if (!empty($result['error'])) {
            echo "Ошибка: " . $result['error_description'] . "\n";
            continue;
        }

        $user = $result['result'][0];
        $userMap[$userId] = [
            'name' => $user['NAME'],
            'lastName' => $user['LAST_NAME']
        ];
    }

    // Шаг 7: Выводим результаты в виде текстовой таблицы
    $table = [];

    // Заголовок
    $table[] = [
        "ID сделки",
        "Название",
        "Имя ответственного",
        "Фамилия ответственного",
        "Ожидаемый доход"
    ];

    // Строки данных
    foreach ($deals as $deal) {
        $responsible = $userMap[$deal['assignedById']] ?? ['name' => 'Неизвестно', 'lastName' => 'Неизвестно'];
        $table[] = [
            $deal['id'],
            $deal['title'],
            $responsible['name'],
            $responsible['lastName'],
            $deal['opportunity'] ?? 0
        ];
    }

    // Вывод таблицы
    foreach ($table as $row) {
        echo implode("\t", $row) . "\n";
    }
    ```

{% endlist %}