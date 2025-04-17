# Привязать данные к приложению app.option.set

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `app.option.set` привязывает данные к приложению.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **options***
[`array`](../../data-types.md) | Массив, где ключ — название сохраняемого свойства, а значение — значение свойства.
Если передать значение с новым ключом, то метод его запишет, а если существующее — обновит ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "options": {
            "data": "value",
            "data2": "value2"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/app.option.set
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "options": {
            "data": "value",
            "data2": "value2"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/app.option.set
    ```

- JS

    ```js
    BX24.callMethod(
        'app.option.set',
        {
            "options": {
                "data": "value",
                "data2": "value2",
            }
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'app.option.set',
        [
            'options' => [
                'data' => 'value',
                'data2' => 'value2'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ArgumentNullException",
    "error_description":"options is empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ArgumentNullException` | options is empty | Пустой массив `options`  ||
|| `AccessException` | Application context required / Administrator authorization required | Доступ запрещен ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./app-option-get.md)
- [{#T}](./user-option-set.md)
- [{#T}](./user-option-get.md)