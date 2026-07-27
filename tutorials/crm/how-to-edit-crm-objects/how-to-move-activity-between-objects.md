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

Для переноса дела последовательно выполним четыре метода:

1. [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — получим ID дела

2. [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) — получим ID компании для переноса дела

3. [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md) — добавим связь дела с компанией

4. [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md) — удалим связь дела с лидом

## 1. Получаем ID дела {#first}

Используем метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром:

- `OWNER_TYPE_ID` — [тип объекта](../../../api-reference/crm/data-types.md#object_type), укажем `1` для лида

- `OWNER_ID` — ID элемента, из которого будем переносить дело

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

    $result = $serviceBuilder->getCRMScope()->activity()->list(
        [],
        [
            'OWNER_TYPE_ID' => 1,
            'OWNER_ID' => 1000977,
        ],
        [],
        0
    );
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

    result = client.crm.activity.list(
        filter={
            "OWNER_TYPE_ID": 1,
            "OWNER_ID": 1000977,
        }
    ).response.result
    ```

{% endlist %}

В результате получим все дела, связанные с указанным элементом.

```JSON
{
    "result": [
        {
            "ID": "7685",
            "OWNER_ID": "1000977",
            "OWNER_TYPE_ID": "1",
            "TYPE_ID": "4",
            "PROVIDER_ID": "CRM_EMAIL",
            "PROVIDER_TYPE_ID": "EMAIL",
            "PROVIDER_GROUP_ID": null,
            "ASSOCIATED_ENTITY_ID": "0",
            "SUBJECT": "для лидов",
            "CREATED": "2025-03-10T10:57:41+03:00",
            "LAST_UPDATED": "2025-03-10T10:57:41+03:00",
            "START_TIME": "2025-03-10T10:57:34+03:00",
            "END_TIME": "2025-03-10T20:00:00+03:00",
            "DEADLINE": "9999-12-31T00:00:00+03:00",
            "COMPLETED": "N",
            "STATUS": "1",
            "RESPONSIBLE_ID": "29",
            "PRIORITY": "2",
            "NOTIFY_TYPE": "0",
            "NOTIFY_VALUE": "0",
            "DESCRIPTION": "<div>письмо первое</div>\r\n",
            "DESCRIPTION_TYPE": "3",
            "DIRECTION": "1",
            "LOCATION": "",
            "SETTINGS": {
                "EMAIL_META": {
                    "__email": "some_email@gmail.com",
                    "from": "Some client <some_client@gmail.com>",
                    "replyTo": "",
                    "to": "\"some_email@gmail.com\" <some_email@gmail.com>",
                    "cc": "",
                    "bcc": ""
                },
                "SANITIZE_ON_VIEW": 1
            },
            "ORIGINATOR_ID": null,
            "ORIGIN_ID": null,
            "AUTHOR_ID": "1",
            "EDITOR_ID": "29",
            "PROVIDER_PARAMS": [],
            "PROVIDER_DATA": null,
            "RESULT_MARK": "0",
            "RESULT_VALUE": null,
            "RESULT_SUM": null,
            "RESULT_CURRENCY_ID": null,
            "RESULT_STATUS": "0",
            "RESULT_STREAM": "0",
            "RESULT_SOURCE_ID": null,
            "AUTOCOMPLETE_RULE": "0"
        },
    ],
    "total": 1,
}
```

## 2. Получаем ID компании {#second}

Используем метод [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) с фильтром:

- `TITLE` — название компании

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
    $result = $serviceBuilder->getCRMScope()->company()->list(
        [],
        [
            'TITLE' => 'Название_компании'
        ],
        [
            'ID', 'TITLE'
        ],
        0
    );
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

В результате получим ID компании — `ID`: `173`.

```JSON
{
    "result": [
        {
            "ID": "173",
            "TITLE": "Название_компании"
        }
    ],
    "total": 1,
}
```

## 3. Добавляем связь дела с компанией

Для связи дела и компании используем метод [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)

- `entityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), укажем `4` для компании

- `entityId` — ID компании, получили на [шаге 2](#second) в методе [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md)

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

В результате получим `true`, добавление связи для дела прошло успешно. Если в результате вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md).

```JSON
{
    "result": true,
}
```

## 4. Удаляем связь дела с лидом

Используем метод [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)

- `entityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), укажем `1` для лида

- `entityId` — ID лида, откуда удаляем дело

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

В результате получим `true`, удаление связи дела с лидом прошло успешно. Если в результате вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md).

```JSON
{
    "result": true,
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
            }
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
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

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
                [],
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
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def transfer_activity_to_company(client, lead_id, company_name):
        try:
            activity_result = client.crm.activity.list(
                filter={
                    "OWNER_TYPE_ID": 1,
                    "OWNER_ID": lead_id,
                }
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
            webhook_token="user_id/webhook_key",
        )
    )

    lead_id = int(input("Введите ID лида: "))
    company_name = input("Введите название компании: ")

    transfer_activity_to_company(client, lead_id, company_name)
    ```

{% endlist %}
