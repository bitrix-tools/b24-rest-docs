# Скачать файлы товара catalog.product.download

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод скачивает файлы товара торгового каталога по переданным параметрам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields*** 
 [`object`](../../data-types.md)| Значения полей для скачивания файлов товара ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId*** 
 [`integer`](../../data-types.md)| Идентификатор зарегистрированного файла.

Для получения идентификаторов файлов товара необходимо использовать [catalog.product.get](./catalog-product-get.md), либо [catalog.product.list](./catalog-product-list.md)
 ||
|| **productId*** 
 [`catalog_product.id`](../data-types.md#catalog_product)| Идентификатор товара.

Для получения идентификаторов товаров необходимо использовать [catalog.product.list](./catalog-product-list.md)
 ||
|| **fieldName*** 
[`string`](../../data-types.md) | Имя поля (свойства или поля элемента информационного блока) в котором хранится файл.

- `DETAIL_PICTURE` — детальная картинка, поле доступно в старой карточке товара
- `PREVIEW_PICTURE` — картинка для анонса, поле доступно в старой карточке товара
- `PROPERTY_N` — свойство, где `N` — идентификатор свойства, либо код свойства

Для получения существующих идентификаторов, либо кодов свойств товаров, необходимо использовать [catalog.productProperty.list](../product-property/catalog-product-property-list.md)
 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":6439,"productId":1243,"fieldName":"detailPicture"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"fileId":6439,"productId":1243,"fieldName":"detailPicture"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.download
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.product.download',
    		{
    			fields: {
    				fileId: 6439,
    				productId: 1243,
    				fieldName: 'detailPicture',
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.download',
                [
                    'fields' => [
                        'fileId'    => 6439,
                        'productId' => 1243,
                        'fieldName' => 'detailPicture',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error downloading product file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.download',
        {
            fields: {
                fileId: 6439,
                productId: 1243,
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.download',
        [
            'fields' => [
                'fileId' => 6439,
                'productId' => 1243,
                'fieldName' => 'detailPicture',
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

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога ||
|| `0` | Товар с указанным идентификатором не существует ||
|| `0` | Указанное свойство не существует, либо не является файловым ||
|| `0` | Файл с указанным идентификатором не существует ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
