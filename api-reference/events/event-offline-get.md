# Получить список офлайн-событий с «очисткой» event.offline.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Кто может выполнять метод: любой пользователь

Метод `event.offline.get` возвращает приложению первые в очереди офлайн-события согласно установкам фильтра. Доступность офлайн-событий можно проверить через метод [feature.get](../common/system/feature-get.md).

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../data-types.md) | Фильтр записей.  По умолчанию отдаются все записи, без фильтрации. Поддерживается фильтрация по полям: `ID`, `TIMESTAMP_X`, `EVENT_NAME`, `MESSAGE_ID` со стандартными операциями типа `=`, `>`, `<`, `<=` и так далее.

Важно: тип операции ставится перед именем поля фильтрации ||
|| **order**
[`array`](../data-types.md) | Сортировка записей. Поддерживается сортировка по тем же полям, что и в фильтре, на вход принимается массив вида `[поле=>ASC\|DESC]`. По умолчанию — [TIMESTAMP_X:ASC] ||
|| **limit**
[`integer`](../data-types.md) | Количество выбираемых записей. По умолчанию 50 ||
|#

### Дополнительные параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **clear**
[`integer`](../data-types.md) |Значения: `0\|1` — удалять ли выбранные записи. По умолчанию `1` ||
|| **process_id**
[`string`](../data-types.md) | Идентификатор процесса. Используется, если понадобится повторно выбрать еще необработанные текущим процессом записи ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Используется, если значение `auth_connector` было указано в методе [event.bind](./event-bind.md) ||
|| **error**
[`integer`](../data-types.md) | Значения: `0\|1` — возвращать ли ошибочные записи. По умолчанию `0` ||
|#

{% note info %}

Метод поддерживает многопоточный разбор. То есть допускается несколько параллельных запросов к /rest/event.offline.get (с соблюдением ограничений на количество запросов в единицу времени), и каждый из них получит разные наборы записей.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=MESSAGE_ID":1,"=EVENT_NAME":"ONCRMLEADADD",">=ID":1},"auth_connector":"BxTest","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.offline.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OfflineGetResult = {
      process_id: string | null,
      events: {
        ID: string,
        TIMESTAMP_X: ISODate,
        EVENT_NAME: string,
        EVENT_DATA: unknown,
        EVENT_ADDITIONAL: unknown,
        MESSAGE_ID: string,
      }[],
    }

    try {
      const response = await $b24.actions.v2.call.make<OfflineGetResult>({
        method: 'event.offline.get',
        params: {
          filter: {
            '=MESSAGE_ID': 1,
            '=EVENT_NAME': 'ONCRMLEADADD',
            '>=ID': 1,
          },
          auth_connector: 'BxTest',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Offline events:', result.events, 'Process ID:', result.process_id)
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
      async function getOfflineEvents() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.offline.get',
            params: {
              filter: {
                '=MESSAGE_ID': 1,
                '=EVENT_NAME': 'ONCRMLEADADD',
                '>=ID': 1,
              },
              auth_connector: 'BxTest',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Offline events:', result.events, 'Process ID:', result.process_id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOfflineEvents)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'event.offline.get',
                [
                    'filter' => [
                        '=MESSAGE_ID' => 1,
                        '=EVENT_NAME' => 'ONCRMLEADADD',
                        '>=ID' => 1
                    ],
                    'auth_connector' => 'BxTest'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.offline.get",
        {
            "filter": {
                "=MESSAGE_ID": 1,
                "=EVENT_NAME": "ONCRMLEADADD",
                ">=ID": 1
            }
            "auth_connector": "BxTest"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'event.offline.get',
        [
            'filter' => [
                '=MESSAGE_ID' => 1,
                '=EVENT_NAME' => 'ONCRMLEADADD',
                '>=ID' => 1
            ],
            'auth_connector' => 'BxTest'
        ]
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
    "result": {
        "process_id": null,
        "events": [
            {
                "ID": "1",
                "TIMESTAMP_X": "2024-07-18T12:32:31+02:00",
                "EVENT_NAME": "ONCRMLEADADD",
                "EVENT_DATA": false,
                "EVENT_ADDITIONAL": false,
                "MESSAGE_ID": "1"
            }
        ]
    },
    "time": {
        "start": 1721299720.388504,
        "finish": 1721299720.509809,
        "duration": 0.12130498886108398,
        "processing": 0.008239030838012695,
        "date_start": "2024-07-18T12:48:40+02:00",
        "date_finish": "2024-07-18T12:48:40+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)