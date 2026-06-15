# Показать информацию о приложении app.info

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `app.info` возвращает информацию о приложении.

Без параметров. 

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/app.info
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/app.info
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AppInfoResult = {
      ID: number
      CODE: string
      VERSION: number
      STATUS: string
      INSTALLED: boolean
      PAYMENT_EXPIRED: string
      DAYS: number | null
      LANGUAGE_ID: string
      LICENSE: string
      LICENSE_TYPE: string
      LICENSE_FAMILY: string
    }

    try {
      const response = await $b24.actions.v2.call.make<AppInfoResult>({
        method: 'app.info',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.ID, result.CODE, result.STATUS, result.LICENSE)
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
      async function getAppInfo() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'app.info',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.CODE, result.STATUS, result.LICENSE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAppInfo)
    </script>
    ```

- PHP

    ```php        
    try {
        $applicationInfoResult = $serviceBuilder->getMainScope()->main()->getApplicationInfo();
        $itemResult = $applicationInfoResult->applicationInfo();
        print("ID: " . $itemResult->ID . PHP_EOL);
        print("Code: " . $itemResult->CODE . PHP_EOL);
        print("Scope: " . json_encode($itemResult->SCOPE, JSON_THROW_ON_ERROR) . PHP_EOL);
        print("Version: " . $itemResult->VERSION . PHP_EOL);
        print("Status: " . $itemResult->getStatus()->getStatusCode() . PHP_EOL);
        print("Installed: " . ($itemResult->INSTALLED ? 'true' : 'false') . PHP_EOL);
        print("Payment Expired: " . $itemResult->PAYMENT_EXPIRED . PHP_EOL);
        print("Days: " . $itemResult->DAYS . PHP_EOL);
        print("License: " . $itemResult->LICENSE . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "app.info",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'app.info',
        []
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
        "ID": 5,
        "CODE": "telefum24.kp10",
        "VERSION": 4,
        "STATUS": "F",
        "INSTALLED": true,
        "PAYMENT_EXPIRED": "N",
        "DAYS": null,
        "LANGUAGE_ID": "ru",
        "LICENSE": "ru_ent10000",
        "LICENSE_TYPE": "ent10000",
        "LICENSE_FAMILY": "ent"
    },
    "time": {
        "start": 1722841503.0585,
        "finish": 1722841503.09885,
        "duration": 0.0403509140014648,
        "processing": 0.00533103942871094,
        "date_start": "2024-08-05T07:05:03+00:00",
        "date_finish": "2024-08-05T07:05:03+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект содержит информацию о приложении:

- `ID` — локальный идентификатор приложения на портале 
- `CODE` — код приложения 
- `VERSION` — установленная версия приложения 
- `STATUS` — статус приложения. Возможные значения:
    - `F` (Free) — бесплатное
    - `D` (Demo) — демо-версия
    - `T` (Trial) — триальная версия (ограниченная по времени)
    - `P` (Paid) — оплаченное приложение
    - `L` (Local) — локальное приложение
    - `S` (Subscription) — подписное приложение 
- `INSTALLED` — [true\|false] cтатус установленности приложения. Если приложение не установлено, оно доступно только администраторам портала и должно сигнализировать об окончании установки при помощи вызова [BX24.installFinish](../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md)
- `PAYMENT_EXPIRED` — [Y\|N] флаг, показывающий, истек ли оплаченный период или период триального использования
- `DAYS` — количество дней, оставшееся до конца оплаченного периода или периода триального использования
- `LICENSE` — обозначение тарифа с указанием региона в виде префикса.Состоит из базового языка портала и идентификатора тарифного плана. В случае с тарифами, состав которых менялся при сохранении публичного наименования (как CRM+, Команда и Компания), понять, какой именно тариф действует по этому полю нельзя. Примеры вариантов значений:
    - `ru_project` — тариф Проект
    - `ru_basic` — тариф Базовый
    - `ru_std` — тариф Стандартный
    - `ru_pro100` — тариф Профессиональный
    - `ru_ent250` — Энтерпрайз 250
    - `ru_ent500` — Энтерпрайз 500
    - `ru_ent1000` — Энтерпрайз 1000
    - `ru_ent2000` — Энтерпрайз 2000
    - `ru_ent10000` — Энтерпрайз 10000 ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

{% note info "" %}

По истечении оплаченного периода приложение продолжит работать в течение периода, отводимого на возможные задержки поступления оплаты (grace period), по окончании которого будет автоматически переключено на демо-режим или заблокировано. При этом значение флага `PAYMENT_EXPIRED` будет равен `Y`, а поле `DAYS` будет содержать отрицательное число.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %} 

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Access denied! Application context required | Метод вызван вне контекста приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./access-name.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)
- [{#T}](./methods.md)