# Как сделать свою карточку редактирования компании

> Scope: [`crm, user_brief`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователи с правом «чтения» элементов объекта CRM, правом «добавления» элемента объекта CRM, правом «изменения» элементов объекта CRM и доступом к настройкам CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пример показывает, как создать отдельную веб-страницу для работы с компаниями из CRM. Такая страница пригодится, если вам нужно создавать и редактировать компании в собственном интерфейсе, например в приложении. Стандартная карточка CRM при этом не изменяется.

Набор полей формы не задан в коде вручную. Страница получает от Битрикс24 описание полей компании и по нему строит HTML-форму. За счет этого форма учитывает системные и пользовательские поля и их настройки.

Если открыть страницу без идентификатора компании, форма будет пустой, а после сохранения в Битрикс24 появится новая компания. Если передать идентификатор существующей компании, форма загрузит ее данные и сохранит изменения в этой компании.

Для каждого языка пример состоит из двух файлов:

- генератор получает описание полей и данные существующей компании, затем строит HTML-форму
- обработчик получает заполненные значения формы и сохраняет их в Битрикс24

## Как работает сценарий

1. Метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) возвращает описание полей компании в `result.fields`
2. Для редактирования метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает компанию в `result.item`
3. Генератор сопоставляет каждому типу поля элемент HTML-формы
4. Обработчик повторно получает описание полей и принимает только доступные для изменения поля
5. Метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) создает компанию, а [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) обновляет ее
6. Оба метода возвращают сохраненную компанию в `result.item`

Форма получает дополнительные данные, чтобы показывать имя контакта, имя сотрудника и название валюты вместо служебных кодов. Для этого она использует методы [crm.status.list](../../../api-reference/crm/status/crm-status-list.md), [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md), [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) и [user.get](../../../api-reference/user/user-get.md).

Из ответов и описания полей форма берет:

- из [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) — `STATUS_ID` и `NAME`
- из [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) — `CURRENCY` и `FULL_NAME`
- из [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) для контактов — `id`, `name` и `lastName`
- из [user.get](../../../api-reference/user/user-get.md) — `NAME` и `LAST_NAME`
- для типа `enumeration` — значения из `items` в описании поля

## 1. Подготовим окружение

Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#incoming-webhook) с правами `crm` и `user_brief`. Для первого запуска можно создать вебхук от имени администратора. Это рекомендация, а не требование REST: пользователю вебхука нужны право «чтения» элементов объекта CRM, право «добавления» элемента объекта CRM, право «изменения» элементов объекта CRM и доступ к настройкам CRM.

Вебхук выполняет запросы с правами создавшего его пользователя. Не публикуйте файлы со значением вебхука в открытых репозиториях.

Выберите один язык, создайте для примера отдельную папку и откройте в ней терминал. Сохраните код из шагов 2 и 3 в два соответствующих файла, затем выполните команду запуска. Не закрывайте окно терминала, пока работаете с формой.

Перед установкой зависимостей проверьте версию PHP командой `php -v`, а список подключенных расширений — командой `php -m`. B24PhpSDK версии 3 требует PHP 8.4 или 8.5. B24PhpSDK и его зависимости требуют расширения `bcmath`, `curl`, `intl` и `json`.

- JavaScript
    - файлы — `form.mjs` и `save-form.mjs`
    - зависимости — `npm install express @bitrix24/b24jssdk`
    - запуск в Bash — `B24_HOOK='https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/' node form.mjs`
    - запуск в PowerShell — `$env:B24_HOOK='https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'; node form.mjs`
    - адрес — `http://localhost:3000/`
- PHP
    - файлы — `index.php` и `auto_form.php`
    - зависимости — `composer require bitrix24/b24phpsdk:^3.0`
    - запуск — `php -S localhost:8000`
    - адрес — `http://localhost:8000/index.php`
- Python
    - файлы — `app.py` и `save_form.py`
    - зависимости — `pip install b24pysdk flask`
    - запуск — `python app.py`
    - адрес — `http://localhost:5000/`

В PHP форма отправляет данные обработчику `auto_form.php` по относительному пути.

В примерах замените значения:

- `your-domain.bitrix24.ru` — домен вашего Битрикс24
- `USER_ID/TOKEN` — идентификатор пользователя и секретный код из URL вебхука

Для JavaScript передайте полный URL в переменной окружения `B24_HOOK` при запуске. Для PHP замените URL в вызовах `initFromWebhook` в обоих файлах. Для Python замените значения `domain` и `webhook_token` в обоих файлах.

## 2. Создадим форму компании

Методы [crm.item.*](../../../api-reference/crm/universal/index.md) получают тип объекта CRM в параметре `entityTypeId`. Для компании передайте значение `4`.

Чтобы методы возвращали пользовательские поля с исходными именами вида `UF_*` и принимали эти же имена при сохранении, передайте `useOriginalUfNames = Y`. В Python SDK этому параметру соответствует `use_original_uf_names = True`.

Получите описание полей методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md). Для каждого поля используйте ключи:

- `type` — тип поля
- `isRequired` — обязательность
- `isReadOnly` — доступность для изменения
- `isMultiple` — множественность

Сокращенный ответ [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) показывает, как описаны поля разных типов:

```json
{
    "result": {
        "fields": {
            "title": {
                "type": "string",
                "isRequired": true,
                "isReadOnly": false,
                "isMultiple": false
            },
            "createdTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": true,
                "isMultiple": false
            },
            "opened": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isMultiple": false
            }
        }
    }
}
```

Ответ сокращен до трех полей, чтобы показать формат описания. Набор полей отличается у разных типов объектов CRM.

При редактировании передайте идентификатор компании в параметре `id` метода [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md). В ответе имена системных полей будут в camelCase, например `title` и `contactIds`.

### Как форма работает с мультиполями

Телефоны, email, сайты и мессенджеры хранятся в едином поле `fm`. Каждый элемент `result.item.fm` содержит:

- `id` — идентификатор существующего значения
- `typeId` — тип мультиполя, например `PHONE` или `EMAIL`
- `valueType` — тип значения, например `WORK` или `MOBILE`
- `value` — телефон, адрес или другое значение

Генератор выводит отдельную строку для каждого существующего значения и сохраняет его `id` в скрытом поле. В конце формы он добавляет три пустые строки для новых значений.

Для типов со специальной обработкой пример создает следующие элементы.

| Тип поля | Элемент формы |
|---|---|
| `crm_status` | Выпадающий список со значениями из [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) |
| `enumeration` | Выпадающий список со значениями из `items` |
| `crm_multifield` | Строки для типа, вида и значения телефона, email, сайта или мессенджера |
| `crm_lead` | Текстовое поле для идентификатора и подпись с названием лида |
| `crm_contact` | Числовое поле для идентификатора контакта и подпись с его именем |
| `user` | Числовое поле для идентификатора и подпись с именем сотрудника из [user.get](../../../api-reference/user/user-get.md) |
| `date` | Поле выбора даты |
| `boolean`, `char` | Флажок |
| `money` | Числовое поле и список валют |
| `file`, `resourcebooking` | Сообщение о неподдерживаемом типе вместо поля ввода |

### Полный код генератора формы

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Сохраните код в файл генератора: JavaScript — `form.mjs`, PHP — `index.php`, Python — `app.py`.

{% list tabs %}

- JS

    ```javascript
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'
    import { saveForm } from './save-form.mjs'

    const ENTITY_TYPE_ID = 4
    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const app = express()
    app.use(express.urlencoded({ extended: true }))
    const SKIPPED_FIELDS = new Set(['contacts'])
    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })
        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
        return response.getData().result
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;')
    }

    function input(p) {
        const current = p.MULTIPLE
            ? (Array.isArray(p.VALUE) ? p.VALUE : [p.VALUE ?? ''])
            : [p.VALUE ?? '']
        const values = p.MULTIPLE ? [...current, ''] : current

        return values.map((value, index) => {
            let html = '<input class="form-control"'
            if (p.NAME) html += ` name="${escapeHtml(p.NAME)}${p.MULTIPLE ? '[]' : ''}"`
            if (p.TYPE) html += ` type="${escapeHtml(p.TYPE)}"`
            if (p.STEP) html += ` step="${escapeHtml(p.STEP)}"`
            if (p.REQUIRED && index === 0) html += ' required'
            if (p.DISABLE) html += ' disabled'
            if (p.CHECKED) html += ' checked'
            html += ` value="${escapeHtml(value)}">`
            return html
        }).join('')
    }

    function select(p, list) {
        if (!list || !Object.keys(list).length) return ''
        let html = '<select class="form-control"'
        if (p.NAME) html += ` name="${escapeHtml(p.NAME)}${p.MULTIPLE ? '[]' : ''}"`
        if (p.REQUIRED) html += ' required'
        if (p.DISABLE) html += ' disabled'
        if (p.MULTIPLE) html += ' multiple'
        html += '>'
        if (!p.REQUIRED && !p.MULTIPLE) html += '<option value="">-- Не выбрано --</option>'

        const value = Array.isArray(p.VALUE) ? p.VALUE.map(String) : [String(p.VALUE ?? '')]
        for (const [key, title] of Object.entries(list)) {
            const selected = value.includes(String(key)) ? ' selected' : ''
            html += `<option value="${escapeHtml(key)}"${selected}>${escapeHtml(title)}</option>`
        }
        return html + '</select>'
    }

    function multifields(values = []) {
        const rows = [
            ...(Array.isArray(values) ? values : []),
            ...Array.from({ length: 3 }, () => ({ id: '', typeId: 'PHONE', valueType: 'WORK', value: '' })),
        ]

        return rows.map((row, index) => {
            const types = ['PHONE', 'EMAIL', 'WEB', 'IM']
                .map((type) => `<option value="${type}"${row.typeId === type ? ' selected' : ''}>${type}</option>`)
                .join('')
            return `<div class="border rounded p-2 mb-2">
                <input type="hidden" name="fm[${index}][id]" value="${escapeHtml(row.id)}">
                <select class="form-control mb-1" name="fm[${index}][typeId]">${types}</select>
                <input class="form-control mb-1" name="fm[${index}][valueType]" value="${escapeHtml(row.valueType || 'WORK')}" placeholder="WORK">
                <input class="form-control mb-1" name="fm[${index}][value]" value="${escapeHtml(row.value)}" placeholder="Значение">
                ${row.id ? `<label><input type="checkbox" name="fm[${index}][delete]" value="Y"> Удалить</label>` : ''}
            </div>`
        }).join('')
    }

    app.get('/', async (req, res) => {
        const id = parseInt(String(req.query.ID ?? '0'), 10) || 0

        try {
            const arResult = {}
            const fieldResult = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID,
                useOriginalUfNames: 'Y',
            }, 'company-fields')
            arResult.FIELDS = fieldResult.fields
            arResult.FIELD_VALUES_CURRENCY = await call('crm.currency.list', {}, 'currencies')

            if (id > 0) {
                const itemResult = await call('crm.item.get', {
                    entityTypeId: ENTITY_TYPE_ID,
                    id,
                    useOriginalUfNames: 'Y',
                }, 'company')
                arResult.ITEM = itemResult.item
            }

            let standard = ''
            let custom = ''
            for (const [key, field] of Object.entries(arResult.FIELDS)) {
                if (SKIPPED_FIELDS.has(key)) continue
                let value = arResult.ITEM?.[key] ?? ''
                let listKey = arResult['FIELD_VALUES_' + key] ?? []
                let list = {}
                let ret = ''
                const params = { NAME: `form[${key}]`, REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple, VALUE: value }
                switch (field.type) {
                case 'crm_status':
                    if (!listKey.length) {
                        listKey = await call(
                            'crm.status.list',
                            { filter: { ENTITY_ID: field.statusType } },
                            `status-${key}`,
                        )
                    }
                    list = Object.fromEntries(listKey.map((s) => [s.STATUS_ID, s.NAME]))
                    ret = select(params, list)
                    break
                case 'crm_currency':
                    list = Object.fromEntries(arResult.FIELD_VALUES_CURRENCY.map((c) => [c.CURRENCY, c.FULL_NAME]))
                    ret = select(params, list)
                    break
                case 'enumeration':
                    if (field.items) {
                        list = Object.fromEntries(field.items.map((it) => [it.ID ?? it.id, it.VALUE ?? it.value]))
                    }
                    ret = select(params, list)
                    break
                case 'crm_multifield':
                    ret = multifields(value)
                    break
                case 'crm_lead': {
                    ret = input({ ...params, TYPE: 'text' })
                    if (value) {
                        const leadResult = await call('crm.item.get', {
                            entityTypeId: 1,
                            id: Number(value),
                        }, `lead-${key}`)
                        ret += ` (${escapeHtml(leadResult.item.title)})`
                    }
                    break
                }
                case 'crm_contact': {
                    ret = input({ ...params, TYPE: 'number' })
                    const ids = (Array.isArray(value) ? value : [value])
                        .map(Number)
                        .filter((contactId) => contactId > 0)
                    if (ids.length) {
                        const contactResult = await call('crm.item.list', {
                            entityTypeId: 3,
                            filter: { '@id': ids },
                            select: ['id', 'name', 'lastName'],
                        }, `contacts-${key}`)
                        const contacts = contactResult.items
                        if (contacts.length) {
                            const names = contacts.map((contact) => [contact.name, contact.lastName].filter(Boolean).join(' '))
                            ret += ` (${escapeHtml(names.join(', '))})`
                        }
                    }
                    break
                }
                case 'file':
                    ret = 'Тип file в примере не поддерживается'
                    break
                case 'date':
                    if (value) value = String(value).slice(0, 10)
                    ret = input({ ...params, VALUE: value, TYPE: 'date' })
                    break
                case 'datetime':
                    if (value) value = String(value).slice(0, 19)
                    ret = input({ ...params, VALUE: value, TYPE: 'datetime-local' })
                    break
                case 'char':
                    ret = input({ ...params, REQUIRED: false, VALUE: 'Y', CHECKED: value === 'Y', TYPE: 'checkbox' })
                    break
                case 'boolean':
                    ret = input({ ...params, REQUIRED: false, VALUE: 'Y', CHECKED: value === 'Y', TYPE: 'checkbox' })
                    break
                case 'double':
                    ret = input({ ...params, TYPE: 'number', STEP: 'any' })
                    break
                case 'integer':
                    ret = input({ ...params, TYPE: 'number' })
                    break
                case 'user': {
                    ret = input({ ...params, TYPE: 'number' })
                    if (value) {
                        const users = await call('user.get', { filter: { ID: value } }, `user-${key}`)
                        if (users.length) {
                            const names = users.map((user) => [user.NAME, user.LAST_NAME].filter(Boolean).join(' '))
                            ret += ` (${escapeHtml(names.join(', '))})`
                        }
                    }
                    break
                }
                case 'money': {
                    const [money, currency] = String(value).split('|')
                    ret = input({ ...params, VALUE: money, TYPE: 'number', STEP: 'any' })
                    list = Object.fromEntries(arResult.FIELD_VALUES_CURRENCY.map((c) => [c.CURRENCY, c.FULL_NAME]))
                    ret += select({ NAME: `form[${key}_CURRENCY]`, REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple, VALUE: currency }, list)
                    break
                }
                case 'resourcebooking':
                    ret = 'Тип resourcebooking в примере не поддерживается'
                    break
                default:
                    ret = input({ ...params, TYPE: 'text' })
                    break
            }

                const label = escapeHtml(field.formLabel || field.title || key)
                const block = `<div class="col-4 mt-3">${label}: </div><div class="col-6 mt-3">${ret}</div>`
                if (key.startsWith('UF_')) custom += block
                else standard += block
            }

            res.send(`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
                <div class="container">
                    <form id="auto_form" method="post">
                        ${arResult.ITEM?.id ? `<input type="hidden" name="form[id]" value="${escapeHtml(arResult.ITEM.id)}">` : ''}
                        <h2>Системные поля</h2>
                        <div class="row">${standard}</div>
                        <h2>Пользовательские поля</h2>
                        <div class="row">${custom}</div>
                        <div class="row"><div class="col-sm-10 mt-5">
                            <input type="submit" class="btn btn-primary" value="Сохранить">
                        </div></div>
                    </form>
                </div>
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

        const ENTITY_TYPE_ID = 4;
        $ID = (int)($_REQUEST['ID'] ?? 0);

        class CPrintForm
        {
            public static function escape($value): string
            {
                return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            }

            public static function input($arParams)
            {
                $sResult = '';
                $current = !empty($arParams['MULTIPLE'])
                    ? (is_array($arParams['VALUE']) ? $arParams['VALUE'] : [$arParams['VALUE'] ?? ''])
                    : [$arParams['VALUE'] ?? ''];
                if (!empty($arParams['MULTIPLE']))
                {
                    $current[] = '';
                }

                foreach ($current as $index => $value)
                {
                    $sResult .= '<input class="form-control"';
                    if (!empty($arParams['NAME']))
                    {
                        $sResult .= ' name="' . self::escape($arParams['NAME']) . (!empty($arParams['MULTIPLE']) ? '[]' : '') . '"';
                    }
                    if (!empty($arParams['TYPE']))
                    {
                        $sResult .= ' type="' . self::escape($arParams['TYPE']) . '"';
                    }
                    if (!empty($arParams['STEP']))
                    {
                        $sResult .= ' step="' . self::escape($arParams['STEP']) . '"';
                    }
                    if (!empty($arParams['REQUIRED']) && $index === 0)
                    {
                        $sResult .= ' required';
                    }
                    if (!empty($arParams['DISABLE']))
                    {
                        $sResult .= ' disabled';
                    }
                    if (!empty($arParams['CHECKED']))
                    {
                        $sResult .= ' checked';
                    }
                    $sResult .= ' value="' . self::escape($value) . '">';
                }

                return $sResult;
            }

            public static function select($arParams, $arList)
            {
                if (empty($arList) || !is_array($arList))
                {
                    return '';
                }

                $sResult = '<select class="form-control"';
                $sResult .= ' name="' . self::escape($arParams['NAME']) . (!empty($arParams['MULTIPLE']) ? '[]' : '') . '"';
                $sResult .= !empty($arParams['REQUIRED']) ? ' required' : '';
                $sResult .= !empty($arParams['DISABLE']) ? ' disabled' : '';
                $sResult .= !empty($arParams['MULTIPLE']) ? ' multiple' : '';
                $sResult .= '>';
                if (empty($arParams['REQUIRED']) && empty($arParams['MULTIPLE']))
                {
                    $sResult .= '<option value="">-- Не выбрано --</option>';
                }
                $values = array_map('strval', (array)($arParams['VALUE'] ?? []));
                foreach ($arList as $k => $v)
                {
                    $selected = in_array((string)$k, $values, true) ? ' selected' : '';
                    $sResult .= '<option value="' . self::escape($k) . '"' . $selected . '>' . self::escape($v) . '</option>';
                }
                $sResult .= '</select>';

                return $sResult;
            }

            public static function multifields($values): string
            {
                $rows = is_array($values) ? $values : [];
                for ($i = 0; $i < 3; $i++)
                {
                    $rows[] = ['id' => '', 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => ''];
                }

                $result = '';
                foreach ($rows as $index => $row)
                {
                    $options = '';
                    foreach (['PHONE', 'EMAIL', 'WEB', 'IM'] as $type)
                    {
                        $selected = ($row['typeId'] ?? '') === $type ? ' selected' : '';
                        $options .= '<option value="' . $type . '"' . $selected . '>' . $type . '</option>';
                    }
                    $id = $row['id'] ?? '';
                    $result .= '<div class="border rounded p-2 mb-2">';
                    $result .= '<input type="hidden" name="fm[' . $index . '][id]" value="' . self::escape($id) . '">';
                    $result .= '<select class="form-control mb-1" name="fm[' . $index . '][typeId]">' . $options . '</select>';
                    $result .= '<input class="form-control mb-1" name="fm[' . $index . '][valueType]" value="' . self::escape($row['valueType'] ?? 'WORK') . '" placeholder="WORK">';
                    $result .= '<input class="form-control mb-1" name="fm[' . $index . '][value]" value="' . self::escape($row['value'] ?? '') . '" placeholder="Значение">';
                    if ($id)
                    {
                        $result .= '<label><input type="checkbox" name="fm[' . $index . '][delete]" value="Y"> Удалить</label>';
                    }
                    $result .= '</div>';
                }

                return $result;
            }
        }

        function callCore($sb, string $method, array $params): array
        {
            return $sb->core
                ->call($method, $params)
                ->getResponseData()
                ->getResult();
        }

        $arResult = [];
        $fieldResult = callCore($sb, 'crm.item.fields', [
            'entityTypeId' => ENTITY_TYPE_ID,
            'useOriginalUfNames' => 'Y',
        ]);
        $arResult['FIELDS'] = $fieldResult['fields'];

        $arResult['FIELD_VALUES_CURRENCY'] = [];
        foreach ($crm->currency()->list([])->getCurrencies() as $currency)
        {
            // CURRENCY в B24PhpSDK — объект Money\Currency, строковый код берем через getCode()
            $arResult['FIELD_VALUES_CURRENCY'][$currency->CURRENCY->getCode()] = $currency->FULL_NAME;
        }

        if ($ID > 0)
        {
            $itemResult = callCore($sb, 'crm.item.get', [
                'entityTypeId' => ENTITY_TYPE_ID,
                'id' => $ID,
                'useOriginalUfNames' => 'Y',
            ]);
            $arResult['ITEM'] = $itemResult['item'];
        }

        $sResult = '';
        $sResultCustom = '';
    if (is_array($arResult['FIELDS'])):
        foreach ($arResult['FIELDS'] as $key => $arField)
        {
            if ($key === 'contacts')
            {
                continue;
            }
            $value = '';
            $return = '';
            if (!empty($arResult['ITEM'][$key]))
            {
                $value = $arResult['ITEM'][$key];
            }
            $arList = (isset($arResult['FIELD_VALUES_' . $key])) ? $arResult['FIELD_VALUES_' . $key] : [];
            switch ($arField['type'])
            {
                case 'crm_status':
                    if (empty($arList))
                    {
                        foreach ($crm->status()->list([], ['ENTITY_ID' => $arField['statusType']], [])->getStatuses() as $status)
                        {
                            $arList[$status->STATUS_ID] = $status->NAME;
                        }
                    }

                    $return = CPrintForm::select(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value
                        ],
                        $arList
                    );
                    break;
                case 'crm_currency':
                    $return = CPrintForm::select(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value
                        ],
                        $arResult['FIELD_VALUES_CURRENCY']
                    );
                    break;
                case 'enumeration':
                    foreach ($arField['items'] as $aItem)
                    {
                        $itemId = $aItem['ID'] ?? $aItem['id'];
                        $arList[$itemId] = $aItem['VALUE'] ?? $aItem['value'];
                    }

                    $return = CPrintForm::select(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value
                        ],
                        $arList
                    );
                    break;
                case 'crm_multifield':
                    $return = CPrintForm::multifields($value);
                    break;
                case 'crm_lead':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'text',
                        ]
                    );

                    if (!empty($value))
                    {
                        $lead = $crm->item()->get(1, (int)$value)->item();
                        $return .= ' (' . CPrintForm::escape($lead->title) . ')';
                    }
                    break;
                case 'crm_contact':
                    $arContact = [];
                    $arContactIds = array_values(array_filter(array_map('intval', (array)$value)));
                    if (!empty($arContactIds))
                    {
                        foreach ($crm->item()->list(3, [], ['@id' => $arContactIds], ['id', 'name', 'lastName'], 0)->getItems() as $contact)
                        {
                            $arContact[] = trim(implode(' ', [$contact->name, $contact->lastName]));
                        }
                    }
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'number',
                        ]
                    );
                    if (!empty($arContact))
                    {
                        $return .= ' (' . CPrintForm::escape(implode(', ', $arContact)) . ')';
                    }
                    break;
                case 'file':
                    $return = 'Тип file в примере не поддерживается';
                    break;
                case 'date':
                    if (!empty($value))
                    {
                        $value = date('Y-m-d', strtotime($value));
                    }
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'date',
                        ]
                    );
                    break;
                case 'datetime':
                    if (!empty($value))
                    {
                        $value = date('Y-m-d\TH:i:s', strtotime($value));
                    }
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'datetime-local',
                        ]
                    );
                    break;
                case 'char':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => false,
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => 'Y',
                            'CHECKED' => ($value == 'Y') ? true : false,
                            'TYPE' => 'checkbox',
                        ]
                    );
                    break;

                case 'boolean':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => false,
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => 'Y',
                            'CHECKED' => ($value == 'Y') ? true : false,
                            'TYPE' => 'checkbox',
                        ]
                    );
                    break;
                case 'double':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'number',
                            'STEP' => 'any',
                        ]
                    );
                    break;
                case 'user':
                    $arUserNames = [];
                    if (!empty($value))
                    {
                        foreach ($sb->getUserScope()->user()->get([], ['ID' => $value], true)->getUsers() as $user)
                        {
                            $arUserNames[] = implode(' ', [$user->NAME, $user->LAST_NAME]);
                        }
                    }
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'number'
                        ]
                    );
                    if (!empty($arUserNames))
                    {
                        $return .= ' (' . CPrintForm::escape(implode(', ', $arUserNames)) . ')';
                    }

                    break;
                case 'url':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'text',
                        ]
                    );
                    break;
                case 'integer':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'number',
                        ]
                    );
                    break;
                case 'money':
                    [$money, $currency] = array_pad(explode('|', (string)$value, 2), 2, '');
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $money,
                            'TYPE' => 'number',
                            'STEP' => 'any',
                        ]
                    );
                    $return .= CPrintForm::select(
                        [
                            'NAME' => 'form[' . $key . '_CURRENCY]',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $currency
                        ],
                        $arResult['FIELD_VALUES_CURRENCY']
                    );
                    break;
                case 'address':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'text',
                        ]
                    );
                    break;
                case 'resourcebooking':
                    $return = 'Тип resourcebooking в примере не поддерживается';
                    break;
                default:
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'text',
                        ]
                    );
                    break;
            }

            $label = CPrintForm::escape($arField['formLabel'] ?? $arField['title'] ?? $key);
            $block = '<div class="col-4 mt-3">' . $label . ': </div><div class="col-6 mt-3">' . $return . '</div>';
            if (strpos($key, 'UF_') === 0)
            {
                $sResultCustom .= $block;
            }
            else
            {
                $sResult .= $block;
            }
        }

    ?>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('auto_form').addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const body = new URLSearchParams(new FormData(event.currentTarget));
                    const response = await fetch('auto_form.php', { method: 'POST', body });
                    const json = await response.json();
                    alert(json.message || json.error);
                });
            });
        </script>
        <div class="container">
            <form id="auto_form" action="" method="post">
                <?php if (!empty($arResult['ITEM']['id'])): ?>
                    <input type="hidden" name="form[id]" value="<?= CPrintForm::escape($arResult['ITEM']['id']) ?>">
                <?php endif; ?>
                <h2>Системные поля</h2>
                <div class="row">
                    <?= $sResult ?>
                </div>
                <h2>Пользовательские поля</h2>
                <div class="row">
                    <?= $sResultCustom ?>
                </div>
                <div class="row">
                    <div class="col-sm-10 mt-5">
                        <input type="submit" class="btn btn-primary" value="Сохранить">
                    </div>
                </div>
            </form>
        </div>
    <?php endif; ?>
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from html import escape
    from flask import Flask, request
    from b24pysdk import BitrixWebhook, Client
    from save_form import save_form

    app = Flask(__name__)
    ENTITY_TYPE_ID = 4

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


    def input_field(params):
        """Строит input или набор input для множественного поля."""
        if params.get("MULTIPLE"):
            current = params.get("VALUE") if isinstance(params.get("VALUE"), list) else [params.get("VALUE") or ""]
            values = [*current, ""]
        else:
            values = [params.get("VALUE") or ""]

        html = ""
        for index, value in enumerate(values):
            html += '<input class="form-control"'
            if params.get("NAME"):
                html += f' name="{escape(params["NAME"])}{"[]" if params.get("MULTIPLE") else ""}"'
            if params.get("TYPE"):
                html += f' type="{escape(params["TYPE"])}"'
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
        """Строит <select> по словарю «значение => подпись»."""
        if not options:
            return ""
        html = '<select class="form-control"'
        if params.get("NAME"):
            html += f' name="{params["NAME"]}{"[]" if params.get("MULTIPLE") else ""}"'
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
        value = [str(v) for v in value] if isinstance(value, list) else [str(value or "")]
        for key, title in options.items():
            selected = " selected" if str(key) in value else ""
            html += f'<option value="{escape(str(key))}"{selected}>{escape(str(title))}</option>'
        return html + "</select>"


    def multifields(values):
        """Строит строки fm и сохраняет id существующих значений."""
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
        <div class="container">
            <form id="auto_form" method="post">
                %(hidden_id)s
                <h2>Системные поля</h2>
                <div class="row">%(standard)s</div>
                <h2>Пользовательские поля</h2>
                <div class="row">%(custom)s</div>
                <div class="row"><div class="col-sm-10 mt-5">
                    <input type="submit" class="btn btn-primary" value="Сохранить">
                </div></div>
            </form>
        </div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (el) => {
                el.preventDefault();
                const body = new URLSearchParams(new FormData(el.currentTarget));
                const response = await fetch('/form', { method: 'POST', body });
                const json = await response.json();
                alert(json.message || json.error);
            });
        </script>
    """


    @app.route("/")
    def form_page():
        item_id = int(request.args.get("ID", 0) or 0)

        ar_result = {}
        field_response = client.crm.item.fields(
            entity_type_id=ENTITY_TYPE_ID,
            use_original_uf_names=True,
        ).response
        ar_result["FIELDS"] = field_response.result["fields"]
        ar_result["FIELD_VALUES_CURRENCY"] = client.crm.currency.list().response.result

        if item_id > 0:
            item_response = client.crm.item.get(
                entity_type_id=ENTITY_TYPE_ID,
                bitrix_id=item_id,
                use_original_uf_names=True,
            ).response
            ar_result["ITEM"] = item_response.result["item"]

        item = ar_result.get("ITEM", {})
        s_result = ""
        s_result_custom = ""
        for key, field in ar_result["FIELDS"].items():
            if key == "contacts":
                continue
            value = item.get(key) or ""
            params = {"NAME": f"form[{key}]", "REQUIRED": field.get("isRequired"),
                      "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"), "VALUE": value}
            ret = ""
            field_type = field.get("type")
            if field_type == "crm_status":
                rows = ar_result.get("FIELD_VALUES_" + key) or client.crm.status.list(
                    filter={"ENTITY_ID": field["statusType"]}).response.result
                ret = select_field(params, {r["STATUS_ID"]: r["NAME"] for r in rows})
            elif field_type == "crm_currency":
                options = {c["CURRENCY"]: c["FULL_NAME"] for c in ar_result["FIELD_VALUES_CURRENCY"]}
                ret = select_field(params, options)
            elif field_type == "enumeration":
                options = {
                    it.get("ID", it.get("id")): it.get("VALUE", it.get("value"))
                    for it in field.get("items", [])
                }
                ret = select_field(params, options)
            elif field_type == "crm_multifield":
                ret = multifields(value)
            elif field_type == "crm_lead":
                ret = input_field({**params, "TYPE": "text"})
                if value:
                    lead_response = client.crm.item.get(entity_type_id=1, bitrix_id=int(value)).response
                    ret += f" ({escape(lead_response.result['item']['title'])})"
            elif field_type == "crm_contact":
                ret = input_field({**params, "TYPE": "number"})
                ids = [int(contact_id) for contact_id in (value if isinstance(value, list) else [value]) if contact_id]
                if ids:
                    contact_response = client.crm.item.list(
                        entity_type_id=3,
                        filter={"@id": ids},
                        select=["id", "name", "lastName"],
                    ).response
                    contacts = contact_response.result["items"]
                    if contacts:
                        names = [" ".join(filter(None, [contact.get("name"), contact.get("lastName")])) for contact in contacts]
                        ret += f" ({escape(', '.join(names))})"
            elif field_type == "file":
                ret = "Тип file в примере не поддерживается"
            elif field_type == "date":
                if value:
                    value = str(value)[:10]
                ret = input_field({**params, "VALUE": value, "TYPE": "date"})
            elif field_type == "datetime":
                if value:
                    value = str(value)[:19]
                ret = input_field({**params, "VALUE": value, "TYPE": "datetime-local"})
            elif field_type == "char":
                ret = input_field({**params, "REQUIRED": False, "VALUE": "Y", "CHECKED": value == "Y", "TYPE": "checkbox"})
            elif field_type == "boolean":
                ret = input_field({**params, "REQUIRED": False, "VALUE": "Y", "CHECKED": value == "Y", "TYPE": "checkbox"})
            elif field_type == "double":
                ret = input_field({**params, "TYPE": "number", "STEP": "any"})
            elif field_type == "integer":
                ret = input_field({**params, "TYPE": "number"})
            elif field_type == "user":
                ret = input_field({**params, "TYPE": "number"})
                if value:
                    users = client.user.get(filter={"ID": value}).response.result
                    if users:
                        names = [" ".join(filter(None, [user.get("NAME"), user.get("LAST_NAME")])) for user in users]
                        ret += f" ({escape(', '.join(names))})"
            elif field_type == "money":
                money, _, currency = str(value).partition("|")
                ret = input_field({**params, "VALUE": money, "TYPE": "number", "STEP": "any"})
                options = {c["CURRENCY"]: c["FULL_NAME"] for c in ar_result["FIELD_VALUES_CURRENCY"]}
                ret += select_field({"NAME": f"form[{key}_CURRENCY]", "REQUIRED": field.get("isRequired"),
                                     "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"),
                                     "VALUE": currency}, options)
            elif field_type == "resourcebooking":
                ret = "Тип resourcebooking в примере не поддерживается"
            else:
                ret = input_field({**params, "TYPE": "text"})

            label = escape(str(field.get("formLabel") or field.get("title") or key))
            block = f'<div class="col-4 mt-3">{label}: </div><div class="col-6 mt-3">{ret}</div>'
            if key.startswith("UF_"):
                s_result_custom += block
            else:
                s_result += block

        # Скрытое поле id добавляем только для формы редактирования
        hidden_id = ""
        if item.get("id"):
            hidden_id = f'<input type="hidden" name="form[id]" value="{escape(str(item["id"]))}">'
        return PAGE % {"hidden_id": hidden_id, "standard": s_result, "custom": s_result_custom}


    app.add_url_rule("/form", view_func=save_form, methods=["POST"])


    if __name__ == "__main__":
        app.run(port=5000)
    ```

{% endlist %}

## 3. Сохраним данные формы

Обработчик повторно вызывает [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md). Это защищает от передачи неизвестных и недоступных для изменения полей. Поля `file` и `resourcebooking` обработчик пропускает, поэтому их текущие значения сохраняются.

Браузер не отправляет снятый флажок. Поэтому для полей `boolean` и `char` обработчик передает `Y` при установленном флажке и `N` при снятом.

Если другого доступного для изменения поля нет в отправленной форме, обработчик очищает его:

- одиночному полю передает пустую строку
- множественному полю передает пустой массив

Если убрать поле из HTML-формы, при сохранении его текущее значение в компании будет затерто.

### Как обработчик собирает `fm`

Каждая строка `fm` содержит скрытый `id` и видимые `typeId`, `valueType`, `value`.

- для существующего непустого значения ключом массива становится его `id` — так сервер обновляет ту же запись
- для нового непустого значения обработчик создает ключ `n0`, `n1` и так далее — так сервер добавляет запись
- если существующее значение очищено или отмечено флажком **Удалить**, обработчик сохраняет его `id`, но передает пустой `value` — так сервер удаляет запись
- пустые строки без `id` обработчик не передает

Например, объект `fm` перед обновлением может выглядеть так:

```json
{
    "451": { "typeId": "PHONE", "valueType": "WORK", "value": "+7 495 111-22-33" },
    "452": { "typeId": "EMAIL", "valueType": "WORK", "value": "" },
    "n0": { "typeId": "EMAIL", "valueType": "WORK", "value": "info@example.com" }
}
```

Запись `451` будет обновлена, `452` — удалена, `n0` — добавлена.

### Как обработчик выбирает метод сохранения

Если форма содержит `id`, обработчик вызывает [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md). В остальных случаях он вызывает [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

### Полный код обработчика

Сохраните код в файл обработчика: JavaScript — `save-form.mjs`, PHP — `auto_form.php`, Python — `save_form.py`.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const ENTITY_TYPE_ID = 4
    const SKIPPED_FIELDS = new Set(['contacts'])
    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params, requestId) {
        const response = await $b24.actions.v2.call.make({ method, params, requestId })
        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
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
            }, 'company-fields-save')

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
                } else if (prop.type === 'crm_contact') {
                    value = asArray(value).map(Number).filter((itemId) => itemId > 0)
                } else if (prop.isMultiple) {
                    value = asArray(value).filter((item) => item !== '')
                }
                fields[key] = value
            }

            const id = parseInt(String(submitted.id ?? '0'), 10) || 0
            const method = id > 0 ? 'crm.item.update' : 'crm.item.add'
            const params = {
                entityTypeId: ENTITY_TYPE_ID,
                fields,
                useOriginalUfNames: 'Y',
            }
            if (id > 0) params.id = id

            const result = await call(method, params, `company-${id > 0 ? 'update' : 'add'}`)
            res.json({ message: `Компания сохранена, ID: ${result.item.id}` })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
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

        const ENTITY_TYPE_ID = 4;
        header('Content-Type: application/json; charset=utf-8');

            function callCore($sb, string $method, array $params): array
            {
                return $sb->core
                    ->call($method, $params)
                    ->getResponseData()
                    ->getResult();
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
                    if ($id <= 0 && $shouldDelete)
                    {
                        continue;
                    }

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
                    if ($key === 'contacts' || !empty($prop['isReadOnly']) || in_array($prop['type'], ['file', 'resourcebooking'], true))
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
                if ($id > 0)
                {
                    $params['id'] = $id;
                }

                $result = callCore($sb, $method, $params);
                echo json_encode(
                    ['message' => 'Компания сохранена, ID: ' . $result['item']['id']],
                    JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
                );
            }
            catch (Throwable $error)
            {
                http_response_code(400);
                echo json_encode(['error' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
            }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import re
    from flask import request, jsonify
    from b24pysdk import BitrixWebhook, Client

    ENTITY_TYPE_ID = 4
    FORM_KEY = re.compile(r"^form\[([^]]+)](\[\])?$")
    FM_KEY = re.compile(r"^fm\[(\d+)]\[(id|typeId|valueType|value|delete)]$")

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


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
            item_id = int(row.get("id") or 0)
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


    def save_form():
        try:
            submitted = parse_form()
            field_response = client.crm.item.fields(
                entity_type_id=ENTITY_TYPE_ID,
                use_original_uf_names=True,
            ).response

            fields = {}
            for key, prop in field_response.result["fields"].items():
                if key == "contacts" or prop.get("isReadOnly") or prop.get("type") in ("file", "resourcebooking"):
                    continue
                if prop.get("type") in ("boolean", "char"):
                    fields[key] = "Y" if key in submitted else "N"
                    continue
                if prop.get("type") == "crm_multifield":
                    fields[key] = build_multifields(parse_multifield_rows())
                    continue
                if key not in submitted:
                    fields[key] = [] if prop.get("isMultiple") else ""
                    continue

                value = submitted[key]
                if prop.get("type") == "money":
                    value = f"{value or ''}|{submitted.get(f'{key}_CURRENCY', '')}"
                elif prop.get("type") == "crm_contact":
                    values = value if isinstance(value, list) else [value]
                    value = [int(item_id) for item_id in values if str(item_id).isdigit() and int(item_id) > 0]
                elif prop.get("isMultiple"):
                    value = [item for item in (value if isinstance(value, list) else [value]) if item != ""]
                fields[key] = value

            item_id = int(submitted.get("id") or 0)
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

            return jsonify(message=f"Компания сохранена, ID: {response.result['item']['id']}")
        except Exception as error:
            return jsonify(error=str(error)), 400

    ```

{% endlist %}

После успешного вызова [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) или [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) идентификатор сохраненной компании находится в `result.item.id`:

```json
{
    "result": {
        "item": {
            "id": 123
        }
    }
}
```

Перед проверкой создайте два тестовых контакта. Откройте карточку каждого контакта и возьмите число из URL. Например, из URL `/crm/contact/details/456/` и `/crm/contact/details/789/` получите идентификаторы `456` и `789`. Список контактов также можно получить методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md), передав `entityTypeId` со значением `3`.

## Проверим результат

1. Откройте генератор без параметра `ID` и заполните название компании
2. В первой свободной строке оставьте тип `PHONE` и вид `WORK`, введите телефон
3. Во второй свободной строке выберите тип `EMAIL`, оставьте вид `WORK`, введите адрес
4. В поле для контактов укажите два идентификатора из предыдущего абзаца
5. Сохраните форму и убедитесь, что обработчик вернул идентификатор созданной компании
6. Откройте генератор с параметром `ID` и подставьте идентификатор компании, который обработчик вернул на предыдущем шаге, например `/?ID=123`
7. В строке с существующим телефоном измените номер
8. В строке с существующим email установите флажок **Удалить**, а в первой свободной строке выберите тип `EMAIL`, оставьте вид `WORK` и введите новый адрес
9. Сохраните форму и проверьте изменения в карточке компании

Отдельно проверьте связи с контактами: состав должен совпасть с формой, а первый идентификатор из `contactIds` станет основным контактом.

## Ошибки и диагностика

Если форма не открывается или компания не сохраняется, найдите признак ошибки и выполните рекомендацию.

| Признак | Что проверить и исправить |
|---|---|
| Методы CRM возвращают ошибку доступа | Проверьте право `crm` у вебхука, а у пользователя вебхука — права на чтение, добавление и изменение элементов CRM и доступ к настройкам CRM |
| Ошибка возникает при выводе поля с ответственным, а остальные поля загружаются | Проверьте право `user_brief`, необходимое для вызова [user.get](../../../api-reference/user/user-get.md) |
| [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) возвращает `NOT_FOUND` | Укажите идентификатор существующей компании, доступной пользователю вебхука, или удалите параметр `ID`, чтобы создать новую компанию |
| Первый запрос к Битрикс24 завершается ошибкой авторизации | Проверьте домен, `USER_ID/TOKEN` и статус вебхука: он не должен быть удален или отозван |
| При сохранении обработчик возвращает ошибку о незаполненном поле | Заполните все поля, для которых [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) вернул `isRequired: true`, и сохраните форму повторно |
| Сервер не запускается: порт занят другим процессом | Освободите порт или измените его в коде либо команде запуска, затем запустите сервер заново |
| При старте возникает ошибка импорта или отсутствия класса | Установите зависимости командой для выбранного языка из раздела подготовки и запустите сервер заново |
| Браузер показывает `localhost refused to connect` | Посмотрите первую ошибку в терминале, устраните ее и запустите сервер заново. Проверьте, что открываете правильный порт |
| PHP возвращает `Call to a member function error() on array` | Замените устаревшую функцию `callCore` на версию из кода генератора или обработчика и повторите запрос |
| Composer сообщает о несовместимой версии PHP | Используйте PHP 8.4 или 8.5. Проверьте версию командой `php -v`, затем повторно установите зависимости |
| PHP сообщает об отсутствующем расширении | Включите расширения `bcmath`, `curl`, `intl` и `json`, перезапустите PHP и проверьте список командой `php -m` |

## Что важно учитывать

{% note warning "" %}

Форма управляет только составом связанных контактов через поле `contactIds` и не позволяет изменять их роли. При сохранении сервер заново устанавливает `SORT` по порядку идентификаторов, назначает первому контакту `IS_PRIMARY=Y` и сохраняет `ROLE_ID` существующей привязки.

Не используйте пример, если нужно сохранить расширенные свойства привязок без изменений.

В описании полей также есть служебное поле `contacts`. Пример пропускает его и работает только с `contactIds`, чтобы не передавать две версии одной связи.

{% endnote %}

Пример не поддерживает множественные поля типа `money`: для них значение сохранится в неверном формате.

Пример рассчитан на локальный или тестовый запуск. Обработчик выполняет запросы через вебхук с правами создавшего его пользователя и не проверяет, кто отправил форму. Не публикуйте страницу в открытом доступе без собственной аутентификации.

## Продолжите изучение

Для другого объекта CRM меняется `entityTypeId` и набор полей, остальная логика остается той же:

- [{#T}](./how-to-generate-edit-form-for-deal.md)
- [{#T}](./how-to-generate-edit-form-for-lead.md)
- [{#T}](./how-to-make-contact-edit-card.md)
