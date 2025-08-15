# Создать датасет biconnector.dataset.add

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.dataset.add` создает новый датасет, связанный с источником данных.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания нового датасета. Формат объекта: 

```
{
    "field_1": "value_1",
    "field_2": "value_2",
    ...,
    "field_n": "value_n"
}
```

- `field_n` — название поля
- `value_n` — значение поля

[Подробное описание ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название датасета. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_`. Максимальная длина названия 230 символа ||
|| **externalName***
[`string`](../../data-types.md) | Название датасета во внешнем источнике, в приложении ||
|| **externalCode***
[`string`](../../data-types.md) | Уникальный код датасета во внешнем источнике, используется при выборке данных ||
|| **sourceId***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](../source/biconnector-source-list.md) или [biconnector.source.add](../source/biconnector-source-add.md) ||
|| **description**
[`string`](../../data-types.md) | Описание датасета ||
|| **fields***
[`array`](../../data-types.md) | Список полей датасета, [(Подробное описание)](./index.md#fields) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "sourceId": 3,
            "name": "rest_dataset",
            "externalName": "extranalName",
            "externalCode": "extrnalCode",
            "description": "Описание датасета",
            "fields": [
                { "type": "int", "name": "ID", "externalCode": "ID" },
                { "type": "string", "name": "NAME", "externalCode": "NAME" },
                { "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
                { "type": "double", "name": "SCORE", "externalCode": "SCORE" },
                { "type": "date", "name": "DATA", "externalCode": "DATA" },
                { "type": "datetime", "name": "TIME", "externalCode": "TIME" }
            ]
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.dataset.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "sourceId": 3,
            "name": "rest_dataset",
            "externalName": "extranalName",
            "externalCode": "extrnalCode",
            "description": "Описание датасета",
            "fields": [
                { "type": "int", "name": "ID", "externalCode": "ID" },
                { "type": "string", "name": "NAME", "externalCode": "NAME" },
                { "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
                { "type": "double", "name": "SCORE", "externalCode": "SCORE" },
                { "type": "date", "name": "DATA", "externalCode": "DATA" },
                { "type": "datetime", "name": "TIME", "externalCode": "TIME" }
            ]
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.dataset.add',
    		{
    			fields: {
    				"sourceId": 3,
    				"name": "rest_dataset",
    				"externalName": "extranalName",
    				"externalCode": "extrnalCode",
    				"description": "Описание датасета",
    				"fields": [
    					{ "type": "int", "name": "ID", "externalCode": "ID" },
    					{ "type": "string", "name": "NAME", "externalCode": "NAME" },
    					{ "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
    					{ "type": "double", "name": "SCORE", "externalCode": "SCORE" },
    					{ "type": "date", "name": "DATA", "externalCode": "DATA" },
    					{ "type": "datetime", "name": "TIME", "externalCode": "TIME" }
    				]
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result);
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
                'biconnector.dataset.add',
                [
                    'fields' => [
                        'sourceId'      => 3,
                        'name'          => 'rest_dataset',
                        'externalName'  => 'extranalName',
                        'externalCode'  => 'extrnalCode',
                        'description'   => 'Описание датасета',
                        'fields'        => [
                            ['type' => 'int', 'name' => 'ID', 'externalCode' => 'ID'],
                            ['type' => 'string', 'name' => 'NAME', 'externalCode' => 'NAME'],
                            ['type' => 'string', 'name' => 'SURNAME', 'externalCode' => 'SURNAME'],
                            ['type' => 'double', 'name' => 'SCORE', 'externalCode' => 'SCORE'],
                            ['type' => 'date', 'name' => 'DATA', 'externalCode' => 'DATA'],
                            ['type' => 'datetime', 'name' => 'TIME', 'externalCode' => 'TIME'],
                        ],
                    ],
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
        echo 'Error adding dataset: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.add',
        {
            fields: {
                "sourceId": 3,
                "name": "rest_dataset",
                "externalName": "extranalName",
                "externalCode": "extrnalCode",
                "description": "Описание датасета",
                "fields": [
                    { "type": "int", "name": "ID", "externalCode": "ID" },
                    { "type": "string", "name": "NAME", "externalCode": "NAME" },
                    { "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
                    { "type": "double", "name": "SCORE", "externalCode": "SCORE" },
                    { "type": "date", "name": "DATA", "externalCode": "DATA" },
                    { "type": "datetime", "name": "TIME", "externalCode": "TIME" }
                ]
            }
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.add',
        [
            'fields' => [
                'sourceId' => 3,
                'name' => 'rest_dataset',
                'externalName' => 'extranalName',
                'externalCode' => 'extrnalCode',
                'description' => 'Описание датасета',
                'fields' => [
                    [ 'type' => 'int', 'name' => 'ID', 'externalCode' => 'ID' ],
                    [ 'type' => 'string', 'name' => 'NAME', 'externalCode' => 'NAME' ],
                    [ 'type' => 'string', 'name' => 'SURNAME', 'externalCode' => 'SURNAME' ],
                    [ 'type' => 'double', 'name' => 'SCORE', 'externalCode' => 'SCORE' ],
                    [ 'type' => 'date', 'name' => 'DATA', 'externalCode' => 'DATA' ],
                    [ 'type' => 'datetime', 'name' => 'TIME', 'externalCode' => 'TIME' ]
                ]
            ]
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
      "id": 10
    },
    "time": {
        "start": 1725013197.635808,
        "finish": 1725013198.580873,
        "duration": 0.9450650215148926,
        "processing": 0.6822988986968994,
        "date_start": "2024-08-30T12:19:57+02:00",
        "date_finish": "2024-08-30T12:19:58+02:00",
        "operating": 0
    }
}
```
### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного датасета ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#
## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_FIELDS_NOT_PROVIDED",
    "error_description": "Fields not provided."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided. | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_REQUIRED_FIELD_MISSING` | Field "#TITLE#" is required. | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_IMMUTABLE_FIELD` | Field "#TITLE#" is immutable. | Поле #TITLE# неизменяемое ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `SOURCE_NOT_FOUND` | Source was not found. | Источник не найден ||
|| `DATASET_ALREADY_EXIST` | Dataset with this name already exists. | Датасет с таким именем уже существует ||
|| `VALIDATION_DATASET_NAME_INVALID` | Dataset name has to start with a lowercase Latin character. Possible entry includes lowercase Latin characters (a-z), numbers (0-9) and underscores. | Неправильный формат названия датасета. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `(a-z)`, цифры и знак `_` ||
|| `VALIDATION_DATASET_NAME_TOO_LONG` | Dataset name must not exceed 230 characters. | Название датасета не должно превышать 230 символов ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | Duplicate values found in the "code" parameter: #LIST_CODES# | Обнаружены дубликаты в параметре `externalCode` полей датасета ||
|| `VALIDATION_DUPLICATE_FIELD_NAME` | Duplicate values found in the "name" parameter: #LIST_NAMES# | Обнаружены дубликаты в параметре `name` полей датасета ||
|| `VALIDATION_FIELD_MISSING_REQUIRED_PARAMETERS` | Field must include the required parameters: "name", "externalCode" and "type". | Поле должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores. | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `(A-Z)`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | Field "name" must not exceed 32 characters. | Название поля не должно превышать 32 символов ||
|| `VALIDATION_FIELD_INVALID_TYPE` | Invalid field type. | Некорректный тип поля ||
|| `-` | `Error adding dataset` | Ошибка добавления датасета ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-dataset-fields.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
