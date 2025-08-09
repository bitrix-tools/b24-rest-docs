# Получить список пользовательских полей task.item.userfield.getlist

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.item.userfield.getlist` возвращает список свойств.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **auth**
[`unknown`](../../data-types.md) | Токен авторизации. ||
|| **ORDER**
[`unknown`](../../data-types.md) | Массив для сортировки результата. Массив вида `array('поле сортировки'=>'направление сортировки' [, ...])`. ||
|| **FILTER**
[`unknown`](../../data-types.md) | Массив фильтрации результата вида `array('фильтруемое поле'=>'значение фильтра' [, ...])`. Обязательный параметр. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.item.userfield.getlist',
        {
          order: { "ID": "ASC" },
          filter: { "EDIT_IN_LIST": "Y" }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.item.userfield.getlist', { order: { "ID": "ASC" }, filter: { "EDIT_IN_LIST": "Y" } }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.item.userfield.getlist', { order: { "ID": "ASC" }, filter: { "EDIT_IN_LIST": "Y" } }, 0)
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
                'task.item.userfield.getlist',
                [
                    'order' => [
                        'ID' => 'ASC'
                    ],
                    'filter' => [
                        'EDIT_IN_LIST' => 'Y'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        // Нужная вам логика обработки данных
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting user fields list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "task.item.userfield.getlist",
        {
            order:
            {
                "ID": "ASC"
            },
            filter:
            {
                "EDIT_IN_LIST": "Y"
            }
        },
        function(result)
        {
        }
    );
    ```

- cURL

    ```http    
    $appParams = array(
    'auth' => 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
    'ORDER' => array('ID' => 'asc'),
    'FILTER' => array('USER_TYPE_ID' => 'string')
    );
    ```

    ```http    
    $request = 'http://your-domain.ru/rest/task.item.userfield.getlist.xml?' . http_build_query($appParams);
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}