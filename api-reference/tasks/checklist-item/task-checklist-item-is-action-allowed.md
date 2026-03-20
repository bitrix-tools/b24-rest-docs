# Проверить разрешение действия task.checklistitem.isactionallowed

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.checklistitem.isactionallowed` проверяет, разрешено ли действие с пунктом чек-листа в задаче.

## Параметры метода

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
|| **ACTIONID***
[`integer`](../../data-types.md) | Идентификатор проверяемого действия:
- `1` — добавить пункт `ACTION_ADD`
- `2` — изменить пункт `ACTION_MODIFY`
- `3` — удалить пункт `ACTION_REMOVE`
- `4` — отметить выполнение `ACTION_TOGGLE`
- `5` — переместить пункт `ACTION_REORDER` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":475,"ACTIONID":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.isactionallowed
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":475,"ACTIONID":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.isactionallowed
    ```

- JS

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'task.checklistitem.isactionallowed',
            {
                TASKID: 8017,
                ITEMID: 475,
                ACTIONID: 2
            }
        );
        
        const result = response.getData().result;
        console.log('Action allowed:', result);
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
                'task.checklistitem.isactionallowed',
                [
                    'TASKID' => 8017,
                    'ITEMID' => 475,
                    'ACTIONID' => 2
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking action: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.isactionallowed',
        {
            'TASKID': 8017,
            'ITEMID': 475,
            'ACTIONID': 2
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
        'task.checklistitem.isactionallowed',
        [
            'TASKID' => 8017,
            'ITEMID' => 475,
            'ACTIONID' => 2
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
        "start": 1769070724,
        "finish": 1769070724.446313,
        "duration": 0.44631290435791016,
        "processing": 0,
        "date_start": "2026-01-22T11:32:04+03:00",
        "date_finish": "2026-01-22T11:32:04+03:00",
        "operating_reset_at": 1769071324,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат проверки:
- `true` — действие разрешено
- `false` — действие не разрешено или переданы несуществующие идентификаторы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#256; Param #2 (actionId) expected by method ctaskchecklistitem::isactionallowed(), but not given.; 256/TE/WRONG_ARGUMENTS"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (actionId) expected by method ctaskchecklistitem::isactionallowed(), but not given.; 256/TE/WRONG_ARGUMENTS | Не указан обязательный параметр: `TASKID`, `ITEMID` или `ACTIONID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::isactionallowed() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметров `TASKID`, `ITEMID` или `ACTIONID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
