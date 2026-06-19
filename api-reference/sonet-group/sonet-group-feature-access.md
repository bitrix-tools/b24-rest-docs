# Проверить права текущего пользователя sonet_group.feature.access

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `sonet_group.feature.access` проверяет, доступна ли текущему пользователю операция в функционале группы или проекта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../data-types.md) | Идентификатор группы или проекта.

Идентификатор можно получить методом [sonet_group.get](./sonet-group-get.md) ||
|| **FEATURE***
[`string`](../data-types.md) | Символьный код функционала группы.

Базовые значения:
- `photo` — фотогалерея
- `calendar` — календарь
- `tasks` — задачи
- `files` — диск
- `blog` — сообщения

Дополнительно могут быть доступны другие значения в зависимости от установленных модулей и обработчиков событий ||
|| **OPERATION***
[`string`](../data-types.md) | Символьный код операции внутри функционала.

Допустимые значения зависят от `FEATURE`:

- для `photo`:
  - `view` — просматривать фотогалерею
  - `write` — изменять фотогалерею
- для `calendar`:
  - `view` — просматривать календарь
  - `write` — изменять календарь
- для `tasks`:
  - `view` — просматривать свои задачи
  - `view_all` — просматривать все задачи
  - `sort` — сортировать и перемещать задачи
  - `create_tasks` — создавать задачи
  - `edit_tasks` — изменять все задачи
  - `delete_tasks` — удалять все задачи
- для `files`:
  - `view` — просматривать файлы
  - `write` — изменять файлы
- для `blog`:
  - `view_post` — просматривать сообщения
  - `premoderate_post` — писать сообщения с премодерацией
  - `write_post` — писать сообщения
  - `moderate_post` — модерировать сообщения
  - `full_post` — управлять сообщениями
  - `view_comment` — просматривать комментарии
  - `premoderate_comment` — писать комментарии с премодерацией
  - `write_comment` — писать комментарии
  - `moderate_comment` — модерировать комментарии
  - `full_comment` — управлять комментариями ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"FEATURE":"blog","OPERATION":"write_post"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.feature.access
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"FEATURE":"blog","OPERATION":"write_post","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.feature.access
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
        method: 'sonet_group.feature.access',
        params: {
          GROUP_ID: 77,
          FEATURE: 'blog',
          OPERATION: 'write_post',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Feature access allowed:', result)
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
      async function checkFeatureAccess() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.feature.access',
            params: {
              GROUP_ID: 77,
              FEATURE: 'blog',
              OPERATION: 'write_post',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Feature access allowed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', checkFeatureAccess)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.feature.access',
                [
                    'GROUP_ID' => 77,
                    'FEATURE' => 'blog',
                    'OPERATION' => 'write_post'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking feature access: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.feature.access',
        {
            GROUP_ID: 77,
            FEATURE: 'blog',
            OPERATION: 'write_post'
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
        'sonet_group.feature.access',
        [
            'GROUP_ID' => 77,
            'FEATURE' => 'blog',
            'OPERATION' => 'write_post'
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
        "start": 1773930920,
        "finish": 1773930920.159131,
        "duration": 0.15913105010986328,
        "processing": 0,
        "date_start": "2026-03-19T17:35:20+03:00",
        "date_finish": "2026-03-19T17:35:20+03:00",
        "operating_reset_at": 1773931520,
        "operating": 0.10687804222106934
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если операция разрешена, иначе `false` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong operation"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong socialnetwork group ID` | Передан некорректный `GROUP_ID` ||
|| — | `Wrong feature` | Передано неподдерживаемое значение `FEATURE` ||
|| — | `Wrong operation` | Передано неподдерживаемое значение `OPERATION` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-user-groups.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
