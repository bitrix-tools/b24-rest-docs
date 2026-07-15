# Как использовать сквозную аналитику при создании лида

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом добавления лида. Для привязки трейса нужны права на изменение лида

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сквозная аналитика показывает источник привлечения клиента. Когда клиент заполняет форму на сайте, в карточку лида можно передать имя, телефон и данные о рекламном канале с маршрутом посещения.

Сквозная аналитика создает трекер на сайте. Трекер собирает данные о посещении. При отправке формы код получает эти данные и связывает лид с источником привлечения клиента.

Настройка передачи данных состоит из четырех этапов.

1. Добавляем на страницу форму обратной связи и скрытое поле `TRACE`.
2. Получаем трейс посетителя через `b24Tracker.guest.getTrace()` и сохраняем идентификатор визита в скрытое поле формы.
3. Создаем лид методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).
4. Связываем лид с трейсом методом [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md).

{% note info "" %}

Форма на сайте публичная, поэтому вызовы REST выполняются на стороне сервера, а не в браузере: вебхук с правами на CRM нельзя раскрывать в клиентском коде. Браузер только собирает данные формы и трейс, а затем отправляет их на ваш бэкенд обычным POST-запросом. Бэкенд вызывает методы Битрикс24 через SDK:

- PHP — [B24PhpSDK](https://github.com/bitrix24/b24phpsdk)
- Python — [b24pysdk](https://github.com/bitrix24/b24pysdk)
- JS — [b24jssdk](https://github.com/bitrix24/b24jssdk) на сервере (Node.js) через `B24Hook`

{% endnote %}

## 1\. Добавляем форму на сайт

Добавляем поля в форму обратной связи:

- `NAME` — имя клиента,
- `LAST_NAME` — фамилия клиента,
- `PHONE` — телефон клиента,
- `TRACE` — данные сквозной аналитики, скрытое поле формы.

Форма отправляет данные на бэкенд обычным POST-запросом, поэтому ее разметка одинакова для всех языков:

```html
<form method="post" action="/">
    <input type="hidden" id="FORM_TRACE" name="TRACE">
    <input type="text" name="NAME" required>
    <input type="text" name="LAST_NAME" required>
    <input type="text" name="PHONE" required>
    <input type="submit" name="SAVE" value="Send">
</form>
```

Пользователь не видит скрытое поле, но его значение отправляется вместе с остальными данными формы.

## 2\. Получаем данные сквозной аналитики

После загрузки страницы обращаемся к объекту `b24Tracker` и получаем трейс текущего посетителя. Значение записываем в скрытое поле `TRACE`. Это клиентский код — он выполняется в браузере на странице с формой:

```html
<!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
<script>
    window.onload = function(e){
        var traceInput = document.getElementById('FORM_TRACE');
        if(
            traceInput
            && typeof b24Tracker !== 'undefined'
            && b24Tracker.guest
            && typeof b24Tracker.guest.getTrace === 'function'
        )
        {
            traceInput.value = b24Tracker.guest.getTrace();
        }
    }
</script>
```

Полученное значение используется для связи лида с рекламным источником и отображается в отчетах сквозной аналитики.

{% note warning "" %}

Если скрипт сквозной аналитики не установлен на сайте или не успел загрузиться до вызова `b24Tracker.guest.getTrace()`, значение `TRACE` не будет получено. Проверьте подключение скрипта на странице с формой.

{% endnote %}

## 3\. Создаем лид

Для создания лида применяем универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В параметре `entityTypeId` передаем значение `1` — идентификатор типа объекта лид.

В `fields` передаем следующие параметры:

- `title` — название лида,
- `name` — имя клиента,
- `lastName` — фамилия клиента,
- `fm` — телефон в формате множественного поля CRM.

Поле `fm` передаем массивом, потому что телефон в CRM хранится как множественное поле типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). Для телефона указываем:

- `typeId` — тип множественного поля `PHONE`,
- `valueType` — тип значения, например `WORK`,
- `value` — номер телефона.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    // name, lastName, phone приходят из данных формы (req.body)
    const leadResponse = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 1,
            fields: {
                title: `Feedback page: ${name} ${lastName}`,
                name: name,
                lastName: lastName,
                fm: [
                    { typeId: 'PHONE', valueType: 'WORK', value: phone },
                ],
            },
        },
        requestId: 'lead-add',
    })

    if (!leadResponse.isSuccess) {
        throw new Error(leadResponse.getErrorMessages().join('; '))
    }

    const leadId = leadResponse.getData().result.item.id
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

    // $name, $lastName, $phone приходят из данных формы ($_POST)
    $leadId = $b24->getCRMScope()->item()->add(1, [
        'title' => 'Feedback page: ' . $name . ' ' . $lastName,
        'name' => $name,
        'lastName' => $lastName,
        'fm' => [
            ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $phone],
        ],
    ])->item()->id;
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import Client, BitrixWebhook

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="1/xxxxxxxxxxxxxxxx",
    ))

    # name, last_name, phone приходят из данных формы
    bitrix_response = client.crm.item.add(
        fields={
            "title": f"Feedback page: {name} {last_name}",
            "name": name,
            "lastName": last_name,
            "fm": [
                {"typeId": "PHONE", "valueType": "WORK", "value": phone},
            ],
        },
        entity_type_id=1,
    ).response
    lead_id = bitrix_response.result["item"]["id"]
    ```

{% endlist %}

Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает идентификатор лида в поле `result.item.id`.

Ниже приведен пример ответа в сокращенном виде. Полный формат ответа смотрите в описании метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

```json
{
    "result": {
        "item": {
            "id": 123
        }
    }
}
```

## 4\. Связываем лид с трейсом

После создания лида вызываем метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md), потому что `TRACE` нельзя передать напрямую в [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

В [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) можно передать UTM-поля: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`. Они сохраняют рекламные метки в лиде, но не заменяют полный трейс.

В метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) передаем параметры:

- `TRACE` — строка с данными сквозной аналитики.
- `ENTITIES` — массив объектов, которые нужно связать с трейсом. Для лида указываем `TYPE` со значением `LEAD` и `ID` из поля `result.item.id` ответа [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

{% list tabs %}

- JS

    ```js
    if (trace) {
        const traceResponse = await $b24.actions.v2.call.make({
            method: 'crm.tracking.trace.add',
            params: {
                TRACE: trace,
                ENTITIES: [
                    { TYPE: 'LEAD', ID: leadId },
                ],
            },
            requestId: 'trace-add',
        })

        if (!traceResponse.isSuccess) {
            throw new Error(traceResponse.getErrorMessages().join('; '))
        }
    }
    ```

- PHP

    ```php
    if (!empty($trace)) {
        // crm.tracking.* нет среди типизированных сервисов — вызываем напрямую через ядро
        $b24->core->call('crm.tracking.trace.add', [
            'TRACE' => $trace,
            'ENTITIES' => [
                ['TYPE' => 'LEAD', 'ID' => $leadId],
            ],
        ]);
    }
    ```

- Python

    ```python
    if trace:
        client.crm.tracking.trace.add(
            trace=trace,
            entities=[
                {"TYPE": "LEAD", "ID": lead_id},
            ],
        ).response
    ```

{% endlist %}

Если `TRACE` пустой, лид будет создан без связи со сквозной аналитикой.

Метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) возвращает идентификатор созданного трейса в поле `result`.

```json
{
    "result": 341
}
```

### Полный пример кода

В примерах ниже бэкенд отдает HTML-страницу с формой и обрабатывает ее отправку. Подставьте адрес вебхука своего Битрикс24 в переменную с URL.

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
            <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
            <script>
                window.onload = function() {
                    var traceInput = document.getElementById('FORM_TRACE');
                    if (traceInput && typeof b24Tracker !== 'undefined'
                        && b24Tracker.guest && typeof b24Tracker.guest.getTrace === 'function') {
                        traceInput.value = b24Tracker.guest.getTrace();
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
            const leadResponse = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 1,
                    fields: {
                        title: `Feedback page: ${NAME} ${LAST_NAME}`,
                        name: NAME,
                        lastName: LAST_NAME,
                        fm: [{ typeId: 'PHONE', valueType: 'WORK', value: PHONE }],
                    },
                },
                requestId: 'lead-add',
            })
            if (!leadResponse.isSuccess) {
                return res.send(formPage('Лид не создан: ' + leadResponse.getErrorMessages().join('; ')))
            }
            const leadId = leadResponse.getData().result.item.id

            if (TRACE) {
                await $b24.actions.v2.call.make({
                    method: 'crm.tracking.trace.add',
                    params: { TRACE, ENTITIES: [{ TYPE: 'LEAD', ID: leadId }] },
                    requestId: 'trace-add',
                })
                return res.send(formPage('Лид создан'))
            }
            res.send(formPage('Лид создан без трейса'))
        } catch (error) {
            res.send(formPage('Ошибка: ' + error.message))
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

        $name = htmlspecialchars($_POST['NAME'] ?? '');
        $lastName = htmlspecialchars($_POST['LAST_NAME'] ?? '');
        $phone = htmlspecialchars($_POST['PHONE'] ?? '');
        $trace = $_POST['TRACE'] ?? '';

        try {
            $leadId = $b24->getCRMScope()->item()->add(1, [
                'title' => 'Feedback page: ' . $name . ' ' . $lastName,
                'name' => $name,
                'lastName' => $lastName,
                'fm' => [
                    ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $phone],
                ],
            ])->item()->id;

            if (!empty($trace)) {
                $b24->core->call('crm.tracking.trace.add', [
                    'TRACE' => $trace,
                    'ENTITIES' => [
                        ['TYPE' => 'LEAD', 'ID' => $leadId],
                    ],
                ]);
                $message = 'Лид создан';
            } else {
                $message = 'Лид создан без трейса';
            }
        } catch (\Throwable $e) {
            $message = 'Лид не создан: ' . $e->getMessage();
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
            <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
            <script>
                window.onload = function() {
                    var traceInput = document.getElementById('FORM_TRACE');
                    if (traceInput && typeof b24Tracker !== 'undefined'
                        && b24Tracker.guest && typeof b24Tracker.guest.getTrace === 'function') {
                        traceInput.value = b24Tracker.guest.getTrace();
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
            <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
            <script>
                window.onload = function() {{
                    var traceInput = document.getElementById('FORM_TRACE');
                    if (traceInput && typeof b24Tracker !== 'undefined'
                        && b24Tracker.guest && typeof b24Tracker.guest.getTrace === 'function') {{
                        traceInput.value = b24Tracker.guest.getTrace();
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
            bitrix_response = client.crm.item.add(
                fields={
                    "title": f"Feedback page: {name} {last_name}",
                    "name": name,
                    "lastName": last_name,
                    "fm": [{"typeId": "PHONE", "valueType": "WORK", "value": phone}],
                },
                entity_type_id=1,
            ).response
            lead_id = bitrix_response.result["item"]["id"]
            if trace:
                client.crm.tracking.trace.add(
                    trace=trace,
                    entities=[{"TYPE": "LEAD", "ID": lead_id}],
                ).response
                return form_page("Лид создан")
            return form_page("Лид создан без трейса")
        except Exception as error:
            return form_page(f"Лид не создан: {error}")
    ```

{% endlist %}

## Проверяем результат

После отправки формы в CRM появится новый лид с именем, фамилией и телефоном клиента. Если поле `TRACE` заполнено, метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) свяжет лид с данными сквозной аналитики.

## Продолжите изучение

- [{#T}](./info-to-analitics.md)
- [{#T}](./use-analitics-for-add-contact.md)
- [{#T}](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
