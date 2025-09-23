# Создать коннектор biconnector.connector.add

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.connector.add` создает новый коннектор, который позволяет интегрировать внешние источники данных в Битрикс24.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания нового коннектора. Формат объекта: 

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
|| **title***
[`string`](../../data-types.md) | Название коннектора ||
|| **logo***
[`string`](../../data-types.md) | Логотип коннектора. Может передаваться ссылкой на изображение или строкой формата base64, например `data:image/svg+xml;base64,PHN2ZyB3...` ||
|| **description**
[`string`](../../data-types.md) | Описание коннектора ||
|| **urlCheck***
[`string`](../../data-types.md) | Эндпоинт коннектора для проверки доступности, [(подробное описание)](./index.md#urlCheck) ||
|| **urlTableList***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения списка таблиц, [(подробное описание)](./index.md#urlTableList) ||
|| **urlTableDescription***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения описания конкретной таблицы, [(подробное описание)](./index.md#urlTableDescription) ||
|| **urlData***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения данных по выбранной таблице, [(подробное описание)](./index.md#urlData) ||
|| **settings***
[`array`](../../data-types.md) | Список параметров подключения, [(подробное описание)](./index.md#settings) ||
|| **sort**
[`int`](../../data-types.md) | Параметр сортировки коннекторов. Значение по умолчанию `100` ||
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
                 "title": "SUPER REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                 "description": "Connector with token",
                 "urlCheck": "http://example.com/api/check",
                 "urlTableList": "http://example.com/api/table_list",
                 "urlTableDescription": "http://example.com/api/table_description",
                 "urlData": "http://example.com/api/data",
                 "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 100
             }
             }' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.connector.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "fields": {
                 "title": "SUPER REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                 "description": "Connector with token",
                 "urlCheck": "http://example.com/api/check",
                 "urlTableList": "http://example.com/api/table_list",
                 "urlTableDescription": "http://example.com/api/table_description",
                 "urlData": "http://example.com/api/data",
                 "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 100
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.connector.add',
    		{
    			fields: {
    				"title": "SUPER REST CONNECTOR",
    				"logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
    				"description": "Connector with token",
    				"urlCheck": "http://example.com/api/check",
    				"urlTableList": "http://example.com/api/table_list",
    				"urlTableDescription": "http://example.com/api/table_description",
    				"urlData": "http://example.com/api/data",
    				"settings": [
    					{
    						"name": "Логин",
    						"type": "STRING",
    						"code": "login"
    					},
    					{
    						"name": "Пароль",
    						"type": "STRING",
    						"code": "password"
    					}
    				],
    				"sort": 100
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result.data());
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
                'biconnector.connector.add',
                [
                    'fields' => [
                        "title"               => "SUPER REST CONNECTOR",
                        "logo"                => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                        "description"          => "Connector with token",
                        "urlCheck"             => "http://example.com/api/check",
                        "urlTableList"         => "http://example.com/api/table_list",
                        "urlTableDescription"  => "http://example.com/api/table_description",
                        "urlData"              => "http://example.com/api/data",
                        "settings"             => [
                            [
                                "name" => "Логин",
                                "type" => "STRING",
                                "code" => "login"
                            ],
                            [
                                "name" => "Пароль",
                                "type" => "STRING",
                                "code" => "password"
                            ]
                        ],
                        "sort"                => 100
                    ],
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
        echo 'Error adding connector: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.add',
        {
            fields: {
                "title": "SUPER REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                "description": "Connector with token",
                "urlCheck": "http://example.com/api/check",
                "urlTableList": "http://example.com/api/table_list",
                "urlTableDescription": "http://example.com/api/table_description",
                "urlData": "http://example.com/api/data",
                "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                ],
                "sort": 100
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.add',
        [
            'fields' => [
                'title' => 'SUPER REST CONNECTOR',
                'logo' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==',
                'description' => 'Connector with token',
                'urlCheck' => 'http://example.com/api/check',
                'urlTableList' => 'http://example.com/api/table_list',
                'urlTableDescription' => 'http://example.com/api/table_description',
                'urlData' => 'http://example.com/api/data',
                'settings' => [
                    [
                        'name' => 'Логин',
                        'type' => 'STRING',
                        'code' => 'login'
                    ],
                    [
                        'name' => 'Пароль',
                        'type' => 'STRING',
                        'code' => 'password'
                    ]
                ],
                'sort' => 100
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
      "id": 4
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
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного коннектора ||
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
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_REQUIRED_FIELD_MISSING` | Field "#TITLE#" is required. | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_IMMUTABLE_FIELD` | Field "#TITLE#" is immutable. | Поле #TITLE# неизменяемое ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `VALIDATION_SETTINGS_MISSING_REQUIRED_FIELDS` | Settings must include "type", "name" and "code" fields. | В настройках должны быть указаны поля `type`, `name` и `code` ||
|| `VALIDATION_SETTINGS_NAME_TOO_LONG` | Parameter "name" must be less than 512 characters. | Значение параметра `name` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_CODE_TOO_LONG` | Parameter "code" must be less than 512 characters. | Значение параметра `code` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_INVALID_TYPE` | Parameter "type" is not correct. | Недопустимое значение параметра `type` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)
