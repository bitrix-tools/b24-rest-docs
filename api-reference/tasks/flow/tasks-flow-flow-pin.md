# Активация/деактивация закрепления потока tasks.flow.flow.pin

> Scope: [`task`](../../scopes/permissions.md) | 
>
>Кто может выполнять метод: пользователь, который может видеть поток в списке потоков

Метод `tasks.flow.flow.pin` закрепляет или открепляет поток в списке потоков по его идентификатору. Если поток не закреплен, он его закрепляет. Если закреплен, то открепляет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название** `тип` | **Описание** ||
|| **flowId*** 
[`integer`](../../data-types.md) | Идентификатор потока, который нужно закрепить или открепить. Получить flowId можно при помощи метода [tasks.task.get](../tasks-task-get.md) для задачи, уже добавленной в поток, либо создать новый поток при помощи метода [tasks.flow.flow.create](./tasks-flow-flow-create.md) ||
|#

## Примеры кода

{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.flow.flow.pin',
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

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.flow.pin
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowId": 517
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.flow.pin
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK
    
    $flowId = 517;
    
    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.flow.pin',
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
|| **Название** `тип` | **Описание** ||
|| **result** [`boolean`](../. ./. ./data-types.md) | `true`, если поток закреплен, `false`, если поток откреплен ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "0",
    "error_description": "Unknown error"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещён или поток не найден | Возможно, тариф портала не позволяет работать с потоками, или у пользователя нет прав на выполнение операции ||
|| `0` | Unknown error | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-update.md)
- [{#T}](./tasks-flow-flow-delete.md)
- [{#T}](./tasks-flow-flow-is-exists.md)
- [{#T}](./tasks-flow-flow-activate.md)
