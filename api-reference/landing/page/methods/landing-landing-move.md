# Переместить страницу landing.landing.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «редактирование» и «удаление» на сайте

Метод `landing.landing.move` перемещает страницу в другой сайт или папку. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, которую нужно переместить.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|| **toSiteId**
[`integer`](../../../data-types.md) | Идентификатор сайта назначения.

Если параметр не передан или равен `0`, используется текущий сайт страницы.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **toFolderId**
[`integer`](../../../data-types.md) | Идентификатор папки назначения в целевом сайте.

Если параметр не передан или равен `0`, страница переносится в корень целевого сайта.

Если переносите страницу в папку, эта папка должна относиться к тому же сайту. Сразу перенести страницу в другой сайт и в папку этого сайта нельзя — метод вернет ошибку. В таком случае сначала перенесите страницу в нужный сайт, а потом отдельным вызовом — в нужную папку.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 2227,
        "toSiteId": 157,
        "toFolderId": 95
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.move.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 2227,
        "toSiteId": 157,
        "toFolderId": 95,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.move.json"
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
        method: 'landing.landing.move',
        params: {
          lid: 2227,
          toSiteId: 157,
          toFolderId: 95,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Page moved successfully:', result)
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
      async function moveLandingPage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.move',
            params: {
              lid: 2227,
              toSiteId: 157,
              toFolderId: 95,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Page moved successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveLandingPage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.move',
                [
                    'lid' => 2227,
                    'toSiteId' => 157,
                    'toFolderId' => 95,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.move',
        {
            lid: 2227,
            toSiteId: 157,
            toFolderId: 95
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
        'landing.landing.move',
        [
            'lid' => 2227,
            'toSiteId' => 157,
            'toFolderId' => 95,
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
    "result": true,
    "time": {
        "start": 1773789756,
        "finish": 1773789756.4837,
        "duration": 0.4837000370025635,
        "processing": 0,
        "date_start": "2026-03-18T02:22:36+03:00",
        "date_finish": "2026-03-18T02:22:36+03:00",
        "operating_reset_at": 1773790356,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат переноса. При успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FOLDER_NOT_FOUND",
    "error_description": "Папка не найдена"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена, удалена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Недостаточно прав на изменение целевого сайта ||
|| `DELETE_ACCESS_DENIED` | Недостаточно прав на удаление исходной страницы ||
|| `FOLDER_NOT_FOUND` | Целевая папка не найдена или недоступна для проверки. Эта ошибка также возникает, если в одном вызове одновременно сменить сайт страницы и передать папку другого сайта ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-update.md)
