# Отфильтровать направления сделок crm.dealcategory.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.category.list`](../../universal/category/crm-category-list.md)

{% endnote %}

Метод возвращает список направлений сделок по фильтру. Является реализацией списочных методов для направления сделок.

## Параметры метода

Cм. описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"IS_LOCKED":"N"},"select":["ID","NAME","SORT"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.dealcategory.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"IS_LOCKED":"N"},"select":["ID","NAME","SORT"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.dealcategory.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'crm.dealcategory.list',
        {
          order: { "SORT": "ASC" },
          filter: { "IS_LOCKED": "N" },
          select: [ "ID", "NAME", "SORT" ]
        }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('crm.dealcategory.list', {
        order: { "SORT": "ASC" },
        filter: { "IS_LOCKED": "N" },
        select: [ "ID", "NAME", "SORT" ]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.dealcategory.list', {
        order: { "SORT": "ASC" },
        filter: { "IS_LOCKED": "N" },
        select: [ "ID", "NAME", "SORT" ]
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
                'crm.dealcategory.list',
                [
                    'order'  => ['SORT' => 'ASC'],
                    'filter' => ['IS_LOCKED' => 'N'],
                    'select' => ['ID', 'NAME', 'SORT'],
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
        echo 'Error fetching deal categories: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.dealcategory.list",
        {
            order: { "SORT": "ASC" },
            filter: { "IS_LOCKED": "N" }, //Y - все направления, N - все направления кроме удаленных. Удаленные направления не удаляются с базы навсегда а только блокируются.
            select: [ "ID", "NAME", "SORT" ]
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
        'crm.dealcategory.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => ['IS_LOCKED' => 'N'],
            'select' => ['ID', 'NAME', 'SORT']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}