# Создать позицию с товаром из каталога в количестве 4 единиц с произвольной ценой

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
    -d '{"fields":{"orderId":5147,"quantity":4,"productId":6544,"currency":"RUB","price":1100,"discountPrice":-1070,"customPrice":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.basketitem.add
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
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'sale.basketitem.add',
        params: {
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
        'quantity' => 4,
        'productId' => 6544,
        'currency' => 'RUB',
        'price' => 1100,
        'discountPrice' => -1070,
        'customPrice' => 'Y',
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
                "quantity": 4,
                "productId": 6544,
                "currency": "RUB",
                "price": 1100,
                "discountPrice": -1070,
                "customPrice": "Y",
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
