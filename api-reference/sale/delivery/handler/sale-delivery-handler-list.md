# Получить список обработчиков служб доставки sale.delivery.handler.list

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод получает список обработчиков служб доставки. 

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PARENT_ID","NAME","ACTIVE","DESCRIPTION","SORT","LOGOTIP","CURRENCY"],"FILTER":{"@ID":[196,197,198]},"ORDER":{"SORT":"ASC","ID":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PARENT_ID","NAME","ACTIVE","DESCRIPTION","SORT","LOGOTIP","CURRENCY"],"FILTER":{"@ID":[196,197,198]},"ORDER":{"SORT":"ASC","ID":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.getlist
    ```

- JS

    ```js
    BX24.callMethod(
        'sale.delivery.handler.list', {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.delivery.getlist',
        [
            'SELECT' => [
                "ID",
                "PARENT_ID",
                "NAME",
                "ACTIVE",
                "DESCRIPTION",
                "SORT",
                "LOGOTIP",
                "CURRENCY",
            ],
            'FILTER' => [
                "@ID" => [196, 197, 198],
            ],
            'ORDER' => [
                "SORT" => "ASC",
                "ID" => "DESC",
            ]
        ]
    );
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":[
      {
         "ID":"14",
         "NAME":"Uber",
         "CODE":"uber",
         "SORT":"250",
         "DESCRIPTION":"Uber Description",
         "SETTINGS":{
            "CALCULATE_URL":"http:\/\/gateway.bx\/calculate.php",
            "CREATE_DELIVERY_REQUEST_URL":"http:\/\/gateway.bx\/create_delivery_request.php",
            "CANCEL_DELIVERY_REQUEST_URL":"http:\/\/gateway.bx\/cancel_delivery_request.php",
            "HAS_CALLBACK_TRACKING_SUPPORT":"Y",
            "CONFIG":[
               {
                  "TYPE":"STRING",
                  "NAME":"String Example",
                  "CODE":"SETTING_1"
               },
               {
                  "TYPE":"Y\/N",
                  "NAME":"Checkbox Example",
                  "CODE":"SETTING_2"
               },
               {
                  "TYPE":"NUMBER",
                  "NAME":"Number Example",
                  "CODE":"SETTING_3"
               },
               {
                  "TYPE":"ENUM",
                  "NAME":"Enum Example",
                  "OPTIONS":{
                     "Option1Code":"Option1Value",
                     "Option2Code":"Option2Value",
                     "Option3Code":"Option3Value",
                     "Option4Code":"Option4Value",
                     "Option5Code":"Option5Value"
                  },
                  "CODE":"SETTING_4"
               },
               {
                  "TYPE":"DATE",
                  "NAME":"Date Example",
                  "CODE":"SETTING_5"
               },
               {
                  "TYPE":"LOCATION",
                  "NAME":"Location Example",
                  "CODE":"SETTING_6"
               }
            ]
         },
         "PROFILES":[
            {
               "NAME":"Taxi",
               "DESCRIPTION":"Taxi Delivery",
               "CODE":"TAXI"
            },
            {
               "NAME":"Cargo",
               "DESCRIPTION":"Cargo Delivery",
               "CODE":"CARGO"
            }
         ]
      }
   ],
   "time":{
      "start":1713872315.334967,
      "finish":1713872315.655173,
      "duration":0.3202061653137207,
      "processing":0.013887882232666016,
      "date_start":"2024-04-23T14:38:35+03:00",
      "date_finish":"2024-04-23T14:38:35+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_delivery_handler[]`](../../data-types.md) | Массив объектов с информацией о выбранных обработчиках служб доставки  ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
   "error":"ACCESS_DENIED",
   "error_description":"Access denied!"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для получения списка служб доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-handler-add.md)
- [{#T}](./sale-delivery-handler-delete.md)
- [{#T}](./sale-delivery-handler-update.md)