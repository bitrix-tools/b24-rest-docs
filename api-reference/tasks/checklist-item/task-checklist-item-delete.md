# Удалить пункт чек-листа task.checklistitem.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.delete` удаляет пункт чек-листа в задаче.

Проверить права на удаление пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% include [Обязательные параметры](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md)  ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта можно получить при [добавлении нового пункта](./task-checklist-item-add.md) или методом [получения списка пунктов чек-листа](./task-checklist-item-get-list.md) ||
|#

## Примеры кода

{% include [Обязательные параметры в примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.checklistitem.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.delete
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'task.checklistitem.delete',
            {
                TASKID: 13,
                ITEMID: 475
            }
        );
        
        const result = response.getData().result;
        console.log('Deleted checklist item:', result);
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
                'task.checklistitem.delete',
                [
                    'TASKID' => 13,
                    'ITEMID' => 475
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.delete',
        {
            TASKID: 13,
            ITEMID: 475
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
        'task.checklistitem.delete',
        [
            'TASKID' => 13,
            'ITEMID' => 475
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
    "result": true,
    "time": {
        "start": 1764594534,
        "finish": 1764594535.201817,
        "duration": 1.2018170356750488,
        "processing": 0,
        "date_start": "2025-12-01T16:08:54+03:00",
        "date_finish": "2025-12-01T16:08:55+03:00",
        "operating_reset_at": 1764595135,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если пункт чек-листа успешно удален ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "TASKS_ERROR_EXCEPTION_#8; Удаление элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br>"
}
```

{% include notitle [Ответ с ошибкой](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Значение** | **Как решить**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::delete(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не указан обязательный параметр `TASKID` или `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::delete() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения для `TASKID` или `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Удаление элемента: действие недоступно; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | У пользователя нет прав доступа к задаче или не хватает прав на выполнение действия ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
