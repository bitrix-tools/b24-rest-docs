# Изменить роль участников группы sonet_group.user.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sonet_group.user.update` изменяет роль участников рабочей группы или проекта.

Для смены владельца используйте метод [sonet_group.setowner](../sonet-group-setowner.md)

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить методом [sonet_group.get](../sonet-group-get.md) ||
|| **USER_ID***
[`integer/array`](../../data-types.md) | Идентификатор участника.

Идентификатор можно получить с помощью метода [sonet_group.user.get](./sonet-group-user-get.md) ||
|| **ROLE***
[`string`](../../data-types.md) | Код новой роли участника.

Возможные значения:
- `E` — модератор
- `K` — участник
||
|#

{% note info "" %}

Роль пользователя не будет обновлена, если пользователь является владельцем группы или проекта

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272],"ROLE":"E"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272],"ROLE":"E","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.update
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
        method: 'sonet_group.user.update',
        params: {
          GROUP_ID: 69,
          USER_ID: [1271, 1272],
          ROLE: 'E',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated user IDs:', result)
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
      async function updateGroupUsersRole() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.user.update',
            params: {
              GROUP_ID: 69,
              USER_ID: [1271, 1272],
              ROLE: 'E',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated user IDs:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateGroupUsersRole)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.user.update',
                [
                    'GROUP_ID' => 69,
                    'USER_ID' => [1271, 1272],
                    'ROLE' => 'E'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating group users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.update',
        {
            GROUP_ID: 69,
            USER_ID: [1271],
            ROLE: 'E'
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
        'sonet_group.user.update',
        [
            'GROUP_ID' => 69,
            'USER_ID' => [1271, 1272],
            'ROLE' => 'E'
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
    "result": ["1271", "1272"],
    "time": {
        "start": 1773810360,
        "finish": 1773810360.6451,
        "duration": 0.6451,
        "processing": 0.3112,
        "date_start": "2026-03-18T08:46:00+03:00",
        "date_finish": "2026-03-18T08:46:00+03:00",
        "operating_reset_at": 1773810960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, для которых роль успешно обновлена.

Пустой массив означает, что была попытка поменять роль владельца группы или проекта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Incorrect role code"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `No permissions to update users role` | Недостаточно прав для изменения роли участников ||
|| — | `Incorrect role code` | Передано неподдерживаемое значение `ROLE` ||
|| — | `Wrong user IDs` | Передан пустой или некорректный `USER_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект с указанным `GROUP_ID` не найдены ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-user-invite.md)
- [{#T}](./sonet-group-user-request.md)
- [{#T}](./sonet-group-user-add.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
