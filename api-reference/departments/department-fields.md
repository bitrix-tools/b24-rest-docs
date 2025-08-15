# Получить список названий полей подразделения department.fields

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `department.fields` возвращает список и описание доступных полей подразделений. 

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/department.fields
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/department.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"department.fields", {}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching department fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "department.fields", {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('department.fields');

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
        "ID": "ID",
        "NAME": "Название подразделения",
        "SORT": "Порядок сортировки",
        "PARENT": "Вышестоящее подразделение",
        "UF_HEAD": "Руководитель"
    },
    "time": {
        "start": 1736926600.426408,
        "finish": 1736926600.667272,
        "duration": 0.24086403846740723,
        "processing": 0.0050868988037109375,
        "date_start": "2025-01-15T07:36:40+00:00",
        "date_finish": "2025-01-15T07:36:40+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит список и описание полей ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./department-add.md)
- [{#T}](./department-update.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
