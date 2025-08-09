# История задачи tasks.task.history.list

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.history.list` получения истории задачи.

Возвращаем массив данных (см. примеры ниже).

Можно фильтровать и сортировать по всем полям (см. [tasks.task.list](./tasks-task-list.md)). По умолчанию отдает всю историю без разбивки по страницам.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **start**
[`unknown`](../data-types.md) | Сколько первых записей пропускать в результате. В связи с техническими ограничениями значение этого параметра всегда должно быть кратно 50. Например, при значении 50 в результате будут отображаться 51-я запись и последующие, а первые 50 записей будут пропущены.

При значении -1 будет отключён подсчёт количества. 

Работает для https запросов.||
|#

## Пример 1

Вывод истории конкретной задачи с использованием фильтра `NEW` (т.е. когда была создана задача):
```js
BX24.callMethod('tasks.task.history.list', {taskId: 119, filter:{FIELD:'NEW'}}, (res)=>{console.log(res.answer.result);});
```

## Ответ в случае успеха

> 200 OK

```json
{
    "result": {
        "list": [
            {
                "id": "1230",
                "createdDate": "01.03.2019 15:29:28",
                "field": "NEW",
                "value": {
                    "from": null,
                    "to": null
                },
                "user": {
                    "id": "1",
                    "name": "Максим",
                    "lastName": "Гречушников",
                    "secondName": "",
                    "login": "admin"
                }
            }
        ]
    },
    "time": {
        "start": 1552382093.81029,
        "finish": 1552382093.927268,
        "duration": 0.11697793006896973,
        "processing": 0.018744230270385742,
        "date_start": "2019-03-12T11:14:53+02:00",
        "date_finish": "2019-03-12T11:14:53+02:00"
    }
}
```

## Пример 2

Вывод истории конкретной задачи без использования фильтров:

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.planner.getlist',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.planner.getlist', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.planner.getlist', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.planner.getlist',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task planner list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.planner.getlist',
        [],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

![Результат](_images/tasks_task_history_list-2.png =865x)

{% include [Сноска о примерах](../../_includes/examples.md) %}