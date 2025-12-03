# Изменить пункт чек-листа task.checklistitem.update

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.update` изменяет существующий пункт чек-листа.

Проверить права на изменение пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку.

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта можно получить при [добавлении нового пункта](./task-checklist-item-add.md) или методом [получения списка пунктов чек-листа](./task-checklist-item-get-list.md) ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями пункта чек-листа](#fields) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Текст пункта чек-листа.

Если передать `PARENT_ID` со значением `0`, то `TITLE` — название чек-листа ||
|| **SORT_INDEX**
[`integer`](../../data-types.md) | Индекс сортировки. Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`boolean`](../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен
- `N` — не выполнен

По умолчанию — `N` ||
|| **IS_IMPORTANT**
[`boolean`](../../data-types.md) | Отметка, что пункт важный. Возможные значения:
- `Y` — важный
- `N` — обычный ||
|| **MEMBERS**
[`object`](../../data-types.md) | Объект с описанием участников пункта чек-листа. Ключ — идентификатор пользователя, значение — объект с параметром типа участника `TYPE`. Возможные значения типа участника:
- `'TYPE': 'A'` — соисполнитель
- `'TYPE': 'U'` — наблюдатель

Поле `MEMBERS` заменяется полностью. Чтобы сохранить текущих участников, передайте их вместе с новыми значениями.

Система добавит участников пункта чек-листа в задачу в тех же ролях ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительского пункта. Используйте для вложенных чек-листов.

- Если передать `PARENT_ID` со значением `0`, система создаст в задаче новый чек-лист
- Если в задаче нет пункта чек-листа с указанным `PARENT_ID`, система создаст новый чек-лист
- Если переместить главный пункт чек-листа под пункт другого чек-листа, то он переместится вместе со своими подпунктами с сохранением иерархии. Чек-листы объединятся в один
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":447,"SORT_INDEX":100,"IS_COMPLETE":"N","IS_IMPORTANT":"N","MEMBERS":{"547":{"TYPE":"A"},"125":{"TYPE":"U"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.checklistitem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":447,"SORT_INDEX":100,"IS_COMPLETE":"N","IS_IMPORTANT":"N","MEMBERS":{"547":{"TYPE":"A"},"125":{"TYPE":"U"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.update
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'task.checklistitem.update',
            {
                TASKID: 13,
                ITEMID: 475,
                FIELDS: {
                    TITLE: 'Подготовить отчет',
                    PARENT_ID: 447,
                    SORT_INDEX: 100,
                    IS_COMPLETE: 'N',
                    IS_IMPORTANT: 'N',
                    MEMBERS: {
                        547: {
                            TYPE: 'A'
                        },
                        125: {
                            TYPE: 'U'
                        }
                    }
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Updated checklist item with ID:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.checklistitem.update',
                [
                    'TASKID' => 13,
                    'ITEMID' => 475,
                    'FIELDS' => [
                        'TITLE' => 'Подготовить отчет',
                        'PARENT_ID' => 447,
                        'SORT_INDEX' => 100,
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'N',
                        'MEMBERS' => [
                            547 => [
                                'TYPE' => 'A'
                            ],
                            125 => [
                                'TYPE' => 'U'
                            ]
                        ]
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
        echo 'Error updating checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.update',
        {
            'TASKID': 13,
            'ITEMID': 475,
            'FIELDS': {
                'TITLE': 'Подготовить отчет',
                'PARENT_ID': 447,
                'SORT_INDEX': 100,
                'IS_COMPLETE': 'N',
                'IS_IMPORTANT': 'N',
                'MEMBERS': {
                    547: {
                        'TYPE': 'A'
                    },
                    125: {
                        'TYPE': 'U'
                    }
                }
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
        'task.checklistitem.update',
        [
            'TASKID' => 13,
            'ITEMID' => 475,
            'FIELDS' => [
                'TITLE' => 'Подготовить отчет',
                'PARENT_ID' => 447,
                'SORT_INDEX' => 100,
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'N',
                'MEMBERS' => [
                    547 => [
                        'TYPE' => 'A'
                    ],
                    125 => [
                        'TYPE' => 'U'
                    ]
                ]
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
    "result": null,
    "time": {
        "start": 1762432505,
        "finish": 1762432505.206889,
        "duration": 0.20688891410827637,
        "processing": 0,
        "date_start": "2025-11-06T15:35:05+03:00",
        "date_finish": "2025-11-06T15:35:05+03:00",
        "operating_reset_at": 1762433105,
        "operating": 0.13953208923339844
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null`, если пункт чек-листа успешно обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#4; Нет доступа к редактированию задачи; 4\/TE\/ACTION_NOT_ALLOWED\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#4; Нет доступа к редактированию задачи; 4\/TE\/ACTION_NOT_ALLOWED\u003Cbr\u003E | Нет прав доступа к редактированию задачи, чтобы изменять пункт чек-листа ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Указано некорректное значение [] для поля [ENTITY_ID] в элементе [, Подготовить отчет]; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E | Нарушен порядок передачи параметров ||
|| `ERROR_CORE` | "TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) for method ctaskchecklistitem::update() expected to be of type \u0022integer\u0022, but given something else.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не передан обязательный параметр `TASKID` или указан неверный тип значения для `TASKID` ||
|| `ERROR_CORE` | "TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::update(), but not given.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не передан обязательный параметр `ITEMID` или указан неверный тип значения для `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (arFields) expected by method ctaskchecklistitem::update(), but not given.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не передан обязательный параметр `FIELDS` или передан пустой ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
