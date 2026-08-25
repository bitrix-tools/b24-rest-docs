# Создать подразделение department.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Метод `department.add` добавляет новый отдел в структуру компании. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`integer`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT***
[`integer`](../data-types.md) | Идентификатор родительского подразделения ||
|| **UF_HEAD**
[`integer`](../data-types.md) | Идентификатор пользователя, который станет руководителем подразделения ||
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
        "NAME": "Отдел изучения маглов",
        "SORT": 450,
        "UF_HEAD": 1,
        "PARENT": 15
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "NAME": "Отдел изучения маглов",
        "SORT": 450,
        "UF_HEAD": 1,
        "PARENT": 15,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'department.add',
    		{
    			"NAME": "Отдел изучения маглов",
    			"SORT": 450,
    			"UF_HEAD": 1,
    			"PARENT": 15
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.department.add(
            name="Regional Sales Department",
            parent=1,
            sort=500,
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.add',
                [
                    'NAME'   => 'Отдел изучения маглов',
                    'SORT'   => 450,
                    'UF_HEAD' => 1,
                    'PARENT' => 15,
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
        echo 'Error adding department: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'department.add',
        {
            "NAME": "Отдел изучения маглов",
            "SORT": 450,
            "UF_HEAD": 1,
            "PARENT": 15
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
        'department.add',
        [
            'NAME' => 'Отдел изучения маглов',
            'SORT' => 450,
            'UF_HEAD' => 1,
            'PARENT' => 15,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "department.add", b24.Params{
    	"NAME":    "Отдел изучения маглов",
    	"SORT":    450,
    	"UF_HEAD": 1,
    	"PARENT":  15,
    })
    if err != nil {
    	return fmt.Errorf("department.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 18,
    "time": {
        "start": 1736927311.779587,
        "finish": 1736927312.132503,
        "duration": 0.35291600227355957,
        "processing": 0.17050600051879883,
        "date_start": "2025-01-15T07:48:31+00:00",
        "date_finish": "2025-01-15T07:48:32+00:00",
        "operating": 0.1704881191253662
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного отдела ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Не введено название раздела.\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_CORE` | Не введено название раздела.\u003Cbr\u003E | Не заполнен обязательный параметр `NAME` ||
|| `ERROR_CORE` | В структуре компании должен быть только один раздел верхнего уровня | Неверно указан параметр `PARENT` ||
|| `ERROR_CORE` | Access denied | Недостаточно прав для добавления отдела ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./department-update.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)