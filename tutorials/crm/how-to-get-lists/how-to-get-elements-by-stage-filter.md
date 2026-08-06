# Как отфильтровать элементы по названию стадии

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение элементов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Название стадии не хранится в поле «Стадия» элемента CRM. Поле «Стадия» содержит идентификатор. Соотнести название и идентификатор стадии можно используя методы для работы со [справочниками](../../../api-reference/crm/status/index.md) — системными полями типа «список». Для поиска элементов по названию стадии последовательно выполним три метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получим идентификатор воронки
2. [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — получим идентификатор стадии в воронке
3. [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — получим список элементов на стадии

## 1. Получим идентификатор воронки

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:
- `entityTypeId` — укажем `2` для сделок. Это идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Чтобы узнать `entityTypeId` смарт-процесса, выполните метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) без параметров.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript  
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: "crm.category.list",
        params: {
            entityTypeId: 2,
        }
    });
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

    $result = $serviceBuilder->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 2
        ]
    );
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    result = client.crm.category.list(
        entity_type_id=2,
    ).response.result
    ```

- Go

    ```go
    res, err := core.Call(ctx, "crm.category.list", b24.Params{
    	"entityTypeId": entityTypeDeal,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.category.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом categories.
    var categories struct {
    	Categories []struct {
    		ID        int    `json:"id"`
    		Name      string `json:"name"`
    		IsDefault string `json:"isDefault"`
    	} `json:"categories"`
    }
    if err := json.Unmarshal(res.Result, &categories); err != nil {
    	return fmt.Errorf("разбор воронок: %w", err)
    }

    // Нужную воронку определяем по названию в поле name.
    funnel := -1
    for i, c := range categories.Categories {
    	if (funnelName == "" && c.IsDefault == "Y") || c.Name == funnelName {
    		funnel = i
    		break
    	}
    }
    if funnel < 0 {
    	return fmt.Errorf("воронка %q не найдена", funnelName)
    }
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
 Для получения стадий смарт-процесса используйте формулу вида `DYNAMIC_185_STAGE_11`, где `185` — `entityTypeId` смарт-процесса, `11` — `ID` воронки.
 Если `ID` воронки равно `0`, запрос стадий делайте без добавления `_ID`.

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: "crm.status.list",
        params: {
            filter: { "ENTITY_ID": "DEAL_STAGE_10"}
        }
    });
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->status()->list(
        [],
        [
            'ENTITY_ID' => 'DEAL_STAGE_10'
        ]
    );
    ```

- Python

    ```python
    result = client.crm.status.list(
        filter={
            "ENTITY_ID": "DEAL_STAGE_10",
        }
    ).response.result
    ```

- Go

    ```go
    // У воронки по умолчанию идентификатор стадий без суффикса, никогда не
    // DEAL_STAGE_0. У смарт-процесса формула другая: DYNAMIC_185_STAGE_11.
    entityID := "DEAL_STAGE"
    if id := categories.Categories[funnel].ID; id > 0 {
    	entityID = fmt.Sprintf("DEAL_STAGE_%d", id)
    }

    res, err = core.Call(ctx, "crm.status.list", b24.Params{
    	"filter": b24.Params{"ENTITY_ID": entityID},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.status.list: %w", err)
    }

    var stages []struct {
    	StatusID string `json:"STATUS_ID"`
    	Name     string `json:"NAME"`
    	// Настоящая семантика стадии лежит в EXTRA: верхнеуровневое поле
    	// SEMANTICS у стадий в работе приходит пустым.
    	Extra struct {
    		Semantics string `json:"SEMANTICS"`
    	} `json:"EXTRA"`
    }
    if err := json.Unmarshal(res.Result, &stages); err != nil {
    	return fmt.Errorf("разбор стадий: %w", err)
    }

    // Нужную стадию определяем по названию в поле NAME, а идентификатор берём
    // из STATUS_ID — именно он попадёт в фильтр следующего шага.
    stage := -1
    for i, s := range stages {
    	if (stageName == "" && s.Extra.Semantics == "process") || s.Name == stageName {
    		stage = i
    		break
    	}
    }
    if stage < 0 {
    	return fmt.Errorf("стадия %q не найдена в воронке %s", stageName, entityID)
    }
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
- `entityTypeId` — укажем `2` для сделок. Это идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Чтобы узнать `entityTypeId` смарт-процесса, выполните метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) без параметров.
- `filter[stageId]` — укажем `C10:PREPAYMENT_INVOICE`. Это идентификатор стадии, полученный на шаге 2.
- `select[]` — укажем поля элементов, которые хотим получить. Без параметра `select` будут возвращены все поля, в том числе пользовательские.

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.item.list',
        params: {
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
        }
    });
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->item()->list(
        2,
        [],
        [
            "stageId" => ["C10:PREPAYMENT_INVOICE"],
        ],
        [
            "id",
            "title",
            "assignedById",
            "opportunity",
        ]
    );
    ```

- Python

    ```python
    result = client.crm.item.list(
        entity_type_id=2,
        select=["id", "title", "assignedById", "opportunity"],
        filter={
            "stageId": ["C10:PREPAYMENT_INVOICE"],
        },
    ).response.result
    ```

- Go

    ```go
    res, err = core.Call(ctx, "crm.item.list", b24.Params{
    	"entityTypeId": entityTypeDeal,
    	"select":       []string{"id", "title", "assignedById", "opportunity"},
    	"filter":       b24.Params{"stageId": stages[stage].StatusID},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.item.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом items, и поля здесь в
    // camelCase — в отличие от crm.status.list двумя вызовами выше.
    var list struct {
    	Items []struct {
    		ID           int     `json:"id"`
    		Title        string  `json:"title"`
    		AssignedByID int     `json:"assignedById"`
    		Opportunity  float64 `json:"opportunity"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &list); err != nil {
    	return fmt.Errorf("разбор элементов: %w", err)
    }
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
    const result = await $b24.actions.v2.call.make({
        method: "user.get",
        params: {
            "ID": 29
        }
    });
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getUserScope()->user()->get(
        [],
        ['ID' => 29]
    );
    ```

- Python

    ```python
    result = client.user.get(
        filter={"ID": 29},
    ).response.result
    ```

- Go

    ```go
    res, err = core.Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{"ID": ids},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }

    // user.get отвечает в UPPER_SNAKE, а идентификатор присылает строкой.
    var rows []struct {
    	ID       b24.ID `json:"ID"`
    	Name     string `json:"NAME"`
    	LastName string `json:"LAST_NAME"`
    }
    if err := json.Unmarshal(res.Result, &rows); err != nil {
    	return fmt.Errorf("разбор сотрудников: %w", err)
    }
    for _, u := range rows {
    	users[int(u.ID)] = u.Name + " " + u.LastName
    }
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
    import { B24Hook } from '@bitrix24/b24jssdk'
    import { createInterface } from 'node:readline/promises'

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
        const rl = createInterface({ input: process.stdin, output: process.stdout });

        // Шаг 1: Запрос названия воронки у пользователя
        let funnelName = await rl.question("Введите название воронки сделок: ");

        // Шаг 2: Получаем список воронок
        let categories = (await call("crm.category.list", { entityTypeId: 2 })).categories;
        let selectedFunnel = categories.find(cat => cat.name === funnelName);

        if (!selectedFunnel) {
            console.log("Воронка не найдена.");
            rl.close();
        } else {
            let funnelId = selectedFunnel.id;

            // Шаг 3: Запрос названия стадии у пользователя
            let stageName = await rl.question("Введите название стадии: ");
            rl.close();

            // Шаг 4: Получаем список стадий для выбранной воронки
            let entityID = funnelId === 0 ? "DEAL_STAGE" : `DEAL_STAGE_${funnelId}`;

            let stages = await call("crm.status.list", { filter: { "ENTITY_ID": entityID } });
            let selectedStage = stages.find(stage => stage.NAME === stageName);

            if (!selectedStage) {
                console.log("Стадия не найдена.");
            } else {
                let stageId = selectedStage.STATUS_ID;

                // Шаг 5: Получаем список сделок на выбранной стадии
                let deals = (await call("crm.item.list", {
                    entityTypeId: 2,
                    select: ["id", "title", "assignedById", "opportunity"],
                    filter: {
                        "stageId": stageId,
                    },
                })).items;

                let uniqueResponsibleIds = [...new Set(deals.map(deal => deal.assignedById))];

                let userMap = {};

                // Шаг 6: Получаем информацию о пользователях
                for (const userId of uniqueResponsibleIds) {
                    let users = await call("user.get", { "ID": userId });
                    let user = users[0];
                    userMap[userId] = {
                        name: user.NAME,
                        lastName: user.LAST_NAME
                    };
                }

                // Шаг 7: Выводим результаты в консоль в виде текстовой таблицы
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
            }
        }
    } catch (error) {
        console.error(error.message);
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

    $crm = $serviceBuilder->getCRMScope();

    // Шаг 1: Запрос названия воронки у пользователя
    $funnelName = readline("Введите название воронки сделок: ");

    // Шаг 2: Получаем список воронок
    $categories = $serviceBuilder->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 2
        ]
    )->getResponseData()->getResult()['categories'];

    $selectedFunnel = null;

    foreach ($categories as $category) {
        if ($category['name'] === $funnelName) {
            $selectedFunnel = $category;
            break;
        }
    }

    if (!$selectedFunnel) {
        echo "Воронка не найдена.\n";
        exit;
    }

    $funnelId = $selectedFunnel['id'];

    // Шаг 3: Запрос названия стадии у пользователя
    $stageName = readline("Введите название стадии: ");

    // Шаг 4: Получаем список стадий для выбранной воронки
    $entityID = $funnelId === 0 ? "DEAL_STAGE" : "DEAL_STAGE_{$funnelId}";

    $stages = $crm->status()->list(
        [],
        [
            'ENTITY_ID' => $entityID
        ]
    )->getStatuses();

    $selectedStage = null;

    foreach ($stages as $stage) {
        if ($stage->NAME === $stageName) {
            $selectedStage = $stage;
            break;
        }
    }

    if (!$selectedStage) {
        echo "Стадия не найдена.\n";
        exit;
    }

    $stageId = $selectedStage->STATUS_ID;

    // Шаг 5: Получаем список сделок на выбранной стадии
    $deals = $crm->item()->list(
        2,
        [],
        [
            "stageId" => $stageId
        ],
        [
            "id",
            "title",
            "assignedById",
            "opportunity"
        ]
    )->getItems();

    $uniqueResponsibleIds = [];
    foreach ($deals as $deal) {
        $uniqueResponsibleIds[$deal->assignedById] = $deal->assignedById;
    }

    $userMap = [];

    // Шаг 6: Получаем информацию о пользователях
    foreach ($uniqueResponsibleIds as $userId) {
        $users = $serviceBuilder->getUserScope()->user()->get(
            [],
            ['ID' => $userId]
        )->getUsers();

        if (empty($users)) {
            continue;
        }

        $user = $users[0];
        $userMap[$userId] = [
            'name' => $user->NAME,
            'lastName' => $user->LAST_NAME
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
        $responsible = $userMap[$deal->assignedById] ?? ['name' => 'Неизвестно', 'lastName' => 'Неизвестно'];
        $table[] = [
            $deal->id,
            $deal->title,
            $responsible['name'],
            $responsible['lastName'],
            $deal->opportunity ?? 0
        ];
    }

    // Вывод таблицы
    foreach ($table as $row) {
        echo implode("\t", $row) . "\n";
    }
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    funnel_name = input("Введите название воронки сделок: ")

    try:
        categories = client.crm.category.list(entity_type_id=2).response.result.get("categories", [])
        selected_funnel = next(
            (c for c in categories if c.get("name") == funnel_name),
            None,
        )

        if not selected_funnel:
            print("Воронка не найдена.")
        else:
            stage_name = input("Введите название стадии: ")
            funnel_id = int(selected_funnel["id"])
            entity_id = "DEAL_STAGE" if funnel_id == 0 else f"DEAL_STAGE_{funnel_id}"
            stages = client.crm.status.list(filter={"ENTITY_ID": entity_id}).response.result
            selected_stage = next(
                (s for s in stages if s.get("NAME") == stage_name),
                None,
            )

            if not selected_stage:
                print("Стадия не найдена.")
            else:
                items = client.crm.item.list(
                    entity_type_id=2,
                    select=["id", "title", "assignedById", "opportunity"],
                    filter={"stageId": selected_stage["STATUS_ID"]},
                ).response.result.get("items", [])

                user_ids = sorted({int(item["assignedById"]) for item in items if item.get("assignedById")})
                users = client.user.get(filter={"ID": user_ids}).response.result if user_ids else []
                user_map = {
                    int(user["ID"]): {
                        "name": user.get("NAME", ""),
                        "lastName": user.get("LAST_NAME", ""),
                    }
                    for user in users
                }

                table = []

                table.append(
                    [
                        "ID сделки",
                        "Название",
                        "Имя ответственного",
                        "Фамилия ответственного",
                        "Ожидаемый доход",
                    ]
                )

                for deal in items:
                    responsible = user_map.get(int(deal["assignedById"]), {"name": "Неизвестно", "lastName": "Неизвестно"})
                    table.append(
                        [
                            str(deal["id"]),
                            str(deal.get("title", "")),
                            str(responsible["name"]),
                            str(responsible["lastName"]),
                            str(deal.get("opportunity", 0)),
                        ]
                    )

                for row in table:
                    print("\t".join(row))
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
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
    // Пример самодостаточный: он находит воронку и стадию, кладёт на эту стадию
    // свою сделку, показывает список элементов стадии с ответственными и убирает за
    // собой. Запускается на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"os"
    	"sort"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // entityTypeDeal — идентификатор типа объекта «сделка». Идентификатор
    // смарт-процесса отдаёт crm.enum.ownertype.
    const entityTypeDeal = 2

    // Названия воронки и стадии, с которыми работаем. Пустая строка означает
    // «выбрать самостоятельно»: названия на каждом портале свои, а пример должен
    // запускаться везде без правок. Подставьте сюда свои — логика не изменится.
    const (
    	funnelName = ""
    	stageName  = ""
    )

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- шаг 1: идентификатор воронки
    	res, err := core.Call(ctx, "crm.category.list", b24.Params{
    		"entityTypeId": entityTypeDeal,
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.category.list: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом categories.
    	var categories struct {
    		Categories []struct {
    			ID        int    `json:"id"`
    			Name      string `json:"name"`
    			IsDefault string `json:"isDefault"`
    		} `json:"categories"`
    	}
    	if err := json.Unmarshal(res.Result, &categories); err != nil {
    		return fmt.Errorf("разбор воронок: %w", err)
    	}

    	// Нужную воронку определяем по названию в поле name.
    	funnel := -1
    	for i, c := range categories.Categories {
    		if (funnelName == "" && c.IsDefault == "Y") || c.Name == funnelName {
    			funnel = i
    			break
    		}
    	}
    	if funnel < 0 {
    		return fmt.Errorf("воронка %q не найдена", funnelName)
    	}
    	fmt.Printf("воронка %q: id=%d\n", categories.Categories[funnel].Name, categories.Categories[funnel].ID)

    	// --- шаг 2: идентификатор стадии
    	// У воронки по умолчанию идентификатор стадий без суффикса, никогда не
    	// DEAL_STAGE_0. У смарт-процесса формула другая: DYNAMIC_185_STAGE_11.
    	entityID := "DEAL_STAGE"
    	if id := categories.Categories[funnel].ID; id > 0 {
    		entityID = fmt.Sprintf("DEAL_STAGE_%d", id)
    	}

    	res, err = core.Call(ctx, "crm.status.list", b24.Params{
    		"filter": b24.Params{"ENTITY_ID": entityID},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.status.list: %w", err)
    	}

    	var stages []struct {
    		StatusID string `json:"STATUS_ID"`
    		Name     string `json:"NAME"`
    		// Настоящая семантика стадии лежит в EXTRA: верхнеуровневое поле
    		// SEMANTICS у стадий в работе приходит пустым.
    		Extra struct {
    			Semantics string `json:"SEMANTICS"`
    		} `json:"EXTRA"`
    	}
    	if err := json.Unmarshal(res.Result, &stages); err != nil {
    		return fmt.Errorf("разбор стадий: %w", err)
    	}

    	// Нужную стадию определяем по названию в поле NAME, а идентификатор берём
    	// из STATUS_ID — именно он попадёт в фильтр следующего шага.
    	stage := -1
    	for i, s := range stages {
    		if (stageName == "" && s.Extra.Semantics == "process") || s.Name == stageName {
    			stage = i
    			break
    		}
    	}
    	if stage < 0 {
    		return fmt.Errorf("стадия %q не найдена в воронке %s", stageName, entityID)
    	}
    	fmt.Printf("стадия %q: stageId=%s\n", stages[stage].Name, stages[stage].StatusID)

    	// --- подготовка: своя сделка на этой стадии, чтобы шагу 3 было что найти

    	dealID, err := addDeal(ctx, core, categories.Categories[funnel].ID, stages[stage].StatusID)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.item.delete", b24.Params{
    		"entityTypeId": entityTypeDeal, "id": dealID,
    	})

    	// --- шаг 3: элементы на стадии
    	res, err = core.Call(ctx, "crm.item.list", b24.Params{
    		"entityTypeId": entityTypeDeal,
    		"select":       []string{"id", "title", "assignedById", "opportunity"},
    		"filter":       b24.Params{"stageId": stages[stage].StatusID},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.item.list: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом items, и поля здесь в
    	// camelCase — в отличие от crm.status.list двумя вызовами выше.
    	var list struct {
    		Items []struct {
    			ID           int     `json:"id"`
    			Title        string  `json:"title"`
    			AssignedByID int     `json:"assignedById"`
    			Opportunity  float64 `json:"opportunity"`
    		} `json:"items"`
    	}
    	if err := json.Unmarshal(res.Result, &list); err != nil {
    		return fmt.Errorf("разбор элементов: %w", err)
    	}
    	fmt.Printf("на стадии элементов: %d\n", len(list.Items))

    	// --- шаг 4: данные ответственных

    	// Один запрос на всех ответственных, а не по запросу на элемент: портал
    	// пропускает около двух обращений в секунду.
    	ids := make([]int, 0, len(list.Items))
    	seen := map[int]bool{}
    	for _, it := range list.Items {
    		if it.AssignedByID > 0 && !seen[it.AssignedByID] {
    			seen[it.AssignedByID] = true
    			ids = append(ids, it.AssignedByID)
    		}
    	}
    	sort.Ints(ids)

    	users := map[int]string{}
    	if len(ids) > 0 {
    		res, err = core.Call(ctx, "user.get", b24.Params{
    			"filter": b24.Params{"ID": ids},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("user.get: %w", err)
    		}

    		// user.get отвечает в UPPER_SNAKE, а идентификатор присылает строкой.
    		var rows []struct {
    			ID       b24.ID `json:"ID"`
    			Name     string `json:"NAME"`
    			LastName string `json:"LAST_NAME"`
    		}
    		if err := json.Unmarshal(res.Result, &rows); err != nil {
    			return fmt.Errorf("разбор сотрудников: %w", err)
    		}
    		for _, u := range rows {
    			users[int(u.ID)] = u.Name + " " + u.LastName
    		}
    	}

    	fmt.Println("ID сделки\tНазвание\tОтветственный\tОжидаемый доход")
    	for _, it := range list.Items {
    		who := users[it.AssignedByID]
    		if who == "" {
    			who = "Неизвестно"
    		}
    		fmt.Printf("%d\t%s\t%s\t%.0f\n", it.ID, it.Title, who, it.Opportunity)
    	}
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    // addDeal кладёт сделку на выбранную стадию, чтобы шагу 3 было что найти даже
    // на пустом портале.
    func addDeal(ctx context.Context, core *b24.Core, categoryID int, stageID string) (b24.ID, error) {
    	res, err := core.Call(ctx, "crm.item.add", b24.Params{
    		"entityTypeId": entityTypeDeal,
    		"fields": b24.Params{
    			"title":       "Закупка печей (пример b24gosdk)",
    			"categoryId":  categoryID,
    			"stageId":     stageID,
    			"opportunity": 500,
    		},
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

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
    ```

{% endlist %}
