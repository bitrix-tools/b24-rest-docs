# Изменить оплату sale.payment.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.payment.update` изменяет существующую оплату заказа.

Передавайте в `fields` только изменяемые поля и обязательный `paySystemId`: при обновлении он также требуется, даже если платежная система не меняется. Непереданные поля сохраняют значения, но изменение статуса оплаты, возврата или ответственного может автоматически изменить связанные служебные поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../data-types.md#sale_order_payment) | Идентификатор оплаты ||
|| **fields***
[`object`](../../data-types.md) | Поля для обновления оплаты [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **paySystemId***
[`sale_paysystem.id`](../data-types.md#sale_paysystem) | Идентификатор платежной системы. Обязателен при каждом обновлении ||
|| **paid**
[`string`](../../data-types.md) | Признак оплаты:

- `Y` — да
- `N` — нет ||
|| **datePaid**
[`datetime`](../../data-types.md) | Дата оплаты ||
|| **empPaidId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который внес оплату. При переходе в `paid = Y` устанавливается текущий пользователь ||
|| **psStatus**
[`string`](../../data-types.md) | Признак успешной оплаты по данным платежной системы. Варианты:

- `Y` — да
- `N` — нет ||
|| **psStatusCode**
[`string`](../../data-types.md) | Код статуса платежной системы ||
|| **psStatusDescription**
[`string`](../../data-types.md) | Описание результата работы платежной системы ||
|| **psStatusMessage**
[`string`](../../data-types.md) | Сообщение от платежной системы ||
|| **psSum**
[`double`](../../data-types.md) | Сумма платежной системы ||
|| **psCurrency**
[`string`](../../data-types.md) | Валюта платежной системы ||
|| **psResponseDate**
[`datetime`](../../data-types.md) | Дата ответа платежной системы ||
|| **payVoucherNum**
[`string`](../../data-types.md) | Номер платежного документа ||
|| **payVoucherDate**
[`datetime`](../../data-types.md) | Дата платежного документа ||
|| **datePayBefore**
[`datetime`](../../data-types.md) | Срок оплаты счета ||
|| **dateBill**
[`datetime`](../../data-types.md) | Дата выставления счета ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **sum**
[`double`](../../data-types.md) | Сумма оплаты. Сумму уже оплаченной оплаты изменить нельзя ||
|| **companyId**
[`integer`](../../data-types.md) | Идентификатор компании, которая будет принимать оплату ||
|| **payReturnNum**
[`string`](../../data-types.md) | Номер документа возврата ||
|| **priceCod**
[`double`](../../data-types.md) | Стоимость оплаты при доставке. Используется для наложенного платежа ||
|| **payReturnDate**
[`date`](../../data-types.md) | Дата документа возврата ||
|| **empReturnId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который выполнял возврат ||
|| **payReturnComment**
[`string`](../../data-types.md) | Комментарий к возврату ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, ответственного за оплату ||
|| **empResponsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, назначившего ответственного. При смене `responsibleId` устанавливается текущий пользователь ||
|| **isReturn**
[`string`](../../data-types.md) | Режим возврата:

- `Y` — на внутренний счет
- `P` — через платежную систему
- `N` — без возврата ||
|| **comments**
[`string`](../../data-types.md) | Комментарии к оплате ||
|| **updated1c**
[`string`](../../data-types.md) | Оплата обновлена через 1С:

- `Y` — да
- `N` — нет ||
|| **id1c**
[`string`](../../data-types.md) | Идентификатор в 1С ||
|| **version1c**
[`string`](../../data-types.md) | Версия документа оплаты от 1С ||
|| **externalPayment**
[`string`](../../data-types.md) | Внешняя оплата или нет. Используется для импорта из 1С через XML

- `Y` — да
- `F` — да, загружена вместе с заказом
- `N` — нет ||
|| **psInvoiceId**
[`string`](../../data-types.md) | Идентификатор оплаты в платежной системе ||
|| **marked**
[`string`](../../data-types.md) | Признак того, отмечена ли оплата как проблемная:

- `Y` — да
- `N` — нет ||
|| **reasonMarked**
[`string`](../../data-types.md) | Причина маркировки ||
|| **empMarkedId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, промаркировавшего оплату ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":144,"fields":{"paySystemId":1,"paid":"Y","datePaid":"2024-04-10T10:00:00","empPaidId":1,"psStatus":"Y","psSum":100,"psCurrency":"RUB","psResponseDate":"2024-04-10T10:00:00","sum":100,"companyId":1,"responsibleId":1,"empResponsibleId":1,"isReturn":"N","externalPayment":"N","psInvoiceId":"1","marked":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.payment.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":144,"fields":{"paySystemId":1,"paid":"Y","datePaid":"2024-04-10T10:00:00","empPaidId":1,"psStatus":"Y","psSum":100,"psCurrency":"RUB","psResponseDate":"2024-04-10T10:00:00","sum":100,"companyId":1,"responsibleId":1,"empResponsibleId":1,"isReturn":"N","externalPayment":"N","psInvoiceId":"1","marked":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.payment.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PaymentUpdateResult = {
      payment: {
        accountNumber: string,
        comments: string,
        companyId: number | null,
        currency: string,
        dateBill: ISODate | null,
        dateMarked: ISODate | null,
        datePaid: ISODate | null,
        datePayBefore: ISODate | null,
        dateResponsibleId: ISODate | null,
        empMarkedId: number | null,
        empPaidId: number | null,
        empResponsibleId: number | null,
        empReturnId: number | null,
        externalPayment: string,
        id: number,
        id1c: string,
        isReturn: string,
        marked: string,
        orderId: number,
        paid: string,
        payReturnComment: string,
        payReturnDate: ISODate | null,
        payReturnNum: string,
        paySystemId: number,
        paySystemIsCash: string,
        paySystemName: string,
        paySystemXmlId: string,
        payVoucherDate: ISODate | null,
        payVoucherNum: string,
        priceCod: number,
        psCurrency: string,
        psInvoiceId: string,
        psResponseDate: ISODate | null,
        psStatus: string,
        psStatusCode: string,
        psStatusDescription: string,
        psStatusMessage: string,
        psSum: number | null,
        reasonMarked: string,
        responsibleId: number | null,
        sum: number,
        updated1c: string,
        version1c: string,
        xmlId: string,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<PaymentUpdateResult>({
        method: 'sale.payment.update',
        params: {
          id: 144,
          fields: {
            paySystemId: 1,
            paid: 'Y',
            datePaid: '2024-04-10T10:00:00',
            empPaidId: 1,
            psStatus: 'Y',
            psSum: 100,
            psCurrency: 'RUB',
            psResponseDate: '2024-04-10T10:00:00',
            sum: 100,
            companyId: 1,
            responsibleId: 1,
            empResponsibleId: 1,
            isReturn: 'N',
            externalPayment: 'N',
            psInvoiceId: '1',
            marked: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated payment:', result.payment.id, 'paid:', result.payment.paid)
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
      async function updatePayment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.payment.update',
            params: {
              id: 144,
              fields: {
                paySystemId: 1,
                paid: 'Y',
                datePaid: '2024-04-10T10:00:00',
                empPaidId: 1,
                psStatus: 'Y',
                psSum: 100,
                psCurrency: 'RUB',
                psResponseDate: '2024-04-10T10:00:00',
                sum: 100,
                companyId: 1,
                responsibleId: 1,
                empResponsibleId: 1,
                isReturn: 'N',
                externalPayment: 'N',
                psInvoiceId: '1',
                marked: 'N',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated payment:', result.payment.id, 'paid:', result.payment.paid)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePayment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "paySystemId": 1,
        "paid": "Y",
        "datePaid": "2024-04-10T10:00:00",
        "empPaidId": 1,
        "psStatus": "Y",
        "psSum": 100,
        "psCurrency": "RUB",
        "psResponseDate": "2024-04-10T10:00:00",
        "sum": 100,
        "companyId": 1,
        "responsibleId": 1,
        "empResponsibleId": 1,
        "isReturn": "N",
        "externalPayment": "N",
        "psInvoiceId": "1",
        "marked": "N",
    }

    try:
        bitrix_response = client.sale.payment.update(
            bitrix_id=144,
            fields=fields,
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
                'sale.payment.update',
                [
                    'id' => 144,
                    'fields' => [
                        'paySystemId'          => 1,
                        'paid'                 => 'Y',
                        'datePaid'             => '2024-04-10T10:00:00',
                        'empPaidId'            => 1,
                        'psStatus'             => 'Y',
                        'psSum'                => 100,
                        'psCurrency'           => 'RUB',
                        'psResponseDate'       => '2024-04-10T10:00:00',
                        'sum'                  => 100,
                        'companyId'            => 1,
                        'responsibleId'        => 1,
                        'empResponsibleId'     => 1,
                        'isReturn'             => 'N',
                        'externalPayment'      => 'N',
                        'psInvoiceId'          => '1',
                        'marked'               => 'N',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.payment.update',
        {
            id: 144,
            fields: {
                paySystemId: 1,
                paid: 'Y',
                datePaid: '2024-04-10T10:00:00',
                empPaidId: 1,
                psStatus: 'Y',
                psSum: 100,
                psCurrency: 'RUB',
                psResponseDate: '2024-04-10T10:00:00',
                sum: 100,
                companyId: 1,
                responsibleId: 1,
                empResponsibleId: 1,
                isReturn: 'N',
                externalPayment: 'N',
                psInvoiceId: '1',
                marked: 'N',
            }
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
        'sale.payment.update',
        [
            'id' => 144,
            'fields' => [
                'paySystemId' => 1,
                'paid' => 'Y',
                'datePaid' => '2024-04-10T10:00:00',
                'empPaidId' => 1,
                'psStatus' => 'Y',
                'psSum' => 100,
                'psCurrency' => 'RUB',
                'psResponseDate' => '2024-04-10T10:00:00',
                'sum' => 100,
                'companyId' => 1,
                'responsibleId' => 1,
                'empResponsibleId' => 1,
                'isReturn' => 'N',
                'externalPayment' => 'N',
                'psInvoiceId' => '1',
                'marked' => 'N',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.payment.update", b24.Params{
    	"id": 144,
    	"fields": b24.Params{
    		"paySystemId":      1,
    		"paid":             "Y",
    		"datePaid":         "2024-04-10T10:00:00",
    		"empPaidId":        1,
    		"psStatus":         "Y",
    		"psSum":            100,
    		"psCurrency":       "RUB",
    		"psResponseDate":   "2024-04-10T10:00:00",
    		"sum":              100,
    		"companyId":        1,
    		"responsibleId":    1,
    		"empResponsibleId": 1,
    		"isReturn":         "N",
    		"externalPayment":  "N",
            "psInvoiceId":      "1",
    		"marked":           "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.payment.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "payment".
    raw, ok := b24.Unwrap(res.Result, "payment")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа payment")
    }

    var item struct {
    	AccountNumber string `json:"accountNumber"`
    	Comments      string `json:"comments"`
    	CompanyID     b24.ID `json:"companyId"`
    	Currency      string `json:"currency"`
    	DateBill      string `json:"dateBill"`
    	DateMarked    string `json:"dateMarked"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.AccountNumber, item.Comments)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "payment": {
            "accountNumber": "356\/1",
            "comments": "",
            "companyId": 1,
            "currency": "RUB",
            "dateBill": "2024-04-10T10:00:00+03:00",
            "dateMarked": "2024-04-16T16:32:49+03:00",
            "datePaid": "2024-04-10T10:00:00+03:00",
            "datePayBefore": "2024-04-10T10:00:00+03:00",
            "dateResponsibleId": "2024-04-16T16:32:49+03:00",
            "empMarkedId": 1,
            "empPaidId": 1,
            "empResponsibleId": 1,
            "empReturnId": 1,
            "externalPayment": "N",
            "id": 144,
            "id1c": "",
            "isReturn": "N",
            "marked": "N",
            "orderId": 200,
            "paid": "Y",
            "payReturnComment": "",
            "payReturnDate": "2024-04-10T03:00:00+03:00",
            "payReturnNum": "",
            "paySystemId": 1,
            "paySystemIsCash": "N",
            "paySystemName": "Банковский перевод (Компании)",
            "paySystemXmlId": "",
            "payVoucherDate": "2024-04-10T10:00:00+03:00",
            "payVoucherNum": "",
            "priceCod": 100,
            "psCurrency": "RUB",
            "psInvoiceId": "1",
            "psResponseDate": "2024-04-10T10:00:00+03:00",
            "psStatus": "Y",
            "psStatusCode": "",
            "psStatusDescription": "",
            "psStatusMessage": "",
            "psSum": 100,
            "reasonMarked": "",
            "responsibleId": 1,
            "sum": 100,
            "updated1c": "N",
            "version1c": "",
            "xmlId": ""
        }
    },
    "time": {
        "start": 1713454774.293692,
        "finish": 1713454778.895877,
        "duration": 4.602184772491455,
        "processing": 4.142766952514648,
        "date_start": "2024-04-18T18:39:34+03:00",
        "date_finish": "2024-04-18T18:39:38+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.payment**
[`sale_order_payment`](../data-types.md#sale_order_payment) | Обновленная оплата. Кроме входных полей, объект содержит `id` оплаты, `orderId` заказа, номер `accountNumber`, валюту `currency`, название, тип и внешний код платежной системы (`paySystemName`, `paySystemIsCash`, `paySystemXmlId`), даты маркировки и смены ответственного (`dateMarked`, `dateResponsibleId`) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200640400001",
    "error_description":"payment is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200640400001` | `payment is not exists`

Обновляемая оплата не найдена ||
|| `200040300020` | `Access Denied`

Недостаточно прав для обновления оплаты ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан параметр `fields` ||
|| `0` | `Required fields: paySystemId`

В `fields` не передано поле `paySystemId`, в том числе при пустом объекте `fields` ||
|| `0` | `Нельзя изменить сумму оплаты, если установлен статус "Оплачено"`

Передана другая сумма для уже оплаченной оплаты ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-payment-add.md)
- [{#T}](./sale-payment-get.md)
- [{#T}](./sale-payment-list.md)
- [{#T}](./sale-payment-delete.md)
- [{#T}](./sale-payment-get-fields.md)
