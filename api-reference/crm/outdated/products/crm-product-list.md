# Получить список товаров по фильтру crm.product.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.list` продолжает работать, но у него есть более актуальные аналоги [catalog.product.*](../../../catalog/product/index.md).

{% endnote %}

Метод `crm.product.list` возвращает список товаров по фильтру.

## Параметры метода

См. описание [списочных методов](../../../common/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"NAME":"ASC"},"filter":{"CATALOG_ID":"your_catalog_id"},"select":["ID","NAME","CURRENCY_ID","PRICE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"NAME":"ASC"},"filter":{"CATALOG_ID":"your_catalog_id"},"select":["ID","NAME","CURRENCY_ID","PRICE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const response = await $b24.callListMethod(
        'crm.product.list',
        {
          order: { "NAME": "ASC" },
          filter: { "CATALOG_ID": catalogId },
          select: [ "ID", "NAME", "CURRENCY_ID", "PRICE" ]
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const generator = $b24.fetchListMethod('crm.product.list', {
        order: { "NAME": "ASC" },
        filter: { "CATALOG_ID": catalogId },
        select: [ "ID", "NAME", "CURRENCY_ID", "PRICE" ]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const response = await $b24.callMethod('crm.product.list', {
        order: { "NAME": "ASC" },
        filter: { "CATALOG_ID": catalogId },
        select: [ "ID", "NAME", "CURRENCY_ID", "PRICE" ]
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
        $order = []; // Define your order array
        $filter = []; // Define your filter array
        $select = ['ID', 'CATALOG_ID', 'PRICE', 'CURRENCY_ID', 'NAME', 'CODE', 'DESCRIPTION', 'DESCRIPTION_TYPE', 'ACTIVE', 'SECTION_ID', 'SORT', 'VAT_ID', 'VAT_INCLUDED', 'MEASURE', 'XML_ID', 'PREVIEW_PICTURE', 'DETAIL_PICTURE', 'DATE_CREATE', 'TIMESTAMP_X', 'MODIFIED_BY', 'CREATED_BY'];
        $startItem = 0; // Define your start item
        $result = $serviceBuilder
            ->getCRMScope()
            ->product()
            ->list($order, $filter, $select, $startItem);
        foreach ($result->getProducts() as $product) {
            print("ID: {$product->ID}\n");
            print("Catalog ID: {$product->CATALOG_ID}\n");
            print("Price: {$product->PRICE}\n");
            print("Currency ID: {$product->CURRENCY_ID}\n");
            print("Name: {$product->NAME}\n");
            print("Code: {$product->CODE}\n");
            print("Description: {$product->DESCRIPTION}\n");
            print("Description Type: {$product->DESCRIPTION_TYPE}\n");
            print("Active: {$product->ACTIVE}\n");
            print("Section ID: {$product->SECTION_ID}\n");
            print("Sort: {$product->SORT}\n");
            print("VAT ID: {$product->VAT_ID}\n");
            print("VAT Included: {$product->VAT_INCLUDED}\n");
            print("Measure: {$product->MEASURE}\n");
            print("XML ID: {$product->XML_ID}\n");
            print("Preview Picture: {$product->PREVIEW_PICTURE}\n");
            print("Detail Picture: {$product->DETAIL_PICTURE}\n");
            print("Date Create: " . (new DateTime($product->DATE_CREATE))->format(DateTime::ATOM) . "\n");
            print("Timestamp X: " . (new DateTime($product->TIMESTAMP_X))->format(DateTime::ATOM) . "\n");
            print("Modified By: {$product->MODIFIED_BY}\n");
            print("Created By: {$product->CREATED_BY}\n");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    var catalogId = prompt("Введите ID каталога");
    BX24.callMethod(
        "crm.product.list",
        {
            order: { "NAME": "ASC" },
            filter: { "CATALOG_ID": catalogId },
            select: [ "ID", "NAME", "CURRENCY_ID", "PRICE" ]
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

    Чтобы получить свойства товара, нужно в `select` указать `PROPERTY_*`.

    ```js
    $arFields['select'] = array('*', 'PROPERTY_*');
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $catalogId = 'your_catalog_id'; // Replace 'your_catalog_id' with the actual catalog ID

    $result = CRest::call(
        'crm.product.list',
        [
            'order' => ['NAME' => 'ASC'],
            'filter' => ['CATALOG_ID' => $catalogId],
            'select' => ['ID', 'NAME', 'CURRENCY_ID', 'PRICE']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}