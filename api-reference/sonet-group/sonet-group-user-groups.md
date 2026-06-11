# Получить список групп текущего пользователя sonet_group.user.groups

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `sonet_group.user.groups` возвращает группы и проекты, в которых состоит текущий пользователь.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.groups
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.groups
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each UserGroupItem returned in result[]
    type UserGroupItem = {
      GROUP_ID: string
      GROUP_NAME: string
      ROLE: string
      GROUP_IMAGE_ID: string | null
      GROUP_IMAGE: string
      IS_EXTRANET?: string
    }

    try {
      // sonet_group.user.groups returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserGroupItem[]>({
        method: 'sonet_group.user.groups',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User groups count:', result.length, result)
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
      async function getUserGroups() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sonet_group.user.groups returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.user.groups',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('User groups count:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUserGroups)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.user.groups',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving user groups: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.user.groups',
        {}, 
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
        'sonet_group.user.groups',
        []
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
    "result": [
        {
        "GROUP_ID": "77",
        "GROUP_NAME": "Новый заголовок проекта",
        "ROLE": "K",
        "GROUP_IMAGE_ID": null,
        "GROUP_IMAGE": ""
        },
        {
        "GROUP_ID": "79",
        "GROUP_NAME": "Скрам-проект",
        "ROLE": "A",
        "GROUP_IMAGE_ID": null,
        "GROUP_IMAGE": ""
        }
    ],
    "time": {
        "start": 1773927027,
        "finish": 1773927028.025164,
        "duration": 1.0251638889312744,
        "processing": 1,
        "date_start": "2026-03-19T16:30:27+03:00",
        "date_finish": "2026-03-19T16:30:28+03:00",
        "operating_reset_at": 1773927627,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив групп текущего пользователя.

Пустой массив означает, что пользователь не состоит ни в одной группе или проекте ||
|| **GROUP_ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **GROUP_NAME**
[`string`](../data-types.md) | Название группы ||
|| **ROLE**
[`string`](../data-types.md) | Роль текущего пользователя.

Возможные значения:
- `A` — владелец
- `E` — модератор
- `K` — участник ||
|| **GROUP_IMAGE_ID**
[`string`](../data-types.md) | Идентификатор аватара группы ||
|| **GROUP_IMAGE**
[`string`](../data-types.md) | URL аватара группы ||
|| **IS_EXTRANET**
[`string`](../data-types.md) | Признак экстранет-группы.

Поле возвращается только для экстранет-групп:
- `Y` — экстранет-группа ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./members/index.md)
