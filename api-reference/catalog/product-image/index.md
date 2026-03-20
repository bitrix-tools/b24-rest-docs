# Изображения товаров и вариаций в Торговом каталоге: обзор методов

В товары и вариации можно добавлять разные типы изображений:
- `DETAIL_PICTURE` — детальное изображение, поле доступно в старой карточке товара,
- `PREVIEW_PICTURE` — изображение для анонса, поле доступно в старой карточке товара,
- `MORE_PHOTO` — дополнительные изображения.

## Как добавить изображение в созданный товар

Чтобы добавить или заменить изображение созданного товара, воспользуйтесь методами [catalog.productImage.*](#all-methods). Укажите тип изображения и передайте в параметре `fileContent` массив из двух элементов:
- название файла изображения с его расширением,
- файл в кодировке base64.

Если не указать тип изображения, оно будет сохранено как дополнительное изображение `MORE_PHOTO`.

> Быстрый переход: [все методы](#all-methods)

## Как добавить изображение при создании товара

Используйте метод [catalog.product.add](../product/catalog-product-add.md) и передайте в параметры `previewPicture` или `detailPicture` объект в формате `{fileData: [value1, value2]}`:
- `value1` — название файла изображения с его расширением,
- `value2` — файл в кодировке base64.

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../../files/how-to-upload-files.md)

{% endnote %}

## Связь изображений товаров и вариаций с другими объектами

**Товары.** Укажите идентификатор товара, для которого хотите добавить изображение. Список идентификаторов можно получить методами:
- [catalog.product.list](../product/catalog-product-list.md) — для простых товаров
- [catalog.product.service.list](../product/service/catalog-product-service-list.md) — для услуг
- [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md) — для головных товаров у товаров с вариациями
- [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md) — для вариаций товаров

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.productImage.add](./catalog-product-image-add.md) | Добавляет изображение в товар или вариацию ||
|| [catalog.productImage.get](./catalog-product-image-get.md) | Возвращает информацию о конкретном изображении товара или вариации ||
|| [catalog.productImage.list](./catalog-product-image-list.md) | Возвращает список изображений товара или вариации ||
|| [catalog.productImage.delete](./catalog-product-image-delete.md) | Удаляет изображение из товара или вариации ||
|| [catalog.productImage.getFields](./catalog-product-image-get-fields.md) | Возвращает доступные поля изображения товара или вариации ||
|#
