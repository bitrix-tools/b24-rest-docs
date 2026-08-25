# Получить привязанные к приложению данные app.option.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `app.option.get` получает данные, привязанные к приложению. Если ничего не подать на вход, вернет все записанные через [app.option.set](./app-option-set.md) свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **option**
[`string`](../../data-types.md) | Один из ключей, сохраненных методом [app.option.set](./app-option-set.md).

Если параметр не передан, метод вернет все сохраненные настройки приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}


{% list tabs %}

- cURL (Webhook)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "option": "data"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.option.get
    ```

    Пример №2

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.option.get
    ```

- cURL (OAuth)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "option": "data",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/app.option.get
    ```
    
    Пример №2
    
    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/app.option.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AppOptionResult = Record<string, string>

    // Example 1: get a specific option by key
    try {
      const response = await $b24.actions.v2.call.make<string | null>({
        method: 'app.option.get',
        params: {
          option: 'data',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Option value:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }

    // Example 2: get all options (no parameters)
    try {
      const response = await $b24.actions.v2.call.make<AppOptionResult>({
        method: 'app.option.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('All options:', Object.keys(result), result)
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
      async function getAppOptions() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // Example 1: get a specific option by key
          const response1 = await $b24.actions.v2.call.make({
            method: 'app.option.get',
            params: {
              option: 'data',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response1.isSuccess) {
            console.error(response1.getErrorMessages().join('; '))
            return
          }

          const result1 = response1.getData().result
          console.info('Option value:', result1)

          // Example 2: get all options (no parameters)
          const response2 = await $b24.actions.v2.call.make({
            method: 'app.option.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response2.isSuccess) {
            console.error(response2.getErrorMessages().join('; '))
            return
          }

          const result2 = response2.getData().result
          console.info('All options:', Object.keys(result2), result2)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAppOptions)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.app.option.get(
            option="default_language",
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

- BX24.js

    Пример №1

    ```js
    BX24.callMethod(
        'app.option.get',
        {
            "option":"data"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```
    
    Пример №2
    
    ```js
    BX24.callMethod(
        'app.option.get', {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    Пример №1
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'app.option.get',
        [
            'option' => 'data'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

    Пример №2
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'app.option.get',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "app.option.get", b24.Params{
    	"option": "data",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("app.option.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Вызов без параметра `option` — метод возвращает все сохраненные настройки приложения:

```json
{
    "result": {
        "data": "value",
        "data2": "value2"
    },
    "time": {
        "start": 1722001311.94644,
        "finish": 1722001311.98622,
        "duration": 0.0397801399230957,
        "processing": 0.000041961669921875,
        "date_start": "2024-07-26T13:41:51+00:00",
        "date_finish": "2024-07-26T13:41:51+00:00",
        "operating": 0
    }
}
```

Вызов с параметром `option` — метод возвращает значение одного ключа:

```json
{
    "result": "value",
    "time": {
        "start": 1722001311.94644,
        "finish": 1722001311.98622,
        "duration": 0.0397801399230957,
        "processing": 0.000041961669921875,
        "date_start": "2024-07-26T13:41:51+00:00",
        "date_finish": "2024-07-26T13:41:51+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md)\|[`string`](../../data-types.md)\|[`null`](../../data-types.md) | Зависит от параметра `option`:

- параметр не передан — объект, где ключ это название настройки, а значение это сохраненное значение. Если настроек нет, объект пустой
- параметр передан — сохраненное значение ключа
- параметр передан, но такого ключа нет — `null` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"AccessException",
    "error_description":"Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `AccessException` | Application context required | Метод вызван вне контекста приложения ||
|| `AccessException` | User authorization required | Пользователь не авторизован ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./app-option-set.md)
- [{#T}](./user-option-set.md)
- [{#T}](./user-option-get.md)