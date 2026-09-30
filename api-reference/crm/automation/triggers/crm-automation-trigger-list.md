# Получить список триггеров crm.automation.trigger.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.automation.trigger.list` возвращает триггеры, которые текущее приложение зарегистрировало методом [crm.automation.trigger.add](./crm-automation-trigger-add.md). Коды триггеров из ответа передают в методы [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) и [crm.automation.trigger.delete](./crm-automation-trigger-delete.md). Например, перед удалением триггера приложение находит в списке его код `CODE`.

Работает только в контексте [приложения](../../../../settings/app-installation/index.md).

## Параметры метода

Без параметров. Метод возвращает весь список сразу, без постраничной навигации: `start`, `filter` и `order` он не учитывает.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each trigger returned in result[]
    type TriggerItem = {
      NAME: string
      CODE: string
    }

    // crm.automation.trigger.list returns all triggers of the current application at once
    try {
      const response = await $b24.actions.v2.call.make<TriggerItem[]>({
        method: 'crm.automation.trigger.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Triggers:', result.length, result)
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
      async function loadTriggerList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.automation.trigger.list returns all triggers of the current application at once
          const response = await $b24.actions.v2.call.make({
            method: 'crm.automation.trigger.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Triggers:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', loadTriggerList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.automation.trigger.list().response
        for trigger in bitrix_response.result:
            print(trigger["CODE"], trigger["NAME"])
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
            ->getCRMScope()
            ->trigger()
            ->list();

        foreach ($result->getTriggers() as $trigger) {
            echo $trigger->CODE . ' — ' . $trigger->NAME . PHP_EOL;
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching automation triggers: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.automation.trigger.list',
        {},
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
        'crm.automation.trigger.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.automation.trigger.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.automation.trigger.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "NAME": "Оплата получена",
            "CODE": "payment_received"
        },
        {
            "NAME": "Звонок завершен",
            "CODE": "call_done"
        }
    ],
    "time": {
        "start": 1790705980,
        "finish": 1790705980.904287,
        "duration": 0.9042870998382568,
        "processing": 0,
        "date_start": "2026-09-29T18:19:40+00:00",
        "date_finish": "2026-09-29T18:19:40+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив триггеров текущего приложения [(подробное описание)](#trigger). Если приложение не зарегистрировало ни одного триггера, метод вернет пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#trigger}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../data-types.md) | Название триггера, например `Звонок завершен`. В настройках автоматизации CRM перед ним стоит название приложения в квадратных скобках, а если названия нет — номер приложения ||
|| **CODE**
[`string`](../../../data-types.md) | Код триггера внутри приложения. Его передают в методы [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) и [crm.automation.trigger.delete](./crm-automation-trigger-delete.md) ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Admin permissions required"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | У пользователя нет доступа к CRM ||
|| `403` | `ACCESS_DENIED` | Access denied! Admin permissions required | Метод вызвал не администратор ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Метод вызван не из приложения, например через вебхук ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-automation-trigger-add.md)
- [{#T}](./crm-automation-trigger-execute.md)
- [{#T}](./crm-automation-trigger-delete.md)
