# Изменить владельца группы или проекта sonet_group.setowner

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: владелец группы или проекта

Метод `sonet_group.setowner` назначает нового владельца рабочей группы или проекта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../data-types.md) | Идентификатор группы или проекта.

Идентификатор можно получить методом [sonet_group.get](./sonet-group-get.md) ||
|| **USER_ID***
[`integer`](../data-types.md) | Идентификатор нового владельца.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"USER_ID":1269}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.setowner
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"USER_ID":1269,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.setowner
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
        method: 'sonet_group.setowner',
        params: {
          GROUP_ID: 77,
          USER_ID: 1269,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Owner changed:', result)
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
      async function setGroupOwner() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.setowner',
            params: {
              GROUP_ID: 77,
              USER_ID: 1269,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Owner changed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setGroupOwner)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.setowner',
                [
                    'GROUP_ID' => 77,
                    'USER_ID' => 1269
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting group owner: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.setowner',
        {
            GROUP_ID: 77,
            USER_ID: 1269
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
        'sonet_group.setowner',
        [
            'GROUP_ID' => 77,
            'USER_ID' => 1269
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
        "start": 1773810300,
        "finish": 1773810300.3341,
        "duration": 0.3341,
        "processing": 0.1503,
        "date_start": "2026-03-18T08:45:00+03:00",
        "date_finish": "2026-03-18T08:45:00+03:00",
        "operating_reset_at": 1773810900,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если владелец изменен ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "User has no permissions to set owner"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Invalid workgroup/project ID` | Передан неверный `GROUP_ID` или группа/проект не найдены ||
|| — | `Invalid user ID` | Передан неверный `USER_ID` ||
|| — | `Insufficient permissions to complete the operation.` | Недостаточно прав для смены владельца ||
|| — | `Cannot complete operation.` | Не удалось выполнить смену владельца ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-update.md)
- [{#T}](./sonet-group-user-groups.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
