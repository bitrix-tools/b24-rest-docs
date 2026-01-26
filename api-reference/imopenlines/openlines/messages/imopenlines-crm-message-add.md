# Отправить сообщение в открытую линию imopenlines.crm.message.add

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.crm.message.add` отправляет сообщение от имени сотрудника или бота в чат, который привязан к элементу CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип объекта CRM:
- lead — лид
- deal — сделка
- company — компания
- contact — контакт
 ||
|| **CRM_ENTITY***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, к которому привязан чат.

Список элементов определенного типа объекта CRM можно получить с помощью метода [crm.item.list](../../../crm/universal/crm-item-list.md) ||
|| **USER_ID***
[`integer`](../../../data-types.md) | Идентификатор отправителя сообщения — пользователя или бота, который должен быть участником чата.

Идентификатор пользователя можно получить с помощью метода [user.get](../../../user/user-get.md) или [user.search](../../../user/user-search.md).

Список чат-ботов можно получить с помощью метода [imbot.bot.list](../../../chat-bots/imbot-bot-list.md) ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии, который связан с элементом CRM. 

Идентификатор чата можно получить с помощью метода [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) или [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) ||
|| **MESSAGE***
[`string`](../../../data-types.md) | Текст сообщения, который будет отображен в чате ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1195,"USER_ID":27,"CHAT_ID":1341,"MESSAGE":"Текст сообщения"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1195,"USER_ID":27,"CHAT_ID":1341,"MESSAGE":"Текст сообщения","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.crm.message.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod(
        'imopenlines.crm.message.add',
        {
          CRM_ENTITY_TYPE: 'lead',
          CRM_ENTITY: 1195,
          USER_ID: 27,
          CHAT_ID: 1341,
          MESSAGE: 'Текст сообщения',
        }
      );

      const { result } = response.getData();
      console.log('Created message:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.message.add',
                [
                    'CRM_ENTITY_TYPE' => 'lead',
                    'CRM_ENTITY' => 1195,
                    'USER_ID' => 27,
                    'CHAT_ID' => 1341,
                    'MESSAGE' => 'Текст сообщения',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Created message ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error sending message: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.crm.message.add',
        {
            CRM_ENTITY_TYPE: 'lead',
            CRM_ENTITY: 1195,
            USER_ID: 27,
            CHAT_ID: 1341,
            MESSAGE: 'Текст сообщения',
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.crm.message.add',
        [
            'CRM_ENTITY_TYPE' => 'lead',
            'CRM_ENTITY' => 1195,
            'USER_ID' => 27,
            'CHAT_ID' => 1341,
            'MESSAGE' => 'Текст сообщения',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Created message ID: ' . $result['result'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": 19880117,
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating_reset_at":1762349466,
        "operating": 0
    }
}
```

## Возвращаемый результат

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного сообщения в чате ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса  ||
|#

## Обработка ошибок

HTTP-код: **400**

```json
{
    "error": "CHAT_NOT_IN_CRM",
    "error_description": "Chat does not belong to the CRM entity being checked"
}
```

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_NOT_IN_CRM`| Chat does not belong to the CRM entity being checked | Чат не связан с CRM ||
|| `CANCELED`| Вы не можете отправлять сообщения в указанный чат | У пользователя нет доступа к чату ||
|| `ACCESS_DENIED`| Access denied! User dont have access to this entity | У пользователя нет доступа к объекту CRM ||
|| `ERROR_ARGUMENT` | Argument `CRM_ENTITY_TYPE` is null or empty | Неверно указан обязательный параметр `CRM_ENTITY_TYPE` ||
|| `ERROR_ARGUMENT` | Argument `CRM_ENTITY` is null or empty | Неверно указан обязательный параметр `CRM_ENTITY` ||
|| `ERROR_ARGUMENT` | Argument `USER_ID` is null or empty | Неверно указан обязательный параметр `USER_ID` ||
|| `ERROR_ARGUMENT` | Argument `MESSAGE` is null or empty | Неверно указан обязательный параметр `MESSAGE` ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-message-quick-save.md)
