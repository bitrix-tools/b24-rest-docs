# Добавить настройку для регулярного счета crm.invoice.recurring.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод добавляет новую настройку для регулярного счета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания настройки регулярного счета.
Обязательное поле - поле `INVOICE_ID` [ID счета, у которой задан параметр `IS_RECURRING=Y`]. 

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.recurring.fields](./crm-invoice-recurring-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"INVOICE_ID":"10","IS_LIMIT":"N","START_DATE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" +1 month')'","PARAMS":{"PERIOD":"day","IS_WORKING_ONLY":"N","INTERVAL":30,"DATE_PAY_BEFORE_OFFSET_TYPE":"month","DATE_PAY_BEFORE_OFFSET_VALUE":1}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.invoice.recurring.add    
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"INVOICE_ID":"10","IS_LIMIT":"N","START_DATE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" +1 month')'","PARAMS":{"PERIOD":"day","IS_WORKING_ONLY":"N","INTERVAL":30,"DATE_PAY_BEFORE_OFFSET_TYPE":"month","DATE_PAY_BEFORE_OFFSET_VALUE":1}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.recurring.add
    ```

- JS

    ```js
    var current = new Date();
    var nextMonth = new Date();
    nextMonth.setMonth(current.getMonth() + 1);
    var date2str = function(d)
    {
        return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    };
    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };
    BX24.callMethod(
        "crm.invoice.recurring.add",
        {
            fields:
            {
                "INVOICE_ID": "10",
                "IS_LIMIT": "N",
                "START_DATE": date2str(nextMonth),
                "PARAMS": {
                    "PERIOD": "day",
                    "IS_WORKING_ONLY": "N",
                    "INTERVAL": 30,
                    "DATE_PAY_BEFORE_OFFSET_TYPE": "month",
                    "DATE_PAY_BEFORE_OFFSET_VALUE": 1,
                }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Добавлены настройки регулярного счета. ID записи - " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $current = new DateTime();
    $nextMonth = (new DateTime())->modify('+1 month');

    function date2str($d) {
        return $d->format('Y-m-d\TH:i:s+03:00');
    }

    $result = CRest::call(
        'crm.invoice.recurring.add',
        [
            'fields' => [
                'INVOICE_ID' => 10,
                'IS_LIMIT' => 'N',
                'START_DATE' => date2str($nextMonth),
                'PARAMS' => [
                    'PERIOD' => 'day',
                    'IS_WORKING_ONLY' => 'N',
                    'INTERVAL' => 30,
                    'DATE_PAY_BEFORE_OFFSET_TYPE' => 'month',
                    'DATE_PAY_BEFORE_OFFSET_VALUE' => 1,
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}