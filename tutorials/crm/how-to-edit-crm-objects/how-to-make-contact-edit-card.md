# Как сделать свою карточку редактирования контакта

> Scope: [`crm`](../../../api-reference/scopes/permissions.md), [`user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнить сценарий: пользователь с правом читать, добавлять и изменять контакты, читать связанные компании и лиды, а также с доступом к настройкам CRM. Scope `user_brief` нужен для вызова [user.get](../../../api-reference/user/user-get.md)

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В примере создадим веб-форму для добавления и редактирования контакта. Генератор получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и подбирает элемент HTML-формы по типу каждого доступного для записи поля. Поэтому пользовательские поля появляются в форме без изменения кода.

Если открыть страницу без параметра `ID`, обработчик создаст контакт. Если передать идентификатор, например `?ID=123`, генератор загрузит контакт методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), заполнит форму, а обработчик обновит этот контакт.

Пример состоит из двух файлов:

- генератор получает описание полей, данные контакта, категории и значения справочников, затем выводит HTML-форму
- обработчик проверяет данные формы по актуальному описанию полей и сохраняет контакт

У контакта нет отдельного поля с названием карточки — его заменяют имя `name` и фамилия `lastName`. Отдельного поля с полным именем API не возвращает, поэтому после сохранения сверяйте эти два поля.

## Как работает сценарий

1. [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) возвращает описание полей контакта в `result.fields`
2. Если в адресе есть `ID`, [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает значения контакта в `result.item`, включая мультиполе `fm`
3. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) возвращает направления контактов в `result.categories`
4. Генератор подставляет читаемые названия вместо служебных кодов с помощью дополнительных методов
   - [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — поля `STATUS_ID` и `NAME` для обращения, типа контакта, источника и других CRM-справочников
   - [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) — поля `CURRENCY` и `FULL_NAME` для валют пользовательских полей типа `money`
   - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — поля `id` и `title` связанных компаний
   - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — поле `title` связанного лида
   - [user.get](../../../api-reference/user/user-get.md) — поля `ID`, `NAME` и `LAST_NAME` пользователей
5. Обработчик повторно получает описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и приводит значения формы к типам API
6. Для нового контакта [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) возвращает созданный контакт в `result.item`. Для существующего контакта [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) возвращает обновленный контакт в том же ключе

## 1. Подготовим окружение

Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#incoming-webhook) с правами `crm` и `user_brief`.

{% note warning "Храните вебхук в секрете" %}

Вебхук выполняет запросы с правами пользователя, который его создал. Не добавляйте адрес вебхука в публичный репозиторий, клиентский JavaScript и сообщения об ошибках.

{% endnote %}

Выберите один язык, создайте для примера отдельную папку и откройте в ней терминал. Сначала сохраните код из шагов 2 и 3, затем выполните команду запуска.

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

Перед установкой зависимостей проверьте версии Node.js, PHP и Python командами `node --version`, `php -v` и `python --version`, а список расширений PHP — командой `php -m`. `@bitrix24/b24jssdk` поддерживает Node.js 18, 20, 22 и новее. B24PhpSDK версии 3 требует PHP 8.4 или 8.5 и расширения `bcmath`, `curl`, `intl` и `json`. `b24pysdk` требует Python 3.9 или новее. После установки PHP-зависимостей выполните `composer check-platform-reqs`.

Укажите адрес вебхука:

- в JavaScript задайте переменную окружения `B24_HOOK`
- в PHP замените полный URL в `initFromWebhook`
- в Python замените `your-domain.bitrix24.ru` и `USER_ID/TOKEN`

В PHP и Python адрес указывается дважды — в файле генератора и в файле обработчика. Если заменить его только в одном, форма откроется, а сохранение работать не будет.

Запустите пример. Он рассчитан на локальный запуск: страница формы выполняет действия от имени пользователя вебхука, поэтому перед публикацией выполните требования из раздела «Что важно учитывать».

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
    php -d max_execution_time=0 -S localhost:8000
    ```
{% endlist %}

Две команды выглядят непривычно, и вот почему. Генератор собирает форму несколькими запросами подряд, а встроенный сервер PHP успевает прервать страницу по своему ограничению в 30 секунд — параметр `max_execution_time` снимает его для локального запуска. По той же причине в примере на Python увеличен таймаут клиента: по умолчанию `b24pysdk` ждет ответ около трех секунд, и на загруженном портале запрос обрывается.

Страницы формы будут доступны по адресам:

#|
|| Язык | Новый контакт | Контакт с идентификатором `123` ||
|| JavaScript | `http://localhost:3000/` | `http://localhost:3000/?ID=123` ||
|| PHP | `http://localhost:8000/index.php` | `http://localhost:8000/index.php?ID=123` ||
|| Python | `http://localhost:5000/` | `http://localhost:5000/?ID=123` ||
|#

## 2. Создадим форму

Генератор передает в [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) два параметра:

- `entityTypeId: 3` — идентификатор типа объекта «контакт» из таблицы [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type)
- `useOriginalUfNames: Y` — вернуть оригинальные имена пользовательских полей `UF_*`

В Python SDK параметр `useOriginalUfNames` называется `use_original_uf_names` и принимает логическое значение `True`.

Подтвержденный ответ [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) сокращен до полей, важных для контакта:

```json
{
  "result": {
    "fields": {
      "name": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isMultiple": false
      },
      "categoryId": {
        "type": "crm_category",
        "isRequired": false,
        "isReadOnly": false,
        "isMultiple": false
      },
      "companyIds": {
        "type": "crm_company",
        "isRequired": false,
        "isReadOnly": false,
        "isMultiple": true
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

Остальные свойства ответа опущены.

Подтвержденный ответ [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) для редактируемого контакта сокращен до полей, которые использует форма:

```json
{
  "result": {
    "item": {
      "id": 123,
      "name": "Иван",
      "lastName": "Иванов",
      "categoryId": 0,
      "companyIds": [27, 31],
      "leadId": 17,
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

Поле `fm` возвращает числовой `id` существующего значения, а `companyIds` — массив идентификаторов компаний.

Описание контакта содержит обычные поля, связи, справочники и автоматически вычисляемые значения.

#|
|| Поле | Тип или особенность | Как использует форма ||
|| `honorific` | `crm_status`, справочник `HONORIFIC` | выводит список обращений ||
|| `name`, `lastName` | строки | выводит поля имени и фамилии ||
|| `fullName` | атрибуты `Hidden`, `ReadOnly`, `AutoGenerated` | не приходит ни в `result.fields` ответа [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), ни в `result.item` ответа [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), форма не выводит и не отправляет ||
|| `photo` | `file`, изображение | показывает сообщение о неподдерживаемом типе и не отправляет ||
|| `typeId` | `crm_status`, справочник `CONTACT_TYPE` | выводит список типов контакта ||
|| `sourceId` | `crm_status`, справочник `SOURCE` | выводит список источников ||
|| `comments` | текст в формате BBCode | выводит многострочное поле ||
|| `opened` | обязательное логическое поле | всегда выводит флажок и отправляет `Y` или `N` ||
|| `assignedById` | пользователь, значение нельзя очистить | выводит числовое поле и имя ответственного ||
|| `companyIds` | множественная связь с компаниями | выводит идентификаторы в порядке привязок и названия компаний ||
|| `leadId` | связь с лидом | выводит идентификатор и пытается получить название лида ||
|| `categoryId` | направление контакта | выводит список из [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) ||
|| `fm` | множественное поле телефонов, адресов почты, сайтов и мессенджеров | выводит строки с `id`, `typeId`, `valueType` и `value` ||
|#

Поле `birthdaySort` также скрыто атрибутом `Hidden` и отсутствует в `result.fields` ответа [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md). Поля `hasPhone`, `hasEmail`, `hasImol`, `id`, `createdBy`, `updatedBy`, `createdTime`, `updatedTime` и `lastCommunicationTime` доступны только для чтения. Генератор пропускает их по `isReadOnly`, обработчик не отправляет. Поле `webformId` приходит в описании с `isImmutable = true`: задать его можно только при добавлении, а при обновлении Битрикс24 без ошибки возвращает прежнее значение. Такие поля генератор и обработчик тоже пропускают.

У контактов есть направления, но нет стадий и воронок. Список направлений включает направление по умолчанию с `id = 0` и пользовательские направления. Для нового контакта пример выбирает `categoryId = 0`.

Атрибут `NotDisplayed` описывает отображение `categoryId` в штатной карточке, а не запрещает работу с полем через универсальный REST. Поле `categoryId` возвращается в ответе [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и принимается методами [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) и [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md), поэтому форма выводит его.

Комментарии в `comments` хранятся как BBCode. Обычный текст и BBCode сохраняются как есть, а HTML-теги Битрикс24 удаляет и оставляет только их содержимое: `<strong>Важный контакт</strong>` сохранится как `Важный контакт`. Если нужно выделение, передавайте `[b]Важный контакт[/b]`.

Пользовательские поля контакта можно создавать методом [crm.contact.userfield.add](../../../api-reference/crm/contacts/userfield/crm-contact-userfield-add.md) и получать методом [crm.contact.userfield.list](../../../api-reference/crm/contacts/userfield/crm-contact-userfield-list.md). Для типа `money` генератор дополнительно получает валюты методом [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md).

### Как форма работает с мультиполями

Поле `fm` объединяет телефоны, адреса почты, сайты и мессенджеры. Допустимые `typeId` в примере — `PHONE`, `EMAIL`, `WEB` и `IM`. Формат `value` зависит от типа: номер телефона, адрес почты, URL или идентификатор мессенджера.

Генератор выводит каждое существующее значение и сохраняет его числовой `id` в скрытом поле. После существующих значений он добавляет три пустые строки для новых данных.

Генератор сопоставляет типы полей с элементами формы.

#|
|| Тип поля | Элемент формы ||
|| `crm_status`, `crm_currency`, `crm_category`, `enumeration` | `<select>` со значениями справочника ||
|| `crm_company` | одно или несколько числовых полей и названия текущих компаний ||
|| `crm_lead` | числовое поле и название текущего лида, если оно доступно ||
|| `user` | числовое поле и имя пользователя ||
|| `crm_multifield` | строки `typeId`, `valueType`, `value` с сохранением `id` ||
|| `date`, `datetime` | `date`, `datetime-local` без изменения часового пояса ||
|| `boolean`, `char` | флажок ||
|| `integer`, `double` | числовое поле ||
|| `money` | сумма и список валют ||
|| `file`, `resourcebooking` | сообщение о неподдерживаемом типе ||
|| Остальные типы | текстовое поле ||
|#

Если пользователь вебхука не может прочитать связанный лид, форма все равно открывается. Генератор оставляет поле `leadId` и добавляет диагностическое сообщение вместо названия лида.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

### Полный код генератора формы

Сохраните код в файл генератора: JavaScript — `form.mjs`, PHP — `index.php`, Python — `app.py`.

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'
    import { saveForm } from './save-form.mjs'

    const ENTITY_TYPE_ID = 3
    const SKIPPED_FIELDS = new Set([
        'companyId', 'companies', 'hasPhone', 'hasEmail', 'hasImol',
        'birthdaySort', 'fullName', 'id', 'createdBy', 'updatedBy',
        'createdTime', 'updatedTime', 'lastCommunicationTime',
    ])
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
        const current = params.MULTIPLE
            ? (Array.isArray(params.VALUE) ? params.VALUE : [params.VALUE ?? ''])
            : [params.VALUE ?? '']
        const values = params.MULTIPLE ? [...current, ''] : current
        return values.map((value, index) => {
            let html = '<input class="form-control"'
            html += ` name="${escapeHtml(params.NAME)}${params.MULTIPLE ? '[]' : ''}"`
            html += ` type="${escapeHtml(params.TYPE || 'text')}"`
            if (params.STEP) html += ` step="${escapeHtml(params.STEP)}"`
            if (params.REQUIRED && index === 0) html += ' required'
            if (params.CHECKED) html += ' checked'
            return html + ` value="${escapeHtml(value)}">`
        }).join('')
    }

    function textarea(params) {
        return `<textarea class="form-control" name="${escapeHtml(params.NAME)}"${params.REQUIRED ? ' required' : ''}>${escapeHtml(params.VALUE)}</textarea>`
    }

    function select(params, options) {
        let html = `<select class="form-control" name="${escapeHtml(params.NAME)}${params.MULTIPLE ? '[]' : ''}"`
        if (params.REQUIRED) html += ' required'
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
        rows.push(...Array.from({ length: 3 }, () => ({
            id: '', typeId: 'PHONE', valueType: 'WORK', value: '',
        })))
        return rows.map((row, index) => {
            const typeOptions = ['PHONE', 'EMAIL', 'WEB', 'IM']
                .map((type) => `<option value="${type}"${row.typeId === type ? ' selected' : ''}>${type}</option>`)
                .join('')
            const itemId = row.id ?? ''
            return `<div class="border rounded p-2 mb-2">
                <input type="hidden" name="fm[${index}][id]" value="${escapeHtml(itemId)}">
                <select class="form-control mb-1" name="fm[${index}][typeId]">${typeOptions}</select>
                <input class="form-control mb-1" name="fm[${index}][valueType]" value="${escapeHtml(row.valueType ?? 'WORK')}" placeholder="WORK">
                <input class="form-control mb-1" name="fm[${index}][value]" value="${escapeHtml(row.value ?? '')}" placeholder="Значение">
                ${itemId ? `<label><input type="checkbox" name="fm[${index}][delete]" value="Y"> Удалить</label>` : ''}
            </div>`
        }).join('')
    }

    app.get('/', async (req, res) => {
        const rawId = String(req.query.ID ?? '').trim()
        const id = /^\d+$/.test(rawId) ? Number(rawId) : 0
        try {
            const fields = (await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'contact-fields')).fields
            const currencies = await call('crm.currency.list', {}, 'currencies')
            const categories = (await call('crm.category.list', {
                entityTypeId: ENTITY_TYPE_ID,
            }, 'contact-categories')).categories
            const item = id > 0
                ? (await call('crm.item.get', {
                    entityTypeId: ENTITY_TYPE_ID,
                    id,
                    useOriginalUfNames: 'Y',
                }, 'contact-get')).item
                : {}
            const categoryOptions = Object.fromEntries(
                categories.map((category) => [category.id, category.name]),
            )
            const diagnostics = []
            let standard = ''
            let custom = ''

            for (const [key, field] of Object.entries(fields)) {
                if (field.isReadOnly || field.isImmutable || SKIPPED_FIELDS.has(key)) continue
                const value = key === 'categoryId' ? (item[key] ?? 0) : (item[key] ?? '')
                const params = {
                    NAME: `form[${key}]`, VALUE: value,
                    REQUIRED: field.isRequired, MULTIPLE: field.isMultiple,
                }
                let control = ''

                if (field.type === 'crm_status') {
                    const rows = await call('crm.status.list', {
                        filter: { ENTITY_ID: field.statusType },
                    }, `status-${key}`)
                    control = select(params, Object.fromEntries(
                        rows.map((row) => [row.STATUS_ID, row.NAME]),
                    ))
                } else if (field.type === 'crm_category') {
                    control = select(params, categoryOptions)
                } else if (field.type === 'crm_currency') {
                    control = select(params, Object.fromEntries(
                        currencies.map((row) => [row.CURRENCY, row.FULL_NAME]),
                    ))
                } else if (field.type === 'enumeration') {
                    const options = Object.fromEntries((field.items || []).map(
                        (row) => [row.ID ?? row.id, row.VALUE ?? row.value],
                    ))
                    control = select(params, options)
                } else if (field.type === 'crm_multifield') {
                    control = multifields(value)
                } else if (field.type === 'crm_company') {
                    control = input({ ...params, TYPE: 'number' })
                    const ids = (Array.isArray(value) ? value : [value])
                        .map(Number).filter((companyId) => companyId > 0)
                    if (ids.length) {
                        const companies = (await call('crm.item.list', {
                            entityTypeId: 4,
                            filter: { '@id': ids },
                            select: ['id', 'title'],
                        }, `companies-${key}`)).items
                        const titleById = Object.fromEntries(
                            companies.map((company) => [String(company.id), company.title]),
                        )
                        const titles = ids.map((companyId) => titleById[String(companyId)] || `ID ${companyId}`)
                        control += ` (${escapeHtml(titles.join(', '))})`
                    }
                } else if (field.type === 'crm_lead') {
                    control = input({ ...params, TYPE: 'number' })
                    if (Number(value) > 0) {
                        try {
                            const lead = (await call('crm.item.get', {
                                entityTypeId: 1,
                                id: Number(value),
                            }, `lead-${key}`)).item
                            control += ` (${escapeHtml(lead.title)})`
                        } catch (error) {
                            diagnostics.push(`Название лида ID ${value} недоступно: ${error.message}`)
                        }
                    }
                } else if (field.type === 'user') {
                    control = input({ ...params, TYPE: 'number' })
                    const ids = (Array.isArray(value) ? value : [value])
                        .map(Number).filter((userId) => userId > 0)
                    if (ids.length) {
                        const users = await call('user.get', {
                            filter: { ID: ids },
                        }, `users-${key}`)
                        const names = users.map((user) => [user.NAME, user.LAST_NAME]
                            .filter((part) => part !== null && part !== undefined && part !== '')
                            .join(' '))
                        control += ` (${escapeHtml(names.join(', '))})`
                    }
                } else if (key === 'comments') {
                    control = textarea(params)
                } else if (['file', 'resourcebooking'].includes(field.type)) {
                    control = `Тип ${escapeHtml(field.type)} в примере не поддерживается`
                } else if (field.type === 'date') {
                    control = input({
                        ...params, VALUE: value ? String(value).slice(0, 10) : '', TYPE: 'date',
                    })
                } else if (field.type === 'datetime') {
                    control = input({
                        ...params, VALUE: value ? String(value).slice(0, 19) : '', TYPE: 'datetime-local',
                    })
                } else if (['boolean', 'char'].includes(field.type)) {
                    control = input({
                        ...params, REQUIRED: false, VALUE: 'Y',
                        CHECKED: value === 'Y', TYPE: 'checkbox',
                    })
                } else if (['integer', 'double'].includes(field.type)) {
                    control = input({
                        ...params, TYPE: 'number', STEP: field.type === 'double' ? 'any' : '',
                    })
                } else if (field.type === 'money') {
                    const [amount, currency] = String(value).split('|')
                    control = input({ ...params, VALUE: amount, TYPE: 'number', STEP: 'any' })
                    control += select({
                        ...params, NAME: `form[${key}_CURRENCY]`, VALUE: currency,
                    }, Object.fromEntries(
                        currencies.map((row) => [row.CURRENCY, row.FULL_NAME]),
                    ))
                } else {
                    control = input({ ...params, TYPE: 'text' })
                }

                const label = escapeHtml(field.formLabel || field.title || key)
                const block = `<div class="col-4 mt-3">${label}: </div><div class="col-6 mt-3">${control}</div>`
                if (key.startsWith('UF_')) custom += block
                else standard += block
            }

            const diagnosticHtml = diagnostics.length
                ? `<div class="alert alert-warning">${diagnostics.map(escapeHtml).join('<br>')}</div>`
                : ''
            res.send(`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
                <div class="container"><form id="auto_form" method="post">
                    ${item.id ? `<input type="hidden" name="form[id]" value="${escapeHtml(item.id)}">` : ''}
                    ${diagnosticHtml}
                    <h2>Системные поля</h2><div class="row">${standard}</div>
                    <h2>Пользовательские поля</h2><div class="row">${custom}</div>
                    <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
                </form></div>
                <script>
                    document.getElementById('auto_form').addEventListener('submit', async (event) => {
                        event.preventDefault()
                        const body = new URLSearchParams(new FormData(event.currentTarget))
                        try {
                            const response = await fetch('/form', { method: 'POST', body })
                            const text = await response.text()
                            try {
                                const json = JSON.parse(text)
                                alert(json.message || json.error || ('Код ответа ' + response.status))
                            } catch (parseError) {
                                alert('Ответ сервера не в формате JSON, код ' + response.status + ': ' + text.slice(0, 200))
                            }
                        } catch (networkError) {
                            alert('Не удалось отправить форму: ' + networkError.message)
                        }
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
    from html import escape

    from flask import Flask, request
    from b24pysdk import BitrixWebhook, Client

    from save_form import save_form

    app = Flask(__name__)
    ENTITY_TYPE_ID = 3
    SKIPPED_FIELDS = {
        "companyId", "companies", "hasPhone", "hasEmail", "hasImol",
        "birthdaySort", "fullName", "id", "createdBy", "updatedBy",
        "createdTime", "updatedTime", "lastCommunicationTime",
    }
    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    ), timeout=60)


    def value_or_empty(value):
        return "" if value is None else value


    def input_field(params):
        value = params.get("VALUE")
        current = value if isinstance(value, list) else [value_or_empty(value)]
        values = [*current, ""] if params.get("MULTIPLE") else current
        html = ""
        for index, item in enumerate(values):
            html += f'<input class="form-control" name="{escape(params["NAME"])}{"[]" if params.get("MULTIPLE") else ""}"'
            html += f' type="{escape(params.get("TYPE", "text"))}"'
            if params.get("STEP"):
                html += f' step="{escape(params["STEP"])}"'
            if params.get("REQUIRED") and index == 0:
                html += " required"
            if params.get("CHECKED"):
                html += " checked"
            html += f' value="{escape(str(value_or_empty(item)))}">'
        return html


    def textarea_field(params):
        required = " required" if params.get("REQUIRED") else ""
        return (
            f'<textarea class="form-control" name="{escape(params["NAME"])}"{required}>'
            f'{escape(str(value_or_empty(params.get("VALUE"))))}</textarea>'
        )


    def select_field(params, options):
        html = f'<select class="form-control" name="{escape(params["NAME"])}{"[]" if params.get("MULTIPLE") else ""}"'
        if params.get("REQUIRED"):
            html += " required"
        if params.get("MULTIPLE"):
            html += " multiple"
        html += ">"
        if not params.get("REQUIRED") and not params.get("MULTIPLE"):
            html += '<option value="">-- Не выбрано --</option>'
        value = params.get("VALUE")
        selected_values = value if isinstance(value, list) else [value_or_empty(value)]
        selected_values = [str(item) for item in selected_values]
        for key, title in options.items():
            selected = " selected" if str(key) in selected_values else ""
            html += f'<option value="{escape(str(key))}"{selected}>{escape(str(title))}</option>'
        return html + "</select>"


    def multifields(values):
        rows = list(values) if isinstance(values, list) else []
        rows.extend(
            {"id": "", "typeId": "PHONE", "valueType": "WORK", "value": ""}
            for _ in range(3)
        )
        html = ""
        for index, row in enumerate(rows):
            options = "".join(
                f'<option value="{field_type}"{" selected" if row.get("typeId") == field_type else ""}>{field_type}</option>'
                for field_type in ("PHONE", "EMAIL", "WEB", "IM")
            )
            item_id = value_or_empty(row.get("id"))
            delete = (
                f'<label><input type="checkbox" name="fm[{index}][delete]" value="Y"> Удалить</label>'
                if item_id != "" else ""
            )
            value_type = value_or_empty(row.get("valueType"))
            if value_type == "":
                value_type = "WORK"
            html += f"""<div class="border rounded p-2 mb-2">
                <input type="hidden" name="fm[{index}][id]" value="{escape(str(item_id))}">
                <select class="form-control mb-1" name="fm[{index}][typeId]">{options}</select>
                <input class="form-control mb-1" name="fm[{index}][valueType]" value="{escape(str(value_type))}" placeholder="WORK">
                <input class="form-control mb-1" name="fm[{index}][value]" value="{escape(str(value_or_empty(row.get('value'))))}" placeholder="Значение">
                {delete}
            </div>"""
        return html


    PAGE = """
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container"><form id="auto_form" method="post">
            %(hidden_id)s
            %(diagnostics)s
            <h2>Системные поля</h2><div class="row">%(standard)s</div>
            <h2>Пользовательские поля</h2><div class="row">%(custom)s</div>
            <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
        </form></div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const body = new URLSearchParams(new FormData(event.currentTarget));
                try {
                    const response = await fetch('/form', { method: 'POST', body });
                    const text = await response.text();
                    try {
                        const json = JSON.parse(text);
                        alert(json.message || json.error || ('Код ответа ' + response.status));
                    } catch (parseError) {
                        alert('Ответ сервера не в формате JSON, код ' + response.status + ': ' + text.slice(0, 200));
                    }
                } catch (networkError) {
                    alert('Не удалось отправить форму: ' + networkError.message);
                }
            });
        </script>
    """


    @app.route("/")
    def form_page():
        raw_id = request.args.get("ID", "0")
        try:
            item_id = int(raw_id)
        except (TypeError, ValueError):
            item_id = 0

        fields = client.crm.item.fields(
            entity_type_id=ENTITY_TYPE_ID,
            use_original_uf_names=True,
        ).response.result["fields"]
        currencies = client.crm.currency.list().response.result
        categories = client.crm.category.list(
            entity_type_id=ENTITY_TYPE_ID,
        ).response.result["categories"]
        item = {}
        if item_id > 0:
            item = client.crm.item.get(
                entity_type_id=ENTITY_TYPE_ID,
                bitrix_id=item_id,
                use_original_uf_names=True,
            ).response.result["item"]
        currency_options = {
            row["CURRENCY"]: row["FULL_NAME"] for row in currencies
        }
        category_options = {row["id"]: row["name"] for row in categories}
        diagnostics = []
        standard = ""
        custom = ""

        for key, field in fields.items():
            if field.get("isReadOnly") or field.get("isImmutable") or key in SKIPPED_FIELDS:
                continue
            value = item.get(key, 0) if key == "categoryId" else value_or_empty(item.get(key))
            params = {
                "NAME": f"form[{key}]", "VALUE": value,
                "REQUIRED": field.get("isRequired"), "MULTIPLE": field.get("isMultiple"),
            }
            field_type = field.get("type")
            control = ""

            if field_type == "crm_status":
                rows = client.crm.status.list(
                    filter={"ENTITY_ID": field["statusType"]},
                ).response.result
                control = select_field(params, {
                    row["STATUS_ID"]: row["NAME"] for row in rows
                })
            elif field_type == "crm_category":
                control = select_field(params, category_options)
            elif field_type == "crm_currency":
                control = select_field(params, currency_options)
            elif field_type == "enumeration":
                control = select_field(params, {
                    row.get("ID", row.get("id")): row.get("VALUE", row.get("value"))
                    for row in field.get("items", [])
                })
            elif field_type == "crm_multifield":
                control = multifields(value)
            elif field_type == "crm_company":
                control = input_field({**params, "TYPE": "number"})
                ids = [
                    int(company_id) for company_id in (value if isinstance(value, list) else [value])
                    if str(company_id).isdigit() and int(company_id) > 0
                ]
                if ids:
                    companies = client.crm.item.list(
                        entity_type_id=4,
                        filter={"@id": ids},
                        select=["id", "title"],
                    ).response.result["items"]
                    title_by_id = {str(company["id"]): company["title"] for company in companies}
                    titles = [title_by_id.get(str(company_id), f"ID {company_id}") for company_id in ids]
                    control += f" ({escape(', '.join(titles))})"
            elif field_type == "crm_lead":
                control = input_field({**params, "TYPE": "number"})
                if str(value).isdigit() and int(value) > 0:
                    try:
                        lead = client.crm.item.get(
                            entity_type_id=1,
                            bitrix_id=int(value),
                        ).response.result["item"]
                        control += f" ({escape(str(lead['title']))})"
                    except Exception as error:
                        diagnostics.append(f"Название лида ID {value} недоступно: {error}")
            elif field_type == "user":
                control = input_field({**params, "TYPE": "number"})
                ids = [
                    int(user_id) for user_id in (value if isinstance(value, list) else [value])
                    if str(user_id).isdigit() and int(user_id) > 0
                ]
                if ids:
                    users = client.user.get(filter={"ID": ids}).response.result
                    names = [
                        " ".join(
                            str(part) for part in (user.get("NAME"), user.get("LAST_NAME"))
                            if part not in (None, "")
                        )
                        for user in users
                    ]
                    control += f" ({escape(', '.join(names))})"
            elif key == "comments":
                control = textarea_field(params)
            elif field_type in ("file", "resourcebooking"):
                control = f"Тип {escape(str(field_type))} в примере не поддерживается"
            elif field_type == "date":
                control = input_field({
                    **params, "VALUE": str(value)[:10] if value != "" else "", "TYPE": "date",
                })
            elif field_type == "datetime":
                control = input_field({
                    **params, "VALUE": str(value)[:19] if value != "" else "", "TYPE": "datetime-local",
                })
            elif field_type in ("boolean", "char"):
                control = input_field({
                    **params, "REQUIRED": False, "VALUE": "Y",
                    "CHECKED": value == "Y", "TYPE": "checkbox",
                })
            elif field_type in ("integer", "double"):
                control = input_field({
                    **params, "TYPE": "number", "STEP": "any" if field_type == "double" else "",
                })
            elif field_type == "money":
                amount, _, currency = str(value).partition("|")
                control = input_field({
                    **params, "VALUE": amount, "TYPE": "number", "STEP": "any",
                })
                control += select_field({
                    **params, "NAME": f"form[{key}_CURRENCY]", "VALUE": currency,
                }, currency_options)
            else:
                control = input_field({**params, "TYPE": "text"})

            label = escape(str(field.get("formLabel") or field.get("title") or key))
            block = f'<div class="col-4 mt-3">{label}: </div><div class="col-6 mt-3">{control}</div>'
            if key.startswith("UF_"):
                custom += block
            else:
                standard += block

        hidden_id = (
            f'<input type="hidden" name="form[id]" value="{escape(str(item["id"]))}">'
            if "id" in item else ""
        )
        diagnostic_html = (
            '<div class="alert alert-warning">'
            + "<br>".join(escape(str(message)) for message in diagnostics)
            + "</div>"
            if diagnostics else ""
        )
        return PAGE % {
            "hidden_id": hidden_id, "diagnostics": diagnostic_html,
            "standard": standard, "custom": custom,
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

        const ENTITY_TYPE_ID = 3;
        const SKIPPED_FIELDS = [
            'companyId', 'companies', 'hasPhone', 'hasEmail', 'hasImol',
            'birthdaySort', 'fullName', 'id', 'createdBy', 'updatedBy',
            'createdTime', 'updatedTime', 'lastCommunicationTime',
        ];
        $rawId = trim((string)($_GET['ID'] ?? ''));
        $ID = preg_match('/^\d+$/D', $rawId) === 1 ? (int)$rawId : 0;

        function callCore($sb, string $method, array $params): array
        {
            return $sb->core->call($method, $params)->getResponseData()->getResult();
        }

        function esc($value): string
        {
            return htmlspecialchars((string)($value ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
        }

        function inputField(array $params): string
        {
            $current = !empty($params['MULTIPLE'])
                ? (is_array($params['VALUE']) ? $params['VALUE'] : [$params['VALUE'] ?? ''])
                : [$params['VALUE'] ?? ''];
            $values = !empty($params['MULTIPLE']) ? array_merge($current, ['']) : $current;
            $html = '';
            foreach ($values as $index => $value)
            {
                $html .= '<input class="form-control" name="' . esc($params['NAME'])
                    . (!empty($params['MULTIPLE']) ? '[]' : '') . '"';
                $html .= ' type="' . esc($params['TYPE'] ?? 'text') . '"';
                $html .= !empty($params['STEP']) ? ' step="' . esc($params['STEP']) . '"' : '';
                $html .= !empty($params['REQUIRED']) && $index === 0 ? ' required' : '';
                $html .= !empty($params['CHECKED']) ? ' checked' : '';
                $html .= ' value="' . esc($value) . '">';
            }
            return $html;
        }

        function textareaField(array $params): string
        {
            return '<textarea class="form-control" name="' . esc($params['NAME']) . '"'
                . (!empty($params['REQUIRED']) ? ' required' : '') . '>'
                . esc($params['VALUE'] ?? '') . '</textarea>';
        }

        function selectField(array $params, array $options): string
        {
            $html = '<select class="form-control" name="' . esc($params['NAME'])
                . (!empty($params['MULTIPLE']) ? '[]' : '') . '"';
            $html .= !empty($params['REQUIRED']) ? ' required' : '';
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
                $html .= '<option value="' . esc($key) . '"' . $selected . '>'
                    . esc($title) . '</option>';
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
                $itemId = $row['id'] ?? '';
                $html .= '<div class="border rounded p-2 mb-2">';
                $html .= '<input type="hidden" name="fm[' . $index . '][id]" value="' . esc($itemId) . '">';
                $html .= '<select class="form-control mb-1" name="fm[' . $index . '][typeId]">' . $options . '</select>';
                $html .= '<input class="form-control mb-1" name="fm[' . $index . '][valueType]" value="'
                    . esc($row['valueType'] ?? 'WORK') . '" placeholder="WORK">';
                $html .= '<input class="form-control mb-1" name="fm[' . $index . '][value]" value="'
                    . esc($row['value'] ?? '') . '" placeholder="Значение">';
                if ($itemId !== '' && $itemId !== null)
                {
                    $html .= '<label><input type="checkbox" name="fm[' . $index
                        . '][delete]" value="Y"> Удалить</label>';
                }
                $html .= '</div>';
            }
            return $html;
        }

        $fields = callCore($sb, 'crm.item.fields', [
            'entityTypeId' => ENTITY_TYPE_ID,
            'useOriginalUfNames' => 'Y',
        ])['fields'];
        $currencies = callCore($sb, 'crm.currency.list', []);
        $categories = callCore($sb, 'crm.category.list', [
            'entityTypeId' => ENTITY_TYPE_ID,
        ])['categories'];
        $item = $ID > 0 ? callCore($sb, 'crm.item.get', [
            'entityTypeId' => ENTITY_TYPE_ID,
            'id' => $ID,
            'useOriginalUfNames' => 'Y',
        ])['item'] : [];
        $currencyOptions = [];
        foreach ($currencies as $currency)
        {
            $currencyOptions[$currency['CURRENCY']] = $currency['FULL_NAME'];
        }
        $categoryOptions = [];
        foreach ($categories as $category)
        {
            $categoryOptions[$category['id']] = $category['name'];
        }

        $standard = '';
        $custom = '';
        $diagnostics = [];
        foreach ($fields as $key => $field)
        {
            if (!empty($field['isReadOnly']) || !empty($field['isImmutable'])
                || in_array($key, SKIPPED_FIELDS, true)) continue;
            $value = $key === 'categoryId' ? ($item[$key] ?? 0) : ($item[$key] ?? '');
            $params = [
                'NAME' => 'form[' . $key . ']', 'VALUE' => $value,
                'REQUIRED' => $field['isRequired'], 'MULTIPLE' => $field['isMultiple'],
            ];
            $control = '';

            if ($field['type'] === 'crm_status')
            {
                $options = [];
                foreach (callCore($sb, 'crm.status.list', [
                    'filter' => ['ENTITY_ID' => $field['statusType']],
                ]) as $row)
                {
                    $options[$row['STATUS_ID']] = $row['NAME'];
                }
                $control = selectField($params, $options);
            }
            elseif ($field['type'] === 'crm_category')
            {
                $control = selectField($params, $categoryOptions);
            }
            elseif ($field['type'] === 'crm_currency')
            {
                $control = selectField($params, $currencyOptions);
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
                $ids = array_values(array_filter(array_map('intval', (array)$value)));
                if ($ids)
                {
                    $companyResult = callCore($sb, 'crm.item.list', [
                        'entityTypeId' => 4,
                        'filter' => ['@id' => $ids],
                        'select' => ['id', 'title'],
                    ]);
                    $titleById = [];
                    foreach ($companyResult['items'] as $company)
                    {
                        $titleById[(string)$company['id']] = $company['title'];
                    }
                    $titles = [];
                    foreach ($ids as $companyId)
                    {
                        $titles[] = $titleById[(string)$companyId] ?? 'ID ' . $companyId;
                    }
                    $control .= ' (' . esc(implode(', ', $titles)) . ')';
                }
            }
            elseif ($field['type'] === 'crm_lead')
            {
                $control = inputField(['TYPE' => 'number'] + $params);
                if ((int)$value > 0)
                {
                    try
                    {
                        $lead = callCore($sb, 'crm.item.get', [
                            'entityTypeId' => 1,
                            'id' => (int)$value,
                        ])['item'];
                        $control .= ' (' . esc($lead['title']) . ')';
                    }
                    catch (Throwable $error)
                    {
                        $diagnostics[] = 'Название лида ID ' . $value
                            . ' недоступно: ' . $error->getMessage();
                    }
                }
            }
            elseif ($field['type'] === 'user')
            {
                $control = inputField(['TYPE' => 'number'] + $params);
                $ids = array_values(array_filter(array_map('intval', (array)$value)));
                if ($ids)
                {
                    $users = callCore($sb, 'user.get', ['filter' => ['ID' => $ids]]);
                    $names = [];
                    foreach ($users as $user)
                    {
                        $names[] = trim(($user['NAME'] ?? '') . ' ' . ($user['LAST_NAME'] ?? ''));
                    }
                    $control .= ' (' . esc(implode(', ', $names)) . ')';
                }
            }
            elseif ($key === 'comments')
            {
                $control = textareaField($params);
            }
            elseif (in_array($field['type'], ['file', 'resourcebooking'], true))
            {
                $control = 'Тип ' . esc($field['type']) . ' в примере не поддерживается';
            }
            elseif ($field['type'] === 'date')
            {
                $formatted = $value !== '' ? substr((string)$value, 0, 10) : '';
                $control = inputField(['TYPE' => 'date', 'VALUE' => $formatted] + $params);
            }
            elseif ($field['type'] === 'datetime')
            {
                $formatted = $value !== ''
                    ? substr(str_replace(' ', 'T', (string)$value), 0, 19)
                    : '';
                $control = inputField(['TYPE' => 'datetime-local', 'VALUE' => $formatted] + $params);
            }
            elseif (in_array($field['type'], ['boolean', 'char'], true))
            {
                $control = inputField([
                    'TYPE' => 'checkbox', 'VALUE' => 'Y',
                    'CHECKED' => $value === 'Y', 'REQUIRED' => false,
                ] + $params);
            }
            elseif (in_array($field['type'], ['integer', 'double'], true))
            {
                $control = inputField([
                    'TYPE' => 'number',
                    'STEP' => $field['type'] === 'double' ? 'any' : '',
                ] + $params);
            }
            elseif ($field['type'] === 'money')
            {
                [$amount, $currency] = array_pad(explode('|', (string)$value, 2), 2, '');
                $control = inputField(['TYPE' => 'number', 'STEP' => 'any', 'VALUE' => $amount] + $params);
                $control .= selectField([
                    'NAME' => 'form[' . $key . '_CURRENCY]', 'VALUE' => $currency,
                ] + $params, $currencyOptions);
            }
            else
            {
                $control = inputField(['TYPE' => 'text'] + $params);
            }

            $label = esc($field['formLabel'] ?? $field['title'] ?? $key);
            $block = '<div class="col-4 mt-3">' . $label
                . ': </div><div class="col-6 mt-3">' . $control . '</div>';
            if (str_starts_with($key, 'UF_')) $custom .= $block;
            else $standard .= $block;
        }

        $diagnosticHtml = '';
        if ($diagnostics)
        {
            $diagnosticHtml = '<div class="alert alert-warning">'
                . implode('<br>', array_map('esc', $diagnostics)) . '</div>';
        }
    ?>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container">
            <form id="auto_form" method="post">
                <?php if (array_key_exists('id', $item)): ?>
                    <input type="hidden" name="form[id]" value="<?= esc($item['id']) ?>">
                <?php endif; ?>
                <?= $diagnosticHtml ?>
                <h2>Системные поля</h2><div class="row"><?= $standard ?></div>
                <h2>Пользовательские поля</h2><div class="row"><?= $custom ?></div>
                <div class="row"><div class="col-sm-10 mt-5"><input type="submit" class="btn btn-primary" value="Сохранить"></div></div>
            </form>
        </div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const body = new URLSearchParams(new FormData(event.currentTarget));
                try {
                    const response = await fetch('auto_form.php', { method: 'POST', body });
                    const text = await response.text();
                    try {
                        const json = JSON.parse(text);
                        alert(json.message || json.error || ('Код ответа ' + response.status));
                    } catch (parseError) {
                        alert('Ответ сервера не в формате JSON, код ' + response.status + ': ' + text.slice(0, 200));
                    }
                } catch (networkError) {
                    alert('Не удалось отправить форму: ' + networkError.message);
                }
            });
        </script>
    ```
{% endlist %}

## 3. Сохраним данные формы

Браузер отправляет форму обработчику в формате `application/x-www-form-urlencoded`. Обработчик повторно вызывает [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), чтобы не доверять типам из клиентского запроса.

Обработчик пропускает поля с `isReadOnly = true` и `isImmutable = true`, служебные автоматически вычисляемые поля и типы `file` и `resourcebooking`. Поле `photo` поэтому сохраняет прежнее значение.

Для остальных полей обработчик выполняет преобразование:

- `boolean` и `char`, включая обязательное поле `opened`, передает как `Y` или `N`
- `crm_company`, `crm_lead` и `user` приводит к числовым идентификаторам с учетом множественности
- `money` объединяет сумму и валюту в строку `сумма|валюта`
- отсутствующее одиночное поле передает как пустую строку, множественное — как пустой массив

Если `assignedById` отсутствует в отправленной форме, обработчик передает пустую строку. При обновлении существующего контакта Битрикс24 восстанавливает прежнего ответственного без ошибки.

### Как обработчик собирает `fm`

Каждая строка `fm` содержит скрытый `id` и видимые `typeId`, `valueType`, `value`.

- для существующего непустого значения ключом становится его числовой `id`, поэтому сервер обновляет ту же запись
- для нового непустого значения обработчик создает ключ `n0`, `n1` и так далее, поэтому сервер добавляет запись
- если существующее значение очищено или отмечено флажком **Удалить**, обработчик сохраняет его `id`, но передает пустой `value`, поэтому сервер удаляет запись
- пустые строки без `id` обработчик не передает

Все изменения `fm` отправляются одним запросом. Например, объект может выглядеть так:

```json
{
    "451": { "typeId": "PHONE", "valueType": "WORK", "value": "+7 495 111-22-33" },
    "452": { "typeId": "EMAIL", "valueType": "WORK", "value": "" },
    "n0": { "typeId": "EMAIL", "valueType": "WORK", "value": "contact@example.com" }
}
```

Запись `451` будет обновлена, `452` — удалена, `n0` — добавлена.

Если форма содержит `id`, обработчик вызывает [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md). Без `id` он вызывает [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Идентификатор сохраненного контакта находится в `result.item.id`:

```json
{
    "result": {
        "item": {
            "id": 123
        }
    }
}
```

Следующему действию нужен `result.item.id`: добавьте его в параметр `ID` адреса формы, чтобы открыть созданный контакт для редактирования.

### Полный код обработчика

Сохраните обработчик в файл: JavaScript — `save-form.mjs`, PHP — `auto_form.php`, Python — `save_form.py`.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const ENTITY_TYPE_ID = 3
    const SKIPPED_FIELDS = new Set([
        'companyId', 'companies', 'hasPhone', 'hasEmail', 'hasImol',
        'birthdaySort', 'fullName', 'id', 'createdBy', 'updatedBy',
        'createdTime', 'updatedTime', 'lastCommunicationTime',
    ])
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

    function relationValue(value, multiple) {
        const ids = asArray(value).map(Number).filter((itemId) => itemId > 0)
        return multiple ? ids : (ids[0] ?? 0)
    }

    export async function saveForm(req, res) {
        try {
            const submitted = req.body.form ?? {}
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'contact-fields-save')
            const fields = {}

            for (const [key, prop] of Object.entries(fieldResult.fields)) {
                if (SKIPPED_FIELDS.has(key) || prop.isReadOnly || prop.isImmutable
                    || ['file', 'resourcebooking'].includes(prop.type)) continue
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
                    const amount = String(value ?? '').trim()
                    const currency = String(submitted[`${key}_CURRENCY`] ?? '').trim()
                    value = amount === '' ? '' : (currency === '' ? amount : `${amount}|${currency}`)
                } else if (['crm_company', 'crm_lead', 'user'].includes(prop.type)) {
                    value = relationValue(value, prop.isMultiple)
                } else if (prop.isMultiple) {
                    value = asArray(value).filter((item) => item !== '')
                }
                fields[key] = value
            }

            const rawId = String(submitted.id ?? '').trim()
            const id = /^\d+$/.test(rawId) ? Number(rawId) : 0
            const method = id > 0 ? 'crm.item.update' : 'crm.item.add'
            const params = {
                entityTypeId: ENTITY_TYPE_ID,
                fields,
                useOriginalUfNames: 'Y',
            }
            if (id > 0) params.id = id
            const result = await call(method, params, `contact-${id > 0 ? 'update' : 'add'}`)
            res.json({ message: `Контакт сохранен, ID: ${result.item.id}` })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    ```

- Python

    ```python
    import re

    from flask import jsonify, request
    from b24pysdk import BitrixWebhook, Client

    ENTITY_TYPE_ID = 3
    SKIPPED_FIELDS = {
        "companyId", "companies", "hasPhone", "hasEmail", "hasImol",
        "birthdaySort", "fullName", "id", "createdBy", "updatedBy",
        "createdTime", "updatedTime", "lastCommunicationTime",
    }
    FORM_KEY = re.compile(r"^form\[([^]]+)](\[\])?$")
    FM_KEY = re.compile(r"^fm\[(\d+)]\[(id|typeId|valueType|value|delete)]$")
    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",
    ), timeout=60)


    def parse_form():
        result = {}
        for full_key in request.form:
            match = FORM_KEY.match(full_key)
            if not match:
                continue
            values = request.form.getlist(full_key)
            result[match.group(1)] = values if match.group(2) else values[-1]
        return result


    def parse_multifield_rows():
        rows = {}
        for full_key in request.form:
            match = FM_KEY.match(full_key)
            if match:
                rows.setdefault(int(match.group(1)), {})[match.group(2)] = request.form[full_key]
        return rows


    def build_multifields(rows):
        result = {}
        new_index = 0
        for row in rows.values():
            try:
                item_id = int(row.get("id") or 0)
            except (TypeError, ValueError):
                item_id = 0
            value = str(row.get("value") or "")
            should_delete = row.get("delete") == "Y" or value == ""
            if not item_id and should_delete:
                continue
            key = str(item_id) if item_id else f"n{new_index}"
            if not item_id:
                new_index += 1
            result[key] = {
                "typeId": str(row.get("typeId") or "PHONE"),
                "valueType": str(row.get("valueType") or "WORK"),
                "value": "" if should_delete else value,
            }
        return result


    def relation_value(value, multiple):
        values = value if isinstance(value, list) else [value]
        ids = [int(item_id) for item_id in values if str(item_id).isdigit() and int(item_id) > 0]
        return ids if multiple else (ids[0] if ids else 0)


    def save_form():
        try:
            submitted = parse_form()
            field_result = client.crm.item.fields(
                entity_type_id=ENTITY_TYPE_ID,
                use_original_uf_names=True,
            ).response.result
            fields = {}

            for key, prop in field_result["fields"].items():
                if (key in SKIPPED_FIELDS or prop.get("isReadOnly")
                        or prop.get("isImmutable")
                        or prop.get("type") in ("file", "resourcebooking")):
                    continue
                field_type = prop.get("type")
                if field_type in ("boolean", "char"):
                    fields[key] = "Y" if key in submitted else "N"
                    continue
                if field_type == "crm_multifield":
                    fields[key] = build_multifields(parse_multifield_rows())
                    continue
                if key not in submitted:
                    fields[key] = [] if prop.get("isMultiple") else ""
                    continue

                value = submitted[key]
                if field_type == "money":
                    amount = str(value or "").strip()
                    currency = str(submitted.get(f"{key}_CURRENCY", "") or "").strip()
                    value = "" if amount == "" else (amount if currency == "" else f"{amount}|{currency}")
                elif field_type in ("crm_company", "crm_lead", "user"):
                    value = relation_value(value, bool(prop.get("isMultiple")))
                elif prop.get("isMultiple"):
                    values = value if isinstance(value, list) else [value]
                    value = [item for item in values if item != ""]
                fields[key] = value

            try:
                item_id = int(submitted.get("id") or 0)
            except (TypeError, ValueError):
                item_id = 0
            if item_id > 0:
                response = client.crm.item.update(
                    entity_type_id=ENTITY_TYPE_ID,
                    bitrix_id=item_id,
                    fields=fields,
                    use_original_uf_names=True,
                ).response
            else:
                response = client.crm.item.add(
                    entity_type_id=ENTITY_TYPE_ID,
                    fields=fields,
                    use_original_uf_names=True,
                ).response

            return jsonify(message=f"Контакт сохранен, ID: {response.result['item']['id']}")
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

        const ENTITY_TYPE_ID = 3;
        const SKIPPED_FIELDS = [
            'companyId', 'companies', 'hasPhone', 'hasEmail', 'hasImol',
            'birthdaySort', 'fullName', 'id', 'createdBy', 'updatedBy',
            'createdTime', 'updatedTime', 'lastCommunicationTime',
        ];
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

        function relationValue($value, bool $multiple)
        {
            $ids = array_values(array_filter(array_map('intval', (array)$value)));
            return $multiple ? $ids : ($ids[0] ?? 0);
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
                if (in_array($key, SKIPPED_FIELDS, true)
                    || !empty($prop['isReadOnly'])
                    || !empty($prop['isImmutable'])
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
                    $fields[$key] = buildMultifields(
                        is_array($_POST['fm'] ?? null) ? $_POST['fm'] : []
                    );
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
                    $amount = trim((string)$value);
                    $currency = trim((string)($submitted[$key . '_CURRENCY'] ?? ''));
                    $value = $amount === '' ? '' : ($currency === '' ? $amount : $amount . '|' . $currency);
                }
                elseif (in_array($prop['type'], ['crm_company', 'crm_lead', 'user'], true))
                {
                    $value = relationValue($value, !empty($prop['isMultiple']));
                }
                elseif (!empty($prop['isMultiple']))
                {
                    $value = array_values(array_filter(
                        (array)$value,
                        static fn($item) => $item !== ''
                    ));
                }
                $fields[$key] = $value;
            }

            $rawId = trim((string)($submitted['id'] ?? ''));
            $id = preg_match('/^\d+$/D', $rawId) === 1 ? (int)$rawId : 0;
            $method = $id > 0 ? 'crm.item.update' : 'crm.item.add';
            $params = [
                'entityTypeId' => ENTITY_TYPE_ID,
                'fields' => $fields,
                'useOriginalUfNames' => 'Y',
            ];
            if ($id > 0) $params['id'] = $id;
            $result = callCore($sb, $method, $params);
            echo json_encode(
                ['message' => 'Контакт сохранен, ID: ' . $result['item']['id']],
                JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
            );
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
2. Заполните имя или фамилию, выберите обращение, тип контакта, источник и направление
3. Укажите комментарий в BBCode, например `[b]Контакт для повторного звонка[/b]`
4. В первой свободной строке `fm` оставьте `PHONE` и `WORK`, введите телефон. Во второй строке выберите `EMAIL`, оставьте `WORK` и введите адрес почты
5. Добавьте два идентификатора компаний в нужном порядке и при необходимости идентификатор лида. Подходящие идентификаторы получите методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с `entityTypeId = 4` для компаний и `entityTypeId = 1` для лидов или скопируйте их из адреса карточки в Битрикс24
6. Нажмите **Сохранить** и скопируйте идентификатор контакта из сообщения
7. Откройте форму с этим идентификатором и проверьте имя, фамилию, направление, компании, лид, комментарий и все строки `fm`
8. Измените телефон, отметьте старый адрес почты флажком **Удалить**, добавьте новый адрес почты и снова сохраните форму
9. В инструментах разработчика браузера удалите элемент с `name="form[assignedById]"`, сохраните форму и убедитесь, что прежний ответственный остался без ошибки
10. Вызовите [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с `entityTypeId = 3`, полученным `id` и `useOriginalUfNames = Y`. Сравните `result.item` с формой и проверьте `name`, `lastName`, `companyIds` и `fm`

Отдельно проверьте правило имени: у существующего контакта очистите одновременно `name` и `lastName`. [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) должен вернуть ошибку `CRM_FIELD_ERROR_REQUIRED`. При создании контакта с пустыми `name` и `lastName` Битрикс24 подставляет название по умолчанию, но пример рекомендует заполнить хотя бы одно поле.

## Ошибки и диагностика

#|
|| Признак | Что проверить и исправить ||
|| Первый запрос к Битрикс24 завершается ошибкой авторизации | Проверьте полный адрес вебхука, идентификатор пользователя и секретный токен. Убедитесь, что в Python `domain` не содержит `https://`, а `webhook_token` содержит только `USER_ID/TOKEN`. В PHP и Python адрес указывается и в генераторе, и в обработчике. После исправления перезагрузите страницу формы ||
|| `ACCESS_DENIED` | Выдайте пользователю вебхука права на чтение, добавление и изменение контактов, чтение связанных компаний и лидов, а также доступ к настройкам CRM. После исправления перезагрузите страницу формы ||
|| [user.get](../../../api-reference/user/user-get.md) возвращает ошибку доступа | Добавьте вебхуку scope [`user_brief`](../../../api-reference/scopes/permissions.md), затем перезагрузите страницу формы ||
|| Форма открылась пустой или [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает ошибку | Нечисловой, нулевой и отрицательный `ID` пример преобразует в `0` и открывает форму нового контакта. Проверьте, что контакт с таким идентификатором существует и доступен пользователю вебхука, затем откройте форму с корректным `ID` ||
|| `CRM_FIELD_ERROR_REQUIRED` с сообщением о полях «Имя» и «Фамилия» | У существующего контакта нельзя очистить имя и фамилию одновременно. Заполните хотя бы одно поле и повторно отправьте форму ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Проверьте значение поля, названного в `error_description`: код обращения, типа контакта или источника, идентификатор компании, лида или пользователя. Исправьте значение и повторно отправьте форму ||
|| После снятия всех значений множественного пользовательского поля типа «список» прежние значения остались | Обработчик отправляет пустой массив, запрос [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) проходит успешно, но [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает прежние значения. Способ очистки в примере не реализован ||
|| Вместо названия связанного лида показано сообщение | У пользователя вебхука нет права читать этот лид. Оставьте `leadId` без изменения или выдайте право на чтение лида, затем перезагрузите страницу формы ||
|| PHP не запускается после установки зависимостей | Выполните `composer check-platform-reqs`, включите расширения `bcmath`, `curl`, `intl` и `json`, затем перезапустите PHP-сервер ||
|#

## Что важно учитывать

- Поле `companyId` устарело, но `companyIds` доступно в универсальных методах и не является устаревшим. При сохранении порядок идентификаторов сохраняется через `SORT`, первая компания становится основной, роли существующих привязок сохраняются, а новые привязки получают роль по умолчанию
- Форма управляет только списком `companyIds` и не редактирует `ROLE_ID`, признак основной компании и `SORT` напрямую. Расширенные свойства привязок получайте методом [crm.contact.company.items.get](../../../api-reference/crm/contacts/company/crm-contact-company-items-get.md), заменяйте методом [crm.contact.company.items.set](../../../api-reference/crm/contacts/company/crm-contact-company-items-set.md), добавляйте методом [crm.contact.company.add](../../../api-reference/crm/contacts/company/crm-contact-company-add.md) и удаляйте методом [crm.contact.company.delete](../../../api-reference/crm/contacts/company/crm-contact-company-delete.md)
- У системного поля `photo` свои правила. Универсальный [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) фотографию не принимает: и массив `["photo.jpg", "Base64"]`, и объект `{"fileData": ["photo.jpg", "Base64"]}` возвращают ошибку. Задать фото можно методом [crm.contact.update](../../../api-reference/crm/contacts/crm-contact-update.md), передав в поле `PHOTO` объект `{"fileData": ["photo.jpg", "Base64"]}`. Обратно [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) вернет фотографию числом — идентификатором файла, например `36933`
- Пользовательское файловое поле устроено наоборот: файл загружают [массивом из имени файла и содержимого в Base64](../../../api-reference/files/how-to-upload-files.md#array) через [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с `useOriginalUfNames = Y`, а вариант с `fileData` проходит без ошибки, но поле остается пустым. В ответе такое поле приходит объектом с ключами `id`, `url` и `urlMachine`. Оба адреса ведут на служебную выгрузку файла и могут содержать данные авторизации: не записывайте их в логи, отчеты и сообщения об ошибках и не передавайте третьим лицам
- Пользовательское поле типа `money` принимает и просто сумму, и сумму с валютой. Если отправить `1234.56`, Битрикс24 сам добавит валюту по умолчанию и сохранит `1234.56|RUB`. Если суммы нет, поле очищается: значения `""`, `|RUB` и `RUB` сохраняются как пустое — поэтому обработчик и отправляет пустую строку, когда поле не заполнено. Код валюты не проверяется, `1234.56|XXX` сохранится как есть
- Множественное пользовательское поле типа `money` требует отдельной реализации нескольких пар «сумма — валюта»
- Чтобы сохранить значение отсутствующего в форме поля, добавьте его в список пропускаемых полей
- [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) возвращает не более 50 элементов на странице. Если у контакта больше 50 связанных компаний или значений множественного поля `user`, добавьте обработку следующих страниц
- [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) и [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) возвращают не более 50 записей за один вызов. Пример получает только первую страницу, поэтому в рабочем приложении добавьте запрос следующих страниц через `start`
- В рабочем приложении добавьте собственную аутентификацию, проверку CSRF и безопасное журналирование ошибок

## Продолжите изучение

- [{#T}](./how-to-generate-edit-form-for-lead.md)
- [{#T}](./how-to-generate-edit-form-for-company.md)
- [{#T}](./how-to-generate-edit-form-for-deal.md)
