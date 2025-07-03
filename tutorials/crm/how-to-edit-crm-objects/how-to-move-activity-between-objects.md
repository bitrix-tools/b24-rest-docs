# Как перенести дело из одного типа объекта в другой

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элементов CRM

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
    BX24.callMethod(
        "crm.activity.list",
        {
            filter:
            {
                "OWNER_TYPE_ID": 1, 
                "OWNER_ID": 1000977 
            },
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'OWNER_TYPE_ID' => 1, 
                'OWNER_ID' => 1000977 /
            ]
        ]
    );
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
    BX24.callMethod(
        "crm.company.list",
        {
            filter: { "TITLE": "Название_компании" },
            select: [ "ID", "TITLE" ]
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.list',
        [
            'filter' => [
                'TITLE' => 'Название_компании' 
            ],
            'select' => [
                'ID', 'TITLE'
            ]
        ]
    );
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
    BX24.callMethod(
        'crm.activity.binding.add',
        {
            activityId: 7685, 
            entityTypeId: 4, 
            entityId: 173 
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.add',
        [
            'activityId' => 7685, 
            'entityTypeId' => 4, 
            'entityId' => 173 
        ]
    );
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
    BX24.callMethod(
        'crm.activity.binding.delete',
        {
            activityId: 7685, 
            entityTypeId: 1, 
            entityId: 1000977 
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.delete',
        [
            'activityId' => 7685, 
            'entityTypeId' => 1, 
            'entityId' => 1000977 
        ]
    );
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
    // Функция для выполнения всех шагов
    function transferActivityToCompany() {
        // Запрашиваем ID лида у пользователя
        const leadId = prompt("Введите ID лида:");

        // Запрашиваем название компании у пользователя
        const companyName = prompt("Введите название компании:");

        // Шаг 1: Получаем список дел для указанного лида
        BX24.callMethod(
            "crm.activity.list",
            {
                filter: {
                    "OWNER_TYPE_ID": 1,
                    "OWNER_ID": leadId
                },
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                    return;
                }

                const activities = result.data();
                if (activities.length === 0) {
                    console.log("Дела для указанного лида не найдены.");
                    return;
                }

                const activityId = activities[0].ID;

                // Шаг 2: Ищем компанию по названию
                BX24.callMethod(
                    "crm.company.list",
                    {
                        filter: { "TITLE": companyName },
                        select: [ "ID", "TITLE" ]
                    },
                    function(result) {
                        if (result.error()) {
                            console.error(result.error());
                            return;
                        }

                        const companies = result.data();
                        if (companies.length === 0) {
                            console.log("Компания с указанным названием не найдена.");
                            return;
                        }

                        const companyId = companies[0].ID;

                        // Шаг 3: Создаем связь для найденного дела и компании
                        BX24.callMethod(
                            'crm.activity.binding.add',
                            {
                                activityId: activityId,
                                entityTypeId: 4,
                                entityId: companyId
                            },
                            function(result) {
                                if (result.error()) {
                                    console.error(result.error());
                                    return;
                                }

                                console.log("Связь дела с компанией успешно создана.");

                                // Шаг 4: Удаляем связь дела и лида
                                BX24.callMethod(
                                    'crm.activity.binding.delete',
                                    {
                                        activityId: activityId,
                                        entityTypeId: 1,
                                        entityId: leadId
                                    },
                                    function(result) {
                                        if (result.error()) {
                                            console.error(result.error());
                                        } else {
                                            console.log("Связь дела с лидом успешно удалена.");
                                        }
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }

    // Запускаем функцию
    transferActivityToCompany();
    ```

- PHP

    ```php
    require_once('crest.php');

    // Функция для выполнения всех шагов
    function transferActivityToCompany($leadId, $companyName) {
        // Шаг 1: Получаем список дел для указанного лида
        $activityResult = CRest::call(
            'crm.activity.list',
            [
                'filter' => [
                    'OWNER_TYPE_ID' => 1,
                    'OWNER_ID' => $leadId
                ]
            ]
        );

        if (isset($activityResult['error'])) {
            echo 'Ошибка: ' . $activityResult['error_description'];
            return;
        }

        $activities = $activityResult['result'];
        if (empty($activities)) {
            echo "Дела для указанного лида не найдены.";
            return;
        }

        $activityId = $activities[0]['ID'];

        // Шаг 2: Ищем компанию по названию
        $companyResult = CRest::call(
            'crm.company.list',
            [
                'filter' => ['TITLE' => $companyName],
                'select' => ['ID', 'TITLE']
            ]
        );

        if (isset($companyResult['error'])) {
            echo 'Ошибка: ' . $companyResult['error_description'];
            return;
        }

        $companies = $companyResult['result'];
        if (empty($companies)) {
            echo "Компания с указанным названием не найдена.";
            return;
        }

        $companyId = $companies[0]['ID'];

        // Шаг 3: Создаем связь для найденного дела и компании
        $bindingAddResult = CRest::call(
            'crm.activity.binding.add',
            [
                'activityId' => $activityId,
                'entityTypeId' => 4,
                'entityId' => $companyId
            ]
        );

        if (isset($bindingAddResult['error'])) {
            echo 'Ошибка: ' . $bindingAddResult['error_description'];
            return;
        }

        echo "Связь дела с компанией успешно создана.";

        // Шаг 4: Удаляем связь дела и лида
        $bindingDeleteResult = CRest::call(
            'crm.activity.binding.delete',
            [
                'activityId' => $activityId,
                'entityTypeId' => 1,
                'entityId' => $leadId
            ]
        );

        if (isset($bindingDeleteResult['error'])) {
            echo 'Ошибка: ' . $bindingDeleteResult['error_description'];
        } else {
            echo "Связь дела с лидом успешно удалена.";
        }
    }

    // Запрашиваем ID лида и название компании у пользователя
    $leadId = readline("Введите ID лида: ");
    $companyName = readline("Введите название компании: ");

    // Запускаем функцию
    transferActivityToCompany($leadId, $companyName);
    ``` 

{% endlist %}