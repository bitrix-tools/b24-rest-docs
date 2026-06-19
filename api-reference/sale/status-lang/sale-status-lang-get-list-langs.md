# Получить список языков для локализации sale.statusLang.getListLangs

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список возможных языков для локализаций.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.statuslang.getlistlangs
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.statuslang.getlistlangs
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetListLangsResult = {
      langs: Array<{
        active: string
        lid: string
        name: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<GetListLangsResult>({
        method: 'sale.statuslang.getlistlangs',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Languages:', result.langs.map(lang => `${lang.lid}: ${lang.name}`))
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
      async function getListLangs() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.statuslang.getlistlangs',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Languages:', result.langs.map(lang => `${lang.lid}: ${lang.name}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getListLangs)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.statuslang.getlistlangs',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting list of languages for sale status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.statuslang.getlistlangs',
        {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.statuslang.getlistlangs',
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
    "result":{
        "langs":[
            {
                "active":"Y",
                "lid":"ar",
                "name":"\u0639\u0631\u0628\u064a"
            },
            {
                "active":"Y",
                "lid":"br",
                "name":"Portugu\u00eas (Brasil)"
            },
            {
                "active":"Y",
                "lid":"de",
                "name":"Deutsch"
            },
            {
                "active":"Y",
                "lid":"en",
                "name":"English"
            },
            {
                "active":"Y",
                "lid":"fr",
                "name":"Fran\u00e7ais"
            },
            {
                "active":"Y",
                "lid":"hi",
                "name":"\u0939\u093f\u0928\u094d\u0926\u0940"
            },
            {
                "active":"Y",
                "lid":"id",
                "name":"Bahasa Indonesia"
            },
            {
                "active":"Y",
                "lid":"in",
                "name":"English (India)"
            },
            {
                "active":"Y",
                "lid":"it",
                "name":"Italiano"
            },
            {
                "active":"Y",
                "lid":"ja",
                "name":"\u65e5\u672c\u8a9e"
            },
            {
                "active":"Y",
                "lid":"la",
                "name":"Espa\u00f1ol"
            },
            {
                "active":"Y",
                "lid":"ms",
                "name":"Bahasa Melayu"
            },
            {
                "active":"Y",
                "lid":"pl",
                "name":"Polski"
            },
            {
                "active":"Y",
                "lid":"ru",
                "name":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439"
            },
            {
                "active":"Y",
                "lid":"sc",
                "name":"\u4e2d\u6587\uff08\u7b80\u4f53\uff09"
            },
            {
                "active":"Y",
                "lid":"tc",
                "name":"\u4e2d\u6587\uff08\u7e41\u9ad4\uff09"
            },
            {
                "active":"Y",
                "lid":"th",
                "name":"\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22"
            },
            {
                "active":"Y",
                "lid":"tr",
                "name":"T\u00fcrk\u00e7e"
            },
            {
                "active":"Y",
                "lid":"ua",
                "name":"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430"
            },
            {
                "active":"Y",
                "lid":"vn",
                "name":"Ti\u1ebfng Vi\u1ec7t"
            }
        ]
    },
    "total":20,
    "time":{
        "start":1712230480.81481,
        "finish":1712230480.8460569,
        "duration":0.03124690055847168,
        "processing":0.0043120384216308594,
        "date_start":"2024-04-04T14:34:40+03:00",
        "date_finish":"2024-04-04T14:34:40+03:00",
        "operating_reset_at":1712231080,
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **langs**
[`sale_lang[]`](../data-types.md) | Массив объектов с информацией о выбранных языках ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения списка возможных языков для локализаций ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-status-lang-add.md)
- [{#T}](./sale-status-lang-list.md)
- [{#T}](./sale-status-lang-delete-by-filter.md)
- [{#T}](./sale-status-lang-get-fields.md)