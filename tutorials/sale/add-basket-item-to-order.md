# Как добавить позицию в заказ с произвольной ценой

> Scope: [`sale`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «администратор»
>
> - [sale.basketitem.add](../../api-reference/sale/basket-item/sale-basket-item-add.md) и [sale.order.get](../../api-reference/sale/order/sale-order-get.md) — администратор
> - [sale.basketitem.list](../../api-reference/sale/basket-item/sale-basket-item-list.md) — менеджер магазина

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Позиция корзины — это строка заказа: товар или услуга с количеством, ценой и валютой. Метод [sale.basketitem.add](../../api-reference/sale/basket-item/sale-basket-item-add.md) добавляет такую строку в уже созданный заказ.

Разберем два случая, когда цену задает интеграция, а не каталог:

- товар есть в каталоге, но продать его нужно по другой цене — со скидкой или с наценкой
- позиции нет в каталоге: разовая услуга, работа по договору, доставка

Оба случая закрывает один и тот же метод, отличается только набор полей. Если цену менять не нужно и она должна прийти из каталога, используйте [sale.basketitem.addCatalogProduct](../../api-reference/sale/basket-item/sale-basket-item-add-catalog-product.md) — он сам подставит цену и характеристики товара.

Сценарий состоит из двух шагов, и они независимы. Выполните тот, который подходит вашей задаче, или оба подряд — как в примерах ниже.

1. Добавим товар из каталога и назначим свою цену методом [sale.basketitem.add](../../api-reference/sale/basket-item/sale-basket-item-add.md)
2. Добавим позицию, которой нет в каталоге, тем же методом с другим набором полей

Результат обоих шагов проверим методами [sale.basketitem.list](../../api-reference/sale/basket-item/sale-basket-item-list.md) и [sale.order.get](../../api-reference/sale/order/sale-order-get.md).

## Подготовим данные

До первого вызова соберите значения.

- `orderId` — идентификатор заказа, в который добавляется позиция. Заказ должен существовать: метод только добавляет в него строку. Список заказов вернет [sale.order.list](../../api-reference/sale/order/sale-order-list.md), а создать новый заказ можно методом [sale.order.add](../../api-reference/sale/order/sale-order-add.md). В примерах используется заказ `891`
- `currency` — валюта позиции. Она должна совпадать с валютой заказа, иначе метод вернет ошибку. В примерах используется валюта `RUB`
- `productId` — идентификатор товара из каталога. Найти его можно методом [catalog.product.list](../../api-reference/catalog/product/catalog-product-list.md). В примерах используется товар `7075`. Для позиции, которой нет в каталоге, передайте `0`

Идентификаторы `891` и `7075` — значения из примеров. Замените их на свои.

Полный список полей позиции вернет метод [sale.basketitem.getFields](../../api-reference/sale/basket-item/sale-basket-item-get-fields.md).

### Как назначить цену вручную

За ручную цену отвечают четыре поля.

- `customPrice` — признак того, что цену задает интеграция. Со значением `Y` данные каталога игнорируются
- `basePrice` — исходная цена без скидки и наценки
- `price` — итоговая цена, по которой продаете
- `discountPrice` — величина скидки или наценки

Три числовых поля связаны условием `basePrice = price + discountPrice`. Скидка — это положительный `discountPrice`, наценка — отрицательный. Например, товар стоит в каталоге 1030, а продать его нужно за 1100: наценка равна 70, поэтому `discountPrice` = -70.

{% note warning "" %}

Метод не проверяет это условие и сохранит любые три числа, которые вы передали. Посчитайте их сами, иначе в заказе будет показана неверная скидка.

{% endnote %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## 1\. Добавим товар из каталога и назначим свою цену

Передадим идентификатор товара в `productId` и зададим цену вручную. Название, единицу измерения и внешние коды метод возьмет из карточки товара.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'sale.basketitem.add',
        params: {
            fields: {
                orderId: 891,
                productId: 7075,
                quantity: 4,
                currency: 'RUB',
                customPrice: 'Y', // цену задаем сами, каталожная не применяется
                basePrice: 1030, // цена товара в каталоге
                price: 1100, // цена продажи
                discountPrice: -70, // наценка, поэтому значение отрицательное
            }
        },
        requestId: 'basketitem-add-catalog'
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
        'orderId' => 891,
        'productId' => 7075,
        'quantity' => 4,
        'currency' => 'RUB',
        'customPrice' => 'Y', // цену задаем сами, каталожная не применяется
        'basePrice' => 1030, // цена товара в каталоге
        'price' => 1100, // цена продажи
        'discountPrice' => -70, // наценка, поэтому значение отрицательное
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
                "orderId": 891,
                "productId": 7075,
                "quantity": 4,
                "currency": "RUB",
                "customPrice": "Y",  # цену задаем сами, каталожная не применяется
                "basePrice": 1030,  # цена товара в каталоге
                "price": 1100,  # цена продажи
                "discountPrice": -70,  # наценка, поэтому значение отрицательное
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
    //	export B24_WEBHOOK_URL='https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/' && go run .
    //
    // Пример самодостаточный: он создает товар с ценой и заказ, добавляет позицию
    // с ручной ценой, показывает ее и убирает за собой. Запускается на любом
    // Битрикс24, ничего править не нужно.
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

    	// --- собственно сценарий шага

    	// Цена задается вручную, поэтому customPrice = "Y". Наценка выражается
    	// ОТРИЦАТЕЛЬНЫМ discountPrice: базовая цена 1030, продаем за 1100.
    	res, err := core.Call(ctx, "sale.basketitem.add", b24.Params{
    		"fields": b24.Params{
    			"orderId":       orderID,
    			"productId":     productID,
    			"quantity":      4,
    			"currency":      "RUB",
    			"customPrice":   "Y",
    			"basePrice":     1030,
    			"price":         1100,
    			"discountPrice": -70,
    		},
    	})
    	if err != nil {
    		// Код ошибки сравнивается через errors.Is, а не строкой: опечатка в
    		// литерале скомпилируется и молча уведет в другую ветку.
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
    		return 0, fmt.Errorf("в Битрикс24 нет торгового каталога")
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
    		return fmt.Errorf("в Битрикс24 нет типов цен")
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
    		return 0, fmt.Errorf("в Битрикс24 нет типов плательщика")
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

Ответ:

```json
{
    "result": {
        "basketItem": {
            "barcodeMulti": "N",
            "basePrice": 1030,
            "canBuy": "Y",
            "catalogXmlId": "FUTURE-ERP-CATALOG",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2026-08-18T09:12:34+03:00",
            "dateUpdate": "2026-08-18T09:12:34+03:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";N;s:6:\"HEIGHT\";N;s:6:\"LENGTH\";N;}",
            "discountPrice": -70,
            "id": 1173,
            "measureCode": "796",
            "measureName": "шт",
            "name": "Кофемашина",
            "orderId": 891,
            "price": 1100,
            "productId": 7075,
            "productXmlId": "7075",
            "properties": [],
            "quantity": 4,
            "reservations": [],
            "sort": 100,
            "vatIncluded": "N",
            "vatRate": null,
            "weight": 0,
            "xmlId": "bx_6a8405e2d0998"
        }
    },
    "total": 1,
    "time": {
        "start": 1787037154,
        "finish": 1787037155.489497,
        "duration": 1.4894969463348389,
        "processing": 1,
        "date_start": "2026-08-18T10:12:34+03:00",
        "date_finish": "2026-08-18T10:12:35+03:00",
        "operating_reset_at": 1787037225,
        "operating": 4.078084945678711
    }
}
```

Название `name`, единица измерения `measureCode` и `measureName`, внешние коды `catalogXmlId` и `productXmlId` пришли из карточки товара. Сохраните `id` позиции — он лежит в `result.basketItem.id`. Этот идентификатор передается в параметр `id` методов [sale.basketitem.update](../../api-reference/sale/basket-item/sale-basket-item-update.md) и [sale.basketitem.delete](../../api-reference/sale/basket-item/sale-basket-item-delete.md), если строку нужно изменить или удалить.

## 2\. Добавим позицию, которой нет в каталоге

Для разовой услуги или работы по договору товара в каталоге нет, поэтому передадим `productId: 0` и заполним характеристики сами.

- `name` — название позиции. Метод не потребует это поле, но без него строка заказа останется без названия
- `measureCode` и `measureName` — код и обозначение единицы измерения. Код `796` — это штука по классификатору ОКЕИ. Единицы измерения, настроенные в Битрикс24, вернет метод [catalog.measure.list](../../api-reference/catalog/measure/catalog-measure-list.md)
- `weight` — вес позиции
- `dimensions` — габариты позиции сериализованным массивом
- `vatRate` — ставка налога долей от единицы: `0.1` — это 10 %. Чтобы указать ставку «Без НДС», передайте пустую строку
- `vatIncluded` — включен ли налог в цену
- `canBuy` — доступна ли позиция к покупке
- `sort` — положение строки в списке позиций заказа
- `xmlId` и `productXmlId` — внешние коды позиции и товара. По ним удобно связывать строку заказа с записью в вашей системе

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'sale.basketitem.add',
        params: {
            fields: {
                orderId: 891,
                productId: 0, // позиции нет в каталоге
                name: 'Настройка оборудования',
                quantity: 2,
                currency: 'RUB',
                customPrice: 'Y',
                basePrice: 1000, // цена без скидки
                price: 900, // цена продажи
                discountPrice: 100, // скидка, поэтому значение положительное
                canBuy: 'Y',
                weight: 40,
                measureCode: '796',
                measureName: 'шт',
                sort: 400,
                xmlId: 'service-setup-1',
                dimensions: 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}', // сериализованный массив
                vatRate: 0.1, // ставка 10 %
                vatIncluded: 'Y',
                productXmlId: 'service-setup',
            }
        },
        requestId: 'basketitem-add-custom'
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
        'orderId' => 891,
        'productId' => 0, // позиции нет в каталоге
        'name' => 'Настройка оборудования',
        'quantity' => 2,
        'currency' => 'RUB',
        'customPrice' => 'Y',
        'basePrice' => 1000, // цена без скидки
        'price' => 900, // цена продажи
        'discountPrice' => 100, // скидка, поэтому значение положительное
        'canBuy' => 'Y',
        'weight' => 40,
        'measureCode' => '796',
        'measureName' => 'шт',
        'sort' => 400,
        'xmlId' => 'service-setup-1',
        'dimensions' => 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}', // сериализованный массив
        'vatRate' => 0.1, // ставка 10 %
        'vatIncluded' => 'Y',
        'productXmlId' => 'service-setup',
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
                "orderId": 891,
                "productId": 0,  # позиции нет в каталоге
                "name": "Настройка оборудования",
                "quantity": 2,
                "currency": "RUB",
                "customPrice": "Y",
                "basePrice": 1000,  # цена без скидки
                "price": 900,  # цена продажи
                "discountPrice": 100,  # скидка, поэтому значение положительное
                "canBuy": "Y",
                "weight": 40,
                "measureCode": "796",
                "measureName": "шт",
                "sort": 400,
                "xmlId": "service-setup-1",
                "dimensions": 'a:3:{s:5:"WIDTH";i:244;s:6:"HEIGHT";i:100;s:6:"LENGTH";i:31;}',  # сериализованный массив
                "vatRate": 0.1,  # ставка 10 %
                "vatIncluded": "Y",
                "productXmlId": "service-setup",
            },
        ).response.result
        print(result)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

Ответ:

```json
{
    "result": {
        "basketItem": {
            "basePrice": 1000,
            "canBuy": "Y",
            "currency": "RUB",
            "customPrice": "Y",
            "dateInsert": "2026-08-18T09:13:24+03:00",
            "dateUpdate": "2026-08-18T09:13:24+03:00",
            "dimensions": "a:3:{s:5:\"WIDTH\";i:244;s:6:\"HEIGHT\";i:100;s:6:\"LENGTH\";i:31;}",
            "discountPrice": 100,
            "id": 1175,
            "measureCode": "796",
            "measureName": "шт",
            "name": "Настройка оборудования",
            "orderId": 891,
            "price": 900,
            "productId": 0,
            "productXmlId": "service-setup",
            "properties": [],
            "quantity": 2,
            "reservations": [],
            "sort": 400,
            "vatIncluded": "Y",
            "vatRate": 0.1,
            "weight": 40,
            "xmlId": "service-setup-1"
        }
    },
    "total": 1,
    "time": {
        "start": 1787037204,
        "finish": 1787037204.794355,
        "duration": 0.7943549156188965,
        "processing": 0,
        "date_start": "2026-08-18T10:13:24+03:00",
        "date_finish": "2026-08-18T10:13:24+03:00",
        "operating_reset_at": 1787037427,
        "operating": 3.351419687271118
    }
}
```

В ответе нет полей `catalogXmlId` и `barcodeMulti`: у позиции без товара нет карточки в каталоге, откуда их можно взять. Значение `productId: 0` подтверждает, что строка не связана с каталогом.

## Проверим результат

Позиции заказа вернет метод [sale.basketitem.list](../../api-reference/sale/basket-item/sale-basket-item-list.md). Отфильтруем их по идентификатору заказа. В примерах используется тот же клиент SDK, что и на предыдущих шагах, — инициализация не повторяется.

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'sale.basketitem.list',
        params: {
            select: ['id', 'productId', 'name', 'quantity', 'basePrice', 'price', 'discountPrice', 'customPrice'],
            filter: { '=orderId': 891 }
        },
        requestId: 'basketitem-list'
    })

    if (response.isSuccess) {
        console.log(response.getData().result.basketItems)
    } else {
        console.error(response.getErrorMessages().join('; '))
    }
    ```

- PHP

    ```php
    $result = $sb->getSaleScope()->basketItem()->list(
        ['id', 'productId', 'name', 'quantity', 'basePrice', 'price', 'discountPrice', 'customPrice'],
        ['=orderId' => 891]
    );

    echo '<PRE>';
    print_r($result->getBasketItems());
    echo '</PRE>';
    ```

- Python

    ```python
    try:
        result = client.sale.basketitem.list(
            select=["id", "productId", "name", "quantity", "basePrice", "price", "discountPrice", "customPrice"],
            filter={"=orderId": 891},
        ).response.result
        print(result)
    except BitrixAPIError as error:
        print(error)
    ```

{% endlist %}

Ответ:

```json
{
    "result": {
        "basketItems": [
            {
                "basePrice": 1030,
                "customPrice": "Y",
                "discountPrice": -70,
                "id": 1173,
                "name": "Кофемашина",
                "price": 1100,
                "productId": 7075,
                "quantity": 4
            },
            {
                "basePrice": 1000,
                "customPrice": "Y",
                "discountPrice": 100,
                "id": 1175,
                "name": "Настройка оборудования",
                "price": 900,
                "productId": 0,
                "quantity": 2
            }
        ]
    },
    "total": 2
}
```

Обе строки на месте, цены и количество совпадают с тем, что вы передали, а `customPrice: "Y"` подтверждает, что каталожная цена не применялась.

Сумму заказа и налог покажет метод [sale.order.get](../../api-reference/sale/order/sale-order-get.md). Для двух позиций из примеров в ответе будут значения:

```json
{
    "price": 6200,
    "taxValue": 163.63636364
}
```

Сумма 6200 — это 4 × 1100 плюс 2 × 900. Налог 163.64 — это 10 % от 1800: столько стоит вторая позиция, для которой мы передали `vatRate: 0.1`. Если бы значение поля было `10`, Битрикс24 посчитал бы ставку 1000 %.

В интерфейсе результат виден в карточке заказа: новые строки появятся в списке товаров.

## Если метод вернул ошибку

Проверьте данные запроса.

- `0` — `Required fields: orderId` — не передан обязательный `orderId`
- `200140400009` — `Order not found` — заказа с таким идентификатором нет. Проверьте `orderId` методом [sale.order.list](../../api-reference/sale/order/sale-order-list.md)
- `200140400011` — `Currency must be the currency of the order` — валюта позиции не совпадает с валютой заказа. Возьмите валюту из поля `currency` заказа
- `200140400007` — `basket item is not saved - bad data` — позицию не удалось сохранить. Проверьте набор полей методом [sale.basketitem.getFields](../../api-reference/sale/basket-item/sale-basket-item-get-fields.md)

Первые три ошибки метод возвращает до записи в заказ, поэтому исправьте данные и повторите вызов целиком. После ошибки `200140400007` сначала посмотрите позиции заказа методом [sale.basketitem.list](../../api-reference/sale/basket-item/sale-basket-item-list.md): проверка выполняется уже после сохранения заказа.

## Что важно учитывать

- метод не ищет дубликаты: повторный вызов с теми же полями добавит в заказ еще одну строку, а не изменит существующую. Чтобы изменить строку, используйте [sale.basketitem.update](../../api-reference/sale/basket-item/sale-basket-item-update.md)
- достаточно передать `price`, чтобы позиция перешла на ручную цену: Битрикс24 сам выставит `customPrice: "Y"`. Если цена должна остаться каталожной, не передавайте `price`
- `vatRate` задается долей, а не процентами: значение `0.1` — это ставка 10 %
- позиция с `productId: 0` не связана с каталогом. Название, единицу измерения, вес, габариты и ставку налога Битрикс24 неоткуда взять, поэтому передавайте их в каждом вызове

## Продолжите изучение

- [{#T}](../../api-reference/sale/basket-item/sale-basket-item-add.md)
- [{#T}](../../api-reference/sale/basket-item/sale-basket-item-add-catalog-product.md)
- [{#T}](../../api-reference/sale/basket-item/sale-basket-item-update.md)
- [{#T}](../../api-reference/sale/basket-item/sale-basket-item-get-fields.md)
- [{#T}](../../api-reference/sale/data-types.md)
