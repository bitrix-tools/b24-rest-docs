# Переместить задачу из одной стадии в другую task.stages.movetask

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

Метод `task.stages.movetask` перемещает задачу из одной стадии в другую и позволяет изменить положение задачи в рамках Канбана группы или Моего плана.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор задачи. ||
|| **stageId^*^**
[`integer`](../../data-types.md) | ID стадии, в которую надо переместить задачу. ||
|| **before**
[`integer`](../../data-types.md) | ID задачи, перед которой надо поставить задачу в стадии. ||
|| **after**
[`integer`](../../data-types.md) | ID задачи, после которой надо поставить задачу в стадии. ||
|#

{% note info %}

Если параметры `before` и `after` не переданы одновременно, то задача добавляется в колонке согласно настройкам проекта/моего плана. В ином случае `before` и `after` взаимоисключающие. Указывается по необходимости или тот или другой параметр.

{% endnote %}

Метод работает следующим образом. Если передана стадия группы, перемещение происходит в рамках Канбана группы. Если передана стадия Моего плана, перемещение происходит в нем. Перед перемещением происходит проверка прав.

## Примеры

{% list tabs %}

- JS
    ```js
    const taskId = 1;
    const stageId = 2;
    BX24.callMethod(
        'task.stages.movetask',
        {
            id: taskId,
            stageId: stageId,
            before: 3,
            after: 4
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
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.movetask
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1,
    "stageId": 2,
    "before": 3,
    "after": 4
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.movetask
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $taskId = 1;
    $stageId = 2;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.movetask',
        [
            'id' => $taskId,
            'stageId' => $stageId,
            'before' => 3,
            'after' => 4
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

HTTP-Статус: **200**

```json
{
"result": true
}
```

## Обработка ошибок

HTTP-статус: **200**

```json
{
"error": "ACCESS_DENIED_MOVE",
"error_description": "Вы не можете перемещать эту задачу"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED_MOVE` | Вы не можете перемещать эту задачу ||
|| `TASK_NOT_FOUND` | Задача не найдена или доступ к ней запрещен ||
|| `NOT_FOUND` | Стадия не найдена ||
|#