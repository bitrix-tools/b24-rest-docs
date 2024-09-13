# Завершить активный спринт выбранного Скрама tasks.api.scrum.sprint.complete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.sprint.complete` завершает активный спринт выбранного Скрама.

При завершении спринта незавершенные задачи переносятся в бэклог.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор группы с активным спринтом. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    const groupId = 1;
    BX24.callMethod(
        'tasks.api.scrum.sprint.complete',
        {
            id: groupId
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
    "id": 1
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.complete
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 1
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.complete
    ```

- PHP

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.complete',
        [
            'id' => 1,
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
  "result":
  {
    "id": 1,
    "groupId": 143,
    "entityType": "sprint",
    "name": "Спринт 1",
    "goal": "Цель",
    "sort": 1,
    "createdBy": 1,
    "modifiedBy": 1,
    "dateStart": "2024-07-19T15:03:01+00:00",
    "dateEnd": "2024-08-02T15:03:01+00:00",
    "status": "completed"
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
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied | Нет доступа к скраму ||
|| `0` | Sprint not found | Не найден активный спринт в группе ||
|| `100` | Could not find value for parameter {id} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | Неверный тип параметра ||
|#
{% include [Сноска о примерах](../../../../_includes/examples.md) %}