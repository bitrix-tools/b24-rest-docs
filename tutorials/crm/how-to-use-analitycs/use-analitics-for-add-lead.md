# Как использовать сквозную аналитику при создании лида

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, пользователю нужны права на добавление и изменение лидов
>
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом добавлять лиды
> - [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) — пользователь с правом изменять созданный лид

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сквозная аналитика показывает источник привлечения клиента. Когда клиент заполняет форму на сайте, в карточку лида можно передать имя, телефон и данные о рекламном канале с маршрутом посещения.

Данные о посещении собирает скрипт сквозной аналитики, который Битрикс24 формирует для вашего сайта. Скрипт отдает их в виде трейса — JSON-строки с источником перехода и посещенными страницами. При отправке формы код получает трейс и связывает с ним созданный лид.

Сценарий состоит из четырех шагов.

1. Добавить на страницу форму обратной связи со скрытым полем `TRACE`
2. Получить трейс посетителя функцией `b24Tracker.guest.getTrace()` при отправке формы
3. Создать лид методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
4. Привязать лид к трейсу методом [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)

Метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) вернет идентификатор трейса, а в карточке лида появятся данные сквозной аналитики. Если трейс получить не удалось, бэкенд все равно создаст лид, но без связи с источником.

{% note info "" %}

Форма на сайте публичная, поэтому вызовы REST выполняются на стороне сервера, а не в браузере: вебхук с правами на CRM нельзя раскрывать в клиентском коде. Браузер только собирает данные формы и трейс, а затем отправляет их на ваш бэкенд обычным POST-запросом. Бэкенд вызывает методы Битрикс24 через SDK:

- PHP — [B24PhpSDK](https://github.com/bitrix24/b24phpsdk)
- Python — [b24pysdk](https://github.com/bitrix24/b24pysdk)
- JS — [b24jssdk](https://github.com/bitrix24/b24jssdk) на сервере (Node.js) через `B24Hook`

{% endnote %}

## Что нужно до начала

- входящий вебхук со scope [`crm`](../../../api-reference/scopes/permissions.md) от имени пользователя с правами на добавление и изменение лидов
- скрипт сквозной аналитики, сформированный Битрикс24, на всех страницах сайта, где нужно собирать маршрут посетителя, включая страницу с формой. После загрузки скрипта на странице доступна функция `b24Tracker.guest.getTrace()`
- сервер для обработчика формы на JS, PHP или Python

Требования к среде для примеров:

- JS — Node.js 18, 20 или 22 и выше. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`
- PHP — PHP 8.4 или 8.5 для B24PhpSDK 3.x
- Python — Python 3.9 или новее

## 1\. Добавляем форму на сайт

Добавляем поля в форму обратной связи:

- `NAME` — имя клиента
- `LAST_NAME` — фамилия клиента
- `PHONE` — телефон клиента
- `TRACE` — трейс сквозной аналитики, скрытое поле формы

Форма отправляет данные на бэкенд обычным POST-запросом, поэтому ее разметка одинакова для всех языков:

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```html
<form id="feedback-form" method="post" action="/">
    <input type="hidden" id="FORM_TRACE" name="TRACE">
    <input type="text" name="NAME" required>
    <input type="text" name="LAST_NAME" required>
    <input type="text" name="PHONE" required>
    <input type="submit" name="SAVE" value="Send">
</form>
```

Пользователь не видит скрытое поле, но его значение отправляется вместе с остальными данными формы.

## 2\. Получаем трейс при отправке формы

Функция `b24Tracker.guest.getTrace()` возвращает трейс — JSON-строку — и сразу очищает сохраненную историю прошлых визитов посетителя. Поэтому вызываем ее один раз, в момент отправки формы, а не при загрузке страницы. Если посетитель уйдет со страницы без отправки, история останется для следующего обращения.

Трейс записываем в скрытое поле `TRACE`. Это клиентский код — он выполняется в браузере на странице с формой:

```html
<!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
<script>
    document.getElementById('feedback-form').addEventListener('submit', function() {
        var traceInput = document.getElementById('FORM_TRACE');
        var tracker = window.b24Tracker && window.b24Tracker.guest;
        if (tracker && typeof tracker.getTrace === 'function') {
            traceInput.value = tracker.getTrace();
        }
    });
</script>
```

Если функция недоступна, форма отправится с пустым полем `TRACE`, и бэкенд создаст лид без связи со сквозной аналитикой.

{% note warning "" %}

Если скрипт сквозной аналитики не установлен на сайте или не успел загрузиться к моменту отправки формы, код не получит трейс. Проверьте подключение скрипта на странице с формой.

{% endnote %}

## 3\. Создаем лид

Для создания лида применяем универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В параметре `entityTypeId` передаем значение `1` — идентификатор типа объекта лид.

В `fields` передаем следующие параметры:

- `title` — название лида
- `name` — имя клиента
- `lastName` — фамилия клиента
- `fm` — телефон в формате множественного поля CRM

Поле `fm` передаем массивом, потому что телефон в CRM хранится как множественное поле типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). Для телефона указываем:

- `typeId` — тип множественного поля `PHONE`
- `valueType` — тип значения, например `WORK`
- `value` — номер телефона

{% note warning "" %}

Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) создаст лид и не вернет ошибку в двух случаях:

- телефон передан строкой вместо массива или без `typeId` — лид будет без телефона
- не заполнены поля, которые настроены в карточке лида как обязательные, — метод проверяет их, только если в настройках CRM включена опция «Проверять наличие обязательных пользовательских полей»

Передавайте `fm` в формате выше и заполняйте обязательные поля лида в `fields` сами.

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


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $b24 = ServiceBuilderFactory::createServiceBuilderFromWebhook(
        'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/'
    );

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
{% endlist %}

Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает идентификатор лида в поле `result.item.id`. Сохраняем его: на шаге 4 он уйдет в параметр `ENTITIES`.

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

## 4\. Привязываем лид к трейсу

После создания лида вызываем метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md), потому что `TRACE` нельзя передать напрямую в [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

В [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) можно передать UTM-поля: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`. Они сохраняют рекламные метки в лиде, но не заменяют полный трейс.

В метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) передаем параметры:

- `TRACE` — JSON-строка трейса из скрытого поля формы
- `ENTITIES` — массив объектов, которые нужно связать с трейсом. Для лида указываем `TYPE` со значением `LEAD` и `ID` из поля `result.item.id` ответа [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)

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

        const traceId = traceResponse.getData().result
    }
    ```

- Python

    ```python
    if trace:
        trace_id = client.crm.tracking.trace.add(
            trace=trace,
            entities=[
                {"TYPE": "LEAD", "ID": lead_id},
            ],
        ).response.result
    ```


- PHP

    ```php
    if ($trace !== '') {
        // crm.tracking.* нет среди типизированных сервисов — вызываем напрямую через ядро
        $traceId = $b24->core->call('crm.tracking.trace.add', [
            'TRACE' => $trace,
            'ENTITIES' => [
                ['TYPE' => 'LEAD', 'ID' => $leadId],
            ],
        ])->getResponseData()->getResult()[0];
    }
    ```
{% endlist %}

Если `TRACE` пустой, код пропускает этот шаг, и лид остается без связи со сквозной аналитикой.

Метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) возвращает идентификатор созданного трейса в поле `result`.

```json
{
    "result": 341
}
```

## Полный пример кода

В примерах ниже бэкенд отдает HTML-страницу с формой и обрабатывает ее отправку. Подставьте адрес вебхука своего Битрикс24 в переменную с URL и запустите сервер:

- JS — сохраните код в файле `app.mjs` и выполните `node app.mjs`
- Python — сохраните код в файле `app.py` и выполните `python app.py`
- PHP — сохраните код в файле `index.php` и выполните `php -S localhost:3000 index.php`

Форма откроется по адресу `http://localhost:3000`. После отправки страница покажет, создан ли лид и привязан ли он к трейсу.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const WEBHOOK = 'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/'
    const app = express()
    app.use(express.urlencoded({ extended: false }))

    const PAGE = `<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Обратная связь</title>
    </head>
    <body>
        <h1>Обратная связь</h1>
        <p id="message" aria-live="polite">__MESSAGE__</p>
        <form id="feedback-form" method="post" action="/">
            <input type="hidden" id="FORM_TRACE" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>
        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            document.getElementById('feedback-form').addEventListener('submit', function() {
                var traceInput = document.getElementById('FORM_TRACE');
                var tracker = window.b24Tracker && window.b24Tracker.guest;
                if (tracker && typeof tracker.getTrace === 'function') {
                    traceInput.value = tracker.getTrace();
                }
            });
        </script>
    </body>
    </html>`

    const HTML_ESCAPES = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    }
    const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
    const formPage = (message = '') => PAGE.replace('__MESSAGE__', escapeHtml(message))
    const formValue = (value) => (typeof value === 'string' ? value.trim() : '')

    app.get('/', (req, res) => res.send(formPage()))

    app.post('/', async (req, res) => {
        const name = formValue(req.body.NAME)
        const lastName = formValue(req.body.LAST_NAME)
        const phone = formValue(req.body.PHONE)
        const trace = formValue(req.body.TRACE)

        if (!name || !lastName || !phone) {
            return res.send(formPage('Заполните имя, фамилию и телефон'))
        }

        const $b24 = B24Hook.fromWebhookUrl(WEBHOOK)
        let leadId = 0

        try {
            const leadResponse = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 1,
                    fields: {
                        title: `Feedback page: ${name} ${lastName}`,
                        name: name,
                        lastName: lastName,
                        fm: [{ typeId: 'PHONE', valueType: 'WORK', value: phone }],
                    },
                },
                requestId: 'lead-add',
            })
            if (!leadResponse.isSuccess) {
                return res.send(formPage('Лид не создан: ' + leadResponse.getErrorMessages().join('; ')))
            }
            leadId = leadResponse.getData().result.item.id

            if (!trace) {
                return res.send(formPage('Лид ' + leadId + ' создан без трейса'))
            }

            const traceResponse = await $b24.actions.v2.call.make({
                method: 'crm.tracking.trace.add',
                params: { TRACE: trace, ENTITIES: [{ TYPE: 'LEAD', ID: leadId }] },
                requestId: 'trace-add',
            })
            if (!traceResponse.isSuccess) {
                return res.send(formPage(
                    'Лид ' + leadId + ' создан, но трейс не привязан: '
                    + traceResponse.getErrorMessages().join('; ')
                ))
            }

            const traceId = traceResponse.getData().result
            return res.send(formPage('Лид ' + leadId + ' создан и привязан к трейсу ' + traceId))
        } catch (error) {
            if (leadId > 0) {
                return res.send(formPage('Лид ' + leadId + ' создан, но трейс не привязан: ' + error.message))
            }
            return res.send(formPage('Лид не создан: ' + error.message))
        } finally {
            $b24.destroy()
        }
    })

    app.listen(3000, () => console.log('http://localhost:3000'))
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import html

    from flask import Flask, request
    from b24pysdk import Client, BitrixWebhook

    WEBHOOK_DOMAIN = "your-domain.bitrix24.ru"
    WEBHOOK_TOKEN = "1/xxxxxxxxxxxxxxxx"

    app = Flask(__name__)

    PAGE = """<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Обратная связь</title>
    </head>
    <body>
        <h1>Обратная связь</h1>
        <p id="message" aria-live="polite">__MESSAGE__</p>
        <form id="feedback-form" method="post" action="/">
            <input type="hidden" id="FORM_TRACE" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>
        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            document.getElementById('feedback-form').addEventListener('submit', function() {
                var traceInput = document.getElementById('FORM_TRACE');
                var tracker = window.b24Tracker && window.b24Tracker.guest;
                if (tracker && typeof tracker.getTrace === 'function') {
                    traceInput.value = tracker.getTrace();
                }
            });
        </script>
    </body>
    </html>"""


    def form_page(message: str = "") -> str:
        return PAGE.replace("__MESSAGE__", html.escape(message))


    @app.get("/")
    def index():
        return form_page()


    @app.post("/")
    def submit():
        name = request.form.get("NAME", "").strip()
        last_name = request.form.get("LAST_NAME", "").strip()
        phone = request.form.get("PHONE", "").strip()
        trace = request.form.get("TRACE", "").strip()

        if not name or not last_name or not phone:
            return form_page("Заполните имя, фамилию и телефон")

        client = Client(BitrixWebhook(domain=WEBHOOK_DOMAIN, webhook_token=WEBHOOK_TOKEN))

        try:
            lead_id = client.crm.item.add(
                fields={
                    "title": f"Feedback page: {name} {last_name}",
                    "name": name,
                    "lastName": last_name,
                    "fm": [{"typeId": "PHONE", "valueType": "WORK", "value": phone}],
                },
                entity_type_id=1,
            ).response.result["item"]["id"]
        except Exception as error:
            return form_page(f"Лид не создан: {error}")

        if not trace:
            return form_page(f"Лид {lead_id} создан без трейса")

        try:
            trace_id = client.crm.tracking.trace.add(
                trace=trace,
                entities=[{"TYPE": "LEAD", "ID": lead_id}],
            ).response.result
        except Exception as error:
            return form_page(f"Лид {lead_id} создан, но трейс не привязан: {error}")

        return form_page(f"Лид {lead_id} создан и привязан к трейсу {trace_id}")


    if __name__ == "__main__":
        app.run(port=3000)
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $message = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $formValue = static fn (string $key): string => is_string($_POST[$key] ?? null) ? trim($_POST[$key]) : '';
        $name = $formValue('NAME');
        $lastName = $formValue('LAST_NAME');
        $phone = $formValue('PHONE');
        $trace = $formValue('TRACE');

        if ($name === '' || $lastName === '' || $phone === '') {
            $message = 'Заполните имя, фамилию и телефон';
        } else {
            $b24 = ServiceBuilderFactory::createServiceBuilderFromWebhook(
                'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/'
            );
            $leadId = 0;

            try {
                $leadId = $b24->getCRMScope()->item()->add(1, [
                    'title' => 'Feedback page: ' . $name . ' ' . $lastName,
                    'name' => $name,
                    'lastName' => $lastName,
                    'fm' => [
                        ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $phone],
                    ],
                ])->item()->id;

                if ($trace === '') {
                    $message = "Лид $leadId создан без трейса";
                } else {
                    $traceId = $b24->core->call('crm.tracking.trace.add', [
                        'TRACE' => $trace,
                        'ENTITIES' => [
                            ['TYPE' => 'LEAD', 'ID' => $leadId],
                        ],
                    ])->getResponseData()->getResult()[0];
                    $message = "Лид $leadId создан и привязан к трейсу $traceId";
                }
            } catch (\Throwable $e) {
                $message = $leadId > 0
                    ? "Лид $leadId создан, но трейс не привязан: " . $e->getMessage()
                    : 'Лид не создан: ' . $e->getMessage();
            }
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Обратная связь</title>
    </head>
    <body>
        <h1>Обратная связь</h1>
        <p id="message" aria-live="polite"><?= htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></p>
        <form id="feedback-form" method="post" action="">
            <input type="hidden" id="FORM_TRACE" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>
        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            document.getElementById('feedback-form').addEventListener('submit', function() {
                var traceInput = document.getElementById('FORM_TRACE');
                var tracker = window.b24Tracker && window.b24Tracker.guest;
                if (tracker && typeof tracker.getTrace === 'function') {
                    traceInput.value = tracker.getTrace();
                }
            });
        </script>
    </body>
    </html>
    ```
{% endlist %}

## Проверим результат

Сценарий выполнен, если после отправки формы страница показала сообщение «Лид N создан и привязан к трейсу M»: метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) вернул идентификатор лида, а метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) — идентификатор трейса.

1. Откройте лид с этим идентификатором в CRM и проверьте имя, фамилию и телефон
2. Проверьте поле «UTM-метки». Если посетитель пришел на сайт по ссылке с метками, Битрикс24 заполнит поле значениями из трейса. Метки, которые уже сохранены в лиде, трейс не перезаписывает. Через REST эти значения вернет метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) в полях `utmSource`, `utmMedium` и `utmCampaign`
3. Откройте поле «Сквозная аналитика» — в нем Битрикс24 показывает данные трейса. Если поля нет в карточке, добавьте его через «Выбрать поле»

Если страница показала «Лид N создан без трейса», браузер отправил форму с пустым полем `TRACE`. Проверьте подключение скрипта сквозной аналитики на странице с формой.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса и права пользователя. Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает код ошибки в поле `error`. Для ошибок параметров `TRACE`, `ENTITIES` и прав метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) возвращает код `ERROR_CORE`, а конкретную причину — в поле `error_description`.

#|
|| **Код или текст ошибки** | **Причина и действие** ||
|| `ACCESS_DENIED` | Нет права добавить лид. Проверьте права пользователя, от имени которого создан вебхук, и повторите шаг 3 ||
|| `CRM_FIELD_ERROR_REQUIRED` | Не заполнено обязательное поле лида. Ошибка возможна, если в настройках CRM включена проверка обязательных полей. Передайте поле в `fields` и повторите шаг 3 ||
|| ``Parameter `TRACE` required.`` | Трейс не передан или пустой. Проверьте загрузку скрипта сквозной аналитики и скрытое поле `TRACE` на шаге 2 ||
|| ``Can not parse JSON in parameter `TRACE`.`` | `TRACE` не является корректной JSON-строкой. Передайте результат `b24Tracker.guest.getTrace()` без изменений и повторите шаг 4 ||
|| ``Wrong TYPE in parameter `ENTITIES`. Allowed types: COMPANY,CONTACT,DEAL,LEAD,QUOTE`` | Передан недопустимый тип объекта. Для лида укажите `LEAD` и повторите шаг 4 ||
|| ``Wrong ID in parameter `ENTITIES`.`` | Передан пустой, нечисловой или неположительный идентификатор. Передайте `result.item.id` из ответа шага 3 и повторите шаг 4 ||
|| ``You have no access to entity `LEAD` with ID `123`.`` | Нет права изменить лид. Проверьте права пользователя на этот лид и повторите шаг 4 ||
|#

В последнем сообщении `LEAD` и `123` приведены для примера. Метод подставляет фактические тип и идентификатор объекта.

Вызовы выполняются последовательно и не объединены в транзакцию. Если привязка трейса завершилась ошибкой, лид уже сохранен в CRM. Не отправляйте форму повторно — это создаст второй лид. Повторите только шаг 4 с идентификатором созданного лида.

Для повтора сохраняйте на сервере идентификатор лида и исходную строку `TRACE`, пока привязка не пройдет. Повторный вызов `b24Tracker.guest.getTrace()` не вернет очищенную историю визитов. Примеры на этой странице такое сохранение не делают.

Если вызов прервался из-за сетевой ошибки, Битрикс24 мог успеть выполнить метод. Прежде чем повторять шаг, проверьте, появился ли лид в CRM.

Если лид создан, но в нем нет телефона, проверьте структуру `fm` по шагу 3: метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) в этом случае ошибку не возвращает.

## Что важно учитывать

- повторная отправка формы создаст новый лид
- защищайте публичную форму от автоматических отправок, например с помощью CAPTCHA и ограничения частоты запросов

## Продолжите изучение

- [{#T}](./info-to-analitics.md)
- [{#T}](./use-analitics-for-add-contact.md)
- [{#T}](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
