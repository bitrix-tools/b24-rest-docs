# Получить список оплат crm.item.payment.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на чтение объекта CRM, из которого выбираются оплаты

Метод получает список оплат конкретного объекта CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../../../api-reference/data-types.md) | Идентификатор объекта CRM ||
|| **entityTypeId***
[`integer`](../../../../api-reference/data-types.md) | Идентификатор [`типа объекта CRM`](../../data-types.md#object_type)  ||
|| **filter**
[`object`](../../../../api-reference/data-types.md) | Дополнительный фильтр для случаев, когда нужно получить не все оплаты сущности, а по какому-то более специфичному фильтру.
Описание формата приведено в параметре **filter** метода [`sale.payment.list`](../../../sale/payment/sale-payment-list.md)  ||
|| **order**
[`object`](../../../../api-reference/data-types.md) | Описание формата приведено в параметре **order** метода [`sale.payment.list`](../../../sale/payment/sale-payment-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13123,"entityTypeId":2,"filter":{"@id":[1036,1037]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13123,"entityTypeId":2,"filter":{"@id":[1036,1037]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.payment.list',
        {
          entityId: 13123,
          entityTypeId: 2,
          filter: {
            "@id": [1036, 1037]
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
      const generator = $b24.fetchListMethod('crm.item.payment.list', {
        entityId: 13123,
        entityTypeId: 2,
        filter: {
          "@id": [1036, 1037]
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
      const response = await $b24.callMethod('crm.item.payment.list', {
        entityId: 13123,
        entityTypeId: 2,
        filter: {
          "@id": [1036, 1037]
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
                'crm.item.payment.list',
                [
                    'entityId'     => 13123,
                    'entityTypeId' => 2,
                    'filter'       => [
                        "@id" => [1036, 1037]
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.list', {
            entityId: 13123,
            entityTypeId: 2,
            filter: {
                "@id": [1036, 1037]
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
        'crm.item.payment.list',
        [
            'entityId' => 13123,
            'entityTypeId' => 2,
            'filter' => [
                '@id' => [1036, 1037]
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
         "id":1036,
         "accountNumber":"3653\/1",
         "paid": "Y",
         "datePaid":"2024-05-20T12:32:02+03:00",
         "empPaidId":1,
         "paySystemId":6,
         "sum":0,
         "currency":"RUB",
         "paySystemName":"Наличные"
      },
      {
         "id":1037,
         "accountNumber":"3653\/2",
         "paid": "N",
         "datePaid":null,
         "empPaidId":null,
         "paySystemId":6,
         "sum":0,
         "currency":"RUB",
         "paySystemName":"Наличные"
      }
   ],
   "time":{
      "start":1716205783.285524,
      "finish":1716205783.702053,
      "duration":0.41652917861938477,
      "processing":0.15817594528198242,
      "date_start":"2024-05-20T14:49:43+03:00",
      "date_finish":"2024-05-20T14:49:43+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_payment_crm_simple[]`](crm-item-payment-get.md#sale_order_payment_crm_simple) | Массив объектов, содержащий краткую информацию о выбранных оплатах  ||
|| **time**
[`time`](../../../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
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

- [{#T}](./crm-item-payment-update.md)
- [{#T}](./crm-item-payment-delete.md)
- [{#T}](./crm-item-payment-get.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-add.md)
- [{#T}](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-set-paid-date-to-deal.md)