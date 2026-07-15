# Как использовать сквозную аналитику при создании сделки и контакта

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пример использования сквозной аналитики при создании сделки и контакта. Предварительно создайте страницу с веб-формой обратной связи: Ф.И.О, телефон. На странице разместите код примера.

Что происходит во время выполнения кода?

1. Подключается стандартный js-код из сквозной аналитики Битрикс24
2. После заполнения формы, помимо полей формы, в скрытом поле передается код для сквозной аналитики `b24Tracker.guest.getTrace()`
3. Далее создается контакт и связанная с ним сделка
4. И затем регистрируется «след» аналитики для этих объектов, с передачей их типов и идентификаторов вида:

```bash
/rest/crm.tracking.trace.add?ENTITIES[0][TYPE]=CONTACT&ENTITIES[0][ID]=3215&ENTITIES[1][TYPE]=DEAL&ENTITIES[1][ID]=1&TRACE=…
```

Скрипт сквозной аналитики устанавливается на вашем сайте перед закрывающим тегом `</body>` на всех страницах сайта, включая страницу с формой.

{% note info "" %}

Форма на сайте публичная, поэтому вызовы REST выполняются на стороне сервера, а не в браузере: вебхук с правами на CRM нельзя раскрывать в клиентском коде. Браузер собирает данные формы и трейс и отправляет их на бэкенд обычным POST-запросом. Бэкенд вызывает методы Битрикс24 через SDK: PHP — [B24PhpSDK](https://github.com/bitrix24/b24phpsdk), Python — [b24pysdk](https://github.com/bitrix24/b24pysdk), JS — [b24jssdk](https://github.com/bitrix24/b24jssdk) на сервере (Node.js).

{% endnote %}

## Последовательность вызовов

Контакт, сделку и трейс создаем по очереди: идентификатор контакта передаем в сделку, а идентификаторы обоих объектов — в трейс.

1. [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) — создаем контакт
2. [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md) — создаем сделку с `CONTACT_ID`
3. [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) — связываем контакт и сделку одним трейсом

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    // name, lastName, phone, trace приходят из данных формы
    const contactResponse = await $b24.actions.v2.call.make({
        method: 'crm.contact.add',
        params: { fields: { NAME: name, LAST_NAME: lastName, PHONE: [{ value: phone }] } },
        requestId: 'contact-add',
    })
    if (!contactResponse.isSuccess) throw new Error(contactResponse.getErrorMessages().join('; '))
    const contactId = contactResponse.getData().result

    const dealResponse = await $b24.actions.v2.call.make({
        method: 'crm.deal.add',
        params: { fields: { TITLE: `Feedback page: ${name} ${lastName}`, CONTACT_ID: contactId } },
        requestId: 'deal-add',
    })
    if (!dealResponse.isSuccess) throw new Error(dealResponse.getErrorMessages().join('; '))
    const dealId = dealResponse.getData().result

    if (trace) {
        await $b24.actions.v2.call.make({
            method: 'crm.tracking.trace.add',
            params: {
                ENTITIES: [
                    { TYPE: 'CONTACT', ID: contactId },
                    { TYPE: 'DEAL', ID: dealId },
                ],
                TRACE: trace,
            },
            requestId: 'trace-add',
        })
    }

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

    // $name, $lastName, $phone, $trace приходят из данных формы
    $contactId = $b24->getCRMScope()->contact()->add([
        'NAME' => $name,
        'LAST_NAME' => $lastName,
        'PHONE' => [['value' => $phone]],
    ])->getId();

    $dealId = $b24->getCRMScope()->deal()->add([
        'TITLE' => 'Feedback page: ' . $name . ' ' . $lastName,
        'CONTACT_ID' => $contactId,
    ])->getId();

    if (!empty($trace)) {
        // crm.tracking.* нет среди типизированных сервисов — вызываем напрямую через ядро
        $b24->core->call('crm.tracking.trace.add', [
            'ENTITIES' => [
                ['TYPE' => 'CONTACT', 'ID' => $contactId],
                ['TYPE' => 'DEAL', 'ID' => $dealId],
            ],
            'TRACE' => $trace,
        ]);
    }
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import Client, BitrixWebhook

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="1/xxxxxxxxxxxxxxxx",
    ))

    # name, last_name, phone, trace приходят из данных формы
    contact_id = client.crm.contact.add(
        fields={"NAME": name, "LAST_NAME": last_name, "PHONE": [{"value": phone}]},
    ).response.result

    deal_id = client.crm.deal.add(
        fields={"TITLE": f"Feedback page: {name} {last_name}", "CONTACT_ID": contact_id},
    ).response.result

    if trace:
        client.crm.tracking.trace.add(
            trace=trace,
            entities=[
                {"TYPE": "CONTACT", "ID": contact_id},
                {"TYPE": "DEAL", "ID": deal_id},
            ],
        ).response
    ```

{% endlist %}

Метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) и [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md) возвращают идентификатор созданного объекта в поле `result`. Метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) — идентификатор трейса.

## Полный пример кода

Бэкенд отдает HTML-страницу с формой обратной связи и обрабатывает ее отправку. На странице подключен скрипт сквозной аналитики, который заполняет скрытое поле `TRACE`.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const WEBHOOK = 'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const formPage = (message = '') => `<!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <div class="col-12"><p>${message}</p></div>
            <form method="post" action="/">
                <input type="hidden" id="FORM_TRACE" name="TRACE">
                <div class="row"><div class="col-4 mt-3"><label>Name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Last name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="LAST_NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Phone*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="PHONE" required></div></div>
                <div class="row"><div class="col-sm-10">
                    <input type="submit" name="SAVE" class="btn btn-primary" value="Send"></div></div>
            </form>
            <script>
                window.onload = function() {
                    var traceDom = document.getElementById('FORM_TRACE');
                    if (traceDom && typeof b24Tracker !== 'undefined' && b24Tracker.guest) {
                        traceDom.value = b24Tracker.guest.getTrace();
                    }
                }
            </script>
        </body>
    </html>`

    app.get('/', (req, res) => res.send(formPage()))

    app.post('/', async (req, res) => {
        const { NAME = '', LAST_NAME = '', PHONE = '', TRACE = '' } = req.body
        const $b24 = B24Hook.fromWebhookUrl(WEBHOOK)
        try {
            const contactResponse = await $b24.actions.v2.call.make({
                method: 'crm.contact.add',
                params: { fields: { NAME, LAST_NAME, PHONE: [{ value: PHONE }] } },
                requestId: 'contact-add',
            })
            if (!contactResponse.isSuccess) {
                return res.send(formPage('Feedback has not been saved: ' + contactResponse.getErrorMessages().join('; ')))
            }
            const contactId = contactResponse.getData().result

            const dealResponse = await $b24.actions.v2.call.make({
                method: 'crm.deal.add',
                params: { fields: { TITLE: `Feedback page: ${NAME} ${LAST_NAME}`, CONTACT_ID: contactId } },
                requestId: 'deal-add',
            })
            if (!dealResponse.isSuccess) {
                return res.send(formPage('Feedback has not been saved: ' + dealResponse.getErrorMessages().join('; ')))
            }
            const dealId = dealResponse.getData().result

            if (TRACE) {
                await $b24.actions.v2.call.make({
                    method: 'crm.tracking.trace.add',
                    params: {
                        ENTITIES: [
                            { TYPE: 'CONTACT', ID: contactId },
                            { TYPE: 'DEAL', ID: dealId },
                        ],
                        TRACE,
                    },
                    requestId: 'trace-add',
                })
            }
            res.send(formPage('Feedback saved'))
        } catch (error) {
            res.send(formPage('Feedback has not been saved: ' + error.message))
        } finally {
            $b24.destroy()
        }
    })

    app.listen(3000, () => console.log('http://localhost:3000'))
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

    $message = '';

    if (!empty($_POST['SAVE'])) {
        $log = new Logger('b24');
        $log->pushHandler(new StreamHandler('php://stdout'));
        $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
            ->initFromWebhook('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/');

        $name = $_POST['NAME'] ?? '';
        $lastName = $_POST['LAST_NAME'] ?? '';
        $phone = $_POST['PHONE'] ?? '';
        $trace = $_POST['TRACE'] ?? '';

        try {
            $contactId = $b24->getCRMScope()->contact()->add([
                'NAME' => $name,
                'LAST_NAME' => $lastName,
                'PHONE' => [['value' => $phone]],
            ])->getId();

            $dealId = $b24->getCRMScope()->deal()->add([
                'TITLE' => 'Feedback page: ' . $name . ' ' . $lastName,
                'CONTACT_ID' => $contactId,
            ])->getId();

            if (!empty($trace)) {
                $b24->core->call('crm.tracking.trace.add', [
                    'ENTITIES' => [
                        ['TYPE' => 'CONTACT', 'ID' => $contactId],
                        ['TYPE' => 'DEAL', 'ID' => $dealId],
                    ],
                    'TRACE' => $trace,
                ]);
            }
            $message = 'Feedback saved';
        } catch (\Throwable $e) {
            $message = 'Feedback has not been saved: ' . $e->getMessage();
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <div class="col-12"><p><?=$message?></p></div>
            <form method="post" action="">
                <input type="hidden" id="FORM_TRACE" name="TRACE">
                <div class="row"><div class="col-4 mt-3"><label>Name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Last name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="LAST_NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Phone*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="PHONE" required></div></div>
                <div class="row"><div class="col-sm-10">
                    <input type="submit" name="SAVE" class="btn btn-primary" value="Send"></div></div>
            </form>
            <script>
                window.onload = function() {
                    var traceDom = document.getElementById('FORM_TRACE');
                    if (traceDom && typeof b24Tracker !== 'undefined' && b24Tracker.guest) {
                        traceDom.value = b24Tracker.guest.getTrace();
                    }
                }
            </script>
        </body>
    </html>
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import Flask, request
    from b24pysdk import Client, BitrixWebhook

    WEBHOOK_DOMAIN = "your-domain.bitrix24.ru"
    WEBHOOK_TOKEN = "1/xxxxxxxxxxxxxxxx"

    app = Flask(__name__)


    def form_page(message: str = "") -> str:
        return f"""<!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <h1>Feedback</h1>
            <div class="col-12"><p>{message}</p></div>
            <form method="post" action="/">
                <input type="hidden" id="FORM_TRACE" name="TRACE">
                <div class="row"><div class="col-4 mt-3"><label>Name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Last name*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="LAST_NAME" required></div></div>
                <div class="row"><div class="col-4 mt-3"><label>Phone*</label></div>
                    <div class="col-6 mt-3"><input type="text" name="PHONE" required></div></div>
                <div class="row"><div class="col-sm-10">
                    <input type="submit" name="SAVE" class="btn btn-primary" value="Send"></div></div>
            </form>
            <script>
                window.onload = function() {{
                    var traceDom = document.getElementById('FORM_TRACE');
                    if (traceDom && typeof b24Tracker !== 'undefined' && b24Tracker.guest) {{
                        traceDom.value = b24Tracker.guest.getTrace();
                    }}
                }}
            </script>
        </body>
    </html>"""


    @app.get("/")
    def index():
        return form_page()


    @app.post("/")
    def submit():
        client = Client(BitrixWebhook(domain=WEBHOOK_DOMAIN, webhook_token=WEBHOOK_TOKEN))
        name = request.form.get("NAME", "")
        last_name = request.form.get("LAST_NAME", "")
        phone = request.form.get("PHONE", "")
        trace = request.form.get("TRACE", "")
        try:
            contact_id = client.crm.contact.add(
                fields={"NAME": name, "LAST_NAME": last_name, "PHONE": [{"value": phone}]},
            ).response.result
            deal_id = client.crm.deal.add(
                fields={"TITLE": f"Feedback page: {name} {last_name}", "CONTACT_ID": contact_id},
            ).response.result
            if trace:
                client.crm.tracking.trace.add(
                    trace=trace,
                    entities=[
                        {"TYPE": "CONTACT", "ID": contact_id},
                        {"TYPE": "DEAL", "ID": deal_id},
                    ],
                ).response
            return form_page("Feedback saved")
        except Exception as error:
            return form_page(f"Feedback has not been saved: {error}")
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./info-to-analitics.md)
- [{#T}](./use-analitics-for-add-lead.md)
- [{#T}](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)
