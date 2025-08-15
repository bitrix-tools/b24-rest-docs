# Получить элементы перечисления «Направление активности» crm.enum.activitydirection

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.enum.activitydirection` продолжает работать, но он относится к устаревшим методам [crm.activity.*](../../../timeline/activities/index.md). Более актуальный аналог методов [crm.activity.todo.*](../../../timeline/activities/todo/index.md). 

{% endnote %}

Метод `crm.enum.activitydirection` возвращает направления активности для поля `DIRECTION` [дел писем и звонков](../../../timeline/activities/index.md). 

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.activitydirection
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.activitydirection
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.enum.activitydirection",
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.enum.activitydirection',
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
        echo 'Error calling crm.enum.activitydirection: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.enum.activitydirection",
        {},
        function(result) {
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
        'crm.enum.activitydirection',
        []
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
"result": [
    {
     "ID": 0,
     "NAME": "",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 1,
     "NAME": "Входящее",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 2,
     "NAME": "Исходящее",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    }
],
"time": {
    "start": 1750149628.891727,
    "finish": 1750149628.919669,
    "duration": 0.02794194221496582,
    "processing": 0.00030112266540527344,
    "date_start": "2025-06-17T11:40:28+03:00",
    "date_finish": "2025-06-17T11:40:28+03:00",
    "operating_reset_at": 1750150228,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Массив с направлениями активности [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор направления активности ||
|| **NAME**
[`string`](../../../../data-types.md) | Название направления активности ||
|| **SYMBOL_CODE**
[`string`](../../../../data-types.md) | Символьный код ||
|| **SYMBOL_CODE_SHORT**
[`string`](../../../../data-types.md) | Краткий символьный код ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./../index.md)