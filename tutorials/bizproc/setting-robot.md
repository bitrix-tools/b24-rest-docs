# Как встроить свой UI в параметры робота 

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В *Битрикс24* можно настраивать робота и действие бизнес-процесса используя интерфейс приложения. Это реализовано стандартным [механизмом встройки виджетов](../../api-reference/widgets/index.md). В коробочной версии доступно с версии [20.0.600](../../settings/cloud-and-on-premise/on-premise/versions.md) модуля `Бизнес-процессы`. 

В примере приложение добавляет робота, у которого есть 2 параметра с типом `строка`.

{% note info "" %}

Методы `bizproc.robot.*` работают только в контексте [приложения](../../settings/app-installation/index.md). Через входящий вебхук метод вернет ошибку `ACCESS_DENIED` с описанием «Application context required». Инициализацию SDK в контексте приложения смотрите в сценарии [Как добавить действие для создания счета](./activity.md#инициализация-sdk-в-контексте-приложения).

{% endnote %}

## Регистрация робота

Чтобы параметры можно было настраивать через приложение, при добавлении робота передаем `USE_PLACEMENT=Y` и обработчик `PLACEMENT_HANDLER`.

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
    ```

- PHP

    ```php
    <?php
    // $b24 построен на токене приложения (см. сценарий «Как добавить действие для создания счета»)

    // Типизированный getBizProcScope()->robot()->add(...) принимает локализованные
    // массивы. Для простого примера вызываем метод напрямую через ядро.
    $b24->core->call('bizproc.robot.add', [
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
    ```

- Python

    ```python
    # client построен на токене приложения (см. сценарий «Как добавить действие для создания счета»)
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
    ```

{% endlist %}

## Данные обработчика встройки

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

## Сохранение параметров робота

Чтобы сохранить значения параметров в робота, в обработчике встройки используем команду `setPropertyValue`. В b24jssdk она вызывается через `$b24.placement.call`:

```js
import { initializeB24Frame } from '@bitrix24/b24jssdk'

const $b24 = await initializeB24Frame()

// можно передать несколько свойств: ID свойства → значение
await $b24.placement.call('setPropertyValue', {
    string: 'test string',
    stringm: ['test2', 'test3'],
})
```

Далее пользователь сохраняет робота как обычно.

## Управление роботом

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

    // Удалить робота по коду
    await $b24.actions.v2.call.make({
        method: 'bizproc.robot.delete',
        params: { CODE: 'robot' },
        requestId: 'bizproc-robot-delete',
    })
    ```

- PHP

    ```php
    // Список роботов приложения
    $codes = $b24->getBizProcScope()->robot()->list()->getRobots();

    // Удалить робота по коду
    $b24->getBizProcScope()->robot()->delete('robot');
    ```

- Python

    ```python
    # Список роботов приложения
    codes = client.bizproc.robot.list().response.result

    # Удалить робота по коду
    client.bizproc.robot.delete(code="robot").response
    ```

{% endlist %}

## Полный код обработчика встройки

Обработчик отрисовывает форму по списку `properties` и сохраняет значения командой `setPropertyValue`. Форму удобнее всего строить на стороне браузера через b24jssdk в режиме фрейма.

{% list tabs %}

- JS

    ```js
    // Страница-обработчик встройки (iframe приложения)
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()
    const options = $b24.placement.options
    const form = document.createElement('form')

    for (const [id, property] of Object.entries(options.properties || {})) {
        const multiple = property.MULTIPLE === 'Y'
        const values = [].concat(options.current_values?.[id] ?? '')

        const label = document.createElement('label')
        label.textContent = property.NAME
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
                $values = (array)($options['current_values'][$id] ?? '');
                $name = $multiple ? $id . '[]' : $id; ?>
                <label><?=htmlspecialchars($property['NAME'])?>:</label>
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

- Python

    ```python
    # Flask: сервер отдает HTML обработчика, PLACEMENT_OPTIONS приходит JSON-строкой
    from flask import request
    import json, html

    options = json.loads(request.form.get("PLACEMENT_OPTIONS", "{}") or "{}")

    rows = []
    for prop_id, prop in (options.get("properties") or {}).items():
        multiple = prop.get("MULTIPLE") == "Y"
        values = options.get("current_values", {}).get(prop_id, "")
        values = values if isinstance(values, list) else [values]
        name = f"{prop_id}[]" if multiple else prop_id
        inputs = "".join(
            f'<input name="{name}" value="{html.escape(str(v))}" '
            f'onchange="setPropertyValue(\'{prop_id}\', this.name, {int(multiple)})">'
            for v in values
        )
        rows.append(f'<label>{html.escape(prop["NAME"])}:</label>{inputs}')

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

{% endlist %}
