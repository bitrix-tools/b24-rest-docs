# Товары в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

С помощью методов REST вы можете создать простые товары или услуги, а также товары с вариациями.

Простой товар или услуга — это одна учетная позиция с наименованием и единицей измерения. Вариация товара — это торговое предложение, в котором у товара есть дополнительные характеристики: цвет и размер. Для каждого сочетания характеристик создается отдельная учетная позиция с уникальным артикулом.

Для простого товара используйте методы `catalog.product.*`, для услуги — `catalog.product.service.*`. Товар с вариациями создавайте через головной товар `catalog.product.sku.*` и связанные с ним вариации `catalog.product.offer.*`. Состав полей каждого типа приведен в [типах данных Каталога](../data-types.md); доступные поля конкретного каталога можно получить методом `getFieldsByFilter` соответствующей группы.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация:
> - [Как создать товар в каталоге](https://helpdesk.bitrix24.ru/open/11657084/)
> - [Как работать с вариациями товара](https://helpdesk.bitrix24.ru/open/11657102/)

## Связь товара с другими объектами

**Торговый каталог.** Товар должен быть привязан к конкретному торговому каталогу. Получить идентификаторы доступных торговых каталогов можно с помощью метода [catalog.catalog.list](../catalog/catalog-catalog-list.md).

**Разделы торгового каталога.** Товары обычно распределены по разделам. Чтобы создать и управлять разделами, используйте группу методов [catalog.section.*](../section/index.md).

**Единицы измерения.** Вы можете добавить необходимые единицы измерения с помощью методов [catalog.measure.*](../measure/index.md).

**Изображения товаров и вариаций.** Чтобы покупателю было легче понять, что это за товар, добавьте изображения товара: детальную картинку, картинку для анонса, а также дополнительные картинки. Для этого воспользуйтесь методами [catalog.productImage.*](../product-image/index.md).

**Свойства товаров и вариаций.** Все товары и вариации в интернет-магазине имеют набор свойств, которые отличают их друг от друга, например цвет или размер. Эти свойства помогают клиентам искать и выбирать товары на сайте. Создайте свойства с помощью методов [catalog.productProperty.*](../product-property/index.md).

**Типы цен.** Типы цен позволяют управлять различными ценовыми категориями. У одного товара может быть несколько цен: оптовая, розничная, партнерская. Для управления типами цен используйте методы [catalog.priceType.*](../price-type/index.md).

**Цена.** Укажите цену товара с помощью методов [catalog.price.*](../price/index.md).

**Складской учет.** Если включен складской учет, то при создании или редактировании товара вам не нужно указывать доступное количество — складской учет автоматически установит значения.

## Как начать работу

1. Получите идентификатор торгового каталога методом [catalog.catalog.list](../catalog/catalog-catalog-list.md)
2. Если нужно распределить товары по разделам, создайте разделы методами [catalog.section.*](../section/index.md)
3. Создайте [товар](./catalog-product-add.md), [услугу](./service/catalog-product-service-add.md) или [головной товар](./sku/catalog-product-sku-add.md) с [вариациями](./offer/catalog-product-offer-add.md)
4. Добавьте изображения методом [catalog.productImage.add](../product-image/catalog-product-image-add.md) или через поля изображения при создании товара
5. Укажите цену методами [catalog.price.*](../price/index.md)
6. Проверьте результат методом [catalog.product.get](./catalog-product-get.md) или соответствующим методом `get` для услуги, головного товара и вариации

## Товары в REST 3.0

В [REST 3.0](../../rest-v3.md) для товаров, услуг, головных товаров и вариаций есть методы добавления, изменения, получения, удаления и скачивания файлов и методы получения схемы полей `*.field.list` и `*.field.get`. Методы, которые есть в обеих версиях API, помечены в таблицах как `v 3.0`. Справочник типов товаров возвращает метод [catalog.product.type.list](./catalog-product-type-list.md).

Особенности методов новой версии:

- свойства товара передаются в `fields.properties` с ключами `PROPERTY_{id}`. В методах `update` значение одиночного свойства передавайте объектом `{"VALUE": ...}`: значение, переданное строкой, метод не сохраняет
- методы `list` требуют в `filter` условие по `iblockId` с оператором `=`. Фильтровать по значениям свойств нельзя. На странице возвращается не больше 50 записей
- методы `add` и `update` не сохраняют картинки `previewPicture` и `detailPicture`. Загружайте изображения методом [catalog.product.image.add](../product-image/catalog-product-image-add-rest-v3.md)
- в ответе `previewPicture` и `detailPicture` содержат идентификатор файла. Файл можно получить методом [catalog.product.download](./catalog-product-download-rest-v3.md)
- при включенном складском учете `quantity`, `purchasingPrice` и `purchasingCurrency` не сохраняются
- метод [catalog.product.fields.getbyfilter](./catalog-product-fields-get-by-filter.md) возвращает поля простого товара и вызывается только в нижнем регистре
- кроме прав каталога, методы проверяют права пользователя на инфоблок каталога: на чтение, изменение или удаление товара

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Товары

События добавления, изменения и удаления описаны в [обзоре событий товаров](./events/index.md).

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.add](./catalog-product-add.md) | Добавляет товар ||
    || [catalog.product.add](./catalog-product-add-rest-v3.md) | Добавляет товар v 3.0 ||
    || [catalog.product.update](./catalog-product-update.md) | Обновляет поля товара ||
    || [catalog.product.update](./catalog-product-update-rest-v3.md) | Обновляет поля товара v 3.0 ||
    || [catalog.product.get](./catalog-product-get.md) | Возвращает значения полей товара по идентификатору ||
    || [catalog.product.get](./catalog-product-get-rest-v3.md) | Возвращает значения полей товара по идентификатору v 3.0 ||
    || [catalog.product.list](./catalog-product-list.md) | Возвращает список товаров по фильтру ||
    || [catalog.product.list](./catalog-product-list-rest-v3.md) | Возвращает список товаров по фильтру v 3.0 ||
    || [catalog.product.download](./catalog-product-download.md) | Скачивает файлы товара по переданным параметрам ||
    || [catalog.product.download](./catalog-product-download-rest-v3.md) | Скачивает файлы товара по переданным параметрам v 3.0 ||
    || [catalog.product.delete](./catalog-product-delete.md) | Удаляет товар ||
    || [catalog.product.delete](./catalog-product-delete-rest-v3.md) | Удаляет товар v 3.0 ||
    || [catalog.product.getFieldsByFilter](./catalog-product-get-fields-by-filter.md) | Возвращает поля товара по фильтру ||
    || [catalog.product.field.list](./catalog-product-field-list.md) | Возвращает список полей товара v 3.0 ||
    || [catalog.product.field.get](./catalog-product-field-get.md) | Возвращает описание поля товара ||
    || [catalog.product.fields.getbyfilter](./catalog-product-fields-get-by-filter.md) | Возвращает поля товара по фильтру v 3.0 ||
    || [catalog.product.type.list](./catalog-product-type-list.md) | Возвращает список типов товаров ||
    || [catalog.product.type.field.list](./catalog-product-type-field-list.md) | Возвращает список полей типа товара ||
    || [catalog.product.type.field.get](./catalog-product-type-field-get.md) | Возвращает описание поля типа товара ||
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

Об устройстве услуг и выборе методов читайте в [обзоре услуг](./service/index.md).

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.service.add](./service/catalog-product-service-add.md) | Добавляет услугу ||
    || [catalog.product.service.add](./service/catalog-product-service-add-rest-v3.md) | Добавляет услугу v 3.0 ||
    || [catalog.product.service.update](./service/catalog-product-service-update.md) | Обновляет поля услуги ||
    || [catalog.product.service.update](./service/catalog-product-service-update-rest-v3.md) | Обновляет поля услуги v 3.0 ||
    || [catalog.product.service.get](./service/catalog-product-service-get.md) | Возвращает значения полей услуги по идентификатору ||
    || [catalog.product.service.get](./service/catalog-product-service-get-rest-v3.md) | Возвращает значения полей услуги по идентификатору v 3.0 ||
    || [catalog.product.service.list](./service/catalog-product-service-list.md) | Возвращает список услуг по фильтру ||
    || [catalog.product.service.list](./service/catalog-product-service-list-rest-v3.md) | Возвращает список услуг по фильтру v 3.0 ||
    || [catalog.product.service.download](./service/catalog-product-service-download.md) | Скачивает файлы услуги по переданным параметрам ||
    || [catalog.product.service.download](./service/catalog-product-service-download-rest-v3.md) | Скачивает файлы услуги по переданным параметрам v 3.0 ||
    || [catalog.product.service.delete](./service/catalog-product-service-delete.md) | Удаляет услугу ||
    || [catalog.product.service.delete](./service/catalog-product-service-delete-rest-v3.md) | Удаляет услугу v 3.0 ||
    || [catalog.product.service.getFieldsByFilter](./service/catalog-product-service-get-fields-by-filter.md) | Возвращает поля услуги по фильтру ||
    || [catalog.product.service.field.list](./service/catalog-product-service-field-list.md) | Возвращает список полей услуги v 3.0 ||
    || [catalog.product.service.field.get](./service/catalog-product-service-field-get.md) | Возвращает описание поля услуги ||
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

Об устройстве головных товаров и выборе методов читайте в [обзоре головных товаров](./sku/index.md).

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.sku.add](./sku/catalog-product-sku-add.md) | Добавляет головной товар ||
    || [catalog.product.sku.add](./sku/catalog-product-sku-add-rest-v3.md) | Добавляет головной товар v 3.0 ||
    || [catalog.product.sku.update](./sku/catalog-product-sku-update.md) | Обновляет поля головного товара ||
    || [catalog.product.sku.update](./sku/catalog-product-sku-update-rest-v3.md) | Обновляет поля головного товара v 3.0 ||
    || [catalog.product.sku.get](./sku/catalog-product-sku-get.md) | Возвращает значения полей головного товара по идентификатору ||
    || [catalog.product.sku.get](./sku/catalog-product-sku-get-rest-v3.md) | Возвращает значения полей головного товара по идентификатору v 3.0 ||
    || [catalog.product.sku.list](./sku/catalog-product-sku-list.md) | Возвращает список головных товаров по фильтру ||
    || [catalog.product.sku.list](./sku/catalog-product-sku-list-rest-v3.md) | Возвращает список головных товаров по фильтру v 3.0 ||
    || [catalog.product.sku.download](./sku/catalog-product-sku-download.md) | Скачивает файлы головного товара по переданным параметрам ||
    || [catalog.product.sku.download](./sku/catalog-product-sku-download-rest-v3.md) | Скачивает файлы головного товара по переданным параметрам v 3.0 ||
    || [catalog.product.sku.delete](./sku/catalog-product-sku-delete.md) | Удаляет головной товар ||
    || [catalog.product.sku.delete](./sku/catalog-product-sku-delete-rest-v3.md) | Удаляет головной товар v 3.0 ||
    || [catalog.product.sku.getFieldsByFilter](./sku/catalog-product-sku-get-fields-by-filter.md) | Возвращает поля головного товара по фильтру ||
    || [catalog.product.sku.field.list](./sku/catalog-product-sku-field-list.md) | Возвращает список полей головного товара v 3.0 ||
    || [catalog.product.sku.field.get](./sku/catalog-product-sku-field-get.md) | Возвращает описание поля головного товара ||
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

Об устройстве вариаций и выборе методов читайте в [обзоре вариаций](./offer/index.md).

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.product.offer.add](./offer/catalog-product-offer-add.md) | Добавляет вариацию товара ||
    || [catalog.product.offer.add](./offer/catalog-product-offer-add-rest-v3.md) | Добавляет вариацию товара v 3.0 ||
    || [catalog.product.offer.update](./offer/catalog-product-offer-update.md) | Обновляет поля вариации товара ||
    || [catalog.product.offer.update](./offer/catalog-product-offer-update-rest-v3.md) | Обновляет поля вариации товара v 3.0 ||
    || [catalog.product.offer.get](./offer/catalog-product-offer-get.md) | Возвращает значения полей вариации товара по идентификатору ||
    || [catalog.product.offer.get](./offer/catalog-product-offer-get-rest-v3.md) | Возвращает значения полей вариации товара по идентификатору v 3.0 ||
    || [catalog.product.offer.list](./offer/catalog-product-offer-list.md) | Возвращает список вариаций товара по фильтру ||
    || [catalog.product.offer.list](./offer/catalog-product-offer-list-rest-v3.md) | Возвращает список вариаций товара по фильтру v 3.0 ||
    || [catalog.product.offer.download](./offer/catalog-product-offer-download.md) | Скачивает файлы вариации товара по переданным параметрам ||
    || [catalog.product.offer.download](./offer/catalog-product-offer-download-rest-v3.md) | Скачивает файлы вариации товара по переданным параметрам v 3.0 ||
    || [catalog.product.offer.delete](./offer/catalog-product-offer-delete.md) | Удаляет вариацию товара ||
    || [catalog.product.offer.delete](./offer/catalog-product-offer-delete-rest-v3.md) | Удаляет вариацию товара v 3.0 ||
    || [catalog.product.offer.getFieldsByFilter](./offer/catalog-product-offer-get-fields-by-filter.md) | Возвращает поля вариации товара по фильтру ||
    || [catalog.product.offer.field.list](./offer/catalog-product-offer-field-list.md) | Возвращает список полей вариации товара v 3.0 ||
    || [catalog.product.offer.field.get](./offer/catalog-product-offer-field-get.md) | Возвращает описание поля вариации товара ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.PRODUCT.ON.ADD](./events/catalog-product-on-add.md) | При добавлении вариации ||
    || [CATALOG.PRODUCT.ON.UPDATE](./events/catalog-product-on-update.md) | При обновлении вариации ||
    || [CATALOG.PRODUCT.ON.DELETE](./events/catalog-product-on-delete.md) | При удалении вариации ||
    |#

{% endlist %}
