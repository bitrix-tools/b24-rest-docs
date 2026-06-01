# Получить привязанные к приложению данные app.option.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `app.option.get` получает данные, привязанные к приложению. Если ничего не подать на вход, вернет все записанные через [app.option.set](./app-option-set.md) свойства.

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **option**
[`string`](../../data-types.md) | Строка, один из ключей из свойства [app.option.set](./app-option-set.md). ||
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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.option.get
    ```

    Пример №2

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.option.get
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
    https://**put_your_bitrix24_address**/rest/app.option.get
    ```
    
    Пример №2
    
    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/app.option.get
    ```

- JS

    Пример №1

    ```js
    BX24.callMethod(
        'app.option.get',
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
        'app.option.get', {},
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
        'app.option.get',
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
        'app.option.get',
        []
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
        bitrix_response = client.app.option.get(
            option="default_language",
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
    "data": "value",
    "data2": "value2"
}
```

Метод возвращает данные, привязанные к приложению.

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
- [{#T}](./user-option-set.md)
- [{#T}](./user-option-get.md)