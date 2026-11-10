# Как проверить свой обработчик для обработки событий Битрикс24

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Тестовый обработчик помогает проверить, что Битрикс24 может отправить событие на ваш сервер, а сервер принимает и сохраняет данные события. Для проверки не нужно ждать реального действия в Битрикс24: событие `ONAPPTEST` вызывается вручную методом `event.test`.

Результат сценария — файл в папке `log` на вашем сервере с телом POST-запроса от Битрикс24: кодом события, переданными данными и блоком `auth`.

## Методы сценария

#|
|| **Метод** | **Роль в сценарии** ||
|| [event.bind](./event-bind.md) | Регистрирует обработчик события `ONAPPTEST` и связывает код события с URL вашего файла ||
|| `event.test` | Отправляет событие `ONAPPTEST` на зарегистрированный URL. Все переданные методу параметры приходят в обработчик в блоке `data.QUERY` ||
|| [event.unbind](./event-unbind.md) | Удаляет тестовый обработчик после проверки ||
|#

Сценарий состоит из пяти шагов:

1. Создать файл `handler.php`, который сохраняет входящий запрос в файл
2. Зарегистрировать обработчик события `ONAPPTEST` методом `event.bind`
3. Вызвать тестовое событие методом `event.test`
4. Проверить, что в папке `log` появился файл с данными события
5. Удалить тестовый обработчик методом `event.unbind`

## Что понадобится

- приложение с [авторизацией OAuth 2.0](../../settings/oauth/index.md). Методы `event.bind` и `event.test` работают только с этим типом авторизации, [входящий вебхук](../../local-integrations/local-webhooks.md) их вызвать не может
- токен доступа OAuth для вызова методов. Дополнительный [scope](../scopes/permissions.md) не нужен: `event.bind`, `event.test` и событие `ONAPPTEST` относятся к базовым
- публичный URL обработчика по протоколу `http` или `https`, доступный из внешней сети. Битрикс24 проверяет URL при регистрации: адрес должен содержать доменное имя с точкой, поэтому `localhost` и IP-адрес без домена не подойдут
- файл `handler.php` на вашем сервере и папка `log` рядом с ним, доступная веб-серверу для записи
- завершенная установка приложения. Пока установка не завершена, события в приложение не отправляются, хотя `event.bind` и `event.test` отвечают успешно. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

## Подготовьте обработчик

Создайте файл `handler.php` на сервере и убедитесь, что он открывается по публичному URL. Код сохраняет входящий запрос в отдельный файл и при первом запуске сам создает папку `log`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- PHP

    ```php
    <?php
    $logDir = __DIR__ . '/log';

    if (!is_dir($logDir)) {
        mkdir($logDir, 0775, true);
    }

    file_put_contents(
        $logDir . '/' . uniqid((string)time() . '-') . '.txt',
        var_export($_REQUEST, true)
    );
    ```

{% endlist %}

Битрикс24 отправляет событие POST-запросом, поэтому данные окажутся в `$_REQUEST`. Имя файла складывается из времени запроса и случайного суффикса, поэтому каждое событие попадет в отдельный файл даже при нескольких срабатываниях в одну секунду.

{% note warning "" %}

Обработчик записывает весь запрос целиком, включая блок `auth` с токенами приложения, а папка `log` лежит в веб-каталоге рядом с `handler.php`. Закройте папку от доступа извне до первого вызова `event.test` — иначе токены окажутся в открытом доступе уже с первым событием. Используйте такой код только для разовой проверки: сразу после нее удалите файлы из папки `log`. В рабочем обработчике токены в лог не пишите.

{% endnote %}

## Зарегистрируйте тестовое событие

Зарегистрируйте событие `ONAPPTEST` методом [event.bind](./event-bind.md). В параметре `handler` передайте публичный URL файла `handler.php`.

Замените значения в примерах:

- `https://example.com/handler.php` — на URL вашего обработчика
- `**put_access_token_here**` — на токен доступа OAuth
- `**put_your_bitrix24_address**` — на адрес вашего Битрикс24

Вкладки с SDK рассчитаны на уже созданный клиент. Как его инициализировать, описано в разделе [{#T}](../../sdk/index.md).

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

- PHP CRest

    ```php
    require_once('crest.php');

    $eventBind = CRest::call(
        'event.bind',
        [
            'event' => 'ONAPPTEST',
            'handler' => 'https://example.com/handler.php'
        ]
    );

    if ($eventBind['result']) {
        echo 'event bind successful';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.bind", b24.Params{
    	"event":   "ONAPPTEST",
    	"handler": "https://example.com/handler.php",
    })
    if err != nil {
    	return fmt.Errorf("event.bind: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
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

В примере параметр `any` со значением `data` используется как тестовое значение. Метод не проверяет состав параметров: любые переданные пары «ключ — значение» вернутся в обработчик внутри `data.QUERY`. По ним вы и убедитесь, что до сервера дошел именно ваш вызов.

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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.test',
        [
            'any' => 'data'
        ]
    );

    if ($result['result']) {
        echo 'successful';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.test", b24.Params{
    	"any": "data",
    })
    if err != nil {
    	return fmt.Errorf("event.test: %w", err)
    }

    var value int
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
    ```

{% endlist %}

Успешный вызов метода `event.test` возвращает `1`. Ответ подтверждает только то, что Битрикс24 принял вызов и поставил событие в очередь, — доставку до сервера проверяйте по файлу в папке `log`.

```json
{
    "result": 1
}
```

## Проверим результат

Откройте папку `log` рядом с файлом `handler.php`. При успешном выполнении сценария в ней появится файл с данными события.

Содержимое файла — результат `var_export`, а не исполняемый код. Блок `auth` в примере свернут, его ключи разобраны в статье [{#T}](./index.md#auth).

```
array (
    'event' => 'ONAPPTEST',
    'event_handler_id' => '1',
    'data' =>
    array (
        'QUERY' =>
        array (
            'any' => 'data',
        ),
        'LANGUAGE_ID' => 'ru',
    ),
    'ts' => '1573120286',
    'auth' => array (...),
)
```

Сверьте ключи файла с тем, что вы отправляли:

#|
|| **Ключ** | **Что проверить** ||
|| `event` | Значение `ONAPPTEST` — пришло именно тестовое событие ||
|| `event_handler_id` | Идентификатор подписки, который Битрикс24 присвоил при регистрации обработчика. Через REST он не возвращается — используйте его как метку в логах, чтобы различать подписки ||
|| `data.QUERY` | Параметры вызова `event.test`. В примере это `any` со значением `data` ||
|| `data.LANGUAGE_ID` | Язык интерфейса Битрикс24, с которого пришло событие ||
|| `ts` | Дата и время отправки события из очереди в формате Unix ||
|| `auth` | Данные авторизации события. Структура описана в статье [{#T}](./index.md#auth) ||
|#

Если файл создан и содержит `data.QUERY.any`, обработчик доступен из Битрикс24 и принимает данные событий. Тем же способом можно проверять обработчики реальных событий: замените `ONAPPTEST` на нужный код события и выполните в Битрикс24 действие, которое его запускает.

## Ошибки и диагностика

Если любой из методов сценария вернул ошибку, найдите ее код в таблице. Коды `WRONG_AUTH_TYPE` и `expired_token` относятся ко всем трем вызовам, остальные — к `event.bind`.

#|
|| **Код** | **Причина и что сделать** ||
|| `WRONG_AUTH_TYPE` | Метод вызван вебхуком. Повторите вызов с токеном OAuth приложения ||
|| `expired_token` | Срок действия токена истек. Обновите его по `refresh_token` и повторите вызов — как это делать, описано в статье [{#T}](../../settings/oauth/auto-renewal.md) ||
|| `ERROR_EVENT_NOT_FOUND` | В параметре `event` указано событие, которого нет в списке доступных приложению. Для проверки обработчика используйте `ONAPPTEST`, полный список событий возвращает метод [events](./events.md) ||
|| `ERROR_WRONG_HANDLER_URL` | В `handler` передан адрес без доменного имени — например, `localhost` или пустая строка. Укажите публичный URL с точкой в имени домена ||
|| `ERROR_UNSUPPORTED_PROTOCOL` | Адрес обработчика указан не по протоколу `http` или `https` ||
|| `ERROR_ARGUMENT` с текстом `Argument 'EVENT' is null or empty` или `Argument 'HANDLER' is null or empty` | Не передан параметр `event` или `handler` ||
|| `ERROR_CORE` с текстом `Handler already binded` | Обработчик с такой же парой «событие — URL» уже зарегистрирован. Проверьте подписки методом [event.get](./event-get.md) и при необходимости удалите лишнюю методом [event.unbind](./event-unbind.md) ||
|#

Если метод `event.bind` вернул `true` и метод `event.test` вернул `1`, но файл в папке `log` не появился, проверьте по порядку:

- подождите несколько секунд и обновите папку. Событие уходит через очередь, поэтому приходит не мгновенно
- установка приложения завершена. Пока она не завершена, оба метода отвечают успешно, но события в приложение не отправляются
- URL `handler` открывается из внешней сети, а не только из вашей локальной сети
- сервер принимает POST-запросы на файл `handler.php` и не отвечает редиректом
- папка `log` существует рядом с файлом `handler.php`, а у веб-сервера есть права на запись в нее
- в коде обработчика нет ошибок PHP — проверьте лог ошибок веб-сервера

После каждой правки повторяйте сценарий с вызова `event.test` — заново регистрировать обработчик не нужно.

Если Битрикс24 развернут в закрытом контуре, обработчику может мешать сетевая политика. Проверьте доступы по статье [{#T}](../../settings/cloud-and-on-premise/network-access.md).

## Удалите тестовый обработчик

После проверки удалите подписку, чтобы тестовое событие не уходило на ваш сервер. Передайте в [event.unbind](./event-unbind.md) те же `event` и `handler`, что и при регистрации.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"event":"ONAPPTEST","handler":"https://example.com/handler.php","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.unbind
    ```

{% endlist %}

В ответе `count` — число удаленных обработчиков. Значение `0` означает, что подписки с такой парой «событие — URL» не нашлось.

```json
{
    "result": {
        "count": 1
    }
}
```

## Что важно учитывать

Метод `event.test` проверяет только доставку тестового события `ONAPPTEST`. Для рабочих событий используйте коды событий из списка, который возвращает метод [events](./events.md), и регистрируйте их методом [event.bind](./event-bind.md).

В рабочем обработчике вместо записи всего запроса проверяйте `application_token` — так вы убедитесь, что событие пришло от Битрикс24. Как это делать, описано в статье [{#T}](./safe-event-handlers.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./event-bind.md)
- [{#T}](./events.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
