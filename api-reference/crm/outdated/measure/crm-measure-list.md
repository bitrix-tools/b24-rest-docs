# Получить список единиц измерения crm.measure.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список единиц измерения.

Cмотрите описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"ASC"},"filter":{"IS_DEFAULT":"Y"},"select":["ID","CODE","STAGE_ID","SYMBOL_RUS","SYMBOL_INTL"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.measure.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"ASC"},"filter":{"IS_DEFAULT":"Y"},"select":["ID","CODE","STAGE_ID","SYMBOL_RUS","SYMBOL_INTL"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.measure.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.measure.list',
        {
          order: {"ID": "ASC"},
          filter: {"IS_DEFAULT": "Y"},
          select: ["ID", "CODE", "STAGE_ID", "SYMBOL_RUS", "SYMBOL_INTL"]
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
      const generator = $b24.fetchListMethod('crm.measure.list', {
        order: {"ID": "ASC"},
        filter: {"IS_DEFAULT": "Y"},
        select: ["ID", "CODE", "STAGE_ID", "SYMBOL_RUS", "SYMBOL_INTL"]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.measure.list', {
        order: {"ID": "ASC"},
        filter: {"IS_DEFAULT": "Y"},
        select: ["ID", "CODE", "STAGE_ID", "SYMBOL_RUS", "SYMBOL_INTL"]
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
                'crm.measure.list',
                [
                    'order'  => ['ID' => 'ASC'],
                    'filter' => ['IS_DEFAULT' => 'Y'],
                    'select' => ['ID', 'CODE', 'STAGE_ID', 'SYMBOL_RUS', 'SYMBOL_INTL'],
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
        echo 'Error fetching measure list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.measure.list",
        {
            order: {"ID": "ASC"},
            filter: {"IS_DEFAULT": "Y"},
            select: ["ID", "CODE", "STAGE_ID", "SYMBOL_RUS", "SYMBOL_INTL"]
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
        'crm.measure.list',
        [
            'order' => ['ID' => 'ASC'],
            'filter' => ['IS_DEFAULT' => 'Y'],
            'select' => ['ID', 'CODE', 'STAGE_ID', 'SYMBOL_RUS', 'SYMBOL_INTL']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./crm-measure-add.md)
- [{#T}](./crm-measure-update.md)
- [{#T}](./crm-measure-get.md)
- [{#T}](./crm-measure-delete.md)
- [{#T}](./crm-measure-fields.md)
