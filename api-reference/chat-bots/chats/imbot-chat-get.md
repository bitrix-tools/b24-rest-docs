# Получить идентификатор чата imbot.chat.get

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к чату

Метод `imbot.chat.get` возвращает идентификатор чата.

{% note info "" %}

Чтобы получить подробную информацию о чате, используйте метод [imbot.dialog.get](./imbot-dialog-get.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE***
[`string`](../../data-types.md) | Тип внешнего объекта.

Используется вместе с `ENTITY_ID`, который был передан при создании чата методом [imbot.chat.add](./imbot-chat-add.md) ||
|| **ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор внешнего объекта.

Используется вместе с `ENTITY_TYPE`, который был передан при создании чата методом [imbot.chat.add](./imbot-chat-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY_TYPE":"CHAT","ENTITY_ID":"13"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY_TYPE":"CHAT","ENTITY_ID":"13","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.chat.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imbot.chat.get',
            {
                ENTITY_TYPE: 'CHAT',
                ENTITY_ID: '13'
            }
        );
        
        const result = response.getData().result;
        console.log('Retrieved chat data:', result);
        processResult(result);
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
                'imbot.chat.get',
                [
                    'ENTITY_TYPE' => 'CHAT',
                    'ENTITY_ID' => '13'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.chat.get',
        {
            ENTITY_TYPE: 'CHAT',
            ENTITY_ID: '13'
        },
        function (result)
        {
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
        'imbot.chat.get',
        [
            'ENTITY_TYPE' => 'CHAT',
            'ENTITY_ID' => '13'
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
  "result": {
      "ID": 2725
  },
  "time": {
      "start": 1771929873,
      "finish": 1771929873.459722,
      "duration": 0.45972204208374023,
      "processing": 0,
      "date_start": "2026-02-24T13:44:33+03:00",
      "date_finish": "2026-02-24T13:44:33+03:00",
      "operating_reset_at": 1771930473,
      "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Идентификатор чата.

Возвращает `null`, если хотя бы один из параметров `ENTITY_TYPE` или `ENTITY_ID` не передан ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to this chat"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `AUTHORIZE_ERROR` | Method not available for guest session. | Метод недоступен в гостевой сессии ||
|| `ACCESS_ERROR` | You don't have access to this chat | Нет доступа к указанному чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-chat-add.md)
- [{#T}](./imbot-chat-user-add.md)
- [{#T}](./imbot-chat-update-title.md)
- [{#T}](./imbot-chat-update-avatar.md)
- [{#T}](./imbot-chat-update-color.md)
- [{#T}](./imbot-dialog-get.md)
- [{#T}](./imbot-chat-user-list.md)
- [{#T}](./imbot-chat-user-delete.md)
- [{#T}](./imbot-chat-leave.md)
