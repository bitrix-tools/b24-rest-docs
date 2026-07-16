# Как проверить свой обработчик для обработки событий Битрикс24

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Тестовый обработчик помогает проверить, что Битрикс24 может отправить событие на ваш сервер, а сервер принимает и сохраняет данные события. Для проверки зарегистрируйте обработчик события `ONAPPTEST` методом [event.bind](./event-bind.md), затем вызовите метод `event.test`.

Сценарий состоит из четырех шагов:

1. Создать файл `handler.php`, который сохраняет входящий запрос в файл
2. Зарегистрировать обработчик события `ONAPPTEST` методом [event.bind](./event-bind.md)
3. Вызвать тестовое событие методом `event.test`
4. Проверить, что в папке `log` появился файл с данными события

## Подготовьте обработчик

Для выполнения сценария нужны:

- приложение с OAuth-авторизацией
- публичный URL обработчика, доступный из внешней сети для GET- и POST-запросов
- файл `handler.php` на вашем сервере
- папка `log` рядом с файлом `handler.php`, доступная для записи
- токен доступа OAuth для вызова методов `event.bind` и `event.test`

Создайте файл `handler.php` на сервере. Убедитесь, что файл доступен из интернета. Рядом с файлом создайте папку `log`.

Код файла `handler.php` сохраняет входящий запрос в отдельный файл:

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

## Зарегистрируйте тестовое событие

Зарегистрируйте событие `ONAPPTEST` методом [event.bind](./event-bind.md). В параметре `handler` передайте публичный URL файла `handler.php`.

Замените значения в примерах:

- `https://example.com/handler.php` — на URL вашего обработчика
- `**put_access_token_here**` — на токен доступа OAuth
- `**put_your_bitrix24_address**` — на адрес вашего Битрикс24

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

Успешная регистрация возвращает `true`.

```json
{
    "result": true
}
```

## Вызовите тестовое событие

Вызовите метод `event.test` с произвольными данными. Битрикс24 отправит событие `ONAPPTEST` на URL, который вы указали при регистрации обработчика.

Метод `event.test` работает только с OAuth-авторизацией приложения. Он не подходит для входящих вебхуков: при другом типе авторизации метод возвращает ошибку типа авторизации.

В примере параметр `any` используется как тестовое значение. После вызова оно должно появиться в сохраненном запросе в блоке `data.QUERY`.

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
      const response = await $b24.actions.v2.call.make<number>({
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

Успешный вызов метода `event.test` возвращает `1`.

```json
{
    "result": 1
}
```

## Проверим результат

Откройте папку `log` рядом с файлом `handler.php`. При успешном выполнении сценария в ней появится файл с данными события.

В файле должны быть:

- `event` со значением `ONAPPTEST`
- `event_handler_id` с идентификатором зарегистрированного обработчика
- `data.QUERY.any` со значением `data`
- `auth` с данными авторизации события

{% list tabs %}

- PHP

    ```php
    array (
        'event' => 'ONAPPTEST',
        'event_handler_id' => 1,
        'data' => 
        array (
            'QUERY' => 
            array (
                'any' => 'data',
            ),
            'LANGUAGE_ID' => 'en',
        ),
        'ts' => '1573120286',
        'auth' => array (...)
    )
    ```

{% endlist %}

Если файл создан и содержит `data.QUERY.any`, обработчик доступен из Битрикс24 и принимает данные событий.

## Ошибки и диагностика

Если метод `event.bind` вернул ошибку, проверьте параметры регистрации:

- `ERROR_EVENT_NOT_FOUND` — в параметре `event` указано неверное событие. Для проверки обработчика используйте `ONAPPTEST`
- `HANDLER` не передан — укажите публичный URL файла `handler.php`
- `Unable to set event handler` — проверьте, не зарегистрирован ли уже обработчик с таким же URL
- ошибка доступа — проверьте токен OAuth и контекст приложения

Если метод `event.bind` вернул `false` или метод `event.test` вернул успешный ответ, но файл в папке `log` не появился, проверьте обработчик:

- URL `handler` доступен из интернета и не ведет на `localhost`
- сервер принимает POST-запросы на файл `handler.php`
- папка `log` существует рядом с файлом `handler.php`
- у веб-сервера есть права на запись в папку `log`
- в коде обработчика нет ошибок PHP

## Что важно учитывать

Метод `event.test` проверяет только доставку тестового события `ONAPPTEST`. Для рабочих событий используйте коды событий из списка, который возвращает метод [events](./events.md), и регистрируйте их методом [event.bind](./event-bind.md).

Не сохраняйте токены авторизации из блока `auth` в публичные логи. В примере обработчик записывает весь запрос только для быстрой проверки приема события.

После проверки удалите файлы из папки `log` или закройте к ней доступ извне. Если тестовый обработчик больше не нужен, удалите подписку методом [event.unbind](./event-unbind.md).

## Продолжите изучение

- [{#T}](./event-bind.md)
- [{#T}](./events.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)

