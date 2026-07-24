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
