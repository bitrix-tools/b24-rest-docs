# Как сохранить сумму оплат в поле сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — административный доступ к разделу CRM
>
> - [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) — администратор CRM
> - [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) — пользователь с правом «чтения» сделки, из которой выбираются оплаты
> - [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) и [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) — пользователь с правом «чтения» элементов объекта CRM
> - [crm.currency.base.get](../../../api-reference/crm/currency/crm-currency-base-get.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сумма сделки показывает общую стоимость, а не то, сколько денег клиент уже перевел. В одной сделке может быть несколько оплат, часть из них не оплачена, и поле суммы их не разделяет. Чтобы менеджер видел оплаченную часть прямо в карточке, заведите отдельное поле типа Деньги и переносите в него сумму оплаченных платежей.

Поле типа Деньги хранит сумму и валюту в одной строке: `1700|RUB`. Разделитель — вертикальная черта, валюта записывается тремя заглавными буквами. Если формат нарушен, метод ответит успехом, а поле окажется пустым, поэтому значение нужно собирать аккуратно.

Сценарий продолжает туториал [{#T}](./how-to-set-paid-date-to-deal.md): там в сделку переносится дата оплаты, здесь — сумма и валюта.

Сценарий состоит из четырех шагов.

1. Создадим денежное поле методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
2. Получим оплаты сделки методом [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md)
3. Посчитаем оплаченное и запишем в поле методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)
4. Сравним оплаченное с суммой сделки методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)

В результате в карточке сделки появится поле с оплаченной суммой в нужной валюте, а по ответу метода будет видно, сколько еще не оплачено.

## Что нужно до начала

Подготовьте данные сценария:

- **Сделка с оплатами.** Понадобится ее `id`. У сделок `entityTypeId` равен `2`
- **Доступ к REST.** Вебхук или приложение со scope `crm`. Денежное поле создает только администратор CRM
- **Валюта.** Если валюта в значении не указана, Битрикс24 подставит базовую валюту. Ее возвращает метод [crm.currency.base.get](../../../api-reference/crm/currency/crm-currency-base-get.md)

Дальше в примерах используем сделку `8423` с тремя оплатами: `1000` оплачена, `500` не оплачена, `700` оплачена. В вашем Битрикс24 подставьте свою сделку и свои оплаты.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее, для новых проектов — 22 или новее. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Для примеров с b24pysdk нужен Python 3.9 или новее.

Храните путь вебхука в переменной окружения и не публикуйте его в открытом коде.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## 1. Создадим денежное поле

Метод [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) создает пользовательское поле для всех сделок. Передайте параметры:

- `FIELD_NAME` — код поля. Параметр обязательный. Если код не начинается с `UF_CRM_`, префикс добавится автоматически
- `USER_TYPE_ID` — тип поля, для денежного это `money`
- `MULTIPLE` — `N` для одной суммы, `Y` если нужно хранить каждый платеж отдельной строкой
- `EDIT_FORM_LABEL` — название поля в карточке, по языкам

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({
            method,
            params,
            requestId
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    const paidFieldId = await callMethod(
        'crm.deal.userfield.add',
        {
            fields: {
                FIELD_NAME: 'UF_CRM_MONEY_PAID',
                USER_TYPE_ID: 'money',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Оплачено', en: 'Paid amount' }
            }
        },
        'userfield-add-money'
    )

    console.log(paidFieldId)
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    $paidFieldId = callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_MONEY_PAID',
            'USER_TYPE_ID' => 'money',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Оплачено', 'en' => 'Paid amount'],
        ],
    ]);

    print_r($paidFieldId);
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    paid_field_id = call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_MONEY_PAID",
                "USER_TYPE_ID": "money",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Оплачено", "en": "Paid amount"},
            },
        },
    )

    print(paid_field_id)
    ```

{% endlist %}

Ответ содержит идентификатор поля:

```json
{
    "result": 6007785
}
```

Дальше работаем через универсальные методы, а в них код поля пишется в другом регистре: `UF_CRM_MONEY_PAID` превращается в `ufCrmMoneyPaid`. Точное написание для своего Битрикс24 посмотрите в ответе метода [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) с `entityTypeId: 2`.

## 2. Получим оплаты сделки

Метод [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) возвращает оплаты одного объекта CRM. Передайте параметры:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Для сделки это `2`
- `entityId` — идентификатор сделки

Из ответа понадобятся три поля каждой оплаты:

- `paid` — признак оплаты, `Y` или `N`. Суммируем только оплаты со значением `Y`
- `sum` — сумма оплаты числом
- `currency` — валюта оплаты, трехбуквенный код

{% list tabs %}

- JS

    ```js
    const payments = await callMethod(
        'crm.item.payment.list',
        {
            entityTypeId: 2,
            entityId: 8423
        },
        'payment-list'
    )

    const paidPayments = payments.filter((payment) => payment.paid === 'Y')

    console.table(paidPayments)
    ```

- PHP

    ```php
    $payments = callMethod($serviceBuilder, 'crm.item.payment.list', [
        'entityTypeId' => 2,
        'entityId' => 8423,
    ]);

    $paidPayments = array_values(
        array_filter($payments, static fn(array $payment): bool => $payment['paid'] === 'Y')
    );

    print_r($paidPayments);
    ```

- Python

    ```python
    payments = call_method(
        "crm.item.payment.list",
        {
            "entityTypeId": 2,
            "entityId": 8423,
        },
    )

    paid_payments = [payment for payment in payments if payment["paid"] == "Y"]

    print(paid_payments)
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": [
        {
            "id": 515,
            "accountNumber": "917/1",
            "paid": "Y",
            "datePaid": "2026-09-10T01:52:39+03:00",
            "sum": 1000,
            "currency": "RUB"
        },
        {
            "id": 517,
            "accountNumber": "917/2",
            "paid": "N",
            "datePaid": null,
            "sum": 500,
            "currency": "RUB"
        },
        {
            "id": 519,
            "accountNumber": "917/3",
            "paid": "Y",
            "datePaid": "2026-09-10T01:52:39+03:00",
            "sum": 700,
            "currency": "RUB"
        }
    ]
}
```

Из трех оплат оплачены две: `1000` и `700`. Их сумма `1700` — это и есть значение для денежного поля. Оплата на `500` в подсчет не идет.

## 3. Посчитаем оплаченное и запишем в поле

Значение денежного поля собирается из суммы и валюты: сначала число с точкой в качестве разделителя дробной части, затем вертикальная черта, затем код валюты тремя заглавными буквами. Для нашего примера это `1700|RUB`.

Складывать можно только оплаты в одной валюте. Если валюты разные, считайте сумму по каждой отдельно и решайте, какую записать в поле или по какому курсу пересчитать.

Метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) записывает значение в сделку. Передайте параметры:

- `entityTypeId` — `2` для сделки
- `id` — идентификатор сделки
- `fields` — объект с кодом поля в формате универсальных методов, в примере `ufCrmMoneyPaid`

{% note warning "" %}

Проверьте формат перед отправкой. На значение `1700,00|RUB` с запятой, `1700.00|руб` строчными буквами или на любую другую строку, которая не совпадает с форматом, метод ответит `true`, но поле останется пустым. Ошибки не будет.

{% endnote %}

{% list tabs %}

- JS

    ```js
    function buildMoneyValue(payments) {
        const currencies = new Set(payments.map((payment) => payment.currency))

        if (currencies.size > 1) {
            throw new Error(`Оплаты в разных валютах: ${[...currencies].join(', ')}`)
        }

        const currency = [...currencies][0]
        const total = payments.reduce((sum, payment) => sum + Number(payment.sum), 0)

        return `${total.toFixed(2)}|${currency}`
    }

    const moneyValue = buildMoneyValue(paidPayments)

    await callMethod(
        'crm.item.update',
        {
            entityTypeId: 2,
            id: 8423,
            fields: { ufCrmMoneyPaid: moneyValue }
        },
        'item-update-money'
    )

    console.log(moneyValue)
    ```

- PHP

    ```php
    function buildMoneyValue(array $payments): string
    {
        $currencies = array_unique(array_column($payments, 'currency'));

        if (count($currencies) > 1) {
            throw new RuntimeException('Оплаты в разных валютах: ' . implode(', ', $currencies));
        }

        $total = array_sum(array_map(
            static fn(array $payment): float => (float)$payment['sum'],
            $payments
        ));

        return number_format($total, 2, '.', '') . '|' . reset($currencies);
    }

    $moneyValue = buildMoneyValue($paidPayments);

    callMethod($serviceBuilder, 'crm.item.update', [
        'entityTypeId' => 2,
        'id' => 8423,
        'fields' => ['ufCrmMoneyPaid' => $moneyValue],
    ]);

    print_r($moneyValue);
    ```

- Python

    ```python
    def build_money_value(payments):
        currencies = {payment["currency"] for payment in payments}

        if len(currencies) > 1:
            raise RuntimeError(f"Оплаты в разных валютах: {', '.join(sorted(currencies))}")

        total = sum(float(payment["sum"]) for payment in payments)

        return f"{total:.2f}|{currencies.pop()}"

    money_value = build_money_value(paid_payments)

    call_method(
        "crm.item.update",
        {
            "entityTypeId": 2,
            "id": 8423,
            "fields": {"ufCrmMoneyPaid": money_value},
        },
    )

    print(money_value)
    ```

{% endlist %}

Метод возвращает обновленный элемент. Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 8423,
            "ufCrmMoneyPaid": "1700|RUB"
        }
    }
}
```

Значение вернулось в нормализованном виде: `1700.00` записалось как `1700`. Битрикс24 обрезает незначащие нули, а значащая дробная часть сохраняется — `1750.25|RUB` останется без изменений.

## 4. Сравним оплаченное с суммой сделки

Метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает сделку целиком. Нас интересуют три поля:

- `opportunity` — сумма сделки. Она считается по товарным позициям и не делится на оплаченную и неоплаченную часть
- `currencyId` — валюта сделки
- `ufCrmMoneyPaid` — наше денежное поле с оплаченной суммой

Разница между суммой сделки и оплаченным и есть остаток к оплате.

{% list tabs %}

- JS

    ```js
    const item = await callMethod(
        'crm.item.get',
        { entityTypeId: 2, id: 8423 },
        'item-get-money'
    )

    const [paidSum, paidCurrency] = item.item.ufCrmMoneyPaid.split('|')
    const rest = Number(item.item.opportunity) - Number(paidSum)

    console.log(`Сделка: ${item.item.opportunity} ${item.item.currencyId}`)
    console.log(`Оплачено: ${paidSum} ${paidCurrency}`)
    console.log(`Осталось: ${rest.toFixed(2)} ${item.item.currencyId}`)
    ```

- PHP

    ```php
    $item = callMethod($serviceBuilder, 'crm.item.get', [
        'entityTypeId' => 2,
        'id' => 8423,
    ]);

    [$paidSum, $paidCurrency] = explode('|', $item['item']['ufCrmMoneyPaid']);
    $rest = (float)$item['item']['opportunity'] - (float)$paidSum;

    echo 'Сделка: ' . $item['item']['opportunity'] . ' ' . $item['item']['currencyId'] . PHP_EOL;
    echo 'Оплачено: ' . $paidSum . ' ' . $paidCurrency . PHP_EOL;
    echo 'Осталось: ' . number_format($rest, 2, '.', '') . ' ' . $item['item']['currencyId'] . PHP_EOL;
    ```

- Python

    ```python
    item = call_method("crm.item.get", {"entityTypeId": 2, "id": 8423})["item"]

    paid_sum, paid_currency = item["ufCrmMoneyPaid"].split("|")
    rest = float(item["opportunity"]) - float(paid_sum)

    print(f"Сделка: {item['opportunity']} {item['currencyId']}")
    print(f"Оплачено: {paid_sum} {paid_currency}")
    print(f"Осталось: {rest:.2f} {item['currencyId']}")
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 8423,
            "opportunity": 2000,
            "currencyId": "RUB",
            "ufCrmMoneyPaid": "1700|RUB"
        }
    }
}
```

Сумма сделки `2000`, оплачено `1700`, к оплате остается `300`. Само поле `opportunity` этой разницы не показывает — для нее и нужно отдельное денежное поле.

## Проверим результат

Сценарий выполнен, если денежное поле заполнено и его значение совпадает с суммой оплаченных платежей.

Что проверить в ответах:

- `ufCrmMoneyPaid` содержит строку с суммой и валютой, а не `null` и не пустую строку
- сумма в поле равна сумме значений `sum` тех оплат, у которых `paid` равен `Y`
- код валюты в поле совпадает с валютой оплат
- разница между `opportunity` и суммой из поля равна неоплаченному остатку

В интерфейсе откройте карточку сделки: в поле «Оплачено» будет сумма с символом валюты.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `The 'FIELD_NAME' field is not found.` | В [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md) не передан код поля. Передайте `FIELD_NAME` ||
|| `NOT_FOUND`, `Элемент не найден` | В [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) или [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) передан идентификатор несуществующей сделки. Проверьте `id` и `entityTypeId` ||
|#

Ошибки формата молчаливые: метод отвечает успехом, а значение теряется. Проверьте поле методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md).

- Поле вернулось как `null` или пустая строка — формат значения не совпал с ожидаемым. Частые причины: запятая вместо точки, валюта строчными буквами, пробелы вокруг разделителя, символ валюты вместо трехбуквенного кода
- В поле сумма без нужной валюты — валюта не была передана, и подставилась базовая валюта Битрикс24. Получить ее можно методом [crm.currency.base.get](../../../api-reference/crm/currency/crm-currency-base-get.md)
- В поле незнакомый код валюты — проверка кода на существование не выполняется. Строка из трех заглавных букв сохранится, даже если такой валюты в Битрикс24 нет
- Сумма в поле больше ожидаемой — в подсчет попали неоплаченные платежи. Отбирайте оплаты по `paid` равному `Y`

Чтобы очистить поле, передайте в него пустую строку.

## Что важно учитывать

- Значение денежного поля — строка вида `сумма|ВАЛЮТА`. Число записывается с точкой, валюта — тремя заглавными буквами
- Незначащие нули обрезаются: `1700.00` сохранится как `1700`, а `1750.25` останется без изменений
- Отрицательные суммы допустимы, например `-20|USD` для возврата
- Если валюта не указана, подставляется базовая валюта Битрикс24. В интеграции лучше указывать валюту явно: базовая валюта в другом Битрикс24 может отличаться
- У денежного поля через REST сохраняется единственная настройка — `DEFAULT_VALUE`. Другие ключи в `SETTINGS` не сохраняются, поэтому изменить правила разбора значения через REST нельзя
- Оплаты в разных валютах складывать нельзя. Считайте суммы по каждой валюте отдельно или пересчитывайте по своему курсу
- Множественное денежное поле хранит массив таких же строк: `["1000|RUB", "700|RUB"]`. В нем каждый платеж хранится отдельной строкой, но суммировать значения придется на своей стороне
- Сумма сделки `opportunity` считается по товарным позициям и не отвечает на вопрос, сколько уже оплачено
- Дату последней оплаты переносят тем же способом, он описан в туториале [{#T}](./how-to-set-paid-date-to-deal.md)

## Пример кода

Полный сценарий одним скриптом: создает денежное поле, читает оплаты сделки, суммирует оплаченные, записывает значение и сравнивает с суммой сделки.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    const DEAL_ID = 8423
    const DEAL_ENTITY_TYPE_ID = 2

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    async function callMethod(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }

        return response.getData().result
    }

    function buildMoneyValue(payments) {
        const currencies = new Set(payments.map((payment) => payment.currency))

        if (currencies.size === 0) {
            return ''
        }

        if (currencies.size > 1) {
            throw new Error(`Оплаты в разных валютах: ${[...currencies].join(', ')}`)
        }

        const total = payments.reduce((sum, payment) => sum + Number(payment.sum), 0)

        return `${total.toFixed(2)}|${[...currencies][0]}`
    }

    async function main() {
        await callMethod('crm.deal.userfield.add', {
            fields: {
                FIELD_NAME: 'UF_CRM_MONEY_PAID',
                USER_TYPE_ID: 'money',
                MULTIPLE: 'N',
                EDIT_FORM_LABEL: { ru: 'Оплачено', en: 'Paid amount' }
            }
        }, 'userfield-add-money')

        const payments = await callMethod('crm.item.payment.list', {
            entityTypeId: DEAL_ENTITY_TYPE_ID,
            entityId: DEAL_ID
        }, 'payment-list')

        const paidPayments = payments.filter((payment) => payment.paid === 'Y')
        const moneyValue = buildMoneyValue(paidPayments)

        await callMethod('crm.item.update', {
            entityTypeId: DEAL_ENTITY_TYPE_ID,
            id: DEAL_ID,
            fields: { ufCrmMoneyPaid: moneyValue }
        }, 'item-update-money')

        const item = await callMethod('crm.item.get', {
            entityTypeId: DEAL_ENTITY_TYPE_ID,
            id: DEAL_ID
        }, 'item-get-money')

        const [paidSum, paidCurrency] = (item.item.ufCrmMoneyPaid ?? '|').split('|')
        const rest = Number(item.item.opportunity) - Number(paidSum || 0)

        console.log(`Сделка: ${item.item.opportunity} ${item.item.currencyId}`)
        console.log(`Оплачено: ${paidSum} ${paidCurrency}`)
        console.log(`Осталось: ${rest.toFixed(2)} ${item.item.currencyId}`)
    }

    main().catch((error) => console.error(error.message))
    ```

- PHP

    ```php
    <?php

    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Psr\Log\NullLogger;
    use Symfony\Component\EventDispatcher\EventDispatcher;

    const DEAL_ID = 8423;
    const DEAL_ENTITY_TYPE_ID = 2;

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.com/rest/USER_ID/TOKEN/'

    // Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
    function callMethod($serviceBuilder, string $method, array $params = []): mixed
    {
        return $serviceBuilder
            ->core
            ->call($method, $params)
            ->getResponseData()
            ->getResult();
    }

    function buildMoneyValue(array $payments): string
    {
        $currencies = array_unique(array_column($payments, 'currency'));

        if ($currencies === []) {
            return '';
        }

        if (count($currencies) > 1) {
            throw new RuntimeException('Оплаты в разных валютах: ' . implode(', ', $currencies));
        }

        $total = array_sum(array_map(
            static fn(array $payment): float => (float)$payment['sum'],
            $payments
        ));

        return number_format($total, 2, '.', '') . '|' . reset($currencies);
    }

    callMethod($serviceBuilder, 'crm.deal.userfield.add', [
        'fields' => [
            'FIELD_NAME' => 'UF_CRM_MONEY_PAID',
            'USER_TYPE_ID' => 'money',
            'MULTIPLE' => 'N',
            'EDIT_FORM_LABEL' => ['ru' => 'Оплачено', 'en' => 'Paid amount'],
        ],
    ]);

    $payments = callMethod($serviceBuilder, 'crm.item.payment.list', [
        'entityTypeId' => DEAL_ENTITY_TYPE_ID,
        'entityId' => DEAL_ID,
    ]);

    $paidPayments = array_values(
        array_filter($payments, static fn(array $payment): bool => $payment['paid'] === 'Y')
    );

    $moneyValue = buildMoneyValue($paidPayments);

    callMethod($serviceBuilder, 'crm.item.update', [
        'entityTypeId' => DEAL_ENTITY_TYPE_ID,
        'id' => DEAL_ID,
        'fields' => ['ufCrmMoneyPaid' => $moneyValue],
    ]);

    $item = callMethod($serviceBuilder, 'crm.item.get', [
        'entityTypeId' => DEAL_ENTITY_TYPE_ID,
        'id' => DEAL_ID,
    ]);

    [$paidSum, $paidCurrency] = explode('|', (string)$item['item']['ufCrmMoneyPaid'] . '|');
    $rest = (float)$item['item']['opportunity'] - (float)$paidSum;

    echo 'Сделка: ' . $item['item']['opportunity'] . ' ' . $item['item']['currencyId'] . PHP_EOL;
    echo 'Оплачено: ' . $paidSum . ' ' . $paidCurrency . PHP_EOL;
    echo 'Осталось: ' . number_format($rest, 2, '.', '') . ' ' . $item['item']['currencyId'] . PHP_EOL;
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook

    DEAL_ID = 8423
    DEAL_ENTITY_TYPE_ID = 2

    bitrix_token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN'

    def call_method(method, params=None):
        # Один помощник на все вызовы сценария: имя метода и параметры передаются так же, как в REST
        return bitrix_token.call_method(
            api_method=method,
            params=params or {},
        )["result"]

    def build_money_value(payments):
        currencies = {payment["currency"] for payment in payments}

        if not currencies:
            return ""

        if len(currencies) > 1:
            raise RuntimeError(f"Оплаты в разных валютах: {', '.join(sorted(currencies))}")

        total = sum(float(payment["sum"]) for payment in payments)

        return f"{total:.2f}|{currencies.pop()}"

    call_method(
        "crm.deal.userfield.add",
        {
            "fields": {
                "FIELD_NAME": "UF_CRM_MONEY_PAID",
                "USER_TYPE_ID": "money",
                "MULTIPLE": "N",
                "EDIT_FORM_LABEL": {"ru": "Оплачено", "en": "Paid amount"},
            },
        },
    )

    payments = call_method(
        "crm.item.payment.list",
        {"entityTypeId": DEAL_ENTITY_TYPE_ID, "entityId": DEAL_ID},
    )

    paid_payments = [payment for payment in payments if payment["paid"] == "Y"]
    money_value = build_money_value(paid_payments)

    call_method(
        "crm.item.update",
        {
            "entityTypeId": DEAL_ENTITY_TYPE_ID,
            "id": DEAL_ID,
            "fields": {"ufCrmMoneyPaid": money_value},
        },
    )

    item = call_method(
        "crm.item.get",
        {"entityTypeId": DEAL_ENTITY_TYPE_ID, "id": DEAL_ID},
    )["item"]

    paid_sum, _, paid_currency = (item["ufCrmMoneyPaid"] or "").partition("|")
    rest = float(item["opportunity"]) - float(paid_sum or 0)

    print(f"Сделка: {item['opportunity']} {item['currencyId']}")
    print(f"Оплачено: {paid_sum} {paid_currency}")
    print(f"Осталось: {rest:.2f} {item['currencyId']}")
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./how-to-set-paid-date-to-deal.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../../api-reference/crm/universal/payment/crm-item-payment-list.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-update.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-get.md)
- [{#T}](../../../api-reference/crm/currency/crm-currency-base-get.md)
