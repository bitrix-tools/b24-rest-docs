# Обновить крайний срок универсального дела crm.activity.todo.updateDeadline

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого обновляется дело

Метод `crm.activity.todo.updateDeadline` меняет дедлайн универсального дела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор обновляемого дела, например  `999` ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому привязано дело, например, `1` ||
|| **value***
[`datetime`](../../../../data-types.md) | Новый крайний срок дела ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"value":"'"$(date -Iseconds)"'"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.todo.updateDeadline
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"value":"**put_current_date_here**","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.todo.updateDeadline
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.todo.updateDeadline',
    		{
    			id: 999,
    			ownerTypeId: 2,
    			ownerId: 1,
    			value: new Date()
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'crm.activity.todo.updateDeadline',
                [
                    'id'          => 999,
                    'ownerTypeId' => 2,
                    'ownerId'     => 1,
                    'value'       => date('Y-m-d H:i:s'),
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
        echo 'Error updating todo deadline: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.todo.updateDeadline",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 1,
            value: nnew Date()
        }, 
        result => {
            if (result.error())
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
        'crm.activity.todo.updateDeadline',
        [
            'id' => 999,
            'ownerTypeId' => 2,
            'ownerId' => 1,
            'value' => date('c') // Текущие дата и время в формате ISO 8601
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from datetime import datetime, timedelta

    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.activity.todo.update_deadline(
            bitrix_id=999,
            owner_type_id=2,
            owner_id=101,
            value=datetime.now() + timedelta(days=3),
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 999
    },
    "time": {
       "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | В случае успеха возвращает объект, содержащий идентификатор обновлённого дела `id`, в случае ошибки = `null` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент CRM не найден ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `WRONG_DATETIME_FORMAT` | Некорректный формат даты || 
|| `CAN_NOT_UPDATE_COMPLETED_TODO` | Закрытое дело нельзя изменять ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-todo-add.md)
- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-color.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
