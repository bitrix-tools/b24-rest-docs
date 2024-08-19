# Получить список триггеров

> Название метода: **crm.automation.trigger.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор с доступом к CRM в контексте приложения 

Метод получает список приложений и триггеров.

Запускать метод можно только в контексте приложения.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automation.trigger.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.list
    ```

- JS

    ```js
    BX24.callMethod(
        'crm.automation.trigger.list',
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.automation.trigger.list',
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
            "NAME": "Trigger 1",
            "CODE": "trigger1"
        }
        {
            "NAME": "Trigger 2",
            "CODE": "trigger2"
        }
    ],
    "time":{
        "start":1718952595.479501,
        "finish":1718952595.594397,
        "duration":0.11489605903625488,
        "processing":0.007472038269042969,
        "date_start":"2024-06-21T06:49:55+00:00",
        "date_finish":"2024-06-21T06:49:55+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Возвращает массив добавленных приложением триггеров с полями `NAME` и `CODE` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Access denied! Admin permissions required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Access denied. | Пользователь не прошел предварительную проверку прав на доступ к CRM ||
|| ACCESS_DENIED | Access denied! Admin permissions required | Не пройдена проверка прав на администратора ||
|| ACCESS_DENIED | Access denied! Application context required | Метод вызван вне контекста приложения ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-automation-trigger-add.md)
- [{#T}](./crm-automation-trigger-execute.md)
- [{#T}](./crm-automation-trigger-delete.md)


