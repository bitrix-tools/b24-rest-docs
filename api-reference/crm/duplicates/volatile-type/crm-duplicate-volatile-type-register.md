# Добавить поле в поиск дубликатов crm.duplicate.volatileType.register

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.duplicate.volatileType.register` добавляет поле в функционал поиска дубликатов в лидах, контактах или компаниях.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId*** 
[`integer`](../../../data-types.md) | Идентификатор типа объекта. Возможные значения:
- `1` — [лид](../../leads/index.md)
- `3` — [контакт](../../contacts/index.md)
- `4` — [компания](../../companies/index.md) ||
|| **fieldCode*** 
[`string`](../../../data-types.md) | Код поля, который нужно добавить в поиск дубликатов. Например  `TITLE`, `RQ.RU.NAME`, `UF_CRM_1750854801`. Получить список доступных полей можно методом [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) ||
|#

### Особенности работы метода

Суммарно можно зарегистрировать 7 нестандартных полей для поиска дубликатов. Например, если уже добавили 3 поля для контактов и 4 поля для компаний, при попытке добавить еще одно поле для любого типа объекта получите ошибку `MAX_TYPES_COUNT_EXCEEDED`. 

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"entityTypeId":1,"fieldCode":"TITLE"}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.duplicate.volatileType.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"fieldCode":"TITLE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.duplicate.volatileType.register
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.duplicate.volatileType.register",
    		{
    			entityTypeId: 1,
    			fieldCode: "TITLE"
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
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
                'crm.duplicate.volatileType.register',
                [
                    'entityTypeId' => 1,
                    'fieldCode'    => 'TITLE',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering volatile type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.duplicate.volatileType.register",
        {
            entityTypeId: 1,
            fieldCode: "TITLE"
        },
        function(result) {
            if(result.error())
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
        'crm.duplicate.volatileType.register',
        [
            'entityTypeId' => 1,
            'fieldCode' => 'TITLE'
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
        "id": 3355
    },
    "time": {
        "start": 1750934251.736599,
        "finish": 1750934252.028757,
        "duration": 0.2921581268310547,
        "processing": 0.24904417991638184,
        "date_start": "2025-06-26T13:37:31+03:00",
        "date_finish": "2025-06-26T13:37:32+03:00",
        "operating_reset_at": 1750934851,
        "operating": 0.24902796745300293
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор записи для поля, добавленного в поиск дубликатов ||
|| **time**[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Field not found",
    "error_description": "Указанное поле не найдено."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Field not found` | Указанное поле не найдено ||
|| `400` | `MAX_TYPES_COUNT_EXCEEDED` | Превышено максимальное количество нестандартных типов полей в поиске дубликатов ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md)
- [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)
- [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) 