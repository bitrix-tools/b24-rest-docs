# Как передать данные в сквозную аналитику CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на создание или изменение объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Данные сквозной аналитики помогают связать лид, сделку, контакт, компанию или коммерческое предложение с источником обращения и маршрутом клиента. В CRM можно передать только источник через UTM-поля или полный трейс с данными посещений.

Трейс — это набор данных о пути клиента до обращения: источник перехода, посещенные страницы и другие параметры визита. По трейсу CRM понимает, откуда пришел клиент и какие действия он совершил перед созданием объекта.

Чтобы передать данные в аналитику CRM, выберите способ:

#|
|| **Если нужно** | **Что передать** | **На какие методы опираться** ||
|| Передать только рекламный источник при создании объекта | UTM-поля: `UTM_SOURCE` и другие | [Методы создания объектов CRM](../../../api-reference/crm/index.md) ||
|| Передать полный маршрут клиента при создании объекта | `TRACE`, если метод создания поддерживает это поле | [Методы создания объектов CRM](../../../api-reference/crm/index.md) ||
|| Связать один трейс с несколькими или с уже созданными объектами | `TRACE` и массив объектов `ENTITIES` | [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) ||
|#

## 1\. Передайте UTM-источник

Если для отчета достаточно рекламного источника, передайте `UTM_SOURCE` при создании объекта CRM. Значение должно совпадать с настроенным источником в сквозной аналитике.

UTM-поля есть у основных объектов CRM. Проверьте список полей в описании метода, которым создаете объект:

- [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) — лид
- [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md) — сделка
- [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) — контакт
- [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) — компания
- [crm.quote.add](../../../api-reference/crm/quote/crm-quote-add.md) — коммерческое предложение

Такой способ подходит, когда нужно передать только канал привлечения: рекламную систему, кампанию, объявление или ключевое слово.

Универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) принимает UTM-поля в `camelCase`, например `utmSource`, и сохраняет их в объекте. Но он не формирует путь клиента в сквозной аналитике: трейс не создается, а поля `TRACE` в методе нет. 

Чтобы данные попали в сквозную аналитику, создавайте объект специальными методами CRM или отдельно привяжите трейс через [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md).

## 2\. Передайте полный трейс при создании объекта

Полный трейс содержит данные о маршруте клиента: источник, страницы сайта и другие параметры посещения. Значение для `TRACE` можно получить на сайте через JS-код сквозной аналитики Битрикс24:

```js
b24Tracker.guest.getTrace()
```

Скрипт сквозной аналитики должен быть установлен на страницах сайта, где собирается маршрут клиента. Обычно значение `TRACE` сохраняют в скрытом поле формы и отправляют вместе с данными клиента.

Если метод создания объекта поддерживает поле `TRACE`, передайте в него полученную строку. Такой вариант подходит, когда один объект создается сразу после заполнения формы. Например, заявка с сайта создает лид или контакт, а данные сквозной аналитики передаются вместе с основными полями объекта.

Подробные параметры и примеры смотрите в описании метода создания нужного объекта. В практических сценариях показано, как передать `TRACE` при создании:

- [лида](./use-analitics-for-add-lead.md)
- [сделки и контакта](./use-analitics-for-add-contact.md)

## 3\. Свяжите объекты одним трейсом

Если сценарий создает несколько связанных объектов, сначала сохраните данные клиента, затем свяжите их с одним трейсом методом [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md).

Например, форма на сайте может создать контакт и сделку. После создания объектов передайте в [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md):

- `TRACE` — строку с данными сквозной аналитики
- `ENTITIES` — список объектов, которые нужно связать с трейсом

Вызовы REST выполняйте на стороне сервера, чтобы не раскрывать вебхук в браузере. Строку `TRACE` соберите на сайте через `b24Tracker.guest.getTrace()` и передайте на сервер вместе с данными формы.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    // contactId и dealId получены при создании объектов, trace — из b24Tracker.guest.getTrace()
    const response = await $b24.actions.v2.call.make({
        method: 'crm.tracking.trace.add',
        params: {
            TRACE: trace,
            ENTITIES: [
                { TYPE: 'CONTACT', ID: contactId },
                { TYPE: 'DEAL', ID: dealId },
            ],
        },
        requestId: 'trace-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const traceId = response.getData().result
    console.log('Trace ID:', traceId)

    $b24.destroy()
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/');

    // Метода crm.tracking.* нет среди типизированных сервисов SDK,
    // поэтому вызываем его напрямую через ядро: $b24->core->call(...)
    $response = $b24->core->call('crm.tracking.trace.add', [
        'TRACE' => $trace,
        'ENTITIES' => [
            ['TYPE' => 'CONTACT', 'ID' => $contactId],
            ['TYPE' => 'DEAL', 'ID' => $dealId],
        ],
    ]);

    // Скалярный результат (ID трейса) ядро оборачивает в массив
    $traceId = $response->getResponseData()->getResult()[0];
    echo 'Trace ID: ' . $traceId;
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import Client, BitrixWebhook
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="1/xxxxxxxxxxxxxxxx",
    ))

    try:
        bitrix_response = client.crm.tracking.trace.add(
            trace=trace,
            entities=[
                {"TYPE": "CONTACT", "ID": contact_id},
                {"TYPE": "DEAL", "ID": deal_id},
            ],
        ).response
        trace_id = bitrix_response.result
        print("Trace ID:", trace_id)
    except BitrixAPIError as error:
        print(
            "Bitrix API error",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Bitrix SDK error: {error.message}")
    except Exception as error:
        print(f"Unexpected error: {error}")
    ```

{% endlist %}

Этот способ подходит и для объектов, созданных универсальным методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md): трейс к ним можно привязать после создания.

Метод вернет идентификатор созданного трейса. Его можно сохранить на стороне интеграции, если в сценарии нужно позже удалить трейс или очистить привязку.

```json
{
    "result": 341
}
```

## Удаление трейса

Удаляйте трейс, если его ошибочно привязали к объекту или нужно очистить тестовые данные.

Для удаления используйте метод [crm.tracking.trace.delete](../../../api-reference/crm/tracking/crm-tracking-trace-delete.md). Укажите идентификатор трейса `id`, который вернул метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md).

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'crm.tracking.trace.delete',
        params: { id: traceId },
        requestId: 'trace-delete',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }
    ```

- PHP

    ```php
    $response = $b24->core->call('crm.tracking.trace.delete', [
        'id' => $traceId,
    ]);

    $isDeleted = $response->getResponseData()->getResult()[0];
    ```

- Python

    ```python
    bitrix_response = client.crm.tracking.trace.delete(traceId).response
    result = bitrix_response.result
    print(result)
    ```

{% endlist %}
