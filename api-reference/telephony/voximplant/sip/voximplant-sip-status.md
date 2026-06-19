# Получить статус SIP-регистрации voximplant.sip.status

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.status` возвращает текущий статус SIP-регистрации для облачной АТС.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **REG_ID***
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации.

Идентификатор можно получить с помощью метода [voximplant.sip.get](./voximplant-sip-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REG_ID":150907}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.status
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REG_ID":150907,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.status
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SipStatusResult = {
      REG_ID: number
      LAST_UPDATED: string
      ERROR_MESSAGE: string
      STATUS_CODE: number
      STATUS_RESULT: 'success' | 'error' | 'in_progress' | 'wait'
    }

    try {
      const response = await $b24.actions.v2.call.make<SipStatusResult>({
        method: 'voximplant.sip.status',
        params: {
          REG_ID: 150907,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.STATUS_RESULT, result.STATUS_CODE, result.ERROR_MESSAGE)
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
      async function getSipStatus() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'voximplant.sip.status',
            params: {
              REG_ID: 150907,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.STATUS_RESULT, result.STATUS_CODE, result.ERROR_MESSAGE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSipStatus)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'voximplant.sip.status',
                [
                    'REG_ID' => 150907
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
        'voximplant.sip.status',
        {
            REG_ID: 150907
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'voximplant.sip.status',
        [
            'REG_ID' => 150907
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
        "REG_ID": 150907,
        "LAST_UPDATED": "2026-03-12 09:10:51",
        "ERROR_MESSAGE": "",
        "STATUS_CODE": 200,
        "STATUS_RESULT": "success"
    },
    "time": {
        "start": 1773323644,
        "finish": 1773323644.70319,
        "duration": 0.7031900882720947,
        "processing": 0,
        "date_start": "2026-03-12T16:54:04+03:00",
        "date_finish": "2026-03-12T16:54:04+03:00",
        "operating_reset_at": 1773324244,
        "operating": 0.15053892135620117
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект со статусом SIP-регистрации ||
|| **REG_ID**
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации ||
|| **LAST_UPDATED**
[`string`](../../../data-types.md) | Дата и время последнего обновления статуса SIP-регистрации ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Текстовое описание ошибки регистрации ||
|| **STATUS_CODE**
[`integer`](../../../data-types.md) | Числовой код состояния или ошибки регистрации ||
|| **STATUS_RESULT**
[`string`](../../../data-types.md) | Результат регистрации.

Возможные значения:

- `success` — SIP-регистрация успешно выполнена
- `error` — при SIP-регистрации произошла ошибка
- `in_progress` — SIP-регистрация выполняется в данный момент
- `wait` — SIP-регистрация ожидает запуска ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "REG_ID_NOT_FOUND",
    "error_description": "Настройки не найдены"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `REG_ID_NOT_FOUND` | `Настройки не найдены` | SIP-регистрация с указанным `REG_ID` не найдена ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для получения статуса SIP-регистрации ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-connector-status.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-update.md)
