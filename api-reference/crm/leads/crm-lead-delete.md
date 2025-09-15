# Удалить лид crm.lead.delete

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом удаления лидов

Метод `crm.lead.delete` удаляет лид и все связанные с ним объекты: дела, история, записи таймлайна и другие. 

Объекты удаляются, если они не привязаны к другим объектам или элементам. В случае, если объекты привязаны к другим элементам, удалится только привязка к удаляемому лиду.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор лида.

Идентификатор можно получить с помощью методов [crm.lead.list](./crm-lead-list.md) или [crm.lead.add](./crm-lead-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"123"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.lead.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"123","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.delete
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		'crm.lead.delete',
    		{ id }
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    		return;
    	}
    	
    	console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php        
    try {
        $id = 123; // Example lead ID to delete
        $result = $serviceBuilder
            ->getCRMScope()
            ->lead()
            ->delete($id);
        if ($result->isSuccess()) {
            print("Lead with ID $id has been successfully deleted.");
        } else {
            print("Failed to delete lead with ID $id.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

- BX24.js

    ```javascript 
    const id = prompt("Введите ID");
    BX24.callMethod(
      'crm.lead.delete',
      { id },
      (result) => {
        if(result.error())
        {
          console.error(result.error());
  
          return;
        }
        
        console.info(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = readline("Введите ID: ");

    $result = CRest::call(
        'crm.lead.delete',
        [
            'id' => $id
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
        "start": 1705764932.998683,
        "finish": 1705764937.173995,
        "duration": 4.1753120422363281,
        "processing": 3.3076529502868652,
        "date_start": "2024-01-20T18:35:32+03:00",
        "date_finish": "2024-01-20T18:35:37+03:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
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

> 40x, 50x Error

```json
{
  "error": "",
  "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Описание** | **Значение** ||
|| `ID is not defined or invalid` | В параметр `id` либо не передано значение, либо оно является не целым числом больше нуля ||
|| `Access denied` | У пользователя нет прав на удаление лидов ||
|| `Not found` | Лид с переданным `id` не существует ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}
