# Установить новое имя чата imconnector.chat.name.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.chat.name.set` устанавливает новое имя чата.

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
[`integer`](../../data-types.md) | Идентификатор открытой линии

Идентификатор можно получить методами [imopenlines.config.get](../openlines/imopenlines-config-get.md) и [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **CHAT_ID***
[`string`](../../data-types.md) | Идентификатор чата во внешней системе ||
|| **NAME***
[`string`](../../data-types.md) | Новое имя чата ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя. Параметр является обязательным только для коннекторов без групповых чатов с внешней стороны. У такого коннектора в методе [imconnector.register](./imconnector-register.md) параметр `CHAT_GROUP` должен быть равен `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONNECTOR":"connector","LINE":105,"CHAT_ID":"47e007b1-ee15-43db-bcba-1c26e5884d3f","NAME":"Новое имя диалога","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imconnector.chat.name.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ChatNameSetResult = {
      SUCCESS: boolean
      DATA: {
        RESULT: Record<string, unknown>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ChatNameSetResult>({
        method: 'imconnector.chat.name.set',
        params: {
          CONNECTOR: 'connector',
          LINE: 105,
          CHAT_ID: '47e007b1-ee15-43db-bcba-1c26e5884d3f',
          NAME: 'New dialog name',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('SUCCESS:', result.SUCCESS, 'DATA:', result.DATA)
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
      async function setChatName() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imconnector.chat.name.set',
            params: {
              CONNECTOR: 'connector',
              LINE: 105,
              CHAT_ID: '47e007b1-ee15-43db-bcba-1c26e5884d3f',
              NAME: 'New dialog name',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('SUCCESS:', result.SUCCESS, 'DATA:', result.DATA)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setChatName)
    </script>
    ```

- PHP


    ```php
    try {
        $params = [
            'CONNECTOR' => 'connector',
            'LINE'      => 105,
            'CHAT_ID'   => '47e007b1-ee15-43db-bcba-1c26e5884d3f',
            'NAME'      => 'Новое имя диалога',
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imconnector.chat.name.set',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting chat name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        CONNECTOR: 'connector',
        LINE: 105,
        CHAT_ID: '47e007b1-ee15-43db-bcba-1c26e5884d3f',
        NAME: 'Новое имя диалога'
    };
    BX24.callMethod(
        'imconnector.chat.name.set',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $params = [
        'CONNECTOR' => 'connector',
        'LINE' => 105,
        'CHAT_ID' => '47e007b1-ee15-43db-bcba-1c26e5884d3f',
        'NAME' => 'Новое имя диалога'
    ];

    $result = CRest::call(
        'imconnector.chat.name.set',
        $params
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
    "answer": {
        "result": {
            "SUCCESS": true,
            "DATA": {
                "RESULT": {}
            }
        },
        "time": {
            "start": 1732110908.525962,
            "finish": 1732110908.879113,
            "duration": 0.3531508445739746,
            "processing": 0.07694888114929199,
            "date_start": "2024-11-20T15:55:08+02:00",
            "date_finish": "2024-11-20T15:55:08+02:00"
        }
    },
    "query": {
        "method": "imconnector.chat.name.set",
        "data": {
            "CONNECTOR": "newcustomconnector",
            "LINE": "105",
            "CHAT_ID": "1",
            "NAME": "name"
        }
    },
    "status": 200
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **SUCCESS**
[`boolean`](../../data-types.md) | Возвращает `true` при успешной установке нового имени чата ||
|| **DATA**
[`object`](../../data-types.md) | Содержит объект `RESULT` c параметрами нового имени чата ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_ACTIVE_LINE",
    "error_description": "Линия c таким ID неактивна или не существует"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** ||
|| `400` | `NOT_ACTIVE_LINE` | Линия c таким ID неактивна или не существует ||
|| `400` | `IMCONNECTOR_NO_CORRECT_PROVIDER` | Не удалось найти подходящий провайдер для коннектора ||
|| `400` | `ERROR_ARGUMENT` | Не указаны обязательные параметры `NAME`, `CHAT_ID`, `USER_ID`, `CONNECTOR` или `LINE` ||
|| `400` | `CHAT_RENAMING_FAILED` | Не удалось переименовать чат ||
|#

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
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
