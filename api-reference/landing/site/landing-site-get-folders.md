# Получить папки сайта landing.site.getFolders

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «просмотр» сайта

Метод `landing.site.getFolders` возвращает список папок сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../types.md) ||
|| **siteId***
[`integer`](../../data-types.md) | Идентификатор сайта, для которого запрашиваются папки.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|| **filter**
[`object`](../../data-types.md) | Фильтр по полям папки [(подробное описание)](#filter) ||
|#

### Параметр filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор папки ||
|| **PARENT_ID**
[`integer`](../../data-types.md) \| `null` | Идентификатор родительской папки. Если передать `0`, `null`, `false` или пустую строку, значение будет приведено к `null`, это выборка папок верхнего уровня ||
|| **INDEX_ID**
[`integer`](../../data-types.md) | Идентификатор индексной страницы папки ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности `Y/N` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления `Y/N` ||
|| **=DELETED**
[`string`](../../data-types.md) | Точное сравнение флага удаления. Если в запросе нет `DELETED` и `=DELETED`, метод автоматически добавляет `=DELETED: "N"` ||
|| **TITLE**
[`string`](../../data-types.md) | Название папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего папку ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего папку ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания папки ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата и время изменения папки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "filter": {
          "PARENT_ID": 0,
          "=DELETED": "N",
          "ACTIVE": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getFolders.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "filter": {
          "PARENT_ID": 0,
          "=DELETED": "N",
          "ACTIVE": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getFolders.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each Folder returned in result[]
    type Folder = {
      ID: string
      PARENT_ID: string | null
      SITE_ID: string
      INDEX_ID: string | null
      ACTIVE: string
      DELETED: string
      TITLE: string
      CODE: string
      CREATED_BY_ID: string
      MODIFIED_BY_ID: string
      DATE_CREATE: string
      DATE_MODIFY: string
    }

    try {
      // landing.site.getFolders returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<Folder[]>({
        method: 'landing.site.getFolders',
        params: {
          siteId: 1817,
          filter: {
            PARENT_ID: 0,
            '=DELETED': 'N',
            ACTIVE: 'Y',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Folders count:', result.length, 'First folder:', result[0])
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
      async function getSiteFolders() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // landing.site.getFolders returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.getFolders',
            params: {
              siteId: 1817,
              filter: {
                PARENT_ID: 0,
                '=DELETED': 'N',
                ACTIVE: 'Y',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Folders count:', result.length, 'First folder:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSiteFolders)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.getFolders',
                [
                    'siteId' => 1817,
                    'filter' => [
                        'PARENT_ID' => 0,
                        '=DELETED' => 'N',
                        'ACTIVE' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting folders: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getFolders',
        {
            siteId: 1817,
            filter: {
                PARENT_ID: 0,
                '=DELETED': 'N',
                ACTIVE: 'Y'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.getFolders',
        [
            'siteId' => 1817,
            'filter' => [
                'PARENT_ID' => 0,
                '=DELETED' => 'N',
                'ACTIVE' => 'Y',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": "9",
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "тест переноса страниц",
            "CODE": "change",
            "CREATED_BY_ID": "1",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "11/12/2021 08:39:53 pm",
            "DATE_MODIFY": "12/28/2021 03:04:04 pm"
        },
        {
            "ID": "33",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": null,
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "mobile",
            "CODE": "mobile",
            "CREATED_BY_ID": "29",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "12/08/2021 10:23:37 am",
            "DATE_MODIFY": "12/08/2021 10:24:48 am"
        },
        {
            "ID": "3",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": "45",
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "вложение 1",
            "CODE": "vlozhenie1",
            "CREATED_BY_ID": "1",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "11/12/2021 08:39:53 pm",
            "DATE_MODIFY": "12/03/2021 08:10:21 am"
        }
    ],
    "time": {
        "start": 1773257990,
        "finish": 1773257990.091689,
        "duration": 0.0916891098022461,
        "processing": 0,
        "date_start": "2026-03-11T22:39:50+03:00",
        "date_finish": "2026-03-11T22:39:50+03:00",
        "operating_reset_at": 1773258590,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список папок сайта [(подробное описание)](#folder). Метод может вернуть `result: []` без ошибки, если в сайте нет папок или у пользователя нет права «просмотр» для указанного сайта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект folder {#folder}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор папки ||
|| **PARENT_ID**
[`string`](../../data-types.md) \| `null` | Идентификатор родительской папки ||
|| **SITE_ID**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **INDEX_ID**
[`string`](../../data-types.md) \| `null` | Идентификатор индексной страницы папки ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности `Y/N` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления `Y/N` ||
|| **TITLE**
[`string`](../../data-types.md) | Название папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки ||
|| **CREATED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, создавшего папку ||
|| **MODIFIED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, изменившего папку ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата и время создания в строковом формате ||
|| **DATE_MODIFY**
[`string`](../../data-types.md) | Дата и время изменения в строковом формате ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: siteId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `siteId` ||
|| `ACCESS_DENIED` | Недостаточно общих прав для вызова методов landing ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add-folder.md)
- [{#T}](./landing-site-update-folder.md)
- [{#T}](./landing-site-mark-folder-delete.md)
- [{#T}](./landing-site-mark-folder-undelete.md)
- [{#T}](./landing-site-publication-folder.md)
- [{#T}](./landing-site-unpublic-folder.md)
