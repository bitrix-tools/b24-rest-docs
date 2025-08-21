# Удалить статус sale.status.delete

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет статус заказа или доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_status.id`](../data-types.md) | Идентификатор статуса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"MS"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.status.delete
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"MS","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.status.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.status.delete", {
    			"id": "MS"
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
                'sale.status.delete',
                [
                    'id' => 'MS',
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
        echo 'Error deleting sale status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.status.delete", {
            "id": "MS"
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

    $result = CRest::call('sale.status.delete', [
        'id' => 'MS'
    ]);

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":true,
    "time":{
        "start":1712144469.892859,
        "finish":1712144470.162582,
        "duration":0.26972293853759766,
        "processing":0.013709068298339844,
        "date_start":"2024-04-03T14:41:09+03:00",
        "date_finish":"2024-04-03T14:41:10+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления статуса ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{ 
    "error":201340400001,
    "error_description":"status is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201340400001` | Удаляемый статус не найден ||
|| `200040300020` | Недостаточно прав для удаления статуса ||
|| `201350000002` | Ошибка возникает при попытке удаления некоторых [системных статусов](./index.md):
- `N`
- `F`
- `DN`
- `DF`
||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-status-add.md)
- [{#T}](./sale-status-update.md)
- [{#T}](./sale-status-get.md)
- [{#T}](./sale-status-list.md)
- [{#T}](./sale-status-get-fields.md)