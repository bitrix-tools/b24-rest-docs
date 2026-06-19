# Отправить сообщение im.message.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом отправлять сообщения в чат


Метод `im.message.add` отправляет сообщение в чат.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата 
  
Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст сообщения. Обязателен, если не передан `ATTACH`.

Поддерживается [форматирование](./formatting.md) ||
|| **ATTACH**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Вложение с блоками контента: изображения, ссылки, файлы. Обязателен, если не передан `MESSAGE`.

Подробнее читайте в разделе [Вложения](./attachments.md) ||
|| **KEYBOARD**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Кнопки под сообщением, с которыми может взаимодействовать пользователь.

Подробнее читайте в статье [Работа с клавиатурами](./keyboards.md) ||
|| **MENU**
[`object`](../../data-types.md) 
[`string`](../../data-types.md) | Дополнительные пункты в контекстном меню чата.

Подробнее читайте в статье [Контекстное меню](./menu.md) ||
|| **SYSTEM**
[`string`](../../data-types.md) | Признак системного сообщения.

Допустимые значения:
- `Y` — системное сообщение
- `N` — обычное сообщение
  
По умолчанию — `N` ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Преобразование ссылок в rich-ссылки.

Допустимые значения:
- `Y` — включено
- `N` — выключено

По умолчанию — `Y` ||
|| **REPLY_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения, на которое отправляется ответ. Сообщение для ответа должно быть в том же чате.

Идентификатор можно получить с помощью метода [im.dialog.messages.get](./im-dialog-messages-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2941","MESSAGE":"Текст сообщения","SYSTEM":"N","URL_PREVIEW":"Y","REPLY_ID":34237}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2941","MESSAGE":"Текст сообщения","SYSTEM":"N","URL_PREVIEW":"Y","REPLY_ID":34237,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
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
        method: 'im.message.add',
        params: {
          DIALOG_ID: 'chat2941',
          MESSAGE: 'Message text',
          SYSTEM: 'N',
          URL_PREVIEW: 'Y',
          REPLY_ID: 34237,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created message with ID:', result)
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
      async function sendMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2941',
              MESSAGE: 'Message text',
              SYSTEM: 'N',
              URL_PREVIEW: 'Y',
              REPLY_ID: 34237,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created message with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendMessage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.message.add',
                [
                    'DIALOG_ID' => 'chat2941',
                    'MESSAGE' => 'Текст сообщения',
                    'SYSTEM' => 'N',
                    'URL_PREVIEW' => 'Y',
                    'REPLY_ID' => 34237
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.add',
        {
            DIALOG_ID: 'chat2941',
            MESSAGE: 'Текст сообщения',
            SYSTEM: 'N',
            URL_PREVIEW: 'Y',
            REPLY_ID: 34237
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.message.add',
        [
            'DIALOG_ID' => 'chat2941',
            'MESSAGE' => 'Текст сообщения',
            'SYSTEM' => 'N',
            'URL_PREVIEW' => 'Y',
            'REPLY_ID' => 34237
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
    "result": 34239,
    "time": {
        "start": 1772552939,
        "finish": 1772552939.091396,
        "duration": 0.09139609336853027,
        "processing": 0,
        "date_start": "2026-03-03T17:48:59+03:00",
        "date_finish": "2026-03-03T17:48:59+03:00",
        "operating_reset_at": 1772553539,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор отправленного сообщения ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MESSAGE_EMPTY",
    "error_description": "Message can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MESSAGE_EMPTY` | Message can't be empty | Пустой `MESSAGE` и отсутствует `ATTACH` ||
|| `USER_ID_EMPTY` | User ID can't be empty | Не передан или некорректен идентификатор пользователя в `DIALOG_ID` ||
|| `USER_NOT_FOUND` | User not found | Пользователь не найден ||
|| `CHAT_ID` | Ошибка при создании сообщения | Не удалось создать сообщение. Убедитесь, что чат с таким `ID` существует ||
|| `ACCESS_ERROR` | Action unavailable | Недостаточно прав для отправки сообщения ||
|| `PARAMS_ERROR` | Incorrect params | Некорректный набор параметров запроса ||
|| `ATTACH_ERROR` | Incorrect attach params | Невалидный объект `ATTACH` ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Размер `ATTACH` превышает допустимый ||
|| `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидный объект `KEYBOARD` ||
|| `MENU_ERROR` | Incorrect menu params | Невалидный объект `MENU` ||
|| `REPLY_ACCESS_ERROR` | Action unavailable | Нет доступа к сообщению в `REPLY_ID` ||
|| `REPLY_FROM_OTHER_CHAT_ERROR` | You can only reply to a message within the same chat | Нельзя отвечать на сообщение из другого чата ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./im-message-like.md)
- [{#T}](./attachments.md)
- [{#T}](./keyboards.md)
- [{#T}](./menu.md)

