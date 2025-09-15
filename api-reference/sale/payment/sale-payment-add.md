# Добавить оплату sale.payment.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новую оплату.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания оплаты в виде структуры:

```js
fields: {
    orderId: "значение",
    paySystemId: "значение",
    paid: "значение",
    datePaid: "значение",
    empPaidId: "значение",
    psStatus: "значение",
    psStatusCode: "значение",
    psStatusDescription: "значение",
    psStatusMessage: "значение",
    psSum: "значение",
    psCurrency: "значение",
    psResponseDate: "значение",
    payVoucherNum: "значение",
    payVoucherDate: "значение",
    datePayBefore: "значение",
    dateBill: "значение",
    xmlId: "значение",
    sum: "значение",
    companyId: "значение",
    payReturnNum: "значение",
    priceCod: "значение",
    payReturnDate: "значение",
    empReturnId: "значение",
    payReturnComment: "значение",
    responsibleId: "значение",
    empResponsibleId: "значение",
    isReturn: "значение",
    comments: "значение",
    updated1c: "значение",
    id1c: "значение",
    version1c: "значение",
    externalPayment: "значение",
    psInvoiceId: "значение",
    marked: "значение",
    reasonMarked: "значение",
    empMarkedId: "значение",
}
```
 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **orderId***
[`sale_order.id`](../data-types.md) | Идентификатор заказа ||
|| **paySystemId***
[`sale_paysystem.id`](../data-types.md) | Идентификатор платежной системы ||
|| **paid**
[`string`](../../data-types.md) | Оплата оплачена:

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **datePaid**
[`datetime`](../../data-types.md) | Дата оплаты ||
|| **empPaidId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который оплатил оплату ||
|| **psStatus**
[`string`](../../data-types.md) | Флаг статуса платежной системы — успешно ли оплачена оплата. Варианты:

- `Y` — да
- `N` — нет

По умолчанию устанавливается `null` ||
|| **psStatusCode**
[`string`](../../data-types.md) | Код статуса платёжной системы ||
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
[`datetime`](../../data-types.md) | Устаревший.
Дата, по которой необходимо оплатить счет ||
|| **dateBill**
[`datetime`](../../data-types.md) | Дата выставления счета ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **sum**
[`double`](../../data-types.md) | Сумма оплаты ||
|| **companyId**
[`integer`](../../data-types.md) | Идентификатор компании, которая будет принимать оплату

В настоящий момент не используется ||
|| **payReturnNum**
[`string`](../../data-types.md) | Номер документа возврата ||
|| **priceCod**
[`double`](../../data-types.md) | Актуально только для коробочной версии
Стоимость оплаты при доставке. Используется для наложенного платежа ||
|| **payReturnDate**
[`date`](../../data-types.md) | Дата документа возврата ||
|| **empReturnId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который выполнял возврат ||
|| **payReturnComment**
[`string`](../../data-types.md) | Комментарий к возврату ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, ответственного за оплату ||
|| **empResponsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, назначившего ответственного ||
|| **isReturn**
[`string`](../../data-types.md) | Выполнялся ли возврат:

- `Y` — да
- `N` — нет

По умолчанию устанавливается N ||
|| **comments**
[`string`](../../data-types.md) | Комментарии к оплате ||
|| **updated1c**
[`string`](../../data-types.md) | Оплата обновлена через 1С:

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **id1c**
[`string`](../../data-types.md) | Идентификатор в 1С ||
|| **version1c**
[`string`](../../data-types.md) | Версия документа оплаты от 1С ||
|| **externalPayment**
[`string`](../../data-types.md) | Актуально только для коробочной версии
Внешняя оплата или нет. Используется для импорта из 1С через XML

- `Y` — да
- `F` — да, загружена вместе с заказом
- `N` — нет

По умолчанию устанавливается `N` ||
|| **psInvoiceId**
[`string`](../../data-types.md) | Идентификатор оплаты в платежной системе ||
|| **marked**
[`string`](../../data-types.md) | Флаг маркировки. Признак того, является ли оплата отмеченной как проблемная:

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
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
    -d '{"fields":{"orderId":200,"paySystemId":1,"paid":"Y","datePaid":"2024-04-10T10:00:00","empPaidId":1,"psStatus":"Y","psStatusCode":"","psStatusDescription":"","psStatusMessage":"","psSum":100,"psCurrency":"RUB","psResponseDate":"2024-04-10T10:00:00","payVoucherNum":"","payVoucherDate":"2024-04-10T10:00:00","datePayBefore":"2024-04-10T10:00:00","dateBill":"2024-04-10T10:00:00","xmlId":"","sum":100,"companyId":1,"payReturnNum":"","priceCod":100,"payReturnDate":"2024-04-10T10:00:00","empReturnId":1,"payReturnComment":"","responsibleId":1,"empResponsibleId":1,"isReturn":"N","comments":"","updated1c":"N","id1c":"","version1c":"","externalPayment":"N","psInvoiceId":1,"marked":"N","reasonMarked":"","empMarkedId":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.payment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"orderId":200,"paySystemId":1,"paid":"Y","datePaid":"2024-04-10T10:00:00","empPaidId":1,"psStatus":"Y","psStatusCode":"","psStatusDescription":"","psStatusMessage":"","psSum":100,"psCurrency":"RUB","psResponseDate":"2024-04-10T10:00:00","payVoucherNum":"","payVoucherDate":"2024-04-10T10:00:00","datePayBefore":"2024-04-10T10:00:00","dateBill":"2024-04-10T10:00:00","xmlId":"","sum":100,"companyId":1,"payReturnNum":"","priceCod":100,"payReturnDate":"2024-04-10T10:00:00","empReturnId":1,"payReturnComment":"","responsibleId":1,"empResponsibleId":1,"isReturn":"N","comments":"","updated1c":"N","id1c":"","version1c":"","externalPayment":"N","psInvoiceId":1,"marked":"N","reasonMarked":"","empMarkedId":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.payment.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.payment.add',
    		{
    			fields: {
    				orderId: 200,
    				paySystemId: 1,
    				paid: 'Y',
    				datePaid: '2024-04-10T10:00:00',
    				empPaidId: 1,
    				psStatus: 'Y',
    				psStatusCode: '',
    				psStatusDescription: '',
    				psStatusMessage: '',
    				psSum: 100,
    				psCurrency: 'RUB',
    				psResponseDate: '2024-04-10T10:00:00',
    				payVoucherNum: '',
    				payVoucherDate: '2024-04-10T10:00:00',
    				datePayBefore: '2024-04-10T10:00:00',
    				dateBill: '2024-04-10T10:00:00',
    				xmlId: '',
    				sum: 100,
    				companyId: 1,
    				payReturnNum: '',
    				priceCod: 100,
    				payReturnDate: '2024-04-10T10:00:00',
    				empReturnId: 1,
    				payReturnComment: '',
    				responsibleId: 1,
    				empResponsibleId: 1,
    				isReturn: 'N',
    				comments: '',
    				updated1c: 'N',
    				id1c: '',
    				version1c: '',
    				externalPayment: 'N',
    				psInvoiceId: 1,
    				marked: 'N',
    				reasonMarked: '',
    				empMarkedId: 1,
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.payment.add',
                [
                    'fields' => [
                        'orderId'             => 200,
                        'paySystemId'         => 1,
                        'paid'               => 'Y',
                        'datePaid'           => '2024-04-10T10:00:00',
                        'empPaidId'          => 1,
                        'psStatus'           => 'Y',
                        'psStatusCode'       => '',
                        'psStatusDescription' => '',
                        'psStatusMessage'    => '',
                        'psSum'              => 100,
                        'psCurrency'         => 'RUB',
                        'psResponseDate'     => '2024-04-10T10:00:00',
                        'payVoucherNum'      => '',
                        'payVoucherDate'     => '2024-04-10T10:00:00',
                        'datePayBefore'      => '2024-04-10T10:00:00',
                        'dateBill'           => '2024-04-10T10:00:00',
                        'xmlId'              => '',
                        'sum'                => 100,
                        'companyId'          => 1,
                        'payReturnNum'       => '',
                        'priceCod'           => 100,
                        'payReturnDate'      => '2024-04-10T10:00:00',
                        'empReturnId'        => 1,
                        'payReturnComment'   => '',
                        'responsibleId'      => 1,
                        'empResponsibleId'   => 1,
                        'isReturn'           => 'N',
                        'comments'           => '',
                        'updated1c'          => 'N',
                        'id1c'               => '',
                        'version1c'          => '',
                        'externalPayment'    => 'N',
                        'psInvoiceId'        => 1,
                        'marked'             => 'N',
                        'reasonMarked'       => '',
                        'empMarkedId'        => 1,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.payment.add',
        {
            fields: {
                orderId: 200,
                paySystemId: 1,
                paid: 'Y',
                datePaid: '2024-04-10T10:00:00',
                empPaidId: 1,
                psStatus: 'Y',
                psStatusCode: '',
                psStatusDescription: '',
                psStatusMessage: '',
                psSum: 100,
                psCurrency: 'RUB',
                psResponseDate: '2024-04-10T10:00:00',
                payVoucherNum: '',
                payVoucherDate: '2024-04-10T10:00:00',
                datePayBefore: '2024-04-10T10:00:00',
                dateBill: '2024-04-10T10:00:00',
                xmlId: '',
                sum: 100,
                companyId: 1,
                payReturnNum: '',
                priceCod: 100,
                payReturnDate: '2024-04-10T10:00:00',
                empReturnId: 1,
                payReturnComment: '',
                responsibleId: 1,
                empResponsibleId: 1,
                isReturn: 'N',
                comments: '',
                updated1c: 'N',
                id1c: '',
                version1c: '',
                externalPayment: 'N',
                psInvoiceId: 1,
                marked: 'N',
                reasonMarked: '',
                empMarkedId: 1,
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
        'sale.payment.add',
        [
            'fields' => [
                'orderId' => 200,
                'paySystemId' => 1,
                'paid' => 'Y',
                'datePaid' => '2024-04-10T10:00:00',
                'empPaidId' => 1,
                'psStatus' => 'Y',
                'psStatusCode' => '',
                'psStatusDescription' => '',
                'psStatusMessage' => '',
                'psSum' => 100,
                'psCurrency' => 'RUB',
                'psResponseDate' => '2024-04-10T10:00:00',
                'payVoucherNum' => '',
                'payVoucherDate' => '2024-04-10T10:00:00',
                'datePayBefore' => '2024-04-10T10:00:00',
                'dateBill' => '2024-04-10T10:00:00',
                'xmlId' => '',
                'sum' => 100,
                'companyId' => 1,
                'payReturnNum' => '',
                'priceCod' => 100,
                'payReturnDate' => '2024-04-10T10:00:00',
                'empReturnId' => 1,
                'payReturnComment' => '',
                'responsibleId' => 1,
                'empResponsibleId' => 1,
                'isReturn' => 'N',
                'comments' => '',
                'updated1c' => 'N',
                'id1c' => '',
                'version1c' => '',
                'externalPayment' => 'N',
                'psInvoiceId' => 1,
                'marked' => 'N',
                'reasonMarked' => '',
                'empMarkedId' => 1,
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
        "payment": {
            "accountNumber": "356\/1",
            "comments": "",
            "companyId": 1,
            "currency": "RUB",
            "dateBill": "2024-04-10T09:00:00+03:00",
            "dateMarked": "2024-04-16T16:32:49+03:00",
            "datePaid": "2024-04-10T09:00:00+03:00",
            "datePayBefore": "2024-04-10T09:00:00+03:00",
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
            "payReturnDate": "2024-04-10T09:00:00+03:00",
            "payReturnNum": "",
            "paySystemId": 1,
            "paySystemIsCash": "N",
            "paySystemName": "Банковский перевод (Компании)",
            "paySystemXmlId": "",
            "payVoucherDate": "2024-04-10T09:00:00+03:00",
            "payVoucherNum": "",
            "priceCod": "100",
            "psCurrency": "RUB",
            "psInvoiceId": 1,
            "psResponseDate": "2024-04-10T09:00:00+03:00",
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
        "start": 1713277968.822151,
        "finish": 1713277972.577136,
        "duration": 3.7549850940704346,
        "processing": 3.3574018478393555,
        "date_start": "2024-04-16T17:32:48+03:00",
        "date_finish": "2024-04-16T17:32:52+03:00"
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
[`sale_order_payment`](../data-types.md) | Объект с информацией о добавленной оплате ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300020,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для добавления оплаты ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-payment-update.md)
- [{#T}](./sale-payment-get.md)
- [{#T}](./sale-payment-list.md)
- [{#T}](./sale-payment-delete.md)
- [{#T}](./sale-payment-get-fields.md)