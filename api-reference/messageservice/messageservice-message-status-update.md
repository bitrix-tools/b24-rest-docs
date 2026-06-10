# Обновить статус доставки сообщения messageservice.message.status.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'messageservice.message.status.update',
        params: {
          CODE: 'provider1',
          MESSAGE_ID: '65575980fa531ac284c2ee68f81ebebd',
          STATUS: 'delivered',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Status updated:', result)
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
      async function updateMessageStatus() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'messageservice.message.status.update',
            params: {
              CODE: 'provider1',
              MESSAGE_ID: '65575980fa531ac284c2ee68f81ebebd',
              STATUS: 'delivered',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Status updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateMessageStatus)
    </script>
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
