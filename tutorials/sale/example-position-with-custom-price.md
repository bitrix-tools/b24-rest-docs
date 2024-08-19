# Создать позицию с товаром из каталога в количестве 4 единиц с произвольной ценой

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"quantity":4,"productId":6544,"currency":"RUB","price":1100,"discountPrice":-1070,"customPrice":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"quantity":4,"productId":6544,"currency":"RUB","price":1100,"discountPrice":-1070,"customPrice":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.add
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.basketitem.add",
        {
            fields: { // минимальный набор необходимых полей
                orderId: 5147,
                quantity: 4,
                productId: 6544,
                currency: 'RUB',
                price: 1100,
                discountPrice: -1070, // цена в каталоге – 30 р., указываем наценку
                customPrice: 'Y',
            }
        },
    )
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result.data());
                }
            },
            function(error)
            {
                console.info(error);
            }
        );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.basketitem.add',
        [
            'fields' =>
            [
                'orderId' => 5147,
                'quantity' => 4,
                'productId' => 6544,
                'currency' => 'RUB',
                'price' => 1100,
                'discountPrice' => -1070,
                'customPrice' => 'Y',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Результат

```json
{
    "result": {
        "basketItem": {
            "basePrice": 30,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-1C-CATALOG",
            "currency": "RUB",
            "customPrice": "Н",
            "dateInsert": "2024-04-23T15:59:37+02:00",
            "dateUpdate": "2024-04-23T15:59:37+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": -1070,
            "id": 6790,
            "measureCode": "768",
            "measureName": "шт",
            "name": "Товар",
            "orderId": 5147,
            "price": 1000,
            "productId": 1245,
            "productXmlId": "1245",
            "properties": [],
            "quantity": 1,
            "reservations": [],
            "sort": 100,
            "vatIncluded": "N",
            "vatRate": null,
            "weight": 0,
            "xmlId": "bx_6627bec8c4fdc"
        }
    },
    "total": 1,
    "time": {
        "start": 1713880776.108755,
        "finish": 1713880777.704221,
        "duration": 1.595465898513794,
        "processing": 0.973701000213623,
        "date_start": "2024-04-23T15:59:36+02:00",
        "date_finish": "2024-04-23T15:59:37+02:00",
        "operating": 0
    }
}
```