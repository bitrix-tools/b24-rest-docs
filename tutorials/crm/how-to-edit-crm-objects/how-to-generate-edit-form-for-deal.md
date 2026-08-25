# Как сделать свою карточку редактирования сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md), [`user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнить сценарий: пользователь с правом читать, добавлять и изменять сделки, читать связанные компании и контакты, а также с доступом к настройкам CRM. Scope `user_brief` нужен для вызова [user.get](../../../api-reference/user/user-get.md)
>
> Методы [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) и [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) доступны любому пользователю. Список воронок фильтруется по правам на чтение

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В примере создадим веб-форму для добавления и редактирования сделки. Форма не содержит заранее заданного списка полей: генератор получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и подбирает элемент HTML-формы по типу каждого поля. Поэтому пользовательские поля, созданные в Битрикс24, появляются в форме без изменения кода.

Если открыть страницу без параметра `ID`, обработчик создаст сделку. Если передать идентификатор, например `?ID=342`, генератор загрузит сделку методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), заполнит форму, а обработчик обновит эту сделку.

Пример состоит из двух файлов:

- генератор получает описание полей, данные сделки, воронки, стадии и значения справочников, затем выводит HTML-форму
- обработчик принимает данные формы и вызывает метод добавления или обновления

В универсальных методах идентификатор типа сделки `entityTypeId` равен `2`. Это значение приведено в таблице [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type).

## Как работает сценарий

1. [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) возвращает описание полей в `result.fields`
2. Если в адресе есть `ID`, [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает значения сделки в `result.item`
3. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) возвращает доступные пользователю воронки в `result.categories`
4. Генератор определяет воронку: для существующей сделки берет `categoryId` из `result.item`, для новой — воронку с `isDefault = Y`
5. Для каждой воронки генератор получает стадии методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md). Для общей воронки он передает `ENTITY_ID = DEAL_STAGE`, для остальных — `ENTITY_ID = DEAL_STAGE_{categoryId}`
6. Генератор подставляет читаемые названия вместо служебных кодов с помощью дополнительных методов
   - [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — поля `STATUS_ID` и `NAME` для типа сделки, стадий, источников и других CRM-справочников
   - [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) — поля `CURRENCY` и `FULL_NAME` для валют
   - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — поле `title` связанной компании
   - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — поля `id`, `name`, `lastName` связанных контактов
   - [user.get](../../../api-reference/user/user-get.md) — поля `ID`, `NAME`, `LAST_NAME` пользователей
7. Обработчик повторно получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и приводит значения формы к типам REST API
8. Для новой записи [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает созданную сделку в `result.item`. Для существующей записи [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) возвращает обновленную сделку в том же ключе

### Как связаны воронка и стадия

Описание `stageId` из [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) содержит `statusType = DEAL_STAGE`. Это значение относится к общей воронке и не меняется в зависимости от открытой сделки. Поэтому нельзя всегда передавать `stageId.statusType` в [crm.status.list](../../../api-reference/crm/status/crm-status-list.md): для сделки из другой воронки метод вернет неподходящий список.

Генератор формирует `ENTITY_ID` по `categoryId`. Для `categoryId = 0` он использует `DEAL_STAGE`, для положительного идентификатора — `DEAL_STAGE_{categoryId}`. При выборе другой воронки скрипт в браузере заменяет варианты поля стадии и требует выбрать стадию из нового списка.

При сохранении сервер проверяет, относится ли `stageId` к выбранной воронке. Если при переносе передана стадия из другой воронки, встроенная обработка подбирает в новой воронке первую стадию с той же семантикой — в работе, успешная или провальная. Форма не полагается на эту замену: после смены воронки пользователь явно выбирает стадию.

## 1. Подготовим окружение

Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#incoming-webhook) с правами `crm` и `user_brief`.

{% note warning "Храните вебхук в секрете" %}

Вебхук выполняет запросы с правами пользователя, который его создал. Не добавляйте адрес вебхука в публичный репозиторий, клиентский JavaScript и сообщения об ошибках.

{% endnote %}

Выберите один язык, создайте для примера отдельную папку и откройте в ней терминал. Сначала сохраните код из шагов 2 и 3, затем выполните команду запуска. Не закрывайте окно терминала, пока работаете с формой.

Создайте два файла:

#|
|| Язык | Генератор формы | Обработчик ||
|| JavaScript | `form.mjs` | `save-form.mjs` ||
|| PHP | `index.php` | `auto_form.php` ||
|| Python | `app.py` | `save_form.py` ||
|#

Для варианта на PHP заранее установите PHP 8.4 или 8.5 и Composer. Команды `php` и `composer` должны быть доступны в командной строке.

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

Перед установкой зависимостей проверьте версии Node.js, PHP и Python командами `node --version`, `php -v` и `python --version`, а список расширений PHP — командой `php -m`. `@bitrix24/b24jssdk` поддерживает Node.js 18, 20, 22 и новее. B24PhpSDK версии 3 также требует расширения `bcmath`, `curl`, `intl` и `json`. `b24pysdk` требует Python 3.9 или новее. После установки выполните `composer check-platform-reqs`.

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
|| Язык | Новая сделка | Сделка с идентификатором `342` ||
|| JavaScript | `http://localhost:3000/` | `http://localhost:3000/?ID=342` ||
|| PHP | `http://localhost:8000/index.php` | `http://localhost:8000/index.php?ID=342` ||
|| Python | `http://localhost:5000/` | `http://localhost:5000/?ID=342` ||
|#

## 2. Создадим форму сделки

Генератор передает в [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) два параметра:

- `entityTypeId: 2` — идентификатор типа объекта «сделка» из таблицы [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type)
- `useOriginalUfNames: Y` — вернуть оригинальные имена пользовательских полей `UF_*`

В Python SDK параметр `useOriginalUfNames` называется `use_original_uf_names` и принимает логическое значение `True`.

Сокращенный ответ [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) для сделки выглядит так:

```json
{
    "result": {
        "fields": {
            "title": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "typeId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false,
                "statusType": "DEAL_TYPE"
            },
            "categoryId": {
                "type": "crm_category",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            },
            "stageId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false,
                "statusType": "DEAL_STAGE"
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
            "isManualOpportunity": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            }
        }
    }
}
```

Следующему шагу нужны ключи `type`, `isRequired`, `isReadOnly`, `isMultiple`, `title` или `formLabel`. Для полей типа `crm_status` также нужен `statusType`, кроме поля `stageId`: его справочник генератор определяет по `categoryId`.

Метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) получает актуальный список воронок сделки по `entityTypeId = 2`. В ответе генератор использует `id`, `name` и `isDefault`:

```json
{
    "result": {
        "categories": [
            {
                "id": 9,
                "name": "Воронка с оригинальным названием",
                "entityTypeId": 2,
                "isDefault": "N"
            },
            {
                "id": 0,
                "name": "Общая",
                "entityTypeId": 2,
                "isDefault": "Y"
            }
        ]
    }
}
```

Если передать `ID=342`, [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернет данные в `result.item`. Генератор берет из этого объекта значения по тем же camelCase-ключам, что пришли в описании полей:

```json
{
    "result": {
        "item": {
            "id": 342,
            "title": "Новая сделка (специально для примера rest методов)",
            "typeId": "SERVICE",
            "categoryId": 9,
            "stageId": "C9:UC_KN8KFI",
            "companyId": 5,
            "contactIds": [4, 5],
            "opportunity": 999.99,
            "currencyId": "RUB",
            "isManualOpportunity": "Y"
        }
    }
}
```

Поле `categoryId` присутствует в ответе [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и доступно для изменения. Методы [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) и [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) принимают его в `fields`. При смене воронки одновременно выберите подходящий `stageId` из обновленного списка.

Поле `typeId` использует справочник `DEAL_TYPE`. Генератор берет `statusType` из описания поля и получает варианты методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md).

Сумма сделки хранится в `opportunity`, а режим ее расчета — в `isManualOpportunity`. Если у сделки есть товарные позиции и `isManualOpportunity = N`, после сохранения Битрикс24 пересчитает сумму по товарным позициям и доставке. Чтобы сохранить значение из формы, установите флажок ручного расчета суммы.

Связи с клиентами хранятся в `companyId` и `contactIds`. Устаревшее одиночное поле `contactId` и служебное поле `contacts` пример не выводит, чтобы не отправлять несколько представлений одной связи. Универсальные методы получают и изменяют массив `contactIds` без вызова отдельного метода связей сделки.

У сделки нет мультиполя `fm`, поэтому форма не выводит телефоны, адреса почты, сайты и мессенджеры. Эти данные относятся к связанным контактам и компаниям.

Генератор сопоставляет типы полей с элементами формы.

#|
|| Тип поля | Элемент формы ||
|| `crm_status`, `crm_currency`, `crm_category`, `enumeration` | `<select>` со значениями справочника ||
|| `crm_company` | числовое поле и название текущей компании ||
|| `crm_contact` | одно или несколько числовых полей и имена текущих контактов ||
|| `user` | числовое поле и имя пользователя ||
|| `date`, `datetime` | `date`, `datetime-local` ||
|| `boolean`, `char` | флажок ||
|| `integer`, `double` | числовое поле ||
|| `money` | сумма и список валют ||
|| `file`, `resourcebooking`, `crm_product_row` | сообщение о неподдерживаемом типе ||
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

    const ENTITY_TYPE_ID = 2
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
        if (params.ID) html += ` id="${escapeHtml(params.ID)}"`
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

    app.get('/', async (req, res) => {
        const id = parseInt(String(req.query.ID ?? '0'), 10) || 0
        try {
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'deal-fields')
            const fields = fieldResult.fields
            const currencies = await call('crm.currency.list', {}, 'currencies')
            const item = id > 0
                ? (await call('crm.item.get', {
                    entityTypeId: ENTITY_TYPE_ID,
                    id,
                    useOriginalUfNames: 'Y',
                }, 'deal-get')).item
                : {}
            const categories = (await call('crm.category.list', { entityTypeId: ENTITY_TYPE_ID }, 'deal-categories')).categories
            const defaultCategory = categories.find((category) => category.isDefault === 'Y')
            const categoryId = Number(item.categoryId ?? defaultCategory?.id)
            if (!Number.isInteger(categoryId)) throw new Error('Не найдена воронка по умолчанию')
            const categoryOptions = Object.fromEntries(categories.map((category) => [category.id, category.name]))
            const stagesByCategory = {}
            for (const category of categories) {
                const currentCategoryId = Number(category.id)
                const statusType = currentCategoryId === 0 ? 'DEAL_STAGE' : `DEAL_STAGE_${currentCategoryId}`
                const rows = await call('crm.status.list', { filter: { ENTITY_ID: statusType } }, `stages-${currentCategoryId}`)
                stagesByCategory[String(currentCategoryId)] = Object.fromEntries(rows.map((row) => [row.STATUS_ID, row.NAME]))
            }

            let standard = ''
            let custom = ''
            for (const [key, field] of Object.entries(fields)) {
                if (SKIPPED_FIELDS.has(key)) continue
                let value = key === 'categoryId' ? categoryId : (item[key] ?? '')
                let control = ''
                const params = {
                    NAME: `form[${key}]`, VALUE: value,
                    REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple,
                    ID: key === 'categoryId' ? 'category-id' : (key === 'stageId' ? 'stage-id' : ''),
                }

                if (key === 'stageId') {
                    control = select({ ...params, REQUIRED: true }, stagesByCategory[String(categoryId)] || {})
                } else if (field.type === 'crm_status') {
                    const rows = await call('crm.status.list', { filter: { ENTITY_ID: field.statusType } }, `status-${key}`)
                    control = select(params, Object.fromEntries(rows.map((row) => [row.STATUS_ID, row.NAME])))
                } else if (field.type === 'crm_category') {
                    control = select(params, categoryOptions)
                } else if (field.type === 'crm_currency') {
                    control = select(params, Object.fromEntries(currencies.map((row) => [row.CURRENCY, row.FULL_NAME])))
                } else if (field.type === 'enumeration') {
                    const options = Object.fromEntries((field.items || []).map((row) => [row.ID ?? row.id, row.VALUE ?? row.value]))
                    control = select(params, options)
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
                } else if (['file', 'resourcebooking', 'crm_product_row'].includes(field.type)) {
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
                    const stagesByCategory = ${JSON.stringify(stagesByCategory).replace(/</g, '\u003c')}
                    const categoryField = document.getElementById('category-id')
                    const stageField = document.getElementById('stage-id')
                    categoryField?.addEventListener('change', () => {
                        stageField.innerHTML = ''
                        const emptyOption = document.createElement('option')
                        emptyOption.value = ''; emptyOption.textContent = '-- Выберите стадию --'; emptyOption.disabled = true; emptyOption.selected = true
                        stageField.appendChild(emptyOption)
                        for (const [stageId, stageName] of Object.entries(stagesByCategory[categoryField.value] || {})) {
                            const option = document.createElement('option'); option.value = stageId; option.textContent = stageName; stageField.appendChild(option)
                        }
                    })
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
    import json
    from html import escape

    from flask import Flask, request
    from b24pysdk import BitrixWebhook, Client

    from save_form import save_form

    app = Flask(__name__)
    ENTITY_TYPE_ID = 2
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
        if params.get("ID"):
            html += f' id="{escape(params["ID"])}"'
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


    PAGE = """
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container"><form id="auto_form" method="post">
            %(hidden_id)s
            <h2>Системные поля</h2><div class="row">%(standard)s</div>
            <h2>Пользовательские поля</h2><div class="row">%(custom)s</div>
            <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
        </form></div>
        <script>
            const stagesByCategory = %(stages)s;
            const categoryField = document.getElementById('category-id');
            const stageField = document.getElementById('stage-id');
            categoryField?.addEventListener('change', () => {
                stageField.innerHTML = '';
                const emptyOption = document.createElement('option'); emptyOption.value = ''; emptyOption.textContent = '-- Выберите стадию --'; emptyOption.disabled = true; emptyOption.selected = true; stageField.appendChild(emptyOption);
                for (const [stageId, stageName] of Object.entries(stagesByCategory[categoryField.value] || {})) {
                    const option = document.createElement('option'); option.value = stageId; option.textContent = stageName; stageField.appendChild(option);
                }
            });
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
            item = client.crm.item.get(entity_type_id=ENTITY_TYPE_ID, bitrix_id=item_id, use_original_uf_names=True).response.result["item"]
        categories = client.crm.category.list(entity_type_id=ENTITY_TYPE_ID).response.result["categories"]
        default_category = next((row for row in categories if row["isDefault"] == "Y"), None)
        category_id = int(item["categoryId"]) if "categoryId" in item else (int(default_category["id"]) if default_category else None)
        if category_id is None:
            raise RuntimeError("Не найдена воронка по умолчанию")
        category_options = {row["id"]: row["name"] for row in categories}
        stages_by_category = {}
        for category in categories:
            current_category_id = int(category["id"])
            status_type = "DEAL_STAGE" if current_category_id == 0 else f"DEAL_STAGE_{current_category_id}"
            rows = client.crm.status.list(filter={"ENTITY_ID": status_type}).response.result
            stages_by_category[str(current_category_id)] = {row["STATUS_ID"]: row["NAME"] for row in rows}

        standard = ""
        custom = ""
        for key, field in fields.items():
            if key in SKIPPED_FIELDS:
                continue
            value = category_id if key == "categoryId" else value_or_empty(item.get(key))
            params = {
                "NAME": f"form[{key}]", "VALUE": value,
                "REQUIRED": field.get("isRequired"), "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"),
                "ID": "category-id" if key == "categoryId" else ("stage-id" if key == "stageId" else ""),
            }
            field_type = field.get("type")
            control = ""

            if key == "stageId":
                control = select_field({**params, "REQUIRED": True}, stages_by_category.get(str(category_id), {}))
            elif field_type == "crm_status":
                rows = client.crm.status.list(filter={"ENTITY_ID": field["statusType"]}).response.result
                control = select_field(params, {row["STATUS_ID"]: row["NAME"] for row in rows})
            elif field_type == "crm_category":
                control = select_field(params, category_options)
            elif field_type == "crm_currency":
                control = select_field(params, {row["CURRENCY"]: row["FULL_NAME"] for row in currencies})
            elif field_type == "enumeration":
                options = {
                    row.get("ID", row.get("id")): row.get("VALUE", row.get("value"))
                    for row in field.get("items", [])
                }
                control = select_field(params, options)
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
            elif field_type in ("file", "resourcebooking", "crm_product_row"):
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
        return PAGE % {
            "hidden_id": hidden_id, "standard": standard, "custom": custom,
            "stages": json.dumps(stages_by_category, ensure_ascii=False).replace("<", "\\u003c"),
        }


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

        const ENTITY_TYPE_ID = 2;
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
            $html .= !empty($params['ID']) ? ' id="' . esc($params['ID']) . '"' : '';
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
            $item = callCore($sb, 'crm.item.get', ['entityTypeId' => ENTITY_TYPE_ID, 'id' => $ID, 'useOriginalUfNames' => 'Y'])['item'];
        }
        $categories = callCore($sb, 'crm.category.list', ['entityTypeId' => ENTITY_TYPE_ID])['categories'];
        $defaultCategoryId = null;
        $categoryOptions = [];
        foreach ($categories as $category)
        {
            $categoryOptions[$category['id']] = $category['name'];
            if ($category['isDefault'] === 'Y') $defaultCategoryId = (int)$category['id'];
        }
        $categoryId = array_key_exists('categoryId', $item) ? (int)$item['categoryId'] : $defaultCategoryId;
        if ($categoryId === null) throw new RuntimeException('Не найдена воронка по умолчанию');
        $stagesByCategory = [];
        foreach ($categories as $category)
        {
            $currentCategoryId = (int)$category['id'];
            $statusType = $currentCategoryId === 0 ? 'DEAL_STAGE' : 'DEAL_STAGE_' . $currentCategoryId;
            $stagesByCategory[$currentCategoryId] = [];
            foreach (callCore($sb, 'crm.status.list', ['filter' => ['ENTITY_ID' => $statusType]]) as $status)
            {
                $stagesByCategory[$currentCategoryId][$status['STATUS_ID']] = $status['NAME'];
            }
        }
        $stagesJson = json_encode($stagesByCategory, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

        $standard = '';
        $custom = '';
        foreach ($fields as $key => $field)
        {
            if (in_array($key, ['contactId', 'contacts'], true)) continue;
            $value = $key === 'categoryId' ? $categoryId : ($item[$key] ?? '');
            $params = [
                'NAME' => 'form[' . $key . ']', 'VALUE' => $value,
                'REQUIRED' => $field['isRequired'], 'DISABLE' => $field['isReadOnly'], 'MULTIPLE' => $field['isMultiple'],
                'ID' => $key === 'categoryId' ? 'category-id' : ($key === 'stageId' ? 'stage-id' : ''),
            ];
            $control = '';

            if ($key === 'stageId')
            {
                $control = selectField(['REQUIRED' => true] + $params, $stagesByCategory[$categoryId] ?? []);
            }
            elseif ($field['type'] === 'crm_status')
            {
                $options = [];
                foreach ($crm->status()->list([], ['ENTITY_ID' => $field['statusType']], [])->getStatuses() as $status) $options[$status->STATUS_ID] = $status->NAME;
                $control = selectField($params, $options);
            }
            elseif ($field['type'] === 'crm_category')
            {
                $control = selectField($params, $categoryOptions);
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
            elseif (in_array($field['type'], ['file', 'resourcebooking', 'crm_product_row'], true))
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
            const stagesByCategory = <?= $stagesJson ?>;
            const categoryField = document.getElementById('category-id');
            const stageField = document.getElementById('stage-id');
            categoryField?.addEventListener('change', () => {
                stageField.innerHTML = '';
                const emptyOption = document.createElement('option'); emptyOption.value = ''; emptyOption.textContent = '-- Выберите стадию --'; emptyOption.disabled = true; emptyOption.selected = true; stageField.appendChild(emptyOption);
                for (const [stageId, stageName] of Object.entries(stagesByCategory[categoryField.value] || {})) {
                    const option = document.createElement('option'); option.value = stageId; option.textContent = stageName; stageField.appendChild(option);
                }
            });
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

Браузер отправляет форму обработчику в формате `application/x-www-form-urlencoded`. Обработчик повторно вызывает [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), чтобы не доверять типам из клиентского запроса.

Для каждого доступного для записи поля обработчик выполняет преобразование:

- `boolean` и `char` передает как `Y` или `N`
- `crm_company` передает как один числовой идентификатор
- `crm_contact`, `user` и другие множественные поля передает как массив
- `money` объединяет сумму и валюту в строку `сумма|валюта`
- поля типов `file`, `resourcebooking` и `crm_product_row` пропускает
- поля с `isReadOnly = true` пропускает
- отсутствующее одиночное поле передает как пустую строку, множественное — как пустой массив

Если форма содержит `id`, обработчик вызывает [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md). Без `id` он вызывает [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В обоих случаях идентификатор сохраненной сделки находится в `result.item.id`:

```json
{
    "result": {
        "item": {
            "id": 342,
            "title": "Новая сделка (специально для примера rest методов)",
            "categoryId": 9,
            "stageId": "C9:UC_KN8KFI",
            "typeId": "SERVICE",
            "companyId": 5,
            "contactIds": [4, 5],
            "opportunity": 999.99,
            "isManualOpportunity": "Y",
            "currencyId": "RUB"
        }
    }
}
```

Следующему действию нужен `result.item.id`: добавьте его в параметр `ID` адреса формы, чтобы открыть созданную сделку для редактирования.

### Полный код обработчика

Сохраните обработчик в файл: JavaScript — `save-form.mjs`, PHP — `auto_form.php`, Python — `save_form.py`.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const ENTITY_TYPE_ID = 2
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

    export async function saveForm(req, res) {
        try {
            const submitted = req.body.form ?? {}
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'deal-fields-save')
            const fields = {}

            for (const [key, prop] of Object.entries(fieldResult.fields)) {
                if (SKIPPED_FIELDS.has(key) || prop.isReadOnly || ['file', 'resourcebooking', 'crm_product_row'].includes(prop.type)) continue
                if (['boolean', 'char'].includes(prop.type)) {
                    fields[key] = key in submitted ? 'Y' : 'N'
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
            const result = await call(method, params, `deal-${id > 0 ? 'update' : 'add'}`)
            res.json({ message: `Сделка сохранена, ID: ${result.item.id}` })
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

    ENTITY_TYPE_ID = 2
    SKIPPED_FIELDS = {"contactId", "contacts"}
    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    ))


    def values_for(name):
        return request.form.getlist(name) or request.form.getlist(f"{name}[]")


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
                if key in SKIPPED_FIELDS or prop.get("isReadOnly") or prop.get("type") in ("file", "resourcebooking", "crm_product_row"):
                    continue
                field_type = prop.get("type")
                if field_type in ("boolean", "char"):
                    fields[key] = "Y" if key in submitted else "N"
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
            return jsonify(message=f"Сделка сохранена, ID: {result['item']['id']}")
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
        const ENTITY_TYPE_ID = 2;
        header('Content-Type: application/json; charset=utf-8');

        function callCore($sb, string $method, array $params): array
        {
            return $sb->core->call($method, $params)->getResponseData()->getResult();
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
                    || in_array($prop['type'], ['file', 'resourcebooking', 'crm_product_row'], true))
                {
                    continue;
                }
                if (in_array($prop['type'], ['boolean', 'char'], true))
                {
                    $fields[$key] = array_key_exists($key, $submitted) ? 'Y' : 'N';
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
            echo json_encode(['message' => 'Сделка сохранена, ID: ' . $result['item']['id']], JSON_UNESCAPED_UNICODE);
        }
        catch (Throwable $error)
        {
            http_response_code(400);
            echo json_encode(['error' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    ```
{% endlist %}

## Проверим результат

1. Откройте страницу без `ID`
2. Убедитесь, что в поле воронки выбрана воронка по умолчанию, а поле стадии содержит только ее стадии
3. Заполните название, тип сделки и другие нужные поля, затем нажмите **Сохранить**
4. Добавьте идентификатор из сообщения в параметр `ID` и снова откройте форму
5. Сравните название, `categoryId`, `stageId`, `companyId`, `contactIds` и пользовательские поля с введенными значениями
6. Измените воронку и убедитесь, что список стадий заменился. Выберите стадию новой воронки и сохраните сделку
7. Если у сделки нет товарных позиций или включен ручной расчет, сравните `opportunity` со значением формы. Если есть товарные позиции и ручной расчет выключен, проверьте пересчитанную сумму отдельно по товарным позициям и доставке

Для дополнительной проверки вызовите [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с `entityTypeId = 2`, идентификатором сделки и `useOriginalUfNames = Y`.

## Ошибки и диагностика

#|
|| Симптом | Причина | Что проверить и как продолжить ||
|| Запросы завершаются ошибкой авторизации | Неверно указан адрес вебхука или вебхук удален | Сверьте домен и `USER_ID/TOKEN`, при необходимости создайте новый входящий вебхук и повторите открытие формы ||
|| `The request requires higher privileges than provided by the webhook token.` | У вебхука нет scope `user_brief`, который нужен для [user.get](../../../api-reference/user/user-get.md) | Добавьте scope `user_brief` в права вебхука и перезагрузите страницу формы ||
|| `ACCESS_DENIED` или `Access denied.` при открытии или сохранении формы | Пользователю вебхука не хватает прав на сделку или доступа к настройкам CRM для [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) | Выдайте права на чтение, добавление и изменение сделок и доступ к настройкам CRM, затем повторите открытие или сохранение формы ||
|| Сделка не открывается по `ID` | Идентификатор не существует или сделка недоступна пользователю | Проверьте идентификатор методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) от имени того же пользователя, затем откройте форму с доступным `ID` ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Значение поля не соответствует его типу | Найдите поле в тексте ошибки, сравните значение с `type`, `isMultiple` и вариантами из [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), затем исправьте поле и повторите сохранение ||
|| После снятия всех значений множественного пользовательского поля типа «список» сохранение проходит без ошибки, но значения остаются | Обработчик отправляет пустой массив, а [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает прежние значения | Для очистки поля нужен отдельный проверенный подход; после него снова вызовите [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) ||
|| Список стадий не соответствует воронке сделки | Страница открыта со старыми данными или стадии получены по `stageId.statusType` вместо `categoryId` | Перезагрузите страницу, проверьте `categoryId` сделки и запрос [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с `DEAL_STAGE` либо `DEAL_STAGE_{categoryId}`, затем снова выберите воронку и стадию ||
|| После смены воронки форма не отправляется | Не выбрана стадия из обновленного списка | Выберите стадию новой воронки и повторите сохранение ||
|| Введенная сумма изменилась после сохранения | У сделки есть товарные позиции и выключен ручной расчет суммы | Включите `isManualOpportunity` для ручного значения или проверьте сумму товарных позиций и доставки, затем снова откройте сделку ||
|| Вместо поля показано сообщение о неподдерживаемом типе | Пример не реализует `file`, `resourcebooking` или `crm_product_row` | Обработайте поле отдельным кодом или оставьте его без изменения, затем сохраните остальные поля ||
|| PHP сообщает о несовместимой платформе | Версия PHP или расширения не соответствуют B24PhpSDK | Выполните `php -v`, `php -m` и `composer check-platform-reqs`, исправьте окружение и перезапустите сервер ||
|#

## Что важно учитывать

- При выборе стадий сделки не используйте `stageId.statusType` без проверки: генератор строит `DEAL_STAGE` или `DEAL_STAGE_{categoryId}` по текущей воронке
- Поле `categoryId` можно передавать в [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) и [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md). При смене воронки передавайте стадию из ее списка
- `typeId` относится к справочнику `DEAL_TYPE`; значения получает [crm.status.list](../../../api-reference/crm/status/crm-status-list.md)
- Если у сделки есть товарные позиции и `isManualOpportunity = N`, введенное значение `opportunity` после сохранения заменяется расчетом по товарным позициям и доставке
- Форма не управляет товарными позициями. Получайте их методом [crm.item.productrow.list](../../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md), изменяйте методом [crm.item.productrow.set](../../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) с `ownerType = D` и идентификатором сделки
- Универсальные методы работают со связями сделки через `companyId` и `contactIds`. Поля `contactId` и `contacts` форма не отправляет
- У сделки нет мультиполя `fm`: телефоны и адреса почты редактируйте у связанных контактов или компаний
- Тип `file` в примере не реализован. Для загрузки передайте массив из имени файла и содержимого в Base64. [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает для файлов объект с ключами `id`, `url` и `urlMachine`. Значение `urlMachine` может содержать действующий токен вебхука в пути `/rest/{user_id}/{token}/`. Не записывайте файловые URL из ответа в логи, отчеты и сообщения об ошибках и не передавайте их третьим лицам без удаления токена
- Обработчик передает пустые значения для доступных для записи полей, которых нет в форме. Если поле нужно сохранить без изменений, добавьте его в список пропускаемых полей
- Если снять все значения множественного пользовательского поля типа «список», обработчик отправит пустой массив. Запрос [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) завершится без ошибки, но [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернет прежние значения. Для очистки такого поля нужен отдельный подход
- [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) возвращает данные постранично. Если у поля больше 50 связанных элементов, добавьте обработку следующих страниц
- [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) возвращают не более 50 записей за один вызов. Пример получает только первую страницу. Если в Битрикс24 больше 50 воронок, в рабочем приложении запрашивайте следующие страницы через `start`; для справочников и валют используйте ту же обработку при превышении лимита
- В рабочем приложении добавьте проверку CSRF, авторизацию доступа к форме и безопасное журналирование ошибок
