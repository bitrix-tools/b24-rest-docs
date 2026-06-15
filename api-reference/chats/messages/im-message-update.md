# Изменить сообщение im.message.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: автор сообщения

Метод `im.message.update` изменяет текст и параметры уже отправленного сообщения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения.

Идентификатор возвращает метод [im.message.add](./im-message-add.md) ||
|| **MESSAGE**
[`string`](../../data-types.md) | Новый текст сообщения. Если передать пустое значение, сообщение будет удалено.

Если параметр не передан, текст сообщения не изменится ||
|| **ATTACH**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Вложение с блоками контента: изображения, ссылки, файлы. Чтобы удалить вложение, передайте `N` или пустое значение.

Подробнее читайте в разделе [Вложения](./attachments.md) ||
|| **KEYBOARD**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Кнопки под сообщением, с которыми может взаимодействовать пользователь. Чтобы отключить вывод кнопок, передайте `N` или пустое значение.

Подробнее читайте в статье [Работа с клавиатурами](./keyboards.md) ||
|| **MENU**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Дополнительные пункты в контекстном меню чата. Чтобы отключить показ дополнительных пунктов меню, передайте `N` или пустое значение.

Подробнее читайте в статье [Контекстное меню](./menu.md) ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Преобразование ссылок в rich-ссылки.

Допустимые значения:
- `Y` — включено
- `N` — выключено ||
|| **IS_EDITED**
[`string`](../../data-types.md) | Флаг отметки «изменено»:
- `Y` — отметить
- `N` — не отмечать

По умолчанию — `Y` 

{% note info "" %}

Параметр применяется при обновлении `ATTACH`. При изменении `MESSAGE` метка «изменено» может появиться даже если передан `IS_EDITED = 'N'`

{% endnote %} ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34239,"MESSAGE":"Обновленный текст","KEYBOARD":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34239,"MESSAGE":"Обновленный текст","KEYBOARD":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.update
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
        method: 'im.message.update',
        params: {
          MESSAGE_ID: 34239,
          MESSAGE: 'Updated text',
          KEYBOARD: 'N',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message updated:', result)
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
      async function updateMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.update',
            params: {
              MESSAGE_ID: 34239,
              MESSAGE: 'Updated text',
              KEYBOARD: 'N',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateMessage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.message.update',
                [
                    'MESSAGE_ID' => 34239,
                    'MESSAGE' => 'Обновленный текст',
                    'KEYBOARD' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.message.update',
        {
            MESSAGE_ID: 34239,
            MESSAGE: 'Обновленный текст',
            KEYBOARD: 'N'
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
        'im.message.update',
        [
            'MESSAGE_ID' => 34239,
            'MESSAGE' => 'Обновленный текст',
            'KEYBOARD' => 'N'
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
        "start": 1772623160,
        "finish": 1772623160.616113,
        "duration": 0.6161129474639893,
        "processing": 0,
        "date_start": "2026-03-04T14:19:20+03:00",
        "date_finish": "2026-03-04T14:19:20+03:00",
        "operating_reset_at": 1772623760,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если сообщение обновлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "MESSAGE_ID_ERROR",
    "error_description": "Message ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан или некорректен `MESSAGE_ID` ||
|| `CANT_EDIT_MESSAGE` | Time has expired for modification or you don't have access | Нет прав на редактирование сообщения или истек срок изменения ||
|| `ATTACH_ERROR` | Incorrect attach params | Невалидный объект `ATTACH` ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Размер `ATTACH` превышает допустимый ||
|| `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидный объект `KEYBOARD` ||
|| `KEYBOARD_OVERSIZE` | You have exceeded the maximum allowable size of keyboard | Размер `KEYBOARD` превышает допустимый ||
|| `menu_ERROR` | Incorrect menu params | Невалидный объект `MENU` ||
|| `MENU_OVERSIZE` | You have exceeded the maximum allowable size of menu | Размер `MENU` превышает допустимый ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./keyboards.md)
- [{#T}](./attachments.md)
- [{#T}](./menu.md)

