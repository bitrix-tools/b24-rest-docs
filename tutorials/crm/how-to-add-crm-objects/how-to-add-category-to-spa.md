# Как создать новую воронку со стадиями в смарт-процессе

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «административный доступ к разделу CRM»
>
> - [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) и [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) — пользователь с административным доступом к разделу CRM
> - [crm.status.update](../../../api-reference/crm/status/crm-status-update.md) и [crm.status.add](../../../api-reference/crm/status/crm-status-add.md) — пользователь с правом «Разрешить изменять настройки» в CRM
> - [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Воронка — это отдельная ветка работы с объектом CRM со своим набором стадий и своими настройками карточки. Воронки заводят, чтобы разделить работу по отделам или типам процессов. Например, в закупках можно завести отдельные воронки для заявок, поставок и приемки.

Стадии смарт-процесса хранятся в справочнике CRM. Имя справочника собирается из двух чисел: идентификатора типа смарт-процесса и идентификатора воронки. Оба числа известны только после первых двух вызовов, поэтому сценарий идет строго по порядку: сначала находим тип, потом создаем воронку и только потом работаем с ее стадиями.

В результате сценария в смарт-процессе появится воронка с шестью стадиями: три стадии «В работе», одна «Успех» и две «Провал». Первая стадия «В работе» переименована.

Сценарий состоит из пяти шагов.

1. Получить `entityTypeId` смарт-процесса методом [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
2. Создать воронку методом [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) и получить ее `id`
3. Получить предустановленные стадии воронки методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и взять `ID` первой из них
4. Переименовать эту стадию методом [crm.status.update](../../../api-reference/crm/status/crm-status-update.md)
5. Добавить свою стадию методом [crm.status.add](../../../api-reference/crm/status/crm-status-add.md)

## Что нужно до начала

- смарт-процесс уже создан в Битрикс24, и вы знаете его название. В примерах используется смарт-процесс `Закупка оборудования` — подставьте название своего

- у смарт-процесса включены воронки и стадии. Это подтверждают поля `isCategoriesEnabled` и `isStagesEnabled` со значением `Y` в ответе шага 1. При выключенных воронках шаг 2 вернет ошибку `ENTITY_TYPE_NOT_SUPPORTED`

- вебхук создан от имени пользователя с административным доступом к разделу CRM. Без этого доступа шаг 1 вернет ошибку `ACCESS_DENIED`

- у этого же пользователя есть право «Разрешить изменять настройки» в CRM. Оно нужно шагам 4 и 5: без него они вернут `Access denied.` уже после того, как воронка создана

- в правах вебхука отмечен scope `crm`

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

## 1. Получим идентификатор типа смарт-процесса {#entity-type-id}

Используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:

- `filter[title]` — название смарт-процесса. Укажем `Закупка оборудования`

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
            filter: { title: 'Закупка оборудования' } // Название смарт-процесса
        },
        requestId: 'type-list'
    });

    const types = result.getData().result.types;
    const entityTypeId = types.length ? types[0].entityTypeId : null;
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $types = $sb->getCRMScope()->type()->list(
        order: [],
        filter: ['title' => 'Закупка оборудования'] // Название смарт-процесса
    )->getTypes();

    $entityTypeId = $types[0]->entityTypeId ?? null;
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

    types = client.crm.type.list(
        filter={"title": "Закупка оборудования"},  # Название смарт-процесса
    ).response.result["types"]

    entity_type_id = int(types[0]["entityTypeId"]) if types else None
    ```

{% endlist %}

В ответе метод вернет массив `types`. Сохраните `entityTypeId` — его нужно передать в шаги 2, 3 и 5. В примере `entityTypeId`: `177`.

Фильтр `title` ищет точное совпадение. До вызова шага 2 проверьте, что массив `types` не пустой.

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
    "total": 1
}
```

{% note warning "" %}

Дальше нужен именно `entityTypeId`, а не `id`. Это разные числа: у смарт-процесса с `id`: `7` идентификатор типа равен `177`. Если подставить `id`, метод [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) вернет ошибку `NOT_FOUND`.

{% endnote %}

## 2. Создадим новую воронку {#category-id}

Используем метод [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md) с параметрами:

- `entityTypeId` — идентификатор типа из шага [crm.type.list](#entity-type-id), обязательный параметр. В примере `177`

- `fields[name]` — название воронки, обязательный параметр. Укажем `Новая воронка`

- `fields[sort]` — индекс сортировки. Определяет место воронки в списке воронок смарт-процесса

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.category.add',
        params: {
            entityTypeId: entityTypeId, // Идентификатор типа из шага 1
            fields: {
                name: 'Новая воронка', // Название воронки
                sort: 100 // Индекс сортировки
            }
        },
        requestId: 'category-add'
    });

    const categoryId = result.getData().result.category.id;
    ```

- PHP

    ```php
    // у crm.category.add нет обертки в SDK — вызываем метод напрямую
    $result = $sb->core->call(
        'crm.category.add',
        [
            'entityTypeId' => $entityTypeId, // Идентификатор типа из шага 1
            'fields' => [
                'name' => 'Новая воронка', // Название воронки
                'sort' => 100 // Индекс сортировки
            ]
        ]
    );

    $categoryId = $result->getResponseData()->getResult()['category']['id'];
    ```

- Python

    ```python
    category = client.crm.category.add(
        entity_type_id=entity_type_id,  # Идентификатор типа из шага 1
        fields={
            "name": "Новая воронка",  # Название воронки
            "sort": 100,  # Индекс сортировки
        },
    ).response.result["category"]

    category_id = int(category["id"])
    ```

{% endlist %}

В ответе метод вернет объект `category`. Сохраните `id` — его нужно передать в шаги 3 и 5. В примере `id`: `87`.

```json
{
    "result": {
        "category": {
            "id": 87,
            "name": "Новая воронка",
            "sort": 100,
            "entityTypeId": 177,
            "isDefault": "N"
        }
    }
}
```

Битрикс24 сразу наполняет новую воронку стадиями по умолчанию, отдельно создавать их не нужно.

{% note warning "" %}

Метод не проверяет дубликаты: повторный запуск сценария добавит вторую воронку с тем же названием.

{% endnote %}

## 3. Получим стадии созданной воронки {#stage-id}

Стадии лежат в справочнике CRM. Для стадий смарт-процессов имя справочника собирается по формуле `DYNAMIC_{entityTypeId}_STAGE_{categoryId}`, где `entityTypeId` — идентификатор типа из шага [crm.type.list](#entity-type-id), а `categoryId` — идентификатор воронки из шага [crm.category.add](#category-id). В примере получается `DYNAMIC_177_STAGE_87`.

Используем метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с параметрами:

- `filter[ENTITY_ID]` — имя справочника, собранное по формуле

- `order[SORT]` — сортировка по индексу `SORT`. Передаем ее явно, чтобы первым элементом массива всегда была первая стадия группы «В работе»

{% list tabs %}

- JS

    ```javascript
    const entityId = `DYNAMIC_${entityTypeId}_STAGE_${categoryId}`;

    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.list',
        params: {
            filter: { ENTITY_ID: entityId }, // Справочник стадий этой воронки
            order: { SORT: 'ASC' } // Стадии по возрастанию индекса сортировки
        },
        requestId: 'status-list'
    });

    const stages = result.getData().result;
    const firstStageId = stages[0].ID; // Первая стадия группы «В работе»
    ```

- PHP

    ```php
    $entityId = "DYNAMIC_{$entityTypeId}_STAGE_{$categoryId}";

    $stages = $sb->getCRMScope()->status()->list(
        order: ['SORT' => 'ASC'], // Стадии по возрастанию индекса сортировки
        filter: ['ENTITY_ID' => $entityId] // Справочник стадий этой воронки
    )->getStatuses();

    $firstStageId = $stages[0]->ID; // Первая стадия группы «В работе»
    ```

- Python

    ```python
    entity_id = f"DYNAMIC_{entity_type_id}_STAGE_{category_id}"

    stages = client.crm.status.list(
        filter={"ENTITY_ID": entity_id},  # Справочник стадий этой воронки
        order={"SORT": "ASC"},  # Стадии по возрастанию индекса сортировки
    ).response.result

    first_stage_id = int(stages[0]["ID"])  # Первая стадия группы «В работе»
    ```

{% endlist %}

В ответе метод вернет массив стадий, отсортированный по полю `SORT`. Сохраните `ID` первой стадии — его нужно передать в шаг 4. В примере `ID`: `1073`. Как и в шаге 1, до следующего вызова проверьте, что массив не пустой.

Каждая новая воронка получает пять стадий:

- три стадии группы «В работе» — у них `SEMANTICS`: `null`

- одна стадия группы «Успех» — `SEMANTICS`: `S`

- одна стадия группы «Провал» — `SEMANTICS`: `F`

Состав групп менять можно, но с ограничениями: в воронке остается минимум одна стадия каждой группы, а стадия группы «Успех» может быть только одна.

```json
{
    "result": [
        {
            "ID": "1073",
            "ENTITY_ID": "DYNAMIC_177_STAGE_87",
            "STATUS_ID": "DT177_87:NEW",
            "NAME": "Начало",
            "NAME_INIT": "Начало",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": "87",
            "COLOR": "#22B9FF",
            "SEMANTICS": null
        },
        {
            "ID": "1075",
            "ENTITY_ID": "DYNAMIC_177_STAGE_87",
            "STATUS_ID": "DT177_87:PREPARATION",
            "NAME": "Подготовка",
            "NAME_INIT": "Подготовка",
            "SORT": "20",
            "SYSTEM": "N",
            "CATEGORY_ID": "87",
            "COLOR": "#88B9FF",
            "SEMANTICS": null
        },
        {
            "ID": "1077",
            "ENTITY_ID": "DYNAMIC_177_STAGE_87",
            "STATUS_ID": "DT177_87:CLIENT",
            "NAME": "Согласование",
            "NAME_INIT": "Согласование",
            "SORT": "30",
            "SYSTEM": "N",
            "CATEGORY_ID": "87",
            "COLOR": "#10e5fc",
            "SEMANTICS": null
        },
        {
            "ID": "1079",
            "ENTITY_ID": "DYNAMIC_177_STAGE_87",
            "STATUS_ID": "DT177_87:SUCCESS",
            "NAME": "Успех",
            "NAME_INIT": "Успех",
            "SORT": "40",
            "SYSTEM": "Y",
            "CATEGORY_ID": "87",
            "COLOR": "#00ff00",
            "SEMANTICS": "S"
        },
        {
            "ID": "1081",
            "ENTITY_ID": "DYNAMIC_177_STAGE_87",
            "STATUS_ID": "DT177_87:FAIL",
            "NAME": "Провал",
            "NAME_INIT": "Провал",
            "SORT": "50",
            "SYSTEM": "Y",
            "CATEGORY_ID": "87",
            "COLOR": "#ff0000",
            "SEMANTICS": "F"
        }
    ],
    "total": 5
}
```

## 4. Изменим предустановленную стадию

Переименуем первую стадию методом [crm.status.update](../../../api-reference/crm/status/crm-status-update.md) с параметрами:

- `id` — идентификатор стадии из шага [crm.status.list](#stage-id), обязательный параметр. В примере `1073`

- `fields[NAME]` — новое название стадии. Укажем `Первая стадия`

Названия полей справочника пишутся в верхнем регистре: `NAME`, `SORT`, `COLOR`.

Первая стадия помечена `SYSTEM`: `Y`. Переименовывать системные стадии можно свободно, ограничение касается только удаления.

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.update',
        params: {
            id: firstStageId, // Идентификатор стадии из шага 3
            fields: {
                NAME: 'Первая стадия' // Новое название стадии
            }
        },
        requestId: 'status-update'
    });
    ```

- PHP

    ```php
    $result = $sb->getCRMScope()->status()->update(
        $firstStageId, // Идентификатор стадии из шага 3
        [
            'NAME' => 'Первая стадия' // Новое название стадии
        ]
    );
    ```

- Python

    ```python
    client.crm.status.update(
        first_stage_id,  # Идентификатор стадии из шага 3
        fields={
            "NAME": "Первая стадия",  # Новое название стадии
        },
    ).response
    ```

{% endlist %}

В ответе метод вернет `true` — стадия переименована.

```json
{
    "result": true
}
```

## 5. Добавим новую стадию в воронку

Используем метод [crm.status.add](../../../api-reference/crm/status/crm-status-add.md) с объектом `fields`:

- `ENTITY_ID` — имя справочника из шага [crm.status.list](#stage-id), обязательный параметр. В примере `DYNAMIC_177_STAGE_87`

- `STATUS_ID` — код стадии, обязательный параметр. В примере передаем код сразу с префиксом воронки — `DT177_87:MY_STAGE`, где префикс собран по формуле `DT{entityTypeId}_{categoryId}`, а двоеточие отделяет его от собственного кода стадии. Если передать код без префикса, Битрикс24 добавит префикс сам: из `MY_STAGE` получится тот же `DT177_87:MY_STAGE`

- `NAME` — название стадии, обязательный параметр. Укажем `Моя стадия`

- `SORT` — индекс сортировки. Укажем `60`, чтобы новая стадия встала после стадии «Провал» с сортировкой `50`

- `SEMANTICS` — группа стадии: `S` — «Успех», `F` — «Провал», пустая строка — «В работе». Укажем `F`. Методы чтения возвращают у стадий группы «В работе» `null`, как в ответе шага 3

В канбане стадии выстраиваются по возрастанию `SORT`: сначала «В работе», затем «Успех», последними — «Провал».

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.status.add',
        params: {
            fields: {
                ENTITY_ID: entityId, // Справочник стадий из шага 3
                STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`, // Код стадии
                NAME: 'Моя стадия', // Название стадии
                SORT: 60, // Индекс сортировки
                SEMANTICS: 'F' // Группа «Провал»
            }
        },
        requestId: 'status-add'
    });

    const newStageId = result.getData().result;
    ```

- PHP

    ```php
    $result = $sb->getCRMScope()->status()->add(
        [
            'ENTITY_ID' => $entityId, // Справочник стадий из шага 3
            'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE', // Код стадии
            'NAME' => 'Моя стадия', // Название стадии
            'SORT' => 60, // Индекс сортировки
            'SEMANTICS' => 'F' // Группа «Провал»
        ]
    );

    $newStageId = $result->getId();
    ```

- Python

    ```python
    new_stage_id = client.crm.status.add(
        fields={
            "ENTITY_ID": entity_id,  # Справочник стадий из шага 3
            "STATUS_ID": f"DT{entity_type_id}_{category_id}:MY_STAGE",  # Код стадии
            "NAME": "Моя стадия",  # Название стадии
            "SORT": 60,  # Индекс сортировки
            "SEMANTICS": "F",  # Группа «Провал»
        },
    ).response.result
    ```

{% endlist %}

В ответе метод вернет идентификатор созданной стадии. В примере `1083`.

```json
{
    "result": 1083
}
```

## Проверим результат

Откройте смарт-процесс в Битрикс24 и переключитесь на воронку «Новая воронка». В канбане будет шесть стадий: первая называется «Первая стадия», а после стадии «Провал» стоит «Моя стадия».

Через REST состав стадий возвращает тот же метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) по справочнику из шага 3.

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'crm.status.list',
        params: {
            filter: { ENTITY_ID: entityId },
            order: { SORT: 'ASC' }
        },
        requestId: 'status-list-check'
    });

    console.table(checkResult.getData().result.map(stage => ({
        NAME: stage.NAME,
        SORT: stage.SORT,
        SEMANTICS: stage.SEMANTICS
    })));
    ```

- PHP

    ```php
    $checkResult = $sb->getCRMScope()->status()->list(
        order: ['SORT' => 'ASC'],
        filter: ['ENTITY_ID' => $entityId]
    )->getStatuses();

    foreach ($checkResult as $stage) {
        echo $stage->NAME . ' | ' . $stage->SORT . ' | ' . $stage->SEMANTICS . PHP_EOL;
    }
    ```

- Python

    ```python
    check_result = client.crm.status.list(
        filter={"ENTITY_ID": entity_id},
        order={"SORT": "ASC"},
    ).response.result

    for stage in check_result:
        print(stage["NAME"], stage["SORT"], stage["SEMANTICS"])
    ```

{% endlist %}

Сценарий выполнен, если в ответе шесть стадий: у стадии с `SORT`: `10` поле `NAME` равно `Первая стадия`, а в массиве есть стадия с `STATUS_ID`: `DT177_87:MY_STAGE` и `SEMANTICS`: `F`.

```json
{
    "result": [
        {
            "ID": "1073",
            "STATUS_ID": "DT177_87:NEW",
            "NAME": "Первая стадия",
            "SORT": "10",
            "SEMANTICS": null
        },
        {
            "ID": "1075",
            "STATUS_ID": "DT177_87:PREPARATION",
            "NAME": "Подготовка",
            "SORT": "20",
            "SEMANTICS": null
        },
        {
            "ID": "1077",
            "STATUS_ID": "DT177_87:CLIENT",
            "NAME": "Согласование",
            "SORT": "30",
            "SEMANTICS": null
        },
        {
            "ID": "1079",
            "STATUS_ID": "DT177_87:SUCCESS",
            "NAME": "Успех",
            "SORT": "40",
            "SEMANTICS": "S"
        },
        {
            "ID": "1081",
            "STATUS_ID": "DT177_87:FAIL",
            "NAME": "Провал",
            "SORT": "50",
            "SEMANTICS": "F"
        },
        {
            "ID": "1083",
            "STATUS_ID": "DT177_87:MY_STAGE",
            "NAME": "Моя стадия",
            "SORT": "60",
            "SEMANTICS": "F"
        }
    ],
    "total": 6
}
```

Ответ сокращен: у каждой стадии есть и другие поля, часть из них показана в шаге 3. Полный список полей возвращает метод [crm.status.fields](../../../api-reference/crm/status/crm-status-fields.md).

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `ACCESS_DENIED` | У пользователя вебхука нет административного доступа к разделу CRM. Ошибку возвращают шаги 1 и 2 ||
|| `allowed_only_intranet_user` | Вебхук создан от имени внешнего пользователя. Сценарий доступен только сотрудникам Битрикс24 ||
|| `NOT_FOUND` | В шаге 2 передан `entityTypeId`, которому не соответствует ни один смарт-процесс. Две частые причины: передан `id` вместо `entityTypeId` либо в ответе шага 1 пустой массив `types` ||
|| Пустой массив `types` в шаге 1 | Не ошибка, а результат фильтра. Название смарт-процесса не совпало: `filter[title]` ищет точное совпадение ||
|| Пустой массив стадий в шаге 3 | Не ошибка, а результат фильтра. Проверьте имя справочника по формуле `DYNAMIC_{entityTypeId}_STAGE_{categoryId}` и поле `isStagesEnabled` в ответе шага 1 ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | У смарт-процесса выключены воронки. Проверьте поле `isCategoriesEnabled` в ответе шага 1 ||
|| `Field 'NAME' is required` | В шаге 2 не передано название воронки в `fields[name]` ||
|| `Invalid identifier.` | В шаге 4 передан нечисловой или пустой `id` стадии ||
|| `Status is not found.` | В шаге 4 передан `id` несуществующей стадии. Возьмите его из ответа шага 3 ||
|| `Specified entity type is not supported.` | В шаге 5 передан `ENTITY_ID` справочника, которого нет. Проверьте формулу `DYNAMIC_{entityTypeId}_STAGE_{categoryId}` ||
|| `Указанный идентификатор статуса, уже существует.` | В шаге 5 передан `STATUS_ID`, который уже занят в этой воронке. Возьмите другой код ||
|| `Не заполнено обязательное поле "Заголовок"` | В шаге 5 не передано название стадии в `NAME` ||
|| `Access denied.` | У пользователя вебхука нет права «Разрешить изменять настройки» в CRM. Ошибку возвращают шаги 4 и 5 ||
|#

Шаги 1 и 3 ничего не создают, их можно повторять сколько угодно раз. Шаг 2 создает воронку, поэтому при ошибке на шагах 3, 4 или 5 повторяйте только упавший шаг, взяв `id` воронки из ответа шага 2.

## Что важно учитывать

- существующие воронки смарт-процесса возвращает метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), а лишнюю, созданную повторным запуском, удаляет метод [crm.category.delete](../../../api-reference/crm/universal/category/crm-category-delete.md)

- формулы `DYNAMIC_{entityTypeId}_STAGE_{categoryId}` и `DT{entityTypeId}_{categoryId}` работают только для смарт-процессов. У сделок справочник стадий называется `DEAL_STAGE_{categoryId}`, а у стадий общей воронки сделок префикса нет вообще. Список справочников возвращает метод [crm.status.entity.types](../../../api-reference/crm/status/crm-status-entity-types.md)

- кроме порядка в канбане, сортировка задает смысл стадии для отчетов

- системные стадии, помеченные `SYSTEM`: `Y`, удаляет метод [crm.status.delete](../../../api-reference/crm/status/crm-status-delete.md) только с флагом `FORCED`: `Y` в параметре `params`

## Пример кода

Скрипт создает воронку в смарт-процессе, переименовывает первую предустановленную стадию, добавляет свою стадию в группу «Провал» и выводит итоговую таблицу стадий по группам.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const processTitle = 'Закупка оборудования'; // Название вашего смарт-процесса

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    function printStagesTable(stages) {
        const columns = { 'В работе': [], 'Успех': [], 'Провал': [] };

        stages.forEach(stage => {
            if (stage.SEMANTICS === 'S') {
                columns['Успех'].push(stage.NAME);
            } else if (stage.SEMANTICS === 'F') {
                columns['Провал'].push(stage.NAME);
            } else {
                columns['В работе'].push(stage.NAME);
            }
        });

        const maxRows = Math.max(
            columns['В работе'].length,
            columns['Успех'].length,
            columns['Провал'].length
        );

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

    try {
        // 1. Получаем entityTypeId по названию смарт-процесса
        const types = (await call('crm.type.list', {
            filter: { title: processTitle }
        })).types;
        if (!types.length) {
            throw new Error(`Смарт-процесс «${processTitle}» не найден`);
        }
        const entityTypeId = types[0].entityTypeId;

        // 2. Создаем воронку
        const category = (await call('crm.category.add', {
            entityTypeId: entityTypeId,
            fields: { name: 'Новая воронка', sort: 100 }
        })).category;
        const categoryId = category.id;
        const entityId = `DYNAMIC_${entityTypeId}_STAGE_${categoryId}`;

        // 3. Получаем предустановленные стадии
        const stages = await call('crm.status.list', {
            filter: { ENTITY_ID: entityId },
            order: { SORT: 'ASC' }
        });

        if (!stages.length) {
            throw new Error(`Стадии не найдены: проверьте справочник ${entityId}`);
        }

        // 4. Переименовываем первую стадию
        await call('crm.status.update', {
            id: stages[0].ID,
            fields: { NAME: 'Первая стадия' }
        });

        // 5. Добавляем свою стадию в группу «Провал»
        await call('crm.status.add', {
            fields: {
                ENTITY_ID: entityId,
                STATUS_ID: `DT${entityTypeId}_${categoryId}:MY_STAGE`,
                NAME: 'Моя стадия',
                SORT: 60,
                SEMANTICS: 'F'
            }
        });

        // Проверяем результат
        const finalStages = await call('crm.status.list', {
            filter: { ENTITY_ID: entityId },
            order: { SORT: 'ASC' }
        });
        printStagesTable(finalStages);
    } catch (error) {
        console.error(error.message);
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $sb->getCRMScope();
    $processTitle = 'Закупка оборудования'; // Название вашего смарт-процесса

    try {
        // 1. Получаем entityTypeId по названию смарт-процесса
        $types = $crm->type()->list(
            order: [],
            filter: ['title' => $processTitle]
        )->getTypes();
        if (empty($types)) {
            throw new \RuntimeException('Смарт-процесс не найден: ' . $processTitle);
        }
        $entityTypeId = $types[0]->entityTypeId;

        // 2. Создаем воронку
        $result = $sb->core->call(
            'crm.category.add',
            [
                'entityTypeId' => $entityTypeId,
                'fields' => ['name' => 'Новая воронка', 'sort' => 100]
            ]
        );
        $categoryId = $result->getResponseData()->getResult()['category']['id'];
        $entityId = 'DYNAMIC_' . $entityTypeId . '_STAGE_' . $categoryId;

        // 3. Получаем предустановленные стадии
        $stages = $crm->status()->list(
            order: ['SORT' => 'ASC'],
            filter: ['ENTITY_ID' => $entityId]
        )->getStatuses();

        if (empty($stages)) {
            throw new \RuntimeException('Стадии не найдены: проверьте справочник ' . $entityId);
        }

        // 4. Переименовываем первую стадию
        $crm->status()->update($stages[0]->ID, ['NAME' => 'Первая стадия']);

        // 5. Добавляем свою стадию в группу «Провал»
        $crm->status()->add([
            'ENTITY_ID' => $entityId,
            'STATUS_ID' => 'DT' . $entityTypeId . '_' . $categoryId . ':MY_STAGE',
            'NAME' => 'Моя стадия',
            'SORT' => 60,
            'SEMANTICS' => 'F',
        ]);

        // Проверяем результат
        $finalStages = $crm->status()->list(
            order: ['SORT' => 'ASC'],
            filter: ['ENTITY_ID' => $entityId]
        )->getStatuses();
    } catch (\Throwable $e) {
        echo 'Ошибка: ' . $e->getMessage();
        exit;
    }

    $columns = ['В работе' => [], 'Успех' => [], 'Провал' => []];

    foreach ($finalStages as $stage) {
        if ($stage->SEMANTICS === 'S') {
            $columns['Успех'][] = $stage->NAME;
        } elseif ($stage->SEMANTICS === 'F') {
            $columns['Провал'][] = $stage->NAME;
        } else {
            $columns['В работе'][] = $stage->NAME;
        }
    }

    $maxRows = max(
        count($columns['В работе']),
        count($columns['Успех']),
        count($columns['Провал'])
    );

    echo "Таблица стадий:\n";
    for ($i = 0; $i < $maxRows; $i++) {
        echo 'В работе: ' . ($columns['В работе'][$i] ?? '')
            . ' | Успех: ' . ($columns['Успех'][$i] ?? '')
            . ' | Провал: ' . ($columns['Провал'][$i] ?? '') . "\n";
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

    process_title = "Закупка оборудования"  # Название вашего смарт-процесса


    def print_stages_table(stages):
        columns = {"В работе": [], "Успех": [], "Провал": []}

        for stage in stages:
            if stage["SEMANTICS"] == "S":
                columns["Успех"].append(stage["NAME"])
            elif stage["SEMANTICS"] == "F":
                columns["Провал"].append(stage["NAME"])
            else:
                columns["В работе"].append(stage["NAME"])

        max_rows = max(len(column) for column in columns.values())

        print("Таблица стадий:")
        for index in range(max_rows):
            row = [
                columns[group][index] if index < len(columns[group]) else ""
                for group in ("В работе", "Успех", "Провал")
            ]
            print(f"В работе: {row[0]} | Успех: {row[1]} | Провал: {row[2]}")


    try:
        # 1. Получаем entityTypeId по названию смарт-процесса
        types = client.crm.type.list(
            filter={"title": process_title},
        ).response.result["types"]
        if not types:
            raise SystemExit(f"Смарт-процесс «{process_title}» не найден")
        entity_type_id = int(types[0]["entityTypeId"])

        # 2. Создаем воронку
        category_id = int(
            client.crm.category.add(
                entity_type_id=entity_type_id,
                fields={"name": "Новая воронка", "sort": 100},
            ).response.result["category"]["id"]
        )
        entity_id = f"DYNAMIC_{entity_type_id}_STAGE_{category_id}"

        # 3. Получаем предустановленные стадии
        stages = client.crm.status.list(
            filter={"ENTITY_ID": entity_id},
            order={"SORT": "ASC"},
        ).response.result

        if not stages:
            raise SystemExit(f"Стадии не найдены: проверьте справочник {entity_id}")

        # 4. Переименовываем первую стадию
        client.crm.status.update(
            int(stages[0]["ID"]),
            fields={"NAME": "Первая стадия"},
        ).response

        # 5. Добавляем свою стадию в группу «Провал»
        client.crm.status.add(
            fields={
                "ENTITY_ID": entity_id,
                "STATUS_ID": f"DT{entity_type_id}_{category_id}:MY_STAGE",
                "NAME": "Моя стадия",
                "SORT": 60,
                "SEMANTICS": "F",
            },
        ).response

        # Проверяем результат
        final_stages = client.crm.status.list(
            filter={"ENTITY_ID": entity_id},
            order={"SORT": "ASC"},
        ).response.result
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        print_stages_table(final_stages)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/category/crm-category-add.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-list.md)
- [{#T}](../../../api-reference/crm/universal/category/crm-category-delete.md)
- [{#T}](../../../api-reference/crm/status/crm-status-add.md)
- [{#T}](../../../api-reference/crm/status/crm-status-list.md)
- [{#T}](../../../api-reference/crm/status/crm-status-update.md)
- [{#T}](../../../api-reference/crm/status/crm-status-delete.md)
- [{#T}](../../../api-reference/crm/status/crm-status-entity-types.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
