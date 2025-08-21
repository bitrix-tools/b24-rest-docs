# Получить информацию о текущем пользователе user.current

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.current` получает информации о [текущем](*ключ_текущем) пользователе.

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Подробности о доступе к данным пользователей можно узнать в [статье](index.md).

{% endnote %}

Метод параметров не имеет. Однако, сделав REST-запрос с использованием данных из `$_REQUEST` к домену `DOMAIN` и добавив `AUTH_ID` к запросу для доступа к Битрикс24, можно узнать какой пользователь открыл страницу в контексте Битрикс24.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.current
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/user.current
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"user.current",
    		{}
    	);
    	
    	const result = response.getData().result;
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
                'user.current',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Current user data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting current user data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.current",
        {},
        function(result)
        {
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
        'user.current',
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
        "result":{
            "ID":"3",
            "ACTIVE":true,
            "NAME":"Иван",
            "LAST_NAME":"Иванов",
            "EMAIL":"test@gmail.com",
            "LAST_LOGIN":"2024-07-23T08:07:26+00:00",
            "DATE_REGISTER":"2024-07-22T00:00:00+00:00",
            "IS_ONLINE":"Y",
            "LAST_ACTIVITY_DATE":"2024-07-23 08:08:50",
            "PERSONAL_GENDER":"",
            "PERSONAL_BIRTHDAY":"",
            "WORK_POSITION":"",
            "UF_EMPLOYMENT_DATE":"",
            "UF_DEPARTMENT":[1]
        },
        "time":{
            "start":1721722262.960948,
            "finish":1721722262.985244,
            "duration":0.024296045303344727,
            "processing":0.0012989044189453125,
            "date_start":"2024-07-23T08:11:02+00:00",
            "date_finish":"2024-07-23T08:11:02+00:00",
            "operating":0
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа, который содержит информацию о пользователе ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)

[*ключ_текущем]: Тот, чей токен вы использовали при вызове REST. Если вы используете сохраненный админский токен, то выведется администратор. Если используете токен, который приходит в POST-запросе во фрейм приложения, то будет пользователь, который зашел в приложение.