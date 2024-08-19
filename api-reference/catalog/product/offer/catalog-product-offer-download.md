# Скачать файлы торгового предложения

> Название метода: **catalog.product.offer.download**
>
> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод скачивает файлы торгового предложения по переданным параметрам. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей для скачивания файлов торгового предложения ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId***
[`integer`](../../../data-types.md) | Идентификатор зарегистрированного файла.

Для получения идентификаторов файлов торгового предложения необходимо использовать [catalog.product.offer.get](./catalog-product-offer-get.md) либо [catalog.product.offer.list](./catalog-product-offer-list.md)
||
|| **productId***
[`catalog_product_offer.id`](../../data-types.md#catalog_product_offer) | Идентификатор торгового предложения.

Для получения идентификаторов торговых предложений необходимо использовать [catalog.product.offer.list](./catalog-product-offer-list.md)
||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля (свойства или поля элемента информационного блока), в котором хранится файл. Возможные значения:
- `DETAIL_PICTURE` — детальная картинка
- `PREVIEW_PICTURE` — картинка для анонса
- `PROPERTY_N` — свойство, где `N` — идентификатор свойства либо код свойства

Для получения существующих идентификаторов либо кодов свойств торговых предложений необходимо использовать [catalog.productProperty.list](../../product-property/catalog-product-property-list.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":6538,"productId":1286,"fieldName":"detailPicture"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.offer.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":6538,"productId":1286,"fieldName":"detailPicture"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.download
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.product.offer.download',
        {
            fields: {
                fileId: 6538,
                productId: 1286,
                fieldName: 'detailPicture',
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.offer.download',
        [
            'fields' => [
                'fileId' => 6538,
                'productId' => 1286,
                'fieldName' => 'detailPicture'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В качестве ответа приходит файл по переданным параметрам.

### Возвращаемые данные

Возвращается файл по переданным параметрам.

## Обработка ошибок

HTTP-статус: **400**

```json
{	
    "error":0,
    "error_description":"Required fields: fileId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога
|| 
|| `0` | Торговое предложение с указанным идентификатором не существует
|| 
|| `0` | Указанное свойство не существует либо не является файловым
|| 
|| `0` | Файл с указанным идентификатором не существует
|| 
|| `0` | Не переданы обязательные поля
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)