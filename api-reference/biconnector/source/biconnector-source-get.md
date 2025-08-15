# Получить источник по id biconnector.source.get

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.source.get` возвращает информацию об источнике по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](./biconnector-source-list.md) и [biconnector.source.add](./biconnector-source-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.source.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.source.get',
    		{
    			id: 6,
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error() ? console.error(result.error()) : console.info(result);
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
                'biconnector.source.get',
                [
                    'id' => 6,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting source: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.get',
        {
            id: 6,
        },
        (result) => {
            result.error() ? console.error(result.error()) : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.source.get',
        [
            'id' => 6
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
        "item": {
            "connection": {
                "id": 6,
                "type": "rest",
                "code": "rest_1",
                "title": "Rest source SQL",
                "description": "Подключение для работы с mySql",
                "active": true,
                "dateCreate": "2025-03-20 14:50:06",
                "dateUpdate": "2025-03-20 14:50:06",
                "createdById": 1,
                "updatedById": 1
            },
            "connectorId": 1,
            "settings": [
                {
                    "code": "token",
                    "name": "Токен",
                    "type": "STRING",
                    "value": "beliberda",
                    "id": 8
                }
            ]
        }
    },
    "time": {
        "start": 1742929480.368097,
        "finish": 1742929480.449558,
        "duration": 0.08146095275878906,
        "processing": 0.006555080413818359,
        "date_start": "2025-03-25T19:04:40+00:00",
        "date_finish": "2025-03-25T19:04:40+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`item`](../../data-types.md) | Корневой элемент ответа. Содержит информацию о полях источника. Описание полей в статье [Источники: обзор методов](./index.md#fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_ID_NOT_PROVIDED",
    "error_description": "ID is missing."
}
```
{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `SOURCE_NOT_FOUND` | Source was not found. | Источник не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-source-update.md)
- [{#T}](./biconnector-source-add.md)
- [{#T}](./biconnector-source-list.md)
- [{#T}](./biconnector-source-delete.md)
- [{#T}](./biconnector-source-fields.md)