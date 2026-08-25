# Как отфильтровать элементы по названию стадии

> Scope: [`crm`, `user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — на чтение элементов объекта CRM
>
> - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — пользователь с правом на чтение элементов объекта CRM
> - [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — любой пользователь
> - [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — пользователь с правом на чтение хотя бы одного объекта CRM
> - [user.get](../../../api-reference/user/user-get.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Название стадии не хранится в элементе CRM. В поле «Стадия» лежит идентификатор вида `C10:EXECUTING`, а название стадии — в [справочнике](../../../api-reference/crm/status/index.md). Поэтому отфильтровать элементы сразу по названию нельзя: сначала нужно получить идентификатор стадии.

Идентификатор стадии зависит от воронки, поэтому воронку тоже находим по названию. В результате получим список элементов на нужной стадии с именами ответственных сотрудников.

Сценарий состоит из четырех шагов.

1. Получить `id` воронки по ее названию методом [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md)
2. Получить `STATUS_ID` стадии по ее названию методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md)
3. Получить элементы на этой стадии методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md)
4. Получить имена ответственных методом [user.get](../../../api-reference/user/user-get.md)

## Что нужно до начала

- вебхук создан от имени пользователя с правом читать элементы нужного объекта CRM. Шаги 1 и 3 учитывают его права: он увидит только доступные ему воронки и элементы

- в правах вебхука отмечены scope `crm` и `user_brief`

- вы знаете названия воронки и стадии так, как они написаны в интерфейсе: примеры сравнивают названия точно, с учетом регистра и пробелов

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

Дальше в примерах используются сделки — `entityTypeId`: `2`. Идентификаторы `10` для воронки и `C10:PREPAYMENT_INVOIC` для стадии взяты с одного Битрикс24. В вашем Битрикс24 они будут другими: каждый шаг подставляет значение из ответа предыдущего.

## 1. Получим идентификатор воронки

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметром:

- `entityTypeId` — идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `2` — сделка. Чтобы узнать `entityTypeId` смарт-процесса, выполните метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) без параметров

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

- PHP
  
    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // у crm.category.list нет обертки в SDK — вызываем метод напрямую
    $result = $serviceBuilder->core->call(
        'crm.category.list',
        [
            'entityTypeId' => 2 // 2 — сделка
        ]
    );
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

В результате получили список воронок сделок. Определим нужную воронку по названию в поле `name`. Идентификатор воронки возьмем из поля `id`.

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
    "total": 4
}
```

## 2. Получим идентификатор стадии

Используем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром:

- `ENTITY_ID` — код справочника стадий. Укажем `DEAL_STAGE_10`, где `10` — идентификатор воронки из шага 1

Как собрать код справочника:

-  сделки — `DEAL_STAGE_{id}`, где `{id}` — идентификатор воронки

-  смарт-процессы — `DYNAMIC_{entityTypeId}_STAGE_{id}`, например `DYNAMIC_185_STAGE_11`, где `185` — `entityTypeId` смарт-процесса, `11` — идентификатор воронки

-  воронка по умолчанию с идентификатором `0` — код без числовой части, `DEAL_STAGE`. Кода `DEAL_STAGE_0` не существует, с ним метод вернет пустой список без ошибки

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

- Python

    ```python
    result = client.crm.status.list(
        filter={
            "ENTITY_ID": "DEAL_STAGE_10",
        }
    ).response.result
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

    // Нужную стадию определяем по названию в поле NAME, а идентификатор берем
    // из STATUS_ID — именно он попадет в фильтр следующего шага.
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

В результате получили список стадий. Определим нужную стадию по названию в поле `NAME`. Идентификатор стадии возьмем из поля `STATUS_ID` — именно он попадет в фильтр на шаге 3.

Собирать `STATUS_ID` строкой в своем коде нельзя. Значение ограничено 21 символом, поэтому у воронок с двузначным идентификатором длинные коды обрезаются: стадия со стандартным кодом `PREPAYMENT_INVOICE` в воронке `9` получит `C9:PREPAYMENT_INVOICE`, а в воронке `10` — уже `C10:PREPAYMENT_INVOIC`, без последней буквы. На название стадии это не влияет: в примере ниже та же стадия называется «Согласование».

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
            "CATEGORY_ID": "10",
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
            "CATEGORY_ID": "10",
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
            "STATUS_ID": "C10:PREPAYMENT_INVOIC",
            "NAME": "Согласование",
            "NAME_INIT": "",
            "SORT": "30",
            "SYSTEM": "N",
            "CATEGORY_ID": "10",
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
            "CATEGORY_ID": "10",
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
            "NAME": "Финальный счет",
            "NAME_INIT": "",
            "SORT": "50",
            "SYSTEM": "N",
            "CATEGORY_ID": "10",
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
            "CATEGORY_ID": "10",
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
            "CATEGORY_ID": "10",
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
            "CATEGORY_ID": "10",
            "COLOR": "#FF5752",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "apology",
                "COLOR": "#FF5752"
            }
        }
    ],
    "total": 8
}
```

## 3. Получим список элементов на стадии

Используем метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `2` — сделка. Значение должно совпадать с тем, что передали на шаге 1

- `filter[stageId]` — идентификатор стадии из поля `STATUS_ID` шага 2. В примере `C10:PREPAYMENT_INVOIC`. Фильтр принимает и одно значение, и массив значений, если нужны элементы сразу с нескольких стадий

- `select` — поля элементов, которые нужно получить. Без этого параметра метод вернет все поля, включая пользовательские, и ответ будет заметно тяжелее

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
                "stageId": ["C10:PREPAYMENT_INVOIC"],
            },
        }
    });
    ```

- Python

    ```python
    result = client.crm.item.list(
        entity_type_id=2,
        select=["id", "title", "assignedById", "opportunity"],
        filter={
            "stageId": ["C10:PREPAYMENT_INVOIC"],
        },
    ).response.result
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getCRMScope()->item()->list(
        2,
        [],
        [
            "stageId" => ["C10:PREPAYMENT_INVOIC"],
        ],
        [
            "id",
            "title",
            "assignedById",
            "opportunity",
        ]
    );
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

В результате получили список элементов на запрошенной стадии. Из ответа возьмем `assignedById` — уникальные значения этого поля станут фильтром на шаге 4.

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
    "total": 5
}
```

## 4. Получим данные ответственного

В результате шага 3 ответственный указан числом в поле `assignedById`. Чтобы вывести имя и фамилию, используем метод [user.get](../../../api-reference/user/user-get.md) с фильтром:

- `ID` — значения `assignedById` из шага 3. Соберем уникальные идентификаторы и передадим их массивом: так данные всех ответственных придут одним вызовом, а не отдельным вызовом на каждый элемент

{% list tabs %}

- JS
  
    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: "user.get",
        params: {
            filter: { "ID": [1, 29] }
        }
    });
    ```

- Python

    ```python
    result = client.user.get(
        filter={"ID": [1, 29]},
    ).response.result
    ```

- PHP
  
    ```php
    $result = $serviceBuilder->getUserScope()->user()->get(
        [],
        ['ID' => [1, 29]]
    );
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

В результате получили данные сотрудников, в том числе поля `NAME` и `LAST_NAME`.

```json
{
    "result": [
        {
            "ID": "1",
            "ACTIVE": true,
            "NAME": "Иван",
            "LAST_NAME": "Иванов",
            "SECOND_NAME": "",
            "EMAIL": "i.ivanov@example.com",
            "WORK_POSITION": "Менеджер",
            "UF_DEPARTMENT": [1],
            "USER_TYPE": "employee"
        },
        {
            "ID": "29",
            "ACTIVE": true,
            "NAME": "Вадим",
            "LAST_NAME": "Валеев",
            "SECOND_NAME": "",
            "EMAIL": "v.valeev@example.com",
            "WORK_POSITION": "Менеджер",
            "UF_DEPARTMENT": [1],
            "USER_TYPE": "employee"
        }
    ],
    "total": 2
}
```

Ответ сокращен: метод возвращает и остальные поля профиля. Идентификатор приходит строкой, а `assignedById` из шага 3 — числом, поэтому приводите значения к одному типу, когда сопоставляете элемент с сотрудником.

## Проверим результат

Сценарий выполнен, если в таблице столько же строк, сколько элементов вернул шаг 3, и у каждой строки заполнено имя ответственного.

Что проверить в ответах:

-  все элементы шага 3 стоят на одной стадии. Добавьте `stageId` в `select` и убедитесь, что значение совпадает с `STATUS_ID` из шага 2

-  поле `total` шага 3 совпадает со счетчиком стадии в канбане. Откройте раздел CRM → Сделки, переключитесь на воронку из шага 1 и посмотрите на колонку с названием стадии из шага 2

-  каждое значение `assignedById` из шага 3 есть среди `ID` из шага 4. Если сотрудник не нашелся, он уволен или удален — показывайте такие строки с идентификатором вместо имени

Пустой массив `items` при непустых шагах 1 и 2 ошибкой не считается. Что он означает — в разделе «Ошибки и диагностика».

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` | На шаге 1 или 3 передан `entityTypeId`, которому не соответствует ни один объект CRM. Для сделок нужно `2`, идентификатор смарт-процесса возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | На шаге 1 передан объект CRM, у которого нет воронок. Стадии такого объекта лежат в одном справочнике без числовой части ||
|| `400` `Invalid parameters.` | На шаге 2 в `filter` переданы некорректные значения. Состав полей для фильтрации возвращает метод [crm.status.fields](../../../api-reference/crm/status/crm-status-fields.md) ||
|| `400` `Access denied.` | На шаге 2 или 3 у пользователя вебхука нет прав на чтение элементов объекта CRM. Проверьте, от чьего имени создан вебхук ||
|| `INVALID_ARG_VALUE` `Invalid filter: field 'field' is not allowed in filter` | На шаге 3 в `filter` передано поле, по которому фильтровать нельзя. Список доступных полей возвращает метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) ||
|#

Чаще всего сценарий обрывается не ошибкой, а пустым ответом. Разбирайте его по шагам.

- пустой `categories` на шаге 1 — воронки с таким названием нет или она недоступна пользователю. Вызовите шаг 1 без поиска по названию и сверьте написание со списком

- пустой `result` на шаге 2 — неверный код справочника, проверьте его по правилам из шага 2. Для смарт-процесса в коде используется `entityTypeId`, а не `id` из метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)

- пустой `items` на шаге 3 при непустом шаге 2 — либо на стадии действительно нет элементов, либо `stageId` собран строкой в коде и обрезался по длине. Передавайте значение из поля `STATUS_ID` ответа шага 2

Все четыре метода только читают данные, поэтому после ошибки сценарий можно повторить с любого шага.

## Что важно учитывать

- у каждой воронки свой справочник стадий. Названия стадий в разных воронках могут совпадать, а `STATUS_ID` — нет, поэтому хранить стадию нужно вместе с идентификатором воронки

- названия сравнивает код примера, а не метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md): метод возвращает все стадии справочника. Сравнение точное, поэтому из-за лишнего пробела или другого регистра нужная стадия в ответе не найдется

- методы [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) возвращают не больше 50 записей за вызов. Стадий в воронке обычно меньше, а элементов может быть больше — перебирайте страницы параметром `start`

- семантику стадии — успех, неуспех или работа — искать в поле `SEMANTICS` не стоит: у стадий в работе оно приходит пустым, а настоящее значение лежит в `EXTRA.SEMANTICS`. Подробнее — в сценарии [Как получить список стадий с семантикой для объектов CRM](./how-to-get-stages-with-semantics.md)

- чтобы отфильтровать элементы другого объекта CRM, замените `entityTypeId` на шагах 1 и 3 и код справочника на шаге 2. Остальная логика сценария не меняется

## Пример кода

Код проходит все четыре шага: находит идентификаторы воронки и стадии по их названиям и выводит таблицу элементов с ответственными. Заменить нужно только путь вебхука в переменной окружения.

Примеры на JS, PHP и Python спрашивают названия у пользователя, а в примере на Go они заданы константами `funnelName` и `stageName`. Пример на Go вдобавок создает свою сделку на выбранной стадии и удаляет ее в конце, чтобы шагу 3 было что найти на пустом Битрикс24.

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

        // Спрашиваем название воронки
        let funnelName = await rl.question("Введите название воронки сделок: ");

        // Шаг 1: Получаем список воронок и находим нужную по названию
        let categories = (await call("crm.category.list", { entityTypeId: 2 })).categories;
        let selectedFunnel = categories.find(cat => cat.name === funnelName);

        if (!selectedFunnel) {
            console.log("Воронка не найдена.");
            rl.close();
        } else {
            let funnelId = selectedFunnel.id;

            // Спрашиваем название стадии
            let stageName = await rl.question("Введите название стадии: ");
            rl.close();

            // Шаг 2: Получаем стадии воронки и находим нужную по названию
            let entityID = funnelId === 0 ? "DEAL_STAGE" : `DEAL_STAGE_${funnelId}`;

            let stages = await call("crm.status.list", { filter: { "ENTITY_ID": entityID } });
            let selectedStage = stages.find(stage => stage.NAME === stageName);

            if (!selectedStage) {
                console.log("Стадия не найдена.");
            } else {
                let stageId = selectedStage.STATUS_ID;

                // Шаг 3: Получаем сделки на выбранной стадии
                let deals = (await call("crm.item.list", {
                    entityTypeId: 2,
                    select: ["id", "title", "assignedById", "opportunity"],
                    filter: {
                        "stageId": stageId,
                    },
                })).items;

                let uniqueResponsibleIds = [...new Set(deals.map(deal => deal.assignedById))];

                let userMap = {};

                // Шаг 4: Получаем информацию об ответственных
                // Один запрос на всех сразу, а не по запросу на каждую сделку
                if (uniqueResponsibleIds.length > 0) {
                    let users = await call("user.get", { filter: { ID: uniqueResponsibleIds } });
                    users.forEach(user => {
                        userMap[Number(user.ID)] = {
                            name: user.NAME,
                            lastName: user.LAST_NAME
                        };
                    });
                }

                // Выводим результаты в консоль в виде текстовой таблицы
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

- PHP
  
    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
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

    // Спрашиваем название воронки
    $funnelName = readline("Введите название воронки сделок: ");

    // Шаг 1: Получаем список воронок и находим нужную по названию
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

    // Спрашиваем название стадии
    $stageName = readline("Введите название стадии: ");

    // Шаг 2: Получаем стадии воронки и находим нужную по названию
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

    // Шаг 3: Получаем сделки на выбранной стадии
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

    // Шаг 4: Получаем информацию об ответственных
    // Один запрос на всех сразу, а не по запросу на каждую сделку
    if (!empty($uniqueResponsibleIds)) {
        $users = $serviceBuilder->getUserScope()->user()->get(
            [],
            ['ID' => array_values($uniqueResponsibleIds)]
        )->getUsers();

        foreach ($users as $user) {
            $userMap[(int)$user->ID] = [
                'name' => $user->NAME,
                'lastName' => $user->LAST_NAME
            ];
        }
    }

    // Выводим результаты в виде текстовой таблицы
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
    // Пример самодостаточный: он находит воронку и стадию, кладет на эту стадию
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
    // смарт-процесса отдает crm.enum.ownertype.
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

    	// Нужную стадию определяем по названию в поле NAME, а идентификатор берем
    	// из STATUS_ID — именно он попадет в фильтр следующего шага.
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

    // addDeal кладет сделку на выбранную стадию, чтобы шагу 3 было что найти даже
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

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-list.md)
- [{#T}](../../../api-reference/crm/status/crm-status-list.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-list.md)
- [{#T}](./how-to-get-stages-with-semantics.md)
- [{#T}](./how-to-get-deal-funnels.md)
- [{#T}](./get-activity-list-by-deals.md)
