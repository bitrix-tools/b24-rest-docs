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

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Пример самодостаточный: он создаёт товар с ценой и заказ, добавляет позицию
    // с ручной ценой, показывает её и убирает за собой. Запускается на любом
    // портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"errors"
    	"fmt"
    	"log"
    	"os"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: товар с ценой и пустой заказ

    	iblockID, err := firstCatalog(ctx, core)
    	if err != nil {
    		return err
    	}
    	productID, err := addProduct(ctx, core, iblockID, "Пример позиции (b24gosdk)")
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "catalog.product.delete", productID)

    	if err := addPrice(ctx, core, productID, 1030); err != nil {
    		return err
    	}
    	orderID, err := addOrder(ctx, core)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "sale.order.delete", orderID)

    	// --- собственно сценарий страницы

    	// Цена задаётся вручную, поэтому customPrice = "Y". Наценка выражается
    	// ОТРИЦАТЕЛЬНЫМ discountPrice: базовая цена 1030, продаём за 1100.
    	res, err := core.Call(ctx, "sale.basketitem.add", b24.Params{
    		"fields": b24.Params{
    			"orderId":       orderID,
    			"productId":     productID,
    			"quantity":      4,
    			"currency":      "RUB",
    			"price":         1100,
    			"discountPrice": -70,
    			"customPrice":   "Y",
    		},
    	})
    	if err != nil {
    		// Код ошибки сравнивается через errors.Is, а не строкой: опечатка в
    		// литерале скомпилируется и молча уведёт в другую ветку.
    		if errors.Is(err, b24.ErrAccessDenied) {
    			return fmt.Errorf("вебхуку не хватает прав на sale: %w", err)
    		}
    		return fmt.Errorf("sale.basketitem.add: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом basketItem.
    	raw, ok := b24.Unwrap(res.Result, "basketItem")
    	if !ok {
    		return fmt.Errorf("в ответе нет basketItem: %s", res.Result)
    	}
    	var item struct {
    		ID        b24.ID  `json:"id"`
    		Quantity  float64 `json:"quantity"`
    		Price     float64 `json:"price"`
    		BasePrice float64 `json:"basePrice"`
    	}
    	if err := json.Unmarshal(raw, &item); err != nil {
    		return fmt.Errorf("разбор позиции: %w", err)
    	}

    	fmt.Printf("позиция %d: %.0f x %.2f при базовой цене %.2f\n",
    		item.ID, item.Quantity, item.Price, item.BasePrice)
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    func firstCatalog(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	res, err := core.Call(ctx, "catalog.catalog.list", b24.Params{
    		"filter": b24.Params{"iblockTypeId": "CRM_PRODUCT_CATALOG"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return 0, fmt.Errorf("catalog.catalog.list: %w", err)
    	}
    	var out struct {
    		Catalogs []struct {
    			IblockID b24.ID `json:"iblockId"`
    		} `json:"catalogs"`
    	}
    	if err := json.Unmarshal(res.Result, &out); err != nil {
    		return 0, err
    	}
    	if len(out.Catalogs) == 0 {
    		return 0, fmt.Errorf("на портале нет торгового каталога")
    	}
    	return out.Catalogs[0].IblockID, nil
    }

    func addProduct(ctx context.Context, core *b24.Core, iblockID b24.ID, name string) (b24.ID, error) {
    	res, err := core.Call(ctx, "catalog.product.add", b24.Params{
    		"fields": b24.Params{"iblockId": iblockID, "name": name, "active": "Y"},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("catalog.product.add: %w", err)
    	}
    	// add отвечает ключом element, а get — ключом product для той же сущности.
    	raw, ok := b24.Unwrap(res.Result, "element", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет element.id в %s", res.Result)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(raw, &id)
    }

    func addPrice(ctx context.Context, core *b24.Core, productID b24.ID, price float64) error {
    	res, err := core.Call(ctx, "catalog.priceType.list", nil, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("catalog.priceType.list: %w", err)
    	}
    	var types struct {
    		PriceTypes []struct {
    			ID b24.ID `json:"id"`
    		} `json:"priceTypes"`
    	}
    	if err := json.Unmarshal(res.Result, &types); err != nil {
    		return err
    	}
    	if len(types.PriceTypes) == 0 {
    		return fmt.Errorf("на портале нет типов цен")
    	}
    	_, err = core.Call(ctx, "catalog.price.add", b24.Params{
    		"fields": b24.Params{
    			"productId": productID, "catalogGroupId": types.PriceTypes[0].ID,
    			"price": price, "currency": "RUB",
    		},
    	})
    	return err
    }

    func addOrder(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	res, err := core.Call(ctx, "sale.persontype.list", nil, b24.WithIdempotent())
    	if err != nil {
    		return 0, fmt.Errorf("sale.persontype.list: %w", err)
    	}
    	var types struct {
    		PersonTypes []struct {
    			ID b24.ID `json:"id"`
    		} `json:"personTypes"`
    	}
    	if err := json.Unmarshal(res.Result, &types); err != nil {
    		return 0, err
    	}
    	if len(types.PersonTypes) == 0 {
    		return 0, fmt.Errorf("на портале нет типов плательщика")
    	}

    	res, err = core.Call(ctx, "sale.order.add", b24.Params{
    		"fields": b24.Params{
    			"lid": "s1", "personTypeId": types.PersonTypes[0].ID, "currency": "RUB",
    		},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("sale.order.add: %w", err)
    	}
    	raw, ok := b24.Unwrap(res.Result, "order", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет order.id в %s", res.Result)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(raw, &id)
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна маскировать настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, id b24.ID) {
    	if _, err := core.Call(ctx, method, b24.Params{"id": id}); err != nil {
    		fmt.Fprintf(os.Stderr, "%s(%d): %v\n", method, id, err)
    	}
    }
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
