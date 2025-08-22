# Получить список оплат sale.payment.list

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.payment.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["paySystemXmlId","paySystemIsCash","accountNumber","id","orderId","paid","datePaid","empPaidId","paySystemId","psStatus","psStatusCode","psStatusDescription","psStatusMessage","psSum","psCurrency","psResponseDate","payVoucherNum","payVoucherDate","datePayBefore","dateBill","xmlId","sum","currency","paySystemName","companyId","payReturnNum","priceCod","payReturnDate","empReturnId","payReturnComment","responsibleId","empResponsibleId","dateResponsibleId","isReturn","comments","updated1c","id1c","version1c","externalPayment","psInvoiceId","marked","reasonMarked","dateMarked","empMarkedId"],"filter":{"<id":10,"@personTypeId":[3,4],"payed":"N"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.payment.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.payment.list',
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
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.payment.list', {
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
      }, 'id');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.payment.list', {
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
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
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