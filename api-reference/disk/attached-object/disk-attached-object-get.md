# Получить информацию о прикрепленном файле disk.attachedObject.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного файла

Метод `disk.attachedObject.get` возвращает информацию о прикрепленном файле. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор записи о прикреплении файла, то есть связи, которая соединяет файл диска [с другими объектами](../index.md#diskconnection).

Чтобы получить идентификатор связи, используйте методы, которые возвращают прикрепленные файлы. Например, если файл прикреплен к задаче, то узнать идентификатор связи можно с помощью метода [tasks.task.get](../../tasks/tasks-task-get.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":495}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.attachedObject.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":495,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.attachedObject.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AttachedObjectResult = {
      ID: string
      OBJECT_ID: string
      MODULE_ID: string
      ENTITY_TYPE: string
      ENTITY_ID: string
      CREATE_TIME: ISODate | null
      CREATED_BY: string
      DOWNLOAD_URL: string
      NAME: string
      SIZE: string
    }

    try {
      const response = await $b24.actions.v2.call.make<AttachedObjectResult>({
        method: 'disk.attachedObject.get',
        params: {
          id: 495,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Attached file:', result.NAME, 'size:', result.SIZE, 'entity:', result.ENTITY_TYPE)
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
      async function getAttachedObject() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'disk.attachedObject.get',
            params: {
              id: 495,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Attached file:', result.NAME, 'size:', result.SIZE, 'entity:', result.ENTITY_TYPE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAttachedObject)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.attachedObject.get',
                [
                    'id' => 495
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving attached object: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'disk.attachedObject.get',
        {
            id: 495
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
        'disk.attachedObject.get',
        [
            'id' => 495
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
        "ID": "495",
        "OBJECT_ID": "8903",
        "MODULE_ID": "tasks",
        "ENTITY_TYPE": "tasks_task",
        "ENTITY_ID": "3845",
        "CREATE_TIME": "2025-12-23T10:31:24+03:00",
        "CREATED_BY": "1269",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/bitrix/tools/disk/uf.php?attachedId=495&auth[auth]=d78a4a690000071b006e2cf2000004f5000007746b9ad166e1b9bd67b8848714afc5a7&action=download&ncc=1",
        "NAME": "Picture.png",
        "SIZE": "52486"
    },
    "time": {
        "start": 1766489404,
        "finish": 1766489404.720053,
        "duration": 0.72005295753479,
        "processing": 0,
        "date_start": "2025-12-23T11:30:04+03:00",
        "date_finish": "2025-12-23T11:30:04+03:00",
        "operating_reset_at": 1766490004,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными прикрепленного файла ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор записи о прикреплении файла ||
|| **OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Модуль, в котором используется файл ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип привязанного объекта ||
|| **ENTITY_ID**
[`integer`](../../data-types.md) | Идентификатор элемента, к которому прикреплен файл ||
|| **CREATE_TIME**
[`string`](../../data-types.md) | Время создания привязки ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который прикрепил файл||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_NOT_FOUND",
    "error_description":"Could not find entity with id `X`"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Прикрепленный файл с указанным `id` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав на чтение прикрепленного файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-upload-file-to-task.md)