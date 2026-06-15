# Опубликовать страницу landing.landing.publication

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «публикации» сайта

Метод `landing.landing.publication` публикует страницу и делает ее активной.

Если страница находится в папке, метод опубликует эту папку и все родительские папки. После этого сайт станет активным.

Для страниц Базы знаний метод управляет видимостью страницы: делает ее доступной или скрытой для пользователей. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.publication.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.publication.json"
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
        method: 'landing.landing.publication',
        params: {
          lid: 351,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Publication result:', result)
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
      async function publishLandingPage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.publication',
            params: {
              lid: 351,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Publication result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', publishLandingPage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.publication',
                [
                    'lid' => 351,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error publishing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.publication',
        {
            lid: 351
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
        'landing.landing.publication',
        [
            'lid' => 351,
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
        "start": 1773794655,
        "finish": 1773794655.622698,
        "duration": 0.6226980686187744,
        "processing": 0,
        "date_start": "2026-03-18T03:44:15+03:00",
        "date_finish": "2026-03-18T03:44:15+03:00",
        "operating_reset_at": 1773795255,
        "operating": 0.2789781093597412
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат публикации. При успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена: в `lid` передан идентификатор несуществующей, удалённой или недоступной страницы. Для страниц Базы знаний, групп и вайба убедитесь, что передан параметр `scope` ||
|| `PUBLIC_PAGE_REACHED` | На тарифном плане есть ограничение по количеству опубликованных страниц ||
|| `LANDING_PAYMENT_FAILED` | Страница добавлена из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `LANDING_PAYMENT_FAILED_BLOCK` | На странице есть блок из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `PUBLIC_SITE_REACHED` | На тарифном плане есть ограничение по количеству созданных или опубликованных сайтов ||
|| `PUBLIC_SITE_REACHED_FREE` | Публикация сайтов временно доступна только на платных тарифах ||
|| `PUBLIC_HTML_DISALLOWED[...]` | На тарифном плане есть ограничение по добавлению пользовательского HTML кода. В квадратных скобках метод возвращает тип объекта и его идентификатор: `S<site_id>` для сайта или `L<landing_id>` для страницы ||
|| `PHONE_NOT_CONFIRMED` | Для публикации необходимо подтверждение номера телефона ||
|| `EMAIL_NOT_CONFIRMED` | Для публикации необходимо подтверждение e-mail ||
|| `URLCHECKER_FAIL` | На странице обнаружено вредоносное содержимое ||
|| `LICENSE_EXPIRED` | Лицензия вашего продукта закончилась ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-get-public-url.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-unpublic.md)
- [{#T}](./landing-landing-update.md)
