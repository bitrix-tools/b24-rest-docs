# Как завершить бизнес-процессы уволенного сотрудника

> Scope: [`user_brief, user_basic, user, bizproc`](../../api-reference/scopes/permissions.md)
> 
> Кто может выполнять методы: администратор

При увольнении сотрудника в Битрикс24 могут остаться незавершенные бизнес-процессы, за которые он был ответственен.

Чтобы завершить активные бизнес-процессы уволенного сотрудника, последовательно выполним три метода:

1. [user.get](../../api-reference/user/user-get.md) — получим `ID` уволенного сотрудника

2. [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) — получим список заданий процессов, за которые отвечает уволенный сотрудник

3. [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) — завершим бизнес-процессы с удалением данных. Если нужно сохранить факт запуска бизнес-процесса, используйте метод [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Оба метода вызываются одинаково

## 1. Получим ID уволенного сотрудника {#user-id}

Используем метод [user.get](../../api-reference/user/user-get.md) с фильтром:

- `NAME` — укажем имя сотрудника

- `LAST_NAME` — укажем фамилию сотрудника

- `ACTIVE` — параметр регулирует поиск по активным или уволенным сотрудникам. Если параметр не передавать, поиск будет идти по всем сотрудникам вне зависимости от их статуса. Укажем `0` для поиска только среди уволенных сотрудников

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "NAME": "employee's name",
                "LAST_NAME": "employee's last name",
                "ACTIVE": 0
            }
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                'NAME' => "employee's name",
                'LAST_NAME' => "employee's last name",
                'ACTIVE' => 0
            ]
        ]
    );
    ```

{% endlist %}

В результате получим `ID` уволенного сотрудника.

```json
{
    "result": [
        {
            "ID": "29",
            "XML_ID": "28936832",
            "ACTIVE": false,
            "NAME": "employee's name",
            "LAST_NAME": "employee's last name",
            "SECOND_NAME": "",
            "TITLE": "",
            "EMAIL": "employee_email@gmail.com",
            "LAST_LOGIN": "2025-03-27T13:49:36+03:00",
            "DATE_REGISTER": "2020-04-23T03:00:00+03:00",
            "TIME_ZONE": "Asia/Yekaterinburg",
            "IS_ONLINE": "N",
            "TIMESTAMP_X": {},
            "LAST_ACTIVITY_DATE": {},
            "PERSONAL_GENDER": "",
            "PERSONAL_PROFESSION": "",
            "PERSONAL_WWW": "",
            "PERSONAL_BIRTHDAY": "",
            "PERSONAL_PHOTO": "https://cdn-ru.bitrix24.ru/b13743910/main/3f2/3f212fkdjf8c3627cfe51633f959de/avatar.png",
            "PERSONAL_ICQ": "",
            "PERSONAL_PHONE": "",
            "PERSONAL_FAX": "",
            "PERSONAL_MOBILE": "",
            "PERSONAL_PAGER": "",
            "PERSONAL_STREET": "",
            "PERSONAL_CITY": "",
            "PERSONAL_STATE": "",
            "PERSONAL_ZIP": "",
            "PERSONAL_COUNTRY": "0",
            "PERSONAL_MAILBOX": "",
            "PERSONAL_NOTES": "",
            "WORK_PHONE": "",
            "WORK_COMPANY": "",
            "WORK_POSITION": "Менеджер",
            "WORK_DEPARTMENT": "",
            "WORK_WWW": "",
            "WORK_FAX": "",
            "WORK_PAGER": "",
            "WORK_STREET": "",
            "WORK_MAILBOX": "",
            "WORK_CITY": "",
            "WORK_STATE": "",
            "WORK_ZIP": "",
            "WORK_COUNTRY": "0",
            "WORK_PROFILE": "",
            "WORK_NOTES": "",
            "UF_EMPLOYMENT_DATE": "",
            "UF_DEPARTMENT": [
                7,
                1
            ],
            "UF_PHONE_INNER": "555",
            "UF_USR_1619099890455": "12132132123",
            "USER_TYPE": "employee"
        }
    ],
    "total": 1,
}
```

## 2. Получим список заданий процессов, за которые отвечает уволенный сотрудник {#workflow_id}

Используем метод [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md) с фильтром:

- `USER_ID` — идентификатор сотрудника, передаем ID, полученный на [шаге 1](#user-id)

- `STATUS` — параметр отвечает за статус заданий, укажем `0` для отбора только невыполненных заданий

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'bizproc.task.list',
        {
            filter: {
                'USER_ID': 29,
                'STATUS': 0,
            }
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.task.list',
        [
            'filter' => [
                'USER_ID' => 29,
                'STATUS' => 0
            ]
        ]
    );
    ```

{% endlist %}

В результате получим список невыполненных заданий. У каждого задания есть параметр `WORKFLOW_ID` — это `ID` бизнес-процесса, который мы завершим в следующем шаге.

```json
{
    "result": [
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2437",
            "ID": "879",
            "WORKFLOW_ID": "67e3db8e581121.72266518",
            "DOCUMENT_NAME": "widget contact",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2437/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2435",
            "ID": "877",
            "WORKFLOW_ID": "67c5b492d0b426.74280093",
            "DOCUMENT_NAME": "Контакт #2435",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2435/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2433",
            "ID": "875",
            "WORKFLOW_ID": "67c598a987d387.85575151",
            "DOCUMENT_NAME": "Контакт #2433",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2433/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2429",
            "ID": "871",
            "WORKFLOW_ID": "67091df4b13dd2.83077613",
            "DOCUMENT_NAME": "Петечкин Вася",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2429/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2427",
            "ID": "859",
            "WORKFLOW_ID": "66e2d5d5c64f82.28057011",
            "DOCUMENT_NAME": "Иванович",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2427/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2425",
            "ID": "857",
            "WORKFLOW_ID": "66e0242399d303.52288141",
            "DOCUMENT_NAME": "Петровна",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2425/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2423",
            "ID": "855",
            "WORKFLOW_ID": "66d870dfbb9542.91956540",
            "DOCUMENT_NAME": "Смирнов",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2423/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2421",
            "ID": "853",
            "WORKFLOW_ID": "66d7fb6f86c0c2.49741539",
            "DOCUMENT_NAME": "Калашников",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2421/"
        },
        {
            "ENTITY": "CCrmDocumentContact",
            "DOCUMENT_ID": "CONTACT_2419",
            "ID": "851",
            "WORKFLOW_ID": "66d073d9c9fc08.23457428",
            "DOCUMENT_NAME": "Без имени",
            "NAME": "Адрес",
            "DOCUMENT_URL": "/crm/contact/details/2419/"
        }
    ],
    "total": 9,
}
```

## 3. Завершим бизнес-процессы

Используем метод [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) с параметром:

- `ID` — идентификатор процесса, передаем `WORKFLOW_ID`, полученный на [шаге 2](#workflow_id)
  
{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'bizproc.workflow.kill',
        {
            ID: '67e3db8e581121.72266518',
        },
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.kill',
        [
            'ID' => '67e3db8e581121.72266518'
        ]
    );
    ```

{% endlist %}

В результате получим `true`, удаление процесса прошло успешно. Если  вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md).

```json
{
    "result": true,
}
```

## Пример кода

В примере все найденные процессы удаляются в цикле. Если вам требуется удалить большой объем данных, вы можете столкнуться с лимитами на выполнение запросов. Чтобы оптимизировать код под ваш объем работы, используйте рекомендации раздела [Производительность](../../settings/performance/index.md).

{% list tabs %}

- JS

    ```javascript
    // Функция для получения ID сотрудника по имени и фамилии
    function getUserId(firstName, lastName, callback) {
        BX24.callMethod(
            "user.get",
            {
                "NAME": firstName,
                "LAST_NAME": lastName,
                "ACTIVE": 0,
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    // Предполагаем, что найден только один пользователь
                    const userId = result.data()[0].ID;
                    callback(userId);
                }
            }
        );
    }

    // Функция для получения списка невыполненных заданий сотрудника
    function getUserTasks(userId, callback) {
        BX24.callMethod(
            'bizproc.task.list',
            {
                filter: {
                    'USER_ID': userId,
                    'STATUS': 0,
                }
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    // Извлекаем WORKFLOW_ID из каждого задания
                    const workflowIds = result.data().map(task => task.WORKFLOW_ID);
                    callback(workflowIds);
                }
            }
        );
    }

    // Функция для завершения бизнес-процессов по списку WORKFLOW_ID
    function killWorkflows(workflowIds) {
        workflowIds.forEach(workflowId => {
            BX24.callMethod(
                'bizproc.workflow.kill',
                {
                    ID: workflowId,
                },
                function(result) {
                    if (result.error()) {
                        console.error(result.error());
                    } else {
                        console.log(`Workflow ${workflowId} завершен успешно.`);
                    }
                }
            );
        });
    }

    // Основная функция, которая объединяет все шаги
    function processEmployeeTasks(firstName, lastName) {
        getUserId(firstName, lastName, function(userId) {
            getUserTasks(userId, function(workflowIds) {
                killWorkflows(workflowIds);
            });
        });
    }

    // Запрашиваем у пользователя имя и фамилию
    const firstName = prompt("Введите имя сотрудника:");
    const lastName = prompt("Введите фамилию сотрудника:");

    // Запускаем процесс
    processEmployeeTasks(firstName, lastName);
    ```

- PHP

    ```php
    require_once('crest.php');

    // Функция для получения ID сотрудника по имени и фамилии
    function getUserId($firstName, $lastName) {
        $result = CRest::call(
            'user.get',
            [
                'filter' => [
                    'NAME' => $firstName,
                    'LAST_NAME' => $lastName,
                    'ACTIVE' => 0
                ]
            ]
        );

        if (!empty($result['error'])) {
            echo "Error: " . $result['error_description'];
            return null;
        }

        // Предполагаем, что найден только один пользователь
        return $result['result'][0]['ID'] ?? null;
    }

    // Функция для получения списка невыполненных заданий сотрудника
    function getUserTasks($userId) {
        $result = CRest::call(
            'bizproc.task.list',
            [
                'filter' => [
                    'USER_ID' => $userId,
                    'STATUS' => 0
                ]
            ]
        );

        if (!empty($result['error'])) {
            echo "Error: " . $result['error_description'];
            return [];
        }

        // Извлекаем WORKFLOW_ID из каждого задания
        return array_map(function($task) {
            return $task['WORKFLOW_ID'];
        }, $result['result']);
    }

    // Функция для завершения бизнес-процессов по списку WORKFLOW_ID
    function killWorkflows($workflowIds) {
        foreach ($workflowIds as $workflowId) {
            $result = CRest::call(
                'bizproc.workflow.kill',
                [
                    'ID' => $workflowId
                ]
            );

            if (!empty($result['error'])) {
                echo "Error: " . $result['error_description'];
            } else {
                echo "Workflow $workflowId завершен успешно.\n";
            }
        }
    }

    // Основная функция, которая объединяет все шаги
    function processEmployeeTasks($firstName, $lastName) {
        $userId = getUserId($firstName, $lastName);
        if ($userId) {
            $workflowIds = getUserTasks($userId);
            killWorkflows($workflowIds);
        }
    }

    // Запрашиваем у пользователя имя и фамилию
    $firstName = readline("Введите имя сотрудника: ");
    $lastName = readline("Введите фамилию сотрудника: ");

    // Запускаем процесс
    processEmployeeTasks($firstName, $lastName);
    ```

{% endlist %}