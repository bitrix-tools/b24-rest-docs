# Получить список оплат sale.payment.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список оплат.

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать.

Если не передан или передан пустой массив, то будут выбраны все доступные поля оплат.

Возможные значения элементов массива соответствуют полям объекта [sale_order_payment](../data-types.md#sale_order_payment)
 ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных оплат в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_payment](../data-types.md#sale_order_payment).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры: 
    - `"мол%"` — ищем значения начинающиеся с «мол»
    - `"%мол"` — ищем значения заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения не начинающиеся с «мол»
    - `"%мол"` — ищем значения не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)

 ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных оплат в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_order_payment](../data-types.md#sale_order_payment).

Возможные значения для order:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["paySystemXmlId","paySystemIsCash","accountNumber","id","orderId","paid","datePaid","empPaidId","paySystemId","psStatus","psStatusCode","psStatusDescription","psStatusMessage","psSum","psCurrency","psResponseDate","payVoucherNum","payVoucherDate","datePayBefore","dateBill","xmlId","sum","currency","paySystemName","companyId","payReturnNum","priceCod","payReturnDate","empReturnId","payReturnComment","responsibleId","empResponsibleId","dateResponsibleId","isReturn","comments","updated1c","id1c","version1c","externalPayment","psInvoiceId","marked","reasonMarked","dateMarked","empMarkedId"],"filter":{"<id":10,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.payment.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["paySystemXmlId","paySystemIsCash","accountNumber","id","orderId","paid","datePaid","empPaidId","paySystemId","psStatus","psStatusCode","psStatusDescription","psStatusMessage","psSum","psCurrency","psResponseDate","payVoucherNum","payVoucherDate","datePayBefore","dateBill","xmlId","sum","currency","paySystemName","companyId","payReturnNum","priceCod","payReturnDate","empReturnId","payReturnComment","responsibleId","empResponsibleId","dateResponsibleId","isReturn","comments","updated1c","id1c","version1c","externalPayment","psInvoiceId","marked","reasonMarked","dateMarked","empMarkedId"],"filter":{"<id":10,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.payment.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SalePaymentListResult = {
      payments: {
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
      }[]
    }

    try {
      // sale.payment.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SalePaymentListResult>({
        method: 'sale.payment.list',
        params: {
          select: [
            'paySystemXmlId',
            'paySystemIsCash',
            'accountNumber',
            'id',
            'orderId',
            'paid',
            'datePaid',
            'empPaidId',
            'paySystemId',
            'psStatus',
            'psStatusCode',
            'psStatusDescription',
            'psStatusMessage',
            'psSum',
            'psCurrency',
            'psResponseDate',
            'payVoucherNum',
            'payVoucherDate',
            'datePayBefore',
            'dateBill',
            'xmlId',
            'sum',
            'currency',
            'paySystemName',
            'companyId',
            'payReturnNum',
            'priceCod',
            'payReturnDate',
            'empReturnId',
            'payReturnComment',
            'responsibleId',
            'empResponsibleId',
            'dateResponsibleId',
            'isReturn',
            'comments',
            'updated1c',
            'id1c',
            'version1c',
            'externalPayment',
            'psInvoiceId',
            'marked',
            'reasonMarked',
            'dateMarked',
            'empMarkedId',
          ],
          filter: {
            '<id': 10,
            '@personTypeId': [3, 4],
            payed: 'N',
          },
          order: {
            id: 'desc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Payments on this page:', result.payments.length, result.payments)
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
      async function fetchPaymentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.payment.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.payment.list',
            params: {
              select: [
                'paySystemXmlId',
                'paySystemIsCash',
                'accountNumber',
                'id',
                'orderId',
                'paid',
                'datePaid',
                'empPaidId',
                'paySystemId',
                'psStatus',
                'psStatusCode',
                'psStatusDescription',
                'psStatusMessage',
                'psSum',
                'psCurrency',
                'psResponseDate',
                'payVoucherNum',
                'payVoucherDate',
                'datePayBefore',
                'dateBill',
                'xmlId',
                'sum',
                'currency',
                'paySystemName',
                'companyId',
                'payReturnNum',
                'priceCod',
                'payReturnDate',
                'empReturnId',
                'payReturnComment',
                'responsibleId',
                'empResponsibleId',
                'dateResponsibleId',
                'isReturn',
                'comments',
                'updated1c',
                'id1c',
                'version1c',
                'externalPayment',
                'psInvoiceId',
                'marked',
                'reasonMarked',
                'dateMarked',
                'empMarkedId',
              ],
              filter: {
                '<id': 10,
                '@personTypeId': [3, 4],
                payed: 'N',
              },
              order: {
                id: 'desc',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Payments on this page:', result.payments.length, result.payments)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchPaymentList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.payment.list',
                [
                    'select' => [
                        'paySystemXmlId',
                        'paySystemIsCash',
                        'accountNumber',
                        'id',
                        'orderId',
                        'paid',
                        'datePaid',
                        'empPaidId',
                        'paySystemId',
                        'psStatus',
                        'psStatusCode',
                        'psStatusDescription',
                        'psStatusMessage',
                        'psSum',
                        'psCurrency',
                        'psResponseDate',
                        'payVoucherNum',
                        'payVoucherDate',
                        'datePayBefore',
                        'dateBill',
                        'xmlId',
                        'sum',
                        'currency',
                        'paySystemName',
                        'companyId',
                        'payReturnNum',
                        'priceCod',
                        'payReturnDate',
                        'empReturnId',
                        'payReturnComment',
                        'responsibleId',
                        'empResponsibleId',
                        'dateResponsibleId',
                        'isReturn',
                        'comments',
                        'updated1c',
                        'id1c',
                        'version1c',
                        'externalPayment',
                        'psInvoiceId',
                        'marked',
                        'reasonMarked',
                        'dateMarked',
                        'empMarkedId',
                    ],
                    'filter' => [
                        '<id'           => 10,
                        '@personTypeId' => [3, 4],
                        'payed'         => 'N',
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching payment list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.payment.list",
        {
            "select": [
                "paySystemXmlId",
                "paySystemIsCash",
                "accountNumber",
                "id",
                "orderId",
                "paid",
                "datePaid",
                "empPaidId",
                "paySystemId",
                "psStatus",
                "psStatusCode",
                "psStatusDescription",
                "psStatusMessage",
                "psSum",
                "psCurrency",
                "psResponseDate",
                "payVoucherNum",
                "payVoucherDate",
                "datePayBefore",
                "dateBill",
                "xmlId",
                "sum",
                "currency",
                "paySystemName",
                "companyId",
                "payReturnNum",
                "priceCod",
                "payReturnDate",
                "empReturnId",
                "payReturnComment",
                "responsibleId",
                "empResponsibleId",
                "dateResponsibleId",
                "isReturn",
                "comments",
                "updated1c",
                "id1c",
                "version1c",
                "externalPayment",
                "psInvoiceId",
                "marked",
                "reasonMarked",
                "dateMarked",
                "empMarkedId",
            ],
            "filter": {
                "<id": 10,
                "@personTypeId": [3, 4],
                "payed": "N",
            },
            "order": {
                "id": "desc",
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
        'sale.payment.list',
        [
            'select' => [
                "paySystemXmlId",
                "paySystemIsCash",
                "accountNumber",
                "id",
                "orderId",
                "paid",
                "datePaid",
                "empPaidId",
                "paySystemId",
                "psStatus",
                "psStatusCode",
                "psStatusDescription",
                "psStatusMessage",
                "psSum",
                "psCurrency",
                "psResponseDate",
                "payVoucherNum",
                "payVoucherDate",
                "datePayBefore",
                "dateBill",
                "xmlId",
                "sum",
                "currency",
                "paySystemName",
                "companyId",
                "payReturnNum",
                "priceCod",
                "payReturnDate",
                "empReturnId",
                "payReturnComment",
                "responsibleId",
                "empResponsibleId",
                "dateResponsibleId",
                "isReturn",
                "comments",
                "updated1c",
                "id1c",
                "version1c",
                "externalPayment",
                "psInvoiceId",
                "marked",
                "reasonMarked",
                "dateMarked",
                "empMarkedId",
            ],
            'filter' => [
                "<id" => 10,
                "@personTypeId" => [3, 4],
                "payed" => "N",
            ],
            'order' => [
                "id" => "desc",
            ]
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
        "payments": [
            {
                "accountNumber": "163\/1",
                "comments": "",
                "companyId": null,
                "currency": "RUB",
                "dateBill": "2022-10-14T17:10:00+03:00",
                "dateMarked": null,
                "datePaid": null,
                "datePayBefore": null,
                "dateResponsibleId": "2022-10-14T17:10:00+03:00",
                "empMarkedId": null,
                "empPaidId": null,
                "empResponsibleId": 1,
                "empReturnId": null,
                "externalPayment": "N",
                "id": 9,
                "id1c": "",
                "isReturn": "N",
                "marked": "N",
                "orderId": 7,
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
                "priceCod": "0.000000",
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
                "sum": 1176,
                "updated1c": "N",
                "version1c": "",
                "xmlId": "bx_634989d809dc8"
            },
        ]
    },
    "total": 1,
    "time": {
        "start": 1713451909.778956,
        "finish": 1713451910.23781,
        "duration": 0.45885396003723145,
        "processing": 0.09081101417541504,
        "date_start": "2024-04-18T17:51:49+03:00",
        "date_finish": "2024-04-18T17:51:50+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **payments**
[`sale_order_payment[]`](../data-types.md) | Массив объектов с информацией о выбранных оплатах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения оплат ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-add.md)
- [{#T}](./sale-payment-update.md)
- [{#T}](./sale-payment-get.md)
- [{#T}](./sale-payment-delete.md)
- [{#T}](./sale-payment-get-fields.md)