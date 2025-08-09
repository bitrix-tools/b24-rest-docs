# Получить элемент справочника по идентификатору crm.status.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.status.get` возвращает параметры элемента справочника по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../data-types.md) | Идентификатор элемента справочника. Получить список элементов с идентификаторами можно методом [crm.status.list](./crm-status-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":123}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":123,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.status.get',
    		{
    			id: 123
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
                'crm.status.get',
                [
                    'id' => 123,
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
        echo 'Error getting CRM status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.get",
        {
            id: 123
        },
        function(result) {
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
        'crm.status.get',
        [
            'id' => 123
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
        "ID": "733",
        "ENTITY_ID": "DYNAMIC_1038_STAGE_37",
        "STATUS_ID": "DT1038_37:SUCCESS",
        "NAME": "Успех",
        "NAME_INIT": "Успех",
        "SORT": "40",
        "SYSTEM": "Y",
        "CATEGORY_ID": "37",
        "COLOR": "#00ff00",
        "SEMANTICS": "S"
    },
    "time": {
        "start": 1752133970.651926,
        "finish": 1752133970.690207,
        "duration": 0.03828096389770508,
        "processing": 0.0060749053955078125,
        "date_start": "2025-07-10T10:52:50+03:00",
        "date_finish": "2025-07-10T10:52:50+03:00",
        "operating_reset_at": 1752134570,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор элемента справочника ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта, к которому относится справочник ||
|| **STATUS_ID**
[`string`](../../data-types.md) | Код значения статуса ||
|| **NAME**
[`string`](../../data-types.md) | Название ||
|| **NAME_INIT**
[`string`](../../data-types.md) | Изначальное название ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **SYSTEM**
[`string`](../../data-types.md) | Признак системного значения ||
|| **CATEGORY_ID**
[`integer`](../../data-types.md) | Идентификатор воронки, к которой относится статус ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет статуса для канбана ||
|| **SEMANTICS**
[`string`](../../data-types.md) | Группа стадий ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Status is not found.",
    "error_description": "Элемент справочника не найден."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `Status is not found.` | Элемент справочника не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-update.md)
- [{#T}](./crm-status-delete.md) 