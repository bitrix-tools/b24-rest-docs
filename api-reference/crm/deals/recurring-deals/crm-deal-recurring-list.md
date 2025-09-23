# Получить список настроек шаблонов регулярных сделок crm.deal.recurring.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.recurring.list` возвращает список настроек шаблонов регулярных сделок по фильтру.

При выборке используйте маску "*" для выборки всех полей (без пользовательских и множественных).

См. описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.deal.recurring.list',
        {
          order: { "DEAL_ID": "ASC" },
          filter: { ">COUNTER_REPEAT": 5 },
          select: [ "ID", "DEAL_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "CATEGORY_ID", "IS_LIMIT" ]
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
      const generator = $b24.fetchListMethod('crm.deal.recurring.list', { order: { "DEAL_ID": "ASC" }, filter: { ">COUNTER_REPEAT": 5 }, select: [ "ID", "DEAL_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "CATEGORY_ID", "IS_LIMIT" ] }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.deal.recurring.list', { order: { "DEAL_ID": "ASC" }, filter: { ">COUNTER_REPEAT": 5 }, select: [ "ID", "DEAL_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "CATEGORY_ID", "IS_LIMIT" ] }, 0)
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
                'crm.deal.recurring.list',
                [
                    'order'  => ['DEAL_ID' => 'ASC'],
                    'filter' => ['>COUNTER_REPEAT' => 5],
                    'select' => ['ID', 'DEAL_ID', 'NEXT_EXECUTION', 'LAST_EXECUTION', 'CATEGORY_ID', 'IS_LIMIT'],
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
        echo 'Error fetching recurring deals: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.deal.recurring.list",
        {
            order: { "DEAL_ID": "ASC" },
            filter: { ">COUNTER_REPEAT": 5 },
            select: [ "ID", "DEAL_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "CATEGORY_ID", "IS_LIMIT" ]
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