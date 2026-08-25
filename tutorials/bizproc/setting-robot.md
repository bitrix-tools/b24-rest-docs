# Как встроить свой UI в параметры робота

> Scope: [`bizproc`, `placement`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В Битрикс24 можно настраивать робота или действие бизнес-процесса через интерфейс приложения. Пользователь открывает настройки робота, Битрикс24 показывает страницу приложения в слайдере, а приложение передает выбранные значения обратно в форму робота. Это реализовано стандартным [механизмом встройки виджетов](../../api-reference/widgets/index.md).

В коробочной версии настройка робота через встройку доступна с версии [20.0.600](../../settings/cloud-and-on-premise/on-premise/versions.md) модуля `Бизнес-процессы`.

В примере приложение добавляет робота, у которого есть два параметра с типом `string`.

Сценарий состоит из четырех шагов.

1. Зарегистрировать робота методом [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md) с параметрами `USE_PLACEMENT` и `PLACEMENT_HANDLER`
2. Получить в обработчике данные из `PLACEMENT_OPTIONS`
3. Сохранить значения параметров командой [BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md) `setPropertyValue`
4. Проверить список роботов методом [bizproc.robot.list](../../api-reference/bizproc/bizproc-robot/bizproc-robot-list.md) или удалить тестового робота методом [bizproc.robot.delete](../../api-reference/bizproc/bizproc-robot/bizproc-robot-delete.md)

{% note info "" %}

Методы `bizproc.robot.*` работают только в контексте [приложения](../../settings/app-installation/index.md). Через входящий вебхук метод вернет ошибку `ACCESS_DENIED` с описанием `Application context required`.

{% endnote %}

## Подготовьте приложение

Перед регистрацией робота подготовьте:

- установленное приложение с правом `bizproc`
- публичный HTTPS-обработчик робота `HANDLER`
- публичный HTTPS-обработчик страницы настроек `PLACEMENT_HANDLER`
- идентификатор пользователя `AUTH_USER_ID`, токен которого Битрикс24 передаст приложению при запуске робота
- зависимости SDK для выбранного стека: `npm install @bitrix24/b24jssdk`, `composer require bitrix24/b24phpsdk:"^3.0"` или `pip install b24pysdk`

`HANDLER` и `PLACEMENT_HANDLER` могут вести на один URL, если приложение само разделяет запросы запуска робота и открытия страницы настроек.

В сценарии есть три участка кода:

- страница приложения в iframe — регистрирует робота через `bizproc.robot.add` и может проверять список роботов
- серверный обработчик робота `HANDLER` — получает данные, когда автоматизация запускает робота
- обработчик настроек `PLACEMENT_HANDLER` — отдает страницу настройки робота и сохраняет значения через `setPropertyValue`

В примерах замените:

- `https://your-domain.example/handler.php` — на URL обработчика приложения
- `AUTH_USER_ID` — на идентификатор пользователя, от имени которого робот будет выполнять запросы
- `robot` — на уникальный код робота в рамках приложения

## Инициализируйте SDK в контексте приложения

Методы `bizproc.robot.*` требуют контекст приложения. Для страницы приложения в iframe используйте `initializeB24Frame()`. Для серверных PHP- и Python-обработчиков создайте клиент из объекта `auth`, который Битрикс24 передает в запросе приложения.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    ```

- Python

    ```python
    # pip install b24pysdk
    from flask import request
    from b24pysdk import BitrixApp, BitrixToken, Client

    APP = BitrixApp(client_id="local.xxxxxxxx.xxxxxxxx", client_secret="yyyyyyyy")

    def make_client(auth: dict) -> tuple[Client, BitrixToken]:
        token = BitrixToken(
            domain=auth["domain"],
            auth_token=auth["access_token"],
            refresh_token=auth.get("refresh_token", ""),
            bitrix_app=APP,
        )
        return Client(token), token

    auth = request.json["auth"]  # словарь auth из тела запроса обработчика
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
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'local.xxxxxxxx.xxxxxxxx',
        'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'yyyyyyyy',
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
            HANDLER: 'https://your-domain.example/handler.php',
            AUTH_USER_ID: 1,
            NAME: 'Пример робота-встройки',
            USE_PLACEMENT: 'Y',
            PLACEMENT_HANDLER: 'https://your-domain.example/handler.php',
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
        handler="https://your-domain.example/handler.php",
        name="Пример робота-встройки",
        auth_user_id=1,
        use_placement=True,
        placement_handler="https://your-domain.example/handler.php",
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
        'HANDLER' => 'https://your-domain.example/handler.php',
        'AUTH_USER_ID' => 1,
        'NAME' => 'Пример робота-встройки',
        'USE_PLACEMENT' => 'Y',
        'PLACEMENT_HANDLER' => 'https://your-domain.example/handler.php',
        'PROPERTIES' => [
            'string' => ['Name' => 'Параметр 1', 'Type' => 'string'],
            'stringm' => ['Name' => 'Параметр 2', 'Type' => 'string', 'Multiple' => 'Y', 'Default' => ['value 1', 'value 2']],
        ],
    ]);

    var_dump($response->getResponseData()->getResult());
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
- `properties` — список свойств и их описание
- `current_values` — текущие значения свойств
- `document_type` — тип документа, для которого проводится настройка
- `document_fields` — список полей документа
- `template` — список доступных полей шаблона (параметры, переменные, константы, глобальные переменные и константы, `return_activities`). В коробочной версии доступно с версии [24.200.0](../../settings/cloud-and-on-premise/on-premise/versions.md)

Структура свойств приведена к единому формату:

```js
{
    Id: 'string',        // идентификатор (код) свойства
    Type: 'string',      // идентификатор типа свойства
    Name: 'string',      // название
    Description: 'string',
    Multiple: false,     // множественное свойство или нет
    Required: false,     // обязательное свойство или нет
    Options: '',         // зависит от типа свойства
    Settings: [],        // зависит от типа свойства
    Default: ''           // значение по умолчанию
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

Команда принимает объект, где ключ — идентификатор свойства из `PROPERTIES`, а значение — новое значение свойства. После этого пользователь сохраняет робота как обычно.

При следующем открытии настроек Битрикс24 передаст сохраненные значения в `current_values`.

## 4. Проверьте или удалите робота

Получить список установленных роботов и удалить робота:

{% list tabs %}

- JS

    ```js
    // Список роботов приложения
    const listResponse = await $b24.actions.v2.call.make({
        method: 'bizproc.robot.list',
        requestId: 'bizproc-robot-list',
    })
    const codes = listResponse.getData().result
    console.log(codes)

    // Удалить робота по коду
    await $b24.actions.v2.call.make({
        method: 'bizproc.robot.delete',
        params: { CODE: 'robot' },
        requestId: 'bizproc-robot-delete',
    })
    ```

- Python

    ```python
    # Список роботов приложения
    codes = client.bizproc.robot.list().response.result
    print(codes)

    # Удалить робота по коду
    client.bizproc.robot.delete(code="robot").response
    ```


- PHP

    ```php
    // Список роботов приложения
    $codes = $b24->getBizProcScope()->robot()->list()->getRobots();

    // Удалить робота по коду
    $b24->getBizProcScope()->robot()->delete('robot');
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

## Полный код обработчика встройки

Обработчик отрисовывает форму по списку `properties` и сохраняет значения командой `setPropertyValue`. Форму можно строить на стороне браузера через b24jssdk в режиме фрейма.

{% list tabs %}

- JS

    ```js
    // Страница-обработчик встройки (iframe приложения)
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    const options = $b24.placement.options
    const form = document.createElement('form')

    for (const [id, property] of Object.entries(options.properties || {})) {
        const multiple = property.Multiple === true || property.Multiple === 'Y' || property.MULTIPLE === 'Y'
        const values = [].concat(options.current_values?.[id] ?? '')

        const label = document.createElement('label')
        label.textContent = property.Name || property.NAME
        form.appendChild(label)

        values.forEach((value) => {
            const input = document.createElement('input')
            input.value = value
            input.addEventListener('change', () => {
                const all = Array.from(form.querySelectorAll(`[data-id="${id}"]`)).map((i) => i.value)
                $b24.placement.call('setPropertyValue', { [id]: multiple ? all : all[0] })
            })
            input.dataset.id = id
            form.appendChild(input)
        })
    }

    document.body.appendChild(form)
    ```

- Python

    ```python
    # Flask: сервер отдает HTML обработчика, PLACEMENT_OPTIONS приходит JSON-строкой
    from flask import request
    import json, html

    options = json.loads(request.form.get("PLACEMENT_OPTIONS", "{}") or "{}")

    rows = []
    for prop_id, prop in (options.get("properties") or {}).items():
        multiple = prop.get("Multiple") is True or prop.get("Multiple") == "Y" or prop.get("MULTIPLE") == "Y"
        values = options.get("current_values", {}).get(prop_id, "")
        values = values if isinstance(values, list) else [values]
        name = f"{prop_id}[]" if multiple else prop_id
        inputs = "".join(
            f'<input name="{name}" value="{html.escape(str(v))}" '
            f'onchange="setPropertyValue(\'{prop_id}\', this.name, {int(multiple)})">'
            for v in values
        )
        rows.append(f'<label>{html.escape(prop.get("Name") or prop.get("NAME"))}:</label>{inputs}')

    # JS держим в обычной строке без f-префикса — фигурные скобки остаются как есть
    script = """<script type="module">
        import { initializeB24Frame } from 'https://esm.sh/@bitrix24/b24jssdk'
        const $b24 = await initializeB24Frame()
        window.setPropertyValue = (id, inputName, multiple) => {
            const data = new FormData(document.forms.props)
            const value = multiple ? data.getAll(inputName) : data.get(inputName)
            $b24.placement.call('setPropertyValue', { [id]: value })
        }
    </script>"""

    form_html = f'<form name="props">{"".join(rows)}</form>'
    page = f"<!DOCTYPE html><html><body>\n{form_html}\n" + script + "</body></html>"
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
                $multiple = ($property['Multiple'] ?? false) === true || ($property['Multiple'] ?? '') === 'Y' || ($property['MULTIPLE'] ?? '') === 'Y';
                $values = (array)($options['current_values'][$id] ?? '');
                $name = $multiple ? $id . '[]' : $id; ?>
                <label><?=htmlspecialchars($property['Name'] ?? $property['NAME'])?>:</label>
                <?php foreach ($values as $v): ?>
                    <input name="<?=$name?>" value="<?=htmlspecialchars((string)$v)?>"
                           onchange="setPropertyValue('<?=$id?>', this.name, <?=(int)$multiple?>)">
                <?php endforeach; ?>
            <?php endforeach; ?>
            </form>
            <script type="module">
                // b24jssdk подключается ESM-сборкой или собирается сборщиком
                import { initializeB24Frame } from 'https://esm.sh/@bitrix24/b24jssdk'
                const $b24 = await initializeB24Frame()
                window.setPropertyValue = (id, inputName, multiple) => {
                    const data = new FormData(document.forms.props)
                    const value = multiple ? data.getAll(inputName) : data.get(inputName)
                    $b24.placement.call('setPropertyValue', { [id]: value })
                }
            </script>
        </body>
    </html>
    ```
{% endlist %}

## Проверим результат

1. Откройте настройки автоматизации CRM или шаблон бизнес-процесса.
2. Добавьте робота приложения с названием `Пример робота-встройки`.
3. Откройте настройки робота и проверьте, что Битрикс24 открывает `PLACEMENT_HANDLER` в слайдере.
4. Измените значения параметров и сохраните робота.

Через REST проверьте, что код `robot` есть в ответе метода `bizproc.robot.list`.

## Диагностика ошибок

Если метод вернул ошибку, проверьте данные запроса.

- `ACCESS_DENIED` с описанием `Application context required` — метод вызван не из контекста приложения
- `ACCESS_DENIED` с описанием `Access denied!` — метод вызвал не администратор
- `ERROR_ACTIVITY_VALIDATION_FAILURE` — не указан обязательный параметр или некорректно заполнены `CODE`, `PROPERTIES`, `DOCUMENT_TYPE` или `FILTER`
- `ERROR_UNSUPPORTED_PROTOCOL` — в URL обработчика указан неподдерживаемый протокол
- `ERROR_WRONG_HANDLER_URL` — URL обработчика не прошел проверку
- `ERROR_ACTIVITY_ALREADY_INSTALLED` — робот с таким кодом уже зарегистрирован этим приложением

После исправления параметров регистрации повторите сценарий с шага 1. Если ошибка возникла при сохранении значений через `setPropertyValue`, повторите сценарий с шага 3.

## Что важно учитывать

- Методы `bizproc.robot.add`, `bizproc.robot.list` и `bizproc.robot.delete` не помечены как устаревшие в документации и зарегистрированы в исходном коде как актуальные методы
- `PLACEMENT_HANDLER` должен быть доступен по HTTPS и находиться на домене установленного приложения
- Значения, переданные через `setPropertyValue`, сохраняются в форме настройки. Чтобы изменения попали в шаблон автоматизации или бизнес-процесса, пользователь должен сохранить робота
- Повторный запуск примера с тем же `CODE` вернет ошибку, если робот уже зарегистрирован

## Продолжите изучение

- [Роботы приложений: обзор методов](../../api-reference/bizproc/bizproc-robot/index.md)
- [Зарегистрировать нового робота bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md)
- [Обновить поля робота bizproc.robot.update](../../api-reference/bizproc/bizproc-robot/bizproc-robot-update.md)
- [Вызвать зарегистрированную команду интерфейса BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md)
