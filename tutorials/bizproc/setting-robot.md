# Как встроить свой UI в параметры робота

> Scope: [`bizproc`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 можно настраивать робота или действие бизнес-процесса через интерфейс приложения. Пользователь открывает настройки робота, Битрикс24 показывает в них страницу приложения, а приложение передает выбранные значения обратно в форму робота. Это реализовано стандартным [механизмом встройки виджетов](../../api-reference/widgets/index.md).

В коробочной версии настройка робота через встройку доступна с версии [20.0.600](../../settings/cloud-and-on-premise/on-premise/versions.md) модуля `Бизнес-процессы`.

В примере приложение добавляет робота, у которого есть два параметра с типом `string`.

Сценарий состоит из четырех шагов.

1. Зарегистрировать робота методом [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md) с параметрами `USE_PLACEMENT` и `PLACEMENT_HANDLER`
2. Получить в обработчике данные из `PLACEMENT_OPTIONS`
3. Сохранить значения параметров командой [BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md) `setPropertyValue`
4. Проверить список роботов методом [bizproc.robot.list](../../api-reference/bizproc/bizproc-robot/bizproc-robot-list.md)

{% note info "" %}

Методы `bizproc.robot.*` работают только в контексте [приложения](../../settings/app-installation/index.md). Через входящий вебхук метод вернет ошибку `ACCESS_DENIED` с описанием `Access denied! Application context required`.

{% endnote %}

## Подготовьте приложение

Перед регистрацией робота подготовьте:

- установленное приложение с правом `bizproc`
- публичный HTTPS-обработчик робота `HANDLER`
- публичный HTTPS-обработчик страницы настроек `PLACEMENT_HANDLER`
- идентификатор пользователя `AUTH_USER_ID` — он есть в адресе профиля сотрудника. Это пользователь по умолчанию в поле *Запускать от имени* в настройках робота: Битрикс24 передает обработчику токен пользователя из этого поля, а если поле пустое — токен `AUTH_USER_ID`
- переменные окружения `B24_CLIENT_ID` и `B24_CLIENT_SECRET` для серверных примеров
- хранилище для `application_token` из события [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md): сохраните значение при установке приложения для каждого Битрикс24 и реализуйте функцию, которая возвращает его по домену. Ее вызывает обработчик `HANDLER`
- зависимости SDK для выбранного стека: `npm install @bitrix24/b24jssdk`, `composer require bitrix24/b24phpsdk:"^3.0"` или `pip install b24pysdk`. Для серверных обработчиков в примерах дополнительно нужен Express для Node.js или Flask для Python

`HANDLER` и `PLACEMENT_HANDLER` могут вести на один URL, если приложение само разделяет запросы запуска робота и открытия страницы настроек. В примерах это два разных адреса.

В сценарии есть три участка кода:

- страница приложения в iframe — регистрирует робота через `bizproc.robot.add` и может проверять список роботов
- серверный обработчик робота `HANDLER` — получает данные, когда автоматизация запускает робота. Пример — в разделе [Обработчик запуска робота](#handler)
- обработчик настроек `PLACEMENT_HANDLER` — отдает страницу настройки робота и сохраняет значения через `setPropertyValue`

До проверки сценария разместите обработчики из разделов [Полный код обработчика встройки](#settings-handler) и [Обработчик запуска робота](#handler) по адресам `PLACEMENT_HANDLER` и `HANDLER`.

В примерах замените:

- `https://your-domain.example/robot-handler.php` — на URL обработчика запуска робота
- `https://your-domain.example/robot-settings.php` — на URL страницы настроек робота
- `AUTH_USER_ID` — на идентификатор пользователя, от имени которого робот по умолчанию будет выполнять запросы
- `robot` — на уникальный код робота в рамках приложения

## Инициализируйте SDK в контексте приложения

Для страницы приложения в iframe используйте `initializeB24Frame()`. На сервере регистрируйте робота, например, в обработчике события [ONAPPINSTALL](../../api-reference/common/events/on-app-install.md): Битрикс24 передает в нем объект `auth` полями формы `auth[domain]`, `auth[access_token]` и другими. Токен из запроса на `HANDLER` принадлежит пользователю, от имени которого запущен робот, и подойдет для регистрации, только если это администратор.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import os
    from flask import request
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(
        client_id=os.environ["B24_CLIENT_ID"],
        client_secret=os.environ["B24_CLIENT_SECRET"],
    )

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    # внутри обработчика Flask: Битрикс24 передает auth полями формы auth[domain], auth[access_token] ...
    auth = {k[5:-1]: v for k, v in request.form.items() if k.startswith("auth[")}
    client, token = make_client(auth)
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
    use Bitrix24\SDK\Core\Credentials\AuthToken;
    use Bitrix24\SDK\Core\Credentials\DefaultOAuthServerUrl;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Monolog\Handler\StreamHandler;
    use Monolog\Logger;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Symfony\Component\HttpFoundation\Request;

    $request = Request::createFromGlobals();
    $appProfile = ApplicationProfile::initFromArray([
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => getenv('B24_CLIENT_ID'),
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => getenv('B24_CLIENT_SECRET'),
        'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'bizproc',
    ]);

    $authToken = AuthToken::initFromEventRequest($request);
    $domain = (string)$request->request->all('auth')['domain'];

    $log = new Logger('bizproc');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $b24 = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->init($appProfile, $authToken, $domain, DefaultOAuthServerUrl::default());
    ```
{% endlist %}

## 1. Зарегистрируйте робота

Чтобы параметры можно было настраивать через приложение, при добавлении робота передайте `USE_PLACEMENT = 'Y'` и URL обработчика в `PLACEMENT_HANDLER`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница приложения открыта в iframe Битрикс24
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const response = await $b24.actions.v2.call.make({
        method: 'bizproc.robot.add',
        params: {
            CODE: 'robot',
            HANDLER: 'https://your-domain.example/robot-handler.php',
            AUTH_USER_ID: 1,
            NAME: 'Пример робота-встройки',
            USE_PLACEMENT: 'Y',
            PLACEMENT_HANDLER: 'https://your-domain.example/robot-settings.php',
            PROPERTIES: {
                string: { Name: 'Параметр 1', Type: 'string' },
                stringm: { Name: 'Параметр 2', Type: 'string', Multiple: 'Y', Default: ['value 1', 'value 2'] },
            },
        },
        requestId: 'bizproc-robot-add',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.log(response.getData().result)
    ```

- Python

    ```python
    # client построен на токене приложения
    result = client.bizproc.robot.add(
        code="robot",
        handler="https://your-domain.example/robot-handler.php",
        name="Пример робота-встройки",
        auth_user_id=1,
        use_placement=True,
        placement_handler="https://your-domain.example/robot-settings.php",
        properties={
            "string": {"Name": "Параметр 1", "Type": "string"},
            "stringm": {"Name": "Параметр 2", "Type": "string", "Multiple": "Y", "Default": ["value 1", "value 2"]},
        },
    ).response

    print(result.result)
    ```


- PHP

    ```php
    <?php
    // $b24 построен на токене приложения

    // Типизированный getBizProcScope()->robot()->add(...) принимает локализованные
    // массивы. Для короткого примера вызываем метод напрямую через ядро.
    $response = $b24->core->call('bizproc.robot.add', [
        'CODE' => 'robot',
        'HANDLER' => 'https://your-domain.example/robot-handler.php',
        'AUTH_USER_ID' => 1,
        'NAME' => 'Пример робота-встройки',
        'USE_PLACEMENT' => 'Y',
        'PLACEMENT_HANDLER' => 'https://your-domain.example/robot-settings.php',
        'PROPERTIES' => [
            'string' => ['Name' => 'Параметр 1', 'Type' => 'string'],
            'stringm' => ['Name' => 'Параметр 2', 'Type' => 'string', 'Multiple' => 'Y', 'Default' => ['value 1', 'value 2']],
        ],
    ]);

    var_dump($response->getResponseData()->getResult()[0]); // SDK возвращает скалярный result массивом
    ```
{% endlist %}

Успешный вызов вернет `true`.

```json
{
    "result": true
}
```

После регистрации сохраните код робота `robot`. Битрикс24 передаст его в обработчик настроек в поле `code` объекта `PLACEMENT_OPTIONS`.

## 2. Получите данные обработчика встройки

В обработчик в `PLACEMENT_OPTIONS` Битрикс24 передает данные:

- `code` — код вашего робота при регистрации
- `activity_name` — идентификатор действия в шаблоне бизнес-процесса
- `properties` — описание свойств робота
- `current_values` — текущие значения свойств
- `document_type` — тип документа, для которого проводится настройка
- `document_fields` — список полей документа
- `template` — список доступных полей шаблона (параметры, переменные, константы, глобальные переменные и константы, `return_activities`). В коробочной версии доступно с версии [24.200.0](../../settings/cloud-and-on-premise/on-premise/versions.md)

В iframe b24jssdk отдает эти данные готовым объектом в `$b24.placement.options`. На сервере `PLACEMENT_OPTIONS` приходит в POST-запросе JSON-строкой: разберите ее через `json_decode($_POST['PLACEMENT_OPTIONS'], true)` в PHP или `json.loads(request.form["PLACEMENT_OPTIONS"])` в Python.

Свойства в `properties` приходят в том виде, в котором их сохранил `bizproc.robot.add`: ключ — код свойства из `PROPERTIES`, поля описания — в верхнем регистре. Для робота из примера:

```json
{
    "string": {
        "NAME": "Параметр 1",
        "TYPE": "string"
    },
    "stringm": {
        "NAME": "Параметр 2",
        "TYPE": "string",
        "MULTIPLE": "Y",
        "DEFAULT": ["value 1", "value 2"]
    }
}
```

## 3. Сохраните параметры робота

Чтобы сохранить значения параметров в форме робота, в обработчике встройки используйте команду `setPropertyValue`. В b24jssdk она вызывается через `$b24.placement.call`:

```js
import { initializeB24Frame } from '@bitrix24/b24jssdk'

const $b24 = await initializeB24Frame()

// можно передать несколько свойств: ID свойства → значение
await $b24.placement.call('setPropertyValue', {
    string: 'test string',
    stringm: ['test2', 'test3'],
})
```

Команда принимает объект, где ключ — идентификатор свойства из `PROPERTIES`, а значение — новое значение свойства. Ключи, которых нет в `PROPERTIES`, Битрикс24 пропускает без ошибки. После этого пользователь сохраняет робота как обычно.

При следующем открытии настроек Битрикс24 передаст сохраненные значения в `current_values`.

## 4. Проверьте список роботов

Получите список роботов приложения:

{% list tabs %}

- JS

    ```js
    // Список роботов приложения
    const listResponse = await $b24.actions.v2.call.make({
        method: 'bizproc.robot.list',
        requestId: 'bizproc-robot-list',
    })
    if (!listResponse.isSuccess) {
        throw new Error(listResponse.getErrorMessages().join('; '))
    }

    const codes = listResponse.getData().result
    console.log(codes)
    ```

- Python

    ```python
    # Список роботов приложения
    codes = client.bizproc.robot.list().response.result
    print(codes)
    ```


- PHP

    ```php
    // Список роботов приложения
    $codes = $b24->getBizProcScope()->robot()->list()->getRobots();
    ```
{% endlist %}

Метод `bizproc.robot.list` вернет массив кодов роботов приложения.

```json
{
    "result": [
        "robot"
    ]
}
```

## Полный код обработчика встройки {#settings-handler}

Разместите страницу по адресу `PLACEMENT_HANDLER`. JS-код подключите на ней как модуль: соберите его сборщиком с установленным `@bitrix24/b24jssdk` или замените импорт на ESM-адрес, как в примерах Python и PHP. Обработчик отрисовывает форму по списку `properties` и сохраняет значения командой `setPropertyValue`. Для каждого текущего значения создается свое поле, для пустого свойства — одно пустое поле. У множественного свойства есть кнопка *Добавить значение*: она создает пустое поле, а при изменении любого поля приложение передает весь список значений этого свойства.

{% list tabs %}

- JS

    ```js
    // Страница-обработчик встройки (iframe приложения)
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    const options = $b24.placement.options
    const form = document.createElement('form')
    form.name = 'props'

    for (const [id, property] of Object.entries(options.properties || {})) {
        const multiple = property.MULTIPLE === 'Y'
        const current = [].concat(options.current_values?.[id] ?? '')
        const values = current.length ? current : ['']

        const label = document.createElement('label')
        label.textContent = property.NAME
        form.appendChild(label)

        for (const value of values) {
            const input = document.createElement('input')
            input.value = value
            input.dataset.id = id
            input.dataset.multiple = multiple ? '1' : '0'
            form.appendChild(input)
        }

        if (multiple) {
            const button = document.createElement('button')
            button.type = 'button'
            button.textContent = 'Добавить значение'
            button.dataset.add = id
            form.appendChild(button)
        }
    }

    document.body.appendChild(form)

    const send = (id) => {
        const inputs = [...form.querySelectorAll(`[data-id="${id}"]`)]
        const values = inputs.map((input) => input.value)
        $b24.placement.call('setPropertyValue', { [id]: inputs[0].dataset.multiple === '1' ? values : values[0] })
    }
    form.addEventListener('change', (event) => {
        if (event.target.dataset.id) send(event.target.dataset.id)
    })
    form.addEventListener('click', (event) => {
        const id = event.target.dataset.add
        if (!id) return
        const last = [...form.querySelectorAll(`[data-id="${id}"]`)].pop()
        const input = last.cloneNode()
        input.value = ''
        last.after(input)
    })
    ```

- Python

    ```python
    # Flask: сервер отдает HTML страницы настроек, PLACEMENT_OPTIONS приходит JSON-строкой
    import html
    import json
    from flask import Flask, request

    app = Flask(__name__)

    # JS держим в обычной строке без f-префикса — фигурные скобки остаются как есть
    SCRIPT = """<script type="module">
        import { initializeB24Frame } from 'https://esm.sh/@bitrix24/b24jssdk'
        const $b24 = await initializeB24Frame()
        const form = document.forms.props
        const send = (id) => {
            const inputs = [...form.querySelectorAll(`[data-id="${id}"]`)]
            const values = inputs.map((input) => input.value)
            $b24.placement.call('setPropertyValue', { [id]: inputs[0].dataset.multiple === '1' ? values : values[0] })
        }
        form.addEventListener('change', (event) => {
            if (event.target.dataset.id) send(event.target.dataset.id)
        })
        form.addEventListener('click', (event) => {
            const id = event.target.dataset.add
            if (!id) return
            const last = [...form.querySelectorAll(`[data-id="${id}"]`)].pop()
            const input = last.cloneNode()
            input.value = ''
            last.after(input)
        })
    </script>"""

    @app.post("/robot-settings.php")
    def robot_settings():
        options = json.loads(request.form.get("PLACEMENT_OPTIONS", "{}") or "{}")

        rows = []
        for prop_id, prop in (options.get("properties") or {}).items():
            multiple = prop.get("MULTIPLE") == "Y"
            values = options.get("current_values", {}).get(prop_id)
            values = values if isinstance(values, list) else [values if values is not None else ""]
            values = values or [""]
            attrs = f'data-id="{html.escape(prop_id)}" data-multiple="{int(multiple)}"'
            row = "".join(f'<input {attrs} value="{html.escape(str(v))}">' for v in values)
            if multiple:
                row += f'<button type="button" data-add="{html.escape(prop_id)}">Добавить значение</button>'
            title = html.escape(prop.get("NAME") or prop_id)
            rows.append(f"<label>{title}:</label>{row}")

        form_html = f'<form name="props">{"".join(rows)}</form>'
        return f"<!DOCTYPE html><html><body>\n{form_html}\n{SCRIPT}</body></html>"
    ```

- PHP

    ```php
    <?php
    // Сервер отдает HTML-страницу обработчика. PLACEMENT_OPTIONS приходит JSON-строкой.
    $options = json_decode($_POST['PLACEMENT_OPTIONS'] ?? '{}', true) ?: [];
    ?>
    <!DOCTYPE html>
    <html>
        <body>
            <form name="props">
            <?php foreach (($options['properties'] ?? []) as $id => $property):
                $multiple = ($property['MULTIPLE'] ?? '') === 'Y';
                $values = (array)($options['current_values'][$id] ?? '') ?: [''];
                $attrs = 'data-id="' . htmlspecialchars($id) . '" data-multiple="' . (int)$multiple . '"'; ?>
                <label><?=htmlspecialchars($property['NAME'] ?? $id)?>:</label>
                <?php foreach ($values as $v): ?>
                    <input <?=$attrs?> value="<?=htmlspecialchars((string)$v)?>">
                <?php endforeach; ?>
                <?php if ($multiple): ?>
                    <button type="button" data-add="<?=htmlspecialchars($id)?>">Добавить значение</button>
                <?php endif; ?>
            <?php endforeach; ?>
            </form>
            <script type="module">
                // b24jssdk подключается ESM-сборкой или собирается сборщиком
                import { initializeB24Frame } from 'https://esm.sh/@bitrix24/b24jssdk'
                const $b24 = await initializeB24Frame()
                const form = document.forms.props
                const send = (id) => {
                    const inputs = [...form.querySelectorAll(`[data-id="${id}"]`)]
                    const values = inputs.map((input) => input.value)
                    $b24.placement.call('setPropertyValue', { [id]: inputs[0].dataset.multiple === '1' ? values : values[0] })
                }
                form.addEventListener('change', (event) => {
                    if (event.target.dataset.id) send(event.target.dataset.id)
                })
                form.addEventListener('click', (event) => {
                    const id = event.target.dataset.add
                    if (!id) return
                    const last = [...form.querySelectorAll(`[data-id="${id}"]`)].pop()
                    const input = last.cloneNode()
                    input.value = ''
                    last.after(input)
                })
            </script>
        </body>
    </html>
    ```

{% endlist %}

## Обработчик запуска робота {#handler}

Когда автоматизация доходит до робота, Битрикс24 отправляет на `HANDLER` запрос POST в формате `application/x-www-form-urlencoded`. В запросе есть код робота `code`, документ `document_id`, значения параметров `properties` и токены `auth`. Полный состав полей — в разделе [Как работает ожидание результата](../../api-reference/bizproc/bizproc-robot/index.md#handler).

Робот в примере зарегистрирован без `USE_SUBSCRIPTION`, поэтому Битрикс24 не ждет результата обработчика: после постановки запроса в очередь автоматизация продолжает выполнение. Обработчику достаточно прочитать параметры и ответить кодом `200`.

Адрес `HANDLER` публичный. Перед основной логикой обработчик сверяет с ним `auth[application_token]` и отвечает `403` при несовпадении. В примерах сохраненное значение возвращает функция `getSavedAppToken` в JS и PHP и `get_saved_app_token` в Python — реализуйте ее на своем хранилище. Не записывайте токены из `auth` в журналы.

{% list tabs %}

- JS

    ```js
    // npm install express
    import { timingSafeEqual } from 'node:crypto'
    import express from 'express'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    const sameToken = (a = '', b = '') => {
        const left = Buffer.from(String(a))
        const right = Buffer.from(String(b))
        return left.length > 0 && left.length === right.length && timingSafeEqual(left, right)
    }

    app.post('/robot-handler.php', async (req, res) => {
        const { code, document_id: documentId = [], properties = {}, auth = {} } = req.body

        // getSavedAppToken — ваша функция: application_token, сохраненный из ONAPPINSTALL
        if (!sameToken(auth.application_token, await getSavedAppToken(auth.domain))) {
            return res.sendStatus(403)
        }

        if (code === 'robot') {
            const single = properties.string ?? ''
            const multiple = [].concat(properties.stringm ?? [])

            // здесь логика робота: например, передача данных во внешнюю систему
            console.log(`Робот запущен для ${documentId[2]}`, single, multiple)
        }

        res.sendStatus(200)
    })

    app.listen(3000)
    ```

- Python

    ```python
    # pip install flask
    import hmac
    from flask import Flask, request

    app = Flask(__name__)

    @app.post("/robot-handler.php")
    def robot_handler():
        form = request.form  # поля вида properties[string], properties[stringm][0]

        # get_saved_app_token — ваша функция: application_token, сохраненный из ONAPPINSTALL
        saved = get_saved_app_token(form.get("auth[domain]", ""))
        if not saved or not hmac.compare_digest(form.get("auth[application_token]", ""), saved):
            return "", 403

        if form.get("code") == "robot":
            document_id = form.get("document_id[2]", "")  # например, DEAL_17
            single = form.get("properties[string]", "")
            multiple = [v for k, v in form.items(multi=True) if k.startswith("properties[stringm]")]

            # здесь логика робота: например, передача данных во внешнюю систему
            print(f"Робот запущен для {document_id}", single, multiple)

        return "", 200
    ```

- PHP

    ```php
    <?php
    // robot-handler.php: PHP сам разбирает поля формы в массивы
    // getSavedAppToken — ваша функция: application_token, сохраненный из ONAPPINSTALL
    $saved = getSavedAppToken($_POST['auth']['domain'] ?? '');
    if ($saved === '' || !hash_equals($saved, (string)($_POST['auth']['application_token'] ?? ''))) {
        http_response_code(403);
        exit;
    }

    if (($_POST['code'] ?? '') === 'robot') {
        $documentId = $_POST['document_id'][2] ?? ''; // например, DEAL_17
        $single = $_POST['properties']['string'] ?? '';
        $multiple = (array)($_POST['properties']['stringm'] ?? []);

        // здесь логика робота: например, передача данных во внешнюю систему
        error_log("Робот запущен для {$documentId}: {$single}; " . implode(', ', $multiple));
    }

    http_response_code(200);
    ```

{% endlist %}

Если робот должен вернуть результат в автоматизацию, зарегистрируйте его с `USE_SUBSCRIPTION = 'Y'` и `RETURN_PROPERTIES`, а в обработчике вызовите [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md) с `event_token` из запроса. Такой обработчик разобран в туториале [Как создать свое действие для бизнес-процесса](./how-to-create-custom-activity.md).

## Проверим результат

1. Откройте настройки автоматизации CRM или шаблон бизнес-процесса
2. Добавьте робота приложения с названием `Пример робота-встройки`
3. Откройте настройки робота и проверьте, что в них отображается страница по адресу `PLACEMENT_HANDLER`
4. Измените значения параметров и сохраните робота. Снова откройте настройки робота и убедитесь, что поля содержат сохраненные значения
5. Запустите автоматизацию, например переведите сделку на стадию с роботом, и проверьте, что `HANDLER` получил запрос с введенными значениями в `properties`

Через REST проверьте, что код `robot` есть в ответе метода `bizproc.robot.list`.

Чтобы удалить тестового робота после проверки, вызовите [bizproc.robot.delete](../../api-reference/bizproc/bizproc-robot/bizproc-robot-delete.md) с `CODE: 'robot'`. Робот пропадет из настроек автоматизации.

## Диагностика ошибок

Если метод вернул ошибку, проверьте данные запроса.

- `ACCESS_DENIED` с описанием `Access denied! Application context required` — метод вызван не из контекста приложения. Откройте приложение и повторите вызов в его контексте
- `ACCESS_DENIED` с описанием `Access denied!` — метод вызвал не администратор. Повторите вызов от имени администратора
- `ERROR_ACTIVITY_VALIDATION_FAILURE` — не указан обязательный параметр или некорректно заполнены `CODE`, `PROPERTIES`, `DOCUMENT_TYPE` или `FILTER`
- `ERROR_UNSUPPORTED_PROTOCOL` — в URL обработчика указан неподдерживаемый протокол
- `ERROR_WRONG_HANDLER_URL` — URL обработчика не прошел проверку
- `ERROR_ACTIVITY_ALREADY_INSTALLED` — робот с таким кодом уже зарегистрирован этим приложением
- `HANDLER` ответил `403` — для этого Битрикс24 не найден сохраненный `application_token` или функция хранилища вернула другое значение. Проверьте хранилище и снова запустите автоматизацию
- `HANDLER` не получил запрос — проверьте, что адрес доступен из интернета по HTTPS, и посмотрите журнал веб-сервера. Затем снова запустите автоматизацию
- `ERROR_CORE` с описанием `Unable to set placement handler: You should use unique placement handler for each CODE!` — такой `PLACEMENT_HANDLER` уже указан у другого робота или действия приложения. Задайте для каждого `CODE` свой URL страницы настроек. Если после `Unable to set placement handler:` указан другой текст, разберите его
- настройки робота открываются стандартной формой, а не страницей приложения — робот зарегистрирован без `USE_PLACEMENT = 'Y'`. Передайте `USE_PLACEMENT` и `PLACEMENT_HANDLER` методом [bizproc.robot.update](../../api-reference/bizproc/bizproc-robot/bizproc-robot-update.md)
- значение не появилось в форме после `setPropertyValue` — ключ в команде не совпадает с кодом свойства из `PROPERTIES`

После исправления параметров регистрации повторите сценарий с шага 1. Если ошибка возникла при сохранении значений через `setPropertyValue`, повторите сценарий с шага 3.

## Что важно учитывать

- Битрикс24 открывает `PLACEMENT_HANDLER` во фрейме своей страницы по HTTPS, поэтому браузер не загрузит страницу настроек по HTTP

## Продолжите изучение

- [Роботы приложений: обзор методов](../../api-reference/bizproc/bizproc-robot/index.md)
- [Зарегистрировать нового робота bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md)
- [Обновить поля робота bizproc.robot.update](../../api-reference/bizproc/bizproc-robot/bizproc-robot-update.md)
- [Вызвать зарегистрированную команду интерфейса BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md)
