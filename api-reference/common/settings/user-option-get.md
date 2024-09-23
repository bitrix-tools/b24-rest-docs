# Получить пользовательские данные, привязанные к приложению user.option.get

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.option.get` получает пользовательские данные, привязанные к приложению. Если ничего не подать на вход, то вернет все записанные через [user.option.set](./user-option-set.md) свойства.

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **option**
[`string`](../../data-types.md) | Строка, один из ключей из свойства [user.option.set](./user-option-set.md). ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}


{% list tabs %}

- cURL (Webhook)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "option": "data"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.option.get
    ```

    Пример №2

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.option.get
    ```

- cURL (OAuth)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "option": "data",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.option.get
    ```
    
    Пример №2
    
    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/user.option.get
    ```

- JS

    Пример №1

    ```js
    BX24.callMethod(
        'user.option.get',
        {
            "option":"data"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```
    
    Пример №2
    
    ```js
    BX24.callMethod(
        'user.option.get', {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    Пример №1
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.option.get',
        [
            'option' => 'data'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

    Пример №2
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.option.get',
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
    "data": "value",
    "data2": "value2"
}
```

Метод возвращает пользовательские данные, привязанные к приложению.


## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"AccessException",
    "error_description":"Application context required / User authorization required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `AccessException` | Application context required / Administrator authorization required | Доступ запрещен ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./app-option-set.md)
- [{#T}](./app-option-get.md)
- [{#T}](./user-option-set.md)