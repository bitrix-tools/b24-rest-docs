# Получить список записей о затраченном времени task.elapseditem.getlist

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список записей о затраченном времени по задаче.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID**
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки результата (подробное описание приведено ниже) ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации результата (подробное описание приведено ниже) ||
|| **SELECT**
[`array`](../../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. Если в массиве присутствует значение `"*"`, то будут возвращены все доступные поля. 

По умолчанию будут возвращены все поля основной таблицы запроса ||
|| **PARAMS**
[`object`](../../data-types.md) | Объект для опций вызова. Элементом является объект `NAV_PARAMS` вида `{'опция вызова': 'значение' [, ...]}` (подробное описание приведено ниже) в виде структуры ||
|#

{% note warning %}

Соблюдать указанный в таблице порядок следования параметров в запросе — обязательно. Иначе запрос выполнится с ошибками.

{% endnote %}


{% note info %}

Особенности ручного добавления информации о времени работы, которая была фактически выполнена несколько дней назад. В этом случае меняется значение некоторых полей:
- `CREATED_DATE` — дата начала
- `DATE_START` — дата создания записи
- `DATE_STOP` — дата окончания записи

{% endnote %}

### Параметр ORDER

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор записи о затраченном времени. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, от имени которого была сделана запись о затраченном времени. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **MINUTES**
[`string`](../../data-types.md) | Затраченное время, минуты. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **SECONDS**
[`string`](../../data-types.md) | Затраченное время, секунды. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **CREATED_DATE**
[`string`](../../data-types.md) | Дата создания записи. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **DATE_START**
[`string`](../../data-types.md) | Дата начала. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **DATE_STOP**
[`string`](../../data-types.md) | Дата конца. Может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию ||
|#


### Параметр FILTER

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор записи о затраченном времени ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого была сделана запись о затраченном времени ||
|| **CREATED_DATE**
[`datetime`](../../data-types.md) | Дата создания записи ||
|#

{% note info %}

Перед названием фильтруемого поля можно указать тип фильтрации:
- "!" — не равно
- "<" — меньше
- "<=" — меньше либо равно
- ">" — больше
- ">=" — больше либо равно

*'значения фильтра'* — одиночное значение или массив

{% endnote %}

### Параметр NAV_PARAMS

#|
|| **Название**
`тип` | **Описание** ||
|| **nPageSize**
[`integer`](../../data-types.md) | Количество элементов на странице. В целях ограничения нагрузки на постраничную навигацию наложено ограничение в 50 записей ||
|| **iNumPage**
[`integer`](../../data-types.md) | Номер страницы при постраничной навигации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '[{"ID": "desc"},{">=CREATED_DATE": "2024-02-16"}]' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/task.elapseditem.getlist
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{[{"ID": "desc"},{">=CREATED_DATE": "2024-02-16"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.elapseditem.getlist
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.elapseditem.getlist',
        [
          1, 
          {'ID': 'desc'},
          {'<ID': 50}
        ],
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.elapseditem.getlist', [{'ID': 'desc'}, {'>=CREATED_DATE': '2024-02-16'}, ['ID', 'TASK_ID'], {"NAV_PARAMS":{"nPageSize":2}}], 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.elapseditem.getlist', [{'ID': 'desc'}, {'>=CREATED_DATE': '2024-02-16'}, ['ID', 'TASK_ID'], {"NAV_PARAMS":{"nPageSize":2}}], 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        // Получить все записи о затраченном времени с сортировкой по ID в нисходящем порядке.
        // Будут отфильтрованы только те записи, ID которых имеет значение меньше 50.
        $response1 = $b24Service
            ->core
            ->call(
                'task.elapseditem.getlist',
                [
                    1,
                    ['ID' => 'desc'],
                    ['<ID' => 50],
                ]
            );
    
        $result1 = $response1
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result1, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting elapsed time records: ' . $e->getMessage();
    }
    
    try {
        // Получение выборки по затраченному времени на основании общих условий фильтрации. Например, выбрать данные о трудозатратах с указанной даты:
        $response2 = $b24Service
            ->core
            ->call(
                'task.elapseditem.getlist',
                [
                    ['ID' => 'desc'],
                    ['>=CREATED_DATE' => '2024-02-16'],
                    ['ID', 'TASK_ID'],
                    [
                        'NAV_PARAMS' => [
                            'nPageSize' => 2,
                        ],
                    ],
                ]
            );
    
        $result2 = $response2
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result2, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting elapsed time records: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Получить все записи о затраченном времени с сортировкой по ID в нисходящем порядке.
    // Будут отфильтрованы только те записи, ID которых имеет значение меньше 50.
    BX24.callMethod(
        'task.elapseditem.getlist',
        [
            1, 
            {'ID': 'desc'},
            {'<ID': 50}
        ],
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    // Получение выборки по затраченному времени на основании общих условий фильтрации. Например, выбрать данные о трудозатратах с указанной даты:
    BX24.callMethod(
        'task.elapseditem.getlist',
        [
            {'ID': 'desc'}, 
            {'>=CREATED_DATE': '2024-02-16'},
            ['ID', 'TASK_ID'],
            {"NAV_PARAMS":{
                    "nPageSize":2
                }
            },
        ],
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.elapseditem.getlist',
        [
            "ORDER" => ["ID" => "DESC"],            // Сортировка по ID - по убыванию
            "FILTER" => [">ID" => 1],               // Фильтр
            "SELECT" => ['ID', 'TASK_ID'],          // Выборка - только ID записи и задачи
            "PARAMS" => ['NAV_PARAMS' => [          // Постраничка
                    "nPageSize" => 2,                   // по 2 элемента на странице
                    'iNumPage' => 2                     // страница номер 2
                ]
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":[
        {
            "ID": "1",
            "TASK_ID": "691",
            "USER_ID": "1",
            "COMMENT_TEXT": "1",
            "SECONDS": "3600",
            "MINUTES": "60",
            "SOURCE": "2",
            "CREATED_DATE": "2024-05-16T10:33:00+02:00",
            "DATE_START": "2024-05-16T10:33:15+02:00",
            "DATE_STOP": "2024-05-16T10:33:15+02:00"
        }
    ],
    "total": 1,
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с информацией о записях о затраченном времени по задаче ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"ACTION_NOT_ALLOWED"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0x100002` | Доступ запрещен ||
|| `0x000004` | Действие не разрешено ||
|| `0x000040` | Неизвестная ошибка ||
|| `0x000100` | Переданы неверные параметры метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-elapsed-item-add.md)
- [{#T}](./task-elapsed-item-update.md)
- [{#T}](./task-elapsed-item-get.md)
- [{#T}](./task-elapsed-item-delete.md)
- [{#T}](./task-elapsed-item-is-action-allowed.md)
- [{#T}](./task-elapsed-item-get-manifest.md)