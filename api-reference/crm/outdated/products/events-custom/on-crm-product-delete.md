# Событие на удаление товара onCrmProductDelete

{% note warning "Развитие события остановлено" %}

Событие `onCrmProductDelete` продолжает работать, но у него есть более актуальный аналог [CATALOG.PRODUCT.ON.DELETE](../../../../catalog/product/events/catalog-product-on-delete.md).

{% endnote %}

Событие вызывается при удалении товара.

## Параметры

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELDS** | Массив содержит поле ID со значением идентификатора удалённого товара ||
|#