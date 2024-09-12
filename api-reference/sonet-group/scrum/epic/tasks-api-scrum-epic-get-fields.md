# Получить список доступных полей эпика tasks.api.scrum.epic.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.epic.getFields` возвращает доступные поля эпика.

## Параметры

Без параметров.

## Примеры
{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.api.scrum.epic.getFields',
        {},
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
    auth=YOUR_ACCESS_TOKEN
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.getFields
    ```

- cUrl (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.getFields
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.epic.getFields',
    []
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
  "fields":
  {
    "name":
    {
      "type": "string"
    },
    "description":
    {
      "type": "string"
    },
    "groupId":
    {
      "type": "integer"
    },
    "color":
    {
      "type": "string"
    },
    "files":
    {
      "type": "array"
    },
    "createdBy":
    {
      "type": "integer"
    },
    "modifiedBy":
    {
      "type": "integer"
    }
  }
}
```

## Возвращаемые данные

#|
|| **Поле** `тип` | **Описание** ||
|| **name** `string` | Название эпика ||
|| **description** `string` | Описание эпика ||
|| **groupId** `integer` | Идентификатор группы (скрама), к которой относится эпик ||
|| **color** `string` | Цвет эпика ||
|| **files** `array` | Массив файлов, привязанных к эпику ||
|| **createdBy** `integer` | Кем создана ||
|| **modifiedBy** `integer` | Кем изменена ||
|#

## Обработка ошибок

Метод не возвращает ошибок.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}