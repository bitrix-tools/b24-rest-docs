# Получить список разделов crm.productsection.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.productsection.list` возвращает список разделов товаров по фильтру. Является реализацией списочного метода для разделов товаров. Ожидается, что в фильтре будет определён параметр `CATALOG_ID`. В противном случае разделы будут выбираться из каталога по умолчанию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных элементов ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных элементов  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    catalogId=$(prompt "Введите ID каталога")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "order": { "NAME": "ASC" },
        "filter": { "CATALOG_ID": '"$catalogId"' },
        "select": [ "ID", "NAME" ]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.productsection.list
    ```

- cURL (OAuth)

    ```curl
    catalogId=$(prompt "Введите ID каталога")

    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "order": { "NAME": "ASC" },
        "filter": { "CATALOG_ID": '"$catalogId"' },
        "select": [ "ID", "NAME" ],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/crm.productsection.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const response = await $b24.callListMethod(
        'crm.productsection.list',
        {
          order: { "NAME": "ASC" },
          filter: { "CATALOG_ID": catalogId },
          select: [ "ID", "NAME" ]
        }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const generator = $b24.fetchListMethod('crm.productsection.list', {
        order: { "NAME": "ASC" },
        filter: { "CATALOG_ID": catalogId },
        select: [ "ID", "NAME" ]
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    var catalogId = prompt("Введите ID каталога");
    try {
      const response = await $b24.callMethod('crm.productsection.list', {
        order: { "NAME": "ASC" },
        filter: { "CATALOG_ID": catalogId },
        select: [ "ID", "NAME" ]
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    $catalogId = readline("Введите ID каталога");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.productsection.list',
                [
                    'order'  => ['NAME' => 'ASC'],
                    'filter' => ['CATALOG_ID' => $catalogId],
                    'select' => ['ID', 'NAME'],
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
    var catalogId = prompt("Введите ID каталога");
    BX24.callMethod(
        "crm.productsection.list",
        {
            order: { "NAME": "ASC" },
            filter: { "CATALOG_ID": catalogId },
            select: [ "ID", "NAME" ]
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

    $catalogId = readline("Введите ID каталога: ");

    $result = CRest::call(
        'crm.productsection.list',
        [
            'order' => [ 'NAME' => 'ASC' ],
            'filter' => [ 'CATALOG_ID' => $catalogId ],
            'sel ect' => [ 'ID', 'NAME' ]
        ]
    );

    if (isset($result['error'])) {
        echo "Error: " . $result['error_description'] . "\n";
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}