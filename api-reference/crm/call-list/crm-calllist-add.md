# Создать новый список обзвона crm.calllist.add

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.add` создает новый список обзвона.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5,"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.calllist.add',
    		{
    			ENTITY_TYPE: 'CONTACT',
    			ENTITIES: [9, 17, 19],
    			WEBFORM_ID: 1
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error()) {
    		console.error(result.error());
    	} else {
    		console.dir(result);
    	}
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
                'crm.calllist.add',
                [
                    'ENTITY_TYPE' => 'CONTACT',
                    'ENTITIES'    => [9, 17, 19],
                    'WEBFORM_ID'  => 1,
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
        echo 'Error adding call list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.add",
        {
            ENTITY_TYPE: "CONTACT",
            ENTITIES: [9,17,19],
            WEBFORM_ID: 1
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
        'crm.calllist.add',
        [
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
    "result": 11,
    "time": {
        "start": 1752471668.062547,
        "finish": 1752471668.531711,
        "duration": 0.4691641330718994,
        "processing": 0.4174520969390869,
        "date_start": "2025-07-14T08:41:08+03:00",
        "date_finish": "2025-07-14T08:41:08+03:00",
        "operating_reset_at": 1752472268,
        "operating": 0.41742897033691406
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | ID созданного списка обзвона ||
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
|| `400` | `Access denied` | Нет прав на выполнение операции ||
|| `400` | `Invalid parameters` | Переданы некорректные параметры ||
|| `400` | `Incorrect entity type` | Указан неподдерживаемый тип объекта ||
|| `400` | `Entities is not array` | Параметр `ENTITIES` не является массивом ||
|| `400` | `Incorrect entities id` | Переданы некорректные `ID` элементов ||
|| `403` | `You don't have access to these entities` | Нет доступа к указанным элементам ||
|| `400` | `Incorrect webform id` | Некорректный `ID` CRM-формы ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 