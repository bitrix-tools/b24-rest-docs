# Пригласить пользователей в группу sonet_group.user.invite

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Приглашать в группу или проект

Метод `sonet_group.user.invite` отправляет приглашения пользователям в рабочую группу или проект.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить с помощью метода [sonet_group.get](../sonet-group-get.md) ||
|| **USER_ID***
[`integer/array`](../../data-types.md) | Идентификатор пользователя.

Идентификатор можно получить с помощью метода [user.get](../../user/user-get.md) ||
|| **MESSAGE**
[`string`](../../data-types.md) | Текст приглашения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":1271,"MESSAGE":"Присоединяйтесь к проекту"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.invite
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":1271,"MESSAGE":"Присоединяйтесь к проекту","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.invite
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<string[]>({
        method: 'sonet_group.user.invite',
        params: {
          GROUP_ID: 69,
          USER_ID: 1271,
          MESSAGE: 'Join the project',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Invited user IDs:', result)
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
      async function inviteGroupUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.user.invite',
            params: {
              GROUP_ID: 69,
              USER_ID: 1271,
              MESSAGE: 'Join the project',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Invited user IDs:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', inviteGroupUser)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.user.invite',
                [
                    'GROUP_ID' => 69,
                    'USER_ID' => 1271,
                    'MESSAGE' => 'Присоединяйтесь к проекту'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error inviting user to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.invite',
        {
            GROUP_ID: 69,
            USER_ID: 1271,
            MESSAGE: 'Присоединяйтесь к проекту'
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
        'sonet_group.user.invite',
        [
            'GROUP_ID' => 69,
            'USER_ID' => 1271,
            'MESSAGE' => 'Присоединяйтесь к проекту'
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
    "result": ["1271"],
    "time": {
        "start": 1773846932,
        "finish": 1773846933.077318,
        "duration": 1.0773179531097412,
        "processing": 0,
        "date_start": "2026-03-18T18:15:32+03:00",
        "date_finish": "2026-03-18T18:15:33+03:00",
        "operating_reset_at": 1773847533,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, которые были успешно приглашены.

Пустой массив означает, что не удалось пригласить ни одного из переданных пользователей. Например, пользователь уже состоит в группе или у текущего пользователя нет прав на приглашение ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong user IDs"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `Wrong user IDs` | Передан пустой или некорректный `USER_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект не найдены или недоступны текущему пользователю ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-user-request.md)
- [{#T}](./sonet-group-user-add.md)
- [{#T}](./sonet-group-user-update.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
