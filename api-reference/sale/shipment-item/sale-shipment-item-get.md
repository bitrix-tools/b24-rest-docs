# Получить доступ к полям элемента

> Название метода: **sale.shipmentitem.get**
>
> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentitem.get` предназначен для получения значений всех полей элемента табличной части отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_shipment_item.id`](../data-types.md) | Идентификатор элемента табличной части отгрузки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentitem.get
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentitem.get
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.shipmentitem.get", {
            "id": 7
        },
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
        'sale.shipmentitem.get',
        [
            'id' => 7
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "shipmentItem":{
            "basketId":2716,
            "dateInsert":"2024-04-11T09:10:34+03:00",
            "id":7,
            "orderDeliveryId":2431,
            "quantity":5,
            "reservedQuantity":0,
            "xmlId":"myNewXmlId"
        }
    },
    "time":{
        "start":1712819691.140072,
        "finish":1712819691.534972,
        "duration":0.394899845123291,
        "processing":0.21921396255493164,
        "date_start":"2024-04-11T10:14:51+03:00",
        "date_finish":"2024-04-11T10:14:51+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **shipmentItem**
[`sale_order_shipment_item`](../data-types.md) | Информация об элементе табличной части отгрузки ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201240400001,
    "error_description":"shipment item is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201240400001` | Элемент табличной части отгрузки не найден ||
|| `200040300010` | Недостаточно прав для чтения элемента табличной части отгрузки ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-shipment-item-add.md)
- [{#T}](./sale-shipment-item-update.md)
- [{#T}](./sale-shipment-item-list.md)
- [{#T}](./sale-shipment-item-delete.md)
- [{#T}](./sale-shipment-item-get-fields.md)