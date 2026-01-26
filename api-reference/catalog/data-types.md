# Типы данных и структура объектов в REST API Каталога

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Сделать описание объекта rest_field_description

{% endnote %}

{% endif %}

Базовые типы данных перечислены в отдельной [статье](../data-types.md).

В этой статье рассмотрим типы данных и структуру объектов, характерные именно для Каталога CRM.

## Типы данных

#|
|| **Тип** | **Описания и значения** ||
|| [`catalog_catalog.id`](#catalog_catalog) | Целочисленный идентификатор торгового каталога (например, `1`). Получить идентификаторы торговых каталогов можно с помощью метода [catalog.catalog.list](./catalog/catalog-catalog-list.md) ||
|| [`catalog_document.id`](#catalog_document) | Целочисленный идентификатор документа складского учета, например `1`. Получить идентификаторы документов можно с помощью метода [catalog.document.list](./document/catalog-document-list.md) ||
|| [`catalog_document_element.id`](#catalog_document_element) | Целочисленный идентификатор товара документа складского учета, например `1`. Получить идентификаторы товаров в документах можно с помощью метода [catalog.document.element.list](./document/document-element/catalog-document-element-list.md) ||
|| [`catalog_documentcontractor.id`](#catalog_documentcontractor) | Целочисленный идентификатор привязки поставщика к документу складского учета, например `1`. Получить идентификаторы привязок можно с помощью метода [catalog.documentcontractor.list](./documentcontractor/catalog-documentcontractor-list.md) ||
|| [`catalog_product.id`](#catalog_product) | Целочисленный идентификатор товара (например, `1`). Получить идентификаторы товаров можно с помощью метода [catalog.product.list](./product/catalog-product-list.md) ||
|| [`catalog_product_sku.id`](#catalog_product_sku) | Целочисленный идентификатор головного товара (например, `1`). Получить идентификаторы головных товаров можно с помощью метода [catalog.product.sku.list](./product/sku/catalog-product-sku-list.md) ||
|| [`catalog_product_offer.id`](#catalog_product_offer) | Целочисленный идентификатор вариации товара (например, `1`). Получить идентификаторы вариаций товаров можно с помощью метода [catalog.product.offer.list](./product/offer/catalog-product-offer-list.md) ||
|| [`catalog_product_service.id`](#catalog_product_service) | Целочисленный идентификатор услуги (например, `1`). Получить идентификаторы услуг можно с помощью метода [catalog.product.service.list](./product/service/catalog-product-service-list.md) ||
|| [`catalog_product_image.id`](#catalog_product_image) | Целочисленный идентификатор изображения товара (например, `1`). Получить идентификаторы изображений товаров можно с помощью метода [catalog.productImage.list](./product-image/catalog-product-image-list.md) ||
|| [`catalog_store.id`](#catalog_store) | Целочисленный идентификатор склада (например, `1`). Получить идентификаторы складов можно с помощью метода [catalog.store.list](./store/catalog-store-list.md) ||
|| [`catalog_measure.id`](#catalog_measure) | Целочисленный идентификатор единицы измерения (например, `1`). Получить идентификаторы единиц измерения можно с помощью метода [catalog.measure.list](./measure/catalog-measure-list.md) ||
|| [`catalog_ratio.id`](#catalog_ratio) | Целочисленный идентификатор коэффициента единицы измерения (например, `1`). Получить идентификаторы коэффициентов единиц измерения можно с помощью метода [catalog.ratio.list](./ratio/catalog-ratio-list.md) ||
|| [`catalog_price.id`](#catalog_price) | Целочисленный идентификатор цены, например `1`. Получить идентификаторы цен можно с помощью метода [catalog.price.list](./price/catalog-price-list.md) ||
|| [`catalog_price_type.id`](#catalog_price_type) | Целочисленный идентификатор типа цены (например, `1`). Получить идентификаторы типов цены можно с помощью метода [catalog.priceType.list](./price-type/catalog-price-type-list.md) ||
|| [`catalog_price_type_lang.id`](#catalog_price_type_lang) | Целочисленный идентификатор перевода названий типов цен (например, `1`). Получить идентификаторы переводов можно с помощью метода [catalog.priceTypeLang.list](./price-type/price-type-lang/catalog-price-type-lang-list.md) ||
|| [`catalog_language.lid`](#catalog_language) | Строковый идентификатор языка, состоящий из двух символов (например, `ru`). Получить идентификаторы языков можно с помощью метода [catalog.priceTypeLang.getLanguages](./price-type/price-type-lang/catalog-price-type-lang-get-languages.md) ||
|| [`catalog_rounding_rule.id`](#catalog_rounding_rule) | Целочисленный идентификатор правила округления цен (например, `1`). Получить идентификаторы правил округления цен можно с помощью метода [catalog.roundingRule.list](./rounding-rule/catalog-rounding-rule-list.md) ||
|| [`catalog_extra.id`](#catalog_extra) | Целочисленный идентификатор наценки (например, `1`). Получить идентификаторы наценок можно с помощью метода [catalog.extra.list](./extra/catalog-extra-list.md) ||
|| [`catalog_section.id`](#catalog_section) | Целочисленный идентификатор раздела каталога (например, `1`). Получить идентификаторы разделов каталога можно с помощью метода [catalog.section.list](./section/catalog-section-list.md) ||
|| [`catalog_storeproduct.id`](#catalog_storeproduct) | Целочисленный идентификатор записи остатков товара на складе, например `1`. Получить идентификаторы можно с помощью метода [catalog.storeproduct.list](./store-product/catalog-store-product-list.md) ||
|| [`catalog_vat.id`](#catalog_vat) | Целочисленный идентификатор ставки НДС (например, `1`). Получить идентификаторы ставки НДС можно с помощью метода [catalog.vat.list](./vat/catalog-vat-list.md) ||
|#

## Структура объектов

### catalog_catalog

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор торгового каталога ||
|| **iblockId**
[`integer`](../data-types.md) | Идентификатор информационного блока торгового каталога ||
|| **iblockTypeId**
[`string`](../data-types.md) | Тип информационного блока торгового каталога. Для торговых каталогов CRM имеет постоянное значение `CRM_PRODUCT_CATALOG` ||
|| **lid**
[`string`](../data-types.md) | Идентификатор сайта. Имеет постоянное значение `s1` ||
|| **name**
[`string`](../data-types.md) | Название торгового каталога ||
|| **productIblockId**
[`integer`](../data-types.md) | Идентификатор родительского информационного блока торгового каталога. Заполняется только для торгового каталога вариаций.

Для получения существующих идентификаторов информационных блоков необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md)
||
|| **skuPropertyId**
[`integer`](../data-types.md) | Идентификатор свойства, в котором хранится идентификатор родительского товара. Заполняется только для торгового каталога вариаций.

Для получения существующих идентификаторов свойств необходимо использовать [catalog.productProperty.list](./product-property/catalog-product-property-list.md)
||
|| **subscription**
[`string`](../data-types.md) | Производится ли продажа контента. Возможные значения:
- `Y` — да
- `N` — нет

Параметр используется только в коробочной версии
||
|| **vatId**
[`catalog_vat.id`](#catalog_vat) | Идентификатор НДС.

Для получения существующих идентификаторов НДС необходимо использовать [catalog.vat.list](./vat/catalog-vat-list.md)
||
|#

### catalog_document

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор документа складского учета ||
|| **docType**
[`string`](../data-types.md) | Тип документа. Доступные типы можно получить методом  [catalog.enum.getStoreDocumentTypes](./enum/catalog-enum-get-store-document-types.md) ||
|| **docNumber**
[`string`](../data-types.md) | Внутренний номер документа. Если не передать, генерируется автоматически ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **siteId**
[`string`](../data-types.md) | Код сайта, к которому относится документ. По умолчанию — `s1` ||
|| **responsibleId**
[`integer`](../data-types.md) | Идентификатор ответственного ||
|| **createdBy**
[`integer`](../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **modifiedBy**
[`integer`](../data-types.md) | Идентификатор пользователя, изменившего документ ||
|| **status**
[`string`](../data-types.md) | Статус документа:
- `N` — черновик,
- `Y` — проведен,
- `C` — отменен.
  
Значение изменяется автоматически при проведении или отмене документа ||
|| **statusBy**
[`integer`](../data-types.md) | Пользователь, изменивший статус документа ||
|| **dateStatus**
[`datetime`](../data-types.md) | Дата изменения статуса ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания документа ||
|| **dateModify**
[`datetime`](../data-types.md) | Дата последнего изменения документа ||
|| **dateDocument**
[`datetime`](../data-types.md) | Дата проведения документа ||
|| **currency**
[`string`](../data-types.md) | Валюта документа ||
|| **total**
[`double`](../data-types.md) | Общая сумма по товарам документа. Значение рассчитывается автоматически после проведения, но может быть задано вручную ||
|| **commentary**
[`string`](../data-types.md) | Комментарий к документу ||
|#

### catalog_document_element

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор товара документа складского учета ||
|| **docId**
[`catalog_document.id`](#catalog_document) | Идентификатор документа складского учета ||
|| **elementId**
[`catalog_product.id`](#catalog_product) | Идентификатор товара каталога ||
|| **storeFrom**
[`catalog_store.id`](#catalog_store) | Идентификатор склада-источника. Используется для документов, где требуется списание ||
|| **storeTo**
[`catalog_store.id`](#catalog_store) | Идентификатор склада-получателя. Используется для документов поступления и перемещения ||
|| **amount**
[`double`](../data-types.md) | Количество товара ||
|| **purchasingPrice**
[`double`](../data-types.md) | Закупочная цена ||
|#

### catalog_documentcontractor

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор привязки поставщика к документу складского учета ||
|| **documentId**
[`catalog_document.id`](#catalog_document) | Идентификатор документа складского учета, к которому привязан поставщик ||
|| **entityTypeId**
[`integer`](../data-types.md) | Идентификатор типа объекта CRM:
`3` — контакт 
`4` — компания  ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор поставщика: контакта или компании ||
|#

### catalog_product

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор товара ||
|| **iblockId**
[`catalog_catalog.id`](#catalog_catalog) | Идентификатор информационного блока торгового каталога.

Для получения существующих идентификаторов информационных блоков необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md)
||
|| **name**
[`string`](../data-types.md) | Наименование товара ||
|| **active**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **available**
[`string`](../data-types.md) | Доступность для покупки. Только для чтения. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **code**
[`string`](../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код ||
|| **barcodeMulti**
[`string`](../data-types.md) | Уникальные штрихкоды для каждого экземпляра. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **bundle**
[`string`](../data-types.md) | Наличие набора. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **canBuyZero**
[`string`](../data-types.md) | Разрешается ли покупка товара при его отсутствии. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **dateActiveFrom**
[`datetime`](../data-types.md) | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../data-types.md) | Дата окончания активности ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения. Только для чтения ||
|| **iblockSectionId**
[`catalog_section.id`](#catalog_section) | Идентификатор раздела информационного блока ||
|| **measure**
[`catalog_measure.id`](#catalog_measure) | Единица измерения ||
|| **previewText**
[`string`](../data-types.md) | Описание для анонса ||
|| **detailText**
[`string`](../data-types.md) | Детальное описание ||
|| **previewPicture**
[`object`](../data-types.md) | Картинка для анонса. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **detailPicture**
[`object`](../data-types.md) | Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **previewTextType**
[`string`](../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **detailTextType**
[`string`](../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **subscribe**
[`string`](../data-types.md) | Разрешение подписки на товар. Возможные значения:
- `Y` — да
- `N` — нет
- `D` — по умолчанию
||
|| **vatId**
[`catalog_vat.id`](#catalog_vat) | Идентификатор НДС ||
|| **vatIncluded**
[`string`](../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **height**
[`float`](../data-types.md) | Высота товара ||
|| **length**
[`float`](../data-types.md) | Длина товара ||
|| **weight**
[`float`](../data-types.md) | Вес товара ||
|| **width**
[`float`](../data-types.md) | Ширина товара ||
|| **quantityTrace**
[`string`](../data-types.md) | Режим количественного учета. Возможные значения:
- `Y` — включен
- `N` — выключен
- `D` — по умолчанию
||
|| **type**
[`integer`](../data-types.md) | Тип товара. Только для чтения. Возможные значения:
- `1` — простой товар
||
|| **purchasingCurrency**
[`string`](../data-types.md) | Валюта закупочной цены.

Список валют можно получить методом [crm.currency.list](../crm/currency/crm-currency-list.md).

Не редактируется при включенном складском учете
||
|| **purchasingPrice**
[`float`](../data-types.md) | Закупочная цена.

Не редактируется при включенном складском учете
||
|| **quantity**
[`float`](../data-types.md) | Количество.

Не редактируется при включенном складском учете
||
|| **quantityReserved**
[`float`](../data-types.md) | Зарезервированное количество.

Не редактируется при включенном складском учете
||
|| **recurSchemeLength**
[`integer`](../data-types.md) | Длина периода оплаты.

Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../data-types.md) | Единица времени периода оплаты. Возможные значения:
- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год

Используется только в коробочной версии для продажи контента
||
|| **trialPriceId**
[`integer`](../data-types.md) | Товар для пробной оплаты.

Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../data-types.md) | Продление без оформления заказа. Возможные значения:
- `Y` — да
- `N` — нет

Используется только в коробочной версии для продажи контента
||
|| **propertyN**
[`object\|array`](../data-types.md) | Значение свойства товара, где `N` — идентификатор свойства. Свойств может быть несколько. 

Значение указывается в формате `{valueId: valueId, value: value}` либо в формате `[{valueId: valueId1, value: value1}, ..., {valueId: valueIdN, value: valueN}]`, если свойство множественное. Здесь `valueId` — идентификатор значения свойства, а `value` — значение свойства. 

Если не указать `valueId`, то существующее значение будет удалено из базы данных и заменено на новое, указанное в `value`. Если свойство множественное, то все существующие значения свойства, для которых не был указан `valueId`, будут удалены.

`valueId` всех свойств товара можно получить с помощью методов [catalog.product.get](./product/catalog-product-get.md) и [catalog.product.list](./product/catalog-product-list.md)
||
|#

### catalog_product_sku

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор головного товара ||
|| **iblockId**
[`catalog_catalog.id`](#catalog_catalog) | Идентификатор информационного блока торгового каталога.

Для получения существующих идентификаторов информационных блоков необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md)
||
|| **name**
[`string`](../data-types.md) | Наименование головного товара ||
|| **active**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **available**
[`string`](../data-types.md) | Доступность для покупки. Только для чтения. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **code**
[`string`](../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код ||
|| **bundle**
[`string`](../data-types.md) | Наличие набора. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **canBuyZero**
[`string`](../data-types.md) | Разрешается ли покупка головного товара при его отсутствии. Возможные значения:
- `Y` — да
- `N` — нет 

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **dateActiveFrom**
[`datetime`](../data-types.md) | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../data-types.md) | Дата окончания активности ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения. Только для чтения ||
|| **iblockSectionId**
[`catalog_section.id`](#catalog_section) | Идентификатор раздела информационного блока ||
|| **measure**
[`catalog_measure.id`](#catalog_measure) | Единица измерения.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **previewText**
[`string`](../data-types.md) | Описание для анонса ||
|| **detailText**
[`string`](../data-types.md) | Детальное описание ||
|| **previewPicture**
[`object`](../data-types.md) | Картинка для анонса. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **detailPicture**
[`object`](../data-types.md) | Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **previewTextType**
[`string`](../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **detailTextType**
[`string`](../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **subscribe**
[`string`](../data-types.md) | Разрешение подписки на головной товар. Возможные значения:
- `Y` — да
- `N` — нет
- `D` — по умолчанию

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **vatId**
[`catalog_vat.id`](#catalog_vat) | Идентификатор НДС.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **vatIncluded**
[`string`](../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **height**
[`float`](../data-types.md) | Высота головного товара.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **length**
[`float`](../data-types.md) | Длина головного товара.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **weight**
[`float`](../data-types.md) | Вес головного товара.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **width**
[`float`](../data-types.md) | Ширина головного товара.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения» ||
|| **type**
[`integer`](../data-types.md) | Тип товара. Только для чтения. Возможные значения:
- `3` — головной товар с вариациями
- `6` — головной товар без вариаций
||
|| **purchasingCurrency**
[`string`](../data-types.md) | Валюта закупочной цены.

Список валют можно получить методом [crm.currency.list](../crm/currency/crm-currency-list.md).

Не редактируется при включенном складском учете.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **purchasingPrice**
[`float`](../data-types.md) | Закупочная цена.

Не редактируется при включенном складском учете.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **quantity**
[`float`](../data-types.md) | Количество.

Не редактируется при включенном складском учете.

Для головных товаров возможность редактирования данного поля доступна только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения»
||
|| **propertyN**
[`object\|array`](../data-types.md) | Значение свойства головного товара, где `N` — идентификатор свойства. Свойств может быть несколько. 

Значение указывается в формате `{valueId: valueId, value: value}` либо в формате `[{valueId: valueId1, value: value1}, ..., {valueId: valueIdN, value: valueN}]`, если свойство множественное. Здесь `valueId` — идентификатор значения свойства, а `value` — значение свойства. 

Если не указать `valueId`, то существующее значение будет удалено из базы данных и заменено на новое, указанное в `value`. Если свойство множественное, то все существующие значения свойства, для которых не был указан `valueId`, будут удалены.

`valueId` всех свойств головного товара можно получить с помощью методов [catalog.product.sku.get](./product/sku/catalog-product-sku-get.md) и [catalog.product.sku.list](./product/sku/catalog-product-sku-list.md)
||
|#

### catalog_product_offer

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор вариации товара ||
|| **iblockId**
[`catalog_catalog.id`](#catalog_catalog) | Идентификатор информационного блока торгового каталога.

Для получения существующих идентификаторов информационных блоков необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md)
||
|| **name**
[`string`](../data-types.md) | Наименование вариации товара ||
|| **active**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **available**
[`string`](../data-types.md) | Доступность для покупки. Только для чтения. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **code**
[`string`](../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код ||
|| **barcodeMulti**
[`string`](../data-types.md) | Уникальные штрихкоды для каждого экземпляра. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **bundle**
[`string`](../data-types.md) | Наличие набора. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **canBuyZero**
[`string`](../data-types.md) | Разрешается ли покупка вариации товара при ее отсутствии. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **dateActiveFrom**
[`datetime`](../data-types.md) | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../data-types.md) | Дата окончания активности ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения. Только для чтения ||
|| **iblockSectionId**
[`catalog_section.id`](#catalog_section) | Идентификатор раздела информационного блока ||
|| **measure**
[`catalog_measure.id`](#catalog_measure) | Единица измерения ||
|| **previewText**
[`string`](../data-types.md) | Описание для анонса ||
|| **detailText**
[`string`](../data-types.md) | Детальное описание ||
|| **previewPicture**
[`object`](../data-types.md) | Картинка для анонса. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **detailPicture**
[`object`](../data-types.md) | Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **previewTextType**
[`string`](../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **detailTextType**
[`string`](../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **subscribe**
[`string`](../data-types.md) | Разрешение подписки на вариацию товара. Возможные значения:
- `Y` — да
- `N` — нет
- `D` — по умолчанию
||
|| **vatId**
[`catalog_vat.id`](#catalog_vat) | Идентификатор НДС ||
|| **vatIncluded**
[`string`](../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **height**
[`float`](../data-types.md) | Высота товара ||
|| **length**
[`float`](../data-types.md) | Длина товара ||
|| **weight**
[`float`](../data-types.md) | Вес товара ||
|| **width**
[`float`](../data-types.md) | Ширина товара ||
|| **quantityTrace**
[`string`](../data-types.md) | Режим количественного учета. Возможные значения:
- `Y` — включен
- `N` — выключен
- `D` — по умолчанию
||
|| **type**
[`integer`](../data-types.md) | Тип товара. Только для чтения. Возможные значения:
- `4` — вариация
- `5` — вариация без товара
||
|| **purchasingCurrency**
[`string`](../data-types.md) | Валюта закупочной цены.

Список валют можно получить методом [crm.currency.list](../crm/currency/crm-currency-list.md).

Не редактируется при включенном складском учете
||
|| **purchasingPrice**
[`float`](../data-types.md) | Закупочная цена.

Не редактируется при включенном складском учете
||
|| **quantity**
[`float`](../data-types.md) | Количество.

Не редактируется при включенном складском учете
||
|| **quantityReserved**
[`float`](../data-types.md) | Зарезервированное количество.

Не редактируется при включенном складском учете
||
|| **recurSchemeLength**
[`integer`](../data-types.md) | Длина периода оплаты.

Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../data-types.md) | Единица времени периода оплаты. Возможные значения:
- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год

Используется только в коробочной версии для продажи контента
||
|| **trialPriceId**
[`integer`](../data-types.md) | Товар для пробной оплаты.

Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../data-types.md) | Продление без оформления заказа. Возможные значения:
- `Y` — да
- `N` — нет

Используется только в коробочной версии для продажи контента
||
|| **propertyN**
[`object\|array`](../data-types.md) | Значение свойства вариации товара, где `N` — идентификатор свойства. Свойств может быть несколько. 

Значение указывается в формате `{valueId: valueId, value: value}` либо в формате `[{valueId: valueId1, value: value1}, ..., {valueId: valueIdN, value: valueN}]`, если свойство множественное. Здесь `valueId` — идентификатор значения свойства, а `value` — значение свойства. 

Если не указать `valueId`, то существующее значение будет удалено из базы данных и заменено на новое, указанное в `value`. Если свойство множественное, то все существующие значения свойства, для которых не был указан `valueId`, будут удалены.

`valueId` всех свойств торгового прдложения можно получить с помощью методов [catalog.product.offer.get](./product/offer/catalog-product-offer-get.md) и [catalog.product.offer.list](./product/offer/catalog-product-offer-list.md)
||
|#

### catalog_product_service

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор услуги ||
|| **iblockId**
[`catalog_catalog.id`](#catalog_catalog) | Идентификатор информационного блока торгового каталога.

Для получения существующих идентификаторов информационных блоков необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md)
||
|| **name**
[`string`](../data-types.md) | Наименование услуги ||
|| **active**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **available**
[`string`](../data-types.md) | Доступность для покупки. Только для чтения. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **code**
[`string`](../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код ||
|| **bundle**
[`string`](../data-types.md) | Наличие набора. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **dateActiveFrom**
[`datetime`](../data-types.md) | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../data-types.md) | Дата окончания активности ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения. Только для чтения ||
|| **iblockSectionId**
[`catalog_section.id`](#catalog_section) | Идентификатор раздела информационного блока ||
|| **measure**
[`catalog_measure.id`](#catalog_measure) | Единица измерения ||
|| **previewText**
[`string`](../data-types.md) | Описание для анонса ||
|| **detailText**
[`string`](../data-types.md) | Детальное описание ||
|| **previewPicture**
[`object`](../data-types.md) | Картинка для анонса. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **detailPicture**
[`object`](../data-types.md) | Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: ‘Y’}` ||
|| **previewTextType**
[`string`](../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **detailTextType**
[`string`](../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML
||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **vatId**
[`catalog_vat.id`](#catalog_vat) | Идентификатор НДС ||
|| **vatIncluded**
[`string`](../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **type**
[`integer`](../data-types.md) | Тип товара. Только для чтения. Возможные значения:
- `7` — услуга
||
|| **propertyN**
[`object\|array`](../data-types.md) | Значение свойства услуги, где `N` — идентификатор свойства. Свойств может быть несколько. 

Значение указывается в формате `{valueId: valueId, value: value}` либо в формате `[{valueId: valueId1, value: value1}, ..., {valueId: valueIdN, value: valueN}]`, если свойство множественное. Здесь `valueId` — идентификатор значения свойства, а `value` — значение свойства. 

Если не указать `valueId`, то существующее значение будет удалено из базы данных и заменено на новое, указанное в `value`. Если свойство множественное, то все существующие значения свойства, для которых не был указан `valueId`, будут удалены.

`valueId` всех свойств услуги можно получить с помощью методов [catalog.product.service.get](./product/service/catalog-product-service-get.md) и [catalog.product.service.list](./product/service/catalog-product-service-list.md)
||
|#

### catalog_product_image

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор изображения ||
|| **name**
[`string`](../data-types.md) | Наименование изображения ||
|| **productId**
[`integer`](../data-types.md) | Идентификатор товара ||
|| **type**
[`string`](../data-types.md) | Тип изображения:
- `DETAIL_PICTURE` — детальная картинка, поле доступно в старой карточке товара
- `PREVIEW_PICTURE` — картинка для анонса, поле доступно в старой карточке товара
- `MORE_PHOTO` — картинка
||
|| **createTime**
[`datetime`](../data-types.md) | Дата создания изображения ||
|| **downloadUrl**
[`string`](../data-types.md) | Ссылка для скачивания, подписанная текущим токеном доступа ||
|| **detailUrl**
[`string`](../data-types.md) | Ссылка на изображение ||
|#

### catalog_store

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор склада ||
|| **address**
[`string`](../data-types.md) | Адрес склада ||
|| **title**
[`string`](../data-types.md) | Название склада ||
|| **active**
[`string`](../data-types.md) | Активность. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **description**
[`string`](../data-types.md) | Описание ||
|| **gpsN**
[`double`](../data-types.md) | GPS-широта ||
|| **gpsS**
[`double`](../data-types.md) | GPS-долгота ||
|| **imageId**
[`object`](../data-types.md) | Изображение. Объект в формате `{fileData: [value1, value2]}`, где:
- `value1` – название файла картинки с расширением
- `value2` – картинка в формате base64

Для удаления картинки используйте объект в формате `{remove: ‘Y’}` ||
|| **dateModify**
[`datetime`](../data-types.md) | Дата изменения ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **userId**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **phone**
[`string`](../data-types.md) | Телефон ||
|| **schedule**
[`string`](../data-types.md) | График работы ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего склада с аналогичной позицией во внешней системе ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **email**
[`string`](../data-types.md) | E-mail ||
|| **issuingCenter**
[`string`](../data-types.md) | Является ли пунктом выдачи. Возможные значения:
- `Y` – да
- `N` – нет ||
|| **code**
[`string`](../data-types.md) | Символьный код ||
|#

### catalog_measure

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор единицы измерения ||
|| **code**
[`integer`](../data-types.md) | Код единицы измерения ||
|| **isDefault**
[`string`](../data-types.md) | Используется ли текущая единица измерения в качестве единицы измерения по умолчанию для новых товаров. Возможные значения:
- `Y` — да
- `N` — нет

Только одна единица измерения из всего справочника может принимать значение `Y`
||
|| **measureTitle**
[`string`](../data-types.md) | Название единицы измерения ||
|| **symbol**
[`string`](../data-types.md) | Условное обозначение ||
|| **symbolIntl**
[`string`](../data-types.md) | Международное условное обозначение ||
|| **symbolLetterIntl**
[`string`](../data-types.md) | Международное кодовое буквенное обозначение ||
|#

### catalog_ratio

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор коэффициента единицы измерения ||
|| **productId**
[`integer`](../data-types.md) | Идентификатор товара ||
|| **ratio**
[`double`](../data-types.md) | Коэффициент единицы измерения ||
|| **isDefault**
[`string`](../data-types.md) | Является ли данный коэффициент единицы измерения коэффициентом по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет
||
|#

### catalog_price

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор цены ||
|| **productId**
[`catalog_product.id`](#catalog_product) | Идентификатор товара ||
|| **catalogGroupId**
[`catalog_price_type.id`](#catalog_price_type) | Идентификатор типа цены ||
|| **price**
[`double`](../data-types.md) | Значение цены ||
|| **priceScale**
[`double`](../data-types.md) | Значение базовой цены ||
|| **currency**
[`string`](../data-types.md) | Валюта цены ||
|| **quantityFrom**
[`double`](../data-types.md) | Минимальное количество для применения цены. Устаревший параметр ||
|| **quantityTo**
[`double`](../data-types.md) | Максимальное количество для применения цены. Устаревший параметр  ||
|| **extraId**
[`catalog_extra.id`](#catalog_extra) | Идентификатор наценки. Устаревший параметр  ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения ||
|#

### catalog_price_type

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор типа цены ||
|| **name**
[`string`](../data-types.md) | Код типа цены ||
|| **base**
[`string`](../data-types.md) | Является ли тип цены базовым. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего типа цены с аналогичной позицией во внешней системе ||
|| **timestampX**
[`datetime`](../data-types.md) | Дата изменения ||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменен ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|#

### catalog_price_type_lang

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор перевода названия типа цены ||
|| **catalogGroupId**
[`catalog_price_type.id`](#catalog_price_type) | Идентификатор типа цены ||
|| **name**
[`string`](../data-types.md) | Перевод названия типа цены ||
|| **lang**
[`catalog_language.lid`](#catalog_language) | Идентификатор языка ||
|#

### catalog_language

#|
|| **Значение**
`тип` | **Описание** ||
|| **lid**
[`string`](../data-types.md) | Идентификатор языка ||
|| **name**
[`string`](../data-types.md) | Название языка ||
|| **active**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет
||
|#

### catalog_rounding_rule

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор правила округления цен ||
|| **catalogGroupId**
[`catalog_price_type.id`](#catalog_price_type) | Тип цены ||
|| **price**
[`double`](../data-types.md) | Минимальная цена для округления ||
|| **roundType**
[`integer`](../data-types.md) | Тип округления. Возможные значения:
- `1` — математическое округление
- `2` — округление вверх (в пользу магазина)
- `4` — округление вниз (в пользу клиента)
||
|| **roundPrecision**
[`double`](../data-types.md) | Точность округления ||
|| **createdBy**
[`user.id`](../data-types.md) | Кем создано ||
|| **modifiedBy**
[`user.id`](../data-types.md) | Кем изменено ||
|| **dateCreate**
[`datetime`](../data-types.md) | Дата создания ||
|| **dateModify**
[`datetime`](../data-types.md) | Дата изменения ||
|#

### catalog_extra

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор наценки ||
|| **name**
[`string`](../data-types.md) | Название наценки ||
|| **percentage**
[`double`](../data-types.md) | Величина наценки ||
|#

### catalog_section

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор раздела каталога ||
|| **iblockId**
[`catalog_catalog.id`](#catalog_catalog) | Идентификатор инфоблока.

Для получения существующих идентификаторов необходимо использовать [catalog.catalog.list](./catalog/catalog-catalog-list.md) ||
|| **iblockSectionId**
[`catalog_section.id`](#catalog_section) | Идентификатор родительского раздела.

Для получения существующих идентификаторов необходимо использовать [catalog.section.list](./section/catalog-section-list.md). 

По умолчанию выбирается верхний уровень ||
|| **name**
[`string`](../data-types.md) | Название раздела каталога ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего раздела каталога с аналогичной позицией во внешней системе ||
|| **code**
[`string`](../data-types.md) | Код раздела каталога ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **active**
[`string`](../data-types.md) | Индикатор активности раздела каталога:
- `Y` — активен
- `N` — неактивен ||
|| **description**
[`string`](../data-types.md) | Описание ||
|| **descriptionType**
[`string`](../data-types.md) | Тип описания. Доступные типы: `text`, `html` ||
|#

### catalog_storeproduct

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор записи остатка ||
|| **productId**
[`catalog_product.id`](#catalog_product) | Идентификатор товара ||
|| **storeId**
[`catalog_store.id`](#catalog_store) | Идентификатор склада ||
|| **amount**
[`double`](../data-types.md) | Доступное количество товара ||
|| **quantityReserved**
[`double`](../data-types.md) | Количество товара в резерве ||
|#


### catalog_vat

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор ставки НДС ||
|| **name**
[`string`](../data-types.md) | Название ставки НДС ||
|| **active**
[`string`](../data-types.md) | Индикатор активности ставки НДС. Возможные значения:
- `Y` — активен
- `N` — неактивен
||
|| **rate**
[`double`](../data-types.md) | Величина ставки НДС ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **timestampX**
[`datetime`](../data-types.md) | Время последнего изменения ||
|#
