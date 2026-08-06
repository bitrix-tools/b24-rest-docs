# Как получить список дел из сделок

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение сделок в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: 'user.current',
        params: {}
    });
    ```

-  PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $currentUser = $sb->getUserScope()->user()->current()->user();
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

    result = client.user.current().response.result
    ```

- Go

    ```go
    res, err := core.Call(ctx, "user.current", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.current: %w", err)
    }

    // Идентификатор приходит СТРОКОЙ ("29"): b24.ID разбирает и число, и строку
    // с числом, обычный int здесь падает.
    var me struct {
    	ID       b24.ID `json:"ID"`
    	Name     string `json:"NAME"`
    	LastName string `json:"LAST_NAME"`
    }
    if err := json.Unmarshal(res.Result, &me); err != nil {
    	return fmt.Errorf("разбор текущего пользователя: %w", err)
    }
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
    const result = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: {
            entityTypeId: 2,
            select: ['id', 'title'],
            filter: {
                assignedById: 29
            }
        }
    });
    ```

-  PHP

    ```php
    $items = $sb->getCRMScope()->item()->list(
        2,
        [],
        ['assignedById' => 29],
        ['id', 'title']
    )->getItems();
    ```

- Python

    ```python
    result = client.crm.item.list(
        entity_type_id=2,
        select=["id", "title"],
        filter={"assignedById": 29},
    ).response.result
    ```

- Go

    ```go
    // Списочный метод отдаёт максимум 50 записей за запрос. Pages идёт по
    // курсору сам: ОТСУТСТВИЕ next заканчивает список, потому что next: 0 —
    // это законное первое смещение, а не признак конца.
    pager, err := core.Pages("crm.item.list", b24.Params{
    	"entityTypeId": entityTypeDeal,
    	"select":       []string{"id", "title"},
    	"filter":       b24.Params{"assignedById": me.ID},
    }, b24.WithCallOptions(b24.WithIdempotent()))
    if err != nil {
    	return fmt.Errorf("crm.item.list: %w", err)
    }

    var deals []struct {
    	ID    int    `json:"id"`
    	Title string `json:"title"`
    }
    for pager.Next(ctx) {
    	for _, row := range pager.Rows() {
    		var d struct {
    			ID    int    `json:"id"`
    			Title string `json:"title"`
    		}
    		if err := json.Unmarshal(row, &d); err != nil {
    			return fmt.Errorf("разбор сделки: %w", err)
    		}
    		deals = append(deals, d)
    	}
    	if len(deals) >= maxDeals {
    		break
    	}
    }
    // Ошибка всплывает ЗДЕСЬ, после цикла: Next возвращает false и в конце
    // списка, и при ошибке.
    if err := pager.Err(); err != nil {
    	return fmt.Errorf("обход сделок: %w", err)
    }
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
    const result = await $b24.actions.v2.call.make({
        method: 'crm.activity.list',
        params: {
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
    });
    ```

-  PHP

    ```php
    $activities = $sb->getCRMScope()->activity()->list(
        [],
        [
            'BINDINGS' => [
                ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5111],
                ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5199],
                ['OWNER_TYPE_ID' => 2, 'OWNER_ID' => 5257]
            ],
            'COMPLETED' => 'N'
        ],
        ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID'],
        0
    )->getActivities();
    ```

- Python

    ```python
    result = client.crm.activity.list(
        filter={
            "BINDINGS": [
                {"OWNER_TYPE_ID": 2, "OWNER_ID": 5111},
                {"OWNER_TYPE_ID": 2, "OWNER_ID": 5199},
                {"OWNER_TYPE_ID": 2, "OWNER_ID": 5257},
            ],
            "COMPLETED": "N",
        },
        select=["ID", "OWNER_ID", "SUBJECT", "DEADLINE", "RESPONSIBLE_ID"],
    ).response.result
    ```

- Go

    ```go
    // BINDINGS — массив привязок: по объекту на каждую сделку.
    bindings := make([]b24.Params, 0, len(deals))
    for _, d := range deals {
    	bindings = append(bindings, b24.Params{"OWNER_TYPE_ID": entityTypeDeal, "OWNER_ID": d.ID})
    }

    pager, err = core.Pages("crm.activity.list", b24.Params{
    	"filter": b24.Params{"BINDINGS": bindings, "COMPLETED": "N"},
    	"select": []string{"ID", "OWNER_ID", "SUBJECT", "DEADLINE", "RESPONSIBLE_ID"},
    }, b24.WithCallOptions(b24.WithIdempotent()))
    if err != nil {
    	return fmt.Errorf("crm.activity.list: %w", err)
    }

    // Поля дел — в ВЕРХНЕМ РЕГИСТРЕ, тогда как crm.item.list отдаёт camelCase.
    var activities []activity
    for pager.Next(ctx) {
    	for _, row := range pager.Rows() {
    		var a activity
    		if err := json.Unmarshal(row, &a); err != nil {
    			return fmt.Errorf("разбор дела: %w", err)
    		}
    		activities = append(activities, a)
    	}
    }
    if err := pager.Err(); err != nil {
    	return fmt.Errorf("обход дел: %w", err)
    }
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
    const result = await $b24.actions.v2.call.make({
        method: 'user.get',
        params: {
            filter: {
                ID: [29, 47]
            }
        }
    });
    ```

-  PHP

    ```php
    $users = $sb->getUserScope()->user()->get(
        [],
        ['ID' => [29, 47]]
    )->getUsers();
    ```

- Python

    ```python
    result = client.user.get(
        filter={
            "ID": [29, 47],
        }
    ).response.result
    ```

- Go

    ```go
    res, err := core.Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{"ID": ids},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }
    var rows []struct {
    	ID       b24.ID `json:"ID"`
    	Name     string `json:"NAME"`
    	LastName string `json:"LAST_NAME"`
    }
    if err := json.Unmarshal(res.Result, &rows); err != nil {
    	return fmt.Errorf("разбор сотрудников: %w", err)
    }
    for _, u := range rows {
    	users[u.ID] = u.Name + " " + u.LastName
    }
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
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Функция для формирования массива привязок к сделкам
    // тип объекта CRM OWNER_TYPE_ID — 2, то есть сделка
    function buildBindingsFromDealIds(dealIds) {
        return dealIds.map((id) => ({ OWNER_TYPE_ID: 2, OWNER_ID: id }));
    }

    // Функция для получения всех элементов с помощью постраничной навигации
    // Нужна для списочных методов, так как один запрос получает максимум 50 записей
    async function fetchAllItems(method, params) {
        let allResults = [];
        let start = 0;
        const batchSize = 50;

        while (true) {
            const result = await $b24.actions.v2.call.make({
                method,
                params: { ...params, start }
            });
            if (!result.isSuccess) {
                throw new Error(`Ошибка получения данных из ${method}: ${result.getErrorMessages().join('; ')}`);
            }

            const data = result.getData().result;

            // Обработка результатов в зависимости от метода
            let pageItems;
            if (method === 'crm.item.list') {
                pageItems = data.items || [];
            } else if (Array.isArray(data)) {
                pageItems = data;
            } else {
                pageItems = data.result || [];
            }
            allResults = allResults.concat(pageItems);

            // Проверяем, есть ли ещё данные
            if (pageItems.length < batchSize) {
                break;
            }
            start += batchSize;
        }

        return allResults;
    }

    // Шаг 1: Получаем информацию о текущем пользователе
    const userResult = await $b24.actions.v2.call.make({ method: 'user.current', params: {} });
    if (!userResult.isSuccess) {
        throw new Error('Ошибка получения пользователя: ' + userResult.getErrorMessages().join('; '));
    }
    const userId = Number(userResult.getData().result.ID);
    console.log('Текущий пользователь ID:', userId);

    // Шаг 2: Получаем список всех сделок
    const allItems = await fetchAllItems('crm.item.list', {
        entityTypeId: 2,
        select: ['id', 'title'],
        filter: { assignedById: userId }
    });

    const dealIds = allItems.map(it => it.id);
    const dealMap = allItems.reduce((map, deal) => {
        map[deal.id] = deal.title;
        return map;
    }, {});

    console.log('Сделки:', dealMap);

    if (dealIds.length === 0) {
        console.log('У сотрудника нет сделок');
    } else {
        // Формируем привязки для поиска дел по сделкам
        const bindings = buildBindingsFromDealIds(dealIds);

        // Шаг 3: Получаем все дела, привязанные к этим сделкам
        const allActivities = await fetchAllItems('crm.activity.list', {
            filter: { BINDINGS: bindings, COMPLETED: 'N' },
            select: ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID']
        });

        const userIds = [...new Set(allActivities.map(a => a.RESPONSIBLE_ID))];

        if (userIds.length === 0) {
            console.log('Нет незавершенных дел по сделкам.');
            console.table([]);
        } else {
            // Шаг 4: Получаем данные пользователей
            const usersResult = await $b24.actions.v2.call.make({
                method: 'user.get',
                params: { filter: { ID: userIds } }
            });

            let userMap = {};
            if (usersResult.isSuccess) {
                userMap = usersResult.getData().result.reduce((map, user) => {
                    map[user.ID] = `${user.NAME || ''} ${user.LAST_NAME || ''}`.trim() || user.LOGIN;
                    return map;
                }, {});
            } else {
                console.error('Ошибка получения пользователей:', usersResult.getErrorMessages().join('; '));
            }

            const table = allActivities.map(a => ({
                activityId: a.ID,
                dealTitle: dealMap[a.OWNER_ID] || `Сделка #${a.OWNER_ID}`,
                subject: a.SUBJECT,
                deadline: a.DEADLINE,
                responsibleId: a.RESPONSIBLE_ID,
                responsibleName: userMap[a.RESPONSIBLE_ID] || `Пользователь ${a.RESPONSIBLE_ID}`
            }));

            console.table(table);
        }
    }
    ```

-  PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

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
    // $fetchPage($start) возвращает массив элементов одной страницы
    function fetchAllItems(callable $fetchPage) {
        $allResults = [];
        $start = 0;
        $batchSize = 50;

        do {
            $pageItems = $fetchPage($start);
            $allResults = array_merge($allResults, $pageItems);

            if (count($pageItems) < $batchSize) {
                break;
            }
            $start += $batchSize;
        } while (true);

        return $allResults;
    }

    $crm = $sb->getCRMScope();

    // Шаг 1: Получаем информацию о текущем пользователе
    $userId = $sb->getUserScope()->user()->current()->user()->ID;
    echo "Текущий пользователь ID: $userId\n";

    // Шаг 2: Получаем список всех сделок
    $allItems = fetchAllItems(fn($start) => $crm->item()->list(
        2,
        [],
        ['assignedById' => $userId],
        ['id', 'title'],
        $start
    )->getItems());

    $dealMap = [];
    $dealIds = [];
    foreach ($allItems as $item) {
        $id = $item->id;
        $dealIds[] = $id;
        $dealMap[$id] = $item->title;
    }

    echo "Найдено сделок: " . count($dealIds) . "\n";

    if (empty($dealIds)) {
        echo "У сотрудника нет сделок\n";
        exit;
    }

    // Формируем привязки для поиска дел по сделкам
    $bindings = buildBindingsFromDealIds($dealIds);

    // Шаг 3: Получаем все дела, привязанные к этим сделкам
    $allActivities = fetchAllItems(fn($start) => $crm->activity()->list(
        [],
        [
            'BINDINGS' => $bindings,
            'COMPLETED' => 'N',
        ],
        ['ID', 'OWNER_ID', 'SUBJECT', 'DEADLINE', 'RESPONSIBLE_ID'],
        $start
    )->getActivities());

    if (empty($allActivities)) {
        echo "Нет незавершённых дел по сделкам.\n";
        echo implode("\t", ['ID дела', 'Сделка', 'Тема', 'Дедлайн', 'Ответственный']) . "\n";
        exit;
    }

    // Собираем уникальные ID ответственных
    $responsibleIds = [];
    foreach ($allActivities as $a) {
        $responsibleIds[$a->RESPONSIBLE_ID] = true;
    }
    $responsibleIds = array_keys($responsibleIds);
    $userMap = [];

    if (!empty($responsibleIds)) {
        // Шаг 4: Получаем данные пользователей
        $users = $sb->getUserScope()->user()->get([], ['ID' => $responsibleIds])->getUsers();
        foreach ($users as $user) {
            $fullName = trim(($user->NAME ?? '') . ' ' . ($user->LAST_NAME ?? ''));
            $userMap[$user->ID] = $fullName ?: ($user->LOGIN ?? "Пользователь {$user->ID}");
        }
    }

    // Формируем и выводим таблицу
    $header = ['ID дела', 'Сделка', 'Тема', 'Дедлайн', 'Ответственный'];
    echo implode("\t", $header) . "\n";

    foreach ($allActivities as $a) {
        $activityId = $a->ID;
        $ownerId = (int)$a->OWNER_ID;
        $dealTitle = $dealMap[$ownerId] ?? "Сделка #{$ownerId}";
        $subject = $a->SUBJECT ?? '';
        $deadline = $a->DEADLINE;
        $responsibleId = $a->RESPONSIBLE_ID;
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

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    def build_bindings_from_deal_ids(deal_ids):
        return [{"OWNER_TYPE_ID": 2, "OWNER_ID": deal_id} for deal_id in deal_ids]


    def fetch_all_items(fetch_page, data_key=None):
        all_results = []
        start = 0
        batch_size = 50

        while True:
            response = fetch_page(start)
            if data_key is None:
                page_items = response.result or []
            else:
                page_items = response.result.get(data_key, [])

            all_results.extend(page_items)

            if len(page_items) < batch_size:
                break

            start += batch_size

        return all_results


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    current = client.user.current().response.result
    user_id = int(current["ID"])
    print(f"Текущий пользователь ID: {user_id}")

    all_items = fetch_all_items(
        lambda start: client.crm.item.list(
            entity_type_id=2,
            select=["id", "title"],
            filter={"assignedById": user_id},
            start=start,
        ).response,
        data_key="items",
    )

    deal_ids = [int(item["id"]) for item in all_items]
    deal_map = {int(item["id"]): item["title"] for item in all_items}

    print(f"Найдено сделок: {len(deal_ids)}")

    if not deal_ids:
        print("У сотрудника нет сделок")
    else:
        bindings = build_bindings_from_deal_ids(deal_ids)

        all_activities = fetch_all_items(
            lambda start: client.crm.activity.list(
                filter={
                    "BINDINGS": bindings,
                    "COMPLETED": "N",
                },
                select=["ID", "OWNER_ID", "SUBJECT", "DEADLINE", "RESPONSIBLE_ID"],
                start=start,
            ).response
        )

        if not all_activities:
            print("Нет незавершенных дел по сделкам.")
            print("\t".join(["ID дела", "Сделка", "Тема", "Дедлайн", "Ответственный"]))
        else:
            responsible_ids = sorted(
                {
                    int(item["RESPONSIBLE_ID"])
                    for item in all_activities
                    if item.get("RESPONSIBLE_ID")
                }
            )

            user_map = {}
            if responsible_ids:
                users = fetch_all_items(
                    lambda start: client.user.get(
                        filter={"ID": responsible_ids},
                        start=start,
                    ).response
                )
                for user in users:
                    full_name = f"{user.get('NAME', '')} {user.get('LAST_NAME', '')}".strip()
                    user_map[str(user["ID"])] = full_name or user.get("LOGIN", f"Пользователь {user['ID']}")

            print("\t".join(["ID дела", "Сделка", "Тема", "Дедлайн", "Ответственный"]))
            for activity in all_activities:
                activity_id = activity.get("ID", "")
                owner_id = int(activity.get("OWNER_ID", 0))
                deal_title = deal_map.get(owner_id, f"Сделка #{owner_id}")
                subject = activity.get("SUBJECT", "")
                deadline = activity.get("DEADLINE", "")
                responsible_id = activity.get("RESPONSIBLE_ID", "")
                responsible_name = user_map.get(str(responsible_id), f"Пользователь {responsible_id} (не найден)")

                print(
                    "\t".join(
                        [
                            str(activity_id),
                            str(deal_title),
                            str(subject),
                            str(deadline),
                            str(responsible_name),
                        ]
                    )
                )
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
    // Пример самодостаточный: он создаёт две свои сделки с делами, собирает по ним
    // таблицу дел с ответственными и убирает за собой. Запускается на любом
    // портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"os"
    	"sort"
    	"time"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // entityTypeDeal — идентификатор типа объекта «сделка» из crm.enum.ownertype.
    const entityTypeDeal = 2

    // maxDeals ограничивает выборку сделок. BINDINGS — это ФИЛЬТР, а не батч:
    // массив из тысячи привязок уедет в одном запросе и утяжелит его. На боевом
    // портале сделки стоит сузить ещё и фильтром по стадии.
    const maxDeals = 50

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- шаг 1: идентификатор текущего пользователя
    	res, err := core.Call(ctx, "user.current", nil, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("user.current: %w", err)
    	}

    	// Идентификатор приходит СТРОКОЙ ("29"): b24.ID разбирает и число, и строку
    	// с числом, обычный int здесь падает.
    	var me struct {
    		ID       b24.ID `json:"ID"`
    		Name     string `json:"NAME"`
    		LastName string `json:"LAST_NAME"`
    	}
    	if err := json.Unmarshal(res.Result, &me); err != nil {
    		return fmt.Errorf("разбор текущего пользователя: %w", err)
    	}
    	fmt.Printf("текущий пользователь %d: %s %s\n", me.ID, me.Name, me.LastName)

    	// --- подготовка: свои сделки с делами, чтобы таблице было что показать

    	cleanup, err := createDealsWithActivities(ctx, core, me.ID)
    	defer cleanup()
    	if err != nil {
    		return err
    	}

    	// --- шаг 2: сделки, за которые отвечает сотрудник
    	// Списочный метод отдаёт максимум 50 записей за запрос. Pages идёт по
    	// курсору сам: ОТСУТСТВИЕ next заканчивает список, потому что next: 0 —
    	// это законное первое смещение, а не признак конца.
    	pager, err := core.Pages("crm.item.list", b24.Params{
    		"entityTypeId": entityTypeDeal,
    		"select":       []string{"id", "title"},
    		"filter":       b24.Params{"assignedById": me.ID},
    	}, b24.WithCallOptions(b24.WithIdempotent()))
    	if err != nil {
    		return fmt.Errorf("crm.item.list: %w", err)
    	}

    	var deals []struct {
    		ID    int    `json:"id"`
    		Title string `json:"title"`
    	}
    	for pager.Next(ctx) {
    		for _, row := range pager.Rows() {
    			var d struct {
    				ID    int    `json:"id"`
    				Title string `json:"title"`
    			}
    			if err := json.Unmarshal(row, &d); err != nil {
    				return fmt.Errorf("разбор сделки: %w", err)
    			}
    			deals = append(deals, d)
    		}
    		if len(deals) >= maxDeals {
    			break
    		}
    	}
    	// Ошибка всплывает ЗДЕСЬ, после цикла: Next возвращает false и в конце
    	// списка, и при ошибке.
    	if err := pager.Err(); err != nil {
    		return fmt.Errorf("обход сделок: %w", err)
    	}
    	fmt.Printf("сделок сотрудника взято: %d\n", len(deals))
    	if len(deals) == 0 {
    		return nil
    	}

    	// --- шаг 3: дела по этим сделкам
    	// BINDINGS — массив привязок: по объекту на каждую сделку.
    	bindings := make([]b24.Params, 0, len(deals))
    	for _, d := range deals {
    		bindings = append(bindings, b24.Params{"OWNER_TYPE_ID": entityTypeDeal, "OWNER_ID": d.ID})
    	}

    	pager, err = core.Pages("crm.activity.list", b24.Params{
    		"filter": b24.Params{"BINDINGS": bindings, "COMPLETED": "N"},
    		"select": []string{"ID", "OWNER_ID", "SUBJECT", "DEADLINE", "RESPONSIBLE_ID"},
    	}, b24.WithCallOptions(b24.WithIdempotent()))
    	if err != nil {
    		return fmt.Errorf("crm.activity.list: %w", err)
    	}

    	// Поля дел — в ВЕРХНЕМ РЕГИСТРЕ, тогда как crm.item.list отдаёт camelCase.
    	var activities []activity
    	for pager.Next(ctx) {
    		for _, row := range pager.Rows() {
    			var a activity
    			if err := json.Unmarshal(row, &a); err != nil {
    				return fmt.Errorf("разбор дела: %w", err)
    			}
    			activities = append(activities, a)
    		}
    	}
    	if err := pager.Err(); err != nil {
    		return fmt.Errorf("обход дел: %w", err)
    	}
    	fmt.Printf("активных дел: %d\n", len(activities))

    	// --- шаг 4: ответственные за дела

    	// Ответственным за дело может быть не тот, кто отвечает за сделку, поэтому
    	// идентификаторы берутся из самих дел.
    	ids := uniqueIDs(activities)
    	users := map[b24.ID]string{}
    	if len(ids) > 0 {
    		res, err := core.Call(ctx, "user.get", b24.Params{
    			"filter": b24.Params{"ID": ids},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("user.get: %w", err)
    		}
    		var rows []struct {
    			ID       b24.ID `json:"ID"`
    			Name     string `json:"NAME"`
    			LastName string `json:"LAST_NAME"`
    		}
    		if err := json.Unmarshal(res.Result, &rows); err != nil {
    			return fmt.Errorf("разбор сотрудников: %w", err)
    		}
    		for _, u := range rows {
    			users[u.ID] = u.Name + " " + u.LastName
    		}
    	}

    	titles := map[int]string{}
    	for _, d := range deals {
    		titles[d.ID] = d.Title
    	}
    	fmt.Println("Дело\tСделка\tОписание\tСрок\tОтветственный")
    	for _, a := range activities {
    		who := users[a.ResponsibleID]
    		if who == "" {
    			who = "Неизвестно"
    		}
    		fmt.Printf("%d\t%s\t%s\t%s\t%s\n", a.ID, titles[int(a.OwnerID)], a.Subject, a.Deadline, who)
    	}
    	return nil
    }

    // activity — одна строка ответа crm.activity.list.
    type activity struct {
    	ID            b24.ID `json:"ID"`
    	OwnerID       b24.ID `json:"OWNER_ID"`
    	Subject       string `json:"SUBJECT"`
    	Deadline      string `json:"DEADLINE"`
    	ResponsibleID b24.ID `json:"RESPONSIBLE_ID"`
    }

    func uniqueIDs(activities []activity) []b24.ID {
    	seen := map[b24.ID]bool{}
    	out := make([]b24.ID, 0, len(activities))
    	for _, a := range activities {
    		if a.ResponsibleID > 0 && !seen[a.ResponsibleID] {
    			seen[a.ResponsibleID] = true
    			out = append(out, a.ResponsibleID)
    		}
    	}
    	sort.Slice(out, func(i, j int) bool { return out[i] < out[j] })
    	return out
    }

    // --- вспомогательное: подготовка данных и уборка

    // createDealsWithActivities создаёт две сделки и по делу в каждой. Возвращает
    // функцию уборки — она вызывается даже если подготовка оборвалась на середине.
    func createDealsWithActivities(ctx context.Context, core *b24.Core, userID b24.ID) (func(), error) {
    	var dealIDs []b24.ID
    	cleanup := func() {
    		// Удаление сделки уносит и её дела.
    		for _, id := range dealIDs {
    			del(ctx, core, "crm.item.delete", b24.Params{"entityTypeId": entityTypeDeal, "id": id})
    		}
    	}

    	for i, spec := range []struct {
    		title string
    		task  string
    		in    time.Duration
    	}{
    		{"Закупка печей (пример b24gosdk)", "Позвонить клиенту", 24 * time.Hour},
    		{"Закупка блендеров (пример b24gosdk)", "Отправить счёт", 48 * time.Hour},
    	} {
    		res, err := core.Call(ctx, "crm.item.add", b24.Params{
    			"entityTypeId": entityTypeDeal,
    			"fields": b24.Params{
    				"title":        spec.title,
    				"assignedById": userID,
    				"opportunity":  (i + 1) * 100,
    			},
    		})
    		if err != nil {
    			return cleanup, fmt.Errorf("crm.item.add: %w", err)
    		}
    		raw, ok := b24.Unwrap(res.Result, "item", "id")
    		if !ok {
    			return cleanup, fmt.Errorf("нет item.id в %s", res.Result)
    		}
    		var dealID b24.ID
    		if err := json.Unmarshal(raw, &dealID); err != nil {
    			return cleanup, err
    		}
    		dealIDs = append(dealIDs, dealID)

    		if _, err := core.Call(ctx, "crm.activity.todo.add", b24.Params{
    			"ownerTypeId":   entityTypeDeal,
    			"ownerId":       dealID,
    			"title":         spec.task,
    			"description":   "Дело создано примером b24gosdk",
    			"deadline":      time.Now().Add(spec.in).Format(time.RFC3339),
    			"responsibleId": userID,
    		}); err != nil {
    			return cleanup, fmt.Errorf("crm.activity.todo.add: %w", err)
    		}
    	}
    	return cleanup, nil
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
