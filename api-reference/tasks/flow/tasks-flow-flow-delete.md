# Удалить поток tasks.flow.flow.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: создатель или администратор потока

Метод `tasks.flow.flow.delete` удаляет поток по его идентификатору.

## Параметры метода

#|
|| **Название** `тип` | **Описание** ||
|| **flowData^*^** [`object`](../../data-types.md) | Объект с данными для удаления потока ||
|| **flowData.id^*^** [`integer`](../../data-types.md) | Идентификатор потока, который нужно удалить. Получить id можно при помощи метода [tasks.task.get](../tasks-task-get.md) для задачи, уже добавленной в поток, либо создать новый поток при помощи метода [tasks.flow.flow.create](./tasks-flow-flow-create.md) ||
|#

## Примеры кода

{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.flow.flow.delete',
        {
            flowData: {
                id: 517
            }
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
        "flowData": {
            "id": 517
        }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.flow.flow.delete
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "flowData": {
            "id": 517
        }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.flow.flow.delete
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $flowData = [
        "id" => 517
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.flow.delete',
        [
            'flowData' => $flowData
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
"result": {
    "deleted": true
  }
}
```

### Возвращаемые данные

#|
|| **Название** `тип` | **Описание** ||
|| **result** [`object`](../../data-types.md) | Объект с результатом операции ||
|| **deleted** [`boolean`](../../data-types.md) | Успешность удаления потока ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "0",
    "error_description": "Flow not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Дополнительная информация** ||
|| `0` | Доступ запрещён или поток не найден | Возможно, тариф портала не позволяет работать с потоками, или у пользователя нет прав на удаление потока ||
|| `0` | Flow not found | Поток с указанным идентификатором не найден ||
|| `0` | Unknown error | Неизвестная ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}