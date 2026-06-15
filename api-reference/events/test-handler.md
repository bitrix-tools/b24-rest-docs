# Как проверить свой обработчик для обработки событий Битрикс24

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

После регистрирации обработчика ONAPPTEST вручную вызывается метод `event.test`. Это вызывает срабатывание указанного события и позволяет убедиться, что обработчик действительно в состоянии принимать данные о событиях.

## Шаг 1

Создайте файл handler.php на своём сервере. Убедитесь что он доступен из интернета. Рядом с файлом создайте папку \log.

Код файла handler.php.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- PHP

    ```php
    <?
    file_put_contents(
        __DIR__ . '/log/' . time() . '.txt',
        var_export($_REQUEST, true)
    );
    ```

{% endlist %}

## Шаг 2

Зарегистрируйте событие, указав в поле `handler` путь до файла, созданного в шаге 1.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event":"ONAPPTEST","handler":"https://example.com/handler.php","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.bind
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
        method: 'event.bind',
        params: {
          event: 'ONAPPTEST',
          handler: 'https://example.com/handler.php',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('event.bind result:', result)
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
      async function bindEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.bind',
            params: {
              event: 'ONAPPTEST',
              handler: 'https://example.com/handler.php',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('event.bind result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindEvent)
    </script>
    ```

- PHP

    ```php
    <?
    $eventBind = CRest::call(
        'event.bind',
        [
            'event' => 'ONAPPTEST',
            'handler' => 'https://example.com/handler.php'
        ]
    );
    if($eventBind['result'])
    {
        echo 'event bind successful';
    }
    ?>
    ```

{% endlist %}

## Шаг 3

Заставьте событие сработать вызовом метода с произвольными данными.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"any":"data","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.test
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
        method: 'event.test',
        params: {
          any: 'data',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('event.test result:', result)
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
      async function testEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.test',
            params: {
              any: 'data',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('event.test result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', testEvent)
    </script>
    ```

- PHP

    ```php
    <?
    $result = CRest::call(
        'event.test',
        [
            'any' => 'data'
        ]
    );
    if($result['result'])
    {
        echo 'successful';
    }
    ?>
    ```

{% endlist %}

## Результат

При успешном вызове в папке \log создается файл со стандартными данными для событий.

{% list tabs %}

- PHP

    ```php
    array (
        'event' => 'ONAPPTEST',
        'data' => 
        array (
            'QUERY' => 
            array (
            '	any' => 'data',
            ),
            'LANGUAGE_ID' => 'en',
        ),
        'ts' => '1573120286',
        'auth' => array (...)
    )
    ```

{% endlist %}

