# Фоновый обработчик на всех страницах PAGE_BACKGROUND_WORKER

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)

Битрикс24 загружает обработчик этой точки на каждой странице в скрытом фрейме, без видимого элемента интерфейса. Пользователь виджет не открывает и не видит: код приложения выполняется в фоне на любой странице, которую открыл сотрудник.

Точка нужна там, где приложение должно реагировать не на клик, а на внешнее событие: принять сигнал от своего backend через [интерактивное взаимодействие](../../../settings/interactivity/index.md), показать входящий звонок в интеграции телефонии, открыть слайдер приложения методом [openApplication](../bx24-widget-methods.md).

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md). Регистрация требует параметр `OPTIONS[errorHandlerUrl]`. В нем передают адрес, по которому Битрикс24 сообщит об отключении обработчика.

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `PAGE_BACKGROUND_WORKER` | Скрытый фрейм на каждой странице Битрикс24 ||
|#

### Когда вызывается обработчик

Обработчик загружается при каждой загрузке страницы Битрикс24. Страница, открытая слайдером, считается отдельным документом, поэтому в нем обработчик загружается еще раз, уже со своим адресом в ключе `URI`.

Из этого следует главное требование к обработчику: он должен отвечать быстро. Если ответ идет дольше пяти секунд и это повторяется больше десяти раз за сутки на одном Битрикс24, регистрация обработчика удаляется.

Об удалении Битрикс24 сообщает приложению: на адрес из `OPTIONS[errorHandlerUrl]` приходит запрос с ошибкой `ERROR_PLACEMENT_LOADING_OVERTIME` и описанием, какое время загрузки было превышено. Запрос отправляется без токенов авторизации. Чтобы вернуть виджет, приложение регистрирует обработчик заново методом [placement.bind](../placement-bind.md).

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 588b8a98e848778a4ffb38fbcf70f2b9
    [AUTH_ID] => 4172bb660070f28d001e30ba00000001f0f107c42ca5bd5f61030c5d9c3e4d60
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 31f1e2660070f28d001e30ba00000001f0f107b1918506d8a2ed9ecf76e8fdac
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => PAGE_BACKGROUND_WORKER
    [PLACEMENT_OPTIONS] => {"ID":"PAGE_BACKGROUND_WORKER","URI":"\/company\/personal\/user\/1\/blog\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

#|
|| **Параметр** | **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Код точки встраивания, всегда равен `PAGE_BACKGROUND_WORKER` ||
|| **URI***
[`string`](../../data-types.md) | Путь с query-строкой страницы, на которой загрузился обработчик. По нему приложение понимает, где сейчас находится пользователь ||
|#

## OPTIONS при регистрации через placement.bind

Для `PAGE_BACKGROUND_WORKER` метод `placement.bind` поддерживает один параметр `OPTIONS`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **errorHandlerUrl***
[`string`](../../data-types.md) | Адрес, на который Битрикс24 сообщит об удалении регистрации обработчика.

Параметр обязателен: без него `placement.bind` возвращает ошибку `EMPTY_ERROR_HANDLER_URL`. Другие ключи `OPTIONS` не сохраняются. Метод [placement.get](../placement-get.md) вернет только `errorHandlerUrl`
||
|#

Приложение регистрирует один обработчик этой точки. Повторный вызов `placement.bind` возвращает ошибку `ERROR_PLACEMENT_MAX_COUNT`. Чтобы сменить адрес обработчика, сначала снимите регистрацию методом [placement.unbind](../placement-unbind.md).

### Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "PAGE_BACKGROUND_WORKER",
        "HANDLER": "https://your-domain.com/widgets/background-handler.php",
        "OPTIONS": {
          "errorHandlerUrl": "https://your-domain.com/widgets/background-error.php"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
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
        method: 'placement.bind',
        params: {
          PLACEMENT: 'PAGE_BACKGROUND_WORKER',
          HANDLER: 'https://your-domain.com/widgets/background-handler.php',
          OPTIONS: {
            errorHandlerUrl: 'https://your-domain.com/widgets/background-error.php',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
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
      async function bindBackgroundWorker() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'PAGE_BACKGROUND_WORKER',
              HANDLER: 'https://your-domain.com/widgets/background-handler.php',
              OPTIONS: {
                errorHandlerUrl: 'https://your-domain.com/widgets/background-error.php',
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
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindBackgroundWorker)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'PAGE_BACKGROUND_WORKER',
                    'HANDLER' => 'https://your-domain.com/widgets/background-handler.php',
                    'OPTIONS' => [
                        'errorHandlerUrl' => 'https://your-domain.com/widgets/background-error.php',
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'PAGE_BACKGROUND_WORKER',
            HANDLER: 'https://your-domain.com/widgets/background-handler.php',
            OPTIONS: {
                errorHandlerUrl: 'https://your-domain.com/widgets/background-error.php'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'PAGE_BACKGROUND_WORKER',
            'HANDLER' => 'https://your-domain.com/widgets/background-handler.php',
            'OPTIONS' => [
                'errorHandlerUrl' => 'https://your-domain.com/widgets/background-error.php',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "placement.bind", b24.Params{
    	"PLACEMENT": "PAGE_BACKGROUND_WORKER",
    	"HANDLER":   "https://your-domain.com/widgets/background-handler.php",
    	"OPTIONS": b24.Params{
    		"errorHandlerUrl": "https://your-domain.com/widgets/background-error.php",
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработчик для одного пользователя

`PAGE_BACKGROUND_WORKER` — единственная точка встраивания, которая поддерживает параметр `USER_ID` метода [placement.bind](../placement-bind.md). Обработчик, зарегистрированный с `USER_ID`, загружается только на страницах этого пользователя. Так фоновый код подключают только тем, кому он нужен, например операторам телефонии.

Ограничение в один обработчик считается отдельно для общей регистрации и для каждого пользователя, поэтому персональный обработчик и обработчик для всех сотрудников можно зарегистрировать одновременно.

## Связь с другими объектами

**Карточка звонка.** Из фонового обработчика приложение управляет карточкой звонка: меняет ее состояние, кнопки и заголовок, подписывается на действия оператора. Методы и события собраны в разделе [{#T}](../ui-interaction/page-background-worker/index.md), а весь сценарий описан в статье [{#T}](../ui-interaction/page-background-worker/webrtc-scenario.md).

**Сигналы от backend.** Обработчик получает сообщения от серверной части приложения механизмом [интерактивного взаимодействия](../../../settings/interactivity/index.md) и по ним открывает интерфейс приложения [методами JavaScript для виджетов](../bx24-widget-methods.md).

**Пользователь.** Идентификатор для параметра `USER_ID` при регистрации персонального обработчика возвращают методы раздела [{#T}](../../user/index.md).

## Типовые ошибки

#|
|| **Ошибка** | **Решение** ||
|| `placement.bind` возвращает `EMPTY_ERROR_HANDLER_URL` | Передайте `OPTIONS[errorHandlerUrl]`: без адреса для сообщений об отключении точка не регистрируется ||
|| `placement.bind` возвращает `ERROR_PLACEMENT_MAX_COUNT` | Обработчик уже зарегистрирован. Снимите старую регистрацию методом [placement.unbind](../placement-unbind.md) ||
|| Обработчик перестал вызываться, в `placement.get` его нет | Регистрацию удалили из-за долгой загрузки. Ускорьте ответ обработчика и зарегистрируйте его заново ||
|| Обработчик вызывается по несколько раз на одном экране | Страницы в слайдерах — отдельные документы, и в каждом обработчик загружается заново. Проверяйте `URI`, если сценарий должен отработать один раз ||
|#

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../ui-interaction/page-background-worker/webrtc-scenario.md)

{% endnote %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./app-url.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/page-background-worker/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
