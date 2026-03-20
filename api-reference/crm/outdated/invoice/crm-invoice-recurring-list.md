# Получить список настроек регулярных счетов по фильтру crm.invoice.recurring.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает список настроек шаблонов регулярных счетов по фильтру.

При выборке используйте маску "*" для выборки всех полей (без пользовательских и множественных).

## Параметры метода

См. описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"INVOICE_ID":"ASC"},"filter":{">COUNTER_REPEAT":5},"select":["ID","INVOICE_ID","NEXT_EXECUTION","LAST_EXECUTION","SEND_BILL","IS_LIMIT"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.invoice.recurring.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"INVOICE_ID":"ASC"},"filter":{">COUNTER_REPEAT":5},"select":["ID","INVOICE_ID","NEXT_EXECUTION","LAST_EXECUTION","SEND_BILL","IS_LIMIT"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.recurring.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'crm.invoice.recurring.list',
        {
          order: { "INVOICE_ID": "ASC" },
          filter: { ">COUNTER_REPEAT": 5 },
          select: [ "ID", "INVOICE_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "SEND_BILL", "IS_LIMIT" ]
        }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('crm.invoice.recurring.list', {
        order: { "INVOICE_ID": "ASC" },
        filter: { ">COUNTER_REPEAT": 5 },
        select: [ "ID", "INVOICE_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "SEND_BILL", "IS_LIMIT" ]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.invoice.recurring.list', {
        order: { "INVOICE_ID": "ASC" },
        filter: { ">COUNTER_REPEAT": 5 },
        select: [ "ID", "INVOICE_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "SEND_BILL", "IS_LIMIT" ]
      }, 0)
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
                'crm.invoice.recurring.list',
                [
                    'order'  => ['INVOICE_ID' => 'ASC'],
                    'filter' => ['>COUNTER_REPEAT' => 5],
                    'select' => ['ID', 'INVOICE_ID', 'NEXT_EXECUTION', 'LAST_EXECUTION', 'SEND_BILL', 'IS_LIMIT'],
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
        echo 'Error fetching recurring invoices: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.invoice.recurring.list",
        {
            order: { "INVOICE_ID": "ASC" },
            filter: { ">COUNTER_REPEAT": 5 },
            select: [ "ID", "INVOICE_ID ", "NEXT_EXECUTION", "LAST_EXECUTION", "SEND_BILL", "IS_LIMIT" ]
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.invoice.recurring.list',
        [
            'order' => ['INVOICE_ID' => 'ASC'],
            'filter' => ['>COUNTER_REPEAT' => 5],
            'select' => ['ID', 'INVOICE_ID', 'NEXT_EXECUTION', 'LAST_EXECUTION', 'SEND_BILL', 'IS_LIMIT']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
