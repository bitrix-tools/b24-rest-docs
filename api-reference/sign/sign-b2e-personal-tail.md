# Получить список подписанных документов пользователя sign.b2e.personal.tail

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к своим подписанным документам

Метод `sign.b2e.personal.tail` возвращает список подписанных документов пользователя из раздела КЭДО.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице. 

Параметр принимает значение от 1 до 50. 

По умолчанию выводится 20 записей на странице ||
|| **offset**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией. Аналогичен стандартному параметру [start](../../settings/performance/huge-data.md).
 
Размер страницы результатов зависит от параметра **limit**
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"limit":2,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.personal.tail
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sign.b2e.personal.tail',
    		{
    			// Количество записей на странице. Значение от 1 до 50. По умолчанию 20.
    			limit: 2,
    			
    			// Параметр для управления постраничной навигацией.
    			// Используется для указания смещения от начала списка.
    			offset: 0
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'sign.b2e.personal.tail',
                [
                    'limit'  => 2,
                    'offset' => 0
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.personal.tail',
        {
            // Количество записей на странице. Значение от 1 до 50. По умолчанию 20.
            limit: 2,
            
            // Параметр для управления постраничной навигацией.
            // Используется для указания смещения от начала списка.
            offset: 0
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.personal.tail',
        [
            'limit' => 2, // Количество записей на странице
            'offset' => 0 // Смещение от начала списка
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 59,
            "title": "test-pdf е",
            "signed_date": "2024-06-28T19:34:58+03:00",
            "file_url": "https://your-domain.bitrix24.ru/rest/download.json?auth=6348b3670000071b0075444600000001f0f1073855cfba3bff42f043e2c1c26a46cb93&token=sign.b2e%7CaWQ9NTkmXz1udzlucFJBVHUxM2JjcUV2YncyY0tQbTZNSTNzT0Z3MA%3D%3D%7CImRvd25sb2FkfHNpZ24uYjJlfGFXUTlOVGttWHoxdWR6bHVjRkpCVkhVeE0ySmpjVVYyWW5jeVkwdFFiVFpOU1ROelQwWjNNQT09fDYzNDhiMzY3MDAwMDA3MWIwMDc1NDQ0NjAwMDAwMDAxZjBmMTA3Mzg1NWNmYmEzYmZmNDJmMDQzZTJjMWMyNmE0NmNiOTMi.AoYFUXxsuvEjW9ipqBndwej6EvcjBWJTXMh9QQ3O6BU%3D"
        },
        {
            "id": 55,
            "title": "test-pdf 778484",
            "signed_date": "2024-06-28T18:39:47+03:00",
            "file_url": "https://your-domain.bitrix24.ru/rest/download.json?auth=6348b3670000071b0075444600000001f0f1073855cfba3bff42f043e2c1c26a46cb93&token=sign.b2e%7CaWQ9NTUmXz04eDU2VkhCUU9hZ0xQQzA3eDJLNWRuYmJ4dTFYOWgzOA%3D%3D%7CImRvd25sb2FkfHNpZ24uYjJlfGFXUTlOVFVtWHowNGVEVTJWa2hDVVU5aFoweFFRekEzZURKTE5XUnVZbUo0ZFRGWU9XZ3pPQT09fDYzNDhiMzY3MDAwMDA3MWIwMDc1NDQ0NjAwMDAwMDAxZjBmMTA3Mzg1NWNmYmEzYmZmNDJmMDQzZTJjMWMyNmE0NmNiOTMi.PYj60eOODc0X4n0pbwMFwIJKV3uZTlSpZBGCmPaj%2F7A%3D"
        }
    ],
    "time": {
        "start": 1739799244.3062601,
        "finish": 1739799244.3473959,
        "duration": 0.04113578796386719,
        "processing": 0.01007699966430664,
        "date_start": "2025-02-17T16:34:04+03:00",
        "date_finish": "2025-02-17T16:34:04+03:00",
        "operating_reset_at": 1739799844,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о подписанных документах пользователя ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор подписанного документа ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **signed_date**
[`string`](../data-types.md) | Дата подписания документа ||
|| **file_url**
[`string`](../data-types.md) | Ссылка для скачивания подписанного документа ||
|#

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sign-b2e-mysafe-tail.md)
