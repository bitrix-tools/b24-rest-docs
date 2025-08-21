# Получить описание полей адреса crm.address.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает формально описание полей адреса.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.address.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.address.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.address.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
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
                'crm.address.fields',
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
        echo 'Error fetching CRM address fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.address.fields",
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
        'crm.address.fields',
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
        "TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "TYPE_ID"
        },
        "ENTITY_TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ENTITY_TYPE_ID"
        },
        "ENTITY_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ENTITY_ID"
        },
        "ADDRESS_1": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Улица, дом, корпус, строение"
        },
        "ADDRESS_2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Квартира / офис"
        },
        "CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Город"
        },
            "POSTAL_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Почтовый индекс"
        },
        "REGION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Район"
        },
        "PROVINCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Область"
        },
        "COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Страна"
        },
        "COUNTRY_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "COUNTRY_CODE"
        },
        "LOC_ADDR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Идентификатор адреса местоположения"
        },
        "ANCHOR_TYPE_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ANCHOR_TYPE_ID"
        },
        "ANCHOR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ANCHOR_ID"
        }
    },
    "time": {
        "start": 1712938174.436428,
        "finish": 1712938175.432068,
        "duration": 0.9956400394439697,
        "processing": 0.5710320472717285,
        "date_start": "2024-04-12T19:09:34+03:00",
        "date_finish": "2024-04-12T19:09:35+03:00"
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

### Описание полей адреса

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» можно получить с помощью метода [crm.enum.addresstype](../../auxiliary/enum/crm-enum-address-type.md) 
||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

Адреса могут быть привязаны только к Реквизитам (а реквизиты уже к компаниям либо контактам) или Лидам. 

Для обратной совместимости оставлена возможность связывать Адреса с Контактами или Компаниями. Но эта связь возможна только на некоторых старых порталах, где специально техподдержкой был включен старый режим работы с адресами
||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор родительского объекта ||
|| **ADDRESS_1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение ||
|| **ADDRESS_2**
[`string`](../../../data-types.md) | Квартира / офис ||
|| **CITY**
[`string`](../../../data-types.md) | Город ||
|| **POSTAL_CODE**
[`string`](../../../data-types.md) | Почтовый индекс ||
|| **REGION**
[`string`](../../../data-types.md) | Район ||
|| **PROVINCE**
[`string`](../../../data-types.md) | Область ||
|| **COUNTRY**
[`string`](../../../data-types.md) | Страна ||
|| **COUNTRY_CODE**
[`string`](../../../data-types.md) | Код страны.

Не используется, оставлено для обратной совместимости. В качестве значения можно указать пустую строку
||
|| **LOC_ADDR_ID**
[`integer`](../../../data-types.md) | Идентификатор адреса местоположения.

Это поле содержит идентификатор объекта адреса в модуле `Location`, связанного с объектов адреса CRM. Каждому адресу CRM соответствует объект адреса в модуле `location`. Это можно использовать для копирования существующего адреса в CRM с информацией о местоположении, которой нет в полях адреса CRM.

Если при создании адреса указан идентификатор адреса модуля `location`, то создается копия адреса `location` и привязывается к созданному адресу CRM. Если в таком случае не указаны значения для строковых полей адреса, то они будут заполнены из location-адреса.

Если же было указано хоть одно строковое поле, то в адресе CRM будут сохранены только указанные поля, и их значения перезапишут соответствующие значения в объекте location-адреса. Такое же поведение будет и при обновлении адреса
||
|| **ANCHOR_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

В этом поле содержится идентификатор типа родительского объекта реквизита (компания или контакт), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор типа лид
||
|| **ANCHOR_ID**
[`integer`](../../../data-types.md) | Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

В этом поле содержится идентификатор родительского объекта реквизита (компании или контакта), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор лида
||
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

- [{#T}](./crm-address-add.md)
- [{#T}](./crm-address-update.md)
- [{#T}](./crm-address-list.md)
- [{#T}](./crm-address-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-company-with-requisite.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md)
