# Изменить эпик в Скраме tasks.api.scrum.epic.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод `tasks.api.scrum.epic.update` изменяет эпик в Скраме.

Все поля эпика доступны для обновления. Необновляемые поля можно не передавать.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор эпика. ||
|| **fields^*^**
[`array`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md), кроме createdBy и modifiedBy.

В поле `files` можно передать массив значений с идентификаторами файлов, указав префикс `n` для каждого идентификатора.

Если в `files` передать пустой массив, файлы удалятся. ||
|#

## Пример

- JS
    ```js
    const epicId = 1;
    const name = 'Updated epic name';
    const description = 'Updated description text';
    const color = '#bbecf1';
    const files = ['n429', 'n243'];
    BX24.callMethod(
        'tasks.api.scrum.epic.update',
        {
            id: epicId,
            fields:{
                name: name,
                description: description,
                color: color,
                files: files
            }
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- cUrl (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "id": 1,
        "fields": {
            "name": "Updated epic name",
            "description": "Updated description text",
            "color": "#bbecf1",
            "files": ["n429", "n243"]
        }
    },
    auth=YOUR_ACCESS_TOKEN
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.update
    ```

- cUrl (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "id": 1,
        "fields": {
            "name": "Updated epic name",
            "description": "Updated description text",
            "color": "#bbecf1",
            "files": ["n429", "n243"]
        }
    },
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.update
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK
    $epicId = 1;
    $name = 'Updated epic name';
    $description = 'Updated description text';
    $color = '#bbecf1';
    $files = ['n429', 'n243'];

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.update',
    [
        'id' => $epicId,
        'fields' => [
            'name' => $name,
            'description' => $description,
            'color' => $color,
            'files' => $files
        ]
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
    "id": 1,
    "groupId": 143,
    "name": "Updated epic name",
    "description": "Updated description text",
    "createdBy": 1,
    "modifiedBy": 1,
    "color": "#bbecf1"
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы (скрама), к которой привязан эпик ||
|| **name**
[`string`](../../../data-types.md) | Название эпика ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего эпик ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменял эпик ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика ||

|#
{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Обработка ошибок

HTTP-статус: **200**

```json
{
  "error": 0,
  "error_description": "Epic not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Access denied | Нет доступа для просмотра данных эпика ||
|| `0` | Epic not found | Такого эпика не существует ||
|| `0` | Epic not updated | Не удалось обновить эпик ||
|| `0` | createdBy user not found | Пользователь в поле "создатель" не найден ||
|| `0` | modifiedBy user not found | Пользователь в поле "последний изменивший" не найден ||
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#

{% include [Сноска о примерах](../../../../_includes/examples.md) %}