# Создать или обновить задачу Скрама

> Название метода: **tasks.api.scrum.task.update**
>
> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к скраму

Метод создает или изменяет задачу Скрама. Вы сможете создать задачу в Скраме, перенести задачу из другого проекта, перенести её между бэклогом и спринтами, изменить стори поинты и привязать эпик.

Задачу нужно предварительно создать методом [tasks.task.add](../../../tasks/tasks-task-add.md), либо получить уже существующую задачу методом [tasks.task.update](../../../tasks/tasks-task-update.md). Привязка к скраму указывается в параметре `GROUP_ID`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор задачи ||
|| **fields***
[`object`](../../../data-types.md) | Объект содержащий записи о задаче скрама (подробное описание приведено [ниже](#parametr-fields)) в виде структуры:

```js
fields: 
    {
        entityId: 'значение'
        storyPoints: 'значение',
        epicId: 'значение',
        sort: 'значение'
    }
```

||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId**
`integer` | Идентификатор бэклога или спринта.

Если значение не указано, *Битрикс24* автоматически добавит задачу в бэклог Скрама, если он существует ||
|| **storyPoints**
`string` | Стори Поинты (относительная оценка сложности задачи).

Может иметь строковое значение ||
|| **epicId**
`integer` | Идентификатор эпика ||
|| **sort**
`integer` | Сортировка ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"epicId":1,"storyPoints":"8","entityId":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"epicId":1,"storyPoints":"8","entityId":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.task.update
    ```

- JS

    ```js
    BX24.callMethod(
        'tasks.api.scrum.task.update',
        {
            id: 1,
            fields: 
            {
                epicId: 1,
                storyPoints: '8',
                entityId: 2
            }
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.task.update',
        [
            'id' => 1,
            'fields' => [
                'epicId' => 1,
                'storyPoints' => '8',
                'entityId' => 2
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
    "status" : "success",
    "data" : true,
    "errors" : []
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **status**
`string` | Статус ответа. Возможные значения:
- `success` 
- `error` 
||
|| **data**
`boolean`\|`null` | Возвращает:
- `true` — в случае успеха
- `null` — в случае ошибки 
||
|| **errors**
`array` | Массив ошибок ||
|#  

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Task not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Epic not found | Эпик не найден ||
|| `0` | Task not found | Задача не найдена ||
|| `0` | Access denied | Доступ запрещен ||
|| `0` | Item not created | Задача не добавлена в скрам ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-task-get.md)
- [{#T}](./tasks-api-scrum-task-get-fields.md)
