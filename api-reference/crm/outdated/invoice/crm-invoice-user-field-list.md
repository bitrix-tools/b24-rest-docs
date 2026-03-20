# Получить список пользовательских полей по фильтру crm.invoice.userfield.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает список пользовательских полей счетов по фильтру.

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **order** | Поля сортировки ||
|| **filter** | Поля фильтра  ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"MANDATORY":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.invoice.userfield.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"MANDATORY":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.userfield.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'crm.invoice.userfield.list',
        {
          order: {"SORT": "ASC"},
          filter: {"MANDATORY": "N"}
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
      const generator = $b24.fetchListMethod('crm.invoice.userfield.list', { order: {"SORT": "ASC"}, filter: {"MANDATORY": "N"} }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.invoice.userfield.list', { order: {"SORT": "ASC"}, filter: {"MANDATORY": "N"} }, 0)
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
                'crm.invoice.userfield.list',
                [
                    'order' => ['SORT' => 'ASC'],
                    'filter' => ['MANDATORY' => 'N'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
        if ($response->getResponseData()->getMore()) {
            $response->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching invoice user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.invoice.userfield.list",
        {
            order: {"SORT": "ASC"},
            filter: {"MANDATORY": "N"}
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
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
        'crm.invoice.userfield.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => ['MANDATORY' => 'N']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}