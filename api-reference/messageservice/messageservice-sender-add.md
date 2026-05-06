# Зарегистрировать СМС-провайдер или провайдер сообщений messageservice.sender.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `messageservice.sender.add` регистрирует нового провайдера сообщений.

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Код провайдера.

Допустимые символы: `a-z`, `A-Z`, `0-9`, `.`, `-`, `_` ||
|| **TYPE***
[`string`](../data-types.md) | Тип провайдера.

Поддерживаемое значение: `SMS` ||
|| **HANDLER***
[`string`](../data-types.md) | URL обработчика приложения, который вызывается при отправке сообщения ||
|| **NAME***
[`string` \| `object`](../data-types.md) | Название провайдера.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'NAME': {
    'ru': 'название провайдера',
    'en': 'provider name',
    ...
},
```
 ||
|| **DESCRIPTION**
[`string` \| `object`](../data-types.md) | Описание провайдера.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'DESCRIPTION': {
    'ru': 'описание провайдера',
    'en': 'provider description',
    ...
},
```
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider1","TYPE":"SMS","HANDLER":"https://provider.example/api/handler","NAME":"Provider 1","DESCRIPTION":"Основной SMS-провайдер","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.sender.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'messageservice.sender.add',
            {
                CODE: 'provider1',
                TYPE: 'SMS',
                HANDLER: 'https://provider.example/api/handler',
                NAME: 'Provider 1',
                DESCRIPTION: 'Основной SMS-провайдер'
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
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
                'messageservice.sender.add',
                [
                    'CODE' => 'provider1',
                    'TYPE' => 'SMS',
                    'HANDLER' => 'https://provider.example/api/handler',
                    'NAME' => 'Provider 1',
                    'DESCRIPTION' => 'Основной SMS-провайдер',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding sender: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'messageservice.sender.add',
        {
            CODE: 'provider1',
            TYPE: 'SMS',
            HANDLER: 'https://provider.example/api/handler',
            NAME: 'Provider 1',
            DESCRIPTION: 'Основной SMS-провайдер'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'messageservice.sender.add',
        [
            'CODE' => 'provider1',
            'TYPE' => 'SMS',
            'HANDLER' => 'https://provider.example/api/handler',
            'NAME' => 'Provider 1',
            'DESCRIPTION' => 'Основной SMS-провайдер',
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
    "result": true,
    "time": {
        "start": 1742895600,
        "finish": 1742895600.845505,
        "duration": 0.845505952835083,
        "processing": 0,
        "date_start": "2025-03-25T10:00:00+03:00",
        "date_finish": "2025-03-25T10:00:00+03:00",
        "operating_reset_at": 1742896200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если провайдер успешно зарегистрирован ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_SENDER_VALIDATION_FAILURE",
    "error_description": "Empty sender code!"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty data!` | Пустой набор параметров ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender code!` | Не передан обязательный параметр `CODE` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Wrong sender code!` | `CODE` содержит недопустимые символы ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender NAME!` | Не передан обязательный параметр `NAME` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender message TYPE!` | Не передан обязательный параметр `TYPE` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Unknown sender message TYPE!` | Передан неподдерживаемый `TYPE` (допустимо только `SMS`) ||
|| `ERROR_SENDER_ALREADY_INSTALLED` | `Sender already installed!` | Провайдер с таким `CODE` уже зарегистрирован для текущего приложения ||
|| `ERROR_SENDER_ADD_FAILURE` | `Sender save error!` | Ошибка сохранения провайдера ||
|| `ACCESS_DENIED` | `Access denied!` | Метод запустил не администратор ||
|| `ACCESS_DENIED` | `Application context required` | Метод вызван вне контекста приложения ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./messageservice-sender-add.md)
- [{#T}](./messageservice-sender-update.md)
- [{#T}](./messageservice-sender-list.md)
- [{#T}](./messageservice-sender-delete.md)
- [{#T}](./messageservice-message-status-update.md)
