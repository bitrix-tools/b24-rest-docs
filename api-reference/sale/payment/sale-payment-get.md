# Получить оплату по Id sale.payment.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает значения всех полей оплаты по `Id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../data-types.md) | Идентификатор оплаты ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.payment.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.payment.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PaymentGetResult = {
      payment: {
        accountNumber: string
        comments: string
        companyId: number | null
        currency: string
        dateBill: ISODate | null
        dateMarked: ISODate | null
        datePaid: ISODate | null
        datePayBefore: ISODate | null
        dateResponsibleId: ISODate | null
        empMarkedId: number | null
        empPaidId: number | null
        empResponsibleId: number
        empReturnId: number | null
        externalPayment: string
        id: number
        id1c: string
        isReturn: string
        marked: string
        orderId: number
        paid: string
        payReturnComment: string
        payReturnDate: ISODate | null
        payReturnNum: string
        paySystemId: number
        paySystemIsCash: string
        paySystemName: string
        paySystemXmlId: string
        payVoucherDate: ISODate | null
        payVoucherNum: string
        priceCod: string
        psCurrency: string
        psInvoiceId: number | null
        psResponseDate: ISODate | null
        psStatus: string
        psStatusCode: string
        psStatusDescription: string
        psStatusMessage: string
        psSum: number | null
        reasonMarked: string
        responsibleId: number
        sum: number
        updated1c: string
        version1c: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PaymentGetResult>({
        method: 'sale.payment.get',
        params: {
          id: 6,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.payment.id, result.payment.sum, result.payment.paid)
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
      async function getPayment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.payment.get',
            params: {
              id: 6,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.payment.id, result.payment.sum, result.payment.paid)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPayment)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.payment.get',
                [
                    'id' => 6,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Payment data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting payment information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.payment.get",
        {
            "id": 6
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.payment.get',
        [
            'id' => 6
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
        "payment": {
            "accountNumber": "161\/1",
            "comments": "",
            "companyId": null,
            "currency": "RUB",
            "dateBill": "2022-10-14T16:46:27+03:00",
            "dateMarked": null,
            "datePaid": null,
            "datePayBefore": null,
            "dateResponsibleId": "2022-10-14T16:46:27+03:00",
            "empMarkedId": null,
            "empPaidId": null,
            "empResponsibleId": 1,
            "empReturnId": null,
            "externalPayment": "N",
            "id": 6,
            "id1c": "",
            "isReturn": "N",
            "marked": "N",
            "orderId": 5,
            "paid": "N",
            "payReturnComment": "",
            "payReturnDate": null,
            "payReturnNum": "",
            "paySystemId": 6,
            "paySystemIsCash": "Y",
            "paySystemName": "Наличные",
            "paySystemXmlId": "bx_64134ba550ffa",
            "payVoucherDate": null,
            "payVoucherNum": "",
            "priceCod": "0",
            "psCurrency": "",
            "psInvoiceId": null,
            "psResponseDate": null,
            "psStatus": "",
            "psStatusCode": "",
            "psStatusDescription": "",
            "psStatusMessage": "",
            "psSum": null,
            "reasonMarked": "",
            "responsibleId": 1,
            "sum": 2352,
            "updated1c": "N",
            "version1c": "",
            "xmlId": "bx_6349845343355"
        }
    },
    "time": {
        "start": 1713446368.239796,
        "finish": 1713446369.113212,
        "duration": 0.8734161853790283,
        "processing": 0.4978961944580078,
        "date_start": "2024-04-18T16:19:28+03:00",
        "date_finish": "2024-04-18T16:19:29+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **payment**
[`sale_order_payment`](../data-types.md) | Информация об оплате ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200640400001,
    "error_description":"payment is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200640400001` | Оплата не найдена ||
|| `200040300010` | Недостаточно прав для чтения оплаты ||
|| `100` | Не указан параметр `id` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-add.md)
- [{#T}](./sale-payment-update.md)
- [{#T}](./sale-payment-list.md)
- [{#T}](./sale-payment-delete.md)
- [{#T}](./sale-payment-get-fields.md)