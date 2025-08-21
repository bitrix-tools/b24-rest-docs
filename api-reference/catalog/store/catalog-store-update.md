# Изменить склад catalog.store.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет склад.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_store.id`](../data-types.md#catalog_store)| Идентификатор склада.

Получить идентификаторы складов можно методом [catalog.store.list](./catalog-store-list.md) ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для обновления склада ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **address**
[`string`](../../data-types.md) | Адрес склада ||
|| **title**
[`string`](../../data-types.md) | Название склада ||
|| **active**
[`string`](../../data-types.md) | Активность. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **description**
[`string`](../../data-types.md) | Описание ||
|| **gpsN**
[`double`](../../data-types.md) | GPS-широта ||
|| **gpsS**
[`double`](../../data-types.md) | GPS-долгота ||
|| **imageId**
[`object`](../../data-types.md) | Изображение. Объект в формате `{fileData: [value1, value2]}`, где:
- `value1` – название файла картинки с расширением
- `value2` – картинка в формате base64

Для удаления картинки используйте объект в формате `{remove: ‘Y’}` ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания ||
|| **userId**
[`user.id`](../../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Кем изменен ||
|| **phone**
[`string`](../../data-types.md) | Телефон ||
|| **schedule**
[`string`](../../data-types.md) | График работы ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего склада с аналогичной позицией во внешней системе ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **email**
[`string`](../../data-types.md) | E-mail ||
|| **issuingCenter**
[`string`](../../data-types.md) | Является ли пунктом выдачи. Возможные значения:
- `Y` – да
- `N` – нет
||
|| **code**
[`string`](../../data-types.md) | Символьный код ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"address":"пр. Московский д. 52","title":"Склад 1","active":"Y","description":"Описание","gpsN":"54.71411","gpsS":"21.56675","imageId":{"fileData":["detailPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"dateModify":"2024-10-21T10:00:00","dateCreate":"2024-10-21T10:00:00","userId":1,"modifiedBy":1,"phone":"8 (495) 212 85 06","schedule":"Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00","xmlId":"","sort":100,"email":"test@test.ru","issuingCenter":"N","code":"store_1"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.store.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"address":"пр. Московский д. 52","title":"Склад 1","active":"Y","description":"Описание","gpsN":"54.71411","gpsS":"21.56675","imageId":{"fileData":["detailPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"dateModify":"2024-10-21T10:00:00","dateCreate":"2024-10-21T10:00:00","userId":1,"modifiedBy":1,"phone":"8 (495) 212 85 06","schedule":"Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00","xmlId":"","sort":100,"email":"test@test.ru","issuingCenter":"N","code":"store_1"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.store.update',
    		{
    			id: 1,
    			fields: {
    				'address': 'пр. Московский д. 52',
    				'title': 'Склад 1',
    				'active': 'Y',
    				'description': 'Описание',
    				'gpsN': '54.71411',
    				'gpsS': '21.56675',
    				'imageId': {
    					'fileData': ['detailPicture.png','iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'],
    				},
    				'dateModify': '2024-10-21T10:00:00',
    				'dateCreate': '2024-10-21T10:00:00',
    				'userId': 1,
    				'modifiedBy': 1,
    				'phone': '8 (495) 212 85 06',
    				'schedule': 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
    				'xmlId': '',
    				'sort': 100,
    				'email': 'test@test.ru',
    				'issuingCenter': 'N',
    				'code': 'store_1',
    			},
    		}
    	);
    	
    	if(response.error())
    	{
    		console.error(response.error());
    	}
    	else
    	{
    		console.log(response.getData().result);
    	}
    }
    catch(error)
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
                'catalog.store.update',
                [
                    'id'         => 1,
                    'fields'     => [
                        'address'        => 'пр. Московский д. 52',
                        'title'          => 'Склад 1',
                        'active'         => 'Y',
                        'description'    => 'Описание',
                        'gpsN'           => '54.71411',
                        'gpsS'           => '21.56675',
                        'imageId'        => [
                            'fileData' => ['detailPicture.png', 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'],
                        ],
                        'dateModify'     => '2024-10-21T10:00:00',
                        'dateCreate'     => '2024-10-21T10:00:00',
                        'userId'         => 1,
                        'modifiedBy'     => 1,
                        'phone'          => '8 (495) 212 85 06',
                        'schedule'       => 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                        'xmlId'          => '',
                        'sort'           => 100,
                        'email'          => 'test@test.ru',
                        'issuingCenter'  => 'N',
                        'code'           => 'store_1',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating store: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.store.update',
            {
                id: 1,
                fields: {
                    'address': 'пр. Московский д. 52',
                    'title': 'Склад 1',
                    'active': 'Y',
                    'description': 'Описание',
                    'gpsN': '54.71411',
                    'gpsS': '21.56675',
                    'imageId': {
                        'fileData':  ['detailPicture.png','iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'],
                    },
                    'dateModify': '2024-10-21T10:00:00',
                    'dateCreate': '2024-10-21T10:00:00',
                    'userId': 1,
                    'modifiedBy': 1,
                    'phone': '8 (495) 212 85 06',
                    'schedule': 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                    'xmlId': '',
                    'sort': 100,
                    'email': 'test@test.ru',
                    'issuingCenter': 'N',
                    'code': 'store_1',
                },
            },
            function(result)
            {
                if(result.error())
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
        'catalog.store.update',
        [
            'id' => 1,
            'fields' => [
                'address' => 'пр. Московский д. 52',
                'title' => 'Склад 1',
                'active' => 'Y',
                'description' => 'Описание',
                'gpsN' => '54.71411',
                'gpsS' => '21.56675',
                'imageId' => [
                    'fileData' => ['detailPicture.png', 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC']
                ],
                'dateModify' => '2024-10-21T10:00:00',
                'dateCreate' => '2024-10-21T10:00:00',
                'userId' => 1,
                'modifiedBy' => 1,
                'phone' => '8 (495) 212 85 06',
                'schedule' => 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                'xmlId' => '',
                'sort' => 100,
                'email' => 'test@test.ru',
                'issuingCenter' => 'N',
                'code' => 'store_1',
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
        "store": {
            "active": "Y",
            "address": "пр. Московский д. 52",
            "code": "store_1",
            "dateCreate": "2024-10-18T16:30:45+03:00",
            "dateModify": "2024-10-22T09:01:58+03:00",
            "description": "Описание",
            "email": "test@test.ru",
            "gpsN": 54.71411,
            "gpsS": 21.56675,
            "id": 1,
            "imageId": {
                "id": 7663,
                "url": "\/upload\/iblock\/6f1\/bkm7jmwso31wisk423gtp28iagy2e8v0\/test.jpeg"
            },
            "issuingCenter": "N",
            "modifiedBy": 1,
            "phone": "8 (495) 212 85 06",
            "schedule": "Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00",
            "sort": 100,
            "title": "Склад 1",
            "userId": 1,
            "xmlId": null
        }
    },
    "time": {
        "start": 1729584118.183646,
        "finish": 1729584118.666534,
        "duration": 0.48288798332214355,
        "processing": 0.13152408599853516,
        "date_start": "2024-10-22T11:01:58+03:00",
        "date_finish": "2024-10-22T11:01:58+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **store**
[`catalog_store`](../data-types.md#catalog_store) | Объект с информацией об обновленном складе ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для изменения склада ||
|| `201100000000` | Склад с указанным идентификатором не найден ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `100` | Не указан или пустой параметр `id` ||
|| `0` | Пустой параметр `address` || 
|| `0` | Другие ошибки (например, фатальные ошибки) || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-add.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)