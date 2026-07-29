# Как перенести дело из одного типа объекта в другой

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элементов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Перенос дел может потребоваться между элементами разных типов: [лид](../../../api-reference/crm/leads/index.md), [сделка](../../../api-reference/crm/deals/index.md), [контакт](../../../api-reference/crm/contacts/index.md), [компания](../../../api-reference/crm/companies/index.md), [счет](../../../api-reference/crm/universal/invoice.md), [смарт-процесс](../../../api-reference/crm/universal/index.md). Например, у клиента два электронных адреса, но в карточке компании вашего Битрикс24 сохранен только один. Когда клиент напишет письмо со второго, неизвестного вам, адреса, почта создаст новый лид, а не прикрепит письмо в карточку существующей компании. Для хранения информации о клиенте в одном месте можно перенести дело из лида в карточку компании.

Перенос между разными типами объектов собирается из двух операций: сначала добавляем связь дела с новым объектом, потом удаляем связь со старым. В результате сценария дело появится в таймлайне компании и исчезнет из таймлайна лида.

{% note warning "" %}

Метод [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) здесь не подходит: он переносит дело только между элементами одного типа. Если типы разные, метод вернет ошибку `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL_ERROR`. Чтобы перенести дело между двумя лидами или двумя сделками, используйте сценарий [Как перенести дело между элементами одного типа](./how-to-move-activity.md).

{% endnote %}

Для переноса дела последовательно выполним четыре метода:

1. [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — получим ID дела

2. [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) — получим ID компании для переноса дела

3. [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md) — добавим связь дела с компанией

4. [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md) — удалим связь дела с лидом

Порядок шагов 3 и 4 менять нельзя. Если сначала удалить связь с лидом, дело останется без единственной связи и метод вернет ошибку `LAST_BINDING_CANNOT_BE_DELETED`.

## 1. Получаем ID дела {#first}

Используем метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром:

- `OWNER_TYPE_ID` — [тип объекта](../../../api-reference/crm/data-types.md#object_type), укажем `1` для лида,

- `OWNER_ID` — ID элемента, из которого будем переносить дело.

В примере переносим дело из лида `1000977`. ID лида виден в адресной строке его карточки, например `/crm/lead/details/1000977/`, или его можно получить методом [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md).

Без параметра `select` метод возвращает все поля дела. Чтобы сократить ответ, укажем только те поля, которые нужны сценарию: `ID`, `OWNER_TYPE_ID`, `OWNER_ID`, `SUBJECT` и `DESCRIPTION`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```JavaScript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const result = await $b24.actions.v2.call.make({
        method: "crm.activity.list",
        params: {
            filter:
            {
                "OWNER_TYPE_ID": 1,
                "OWNER_ID": 1000977
            },
            select: [ "ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION" ]
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
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    $activities = $serviceBuilder->getCRMScope()->activity()->list(
        [],
        [
            'OWNER_TYPE_ID' => 1,
            'OWNER_ID' => 1000977,
        ],
        [
            'ID', 'OWNER_TYPE_ID', 'OWNER_ID', 'SUBJECT', 'DESCRIPTION'
        ],
        0
    )->getActivities();
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

    result = client.crm.activity.list(
        filter={
            "OWNER_TYPE_ID": 1,
            "OWNER_ID": 1000977,
        },
        select=["ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION"],
    ).response.result
    ```

{% endlist %}

В результате получим все дела, связанные с указанным элементом.

```JSON
{
    "result": [
        {
            "ID": "7685",
            "OWNER_TYPE_ID": "1",
            "OWNER_ID": "1000977",
            "SUBJECT": "для лидов",
            "DESCRIPTION": "<div>письмо первое</div>\r\n"
        }
    ],
    "total": 1
}
```

Сохраним `ID` дела: `7685`. Это значение передадим в параметр `activityId` на шагах 3 и 4.

## 2. Получаем ID компании {#second}

Используем метод [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) с фильтром:

- `TITLE` — название компании.

Чтобы ограничить возвращаемые поля, добавим параметр `select` и укажем только поля `ID` и `TITLE`.

{% list tabs %}

- JS

    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: "crm.company.list",
        params: {
            filter: { "TITLE": "Название_компании" },
            select: [ "ID", "TITLE" ]
        }
    });
    ```

- PHP

    ```php
    $companies = $serviceBuilder->getCRMScope()->company()->list(
        [],
        [
            'TITLE' => 'Название_компании'
        ],
        [
            'ID', 'TITLE'
        ],
        0
    )->getCompanies();
    ```

- Python

    ```python
    result = client.crm.company.list(
        filter={
            "TITLE": "Название_компании",
        },
        select=["ID", "TITLE"],
    ).response.result
    ```

{% endlist %}

В результате получим ID компании — `ID`: `173`. Это значение передадим в параметр `entityId` на шаге 3.

```JSON
{
    "result": [
        {
            "ID": "173",
            "TITLE": "Название_компании"
        }
    ],
    "total": 1
}
```

## 3. Добавляем связь дела с компанией

Для связи дела и компании используем метод [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md),

- `entityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), укажем `4` для компании,

- `entityId` — ID компании, получили на [шаге 2](#second) в методе [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md).

{% list tabs %}

- JS

    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.activity.binding.add',
        params: {
            activityId: 7685,
            entityTypeId: 4,
            entityId: 173
        }
    });
    ```

- PHP

    ```php
    // crm.activity.binding.add не имеет типизированной обертки — вызываем через core
    $result = $serviceBuilder->core->call(
        'crm.activity.binding.add',
        [
            'activityId' => 7685,
            'entityTypeId' => 4,
            'entityId' => 173
        ]
    );
    ```

- Python

    ```python
    result = client.crm.activity.binding.add(
        activity_id=7685,
        entity_type_id=4,
        entity_id=173,
    ).response.result
    ```

{% endlist %}

В результате получим `true`, добавление связи для дела прошло успешно. Теперь дело привязано к двум элементам сразу — к лиду и к компании.

```JSON
{
    "result": true
}
```

## 4. Удаляем связь дела с лидом

Используем метод [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md),

- `entityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), укажем `1` для лида,

- `entityId` — ID лида, откуда удаляем дело.

{% list tabs %}

- JS

    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.activity.binding.delete',
        params: {
            activityId: 7685,
            entityTypeId: 1,
            entityId: 1000977
        }
    });
    ```

- PHP

    ```php
    // crm.activity.binding.delete не имеет типизированной обертки — вызываем через core
    $result = $serviceBuilder->core->call(
        'crm.activity.binding.delete',
        [
            'activityId' => 7685,
            'entityTypeId' => 1,
            'entityId' => 1000977
        ]
    );
    ```

- Python

    ```python
    result = client.crm.activity.binding.delete(
        activity_id=7685,
        entity_type_id=1,
        entity_id=1000977,
    ).response.result
    ```

{% endlist %}

В результате получим `true`, удаление связи дела с лидом прошло успешно. Перенос завершен: у дела осталась одна связь — с компанией.

```JSON
{
    "result": true
}
```

## Пример кода

{% list tabs %}

- JS

    ```JavaScript
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

    // Функция для выполнения всех шагов
    async function transferActivityToCompany(leadId, companyName) {
        // Шаг 1: Получаем список дел для указанного лида
        const activities = await call("crm.activity.list", {
            filter: {
                "OWNER_TYPE_ID": 1,
                "OWNER_ID": leadId
            },
            select: [ "ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION" ]
        });
        if (activities.length === 0) {
            console.log("Дела для указанного лида не найдены.");
            return;
        }

        const activityId = activities[0].ID;

        // Шаг 2: Ищем компанию по названию
        const companies = await call("crm.company.list", {
            filter: { "TITLE": companyName },
            select: [ "ID", "TITLE" ]
        });
        if (companies.length === 0) {
            console.log("Компания с указанным названием не найдена.");
            return;
        }

        const companyId = companies[0].ID;

        // Шаг 3: Создаем связь для найденного дела и компании
        await call('crm.activity.binding.add', {
            activityId: activityId,
            entityTypeId: 4,
            entityId: companyId
        });

        console.log("Связь дела с компанией успешно создана.");

        // Шаг 4: Удаляем связь дела и лида
        await call('crm.activity.binding.delete', {
            activityId: activityId,
            entityTypeId: 1,
            entityId: leadId
        });

        console.log("Связь дела с лидом успешно удалена.");
    }

    // Запрашиваем ID лида и название компании у пользователя
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const leadId = await rl.question("Введите ID лида: ");
    const companyName = await rl.question("Введите название компании: ");
    rl.close();

    // Запускаем функцию
    try {
        await transferActivityToCompany(leadId, companyName);
    } catch (error) {
        console.error(error.message);
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
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Функция для выполнения всех шагов
    function transferActivityToCompany($serviceBuilder, $leadId, $companyName) {
        $crm = $serviceBuilder->getCRMScope();

        try {
            // Шаг 1: Получаем список дел для указанного лида
            $activities = $crm->activity()->list(
                [],
                [
                    'OWNER_TYPE_ID' => 1,
                    'OWNER_ID' => $leadId
                ],
                [
                    'ID', 'OWNER_TYPE_ID', 'OWNER_ID', 'SUBJECT', 'DESCRIPTION'
                ],
                0
            )->getActivities();

            if (empty($activities)) {
                echo "Дела для указанного лида не найдены.";
                return;
            }

            $activityId = $activities[0]->ID;

            // Шаг 2: Ищем компанию по названию
            $companies = $crm->company()->list(
                [],
                ['TITLE' => $companyName],
                ['ID', 'TITLE'],
                0
            )->getCompanies();

            if (empty($companies)) {
                echo "Компания с указанным названием не найдена.";
                return;
            }

            $companyId = $companies[0]->ID;

            // Шаг 3: Создаем связь для найденного дела и компании
            // crm.activity.binding.add не имеет типизированной обертки — вызываем через core
            $serviceBuilder->core->call(
                'crm.activity.binding.add',
                [
                    'activityId' => $activityId,
                    'entityTypeId' => 4,
                    'entityId' => $companyId
                ]
            );

            echo "Связь дела с компанией успешно создана.";

            // Шаг 4: Удаляем связь дела и лида
            // crm.activity.binding.delete не имеет типизированной обертки — вызываем через core
            $serviceBuilder->core->call(
                'crm.activity.binding.delete',
                [
                    'activityId' => $activityId,
                    'entityTypeId' => 1,
                    'entityId' => $leadId
                ]
            );

            echo "Связь дела с лидом успешно удалена.";
        } catch (\Throwable $e) {
            echo 'Ошибка: ' . $e->getMessage();
        }
    }

    // Запрашиваем ID лида и название компании у пользователя
    $leadId = readline("Введите ID лида: ");
    $companyName = readline("Введите название компании: ");

    // Запускаем функцию
    transferActivityToCompany($serviceBuilder, $leadId, $companyName);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def transfer_activity_to_company(client, lead_id, company_name):
        try:
            activity_result = client.crm.activity.list(
                filter={
                    "OWNER_TYPE_ID": 1,
                    "OWNER_ID": lead_id,
                },
                select=["ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION"],
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        if not activity_result:
            print("Дела для указанного лида не найдены.")
            return

        activity_id = activity_result[0]["ID"]

        try:
            company_result = client.crm.company.list(
                filter={"TITLE": company_name},
                select=["ID", "TITLE"],
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        if not company_result:
            print("Компания с указанным названием не найдена.")
            return

        company_id = company_result[0]["ID"]

        try:
            add_result = client.crm.activity.binding.add(
                activity_id=activity_id,
                entity_type_id=4,
                entity_id=company_id,
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        if not add_result:
            return

        print("Связь дела с компанией успешно создана.")

        try:
            delete_result = client.crm.activity.binding.delete(
                activity_id=activity_id,
                entity_type_id=1,
                entity_id=lead_id,
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
        else:
            if delete_result:
                print("Связь дела с лидом успешно удалена.")


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    lead_id = int(input("Введите ID лида: "))
    company_name = input("Введите название компании: ")

    transfer_activity_to_company(client, lead_id, company_name)
    ```

{% endlist %}

## Проверим результат

Откройте карточку компании — в таймлайне появится перенесенное письмо. В карточке лида этого дела больше не будет: сценарий переносит связь, а не копирует ее.

Проверить результат через REST можно методом [crm.activity.binding.list](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-list.md). Передайте в него `activityId` перенесенного дела — метод вернет все связи дела. После успешного переноса в ответе останется одна связь: тип объекта `4` и ID компании. Связи с лидом, тип объекта `1`, в ответе быть не должно.

```JSON
{
    "result": [
        {
            "entityTypeId": 4,
            "entityId": 173
        }
    ]
}
```

Если в ответе остались обе связи, шаг 4 не выполнился — повторите его. Если связь с компанией не появилась, вернитесь к шагу 3.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `LAST_BINDING_CANNOT_BE_DELETED` | Вы удаляете единственную связь дела. Сначала выполните шаг 3 и привяжите дело к компании, только потом удаляйте связь с лидом ||
|| `ACTIVITY_IS_ALREADY_BOUND` | Дело уже привязано к компании. Шаг 3 выполнен, переходите к шагу 4 ||
|| `BINDING_NOT_FOUND` | Дело не привязано к лиду из `entityId`. Проверьте, из какого элемента переносите дело ||
|| `NOT_FOUND` | Дело или элемент CRM не найдены. Проверьте `activityId` и `entityId` ||
|| `OWNER_NOT_FOUND` | Владелец дела не найден. Проверьте `entityTypeId` и `entityId` ||
|| `ACCESS_DENIED` | У пользователя нет прав на изменение элементов CRM ||
|| `100` | Не переданы обязательные параметры. Методам `binding.add` и `binding.delete` нужны все три: `activityId`, `entityTypeId` и `entityId` ||
|#

## Что важно учитывать

- Между элементами одного типа дело переносят одним методом [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md), сценарий из двух шагов для этого не нужен
- Порядок шагов 3 и 4 менять нельзя: у дела всегда должна оставаться хотя бы одна связь
- Между шагами 3 и 4 дело видно в таймлайне обоих элементов — и лида, и компании
- Собственные поля дела `OWNER_TYPE_ID` и `OWNER_ID` переключаются на компанию только после шага 4, когда у дела остается одна связь. Пока связей две, владельцем остается лид. После шага 4 [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром по лиду перенесенное дело больше не вернет, ищите его по компании с `OWNER_TYPE_ID` равным `4`
- Компания в сценарии — только пример целевого объекта. Чтобы перенести дело в сделку, найдите ее методом [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) и передайте `2` в `entityTypeId` шага 3. Значения для остальных типов — в справочнике [типов объектов](../../../api-reference/crm/data-types.md#object_type)
- Метод [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) по фильтру `TITLE` может вернуть несколько компаний с одинаковым названием, проверяйте, ту ли компанию вы выбрали
- Повторный запуск примера на том же лиде уже перенесенное дело не найдет: связи с лидом больше нет, и пример завершится сообщением, что дела не найдены

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md)
- [{#T}](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md)
- [{#T}](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](./how-to-move-activity.md)
- [{#T}](./how-to-change-date-in-activity.md)
