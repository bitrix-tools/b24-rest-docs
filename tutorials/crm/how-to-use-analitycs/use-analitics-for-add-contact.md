# Как связать контакт и сделку со сквозной аналитикой

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
> - для создания контакта и сделки — пользователь с правом добавлять эти объекты CRM
> - для связи сделки с контактом через `contactIds` — пользователь с правом читать этот контакт
> - для привязки трейса — пользователь с правом изменять созданные контакт и сделку

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сквозная аналитика связывает обращение клиента с источником перехода и посещенными страницами сайта. Эти данные хранятся в трейсе — JSON-строке, которую формирует скрипт сквозной аналитики Битрикс24.

В примере посетитель отправляет форму обратной связи. В результате в CRM сохраняются контакт, связанная с ним сделка и данные о пути клиента до обращения.

Сценарий состоит из четырех шагов.

1. Получить трейс посетителя функцией `b24Tracker.guest.getTrace()`
2. Создать контакт методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
3. Создать сделку тем же методом и связать ее с контактом
4. Привязать контакт и сделку к трейсу методом [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)

{% note info "" %}

Форма на сайте публичная, поэтому вызовы REST выполняются на стороне сервера, а не в браузере: вебхук с правами на CRM нельзя раскрывать в клиентском коде. Браузер только собирает данные формы и трейс и отправляет их на бэкенд обычным POST-запросом. Бэкенд вызывает методы Битрикс24 через SDK:

- PHP — [B24PhpSDK](https://github.com/bitrix24/b24phpsdk)
- Python — [b24pysdk](https://github.com/bitrix24/b24pysdk)
- JS — [b24jssdk](https://github.com/bitrix24/b24jssdk) на сервере Node.js через `B24Hook`

{% endnote %}

## Подготовьте форму и сквозную аналитику

Для выполнения примера:

1. Создайте на внешнем сервере обработчик формы на JS, PHP или Python
2. Установите SDK для выбранного языка: `@bitrix24/b24jssdk`, `bitrix24/b24phpsdk` или `b24pysdk`. Для B24PhpSDK 3.x нужен PHP 8.4 или 8.5
3. Создайте входящий вебхук со scope [`crm`](../../../api-reference/scopes/permissions.md) от имени пользователя с нужными правами
4. Установите скрипт сквозной аналитики, сформированный Битрикс24, перед закрывающим тегом `</body>` на всех страницах, где нужно собирать маршрут посетителя, включая страницу формы. После загрузки скрипта на странице должна быть доступна функция `b24Tracker.guest.getTrace()`

Для серверных JS-примеров с `B24Hook` нужен Node.js 20 либо 22 и выше. B24JsSDK — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`. Эти требования не относятся к браузерному скрипту с `b24Tracker`.

Для примеров с b24pysdk нужен Python 3.9 или новее.

## 1\. Получите трейс посетителя

Добавьте в форму скрытое поле `TRACE`. Перед отправкой формы вызовите `b24Tracker.guest.getTrace()` и сохраните результат в этом поле.

Функция возвращает JSON-строку и очищает накопленный трейс после чтения. Вызывайте ее один раз непосредственно перед отправкой формы.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```html
<form id="feedback-form" method="post">
    <input type="hidden" id="form-trace" name="TRACE">
    <!-- поля формы -->
    <button type="submit">Отправить</button>
</form>

<p id="message" aria-live="polite"></p>

<script>
    const form = document.getElementById('feedback-form');
    const traceInput = document.getElementById('form-trace');
    const message = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        const tracker = window.b24Tracker && window.b24Tracker.guest;

        if (!tracker || typeof tracker.getTrace !== 'function') {
            event.preventDefault();
            message.textContent = 'Не удалось получить данные сквозной аналитики';
            return;
        }

        const trace = tracker.getTrace();

        if (!trace) {
            event.preventDefault();
            message.textContent = 'Трейс сквозной аналитики пуст';
            return;
        }

        traceInput.value = trace;
    });
</script>
```

Если скрипт сквозной аналитики не загружен или не вернул трейс, пример отменяет отправку формы. Это предотвращает создание контакта и сделки без данных аналитики.

## 2\. Создайте контакт

Вызовите [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) с `entityTypeId = 3` — это идентификатор типа объекта Контакт.

Передайте в `fields`:

- `name` — имя из формы
- `lastName` — фамилию из формы
- `fm` — телефон контакта

Поле `fm` передайте массивом, потому что телефон в CRM хранится как множественное поле типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). Для телефона укажите:

- `typeId` — тип множественного поля `PHONE`
- `valueType` — тип значения, например `WORK`
- `value` — номер телефона

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов и сделок в вашем Битрикс24. Все обязательные поля нужно передать в соответствующий вызов [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/')

    // name, lastName, phone приходят из данных формы
    const contactResponse = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 3,
            fields: {
                name: name,
                lastName: lastName,
                fm: [
                    { typeId: 'PHONE', valueType: 'WORK', value: phone },
                ],
            },
        },
        requestId: 'contact-add',
    })

    if (!contactResponse.isSuccess) {
        throw new Error(contactResponse.getErrorMessages().join('; '))
    }

    const contactId = contactResponse.getData().result.item.id
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $webhookUrl = 'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/';
    $b24 = ServiceBuilderFactory::createServiceBuilderFromWebhook($webhookUrl);

    // $name, $lastName, $phone приходят из данных формы
    $contactId = $b24->getCRMScope()->item()->add(3, [
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
            "name": name,
            "lastName": last_name,
            "fm": [
                {"typeId": "PHONE", "valueType": "WORK", "value": phone},
            ],
        },
        entity_type_id=3,
    ).response
    contact_id = bitrix_response.result["item"]["id"]
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 101
        }
    }
}
```

Сохраните `result.item.id`. Идентификатор контакта понадобится для создания сделки и привязки трейса.

## 3\. Создайте сделку и свяжите ее с контактом

Снова вызовите [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Для сделки передайте `entityTypeId = 2`.

В поле `contactIds` передайте массив идентификаторов связанных контактов. В этом сценарии массив содержит `contactId`, полученный на предыдущем шаге.

{% list tabs %}

- JS

    ```js
    const dealResponse = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 2,
            fields: {
                title: `Обращение с сайта: ${name} ${lastName}`,
                contactIds: [contactId],
            },
        },
        requestId: 'deal-add',
    })

    if (!dealResponse.isSuccess) {
        throw new Error(dealResponse.getErrorMessages().join('; '))
    }

    const dealId = dealResponse.getData().result.item.id
    ```

- PHP

    ```php
    $dealId = $b24->getCRMScope()->item()->add(2, [
        'title' => 'Обращение с сайта: ' . $name . ' ' . $lastName,
        'contactIds' => [$contactId],
    ])->item()->id;
    ```

- Python

    ```python
    bitrix_response = client.crm.item.add(
        fields={
            "title": "Обращение с сайта: %s %s" % (name, last_name),
            "contactIds": [contact_id],
        },
        entity_type_id=2,
    ).response
    deal_id = bitrix_response.result["item"]["id"]
    ```

{% endlist %}

Ответ имеет ту же структуру, что и при создании контакта. Сохраните `result.item.id` сделки. Теперь есть два идентификатора для параметра `ENTITIES`: `contactId` и `dealId`.

## 4\. Привяжите объекты к трейсу

После создания контакта и сделки вызовите [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md), потому что `TRACE` нельзя передать напрямую в [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

В `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) можно передать UTM-поля: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`. Они сохраняют рекламные метки в объекте CRM, но не заменяют полный трейс с маршрутом посещения сайта.

В [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) передайте:

- `TRACE` — JSON-строку из скрытого поля формы
- `ENTITIES` — контакт с типом `CONTACT` и сделку с типом `DEAL`

{% list tabs %}

- JS

    ```js
    const traceResponse = await $b24.actions.v2.call.make({
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

    if (!traceResponse.isSuccess) {
        throw new Error(traceResponse.getErrorMessages().join('; '))
    }

    const traceId = traceResponse.getData().result
    ```

- PHP

    ```php
    // crm.tracking.* нет среди типизированных сервисов — вызываем через ядро
    $b24->core->call('crm.tracking.trace.add', [
        'TRACE' => $trace,
        'ENTITIES' => [
            ['TYPE' => 'CONTACT', 'ID' => $contactId],
            ['TYPE' => 'DEAL', 'ID' => $dealId],
        ],
    ]);
    ```

- Python

    ```python
    trace_id = client.crm.tracking.trace.add(
        trace=trace,
        entities=[
            {"TYPE": "CONTACT", "ID": contact_id},
            {"TYPE": "DEAL", "ID": deal_id},
        ],
    ).response.result
    ```

{% endlist %}

Метод вернет числовой идентификатор созданного трейса. Примеры на JS и Python сохраняют его в переменной. В PHP достаточно успешного выполнения вызова: ядро SDK выбросит исключение, если REST вернет ошибку.

```json
{
    "result": 341
}
```

## Полный пример

Ниже собран полный код сценария для каждого SDK.

{% list tabs %}

- JS

    ```js
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const WEBHOOK = 'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/'
    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const PAGE = `<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Обратная связь</title>
    </head>
    <body>
        <h1>Обратная связь</h1>
        <p id="message" aria-live="polite">__MESSAGE__</p>
        <form id="feedback-form" method="post">
            <input type="hidden" id="form-trace" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>
        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            const form = document.getElementById('feedback-form');
            const traceInput = document.getElementById('form-trace');
            const message = document.getElementById('message');

            form.addEventListener('submit', function(event) {
                const tracker = window.b24Tracker && window.b24Tracker.guest;
                if (!tracker || typeof tracker.getTrace !== 'function') {
                    event.preventDefault();
                    message.textContent = 'Не удалось получить данные сквозной аналитики';
                    return;
                }

                const trace = tracker.getTrace();
                if (!trace) {
                    event.preventDefault();
                    message.textContent = 'Трейс сквозной аналитики пуст';
                    return;
                }

                traceInput.value = trace;
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

    app.get('/', (req, res) => res.send(formPage()))

    app.post('/', async (req, res) => {
        const { NAME = '', LAST_NAME = '', PHONE = '', TRACE = '' } = req.body

        if (!NAME.trim() || !LAST_NAME.trim() || !PHONE.trim()) {
            return res.send(formPage('Заполните имя, фамилию и телефон'))
        }
        if (!TRACE.trim()) {
            return res.send(formPage('Не удалось получить трейс сквозной аналитики'))
        }
        try {
            JSON.parse(TRACE)
        } catch {
            return res.send(formPage('Трейс сквозной аналитики содержит некорректный JSON'))
        }

        const $b24 = B24Hook.fromWebhookUrl(WEBHOOK)
        let contactId = 0
        let dealId = 0

        try {
            const contactResponse = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 3,
                    fields: {
                        name: NAME,
                        lastName: LAST_NAME,
                        fm: [{ typeId: 'PHONE', valueType: 'WORK', value: PHONE }],
                    },
                },
                requestId: 'contact-add',
            })
            if (!contactResponse.isSuccess) {
                return res.send(formPage('Контакт не создан: ' + contactResponse.getErrorMessages().join('; ')))
            }
            contactId = contactResponse.getData().result.item.id

            const dealResponse = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 2,
                    fields: {
                        title: `Обращение с сайта: ${NAME} ${LAST_NAME}`,
                        contactIds: [contactId],
                    },
                },
                requestId: 'deal-add',
            })
            if (!dealResponse.isSuccess) {
                return res.send(formPage(
                    'Контакт ' + contactId + ' создан, но сделка не создана: '
                    + dealResponse.getErrorMessages().join('; ')
                ))
            }
            dealId = dealResponse.getData().result.item.id

            const traceResponse = await $b24.actions.v2.call.make({
                method: 'crm.tracking.trace.add',
                params: {
                    TRACE,
                    ENTITIES: [
                        { TYPE: 'CONTACT', ID: contactId },
                        { TYPE: 'DEAL', ID: dealId },
                    ],
                },
                requestId: 'trace-add',
            })
            if (!traceResponse.isSuccess) {
                return res.send(formPage(
                    'Контакт ' + contactId + ' и сделка ' + dealId
                    + ' созданы, но трейс не привязан: '
                    + traceResponse.getErrorMessages().join('; ')
                ))
            }

            const traceId = traceResponse.getData().result
            return res.send(formPage(
                'Контакт ' + contactId + ', сделка ' + dealId
                + ' и трейс ' + traceId + ' созданы'
            ))
        } catch (error) {
            if (dealId > 0) {
                return res.send(formPage(
                    'Контакт ' + contactId + ' и сделка ' + dealId
                    + ' созданы, но трейс не привязан: ' + error.message
                ))
            }
            if (contactId > 0) {
                return res.send(formPage(
                    'Контакт ' + contactId + ' создан, но сделка не создана: ' + error.message
                ))
            }
            return res.send(formPage('Контакт не создан: ' + error.message))
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

    $message = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = trim((string)($_POST['NAME'] ?? ''));
        $lastName = trim((string)($_POST['LAST_NAME'] ?? ''));
        $phone = trim((string)($_POST['PHONE'] ?? ''));
        $trace = trim((string)($_POST['TRACE'] ?? ''));

        if ($name === '' || $lastName === '' || $phone === '') {
            $message = 'Заполните имя, фамилию и телефон';
        } elseif ($trace === '') {
            $message = 'Не удалось получить трейс сквозной аналитики';
        } else {
            json_decode($trace, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $message = 'Трейс сквозной аналитики содержит некорректный JSON';
            } else {
                $webhookUrl = 'https://your-domain.bitrix24.ru/rest/1/xxxxxxxxxxxxxxxx/';
                $b24 = ServiceBuilderFactory::createServiceBuilderFromWebhook($webhookUrl);

                $contactId = 0;
                $dealId = 0;

                try {
                    $contactId = $b24->getCRMScope()->item()->add(3, [
                        'name' => $name,
                        'lastName' => $lastName,
                        'fm' => [
                            ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $phone],
                        ],
                    ])->item()->id;

                    $dealId = $b24->getCRMScope()->item()->add(2, [
                        'title' => 'Обращение с сайта: ' . $name . ' ' . $lastName,
                        'contactIds' => [$contactId],
                    ])->item()->id;

                    // crm.tracking.* нет среди типизированных сервисов — вызываем через ядро
                    $b24->core->call('crm.tracking.trace.add', [
                        'TRACE' => $trace,
                        'ENTITIES' => [
                            ['TYPE' => 'CONTACT', 'ID' => $contactId],
                            ['TYPE' => 'DEAL', 'ID' => $dealId],
                        ],
                    ]);

                    $message = 'Контакт ' . $contactId . ' и сделка ' . $dealId
                        . ' созданы и связаны со сквозной аналитикой';
                } catch (\Throwable $error) {
                    if ($dealId > 0) {
                        $message = 'Контакт ' . $contactId . ' и сделка ' . $dealId
                            . ' созданы, но трейс не привязан: ' . $error->getMessage();
                    } elseif ($contactId > 0) {
                        $message = 'Контакт ' . $contactId
                            . ' создан, но сделка не создана: ' . $error->getMessage();
                    } else {
                        $message = 'Контакт не создан: ' . $error->getMessage();
                    }
                }
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

        <p id="message" aria-live="polite">
            <?= htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?>
        </p>

        <form id="feedback-form" method="post">
            <input type="hidden" id="form-trace" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>

        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            const form = document.getElementById('feedback-form');
            const traceInput = document.getElementById('form-trace');
            const message = document.getElementById('message');

            form.addEventListener('submit', function(event) {
                const tracker = window.b24Tracker && window.b24Tracker.guest;
                if (!tracker || typeof tracker.getTrace !== 'function') {
                    event.preventDefault();
                    message.textContent = 'Не удалось получить данные сквозной аналитики';
                    return;
                }

                const trace = tracker.getTrace();
                if (!trace) {
                    event.preventDefault();
                    message.textContent = 'Трейс сквозной аналитики пуст';
                    return;
                }

                traceInput.value = trace;
            });
        </script>
    </body>
    </html>
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import html
    import json

    from flask import Flask, request
    from b24pysdk import Client, BitrixWebhook

    WEBHOOK_DOMAIN = "your-domain.bitrix24.ru"
    WEBHOOK_TOKEN = "1/xxxxxxxxxxxxxxxx"

    app = Flask(__name__)
    client = Client(BitrixWebhook(
        domain=WEBHOOK_DOMAIN,
        webhook_token=WEBHOOK_TOKEN,
    ))

    PAGE = """<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Обратная связь</title>
    </head>
    <body>
        <h1>Обратная связь</h1>
        <p id="message" aria-live="polite">%(message)s</p>
        <form id="feedback-form" method="post">
            <input type="hidden" id="form-trace" name="TRACE">
            <label>Имя <input type="text" name="NAME" required></label>
            <label>Фамилия <input type="text" name="LAST_NAME" required></label>
            <label>Телефон <input type="tel" name="PHONE" required></label>
            <button type="submit">Отправить</button>
        </form>
        <!-- На странице должен быть установлен скрипт сквозной аналитики Битрикс24 -->
        <script>
            const form = document.getElementById('feedback-form');
            const traceInput = document.getElementById('form-trace');
            const message = document.getElementById('message');

            form.addEventListener('submit', function(event) {
                const tracker = window.b24Tracker && window.b24Tracker.guest;
                if (!tracker || typeof tracker.getTrace !== 'function') {
                    event.preventDefault();
                    message.textContent = 'Не удалось получить данные сквозной аналитики';
                    return;
                }

                const trace = tracker.getTrace();
                if (!trace) {
                    event.preventDefault();
                    message.textContent = 'Трейс сквозной аналитики пуст';
                    return;
                }

                traceInput.value = trace;
            });
        </script>
    </body>
    </html>"""


    def form_page(message: str = "") -> str:
        return PAGE % {"message": html.escape(message)}


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
        if not trace:
            return form_page("Не удалось получить трейс сквозной аналитики")
        try:
            json.loads(trace)
        except json.JSONDecodeError:
            return form_page("Трейс сквозной аналитики содержит некорректный JSON")

        contact_id = 0
        deal_id = 0

        try:
            bitrix_response = client.crm.item.add(
                fields={
                    "name": name,
                    "lastName": last_name,
                    "fm": [
                        {"typeId": "PHONE", "valueType": "WORK", "value": phone},
                    ],
                },
                entity_type_id=3,
            ).response
            contact_id = bitrix_response.result["item"]["id"]

            bitrix_response = client.crm.item.add(
                fields={
                    "title": "Обращение с сайта: %s %s" % (name, last_name),
                    "contactIds": [contact_id],
                },
                entity_type_id=2,
            ).response
            deal_id = bitrix_response.result["item"]["id"]

            trace_id = client.crm.tracking.trace.add(
                trace=trace,
                entities=[
                    {"TYPE": "CONTACT", "ID": contact_id},
                    {"TYPE": "DEAL", "ID": deal_id},
                ],
            ).response.result

            return form_page(
                "Контакт %s, сделка %s и трейс %s созданы"
                % (contact_id, deal_id, trace_id)
            )
        except Exception as error:
            if deal_id:
                return form_page(
                    "Контакт %s и сделка %s созданы, но трейс не привязан: %s"
                    % (contact_id, deal_id, error)
                )
            if contact_id:
                return form_page(
                    "Контакт %s создан, но сделка не создана: %s" % (contact_id, error)
                )
            return form_page("Контакт не создан: %s" % error)


    if __name__ == "__main__":
        app.run(host="0.0.0.0", port=3000)
    ```

{% endlist %}

## Проверим результат

1. Откройте созданный контакт в CRM и проверьте имя, фамилию и телефон
2. Откройте созданную сделку и проверьте, что в ней указан этот контакт
3. Убедитесь, что сообщение страницы подтверждает привязку объектов к сквозной аналитике. Для JS и Python сообщение также содержит числовой идентификатор трейса

Если в сообщении указано, что сделка не создана или трейс не привязан, сценарий завершился частично. Проверьте уже созданные объекты перед повторным запуском сценария.

## Обработка ошибок

### Ошибки создания контакта и сделки

Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает код ошибки в поле `error`.

| `error` | Причина | Что проверить |
|---|---|---|
| `ACCESS_DENIED` | Нет права добавить контакт или сделку | Права пользователя, от имени которого создан вебхук |
| `CRM_FIELD_ERROR_REQUIRED` | Не заполнено обязательное поле | Обязательные поля контакта или сделки |
| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Значение или тип поля не прошли проверку | Значения и типы полей контакта или сделки, для `fm` — структуру элементов массива |
| `100` | Неверный тип значения множественного поля `fm` | Что `fm` передано массивом элементов |

### Ошибки привязки трейса

Для перечисленных ниже проверок параметров `TRACE`, `ENTITIES` и прав метод [crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md) возвращает код `ERROR_CORE` в поле `error`. Системные REST-ошибки могут иметь другие коды. Конкретная причина ошибки приходит в поле `error_description`.

| `error_description` | Причина | Что проверить |
|---|---|---|
| ``Parameter `TRACE` required.`` | Не передан трейс | Загрузку скрипта сквозной аналитики и скрытое поле `TRACE` |
| ``Can not parse JSON in parameter `TRACE`.`` | `TRACE` не является корректной JSON-строкой | Результат `b24Tracker.guest.getTrace()` |
| ``Wrong TYPE in parameter `ENTITIES`. Allowed types: COMPANY,CONTACT,DEAL,LEAD,QUOTE`` | Передан недопустимый тип объекта | Значения `TYPE` в массиве `ENTITIES` |
| ``Wrong ID in parameter `ENTITIES`.`` | Передан пустой, нечисловой или неположительный идентификатор объекта | Значения `ID` в массиве `ENTITIES` |
| ``You have no access to entity `CONTACT` with ID `123`.`` | Нет права изменить объект из `ENTITIES` | Права пользователя на указанный объект |

В последнем сообщении `CONTACT` и `123` приведены для примера. Метод подставляет фактические тип и идентификатор объекта.

Вызовы выполняются последовательно и не объединены в транзакцию. Если создание сделки или привязка трейса завершились с ошибкой, ранее созданные объекты сохранятся в CRM.

## Что важно учитывать

- повторная отправка формы создаст новые контакт и сделку
- защищайте публичную форму от автоматических отправок, например с помощью CAPTCHA и ограничения частоты запросов

## Продолжите изучение

- [Как использовать сквозную аналитику при создании лида](./use-analitics-for-add-lead.md)
- [Как передать данные в сквозную аналитику CRM](./info-to-analitics.md)
- [Создать новый элемент CRM crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
- [Создать трейс сквозной аналитики crm.tracking.trace.add](../../../api-reference/crm/tracking/crm-tracking-trace-add.md)
