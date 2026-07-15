# Создать позицию с товаром, которого не существует на сайте (2 шт по цене 900 руб)

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"productId":0,"name":"Пробный товар","quantity":2,"basePrice":1000,"price":900,"discountPrice":100,"customPrice":"Y","canBuy":"Y","weight":40,"measureCode":"768","measureName":"шт","sort":400,"xmlId":"BasketPositionId","dimensions":"a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}","vatRate":10,"vatIncluded":"Y","productXmlId":"ProductKey","currency":"RUB"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":5147,"productId":0,"name":"Пробный товар","quantity":2,"basePrice":1000,"price":900,"discountPrice":100,"customPrice":"Y","canBuy":"Y","weight":40,"measureCode":"768","measureName":"шт","sort":400,"xmlId":"BasketPositionId","dimensions":"a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}","vatRate":10,"vatIncluded":"Y","productXmlId":"ProductKey","currency":"RUB"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketitem.add
    ```

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'sale.basketitem.add',
        params: {
            fields: { // заполнены все поля
                orderId: 5147,
                productId: 0,
                name: 'Пробный товар',
                quantity: 2,
                basePrice: 1000,
                price: 900,
                discountPrice: 100,
                customPrice: 'Y',
                canBuy: 'Y',
                weight: 40,
                measureCode: '768',
                measureName: 'шт',
                sort: 400,
                xmlId: 'BasketPositionId',
                dimensions: 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}', // сериализованный массив
                vatRate: 10,
                vatIncluded: 'Y',
                productXmlId: 'ProductKey',
                currency: 'RUB',
            }
        },
        requestId: 'basketitem-add'
    })

    if (response.isSuccess) {
        console.log(response.getData().result)
    } else {
        console.error(response.getErrorMessages().join('; '))
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $result = $sb->getSaleScope()->basketItem()->add([
        'orderId' => 5147,
        'productId' => 0,
        'name' => 'Пробный товар',
        'quantity' => 2,
        'basePrice' => 1000,
        'price' => 900,
        'discountPrice' => 100,
        'customPrice' => 'Y',
        'canBuy' => 'Y',
        'weight' => 40,
        'measureCode' => '768',
        'measureName' => 'шт',
        'sort' => 400,
        'xmlId' => 'BasketPositionId',
        'dimensions' => 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}',
        'vatRate' => 10,
        'vatIncluded' => 'Y',
        'productXmlId' => 'ProductKey',
        'currency' => 'RUB',
    ]);

    echo '<PRE>';
    print_r($result->getId());
    echo '</PRE>';
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    try:
        result = client.sale.basketitem.add(
            fields={
                "orderId": 5147,
                "productId": 0,
                "name": "Пробный товар",
                "quantity": 2,
                "basePrice": 1000,
                "price": 900,
                "discountPrice": 100,
                "customPrice": "Y",
                "canBuy": "Y",
                "weight": 40,
                "measureCode": "768",
                "measureName": "шт",
                "sort": 400,
                "xmlId": "BasketPositionId",
                "dimensions": 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}',
                "vatRate": 10,
                "vatIncluded": "Y",
                "productXmlId": "ProductKey",
                "currency": "RUB",
            },
        ).response.result
        print(result)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

## Результат

```json
{
    "result": {
        "basketItem": {
            "basePrice": 1000,
            "canBuy": "Y",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2024-04-23T18:51:28+02:00",
            "dateUpdate": "2024-04-23T18:51:28+02:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}",
            "discountPrice": 100,
            "id": 6791,
            "measureCode": "768",
            "measureName": "шт",
            "name": "Пробный товар",
            "orderId": 5147,
            "price": 900,
            "productId": 0,
            "productXmlId": "ProductKey",
            "properties": [],
            "quantity": 2,
            "reservations": [],
            "sort": 400,
            "vatIncluded": "Y",
            "vatRate": 10,
            "weight": 40,
            "xmlId": "BasketPositionId"
        }
    },
    "total": 1,
    "time": {
        "start": 1713891087.689427,
        "finish": 1713891089.165652,
        "duration": 1.4762251377105713,
        "processing": 0.8683149814605713,
        "date_start": "2024-04-23T18:51:27+02:00",
        "date_finish": "2024-04-23T18:51:29+02:00",
        "operating": 0
    }
}
```
