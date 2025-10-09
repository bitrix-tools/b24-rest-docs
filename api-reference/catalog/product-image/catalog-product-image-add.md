# Добавить изображение в товар catalog.productImage.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет изображения в товар, головной товар, вариацию или услугу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для добавления изображения ([подробное описание](#fields)) ||
|| **fileContent***
[`array`](../../data-types.md)| Массив из двух элементов:
- первый — название файла
- второй – файл в кодировке [base64](../../files/how-to-upload-files.md) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`catalog_product.id`](../data-types.md#catalog_product)\|
[`catalog_product_sku.id`](../data-types.md#catalog_product_sku)\|
[`catalog_product_offer.id`](../data-types.md#catalog_product_offer)\|
[`catalog_product_service.id`](../data-types.md#catalog_product_service) | Идентификатор товара, головного товара, вариации или услуги.

Чтобы получить существующие идентификаторы, используйте следующие методы:
- для товаров — [catalog.product.list](../product/catalog-product-list.md)
- для головных товаров — [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md)
- для вариаций товара — [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md)
- для услуг — [catalog.product.service.list](../product/service/catalog-product-service-list.md)
||
|| **type**
[`string`](../../data-types.md) | Тип изображения:
- `DETAIL_PICTURE` — детальная картинка, поле доступно в старой карточке товара
- `PREVIEW_PICTURE` — картинка для анонса, поле доступно в старой карточке товара
- `MORE_PHOTO` — картинка

Если не указать значение, то картинка будет сохранена в `MORE_PHOTO`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":1,"type":"MORE_PHOTO"},"fileContent":["test.jpeg","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.productImage.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":1,"type":"MORE_PHOTO"},"fileContent":["test.jpeg","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.productImage.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.productImage.add',
    		{
    			'fields': {
    				'productId': 1,
    				'type': 'MORE_PHOTO'
    			},
    			'fileContent': [
    				'test.jpeg',
    				'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'catalog.productImage.add',
                [
                    'fields' => [
                        'productId' => 1,
                        'type' => 'MORE_PHOTO',
                    ],
                    'fileContent' => [
                        'test.jpeg',
                        'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC',
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
        echo 'Error adding product image: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'catalog.productImage.add',
    {
    'fields': {
    'productId': 1,
    'type': 'MORE_PHOTO'
    },
    'fileContent': [
    'test.jpeg',
    'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
    ]
    },
    function(result) {
    if (result.error())
    console.error(result.error());
    else
    console.log(result.data());
    }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productImage.add',
        [
            'fields' => [
                'productId' => 1,
                'type' => 'MORE_PHOTO'
            ],
            'fileContent' => [
                'test.jpeg',
                'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
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

```json
{
    "result": {
        "productImage": {
            "createTime": "2024-10-17T10:48:05+03:00",
            "detailUrl": "\/upload\/iblock\/6f1\/bkm7jmwso31wisk423gtp28iagy2e8v0\/test.jpeg",
            "downloadUrl": "http:\/\/dev.bx\/rest\/download.json?sessid=ae1ada0e5c85babd18ce4af4c702d1d9\u0026token=catalog%7CaWQ9NzY1MSZfPWFOZnFTbFdJTDdyUXZ6NGFGN1I5VFI5VTF4bzI2RGxD%7CImRvd25sb2FkfGNhdGFsb2d8YVdROU56WTFNU1pmUFdGT1puRlRiRmRKVERkeVVYWjZOR0ZHTjFJNVZGSTVWVEY0YnpJMlJHeER8YWUxYWRhMGU1Yzg1YmFiZDE4Y2U0YWY0YzcwMmQxZDki.zYr4q9yeVqZi7Wi1OIUcAxPZJkuGcdKtLBTITbCIWsk%3D",
            "id": 1,
            "name": "test.jpeg",
            "productId": 1,
            "type": "MORE_PHOTO"
        }
    },
    "time": {
        "start": 1729162084.178151,
        "finish": 1729162085.69217,
        "duration": 1.5140190124511719,
        "processing": 1.1198821067810059,
        "date_start": "2024-10-17T13:48:04+03:00",
        "date_finish": "2024-10-17T13:48:05+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **productImage**
[`catalog_product_image`](../data-types.md#catalog_product_image) | Объект с информацией о добавленном изображении товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300020,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для изменения торгового каталога
||
|| `200040300020` | Недостаточно прав для изменения товара
||
|| `100` | Не указан или пустой параметр `fields`
|| 
|| `100` | Не указан или пустой параметр `fileContent`
|| 
|| `0` | Не указано имя файла
|| 
|| `0` | Имя файла содержит некорректные символы
|| 
|| `0` | Слишком длинное имя файла
|| 
|| `0` | Неверный тип файла
|| 
|| `0` | Превышено ограничение дискового пространства
|| 
|| `0` | Превышен максимальный размер загружаемого файла
|| 
|| `0` | Свойство товара для изображения не существует. Создайте свойство `MORE_PHOTO`
|| 
|| `0` | Ошибка при сохранении файла
|| 
|| `0` | Товар не найден
|| 
|| `0` | Не указан идентификатор товара
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-image-get.md)
- [{#T}](./catalog-product-image-list.md)
- [{#T}](./catalog-product-image-delete.md)
- [{#T}](./catalog-product-image-get-fields.md)