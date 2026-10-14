# Получить список офлайн-событий с «очисткой» event.offline.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `event.offline.get` возвращает приложению первые записи из очереди [офлайн-событий](./offline-events.md), подходящие под фильтр. У метода два режима:

- `clear=1`, по умолчанию — выдает записи и сразу удаляет их из очереди
- `clear=0` — резервирует записи пакетом и возвращает его `process_id`. Обработку пакета подтверждают методом [event.offline.clear](./event-offline-clear.md), ошибки отмечают методом [event.offline.error](./event-offline-error.md)

Режим с резервированием пакетов доступен не на всех тарифах. Проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_offline_extended`.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Права на методы событий описаны в разделе [Права доступа](./index.md#access).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../data-types.md) | Фильтр записей. По умолчанию метод возвращает все записи. Фильтровать можно по полям: `ID`, `TIMESTAMP_X`, `EVENT_NAME`, `MESSAGE_ID`.

Перед именем поля укажите операцию: `=`, `>`, `<`, `>=`, `<=`. Без операции работает точное совпадение. Отрицание `!` не поддерживается, такой фильтр вернет ошибку `ERROR_ARGUMENT`. Пример: `{">ID": 100, "=EVENT_NAME": "ONCRMLEADADD"}`.

Значение — строка или число, массив не поддерживается. `TIMESTAMP_X` передайте в формате ISO 8601, например `2024-07-18T12:32:31+02:00` ||
|| **order**
[`object`](../data-types.md) | Сортировка записей по тем же полям, что и в фильтре, в виде `{"поле": "ASC"}` или `{"поле": "DESC"}`. По умолчанию — `{"TIMESTAMP_X": "ASC"}` ||
|| **limit**
[`integer`](../data-types.md) | Количество выбираемых записей, целое число больше `0`. По умолчанию 50 ||
|| **clear**
[`integer`](../data-types.md) | Удалять ли выбранные записи: `1` — удалить сразу, `0` — зарезервировать пакетом. По умолчанию `1`. Значение `0` без режима `rest_offline_extended` вернет ошибку `WRONG_LICENSE` ||
|| **process_id**
[`string`](../data-types.md) | Идентификатор ранее зарезервированного пакета. Передайте его, чтобы повторно получить записи пакета, которые еще не подтверждены. С `clear=1` метод удалит весь пакет, включая записи, которые не вошли в ответ из-за `limit`. Чтобы оставить записи, передайте `clear=0` ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Передайте то же значение `auth_connector`, что и при подписке методом [event.bind](./event-bind.md), иначе метод вернет только события без источника. Параметр доступен не на всех тарифах: проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_auth_connector`, иначе метод вернет ошибку `WRONG_LICENSE` ||
|| **error**
[`integer`](../data-types.md) | `1` — вернуть только записи, помеченные ошибочными методом [event.offline.error](./event-offline-error.md), `0` — только записи без такой пометки. По умолчанию `0` ||
|#

{% note info %}

Метод можно вызывать параллельно: каждый запрос получит свой набор записей, который не пересекается с другими. Учитывайте [ограничения на частоту запросов](../../limits.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=MESSAGE_ID":"b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3","=EVENT_NAME":"ONCRMLEADADD",">=ID":1},"auth_connector":"BxTest","auth":"**put_access_token_here**"}' \
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
            '=MESSAGE_ID': 'b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3',
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
                '=MESSAGE_ID': 'b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3',
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.offline.get(
            filter={
                "=MESSAGE_ID": "b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3",
                "=EVENT_NAME": "ONCRMLEADADD",
                ">=ID": 1,
            },
            auth_connector="BxTest",
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                        '=MESSAGE_ID' => 'b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3',
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
                "=MESSAGE_ID": "b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3",
                "=EVENT_NAME": "ONCRMLEADADD",
                ">=ID": 1
            },
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
                '=MESSAGE_ID' => 'b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3',
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
                "EVENT_DATA": {
                    "FIELDS": {
                        "ID": "123"
                    }
                },
                "EVENT_ADDITIONAL": {
                    "user_id": "1"
                },
                "MESSAGE_ID": "b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3"
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
[`object`](../data-types.md) | Идентификатор пакета и выбранные записи очереди [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **process_id**
[`string`](../data-types.md) | Идентификатор пакета. Заполнен, если метод вызван с `clear=0` или с параметром `process_id`, иначе равен `null`. Передайте его в [event.offline.clear](./event-offline-clear.md) или [event.offline.error](./event-offline-error.md) ||
|| **events**
[`array`](../data-types.md) | Записи очереди [(подробное описание)](#event). Если подходящих записей нет, возвращается пустой массив ||
|#

#### Элемент массива events {#event}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор записи в очереди ||
|| **TIMESTAMP_X**
[`datetime`](../data-types.md) | Время записи события в очередь или его последнего повтора ||
|| **EVENT_NAME**
[`string`](../data-types.md) | Код события, например `ONCRMLEADADD` ||
|| **EVENT_DATA**
[`object`](../data-types.md) или [`boolean`](../data-types.md) | Данные события — те же, что приходят в обработчик онлайн-события, например `FIELDS.ID`. Если у события нет данных, поле пустое: `false` или `null` ||
|| **EVENT_ADDITIONAL**
[`object`](../data-types.md) | Данные авторизации события. Поле `user_id` содержит идентификатор пользователя, который выполнил действие. Если действие выполнено без пользователя, например агентом, `user_id` равен `0` ||
|| **MESSAGE_ID**
[`string`](../data-types.md) | Ключ записи. Повторное событие с теми же данными обновляет незарезервированную запись, а не добавляет новую. Если запись уже зарезервирована пакетом, повтор создаст новую запись. Передайте значение в параметр `message_id` методов [event.offline.clear](./event-offline-clear.md) и [event.offline.error](./event-offline-error.md) ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | Value must be positive integer | Параметр `limit` меньше `1` ||
|| `400` | `ERROR_ARGUMENT` | Filter field not allowed: … | В `filter` передано поле не из списка ||
|| `400` | `ERROR_ARGUMENT` | Filter operation not allowed: … | В `filter` передана неподдерживаемая операция, например `!` ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument '…' has an invalid type | В `filter` передан массив вместо строки или числа ||
|| `400` | `ERROR_ARGUMENT` | The filter is not an array. | Параметр `filter` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | The order is not an array. | Параметр `order` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | Order field not allowed: … | В `order` передано поле не из списка ||
|| `400` | `ERROR_ARGUMENT` | ```Order direction should be one of {ASC|DESC}``` | В `order` передано направление не `ASC` и не `DESC` ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал не администратор ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: auth_connector | Передан `auth_connector`, а тариф не поддерживает ключи источников ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: extended offline events handling | Метод вызван с `clear=0`, а режим `rest_offline_extended` недоступен ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./test-handler.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
