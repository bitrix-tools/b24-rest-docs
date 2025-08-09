# Получить запись из листа ожидания booking.v1.waitlist.get

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.waitlist.get` возвращает информацию о записи в листе ожидания по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор записи в листе ожидания. Можно получить в методах [booking.v1.waitlist.add](./booking-v1-waitlist-add.md) и [booking.v1.waitlist.list](./booking-v1-waitlist-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.waitlist.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.waitlist.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"booking.v1.waitlist.get",
    		{
    			id: 15
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch( error )
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
                'booking.v1.waitlist.get',
                [
                    'id' => 15
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
        echo 'Error getting waitlist: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.waitlist.get",
        {
            id: 15
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.waitlist.get',
        [
            'id' => 15
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
    "waitList": {
     "id": 7,
     "note": null
    }
},
"time": {
    "start": 1741002780.099604,
    "finish": 1741002780.381558,
    "duration": 0.2819540500640869,
    "processing": 0.14896297454833984,
    "date_start": "2025-03-03T11:53:00+00:00",
    "date_finish": "2025-03-03T11:53:00+00:00",
    "operating": 0.14890098571777344
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит информацию о полях записи в листе ожидания. Структура описана [ниже](#waitList) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Запись в листе ожидания {#waitList} 

#|
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи в листе ожидания ||
|| **note**
[`string`](../../data-types.md) | Заметка, связанная с записью в листе ожидания. Может быть `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1040,
    "error_description": "Wait list not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1040` | `Wait list not found` | Запись с таким `id` не найдена ||
|| `100` | `Could not find value for parameter ` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-waitlist-createfrombooking.md)
- [{#T}](./booking-v1-waitlist-update.md)
- [{#T}](./booking-v1-waitlist-add.md)
- [{#T}](./booking-v1-waitlist-list.md)
- [{#T}](./booking-v1-waitlist-delete.md)