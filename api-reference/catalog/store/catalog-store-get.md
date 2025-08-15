# Получить значения полей склада catalog.store.get

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает значения полей склада по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_store.id`](../data-types.md#catalog_store) | Идентификатор склада.

Получить идентификаторы складов можно методом [catalog.store.list](./catalog-store-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.store.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.store.get', {
    			id: 1
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
                'catalog.store.get',
                [
                    'id' => 1
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting store information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.store.get', {
            id: 1
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
        'catalog.store.get',
        [
            'id' => 1
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
            "dateModify": "2024-10-21T14:29:06+03:00",
            "description": "Описание",
            "email": "test@test.ru",
            "gpsN": 54.71411,
            "gpsS": 21.56675,
            "id": 1,
            "imageId": {
                "id": 1,
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
        "start": 1729519143.740275,
        "finish": 1729519144.2594,
        "duration": 0.5191249847412109,
        "processing": 0.0425570011138916,
        "date_start": "2024-10-21T16:59:03+03:00",
        "date_finish": "2024-10-21T16:59:04+03:00",
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
[`catalog_store`](../data-types.md#catalog_store) | Объект с информацией о складе ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для просмотра склада ||
|| `201100000000` | Склад с указанным идентификатором не найден ||
|| `100` | Не указан параметр `id` || 
|| `0` | Другие ошибки (например, фатальные ошибки) || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-add.md)
- [{#T}](./catalog-store-update.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)
