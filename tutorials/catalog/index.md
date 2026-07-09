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

- JS-код выполняется в приложении Битрикс24, где доступен объект `BX24`
- PHP-код использует класс `CRest`; настройте вебхук или OAuth-авторизацию для вызовов методов
- файлы для загрузки должны быть доступны коду примера: в JS — по относительному URL приложения, в PHP — по пути на сервере

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

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const iblockId = 23;

    function callMethod(method, params) {
        return new Promise((resolve, reject) => {
            BX24.callMethod(method, params, function(result) {
                if (result.error()) {
                    reject(result.error() + ': ' + result.error_description());
                    return;
                }

                resolve(result.data());
            });
        });
    }

    async function prepareProperties() {
        const colorProperty = await callMethod(
            'catalog.productProperty.add',
            {
                fields: {
                    iblockId: iblockId,
                    name: 'Цвет',
                    code: 'COLOR',
                    propertyType: 'L',
                    listType: 'L',
                    multiple: 'N',
                    active: 'Y',
                    sort: 100
                }
            }
        );

        const sizeProperty = await callMethod(
            'catalog.productProperty.add',
            {
                fields: {
                    iblockId: iblockId,
                    name: 'Размеры',
                    code: 'SIZES',
                    propertyType: 'L',
                    listType: 'C',
                    multiple: 'Y',
                    active: 'Y',
                    sort: 200
                }
            }
        );

        const certificateProperty = await callMethod(
            'catalog.productProperty.add',
            {
                fields: {
                    iblockId: iblockId,
                    name: 'Сертификат',
                    code: 'CERTIFICATE',
                    propertyType: 'F',
                    multiple: 'N',
                    active: 'Y',
                    sort: 300
                }
            }
        );

        const galleryProperty = await callMethod(
            'catalog.productProperty.add',
            {
                fields: {
                    iblockId: iblockId,
                    name: 'Галерея',
                    code: 'GALLERY',
                    propertyType: 'F',
                    multiple: 'Y',
                    active: 'Y',
                    sort: 400
                }
            }
        );

        const colorBlue = await callMethod(
            'catalog.productPropertyEnum.add',
            {
                fields: {
                    propertyId: colorProperty.productProperty.id,
                    value: 'Синий',
                    xmlId: 'BLUE',
                    sort: 100
                }
            }
        );

        const sizeM = await callMethod(
            'catalog.productPropertyEnum.add',
            {
                fields: {
                    propertyId: sizeProperty.productProperty.id,
                    value: 'M',
                    xmlId: 'M',
                    sort: 100
                }
            }
        );

        const sizeL = await callMethod(
            'catalog.productPropertyEnum.add',
            {
                fields: {
                    propertyId: sizeProperty.productProperty.id,
                    value: 'L',
                    xmlId: 'L',
                    sort: 200
                }
            }
        );

        console.log({
            colorPropertyId: colorProperty.productProperty.id,
            colorBlueId: colorBlue.productPropertyEnum.id,
            sizePropertyId: sizeProperty.productProperty.id,
            sizeValueIds: [
                sizeM.productPropertyEnum.id,
                sizeL.productPropertyEnum.id
            ],
            certificatePropertyId: certificateProperty.productProperty.id,
            galleryPropertyId: galleryProperty.productProperty.id
        });
    }

    prepareProperties().catch(console.error);
    ```

- PHP

    ```php
    <?php
    require_once('crest.php');

    $iblockId = 23;

    function callRestMethod(string $method, array $params): array
    {
        $result = CRest::call($method, $params);

        if (!empty($result['error']))
        {
            throw new RuntimeException($result['error_description']);
        }

        return $result['result'];
    }

    try
    {
        $colorProperty = callRestMethod(
            'catalog.productProperty.add',
            [
                'fields' => [
                    'iblockId' => $iblockId,
                    'name' => 'Цвет',
                    'code' => 'COLOR',
                    'propertyType' => 'L',
                    'listType' => 'L',
                    'multiple' => 'N',
                    'active' => 'Y',
                    'sort' => 100,
                ],
            ]
        );

        $sizeProperty = callRestMethod(
            'catalog.productProperty.add',
            [
                'fields' => [
                    'iblockId' => $iblockId,
                    'name' => 'Размеры',
                    'code' => 'SIZES',
                    'propertyType' => 'L',
                    'listType' => 'C',
                    'multiple' => 'Y',
                    'active' => 'Y',
                    'sort' => 200,
                ],
            ]
        );

        $certificateProperty = callRestMethod(
            'catalog.productProperty.add',
            [
                'fields' => [
                    'iblockId' => $iblockId,
                    'name' => 'Сертификат',
                    'code' => 'CERTIFICATE',
                    'propertyType' => 'F',
                    'multiple' => 'N',
                    'active' => 'Y',
                    'sort' => 300,
                ],
            ]
        );

        $galleryProperty = callRestMethod(
            'catalog.productProperty.add',
            [
                'fields' => [
                    'iblockId' => $iblockId,
                    'name' => 'Галерея',
                    'code' => 'GALLERY',
                    'propertyType' => 'F',
                    'multiple' => 'Y',
                    'active' => 'Y',
                    'sort' => 400,
                ],
            ]
        );

        $colorBlue = callRestMethod(
            'catalog.productPropertyEnum.add',
            [
                'fields' => [
                    'propertyId' => $colorProperty['productProperty']['id'],
                    'value' => 'Синий',
                    'xmlId' => 'BLUE',
                    'sort' => 100,
                ],
            ]
        );

        $sizeM = callRestMethod(
            'catalog.productPropertyEnum.add',
            [
                'fields' => [
                    'propertyId' => $sizeProperty['productProperty']['id'],
                    'value' => 'M',
                    'xmlId' => 'M',
                    'sort' => 100,
                ],
            ]
        );

        $sizeL = callRestMethod(
            'catalog.productPropertyEnum.add',
            [
                'fields' => [
                    'propertyId' => $sizeProperty['productProperty']['id'],
                    'value' => 'L',
                    'xmlId' => 'L',
                    'sort' => 200,
                ],
            ]
        );

        print_r([
            'colorPropertyId' => $colorProperty['productProperty']['id'],
            'colorBlueId' => $colorBlue['productPropertyEnum']['id'],
            'sizePropertyId' => $sizeProperty['productProperty']['id'],
            'sizeValueIds' => [
                $sizeM['productPropertyEnum']['id'],
                $sizeL['productPropertyEnum']['id'],
            ],
            'certificatePropertyId' => $certificateProperty['productProperty']['id'],
            'galleryPropertyId' => $galleryProperty['productProperty']['id'],
        ]);
    }
    catch (Throwable $exception)
    {
        echo 'Ошибка: '.$exception->getMessage();
    }
    ?>
    ```

{% endlist %}

После выполнения первого шага сохраните идентификаторы свойств и значений списка. Они понадобятся при создании товара.

```json
{
    "colorPropertyId": 431,
    "colorBlueId": 1739,
    "sizePropertyId": 432,
    "sizeValueIds": [
        1740,
        1741
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
    const iblockId = 23;
    const colorPropertyId = 431;
    const colorBlueId = 1739;
    const sizePropertyId = 432;
    const sizeValueIds = [1740, 1741];
    const certificatePropertyId = 433;
    const galleryPropertyId = 434;

    function fileToBase64(filePath) {
        return fetch(filePath)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    }

    async function addProduct() {
        const certificateBase64 = await fileToBase64('pictures/certificate.pdf');
        const galleryFirstBase64 = await fileToBase64('pictures/gallery-1.jpg');
        const gallerySecondBase64 = await fileToBase64('pictures/gallery-2.jpg');

        const fields = {
            iblockId: iblockId,
            name: 'Футболка с принтом',
            active: 'Y',
            sort: 100,
            ['property' + colorPropertyId]: colorBlueId,
            ['property' + sizePropertyId]: sizeValueIds,
            ['property' + certificatePropertyId]: {
                value: {
                    fileData: [
                        'certificate.pdf',
                        certificateBase64
                    ]
                }
            },
            ['property' + galleryPropertyId]: [
                {
                    value: {
                        fileData: [
                            'gallery-1.jpg',
                            galleryFirstBase64
                        ]
                    }
                },
                {
                    value: {
                        fileData: [
                            'gallery-2.jpg',
                            gallerySecondBase64
                        ]
                    }
                }
            ]
        };

        BX24.callMethod(
            'catalog.product.add',
            {
                fields: fields
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error() + ': ' + result.error_description());
                    return;
                }

                const productId = Number(result.data().element.id);
                console.log('Товар добавлен: ' + productId);
            }
        );
    }

    addProduct().catch(console.error);
    ```

- PHP

    ```php
    <?php
    require_once('crest.php');

    $iblockId = 23;
    $colorPropertyId = 431;
    $colorBlueId = 1739;
    $sizePropertyId = 432;
    $sizeValueIds = [1740, 1741];
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

        $result = CRest::call(
            'catalog.product.add',
            [
                'fields' => $fields,
            ]
        );

        if (!empty($result['error']))
        {
            echo 'Ошибка: '.$result['error_description'];
            return;
        }

        $productId = (int)$result['result']['element']['id'];
        echo 'Товар добавлен: '.$productId;
    }
    catch (Throwable $exception)
    {
        echo 'Ошибка: '.$exception->getMessage();
    }
    ?>
    ```

{% endlist %}

Если товар добавлен успешно, метод вернет объект `element`. В ответе будут поля товара и значения пользовательских свойств.

```json
{
    "result": {
        "element": {
            "id": 1267,
            "iblockId": 23,
            "name": "Футболка с принтом",
            "property431": {
                "value": "1739",
                "valueId": "9816"
            },
            "property432": [
                {
                    "value": "1740",
                    "valueId": "9817"
                },
                {
                    "value": "1741",
                    "valueId": "9818"
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
    const productId = 1267;
    const catalogGroupId = 1;

    BX24.callMethod(
        'catalog.price.add',
        {
            fields: {
                productId: productId,
                catalogGroupId: catalogGroupId,
                price: 4900,
                currency: 'RUB'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error() + ': ' + result.error_description());
                return;
            }

            console.log('Цена добавлена: ' + result.data().price.id);
        }
    );
    ```

- PHP

    ```php
    <?php
    require_once('crest.php');

    $productId = 1267;
    $catalogGroupId = 1;

    $result = CRest::call(
        'catalog.price.add',
        [
            'fields' => [
                'productId' => $productId,
                'catalogGroupId' => $catalogGroupId,
                'price' => 4900,
                'currency' => 'RUB',
            ],
        ]
    );

    if (!empty($result['error']))
    {
        echo 'Ошибка: '.$result['error_description'];
    }
    else
    {
        echo 'Цена добавлена: '.$result['result']['price']['id'];
    }
    ?>
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
            "currency": "RUB"
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

## Продолжите изучение

- [{#T}](../../api-reference/catalog/product/catalog-product-add.md)
- [{#T}](../../api-reference/catalog/product/catalog-product-get.md)
- [{#T}](../../api-reference/catalog/product-property/catalog-product-property-add.md)
- [{#T}](../../api-reference/catalog/product-property-enum/catalog-product-property-enum-add.md)
- [{#T}](../../api-reference/catalog/price/catalog-price-add.md)
- [{#T}](../../api-reference/catalog/price/catalog-price-list.md)
- [{#T}](../../api-reference/catalog/product/catalog-product-list.md)
