# Получить список доставок объекта CRM crm.item.delivery.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта crm, из которого выбираются доставки

Метод получает список доставок конкретного объекта crm.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор объекта crm ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор [`типа объекта crm`](../../data-types.md#тип-объекта-crm)  ||
|| **filter**
[`object`](../../../data-types.md) | Дополнительный фильтр для случаев, когда нужно получить не все доставки объекта crm, а по какому-то более специфичному фильтру. 
Формат параметра `filter` соответствует описанному в методе [`sale.shipment.list`](../../../sale/shipment/sale-shipment-list.md) ||
|| **order**
[`object`](../../../data-types.md) | Формат параметра `order` соответствует описанному в методе [`sale.shipment.list`](../../../sale/shipment/sale-shipment-list.md) ||

|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13127,"entityTypeId":2,"filter":{"@id":[4077,4078]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.delivery.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13127,"entityTypeId":2,"filter":{"@id":[4077,4078]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.delivery.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.delivery.list',
        {
          entityId: 13127,
          entityTypeId: 2,
          filter: {
            "@id": [4077, 4078]
          }
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.item.delivery.list', {
        entityId: 13127,
        entityTypeId: 2,
        filter: {
          "@id": [4077, 4078]
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.item.delivery.list', {
        entityId: 13127,
        entityTypeId: 2,
        filter: {
          "@id": [4077, 4078]
        }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.delivery.list',
                [
                    'entityId'     => 13127,
                    'entityTypeId' => 2,
                    'filter'       => [
                        '@id' => [4077, 4078]
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching delivery list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.delivery.list', {
            entityId: 13127,
            entityTypeId: 2,
            filter: {
                "@id": [4077, 4078]
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.delivery.list',
        [
            'entityId' => 13127,
            'entityTypeId' => 2,
            'filter' => [
                "@id" => [4077, 4078]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":[
      {
         "id":4077,
         "accountNumber":"3657\/2",
         "deducted":"N",
         "dateDeducted":null,
         "deliveryId":228,
         "priceDelivery":79.99,
         "currency":"RUB",
         "deliveryName":"Uber Taxi (Cargo)"
      },
      {
         "id":4078,
         "accountNumber":"3657\/3",
         "deducted":"N",
         "dateDeducted":null,
         "deliveryId":228,
         "priceDelivery":79.99,
         "currency":"RUB",
         "deliveryName":"Uber Taxi (Cargo)"
      }
   ],
   "time":{
      "start":1716369036.246855,
      "finish":1716369036.734466,
      "duration":0.4876110553741455,
      "processing":0.18442106246948242,
      "date_start":"2024-05-22T12:10:36+03:00",
      "date_finish":"2024-05-22T12:10:36+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_shipment_crm_simple`](./crm-item-delivery-get.md#sale_order_shipment_crm_simple) | Массив объектов, содержащий краткую информацию о выбранных доставках ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Недостаточно прав"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `0` | Доступ запрещен ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-delivery-get.md)
