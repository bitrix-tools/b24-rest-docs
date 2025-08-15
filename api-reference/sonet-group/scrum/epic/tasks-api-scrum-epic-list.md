# Получить список эпиков tasks.api.scrum.epic.list

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список эпиков.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`array`](../../../data-types.md) | Массив для сортировки результата вида `{'поле_сортировки': 'направление сортировки' [, ...]}`. 

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Возможные значения элементов массива соответствуют полям ответа [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md#fields)
||
|| **filter**
[`array`](../../../data-types.md) | Массив вида `{'фильтруемое_поле': 'значение фильтра' [, ...]}`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра.

Возможные значения префикса:
- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)

Возможные значения элементов массива соответствуют полям ответа [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md#fields)

||
|| **select**
[`array`](../../../data-types.md) | Массив полей записей, которые будут возвращены методом.

Возможные значения элементов массива соответствуют полям ответа [tasks.api.scrum.epic.add](./tasks-api-scrum-epic-add.md#fields). Можно указать только те поля, которые необходимы.

Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля.

Значение по умолчанию — пустой массив `array()`. Это означает, что будут возвращены все поля основной таблицы запроса
||
|| **start**
[`integer`](../../../data-types.md) | Номер страницы вывода. Работает для https запросов.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:
`start = (N-1) * 50`, где `N` — номер нужной страницы
||
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
            "GROUP_ID": 143,
            ">=ID": 1,
            "<=ID": 50,
            "NAME": "%эпик%",
            "!=DESCRIPTION": "old epic",
        },
        "order": {
            "ID": "asc",
            "NAME": "desc"
        },
        "select": ["ID", "NAME", "DESCRIPTION", "CREATED_BY", "MODIFIED_BY", "COLOR"],
        "start": 0
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "filter": {
            "GROUP_ID": 143,
            ">=ID": 1,
            "<=ID": 50,
            "NAME": "%эпик%",
            "!=DESCRIPTION": "old epic",
            "CREATED_BY": 1,
            "MODIFIED_BY": 3,
            "COLOR": "#69dafc"
        },
        "order": {
            "ID": "asc",
            "NAME": "desc"
        },
        "select": ["ID", "NAME", "DESCRIPTION", "CREATED_BY", "MODIFIED_BY", "COLOR"],
        "start": 0,
        "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const groupId = 143;
    try {
      const response = await $b24.callListMethod(
        'tasks.api.scrum.epic.list',
        {
          filter: {
            GROUP_ID: groupId,
            '>=ID': 1,
            '<=ID': 50,
            'NAME': '%эпик%',
            '!=DESCRIPTION': 'old epic',
            'CREATED_BY': 1,
            'MODIFIED_BY': 3,
            'COLOR': '#69dafc'
          },
          order: {
            'ID': 'asc',
            'NAME': 'desc'
          },
          select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
          start: 0
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const groupId = 143;
    try {
      const generator = $b24.fetchListMethod('tasks.api.scrum.epic.list', {
        filter: {
          GROUP_ID: groupId,
          '>=ID': 1,
          '<=ID': 50,
          'NAME': '%эпик%',
          '!=DESCRIPTION': 'old epic',
          'CREATED_BY': 1,
          'MODIFIED_BY': 3,
          'COLOR': '#69dafc'
        },
        order: {
          'ID': 'asc',
          'NAME': 'desc'
        },
        select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
        start: 0
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const groupId = 143;
    try {
      const response = await $b24.callMethod('tasks.api.scrum.epic.list', {
        filter: {
          GROUP_ID: groupId,
          '>=ID': 1,
          '<=ID': 50,
          'NAME': '%эпик%',
          '!=DESCRIPTION': 'old epic',
          'CREATED_BY': 1,
          'MODIFIED_BY': 3,
          'COLOR': '#69dafc'
        },
        order: {
          'ID': 'asc',
          'NAME': 'desc'
        },
        select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
        start: 0
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.epic.list',
                [
                    'filter' => [
                        'GROUP_ID'      => $groupId,
                        '>=ID'          => 1,
                        '<=ID'          => 50,
                        'NAME'          => '%эпик%',
                        '!=DESCRIPTION' => 'old epic',
                        'CREATED_BY'    => 1,
                        'MODIFIED_BY'   => 3,
                        'COLOR'         => '#69dafc'
                    ],
                    'order'  => [
                        'ID'   => 'asc',
                        'NAME' => 'desc'
                    ],
                    'select' => ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
                    'start'  => 0
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const groupId = 143;
    BX24.callMethod(
        'tasks.api.scrum.epic.list',
        {
            filter: {
                GROUP_ID: groupId,
                '>=ID': 1,
                '<=ID': 50,
                'NAME': '%эпик%',
                '!=DESCRIPTION': 'old epic',
                'CREATED_BY': 1,
                'MODIFIED_BY': 3,
                'COLOR': '#69dafc'
            },
            order: {
                'ID': 'asc',
                'NAME': 'desc'
            },
            select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
            start: 0
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
        'tasks.api.scrum.epic.list',
        [
            'filter' => [
                'GROUP_ID' => 143,
                '>=ID' => 1,
                '<=ID' => 50,
                'NAME' => '%эпик%',
                '!=DESCRIPTION' => 'old epic',
                'CREATED_BY' => 1,
                'MODIFIED_BY' => 3,
                'COLOR' => '#69dafc'
            ],
            'order' => [
                'ID' => 'asc',
                'NAME' => 'desc'
            ],
            'select' => ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
            'start' => 0
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    }
    else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
[
    {
        "id": 1,
        "groupId": 143,
        "name": "эпик",
        "description": "",
        "createdBy": 1,
        "modifiedBy": 0,
        "color": "#69dafc"
    },
    {
        "id": 3,
        "groupId": 143,
        "name": "эпик2",
        "description": "new epic",
        "createdBy": 3,
        "modifiedBy": 5,
        "color": "#69dagc"
    }
]
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
|| **Код** | **Описание**  | **Значение** ||
|| `0` | Could not load list| Не найдено ни одного эпика с указанными фильтрами ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-update.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)