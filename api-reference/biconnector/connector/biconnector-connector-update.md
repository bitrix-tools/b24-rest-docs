# Изменить коннектор biconnector.connector.update

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.connector.update` обновляет существующий коннектор.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор коннектора, можно получить методами [biconnector.connector.list](./biconnector-connector-list.md) и [biconnector.connector.add](./biconnector-connector-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий обновляемые данные. Формат объекта: 

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
|| **title**
[`string`](../../data-types.md) | Новое название коннектора ||
|| **logo**
[`string`](../../data-types.md) | Новый логотип коннектора. Может передаваться ссылкой на изображение или строкой формата base64, например `data:image/svg+xml;base64,PHN2ZyB3...` ||
|| **description**
[`string`](../../data-types.md) | Новое описание коннектора ||
|| **urlCheck**
[`string`](../../data-types.md) | Новый эндпоинт для проверки доступности коннектора, [(подробное описание)](./index.md#urlCheck) ||
|| **urlTableList**
[`string`](../../data-types.md) | Новый эндпоинт для получения списка таблиц, [(подробное описание)](./index.md#urlTableList)||
|| **urlTableDescription**
[`string`](../../data-types.md) | Новый эндпоинт для получения описания конкретной таблицы, [(подробное описание)](./index.md#urlTableDescription) ||
|| **urlData**
[`string`](../../data-types.md) | Новый эндпоинт для получения данных по выбранной таблице, [(подробное описание)](./index.md#urlData)  ||
|| **settings**
[`array`](../../data-types.md) | Новый список параметров подключения, [(подробное описание)](./index.md#settings) ||
|| **sort**
[`int`](../../data-types.md) | Новый параметр сортировки коннектора ||
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
             "id": 4,
             "fields": {
                 "title": "UPDATED REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,NEWLOGODATA",
                 "description": "Updated description",
                 "urlCheck": "http://example.com/api/new_check",
                 "urlTableList": "http://example.com/api/new_table_list",
                 "urlTableDescription": "http://example.com/api/new_table_description",
                 "urlData": "http://example.com/api/new_data",
                 "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 200
             }
             }' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.connector.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "id": 4,
             "fields": {
                 "title": "UPDATED REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,NEWLOGODATA",
                 "description": "Updated description",
                 "urlCheck": "http://example.com/api/new_check",
                 "urlTableList": "http://example.com/api/new_table_list",
                 "urlTableDescription": "http://example.com/api/new_table_description",
                 "urlData": "http://example.com/api/new_data",
                 "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 200
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.connector.update',
    		{
    			id: 4,
    			fields: {
    				"title": "UPDATED REST CONNECTOR",
    				"logo": "data:image/svg+xml;base64,NEWLOGODATA",
    				"description": "Updated description",
    				"urlCheck": "http://example.com/api/new_check",
    				"urlTableList": "http://example.com/api/new_table_list",
    				"urlTableDescription": "http://example.com/api/new_table_description",
    				"urlData": "http://example.com/api/new_data",
    				"settings": [
    					{
    						"name": "Идентификатор сотрудника",
    						"type": "STRING",
    						"code": "id"
    					},
    					{
    						"name": "Пароль",
    						"type": "STRING",
    						"code": "password"
    					}
    				],
    				"sort": 200
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
                'biconnector.connector.update',
                [
                    'id' => 4,
                    'fields' => [
                        "title"               => "UPDATED REST CONNECTOR",
                        "logo"                => "data:image/svg+xml;base64,NEWLOGODATA",
                        "description"         => "Updated description",
                        "urlCheck"            => "http://example.com/api/new_check",
                        "urlTableList"        => "http://example.com/api/new_table_list",
                        "urlTableDescription" => "http://example.com/api/new_table_description",
                        "urlData"             => "http://example.com/api/new_data",
                        "settings"            => [
                            [
                                "name" => "Идентификатор сотрудника",
                                "type" => "STRING",
                                "code" => "id"
                            ],
                            [
                                "name" => "Пароль",
                                "type" => "STRING",
                                "code" => "password"
                            ]
                        ],
                        "sort"                => 200
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating connector: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.update',
        {
            id: 4,
            fields: {
                "title": "UPDATED REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,NEWLOGODATA",
                "description": "Updated description",
                "urlCheck": "http://example.com/api/new_check",
                "urlTableList": "http://example.com/api/new_table_list",
                "urlTableDescription": "http://example.com/api/new_table_description",
                "urlData": "http://example.com/api/new_data",
                "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                ],
                "sort": 200
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
        'biconnector.connector.update',
        [
            'id' => 4,
            'fields' => [
                'title' => 'UPDATED REST CONNECTOR',
                'logo' => 'data:image/svg+xml;base64,NEWLOGODATA',
                'description' => 'Updated description',
                'urlCheck' => 'http://example.com/api/new_check',
                'urlTableList' => 'http://example.com/api/new_table_list',
                'urlTableDescription' => 'http://example.com/api/new_table_description',
                'urlData' => 'http://example.com/api/new_data',
                'settings' => [
                    [
                        'name' => 'Идентификатор сотрудника',
                        'type' => 'STRING',
                        'code' => 'id'
                    ],
                    [
                        'name' => 'Пароль',
                        'type' => 'STRING',
                        'code' => 'password'
                    ]
                ],
                'sort' => 200
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
    "result": true,
    "time": {
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00"
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
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided. | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_IMMUTABLE_FIELD` | Field "#TITLE#" is immutable. | Поле #TITLE# неизменяемое ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `CONNECTOR_NOT_FOUND` | Connector was not found. | Коннектор не найден ||
|| `VALIDATION_SETTINGS_MISSING_REQUIRED_FIELDS` | Settings must include "type", "name" and "code" fields. | В настройках должны быть указаны поля `type`, `name` и `code` ||
|| `VALIDATION_SETTINGS_INVALID_TYPE` | Parameter "type" is not correct. | Недопустимое значение параметра `type` ||
|| `VALIDATION_SETTINGS_NAME_TOO_LONG` | Parameter "name" must be less than 512 characters. | Значение параметра `name` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_CODE_TOO_LONG` | Parameter "code" must be less than 512 characters. | Значение параметра `code` не должно превышать 512 символов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-connector-add.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)
