# Получить настраиваемое поле шаблона реквизитов по id crm.requisite.preset.field.get

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает описание настраиваемого поля шаблона реквизитов по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор настраиваемого поля. 

Идентификаторы настраиваемых полей шаблона реквизитов можно получить с помощью метода [crm.requisite.preset.field.list](./crm-requisite-preset-field-list.md) ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, из которого извлекается информация о настраиваемом поле (например, `{"ID": 27}`). 

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
    -d '{"ID":1,"preset":{"ID":27}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"preset":{"ID":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.field.get",
    		{
    			ID: 1,          // Идентификатор настраиваемого поля
    			preset:
    			{
    				"ID": 27    // Идентификатор шаблона реквизитов
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
                'crm.requisite.preset.field.get',
                [
                    'ID'     => 1,
                    'preset' => [
                        'ID' => 27,
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
        echo 'Error getting preset field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.get",
        {
            ID: 1,          // Идентификатор настраиваемого поля
            preset:
            {
                "ID": 27    // Идентификатор шаблона реквизитов
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
        'crm.requisite.preset.field.get',
        [
            'ID' => 1,
            'preset' => ['ID' => 27]
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
        "ID": 1,
        "FIELD_NAME": "RQ_NAME",
        "FIELD_TITLE": "TEST",
        "IN_SHORT_LIST": "N",
        "SORT": 580
    },
    "time": {
        "start": 1716826213.057061,
        "finish": 1716826213.541336,
        "duration": 0.48427510261535645,
        "processing": 0.025674104690551758,
        "date_start": "2024-05-27T18:10:13+02:00",
        "date_finish": "2024-05-27T18:10:13+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Объект, содержащий поля, описывающие настраиваемое поле шаблона реквизитов ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Поля, описывающие настраиваемое поле шаблона реквизитов

#|
||  **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона 
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Название поля 
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет 
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона 
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` 
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The PresetField with ID '1' is not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The PresetField with ID '1' is not found` | Настраиваемое поле шаблона с указанным идентификатором не найдено ||
|| `The Preset with ID '27' is not found` | Шаблон с указанным идентификатором не найден ||
|| `Access denied` | Недостаточно прав доступа для получения настраиваемого поля шаблона ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)
