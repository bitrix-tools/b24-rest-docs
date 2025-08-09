# Получить данные о цифровом рабочем месте по id crm.automatedsolution.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Метод отдает информацию о цифровом рабочем месте с идентификатором `id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор цифрового рабочего места ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":393}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":393,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automatedsolution.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.automatedsolution.get',
    		{
    			'id': 393
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
                'crm.automatedsolution.get',
                [
                    'id' => 393,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting automated solution: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.automatedsolution.get",
        {
            "id": 393
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.automatedsolution.get',
        [
            'id' => 393
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
		"automatedSolution": {
			"id": 393,
			"title": "HR",
			"typeIds": [
				4,
				9,
				77,
				157,
				225
			]
		}
	},
	"time": {
		"start": 1715849396.642359,
		"finish": 1715849396.954623,
		"duration": 0.31226396560668945,
		"processing": 0.0068209171295166016,
		"date_start": "2024-05-16T11:49:56+03:00",
		"date_finish": "2024-05-16T11:49:56+03:00",
		"operating_reset_at": 1715849996,
		"operating": 0
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **automatedSolution**
[`object`](../../data-types.md) | Информация о цифровом рабочем месте ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

**Объект** `automatedSolution`:

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор цифрового рабочего места ||
|| **title**
[`string`](../../data-types.md) | Название цифрового рабочего места ||
|| **typeIds**
[`array`](../../data-types.md) | Идентификаторы привязанных к рабочему месту смарт-процессов ||
|#

{% note warning %}

`Id` цифрового рабочего места и `id` структур `customSection` из метода [crm.type.get](../universal/user-defined-object-types/crm-type-get.md) не совпадают из-за разной организации хранения

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"NOT_FOUND",
    "error_description":"Цифровое рабочее место с таким id не найдено"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Цифровое рабочее место с таким `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-update.md)
- [{#T}](./crm-automated-solution-list.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)
