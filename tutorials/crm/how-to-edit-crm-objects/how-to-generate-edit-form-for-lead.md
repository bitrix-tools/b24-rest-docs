# Как сделать свою карточку редактирования лида

> Scope: [`crm`](../../../api-reference/scopes/permissions.md), [`user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнить сценарий: пользователь с правом читать, добавлять и изменять лиды, читать связанные компании и контакты, а также с доступом к настройкам CRM. Scope `user_brief` нужен для вызова [user.get](../../../api-reference/user/user-get.md)

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В примере создадим веб-форму для добавления и редактирования лида. Форма не содержит заранее заданного списка полей: генератор получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и подбирает элемент HTML-формы по типу каждого поля. Поэтому пользовательские поля, созданные в Битрикс24, появляются в форме без изменения кода.

Если открыть страницу без параметра `ID`, форма будет пустой, а обработчик создаст лид. Если передать идентификатор, например `?ID=123`, генератор загрузит лид методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), заполнит форму, а обработчик обновит этот лид.

Пример состоит из двух файлов:

- генератор получает описание полей, данные лида и значения справочников, затем выводит HTML-форму
- обработчик принимает данные формы и вызывает метод добавления или обновления

## Как работает сценарий

1. Генератор получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md)
2. Если в адресе есть `ID`, генератор получает значения лида методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
3. Генератор подставляет читаемые названия вместо служебных кодов с помощью дополнительных методов
   - [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — поля `STATUS_ID` и `NAME` для стадий, источников и других CRM-справочников
   - [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) — поля `CURRENCY` и `FULL_NAME` для валют
   - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — поле `title` связанной компании
   - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — поля `id`, `name`, `lastName` связанных контактов
   - [user.get](../../../api-reference/user/user-get.md) — поля `ID`, `NAME`, `LAST_NAME` пользователей
4. Обработчик повторно получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и приводит значения формы к типам REST API
5. Обработчик добавляет новый лид методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) или обновляет существующий методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)

## 1. Подготовим окружение

Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#incoming-webhook) с правами `crm` и `user_brief`. Пользователю вебхука нужны права на чтение, добавление и изменение лидов, чтение компаний и контактов и доступ к настройкам CRM.

{% note warning "Храните вебхук в секрете" %}

Вебхук выполняет запросы с правами пользователя, который его создал. Не добавляйте адрес вебхука в публичный репозиторий, клиентский JavaScript и сообщения об ошибках.

{% endnote %}

Выберите один язык, создайте для примера отдельную папку и откройте в ней терминал. Сохраните код из шагов 2 и 3 в два соответствующих файла и только затем выполните команду запуска.

#|
|| Язык | Генератор формы | Обработчик ||
|| JavaScript | `form.mjs` | `save-form.mjs` ||
|| PHP | `index.php` | `auto_form.php` ||
|| Python | `app.py` | `save_form.py` ||
|#

Установите зависимости.

{% list tabs %}

- JS

    ```bash
    npm init -y
    npm install @bitrix24/b24jssdk express
    ```

- Python

    ```bash
    pip install b24pysdk flask
    ```


- PHP

    ```bash
    composer require bitrix24/b24phpsdk:"^3.0"
    ```
{% endlist %}

Перед установкой зависимостей проверьте версию PHP командой `php -v`, а список подключенных расширений — командой `php -m`. B24PhpSDK версии 3 требует PHP 8.4 или 8.5. B24PhpSDK и его зависимости требуют расширения `bcmath`, `curl`, `intl` и `json`. После установки выполните `composer check-platform-reqs`.

Укажите адрес вебхука:

- в JavaScript задайте переменную окружения `B24_HOOK`
- в PHP замените полный URL в `initFromWebhook`
- в Python замените `your-domain.bitrix24.ru` и `USER_ID/TOKEN`

Запустите пример.

{% list tabs %}

- JS

    Bash:

    ```bash
    export B24_HOOK='https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
    node form.mjs
    ```

    PowerShell:

    ```powershell
    $env:B24_HOOK='https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
    node form.mjs
    ```

- Python

    Bash и PowerShell:

    ```bash
    python app.py
    ```


- PHP

    Bash и PowerShell:

    ```bash
    php -S localhost:8000
    ```
{% endlist %}

Страницы формы будут доступны по адресам:

#|
|| Язык | Новый лид | Существующий лид с идентификатором `123` ||
|| JavaScript | `http://localhost:3000/` | `http://localhost:3000/?ID=123` ||
|| PHP | `http://localhost:8000/index.php` | `http://localhost:8000/index.php?ID=123` ||
|| Python | `http://localhost:5000/` | `http://localhost:5000/?ID=123` ||
|#

## 2. Создадим форму лида

Генератор передает в [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) два параметра:

- `entityTypeId: 1` — тип объекта «лид». Значения для других объектов приведены в таблице [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type)
- `useOriginalUfNames: Y` — вернуть оригинальные имена пользовательских полей `UF_*`

В Python SDK параметр `useOriginalUfNames` называется `use_original_uf_names` и принимает логическое значение `True`.

Сокращенный ответ [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) для лида выглядит так:

```json
{
    "result": {
        "fields": {
            "title": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false,
                "title": "Название лида"
            },
            "stageId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false,
                "statusType": "STATUS"
            },
            "sourceId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false,
                "statusType": "SOURCE"
            },
            "companyId": {
                "type": "crm_company",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "contactIds": {
                "type": "crm_contact",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": true
            },
            "opportunity": {
                "type": "double",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "currencyId": {
                "type": "crm_currency",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "isManualOpportunity": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "fm": {
                "type": "crm_multifield",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": true
            }
        }
    }
}
```

Следующему шагу нужны ключи `type`, `isRequired`, `isReadOnly`, `isMultiple`, `title` или `formLabel`. Для полей типа `crm_status` также нужен `statusType`: для `stageId` он равен `STATUS`, для `sourceId` — `SOURCE`. Это значение генератор передает в фильтр `ENTITY_ID` метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md).

Если передать `ID=123`, [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернет данные в `result.item`. Генератор берет из этого объекта значения по тем же camelCase-ключам, что пришли в описании полей:

```json
{
    "result": {
        "item": {
            "id": 123,
            "title": "Заявка с сайта",
            "stageId": "NEW",
            "sourceId": "WEB",
            "companyId": 27,
            "contactIds": [31, 44],
            "opportunity": 15000,
            "currencyId": "RUB",
            "isManualOpportunity": "Y",
            "fm": [
                {
                    "id": 451,
                    "typeId": "PHONE",
                    "valueType": "WORK",
                    "value": "+7 495 111-22-33"
                }
            ]
        }
    }
}
```

Поле `companyId` содержит один идентификатор компании, а `contactIds` — массив идентификаторов контактов. Само поле `contactIds` устроено так же, как у компании. Отличие лида в дополнительной одиночной связи `companyId`: лид может одновременно иметь одну компанию и несколько контактов. Устаревшее одиночное поле `contactId` и служебное поле `contacts` пример не выводит, чтобы не отправлять несколько представлений одной связи.

Мультиполе `fm` применимо к лидам. В форме доступны типы `PHONE`, `EMAIL`, `WEB`, `IM`.

Сумма лида хранится в `opportunity` типа `double`, валюта — в `currencyId` типа `crm_currency`. Режим расчета суммы хранится отдельно в логическом поле `isManualOpportunity`, поэтому форма выводит для него отдельный флажок.

Генератор сопоставляет типы полей с элементами формы.

#|
|| Тип поля | Элемент формы ||
|| `crm_status`, `crm_currency`, `enumeration` | `<select>` со значениями справочника ||
|| `crm_company` | числовое поле и название текущей компании ||
|| `crm_contact` | одно или несколько числовых полей и имена текущих контактов ||
|| `user` | числовое поле и имя пользователя ||
|| `crm_multifield` | строки `typeId`, `valueType`, `value` с сохранением `id` ||
|| `date`, `datetime` | `date`, `datetime-local` ||
|| `boolean`, `char` | флажок ||
|| `integer`, `double` | числовое поле ||
|| `money` | сумма и список валют ||
|| `file`, `resourcebooking` | сообщение о неподдерживаемом типе ||
|| Остальные типы | текстовое поле ||
|#

{% include [Сноска о примерах](../../../_includes/examples.md) %}

### Полный код генератора формы

Сохраните код в файл генератора: JavaScript — `form.mjs`, PHP — `index.php`, Python — `app.py`.

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'
    import { saveForm } from './save-form.mjs'

    const ENTITY_TYPE_ID = 1
    const SKIPPED_FIELDS = new Set(['contactId', 'contacts'])
    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    const app = express()

    app.use(express.urlencoded({ extended: true }))

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })
        if (!response.isSuccess) throw new Error(response.getErrorMessages().join('; '))
        return response.getData().result
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
        })[char])
    }

    function input(params) {
        const values = params.MULTIPLE
            ? [...(Array.isArray(params.VALUE) ? params.VALUE : [params.VALUE ?? '']), '']
            : [params.VALUE ?? '']
        return values.map((value, index) => {
            let html = '<input class="form-control"'
            html += ` name="${escapeHtml(params.NAME)}${params.MULTIPLE ? '[]' : ''}"`
            html += ` type="${escapeHtml(params.TYPE || 'text')}"`
            if (params.STEP) html += ` step="${escapeHtml(params.STEP)}"`
            if (params.REQUIRED && index === 0) html += ' required'
            if (params.DISABLE) html += ' disabled'
            if (params.CHECKED) html += ' checked'
            return html + ` value="${escapeHtml(value)}">`
        }).join('')
    }

    function select(params, options) {
        let html = `<select class="form-control" name="${escapeHtml(params.NAME)}${params.MULTIPLE ? '[]' : ''}"`
        if (params.REQUIRED) html += ' required'
        if (params.DISABLE) html += ' disabled'
        if (params.MULTIPLE) html += ' multiple'
        html += '>'
        if (!params.REQUIRED && !params.MULTIPLE) html += '<option value="">-- Не выбрано --</option>'
        const selectedValues = (Array.isArray(params.VALUE) ? params.VALUE : [params.VALUE ?? '']).map(String)
        for (const [key, title] of Object.entries(options)) {
            const selected = selectedValues.includes(String(key)) ? ' selected' : ''
            html += `<option value="${escapeHtml(key)}"${selected}>${escapeHtml(title)}</option>`
        }
        return html + '</select>'
    }

    function multifields(values) {
        const rows = [...(Array.isArray(values) ? values : [])]
        rows.push(...Array.from({ length: 3 }, () => ({ id: '', typeId: 'PHONE', valueType: 'WORK', value: '' })))
        return rows.map((row, index) => {
            const typeOptions = ['PHONE', 'EMAIL', 'WEB', 'IM']
                .map((type) => `<option value="${type}"${row.typeId === type ? ' selected' : ''}>${type}</option>`)
                .join('')
            return `<div class="border rounded p-2 mb-2">
                <input type="hidden" name="fm[${index}][id]" value="${escapeHtml(row.id)}">
                <select class="form-control mb-1" name="fm[${index}][typeId]">${typeOptions}</select>
                <input class="form-control mb-1" name="fm[${index}][valueType]" value="${escapeHtml(row.valueType || 'WORK')}" placeholder="WORK">
                <input class="form-control mb-1" name="fm[${index}][value]" value="${escapeHtml(row.value)}" placeholder="Значение">
                ${row.id ? `<label><input type="checkbox" name="fm[${index}][delete]" value="Y"> Удалить</label>` : ''}
            </div>`
        }).join('')
    }

    app.get('/', async (req, res) => {
        const id = parseInt(String(req.query.ID ?? '0'), 10) || 0
        try {
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'lead-fields')
            const fields = fieldResult.fields
            const currencies = await call('crm.currency.list', {}, 'currencies')
            const item = id > 0
                ? (await call('crm.item.get', {
                    entityTypeId: ENTITY_TYPE_ID,
                    id,
                    useOriginalUfNames: 'Y',
                }, 'lead-get')).item
                : {}

            let standard = ''
            let custom = ''
            for (const [key, field] of Object.entries(fields)) {
                if (SKIPPED_FIELDS.has(key)) continue
                let value = item[key] ?? ''
                let control = ''
                const params = {
                    NAME: `form[${key}]`, VALUE: value,
                    REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple,
                }

                if (field.type === 'crm_status') {
                    const rows = await call('crm.status.list', {
                        filter: { ENTITY_ID: field.statusType },
                    }, `status-${key}`)
                    control = select(params, Object.fromEntries(rows.map((row) => [row.STATUS_ID, row.NAME])))
                } else if (field.type === 'crm_currency') {
                    control = select(params, Object.fromEntries(currencies.map((row) => [row.CURRENCY, row.FULL_NAME])))
                } else if (field.type === 'enumeration') {
                    const options = Object.fromEntries((field.items || []).map((row) => [row.ID ?? row.id, row.VALUE ?? row.value]))
                    control = select(params, options)
                } else if (field.type === 'crm_multifield') {
                    control = multifields(value)
                } else if (field.type === 'crm_company') {
                    control = input({ ...params, TYPE: 'number' })
                    if (value) {
                        const company = (await call('crm.item.get', {
                            entityTypeId: 4, id: Number(value),
                        }, `company-${key}`)).item
                        control += ` (${escapeHtml(company.title)})`
                    }
                } else if (field.type === 'crm_contact') {
                    control = input({ ...params, TYPE: 'number' })
                    const ids = (Array.isArray(value) ? value : [value]).map(Number).filter((itemId) => itemId > 0)
                    if (ids.length) {
                        const contacts = (await call('crm.item.list', {
                            entityTypeId: 3,
                            filter: { '@id': ids },
                            select: ['id', 'name', 'lastName'],
                        }, `contacts-${key}`)).items
                        const names = contacts.map((contact) => [contact.name, contact.lastName].filter(Boolean).join(' '))
                        control += ` (${escapeHtml(names.join(', '))})`
                    }
                } else if (field.type === 'user') {
                    control = input({ ...params, TYPE: 'number' })
                    if (value) {
                        const users = await call('user.get', { filter: { ID: value } }, `user-${key}`)
                        const names = users.map((user) => [user.NAME, user.LAST_NAME].filter(Boolean).join(' '))
                        control += ` (${escapeHtml(names.join(', '))})`
                    }
                } else if (['file', 'resourcebooking'].includes(field.type)) {
                    control = `Тип ${escapeHtml(field.type)} в примере не поддерживается`
                } else if (field.type === 'date') {
                    control = input({ ...params, VALUE: value ? String(value).slice(0, 10) : '', TYPE: 'date' })
                } else if (field.type === 'datetime') {
                    control = input({ ...params, VALUE: value ? String(value).slice(0, 19) : '', TYPE: 'datetime-local' })
                } else if (['boolean', 'char'].includes(field.type)) {
                    control = input({ ...params, REQUIRED: false, VALUE: 'Y', CHECKED: value === 'Y', TYPE: 'checkbox' })
                } else if (['integer', 'double'].includes(field.type)) {
                    control = input({ ...params, TYPE: 'number', STEP: field.type === 'double' ? 'any' : '' })
                } else if (field.type === 'money') {
                    const [amount, currency] = String(value).split('|')
                    control = input({ ...params, VALUE: amount, TYPE: 'number', STEP: 'any' })
                    control += select({ ...params, NAME: `form[${key}_CURRENCY]`, VALUE: currency },
                        Object.fromEntries(currencies.map((row) => [row.CURRENCY, row.FULL_NAME])))
                } else {
                    control = input({ ...params, TYPE: 'text' })
                }

                const label = escapeHtml(field.formLabel || field.title || key)
                const block = `<div class="col-4 mt-3">${label}: </div><div class="col-6 mt-3">${control}</div>`
                if (key.startsWith('UF_')) custom += block
                else standard += block
            }

            res.send(`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
                <div class="container"><form id="auto_form" method="post">
                    ${item.id ? `<input type="hidden" name="form[id]" value="${escapeHtml(item.id)}">` : ''}
                    <h2>Системные поля</h2><div class="row">${standard}</div>
                    <h2>Пользовательские поля</h2><div class="row">${custom}</div>
                    <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
                </form></div>
                <script>
                    document.getElementById('auto_form').addEventListener('submit', async (event) => {
                        event.preventDefault()
                        const body = new URLSearchParams(new FormData(event.currentTarget))
                        const response = await fetch('/form', { method: 'POST', body })
                        const json = await response.json()
                        alert(json.message || json.error)
                    })
                <\/script>
            `)
        } catch (error) {
            res.status(500).send(escapeHtml(error.message))
        }
    })

    app.post('/form', saveForm)
    app.listen(3000)
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from html import escape

    from flask import Flask, request
    from b24pysdk import BitrixWebhook, Client

    from save_form import save_form

    app = Flask(__name__)
    ENTITY_TYPE_ID = 1
    SKIPPED_FIELDS = {"contactId", "contacts"}
    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    ))


    def value_or_empty(value):
        return "" if value is None else value


    def input_field(params):
        value = params.get("VALUE")
        values = (
            [*(value if isinstance(value, list) else [value_or_empty(value)]), ""]
            if params.get("MULTIPLE") else [value_or_empty(value)]
        )
        html = ""
        for index, value in enumerate(values):
            html += f'<input class="form-control" name="{escape(params["NAME"])}{"[]" if params.get("MULTIPLE") else ""}"'
            html += f' type="{escape(params.get("TYPE", "text"))}"'
            if params.get("STEP"):
                html += f' step="{escape(params["STEP"])}"'
            if params.get("REQUIRED") and index == 0:
                html += " required"
            if params.get("DISABLE"):
                html += " disabled"
            if params.get("CHECKED"):
                html += " checked"
            html += f' value="{escape(str(value))}">'
        return html


    def select_field(params, options):
        html = f'<select class="form-control" name="{escape(params["NAME"])}{"[]" if params.get("MULTIPLE") else ""}"'
        if params.get("REQUIRED"):
            html += " required"
        if params.get("DISABLE"):
            html += " disabled"
        if params.get("MULTIPLE"):
            html += " multiple"
        html += ">"
        if not params.get("REQUIRED") and not params.get("MULTIPLE"):
            html += '<option value="">-- Не выбрано --</option>'
        value = params.get("VALUE")
        selected_values = value if isinstance(value, list) else [value_or_empty(value)]
        selected_values = [str(value) for value in selected_values]
        for key, title in options.items():
            selected = " selected" if str(key) in selected_values else ""
            html += f'<option value="{escape(str(key))}"{selected}>{escape(str(title))}</option>'
        return html + "</select>"


    def multifields(values):
        rows = list(values) if isinstance(values, list) else []
        rows.extend({"id": "", "typeId": "PHONE", "valueType": "WORK", "value": ""} for _ in range(3))
        html = ""
        for index, row in enumerate(rows):
            options = "".join(
                f'<option value="{field_type}"{" selected" if row.get("typeId") == field_type else ""}>{field_type}</option>'
                for field_type in ("PHONE", "EMAIL", "WEB", "IM")
            )
            item_id = row.get("id") or ""
            delete = (
                f'<label><input type="checkbox" name="fm[{index}][delete]" value="Y"> Удалить</label>'
                if item_id else ""
            )
            html += f"""<div class="border rounded p-2 mb-2">
                <input type="hidden" name="fm[{index}][id]" value="{escape(str(item_id))}">
                <select class="form-control mb-1" name="fm[{index}][typeId]">{options}</select>
                <input class="form-control mb-1" name="fm[{index}][valueType]" value="{escape(row.get('valueType') or 'WORK')}" placeholder="WORK">
                <input class="form-control mb-1" name="fm[{index}][value]" value="{escape(row.get('value') or '')}" placeholder="Значение">
                {delete}
            </div>"""
        return html


    PAGE = """
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container"><form id="auto_form" method="post">
            %(hidden_id)s
            <h2>Системные поля</h2><div class="row">%(standard)s</div>
            <h2>Пользовательские поля</h2><div class="row">%(custom)s</div>
            <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
        </form></div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const body = new URLSearchParams(new FormData(event.currentTarget));
                const response = await fetch('/form', { method: 'POST', body });
                const json = await response.json();
                alert(json.message || json.error);
            });
        </script>
    """


    @app.route("/")
    def form_page():
        raw_id = request.args.get("ID", "0")
        try:
            item_id = int(raw_id)
        except ValueError:
            return "Параметр ID должен быть целым числом", 400

        fields = client.crm.item.fields(
            entity_type_id=ENTITY_TYPE_ID,
            use_original_uf_names=True,
        ).response.result["fields"]
        currencies = client.crm.currency.list().response.result
        item = {}
        if item_id > 0:
            item = client.crm.item.get(
                entity_type_id=ENTITY_TYPE_ID,
                bitrix_id=item_id,
                use_original_uf_names=True,
            ).response.result["item"]

        standard = ""
        custom = ""
        for key, field in fields.items():
            if key in SKIPPED_FIELDS:
                continue
            value = value_or_empty(item.get(key))
            params = {
                "NAME": f"form[{key}]", "VALUE": value,
                "REQUIRED": field.get("isRequired"), "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"),
            }
            field_type = field.get("type")
            control = ""

            if field_type == "crm_status":
                rows = client.crm.status.list(filter={"ENTITY_ID": field["statusType"]}).response.result
                control = select_field(params, {row["STATUS_ID"]: row["NAME"] for row in rows})
            elif field_type == "crm_currency":
                control = select_field(params, {row["CURRENCY"]: row["FULL_NAME"] for row in currencies})
            elif field_type == "enumeration":
                options = {
                    row.get("ID", row.get("id")): row.get("VALUE", row.get("value"))
                    for row in field.get("items", [])
                }
                control = select_field(params, options)
            elif field_type == "crm_multifield":
                control = multifields(value)
            elif field_type == "crm_company":
                control = input_field({**params, "TYPE": "number"})
                if value:
                    company = client.crm.item.get(entity_type_id=4, bitrix_id=int(value)).response.result["item"]
                    control += f" ({escape(company['title'])})"
            elif field_type == "crm_contact":
                control = input_field({**params, "TYPE": "number"})
                ids = [int(contact_id) for contact_id in (value if isinstance(value, list) else [value]) if contact_id]
                if ids:
                    contacts = client.crm.item.list(
                        entity_type_id=3,
                        filter={"@id": ids},
                        select=["id", "name", "lastName"],
                    ).response.result["items"]
                    names = [" ".join(filter(None, [row.get("name"), row.get("lastName")])) for row in contacts]
                    control += f" ({escape(', '.join(names))})"
            elif field_type == "user":
                control = input_field({**params, "TYPE": "number"})
                if value:
                    users = client.user.get(filter={"ID": value}).response.result
                    names = [" ".join(filter(None, [row.get("NAME"), row.get("LAST_NAME")])) for row in users]
                    control += f" ({escape(', '.join(names))})"
            elif field_type in ("file", "resourcebooking"):
                control = f"Тип {escape(field_type)} в примере не поддерживается"
            elif field_type == "date":
                control = input_field({**params, "VALUE": str(value)[:10] if value else "", "TYPE": "date"})
            elif field_type == "datetime":
                control = input_field({**params, "VALUE": str(value)[:19] if value else "", "TYPE": "datetime-local"})
            elif field_type in ("boolean", "char"):
                control = input_field({**params, "REQUIRED": False, "VALUE": "Y", "CHECKED": value == "Y", "TYPE": "checkbox"})
            elif field_type in ("integer", "double"):
                control = input_field({**params, "TYPE": "number", "STEP": "any" if field_type == "double" else ""})
            elif field_type == "money":
                amount, _, currency = str(value).partition("|")
                control = input_field({**params, "VALUE": amount, "TYPE": "number", "STEP": "any"})
                control += select_field(
                    {**params, "NAME": f"form[{key}_CURRENCY]", "VALUE": currency},
                    {row["CURRENCY"]: row["FULL_NAME"] for row in currencies},
                )
            else:
                control = input_field({**params, "TYPE": "text"})

            label = escape(str(field.get("formLabel") or field.get("title") or key))
            block = f'<div class="col-4 mt-3">{label}: </div><div class="col-6 mt-3">{control}</div>'
            if key.startswith("UF_"):
                custom += block
            else:
                standard += block

        hidden_id = f'<input type="hidden" name="form[id]" value="{escape(str(item["id"]))}">' if item.get("id") else ""
        return PAGE % {"hidden_id": hidden_id, "standard": standard, "custom": custom}


    app.add_url_rule("/form", view_func=save_form, methods=["POST"])

    if __name__ == "__main__":
        app.run(port=5000)
    ```


- PHP

    ```php
    <?php
        // composer require bitrix24/b24phpsdk:"^3.0"
        require_once 'vendor/autoload.php';

        use Bitrix24\SDK\Services\ServiceBuilderFactory;
        use Symfony\Component\EventDispatcher\EventDispatcher;
        use Psr\Log\NullLogger;

        $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
            ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');
        $crm = $sb->getCRMScope();

        const ENTITY_TYPE_ID = 1;
        $ID = (int)($_REQUEST['ID'] ?? 0);

        function callCore($sb, string $method, array $params): array
        {
            return $sb->core->call($method, $params)->getResponseData()->getResult();
        }

        function esc($value): string
        {
            return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        }

        function inputField(array $params): string
        {
            $values = !empty($params['MULTIPLE'])
                ? array_merge((array)($params['VALUE'] ?? []), [''])
                : [$params['VALUE'] ?? ''];
            $html = '';
            foreach ($values as $index => $value)
            {
                $html .= '<input class="form-control" name="' . esc($params['NAME']) . (!empty($params['MULTIPLE']) ? '[]' : '') . '"';
                $html .= ' type="' . esc($params['TYPE'] ?? 'text') . '"';
                $html .= !empty($params['STEP']) ? ' step="' . esc($params['STEP']) . '"' : '';
                $html .= !empty($params['REQUIRED']) && $index === 0 ? ' required' : '';
                $html .= !empty($params['DISABLE']) ? ' disabled' : '';
                $html .= !empty($params['CHECKED']) ? ' checked' : '';
                $html .= ' value="' . esc($value) . '">';
            }
            return $html;
        }

        function selectField(array $params, array $options): string
        {
            $html = '<select class="form-control" name="' . esc($params['NAME']) . (!empty($params['MULTIPLE']) ? '[]' : '') . '"';
            $html .= !empty($params['REQUIRED']) ? ' required' : '';
            $html .= !empty($params['DISABLE']) ? ' disabled' : '';
            $html .= !empty($params['MULTIPLE']) ? ' multiple' : '';
            $html .= '>';
            if (empty($params['REQUIRED']) && empty($params['MULTIPLE']))
            {
                $html .= '<option value="">-- Не выбрано --</option>';
            }
            $selectedValues = array_map('strval', (array)($params['VALUE'] ?? []));
            foreach ($options as $key => $title)
            {
                $selected = in_array((string)$key, $selectedValues, true) ? ' selected' : '';
                $html .= '<option value="' . esc($key) . '"' . $selected . '>' . esc($title) . '</option>';
            }
            return $html . '</select>';
        }

        function multifields($values): string
        {
            $rows = is_array($values) ? $values : [];
            for ($i = 0; $i < 3; $i++)
            {
                $rows[] = ['id' => '', 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => ''];
            }
            $html = '';
            foreach ($rows as $index => $row)
            {
                $options = '';
                foreach (['PHONE', 'EMAIL', 'WEB', 'IM'] as $type)
                {
                    $selected = ($row['typeId'] ?? '') === $type ? ' selected' : '';
                    $options .= '<option value="' . $type . '"' . $selected . '>' . $type . '</option>';
                }
                $id = $row['id'] ?? '';
                $html .= '<div class="border rounded p-2 mb-2">';
                $html .= '<input type="hidden" name="fm[' . $index . '][id]" value="' . esc($id) . '">';
                $html .= '<select class="form-control mb-1" name="fm[' . $index . '][typeId]">' . $options . '</select>';
                $html .= '<input class="form-control mb-1" name="fm[' . $index . '][valueType]" value="' . esc($row['valueType'] ?? 'WORK') . '" placeholder="WORK">';
                $html .= '<input class="form-control mb-1" name="fm[' . $index . '][value]" value="' . esc($row['value'] ?? '') . '" placeholder="Значение">';
                if ($id)
                {
                    $html .= '<label><input type="checkbox" name="fm[' . $index . '][delete]" value="Y"> Удалить</label>';
                }
                $html .= '</div>';
            }
            return $html;
        }

        $fieldResult = callCore($sb, 'crm.item.fields', [
            'entityTypeId' => ENTITY_TYPE_ID,
            'useOriginalUfNames' => 'Y',
        ]);
        $fields = $fieldResult['fields'];
        $currencies = [];
        foreach ($crm->currency()->list([])->getCurrencies() as $currency)
        {
            $currencies[$currency->CURRENCY->getCode()] = $currency->FULL_NAME;
        }
        $item = [];
        if ($ID > 0)
        {
            $item = callCore($sb, 'crm.item.get', [
                'entityTypeId' => ENTITY_TYPE_ID,
                'id' => $ID,
                'useOriginalUfNames' => 'Y',
            ])['item'];
        }

        $standard = '';
        $custom = '';
        foreach ($fields as $key => $field)
        {
            if (in_array($key, ['contactId', 'contacts'], true)) continue;
            $value = $item[$key] ?? '';
            $params = [
                'NAME' => 'form[' . $key . ']', 'VALUE' => $value,
                'REQUIRED' => $field['isRequired'], 'DISABLE' => $field['isReadOnly'], 'MULTIPLE' => $field['isMultiple'],
            ];
            $control = '';

            if ($field['type'] === 'crm_status')
            {
                $options = [];
                foreach ($crm->status()->list([], ['ENTITY_ID' => $field['statusType']], [])->getStatuses() as $status)
                {
                    $options[$status->STATUS_ID] = $status->NAME;
                }
                $control = selectField($params, $options);
            }
            elseif ($field['type'] === 'crm_currency')
            {
                $control = selectField($params, $currencies);
            }
            elseif ($field['type'] === 'enumeration')
            {
                $options = [];
                foreach ($field['items'] ?? [] as $row)
                {
                    $options[$row['ID'] ?? $row['id']] = $row['VALUE'] ?? $row['value'];
                }
                $control = selectField($params, $options);
            }
            elseif ($field['type'] === 'crm_multifield')
            {
                $control = multifields($value);
            }
            elseif ($field['type'] === 'crm_company')
            {
                $control = inputField(['TYPE' => 'number'] + $params);
                if ($value)
                {
                    $company = $crm->item()->get(4, (int)$value)->item();
                    $control .= ' (' . esc($company->title) . ')';
                }
            }
            elseif ($field['type'] === 'crm_contact')
            {
                $control = inputField(['TYPE' => 'number'] + $params);
                $ids = array_values(array_filter(array_map('intval', (array)$value)));
                if ($ids)
                {
                    $names = [];
                    foreach ($crm->item()->list(3, [], ['@id' => $ids], ['id', 'name', 'lastName'], 0)->getItems() as $contact)
                    {
                        $names[] = trim($contact->name . ' ' . $contact->lastName);
                    }
                    $control .= ' (' . esc(implode(', ', $names)) . ')';
                }
            }
            elseif ($field['type'] === 'user')
            {
                $control = inputField(['TYPE' => 'number'] + $params);
                if ($value)
                {
                    $names = [];
                    foreach ($sb->getUserScope()->user()->get([], ['ID' => $value], true)->getUsers() as $user)
                    {
                        $names[] = trim($user->NAME . ' ' . $user->LAST_NAME);
                    }
                    $control .= ' (' . esc(implode(', ', $names)) . ')';
                }
            }
            elseif (in_array($field['type'], ['file', 'resourcebooking'], true))
            {
                $control = 'Тип ' . esc($field['type']) . ' в примере не поддерживается';
            }
            elseif ($field['type'] === 'date')
            {
                $formatted = $value ? substr((string)$value, 0, 10) : '';
                $control = inputField(['TYPE' => 'date', 'VALUE' => $formatted] + $params);
            }
            elseif ($field['type'] === 'datetime')
            {
                $formatted = $value
                    ? (new DateTimeImmutable((string)$value))->format('Y-m-d\TH:i:s')
                    : '';
                $control = inputField(['TYPE' => 'datetime-local', 'VALUE' => $formatted] + $params);
            }
            elseif (in_array($field['type'], ['boolean', 'char'], true))
            {
                $control = inputField(['TYPE' => 'checkbox', 'VALUE' => 'Y', 'CHECKED' => $value === 'Y', 'REQUIRED' => false] + $params);
            }
            elseif (in_array($field['type'], ['integer', 'double'], true))
            {
                $control = inputField(['TYPE' => 'number', 'STEP' => $field['type'] === 'double' ? 'any' : ''] + $params);
            }
            elseif ($field['type'] === 'money')
            {
                [$amount, $currency] = array_pad(explode('|', (string)$value, 2), 2, '');
                $control = inputField(['TYPE' => 'number', 'STEP' => 'any', 'VALUE' => $amount] + $params);
                $control .= selectField(['NAME' => 'form[' . $key . '_CURRENCY]', 'VALUE' => $currency] + $params, $currencies);
            }
            else
            {
                $control = inputField($params + ['TYPE' => 'text']);
            }

            $label = esc($field['formLabel'] ?? $field['title'] ?? $key);
            $block = '<div class="col-4 mt-3">' . $label . ': </div><div class="col-6 mt-3">' . $control . '</div>';
            if (str_starts_with($key, 'UF_')) $custom .= $block;
            else $standard .= $block;
        }
    ?>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container">
            <form id="auto_form" method="post">
                <?php if (!empty($item['id'])): ?>
                    <input type="hidden" name="form[id]" value="<?= esc($item['id']) ?>">
                <?php endif; ?>
                <h2>Системные поля</h2><div class="row"><?= $standard ?></div>
                <h2>Пользовательские поля</h2><div class="row"><?= $custom ?></div>
                <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
            </form>
        </div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const body = new URLSearchParams(new FormData(event.currentTarget));
                const response = await fetch('auto_form.php', { method: 'POST', body });
                const json = await response.json();
                alert(json.message || json.error);
            });
        </script>
    ```
{% endlist %}

## 3. Сохраним данные формы

Обработчик повторно вызывает [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md). Он передает только известные поля, пропускает поля только для чтения и не отправляет неподдерживаемые типы `file` и `resourcebooking`.

Браузер не отправляет снятый флажок. Поэтому обработчик передает `Y` для установленного поля `boolean` или `char` и `N` для снятого. Для множественных полей обработчик собирает массив, для поля `money` соединяет сумму и валюту через `|`, для `companyId` передает один числовой идентификатор, для `contactIds` — массив числовых идентификаторов.

Если доступного для изменения поля нет в отправленной форме, обработчик передает пустое значение: одиночному полю — пустую строку, множественному, в том числе пользовательскому полю типа «список», — пустой массив. Поэтому не удаляйте поле из HTML-формы без соответствующей правки обработчика.

Каждая строка `fm` содержит `id`, `typeId`, `valueType`, `value`:

- существующая непустая строка сохраняет числовой `id` и обновляет запись
- новая непустая строка получает ключ `n0`, `n1` и добавляет запись
- существующая очищенная строка сохраняет `id`, но передает пустой `value` и удаляет запись
- новая пустая строка не передается

Например, объект `fm` перед обновлением может выглядеть так:

```json
{
    "451": { "typeId": "PHONE", "valueType": "WORK", "value": "+7 495 111-22-33" },
    "452": { "typeId": "EMAIL", "valueType": "WORK", "value": "" },
    "n0": { "typeId": "EMAIL", "valueType": "WORK", "value": "lead@example.com" }
}
```

Запись `451` будет обновлена, `452` — удалена, `n0` — добавлена.

Если форма содержит `id`, обработчик вызывает [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md). Без `id` он вызывает [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В обоих случаях идентификатор сохраненного лида находится в `result.item.id`:

```json
{
    "result": {
        "item": {
            "id": 123,
            "title": "Заявка с сайта",
            "stageId": "NEW",
            "sourceId": "WEB",
            "companyId": 27,
            "contactIds": [31, 44],
            "opportunity": 15000,
            "currencyId": "RUB",
            "isManualOpportunity": "Y"
        }
    }
}
```

Следующему действию нужен `result.item.id`: добавьте его в параметр `ID` адреса формы, чтобы открыть созданный лид для редактирования.

### Полный код обработчика

Сохраните обработчик в файл: JavaScript — `save-form.mjs`, PHP — `auto_form.php`, Python — `save_form.py`.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const ENTITY_TYPE_ID = 1
    const SKIPPED_FIELDS = new Set(['contactId', 'contacts'])
    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })
        if (!response.isSuccess) throw new Error(response.getErrorMessages().join('; '))
        return response.getData().result
    }

    function asArray(value) {
        if (Array.isArray(value)) return value
        return value === undefined || value === null ? [] : [value]
    }

    function buildMultifields(rows) {
        const result = {}
        let newIndex = 0
        for (const row of Object.values(rows ?? {})) {
            const id = parseInt(String(row.id ?? '0'), 10) || 0
            const value = String(row.value ?? '')
            const shouldDelete = row.delete === 'Y' || value === ''
            if (!id && shouldDelete) continue
            const key = id ? String(id) : `n${newIndex++}`
            result[key] = {
                typeId: String(row.typeId || 'PHONE'),
                valueType: String(row.valueType || 'WORK'),
                value: shouldDelete ? '' : value,
            }
        }
        return result
    }

    export async function saveForm(req, res) {
        try {
            const submitted = req.body.form ?? {}
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'lead-fields-save')
            const fields = {}

            for (const [key, prop] of Object.entries(fieldResult.fields)) {
                if (SKIPPED_FIELDS.has(key) || prop.isReadOnly || ['file', 'resourcebooking'].includes(prop.type)) continue
                if (['boolean', 'char'].includes(prop.type)) {
                    fields[key] = key in submitted ? 'Y' : 'N'
                    continue
                }
                if (prop.type === 'crm_multifield') {
                    fields[key] = buildMultifields(req.body.fm)
                    continue
                }
                if (!(key in submitted)) {
                    fields[key] = prop.isMultiple ? [] : ''
                    continue
                }

                let value = submitted[key]
                if (prop.type === 'money') {
                    value = `${value ?? ''}|${submitted[`${key}_CURRENCY`] ?? ''}`
                } else if (prop.type === 'crm_company') {
                    value = Number(value) || 0
                } else if (prop.type === 'crm_contact') {
                    value = asArray(value).map(Number).filter((itemId) => itemId > 0)
                } else if (prop.isMultiple) {
                    value = asArray(value).filter((item) => item !== '')
                }
                fields[key] = value
            }

            const id = parseInt(String(submitted.id ?? '0'), 10) || 0
            const method = id > 0 ? 'crm.item.update' : 'crm.item.add'
            const params = { entityTypeId: ENTITY_TYPE_ID, fields, useOriginalUfNames: 'Y' }
            if (id > 0) params.id = id
            const result = await call(method, params, `lead-${id > 0 ? 'update' : 'add'}`)
            res.json({ message: `Лид сохранен, ID: ${result.item.id}` })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import re

    from flask import jsonify, request
    from b24pysdk import BitrixWebhook, Client

    ENTITY_TYPE_ID = 1
    SKIPPED_FIELDS = {"contactId", "contacts"}
    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    ))


    def values_for(name):
        return request.form.getlist(name) or request.form.getlist(f"{name}[]")


    def build_multifields():
        rows = {}
        pattern = re.compile(r"^fm\[(\d+)]\[(id|typeId|valueType|value|delete)]$")
        for full_key in request.form:
            match = pattern.match(full_key)
            if match:
                rows.setdefault(match.group(1), {})[match.group(2)] = request.form[full_key]

        result = {}
        new_index = 0
        for row in rows.values():
            item_id = int(row.get("id") or 0)
            value = row.get("value", "")
            should_delete = row.get("delete") == "Y" or value == ""
            if not item_id and should_delete:
                continue
            key = str(item_id) if item_id else f"n{new_index}"
            if not item_id:
                new_index += 1
            result[key] = {
                "typeId": row.get("typeId") or "PHONE",
                "valueType": row.get("valueType") or "WORK",
                "value": "" if should_delete else value,
            }
        return result


    def save_form():
        try:
            submitted = {}
            for full_key in request.form:
                match = re.match(r"^form\[([^]]+)](\[\])?$", full_key)
                if match:
                    submitted[match.group(1)] = values_for(full_key) if match.group(2) else request.form[full_key]

            field_result = client.crm.item.fields(
                entity_type_id=ENTITY_TYPE_ID,
                use_original_uf_names=True,
            ).response.result
            fields = {}
            for key, prop in field_result["fields"].items():
                if key in SKIPPED_FIELDS or prop.get("isReadOnly") or prop.get("type") in ("file", "resourcebooking"):
                    continue
                field_type = prop.get("type")
                if field_type in ("boolean", "char"):
                    fields[key] = "Y" if key in submitted else "N"
                    continue
                if field_type == "crm_multifield":
                    fields[key] = build_multifields()
                    continue
                if key not in submitted:
                    fields[key] = [] if prop.get("isMultiple") else ""
                    continue

                value = submitted[key]
                if field_type == "money":
                    value = f"{value}|{submitted.get(f'{key}_CURRENCY', '')}"
                elif field_type == "crm_company":
                    value = int(value or 0)
                elif field_type == "crm_contact":
                    value = [int(item_id) for item_id in (value if isinstance(value, list) else [value]) if item_id]
                elif prop.get("isMultiple"):
                    value = [item for item in (value if isinstance(value, list) else [value]) if item != ""]
                fields[key] = value

            item_id = int(submitted.get("id") or 0)
            if item_id > 0:
                result = client.crm.item.update(
                    entity_type_id=ENTITY_TYPE_ID,
                    bitrix_id=item_id,
                    fields=fields,
                    use_original_uf_names=True,
                ).response.result
            else:
                result = client.crm.item.add(
                    entity_type_id=ENTITY_TYPE_ID,
                    fields=fields,
                    use_original_uf_names=True,
                ).response.result
            return jsonify(message=f"Лид сохранен, ID: {result['item']['id']}")
        except Exception as error:
            return jsonify(error=str(error)), 400
    ```


- PHP

    ```php
    <?php
        // composer require bitrix24/b24phpsdk:"^3.0"
        require_once 'vendor/autoload.php';

        use Bitrix24\SDK\Services\ServiceBuilderFactory;
        use Symfony\Component\EventDispatcher\EventDispatcher;
        use Psr\Log\NullLogger;

        $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
            ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');
        const ENTITY_TYPE_ID = 1;
        header('Content-Type: application/json; charset=utf-8');

        function callCore($sb, string $method, array $params): array
        {
            return $sb->core->call($method, $params)->getResponseData()->getResult();
        }

        function buildMultifields(array $rows): array
        {
            $result = [];
            $newIndex = 0;
            foreach ($rows as $row)
            {
                $id = (int)($row['id'] ?? 0);
                $value = (string)($row['value'] ?? '');
                $shouldDelete = ($row['delete'] ?? '') === 'Y' || $value === '';
                if ($id <= 0 && $shouldDelete) continue;
                $key = $id > 0 ? (string)$id : 'n' . $newIndex++;
                $result[$key] = [
                    'typeId' => (string)($row['typeId'] ?? 'PHONE'),
                    'valueType' => (string)($row['valueType'] ?? 'WORK'),
                    'value' => $shouldDelete ? '' : $value,
                ];
            }
            return $result;
        }

        try
        {
            $submitted = is_array($_POST['form'] ?? null) ? $_POST['form'] : [];
            $fieldResult = callCore($sb, 'crm.item.fields', [
                'entityTypeId' => ENTITY_TYPE_ID,
                'useOriginalUfNames' => 'Y',
            ]);
            $fields = [];
            foreach ($fieldResult['fields'] as $key => $prop)
            {
                if (in_array($key, ['contactId', 'contacts'], true)
                    || !empty($prop['isReadOnly'])
                    || in_array($prop['type'], ['file', 'resourcebooking'], true))
                {
                    continue;
                }
                if (in_array($prop['type'], ['boolean', 'char'], true))
                {
                    $fields[$key] = array_key_exists($key, $submitted) ? 'Y' : 'N';
                    continue;
                }
                if ($prop['type'] === 'crm_multifield')
                {
                    $fields[$key] = buildMultifields(is_array($_POST['fm'] ?? null) ? $_POST['fm'] : []);
                    continue;
                }
                if (!array_key_exists($key, $submitted))
                {
                    $fields[$key] = !empty($prop['isMultiple']) ? [] : '';
                    continue;
                }

                $value = $submitted[$key];
                if ($prop['type'] === 'money')
                {
                    $value = (string)$value . '|' . (string)($submitted[$key . '_CURRENCY'] ?? '');
                }
                elseif ($prop['type'] === 'crm_company')
                {
                    $value = (int)$value;
                }
                elseif ($prop['type'] === 'crm_contact')
                {
                    $value = array_values(array_filter(array_map('intval', (array)$value)));
                }
                elseif (!empty($prop['isMultiple']))
                {
                    $value = array_values(array_filter((array)$value, static fn($item) => $item !== ''));
                }
                $fields[$key] = $value;
            }

            $id = (int)($submitted['id'] ?? 0);
            $method = $id > 0 ? 'crm.item.update' : 'crm.item.add';
            $params = [
                'entityTypeId' => ENTITY_TYPE_ID,
                'fields' => $fields,
                'useOriginalUfNames' => 'Y',
            ];
            if ($id > 0) $params['id'] = $id;
            $result = callCore($sb, $method, $params);
            echo json_encode(['message' => 'Лид сохранен, ID: ' . $result['item']['id']], JSON_UNESCAPED_UNICODE);
        }
        catch (Throwable $error)
        {
            http_response_code(400);
            echo json_encode(['error' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    ```
{% endlist %}

## Проверим результат

1. Откройте страницу формы без параметра `ID`
2. Заполните название лида, стадию, источник, сумму и валюту. Установите флажок ручного расчета суммы. При необходимости укажите идентификатор компании, несколько идентификаторов контактов, телефон и адрес почты
3. Нажмите **Сохранить**. В сообщении скопируйте идентификатор созданного лида, например `123`
4. Откройте форму с этим идентификатором: JavaScript — `http://localhost:3000/?ID=123`, PHP — `http://localhost:8000/index.php?ID=123`, Python — `http://localhost:5000/?ID=123`
5. Проверьте, что форма содержит сохраненные значения, включая компанию, все контакты и строки `fm`
6. Измените название, сумму или источник, затем снова нажмите **Сохранить**
7. Откройте карточку лида в Битрикс24 и проверьте измененные поля
8. Вызовите [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с `entityTypeId = 1` и полученным `id`. Убедитесь, что `result.item` содержит сохраненные `title`, `stageId`, `sourceId`, `companyId`, `contactIds`, `opportunity`, `currencyId`, `isManualOpportunity` и `fm`

## Ошибки и диагностика

#|
|| Признак | Что проверить и исправить ||
|| Первый запрос к Битрикс24 завершается ошибкой авторизации | Проверьте полный адрес вебхука, идентификатор пользователя и секретный токен. Убедитесь, что в Python `domain` не содержит `https://`, а `webhook_token` содержит только `USER_ID/TOKEN`. После исправления перезагрузите страницу формы ||
|| `ACCESS_DENIED` | Выдайте пользователю вебхука права на чтение, добавление и изменение лидов и чтение связанных компаний и контактов, а также доступ к настройкам CRM. После исправления перезагрузите страницу формы ||
|| [user.get](../../../api-reference/user/user-get.md) возвращает ошибку доступа | Добавьте вебхуку scope [`user_brief`](../../../api-reference/scopes/permissions.md), затем перезагрузите страницу формы ||
|| [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает `NOT_FOUND` | Проверьте, что лид с таким идентификатором существует и доступен пользователю вебхука. После исправления откройте форму с корректным `ID` ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Проверьте значение поля, названного в `error_description`: код стадии или источника, валюту, идентификатор компании, контакта или пользователя. Исправьте значение и повторно отправьте форму ||
|| Ошибка о множественном поле | Передавайте `contactIds` и другие множественные поля массивом. Для существующих значений `fm` сохраняйте числовой `id`, для новых используйте ключи `n0`, `n1`. Исправьте данные и повторно отправьте форму ||
|| После снятия всех значений множественного пользовательского поля типа «список» прежние значения остались | Обработчик отправляет пустой массив, запрос [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) проходит успешно, но [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает прежние значения. Способ очистки в примере не реализован ||
|| После отправки обязательного поля лид не сохраняется | Проверьте `isRequired` в ответе [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), заполните поле и повторно отправьте форму ||
|| Пустое название лида не сохранилось | Поле `title` нельзя очистить. При обновлении остается прежнее название, при добавлении Битрикс24 формирует название по умолчанию. Чтобы изменить название, введите непустое значение и повторно отправьте форму ||
|| PHP не запускается после установки зависимостей | Выполните `composer check-platform-reqs`, включите расширения `bcmath`, `curl`, `intl`, `json` и перезапустите PHP-сервер ||
|| Порт уже занят | Остановите процесс на порту или запустите сервер на другом порту и измените адрес проверки ||
|#

## Что важно учитывать

- пример выводит все доступные поля, поэтому большая форма может быть неудобной для реального приложения
- загрузка файлов требует отдельной реализации

  Чтобы загрузить файл через [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) или [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md), передайте в поле [массив из имени файла и содержимого в Base64](../../../api-reference/files/how-to-upload-files.md#array), например `["document.pdf", "Base64"]`. Для множественного поля передайте массив таких пар. [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает уже загруженный файл как объект с ключами `id` и `url`: для чтения файла используйте `url`
- неизвестные генератору типы выводятся как текстовые поля; перед использованием в рабочем приложении добавьте обработку их формата
- множественное пользовательское поле типа `money` требует отдельной реализации нескольких пар «сумма — валюта»
- если снять все значения множественного пользовательского поля типа «список», обработчик отправит пустой массив. Запрос [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) пройдет успешно, но [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернет прежние значения
- [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) возвращает данные постранично. В примере загружается только первая страница. Если у лида больше 50 связанных контактов, подписи будут неполными. Для рабочего приложения разбивайте `contactIds` на группы до 50 идентификаторов и объединяйте результаты. Тот же лимит действует для множественных полей типа `user`. В примере из [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) также загружается только первая страница — не более 50 записей. Если справочник содержит больше значений, варианты в форме будут неполными
- пример не проверяет формат телефона, адреса почты, дат и других значений в браузере сверх возможностей стандартных HTML-полей

{% note warning "Не публикуйте пример без собственной аутентификации" %}

Страница формы позволяет выполнять действия от имени пользователя вебхука. Перед размещением в интернете добавьте собственную аутентификацию, проверку прав пользователя, защиту от CSRF и безопасное журналирование ошибок.

{% endnote %}
