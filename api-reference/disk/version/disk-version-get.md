# Получить версию файла disk.version.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного файла

Метод `disk.version.get` возвращает версию файла.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../data-types.md) | Идентификатор версии файла.

Идентификатор можно получить с помощью метода [disk.file.getVersions](../file/disk-file-get-versions.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7169}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.version.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7169,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.version.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DiskVersionGetResult = {
      ID: string
      OBJECT_ID: string
      SIZE: string
      NAME: string
      GLOBAL_CONTENT_VERSION: string
      CREATE_TIME: ISODate
      CREATED_BY: string
      DOWNLOAD_URL: string
    }

    try {
      const response = await $b24.actions.v2.call.make<DiskVersionGetResult>({
        method: 'disk.version.get',
        params: {
          id: 7169,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Version:', result.ID, 'File:', result.NAME, 'Size:', result.SIZE, 'Created:', result.CREATE_TIME)
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
      async function getVersion() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'disk.version.get',
            params: {
              id: 7169,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Version:', result.ID, 'File:', result.NAME, 'Size:', result.SIZE, 'Created:', result.CREATE_TIME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getVersion)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.version.get',
                [
                    'id' => 7169
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching disk version: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'disk.version.get',
        {
            id: 7169
        },
        function (result) {
            if (result.error()) {
                console.error(result.error());
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
        'disk.version.get',
        [
            'id' => 7169
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
    "result": {
        "ID": "7169",
        "OBJECT_ID": "8903",
        "SIZE": "52486",
        "NAME": "Picture.png",
        "GLOBAL_CONTENT_VERSION": "1",
        "CREATE_TIME": "2025-12-23T10:30:01+03:00",
        "CREATED_BY": "1269",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=b79c4a690000071b006e2cf2000004f50000076312db694aabed7ccf9e3d4fd1b992e3&token=disk%7CaWQ9NzE2OSZzZXJ2aWNlPXZlcnNpb24mXz0xR2VaZDdER2RBZW1WbU8xc0swSGRxYzVBclhJU0pYcQ%3D%3D%7CImRvd25sb2FkfGRpc2t8YVdROU56RTJPU1p6WlhKMmFXTmxQWFpsY25OcGIyNG1YejB4UjJWYVpEZEVSMlJCWlcxV2JVOHhjMHN3U0dSeFl6VkJjbGhKVTBwWWNRPT18Yjc5YzRhNjkwMDAwMDcxYjAwNmUyY2YyMDAwMDA0ZjUwMDAwMDc2MzEyZGI2OTRhYWJlZDdjY2Y5ZTNkNGZkMWI5OTJlMyI%3D.MCpHhZb32NO7IClkN44tbm%2FkyPM%2F4ZJ1P2uaMEPo0As%3D"
    },
    "time": {
        "start": 1766496433,
        "finish": 1766496433.618999,
        "duration": 0.6189990043640137,
        "processing": 0,
        "date_start": "2025-12-23T14:27:13+03:00",
        "date_finish": "2025-12-23T14:27:13+03:00",
        "operating_reset_at": 1766497033,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с данными о версии ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор версии ||
|| **OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор файла, к которому принадлежит версия ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер версии в байтах ||
|| **NAME**
[`string`](../../data-types.md) | Название файла на момент создания версии ||
|| **GLOBAL_CONTENT_VERSION**
[`integer`](../../data-types.md) | Инкрементальный счетчик версии файла ||
|| **CREATE_TIME**
[`string`](../../data-types.md) | Время создания версии ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал версию ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка на скачивание версии ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_ARGUMENT",
    "error_description":"Invalid value of parameter `id`"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter `id` | Параметр `id` не передан или имеет недопустимый тип ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Версия с указанным `id` не найдена ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав на чтение файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-upload-file-to-task.md)