# Удалить шаблон бизнес-процесса bizproc.workflow.template.delete

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет шаблон бизнес-процесса. 

С его помощью можно удалить шаблоны, которые были созданы методом [bizproc.workflow.template.add](./bizproc-workflow-template-add.md). Эти шаблоны привязаны к приложению и могут быть удалены только в контексте того же [приложения](../../../settings/app-installation/index.md), которым они были созданы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**||
|| **ID***
[`integer`](../../data-types.md) | Идентификатор шаблона бизнес-процесса ||
|#	

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":525,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.workflow.template.delete',
    		{
    			ID: 525
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		alert("Error: " + result.error());
    	else
    		console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

	```php
	try {
		$templateId = 123; // Replace with the actual template ID you want to delete
		$result = $serviceBuilder
			->getBizProcScope()
			->template()
			->delete($templateId);
		if ($result->isSuccess()) {
			print("Template with ID {$templateId} deleted successfully.\n");
		} else {
			print("Failed to delete template with ID {$templateId}.\n");
		}
	} catch (\Throwable $e) {
		print("An error occurred: " . $e->getMessage() . "\n");
	}
	```

- BX24.js

	```js
    BX24.callMethod(
        'bizproc.workflow.template.delete',
        {
            ID: 525
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
	```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.template.delete',
        [
            'ID' => 525
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
    "result": null,
    "time": {
        "start": 1737536737.1245451,
        "finish": 1737536737.3437879,
        "duration": 0.21924281120300293,
        "processing": 0.18391799926757812,
        "date_start": "2025-01-22T12:05:37+03:00",
        "date_finish": "2025-01-22T12:05:37+03:00",
        "operating_reset_at": 1737537337,
        "operating": 0.18389892578125
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Вернет `null`, если шаблон успешно удален ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_TEMPLATE_NOT_FOUND",
    "error_description": "Workflow template not found.",
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | Токен доступа не из приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод запустил не администратор ||
|| `ERROR_TEMPLATE_NOT_FOUND` | Workflow template not found. | Не найден шаблон с заданным `ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-template-add.md)
- [{#T}](./bizproc-workflow-template-update.md)
- [{#T}](./bizproc-workflow-template-list.md)