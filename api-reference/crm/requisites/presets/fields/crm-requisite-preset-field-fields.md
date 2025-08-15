# Получить описание настраиваемых полей шаблона реквизитов crm.requisite.preset.field.fields

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает формально описание полей, описывающих настаиваемое поле шаблона реквизитов.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.requisite.preset.field.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
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
                'crm.requisite.preset.field.fields',
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
        echo 'Error fetching preset field fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.fields",
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
        'crm.requisite.preset.field.fields',
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
        "FIELD_NAME": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Имя"
        },
        "FIELD_TITLE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название в шаблоне"
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
        "IN_SHORT_LIST": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Показывать в кратком списке"
        }
    },
    "time": {
        "start": 1716823643.597269,
        "finish": 1716823643.949143,
        "duration": 0.35187387466430664,
        "processing": 0.012942075729370117,
        "date_start": "2024-05-27T17:27:23+02:00",
        "date_finish": "2024-05-27T17:27:23+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля, а `value` — объект с [атрибутами поля](#attribute) ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей, описывающих настраиваемое поле шаблона реквизитов

#|
||  **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Название поля ||
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет 
||
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона ||
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

### Описание атрибутов {#attribute}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../../data-types.md) | Тип поля ||
|| **isRequired**
[`boolean`](../../../../data-types.md) | Атрибут «обязательное». Возможные значения:
- true — да
- false — нет
||
|| **isReadOnly**
[`boolean`](../../../../data-types.md) | Атрибут «только для чтения». Возможные значения:
- true — да
- false — нет 
||
|| **isImmutable**
[`boolean`](../../../../data-types.md) | Атрибут «неизменяемое». Возможные значения:
- true — да
- false — нет 
||
|| **isMultiple**
[`boolean`](../../../../data-types.md) | Атрибут «мультиполе». Возможные значения:
- true — да
- false — нет
||
|| **isDynamic**
[`boolean`](../../../../data-types.md) | Атрибут «пользовательское». Возможные значения:
- true — да
- false — нет 
||
|| **title**
[`string`](../../../../data-types.md) | Идентификатор поля ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
