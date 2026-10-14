# Запустить выполнение триггера crm.automation.trigger.execute

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.automation.trigger.execute` сообщает автоматизации CRM, что для объекта сработал триггер приложения. Если этот триггер привязан к стадии или статусу в настройках автоматизации, он может перевести объект на эту стадию или в этот статус. Например, приложение телефонии запускает триггер `call_done` после звонка, и сделка переходит на стадию «В работе».

Работает только в контексте [приложения](../../../../settings/app-installation/index.md). Триггер нужно заранее зарегистрировать методом [crm.automation.trigger.add](./crm-automation-trigger-add.md) и привязать к стадии в настройках автоматизации — порядок описан в [обзоре триггеров](./index.md).

{% note warning "" %}

Ответ `true` не подтверждает смену стадии. Метод вернет `true`, даже если стадия не изменилась:

- триггер не привязан к стадии или не выполнены его условия
- объект уже находится на стадии, к которой привязан триггер
- стадия триггера в воронке раньше текущей стадии объекта, а переход на предыдущую стадию в настройках триггера запрещен
- объекта с таким `OWNER_ID` нет

Чтобы проверить результат, получите стадию объекта методом [crm.item.get](../../universal/crm-item-get.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Код триггера, который приложение передало при регистрации, например `call_done` ||
|| **OWNER_TYPE_ID***
[`integer`](../../../data-types.md) | Тип объекта CRM по справочнику [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md), например `2` — сделка.

Триггеры есть в лидах, сделках, предложениях, счетах и смарт-процессах. Если передать контакт или компанию, триггер сработает для связанных с ними объектов, например сделок ||
|| **OWNER_ID***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM, например сделки. Его возвращает метод [crm.item.list](../../universal/crm-item-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"call_done","OWNER_TYPE_ID":2,"OWNER_ID":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.automation.trigger.execute
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
        method: 'crm.automation.trigger.execute',
        params: {
          CODE: 'call_done',
          OWNER_TYPE_ID: 2,
          OWNER_ID: 6,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Trigger event sent:', result)
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
      async function executeAutomationTrigger() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.automation.trigger.execute',
            params: {
              CODE: 'call_done',
              OWNER_TYPE_ID: 2,
              OWNER_ID: 6,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Trigger event sent:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', executeAutomationTrigger)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.automation.trigger.execute(
            code="call_done",
            owner_type_id=2,
            owner_id=6,
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
                'crm.automation.trigger.execute',
                [
                    'CODE'          => 'call_done',
                    'OWNER_TYPE_ID' => 2,
                    'OWNER_ID'      => 6,
                ]
            )
            ->getResponseData()
            ->getResult();

        // The SDK wraps the boolean result of the method in an array.
        // true does not confirm the stage change: read the item to check it
        echo $result[0] ? 'Trigger event sent' : 'Trigger event not sent';
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error executing automation trigger: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.automation.trigger.execute',
        {
            CODE: 'call_done',
            OWNER_TYPE_ID: 2,
            OWNER_ID: 6
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
        'crm.automation.trigger.execute',
        [
            'CODE' => 'call_done',
            'OWNER_TYPE_ID' => 2,
            'OWNER_ID' => 6
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.automation.trigger.execute", b24.Params{
    	"CODE":          "call_done",
    	"OWNER_TYPE_ID": 2,
    	"OWNER_ID":      6,
    })
    if err != nil {
    	return fmt.Errorf("crm.automation.trigger.execute: %w", err)
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
        "start": 1790706808,
        "finish": 1790706808.400356,
        "duration": 0.4003560543060303,
        "processing": 0,
        "date_start": "2026-09-29T18:33:28+00:00",
        "date_finish": "2026-09-29T18:33:28+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | `true`, если Битрикс24 принял событие триггера ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Incorrect parameter OWNER_TYPE_ID."
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
|| `400` | Пустое значение | Trigger with code call_done is not registered. | У текущего приложения нет триггера с кодом из `CODE`. В тексте ошибки вместо `call_done` будет переданный код ||
|| `400` | Пустое значение | Incorrect parameter OWNER_TYPE_ID. | В CRM нет типа объекта с таким `OWNER_TYPE_ID` ||
|| `400` | Пустое значение | Incorrect parameter OWNER_ID. | `OWNER_ID` не передан или не больше нуля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-automation-trigger-add.md)
- [{#T}](./crm-automation-trigger-list.md)
- [{#T}](./crm-automation-trigger-delete.md)
