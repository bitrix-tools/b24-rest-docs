# Активировать/деактивировать поток tasks.flow.Flow.activate

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: создатель или администратор потока

Метод `tasks.flow.Flow.activate` включает или выключает поток по его идентификатору. Если поток выключен, он его включает. Если включен, то выключает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowId*** 
[`integer`](../../data-types.md) | Идентификатор потока, который нужно включить или выключить. 

Получить идентификатор можно методом создания нового потока [tasks.flow.Flow.create](./tasks-flow-flow-create.md) или методом получения задачи [tasks.task.get](../tasks-task-get.md) для задачи из потока ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)
  
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.Flow.activate
    ```

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.Flow.activate
    ```

- JS

    ```js
    BX24.callMethod(
        'tasks.flow.Flow.activate',
        {
            flowId: 517
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowId = 517;

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Flow.activate',
        [
            'flowId' => $flowId
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`boolean`](../../data-types.md) | Успешность операции ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Flow not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещен или поток не найден | Тариф портала не позволяет работать с потоками или у пользователя нет прав на выполнение операции ||
|| `0` | `Flow not found` | Поток с указанным идентификатором не найден ||
|| `0` | `Unknown error` | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-pin.md)
