# Получить описание полей шаблона реквизитов crm.requisite.preset.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает формально описание полей шаблона реквизитов.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Поиск шаблонов по привязке к стране:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.preset.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.fields",
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
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
                'crm.requisite.preset.fields',
                []
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
        echo 'Error fetching requisite preset fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.fields",
        {},
        function(result)
        {
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
        'crm.requisite.preset.fields',
        []
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
        "ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID"
        },
        "ENTITY_TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID типа объекта"
        },
        "COUNTRY_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID страны"
        },
        "NAME": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название"
        },
        "DATE_CREATE": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата создания"
        },
        "DATE_MODIFY": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата изменения"
        },
        "CREATED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Создал"
        },
        "MODIFY_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Изменил"
        },
        "ACTIVE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Активен"
        },
        "SORT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сортировка"
        },
        "XML_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний код"
        }
    },
    "time": {
        "start": 1716555914.663808,
        "finish": 1716555914.996533,
        "duration": 0.33272480964660645,
        "processing": 0.008843183517456055,
        "date_start": "2024-05-24T15:05:14+02:00",
        "date_finish": "2024-05-24T15:05:14+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля, а `value` — объект с [атрибутами поля](#attributes) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей шаблона реквизитов 

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита. Создается автоматически и уникален в рамках портала ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта. Сейчас это только «Реквизит» (идентификатор `8`).

Идентификаторы типов объектов CRM отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **COUNTRY_ID**
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей шаблона реквизита (для получения доступных значений смотрите метод [crm.requisite.preset.countries](./crm-requisite-preset-countries.md)) ||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения. Содержит пустую строку, если шаблон не менялся после создания ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME**
[`string`](../../../data-types.md) | Название реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. 

Каждое приложение обеспечивает уникальность значений в этом поле. Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями. 

В CRM зарезервированы значения вида `#CRM_REQUISITE_PRESET_DEF_...` для идентификации шаблонов, которые используются по умолчанию. Не следует использовать эти идентификаторы для своих целей, так как это может привести к нарушению логики ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`. Определяет доступность шаблона в списке выбора при добавлении реквизитов ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|#

### Описание атрибутов {#attributes}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип поля ||
|| **isRequired**
[`boolean`](../../../data-types.md) | Атрибут «обязательное». Возможные значения:
- true — да
- false — нет
||
|| **isReadOnly**
[`boolean`](../../../data-types.md) | Атрибут «только для чтения». Возможные значения:
- true — да
- false — нет
||
|| **isImmutable**
[`boolean`](../../../data-types.md) | Атрибут «неизменяемое». Возможные значения:
- true — да
- false — нет
||
|| **isMultiple**
[`boolean`](../../../data-types.md) | Атрибут «мультиполе». Возможные значения:
- true — да
- false — нет
||
|| **isDynamic**
[`boolean`](../../../data-types.md) | Атрибут «пользовательское». Возможные значения:
- true — да
- false — нет
||
|| **title**
[`string`](../../../data-types.md) | Идентификатор поля ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-add.md)
- [{#T}](./crm-requisite-preset-update.md)
- [{#T}](./crm-requisite-preset-countries.md)
- [{#T}](./crm-requisite-preset-get.md)
- [{#T}](./crm-requisite-preset-list.md)
- [{#T}](./crm-requisite-preset-delete.md)
