# Добавить бейдж crm.activity.badge.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу crm

Метод `crm.activity.badge.add` добавляет новый бейдж для конфигурируемого дела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **code***
[`string`](../../../../../data-types.md) | Код бейджа, например `missedCall` ||
|| **title***
[`string`\|`array`](../../../../../data-types.md) | Заголовок бейджа. Может быть строкой или массивом строк для разных языков ||
|| **value***
[`string`\|`array`](../../../../../data-types.md) | Заголовок бейджа. Может быть строкой или массивом строк для разных языков ||
|| **type***
[`string`](../../../../../data-types.md) | [Тип бейджа](./index.md#tip-bejdzha) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code":"missedCall","title":"Статус звонка","value":"Пропущен","type":"failure","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.badge.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.badge.add',
    		{
    			code: 'missedCall',
    			title: 'Статус звонка',
    			value: 'Пропущен',
    			type: 'failure'
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
                'crm.activity.badge.add',
                [
                    'code'  => 'missedCall',
                    'title' => 'Статус звонка',
                    'value' => 'Пропущен',
                    'type'  => 'failure'
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
        echo 'Error adding activity badge: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.badge.add",
        {
            code: 'missedCall',
            title: 'Статус звонка',
            value: 'Пропущен',
            type: 'failure'
        }, result => {
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
        'crm.activity.badge.add',
        [
            'code' => 'missedCall',
            'title' => 'Статус звонка',
            'value' => 'Пропущен',
            'type' => 'failure'
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
        bitrix_response = client.crm.activity.badge.add(
            code="CUSTOM_STATUS",
            title="Status",
            value="Pending",
            type="failure",
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
        "badge": {
            "code": "missedCall",
            "title": "Статус звонка",
             "value": "Пропущен",
             "type": "failure"
        }
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
[`object`](../../../../data-types.md) | Корневой элемент ответа, содержащий информацию о добавленном бейдже в случае успеха. В случае неудачи вернет `null` ||
|| **time**
[`time`](../../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `REQUIRED_ARG_MISSING` | Не заполнены обязательные поля ||
|#

{% include [системные ошибки](../../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-badge-get.md)
- [{#T}](./crm-activity-badge-list.md)
- [{#T}](./crm-activity-badge-delete.md)
