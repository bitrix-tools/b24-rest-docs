# Получить тип плательщика по Id sale.persontype.get

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод служит для доступа к полям типа плательщика по его `Id`.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`Тип` | **Описание** ||
|| **id***
[`sale_person_type.id`](../data-types.md) | Номер типа плательщика ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":id}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.persontype.get
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":id,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.persontype.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.persontype.get',
    		{ id: id }
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
                'sale.persontype.get',
                [
                    'id' => $id,
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
        echo 'Error getting person type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.persontype.get', 
        { id: id }, 
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
        'sale.persontype.get',
        ['id' => $id]
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
        "personType": {
            "active": "Y",
            "code": null,
            "id": 37,
            "name": "Физическое лицо",
            "sort": "1233",
            "xmlId": null
        }
    },
    "time": {
        "start": 1712325939.41209,
        "finish": 1712325939.60039,
        "duration": 0.188301086425781,
        "processing": 0.00575995445251465,
        "date_start": "2024-04-05T16:05:39+02:00",
        "date_finish": "2024-04-05T16:05:39+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **personType**
[`sale_person_type`](../data-types.md) | Объект с информацией об обновленном типе плательщика ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200740400001` | Тип плательщика с заданным полем `id` не существует ||
|| `200040300010` | Нет доступа к чтению ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-person-type-add.md)
- [{#T}](./sale-person-type-update.md)
- [{#T}](./sale-person-type-list.md)
- [{#T}](./sale-person-type-delete.md)
- [{#T}](./sale-person-type-get-fields.md)