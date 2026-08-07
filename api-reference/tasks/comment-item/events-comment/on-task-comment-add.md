# Событие при добавлении комментария OnTaskCommentAdd

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONTASKCOMMENTADD` срабатывает после добавления нового комментария к задаче.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

При работе со старой карточкой задачи до версии модуля `tasks 25.700.0`:

```json
{
    "event": "ONTASKCOMMENTADD",
    "data": {
        "FIELDS_BEFORE": "undefined",
        "FIELDS_AFTER": {
            "ID": 123,
            "TASK_ID": 555
        },
        "IS_ACCESSIBLE_BEFORE": "undefined",
        "IS_ACCESSIBLE_AFTER": "undefined"
    },
    "ts": "1466439714",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "task",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

При работе с новой карточкой задачи с чатом с версии модуля `tasks 25.700.0`:

```json
{
    "event": "ONTASKCOMMENTADD",
    "data": {
        "FIELDS_BEFORE": "undefined",
        "FIELDS_AFTER": {
            "ID": 0,
            "TASK_ID": 555,
            "MESSAGE_ID": 1458
        },
        "IS_ACCESSIBLE_BEFORE": "undefined",
        "IS_ACCESSIBLE_AFTER": "undefined"
    },
    "ts": "1466439714",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "task",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

{% include notitle [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONTASKCOMMENTADD` ||
|| **data***
[`object`](../../../data-types.md) | Объект, содержащий данные о событии добавления комментария.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data[] {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELDS_BEFORE***
[`undefined`\|`object`](../../../data-types.md) | Поля комментария и задачи до события (подробное описание приведено [ниже](#fields_before)). В случае отсутствия доступных полей задачи данное поле будет содержать значение `undefined` ||
|| **FIELDS_AFTER***
[`undefined`\|`object`](../../../data-types.md) | Поля комментария и задачи после события (подробное описание приведено [ниже](#fields_after)). В случае отсутствия доступных полей задачи данное поле будет содержать значение `undefined` ||
|| **IS_ACCESSIBLE_BEFORE***
[`string`](../../../data-types.md) | Была ли доступна задача на чтение до события (подробное описание приведено [ниже](#is_accessible_before)) ||
|| **IS_ACCESSIBLE_AFTER***
[`string`](../../../data-types.md) | Стала ли доступна задача на чтение после события (подробное описание приведено [ниже](#is_accessible_after)) ||
|#

### Поле FIELDS_BEFORE {#fields_before}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор созданного комментария. `'ID' => 0` возвращается при активной [новой карточке задач](../../tasks-new.md) с версии модуля `tasks 25.700.0` ||
|| **TASK_ID***
[`integer`](../../../data-types.md) | Идентификатор задачи, к которой был добавлен комментарий ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор отправленного сообщения в чат задачи, возвращается при активной [новой карточке задач](../../tasks-new.md) с версии модуля `tasks 25.700.0` ||
|#

### Поле FIELDS_AFTER {#fields_after}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор созданного комментария. `'ID' => 0` возвращается при активной [новой карточке задач](../../tasks-new.md) с версии модуля `tasks 25.700.0` ||
|| **TASK_ID***
[`integer`](../../../data-types.md) | Идентификатор задачи, к которой был добавлен комментарий ||
|| **MESSAGE_ID**
[`integer`](../../../data-types.md) | Идентификатор отправленного сообщения в чат задачи, возвращается при активной [новой карточке задач](../../tasks-new.md) с версии модуля `tasks 25.700.0` ||
|#

### Поле IS_ACCESSIBLE_BEFORE {#is_accessible_before}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ACCESSIBLE_BEFORE***
[`string`](../../../data-types.md) | Возможные значения:
- `Y` (Yes) — да
- `N` (No) — нет
- `undefined` — не определено или проверка не производилась ||
|#

### Поле IS_ACCESSIBLE_AFTER {#is_accessible_after}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ACCESSIBLE_AFTER***
[`string`](../../../data-types.md) | Возможные значения:
- `Y` (Yes) — да
- `N` (No) — нет
- `undefined` — не определено или проверка не производилась ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (event.bind returns true on success)
    type EventBindResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<EventBindResult>({
        method: 'event.bind',
        params: {
          event: 'OnTaskCommentAdd',
          handler: 'https://example.com/handler.php',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Event bound successfully:', result)
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
      async function bindTaskCommentAddEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.bind',
            params: {
              event: 'OnTaskCommentAdd',
              handler: 'https://example.com/handler.php',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Event bound successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindTaskCommentAddEvent)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.bind(
            event='OnTaskCommentAdd',
            handler="https://example.com/handler.php",
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
                'event.bind',
                [
                    'event'   => 'OnTaskCommentAdd',
                    'handler' => 'https://example.com/handler.php',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'event.bind',
        {
            "event": "OnTaskCommentAdd",
            "handler": "https://example.com/handler.php"
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.bind',
        [
            'event' => 'OnTaskCommentAdd',
            'handler' => 'https://example.com/handler.php'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-task-comment-update.md)
- [{#T}](./on-task-comment-delete.md)
