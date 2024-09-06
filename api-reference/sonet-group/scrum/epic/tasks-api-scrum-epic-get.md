# Получить поля эпика по его идентификатору tasks.api.scrum.epic.get

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

Метод `tasks.api.scrum.epic.get` возвращает значения полей эпика по его идентификатору.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **epicId^*^**
[`integer`](../../../data-types.md) | Идентификатор эпика. ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    const epicId = 1;
    BX24.callMethod(
        'tasks.api.scrum.epic.get',
        {
            id: epicId,
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
    -d '{
    "fields": {
      "id": "1"
    },
    auth=YOUR_ACCESS_TOKEN
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.get
    ```

- cUrl (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
      "id": "1"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.get
    ```

- PHP

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.get',
    [
        'fields' => [
            'id' => 1,
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

HTTP-статус: **200**

```json
{
  "id": 1,
  "groupId": 143,
  "name": "эпик",
  "description": "",
  "createdBy": 1,
  "modifiedBy": 0,
  "color": "#69dafc",
  "files":
  {
    "ID": "136",
    "ENTITY_ID": "TASKS_SCRUM_EPIC",
    "FIELD_NAME": "UF_SCRUM_EPIC_FILES",
    "USER_TYPE_ID": "disk_file",
    "XML_ID": null,
    "SORT": "100",
    "MULTIPLE": "Y",
    "MANDATORY": "N",
    "SHOW_FILTER": "N",
    "SHOW_IN_LIST": "N",
    "EDIT_IN_LIST": "N",
    "IS_SEARCHABLE": "N",
    "SETTINGS":
    {
      "IBLOCK_ID": null,
      "SECTION_ID": null,
      "UF_TO_SAVE_ALLOW_EDIT": false
    },
    "USER_TYPE":
    {
      "USER_TYPE_ID": "disk_file",
      "CLASS_NAME": "Bitrix\\Disk\\Uf\\FileUserType",
      "DESCRIPTION": "Файл (Диск)",
      "BASE_TYPE": "int",
      "TAG": [
        "DISK FILE ID",
        "DOCUMENT ID"
      ]
    },
    "VALUE": [],
    "ENTITY_VALUE_ID": 1,
    "CUSTOM_DATA":
    {
      "PHOTO_TEMPLATE": ""
    },
    "EDIT_FORM_LABEL": "UF_SCRUM_EPIC_FILES",
    "TAG": "DOCUMENT ID"
  }
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
|| **files**
[`object`](../../../data-types.md) | Объект с данными обо всех файлах, прикрепленных к спринту ||

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
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#

{% include [Сноска о примерах](../../../../_includes/examples.md) %}