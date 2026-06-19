# Отправить сообщение в открытую линию imopenlines.crm.message.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

Список чат-ботов можно получить с помощью метода [imbot.bot.list](../../../chat-bots/outdated/bots/imbot-bot-list.md) ||
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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'imopenlines.crm.message.add',
        params: {
          CRM_ENTITY_TYPE: 'lead',
          CRM_ENTITY: 1195,
          USER_ID: 27,
          CHAT_ID: 1341,
          MESSAGE: 'Message text',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created message ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function sendCrmMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.crm.message.add',
            params: {
              CRM_ENTITY_TYPE: 'lead',
              CRM_ENTITY: 1195,
              USER_ID: 27,
              CHAT_ID: 1341,
              MESSAGE: 'Message text',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created message ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendCrmMessage)
    </script>
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

