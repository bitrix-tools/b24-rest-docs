# Получить список доступных полей спринта tasks.api.scrum.sprint.getFields

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

Метод `tasks.api.scrum.sprint.getFields` возвращает доступные поля спринта.

## Параметры

Без параметров.

## Примеры
{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'tasks.api.scrum.sprint.getFields',
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
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.getFields
    ```

- cUrl (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.getFields
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
    'tasks.api.scrum.sprint.getFields',
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
"result":
{
    "fields":
    {
     "groupId":
     {
        "type": "integer"
     },
     "name":
     {
        "type": "string"
     },
     "sort":
     {
        "type": "integer"
     },
     "createdBy":
     {
        "type": "integer"
     },
     "modifiedBy":
     {
        "type": "integer"
     },
     "dateStart":
     {
        "type": "string"
     },
     "dateEnd":
     {
        "type": "string"
     },
     "status":
     {
        "type": "string"
     }
    }
}
}
```

## Возвращаемые данные

#|
|| **Поле** `тип` | **Описание** ||
|| **groupId** `integer` | Идентификатор группы (скрама), к которой относится спринт ||
|| **name** `string` | Название спринта ||
|| **sort** `integer` | Сортировка ||
|| **createdBy** `integer` | Кем создан спринт ||
|| **modifiedBy** `integer` | Кем изменен спринт ||
|| **dateStart** `string` | Дата начала спринта ||
|| **dateEnd** `string` | Дата окончания спринта ||
|| **status** `string` | Статус спринта ||
|#

## Обработка ошибок

Метод не возвращает ошибок.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}