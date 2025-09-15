# Как получить список дел из сделок

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение сделок в CRM

Список дел позволяет отслеживать текущие задачи и звонки по сделкам, сроки выполнения дел и ответственных. Чтобы сформировать таблицу дел, последовательно выполним методы:

1. [user.current](../../../api-reference/user/user-current.md) — найдем `ID` текущего пользователя,

2. [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — получим `ID` всех сделок, в которых сотрудник является ответственным,

3. [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — сформируем список дел по сделкам,

4. [user.get](../../../api-reference/user/user-get.md) — получим информацию об ответственных за дела.

## 1. Получим ID текущего пользователя

Чтобы получить идентификатор текущего пользователя, используем метод [user.current](../../../api-reference/user/user-current.md).

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

    ```javascript
    BX24.callMethod(
        'user.current',
        {}
    );
    ```

-  PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.current',
        []
    );
    ```

{% endlist %}

В результате получим идентификатор пользователя `"ID": "29"`.

```json
{
    "result": {
        "ID": "29",
        "ACTIVE": true,
        "NAME": "Иван",
        "LAST_NAME": "Иванов",
        ...
    }
}
```

## 2. Получим список ID сделок сотрудника

Чтобы получить идентификаторы сделок, закрепленных за сотрудником, вызовем метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md). Передаем параметры:

-  `entityTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `2`, то есть сделка.

-  `select` — массив полей, которые нужно выбрать. Укажем `select: ['id','title']`, чтобы получить идентификаторы и названия сделок.

-  `filter` — фильтр выборки. Чтобы выбрать сделки по `ID` ответственного сотрудника, укажем идентификатор пользователя, который получили в прошлом запросе `assignedById: 29`.

{% note info "" %}

Чтобы запрос работал быстрее и возвращал только актуальные данные, добавьте фильтр по стадиям `stageId`. Например можно выбрать сделки на стадии *В работе*.

[Как отфильтровать элементы по названию стадии](../../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)

{% endnote %}

{% list tabs %}

-  JS

    ```javascript
    BX24.callMethod(
        'crm.item.list',
        {
            entityTypeId: 2,
            select: ['id','title'],
            filter: {
                assignedById: 29
            }
        }
    );
    ```

-  PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 2,
            'select' => ['id','title'],
            'filter' => [
                'assignedById' => 29
            ]
        ]
    );
    ```

{% endlist %}

В результате получим массив `items` c идентификаторами сделок вида `"id": 5111`.

```json
{
    "result": {
        "items": [
            { "id": 5111, "title": "Сделка №1" },
            { "id": 5199, "title": "Сделка №2" },
            { "id": 5257, "title": "Сделка №3" }
        ]
    },
    "total": 3
}
```

## 3. Получим список дел по найденным сделкам

Для получения списка дел используем метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md).

Чтобы выбрать дела из нескольких сделок, в фильтре `filter` используем ключ привязки к элементам CRM  `BINDINGS`. Передадим в нем массив объектов. Каждый объект содержит:

-  `OWNER_TYPE_ID` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `2`, то есть сделка.

-  `OWNER_ID` — идентификатор сделки из результата прошлого запроса.

Также отфильтруем только активные дела `COMPLETED: 'N'`.

Выведем в результате `select` поля:

-  `ID` — идентификатор дела,

-  `OWNER_ID` — идентификатор сделки,

-  `SUBJECT` — описание дела,

-  `DEADLINE` — дата и время срока выполнения,

-  `RESPONSIBLE_ID` — идентификатор пользователя, ответственного за дело.

{% list tabs %}

-  JS

    ```javascript
    BX24.callMethod(
        'crm.activity.list',
        {
            filter: {
                BINDINGS: [
                    { OWNER_TYPE_ID: 2, OWNER_ID: 5111 },
                    { OWNER_TYPE_ID: 2, OWNER_ID: 5199 },
                    { OWNER_TYPE_ID: 2, OWNER_ID: 5257 }
                ],
                COMPLETED: 'N'
            },
            select: ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID']
        }
    );
    ```

-  PHP

    ```php
    require_once('crest.php');
    
    $result = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'BINDINGS' => [
                    ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5111],
                    ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5199],
                    ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5257]
                ],
                'COMPLETED' => 'N'
            ],
            'select' => ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID']
        ]
    );
    ```

{% endlist %}

В результате получим список дел с описанием каждого дела.

```json
{
    "result": [
        {
            "ID": "10120",
            "OWNER_ID": "5111",
            "SUBJECT": "Позвонить клиенту",
            "DEADLINE": "2025-08-21T16:00:00+03:00",
            "RESPONSIBLE_ID": "29"
        },
        {
            "ID": "10131",
            "OWNER_ID": "5199",
            "SUBJECT": "Проверить договор",
            "DEADLINE": "2025-08-29T16:00:00+03:00",
            "RESPONSIBLE_ID": "47"
        },
        ...
    ],
    "total": 5
}
```

## 4. Получим данные пользователей по RESPONSIBLE_ID

Ответственным за дело в сделке может быть любой пользователь, не только ответственный за сделку. Чтобы увидеть в таблице имя и фамилию ответственного за дело, используем метод [user.get](../../../api-reference/user/user-get.md).

В фильтре `filter` передадим идентификаторы ответственных `ID: [29, 47, ...]`.

{% list tabs %}

-  JS

    ```javascript
    BX24.callMethod(
        'user.get',
        {
            filter: {
                ID: [29, 47, ...]
            }
        }
    );
    ```

-  PHP

    ```php
    require_once('crest.php');
    
    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                'ID' => [29, 47, ...]
            ]
        ]
    );
    ```

{% endlist %}

В результате получим информацию о пользователях.

```json
{
    "result": [
        {
            "ID": "29",
            "XML_ID": "23699770",
            "ACTIVE": true,
            "NAME": "Иван",
            "LAST_NAME": "Иванов"
        },
        {
            "ID": "47",
            "XML_ID": "63726962",
            "ACTIVE": true,
            "NAME": "Петр",
            "LAST_NAME": "Петров"
        },
        ...
    ],
    "total": 3,
}
```

## Пример кода

{% list tabs %}

-  JS

    ```javascript
    // Функция для формирования массива привязок к сделкам
    // тип объекта CRM OWNER_TYPE_ID — 2, то есть сделка
    function buildBindingsFromDealIds(dealIds) {
        return dealIds.map((id) => ({ OWNER_TYPE_ID: 2, OWNER_ID: id }));
    }
    
    // Функция для получения всех элементов с помощью постраничной навигации
    // Нужна для списочных методов, так как один запрос получает максимум 50 записей
    function fetchAllItems(method, params, callback) {
        let allResults = [];
        
        function processResult(result) {
            if (result.error()) {
                console.error(`Ошибка получения данных из ${method}:`, result.error().ex);
                callback(result.error(), null);
                return;
            }
    
            const data = result.data();
            
            // Обработка результатов в зависимости от метода
            if (method === 'crm.item.list') {
                allResults = allResults.concat(data.items || []);
            } else if (method === 'crm.activity.list') {
                allResults = allResults.concat(data || []);
            } else {
                if (Array.isArray(data)) {
                    allResults = allResults.concat(data);
                } else if (data && Array.isArray(data.result)) {
                    allResults = allResults.concat(data.result);
                }
            }
    
            // Проверяем, есть ли ещё данные
            if (result.more && result.more()) {
                // Используем result.next() для получения следующей страницы
                result.next(processResult);
            } else {
                // Если больше нет страниц, завершаем
                callback(null, allResults);
            }
        }
    
        // Первый запрос
        BX24.callMethod(method, params, processResult);
    }
    
    // Шаг 1: Получаем информацию о текущем пользователе
    BX24.callMethod('user.current', {}, function(userResult) {
        if (userResult.error()) {
            console.error('Ошибка получения пользователя:', userResult.error().ex);
            return;
        }
    
        const current = userResult.data();
        const userId = Number(current.ID);
        console.log('Текущий пользователь ID:', userId);
    
        // Шаг 2: Получаем список всех сделок
        fetchAllItems('crm.item.list', {
            entityTypeId: 2,
            select: ['id', 'title'],
            filter: { assignedById: userId }
        }, function(error, allItems) {
            if (error) {
                console.error('Ошибка получения всех сделок:', error.ex);
                return;
            }
    
            const dealIds = allItems.map(it => it.id);
            const dealMap = allItems.reduce((map, deal) => {
                map[deal.id] = deal.title;
                return map;
            }, {});
    
            console.log('Сделки:', dealMap);
    
            if (dealIds.length === 0) {
                alert('У сотрудника нет сделок');
                return;
            }
    
            // Формируем привязки для поиска дел по сделкам
            const bindings = buildBindingsFromDealIds(dealIds);
    
            // Шаг 3: Получаем все дела, привязанные к этим сделкам
            fetchAllItems('crm.activity.list', {
                filter: { BINDINGS: bindings, COMPLETED: 'N' },
                select: ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID']
            }, function(error, allActivities) {
                if (error) {
                    console.error('Ошибка получения всех дел:', error.ex);
                    return;
                }
    
                const userIds = [...new Set(allActivities.map(a => a.RESPONSIBLE_ID))];
    
                if (userIds.length === 0) {
                    console.log('Нет незавершенных дел по сделкам.');
                    console.table([]);
                    return;
                }
    
                // Шаг 4: Получаем данные пользователей
                BX24.callMethod('user.get', {
                    filter: { ID: userIds }
                }, function(userResult) {
                    if (userResult.error()) {
                        console.error('Ошибка получения пользователей:', userResult.error().ex);
                        const tableFallback = allActivities.map(a => ({
                            activityId: a.ID,
                            dealTitle: dealMap[a.OWNER_ID] || `Сделка #${a.OWNER_ID}`,
                            subject: a.SUBJECT,
                            deadline: a.DEADLINE,
                            responsibleId: a.RESPONSIBLE_ID,
                            responsibleName: `Пользователь ${a.RESPONSIBLE_ID} (не найден)`
                        }));
                        console.table(tableFallback);
                        return;
                    }
    
                    const users = userResult.data();
                    const userMap = users.reduce((map, user) => {
                        map[user.ID] = `${user.NAME || ''} ${user.LAST_NAME || ''}`.trim() || user.LOGIN;
                        return map;
                    }, {});
    
                    const table = allActivities.map(a => ({
                        activityId: a.ID,
                        dealTitle: dealMap[a.OWNER_ID] || `Сделка #${a.OWNER_ID}`,
                        subject: a.SUBJECT,
                        deadline: a.DEADLINE,
                        responsibleId: a.RESPONSIBLE_ID,
                        responsibleName: userMap[a.RESPONSIBLE_ID] || `Пользователь ${a.RESPONSIBLE_ID}`
                    }));
    
                    console.table(table);
                });
            });
        });
    });
    ```

-  PHP

    ```php
    <?php
    
    require_once('crest.php');
    
    // Функция для формирования массива привязок к сделкам
    // OWNER_TYPE_ID: 2 — тип объекта CRM — сделка
    function buildBindingsFromDealIds($dealIds) {
        $bindings = [];
        foreach ($dealIds as $id) {
            $bindings[] = [
                'OWNER_TYPE_ID' => 2,
                'OWNER_ID' => (int)$id,
            ];
        }
        return $bindings;
    }
    
    // Функция для получения всех элементов с помощью постраничной навигации
    // Нужна для списочных методов, так как один запрос получает максимум 50 записей
    function fetchAllItems($method, $params) {
        $allResults = [];
        
        $start = 0;
        $batchSize = 50;
        
        do {
            $params['start'] = $start;
            $result = CRest::call($method, $params);
            
            if (!empty($result['error'])) {
                return ['error' => $result['error'], 'error_description' => $result['error_description']];
            }
            
            $data = $result['result'] ?? [];
            
            // Обработка результатов в зависимости от метода
            if ($method === 'crm.item.list') {
                if (!empty($data['items']) && is_array($data['items'])) {
                    $allResults = array_merge($allResults, $data['items']);
                }
            } elseif ($method === 'crm.activity.list') {
                if (is_array($data)) {
                    $allResults = array_merge($allResults, $data);
                }
            } else {
                if (is_array($data)) {
                    $allResults = array_merge($allResults, $data);
                }
            }
            
            // Проверяем, есть ли ещё данные
            if (count($data) >= $batchSize) {
                $start += $batchSize;
            } else {
                break;
            }
            
        } while (true);
        
        return ['result' => $allResults];
    }
    
    // Шаг 1: Получаем информацию о текущем пользователе
    $userResult = CRest::call('user.current', []);
    
    if (!empty($userResult['error'])) {
        echo 'Ошибка получения пользователя: ' . $userResult['error_description'] . "\n";
        exit;
    }
    
    $current = $userResult['result'] ?? null;
    if (!$current || empty($current['ID'])) {
        echo "Не удалось получить текущего пользователя\n";
        exit;
    }
    
    $userId = (int)$current['ID'];
    echo "Текущий пользователь ID: $userId\n";
    
    // Шаг 2: Получаем список всех сделок
    $itemsResult = fetchAllItems('crm.item.list', [
        'entityTypeId' => 2,
        'select' => ['id', 'title'],
        'filter' => ['assignedById' => $userId]
    ]);
    
    if (isset($itemsResult['error'])) {
        echo 'Ошибка получения всех сделок: ' . $itemsResult['error_description'] . "\n";
        exit;
    }
    
    $allItems = $itemsResult['result'];
    
    $dealMap = [];
    $dealIds = [];
    foreach ($allItems as $item) {
        $id = (int)$item['id'];
        $dealIds[] = $id;
        $dealMap[$id] = $item['title'];
    }
    
    echo "Найдено сделок: " . count($dealIds) . "\n";
    
    if (empty($dealIds)) {
        echo "У сотрудника нет сделок\n";
        exit;
    }
    
    // Формируем привязки для поиска дел по сделкам
    $bindings = buildBindingsFromDealIds($dealIds);
    
    // Шаг 3: Получаем все дела, привязанные к этим сделкам
    $activitiesResult = fetchAllItems('crm.activity.list', [
        'filter' => [
            'BINDINGS' => $bindings,
            'COMPLETED' => 'N',
        ],
        'select' => ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID']
    ]);
    
    if (isset($activitiesResult['error'])) {
        echo 'Ошибка получения всех дел: ' . $activitiesResult['error_description'] . "\n";
        exit;
    }
    
    $allActivities = $activitiesResult['result'];
    
    if (empty($allActivities)) {
        echo "Нет незавершённых дел по сделкам.\n";
        echo implode("\t", ['ID дела', 'Сделка', 'Тема', 'Дедлайн', 'Ответственный']) . "\n";
        exit;
    }
    
    // Собираем уникальные ID ответственных
    $responsibleIds = array_unique(array_column($allActivities, 'RESPONSIBLE_ID'));
    $userMap = [];
    
    if (!empty($responsibleIds)) {
        // Шаг 4: Получаем данные пользователей
        $usersResult = fetchAllItems('user.get', [
            'filter' => ['ID' => array_values($responsibleIds)]
        ]);
    
        if (isset($usersResult['error'])) {
            echo 'Ошибка получения пользователей: ' . $usersResult['error_description'] . "\n";
            $userMap = [];
        } else {
            foreach ($usersResult['result'] as $user) {
                $fullName = trim(($user['NAME'] ?? '') . ' ' . ($user['LAST_NAME'] ?? ''));
                $userMap[$user['ID']] = $fullName ?: ($user['LOGIN'] ?? "Пользователь {$user['ID']}");
            }
        }
    }
    
    // Формируем и выводим таблицу
    $header = ['ID дела', 'Сделка', 'Тема', 'Дедлайн', 'Ответственный'];
    echo implode("\t", $header) . "\n";
    
    foreach ($allActivities as $a) {
        $activityId = $a['ID'] ?? '';
        $ownerId = (int)($a['OWNER_ID'] ?? 0);
        $dealTitle = $dealMap[$ownerId] ?? "Сделка #{$ownerId}";
        $subject = $a['SUBJECT'] ?? '';
        $deadline = $a['DEADLINE'] ?? '';
        $responsibleId = $a['RESPONSIBLE_ID'] ?? '';
        $responsibleName = $userMap[$responsibleId] ?? "Пользователь {$responsibleId} (не найден)";
    
        echo implode("\t", [
            $activityId,
            $dealTitle,
            $subject,
            $deadline,
            $responsibleName
        ]) . "\n";
    }
    ```

{% endlist %}