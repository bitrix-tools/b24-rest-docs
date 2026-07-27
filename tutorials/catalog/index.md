# Как добавить товар со значениями пользовательских свойств

> Scope: [`catalog`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор или пользователь с правами на изменение инфоблока свойства, добавление товара и изменение цены продажи товара

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товар в каталоге можно дополнить пользовательскими свойствами: списком, множественным списком, файлом или множественным файлом. Значения этих свойств передаются при создании товара в поля `propertyN`, где `N` — идентификатор свойства.

Например, добавим товар с цветом, несколькими размерами, сертификатом и галереей изображений. Для цены используем отдельный метод, потому что `catalog.product.add` создает карточку товара, а цены добавляются методами `catalog.price.*`.

Сценарий состоит из трех шагов.

1. Создать свойства товара методами [catalog.productProperty.add](../../api-reference/catalog/product-property/catalog-product-property-add.md) и [catalog.productPropertyEnum.add](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-add.md).
2. Добавить товар методом [catalog.product.add](../../api-reference/catalog/product/catalog-product-add.md) и передать значения свойств в `propertyN`.
3. Добавить цену методом [catalog.price.add](../../api-reference/catalog/price/catalog-price-add.md).

Перед запуском примеров подготовьте окружение:

- установите SDK для своего языка: `npm install @bitrix24/b24jssdk`, `composer require bitrix24/b24phpsdk:"^3.0"` или `pip install b24pysdk`
- примеры выполняются на сервере и авторизуются по [входящему вебхуку](../../local-integrations/local-webhooks.md) с правом `catalog`. Замените адрес вебхука на свой
- файлы для загрузки должны быть доступны коду примера по пути на сервере

## 1. Подготовим свойства

Для добавления товара нужны значения:

- `iblockId` — идентификатор торгового каталога. Его можно получить методом [catalog.catalog.list](../../api-reference/catalog/catalog/catalog-catalog-list.md)
- `catalogGroupId` — идентификатор типа цены. Его можно получить методом [catalog.priceType.list](../../api-reference/catalog/price-type/catalog-price-type-list.md)
- идентификаторы свойств, которые вернет метод [catalog.productProperty.add](../../api-reference/catalog/product-property/catalog-product-property-add.md)
- идентификаторы значений списков, которые вернет метод [catalog.productPropertyEnum.add](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-add.md)

Если свойства уже созданы, не выполняйте первый шаг повторно. Используйте существующие идентификаторы свойств и значений списка.

В примере создадим четыре свойства:

- `Цвет` — списочное свойство
- `Размеры` — множественное списочное свойство
- `Сертификат` — файловое свойство
- `Галерея` — множественное файловое свойство

{% note warning "Одиночному списочному свойству нужно минимум два значения" %}

Для одиночного списочного свойства — `multiple: N` — создайте минимум два значения списка. Если значение всего одно, Битрикс24 определяет такое свойство как «Да/Нет» — `userType: BoolEnum`. Идентификатор значения списка в поле `propertyN` не сохранится: товар вернет `propertyN: "N"`, ошибки при этом не будет.

Поэтому для свойства `Цвет` создадим два значения — `Синий` и `Красный`. Множественного списочного свойства это ограничение не касается.

Проверить, как определилось свойство, можно методом [catalog.product.getFieldsByFilter](../../api-reference/catalog/product/catalog-product-get-fields-by-filter.md) — в ответе у поля `propertyN` будет `userType: BoolEnum`. Метод [catalog.productProperty.get](../../api-reference/catalog/product-property/catalog-product-property-get.md) вернет `userType: null`, потому что тип «Да/Нет» вычисляется по количеству значений списка.

{% endnote %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    const iblockId = 23

    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    async function addProperty(fields) {
        const result = await callMethod(
            'catalog.productProperty.add',
            { fields },
            `property-add-${fields.code}`
        )

        return result.productProperty
    }

    async function addPropertyEnum(propertyId, value, xmlId, sort) {
        const result = await callMethod(
            'catalog.productPropertyEnum.add',
            { fields: { propertyId, value, xmlId, sort } },
            `property-enum-add-${xmlId}`
        )

        return result.productPropertyEnum
    }

    async function prepareProperties() {
        const colorProperty = await addProperty({
            iblockId: iblockId,
            name: 'Цвет',
            code: 'COLOR',
            propertyType: 'L',
            listType: 'L',
            multiple: 'N',
            active: 'Y',
            sort: 100
        })

        const sizeProperty = await addProperty({
            iblockId: iblockId,
            name: 'Размеры',
            code: 'SIZES',
            propertyType: 'L',
            listType: 'C',
            multiple: 'Y',
            active: 'Y',
            sort: 200
        })

        const certificateProperty = await addProperty({
            iblockId: iblockId,
            name: 'Сертификат',
            code: 'CERTIFICATE',
            propertyType: 'F',
            multiple: 'N',
            active: 'Y',
            sort: 300
        })

        const galleryProperty = await addProperty({
            iblockId: iblockId,
            name: 'Галерея',
            code: 'GALLERY',
            propertyType: 'F',
            multiple: 'Y',
            active: 'Y',
            sort: 400
        })

        const colorBlue = await addPropertyEnum(colorProperty.id, 'Синий', 'BLUE', 100)
        const colorRed = await addPropertyEnum(colorProperty.id, 'Красный', 'RED', 200)
        const sizeM = await addPropertyEnum(sizeProperty.id, 'M', 'M', 100)
        const sizeL = await addPropertyEnum(sizeProperty.id, 'L', 'L', 200)

        console.log({
            colorPropertyId: colorProperty.id,
            colorBlueId: colorBlue.id,
            colorRedId: colorRed.id,
            sizePropertyId: sizeProperty.id,
            sizeValueIds: [sizeM.id, sizeL.id],
            certificatePropertyId: certificateProperty.id,
            galleryPropertyId: galleryProperty.id
        })
    }

    try {
        await prepareProperties()
    } catch (error) {
        console.error('Ошибка:', error.message)
    } finally {
        $b24.destroy()
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $iblockId = 23;

    function addProperty($b24, array $fields): array
    {
        return $b24->core->call('catalog.productProperty.add', ['fields' => $fields])
            ->getResponseData()
            ->getResult()['productProperty'];
    }

    function addPropertyEnum($b24, int $propertyId, string $value, string $xmlId, int $sort): array
    {
        return $b24->core->call(
            'catalog.productPropertyEnum.add',
            [
                'fields' => [
                    'propertyId' => $propertyId,
                    'value' => $value,
                    'xmlId' => $xmlId,
                    'sort' => $sort,
                ],
            ]
        )->getResponseData()->getResult()['productPropertyEnum'];
    }

    try
    {
        $colorProperty = addProperty($b24, [
            'iblockId' => $iblockId,
            'name' => 'Цвет',
            'code' => 'COLOR',
            'propertyType' => 'L',
            'listType' => 'L',
            'multiple' => 'N',
            'active' => 'Y',
            'sort' => 100,
        ]);

        $sizeProperty = addProperty($b24, [
            'iblockId' => $iblockId,
            'name' => 'Размеры',
            'code' => 'SIZES',
            'propertyType' => 'L',
            'listType' => 'C',
            'multiple' => 'Y',
            'active' => 'Y',
            'sort' => 200,
        ]);

        $certificateProperty = addProperty($b24, [
            'iblockId' => $iblockId,
            'name' => 'Сертификат',
            'code' => 'CERTIFICATE',
            'propertyType' => 'F',
            'multiple' => 'N',
            'active' => 'Y',
            'sort' => 300,
        ]);

        $galleryProperty = addProperty($b24, [
            'iblockId' => $iblockId,
            'name' => 'Галерея',
            'code' => 'GALLERY',
            'propertyType' => 'F',
            'multiple' => 'Y',
            'active' => 'Y',
            'sort' => 400,
        ]);

        $colorBlue = addPropertyEnum($b24, $colorProperty['id'], 'Синий', 'BLUE', 100);
        $colorRed = addPropertyEnum($b24, $colorProperty['id'], 'Красный', 'RED', 200);
        $sizeM = addPropertyEnum($b24, $sizeProperty['id'], 'M', 'M', 100);
        $sizeL = addPropertyEnum($b24, $sizeProperty['id'], 'L', 'L', 200);

        print_r([
            'colorPropertyId' => $colorProperty['id'],
            'colorBlueId' => $colorBlue['id'],
            'colorRedId' => $colorRed['id'],
            'sizePropertyId' => $sizeProperty['id'],
            'sizeValueIds' => [
                $sizeM['id'],
                $sizeL['id'],
            ],
            'certificatePropertyId' => $certificateProperty['id'],
            'galleryPropertyId' => $galleryProperty['id'],
        ]);
    }
    catch (BaseException $exception)
    {
        echo 'Ошибка: '.$exception->getMessage();
    }
    ?>
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    iblock_id = 23


    def add_property(fields):
        return client.catalog.product_property.add(fields=fields).response.result["productProperty"]


    def add_property_enum(property_id, value, xml_id, sort):
        return client.catalog.product_property_enum.add(
            fields={
                "propertyId": property_id,
                "value": value,
                "xmlId": xml_id,
                "sort": sort,
            },
        ).response.result["productPropertyEnum"]


    try:
        color_property = add_property({
            "iblockId": iblock_id,
            "name": "Цвет",
            "code": "COLOR",
            "propertyType": "L",
            "listType": "L",
            "multiple": "N",
            "active": "Y",
            "sort": 100,
        })

        size_property = add_property({
            "iblockId": iblock_id,
            "name": "Размеры",
            "code": "SIZES",
            "propertyType": "L",
            "listType": "C",
            "multiple": "Y",
            "active": "Y",
            "sort": 200,
        })

        certificate_property = add_property({
            "iblockId": iblock_id,
            "name": "Сертификат",
            "code": "CERTIFICATE",
            "propertyType": "F",
            "multiple": "N",
            "active": "Y",
            "sort": 300,
        })

        gallery_property = add_property({
            "iblockId": iblock_id,
            "name": "Галерея",
            "code": "GALLERY",
            "propertyType": "F",
            "multiple": "Y",
            "active": "Y",
            "sort": 400,
        })

        color_blue = add_property_enum(color_property["id"], "Синий", "BLUE", 100)
        color_red = add_property_enum(color_property["id"], "Красный", "RED", 200)
        size_m = add_property_enum(size_property["id"], "M", "M", 100)
        size_l = add_property_enum(size_property["id"], "L", "L", 200)

    except BitrixAPIError as error:
        print(f"Ошибка: {error}")

    else:
        print({
            "colorPropertyId": color_property["id"],
            "colorBlueId": color_blue["id"],
            "colorRedId": color_red["id"],
            "sizePropertyId": size_property["id"],
            "sizeValueIds": [size_m["id"], size_l["id"]],
            "certificatePropertyId": certificate_property["id"],
            "galleryPropertyId": gallery_property["id"],
        })
    ```

{% endlist %}

После выполнения первого шага сохраните идентификаторы свойств и значений списка. Они понадобятся при создании товара.

```json
{
    "colorPropertyId": 431,
    "colorBlueId": 1739,
    "colorRedId": 1740,
    "sizePropertyId": 432,
    "sizeValueIds": [
        1741,
        1742
    ],
    "certificatePropertyId": 433,
    "galleryPropertyId": 434
}
```

При повторном запуске примера измените `code` свойств и `xmlId` значений списка или используйте уже созданные идентификаторы. Иначе методы могут вернуть ошибку дубликата.

## 2. Добавим товар со значениями свойств

Метод [catalog.product.add](../../api-reference/catalog/product/catalog-product-add.md) принимает значения свойств в параметре `fields`. Имя поля формируется как `propertyN`, где `N` — идентификатор свойства.

Для разных типов свойств используйте разные форматы значений:

- списочное свойство — идентификатор значения списка
- множественное списочное свойство — массив идентификаторов значений списка
- файловое свойство — объект `{value: {fileData: [fileName, base64]}}`
- множественное файловое свойство — массив объектов `{value: {fileData: [fileName, base64]}}`

Для работы примера создайте папку `pictures` рядом с файлом примера и добавьте файлы `certificate.pdf`, `gallery-1.jpg` и `gallery-2.jpg`.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { readFile } from 'node:fs/promises'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    const iblockId = 23
    const colorPropertyId = 431
    const colorBlueId = 1739
    const sizePropertyId = 432
    const sizeValueIds = [1741, 1742]
    const certificatePropertyId = 433
    const galleryPropertyId = 434

    async function encodeFile(filePath) {
        const content = await readFile(filePath)

        return [filePath.split('/').pop(), content.toString('base64')]
    }

    async function addProduct() {
        const fields = {
            iblockId: iblockId,
            name: 'Футболка с принтом',
            active: 'Y',
            sort: 100,
            ['property' + colorPropertyId]: colorBlueId,
            ['property' + sizePropertyId]: sizeValueIds,
            ['property' + certificatePropertyId]: {
                value: {
                    fileData: await encodeFile('pictures/certificate.pdf')
                }
            },
            ['property' + galleryPropertyId]: [
                {
                    value: {
                        fileData: await encodeFile('pictures/gallery-1.jpg')
                    }
                },
                {
                    value: {
                        fileData: await encodeFile('pictures/gallery-2.jpg')
                    }
                }
            ]
        }

        const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.add',
            params: { fields },
            requestId: 'product-add'
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        const productId = Number(response.getData().result.element.id)
        console.log('Товар добавлен: ' + productId)
    }

    try {
        await addProduct()
    } catch (error) {
        console.error('Ошибка:', error.message)
    } finally {
        $b24.destroy()
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $iblockId = 23;
    $colorPropertyId = 431;
    $colorBlueId = 1739;
    $sizePropertyId = 432;
    $sizeValueIds = [1741, 1742];
    $certificatePropertyId = 433;
    $galleryPropertyId = 434;

    function encodeFile(string $path): array
    {
        if (!file_exists($path))
        {
            throw new RuntimeException('Файл не найден: '.$path);
        }

        return [
            basename($path),
            base64_encode(file_get_contents($path)),
        ];
    }

    try
    {
        $fields = [
            'iblockId' => $iblockId,
            'name' => 'Футболка с принтом',
            'active' => 'Y',
            'sort' => 100,
            'property'.$colorPropertyId => $colorBlueId,
            'property'.$sizePropertyId => $sizeValueIds,
            'property'.$certificatePropertyId => [
                'value' => [
                    'fileData' => encodeFile('pictures/certificate.pdf'),
                ],
            ],
            'property'.$galleryPropertyId => [
                [
                    'value' => [
                        'fileData' => encodeFile('pictures/gallery-1.jpg'),
                    ],
                ],
                [
                    'value' => [
                        'fileData' => encodeFile('pictures/gallery-2.jpg'),
                    ],
                ],
            ],
        ];

        $productId = $b24->getCatalogScope()->product()->add($fields)->product()->id;

        echo 'Товар добавлен: '.$productId;
    }
    catch (BaseException|RuntimeException $exception)
    {
        echo 'Ошибка: '.$exception->getMessage();
    }
    ?>
    ```

- Python

    ```python
    # pip install b24pysdk
    import base64

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    iblock_id = 23
    color_property_id = 431
    color_blue_id = 1739
    size_property_id = 432
    size_value_ids = [1741, 1742]
    certificate_property_id = 433
    gallery_property_id = 434


    def encode_file(path):
        with open(path, "rb") as file:
            return [path.split("/")[-1], base64.b64encode(file.read()).decode()]


    fields = {
        "iblockId": iblock_id,
        "name": "Футболка с принтом",
        "active": "Y",
        "sort": 100,
        f"property{color_property_id}": color_blue_id,
        f"property{size_property_id}": size_value_ids,
        f"property{certificate_property_id}": {
            "value": {
                "fileData": encode_file("pictures/certificate.pdf"),
            },
        },
        f"property{gallery_property_id}": [
            {
                "value": {
                    "fileData": encode_file("pictures/gallery-1.jpg"),
                },
            },
            {
                "value": {
                    "fileData": encode_file("pictures/gallery-2.jpg"),
                },
            },
        ],
    }

    try:
        element = client.catalog.product.add(fields=fields).response.result["element"]
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        print(f"Товар добавлен: {element['id']}")
    ```

{% endlist %}

Если товар добавлен успешно, метод вернет объект `element`. В ответе будут поля товара и значения пользовательских свойств. Файловые свойства возвращаются со ссылкой на загруженный файл, а не с исходной строкой Base64.

```json
{
    "result": {
        "element": {
            "id": 1267,
            "iblockId": 23,
            "name": "Футболка с принтом",
            "active": "Y",
            "property431": {
                "value": "1739",
                "valueEnum": "Синий",
                "valueId": "9816"
            },
            "property432": [
                {
                    "value": "1741",
                    "valueEnum": "M",
                    "valueId": "9817"
                },
                {
                    "value": "1742",
                    "valueEnum": "L",
                    "valueId": "9818"
                }
            ],
            "property433": {
                "value": {
                    "id": "4801",
                    "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property433&fields%5BfileId%5D=4801&fields%5BproductId%5D=1267",
                    "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property433&fields%5BfileId%5D=4801&fields%5BproductId%5D=1267"
                },
                "valueId": "9819"
            },
            "property434": [
                {
                    "value": {
                        "id": "4803",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property434&fields%5BfileId%5D=4803&fields%5BproductId%5D=1267",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property434&fields%5BfileId%5D=4803&fields%5BproductId%5D=1267"
                    },
                    "valueId": "9820"
                },
                {
                    "value": {
                        "id": "4805",
                        "url": "/rest/catalog.product.download?fields%5BfieldName%5D=property434&fields%5BfileId%5D=4805&fields%5BproductId%5D=1267",
                        "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=property434&fields%5BfileId%5D=4805&fields%5BproductId%5D=1267"
                    },
                    "valueId": "9821"
                }
            ]
        }
    }
}
```

Сохраните значение `element.id` из ответа. Это идентификатор созданного товара, который нужно передать в параметр `productId` при добавлении цены.

## 3. Добавим цену товара

Метод [catalog.product.add](../../api-reference/catalog/product/catalog-product-add.md) не добавляет цену товара. Чтобы товар можно было использовать в сценариях продаж с ценой, вызовите [catalog.price.add](../../api-reference/catalog/price/catalog-price-add.md).

В примерах ниже замените `1267` на значение `element.id`, полученное на предыдущем шаге.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/')

    const productId = 1267
    const catalogGroupId = 1

    try {
        const response = await $b24.actions.v2.call.make({
            method: 'catalog.price.add',
            params: {
                fields: {
                    productId: productId,
                    catalogGroupId: catalogGroupId,
                    price: 4900,
                    currency: 'RUB'
                }
            },
            requestId: 'price-add'
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        console.log('Цена добавлена: ' + response.getData().result.price.id)
    } catch (error) {
        console.error('Ошибка:', error.message)
    } finally {
        $b24.destroy()
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/');

    $productId = 1267;
    $catalogGroupId = 1;

    try
    {
        $price = $b24->core->call(
            'catalog.price.add',
            [
                'fields' => [
                    'productId' => $productId,
                    'catalogGroupId' => $catalogGroupId,
                    'price' => 4900,
                    'currency' => 'RUB',
                ],
            ]
        )->getResponseData()->getResult()['price'];

        echo 'Цена добавлена: '.$price['id'];
    }
    catch (BaseException $exception)
    {
        echo 'Ошибка: '.$exception->getMessage();
    }
    ?>
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    product_id = 1267
    catalog_group_id = 1

    try:
        price = client.catalog.price.add(
            fields={
                "productId": product_id,
                "catalogGroupId": catalog_group_id,
                "price": 4900,
                "currency": "RUB",
            },
        ).response.result["price"]
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    else:
        print(f"Цена добавлена: {price['id']}")
    ```

{% endlist %}

Если цена добавлена успешно, метод вернет объект `price`.

```json
{
    "result": {
        "price": {
            "id": 987,
            "productId": 1267,
            "catalogGroupId": 1,
            "price": 4900,
            "priceScale": 4900,
            "currency": "RUB",
            "extraId": null,
            "quantityFrom": null,
            "quantityTo": null,
            "timestampX": "2024-11-01T17:00:55+03:00"
        }
    }
}
```

## Проверим результат

Откройте карточку товара в каталоге. В карточке появятся значения свойств `Цвет`, `Размеры`, `Сертификат` и `Галерея`, а в ценах товара появится значение `4900 RUB`.

Для автоматической проверки вызовите:

- [catalog.product.get](../../api-reference/catalog/product/catalog-product-get.md) с `id` созданного товара. В ответе должны быть `name`, `iblockId` и поля `propertyN` для созданных свойств, например `property431`, `property432`
- [catalog.price.list](../../api-reference/catalog/price/catalog-price-list.md) с фильтром по `productId` созданного товара. В ответе должна быть цена с `price: 4900` и `currency: RUB`

Если метод вернул ошибку, проверьте данные запроса.

- `The specified iblock is not a product catalog` — в `iblockId` передан идентификатор инфоблока, который не является торговым каталогом
- `Invalid property type specified` — передана недопустимая комбинация `propertyType` и `userType`
- `Only list properties are supported` — значение списка добавляется для свойства, тип которого не `L`
- `Required fields: iblockId, name, propertyType` — не переданы обязательные поля свойства
- `A value with xmlId '...' already exists.` — значение списка с таким `xmlId` уже существует. Используйте существующий идентификатор значения или передайте новый `xmlId`
- `Код свойства не может начинаться с цифры` — значение `code` свойства начинается с цифры
- `Access Denied` — у пользователя нет прав на изменение каталога, свойств, товара или цены
- `Validate price error. Catalog price group is wrong` — в `catalogGroupId` передан неверный тип цены

Метод может не вернуть ошибку, но и не сохранить значение свойства.

- `propertyN: "N"` в ответе вместо значения списка — у одиночного списочного свойства всего одно значение, поэтому Битрикс24 определил его как свойство «Да/Нет». Добавьте свойству второе значение списка методом [catalog.productPropertyEnum.add](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-add.md)
- `propertyN: null` при изменении товара — метод [catalog.product.update](../../api-reference/catalog/product/catalog-product-update.md) не принимает идентификатор значения списка напрямую. Передайте его в формате `{value: 1739}`

## Продолжите изучение

- [{#T}](../../api-reference/catalog/product/catalog-product-add.md)
- [{#T}](../../api-reference/catalog/product/catalog-product-get.md)
- [{#T}](../../api-reference/catalog/product-property/catalog-product-property-add.md)
- [{#T}](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-add.md)
- [{#T}](../../api-reference/catalog/price/catalog-price-add.md)
- [{#T}](../../api-reference/catalog/price/catalog-price-list.md)
- [{#T}](../../api-reference/catalog/product/catalog-product-list.md)
