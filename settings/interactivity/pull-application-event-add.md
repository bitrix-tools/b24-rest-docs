# Отправить событие в канал приложения pull.application.event.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pull`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, авторизованный в приложении. Отправить событие в канал другого пользователя может только администратор Битрикс24

Метод `pull.application.event.add` отправляет событие в канал приложения. Событие получит подключенный к каналу [штатный клиент в браузере](./push-and-pull-in-browser.md) или [собственный клиент](./custom-push-and-pull-client.md). Так обновляют интерфейс открытого приложения; чтобы уведомить пользователя вне интерфейса Битрикс24, нужен другой метод — [pull.application.push.add](./pull-application-push-add.md).

В очереди Push&Pull событие хранится 24 часа, поэтому его можно взять из истории после подключения с опозданием — как это сделать, описано в статье [{#T}](./custom-push-and-pull-client.md). Не путайте этот срок с 12 часами: столько живет идентификатор канала, и после его переиздания история дочитывается по `mid` или по паре `tag` и `time`.

Идентификаторы каналов и адреса серверов клиент получает до этого методом [pull.application.config.get](./pull-application-config-get.md). Значения `MODULE_ID` и `COMMAND` из запроса должны совпасть с тем, на что клиент подписался, иначе обработчик не получит событие.

{% note info "" %}

Метод работает только в контексте [приложения](../app-installation/index.md). Запрос выполняется с OAuth-токеном приложения и scope `pull`, а вебхук такой контекст не создает.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMAND**^*^
[`string`](../../api-reference/data-types.md) | Команда события.

Допустимые символы: `A-Z`, `a-z`, `0-9`, `_`, `:`, ```|```, `.`, `-`

По команде клиент различает типы событий и решает, что обновить в интерфейсе ||
|| **PARAMS**
[`object`](../../api-reference/data-types.md) | Параметры события в формате:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — имя параметра события
- `value_n` — значение параметра события

Имена и значения полей задаете сами. Если параметр не передан, клиент получит команду с пустым `params`.

Размер сообщения, которое Битрикс24 отправляет на сервер Push&Pull, ограничен 1 МБ. В коробочной версии администратор может изменить лимит настройкой `limit_max_payload` модуля `pull`.

Пример:

```json
{
    "grid_id": 15,
    "status": "done"
}
``` ||
|| **MODULE_ID**
[`string`](../../api-reference/data-types.md) | Идентификатор модуля события.

Допустимые символы: `a-z`, `0-9`, `.`, `_`

По умолчанию используется `application` ||
|| **USER_ID**
[`integer`](../../api-reference/data-types.md) \| [`string`](../../api-reference/data-types.md) \| [`integer[]`](../../api-reference/data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей.

`USER_ID` можно получить:
- методом [user.get](../../api-reference/user/user-get.md)
- методом [user.current](../../api-reference/user/user-current.md) для текущего пользователя

Администратор Битрикс24 может указать любых пользователей и передать массив идентификаторов.

Пользователь без прав администратора может указать только свой идентификатор, и только строкой — `"USER_ID": "577"`. Битрикс24 сравнивает значение с идентификатором текущего пользователя строго по типу, поэтому и число `577`, и массив `["577"]` метод отклонит с ошибкой `USER_ID_ACCESS_ERROR`.

Если параметр не передан, событие отправляется в общий канал `shared`, а с параметром — в личный канал `private` указанного пользователя. Клиент должен быть подписан на нужный канал — [Подписка на события](./push-and-pull-in-browser.md#subscribe) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример отправки события в общий канал приложения, где:
- `COMMAND` — команда события
- `PARAMS` — параметры события
- `MODULE_ID` — идентификатор модуля события

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "COMMAND": "test_event",
        "PARAMS": {
          "param1": "value1"
        },
        "MODULE_ID": "application",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.event.add.json"
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
        method: 'pull.application.event.add',
        params: {
          COMMAND: 'test_event',
          PARAMS: {
            param1: 'value1',
          },
          MODULE_ID: 'application',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Event accepted:', result)
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
      async function sendApplicationEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'pull.application.event.add',
            params: {
              COMMAND: 'test_event',
              PARAMS: {
                param1: 'value1',
              },
              MODULE_ID: 'application',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Event accepted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendApplicationEvent)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # Метод вызывается напрямую: в типизированной обертке client.pull.application.event.add
    # параметр params принимает список, а не объект, поэтому PARAMS через нее не передать
    try:
        bitrix_response = client.call(
            "pull.application.event.add",
            {
                "COMMAND": "test_event",
                "PARAMS": {
                    "param1": "value1",
                },
                "MODULE_ID": "application",
            },
        ).response
        print(bitrix_response.result)
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
                'pull.application.event.add',
                [
                    'COMMAND' => 'test_event',
                    'PARAMS' => [
                        'param1' => 'value1',
                    ],
                    'MODULE_ID' => 'application',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'pull.application.event.add',
        {
            COMMAND: 'test_event',
            PARAMS: {
                param1: 'value1'
            },
            MODULE_ID: 'application'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'pull.application.event.add',
        [
            'COMMAND' => 'test_event',
            'PARAMS' => [
                'param1' => 'value1',
            ],
            'MODULE_ID' => 'application',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

Примеры отправляют событие в общий канал. Чтобы отправить его в личный канал, добавьте в запрос `USER_ID`:

```json
{
    "COMMAND": "test_event",
    "PARAMS": {
        "param1": "value1"
    },
    "MODULE_ID": "application",
    "USER_ID": "577"
}
```

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1743495945,
        "finish": 1743495945.285066,
        "duration": 0.2850658893585205,
        "processing": 0.008597135543823242,
        "date_start": "2025-04-01T11:52:25+03:00",
        "date_finish": "2025-04-01T11:52:25+03:00",
        "operating_reset_at": 1743496545,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../api-reference/data-types.md) | Признак того, что событие принято к отправке. Метод возвращает `true`, даже если событие не попало в канал — например, когда сервер Push&Pull не принял событие из-за превышения размера ||
|| **time**
[`time`](../../api-reference/data-types.md#time) | Информация о времени выполнения запроса. Состав полей — [Объект time](../../api-reference/data-types.md#time) ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Get access to application config available only for application authorization."
}
```

HTTP-статус: **400**

```json
{
    "error": "COMMAND_ERROR",
    "error_description": "Command format error"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Get access to application config available only for application authorization. | Вызов метода не из контекста приложения, например, через вебхук. Текст ошибки совпадает с текстом той же ошибки у метода [pull.application.config.get](./pull-application-config-get.md) — различайте их по имени вызванного метода ||
|| `400` | `USER_ID_ACCESS_ERROR` | Only admin can send notifications to other channels | Пользователь без прав администратора пытается отправить событие в чужой канал либо передает свой `USER_ID` числом или массивом вместо строки ||
|| `400` | `MODULE_ID_ERROR` | Module ID format error | Параметр `MODULE_ID` содержит недопустимые символы ||
|| `400` | `COMMAND_ERROR` | Command format error | Параметр `COMMAND` не передан, пуст или содержит недопустимые символы ||
|| `400` | `PARAMS_ERROR` | Params format error | Параметр `PARAMS` передан не объектом ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./push-and-pull-in-browser.md)
- [{#T}](./custom-push-and-pull-client.md)
- [{#T}](./pull-application-config-get.md)
- [{#T}](./pull-application-push-add.md)
