# Проверить контент на опасные подстроки landing.repo.checkContent

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.checkContent` проверяет контент через санитайзер.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **content**^*^
[`string`](../../data-types.md) | Контент для проверки ||
|| **splitter**
[`string`](../../data-types.md) | Разделитель, которым помечаются опасные фрагменты в `content`.

По умолчанию: `#SANITIZE#` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример проверки контента, где:
- `content` — проверяемый HTML
- `splitter` — строка-маркер опасных фрагментов

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "content": "<div style=\"color:red\" onclick=\"alert(1)\"><iframe src=\"//evil.com\"></iframe></div>",
        "splitter": "#AAA#"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.repo.checkContent.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "content": "<div style=\"color:red\" onclick=\"alert(1)\"><iframe src=\"//evil.com\"></iframe></div>",
        "splitter": "#AAA#",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.repo.checkContent.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CheckContentResult = {
      is_bad: boolean
      content: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CheckContentResult>({
        method: 'landing.repo.checkContent',
        params: {
          content: '<div style="color:red" onclick="alert(1)"><iframe src="//evil.com"></iframe></div>',
          splitter: '#AAA#',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Is bad content:', result.is_bad, '| Sanitized content:', result.content)
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
      async function checkContent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.checkContent',
            params: {
              content: '<div style="color:red" onclick="alert(1)"><iframe src="//evil.com"></iframe></div>',
              splitter: '#AAA#',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Is bad content:', result.is_bad, '| Sanitized content:', result.content)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', checkContent)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.checkContent',
                [
                    'content' => '<div style="color:red" onclick="alert(1)"><iframe src="//evil.com"></iframe></div>',
                    'splitter' => '#AAA#',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.checkContent',
        {
            content: '<div style="color:red" onclick="alert(1)"><iframe src="//evil.com"></iframe></div>',
            splitter: '#AAA#'
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
        'landing.repo.checkContent',
        [
            'content' => '<div style="color:red" onclick="alert(1)"><iframe src="//evil.com"></iframe></div>',
            'splitter' => '#AAA#',
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
    "result": {
        "is_bad": true,
        "content": "\u003Cdiv style=\u0022color:red\u0022 oncl#AAA#ick=\u0022alert(1)\u0022\u003E\u003Cifr#AAA#ame src=\u0022\/\/evil.com\u0022\u003E\u003C\/iframe\u003E\u003C\/div\u003E"
    },
    "time": {
        "start": 1774952664,
        "finish": 1774952665.017161,
        "duration": 1.0171608924865723,
        "processing": 0,
        "date_start": "2026-03-31T13:24:24+03:00",
        "date_finish": "2026-03-31T13:24:25+03:00",
        "operating_reset_at": 1774953265,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат проверки [подробнее](#result-data) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип result {#result-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **is_bad**
[`boolean`](../../data-types.md) | Признак наличия опасных фрагментов в контенте ||
|| **content**
[`string`](../../data-types.md) | Контент после обработки санитайзером ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument 'content' has an invalid type",
    "argument": "content"
}
```

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: content | Вызов метода без `content` ||
|| `ERROR_ARGUMENT` | The value of an argument 'content' has an invalid type | Параметр `content` передан в неверном типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|| `insufficient_scope` | Недостаточно scope у токена | Токен не содержит scope `landing` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-repo-register.md)
- [{#T}](./landing-repo-get-list.md)
- [{#T}](./landing-repo-unregister.md)
- [{#T}](./index.md)
