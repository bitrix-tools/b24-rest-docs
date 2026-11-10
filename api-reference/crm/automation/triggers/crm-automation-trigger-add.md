# Добавить триггер crm.automation.trigger.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.automation.trigger.add` регистрирует триггер приложения — событие, по которому CRM может перевести сделку или другой объект на нужную стадию или в статус. Например, приложение телефонии регистрирует триггер «Звонок завершен» с кодом `call_done`. Затем администратор привязывает его к стадии в настройках автоматизации CRM, и приложение запускает триггер методом [crm.automation.trigger.execute](./crm-automation-trigger-execute.md). Порядок работы описан в [обзоре триггеров](./index.md).

Работает только в контексте [приложения](../../../../settings/app-installation/index.md): триггер принадлежит приложению, которое его зарегистрировало.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Код триггера, уникальный в рамках приложения, например `call_done`. Допустимы латинские буквы, цифры и символы `.`, `-`, `_`.

Если у приложения уже есть триггер с таким `CODE`, метод обновит его название `NAME` ||
|| **NAME***
[`string`](../../../data-types.md) | Название триггера. Его видно в настройках автоматизации CRM, когда триггер привязывают к стадии ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"call_done","NAME":"Звонок завершен","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.add
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
        method: 'crm.automation.trigger.add',
        params: {
          CODE: 'call_done',
          NAME: 'Звонок завершен',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Trigger added:', result)
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
      async function addAutomationTrigger() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.automation.trigger.add',
            params: {
              CODE: 'call_done',
              NAME: 'Звонок завершен',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Trigger added:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addAutomationTrigger)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.automation.trigger.add(
            code="call_done",
            name="Звонок завершен",
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
        $result = $b24Service
            ->core
            ->call(
                'crm.automation.trigger.add',
                [
                    'CODE' => 'call_done',
                    'NAME' => 'Звонок завершен',
                ]
            )
            ->getResponseData()
            ->getResult();

        // The SDK wraps the boolean result of the method in an array
        echo $result[0] ? 'Trigger saved' : 'Trigger not saved';
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding automation trigger: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.automation.trigger.add',
        {
            "CODE": 'call_done',
            "NAME": 'Звонок завершен'
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
        'crm.automation.trigger.add',
        [
            'CODE' => 'call_done',
            'NAME' => 'Звонок завершен'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.automation.trigger.add", b24.Params{
    	"CODE": "call_done",
    	"NAME": "Звонок завершен",
    })
    if err != nil {
    	return fmt.Errorf("crm.automation.trigger.add: %w", err)
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
        "start":1718884406.366687,
        "finish":1718884406.80718,
        "duration":0.4404928684234619,
        "processing":0.03356289863586426,
        "date_start":"2024-06-20T11:53:26+00:00",
        "date_finish":"2024-06-20T11:53:26+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | `true`, если триггер зарегистрирован или у существующего триггера с тем же `CODE` обновлено название ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | У пользователя нет доступа к CRM ||
|| `403` | `ACCESS_DENIED` | Access denied! Admin permissions required | Метод вызвал не администратор ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Метод вызван не из приложения, например через вебхук ||
|| `400` | Пустое значение | Empty trigger code! | Параметр `CODE` не передан, пустой или равен `0` ||
|| `400` | Пустое значение | Wrong trigger code! | В `CODE` есть символы, кроме латинских букв, цифр и `.`, `-`, `_` ||
|| `400` | Пустое значение | Empty trigger name! | Параметр `NAME` не передан, пустой или равен `0` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-automation-trigger-execute.md)
- [{#T}](./crm-automation-trigger-list.md)
- [{#T}](./crm-automation-trigger-delete.md)
