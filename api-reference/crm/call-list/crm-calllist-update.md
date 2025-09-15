# Обновить состав списка обзвона crm.calllist.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.update` позволяет добавить или удалить участников в существующем списке обзвона, и обновить связанную CRM-форму.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIST_ID***
[`integer`](../../data-types.md) | Идентификатор обзвона ||
|| **ENTITY_TYPE***
[`string`](../../data-types.md) | Тип объекта: 
- `CONTACT` — контакт,
- `COMPANY` — компания ||
|| **ENTITIES***
[`array`](../../data-types.md) | Массив `ID` контактов или компаний, получить можно методом [crm.item.list](../universal/crm-item-list.md) ||
|| **WEBFORM_ID**
[`integer`](../../data-types.md) | `ID` CRM-формы, которая будет выводиться в форме обзвона. 
`ID` можно найти в списке форм Битрикс24 https://your-domain.ru/crm/webform/ ||
|#

### Особенности работы метода

Метод перезаписывает массив `ENTITIES`. Чтобы добавить элемент, включите в запрос и текущие, и новые `ID`:

1. Текущие ID: [1,2,3].
2. Новые ID: [4].
3. Передать: [1,2,3,4].

Чтобы удалить элемент, передайте только те `ID`, которые должны остаться в списке:

4. Текущие ID: [1,2,3].
5. Удалить: [2].
6. Передать: [1,3].

Метод перезаписывает поле `WEBFORM_ID`. Если при вызове метода не передавать поле `WEBFORM_ID`, поле будет очищено.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":123,"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":123,"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5,"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.calllist.update',
    		{
    			LIST_ID: 123,
    			ENTITY_TYPE: 'CONTACT',
    			ENTITIES: [1, 2, 3],
    			WEBFORM_ID: 5
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error()) {
    		console.error(result.error());
    	} else {
    		console.dir(result);
    	}
    }
    catch (error)
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
                'crm.calllist.update',
                [
                    'LIST_ID'     => 123,
                    'ENTITY_TYPE' => 'CONTACT',
                    'ENTITIES'    => [1, 2, 3],
                    'WEBFORM_ID'  => 5,
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
        echo 'Error updating call list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.update",
        {
            LIST_ID: 123,
            ENTITY_TYPE: "CONTACT",
            ENTITIES: [1,2,3],
            WEBFORM_ID: 5
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
        'crm.calllist.update',
        [
            'LIST_ID' => 123,
            'ENTITY_TYPE' => 'CONTACT',
            'ENTITIES' => [1,2,3],
            'WEBFORM_ID' => 5
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
        "start": 1752562914.533195,
        "finish": 1752562914.606445,
        "duration": 0.07325005531311035,
        "processing": 0.044027090072631836,
        "date_start": "2025-07-15T10:01:54+03:00",
        "date_finish": "2025-07-15T10:01:54+03:00",
        "operating_reset_at": 1752563514,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid parameters.",
    "error_description": "Переданы некорректные параметры."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Invalid parameters` | Переданы некорректные параметры ||
|| `400` | `Incorrect entity type` | Указан неподдерживаемый тип объекта ||
|| `400` | `Entities is not array` | Параметр ENTITIES не является массивом ||
|| `400` | `Incorrect entities id` | Переданы некорректные ID элементов ||
|| `400` | `Incorrect list id or access denied` | Некорректный идентификатор списка или нет доступа ||
|| `400` | `Discrepancy between the type of call participants and incoming type` | Несовпадение типа участников и переданного типа ||
|| `400` | `Incorrect webform id` | Некорректный ID CRM-формы ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md) 