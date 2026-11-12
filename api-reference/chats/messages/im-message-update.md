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

Идентификатор возвращают методы [im.message.add](./im-message-add.md) и [im.dialog.messages.get](./im-dialog-messages-get.md).

Изменить можно только свое сообщение и только в течение трех суток после отправки. Пересланное сообщение изменить нельзя ||
|| **MESSAGE**
[`string`](../../data-types.md) | Новый текст сообщения. Если передать пустое значение, сообщение будет удалено.

Если параметр не передан, текст сообщения не изменится ||
|| **ATTACH**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Вложение с блоками контента: изображения, ссылки, файлы.

Передайте объект с массивом блоков в ключе `BLOCKS`, например `{"BLOCKS":[{"MESSAGE":"Текст блока"}]}`, или сам массив блоков. Чтобы удалить вложение, передайте `N` или пустое значение.

Подробнее читайте в статье [Вложения](./attachments.md) ||
|| **KEYBOARD**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Кнопки под сообщением, с которыми может взаимодействовать пользователь.

Передайте объект с массивом кнопок в ключе `BUTTONS`, например `{"BUTTONS":[{"TEXT":"Открыть","LINK":"https://example.com"}]}`, или сам массив кнопок. Чтобы убрать кнопки, передайте `N` или пустое значение.

Подробнее читайте в статье [Работа с клавиатурами](./keyboards.md) ||
|| **MENU**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Свои пункты в контекстном меню сообщения, например ссылка или копирование текста.

Передайте объект с массивом пунктов в ключе `ITEMS`, например `{"ITEMS":[{"TEXT":"Открыть","LINK":"https://example.com"}]}`, или сам массив пунктов. Чтобы убрать свои пункты, передайте `N` или пустое значение.

Подробнее читайте в статье [Контекстное меню](./menu.md) ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Показывать ли под ссылкой в сообщении карточку с заголовком, описанием и картинкой страницы.

Допустимые значения:
- `Y` — показывать карточку
- `N` — не показывать ||
|| **IS_EDITED**
[`string`](../../data-types.md) | Показывать ли у сообщения метку «изменено»:
- `Y` — показать
- `N` — не показывать

По умолчанию — `Y`

{% note info "" %}

Параметр действует при изменении `ATTACH`. При изменении `MESSAGE` метка может появиться, даже если передать `N`

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
    -d '{"MESSAGE_ID":34239,"MESSAGE":"Обновленный текст"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"MESSAGE_ID":34239,"MESSAGE":"Обновленный текст","auth":"**put_access_token_here**"}' \
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
          MESSAGE: 'Обновленный текст',
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
              MESSAGE: 'Обновленный текст',
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.message.update(
            message_id=34239,
            message="Обновленный текст",
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                    'MESSAGE' => 'Обновленный текст'
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
            MESSAGE: 'Обновленный текст'
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
            'MESSAGE' => 'Обновленный текст'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.message.update", b24.Params{
    	"MESSAGE_ID": 34239,
    	"MESSAGE":    "Обновленный текст",
    })
    if err != nil {
    	return fmt.Errorf("im.message.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
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
[`boolean`](../../data-types.md) | `true`, если запрос выполнен без ошибки. Если передан только `MESSAGE_ID`, метод тоже вернет `true`, но сообщение не изменится ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MESSAGE_ID_ERROR` | Message ID can't be empty | Параметр `MESSAGE_ID` не передан или его значение не больше `0` ||
|| `403` | `CANT_EDIT_MESSAGE` | Time has expired for modification or you don't have access | Сообщение не найдено, удалено, переслано, отправлено другим пользователем или больше трех суток назад ||
|| `400` | `ATTACH_ERROR` | Incorrect attach params | Невалидный объект `ATTACH` ||
|| `400` | `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Размер `ATTACH` превышает допустимый ||
|| `400` | `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидный объект `KEYBOARD` ||
|| `400` | `KEYBOARD_OVERSIZE` | You have exceeded the maximum allowable size of keyboard | Размер `KEYBOARD` превышает допустимый ||
|| `400` | `menu_ERROR` | Incorrect menu params | Невалидный объект `MENU` ||
|| `400` | `MENU_OVERSIZE` | You have exceeded the maximum allowable size of menu | Размер `MENU` превышает допустимый ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./im-message-like.md)
- [{#T}](./im-message-share.md)
- [{#T}](./im-message-command.md)
- [{#T}](./im-dialog-messages-get.md)
- [{#T}](./im-dialog-messages-search.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
