# Получить список спринтов tasks.api.scrum.sprint.list

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.api.scrum.sprint.list` возвращает список спринтов.

Метод аналогичен другим методам с фильтрацией по списку.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки результата. Объект вида `{'поле_сортировки': 'направление сортировки' [, ...]}`. Доступные поля описаны в таблице [ниже](#fields).

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **filter**
[`object`](../../../data-types.md) | Объект вида `{'фильтруемое_поле': 'значение фильтра' [, ...]}`. Доступные поля описаны в таблице [ниже](#fields) ||
|| **select**
[`object`](../../../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. 

Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля.

Значение по умолчанию — пустой массив `array()`. В этом случае будут возвращены все поля основной таблицы запроса ||
|| **start**
[`integer`](../../../data-types.md) | Номер страницы вывода. Работает для https запросов ||
|#

### Доступные поля фильтра {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID** 
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **GROUP_ID** 
[`integer`](../../../data-types.md) | Идентификатор Скрама ||
|| **ENTITY_TYPE** 
[`string`](../../../data-types.md) | Тип элемента ||
|| **NAME** 
[`string`](../../../data-types.md) | Имя ||
|| **SORT** 
[`integer`](../../../data-types.md) | Сортировка ||
|| **CREATED_BY** 
[`integer`](../../../data-types.md) | Кем создан ||
|| **MODIFIED_BY** 
[`integer`](../../../data-types.md) | Кем изменен ||
|| **DATE_START** 
[`string`](../../../data-types.md) | Дата запуска ||
|| **DATE_END** 
[`string`](../../../data-types.md) | Дата окончания ||
|| **STATUS** 
[`string`](../../../data-types.md) | Статус ||
|| **INFO** 
[`object`](../../../data-types.md) | Информация ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

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

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const groupId = 1;
    try {
      const response = await $b24.callListMethod(
        'tasks.api.scrum.sprint.list',
        {
          filter: {
            GROUP_ID: groupId,
            '>=DATE_END': new Date()
          }
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const groupId = 1;
    try {
      const generator = $b24.fetchListMethod('tasks.api.scrum.sprint.list', {
        filter: {
          GROUP_ID: groupId,
          '>=DATE_END': new Date()
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const groupId = 1;
    try {
      const response = await $b24.callMethod('tasks.api.scrum.sprint.list', {
        filter: {
          GROUP_ID: groupId,
          '>=DATE_END': new Date()
        }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    $groupId = 1;
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.sprint.list',
                [
                    'filter' => [
                        'GROUP_ID'    => $groupId,
                        '>=DATE_END' => new DateTime(),
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching sprint list: ' . $e->getMessage();
    }
    ```

- BX24.js

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

- PHP CRest

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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`object`](../../../data-types.md) | Объект, содержащий данные о спринте ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор спринта ||
|| **groupId** 
[`integer`](../../../data-types.md) | Идентификатор группы (Скрама), к которой относится спринт ||
|| **entityType** 
[`string`](../../../data-types.md) | Тип сущности (в данном случае `sprint`) ||
|| **name** 
[`string`](../../../data-types.md) | Название спринта ||
|| **goal** 
[`string`](../../../data-types.md) | Цель спринта. Устанавливается только в интерфейсе при запуске спринта ||
|| **sort** 
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего спринт ||
|| **modifiedBy** 
[`integer`](../../../data-types.md) | Идентификатор пользователя, изменившего спринт ||
|| **dateStart** 
[`string`](../../../data-types.md) | Дата начала спринта в формате `ISO 8601` ||
|| **dateEnd** 
[`string`](../../../data-types.md) | Дата окончания спринта в формате `ISO 8601` ||
|| **status** 
[`string`](../../../data-types.md) | Статус спринта ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Could not load list"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `0` | `Could not load list`| Не найдено ни одного спринта с указанными фильтрами ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-api-scrum-sprint-add.md)
- [{#T}](./tasks-api-scrum-sprint-update.md)
- [{#T}](./tasks-api-scrum-sprint-start.md)
- [{#T}](./tasks-api-scrum-sprint-complete.md)
- [{#T}](./tasks-api-scrum-sprint-get.md)
- [{#T}](./tasks-api-scrum-sprint-delete.md)
- [{#T}](./tasks-api-scrum-sprint-get-fields.md)
