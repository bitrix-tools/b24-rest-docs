# Получить список свойств заказа crm.productrow.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`crm.item.productrow.list`](../../universal/product-rows/crm-item-productrow-list.md)

{% endnote %}

Метод возвращает список товарных позиций по фильтру. Является реализацией списочного метода для товарных позиций. Владелец товарных позиций определяется обязательными полями `OWNER_TYPE` и `OWNER_ID`, где `OWNER_TYPE` - односимвольный код типа ("D" - сделка, "L" - лид), `OWNER_ID` - идентификатор. 

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
    -d '{"filter":{"OWNER_TYPE":"D","OWNER_ID":"1"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.productrow.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_TYPE":"D","OWNER_ID":"1"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.productrow.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    var ownerType = prompt("Введите тип владельца (D, L)");
    var ownerId = prompt("Введите ID владельца");
    
    try {
      const response = await $b24.callListMethod(
        'crm.productrow.list',
        {
          filter: {
            "OWNER_TYPE": ownerType,
            "OWNER_ID": ownerId
          }
        },
        (progress) => { 
          if(progress.error())
            console.error(progress.error());
          else
          {
            console.dir(progress.data());
            if(progress.more())
              progress.next();
          }
        }
      );
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    var ownerType = prompt("Введите тип владельца (D, L)");
    var ownerId = prompt("Введите ID владельца");
    
    try {
      const generator = $b24.fetchListMethod('crm.productrow.list', {
        filter: {
          "OWNER_TYPE": ownerType,
          "OWNER_ID": ownerId
        }
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
    
    var ownerType = prompt("Введите тип владельца (D, L)");
    var ownerId = prompt("Введите ID владельца");
    
    try {
      const response = await $b24.callMethod('crm.productrow.list', {
        filter: {
          "OWNER_TYPE": ownerType,
          "OWNER_ID": ownerId
        }
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
    $ownerType = readline("Введите тип владельца (D, L): ");
    $ownerId = readline("Введите ID владельца: ");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.productrow.list',
                [
                    'filter' => [
                        'OWNER_TYPE' => $ownerType,
                        'OWNER_ID'   => $ownerId,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Data: ' . print_r($result->data(), true);
            if ($result->more()) {
                $result->next();
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var ownerType = prompt("Введите тип владельца (D, L)");
    var ownerId = prompt("Введите ID владельца");
    BX24.callMethod(
        "crm.productrow.list",
        {
            filter:
            {
                "OWNER_TYPE": ownerType,
                "OWNER_ID": ownerId
            }
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

    $ownerType = 'D'; // Replace 'D' with the desired owner type
    $ownerId = 1; // Replace 1 with the actual owner ID

    $result = CRest::call(
        'crm.productrow.list',
        [
            'filter' =>
            [
                'OWNER_TYPE' => $ownerType,
                'OWNER_ID' => $ownerId
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}