# Добавить сделку и компанию с реквизитами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны сразу два права — «Добавление|Импорт» компаний и «добавление» сделок
>
> - [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — любой пользователь
> - [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — пользователь с правом на чтение контактов и компаний
> - [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) — пользователь с правом «Добавление|Импорт» компаний
> - [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) и [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) — пользователь с правом на добавление компании, которая владеет реквизитом
> - [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md) — пользователь с правом «добавления» сделок

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

С помощью веб-формы можно автоматически добавлять новые сделки и компании с реквизитами в Битрикс24. Когда клиент заполняет форму, данные попадают в обработчик. Скрипт-обработчик создает объекты в CRM через API.

В результате сценария в CRM появятся четыре связанных объекта: компания, ее реквизит, адрес реквизита и сделка, привязанная к компании.

Настройка состоит из двух этапов.

1. Подготавливаем поля и размещаем веб-форму на странице. Состав полей формы берем из методов [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) и [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md)

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) и [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md)

Порядок вызовов задан связями объектов: реквизит создается для уже существующей компании, адрес — для уже существующего реквизита, а сделка привязывается к компании.

## Что нужно до начала

- в Битрикс24 настроен хотя бы один шаблон реквизитов. Если шаблонов нет, метод [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) вернет пустой список и форму собрать не из чего

- вебхук создан от имени пользователя, у которого есть права на добавление компаний и сделок

- есть сервер, который отдает страницу с формой и принимает данные формы методом `POST`. В примерах это Express для JS, PHP-скрипт и Flask для Python

- путь вебхука хранится в окружении, а не в коде страницы. Страница с формой публичная, и попадать в нее секрет не должен

## 1\. Создаем веб-форму

Для формирования полей используем два метода:

-  [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — получаем список полей адреса. Результат сохраняем в массив `$arAddressFields`

-  [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — получаем список шаблонов реквизитов по полям `ID` и `NAME`. Результат сохраняем в массив `$arPresets`

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    const arAddressFields = (await $b24.actions.v2.call.make({
        method: 'crm.address.fields', params: {}, requestId: 'address-fields'
    })).getData().result
    const arPresets = (await $b24.actions.v2.call.make({
        method: 'crm.requisite.preset.list', params: { select: ['ID', 'NAME'] }, requestId: 'preset-list'
    })).getData().result
    ```

- PHP

    ```php
    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
    $arPresets = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();
    ```

- Python

    ```python
    ar_address_fields = client.crm.address.fields().result
    ar_presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result
    ```

{% endlist %}

Метод [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) возвращает массив объектов, а не пары «идентификатор — название». Для выпадающего списка перебирайте этот массив и берите из каждого объекта `ID` и `NAME`.

```json
{
    "result": [
        { "ID": "1", "NAME": "Организация" },
        { "ID": "3", "NAME": "ИП" },
        { "ID": "5", "NAME": "Физ. лицо" }
    ]
}
```

Метод [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) возвращает объект, где ключ — код поля, а значение — его описание с признаком обязательности `isRequired` и названием `title`.

```json
{
    "result": {
        "TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "TYPE_ID"
        },
        "ADDRESS_1": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Улица, дом, корпус, строение"
        },
        "CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Город"
        }
    }
}
```

Из массива `$arAddressFields` удаляем ненужные поля адреса, чтобы они не отображались в форме. Три из них — `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID` — обязательные системные, клиент их не заполняет, обработчик подставит их сам.

{% list tabs %}

- JS

    ```javascript
    for (const f of ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID']) {
        delete arAddressFields[f]
    }
    ```

- PHP

    ```php
    foreach (['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'] as $field) {
        unset($arAddressFields[$field]);
    }
    ```

- Python

    ```python
    for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
        ar_address_fields.pop(f, None)
    ```

{% endlist %}

Создаем HTML-форму с полями:

- `REQ_TYPE` — выпадающий список с шаблонами реквизитов из массива `$arPresets`. Обязательное поле

- `TITLE` — название компании. Обязательное поле

- `INN` — ИНН компании

- `PHONE` — номер телефона

- `ADDRESS` — поля для адреса создаются динамически из `$arAddressFields`. Если поле обязательное, добавляется атрибут `required`

Форма собирает данные и отправляет их методом `POST` в обработчик. Разметка формы — ниже (выпадающий список реквизитов и поля адреса подставляются из полученных данных).

{% list tabs %}

- JS

    ```javascript
    // строку с формой собираем из полученных данных и вставляем в ответ сервера
    const options = arPresets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
    const addressInputs = Object.entries(arAddressFields).map(([key, field]) =>
        `<input type="text" name="ADDRESS[${key}]" placeholder="${field.title}" ${field.isRequired ? 'required' : ''}>`
    ).join('')

    const formHtml = `
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Select</option>
                ${options}
            </select>
            <input type="text" name="TITLE" placeholder="Org name" required>
            <input type="text" name="INN" placeholder="INN">
            <input type="text" name="PHONE" placeholder="Phone">
            ${addressInputs}
            <input type="submit" value="Submit">
        </form>`
    ```

- PHP

    ```html
    <form id="form_to_crm">
        <select name="REQ_TYPE" required>
            <option value="" disabled selected>Select</option>
            <?php foreach($arPresets as $preset):?>
                <option value="<?=$preset->ID?>"><?=$preset->NAME?></option>
            <?php endforeach;?>
        </select>
        <input type="text" name="TITLE" placeholder="Org name" required>
        <input type="text" name="INN" placeholder="INN">
        <input type="text" name="PHONE" placeholder="Phone">
        <?php if(is_array($arAddressFields)):?>
            <?php foreach($arAddressFields as $key=>$arField):?>
                <input type="text" name="ADDRESS[<?=$key?>]" placeholder="<?=$arField['title']?>" <?=($arField['isRequired'])?'required':'';?>>
            <?php endforeach;?>
        <?php endif;?>
        <input type="submit" value="Submit">
    </form>
    ```

- Python

    ```python
    # строку с формой собираем из полученных данных и вставляем в ответ сервера
    from markupsafe import escape

    options = "".join(
        f'<option value="{escape(preset["ID"])}">{escape(preset["NAME"])}</option>'
        for preset in ar_presets
    )
    address_inputs = "".join(
        f'<input type="text" name="ADDRESS[{escape(key)}]" '
        f'placeholder="{escape(field["title"])}" '
        f'{"required" if field["isRequired"] else ""}>'
        for key, field in ar_address_fields.items()
    )

    form_html = f"""
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Select</option>
                {options}
            </select>
            <input type="text" name="TITLE" placeholder="Org name" required>
            <input type="text" name="INN" placeholder="INN">
            <input type="text" name="PHONE" placeholder="Phone">
            {address_inputs}
            <input type="submit" value="Submit">
        </form>"""
    ```

{% endlist %}

### Полный пример кода

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const app = express()

    // Страница с формой: получаем данные из Битрикс24 и рендерим HTML
    app.get('/', async (req, res) => {
        const arAddressFields = (await $b24.actions.v2.call.make({
            method: 'crm.address.fields', params: {}, requestId: 'address-fields'
        })).getData().result
        const arPresets = (await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.list', params: { select: ['ID', 'NAME'] }, requestId: 'preset-list'
        })).getData().result

        if (!arPresets.length) {
            res.send('No requisite types.')
            return
        }

        // Удаляем системные и неиспользуемые поля адреса
        for (const f of ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID']) {
            delete arAddressFields[f]
        }

        const options = arPresets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
        const addressInputs = Object.entries(arAddressFields).map(([key, field]) =>
            `<input type="text" name="ADDRESS[${key}]" placeholder="${field.title}" ${field.isRequired ? 'required' : ''}>`
        ).join('')

        res.send(`
            <form id="form_to_crm">
                <select name="REQ_TYPE" required>
                    <option value="" disabled selected>Select</option>
                    ${options}
                </select>
                <input type="text" name="TITLE" placeholder="Org name" required>
                <input type="text" name="INN" placeholder="INN">
                <input type="text" name="PHONE" placeholder="Phone">
                ${addressInputs}
                <input type="submit" value="Submit">
            </form>
            <script>
                document.getElementById('form_to_crm').addEventListener('submit', async (el) => {
                    el.preventDefault()
                    const formData = Object.fromEntries(new FormData(el.currentTarget).entries())
                    const response = await fetch('/form', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    })
                    alert((await response.json()).message)
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

    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();

    $arPresets = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();
    if(!empty($arPresets)):
        //unset system address fields
        unset($arAddressFields['TYPE_ID']);
        unset($arAddressFields['ENTITY_TYPE_ID']);
        unset($arAddressFields['ENTITY_ID']);
        //unset uninteresting address fields
        unset($arAddressFields['COUNTRY_CODE']);
        unset($arAddressFields['ANCHOR_TYPE_ID']);
        unset($arAddressFields['ANCHOR_ID']);
        ?>
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Select</option>
                <?php foreach($arPresets as $preset):?>
                    <option value="<?=$preset->ID?>"><?=$preset->NAME?></option>
                <?php endforeach;?>
            </select>
            <input type="text" name="TITLE" placeholder="Org name" required>
            <input type="text" name="INN" placeholder="INN">
            <input type="text" name="PHONE" placeholder="Phone">
            <?php if(is_array($arAddressFields)):?>
                <?php foreach($arAddressFields as $key=>$arField):?>
                    <input type="text" name="ADDRESS[<?=$key?>]" placeholder="<?=$arField['title']?>" <?=($arField['isRequired'])?'required':'';?>>
                <?php endforeach;?>
            <?php endif;?>
            <input type="submit" value="Submit">
        </form>
    <?php else:?>
        No requisite types.
    <?php endif;?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
    $(document).ready(function() {
        $('#form_to_crm').on( 'submit', function(el) {//event submit form
            el.preventDefault();//the default action of the event will not be triggered
            var formData = $(this).serialize();
            $.ajax({
                'method': 'POST',
                'dataType': 'json',
                'url': 'form.php', // файл для сохранения заполненных форм
                'data': formData,
                success: function(data){//success callback
                    alert(data.message);
                }
            });
        });
    });
    </script>
    ```

- Python

    ```python
    # pip install b24pysdk flask
    from flask import Flask
    from markupsafe import escape
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))

    # обычная строка без подстановок: фигурные скобки JS не нужно экранировать
    SCRIPT = """
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault();
                $.ajax({
                    'method': 'POST', 'dataType': 'json', 'url': '/form',
                    'data': $(this).serialize(),
                    success: function(data){ alert(data.message); }
                });
            });
        });
        </script>
    """


    @app.route("/")
    def form_page():
        ar_address_fields = client.crm.address.fields().result
        ar_presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result

        if not ar_presets:
            return "No requisite types."

        # unset system + uninteresting address fields
        for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
            ar_address_fields.pop(f, None)

        # строку с формой собираем из полученных данных
        options = "".join(
            f'<option value="{escape(preset["ID"])}">{escape(preset["NAME"])}</option>'
            for preset in ar_presets
        )
        address_inputs = "".join(
            f'<input type="text" name="ADDRESS[{escape(key)}]" '
            f'placeholder="{escape(field["title"])}" '
            f'{"required" if field["isRequired"] else ""}>'
            for key, field in ar_address_fields.items()
        )

        return f"""
            <form id="form_to_crm">
                <select name="REQ_TYPE" required>
                    <option value="" disabled selected>Select</option>
                    {options}
                </select>
                <input type="text" name="TITLE" placeholder="Org name" required>
                <input type="text" name="INN" placeholder="INN">
                <input type="text" name="PHONE" placeholder="Phone">
                {address_inputs}
                <input type="submit" value="Submit">
            </form>""" + SCRIPT
    ```

{% endlist %}

## 2\. Создаем обработчик формы

Создаем файл, который будет обрабатывать данные и сохранять их в CRM.

### Получаем данные

Получаем и обрабатываем данные из формы.

{% list tabs %}

- JS

    ```javascript
    const iRequisitePresetID = parseInt(req.body.REQ_TYPE, 10)
    const sTitle = String(req.body.TITLE ?? '')
    const sINN = String(req.body.INN ?? '')
    const sPhone = String(req.body.PHONE ?? '')
    const arAddress = {}
    for (const [key, val] of Object.entries(req.body.ADDRESS ?? {})) {
        arAddress[key] = String(val)
    }
    ```

- PHP

    ```php
    $iRequisitePresetID = intval($_POST["REQ_TYPE"]);
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sINN = htmlspecialchars($_POST["INN"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $arAddress = [];
    foreach ($_POST["ADDRESS"] as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    ```

- Python

    ```python
    i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
    s_title = request.form.get("TITLE", "")
    s_inn = request.form.get("INN", "")
    s_phone = request.form.get("PHONE", "")
    ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                  if k.startswith("ADDRESS[")}
    ```

{% endlist %}

-  `$iRequisitePresetID` — преобразуем идентификатор шаблона реквизитов `REQ_TYPE` в целое число

-  `$sTitle`, `$sINN`, `$sPhone` — безопасно обрабатываем данные из `TITLE`, `INN`, `PHONE`, чтобы избежать XSS-атак

-  `$arAddress` — сохраняем данные из массива с адресными полями `ADDRESS`

### Подготавливаем данные

Добавляем в массив `$arAddress` два обязательных системных поля.

-  `TYPE_ID` — тип адреса. Укажем `1` — фактический адрес. Список типов адресов можно получить с помощью метода [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `8` — реквизиты. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

Третье обязательное поле `ENTITY_ID` подставим позже: это идентификатор реквизита, а его еще нет.

{% list tabs %}

- JS

    ```javascript
    arAddress.TYPE_ID = 1
    arAddress.ENTITY_TYPE_ID = 8
    ```

- PHP

    ```php
    $arAddress['TYPE_ID'] = 1;
    $arAddress['ENTITY_TYPE_ID'] = 8;
    ```

- Python

    ```python
    ar_address["TYPE_ID"] = 1
    ar_address["ENTITY_TYPE_ID"] = 8
    ```

{% endlist %}

Система хранит телефон как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому значение `$sPhone` нужно привести к формату массива:

-  в первый элемент `VALUE` записываем `$sPhone`

-  во второй элемент `VALUE_TYPE` передаем, например, `WORK`

Если в переменной `$sPhone` нет значения, то указываем пустой массив.

{% list tabs %}

- JS

    ```javascript
    const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
    ```

- PHP

    ```php
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    ```

- Python

    ```python
    ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
    ```

{% endlist %}

### Добавляем компанию

Чтобы добавить компанию, используем метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В него нужно передать следующие данные:

-  `TITLE` — название компании. Передаем `$sTitle`, который получили из формы

-  `COMPANY_TYPE` — тип компании. Укажем `CUSTOMER` — клиент. Список типов можно получить с помощью метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром `'filter'=>['ENTITY_ID'=>'COMPANY_TYPE']`

-  `PHONE` — массив с телефоном `$arPhone`, который получили из формы

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    const companyResponse = await $b24.actions.v2.call.make({
        method: 'crm.company.add',
        params: { fields: { TITLE: sTitle, COMPANY_TYPE: 'CUSTOMER', PHONE: arPhone } },
        requestId: 'company-add'
    })
    const iCompanyID = companyResponse.getData()?.result
    ```

- PHP

    ```php
    $iCompanyID = $sb->getCRMScope()->company()->add([
        'TITLE' => $sTitle,
        'COMPANY_TYPE' => 'CUSTOMER',
        'PHONE' => $arPhone,
    ])->getId();
    ```

- Python

    ```python
    i_company_id = client.crm.company.add(fields={
        "TITLE": s_title,
        "COMPANY_TYPE": "CUSTOMER",
        "PHONE": ar_phone,
    }).result
    ```

{% endlist %}

Если компания успешно создана, метод вернет ее идентификатор в `$iCompanyID`. Сохраните значение: оно понадобится и реквизиту, и сделке.

```json
{
    "result": 2999
}
```

### Добавляем реквизиты

Чтобы добавить реквизиты, используем метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В него нужно передать следующие данные:

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `4` — компания. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

-  `ENTITY_ID` — идентификатор компании. Передаем `$iCompanyID`, который получили при создании компании

-  `PRESET_ID` — идентификатор шаблона реквизитов. Указываем `$iRequisitePresetID`, который получили из формы

-  `NAME` — название реквизита. Передаем `$sTitle`, который получили из формы

-  `RQ_INN` — ИНН компании. Передаем `$sINN`, который получили из формы

-  `ACTIVE` — флаг активности, укажем `Y`

{% list tabs %}

- JS

    ```javascript
    const requisiteResponse = await $b24.actions.v2.call.make({
        method: 'crm.requisite.add',
        params: {
            fields: {
                ENTITY_TYPE_ID: 4,
                ENTITY_ID: iCompanyID,
                PRESET_ID: iRequisitePresetID,
                ACTIVE: 'Y',
                NAME: sTitle,
                RQ_INN: sINN,
            }
        },
        requestId: 'requisite-add'
    })
    const iRequisiteID = requisiteResponse.getData()?.result
    ```

- PHP

    ```php
    $iRequisiteID = $sb->getCRMScope()->requisite()->add(
        entityId: $iCompanyID,
        entityTypeId: 4,
        requisitePresetId: $iRequisitePresetID,
        requisiteName: $sTitle,
        fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
    )->getId();
    ```

- Python

    ```python
    i_requisite_id = client.crm.requisite.add(fields={
        "ENTITY_TYPE_ID": 4,
        "ENTITY_ID": i_company_id,
        "PRESET_ID": i_requisite_preset_id,
        "ACTIVE": "Y",
        "NAME": s_title,
        "RQ_INN": s_inn,
    }).result
    ```

{% endlist %}

Если реквизиты успешно добавлены, метод вернет идентификатор записи в `$iRequisiteID`.

```json
{
    "result": 409
}
```

{% note warning "" %}

Метод не проверяет, существует ли шаблон с переданным `PRESET_ID`. С несуществующим идентификатором реквизит создастся, но останется без полей шаблона. Берите `PRESET_ID` из ответа [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md), а не подставляйте произвольное число.

{% endnote %}

### Добавляем адрес к реквизитам

1. Добавляем в массив `$arAddress` поле `ENTITY_ID` — идентификатор реквизита. Передаем `$iRequisiteID`, который получили при создании реквизита

   {% list tabs %}

   - JS

       ```javascript
       arAddress.ENTITY_ID = iRequisiteID
       ```

   - PHP

       ```php
       $arAddress['ENTITY_ID'] = $iRequisiteID;
       ```

   - Python

       ```python
       ar_address["ENTITY_ID"] = i_requisite_id
       ```

   {% endlist %}

2. Используем метод [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md). В него нужно передать массив `$arAddress`

   {% list tabs %}

   - JS

       ```javascript
       const bAddressAdded = (await $b24.actions.v2.call.make({
           method: 'crm.address.add', params: { fields: arAddress }, requestId: 'address-add'
       })).getData().result
       ```

   - PHP

       ```php
       $bAddressAdded = $sb->getCRMScope()->address()->add($arAddress)->isSuccess();
       ```

   - Python

       ```python
       b_address_added = client.crm.address.add(fields=ar_address).result
       ```

   {% endlist %}

Метод возвращает в переменной `$bAddressAdded` одно из значений:

-  `true` — адрес добавлен

-  `false` — адрес не добавлен

```json
{
    "result": true
}
```

### Добавляем сделку

Создаем массив `$arDealFields` с данными для сделки.

-  `TITLE`  — название сделки. Укажем название компании `$sTitle`, которое получено из формы

-  `COMPANY_ID` — идентификатор компании, которая привязана к сделке. Передаем `$iCompanyID`, который получили при создании компании

{% list tabs %}

- JS

    ```javascript
    const arDealFields = { TITLE: sTitle, COMPANY_ID: iCompanyID }
    ```

- PHP

    ```php
    $arDealFields = [
        'TITLE' => $sTitle,
        'COMPANY_ID' => $iCompanyID
    ];
    ```

- Python

    ```python
    ar_deal_fields = {"TITLE": s_title, "COMPANY_ID": i_company_id}
    ```

{% endlist %}

Реквизит в сделку отдельно передавать не нужно. Сделка получает реквизит от привязанной компании: Битрикс24 подставляет реквизит клиента автоматически при создании сделки с `COMPANY_ID`.

{% note warning "" %}

У сделки нет поля `REQUISITE_ID` — его нет и в ответе метода [crm.deal.fields](../../../api-reference/crm/deals/crm-deal-fields.md). Если передать `REQUISITE_ID` в [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md), метод не вернет ошибку, но значение будет проигнорировано.

{% endnote %}

Чтобы добавить сделку, используем метод [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md). В него передаем массив `$arDealFields`.

{% list tabs %}

- JS

    ```javascript
    const dealResponse = await $b24.actions.v2.call.make({
        method: 'crm.deal.add', params: { fields: arDealFields }, requestId: 'deal-add'
    })
    const iDealID = dealResponse.getData()?.result
    ```

- PHP

    ```php
    $iDealID = $sb->getCRMScope()->deal()->add($arDealFields)->getId();
    ```

- Python

    ```python
    i_deal_id = client.crm.deal.add(fields=ar_deal_fields).result
    ```

{% endlist %}

Если сделка создана успешно, метод вернет ее идентификатор.

```json
{
    "result": 1789
}
```

## Проверим результат

Откройте созданную сделку в Битрикс24. В карточке заполнено поле «Компания», а в компании на вкладке «Реквизиты» отображается реквизит с ИНН и адресом из формы.

Через REST связь сделки с реквизитом проверяет метод [crm.requisite.link.get](../../../api-reference/crm/requisites/links/crm-requisite-link-get.md) с параметрами:

- `entityTypeId` — `2`, сделка

- `entityId` — идентификатор созданной сделки

{% list tabs %}

- JS

    ```javascript
    const linkResponse = await $b24.actions.v2.call.make({
        method: 'crm.requisite.link.get',
        params: { entityTypeId: 2, entityId: iDealID },
        requestId: 'requisite-link-get'
    })

    console.dir(linkResponse.getData().result)
    ```

- PHP

    ```php
    // у crm.requisite.link.get нет обёртки в SDK — вызываем метод напрямую
    $link = $sb->core->call(
        'crm.requisite.link.get',
        [
            'entityTypeId' => 2,
            'entityId' => $iDealID,
        ]
    )->getResponseData()->getResult();
    ```

- Python

    ```python
    link = client.crm.requisite.link.get(
        entity_type_id=2,
        entity_id=i_deal_id,
    ).result
    ```

{% endlist %}

Сценарий выполнен, если `REQUISITE_ID` в ответе совпадает с идентификатором реквизита из шага «Добавляем реквизиты».

```json
{
    "result": {
        "ENTITY_TYPE_ID": 2,
        "ENTITY_ID": 1789,
        "REQUISITE_ID": "409",
        "BANK_DETAIL_ID": "0",
        "MC_REQUISITE_ID": "0",
        "MC_BANK_DETAIL_ID": "0"
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса. Методы реквизитов и адресов возвращают ошибки с пустым кодом, поэтому ориентируйтесь на текст в `error_description`.

#|
|| **Текст ошибки** | **Причина и действие** ||
|| `Entity not found.` | В [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) передан `ENTITY_ID` несуществующей компании. Возьмите идентификатор из ответа [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) ||
|| `ENTITY_TYPE_ID is not defined or invalid.` | Не передан или неверен тип владельца. Для реквизита компании нужно `4`, для адреса реквизита — `8` ||
|| `ENTITY_ID is not defined or invalid.` | Не передан идентификатор владельца. В [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) это идентификатор реквизита, а не компании ||
|| `TYPE_ID is not defined or invalid.` | В [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) не передан тип адреса. Список значений возвращает метод [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md) ||
|| `TypeAddress exists.` | У реквизита уже есть адрес такого типа. Один реквизит хранит по одному адресу каждого типа — измените существующий методом [crm.address.update](../../../api-reference/crm/requisites/addresses/crm-address-update.md) или передайте другой `TYPE_ID` ||
|| `Access denied.` | У пользователя нет прав на добавление компании или сделки. Проверьте, от имени какого пользователя создан вебхук ||
|#

Сценарий создает четыре объекта подряд, и ошибка на любом шаге оставляет предыдущие объекты в CRM. Повторяйте не весь обработчик, а тот шаг, который упал:

- ошибка в [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) — в CRM ничего не создано, можно повторить обработчик целиком

- ошибка в [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) — компания уже создана. Повторный запуск обработчика создаст ее дубль, поэтому передайте существующий `ENTITY_ID`

- ошибка в [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) — компания и реквизит уже созданы, сделки еще нет. Добавьте адрес отдельным вызовом и создайте сделку

Если сделка создалась, но реквизит к ней не привязался, у компании больше одного реквизита. Битрикс24 подставляет только один, и это не обязательно тот, который создал обработчик.

## Что важно учитывать

- чтобы привязать к сделке конкретный реквизит, а не тот, который Битрикс24 подставил сам, вызовите метод [crm.requisite.link.register](../../../api-reference/crm/requisites/links/crm-requisite-link-register.md) с `ENTITY_TYPE_ID`: `2`. Метод требует все четыре идентификатора связи — `REQUISITE_ID`, `BANK_DETAIL_ID`, `MC_REQUISITE_ID` и `MC_BANK_DETAIL_ID`. Ненужные передавайте нулями, иначе метод вернет ошибку вида `MC_REQUISITE_ID is not defined or invalid`

- один реквизит хранит по одному адресу каждого типа. Второй адрес того же типа метод [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) не создаст

- метод [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) возвращает `true` или `false`, а не идентификатор. Отдельного идентификатора у адреса нет: он опознается парой `ENTITY_TYPE_ID` и `ENTITY_ID` плюс `TYPE_ID`

- набор полей реквизита зависит от шаблона. У шаблона физического лица поля `RQ_INN` нет: значение сохранится и вернется в [crm.requisite.get](../../../api-reference/crm/requisites/universal/crm-requisite-get.md), но в карточке реквизита не отобразится. Состав полей шаблона возвращает метод [crm.requisite.preset.field.list](../../../api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-list.md)

- повторная отправка формы с теми же данными создает новую компанию, новый реквизит и новую сделку. Дубликаты не отсеиваются

### Полный пример кода обработчика

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    export async function handler(req, res) {
        const iRequisitePresetID = parseInt(req.body.REQ_TYPE, 10)
        const sTitle = String(req.body.TITLE ?? '')
        const sINN = String(req.body.INN ?? '')
        const sPhone = String(req.body.PHONE ?? '')

        const arAddress = {}
        for (const [key, val] of Object.entries(req.body.ADDRESS ?? {})) {
            arAddress[key] = String(val)
        }
        arAddress.TYPE_ID = 1 // 1 — фактический адрес (crm.enum.addresstype)
        arAddress.ENTITY_TYPE_ID = 8 // 8 — реквизит (crm.enum.ownertype)

        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []

        try {
            const companyResponse = await $b24.actions.v2.call.make({
                method: 'crm.company.add',
                params: { fields: { TITLE: sTitle, COMPANY_TYPE: 'CUSTOMER', PHONE: arPhone } },
                requestId: 'company-add'
            })
            const iCompanyID = companyResponse.getData()?.result
            if (!iCompanyID) {
                res.json({ message: 'not added: ' + companyResponse.getErrorMessages().join('; ') })
                return
            }

            const requisiteResponse = await $b24.actions.v2.call.make({
                method: 'crm.requisite.add',
                params: {
                    fields: {
                        ENTITY_TYPE_ID: 4, // 4 — компания (crm.enum.ownertype)
                        ENTITY_ID: iCompanyID,
                        PRESET_ID: iRequisitePresetID,
                        ACTIVE: 'Y',
                        NAME: sTitle,
                        RQ_INN: sINN,
                    }
                },
                requestId: 'requisite-add'
            })
            const iRequisiteID = requisiteResponse.getData()?.result

            if (iRequisiteID) {
                arAddress.ENTITY_ID = iRequisiteID
                await $b24.actions.v2.call.make({
                    method: 'crm.address.add', params: { fields: arAddress }, requestId: 'address-add'
                })
            }

            // Реквизит в сделку не передаем: у сделки нет поля REQUISITE_ID,
            // Битрикс24 сам подставит реквизит привязанной компании
            await $b24.actions.v2.call.make({
                method: 'crm.deal.add',
                params: { fields: { TITLE: sTitle, COMPANY_ID: iCompanyID } },
                requestId: 'deal-add'
            })

            res.json({ message: 'add' })
        } catch (e) {
            res.json({ message: 'not added: ' + e.message })
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

    $iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sINN = htmlspecialchars($_POST["INN"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $arAddress = [];

    foreach($_POST["ADDRESS"] as $key=>$val){
        $arAddress[$key] = htmlspecialchars($val);
    }
    $arAddress['TYPE_ID'] = 1; // 1 — фактический адрес (crm.enum.addresstype)
    $arAddress['ENTITY_TYPE_ID'] = 8; // 8 — реквизит (crm.enum.ownertype)

    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();

    try {
        $iCompanyID = $crm->company()->add([
            'TITLE' => $sTitle,
            'COMPANY_TYPE' => 'CUSTOMER', // клиент (crm.status.list ENTITY_ID=COMPANY_TYPE)
            'PHONE' => $arPhone,
        ])->getId();

        $iRequisiteID = $crm->requisite()->add(
            entityId: $iCompanyID,
            entityTypeId: 4, // 4 — компания (crm.enum.ownertype)
            requisitePresetId: $iRequisitePresetID,
            requisiteName: $sTitle,
            fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
        )->getId();

        if (!empty($iRequisiteID)) {
            $arAddress['ENTITY_ID'] = $iRequisiteID;
            $crm->address()->add($arAddress);
        }

        // Реквизит в сделку не передаем: у сделки нет поля REQUISITE_ID,
        // Битрикс24 сам подставит реквизит привязанной компании
        $crm->deal()->add([
            'TITLE' => $sTitle,
            'COMPANY_ID' => $iCompanyID
        ]);
        echo json_encode(['message' => 'add']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'not added: ' . $e->getMessage()]);
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
    def handle_form():
        i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
        s_title = request.form.get("TITLE", "")
        s_inn = request.form.get("INN", "")
        s_phone = request.form.get("PHONE", "")

        ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                      if k.startswith("ADDRESS[")}
        ar_address["TYPE_ID"] = 1  # 1 — фактический адрес (crm.enum.addresstype)
        ar_address["ENTITY_TYPE_ID"] = 8  # 8 — реквизит (crm.enum.ownertype)

        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []

        try:
            i_company_id = client.crm.company.add(fields={
                "TITLE": s_title,
                "COMPANY_TYPE": "CUSTOMER",  # клиент (crm.status.list ENTITY_ID=COMPANY_TYPE)
                "PHONE": ar_phone,
            }).result

            i_requisite_id = client.crm.requisite.add(fields={
                "ENTITY_TYPE_ID": 4,  # 4 — компания (crm.enum.ownertype)
                "ENTITY_ID": i_company_id,
                "PRESET_ID": i_requisite_preset_id,
                "ACTIVE": "Y",
                "NAME": s_title,
                "RQ_INN": s_inn,
            }).result

            if i_requisite_id:
                ar_address["ENTITY_ID"] = i_requisite_id
                client.crm.address.add(fields=ar_address)

            # Реквизит в сделку не передаем: у сделки нет поля REQUISITE_ID,
            # Битрикс24 сам подставит реквизит привязанной компании
            client.crm.deal.add(fields={
                "TITLE": s_title,
                "COMPANY_ID": i_company_id,
            })
            return jsonify({"message": "add"})
        except Exception as e:
            return jsonify({"message": f"not added: {e}"})
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/companies/crm-company-add.md)
- [{#T}](../../../api-reference/crm/requisites/universal/crm-requisite-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-add.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-fields.md)
- [{#T}](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md)
- [{#T}](../../../api-reference/crm/requisites/links/crm-requisite-link-register.md)
- [{#T}](../../../api-reference/crm/requisites/links/crm-requisite-link-get.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
