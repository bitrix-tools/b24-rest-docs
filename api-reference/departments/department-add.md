# Создать подразделение department.add

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
[`int`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT***
[`int`](../data-types.md) | Идентификатор родительского подразделения ||
|| **UF_HEAD**
[`int`](../data-types.md) | Идентификатор пользователя, который станет руководителем подразделения ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/department.add
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
[`int`](../data-types.md) | Идентификатор созданного отдела ||
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