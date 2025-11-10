# Добавить пункт чек-листа task.checklistitem.add

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.add` добавляет новый пункт чек-листа в задаче.

Проверить права на добавление пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями пункта чек-листа](#fields) ||
|#

### Параметр FIELDS {#fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
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

Система добавит участников пункта чек-листа в задачу в тех же ролях
 ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительского пункта. Используйте для вложенных чек-листов.

- Если передать `PARENT_ID` со значением `0`, система создаст в задаче новый чек-лист
- Если в задаче нет пункта чек-листа с указанным `PARENT_ID`, система создаст новый чек-лист
- Если не указать `PARENT_ID` в `FIELDS`, система добавит новый пункт в существующий верхний чек-лист. Если в задаче нет чек-листа, то создаст новый

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
    -d '{"TASKID":13,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":457,"SORT_INDEX":200,"IS_COMPLETE":"N","IS_IMPORTANT":"Y","MEMBERS":{"547":{"TYPE":"A"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.checklistitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":457,"SORT_INDEX":200,"IS_COMPLETE":"N","IS_IMPORTANT":"Y","MEMBERS":{"547":{"TYPE":"A"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.add
    ```

- JS


    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'task.checklistitem.add',
            {
                TASKID: 13,
                FIELDS: {
                    TITLE: 'Подготовить отчет',
                    PARENT_ID: 457,
                    SORT_INDEX: 200,
                    IS_COMPLETE: 'N',
                    IS_IMPORTANT: 'Y',
                    MEMBERS: {
                        547: {
                            TYPE: 'A'
                        }
                    }
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Created checklist item with ID:', result);
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
                'task.checklistitem.add',
                [
                    'TASKID' => 13,
                    'FIELDS' => [
                        'TITLE' => 'Подготовить отчет',
                        'PARENT_ID' => 457,
                        'SORT_INDEX' => 200,
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'Y',
                        'MEMBERS' => [
                            547 => [
                                'TYPE' => 'A'
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
        echo 'Error adding checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.add',
        {
            'TASKID': 13,
            'FIELDS': {
                'TITLE': 'Подготовить отчет',
                'PARENT_ID': 457,
                'SORT_INDEX': 200,
                'IS_COMPLETE': 'N',
                'IS_IMPORTANT': 'Y',
                'MEMBERS': {
                    547: {
                        'TYPE': 'A'
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
        'task.checklistitem.add',
        [
            'TASKID' => 13,
            'FIELDS' => [
                'TITLE' => 'Подготовить отчет',
                'PARENT_ID' => 457,
                'SORT_INDEX' => 200,
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'Y',
                'MEMBERS' => [
                    547 => [
                        'TYPE' => 'A'
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
    "result": 475,
    "time": {
        "start": 1762431907,
        "finish": 1762431908.259832,
        "duration": 1.2598319053649902,
        "processing": 0,
        "date_start": "2025-11-06T15:25:07+03:00",
        "date_finish": "2025-11-06T15:25:08+03:00",
        "operating_reset_at": 1762432508,
        "operating": 0.24803590774536133
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор нового пункта чек-листа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#8; Добавление элемента: действие недоступно; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Добавление элемента: действие недоступно; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E | Нет доступа к задаче или недостаточно прав, чтобы работать с чек-листами в задаче ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::add() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Не передан обязательный параметр `TASKID` или указан неверный тип значения для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (arFields) expected by method ctaskchecklistitem::add(), but not given.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не передан обязательный параметр `FIELDS` или передан пустой ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Не указано название элемента; 8\/TE\/ACTION_FAILED_TO_BE_PROCESSED\u003Cbr\u003E | Не передано обязательное поле `TITLE` в параметре `FIELDS` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
