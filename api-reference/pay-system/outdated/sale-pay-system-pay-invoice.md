# Оплатить счет через конкретную платежную систему sale.paysystem.pay.invoice

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pay_system `](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на создание и редактирование счетов CRM (старая версия)

Метод служит для оплаты счета (старая версия) через конкретную платежную систему. Он вызывается после обработки ответа от платежной системы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **INVOICE_ID***
[`integer`](../../data-types.md) | Идентификатор счета старой версии. Для получения информации по счетам используется сервис [crm.invoice.*](../../crm/outdated/invoice/index.md)
||
|| **PAY_SYSTEM_ID**
[`sale_paysystem.ID`](../../sale/data-types.md) | Идентификатор платежной системы
||
|| **BX_REST_HANDLER**
[`string`](../../data-types.md) | Символьный идентификатор REST-обработчика платежной системы.

Обязательно передавать либо параметр `PAY_SYSTEM_ID`, либо `BX_REST_HANDLER`:
- при передаче `PAY_SYSTEM_ID` используется платежная система с указанным идентификтором 
- при передаче `BX_REST_HANDLER` используется первая найденная платежная система с указанным обработчиков 

При передаче обоих параметров приоритет имеет параметр `PAY_SYSTEM_ID`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"INVOICE_ID":2,"PAY_SYSTEM_ID":31}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.pay.invoice
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"INVOICE_ID":2,"PAY_SYSTEM_ID":31,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.pay.invoice
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
        method: 'sale.paysystem.pay.invoice',
        params: {
          INVOICE_ID: 2,
          PAY_SYSTEM_ID: 31,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Invoice paid successfully:', result)
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
      async function payInvoice() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.paysystem.pay.invoice',
            params: {
              INVOICE_ID: 2,
              PAY_SYSTEM_ID: 31,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Invoice paid successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', payInvoice)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paysystem.pay.invoice',
                [
                    'INVOICE_ID'    => 2,
                    'PAY_SYSTEM_ID' => 31,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error paying invoice: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sale.paysystem.pay.invoice', {
        "INVOICE_ID": 2,
        "PAY_SYSTEM_ID": 31,
    }, 
    function(result) 
    { 
        if (result.error()) 
        {
            console.error(result.error()); 
        }
        else 
        { 
            console.dir(result.data()); 
        } 
    } 
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.pay.invoice',
        [
            'INVOICE_ID' => 2,
            'PAY_SYSTEM_ID' => 31
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
    "result": true,
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат оплаты счета ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "Pay system not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для оплаты счета | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение одного из обязательных полей, не найдена платежная система с указанным REST-обработчиком либо не найден счет с указанным `ID` (детали смотрите в описании ошибки) | 400 ||
|| `ERROR_PAY_INVOICE_NOT_SUPPORTED` | Оплата счетов не поддерживается на портале | 400 ||
|| `ERROR_INTERNAL_INVOICE_NOT_FOUND` | Не найден счет с указанным `ID` | 400 ||
|| `ERROR_PROCESS_REQUEST_RESULT` | Не найдена платежная система с указанным `ID` либо произошла ошибка при обработке запроса платежной системой (детали смотрите в описании ошибки) | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-settings-invoice-get.md)
