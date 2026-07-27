# Как изменить значения пользовательских полей товара

> Scope: [`catalog`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
> - [catalog.product.list](../../api-reference/catalog/product/catalog-product-list.md), [catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md), [catalog.productProperty.list](../../api-reference/catalog/product-property/catalog-product-property-list.md), [catalog.productPropertyEnum.list](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-list.md) — пользователь с правом на просмотр каталога
> - [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md) — администратор или пользователь с правом на изменение товаров

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля товара в каталоге хранятся как свойства торгового каталога. Значения свойств можно изменить методом [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md).

Сценарий состоит из пяти шагов.

1. Найти товар методом [catalog.product.list](../../api-reference/catalog/product/catalog-product-list.md)
2. Получить товар методом [catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md)
3. Найти свойства товара методом [catalog.productProperty.list](../../api-reference/catalog/product-property/catalog-product-property-list.md)
4. Получить значения списочных свойств методом [catalog.productPropertyEnum.list](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-list.md)
5. Обновить значения свойств методом [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md)

## Подготовьте данные

Для выполнения примера нужны:

- входящий вебхук со scope `catalog`
- идентификатор торгового каталога `iblockId`. Его можно получить методом [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md)

В примере изменяются два свойства:

- одиночное списочное свойство `singlePropertyId`
- множественное списочное свойство `multiplePropertyId`

Идентификаторы свойств и вариантов списка вы получите в шагах 3 и 4.

## 1. Найдите товар

Вызовите [catalog.product.list](../../api-reference/catalog/product/catalog-product-list.md) с фильтром по `iblockId`. В `select` передайте `id`, `iblockId` и `name`, чтобы выбрать товар для обновления и вывести название в диагностике.

{% include [Сноска о примерах](../../_includes/examples.md) %}

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

Сохраните `result.products[].id`. Идентификатор товара понадобится для получения текущих значений свойств и обновления товара.

Метод возвращает товары постранично. В примере используется первая страница, до 50 товаров. Если в вашем каталоге больше товаров, переберите страницы через параметр `start`.

## 2. Получите товар

Вызовите [catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md) и передайте `id` товара.

{% list tabs %}

- JS

    ```js
    async function getProduct(productId) {
        const result = await call('catalog.product.get', {
            id: productId,
        })

        return result.product
    }
    ```

- PHP

    ```php
    function getProduct($b24, int $productId): array
    {
        $result = callMethod($b24, 'catalog.product.get', [
            'id' => $productId,
        ]);

        return $result['product'];
    }
    ```

- Python

    ```python
    def get_product(product_id: int):
        result = call_method("catalog.product.get", {
            "id": product_id,
        })

        return result["product"]
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "product": {
            "id": 1243,
            "iblockId": 23,
            "name": "Монитор",
            "property258": {
                "value": "433",
                "valueId": "9743"
            },
            "property259": [
                {
                    "value": "435",
                    "valueId": "9744"
                },
                {
                    "value": "437",
                    "valueId": "9745"
                }
            ]
        }
    }
}
```

Сохраните `result.product.propertyN.valueId` для одиночного свойства и `result.product.propertyN[].valueId` для множественного свойства. `valueId` нужен на шаге 5 для обновления заполненного свойства. Если свойство сейчас пустое и возвращает `null`, при первом заполнении передайте только `value`.

## 3. Найдите свойства товара

Вызовите [catalog.productProperty.list](../../api-reference/catalog/product-property/catalog-product-property-list.md) с фильтром по `iblockId` из шага 1. Для списочных свойств поле `propertyType` равно `L`. Поле `multiple` показывает, одиночное это свойство или множественное.

Свойства с `userType = BoolEnum` обновляются значениями `Y` или `N`, а не идентификаторами вариантов списка:

```json
{
    "fields": {
        "property295": {
            "value": "Y"
        }
    }
}
```

Дальше в примере выберите свойства, у которых `userType` не равен `BoolEnum`, чтобы изменить обычные списочные свойства через идентификаторы вариантов списка.

{% list tabs %}

- JS

    ```js
    async function getProductProperties(iblockId) {
        const result = await call('catalog.productProperty.list', {
            select: ['id', 'iblockId', 'name', 'propertyType', 'userType', 'multiple'],
            filter: {
                iblockId: iblockId,
                propertyType: 'L',
            },
            order: {
                id: 'ASC',
            },
            start: 0,
        })

        return result.productProperties.filter((property) => property.userType !== 'BoolEnum')
    }
    ```

- PHP

    ```php
    function getProductProperties($b24, int $iblockId): array
    {
        $result = callMethod($b24, 'catalog.productProperty.list', [
            'select' => ['id', 'iblockId', 'name', 'propertyType', 'userType', 'multiple'],
            'filter' => [
                'iblockId' => $iblockId,
                'propertyType' => 'L',
            ],
            'order' => [
                'id' => 'ASC',
            ],
            'start' => 0,
        ]);

        return array_values(array_filter(
            $result['productProperties'],
            static fn(array $property): bool => ($property['userType'] ?? null) !== 'BoolEnum'
        ));
    }
    ```

- Python

    ```python
    def get_product_properties(iblock_id: int):
        result = call_method("catalog.productProperty.list", {
            "select": ["id", "iblockId", "name", "propertyType", "userType", "multiple"],
            "filter": {
                "iblockId": iblock_id,
                "propertyType": "L",
            },
            "order": {
                "id": "ASC",
            },
            "start": 0,
        })

        return [
            property for property in result["productProperties"]
            if property.get("userType") != "BoolEnum"
        ]
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "productProperties": [
            {
                "id": 258,
                "iblockId": 23,
                "name": "Цвет",
                "propertyType": "L",
                "userType": null,
                "multiple": "N"
            },
            {
                "id": 259,
                "iblockId": 23,
                "name": "Комплектация",
                "propertyType": "L",
                "userType": null,
                "multiple": "Y"
            }
        ]
    },
    "total": 2
}
```

Сохраните `result.productProperties[].id` для свойств, у которых `userType` не равен `BoolEnum`. Идентификатор свойства нужен для имени поля `propertyN` в методе [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md), например `property258`.

## 4. Получите значения списочных свойств

Вызовите [catalog.productPropertyEnum.list](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-list.md) для каждого свойства.

{% list tabs %}

- JS

    ```js
    async function getPropertyEnumValues(propertyId) {
        const result = await call('catalog.productPropertyEnum.list', {
            select: ['id', 'propertyId', 'value', 'sort'],
            filter: {
                propertyId: propertyId,
            },
            order: {
                id: 'ASC',
            },
            start: 0,
        })

        return result.productPropertyEnums
    }
    ```

- PHP

    ```php
    function getPropertyEnumValues($b24, int $propertyId): array
    {
        $result = callMethod($b24, 'catalog.productPropertyEnum.list', [
            'select' => ['id', 'propertyId', 'value', 'sort'],
            'filter' => [
                'propertyId' => $propertyId,
            ],
            'order' => [
                'id' => 'ASC',
            ],
            'start' => 0,
        ]);

        return $result['productPropertyEnums'];
    }
    ```

- Python

    ```python
    def get_property_enum_values(property_id: int):
        result = call_method("catalog.productPropertyEnum.list", {
            "select": ["id", "propertyId", "value", "sort"],
            "filter": {
                "propertyId": property_id,
            },
            "order": {
                "id": "ASC",
            },
            "start": 0,
        })

        return result["productPropertyEnums"]
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "productPropertyEnums": [
            {
                "id": 433,
                "propertyId": 258,
                "value": "Красный",
                "sort": 500
            },
            {
                "id": 435,
                "propertyId": 258,
                "value": "Синий",
                "sort": 500
            }
        ]
    },
    "total": 2
}
```

Сохраните `result.productPropertyEnums[].id` для нужных вариантов списка. Эти идентификаторы нужно передать в `value` при обновлении списочного свойства.

## 5. Обновите значения свойств

Вызовите [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md). В `fields` передайте свойства в формате `propertyN`, где `N` — идентификатор свойства.

Для одиночного свойства передайте объект:

```json
{
    "valueId": "9743",
    "value": 435
}
```

Для множественного свойства передайте массив объектов. Если нужно сохранить существующую строку значения, передайте ее `valueId`. Значения множественного свойства, для которых не передан `valueId`, будут заменены.

{% list tabs %}

- JS

    ```js
    function buildPropertyUpdateFields(product, singlePropertyId, singleEnumId, multiplePropertyId, multipleEnumIds) {
        const singlePropertyName = `property${singlePropertyId}`
        const multiplePropertyName = `property${multiplePropertyId}`

        const fields = {
            [singlePropertyName]: {
                valueId: product[singlePropertyName]?.valueId,
                value: singleEnumId,
            },
            [multiplePropertyName]: multipleEnumIds.map((enumId, index) => ({
                valueId: product[multiplePropertyName]?.[index]?.valueId,
                value: enumId,
            })),
        }

        return fields
    }

    async function updateProductProperties(productId, fields) {
        const result = await call('catalog.product.update', {
            id: productId,
            fields: fields,
        })

        return result.element
    }
    ```

- PHP

    ```php
    function buildPropertyUpdateFields(
        array $product,
        int $singlePropertyId,
        int $singleEnumId,
        int $multiplePropertyId,
        array $multipleEnumIds
    ): array {
        $singlePropertyName = 'property' . $singlePropertyId;
        $multiplePropertyName = 'property' . $multiplePropertyId;

        $multipleValues = [];
        foreach ($multipleEnumIds as $index => $enumId) {
            $multipleValues[] = [
                'valueId' => $product[$multiplePropertyName][$index]['valueId'] ?? null,
                'value' => $enumId,
            ];
        }

        return [
            $singlePropertyName => [
                'valueId' => $product[$singlePropertyName]['valueId'] ?? null,
                'value' => $singleEnumId,
            ],
            $multiplePropertyName => $multipleValues,
        ];
    }

    function updateProductProperties($b24, int $productId, array $fields): array
    {
        $result = callMethod($b24, 'catalog.product.update', [
            'id' => $productId,
            'fields' => $fields,
        ]);

        return $result['element'];
    }
    ```

- Python

    ```python
    def build_property_update_fields(
        product: dict,
        single_property_id: int,
        single_enum_id: int,
        multiple_property_id: int,
        multiple_enum_ids: list,
    ):
        single_property_name = f"property{single_property_id}"
        multiple_property_name = f"property{multiple_property_id}"

        current_multiple_values = product.get(multiple_property_name) or []
        multiple_values = []
        for index, enum_id in enumerate(multiple_enum_ids):
            current_value = current_multiple_values[index] if index < len(current_multiple_values) else {}
            multiple_values.append({
                "valueId": current_value.get("valueId"),
                "value": enum_id,
            })

        return {
            single_property_name: {
                "valueId": (product.get(single_property_name) or {}).get("valueId"),
                "value": single_enum_id,
            },
            multiple_property_name: multiple_values,
        }

    def update_product_properties(product_id: int, fields: dict):
        result = call_method("catalog.product.update", {
            "id": product_id,
            "fields": fields,
        })

        return result["element"]
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "element": {
            "id": 1243,
            "iblockId": 23,
            "name": "Монитор",
            "property258": {
                "value": "435",
                "valueId": "9743"
            },
            "property259": [
                {
                    "value": "439",
                    "valueId": "9744"
                },
                {
                    "value": "441",
                    "valueId": "9745"
                }
            ]
        }
    }
}
```

Проверьте в ответе поля `result.element.propertyN`. Значение `value` должно совпадать с идентификатором варианта списка, который вы передали в запросе. Сохраните новый `valueId` из ответа: он может измениться после обновления и понадобится для следующего изменения этого свойства.

## Запустите сценарий

После добавления функций из предыдущих шагов замените:

- `iblockId` — идентификатор торгового каталога
- `singlePropertyId` — идентификатор одиночного списочного свойства
- `multiplePropertyId` — идентификатор множественного списочного свойства
- `singleEnumId` — новое значение одиночного свойства
- `multipleEnumIds` — новые значения множественного свойства

{% list tabs %}

- JS

    ```js
    const iblockId = 23
    const singlePropertyId = 258
    const multiplePropertyId = 259
    const singleEnumId = 435
    const multipleEnumIds = [439, 441]

    const products = await getProducts(iblockId)
    if (products.length === 0) {
        throw new Error('В каталоге нет активных товаров')
    }

    const productId = products[0].id
    const product = await getProduct(productId)
    const properties = await getProductProperties(iblockId)
    const singleEnumValues = await getPropertyEnumValues(singlePropertyId)
    const multipleEnumValues = await getPropertyEnumValues(multiplePropertyId)

    console.log('Свойства товара:', properties)
    console.log('Значения одиночного свойства:', singleEnumValues)
    console.log('Значения множественного свойства:', multipleEnumValues)

    const fields = buildPropertyUpdateFields(
        product,
        singlePropertyId,
        singleEnumId,
        multiplePropertyId,
        multipleEnumIds,
    )

    const updatedProduct = await updateProductProperties(productId, fields)
    console.log(updatedProduct)
    ```

- PHP

    ```php
    $iblockId = 23;
    $singlePropertyId = 258;
    $multiplePropertyId = 259;
    $singleEnumId = 435;
    $multipleEnumIds = [439, 441];

    $products = getProducts($b24, $iblockId);
    if (empty($products)) {
        throw new RuntimeException('В каталоге нет активных товаров');
    }

    $productId = (int)$products[0]['id'];
    $product = getProduct($b24, $productId);
    $properties = getProductProperties($b24, $iblockId);
    $singleEnumValues = getPropertyEnumValues($b24, $singlePropertyId);
    $multipleEnumValues = getPropertyEnumValues($b24, $multiplePropertyId);

    print_r($properties);
    print_r($singleEnumValues);
    print_r($multipleEnumValues);

    $fields = buildPropertyUpdateFields(
        $product,
        $singlePropertyId,
        $singleEnumId,
        $multiplePropertyId,
        $multipleEnumIds
    );

    $updatedProduct = updateProductProperties($b24, $productId, $fields);
    print_r($updatedProduct);
    ```

- Python

    ```python
    iblock_id = 23
    single_property_id = 258
    multiple_property_id = 259
    single_enum_id = 435
    multiple_enum_ids = [439, 441]

    products = get_products(iblock_id)
    if not products:
        raise RuntimeError("В каталоге нет активных товаров")

    product_id = int(products[0]["id"])
    product = get_product(product_id)
    properties = get_product_properties(iblock_id)
    single_enum_values = get_property_enum_values(single_property_id)
    multiple_enum_values = get_property_enum_values(multiple_property_id)

    print("Свойства товара:", properties)
    print("Значения одиночного свойства:", single_enum_values)
    print("Значения множественного свойства:", multiple_enum_values)

    fields = build_property_update_fields(
        product,
        single_property_id,
        single_enum_id,
        multiple_property_id,
        multiple_enum_ids,
    )

    updated_product = update_product_properties(product_id, fields)
    print(updated_product)
    ```

{% endlist %}

## Проверим результат

Откройте карточку товара в каталоге и проверьте значения свойств. Они должны совпадать со значениями, которые переданы в `singleEnumId` и `multipleEnumIds`.

Проверить результат через REST можно методом [catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md). Передайте `id` товара и проверьте поля `propertyN` в ответе.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога. Проверьте права пользователя и scope `catalog` ||
|| `200040300040` | Недостаточно прав для чтения или изменения товара. Проверьте права пользователя на каталог ||
|| `100` | Не передан обязательный параметр. Проверьте `id`, `fields`, `filter` и `select` ||
|| `0` | Каталог, товар, свойство или значение списка не найдено. Проверьте `iblockId`, `productId`, `singlePropertyId`, `multiplePropertyId` и идентификаторы значений ||
|#

## Что важно учитывать

- Методы `crm.product.*` устарели. Для товаров торгового каталога используйте методы [catalog.product.*](../../api-reference/catalog/product/index.md)
- Для изменения цены товара используйте методы [catalog.price.*](../../api-reference/catalog/price/index.md)
- Для изменения изображений товара используйте методы [catalog.productImage.*](../../api-reference/catalog/product-image/index.md) или поля `previewPicture` и `detailPicture` метода [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md)
- Если передать значение свойства без `valueId`, метод запишет новое значение. После обновления сохраните новый `valueId` из ответа
- Если передать не все текущие значения множественного свойства, существующие значения без `valueId` будут удалены
- Значения списочных свойств нужно передавать по идентификаторам из [catalog.productPropertyEnum.list](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-list.md)

## Продолжите изучение

- [Получить товар по идентификатору catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md)
- [Получить список товаров по фильтру catalog.product.list](../../api-reference/catalog/product/catalog-product-list.md)
- [Обновить товар catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md)
- [Получить список свойств товаров или вариаций catalog.productProperty.list](../../api-reference/catalog/product-property/catalog-product-property-list.md)
- [Получить список значений списочных свойств catalog.productPropertyEnum.list](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-list.md)
