# Изменить подразделение department.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Метод `department.update` изменяет данные подразделения в структуре компании. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`int`](../data-types.md) | Иидентификатор подразделения ||
|| **NAME**
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`int`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT**
[`int`](../data-types.md) | Идентификатор родительского подразделения ||
|| **UF_HEAD**
[`int`](../data-types.md) | Идентификатор пользователя, который будет руководителем подразделения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 18,
        "NAME": "Отдел тайн",
        "SORT": 500,
        "UF_HEAD": 1,
        "PARENT": 1
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.update
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 18,
        "NAME": "Отдел тайн",
        "SORT": 500,
        "UF_HEAD": 1,
        "PARENT": 1,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'department.update',
    		{
    			"ID": 18,
    			"NAME": "Отдел тайн",
    			"SORT": 500,
    			"UF_HEAD": 1,
    			"PARENT": 1
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.update',
                [
                    'ID'     => 18,
                    'NAME'   => 'Отдел тайн',
                    'SORT'   => 500,
                    'UF_HEAD' => 1,
                    'PARENT' => 1
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating department: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'department.update',
        {
            "ID": 18,
            "NAME": "Отдел тайн",
            "SORT": 500,
            "UF_HEAD": 1,
            "PARENT": 1
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'department.update',
        [
            'ID' => '18',
            'NAME' => 'Отдел тайн',
            'SORT' => 500,
            'UF_HEAD' => 1,
            'PARENT' => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.department.update(
            bitrix_id=42,
            name="Regional Sales Department",
            sort=600,
            parent=1,
            uf_head=1,
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
    "result": true,
    "time": {
        "start": 1736929002.119324,
        "finish": 1736929002.469626,
        "duration": 0.35030198097229004,
        "processing": 0.13488411903381348,
        "date_start": "2025-01-15T08:16:42+00:00",
        "date_finish": "2025-01-15T08:16:42+00:00",
        "operating": 0.13484978675842285
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат изменения отдела в структуре компании ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Department not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_CORE` | Department not found | Обновляемый отдел не найден ||
|| `ERROR_CORE` | Access denied | Недостаточно прав для измения отдела ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./department-add.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)