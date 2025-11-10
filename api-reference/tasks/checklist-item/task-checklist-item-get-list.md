# Получить список пунктов чек-листа task.checklistitem.getlist

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.checklistitem.getlist` получает список пунктов чек-листов в задаче.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор можно получить при [создании задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки результата вида `{"поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор пункта чек-листа
- `PARENT_ID` — идентификатор родительского пункта
- `CREATED_BY` — идентификатор автора пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта
- `TOGGLED_BY` — идентификатор пользователя, который последний раз сменил статус пункта
- `TOGGLED_DATE` — дата и время изменения статуса пункта

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию результат сортируется по `ID` в порядке убывания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"IS_COMPLETE":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.checklistitem.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"IS_COMPLETE":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.getlist
    ```

- JS

    ```javascript
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'task.checklistitem.getlist',
        {
        TASKID: 8017,
        ORDER: {
            IS_COMPLETE: 'ASC'
        }
        },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('task.checklistitem.getlist', {
        TASKID: 8017,
        ORDER: {
        IS_COMPLETE: 'ASC'
        }
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('task.checklistitem.getlist', {
        TASKID: 8017,
        ORDER: {
        IS_COMPLETE: 'ASC'
        }
    }, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.checklistitem.getlist',
                [
                    'TASKID' => 8017,
                    'ORDER' => [
                        'IS_COMPLETE' => 'ASC'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching checklist items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.getlist',
        {
            'TASKID': 8017,
            'ORDER': {
                'IS_COMPLETE': 'ASC'
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.checklistitem.getlist',
        [
            'TASKID' => 8017,
            'ORDER' => [
                'IS_COMPLETE' => 'ASC'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "477",
            "TASK_ID": "8017",
            "PARENT_ID": "431",
            "CREATED_BY": "503",
            "TITLE": "Подготовить договор Светлана Иванова",
            "SORT_INDEX": "2",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": "503",
            "TOGGLED_DATE": "2025-11-10T15:02:30+03:00",
            "MEMBERS": [
                {
                    "ID": "103",
                    "TYPE": "A",
                    "NAME": "Светлана Иванова",
                    "PERSONAL_PHOTO": "8644",
                    "PERSONAL_GENDER": "F",
                    "IMAGE": "https://mysite.ru/b17053/resize_cache/8644/c0120a8d7c10d63c83e32398d1ec4d9e/main/45f/45fff10d17d398a5583184c8350cd197/buh.jpg",
                    "IS_COLLABER": false
                }
            ],
            "ATTACHMENTS": {
                "1113": {
                    "ATTACHMENT_ID": 1113,
                    "NAME": "Инструкция.docx",
                    "SIZE": "115161",
                    "FILE_ID": "5065",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=1113&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=1113&action=show&ncc=1"
                },
                "1115": {
                    "ATTACHMENT_ID": 1115,
                    "NAME": "Список документов.xlsx",
                    "SIZE": "14675",
                    "FILE_ID": "5067",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=1115&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=1115&action=show&ncc=1"
                }
            }
        },
        {
            "ID": "431",
            "TASK_ID": "8017",
            "PARENT_ID": 0,
            "CREATED_BY": "503",
            "TITLE": "Чек-лист 1",
            "SORT_INDEX": "0",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": null,
            "TOGGLED_DATE": "",
            "MEMBERS": [],
            "ATTACHMENTS": []
        },
        {
            "ID": "447",
            "TASK_ID": "8017",
            "PARENT_ID": "431",
            "CREATED_BY": "503",
            "TITLE": "Согласовать с клиентом детали",
            "SORT_INDEX": "1",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": null,
            "TOGGLED_DATE": "",
            "MEMBERS": [],
            "ATTACHMENTS": []
        },
        {
            "ID": "469",
            "TASK_ID": "8017",
            "PARENT_ID": "447",
            "CREATED_BY": "503",
            "TITLE": "Согласовать с руководителем Андрей Карпов Андрей Сергеев",
            "SORT_INDEX": "2",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": null,
            "TOGGLED_DATE": "",
            "MEMBERS": [
                {
                    "ID": "3",
                    "TYPE": "A",
                    "NAME": "Андрей Карпов",
                    "PERSONAL_PHOTO": "249",
                    "PERSONAL_GENDER": "M",
                    "IMAGE": "https://mysite.ru/b17053/resize_cache/249/c0120a8d7c10d63c83e32398d1ec4d9e/main/cd526b0644e7ff4d794ea41cb36bc423/odmin.png",
                    "IS_COLLABER": false
                },
                {
                    "ID": "11",
                    "TYPE": "U",
                    "NAME": "Андрей Сергеев",
                    "PERSONAL_PHOTO": "231",
                    "PERSONAL_GENDER": "",
                    "IMAGE": "https://mysite.ru/b17053/resize_cache/231/c0120a8d7c10d63c83e32398d1ec4d9e/main/026bf59e161a0bd50f401d3796800651/66b.jpg",
                    "IS_COLLABER": false
                }
            ],
            "ATTACHMENTS": []
        },
        {
            "ID": "471",
            "TASK_ID": "8017",
            "PARENT_ID": "447",
            "CREATED_BY": "503",
            "TITLE": "Подготовить решение",
            "SORT_INDEX": "1",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": null,
            "TOGGLED_DATE": "",
            "MEMBERS": [],
            "ATTACHMENTS": []
        },
        {
            "ID": "491",
            "TASK_ID": "8017",
            "PARENT_ID": "431",
            "CREATED_BY": "503",
            "TITLE": "Подписать договор",
            "SORT_INDEX": "3",
            "IS_COMPLETE": "N",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": null,
            "TOGGLED_DATE": "",
            "MEMBERS": [],
            "ATTACHMENTS": []
        },
        {
            "ID": "433",
            "TASK_ID": "8017",
            "PARENT_ID": "431",
            "CREATED_BY": "503",
            "TITLE": "Найти все документы по клиенту",
            "SORT_INDEX": "0",
            "IS_COMPLETE": "Y",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": "503",
            "TOGGLED_DATE": "2025-11-10T15:02:30+03:00",
            "MEMBERS": [],
            "ATTACHMENTS": []
        },
        {
            "ID": "485",
            "TASK_ID": "8017",
            "PARENT_ID": "447",
            "CREATED_BY": "503",
            "TITLE": "Договориться о встрече Андрей Сергеев",
            "SORT_INDEX": "0",
            "IS_COMPLETE": "Y",
            "IS_IMPORTANT": "N",
            "TOGGLED_BY": "503",
            "TOGGLED_DATE": "2025-11-10T15:02:33+03:00",
            "MEMBERS": [
                {
                    "ID": "11",
                    "TYPE": "U",
                    "NAME": "Андрей Сергеев",
                    "PERSONAL_PHOTO": "231",
                    "PERSONAL_GENDER": "",
                    "IMAGE": "https://mysite.ru/b17053/resize_cache/231/c0120a8d7c10d63c83e32398d1ec4d9e/main/026bf59e161a0bd50f401d3796800651/66b.jpg",
                    "IS_COLLABER": false
                }
            ],
            "ATTACHMENTS": []
        }
    ],
    "time": {
        "start": 1762780903,
        "finish": 1762780903.978847,
        "duration": 0.9788470268249512,
        "processing": 0,
        "date_start": "2025-11-10T16:21:43+03:00",
        "date_finish": "2025-11-10T16:21:43+03:00",
        "operating_reset_at": 1762781503,
        "operating": 0.3446669578552246
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список объектов с [описанием полей пунктов чек-листа](#result-fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор пункта чек-листа ||
|| **TASK_ID**
[`string`](../../data-types.md) | Идентификатор задачи, к которой относится пункт ||
|| **PARENT_ID**
[`string`](../../data-types.md) | Идентификатор родительского пункта.

Значение `0` означает корневой пункт ||
|| **CREATED_BY**
[`string`](../../data-types.md) | Идентификатор автора пункта ||
|| **TITLE**
[`string`](../../data-types.md) | Текст пункта чек-листа.

Если `PARENT_ID = 0`, поле содержит название чек-листа ||
|| **SORT_INDEX**
[`string`](../../data-types.md) | Индекс сортировки.

Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`boolean`](../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен,
- `N` — не выполнен ||
|| **IS_IMPORTANT**
[`boolean`](../../data-types.md) | Отметка важности пункта. Возможные значения:
- `Y` — важный,
- `N` — обычный ||
|| **TOGGLED_BY**
[`string`](../../data-types.md) | Идентификатор пользователя, который последний раз сменил статус пункта.

Может быть `null`, если статус не меняли ||
|| **TOGGLED_DATE**
[`string`](../../data-types.md) | Дата и время изменения статуса пункта в формате `ISO 8601` ||
|| **MEMBERS**
[`array`](../../data-types.md) | Список объектов с [описанием участников](#members) ||
|| **ATTACHMENTS**
[`object`](../../data-types.md) | Объект с [описанием прикрепленных файлов](#attachments).

Ключ — идентификатор прикрепления файла `ATTACHMENT_ID` ||
|#

#### Объект members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор пользователя ||
|| **TYPE**
[`string`](../../data-types.md) | Роль пользователя в пункте чек-листа. Возможные значения:
- `A` — соисполнитель,
- `U` — наблюдатель ||
|| **NAME**
[`string`](../../data-types.md) | Имя пользователя ||
|| **PERSONAL_PHOTO**
[`string`](../../data-types.md) | Идентификатор файла с аватаром пользователя на Диске ||
|| **PERSONAL_GENDER**
[`string`](../../data-types.md) | Пол пользователя. Возможные значения:
- `M` — мужчина,
- `F` — женщина ||
|| **IMAGE**
[`string`](../../data-types.md) | Ссылка на аватар пользователя ||
|| **IS_COLLABER**
[`boolean`](../../data-types.md) | Признак, что пользователь является внешним участником ||
|#

#### Объект attachments {#attachments}

#|
|| **Название**
`тип` | **Описание** ||
|| **ATTACHMENT_ID**
[`integer`](../../data-types.md) | Идентификатор прикрепления ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`string`](../../data-types.md) | Размер файла в байтах ||
|| **FILE_ID**
[`string`](../../data-types.md) | Идентификатор файла на Диске ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **VIEW_URL**
[`string`](../../data-types.md) | Ссылка для просмотра файла в браузере ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#8; Action failed; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Action failed; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E | У пользователя нет доступа к задаче ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::getlist() expected to be of type \u0022integer\u0022, but given something else.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не передан обязательный параметр `TASKID` или указано значение неверного типа ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (arOrder) for method ctaskchecklistitem::getlist() must not contain key \u0022IS_COMPLETED\u0022.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Указано неверное поле в `ORDER` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
