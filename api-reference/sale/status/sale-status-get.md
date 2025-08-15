# Получить значения всех полей статуса по id sale.status.get

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает значения всех полей  статуса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_status.id`](../data-types.md) | Символьный идентификатор статуса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.status.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.status.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.status.get", {
    			"id": "N"
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
                'sale.status.get',
                [
                    'id' => 'N',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting sale status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.status.get", {
            "id": "N"
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

    $result = CRest::call('sale.status.get', [
        'id' => 'N'
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
    "result":{
        "status":{
            "color":"#BEEDF1",
            "id":"N",
            "notify":"Y",
            "sort":10,
            "type":"O",
            "xmlId":null
        }
    },
    "time":{
        "start":1712144798.388861,
        "finish":1712144798.636187,
        "duration":0.24732613563537598,
        "processing":0.012362003326416016,
        "date_start":"2024-04-03T14:46:38+03:00",
        "date_finish":"2024-04-03T14:46:38+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **status**
[`sale_status`](../data-types.md) | Информация о статусе ||
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
|| `201340400001` | Статус не найден ||
|| `200040300010` | Недостаточно прав для чтения статуса ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-status-add.md)
- [{#T}](./sale-status-update.md)
- [{#T}](./sale-status-list.md)
- [{#T}](./sale-status-delete.md)
- [{#T}](./sale-status-get-fields.md)