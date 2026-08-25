# Как перенести дело между элементами одного типа

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элементов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Перенос дела из одного элемента в другой может потребоваться, когда в один лид попадает несколько писем или звонков, которые с точки зрения бизнеса относятся к разным лидам. В этом случае можно разделить исходный лид на несколько новых и перенести дела для корректного учета данных.

Метод переносит связь дела, а не копирует ее. В результате сценария дело появится в таймлайне нового лида и исчезнет из таймлайна исходного.

{% note warning "" %}

Дело можно перенести только между элементами одного типа: значения `sourceEntityTypeId` и `targetEntityTypeId` должны совпадать. Если типы разные, метод вернет ошибку `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL_ERROR`. Чтобы перенести дело между объектами разных типов, например из лида в компанию, используйте сценарий [Как перенести дело из одного типа объекта в другой](./how-to-move-activity-between-objects.md).

{% endnote %}

Для переноса дела последовательно выполним три метода:

1. [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — получим ID дела,

2. [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) — создадим элемент, в который перенесем дело, в примере лид,

3. [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) — выполним перенос дела.

## 1. Получаем ID дела {#first}

Используем метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром:

- `OWNER_TYPE_ID` — [тип объекта](../../../api-reference/crm/data-types.md#object_type), укажем `1` для лида,

- `OWNER_ID` — ID элемента, из которого будем переносить дело.

В примере переносим дело из лида `1000977`. ID лида виден в адресной строке его карточки, например `/crm/lead/details/1000977/`, или его можно получить методом [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md).

Без параметра `select` метод возвращает все поля дела. Чтобы сократить ответ, укажем только те поля, которые нужны сценарию: `ID`, `OWNER_TYPE_ID`, `OWNER_ID`, `SUBJECT` и `DESCRIPTION`. По полю `DESCRIPTION` в [примере кода](#example) выбирается нужное дело.

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
        },
        {
            "ID": "7687",
            "OWNER_TYPE_ID": "1",
            "OWNER_ID": "1000977",
            "SUBJECT": "для лидов",
            "DESCRIPTION": "<div>письмо второе</div>\r\n"
        }
    ],
    "total": 2
}
```

Выберем нужное дело из списка полученных и сохраним его `ID`: `7687`. Это значение передадим в параметр `activityId` на шаге 3.

## 2. Создаем новый элемент {#second}

Для создания нового лида, в который перенесем дело письма, выполним метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) с параметрами:

- `fields[TITLE]` — название лида,

- `fields[ASSIGNED_BY_ID]` — идентификатор ответственного за новый лид,

- `params[REGISTER_SONET_EVENT]` — параметр для регистрации уведомлений, укажем `Y`, чтобы на новый лид сработали системные уведомления при создании.

В методе должны быть указаны все обязательные поля для лидов вашего Битрикс24, иначе лид создан не будет. Проверить, какие поля обязательные, можно методом [crm.lead.fields](../../../api-reference/crm/leads/crm-lead-fields.md), он вызывается без параметров.

{% list tabs %}

- JS

    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: "crm.lead.add",
        params: {
            fields:
            {
                TITLE: "Второй лид",
                ASSIGNED_BY_ID: 1,
            },
            params: {
                REGISTER_SONET_EVENT: "Y",
            }
        }
    });
    ```

- Python

    ```python
    result = client.crm.lead.add(
        fields={
            "TITLE": "Второй лид",
            "ASSIGNED_BY_ID": 1,
        },
        params={
            "REGISTER_SONET_EVENT": "Y",
        },
    ).response.result
    ```


- PHP

    ```php
    $newLeadId = $serviceBuilder->getCRMScope()->lead()->add(
        [
            'TITLE' => 'Второй лид',
            'ASSIGNED_BY_ID' => 1,
        ],
        [
            'REGISTER_SONET_EVENT' => 'Y',
        ]
    )->getId();
    ```
{% endlist %}

В результате получим ID созданного лида. Это значение передадим в параметр `targetEntityId` на шаге 3.

```JSON
{
    "result": 1000979
}
```

## 3. Переносим дело между элементами

Для переноса дела используем метод [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md),

- `sourceEntityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), откуда переносим дело,

- `sourceEntityId` — ID элемента, откуда переносим дело,

- `targetEntityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), куда переносим дело,

- `targetEntityId` — ID элемента, куда переносим дело, получили на [шаге 2](#second) в методе [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

В примере оба типа объекта равны `1` — дело переносится из лида в лид.

{% list tabs %}

- JS

    ```JavaScript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.activity.binding.move',
        params: {
            activityId: 7687,
            sourceEntityTypeId: 1,
            sourceEntityId: 1000977,
            targetEntityTypeId: 1,
            targetEntityId: 1000979
        }
    });
    ```

- Python

    ```python
    result = client.crm.activity.binding.move(
        activity_id=7687,
        source_entity_type_id=1,
        source_entity_id=1000977,
        target_entity_type_id=1,
        target_entity_id=1000979,
    ).response.result
    ```


- PHP

    ```php
    // crm.activity.binding.move не имеет типизированной обертки — вызываем через core
    $result = $serviceBuilder->core->call(
        'crm.activity.binding.move',
        [
            'activityId' => 7687,
            'sourceEntityTypeId' => 1,
            'sourceEntityId' => 1000977,
            'targetEntityTypeId' => 1,
            'targetEntityId' => 1000979
        ]
    );
    ```
{% endlist %}

В результате получим `true`, перенос дела прошел успешно.

```JSON
{
    "result": true
}
```

## Пример кода {#example}

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
    async function transferActivity(firstLeadId, searchPhrase) {
        // Шаг 1: Получаем список дел для указанного лида
        const activities = await call("crm.activity.list", {
            filter: {
                "OWNER_TYPE_ID": 1,
                "OWNER_ID": firstLeadId
            },
            select: [ "ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION" ]
        });

        const targetActivity = activities.find(activity => activity.DESCRIPTION.includes(searchPhrase));

        if (!targetActivity) {
            console.log(`Дело с описанием, содержащим '${searchPhrase}', не найдено.`);
            return;
        }

        const activityId = targetActivity.ID;

        // Шаг 2: Создаем новый лид
        const newLeadId = await call("crm.lead.add", {
            fields: {
                TITLE: "Второй лид",
                ASSIGNED_BY_ID: 1,
            },
            params: {
                REGISTER_SONET_EVENT: "Y",
            }
        });

        // Шаг 3: Переносим дело
        await call('crm.activity.binding.move', {
            activityId: activityId,
            sourceEntityTypeId: 1,
            sourceEntityId: firstLeadId,
            targetEntityTypeId: 1,
            targetEntityId: newLeadId
        });

        console.log("Дело успешно перенесено.");
    }

    // Запрашиваем ID первого лида и фразу для поиска у пользователя
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const firstLeadId = await rl.question("Введите ID первого лида: ");
    const searchPhrase = await rl.question("Введите фразу для поиска по телу письма: ");
    rl.close();

    // Запускаем функцию
    try {
        await transferActivity(firstLeadId, searchPhrase);
    } catch (error) {
        console.error(error.message);
    }
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def transfer_activity(client, first_lead_id, search_phrase):
        try:
            activities = client.crm.activity.list(
                filter={
                    "OWNER_TYPE_ID": 1,
                    "OWNER_ID": first_lead_id,
                },
                select=["ID", "OWNER_TYPE_ID", "OWNER_ID", "SUBJECT", "DESCRIPTION"],
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        target_activity = None
        for activity in activities:
            if search_phrase in str(activity.get("DESCRIPTION") or ""):
                target_activity = activity
                break

        if target_activity is None:
            print(f"Дело с описанием, содержащим '{search_phrase}', не найдено.")
            return

        activity_id = int(target_activity["ID"])

        try:
            new_lead_id = client.crm.lead.add(
                fields={
                    "TITLE": "Второй лид",
                    "ASSIGNED_BY_ID": 1,
                },
                params={
                    "REGISTER_SONET_EVENT": "Y",
                },
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
            return

        try:
            result = client.crm.activity.binding.move(
                activity_id=activity_id,
                source_entity_type_id=1,
                source_entity_id=first_lead_id,
                target_entity_type_id=1,
                target_entity_id=new_lead_id,
            ).response.result
        except BitrixAPIError as error:
            print(f"Ошибка: {error}")
        else:
            if result:
                print("Дело успешно перенесено.")


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token=os.environ["B24_HOOK_TOKEN"],
        )
    )
    # B24_HOOK_TOKEN = 'user_id/webhook_key'

    first_lead_id = int(input("Введите ID первого лида: "))
    search_phrase = input("Введите фразу для поиска по телу письма: ")

    transfer_activity(client, first_lead_id, search_phrase)
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
    function transferActivity($serviceBuilder, $firstLeadId, $searchPhrase) {
        $crm = $serviceBuilder->getCRMScope();

        try {
            // Шаг 1: Получаем список дел для указанного лида
            $activities = $crm->activity()->list(
                [],
                [
                    'OWNER_TYPE_ID' => 1,
                    'OWNER_ID' => $firstLeadId,
                ],
                [
                    'ID', 'OWNER_TYPE_ID', 'OWNER_ID', 'SUBJECT', 'DESCRIPTION'
                ],
                0
            )->getActivities();

            $targetActivity = null;

            foreach ($activities as $activity) {
                if (strpos((string)$activity->DESCRIPTION, $searchPhrase) !== false) {
                    $targetActivity = $activity;
                    break;
                }
            }

            if (!$targetActivity) {
                echo "Дело с описанием, содержащим '{$searchPhrase}', не найдено.";
                return;
            }

            $activityId = $targetActivity->ID;

            // Шаг 2: Создаем новый лид
            $newLeadId = $crm->lead()->add(
                [
                    'TITLE' => 'Второй лид',
                    'ASSIGNED_BY_ID' => 1,
                ],
                [
                    'REGISTER_SONET_EVENT' => 'Y',
                ]
            )->getId();

            // Шаг 3: Переносим дело
            // crm.activity.binding.move не имеет типизированной обертки — вызываем через core
            $serviceBuilder->core->call(
                'crm.activity.binding.move',
                [
                    'activityId' => $activityId,
                    'sourceEntityTypeId' => 1,
                    'sourceEntityId' => $firstLeadId,
                    'targetEntityTypeId' => 1,
                    'targetEntityId' => $newLeadId
                ]
            );

            echo 'Дело успешно перенесено.';
        } catch (\Throwable $e) {
            echo 'Ошибка: ' . $e->getMessage();
        }
    }

    // Запрашиваем ID первого лида и фразу для поиска у пользователя
    $firstLeadId = readline("Введите ID первого лида: ");
    $searchPhrase = readline("Введите фразу для поиска по телу письма: ");

    // Запускаем функцию
    transferActivity($serviceBuilder, $firstLeadId, $searchPhrase);
    ```
{% endlist %}

## Проверим результат

Откройте карточку нового лида — в таймлайне появится перенесенное дело. В карточке исходного лида этого дела больше не будет: метод переносит связь, а не копирует ее.

Проверить результат через REST можно методом [crm.activity.binding.list](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-list.md). Передайте в него `activityId` перенесенного дела — метод вернет все связи дела. После успешного переноса в ответе останется одна связь: тип объекта `1` и ID нового лида.

```JSON
{
    "result": [
        {
            "entityTypeId": 1,
            "entityId": 1000979
        }
    ]
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL_ERROR` | Значения `sourceEntityTypeId` и `targetEntityTypeId` не совпадают. Между объектами разных типов дело переносят по сценарию [Как перенести дело из одного типа объекта в другой](./how-to-move-activity-between-objects.md) ||
|| `SOURCE_AND_TARGET_ENTITY_ID_ARE_EQUAL_ERROR` | В `sourceEntityId` и `targetEntityId` передан один и тот же элемент. Укажите разные элементы ||
|| `BINDING_NOT_FOUND` | Дело не привязано к элементу из `sourceEntityTypeId` и `sourceEntityId`. Проверьте, из какого элемента переносите дело ||
|| `ACTIVITY_IS_ALREADY_BOUND` | Дело уже привязано к элементу, в который вы его переносите ||
|| `NOT_FOUND` | Дело или элемент CRM не найдены. Проверьте `activityId`, `sourceEntityId` и `targetEntityId` ||
|| `ACCESS_DENIED` | У пользователя нет прав на изменение элементов CRM ||
|| `100` | Не переданы обязательные параметры. Метод требует все пять: `activityId`, `sourceEntityTypeId`, `sourceEntityId`, `targetEntityTypeId` и `targetEntityId` ||
|#

## Что важно учитывать

- Метод [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) переносит дело только между элементами одного типа
- Сценарий работает не только для лидов. Чтобы перенести дело между двумя сделками, укажите `2` в `OWNER_TYPE_ID` шага 1 и в обоих параметрах типа объекта шага 3, а целевую сделку создайте методом [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md). Значения для остальных типов — в справочнике [типов объектов](../../../api-reference/crm/data-types.md#object_type)
- Дело переносится вместе со всей историей: письмо или звонок исчезнет из таймлайна исходного элемента
- Вместе со связью у дела меняются собственные поля `OWNER_TYPE_ID` и `OWNER_ID` — когда связь остается одна, владельцем становится ее элемент. Поэтому [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром по исходному лиду перенесенное дело больше не вернет, ищите его по новому лиду
- Метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) требует все обязательные поля лида вашего Битрикс24, состав полей проверяйте методом [crm.lead.fields](../../../api-reference/crm/leads/crm-lead-fields.md)
- Повторный запуск примера создает еще один лид. Уже перенесенное дело в исходном лиде не найдется, и пример завершится сообщением, что дело не найдено

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md)
- [{#T}](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](./how-to-move-activity-between-objects.md)
- [{#T}](./how-to-change-date-in-activity.md)
