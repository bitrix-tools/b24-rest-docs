# Получить информацию о деле по идентификатору crm.activity.get

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.get` возвращает информацию о деле по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор дела в таймлайне, например `999` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
     curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "id":999 }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.get',
    		{
    			id: 999,
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'crm.activity.get',
                [
                    'id' => 999,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.get',
        {
            id: 999,
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
        'crm.activity.get',
        [
            'id' => 999
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
        "ID": "999",
        "OWNER_ID": "15",
        "OWNER_TYPE_ID": "3",
        "TYPE_ID": "2",
        "PROVIDER_ID": "VOXIMPLANT_CALL",
        "PROVIDER_TYPE_ID": "CALL",
        "PROVIDER_GROUP_ID": null,
        "ASSOCIATED_ENTITY_ID": "0",
        "SUBJECT": "Исходящий звонок Андрей Николаев",
        "CREATED": "2020-09-27T13:26:55+03:00",
        "LAST_UPDATED": "2021-03-21T20:28:24+03:00",
        "START_TIME": "2020-09-27T13:25:00+03:00",
        "END_TIME": "2020-09-27T19:25:00+03:00",
        "DEADLINE": "2020-09-27T13:25:00+03:00",
        "COMPLETED": "Y",
        "STATUS": "2",
        "RESPONSIBLE_ID": "505",
        "PRIORITY": "2",
        "NOTIFY_TYPE": "1",
        "NOTIFY_VALUE": "15",
        "DESCRIPTION": "",
        "DESCRIPTION_TYPE": "1",
        "DIRECTION": "2",
        "LOCATION": "",
        "SETTINGS": [],
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "AUTHOR_ID": "505",
        "EDITOR_ID": "505",
        "PROVIDER_PARAMS": [],
        "PROVIDER_DATA": null,
        "RESULT_MARK": "0",
        "RESULT_VALUE": null,
        "RESULT_SUM": null,
        "RESULT_CURRENCY_ID": null,
        "RESULT_STATUS": "0",
        "RESULT_STREAM": "0",
        "RESULT_SOURCE_ID": null,
        "AUTOCOMPLETE_RULE": "0"
    },
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
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
[`object`](../../../../data-types.md) | Корневой элемент ответа. Значения для поля `result` соответствуют [полям объекта](./crm-activity-fields.md#all-fields) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `Activity is not found` | Дело с указанным идентификатором не найдено для сущности в CRM ||
|| `Access denied` | Отсутствуют права на редактирование сущности в CRM ||
|| `Application context required` | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-update.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)