# Изменить источник biconnector.source.update

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.source.update` обновляет существующий источник.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](./biconnector-source-list.md) и [biconnector.source.add](./biconnector-source-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий обновляемые данные.
Формат объекта: 

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

[Подробное описание ниже](#fields)||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Новое название источника ||
|| **description**
[`string`](../../data-types.md) | Новое описание источника ||
|| **active**
[`boolean`](../../data-types.md) | Активность источника ||
|| **settings**
[`object`](../../data-types.md) | Список параметров для авторизации, передается объектом, где ключ — `code` параметра. 
Параметры можно получить методами [biconnector.connector.list](../connector/biconnector-connector-list.md) или [biconnector.connector.get](../connector/biconnector-connector-get.md) ||
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
            "title": "Новое название источника",
            "description": "Обновленное описание источника",
            "active": false,
            "settings": {
                "login": "new_admin",
                "password": "new_password"
            }
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.source.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 4,
        "fields": {
            "title": "Новое название источника",
            "description": "Обновленное описание источника",
            "active": false,
            "settings": {
                "login": "new_admin",
                "password": "new_password"
            }
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.source.update',
    		{
    			id: 4,
    			fields: {
    				"title": "Новое название источника",
    				"description": "Обновленное описание источника",
    				"active": false,
    				"settings": {
    					"login": "new_admin",
    					"password": "new_password"
    				}
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
                'biconnector.source.update',
                [
                    'id' => 4,
                    'fields' => [
                        "title"       => "Новое название источника",
                        "description" => "Обновленное описание источника",
                        "active"      => false,
                        "settings"    => [
                            "login"    => "new_admin",
                            "password" => "new_password"
                        ]
                    ]
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
        echo 'Error updating source: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.update',
        {
            id: 4,
            fields: {
                "title": "Новое название источника",
                "description": "Обновленное описание источника",
                "active": false,
                "settings": {
                    "login": "new_admin",
                    "password": "new_password"
                }
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
        'biconnector.source.update',
        [
            'id' => 4,
            'fields' => [
                'title' => 'Новое название источника',
                'description' => 'Обновленное описание источника',
                'active' => false,
                'settings' => [
                    'login' => 'new_admin',
                    'password' => 'new_password'
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
|| `VALIDATION_REQUIRED_FIELD_MISSING` | Field "#TITLE#" is required. | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_IMMUTABLE_FIELD` | Field "#TITLE#" is immutable. | Поле #TITLE# неизменяемое ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `SOURCE_NOT_FOUND` | Source was not found. | Источник не найден ||
|| `SOURCE_CREATE_CONNECTION_ERROR` | Cannot create connection. | Ошибка при создании подключения ||
|| `SOURCE_UPDATE_CONNECTION_ERROR` | Cannot update connection. | Ошибка при обновлении подключения ||
|| `BX_ERROR` | Cannot delete source. Delete all related datasets first. | Нельзя удалить источник, пока существуют связанные датасеты ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-source-add.md)
- [{#T}](./biconnector-source-get.md)
- [{#T}](./biconnector-source-list.md)
- [{#T}](./biconnector-source-delete.md)
- [{#T}](./biconnector-source-fields.md)