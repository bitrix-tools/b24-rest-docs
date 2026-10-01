# Получить список офлайн-событий event.offline.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `event.offline.list` читает очередь [офлайн-событий](./offline-events.md) приложения, которое его вызвало. В отличие от [event.offline.get](./event-offline-get.md), он не резервирует записи и не выдает `process_id`. Чтобы подтвердить или пометить записи ошибочными, получите их методом `event.offline.get` с `clear=0`.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../data-types.md) | Фильтр записей. Без фильтра метод возвращает все записи. Фильтровать можно по полям: `ID`, `TIMESTAMP_X`, `EVENT_NAME`, `MESSAGE_ID`, `PROCESS_ID`, `ERROR`.

`TIMESTAMP_X` передается в формате ISO 8601, `ERROR` — `0` или `1`.

Перед именем поля ставится операция: `=`, `>`, `<`, `>=`, `<=`, `@` — значение входит в массив, `%` — подстрока. Без операции работает точное совпадение. Пример: `{">ID": 100, "=EVENT_NAME": "ONCRMLEADADD"}`. Отрицание `!` не поддерживается: метод вернет ошибку `ERROR_ARGUMENT` ||
|| **order**
[`object`](../data-types.md) | Сортировка записей по тем же полям, что и в фильтре, в виде `{"поле": "ASC"}` или `{"поле": "DESC"}`. По умолчанию — `{"ID": "ASC"}` ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Очередь офлайн-событий разделена по источникам. Передайте то же значение `auth_connector`, что и при подписке методом [event.bind](./event-bind.md), иначе метод вернет только события без источника. Параметр доступен не на всех тарифах: проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_auth_connector`, иначе метод вернет ошибку `WRONG_LICENSE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "filter": {
            "ERROR": 0
        },
        "order": {
            "ID": "DESC"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.offline.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each OfflineEventItem returned in result[]
    type OfflineEventItem = {
      ID: string
      TIMESTAMP_X: ISODate
      EVENT_NAME: string
      EVENT_DATA: unknown
      EVENT_ADDITIONAL: unknown
      MESSAGE_ID: string
      PROCESS_ID: string
      ERROR: string
    }

    try {
      // event.offline.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers ignore `order` (they always sort by ID ASC and log a warning)
      // — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<OfflineEventItem[]>({
        method: 'event.offline.list',
        params: {
          filter: {
            ERROR: 0,
          },
          order: {
            ID: 'DESC',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Offline events:', result.length, result)
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
      async function fetchOfflineEvents() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // event.offline.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers ignore `order` (they always sort by ID ASC and log a warning)
          // — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'event.offline.list',
            params: {
              filter: {
                ERROR: 0,
              },
              order: {
                ID: 'DESC',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Offline events:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchOfflineEvents)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.offline.list(
            filter={
                "ERROR": 0,
            },
            order={
                "ID": "DESC",
            },
            start=0,
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.offline.list(
            filter={
                "ERROR": 0,
            },
            order={
                "ID": "DESC",
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

    Пример `as_list_fast`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.offline.list(
            filter={
                "ERROR": 0,
            },
        ).as_list_fast(descending=True).response
        result = bitrix_response.result
        for item in result:
            print(item)
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
                'event.offline.list',
                [
                    'filter' => [
                        'ERROR' => 0,
                    ],
                    'order' => [
                        'ID' => 'DESC',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching offline events: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.offline.list",
        {
            "filter": {
                "ERROR": 0
            },
            "order": {
                "ID": "DESC"
            }
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
        'event.offline.list',
        [
            'filter' => [
                'ERROR' => 0
            ],
            'order' => [
                'ID' => 'DESC'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.offline.list", b24.Params{
    	"filter": b24.Params{
    		"ERROR": 0,
    	},
    	"order": b24.Params{
    		"ID": "DESC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("event.offline.list: %w", err)
    }

    var items []struct {
    	ID              b24.ID          `json:"ID"`
    	TimestampX      string          `json:"TIMESTAMP_X"`
    	EventName       string          `json:"EVENT_NAME"`
    	EventData       json.RawMessage `json:"EVENT_DATA"`
    	EventAdditional json.RawMessage `json:"EVENT_ADDITIONAL"`
    	MessageID       string          `json:"MESSAGE_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.TimestampX)
    }

    // Total и Next заполняют списочные методы; для полного
    // обхода списка есть client.Core().Pages и Scan.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "2",
            "TIMESTAMP_X": "2024-07-18T12:32:31+02:00",
            "EVENT_NAME": "ONCRMCOMPANYADD",
            "EVENT_DATA": {
                "FIELDS": {
                    "ID": "45"
                }
            },
            "EVENT_ADDITIONAL": {
                "user_id": "1"
            },
            "MESSAGE_ID": "4f2a9c1e7b3d5a6f8e0c2b4d6a8f1e3c",
            "PROCESS_ID": "",
            "ERROR": "0"
        },
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
                "user_id": 0
            },
            "MESSAGE_ID": "b0c7f7c2a3f1e4d5c6b7a8f9e0d1c2b3",
            "PROCESS_ID": "",
            "ERROR": "0"
        }
    ],
    "total": 2,
    "time": {
        "start": 1721299537.90267,
        "finish": 1721299538.02201,
        "duration": 0.11934018135070801,
        "processing": 0.0029511451721191406,
        "date_start": "2024-07-18T12:45:37+02:00",
        "date_finish": "2024-07-18T12:45:38+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Записи очереди [(подробное описание)](#event). Если подходящих записей нет, возвращается пустой массив ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **next**
[`integer`](../data-types.md) | Значение `start` для следующей страницы. Возвращается, если найдено больше записей, чем помещается на текущей странице ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент списка {#event}

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
|| **PROCESS_ID**
[`string`](../data-types.md) | Идентификатор пакета, которым запись зарезервирована методом [event.offline.get](./event-offline-get.md) с `clear=0`. Пустая строка, если запись не зарезервирована ||
|| **ERROR**
[`string`](../data-types.md) | `1` — запись помечена ошибочной методом [event.offline.error](./event-offline-error.md), `0` — нет ||
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
|| `400` | `ERROR_ARGUMENT` | Filter field not allowed: … | В `filter` передано поле не из списка ||
|| `400` | `ERROR_ARGUMENT` | Filter operation not allowed: … | В `filter` передана неподдерживаемая операция, например `!` ||
|| `400` | `ERROR_ARGUMENT` | The filter is not an array. | Параметр `filter` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | The order is not an array. | Параметр `order` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | Order field not allowed: … | В `order` передано поле не из списка ||
|| `400` | `ERROR_ARGUMENT` | ```Order direction should be one of {ASC|DESC}``` | В `order` передано направление не `ASC` и не `DESC` ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал не администратор ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: auth_connector | Передан `auth_connector`, а тариф не поддерживает ключи источников ||
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
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
