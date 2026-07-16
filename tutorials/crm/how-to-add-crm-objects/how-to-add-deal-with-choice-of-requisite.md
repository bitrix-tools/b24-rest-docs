# Добавить сделку и компанию с реквизитами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

С помощью веб-формы можно автоматически добавлять новые сделки и компании с реквизитами в Битрикс24. Когда клиент заполняет форму, данные попадают в обработчик. Скрипт-обработчик создает объекты в CRM через API.

Настройка состоит из двух этапов.

1. Подготавливаем поля и размещаем веб-форму на странице.

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) и [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md).

## 1\. Создаем веб-форму

Для формирования полей используем два метода:

-  [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — получаем список полей адреса. Результат сохраняем в массив `$arAddressFields`,

-  [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — получаем список шаблонов реквизитов по полям `ID` и `NAME`. Результат сохраняем в массив `$arRequisiteType`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    const arAddressFields = (await $b24.actions.v2.call.make({
        method: 'crm.address.fields', params: {}, requestId: 'address-fields'
    })).getData().result
    const arRequisiteType = (await $b24.actions.v2.call.make({
        method: 'crm.requisite.preset.list', params: { select: ['ID', 'NAME'] }, requestId: 'preset-list'
    })).getData().result
    ```

- PHP

    ```php
    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
    $arRequisiteType = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();
    ```

- Python

    ```python
    ar_address_fields = client.crm.address.fields().result
    ar_requisite_type = client.crm.requisite.preset.list(select=["ID", "NAME"]).result
    ```

{% endlist %}

Из массива `$arAddressFields` удаляем ненужные поля адреса, чтобы они не отображались в форме.

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

- `REQ_TYPE` — выпадающий список с шаблонами реквизитов из массива `$arRequisiteType`. Обязательное поле.

- `TITLE` — название компании. Обязательное поле.

- `INN` — ИНН компании.

- `PHONE` — номер телефона.

- `ADDRESS` — поля для адреса создаются динамически из `$arAddressFields`. Если поле обязательное, добавляется атрибут `required`.

Форма собирает данные и отправляет их методом `POST` в обработчик. Разметка формы — ниже (выпадающий список реквизитов и поля адреса подставляются из полученных данных).

{% list tabs %}

- JS

    ```javascript
    // строку с формой собираем из полученных данных и вставляем в ответ сервера
    const options = presets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
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
            <?php foreach($arRequisiteType as $id=>$name):?>
                <option value="<?=$id?>"><?=$name?></option>
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
        f'<option value="{escape(preset_id)}">{escape(name)}</option>'
        for preset_id, name in requisite_types.items()
    )
    address_inputs = "".join(
        f'<input type="text" name="ADDRESS[{escape(key)}]" '
        f'placeholder="{escape(field["title"])}" '
        f'{"required" if field["isRequired"] else ""}>'
        for key, field in address_fields.items()
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
        const presets = (await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.list', params: { select: ['ID', 'NAME'] }, requestId: 'preset-list'
        })).getData().result

        if (!presets.length) {
            res.send('No requisite types.')
            return
        }

        // Удаляем системные и неиспользуемые поля адреса
        for (const f of ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID']) {
            delete arAddressFields[f]
        }

        const options = presets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
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
        $arRequisiteType = [];
        foreach ($arPresets as $preset) {
            $arRequisiteType[$preset->ID] = $preset->NAME;
        }
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
                <?php foreach($arRequisiteType as $id=>$name):?>
                    <option value="<?=$id?>"><?=$name?></option>
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
        address_fields = client.crm.address.fields().result
        presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result

        requisite_types = {p["ID"]: p["NAME"] for p in presets}
        if not requisite_types:
            return "No requisite types."

        # unset system + uninteresting address fields
        for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
            address_fields.pop(f, None)

        # строку с формой собираем из полученных данных
        options = "".join(
            f'<option value="{escape(preset_id)}">{escape(name)}</option>'
            for preset_id, name in requisite_types.items()
        )
        address_inputs = "".join(
            f'<input type="text" name="ADDRESS[{escape(key)}]" '
            f'placeholder="{escape(field["title"])}" '
            f'{"required" if field["isRequired"] else ""}>'
            for key, field in address_fields.items()
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

-  `$iRequisitePresetID` — преобразуем идентификатор шаблона реквизитов `REQ_TYPE` в целое число.

-  `$sTitle`, `$sINN`, `$sPhone` — безопасно обрабатываем данные из `TITLE`, `INN`, `PHONE`, чтобы избежать XSS-атак.

-  `$arAddress` — сохраняем данные из массива с адресными полями `ADDRESS`.

### Подготавливаем данные

Добавляем в массив `$arAddress` два обязательных системных поля.

-  `TYPE_ID` — тип адреса. Укажем `1` — фактический адрес. Список типов адресов можно получить с помощью метода [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md).

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `8` — реквизиты. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

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

-  в первый элемент `VALUE` записываем `$sPhone`,

-  во второй элемент `VALUE_TYPE` передаем, например, `WORK`.

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

-  `TITLE` — название компании. Передаем `$sTitle`, который получили из формы.

-  `COMPANY_TYPE` — тип компании. Укажем `CUSTOMER` — клиент. Список типов можно получить с помощью метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром `'filter'=>['ENTITY_ID'=>’COMPANY_TYPE']`.

-  `PHONE` — массив с телефоном `$arPhone`, который получили из формы.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.company.add',
        params: { fields: { TITLE: sTitle, COMPANY_TYPE: 'CUSTOMER', PHONE: arPhone } },
        requestId: 'company-add'
    })
    const result = result.getData()?.result
    ```

- PHP

    ```php
    $result = $sb->getCRMScope()->company()->add([
        'TITLE' => $sTitle,
        'COMPANY_TYPE' => 'CUSTOMER',
        'PHONE' => $arPhone,
    ])->getId();
    ```

- Python

    ```python
    result = client.crm.company.add(fields={
        "TITLE": s_title,
        "COMPANY_TYPE": "CUSTOMER",
        "PHONE": ar_phone,
    }).result
    ```

{% endlist %}

Если компания успешно создана, метод вернет ее идентификатор в `$result`. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

### Добавляем реквизиты

Чтобы добавить реквизиты, используем метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В него нужно передать следующие данные:

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `4` — компания. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

-  `ENTITY_ID` — идентификатор компании. Передаем `$result`, который получили при создании компании.

-  `PRESET_ID` — идентификатор шаблона реквизитов. Указываем `$iRequisitePresetID`, который получили из формы.

-  `NAME` — название реквизита. Передаем `$sTitle`, который получили из формы.

-  `RQ_INN` — ИНН компании. Передаем `$sINN`, который получили из формы.

-  `ACTIVE` — флаг активности, укажем `Y`.

{% list tabs %}

- JS

    ```javascript
    const resultRequisite = await $b24.actions.v2.call.make({
        method: 'crm.requisite.add',
        params: {
            fields: {
                ENTITY_TYPE_ID: 4,
                ENTITY_ID: result,
                PRESET_ID: iRequisitePresetID,
                ACTIVE: 'Y',
                NAME: sTitle,
                RQ_INN: sINN,
            }
        },
        requestId: 'requisite-add'
    })
    const resultRequisite = resultRequisite.getData()?.result
    ```

- PHP

    ```php
    $resultRequisite = $sb->getCRMScope()->requisite()->add(
        entityId: $result,
        entityTypeId: 4,
        requisitePresetId: $iRequisitePresetID,
        requisiteName: $sTitle,
        fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
    )->getId();
    ```

- Python

    ```python
    result_requisite = client.crm.requisite.add(fields={
        "ENTITY_TYPE_ID": 4,
        "ENTITY_ID": result,
        "PRESET_ID": i_requisite_preset_id,
        "ACTIVE": "Y",
        "NAME": s_title,
        "RQ_INN": s_inn,
    }).result
    ```

{% endlist %}

Если реквизиты успешно добавлены, метод вернет идентификатор записи в `$resultRequisite`. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md).

### Добавляем адрес к реквизитам

1. Добавляем в массив `$arAddress` поле `ENTITY_ID` — идентификатор реквизита. Передаем `$resultRequisite`, который получили при создании реквизита.

   {% list tabs %}

   - JS

       ```javascript
       arAddress.ENTITY_ID = resultRequisite
       ```

   - PHP

       ```php
       $arAddress['ENTITY_ID'] = $resultRequisite;
       ```

   - Python

       ```python
       ar_address["ENTITY_ID"] = result_requisite
       ```

   {% endlist %}

2. Используем метод [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md). В него нужно передать массив `$arAddress`.

   {% list tabs %}

   - JS

       ```javascript
       const resultAddress = (await $b24.actions.v2.call.make({
           method: 'crm.address.add', params: { fields: arAddress }, requestId: 'address-add'
       })).getData().result
       ```

   - PHP

       ```php
       $resultAddress = $sb->getCRMScope()->address()->add($arAddress)->isSuccess();
       ```

   - Python

       ```python
       result_address = client.crm.address.add(fields=ar_address).result
       ```

   {% endlist %}

Метод возвращает в переменной `$resultAddress` одно из значений:

-  `true` — адрес добавлен,

-  `false` — адрес не добавлен.

### **Добавляем сделку**

Создаем массив `$arDealFields` с данными для сделки.

-  `TITLE`  — название сделки. Укажем название компании `$sTitle`, которое получено из формы,

-  `COMPANY_ID` — идентификатор компании, которая привязана к сделке. Передаем `$result`, который получили при создании компании,

-  `REQUISITE_ID` — идентификатор реквизита. Если реквизит создан, передаем `$resultRequisite`.

{% list tabs %}

- JS

    ```javascript
    const arDealFields = { TITLE: sTitle, COMPANY_ID: result }
    if (resultRequisite) {
        arDealFields.REQUISITE_ID = resultRequisite
    }
    ```

- PHP

    ```php
    $arDealFields = [
        'TITLE' => $sTitle,
        'COMPANY_ID' => $result
    ];
    if (!empty($resultRequisite)) {
        $arDealFields['REQUISITE_ID'] = $resultRequisite;
    }
    ```

- Python

    ```python
    ar_deal_fields = {"TITLE": s_title, "COMPANY_ID": result}
    if result_requisite:
        ar_deal_fields["REQUISITE_ID"] = result_requisite
    ```

{% endlist %}

Чтобы добавить сделку, используем метод [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md). В него передаем массив `$arDealFields`.

{% list tabs %}

- JS

    ```javascript
    const resultDeal = await $b24.actions.v2.call.make({
        method: 'crm.deal.add', params: { fields: arDealFields }, requestId: 'deal-add'
    })
    ```

- PHP

    ```php
    $dealId = $sb->getCRMScope()->deal()->add($arDealFields)->getId();
    ```

- Python

    ```python
    deal_id = client.crm.deal.add(fields=ar_deal_fields).result
    ```

{% endlist %}

Если сделка создана успешно, метод вернет ее идентификатор. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md).

```json
{
    "result": 1789,
}
```

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
            const result = await $b24.actions.v2.call.make({
                method: 'crm.company.add',
                params: { fields: { TITLE: sTitle, COMPANY_TYPE: 'CUSTOMER', PHONE: arPhone } },
                requestId: 'company-add'
            })
            const result = result.getData()?.result
            if (!result) {
                res.json({ message: 'not added: ' + result.getErrorMessages().join('; ') })
                return
            }

            const resultRequisite = await $b24.actions.v2.call.make({
                method: 'crm.requisite.add',
                params: {
                    fields: {
                        ENTITY_TYPE_ID: 4, // 4 — компания (crm.enum.ownertype)
                        ENTITY_ID: result,
                        PRESET_ID: iRequisitePresetID,
                        ACTIVE: 'Y',
                        NAME: sTitle,
                        RQ_INN: sINN,
                    }
                },
                requestId: 'requisite-add'
            })

            const arDealFields = { TITLE: sTitle, COMPANY_ID: result }
            const resultRequisite = resultRequisite.getData()?.result
            if (resultRequisite) {
                arDealFields.REQUISITE_ID = resultRequisite
                arAddress.ENTITY_ID = resultRequisite
                await $b24.actions.v2.call.make({
                    method: 'crm.address.add', params: { fields: arAddress }, requestId: 'address-add'
                })
            }

            await $b24.actions.v2.call.make({
                method: 'crm.deal.add', params: { fields: arDealFields }, requestId: 'deal-add'
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
        $result = $crm->company()->add([
            'TITLE' => $sTitle,
            'COMPANY_TYPE' => 'CUSTOMER', // клиент (crm.status.list ENTITY_ID=COMPANY_TYPE)
            'PHONE' => $arPhone,
        ])->getId();

        $resultRequisite = $crm->requisite()->add(
            entityId: $result,
            entityTypeId: 4, // 4 — компания (crm.enum.ownertype)
            requisitePresetId: $iRequisitePresetID,
            requisiteName: $sTitle,
            fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
        )->getId();

        $arDealFields = [
            'TITLE' => $sTitle,
            'COMPANY_ID' => $result
        ];
        if (!empty($resultRequisite)) {
            $arDealFields['REQUISITE_ID'] = $resultRequisite;
            $arAddress['ENTITY_ID'] = $resultRequisite;
            $crm->address()->add($arAddress);
        }

        $crm->deal()->add($arDealFields);
        echo json_encode(['message' => 'add']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'not added: ' . $e->getMessage()]);
    }
    ```

- Python

    ```python
    # pip install b24pysdk
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


    @app.route("/form.php", methods=["POST"])
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
            result = client.crm.company.add(fields={
                "TITLE": s_title,
                "COMPANY_TYPE": "CUSTOMER",  # клиент (crm.status.list ENTITY_ID=COMPANY_TYPE)
                "PHONE": ar_phone,
            }).result

            result_requisite = client.crm.requisite.add(fields={
                "ENTITY_TYPE_ID": 4,  # 4 — компания (crm.enum.ownertype)
                "ENTITY_ID": result,
                "PRESET_ID": i_requisite_preset_id,
                "ACTIVE": "Y",
                "NAME": s_title,
                "RQ_INN": s_inn,
            }).result

            ar_deal_fields = {"TITLE": s_title, "COMPANY_ID": result}
            if result_requisite:
                ar_deal_fields["REQUISITE_ID"] = result_requisite
                ar_address["ENTITY_ID"] = result_requisite
                client.crm.address.add(fields=ar_address)

            client.crm.deal.add(fields=ar_deal_fields)
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
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
