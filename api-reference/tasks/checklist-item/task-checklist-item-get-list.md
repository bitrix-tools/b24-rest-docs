# Получить список пунктов чек-листа task.checklistitem.getlist

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не хватает примеров (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.checklistitem.getlist` возвращает список элементов чек-листа в задаче.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **TASKID^*^**
[`unknown`](../../data-types.md) | Идентификатор задачи. ||
|| **ORDER**
[`unknown`](../../data-types.md) | Массив для сортировки результата. Поле для сортировки может принимать значения:
- `ID` — идентификатор элемента чек-листа;
- `CREATED_BY` — идентификатор пользователя, создавшего элемент;
- `TOGGLED_BY` — идентификатор пользователя, изменившего состояние элемента чек-листа;
- `TOGGLED_DATE` — время, когда было изменено состояние элемента чек-листа;
- `TITLE` — заголовок элемента чек-листа;
- `SORT_INDEX` — индекс сортировки элемента;
- `IS_COMPLETE` — элемент отмечен как выполненный.

Направление сортировки может принимать значения:
- `asc` — по возрастанию;
- `desc` — по убыванию.

Необязательный. По умолчанию фильтруется по убыванию идентификатора элемента чек-листа. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note info %}

Соблюдение порядка следования параметров в запросе обязательно. При его нарушении запрос будет выполнен с ошибками.

{% endnote %}

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.checklistitem.getlist',
        [13, {'TOGGLED_DATE': 'desc'}],
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.checklistitem.getlist', [13, {'TOGGLED_DATE': 'desc'}], 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.checklistitem.getlist', [13, {'TOGGLED_DATE': 'desc'}], 0)
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
                'task.checklistitem.getlist',
                [
                    13,
                    ['TOGGLED_DATE' => 'desc']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting checklist items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.getlist',
        [13, {'TOGGLED_DATE': 'desc'}],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}