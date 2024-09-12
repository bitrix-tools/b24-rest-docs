# Добавить спринт в Скрам tasks.api.scrum.sprint.add

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

Метод `tasks.api.scrum.sprint.add` добавляет спринт в Скрам.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **fields^*^**
[`object`](../../../data-types.md) | Объект с данными спринта. ||
|#

### Параметр fields

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **groupId^*^** `integer` | Идентификатор группы (скрама), к которой относится спринт. Можно получить, вызвав метод [tasks.api.scrum.sprint.get](./tasks-api-scrum-sprint-get.md) для уже существующего спринта||
|| **name^*^** `string` | Название спринта ||
|| **sort** `integer` | Сортировка ||
|| **dateStart** `string` | Дата начала спринта. Доступные форматы: 'ISO 8601', timestamp ||
|| **dateEnd** `string` | Дата окончания спринта. Доступные форматы: 'ISO 8601', timestamp ||
|| **status** `string` | Статус спринта. Доступные значения: 'active', 'planned', 'completed'||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS
    ```js
    const groupId = 1;
    const name = 'Sprint 1';
    const createdBy = 1;
    const sort = 1;
    const status = 'planned';
    const dateStart = '2021-11-22T00:00:00+02:00';
    const dateEnd = '2021-11-29T00:00:00+02:00';
    BX24.callMethod(
        'tasks.api.scrum.sprint.add',
        {
            fields: {
                name: name,
                groupId: groupId,
                createdBy: createdBy,
                sort: sort,
                status: status,
                dateStart: dateStart,
                dateEnd: dateEnd,
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
        "name": "Sprint 1",
        "groupId": 1,
        "createdBy": 1,
        "sort": 1,
        "status": "planned",
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.add
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "name": "Sprint 1",
        "groupId": 1,
        "createdBy": 1,
        "sort": 1,
        "status": "planned",
        "dateStart": "2021-11-22T00:00:00+02:00",
        "dateEnd": "2021-11-29T00:00:00+02:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.add
    ```

- PHP

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $groupId = 1;
    $name = 'Sprint 1';
    $createdBy = 1;
    $sort = 1;
    $status = 'planned';
    $dateStart = '2021-11-22T00:00:00+02:00';
    $dateEnd = '2021-11-29T00:00:00+02:00';

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.add',
        [
            'fields' => [
                'name' => $name,
                'groupId' => $groupId,
                'createdBy' => $createdBy,
                'sort' => $sort,
                'status' => $status,
                'dateStart' => $dateStart,
                'dateEnd' => $dateEnd
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
"result":
{
    "id": 1,
    "groupId": 1,
    "entityType": "sprint",
    "name": "Sprint 1",
    "goal": "",
    "sort": 1,
    "createdBy": 1,
    "modifiedBy": 1,
    "dateStart": "2021-11-22T00:00:00+02:00",
    "dateEnd": "2021-11-29T00:00:00+02:00",
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
"error_description": "Sprint not created"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied | Нет доступа к скраму ||
|| `0` | Sprint not created | Не удалось создать спринт ||
|| `0` | Incorrect dateStart format | Неверный формат времени начала спринта ||
|| `0` | Incorrect dateEnd format | Неверный формат времени окончания спринта ||
|| `0` | createdBy user not found | Пользователь в поле "создатель" не найден ||
|| `0` | modifiedBy user not found | Пользователь в поле "последний изменивший" не найден ||
|| `100` | Could not find value for parameter {fields} | Неверно указано имя параметра или не задан параметр ||
|| `100` | Invalid value {stringValue} to match with parameter {fields}. Should be value of type array. | Неверный тип параметра ||
|#

{% include [Сноска о примерах](../../../../_includes/examples.md) %}