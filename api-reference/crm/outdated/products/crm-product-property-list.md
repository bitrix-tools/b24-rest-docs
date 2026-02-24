# Получить список свойств товаров crm.product.property.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.property.list` продолжает работать, но у него есть более актуальный аналог [catalog.productProperty.list](../../../catalog/product-property/catalog-product-property-list.md).

{% endnote %}

Метод `crm.product.property.list` возвращает список свойств товаров.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order** |  Сортировка ||
|| **filter** | Поля фильтра ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"PROPERTY_TYPE":"S","USER_TYPE":"HTML"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.product.property.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"PROPERTY_TYPE":"S","USER_TYPE":"HTML"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.property.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'crm.product.property.list',
        {
          order: { "SORT": "ASC" },
          filter: {
            "PROPERTY_TYPE": "S",
            "USER_TYPE": "HTML"
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('crm.product.property.list', {
        order: { "SORT": "ASC" },
        filter: {
          "PROPERTY_TYPE": "S",
          "USER_TYPE": "HTML"
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.product.property.list', {
        order: { "SORT": "ASC" },
        filter: {
          "PROPERTY_TYPE": "S",
          "USER_TYPE": "HTML"
        }
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
                'crm.product.property.list',
                [
                    'order' => ['SORT' => 'ASC'],
                    'filter' => [
                        'PROPERTY_TYPE' => 'S',
                        'USER_TYPE'    => 'HTML'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        if ($response->more()) {
            $response->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching product properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.product.property.list", {
            order: {"SORT": "ASC"},
            filter: {
                "PROPERTY_TYPE": "S",
                "USER_TYPE": "HTML"
            }
        },
        function (result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.dir(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.product.property.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => [
                'PROPERTY_TYPE' => 'S',
                'USER_TYPE' => 'HTML'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}