# Как передать или завершить дела уволенного сотрудника

> Scope: [`crm`, `user_basic`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: для сценария через вебхук нужны права на чтение и изменение дел CRM. Конфигурируемые дела обновляет только приложение, которое их создало
>
> - [user.get](../../../api-reference/user/user-get.md) — любой пользователь
> - [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — любой пользователь
> - [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md) — пользователь с правом на обновление дела
> - [crm.activity.todo.updateResponsibleUser](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md) — пользователь с правом на редактирование элемента CRM, для которого обновляется дело
> - [crm.activity.configurable.get](../../../api-reference/crm/timeline/activities/configurable/crm-activity-configurable-get.md) — приложение, которое создало конфигурируемое дело
> - [crm.activity.configurable.update](../../../api-reference/crm/timeline/activities/configurable/crm-activity-configurable-update.md) — приложение, которое создало конфигурируемое дело

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

После увольнения сотрудника его незавершенные дела CRM можно передать другому ответственному или завершить. Для этого нужно найти идентификатор сотрудника, получить дела, где он указан ответственным, и выполнить действие для каждого дела.

Способ обновления зависит от типа дела:

- обычные и системные дела обновляет метод [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md)
- универсальные дела с `PROVIDER_ID: CRM_TODO` передаются методом [crm.activity.todo.updateResponsibleUser](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md)
- конфигурируемые дела с `PROVIDER_ID: CONFIGURABLE_REST_APP` обновляются только в OAuth-контексте приложения, которое их создало

Сценарий состоит из четырех шагов.

1. Найти уволенного сотрудника и, если дела нужно передать, нового ответственного методом [user.get](../../../api-reference/user/user-get.md)
2. Получить незавершенные дела уволенного сотрудника методом [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
3. Разделить дела по полю `PROVIDER_ID`
4. Передать или завершить обычные, системные и универсальные дела подходящим методом

В результате ответственный изменится у обычных, системных и универсальных дел, которые доступны пользователю вебхука. Если выбран режим завершения, незавершенные обычные, системные и универсальные дела будут закрыты. Дела приложений сценарий сохраняет отдельно и не изменяет через вебхук.

## Что нужно до начала

Проверьте условия доступа и подготовьте исходные данные:

- входящий вебхук создан от имени пользователя, который видит дела уволенного сотрудника и может изменять элементы CRM, к которым привязаны эти дела
- в правах вебхука отмечены scope `crm` и `user_basic`
- вы знаете имя, фамилию, e-mail или другой признак уволенного сотрудника
- если дела нужно передать, вы знаете имя, фамилию, e-mail или идентификатор нового ответственного

Вебхук выполняет запросы с правами пользователя, который его создал. Пользователь увидит и изменит только те дела и элементы CRM, к которым у него есть доступ.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

Дальше в примерах уволенного сотрудника ищем по фамилии `Иванов`, нового ответственного — по e-mail `new.responsible@example.com`. В вашем Битрикс24 замените эти значения на свои.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

## 1. Находим сотрудников

Метод [user.get](../../../api-reference/user/user-get.md) получает пользователей по фильтру. Чтобы найти уволенного сотрудника, передайте в фильтр `ACTIVE: false` и дополнительный признак, например фамилию или e-mail. Если дела нужно передать, найдите нового ответственного с фильтром `ACTIVE: true`.

В ответе сохраните:

- `ID` уволенного сотрудника — передадим в фильтр дел `RESPONSIBLE_ID`
- `ID` нового ответственного — передадим в методы изменения ответственного, если дело нужно не закрыть, а передать другому пользователю

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const action = 'transfer'

    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function findOneUser(filter, requestId) {
        const result = await callMethod(
            'user.get',
            {
                FILTER: filter,
                SELECT: ['ID', 'ACTIVE', 'NAME', 'LAST_NAME', 'EMAIL']
            },
            requestId
        )

        if (!Array.isArray(result) || result.length !== 1) {
            throw new Error(`Ожидался один пользователь, получено: ${Array.isArray(result) ? result.length : 0}`)
        }

        return result[0]
    }

    const firedUser = await findOneUser(
        {
            ACTIVE: false,
            LAST_NAME: 'Иванов'
        },
        'user-get-fired'
    )

    const newResponsible = action === 'transfer'
        ? await findOneUser(
            {
                ACTIVE: true,
                EMAIL: 'new.responsible@example.com'
            },
            'user-get-new-responsible'
        )
        : null
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    $action = 'transfer';

    function callMethod($serviceBuilder, string $method, array $params)
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function findOneUser($serviceBuilder, array $filter): array
    {
        $result = callMethod(
            $serviceBuilder,
            'user.get',
            [
                'FILTER' => $filter,
                'SELECT' => ['ID', 'ACTIVE', 'NAME', 'LAST_NAME', 'EMAIL'],
            ]
        );

        if (count($result) !== 1) {
            throw new RuntimeException('Ожидался один пользователь, получено: ' . count($result));
        }

        return $result[0];
    }

    $firedUser = findOneUser(
        $serviceBuilder,
        [
            'ACTIVE' => false,
            'LAST_NAME' => 'Иванов',
        ]
    );

    $newResponsible = $action === 'transfer'
        ? findOneUser(
            $serviceBuilder,
            [
                'ACTIVE' => true,
                'EMAIL' => 'new.responsible@example.com',
            ]
        )
        : null;
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    action = "transfer"

    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )
    client = Client(token)

    def call_method(method, params):
        # Вызов через ядро SDK: в сценарии есть методы без типизированной обертки
        payload = token.call_method(method, params)

        if "error" in payload:
            raise RuntimeError(f"{payload['error']}: {payload.get('error_description', '')}")

        return payload["result"]

    def find_one_user(filter):
        result = call_method(
            "user.get",
            {
                "FILTER": filter,
                "SELECT": ["ID", "ACTIVE", "NAME", "LAST_NAME", "EMAIL"],
            },
        )

        if len(result) != 1:
            raise RuntimeError(f"Ожидался один пользователь, получено: {len(result)}")

        return result[0]

    fired_user = find_one_user(
        {
            "ACTIVE": False,
            "LAST_NAME": "Иванов",
        }
    )

    new_responsible = (
        find_one_user(
            {
                "ACTIVE": True,
                "EMAIL": "new.responsible@example.com",
            }
        )
        if action == "transfer"
        else None
    )
    ```

{% endlist %}

Сокращенный ответ для уволенного сотрудника:

```json
{
    "result": [
        {
            "ID": "37",
            "ACTIVE": false,
            "NAME": "Иван",
            "LAST_NAME": "Иванов",
            "EMAIL": "i.ivanov@example.com"
        }
    ],
    "total": 1
}
```

Сокращенный ответ для нового ответственного:

```json
{
    "result": [
        {
            "ID": "547",
            "ACTIVE": true,
            "NAME": "Мария",
            "LAST_NAME": "Петрова",
            "EMAIL": "new.responsible@example.com"
        }
    ],
    "total": 1
}
```

В результате получили `ID` уволенного сотрудника `37` и `ID` нового ответственного `547`. Эти значения нужны на следующих шагах.

## 2. Получаем дела уволенного сотрудника

Метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) получает дела с постраничной навигацией. В фильтре передайте:

- `RESPONSIBLE_ID` — идентификатор уволенного сотрудника
- `COMPLETED: N` — только незавершенные дела

Чтобы получить только универсальные дела, добавьте в фильтр `PROVIDER_ID: CRM_TODO`. Для всех дел уволенного сотрудника оставьте фильтр без `PROVIDER_ID` и разделяйте записи в коде.

В `select` добавьте поля, которые нужны для выбора метода обновления:

- `ID` — идентификатор дела
- `OWNER_TYPE_ID` — идентификатор типа объекта CRM, к которому привязано дело
- `OWNER_ID` — идентификатор элемента CRM, к которому привязано дело
- `PROVIDER_ID` — идентификатор провайдера дела, по нему разделим дела на универсальные, конфигурируемые дела приложений, обычные и системные
- `PROVIDER_TYPE_ID` — идентификатор типа провайдера
- `SUBJECT` — название дела, нужно для проверки результата
- `COMPLETED` — признак завершения дела
- `RESPONSIBLE_ID` — идентификатор ответственного

{% list tabs %}

- JS

    ```javascript
    async function getEmployeeActivities(employeeId) {
        const activities = []
        let start = 0

        while (true) {
            const page = await callMethod(
                'crm.activity.list',
                {
                    order: { ID: 'asc' },
                    filter: {
                        RESPONSIBLE_ID: Number(employeeId),
                        COMPLETED: 'N'
                    },
                    select: [
                        'ID',
                        'OWNER_TYPE_ID',
                        'OWNER_ID',
                        'PROVIDER_ID',
                        'PROVIDER_TYPE_ID',
                        'SUBJECT',
                        'COMPLETED',
                        'RESPONSIBLE_ID'
                    ],
                    start
                },
                `crm-activity-list-${start}`
            )

            activities.push(...page)

            if (page.length < 50) {
                break
            }

            start += 50
        }

        return activities
    }

    const activities = await getEmployeeActivities(firedUser.ID)
    ```

- PHP

    ```php
    function getEmployeeActivities($serviceBuilder, int $employeeId): array
    {
        $activities = [];
        $start = 0;

        do {
            $page = callMethod(
                $serviceBuilder,
                'crm.activity.list',
                [
                    'order' => ['ID' => 'asc'],
                    'filter' => [
                        'RESPONSIBLE_ID' => $employeeId,
                        'COMPLETED' => 'N',
                    ],
                    'select' => [
                        'ID',
                        'OWNER_TYPE_ID',
                        'OWNER_ID',
                        'PROVIDER_ID',
                        'PROVIDER_TYPE_ID',
                        'SUBJECT',
                        'COMPLETED',
                        'RESPONSIBLE_ID',
                    ],
                    'start' => $start,
                ]
            );

            $activities = array_merge($activities, $page);
            $start += 50;
        } while (count($page) === 50);

        return $activities;
    }

    $activities = getEmployeeActivities($serviceBuilder, (int)$firedUser['ID']);
    ```

- Python

    ```python
    def get_employee_activities(employee_id):
        activities = []
        start = 0

        while True:
            page = call_method(
                "crm.activity.list",
                {
                    "order": {"ID": "asc"},
                    "filter": {
                        "RESPONSIBLE_ID": int(employee_id),
                        "COMPLETED": "N",
                    },
                    "select": [
                        "ID",
                        "OWNER_TYPE_ID",
                        "OWNER_ID",
                        "PROVIDER_ID",
                        "PROVIDER_TYPE_ID",
                        "SUBJECT",
                        "COMPLETED",
                        "RESPONSIBLE_ID",
                    ],
                    "start": start,
                },
            )

            activities.extend(page)

            if len(page) < 50:
                break

            start += 50

        return activities

    activities = get_employee_activities(fired_user["ID"])
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": [
        {
            "ID": "1501",
            "OWNER_TYPE_ID": "2",
            "OWNER_ID": "18",
            "PROVIDER_ID": "CRM_TODO",
            "PROVIDER_TYPE_ID": "TODO",
            "SUBJECT": "Связаться с клиентом",
            "COMPLETED": "N",
            "RESPONSIBLE_ID": "37"
        }
    ],
    "total": 1
}
```

В ответе метод возвращает массив дел. Для следующих шагов нужны поля `ID`, `OWNER_TYPE_ID`, `OWNER_ID`, `PROVIDER_ID` и `PROVIDER_TYPE_ID`. Если метод вернул 50 дел, запросите следующую страницу с `start: 50`.

## 3. Разделяем дела по типу

Поле `PROVIDER_ID` показывает, каким методом нужно обновлять дело. Разделите массив из шага 2 на группы:

- `CRM_TODO` — универсальные дела
- `CONFIGURABLE_REST_APP` — конфигурируемые дела приложений, в примере сохраняем их в отдельный список без изменения
- остальные значения — обычные и системные дела

{% list tabs %}

- JS

    ```javascript
    function splitActivitiesByProvider(activities) {
        return activities.reduce(
            (groups, activity) => {
                if (activity.PROVIDER_ID === 'CRM_TODO') {
                    groups.todos.push(activity)
                } else if (activity.PROVIDER_ID === 'CONFIGURABLE_REST_APP') {
                    groups.configurable.push(activity)
                } else {
                    groups.base.push(activity)
                }

                return groups
            },
            {
                todos: [],
                configurable: [],
                base: []
            }
        )
    }

    const groupedActivities = splitActivitiesByProvider(activities)
    ```

- PHP

    ```php
    function splitActivitiesByProvider(array $activities): array
    {
        $groups = [
            'todos' => [],
            'configurable' => [],
            'base' => [],
        ];

        foreach ($activities as $activity) {
            if (($activity['PROVIDER_ID'] ?? '') === 'CRM_TODO') {
                $groups['todos'][] = $activity;
            } elseif (($activity['PROVIDER_ID'] ?? '') === 'CONFIGURABLE_REST_APP') {
                $groups['configurable'][] = $activity;
            } else {
                $groups['base'][] = $activity;
            }
        }

        return $groups;
    }

    $groupedActivities = splitActivitiesByProvider($activities);
    ```

- Python

    ```python
    def split_activities_by_provider(activities):
        groups = {
            "todos": [],
            "configurable": [],
            "base": [],
        }

        for activity in activities:
            provider_id = activity.get("PROVIDER_ID", "")

            if provider_id == "CRM_TODO":
                groups["todos"].append(activity)
            elif provider_id == "CONFIGURABLE_REST_APP":
                groups["configurable"].append(activity)
            else:
                groups["base"].append(activity)

        return groups

    grouped_activities = split_activities_by_provider(activities)
    ```

{% endlist %}

После разделения в коде есть три локальных массива: `base`, `todos` и `configurable`. Эти массивы не являются полями ответа Битрикс24, они нужны только для выбора следующего метода.

### Если в списке есть дела приложения

Дела из массива `configurable` не передавайте в методы обновления этого сценария. Входящий вебхук не может обновить дела с `PROVIDER_ID: CONFIGURABLE_REST_APP`, потому что такие дела изменяет только приложение, которое их создало.

Сохраните эти дела отдельно:

{% list tabs %}

- JS

    ```javascript
    const skippedConfigurableActivities = groupedActivities.configurable
    ```

- PHP

    ```php
    $skippedConfigurableActivities = $groupedActivities['configurable'];
    ```

- Python

    ```python
    skipped_configurable_activities = grouped_activities["configurable"]
    ```

{% endlist %}

Если нужно передать такие дела, выполните это в приложении, которое создало дела:

1. Авторизуйте запросы в OAuth-контексте приложения
2. Получите дело методом [crm.activity.configurable.get](../../../api-reference/crm/timeline/activities/configurable/crm-activity-configurable-get.md)
3. Передайте в [crm.activity.configurable.update](../../../api-reference/crm/timeline/activities/configurable/crm-activity-configurable-update.md) текущий `layout` и новое значение `fields.responsibleId`

Если вызвать методы конфигурируемых дел не из приложения, Битрикс24 вернет ошибку `ERROR_WRONG_CONTEXT`. Если приложение не создавало дело, Битрикс24 вернет ошибку `ERROR_WRONG_APPLICATION`.

## 4. Передаем или завершаем дела

Выберите режим обработки перед запуском обновления:

- `transfer` — передать дела новому ответственному
- `complete` — завершить незавершенные дела

Обычные и системные дела обновляйте методом [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md). Развитие метода остановлено, но в документации не указана актуальная замена для изменения `RESPONSIBLE_ID` у обычных и системных дел.

В режиме `complete` этим же методом закрывайте универсальные дела. У методов `crm.activity.todo.*` нет отдельного метода завершения дела. Чтобы передать дело, отправьте поле `RESPONSIBLE_ID`. Чтобы завершить дело, отправьте поле `COMPLETED: Y`.

{% list tabs %}

- JS

    ```javascript
    async function updateBaseActivities(activities, action, newResponsibleId) {
        const updated = []

        for (const activity of activities) {
            const fields = action === 'transfer'
                ? { RESPONSIBLE_ID: Number(newResponsibleId) }
                : { COMPLETED: 'Y' }

            const result = await callMethod(
                'crm.activity.update',
                {
                    id: Number(activity.ID),
                    fields
                },
                `crm-activity-update-${activity.ID}`
            )

            updated.push({
                id: activity.ID,
                method: 'crm.activity.update',
                result
            })
        }

        return updated
    }

    const activitiesForBaseUpdate = action === 'complete'
        ? [...groupedActivities.base, ...groupedActivities.todos]
        : groupedActivities.base

    const updatedBaseActivities = await updateBaseActivities(
        activitiesForBaseUpdate,
        action,
        action === 'transfer' ? newResponsible.ID : 0
    )
    ```

- PHP

    ```php
    function updateBaseActivities($serviceBuilder, array $activities, string $action, int $newResponsibleId): array
    {
        $updated = [];

        foreach ($activities as $activity) {
            $fields = $action === 'transfer'
                ? ['RESPONSIBLE_ID' => $newResponsibleId]
                : ['COMPLETED' => 'Y'];

            $result = callMethod(
                $serviceBuilder,
                'crm.activity.update',
                [
                    'id' => (int)$activity['ID'],
                    'fields' => $fields,
                ]
            );

            $updated[] = [
                'id' => $activity['ID'],
                'method' => 'crm.activity.update',
                'result' => $result,
            ];
        }

        return $updated;
    }

    $activitiesForBaseUpdate = $action === 'complete'
        ? array_merge($groupedActivities['base'], $groupedActivities['todos'])
        : $groupedActivities['base'];

    $updatedBaseActivities = updateBaseActivities(
        $serviceBuilder,
        $activitiesForBaseUpdate,
        $action,
        $newResponsible !== null ? (int)$newResponsible['ID'] : 0
    );
    ```

- Python

    ```python
    def update_base_activities(activities, action, new_responsible_id):
        updated = []

        for activity in activities:
            fields = (
                {"RESPONSIBLE_ID": int(new_responsible_id)}
                if action == "transfer"
                else {"COMPLETED": "Y"}
            )

            result = call_method(
                "crm.activity.update",
                {
                    "id": int(activity["ID"]),
                    "fields": fields,
                },
            )

            updated.append(
                {
                    "id": activity["ID"],
                    "method": "crm.activity.update",
                    "result": result,
                }
            )

        return updated

    activities_for_base_update = (
        grouped_activities["base"] + grouped_activities["todos"]
        if action == "complete"
        else grouped_activities["base"]
    )

    updated_base_activities = update_base_activities(
        activities_for_base_update,
        action,
        new_responsible["ID"] if action == "transfer" else 0,
    )
    ```

{% endlist %}

Универсальные дела передавайте методом [crm.activity.todo.updateResponsibleUser](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md). Метод меняет только ответственного, поэтому вызывайте его в режиме `transfer`. В режиме `complete` универсальные дела уже попали в массив для [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md).

{% list tabs %}

- JS

    ```javascript
    async function transferTodoActivities(activities, newResponsibleId) {
        const updated = []

        for (const activity of activities) {
            const result = await callMethod(
                'crm.activity.todo.updateResponsibleUser',
                {
                    id: Number(activity.ID),
                    ownerTypeId: Number(activity.OWNER_TYPE_ID),
                    ownerId: Number(activity.OWNER_ID),
                    responsibleId: Number(newResponsibleId)
                },
                `crm-activity-todo-update-responsible-${activity.ID}`
            )

            updated.push({
                id: activity.ID,
                method: 'crm.activity.todo.updateResponsibleUser',
                result
            })
        }

        return updated
    }

    const updatedTodoActivities = action === 'transfer'
        ? await transferTodoActivities(groupedActivities.todos, newResponsible.ID)
        : []
    ```

- PHP

    ```php
    function transferTodoActivities($serviceBuilder, array $activities, int $newResponsibleId): array
    {
        $updated = [];

        foreach ($activities as $activity) {
            $result = callMethod(
                $serviceBuilder,
                'crm.activity.todo.updateResponsibleUser',
                [
                    'id' => (int)$activity['ID'],
                    'ownerTypeId' => (int)$activity['OWNER_TYPE_ID'],
                    'ownerId' => (int)$activity['OWNER_ID'],
                    'responsibleId' => $newResponsibleId,
                ]
            );

            $updated[] = [
                'id' => $activity['ID'],
                'method' => 'crm.activity.todo.updateResponsibleUser',
                'result' => $result,
            ];
        }

        return $updated;
    }

    $updatedTodoActivities = $action === 'transfer'
        ? transferTodoActivities($serviceBuilder, $groupedActivities['todos'], (int)$newResponsible['ID'])
        : [];
    ```

- Python

    ```python
    def transfer_todo_activities(activities, new_responsible_id):
        updated = []

        for activity in activities:
            result = call_method(
                "crm.activity.todo.updateResponsibleUser",
                {
                    "id": int(activity["ID"]),
                    "ownerTypeId": int(activity["OWNER_TYPE_ID"]),
                    "ownerId": int(activity["OWNER_ID"]),
                    "responsibleId": int(new_responsible_id),
                },
            )

            updated.append(
                {
                    "id": activity["ID"],
                    "method": "crm.activity.todo.updateResponsibleUser",
                    "result": result,
                }
            )

        return updated

    updated_todo_activities = (
        transfer_todo_activities(grouped_activities["todos"], new_responsible["ID"])
        if action == "transfer"
        else []
    )
    ```

{% endlist %}

Сокращенный успешный ответ [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md):

```json
{
    "result": true
}
```

Сокращенный успешный ответ [crm.activity.todo.updateResponsibleUser](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md):

```json
{
    "result": {
        "id": 1501
    }
}
```

В примере код сохраняет результаты обновления в локальные массивы `updatedBaseActivities` и `updatedTodoActivities`. Это не поля ответа Битрикс24, а данные для проверки результата.

Дела из группы `configurable` сохраняются в локальный массив `skippedConfigurableActivities`.

Если выбран режим `complete`, массив `updatedTodoActivities` будет пустым. Универсальные дела в этом режиме обновляет [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md), поэтому их результаты попадут в `updatedBaseActivities`.

## Проверим результат

Проверьте результат повторным вызовом [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md). Для передачи выберите дела по `RESPONSIBLE_ID` нового ответственного и идентификаторам обновленных дел. Для завершения выберите дела по `COMPLETED: Y`.

{% list tabs %}

- JS

    ```javascript
    const updatedActivityIds = [
        ...updatedBaseActivities,
        ...updatedTodoActivities
    ].map((activity) => activity.id)

    if (updatedActivityIds.length > 0) {
        const checkResult = await callMethod(
            'crm.activity.list',
            {
                filter: {
                    '@ID': updatedActivityIds,
                    ...(action === 'transfer'
                        ? { RESPONSIBLE_ID: Number(newResponsible.ID) }
                        : { COMPLETED: 'Y' })
                },
                select: ['ID', 'SUBJECT', 'COMPLETED', 'RESPONSIBLE_ID', 'PROVIDER_ID']
            },
            'crm-activity-list-check'
        )

        console.table(checkResult)
    }
    ```

- PHP

    ```php
    $updatedActivityIds = array_map(
        static fn(array $activity): string => (string)$activity['id'],
        array_merge($updatedBaseActivities, $updatedTodoActivities)
    );

    if (!empty($updatedActivityIds)) {
        $filter = [
            '@ID' => $updatedActivityIds,
        ];

        if ($action === 'transfer') {
            $filter['RESPONSIBLE_ID'] = (int)$newResponsible['ID'];
        } else {
            $filter['COMPLETED'] = 'Y';
        }

        $checkResult = callMethod(
            $serviceBuilder,
            'crm.activity.list',
            [
                'filter' => $filter,
                'select' => ['ID', 'SUBJECT', 'COMPLETED', 'RESPONSIBLE_ID', 'PROVIDER_ID'],
            ]
        );

        print_r($checkResult);
    }
    ```

- Python

    ```python
    updated_activity_ids = [
        activity["id"]
        for activity in (
            updated_base_activities
            + updated_todo_activities
        )
    ]

    if updated_activity_ids:
        filter_params = {
            "@ID": updated_activity_ids,
        }

        if action == "transfer":
            filter_params["RESPONSIBLE_ID"] = int(new_responsible["ID"])
        else:
            filter_params["COMPLETED"] = "Y"

        check_result = call_method(
            "crm.activity.list",
            {
                "filter": filter_params,
                "select": ["ID", "SUBJECT", "COMPLETED", "RESPONSIBLE_ID", "PROVIDER_ID"],
            },
        )

        print(check_result)
    ```

{% endlist %}

Сценарий выполнен, если количество дел в проверочном ответе совпадает с количеством обновленных дел.

Что проверить в ответах:

- при передаче поле `RESPONSIBLE_ID` равно `ID` нового ответственного
- при завершении поле `COMPLETED` равно `Y`
- дела из группы `configurable` попали в `skippedConfigurableActivities` и остались без изменений
- универсальные дела в режиме `complete` попали в массив `updatedBaseActivities`

В интерфейсе CRM переданные дела появятся у нового ответственного, а завершенные дела перестанут отображаться как открытые.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `insufficient_scope` | Вебхук или приложение не имеет нужного scope. Для дел CRM нужен scope `crm`, для [user.get](../../../api-reference/user/user-get.md) с поиском по e-mail — `user_basic` или `user` ||
|| `Access denied` или `ACCESS_DENIED` | Пользователь, создавший вебхук, не имеет права изменить дело или элемент CRM, к которому оно привязано ||
|| `Activity is not found` или `NOT_FOUND` | Дело не найдено. Проверьте `ID` дела и права пользователя ||
|| `OWNER_NOT_FOUND` | Элемент CRM, к которому привязано дело, не найден. Проверьте `OWNER_TYPE_ID` и `OWNER_ID` ||
|| `CAN_NOT_UPDATE_RESPONSIBLE_USER_COMPLETED_TODO` | Ответственного нельзя изменить в закрытом универсальном деле. Получайте только незавершенные дела с фильтром `COMPLETED: N` ||
|#

Если список дел пустой, проверьте:

- уволенный сотрудник найден методом [user.get](../../../api-reference/user/user-get.md), а его `ID` передан в `RESPONSIBLE_ID`
- пользователь, создавший вебхук, видит дела уволенного сотрудника
- в фильтре [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) не указаны лишние условия
- у уволенного сотрудника есть незавершенные дела CRM

Если часть дел уже обновлена, повторный запуск сценария начните со шага 2. Метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) больше не вернет переданные дела по фильтру `RESPONSIBLE_ID` уволенного сотрудника, а завершенные дела — по фильтру `COMPLETED: N`.

## Что важно учитывать

Перед запуском сценария учитывайте ограничения методов и прав доступа.

- [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) возвращает дела страницами по 50 элементов. Чтобы получить все дела, перебирайте `start`: `0`, `50`, `100`
- [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md) и [crm.activity.todo.updateResponsibleUser](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md) обновляют одно дело за вызов
- [crm.activity.update](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md) нужен для обычных и системных дел, а также для завершения универсальных дел. У методов `crm.activity.todo.*` нет отдельного метода завершения дела
- Универсальные дела определяются по `PROVIDER_ID: CRM_TODO`. Конфигурируемые дела с `PROVIDER_ID: CONFIGURABLE_REST_APP` не обновляются через вебхук, их передают в OAuth-контексте приложения, которое их создало
- Если по фильтру [user.get](../../../api-reference/user/user-get.md) найдено несколько сотрудников, уточните фильтр: добавьте `EMAIL`, `ID` или другой точный признак

## Продолжите изучение

- [{#T}](../../../api-reference/user/user-get.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md)
- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update-responsible-user.md)
- [{#T}](../../../api-reference/crm/timeline/activities/index.md)
