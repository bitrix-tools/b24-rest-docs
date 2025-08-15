# Получить поля воронки crm.category.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает информацию о полях воронок (направлений) объекта CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объектов CRM, для которого нужно получить информацию о полях воронки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.category.fields",
    		{
    			entityTypeId: 2,
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
                'crm.category.fields',
                [
                    'entityTypeId' => 2,
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
        echo 'Error calling crm.category.fields: ' . $e->getMessage();
    }
    ```

- BX24.js

	```js
    BX24.callMethod(
        "crm.category.fields",
        {
            entityTypeId: 2,
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        },
    );
	```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.fields',
        [
            'entityTypeId' => 2
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
        "fields": {
            "id": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ID",
                "upperName": "ID"
            },
            "name": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "NAME",
                "upperName": "NAME"
            },
            "sort": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "SORT",
                "upperName": "SORT"
            },
            "entityTypeId": {
                "type": "integer",
                "isRequired": true,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ENTITY_TYPE_ID",
                "upperName": "ENTITY_TYPE_ID"
            },
            "isDefault": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "IS_DEFAULT",
                "upperName": "IS_DEFAULT"
            },
            "originId": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ORIGIN_ID",
                "upperName": "ORIGIN_ID"
            },
            "originatorId": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ORIGINATOR_ID",
                "upperName": "ORIGINATOR_ID"
            }
        }
    },
    "time": {
        "start": 1718098629.350263,
        "finish": 1718098629.800741,
        "duration": 0.45047783851623535,
        "processing": 0.02919292449951172,
        "date_start": "2024-06-11T11:37:09+02:00",
        "date_finish": "2024-06-11T11:37:09+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком доступных полей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field_N` – идентификатор [поля объекта](#fields), а `value` — объект типа [crm_rest_field_description](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Описание полей fields {#fields}

#| 
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`][1] | Идентификатор воронки (направления) ||
|| **name**
[`string`][1] | Название воронки ||
|| **sort**
[`integer`][1] | Индекс сортировки ||
|| **entityTypeId**
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md), к которому принадлежит воронка ||
|| **isDefault**
[`boolean`][1] | Является ли воронка, воронкой по умолчанию ||
|| **originId**
[`string`][1] | Идентификатор источника данных.

Существует только в cделках ||
|| **originatorId**
[`string`][1] | Идентификатор элемента в источнике данных.

Существует только в cделках ||
|| **isSystem** 
[`boolean`][1] | Является ли воронка системной.

Существует только в смарт-процессах ||
|| **code**
[`string`][1] | Псевдоним для системных воронок.

Существует только в смарт-процессах ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND", 
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `NOT_FOUND` | Смарт-процесс не найден | Возникает, при некорректных значениях `entityTypeId` ||
|| `ENTITY_TYPE_NOT_SUPPORTED` |  Entity type `{entityTypeName}` is not supported | Возникает, если сущность CRM не поддерживает воронки ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}


## Продолжите изучение 

- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)

[1]: ../../../data-types.md
