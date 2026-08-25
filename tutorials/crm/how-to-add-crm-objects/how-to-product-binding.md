# Как создать объект CRM с товарами, скидками и налогами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md), [`catalog`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
> - [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) — пользователь с правом на просмотр каталога товаров и правом на чтение инфоблока торгового каталога
> - [catalog.price.list](../../../api-reference/catalog/price/catalog-price-list.md) — пользователь с правом на просмотр каталога товаров или правом на изменение цен
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом на добавление объекта выбранного типа
> - [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) — пользователь с правом на изменение созданного объекта CRM
> - [crm.item.productrow.list](../../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md) — пользователь с правом на чтение созданного объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товарные позиции можно привязать к лиду, сделке, счету или коммерческому предложению. В примере создаем объект CRM, находим товар в каталоге, получаем его цену и сохраняем несколько товарных позиций с разными вариантами налога и скидки.

Сценарий состоит из четырех шагов.

1. Найти товар методом [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md)
2. Получить цену товара методом [catalog.price.list](../../../api-reference/catalog/price/catalog-price-list.md)
3. Создать объект CRM методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
4. Сохранить товарные позиции методом [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md)

## Подготовьте данные

Для выполнения примера нужны:

- входящий вебхук со scope `crm` и `catalog`
- идентификатор торгового каталога `iblockId`. Его можно получить методом [catalog.catalog.list](../../../api-reference/catalog/catalog/catalog-catalog-list.md)
- тип объекта CRM, к которому нужно привязать товары

#|
|| **Объект CRM** | **entityTypeId для crm.item.add** | **ownerType для crm.item.productrow.set** ||
|| Лид | `1` | `L` ||
|| Сделка | `2` | `D` ||
|| Счет | `31` | `SI` ||
|| Коммерческое предложение | `7` | `Q` ||
|#

{% note info "" %}

Для новых интеграций создавайте счета как «Счет (новый)» с `entityTypeId = 31` и `ownerType = SI`. Старый тип счета `INVOICE` оставлен для совместимости и не рекомендуется для новых сценариев.

{% endnote %}

Проверьте, какие обязательные поля настроены для выбранного типа объекта в вашем Битрикс24. Все обязательные поля нужно передать в `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

Для серверных JS-примеров с `B24Hook` нужен Node.js 20 либо 22 и выше. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1. Найдите товар в каталоге

Вызовите [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) с фильтром по `iblockId`. В `select` передайте обязательные поля `id` и `iblockId`, а также `name`, чтобы использовать название товара в диагностике.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const response = await $b24.actions.v2.call.make({ method, params })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function getProducts(iblockId) {
        const result = await call('catalog.product.list', {
            select: ['id', 'iblockId', 'name'],
            filter: {
                iblockId: iblockId,
                active: 'Y',
            },
            order: {
                id: 'ASC',
            },
            start: 0,
        })

        return result.products
    }
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook

    token = BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    )

    def call_method(method: str, params: dict):
        return token.call_method(method, params)["result"]

    def get_products(iblock_id: int):
        result = call_method("catalog.product.list", {
            "select": ["id", "iblockId", "name"],
            "filter": {
                "iblockId": iblock_id,
                "active": "Y",
            },
            "order": {
                "id": "ASC",
            },
            "start": 0,
        })

        return result["products"]
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $webhookUrl = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/';
    $b24 = ServiceBuilderFactory::createServiceBuilderFromWebhook($webhookUrl);

    function callMethod($b24, string $method, array $params): array
    {
        return $b24->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function getProducts($b24, int $iblockId): array
    {
        $result = callMethod($b24, 'catalog.product.list', [
            'select' => ['id', 'iblockId', 'name'],
            'filter' => [
                'iblockId' => $iblockId,
                'active' => 'Y',
            ],
            'order' => [
                'id' => 'ASC',
            ],
            'start' => 0,
        ]);

        return $result['products'];
    }
    ```

- Go

    ```go
    // select обязан содержать id и iblockId — без них метод отвечает ошибкой.
    // Сортировка по убыванию id ставит только что созданный товар первым: на
    // боевом портале она не нужна, здесь она делает пример быстрым.
    res, err := core.Call(ctx, "catalog.product.list", b24.Params{
    	"select": []string{"id", "iblockId", "name"},
    	"filter": b24.Params{"iblockId": iblockID},
    	"order":  b24.Params{"id": "DESC"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.list: %w", err)
    }

    // Метод отдаёт товары постранично, до 50 за раз, и заворачивает их в
    // объект с ключом products.
    var catalog struct {
    	Products []struct {
    		ID   b24.ID `json:"id"`
    		Name string `json:"name"`
    	} `json:"products"`
    }
    if err := json.Unmarshal(res.Result, &catalog); err != nil {
    	return fmt.Errorf("разбор товаров: %w", err)
    }
    if len(catalog.Products) == 0 {
    	return fmt.Errorf("в каталоге %d нет товаров", iblockID)
    }
    ```

{% endlist %}

Метод возвращает товары постранично. В примере используется первая страница, до 50 товаров. Если в вашем каталоге больше товаров, переберите страницы через параметр `start`.

Сокращенный ответ:

```json
{
    "result": {
        "products": [
            {
                "id": 1243,
                "iblockId": 23,
                "name": "Монитор"
            }
        ]
    },
    "total": 1
}
```

Сохраните `result.products[].id`. Идентификатор товара понадобится для получения цены и для параметра `productId` товарной позиции.

## 2. Получите цену товара

Цена товара хранится отдельно от карточки товара. Для каждого найденного товара вызовите [catalog.price.list](../../../api-reference/catalog/price/catalog-price-list.md) с фильтром по `productId` и выберите первую цену больше нуля.

{% list tabs %}

- JS

    ```js
    async function getFirstPrice(productId) {
        const result = await call('catalog.price.list', {
            select: ['id', 'productId', 'price', 'currency'],
            filter: {
                productId: productId,
                '>price': 0,
            },
            order: {
                id: 'ASC',
            },
            start: 0,
        })

        return result.prices[0] ?? null
    }

    async function findProductWithPrice(iblockId) {
        const products = await getProducts(iblockId)

        for (const product of products) {
            const price = await getFirstPrice(product.id)

            if (price) {
                return { product, price }
            }
        }

        throw new Error('В каталоге нет активного товара с ценой больше нуля')
    }
    ```

- Python

    ```python
    def get_first_price(product_id: int):
        result = call_method("catalog.price.list", {
            "select": ["id", "productId", "price", "currency"],
            "filter": {
                "productId": product_id,
                ">price": 0,
            },
            "order": {
                "id": "ASC",
            },
            "start": 0,
        })

        return result["prices"][0] if result["prices"] else None

    def find_product_with_price(iblock_id: int):
        for product in get_products(iblock_id):
            price = get_first_price(int(product["id"]))

            if price:
                return {
                    "product": product,
                    "price": price,
                }

        raise RuntimeError("В каталоге нет активного товара с ценой больше нуля")
    ```

- PHP

    ```php
    function getFirstPrice($b24, int $productId): ?array
    {
        $result = callMethod($b24, 'catalog.price.list', [
            'select' => ['id', 'productId', 'price', 'currency'],
            'filter' => [
                'productId' => $productId,
                '>price' => 0,
            ],
            'order' => [
                'id' => 'ASC',
            ],
            'start' => 0,
        ]);

        return $result['prices'][0] ?? null;
    }

    function findProductWithPrice($b24, int $iblockId): array
    {
        foreach (getProducts($b24, $iblockId) as $product) {
            $price = getFirstPrice($b24, (int)$product['id']);

            if ($price !== null) {
                return [
                    'product' => $product,
                    'price' => $price,
                ];
            }
        }

        throw new RuntimeException('В каталоге нет активного товара с ценой больше нуля');
    }
    ```

- Go

    ```go
    res, err := core.Call(ctx, "catalog.price.list", b24.Params{
    	"select": []string{"id", "productId", "price", "currency"},
    	"filter": b24.Params{"productId": p.ID},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.price.list: %w", err)
    }
    var prices struct {
    	Prices []struct {
    		Price    float64 `json:"price"`
    		Currency string  `json:"currency"`
    	} `json:"prices"`
    }
    if err := json.Unmarshal(res.Result, &prices); err != nil {
    	return fmt.Errorf("разбор цен: %w", err)
    }
    // Берём первую цену больше нуля: у товара может быть несколько типов
    // цен, и часть из них — нулевые.
    for _, pr := range prices.Prices {
    	if pr.Price > 0 {
    		basePrice, currency = pr.Price, pr.Currency
    		break
    	}
    }
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "prices": [
            {
                "id": 381,
                "productId": 1243,
                "price": 1000,
                "currency": "RUB"
            }
        ]
    },
    "total": 1
}
```

Сохраните `result.prices[].price` и `result.prices[].currency`. Цена понадобится для расчета товарных позиций, валюта — для поля `currencyId` создаваемого объекта CRM.

## 3. Создайте объект CRM

Вызовите [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Передайте:

- `entityTypeId` — числовой идентификатор типа объекта CRM
- `fields.title` — название объекта
- `fields.currencyId` — валюту цены из шага 2

{% list tabs %}

- JS

    ```js
    async function createCrmItem(entityTypeId, title, currency) {
        const result = await call('crm.item.add', {
            entityTypeId: entityTypeId,
            fields: {
                title: title,
                currencyId: currency,
            },
        })

        return result.item.id
    }
    ```

- Python

    ```python
    def create_crm_item(entity_type_id: int, title: str, currency: str) -> int:
        result = call_method("crm.item.add", {
            "entityTypeId": entity_type_id,
            "fields": {
                "title": title,
                "currencyId": currency,
            },
        })

        return int(result["item"]["id"])
    ```

- PHP

    ```php
    function createCrmItem($b24, int $entityTypeId, string $title, string $currency): int
    {
        $result = callMethod($b24, 'crm.item.add', [
            'entityTypeId' => $entityTypeId,
            'fields' => [
                'title' => $title,
                'currencyId' => $currency,
            ],
        ]);

        return (int)$result['item']['id'];
    }
    ```

- Go

    ```go
    res, err = core.Call(ctx, "crm.item.add", b24.Params{
    	"entityTypeId": entityTypeID,
    	"fields": b24.Params{
    		"title": "Сделка с товарами (пример b24gosdk)",
    		// Валюта берётся из цены шага 2: позиции считаются в валюте
    		// объекта, и расхождение здесь испортит суммы.
    		"currencyId": currency,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.item.add: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item", "id")
    if !ok {
    	return fmt.Errorf("нет item.id в %s", res.Result)
    }
    var itemID b24.ID
    if err := json.Unmarshal(raw, &itemID); err != nil {
    	return fmt.Errorf("разбор идентификатора объекта: %w", err)
    }
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 342,
            "title": "Сделка с товарами"
        }
    }
}
```

Сохраните `result.item.id`. Идентификатор понадобится для параметра `ownerId` метода [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md).

## 4. Сохраните товарные позиции

Вызовите [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md). Передайте:

- `ownerType` — краткий символьный код типа объекта CRM
- `ownerId` — идентификатор объекта из шага 3
- `productRows` — массив товарных позиций

В примере сохраняются четыре варианта:

- товар с налогом 20%, налог не включен в цену
- товар с налогом 20%, налог включен в цену
- товар с фиксированной скидкой в валюте цены
- товар со скидкой 10%

Для фиксированной скидки пример берет меньшее значение: 100 единиц валюты или половину цены товара. Так итоговая цена товарной позиции не станет отрицательной.

{% note info "" %}

Метод [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) перезаписывает все товарные позиции объекта CRM. Позиции, которые не переданы в `productRows`, будут удалены из объекта.

{% endnote %}

{% list tabs %}

- JS

    ```js
    function buildProductRows(productId, basePrice) {
        const price = Number(basePrice)
        const fixedDiscount = Math.min(100, price / 2)

        return [
            {
                productId: productId,
                price: price,
                taxRate: 20,
                taxIncluded: 'N',
                quantity: 1,
                sort: 10,
            },
            {
                productId: productId,
                price: price * 1.2,
                taxRate: 20,
                taxIncluded: 'Y',
                quantity: 1,
                sort: 20,
            },
            {
                productId: productId,
                price: price - fixedDiscount,
                discountTypeId: 1,
                discountSum: fixedDiscount,
                quantity: 1,
                sort: 30,
            },
            {
                productId: productId,
                price: price * 0.9,
                discountTypeId: 2,
                discountRate: 10,
                quantity: 1,
                sort: 40,
            },
        ]
    }

    async function setProductRows(ownerType, ownerId, productRows) {
        const result = await call('crm.item.productrow.set', {
            ownerType: ownerType,
            ownerId: ownerId,
            productRows: productRows,
        })

        return result.productRows
    }
    ```

- Python

    ```python
    def build_product_rows(product_id: int, base_price: float):
        fixed_discount = min(100, base_price / 2)

        return [
            {
                "productId": product_id,
                "price": base_price,
                "taxRate": 20,
                "taxIncluded": "N",
                "quantity": 1,
                "sort": 10,
            },
            {
                "productId": product_id,
                "price": base_price * 1.2,
                "taxRate": 20,
                "taxIncluded": "Y",
                "quantity": 1,
                "sort": 20,
            },
            {
                "productId": product_id,
                "price": base_price - fixed_discount,
                "discountTypeId": 1,
                "discountSum": fixed_discount,
                "quantity": 1,
                "sort": 30,
            },
            {
                "productId": product_id,
                "price": base_price * 0.9,
                "discountTypeId": 2,
                "discountRate": 10,
                "quantity": 1,
                "sort": 40,
            },
        ]

    def set_product_rows(owner_type: str, owner_id: int, product_rows: list):
        result = call_method("crm.item.productrow.set", {
            "ownerType": owner_type,
            "ownerId": owner_id,
            "productRows": product_rows,
        })

        return result["productRows"]
    ```

- PHP

    ```php
    function buildProductRows(int $productId, float $basePrice): array
    {
        $fixedDiscount = min(100, $basePrice / 2);

        return [
            [
                'productId' => $productId,
                'price' => $basePrice,
                'taxRate' => 20,
                'taxIncluded' => 'N',
                'quantity' => 1,
                'sort' => 10,
            ],
            [
                'productId' => $productId,
                'price' => $basePrice * 1.2,
                'taxRate' => 20,
                'taxIncluded' => 'Y',
                'quantity' => 1,
                'sort' => 20,
            ],
            [
                'productId' => $productId,
                'price' => $basePrice - $fixedDiscount,
                'discountTypeId' => 1,
                'discountSum' => $fixedDiscount,
                'quantity' => 1,
                'sort' => 30,
            ],
            [
                'productId' => $productId,
                'price' => $basePrice * 0.9,
                'discountTypeId' => 2,
                'discountRate' => 10,
                'quantity' => 1,
                'sort' => 40,
            ],
        ];
    }

    function setProductRows($b24, string $ownerType, int $ownerId, array $productRows): array
    {
        $result = callMethod($b24, 'crm.item.productrow.set', [
            'ownerType' => $ownerType,
            'ownerId' => $ownerId,
            'productRows' => $productRows,
        ]);

        return $result['productRows'];
    }
    ```

- Go

    ```go
    // Фиксированная скидка — меньшее из 100 единиц валюты и половины цены,
    // чтобы итоговая цена позиции не ушла в минус.
    fixedDiscount := math.Min(100, basePrice/2)

    rows := []b24.Params{
    	// Налог 20%, налог НЕ включён в цену.
    	{"productId": chosenID, "price": basePrice,
    		"taxRate": 20, "taxIncluded": "N", "quantity": 1, "sort": 10},
    	// Налог 20%, налог включён в цену.
    	{"productId": chosenID, "price": basePrice * 1.2,
    		"taxRate": 20, "taxIncluded": "Y", "quantity": 1, "sort": 20},
    	// Фиксированная скидка: discountTypeId = 1.
    	{"productId": chosenID, "price": basePrice - fixedDiscount,
    		"discountTypeId": 1, "discountSum": fixedDiscount, "quantity": 1, "sort": 30},
    	// Процентная скидка: discountTypeId = 2.
    	{"productId": chosenID, "price": basePrice * 0.9,
    		"discountTypeId": 2, "discountRate": 10, "quantity": 1, "sort": 40},
    }

    // Метод ПЕРЕЗАПИСЫВАЕТ весь набор позиций объекта: то, чего нет в
    // productRows, из объекта пропадёт.
    res, err = core.Call(ctx, "crm.item.productrow.set", b24.Params{
    	"ownerType":   ownerType,
    	"ownerId":     itemID,
    	"productRows": rows,
    })
    if err != nil {
    	return fmt.Errorf("crm.item.productrow.set: %w", err)
    }

    var saved struct {
    	ProductRows []struct {
    		ID       b24.ID  `json:"id"`
    		Price    float64 `json:"price"`
    		TaxRate  float64 `json:"taxRate"`
    		Quantity float64 `json:"quantity"`
    	} `json:"productRows"`
    }
    if err := json.Unmarshal(res.Result, &saved); err != nil {
    	return fmt.Errorf("разбор товарных позиций: %w", err)
    }
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "productRows": [
            {
                "id": 17654,
                "ownerId": 342,
                "ownerType": "D",
                "productId": 1243,
                "price": 1000,
                "quantity": 1,
                "taxRate": 20,
                "taxIncluded": "N"
            }
        ]
    }
}
```

## Запустите сценарий

После добавления функций из предыдущих шагов выберите нужный тип объекта в настройках `crmEntity`. Для лида укажите `entityTypeId = 1` и `ownerType = L`, для сделки — `2` и `D`, для счета — `31` и `SI`, для коммерческого предложения — `7` и `Q`.

{% list tabs %}

- JS

    ```js
    const crmEntity = {
        entityTypeId: 2,
        ownerType: 'D',
        title: 'Сделка с товарами',
    }

    const iblockId = 23

    const { product, price } = await findProductWithPrice(iblockId)
    const itemId = await createCrmItem(
        crmEntity.entityTypeId,
        crmEntity.title,
        price.currency,
    )
    const productRows = buildProductRows(product.id, price.price)
    const savedRows = await setProductRows(crmEntity.ownerType, itemId, productRows)

    console.log(`Создан объект CRM #${itemId}`)
    console.log(`Товар: ${product.name}`)
    console.log(savedRows)
    ```

- Python

    ```python
    crm_entity = {
        "entityTypeId": 2,
        "ownerType": "D",
        "title": "Сделка с товарами",
    }

    iblock_id = 23

    product_with_price = find_product_with_price(iblock_id)
    product = product_with_price["product"]
    price = product_with_price["price"]

    item_id = create_crm_item(
        crm_entity["entityTypeId"],
        crm_entity["title"],
        price["currency"],
    )

    product_rows = build_product_rows(int(product["id"]), float(price["price"]))
    saved_rows = set_product_rows(crm_entity["ownerType"], item_id, product_rows)

    print("Создан объект CRM #%s" % item_id)
    print("Товар: %s" % product["name"])
    print(saved_rows)
    ```

- PHP

    ```php
    $crmEntity = [
        'entityTypeId' => 2,
        'ownerType' => 'D',
        'title' => 'Сделка с товарами',
    ];

    $iblockId = 23;

    $productWithPrice = findProductWithPrice($b24, $iblockId);
    $product = $productWithPrice['product'];
    $price = $productWithPrice['price'];

    $itemId = createCrmItem(
        $b24,
        $crmEntity['entityTypeId'],
        $crmEntity['title'],
        $price['currency']
    );

    $productRows = buildProductRows((int)$product['id'], (float)$price['price']);
    $savedRows = setProductRows($b24, $crmEntity['ownerType'], $itemId, $productRows);

    print('Создан объект CRM #' . $itemId . PHP_EOL);
    print('Товар: ' . $product['name'] . PHP_EOL);
    print_r($savedRows);
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
    // Пример самодостаточный: он заводит в каталоге свой товар с ценой, создаёт
    // сделку, сохраняет в ней четыре товарные позиции с разными налогами и
    // скидками, читает их обратно и убирает за собой. Запускается на любом
    // портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"math"
    	"os"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // Тип объекта CRM, к которому привязываем товары. Пара значений всегда идёт
    // вместе: числовой entityTypeId для crm.item.add и краткий ownerType для
    // crm.item.productrow.set. Лид — 1 и "L", сделка — 2 и "D", счёт — 31 и "SI",
    // предложение — 7 и "Q".
    const (
    	entityTypeID = 2
    	ownerType    = "D"
    )

    // maxProducts ограничивает перебор: цена запрашивается отдельным вызовом на
    // каждый товар, а портал пропускает около двух обращений в секунду.
    const maxProducts = 10

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: свой товар с ценой, чтобы шагам 1 и 2 было что найти

    	iblockID, err := firstCatalog(ctx, core)
    	if err != nil {
    		return err
    	}
    	productID, err := addProductWithPrice(ctx, core, iblockID, 1000)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "catalog.product.delete", b24.Params{"id": productID})

    	// --- шаг 1: товары каталога
    	// select обязан содержать id и iblockId — без них метод отвечает ошибкой.
    	// Сортировка по убыванию id ставит только что созданный товар первым: на
    	// боевом портале она не нужна, здесь она делает пример быстрым.
    	res, err := core.Call(ctx, "catalog.product.list", b24.Params{
    		"select": []string{"id", "iblockId", "name"},
    		"filter": b24.Params{"iblockId": iblockID},
    		"order":  b24.Params{"id": "DESC"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("catalog.product.list: %w", err)
    	}

    	// Метод отдаёт товары постранично, до 50 за раз, и заворачивает их в
    	// объект с ключом products.
    	var catalog struct {
    		Products []struct {
    			ID   b24.ID `json:"id"`
    			Name string `json:"name"`
    		} `json:"products"`
    	}
    	if err := json.Unmarshal(res.Result, &catalog); err != nil {
    		return fmt.Errorf("разбор товаров: %w", err)
    	}
    	if len(catalog.Products) == 0 {
    		return fmt.Errorf("в каталоге %d нет товаров", iblockID)
    	}
    	// --- шаг 2: цена товара

    	// Цена хранится ОТДЕЛЬНО от карточки товара: catalog.product.list её не
    	// возвращает, поэтому на каждый товар нужен свой вызов.
    	var (
    		chosenID   b24.ID
    		chosenName string
    		basePrice  float64
    		currency   string
    	)
    	for i, p := range catalog.Products {
    		if i >= maxProducts {
    			break
    		}
    		res, err := core.Call(ctx, "catalog.price.list", b24.Params{
    			"select": []string{"id", "productId", "price", "currency"},
    			"filter": b24.Params{"productId": p.ID},
    		}, b24.WithIdempotent())
    		if err != nil {
    			return fmt.Errorf("catalog.price.list: %w", err)
    		}
    		var prices struct {
    			Prices []struct {
    				Price    float64 `json:"price"`
    				Currency string  `json:"currency"`
    			} `json:"prices"`
    		}
    		if err := json.Unmarshal(res.Result, &prices); err != nil {
    			return fmt.Errorf("разбор цен: %w", err)
    		}
    		// Берём первую цену больше нуля: у товара может быть несколько типов
    		// цен, и часть из них — нулевые.
    		for _, pr := range prices.Prices {
    			if pr.Price > 0 {
    				basePrice, currency = pr.Price, pr.Currency
    				break
    			}
    		}
    		if basePrice > 0 {
    			chosenID, chosenName = p.ID, p.Name
    			break
    		}
    	}
    	if basePrice == 0 {
    		return fmt.Errorf("в каталоге нет активного товара с ценой больше нуля")
    	}
    	fmt.Printf("товар %d %q, цена %.2f %s\n", chosenID, chosenName, basePrice, currency)

    	// --- шаг 3: объект CRM
    	res, err = core.Call(ctx, "crm.item.add", b24.Params{
    		"entityTypeId": entityTypeID,
    		"fields": b24.Params{
    			"title": "Сделка с товарами (пример b24gosdk)",
    			// Валюта берётся из цены шага 2: позиции считаются в валюте
    			// объекта, и расхождение здесь испортит суммы.
    			"currencyId": currency,
    		},
    	})
    	if err != nil {
    		return fmt.Errorf("crm.item.add: %w", err)
    	}

    	raw, ok := b24.Unwrap(res.Result, "item", "id")
    	if !ok {
    		return fmt.Errorf("нет item.id в %s", res.Result)
    	}
    	var itemID b24.ID
    	if err := json.Unmarshal(raw, &itemID); err != nil {
    		return fmt.Errorf("разбор идентификатора объекта: %w", err)
    	}
    	defer del(ctx, core, "crm.item.delete", b24.Params{
    		"entityTypeId": entityTypeID, "id": itemID,
    	})
    	fmt.Printf("объект CRM %d создан\n", itemID)

    	// --- шаг 4: товарные позиции
    	// Фиксированная скидка — меньшее из 100 единиц валюты и половины цены,
    	// чтобы итоговая цена позиции не ушла в минус.
    	fixedDiscount := math.Min(100, basePrice/2)

    	rows := []b24.Params{
    		// Налог 20%, налог НЕ включён в цену.
    		{"productId": chosenID, "price": basePrice,
    			"taxRate": 20, "taxIncluded": "N", "quantity": 1, "sort": 10},
    		// Налог 20%, налог включён в цену.
    		{"productId": chosenID, "price": basePrice * 1.2,
    			"taxRate": 20, "taxIncluded": "Y", "quantity": 1, "sort": 20},
    		// Фиксированная скидка: discountTypeId = 1.
    		{"productId": chosenID, "price": basePrice - fixedDiscount,
    			"discountTypeId": 1, "discountSum": fixedDiscount, "quantity": 1, "sort": 30},
    		// Процентная скидка: discountTypeId = 2.
    		{"productId": chosenID, "price": basePrice * 0.9,
    			"discountTypeId": 2, "discountRate": 10, "quantity": 1, "sort": 40},
    	}

    	// Метод ПЕРЕЗАПИСЫВАЕТ весь набор позиций объекта: то, чего нет в
    	// productRows, из объекта пропадёт.
    	res, err = core.Call(ctx, "crm.item.productrow.set", b24.Params{
    		"ownerType":   ownerType,
    		"ownerId":     itemID,
    		"productRows": rows,
    	})
    	if err != nil {
    		return fmt.Errorf("crm.item.productrow.set: %w", err)
    	}

    	var saved struct {
    		ProductRows []struct {
    			ID       b24.ID  `json:"id"`
    			Price    float64 `json:"price"`
    			TaxRate  float64 `json:"taxRate"`
    			Quantity float64 `json:"quantity"`
    		} `json:"productRows"`
    	}
    	if err := json.Unmarshal(res.Result, &saved); err != nil {
    		return fmt.Errorf("разбор товарных позиций: %w", err)
    	}
    	for _, r := range saved.ProductRows {
    		fmt.Printf("  позиция %d: %.2f x %.0f, налог %.0f%%\n",
    			r.ID, r.Price, r.Quantity, r.TaxRate)
    	}

    	// --- проверка: читаем позиции обратно

    	res, err = core.Call(ctx, "crm.item.productrow.list", b24.Params{
    		// Знак «=» в имени ключа — часть фильтра, а не опечатка: это точное
    		// сравнение.
    		"filter": b24.Params{"=ownerType": ownerType, "=ownerId": itemID},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.item.productrow.list: %w", err)
    	}
    	rawRows, ok := b24.Unwrap(res.Result, "productRows")
    	if !ok {
    		return fmt.Errorf("нет productRows в %s", res.Result)
    	}
    	var check []json.RawMessage
    	if err := json.Unmarshal(rawRows, &check); err != nil {
    		return fmt.Errorf("разбор проверки: %w", err)
    	}
    	fmt.Printf("в объекте %d товарных позиций: %d\n", itemID, len(check))
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

    // addProductWithPrice заводит товар и ставит ему цену: страница берёт готовый
    // каталог, а пример должен работать и на пустом.
    func addProductWithPrice(ctx context.Context, core *b24.Core, iblockID b24.ID, price float64) (b24.ID, error) {
    	res, err := core.Call(ctx, "catalog.product.add", b24.Params{
    		"fields": b24.Params{
    			"iblockId": iblockID,
    			"name":     "Радиатор (пример b24gosdk)",
    			"active":   "Y",
    		},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("catalog.product.add: %w", err)
    	}
    	// add отвечает ключом element, а get — ключом product для той же сущности.
    	raw, ok := b24.Unwrap(res.Result, "element", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет element.id в %s", res.Result)
    	}
    	var productID b24.ID
    	if err := json.Unmarshal(raw, &productID); err != nil {
    		return 0, err
    	}

    	res, err = core.Call(ctx, "catalog.priceType.list", nil, b24.WithIdempotent())
    	if err != nil {
    		return productID, fmt.Errorf("catalog.priceType.list: %w", err)
    	}
    	var types struct {
    		PriceTypes []struct {
    			ID b24.ID `json:"id"`
    		} `json:"priceTypes"`
    	}
    	if err := json.Unmarshal(res.Result, &types); err != nil {
    		return productID, err
    	}
    	if len(types.PriceTypes) == 0 {
    		return productID, fmt.Errorf("на портале нет типов цен")
    	}
    	_, err = core.Call(ctx, "catalog.price.add", b24.Params{
    		"fields": b24.Params{
    			"productId":      productID,
    			"catalogGroupId": types.PriceTypes[0].ID,
    			"price":          price,
    			"currency":       "RUB",
    		},
    	})
    	return productID, err
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
    ```

{% endlist %}

## Проверим результат

Откройте созданный объект CRM в интерфейсе и проверьте вкладку с товарами. В списке должны появиться четыре товарные позиции с одним товаром и разными расчетами:

- налог не включен в цену
- налог включен в цену
- фиксированная скидка
- процентная скидка

Проверить результат через REST можно методом [crm.item.productrow.list](../../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md). Передайте фильтр:

- `=ownerType` — краткий символьный код типа объекта CRM
- `=ownerId` — идентификатор созданного объекта CRM

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `200040300010` | Недостаточно прав для чтения каталога или цен. Проверьте права пользователя и scope `catalog` ||
|| `ACCESS_DENIED` | Нет права на создание или изменение объекта CRM. Проверьте права пользователя в CRM ||
|| `OWNER_NOT_FOUND` | В `ownerId` передан идентификатор несуществующего объекта CRM ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | В `ownerType` передан неподдерживаемый тип объекта CRM ||
|| `100` | Не переданы обязательные параметры. Проверьте `entityTypeId`, `fields`, `ownerType`, `ownerId` и `productRows` ||
|#

## Что важно учитывать

- [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) заменяет все товарные позиции объекта CRM
- [catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md) возвращает товары, но не возвращает цены. Цены нужно получать методом [catalog.price.list](../../../api-reference/catalog/price/catalog-price-list.md)
- Для товаров с вариациями используйте идентификатор конкретной вариации товара
- Повторный запуск примера создает новый объект CRM и новые товарные позиции
- Если сумма объекта должна рассчитываться по товарным позициям, не передавайте ручную сумму в `opportunity`

## Продолжите изучение

- [Получить список товаров по фильтру catalog.product.list](../../../api-reference/catalog/product/catalog-product-list.md)
- [Получить список цен по фильтру catalog.price.list](../../../api-reference/catalog/price/catalog-price-list.md)
- [Создать новый элемент CRM crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
- [Сохранить товарную позицию объекта CRM crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md)
- [Получить список товарных позиций crm.item.productrow.list](../../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md)
