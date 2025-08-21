# Удалить раздел торгового каталога catalog.section.delete

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.section.delete` удаляет раздел торгового каталога. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор раздела каталога ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 31}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.section.delete
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 31, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.section.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.section.delete',
    		{
    			id: 31
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.log(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.section.delete',
                [
                    'id' => 31,
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
        echo 'Error deleting catalog section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.section.delete', 
        { 
            id: 31 
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
        'catalog.section.delete',
        [
            'id' => 31
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
        "start": 1716558215.93495,
        "finish": 1716558216.20731,
        "duration": 0.272363901138306,
        "processing": 0.028817892074585,
        "date_start": "2024-05-24T15:43:35+02:00",
        "date_finish": "2024-05-24T15:43:36+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления раздела каталога ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300050,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300050` | Недостаточно прав на удаление раздела каталога||
|| `200040300020` | Ошибки при удалении (например, фатальные) ||
|| `200700300030` | Раздела каталога с таким идентификатором не существует ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-section-add.md)
- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-list.md)
- [{#T}](./catalog-section-get-fields.md)