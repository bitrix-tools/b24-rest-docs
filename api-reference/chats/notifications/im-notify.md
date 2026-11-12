# Отправить уведомление im.notify

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify` отправляет уведомление пользователю.

{% note info "" %}

Метод нельзя вызвать с сессионной авторизацией — он вернет ошибку `WRONG_AUTH_TYPE`. Вызывайте его через вебхук или с токеном приложения.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор пользователя-получателя уведомления. Получатель должен быть активным пользователем портала: если пользователь не найден или неактивен, метод вернет `result: false`.

Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md), [user.search](../../user/user-search.md) или [im.user.get](../users/im-user-get.md) ||
|| **TYPE**
[`string`](../../data-types.md) | Тип уведомления.

Допустимые значения:
- `USER` — персональное уведомление от имени текущего пользователя, как в методе [im.notify.personal.add](./im-notify-personal-add.md)
- `SYSTEM` — системное уведомление без автора, как в методе [im.notify.system.add](./im-notify-system-add.md)

Значение по умолчанию — `USER`. Любое другое значение метод тоже заменяет на `USER` ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст уведомления. Метод удаляет пробелы по краям строки, строка из одних пробелов вызывает ошибку `MESSAGE_EMPTY`. Поддерживает BB-коды — подробнее в разделе [Форматирование сообщений](../messages/formatting.md).

Для `TYPE: SYSTEM` при вызове из приложения первой строкой текста метод добавляет название приложения ||
|| **MESSAGE_OUT**
[`string`](../../data-types.md) | Текст уведомления для внешних каналов, например, почты. Для `TYPE: SYSTEM` при вызове из приложения первой строкой текста метод добавляет название приложения ||
|| **TAG**
[`string`](../../data-types.md) | Тег уведомления. Если у получателя уже есть уведомление этого приложения с таким тегом, предыдущее уведомление удаляется.

Тег сохраняется только при вызове из приложения: метод добавляет к нему ключ приложения, поэтому теги разных приложений не пересекаются. При вызове через вебхук параметр игнорируется ||
|| **SUB_TAG**
[`string`](../../data-types.md) | Дополнительный тег уведомления без проверки уникальности. По тегам `TAG` и `SUB_TAG` уведомления можно удалить методом [im.notify.delete](./im-notify-delete.md).

Тег сохраняется только при вызове из приложения. При вызове через вебхук параметр игнорируется ||
|| **ATTACH**
[`array`](../../data-types.md)
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Вложение уведомления: массив блоков, объект с ключом `BLOCKS` или JSON-строка. Размер вложения в JSON — меньше 60 000 символов. Формат блоков описан в разделе [Вложения](../messages/attachments.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_ID":5,"TYPE":"SYSTEM","MESSAGE":"Счет [B]№ 42[/B] оплачен","MESSAGE_OUT":"Счет № 42 оплачен","ATTACH":[{"MESSAGE":"Сумма: 15 000 руб."},{"LINK":{"NAME":"Открыть счет","LINK":"https://example.com/invoice/42"}}]}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_ID":5,"TYPE":"SYSTEM","MESSAGE":"Счет [B]№ 42[/B] оплачен","MESSAGE_OUT":"Счет № 42 оплачен","ATTACH":[{"MESSAGE":"Сумма: 15 000 руб."},{"LINK":{"NAME":"Открыть счет","LINK":"https://example.com/invoice/42"}}],"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number | false>({
        method: 'im.notify',
        params: {
          USER_ID: 5,
          TYPE: 'SYSTEM',
          MESSAGE: 'Счет [B]№ 42[/B] оплачен',
          MESSAGE_OUT: 'Счет № 42 оплачен',
          ATTACH: [
            { MESSAGE: 'Сумма: 15 000 руб.' },
            { LINK: { NAME: 'Открыть счет', LINK: 'https://example.com/invoice/42' } },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Notification ID:', result)
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
      async function sendNotification() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify',
            params: {
              USER_ID: 5,
              TYPE: 'SYSTEM',
              MESSAGE: 'Счет [B]№ 42[/B] оплачен',
              MESSAGE_OUT: 'Счет № 42 оплачен',
              ATTACH: [
                { MESSAGE: 'Сумма: 15 000 руб.' },
                { LINK: { NAME: 'Открыть счет', LINK: 'https://example.com/invoice/42' } },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Notification ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendNotification)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.notify(
            user_id=5,
            type="SYSTEM",
            message="Счет [B]№ 42[/B] оплачен",
            message_out="Счет № 42 оплачен",
            attach=[
                {"MESSAGE": "Сумма: 15 000 руб."},
                {"LINK": {"NAME": "Открыть счет", "LINK": "https://example.com/invoice/42"}},
            ],
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
        $response = $b24Service->core->call(
            'im.notify',
            [
                'USER_ID' => 5,
                'TYPE' => 'SYSTEM',
                'MESSAGE' => 'Счет [B]№ 42[/B] оплачен',
                'MESSAGE_OUT' => 'Счет № 42 оплачен',
                'ATTACH' => [
                    ['MESSAGE' => 'Сумма: 15 000 руб.'],
                    ['LINK' => ['NAME' => 'Открыть счет', 'LINK' => 'https://example.com/invoice/42']],
                ],
            ]
        );

        $result = $response->getResponseData()->getResult();

        print_r($result);
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify',
        {
            USER_ID: 5,
            TYPE: 'SYSTEM',
            MESSAGE: 'Счет [B]№ 42[/B] оплачен',
            MESSAGE_OUT: 'Счет № 42 оплачен',
            ATTACH: [
                { MESSAGE: 'Сумма: 15 000 руб.' },
                { LINK: { NAME: 'Открыть счет', LINK: 'https://example.com/invoice/42' } },
            ],
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
        'im.notify',
        [
            'USER_ID' => 5,
            'TYPE' => 'SYSTEM',
            'MESSAGE' => 'Счет [B]№ 42[/B] оплачен',
            'MESSAGE_OUT' => 'Счет № 42 оплачен',
            'ATTACH' => [
                ['MESSAGE' => 'Сумма: 15 000 руб.'],
                ['LINK' => ['NAME' => 'Открыть счет', 'LINK' => 'https://example.com/invoice/42']],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } elseif ($result['result'] === false) {
        echo 'Notification not sent';
    } else {
        echo 'Notification ID: ' . $result['result'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.notify", b24.Params{
    	"USER_ID":     5,
    	"TYPE":        "SYSTEM",
    	"MESSAGE":     "Счет [B]№ 42[/B] оплачен",
    	"MESSAGE_OUT": "Счет № 42 оплачен",
    	"ATTACH": []map[string]any{
    		{"MESSAGE": "Сумма: 15 000 руб."},
    		{"LINK": map[string]any{"NAME": "Открыть счет", "LINK": "https://example.com/invoice/42"}},
    	},
    })
    if err != nil {
    	return fmt.Errorf("im.notify: %w", err)
    }

    // result — идентификатор уведомления или false, если уведомление не создано
    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("уведомление не создано: %s", res.Result)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 44003,
    "time": {
        "start": 1794317396,
        "finish": 1794317396.101083,
        "duration": 0.10108304023742676,
        "processing": 0,
        "date_start": "2026-11-10T16:29:56+03:00",
        "date_finish": "2026-11-10T16:29:56+03:00",
        "operating_reset_at": 1794317940,
        "operating": 0
    }
}
```

Если получатель не найден или неактивен, метод возвращает HTTP-статус **200** и `false`:

```json
{
    "result": false,
    "time": {
        "start": 1794317624,
        "finish": 1794317624.580945,
        "duration": 0.5809450149536133,
        "processing": 0,
        "date_start": "2026-11-10T16:33:44+03:00",
        "date_finish": "2026-11-10T16:33:44+03:00",
        "operating_reset_at": 1794318180,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md)
[`boolean`](../../data-types.md) | Идентификатор созданного уведомления. Передайте его в `ID` метода [im.notify.delete](./im-notify-delete.md), чтобы удалить уведомление.

Значение `false` означает, что уведомление не создано: получатель не найден или неактивен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "USER_ID_EMPTY",
    "error_description": "User ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization. | Метод вызван с сессионной авторизацией, для которой он запрещен ||
|| `400` | `USER_ID_EMPTY` | User ID can't be empty | Параметр `USER_ID` не передан или его значение не больше `0` ||
|| `400` | `MESSAGE_EMPTY` | Message can't be empty | Параметр `MESSAGE` не передан, не является строкой или содержит только пробелы ||
|| `400` | `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Размер вложения `ATTACH` в JSON — 60 000 символов или больше ||
|| `400` | `ATTACH_ERROR` | Incorrect attach params | Во вложении `ATTACH` нет ни одного корректного блока или передана строка, которая не является JSON ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)

