# Обновить статус доставки сообщения messageservice.message.status.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: отправитель сообщения или администратор

Метод `messageservice.message.status.update` обновляет статус доставки сообщения, отправленного через провайдер сообщений.

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Код провайдера.

Код провайдера можно получить методом [messageservice.sender.list](./messageservice-sender-list.md) ||
|| **MESSAGE_ID***
[`string`](../data-types.md) | Внешний идентификатор сообщения, полученный обработчиком приложения при отправке сообщения ||
|| **STATUS***
[`string`](../data-types.md) | Новый статус сообщения.

Поддерживаемые значения:
- `queued` — сообщение поставлено в очередь на отправку
- `sent` — сообщение отправлено провайдером
- `delivered` — сообщение успешно доставлено получателю
- `undelivered` — сообщение не доставлено получателю
- `failed` — ошибка отправки или обработки сообщения у провайдера ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider1","MESSAGE_ID":"65575980fa531ac284c2ee68f81ebebd","STATUS":"delivered","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.message.status.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'messageservice.message.status.update',
            {
                CODE: 'provider1',
                MESSAGE_ID: '65575980fa531ac284c2ee68f81ebebd',
                STATUS: 'delivered'
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
                'messageservice.message.status.update',
                [
                    'CODE' => 'provider1',
                    'MESSAGE_ID' => '65575980fa531ac284c2ee68f81ebebd',
                    'STATUS' => 'delivered',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating message status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'messageservice.message.status.update',
        {
            CODE: 'provider1',
            MESSAGE_ID: '65575980fa531ac284c2ee68f81ebebd',
            STATUS: 'delivered'
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
        'messageservice.message.status.update',
        [
            'CODE' => 'provider1',
            'MESSAGE_ID' => '65575980fa531ac284c2ee68f81ebebd',
            'STATUS' => 'delivered',
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
[`boolean`](../data-types.md) | `true`, если статус сообщения успешно обновлен ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_MESSAGE_STATUS_INCORRECT",
    "error_description": "Message status incorrect!"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender code!` | Не передан обязательный параметр `CODE` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Wrong sender code!` | `CODE` содержит недопустимые символы ||
|| `ERROR_MESSAGE_NOT_FOUND` | `Message not found!` | Сообщение с указанным `MESSAGE_ID` не найдено ||
|| `ERROR_MESSAGE_STATUS_INCORRECT` | `Message status incorrect!` | Передан неподдерживаемый `STATUS` ||
|| `ACCESS_DENIED` | `Application context required` | Метод вызван вне контекста приложения ||
|| `ACCESS_DENIED` | `Access denied!` | Метод запустил не администратор ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./messageservice-sender-add.md)
- [{#T}](./messageservice-sender-update.md)
- [{#T}](./messageservice-sender-list.md)
- [{#T}](./messageservice-sender-delete.md)
- [{#T}](./messageservice-message-status-update.md)
