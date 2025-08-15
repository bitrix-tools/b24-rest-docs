# Удалить склад catalog.store.delete

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет склад.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.store.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.store.delete',
    		{
    			id: 1,
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
                'catalog.store.delete',
                [
                    'id' => 1,
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
        echo 'Error deleting store: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.store.delete',
        {
            id: 1,
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
        'catalog.store.delete',
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
    "result": true,
    "time": {
        "start": 1729516191.298727,
        "finish": 1729516191.799495,
        "duration": 0.5007679462432861,
        "processing": 0.16301894187927246,
        "date_start": "2024-10-21T16:09:51+03:00",
        "date_finish": "2024-10-21T16:09:51+03:00",
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления склада ||
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
|| `200040300020` | Недостаточно прав для удаления склада ||
|| `201100000000` | Склад с указанным идентификатором не найден ||
|| `100` | Не указан или пустой параметр `id` ||
|| `0` | На данный склад оформлены документы || 
|| `0` | Другие ошибки (например, фатальные ошибки) || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-add.md)
- [{#T}](./catalog-store-update.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-get-fields.md)

