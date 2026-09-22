# Получить список типов клиентов booking.v1.clienttype.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.clienttype.list` возвращает список доступных типов клиентов. Метод может не вернуть тип клиента, если с ним не было создано ни одной брони.
Стандартно доступно два типа клиента: контакт и компания.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.clienttype.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.clienttype.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ClientTypeListResult = {
      clientType: {
        code: string
        module: string
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<ClientTypeListResult>({
        method: 'booking.v1.clienttype.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Client types:', result.clientType)
        console.info('Count:', result.clientType.length)
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
      async function listClientTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.clienttype.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Client types:', result.clientType)
          console.info('Count:', result.clientType.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listClientTypes)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.clienttype.list().response
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
                'booking.v1.clienttype.list',
                []
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
        echo 'Error listing client types: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.clienttype.list",
        {},
        result => {
            if (result.error())
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
        'booking.v1.clienttype.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.clienttype.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("booking.v1.clienttype.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "clientType".
    raw, ok := b24.Unwrap(res.Result, "clientType")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа clientType")
    }

    var items []struct {
    	Code   string `json:"code"`
    	Module string `json:"module"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Code)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "clientType": [
            {
                "code": "COMPANY",
                "module": "crm"
            },
            {
                "code": "CONTACT",
                "module": "crm"
            }
        ]
    },
    "time": {
     "start": 1724068028.331234,
     "finish": 1724068028.726591,
     "duration": 0.3953571319580078,
     "processing": 0.13033390045166016,
     "date_start": "2025-01-21T13:47:08+02:00",
     "date_finish": "2025-01-21T13:47:08+02:00",
     "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **clientType**
[`object[]`](../data-types.md) | Список типов клиентов [(подробное описание)](#client-type) ||
|#

#### Объект clientType {#client-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код типа клиента, например `CONTACT` или `COMPANY` ||
|| **module**
[`string`](../data-types.md) | Идентификатор модуля, которому принадлежит тип клиента, например `crm` ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}
{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking/client/booking-v1-booking-client-set.md)
- [{#T}](./booking/client/booking-v1-booking-client-unset.md)
- [{#T}](./booking/client/booking-v1-booking-client-list.md)
