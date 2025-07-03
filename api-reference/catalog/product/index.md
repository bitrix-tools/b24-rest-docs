# Товары в Торговом каталоге: обзор методов

С помощью методов REST вы можете создать простые товары или услуги, а также товары с вариациями.

Простой товар или услуга — это одна учетная позиция с наименованием и единицей измерения. Вариация товара — это торговое предложение, в котором у товара есть дополнительные характеристики: цвет и размер. Для каждого сочетания характеристик создается отдельная учетная позиция с уникальным артикулом.

> Быстрый переход: [все методы и события](#all-methods)
> 
> Пользовательская документация: 
>   - [Как создать новый товар в каталоге](https://helpdesk.bitrix24.ru/open/11657084/)
>   - [Работа с вариациями товара](https://helpdesk.bitrix24.ru/open/11657102/)

## Связь товара с другими объектами

**Торговый каталог.** Товар должен быть привязан к конкретному торговому каталогу. Получить идентификаторы доступных торговых каталогов можно с помощью метода [catalog.catalog.list](../catalog/catalog-catalog-list.md).

**Разделы торгового каталога.** Товары обычно распределены по разделам. Чтобы создать и управлять разделами, используйте группу методов [catalog.section.* ](../section/index.md).

**Единицы измерения.** Вы можете добавить необходимые единицы измерения с помощью методов [catalog.measure.* ](../measure/index.md).

**Изображения товаров и вариаций.** Чтобы покупателю было легче понять, что это за товар, добавьте изображения товара: детальную картинку, картинку для анонса, а также дополнительные картинки. Для этого воспользуйтесь методами [catalog.productImage.*](../product-image/index.md).

**Свойства товаров и вариаций.** Все товары и вариации в интернет-магазине имеют набор свойств, которые отличают их друг от друга, например цвет или размер. Эти свойства помогают клиентам искать и выбирать товары на сайте. Создайте свойства с помощью методов [catalog.productProperty.*](../product-property/index.md).

**Типы цен.** Типы цен позволяют управлять различными ценовыми категориями. У одного товара может быть несколько цен: оптовая, розничная, партнерская. Для управления типами цен используйте методы [catalog.priceType.*](../price-type/index.md).

**Цена.** Укажите цену товара с помощью методов [catalog.price.*](../price/index.md).

**Складской учет.** Если включен складской учет, то при создании или редактировании товара вам не нужно указывать доступное количество — складской учет автоматически установит значения.

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

### Товары

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.add](./catalog-product-add.md) | Добавляет товар ||
    || [catalog.product.update](./catalog-product-update.md) | Обновляет поля товара ||
    || [catalog.product.get](./catalog-product-get.md) | Возвращает значения полей товара по идентификатору ||
    || [catalog.product.list](./catalog-product-list.md) | Возвращает список товаров по фильтру ||
    || [catalog.product.download](./catalog-product-download.md) | Скачивает файлы товара по переданным параметрам ||
    || [catalog.product.delete](./catalog-product-delete.md) | Удаляет товар ||
    || [catalog.product.getFieldsByFilter](./catalog-product-get-fields-by-filter.md) | Возвращает поля товара по фильтру ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRODUCT.ON.ADD](./events/catalog-product-on-add.md) | При добавлении товара ||
    || [CATALOG.PRODUCT.ON.UPDATE](./events/catalog-product-on-update.md) | При обновлении товара ||
    || [CATALOG.PRODUCT.ON.DELETE](./events/catalog-product-on-delete.md) | При удалении товара ||
    |#

{% endlist %}

### Услуги

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.service.add](./service/catalog-product-service-add.md) | Добавляет услугу ||
    || [catalog.product.service.update](./service/catalog-product-service-update.md) | Обновляет поля услуги ||
    || [catalog.product.service.get](./service/catalog-product-service-get.md) | Возвращает значения полей услуги по идентификатору ||
    || [catalog.product.service.list](./service/catalog-product-service-list.md) | Возвращает список услуг по фильтру ||
    || [catalog.product.service.download](./service/catalog-product-service-download.md) | Скачивает файлы услуги по переданным параметрам ||
    || [catalog.product.service.delete](./service/catalog-product-service-delete.md) | Удаляет услугу ||
    || [catalog.product.service.getFieldsByFilter](./service/catalog-product-service-get-fields-by-filter.md) | Возвращает поля услуги по фильтру ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRODUCT.ON.ADD](./events/catalog-product-on-add.md) | При добавлении услуги ||
    || [CATALOG.PRODUCT.ON.UPDATE](./events/catalog-product-on-update.md) | При обновлении услуги ||
    || [CATALOG.PRODUCT.ON.DELETE](./events/catalog-product-on-delete.md) | При удалении услуги ||
    |#

{% endlist %}

### Товары с вариациями: головные товары

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.sku.add](./sku/catalog-product-sku-add.md) | Добавляет головной товар ||
    || [catalog.product.sku.update](./sku/catalog-product-sku-update.md) | Обновляет поля головного товара ||
    || [catalog.product.sku.get](./sku/catalog-product-sku-get.md) | Возвращает значения полей головного товара по идентификатору ||
    || [catalog.product.sku.list](./sku/catalog-product-sku-list.md) | Возвращает список головных товаров по фильтру ||
    || [catalog.product.sku.download](./sku/catalog-product-sku-download.md) | Скачивает файлы головного товара по переданным параметрам ||
    || [catalog.product.sku.delete](./sku/catalog-product-sku-delete.md) | Удаляет головной товар ||
    || [catalog.product.sku.getFieldsByFilter](./sku/catalog-product-sku-get-fields-by-filter.md) | Возвращает поля головного товара по фильтру ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRODUCT.ON.ADD](./events/catalog-product-on-add.md) | При добавлении головного товара ||
    || [CATALOG.PRODUCT.ON.UPDATE](./events/catalog-product-on-update.md) | При обновлении головного товара ||
    || [CATALOG.PRODUCT.ON.DELETE](./events/catalog-product-on-delete.md) | При удалении головного товара ||
    |#

{% endlist %}

### Товары с вариациями: вариации

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.offer.add](./offer/catalog-product-offer-add.md) | Добавляет вариацию товара ||
    || [catalog.product.offer.update](./offer/catalog-product-offer-update.md) | Обновляет поля вариации товара ||
    || [catalog.product.offer.get](./offer/catalog-product-offer-get.md) | Возвращает значения полей вариации товара по идентификатору ||
    || [catalog.product.offer.list](./offer/catalog-product-offer-list.md) | Возвращает список вариаций товара по фильтру ||
    || [catalog.product.offer.download](./offer/catalog-product-offer-download.md) | Скачивает файлы вариации товара по переданным параметрам ||
    || [catalog.product.offer.delete](./offer/catalog-product-offer-delete.md) | Удаляет вариацию товара ||
    || [catalog.product.offer.getFieldsByFilter](./offer/catalog-product-offer-get-fields-by-filter.md) | Возвращает поля вариации товара по фильтру ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRODUCT.ON.ADD](./events/catalog-product-on-add.md) | При добавлении вариации ||
    || [CATALOG.PRODUCT.ON.UPDATE](./events/catalog-product-on-update.md) | При обновлении вариации ||
    || [CATALOG.PRODUCT.ON.DELETE](./events/catalog-product-on-delete.md) | При удалении вариации ||
    |#

{% endlist %}