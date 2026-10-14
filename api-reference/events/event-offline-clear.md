# Очистить записи в очереди офлайн-событий event.offline.clear

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `event.offline.clear` удаляет из очереди записи пакета, полученного методом [event.offline.get](./event-offline-get.md) с `clear=0`. Так приложение подтверждает, что обработало эти записи. Записи, которые не удалось обработать, пометьте методом [event.offline.error](./event-offline-error.md). Порядок работы с пакетами описан в статье [{#T}](./offline-events.md).

Режим с резервированием пакетов доступен не на всех тарифах. Проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_offline_extended`.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md). Права на методы событий описаны в разделе [Права доступа](./index.md#access).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **process_id***
[`string`](../data-types.md) | Идентификатор зарезервированного пакета событий. Его возвращает метод [event.offline.get](./event-offline-get.md) при вызове с параметром `clear=0`. Значение также есть в поле `PROCESS_ID` записей, которые возвращает метод [event.offline.list](./event-offline-list.md). Не передавайте пустую строку: метод не вернет ошибку и удалит из очереди все записи приложения вне пакетов, в том числе помеченные ошибкой ||
|| **id**
[`array`](../data-types.md) | Массив значений поля `ID` записей, которые нужно удалить, — целые числа больше `0`. Игнорируется, если передан параметр `message_id`. По умолчанию и при пустом массиве удаляются все записи пакета `process_id` ||
|| **message_id**
[`array`](../data-types.md) | Массив значений поля `MESSAGE_ID` записей, которые нужно удалить, — строки из 32 символов. По умолчанию и при пустом массиве удаляются все записи пакета `process_id` ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Передайте то же значение, с которым пакет получен методом `event.offline.get`, иначе метод ничего не удалит. Параметр доступен не на всех тарифах: проверьте его методом [feature.get](../common/system/feature-get.md) с кодом `rest_auth_connector`, иначе метод вернет ошибку `WRONG_LICENSE` ||
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
        "process_id": "yh3gu929sf0d32lsfysqas2y1hlpp09q",
        "id": [2],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.offline.clear
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
        method: 'event.offline.clear',
        params: {
          process_id: 'yh3gu929sf0d32lsfysqas2y1hlpp09q',
          id: [2],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Clear result:', result)
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
      async function clearOfflineEvents() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'event.offline.clear',
            params: {
              process_id: 'yh3gu929sf0d32lsfysqas2y1hlpp09q',
              id: [2],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Clear result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', clearOfflineEvents)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.event.offline.clear(
            process_id="yh3gu929sf0d32lsfysqas2y1hlpp09q",
            bitrix_id=[2],
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
                'event.offline.clear',
                [
                    'process_id' => 'yh3gu929sf0d32lsfysqas2y1hlpp09q',
                    'id'        => [2],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error clearing offline event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.offline.clear",
        {
            "process_id": "yh3gu929sf0d32lsfysqas2y1hlpp09q",
            "id": [2]
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
        'event.offline.clear',
        [
            'process_id' => 'yh3gu929sf0d32lsfysqas2y1hlpp09q',
            'id' => [2]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "event.offline.clear", b24.Params{
    	"process_id": "yh3gu929sf0d32lsfysqas2y1hlpp09q",
    	"id":         []int{2},
    })
    if err != nil {
    	return fmt.Errorf("event.offline.clear: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1721300421.210707,
        "finish": 1721300421.331026,
        "duration": 0.12031912803649902,
        "processing": 0.0022459030151367188,
        "date_start": "2024-07-18T13:00:21+02:00",
        "date_finish": "2024-07-18T13:00:21+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Всегда `true`, если метод не вернул ошибку. Количество удаленных записей метод не возвращает: ответ `true`, даже если по переданным значениям записи не найдены ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
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
|| `400` | `ERROR_ARGUMENT` | Argument 'PROCESS_ID' is null or empty | Не передан параметр `process_id` ||
|| `400` | `ERROR_ARGUMENT` | Value must be array of integers | Параметр `id` передан не массивом или содержит значение меньше `1` ||
|| `400` | `ERROR_ARGUMENT` | Value must be array of MESSAGE_ID values | Параметр `message_id` передан не массивом или содержит строку не из 32 символов ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал не администратор ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `WRONG_LICENSE` | This feature is not enabled for the current license: auth_connector | Передан `auth_connector`, а тариф не поддерживает ключи источников ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
