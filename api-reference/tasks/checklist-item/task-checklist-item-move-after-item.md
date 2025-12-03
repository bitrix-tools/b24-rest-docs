# Перенести пункт чек-листа task.checklistitem.moveafteritem

> Scope: [`task`](../../scopes/permissions.md)
>
> Права на выполнение метода:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.moveafteritem` перемещает пункт чек-листа `itemId` в позицию после элемента `afterItemId`.

Оба элемента должны быть в одной задаче `taskId`. Элементы могут быть в разных подсписках, но после перемещения `itemId` получит тот же `PARENT_ID`, что и `afterItemId`.

Проверить права на изменение пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% include [Обязательные параметры](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получить список задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор перемещаемого пункта чек-листа.

Идентификатор пункта чек-листа можно получить при [создании пункта](./task-checklist-item-add.md) или методом [получить список пунктов чек-листа](./task-checklist-item-get-list.md) ||
|| **AFTERITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа, после которого нужно расположить перемещаемый элемент.

Элемент должен относиться к той же задаче, что и `ITEMID`.

Идентификатор пункта чек-листа можно получить при [создании пункта](./task-checklist-item-add.md) или методом [получить список пунктов чек-листа](./task-checklist-item-get-list.md) ||
|#

## Примеры кода

{% include [Обязательные параметры в примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"AFTERITEMID":447}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.checklistitem.moveafteritem
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"AFTERITEMID":447,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.moveafteritem
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'task.checklistitem.moveafteritem',
            {
                TASKID: 13,
                ITEMID: 475,
                AFTERITEMID: 447
            }
        );
        
        const result = response.getData().result;
        console.log('Moved checklist item:', result);
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
                'task.checklistitem.moveafteritem',
                [
                    'TASKID' => 13,
                    'ITEMID' => 475,
                    'AFTERITEMID' => 447
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.moveafteritem',
        {
            TASKID: 13,
            ITEMID: 475,
            AFTERITEMID: 447
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
        'task.checklistitem.moveafteritem',
        [
            'TASKID' => 13,
            'ITEMID' => 475,
            'AFTERITEMID' => 447
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
        "start": 1764597401,
        "finish": 1764597401.936492,
        "duration": 0.9364919662475586,
        "processing": 0,
        "date_start": "2025-12-01T16:56:41+03:00",
        "date_finish": "2025-12-01T16:56:41+03:00",
        "operating_reset_at": 1764598001,
        "operating": 0.29050707817077637
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null`, если пункт успешно перемещен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "TASKS_ERROR_EXCEPTION_#8; Перемещение элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br>"
}
```

{% include notitle [Ответ с ошибкой](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Значение** | **Как решить**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::moveafteritem(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не указан обязательный параметр `TASKID`, `ITEMID` или `AFTERITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::moveafteritem() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения для `TASKID`, `ITEMID` или `AFTERITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Перемещение элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | У пользователя нет прав доступа к задаче или не хватает прав на выполнение действия ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Смотрите также

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
