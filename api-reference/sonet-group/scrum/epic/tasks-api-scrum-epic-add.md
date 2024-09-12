# Добавить эпик в Скрам tasks.api.scrum.epic.add

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

Метод `tasks.api.scrum.epic.add` добавляет эпик в Скрам.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields^*^**
[`array`](../../../data-types.md) | Поля, соответствующие доступному списку полей [tasks.api.scrum.epic.getFields](./tasks-api-scrum-epic-get-fields.md).

Поля `name` и `groupId` обязательные. 

В поле `files` можно передать массив значений с идентификаторами файлов, указав префикс `n` для каждого идентификатора. ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    const groupId = 1;
    const name = 'Epic 1';
    const description = 'Description text';
    const color = '#69dafc';
    const files = ['n428', 'n345'];

    BX24.callMethod(
        'tasks.api.scrum.epic.add',
        {
            fields: {
                name: name,
                groupId: groupId,
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

- cURL (oAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "fields": {
        "name": "Epic 1",
        "groupId": 1,
        "description": "Description text",
        "color": "#69dafc",
        "files": ["n428", "n345"]
    }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.add
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "name": "Epic 1",
        "groupId": 1,
        "description": "Description text",
        "color": "#69dafc",
        "files": ["n428", "n345"]
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.add
    ```

- PHP

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $groupId = 1;
    $name = 'Epic 1';
    $description = 'Description text';
    $color = '#69dafc';
    $files = ['n428', 'n345'];

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.epic.add',
        [
            'fields' => [
                'name' => $name,
                'groupId' => $groupId,
                'description' => $description,
                'color' => $color,
                'files' => $files
            ]
        ]
    );

    // Обработка ответа от Битрикс24
    if (isset($result['error'])) {
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
    "id": 4,
    "groupId": 1,
    "name": "Epic 1",
    "description": "Description text",
    "createdBy": 1,
    "modifiedBy": 1,
    "color": "#69dafc"
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
[`string`](../../../data-types.md) | Цвет эпика в формате HEX ||

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
|| `0` | Access denied | Нет доступа к скраму ||
|| `0` | Epic not created | Не удалось создать эпик ||
|| `0` | createdBy user not found | Пользователь в поле "создатель" не найден ||
|| `0` | modifiedBy user not found | Пользователь в поле "последний изменивший" не найден ||
|| `0` | Group is not found | Не указан параметр GROUP_ID или группы с таким ID не существует ||
|| `0` | Name is not found | Не указан параметр NAME ||
|#

{% include [Сноска о примерах](../../../../_includes/examples.md) %}