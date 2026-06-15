# Получить список включаемых областей для страницы landing.template.getLandingRef

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.template.getLandingRef` получает список включаемых областей, которые привязаны к странице.

В ответ входят только привязки, сохраненные для страницы. Привязки, которые настроены на уровне сайта, метод не возвращает. Чтобы получить их, используйте метод [landing.template.getSiteRef](./landing-template-get-site-ref.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../page/methods/landing-landing-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 557
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.template.getLandingRef.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 557,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.template.getLandingRef.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type LandingRefResult = Record<string, number> | true

    try {
      const response = await $b24.actions.v2.call.make<LandingRefResult>({
        method: 'landing.template.getLandingRef',
        params: {
          id: 557,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (result === true) {
          console.info('No landing refs configured')
        } else {
          console.info('Landing refs:', result, 'Area count:', Object.keys(result).length)
        }
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
      async function getLandingRef() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.template.getLandingRef',
            params: {
              id: 557,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          if (result === true) {
            console.info('No landing refs configured')
          } else {
            console.info('Landing refs:', result, 'Area count:', Object.keys(result).length)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLandingRef)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.template.getLandingRef',
                [
                    'id' => 557,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting landing refs: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.getLandingRef',
        {
            id: 557
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
        'landing.template.getLandingRef',
        [
            'id' => 557,
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

Если для страницы настроены включаемые области, метод вернет объект со списком этих привязок. В нем для каждой области указан идентификатор страницы, которая к ней привязана.

Если для страницы не сохранены привязки включаемых областей, метод возвращает `true`.

```json
{
    "result": {
        "1": 614,
        "2": 615,
        "3": 616
    },
    "time": {
        "start": 1774765200,
        "finish": 1774765200.411258,
        "duration": 0.4112579822540283,
        "processing": 0,
        "date_start": "2026-03-29T10:00:00+03:00",
        "date_finish": "2026-03-29T10:00:00+03:00",
        "operating_reset_at": 1774765800,
        "operating": 0
    }
}
```

```json
{
    "result": true,
    "time": {
        "start": 1774874736,
        "finish": 1774874736.085915,
        "duration": 0.08591508865356445,
        "processing": 0,
        "date_start": "2026-03-30T15:45:36+03:00",
        "date_finish": "2026-03-30T15:45:36+03:00",
        "operating_reset_at": 1774875336,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) \| [`boolean`](../../data-types.md) | Привязки включаемых областей страницы в формате `{"<ID_ОБЛАСТИ>": <ID_СТРАНИЦЫ>}`.

Если для страницы сохранены привязки, метод возвращает объект. Если привязок нет, метод возвращает `true` [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **<ID_ОБЛАСТИ>**
[`integer`](../../data-types.md) | Идентификатор включаемой области шаблона. Значение по этому ключу содержит идентификатор страницы, назначенной в эту область ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITY_NOT_FOUND",
    "error_description": "Сущность не найдена"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ENTITY_NOT_FOUND` | Страница не найдена или недоступна ||
|| `ACCESS_DENIED` | Недостаточно прав для просмотра сайта||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-template-get-site-ref.md)
- [{#T}](./landing-template-get-list.md)
- [{#T}](./landing-template-set-landing-ref.md)
- [{#T}](./landing-template-set-site-ref.md)
