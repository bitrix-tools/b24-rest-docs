# Получить список пользовательских полей предложений по фильтру crm.quote.userfield.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно описать параметры здесь
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.userfield.list` возвращает список пользовательских полей предложений по фильтру.

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **order**
[`unknown`](../../../data-types.md) | Поля сортировки. ||
|| **filter**
[`unknown`](../../../data-types.md) | Поля фильтра. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    var id = prompt("Введите ID");
    try {
      const response = await $b24.callListMethod(
        'crm.quote.userfield.list',
        {
          order: { "SORT": "ASC" },
          filter: { "MANDATORY": "N" }
        },
        (progress) => {
          console.log('Progress:', progress);
        }
      );
      const items = response.getData() || [];
      for (const entity of items) {
        console.log('Entity:', entity);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    var id = prompt("Введите ID");
    try {
      const generator = $b24.fetchListMethod('crm.quote.userfield.list', {
        order: { "SORT": "ASC" },
        filter: { "MANDATORY": "N" }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) {
          console.log('Entity:', entity);
        }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    var id = prompt("Введите ID");
    try {
      const response = await $b24.callMethod('crm.quote.userfield.list', {
        order: { "SORT": "ASC" },
        filter: { "MANDATORY": "N" }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) {
        console.log('Entity:', entity);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    $id = $_POST['id'];
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.userfield.list',
                [
                    'order'  => ['SORT' => 'ASC'],
                    'filter' => ['MANDATORY' => 'N']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.quote.userfield.list",
        {
            order: { "SORT": "ASC" },
            filter: { "MANDATORY": "N" }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}