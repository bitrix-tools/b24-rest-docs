# Обновить провайдер сообщений messageservice.sender.update

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет провайдер сообщений.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Внутренний идентификатор провайдера ||
|| **HANDLER**
[`string`](../data-types.md) | URL приложения, на который будут отправлены данные ||
|| **NAME**
[`string / array`](../data-types.md) | Название провайдера. Может быть строкой или ассоциативным массивом локализированных строк. 

Параметр обязательный, если фраза на новом языке ||
|| **DESCRIPTION**
[`string / array`](../data-types.md) | Описание провайдера. Может быть строкой или ассоциативным массивом локализированных строк. 

Используется только с параметром `NAME`, если язык новый ||
|#

В запросе должен быть хотя бы один необзязательный параметр.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider","HANDLER":"https://newhandler.com/","NAME":"Новое имя провайдера","DESCRIPTION":"Новое описание провайдера"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/messageservice.sender.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider","HANDLER":"https://newhandler.com/","NAME":"Новое имя провайдера","DESCRIPTION":"Новое описание провайдера","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.sender.update
    ```

- JS

    ```js
    var params = {
        CODE: 'provider',
        HANDLER: 'https://newhandler.com/',
        NAME: 'Новое имя провайдера',
        DESCRIPTION: 'Новое описание провайдера'
    };
    BX24.callMethod(
        'messageservice.sender.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $params = [
        'CODE' => 'provider',
        'HANDLER' => 'https://newhandler.com/',
        'NAME' => 'Новое имя провайдера',
        'DESCRIPTION' => 'Новое описание провайдера'
    ];

    $result = CRest::call(
        'messageservice.sender.update',
        $params
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider","NAME":{"en":"New Name","de":"Neuer Name"},"DESCRIPTION":{"en":"New Description"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/messageservice.sender.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider","NAME":{"en":"New Name","de":"Neuer Name"},"DESCRIPTION":{"en":"New Description"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.sender.update
    ```

- JS

    ```js
    var params = {
        CODE: 'provider',
        NAME: {"en":"New Name","de":"Neuer Name"},
        DESCRIPTION: {"en":"New Description"}
    };
    BX24.callMethod(
        'messageservice.sender.update',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $params = [
        'CODE' => 'provider',
        'NAME' => [
            'en' => 'New Name',
            'de' => 'Neuer Name'
        ],
        'DESCRIPTION' => [
            'en' => 'New Description'
        ]
    ];

    $result = CRest::call(
        'messageservice.sender.update',
        $params
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
    "result": true,
    "time": {
        "start": 1732110540.526103,
        "finish": 1732110540.797043,
        "duration": 0.27094006538391113,
        "processing": 0.007060050964355469,
        "date_start": "2024-11-20T15:49:00+02:00",
        "date_finish": "2024-11-20T15:49:00+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат обновления провайдера сообщений ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_SENDER_NOT_FOUND",
    "error_description": "Sender not found!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ERROR_SENDER_NOT_FOUND` | Провайдер не найден ||
|| `ERROR_SENDER_CODE_REQUIRED` | Не указан параметр `CODE` ||
|| `ERROR_SENDER_OTHER_PARAMS_REQUIRED` | Не указан хотя бы один из необязательных параметров ||
|| `ACCESS_DENIED` | Недостаточно прав для обновления провайдера ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./messageservice-sender-add.md)
- [{#T}](./messageservice-sender-list.md)
- [{#T}](./messageservice-sender-delete.md)
- [{#T}](./messageservice-message-status-update.md)
