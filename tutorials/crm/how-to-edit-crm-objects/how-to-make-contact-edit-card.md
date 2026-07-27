# Как сделать свою карточку редактирования контакта

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пример автоматической генерации карточки редактирования контакта со всеми полями, созданными в Битрикс24, на странице приложения.

Некоторые типы полей не реализованы в данном примере, на месте полей с неподдерживаемым типом будет выводиться сообщение *field not support*.

Код генерируемой формы:

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const app = express()
    app.use(express.urlencoded({ extended: true }))

    function input(p) {
        const count = p.MULTIPLE && p.TYPE !== 'file' ? 2 : 0
        const values = Array.isArray(p.VALUE) ? p.VALUE : []
        let html = ''
        for (let i = 0; i <= count; i++) {
            const value = count > 0 ? (values[i] ?? '') : (p.VALUE ?? '')
            html += '<input class="form-control' + (p.TYPE === 'file' ? '-file' : '') + '"'
            if (p.NAME) html += ` name="${p.NAME}${p.MULTIPLE ? '[]' : ''}"`
            if (p.TYPE) html += ` type="${p.TYPE}"`
            if (p.REQUIRED) html += ' required'
            if (p.DISABLE) html += ' disabled'
            if (p.CHECKED) html += ' checked'
            if (p.MULTIPLE) html += ' multiple'
            if (value) html += ` value="${value}"`
            html += '>'
        }
        return html
    }

    function select(p, list) {
        if (!list || !Object.keys(list).length) return ''
        let html = '<select class="form-control"'
        if (p.NAME) html += ` name="${p.NAME}${p.MULTIPLE ? '[]' : ''}"`
        if (p.REQUIRED) html += ' required'
        if (p.DISABLE) html += ' disabled'
        if (p.MULTIPLE) html += ' multiple'
        html += '>'
        const value = Array.isArray(p.VALUE) ? p.VALUE.map(String) : [String(p.VALUE ?? '')]
        for (const [key, title] of Object.entries(list)) {
            html += `<option value="${key}"${value.includes(String(key)) ? ' selected' : ''}>${title}</option>`
        }
        return html + '</select>'
    }

    app.get('/', async (req, res) => {
        const id = parseInt(String(req.query.ID ?? '0'), 10) || 0

        const arResult = {}
        arResult.FIELDS = (await $b24.actions.v2.call.make({
            method: 'crm.contact.fields', params: {}, requestId: 'contact-fields',
        })).getData().result
        if (arResult.FIELDS.SOURCE_ID) {
            arResult.FIELD_VALUES_SOURCE_ID = (await $b24.actions.v2.call.make({
                method: 'crm.status.list', params: { filter: { ENTITY_ID: arResult.FIELDS.SOURCE_ID.statusType } }, requestId: 'src',
            })).getData().result
        }
        arResult.FIELD_VALUES_CURRENCY = (await $b24.actions.v2.call.make({
            method: 'crm.currency.list', params: {}, requestId: 'cur',
        })).getData().result

        if (id > 0) {
            arResult.ITEM = (await $b24.actions.v2.call.make({
                method: 'crm.contact.get', params: { id }, requestId: 'item',
            })).getData().result
            if (arResult.ITEM.LEAD_ID && arResult.ITEM.LEAD_ID !== '0') {
                arResult.VALUE_LEAD_ID = (await $b24.actions.v2.call.make({
                    method: 'crm.lead.get', params: { id: arResult.ITEM.LEAD_ID }, requestId: 'lead',
                })).getData().result
            }
        }

        let sResult = ''
        let sResultCustom = ''
        // COMPANY_ID/COMPANY_IDS устарели — используйте crm.contact.company.items.get
        delete arResult.FIELDS.COMPANY_ID
        delete arResult.FIELDS.COMPANY_IDS
        for (const [key, field] of Object.entries(arResult.FIELDS)) {
            let value = arResult.ITEM?.[key] ?? ''
            let listKey = arResult['FIELD_VALUES_' + key] ?? []
            let list = {}
            let ret = ''
            const params = { NAME: `form[${key}]`, REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple, VALUE: value }
            switch (field.type) {
                case 'crm_status':
                    if (!listKey.length) {
                        listKey = (await $b24.actions.v2.call.make({
                            method: 'crm.status.list', params: { filter: { ENTITY_ID: field.statusType } }, requestId: `st-${key}`,
                        })).getData().result
                    }
                    list = Object.fromEntries(listKey.map((s) => [s.STATUS_ID, s.NAME]))
                    ret = select(params, list)
                    break
                case 'crm_currency':
                    list = Object.fromEntries(arResult.FIELD_VALUES_CURRENCY.map((c) => [c.CURRENCY, c.FULL_NAME]))
                    ret = select(params, list)
                    break
                case 'enumeration':
                    if (field.items) list = Object.fromEntries(field.items.map((it) => [it.ID, it.VALUE]))
                    ret = select(params, list)
                    break
                case 'crm_multifield':
                    if (Array.isArray(value) && value.length) value = value[0].VALUE
                    ret = input({ ...params, MULTIPLE: false, VALUE: value, TYPE: 'text' })
                    break
                case 'crm_lead':
                    ret = input({ ...params, TYPE: 'text' })
                    if (arResult.VALUE_LEAD_ID && String(value) === String(arResult.VALUE_LEAD_ID.ID)) {
                        ret += `(${arResult.VALUE_LEAD_ID.TITLE})`
                    }
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
                    ret = input({ ...params, VALUE: 'Y', CHECKED: value === 'Y', TYPE: 'checkbox' })
                    break
                case 'boolean':
                    ret = input({ ...params, VALUE: '1', CHECKED: value === 'Y', TYPE: 'checkbox' })
                    break
                case 'double':
                case 'integer':
                    ret = input({ ...params, TYPE: 'number' })
                    break
                case 'user': {
                    ret = input({ ...params, TYPE: 'number' })
                    if (value) {
                        const users = (await $b24.actions.v2.call.make({
                            method: 'user.get', params: { filter: { ID: value } }, requestId: `user-${key}`,
                        })).getData().result
                        if (users.length) {
                            ret += '(' + users.map((u) => [u.NAME, u.LAST_NAME].join(' ')).join(', ') + ')'
                        }
                    }
                    break
                }
                case 'money': {
                    const [money, currency] = String(value).split('|')
                    ret = input({ ...params, VALUE: money, TYPE: 'number' })
                    list = Object.fromEntries(arResult.FIELD_VALUES_CURRENCY.map((c) => [c.CURRENCY, c.FULL_NAME]))
                    ret += select({ NAME: `${key}_CURRENCY`, REQUIRED: field.isRequired, DISABLE: field.isReadOnly, MULTIPLE: field.isMultiple, VALUE: currency }, list)
                    break
                }
                case 'resourcebooking':
                    ret = 'field not support'
                    break
                default:
                    ret = input({ ...params, TYPE: 'text' })
                    break
            }

            const label = field.formLabel || field.title
            const block = `<div class="col-4 mt-3">${label}: </div><div class="col-6 mt-3">${ret}</div>`
            if (key.startsWith('UF_')) sResultCustom += block
            else sResult += block
        }

        res.send(`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
            <div class="container">
                <form id="auto_form" enctype="multipart/form-data" method="post">
                    ${arResult.ITEM?.ID ? `<input type="hidden" name="form[ID]" value="${arResult.ITEM.ID}">` : ''}
                    <h2>Standard fields</h2>
                    <div class="row">${sResult}</div>
                    <h2>Custom fields</h2>
                    <div class="row">${sResultCustom}</div>
                    <div class="row"><div class="col-sm-10 mt-5">
                        <input type="submit" class="btn btn-primary" value="Submit">
                    </div></div>
                </form>
            </div>
            <script>
                document.getElementById('auto_form').addEventListener('submit', async (el) => {
                    el.preventDefault()
                    const response = await fetch('/form', { method: 'POST', body: new FormData(el.currentTarget) })
                    const json = await response.json()
                    if (json.message) alert(json.message)
                })
            <\/script>
        `)
    })

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

        $ID = intVal($_REQUEST['ID']);
        class CPrintForm
        {
            /**
             * @return string html select
             * @var $arParams array params input keys: 'NAME', 'ID', 'TYPE', 'REQUIRED', 'CHECKED', 'DISABLE', 'MULTIPLE', 'VALUE'
             */
            public static function input($arParams)
            {
                $count = 0;
                $i = 0;
                $sResult = '';
                if ($arParams['MULTIPLE'] && $arParams['TYPE'] != 'file')
                {
                    $count = 2;
                }
                $value = $arParams['VALUE'];
                while ($i <= $count)
                {

                    if ($count > 0)
                    {
                        $value = $arParams['VALUE'][$i];
                    }
                    $sResult .= '<input class="form-control' . (($arParams['TYPE'] == 'file') ? '-file' : '') . '"';
                    if (!empty($arParams['ID']))
                    {
                        $sResult .= ' id="' . $arParams['ID'] . '"';
                    }
                    if (!empty($arParams['NAME']))
                    {
                        $sResult .= ' name="' . $arParams['NAME'] . '' . (($arParams['MULTIPLE']) ? '[]' : '') . '"';
                    }
                    if (!empty($arParams['TYPE']))
                    {
                        $sResult .= ' type="' . $arParams['TYPE'] . '"';
                    }
                    if (!empty($arParams['REQUIRED']))
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
                    if (!empty($arParams['MULTIPLE']))
                    {//sometimes work, not for standard type="text"
                        $sResult .= ' multiple';
                    }
                    if (!empty($arParams['VALUE']))
                    {
                        $sResult .= ' value="' . $value . '"';
                    }
                    $sResult .= '>';
                    $i++;
                }

                return $sResult;
            }

            /**
             * @return string html select
             * @var $arList array of select options where key is value option and value is title
             * @var $arParams array settings of select params keys: 'NAME', 'ID', 'REQUIRED', 'DISABLE','MULTIPLE', 'VALUE'
             */
            public static function select($arParams, $arList)
            {
                $sResult = '';
                if (!empty($arList) && is_array($arList))
                {
                    $sResult .= '<select class="form-control"' .
                        (($arParams['NAME']) ? ' name="' .
                            $arParams['NAME'] .
                            '' .
                            (($arParams['MULTIPLE']) ? '[]' : '') .
                            '"' : '') .
                        (($arParams['ID']) ? ' id="' . $arParams['ID'] . '"' : '') .
                        (($arParams['REQUIRED']) ? ' required' : '') .
                        (($arParams['DISABLE']) ? ' disabled' : '') .
                        (($arParams['MULTIPLE']) ? ' multiple' : '') .
                        '>';
                    $value = [];
                    if (is_array($arParams['VALUE']))
                    {
                        $value = $arParams['VALUE'];
                    }
                    else
                    {
                        $value[] = ($arParams['VALUE']) ? $arParams['VALUE'] : '';
                    }
                    foreach ($arList as $key => $title)
                    {
                        $sResult .= '<option value="' .
                            $key .
                            '" ' .
                            ((in_array($key, $value)) ? ' selected' : '') .
                            '>' .
                            $title .
                            '</option>';
                    }
                    $sResult .= '</select>';
                }

                return $sResult;
            }

        }

        // Описание полей и значения справочников (последовательные вызовы).
        // Справочники сразу превращаем в словари «код => подпись» для select.
        $arResult = [];
        $arResult['FIELDS'] = $crm->contact()->fields()->getFieldsDescription();

        $arResult['FIELD_VALUES_SOURCE_ID'] = [];
        if (isset($arResult['FIELDS']['SOURCE_ID']))
        {
            foreach ($crm->status()->list([], ['ENTITY_ID' => $arResult['FIELDS']['SOURCE_ID']['statusType']], [])->getStatuses() as $status)
            {
                $arResult['FIELD_VALUES_SOURCE_ID'][$status->STATUS_ID] = $status->NAME;
            }
        }

        $arResult['FIELD_VALUES_CURRENCY'] = [];
        foreach ($crm->currency()->list([])->getCurrencies() as $currency)
        {
            // CURRENCY в B24PhpSDK — объект Money\Currency, строковый код берём через getCode()
            $arResult['FIELD_VALUES_CURRENCY'][$currency->CURRENCY->getCode()] = $currency->FULL_NAME;
        }

        if ($ID > 0)
        {//get item and standard enum field values if is update form
            // Элемент читаем как массив — набор полей динамический (включая UF_*).
            $arResult['ITEM'] = iterator_to_array($crm->contact()->get($ID)->contact()->getIterator());
            if (!empty($arResult['ITEM']['LEAD_ID']))
            {
                $lead = $crm->lead()->get((int)$arResult['ITEM']['LEAD_ID'])->lead();
                $arResult['VALUE_LEAD_ID'] = ['ID' => $lead->ID, 'TITLE' => $lead->TITLE];
            }
        }

        $sResult = '';
        $sResultCustom = '';
    if (is_array($arResult['FIELDS'])):
        if (isset($arResult['FIELDS']['COMPANY_ID']))//deprecated use crm.contact.company.items.get
        {
            unset($arResult['FIELDS']['COMPANY_ID']);
        }
        if (isset($arResult['FIELDS']['COMPANY_IDS']))//use crm.contact.company.items.get
        {
            unset($arResult['FIELDS']['COMPANY_IDS']);
        }

        foreach ($arResult['FIELDS'] as $key => $arField)
        {
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
                    if (!empty($arField['items']))
                    {
                        $arList = array_column($arField['items'], 'VALUE', 'ID');
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
                case 'crm_multifield'://its simple example: need multifield, check data type and more...
                    if (!empty($value) && is_array($value))
                    {
                        $value = reset($value)['VALUE'];
                    }
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => false,
                            'VALUE' => $value,
                            'TYPE' => 'text',
                        ]
                    );
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

                    if (!empty($arResult['VALUE_LEAD_ID']) && $value == $arResult['VALUE_LEAD_ID']['ID'])
                    {
                        $return .= '(' . $arResult['VALUE_LEAD_ID']['TITLE'] . ')';
                    }
                    break;
                case 'file':
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $value,
                            'TYPE' => 'file',
                        ]
                    );
                    if ($arField['isMultiple'])
                    {
                        if (is_array($value))
                        {
                            foreach ($value as $k => $val)
                            {
                                if (!empty($val['downloadUrl']))
                                {
                                    $return .= '<br/><a href="' . $val['downloadUrl'] . '">old file ' . $k . '</a>';
                                }
                            }
                        }
                    }
                    else
                    {
                        if (!empty($value['downloadUrl']))
                        {
                            $return .= '<br/><a href="' . $value['downloadUrl'] . '">old file</a>';
                        }
                    }
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
                            'REQUIRED' => $arField['isRequired'],
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
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => '1',
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
                            'TYPE' => 'number'
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
                        $return .= '(' . implode(', ', $arUserNames) . ')';
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
                    list($money, $currency) = explode('|', $value);
                    $return = CPrintForm::input(
                        [
                            'NAME' => 'form[' . $key . ']',
                            'REQUIRED' => $arField['isRequired'],
                            'DISABLE' => $arField['isReadOnly'],
                            'MULTIPLE' => $arField['isMultiple'],
                            'VALUE' => $money,
                            'TYPE' => 'number',
                        ]
                    );
                    $return .= CPrintForm::select(
                        [
                            'NAME' => $key . '_CURRENCY',
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
                    //some code booking
                    $return = 'field not support';
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

            if (strpos($key, 'UF_') === 0)
            {
                $sResultCustom .= '<div class="col-4 mt-3">' . (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) . ': ' . '</div>';
                $sResultCustom .= '<div class="col-6 mt-3">' . $return . '</div>';
            }
            else
            {
                $sResult .= '<div class="col-4 mt-3">' . (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) . ': ' . '</div>';
                $sResult .= '<div class="col-6 mt-3">' . $return . '</div>';
            }
        }

    ?>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script>
            $(document).ready(function ()
            {
                $('#auto_form').on('submit', function (el) {//event submit form
                    el.preventDefault();//the default action of the event will not be triggered
                    var formData = new FormData(this);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", 'auto_form.php');
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status >= 200 && this.status < 400) {
                                var resp = this.responseText;
                                try {
                                    var json = JSON.parse(resp);
                                    if (typeof json.message !== 'undefined') {
                                        alert(json.message);
                                    }
                                } catch (e) {
                                    return false;
                                }
                            } else {
                                alert('error');
                            }
                        }
                    };
                    xhr.send(formData);
                });
            });
        </script>
        <div class="container">
            <form id="auto_form" action="" enctype="multipart/form-data" method="post">
                <?php if (!empty($arResult['ITEM']['ID']))://for update entity ?>
                    <input type="hidden" name="form[ID]" value="<?= $arResult['ITEM']['ID'] ?>">
                <?php endif; ?>
                <h2>Standard fields</h2>
                <div class="row">
                    <?= $sResult ?>
                </div>
                <h2>Custom fields</h2>
                <div class="row">
                    <?= $sResultCustom ?>
                </div>
                <div class="row">
                    <div class="col-sm-10 mt-5">
                        <input type="submit" class="btn btn-primary" value="Submit">
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

    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


    def input_field(params):
        """Строит <input> (или набор для множественного поля)."""
        count = 2 if params.get("MULTIPLE") and params.get("TYPE") != "file" else 0
        values = params.get("VALUE") if isinstance(params.get("VALUE"), list) else []
        html = ""
        for i in range(count + 1):
            value = (values[i] if i < len(values) else "") if count > 0 else params.get("VALUE")
            html += '<input class="form-control' + ("-file" if params.get("TYPE") == "file" else "") + '"'
            if params.get("NAME"):
                html += f' name="{params["NAME"]}{"[]" if params.get("MULTIPLE") else ""}"'
            if params.get("TYPE"):
                html += f' type="{params["TYPE"]}"'
            if params.get("REQUIRED"):
                html += " required"
            if params.get("DISABLE"):
                html += " disabled"
            if params.get("CHECKED"):
                html += " checked"
            if params.get("MULTIPLE"):
                html += " multiple"
            if value:
                html += f' value="{value}"'
            html += ">"
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
        value = params.get("VALUE")
        value = [str(v) for v in value] if isinstance(value, list) else [str(value or "")]
        for key, title in options.items():
            selected = " selected" if str(key) in value else ""
            html += f'<option value="{key}"{selected}>{title}</option>'
        return html + "</select>"


    PAGE = """
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <div class="container">
            <form id="auto_form" enctype="multipart/form-data" method="post">
                %(hidden_id)s
                <h2>Standard fields</h2>
                <div class="row">%(standard)s</div>
                <h2>Custom fields</h2>
                <div class="row">%(custom)s</div>
                <div class="row"><div class="col-sm-10 mt-5">
                    <input type="submit" class="btn btn-primary" value="Submit">
                </div></div>
            </form>
        </div>
        <script>
            document.getElementById('auto_form').addEventListener('submit', async (el) => {
                el.preventDefault();
                const response = await fetch('/form', { method: 'POST', body: new FormData(el.currentTarget) });
                const json = await response.json();
                if (json.message) alert(json.message);
            });
        </script>
    """


    @app.route("/")
    def form_page():
        item_id = int(request.args.get("ID", 0) or 0)

        ar_result = {}
        ar_result["FIELDS"] = client.crm.contact.fields().result
        if "SOURCE_ID" in ar_result["FIELDS"]:
            ar_result["FIELD_VALUES_SOURCE_ID"] = client.crm.status.list(
                filter={"ENTITY_ID": ar_result["FIELDS"]["SOURCE_ID"]["statusType"]}).result
        ar_result["FIELD_VALUES_CURRENCY"] = client.crm.currency.list().result

        if item_id > 0:
            ar_result["ITEM"] = client.crm.contact.get(bitrix_id=item_id).result
            if ar_result["ITEM"].get("LEAD_ID") and ar_result["ITEM"]["LEAD_ID"] != "0":
                ar_result["VALUE_LEAD_ID"] = client.crm.lead.get(
                    bitrix_id=int(ar_result["ITEM"]["LEAD_ID"])).result

        item = ar_result.get("ITEM", {})
        # COMPANY_ID/COMPANY_IDS устарели — используйте crm.contact.company.items.get
        ar_result["FIELDS"].pop("COMPANY_ID", None)
        ar_result["FIELDS"].pop("COMPANY_IDS", None)

        s_result = ""
        s_result_custom = ""
        for key, field in ar_result["FIELDS"].items():
            value = item.get(key) or ""
            params = {"NAME": f"form[{key}]", "REQUIRED": field.get("isRequired"),
                      "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"), "VALUE": value}
            ret = ""
            field_type = field.get("type")
            if field_type == "crm_status":
                rows = ar_result.get("FIELD_VALUES_" + key) or client.crm.status.list(
                    filter={"ENTITY_ID": field["statusType"]}).result
                ret = select_field(params, {r["STATUS_ID"]: r["NAME"] for r in rows})
            elif field_type == "crm_currency":
                options = {c["CURRENCY"]: c["FULL_NAME"] for c in ar_result["FIELD_VALUES_CURRENCY"]}
                ret = select_field(params, options)
            elif field_type == "enumeration":
                options = {it["ID"]: it["VALUE"] for it in field.get("items", [])}
                ret = select_field(params, options)
            elif field_type == "crm_multifield":
                if isinstance(value, list) and value:
                    value = value[0]["VALUE"]
                ret = input_field({**params, "MULTIPLE": False, "VALUE": value, "TYPE": "text"})
            elif field_type == "crm_lead":
                ret = input_field({**params, "TYPE": "text"})
                lead = ar_result.get("VALUE_LEAD_ID")
                if lead and str(value) == str(lead["ID"]):
                    ret += f"({lead['TITLE']})"
            elif field_type == "date":
                if value:
                    value = str(value)[:10]
                ret = input_field({**params, "VALUE": value, "TYPE": "date"})
            elif field_type == "datetime":
                if value:
                    value = str(value)[:19]
                ret = input_field({**params, "VALUE": value, "TYPE": "datetime-local"})
            elif field_type == "char":
                ret = input_field({**params, "VALUE": "Y", "CHECKED": value == "Y", "TYPE": "checkbox"})
            elif field_type == "boolean":
                ret = input_field({**params, "VALUE": "1", "CHECKED": value == "Y", "TYPE": "checkbox"})
            elif field_type in ("double", "integer"):
                ret = input_field({**params, "TYPE": "number"})
            elif field_type == "user":
                ret = input_field({**params, "TYPE": "number"})
                if value:
                    users = client.user.get(filter={"ID": value}).result
                    if users:
                        ret += "(" + ", ".join(f"{u['NAME']} {u['LAST_NAME']}" for u in users) + ")"
            elif field_type == "money":
                money, _, currency = str(value).partition("|")
                ret = input_field({**params, "VALUE": money, "TYPE": "number"})
                options = {c["CURRENCY"]: c["FULL_NAME"] for c in ar_result["FIELD_VALUES_CURRENCY"]}
                ret += select_field({"NAME": f"{key}_CURRENCY", "REQUIRED": field.get("isRequired"),
                                     "DISABLE": field.get("isReadOnly"), "MULTIPLE": field.get("isMultiple"),
                                     "VALUE": currency}, options)
            elif field_type == "resourcebooking":
                ret = "field not support"
            else:
                ret = input_field({**params, "TYPE": "text"})

            label = field.get("formLabel") or field.get("title")
            block = f'<div class="col-4 mt-3">{label}: </div><div class="col-6 mt-3">{ret}</div>'
            if key.startswith("UF_"):
                s_result_custom += block
            else:
                s_result += block

        # Скрытое поле ID подставляем только при редактировании существующего контакта
        hidden_id = ""
        if item.get("ID"):
            hidden_id = f'<input type="hidden" name="form[ID]" value="{escape(str(item["ID"]))}">'

        return PAGE % {"hidden_id": hidden_id, "standard": s_result, "custom": s_result_custom}


    if __name__ == "__main__":
        app.run(port=5000)
    ```

{% endlist %}

Код обработчика, который сохраняет форму:

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Обработчик: сохраняет форму — обновляет существующий лид или создаёт новый.
    // req.body.form — объект с полями формы (Express с express.urlencoded()).
    export async function handler(req, res) {
        const arForm = { ...req.body.form }

        // Приводим значения к формату REST по типу поля
        const arFields = (await $b24.actions.v2.call.make({
            method: 'crm.contact.fields', params: {}, requestId: 'contact-fields-save',
        })).getData().result
        for (const [key, prop] of Object.entries(arFields)) {
            if (!(key in arForm)) {
                // Поля, которых нет в форме, очищаем (кроме read-only и файлов)
                if (!prop.isReadOnly && prop.type !== 'file') {
                    if (prop.type === 'enumeration' && prop.isMultiple) arForm[key] = [false]
                    else if (prop.isMultiple) arForm[key] = []
                    else arForm[key] = ''
                }
                continue
            }
            if (prop.type === 'crm_multifield') {
                arForm[key] = [{ VALUE: arForm[key] }]
            } else if (prop.type === 'money') {
                arForm[key] = [arForm[key], arForm[`${key}_CURRENCY`]].join('|')
                delete arForm[`${key}_CURRENCY`]
            }
        }

        const id = parseInt(String(arForm.ID ?? '0'), 10) || 0
        delete arForm.ID
        if (id > 0) {
            const result = await $b24.actions.v2.call.make({
                method: 'crm.contact.update', params: { id, fields: arForm }, requestId: 'contact-update',
            })
            res.json({ message: result.getData().result ? 'Contact update' : 'Contact not updated' })
        } else {
            const result = await $b24.actions.v2.call.make({
                method: 'crm.contact.add', params: { fields: arForm }, requestId: 'contact-add',
            })
            const newId = result.getData().result
            res.json({ message: newId ? `Contact add ID:${newId}` : 'Contact not added' })
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
        $crm = $sb->getCRMScope();

        $arForm = [];
        foreach($_POST['form'] as $key => $item)
        {
            if(is_array($item))
            {
                $arForm[$key] = [];
                foreach($item as $k => $val)
                {
                    $arForm[$key][$k] = htmlspecialchars($val);
                }
            }
            else
            {
                $arForm[$key] = htmlspecialchars($item);
            }
        }
        //make array multiple files for add to custom field
        if(!empty($_FILES['form']['tmp_name']) && is_array($_FILES['form']['tmp_name']))
        {
            foreach($_FILES['form']['tmp_name'] as $key => $files)
            {
                if(is_array($files))
                {
                    foreach($files as $k => $file)
                    {
                        $arForm[$key][$k] = [
                            "fileData" => [
                                $_FILES['form']['name'][$key][$k],
                                base64_encode(file_get_contents($file))
                            ]
                        ];
                    }
                }
                else
                {
                    $arForm[$key] = [
                        "fileData" => [
                            $_FILES['form']['name'][$key],
                            base64_encode(file_get_contents($files))
                        ]
                    ];
                }
            }
        }
        $arFields = $crm->contact()->fields()->getFieldsDescription();
        if(!empty($arFields))
        {
            foreach($arFields as $key => $prop)
            {
                if(!isset($arForm[$key]))
                {
                    if(!$prop['isReadOnly'] && $prop['type'] != 'file')
                    {
                        if($prop['type'] == 'enumeration' && $prop['isMultiple'])
                        {
                            //if type multiple enumeration to clean selected value need send: [false]
                            $arForm[$key] = [false];
                        }
                        elseif($prop['isMultiple'])
                        {
                            $arForm[$key] = [];
                        }
                        else
                        {
                            $arForm[$key] = '';
                        }
                    }
                    continue;
                }
                //here may be any check field example by type
                if($prop['type'] == 'crm_multifield')
                {
                    if(isset($arForm[$key]))
                    {
                        $arForm[$key] = [['VALUE' => $arForm[$key]]];
                    }
                }
                elseif($prop['type'] == 'money')
                {
                    $arForm[$key] = implode('|', [$arForm[$key], $arForm[$key . '_CURRENCY']]);
                    unset($arForm[$key . '_CURRENCY']);
                }
            }
        }
        $arForm['ID'] = intVal($arForm['ID']);
        if($arForm['ID'] > 0)
        {
            $id = $arForm['ID'];
            unset($arForm['ID']);
            $result = $crm->contact()->update($id, $arForm)->isSuccess();
            $arMess = [
                'success' => 'Contact update',
                'error' => 'Contact not updated',
            ];
            echo json_encode(['message' => $result ? $arMess['success'] : $arMess['error']]);
        }
        else
        {
            unset($arForm['ID']);
            $resultId = $crm->contact()->add($arForm)->getId();
            $arMess = [
                'success' => 'Contact add',
                'error' => 'Contact not added',
            ];
            echo json_encode(['message' => $resultId ? $arMess['success'] . ' ID:' . $resultId : $arMess['error']]);
        }
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


    @app.route("/form", methods=["POST"])
    def save_form():
        ar_form = {}
        for full_key in request.form:
            if full_key.startswith("form[") and full_key.endswith("]"):
                ar_form[full_key[5:-1]] = request.form[full_key]

        ar_fields = client.crm.contact.fields().result
        for key, prop in ar_fields.items():
            if key not in ar_form:
                if not prop.get("isReadOnly") and prop.get("type") != "file":
                    if prop.get("type") == "enumeration" and prop.get("isMultiple"):
                        ar_form[key] = [False]
                    elif prop.get("isMultiple"):
                        ar_form[key] = []
                    else:
                        ar_form[key] = ""
                continue
            if prop.get("type") == "crm_multifield":
                ar_form[key] = [{"VALUE": ar_form[key]}]
            elif prop.get("type") == "money":
                ar_form[key] = "|".join([ar_form[key], ar_form.get(f"{key}_CURRENCY", "")])
                ar_form.pop(f"{key}_CURRENCY", None)

        item_id = int(ar_form.get("ID") or 0)
        ar_form.pop("ID", None)
        if item_id > 0:
            result = client.crm.contact.update(bitrix_id=item_id, fields=ar_form).result
            message = "Contact update" if result else "Contact not updated"
        else:
            new_id = client.crm.contact.add(fields=ar_form).result
            message = f"Contact add ID:{new_id}" if new_id else "Contact not added"
        return jsonify(message=message)


    if __name__ == "__main__":
        app.run(port=5000)
    ```

{% endlist %}
