# Получить список спринтов tasks.api.scrum.sprint.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
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

Метод `tasks.api.scrum.sprint.list` возвращает список спринтов.

Метод аналогичен другим методам с фильтрацией по списку.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки результата. Объект вида `{'поле_сортировки': 'направление сортировки' [, ...]}`. Доступные поля описаны в таблице ниже.
Направление сортировки может принимать значения:
- `asc` - по возрастанию;
- `desc` - по убыванию. ||
  || **filter**
  [`object`](../../../data-types.md) | Объект вида `{'фильтруемое_поле': 'значение фильтра' [, ...]}`. Доступные поля описаны в таблице ниже. ||
  || **select**
  [`object`](../../../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля.
  Значение по умолчанию - пустой массив `array()` - означает, что будут возвращены все поля основной таблицы запроса. ||
  || **start**
  [`integer`](../../../data-types.md) | Номер страницы вывода. Работает для https запросов. ||
|#

## Доступные поля фильтра

#|
|| **Поле** | **Тип** | **Описание** ||
|| **ID** | `integer` | Идентификатор спринта ||
|| **GROUP_ID** | `integer` | Идентификатор Скрама ||
|| **ENTITY_TYPE** | `string` | Тип элемента ||
|| **NAME** | `string` | Имя ||
|| **SORT** | `integer` | Сортировка ||
|| **CREATED_BY** | `integer` | Кем создан ||
|| **MODIFIED_BY** | `integer` | Кем изменён ||
|| **DATE_START** | `string` | Дата запуска ||
|| **DATE_END** | `string` | Дата окончания ||
|| **STATUS** | `string` | Статус ||
|| **INFO** | `object` | Информация ||
|#

## Примеры
{% list tabs %}

- JS
    ```js
    const groupId = 1;
    BX24.callMethod(
        'tasks.api.scrum.sprint.list',
        {
            filter: {
                GROUP_ID: groupId,
                '>=DATE_END': new Date()
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
    -d '{
    "filter": {
        "GROUP_ID": 1,
        ">=DATE_END": "2024-07-19T15:03:01+00:00"
    },
    "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.sprint.list
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "filter": {
        "GROUP_ID": 1,
        ">=DATE_END": "2024-07-19T15:03:01+00:00"
    }
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.sprint.list
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.sprint.list',
        [
            'filter' => [
                'GROUP_ID' => 1,
                '>=DATE_END' => '2024-07-19T15:03:01+00:00'
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

HTTP-статус: **200**

```json
[
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
      },
      {
            "id": 3,
            "groupId": 1,
            "entityType": "sprint",
            "name": "Sprint 1",
            "goal": "",
            "sort": 1,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateStart": "2021-11-21T22:00:00+00:00",
            "dateEnd": "2021-11-28T22:00:00+00:00",
            "status": "planned"
      }
]
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
  "error_description": "Could not load list"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Could not load list| Не найдено ни одного спринта с указанными фильтрами ||
|#