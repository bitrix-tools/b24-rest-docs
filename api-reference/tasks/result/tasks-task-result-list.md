# Получить список результатов задачи tasks.task.result.list

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к задаче

Метод `tasks.task.result.list` получает список результатов, закрепленных в задаче.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **taskId***
[`integer`](../../data-types.md) | Идентификатор задачи, из которой нужно получить результаты.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.result.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.result.list
    ```

- JS

    ```javascript
    // callListMethod рекомендуется использовать, когда необходимо получить
    // весь набор списочных данных и объём записей относительно невелик
    // (до примерно 1000 элементов). Метод загружает все данные сразу, что
    // может привести к высокой нагрузке на память при работе с большими объемами.

    try {
    const response = await $b24.callListMethod(
        'tasks.task.result.list',
        { taskId: 8017 },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod предпочтителен при работе с крупными наборами данных.
    // Метод реализует итеративную выборку с использованием генератора, что
    // позволяет обрабатывать данные по частям и эффективно использовать память.

    try {
    const generator = $b24.fetchListMethod('tasks.task.result.list', { taskId: 8017 }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod предоставляет ручной контроль над процессом постраничного
    // получения данных через параметр start. Подходит для сценариев, где
    // требуется точное управление пакетами запросов. Однако при больших
    // объемах данных может быть менее эффективным по сравнению с
    // fetchListMethod.

    try {
    const response = await $b24.callMethod('tasks.task.result.list', { taskId: 8017 }, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.result.list',
                [
                    'taskId' => 8017
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing task results: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.task.result.list',
        {
            "taskId": 8017
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.result.list',
        [
            'taskId' => 8017
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
    "result": [
        {
            "id": 23,
            "taskId": 8017,
            "commentId": 3197,
            "createdBy": 503,
            "createdAt": "2025-07-15T14:30:00+03:00",
            "updatedAt": "2025-08-19T16:45:48+03:00",
            "status": 0,
            "text": "Клиент подписал документы",
            "formattedText": "Клиент подписал документы",
            "files": []
        },
        {
            "id": 21,
            "taskId": 8017,
            "commentId": 3199,
            "createdBy": 503,
            "createdAt": "2025-07-13T14:30:00+03:00",
            "updatedAt": "2025-08-19T16:45:56+03:00",
            "status": 0,
            "text": "Отправил документы клиенту. Клиент обещает ответить в [B]понедельник[\/B].",
            "formattedText": "Отправил документы клиенту. Клиент обещает ответить в \u003Cb\u003Eпонедельник\u003C\/b\u003E.",
            "files": [1055,1057,1059,1061,1063]
        }
    ],
    "time": {
        "start": 1755611166.509052,
        "finish": 1755611166.542696,
        "duration": 0.03364396095275879,
        "processing": 0.00906991958618164,
        "date_start": "2025-08-19T16:46:06+03:00",
        "date_finish": "2025-08-19T16:46:06+03:00",
        "operating_reset_at": 1755611766,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов, где каждый объект описывает результат задачи ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор результата ||
|| **taskId**
[`integer`](../../data-types.md) | Идентификатор задачи ||
|| **commentId**
[`integer`](../../data-types.md) | Идентификатор комментария, закрепленного как результат ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, закрепившего результат ||
|| **createdAt**
[`string`](../../data-types.md) | Дата и время закрепления результата в формате ISO 8601 ||
|| **updatedAt**
[`string`](../../data-types.md) | Дата и время последнего изменения результата в формате ISO 8601 ||
|| **status**
[`integer`](../../data-types.md) | Статус результата. Возможные значения:
- `0` — результат открыт
- `1` — результат закрыт

Результат становится закрытым после завершения задачи и сохраняет этот статус после возобновления задачи. Открытыми будут только новые результаты в незавершенной задаче.

Комментарий с открытым результатом нельзя повторно добавить в результат. Если результат закрыт — добавление возможно
 ||
|| **text**
[`string`](../../data-types.md) | Текст результата ||
|| **formattedText**
[`string`](../../data-types.md) | Текст результата с форматированием ||
|| **files**
[`array`](../../data-types.md) | Список идентификаторов файлов, прикрепленных к результату.

Соддержит пустой массив, если файлов в комментарии нет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"100",
    "error_description":"Invalid value {значение} to match with parameter {commentId}. Should be value of type int."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied. | У пользователя нет доступа к задаче или задачи с таким `ID` не существует ||
|| `100` | Invalid value {значение} to match with parameter {commentId}. Should be value of type int. | В параметре `taskId` передано значение неверного типа. Должно быть значение типа `integer` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-task-result-add-from-comment.md)
- [{#T}](./tasks-task-result-delete-from-comment.md)