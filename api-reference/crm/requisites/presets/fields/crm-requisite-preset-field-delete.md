# Удалить настраиваемое поле из шаблона реквизитов crm.requisite.preset.field.delete

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет настраиваемое поле из шаблона реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор настраиваемого поля, которое нужно удалить. 

Идентификаторы настраиваемых полей шаблона реквизитов можно получить с помощью метода [crm.requisite.preset.field.list](./crm-requisite-preset-field-list.md) ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, из которого удаляется настраиваемое поле (например, `{"ID": 27}`). 

Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":27,"preset":{"ID":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":27,"preset":{"ID":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.field.delete",
    		{
    			ID: 27,
    			preset:
    			{
    				"ID": 1
    			}
    		}
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
                'crm.requisite.preset.field.delete',
                [
                    'ID'     => 27,
                    'preset' => [
                        'ID' => 1,
                    ],
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
        echo 'Error deleting preset field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.delete",
        {
            ID: 27,        // Идентификатор настраиваемого поля, которое нужно удалить из шаблона
            preset:
            {
                "ID": 1    // Идентификатор шаблона реквизитов
            }
        },
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
        'crm.requisite.preset.field.delete',
        [
            'ID' => 27,
            'preset' => ['ID' => 1]
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
        "start": 1716819592.314096,
        "finish": 1716819592.798008,
        "duration": 0.48391199111938477,
        "processing": 0.06737184524536133,
        "date_start": "2024-05-27T16:19:52+02:00",
        "date_finish": "2024-05-27T16:19:52+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат удаления из настраиваемого поля из шаблона:
- `true` — удалено
- `false` — не удалено 
||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The PresetField with ID '27' is not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The PresetField with ID '27' is not found` | Поле с указанным идентификатором не найдено ||
|| `The Preset with ID '1' is not found` | Шаблон с указанным идентификатором не найден ||
|| `ID is not defined or invalid` | Идентификатор шаблона не указан или имеет недопустимое значение ||
|| `Access denied` | Недостаточно прав доступа для удаления поля из шаблона реквизитов ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-fields.md)
