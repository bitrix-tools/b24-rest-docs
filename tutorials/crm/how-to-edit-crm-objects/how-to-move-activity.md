# Как перенести дело между элементами одного типа

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элементов CRM

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Перенос дела из одного элемента в другой может потребоваться, когда в один лид попадает несколько писем или звонков, которые с точки зрения бизнеса относятся к разным лидам. В этом случае можно разделить исходный лид на несколько новых и перенести дела для корректного учета данных.

Для переноса дела последовательно выполним три метода:

1. [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — получим ID дела

2. [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) — создадим элемент, в который перенесем дело, в примере лид

3. [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) — выполним перенос дела

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
        {
            "ID": "7687",
            "OWNER_ID": "1000977",
            "OWNER_TYPE_ID": "1",
            "TYPE_ID": "4",
            "PROVIDER_ID": "CRM_EMAIL",
            "PROVIDER_TYPE_ID": "EMAIL",
            "PROVIDER_GROUP_ID": null,
            "ASSOCIATED_ENTITY_ID": "0",
            "SUBJECT": "для лидов",
            "CREATED": "2025-03-10T10:58:13+03:00",
            "LAST_UPDATED": "2025-03-10T10:58:13+03:00",
            "START_TIME": "2025-03-10T10:58:08+03:00",
            "END_TIME": "2025-03-10T20:00:00+03:00",
            "DEADLINE": "9999-12-31T00:00:00+03:00",
            "COMPLETED": "N",
            "STATUS": "1",
            "RESPONSIBLE_ID": "29",
            "PRIORITY": "2",
            "NOTIFY_TYPE": "0",
            "NOTIFY_VALUE": "0",
            "DESCRIPTION": "<div>письмо второе</div>\r\n",
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
        }
    ],
    "total": 2,
}
```

Выберем нужное дело из списка полученных и сохраним его `ID`: `7687`. В [примере кода](#example) выбор дела реализован через поиск по фразе из поля `DESCRIPTION`.

## 2. Создаем новый элемент {#second}

Для создания нового лида, в который перенесем дело письма, выполним метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) с параметрами:

- `fields[TITLE]` — название лида

- `fields[ASSIGNED_BY_ID]` — идентификатор ответственного за новый лид

- `params[REGISTER_SONET_EVENT]` — параметр для регистрации уведомлений, укажем `Y`, чтобы на новый лид сработали системные уведомления при создании

В методе должны быть указаны все обязательные поля для лидов вашего Битрикс24, иначе лид создан не будет. Проверить, какие поля обязательные, можно методом [crm.lead.fields](../../../api-reference/crm/leads/crm-lead-fields.md), он вызывается без параметров.

{% list tabs %}

- JS

    ```JavaScript
    BX24.callMethod(
        "crm.lead.add",
        {
            fields:
            {
                TITLE: "Второй лид", 
                ASSIGNED_BY_ID: 1, 
            },
            params: {
                REGISTER_SONET_EVENT: "Y", 
            }
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.add',
        [
            'fields' => [
                'TITLE' => 'Второй лид', 
                'ASSIGNED_BY_ID' => 1, 
            ],
            'params' => [
                'REGISTER_SONET_EVENT' => 'Y', 
            ]
        ]
    );
    ```

{% endlist %}

В результате получим ID созданного лида.

```JSON
{
    "result": 1000979,
}
```

## 3. Переносим дело между элементами

Для переноса дела используем метод [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) с параметрами:

- `activityId` — ID дела, получили на [шаге 1](#first) в методе [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)

- `sourceEntityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), откуда переносим дело

- `sourceEntityId` — ID элемента, откуда переносим дело

- `targetEntityTypeId` — ID [типа объекта](../../../api-reference/crm/data-types.md#object_type), куда переносим дело

- `targetEntityId` — ID элемента, куда переносим дело, получили на [шаге 2](#second) в методе [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md)

`sourceEntityTypeId` и `targetEntityTypeId` должны иметь одинаковое значение типа объекта.

{% list tabs %}

- JS

    ```JavaScript
    BX24.callMethod(
        'crm.activity.binding.move',
        {
            activityId: 7687, 
            sourceEntityTypeId: 1, 
            sourceEntityId: 1000977, 
            targetEntityTypeId: 1, 
            targetEntityId: 1000979 
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
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

В результате получим `true`, перенос дела прошел успешно. Если в результате вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md#обработка-ошибок).

```JSON
{
    "result": true,
}
```

## Пример кода {#example}

{% list tabs %}

- JS

    ```JavaScript
    // Функция для выполнения всех шагов
    function transferActivity() {
        // Запрашиваем ID первого лида у пользователя
        const firstLeadId = prompt("Введите ID первого лида:");

        // Запрашиваем фразу для поиска по полю описание
        const searchPhrase = prompt("Введите фразу для поиска по телу письма:");

        // Шаг 1: Получаем список дел для указанного лида
        BX24.callMethod(
            "crm.activity.list",
            {
                filter: {
                    "OWNER_TYPE_ID": 1,
                    "OWNER_ID": firstLeadId
                },
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                    return;
                }

                const activities = result.data();
                const targetActivity = activities.find(activity => activity.DESCRIPTION.includes(searchPhrase));

                if (!targetActivity) {
                    console.log(`Дело с описанием, содержащим '${searchPhrase}', не найдено.`);
                    return;
                }

                const activityId = targetActivity.ID;

                // Шаг 2: Создаем новый лид
                BX24.callMethod(
                    "crm.lead.add",
                    {
                        fields: {
                            TITLE: "Второй лид",
                            ASSIGNED_BY_ID: 1,
                        },
                        params: {
                            REGISTER_SONET_EVENT: "Y",
                        }
                    },
                    function(result) {
                        if (result.error()) {
                            console.error(result.error());
                            return;
                        }

                        const newLeadId = result.data();

                        // Шаг 3: Переносим дело
                        BX24.callMethod(
                            'crm.activity.binding.move',
                            {
                                activityId: activityId,
                                sourceEntityTypeId: 1,
                                sourceEntityId: firstLeadId,
                                targetEntityTypeId: 1,
                                targetEntityId: newLeadId
                            },
                            function(result) {
                                if (result.error()) {
                                    console.error(result.error());
                                } else {
                                    console.log("Дело успешно перенесено.");
                                }
                            }
                        );
                    }
                );
            }
        );
    }

    // Запускаем функцию
    transferActivity();
    ```

- PHP

    ```php
    require_once('crest.php');

    // Функция для выполнения всех шагов
    function transferActivity($firstLeadId, $searchPhrase) {
        // Шаг 1: Получаем список дел для указанного лида
        $result = CRest::call(
            'crm.activity.list',
            [
                'filter' => [
                    'OWNER_TYPE_ID' => 1,
                    'OWNER_ID' => $firstLeadId
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка: ' . $result['error_description'];
            return;
        }

        $activities = $result['result'];
        $targetActivity = null;

        foreach ($activities as $activity) {
            if (strpos($activity['DESCRIPTION'], $searchPhrase) !== false) {
                $targetActivity = $activity;
                break;
            }
        }

        if (!$targetActivity) {
            echo "Дело с описанием, содержащим '{$searchPhrase}', не найдено.";
            return;
        }

        $activityId = $targetActivity['ID'];

        // Шаг 2: Создаем новый лид
        $leadResult = CRest::call(
            'crm.lead.add',
            [
                'fields' => [
                    'TITLE' => 'Второй лид',
                    'ASSIGNED_BY_ID' => 1,
                ],
                'params' => [
                    'REGISTER_SONET_EVENT' => 'Y',
                ]
            ]
        );

        if (isset($leadResult['error'])) {
            echo 'Ошибка: ' . $leadResult['error_description'];
            return;
        }

        $newLeadId = $leadResult['result'];

        // Шаг 3: Переносим дело
        $moveResult = CRest::call(
            'crm.activity.binding.move',
            [
                'activityId' => $activityId,
                'sourceEntityTypeId' => 1,
                'sourceEntityId' => $firstLeadId,
                'targetEntityTypeId' => 1,
                'targetEntityId' => $newLeadId
            ]
        );

        if (isset($moveResult['error'])) {
            echo 'Ошибка: ' . $moveResult['error_description'];
        } else {
            echo 'Дело успешно перенесено.';
        }
    }

    // Запрашиваем ID первого лида и фразу для поиска у пользователя
    $firstLeadId = readline("Введите ID первого лида: ");
    $searchPhrase = readline("Введите фразу для поиска по телу письма: ");

    // Запускаем функцию
    transferActivity($firstLeadId, $searchPhrase);
    ```

{% endlist %}