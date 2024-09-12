# Изменить стадию Канбана / Моего плана task.stages.update

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.stages.update` обновляет стадии Канбана / Моего плана. Принимает на вход `id` стадии и массив `fields`.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор стадии. ||
|| **fields^*^**
[`array`](../../data-types.md) | Массив для обновления, аналогичный массиву, используемому в [task.stages.add](./task-stages-add.md), за исключением поля `ENTITY_ID` — его менять нельзя. Выполняется проверка прав доступа аналогично `task.stages.add`. ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала. ||
|#

Метод также применяется для перемещения стадии с одной позиции на другую — для этого достаточно передать нужный `AFTER_ID`.

Возвращает `true` в случае успеха.

## Примеры

{% list tabs %}

- JS
    ```js
    const stageId = 5;
    const fields = {
        TITLE: "Новая стадия",
        SORT: 200,
        COLOR: "FF5733"
    };
    BX24.callMethod(
        'task.stages.update',
        {
            id: stageId,
            fields: fields
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "SORT": 200,
        "COLOR": "FF5733"
    }
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.update
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 5,
    "fields": {
        "TITLE": "Новая стадия",
        "SORT": 200,
        "COLOR": "FF5733"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.update
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $stageId = 5;
    $fields = [
        "TITLE" => "Новая стадия",
        "SORT" => 200,
        "COLOR" => "FF5733"
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.update',
        [
            'id' => $stageId,
            'fields' => $fields
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

HTTP-Статус: 200

```json
{
"result": true
}
```

## Обработка ошибок

HTTP-статус: **200**

```json
{
"error": "ACCESS_DENIED",
"error_description": "Вы не можете изменять стадии в этой группе"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Вы не можете изменять стадии в этой группе ||
|| `NOT_FOUND` | Стадия не найдена ||
|#
