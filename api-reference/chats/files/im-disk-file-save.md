# Сохранить файл на свой диск im.disk.file.save

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.disk.file.save` сохраняет файл из чата на личный диск пользователя.

Файл сохраняется в папку *Сохраненные файлы*. Если папки нет, система создаст ее автоматически.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILE_ID***
[`integer`](../../data-types.md) | Идентификатор файла ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FILE_ID":5155}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.disk.file.save
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FILE_ID":5155,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.disk.file.save
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FileSaveResult = {
      folder: {
        id: number
        name: string
      }
      file: {
        id: number
        name: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<FileSaveResult>({
        method: 'im.disk.file.save',
        params: {
          FILE_ID: 5155,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.folder, result.file)
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
      async function saveFileToDisk() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.disk.file.save',
            params: {
              FILE_ID: 5155,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.folder, result.file)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', saveFileToDisk)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.disk.file.save',
                [
                    'FILE_ID' => 5155,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.disk.file.save',
        {
            FILE_ID: 5155
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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
        'im.disk.file.save',
        [
            'FILE_ID' => 5155,
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
        "folder": {
            "id": 4821,
            "name": "Сохраненные файлы"
        },
        "file": {
            "id": 5159,
            "name": "image.jpg"
        }
    },
    "time": {
        "start": 1772193101,
        "finish": 1772193101.625023,
        "duration": 0.6250228881835938,
        "processing": 0,
        "date_start": "2026-02-27T14:51:41+03:00",
        "date_finish": "2026-02-27T14:51:41+03:00",
        "operating_reset_at": 1772193701,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.folder**
[`object`](../../data-types.md) | Папка *Сохраненные файлы* на личном диске [(подробное описание)](#folder) ||
|| **result.file**
[`object`](../../data-types.md) | Сохраненный файл [(подробное описание)](#file) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект folder {#folder}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор папки ||
|| **name**
[`string`](../../data-types.md) | Название папки — *Сохраненные файлы* ||
|#

### Объект file {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сохраненного файла ||
|| **name**
[`string`](../../data-types.md) | Название сохраненного файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FILE_ID_EMPTY",
    "error_description": "File ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `FILE_ID_EMPTY` | File ID can't be empty | Не передан или передан пустым обязательный параметр `FILE_ID` ||
|| `400` | `FILE_SAVE_ERROR` | File ID can't be saved | Возможные причины:
- у пользователя нет доступа к чату, из которого нужно сохранить файл
- указанный файл не найден
- Диск отлючен
- не удалось сохранить файл в папку *Сохраненные файлы*, например, при отсутствии места
- не удалось создать папку *Сохраненные файлы* ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-disk-file-commit.md)
- [{#T}](./im-disk-file-delete.md)
- [{#T}](./im-disk-folder-get.md)
