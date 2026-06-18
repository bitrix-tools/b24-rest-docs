# Добавить папку в сайт landing.site.addFolder

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.site.addFolder` создает папку в указанном сайте и возвращает идентификатор созданной папки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../types.md) ||
|| **siteId***
[`integer`](../../data-types.md) | Идентификатор сайта, в котором нужно создать папку.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей создаваемой папки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../data-types.md) | Название папки, максимальная длина `255` символов ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки для URL, максимальная длина `255` символов. Если не передан или пустой, код создается из `TITLE` транслитерацией. 

Если после транслитерации код пустой, создается случайная строка длиной `12` символов ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительской папки. Если значение `0`, `null` или пустое, папка создается в корне сайта ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности папки `Y/N`, по умолчанию `N` ||
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
        "fields": {
          "TITLE": "Новая папка",
          "CODE": "new-folder",
          "ACTIVE": "Y",
          "PARENT_ID": 736
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.addFolder.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "fields": {
          "TITLE": "Новая папка",
          "CODE": "new-folder",
          "ACTIVE": "Y",
          "PARENT_ID": 736
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.addFolder.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'landing.site.addFolder',
        params: {
          siteId: 1817,
          fields: {
            TITLE: 'New folder',
            CODE: 'new-folder',
            ACTIVE: 'Y',
            PARENT_ID: 736,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created folder ID:', result)
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
      async function addFolder() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.addFolder',
            params: {
              siteId: 1817,
              fields: {
                TITLE: 'New folder',
                CODE: 'new-folder',
                ACTIVE: 'Y',
                PARENT_ID: 736,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created folder ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addFolder)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.addFolder',
                [
                    'siteId' => 1817,
                    'fields' => [
                        'TITLE' => 'Новая папка',
                        'CODE' => 'new-folder',
                        'ACTIVE' => 'Y',
                        'PARENT_ID' => 736,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.addFolder',
        {
            siteId: 1817,
            fields: {
                TITLE: 'Новая папка',
                CODE: 'new-folder',
                ACTIVE: 'Y',
                PARENT_ID: 736
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
        'landing.site.addFolder',
        [
            'siteId' => 1817,
            'fields' => [
                'TITLE' => 'Новая папка',
                'CODE' => 'new-folder',
                'ACTIVE' => 'Y',
                'PARENT_ID' => 736,
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
    "result": 89,
    "time": {
        "start": 1773169396,
        "finish": 1773169396.875899,
        "duration": 0.875899076461792,
        "processing": 0,
        "date_start": "2026-03-10T22:03:16+03:00",
        "date_finish": "2026-03-10T22:03:16+03:00",
        "operating_reset_at": 1773169996,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданной папки ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Сайт не найден или доступ к нему запрещен."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Сайт не найден или доступ к нему запрещен ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле, например `TITLE` или `CODE` ||
|| `FOLDER_IS_NOT_UNIQUE` | С таким именем уже определена папка. Ошибка возникает при конфликте `CODE` в пределах сайта и родительской папки ||
|| `SLASH_IS_NOT_ALLOWED` | В `fields.CODE` передан символ `/` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-update-folder.md)
- [{#T}](./landing-site-get-folders.md)
- [{#T}](./landing-site-mark-folder-delete.md)
