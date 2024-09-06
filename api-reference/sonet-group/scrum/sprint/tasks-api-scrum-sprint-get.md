# Получить поля спринта по его идентификатору tasks.api.scrum.sprint.get

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
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.sprint.get` возвращает значения полей спринта по его идентификатору.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **sprintId^*^**
[`integer`](../../../data-types.md) | Идентификатор спринта. Можно получить при помощи метода [tasks.api.scrum.sprint.list](./tasks-api-scrum-sprint-list.md). ||
|#

## Примеры
{% list tabs %}

- JS
    ```js
    const sprintId = 2;
    BX24.callMethod(
        'tasks.api.scrum.sprint.get',
        {
            id: sprintId,
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
    "id": 2,
    "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.get
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 2
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.get
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $sprintId = 2;

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.get',
        [
            'id' => $sprintId
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
  "result":
  {
    "id": 2,
    "groupId": 143,
    "entityType": "sprint",
    "name": "Спринт 1",
    "goal": "",
    "sort": 1,
    "createdBy": 1,
    "modifiedBy": 1,
    "dateStart": "2024-07-19T15:03:01+00:00",
    "dateEnd": "2024-08-02T15:03:01+00:00",
    "status": "planned"
  }
}
```

## Возвращаемые данные

#|
|| **Поле** `тип` | **Описание** ||
|| **result** `object` | Объект, содержащий данные о спринте ||
|| **id** `integer` | Идентификатор спринта ||
|| **groupId** `integer` | Идентификатор группы (скрама), к которой относится спринт ||
|| **entityType** `string` | Тип сущности (в данном случае, "sprint") ||
|| **name** `string` | Название спринта ||
|| **goal** `string` | Цель спринта (устанавливается только в интерфейсе при запуске спринта) ||
|| **sort** `integer` | Сортировка ||
|| **createdBy** `integer` | Идентификатор пользователя, создавшего спринт ||
|| **modifiedBy** `integer` | Идентификатор пользователя, изменившего спринт ||
|| **dateStart** `string` | Дата начала спринта в формате ISO 8601 ||
|| **dateEnd** `string` | Дата окончания спринта в формате ISO 8601 ||
|| **status** `string` | Статус спринта ||
|#


## Обработка ошибок

HTTP-статус: **200**

```json
{
  "error": 0,
  "error_description": "Sprint not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Access denied | Нет доступа для просмотра данных спринта ||
|| `0` | Sprint not found | Такого спринта не существует ||
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#


{% include [Сноска о примерах](../../../../_includes/examples.md) %}