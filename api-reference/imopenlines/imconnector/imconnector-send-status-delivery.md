# Обновить статус «доставлено» imconnector.send.status.delivery

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.send.status.delivery` подтверждает в Битрикс24, что исходящее сообщение открытой линии доставлено во внешнюю систему.

Вызывайте метод после того, как приложение получило событие [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md) и доставило сообщение во внешний канал. Повторно сообщение не отправляется — метод только фиксирует результат доставки.

При обработке статуса «доставлено» сообщение также помечается прочитанным — от имени собеседника из внешнего канала.

Для входящих сообщений из внешней системы в открытую линию метод не применяется.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONNECTOR***
[`string`](../../data-types.md) | Строковый код коннектора, который задали в параметре `ID` при вызове [imconnector.register](./imconnector-register.md) ||
|| **LINE***
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Идентификатор можно получить методами [imopenlines.config.get](../openlines/imopenlines-config-get.md) и [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **MESSAGES***
[`array`](../../data-types.md) | Массив статусов доставки. Каждый элемент массива — объект с блоками `im`, `message`, `chat`.

Структура объекта подробно описана [ниже](#messages) ||
|#

### Параметр MESSAGES {#messages}

#|
|| **Название**
`тип` | **Описание** ||
|| **im***
[`object`](../../data-types.md) | Внутренние идентификаторы сообщения в Битрикс24 [(подробное описание)](#messages-im) ||
|| **message**
[`object`](../../data-types.md) | Данные сообщения во внешней системе [(подробное описание)](#messages-message) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата во внешней системе [(подробное описание)](#messages-chat) ||
|#

#### Объект im {#messages-im}

#|
|| **Название**
`тип` | **Описание** ||
|| **message_id***
[`integer`](../../data-types.md) | Идентификатор сообщения в Битрикс24, для которого нужно установить статус доставки. Единственное значение, по которому Битрикс24 находит сообщение ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата открытой линии в Битрикс24 для исходящего сообщения. На обработку статуса не влияет ||
|#

Приложение получает поля `im.message_id` и `im.chat_id` в событии [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md) и сохраняет их, чтобы потом передать в статусе доставки. Внешние идентификаторы `message.id` и `chat.id` их не заменяют.

#### Объект message {#messages-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`array`](../../data-types.md) | Массив внешних идентификаторов сообщений, для которых передается статус доставки. Даже для одного сообщения передавайте массив, например, `["ext-msg-1007"]`.

Битрикс24 сохраняет переданный массив целиком в параметрах сообщения открытой линии — по нему потом можно сопоставить сообщение Битрикс24 и сообщение внешней системы ||
|| **date**
[`integer`](../../data-types.md) | Время доставки сообщения в Unix Timestamp в секундах. На обработку статуса не влияет ||
|#

#### Объект chat {#messages-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор чата или канала во внешней системе. На обработку статуса не влияет.

Передавайте то же значение, что и в `chat.id` метода [imconnector.send.messages](./imconnector-send-messages.md), чтобы данные двух систем совпадали ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONNECTOR": "myconnector",
        "LINE": 107,
        "MESSAGES": [
          {
            "im": {
              "chat_id": 323,
              "message_id": 85911
            },
            "message": {
              "id": ["ext-msg-1007"],
              "date": 1738065600
            },
            "chat": {
              "id": "channel-123"
            }
          }
        ],
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.send.status.delivery
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SendStatusDeliveryResult = {
      SUCCESS: boolean
      DATA: unknown[]
    }

    try {
      const response = await $b24.actions.v2.call.make<SendStatusDeliveryResult>({
        method: 'imconnector.send.status.delivery',
        params: {
          CONNECTOR: 'myconnector',
          LINE: 107,
          MESSAGES: [
            {
              im: { chat_id: 323, message_id: 85911 },
              message: { id: ['ext-msg-1007'], date: 1738065600 },
              chat: { id: 'channel-123' },
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Delivery status accepted:', result.SUCCESS, 'data:', result.DATA)
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
      async function sendStatusDelivery() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imconnector.send.status.delivery',
            params: {
              CONNECTOR: 'myconnector',
              LINE: 107,
              MESSAGES: [
                {
                  im: { chat_id: 323, message_id: 85911 },
                  message: { id: ['ext-msg-1007'], date: 1738065600 },
                  chat: { id: 'channel-123' },
                },
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
          console.info('Delivery status accepted:', result.SUCCESS, 'data:', result.DATA)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendStatusDelivery)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imconnector.send.status.delivery(
            connector="myconnector",
            line=107,
            messages=[
                {
                    "im": {
                        "chat_id": 323,
                        "message_id": 85911,
                    },
                    "message": {
                        "id": [
                            "ext-msg-1007",
                        ],
                        "date": 1738065600,
                    },
                    "chat": {
                        "id": "channel-123",
                    },
                },
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
    $result = $b24Service->core->call(
        'imconnector.send.status.delivery',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'im' => ['chat_id' => 323, 'message_id' => 85911],
                    'message' => ['id' => ['ext-msg-1007'], 'date' => 1738065600],
                    'chat' => ['id' => 'channel-123'],
                ],
            ],
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.send.status.delivery',
      {
        CONNECTOR: 'myconnector',
        LINE: 107,
        MESSAGES: [
          {
            im: { chat_id: 323, message_id: 85911 },
            message: { id: ['ext-msg-1007'], date: 1738065600 },
            chat: { id: 'channel-123' },
          },
        ],
      },
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.send.status.delivery',
        [
            'CONNECTOR' => 'myconnector',
            'LINE' => 107,
            'MESSAGES' => [
                [
                    'im' => ['chat_id' => 323, 'message_id' => 85911],
                    'message' => ['id' => ['ext-msg-1007'], 'date' => 1738065600],
                    'chat' => ['id' => 'channel-123'],
                ],
            ],
        ]
    );
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imconnector.send.status.delivery", b24.Params{
    	"CONNECTOR": "myconnector",
    	"LINE":      107,
    	"MESSAGES": []b24.Params{
    		{
    			"im": b24.Params{
    				"chat_id":    323,
    				"message_id": 85911,
    			},
    			"message": b24.Params{
    				"id":   []string{"ext-msg-1007"},
    				"date": 1738065600,
    			},
    			"chat": b24.Params{
    				"id": "channel-123",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("imconnector.send.status.delivery: %w", err)
    }

    var item struct {
    	Success bool `json:"SUCCESS"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Success)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "SUCCESS": true,
        "DATA": []
    },
    "time": {
        "start": 1773267900.126,
        "finish": 1773267900.489,
        "duration": 0.3630001544952393,
        "processing": 0.0884850025177002,
        "date_start": "2026-03-11T14:25:00+03:00",
        "date_finish": "2026-03-11T14:25:00+03:00",
        "operating_reset_at": 1773268500,
        "operating": 0.0884850025177002
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат обработки статусов доставки [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true`, если переданы обязательные параметры и найден провайдер коннектора.

Значение `true` не подтверждает, что статус применен к конкретному сообщению: необработанные элементы `MESSAGES` Битрикс24 пропускает без ошибки ||
|| **DATA**
[`array`](../../data-types.md) | Всегда пустой массив: метод не возвращает данные по отдельным сообщениям ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `ERROR_ARGUMENT` | Argument 'CONNECTOR' is null or empty | Не передан `CONNECTOR` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'LINE' is null or empty | Не передан `LINE` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'MESSAGES' is null or empty | Не передан ключ `MESSAGES`. Пустой массив ошибку не вызывает ||
|| `400` | `IMCONNECTOR_NO_CORRECT_PROVIDER` | Не удалось найти подходящий провайдер для коннектора | Коннектор с таким кодом не зарегистрирован в Битрикс24 ||
|#

Метод возвращает ошибку только на проблемы всего запроса: не передан параметр, не найден провайдер коннектора, вызов сделан не в контексте приложения. Отдельный элемент `MESSAGES` Битрикс24 пропускает без ошибки, если:

- в элементе нет `im.message_id`
- сообщения с таким `im.message_id` нет в Битрикс24
- сообщение не принадлежит чату открытой линии

Статус доставки применяется, только пока сообщение находится в состоянии отправки: Битрикс24 держит его в этом состоянии, пока не получит первое подтверждение доставки. При повторном вызове метода для того же сообщения оно снова помечается прочитанным, а статус доставки и внешний идентификатор уже не записываются.

В отличие от [imconnector.send.messages](./imconnector-send-messages.md), параметр `LINE` в этом методе не проверяется, поэтому ошибку `NOT_ACTIVE_LINE` он не возвращает.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-chat-name-set.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)
