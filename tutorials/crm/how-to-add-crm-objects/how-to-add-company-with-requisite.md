# Добавить компанию с реквизитами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания компаний в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных и реквизитов клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместим форму на PHP-странице. В коде страницы получим список шаблонов реквизитов и поля адреса для формы. Данные формы отправим в обработчик.

2. Создадим файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст компанию с реквизитами.

## 1\. Создаем веб-форму

Для формирования полей формы используем данные из Битрикс24. Чтобы получить информацию о настройках реквизитов, выполним последовательно два метода:

1. [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — получаем список полей адреса. Результат сохраняем в `arAddressFields`,

   {% list tabs %}

   - JS

       ```javascript
       const arAddressFields = await $b24.actions.v2.call.make({
           method: 'crm.address.fields', params: {}, requestId: 'address-fields'
       })
       ```

   - PHP

       ```php
       $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
       ```

   - Python

       ```python
       ar_address_fields = client.crm.address.fields().result
       ```

   {% endlist %}

2. [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — запрашиваем список шаблонов реквизитов. С помощью параметра `select` выбираем поля `ID` и `NAME` для каждого шаблона. Результат сохраняем в `arRequisiteType`.

   {% list tabs %}

   - JS

       ```javascript
       const arRequisiteType = await $b24.actions.v2.call.make({
           method: 'crm.requisite.preset.list',
           params: { select: ['ID', 'NAME'] },
           requestId: 'preset-list'
       })
       ```

   - PHP

       ```php
       $arRequisiteType = $sb->getCRMScope()->requisitePreset()->list(
           order: [], filter: [], select: ['ID', 'NAME']
       )->getRequisitePresets();
       ```

   - Python

       ```python
       ar_requisite_type = client.crm.requisite.preset.list(select=["ID", "NAME"]).result
       ```

   {% endlist %}

Добавим на страницу сайта веб-форму с полями:

-  `REQ_TYPE` — выпадающий список с типом реквизитов из массива `arRequisiteType`,
  
-  `TITLE` — название компании, обязательное,

-  `INN` — ИНН,

-  `PHONE` — телефон,

-  `${addressFieldsInputs}` — поля адреса, которые создаются динамически из массива `arAddressFields`.

Форма отправляет данные методом `POST` в обработчик.

### Полный пример кода страницы с формой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

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
        // Получаем список полей адреса и шаблонов реквизитов
        const arAddressFields = (await $b24.actions.v2.call.make({
            method: 'crm.address.fields', params: {}, requestId: 'address-fields'
        })).getData().result
        const presets = (await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.list', params: { select: ['ID', 'NAME'] }, requestId: 'preset-list'
        })).getData().result

        if (!presets.length) {
            res.send('<p>Нет доступных типов реквизитов.</p>')
            return
        }

        // Удаляем системные и неиспользуемые поля адреса
        for (const f of ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID']) {
            delete arAddressFields[f]
        }

        // Собираем выпадающий список реквизитов и поля адреса
        const options = presets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
        const addressInputs = Object.entries(arAddressFields).map(([key, field]) =>
            `<input type="text" name="ADDRESS[${key}]" placeholder="${field.title}" ${field.isRequired ? 'required' : ''}>`
        ).join('')

        res.send(`
            <form id="form_to_crm">
                <select name="REQ_TYPE" required>
                    <option value="" disabled selected>Выберите тип реквизитов</option>
                    ${options}
                </select>
                <input type="text" name="TITLE" placeholder="Название организации" required>
                <input type="text" name="INN" placeholder="ИНН">
                <input type="text" name="PHONE" placeholder="Телефон">
                ${addressInputs}
                <input type="submit" value="Отправить">
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

    // Получаем список полей адреса и шаблонов реквизитов
    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
    $arPresets = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();

    if(!empty($arPresets)):
        $arRequisiteType = [];
        foreach ($arPresets as $preset) {
            $arRequisiteType[$preset->ID] = $preset->NAME;
        }
        // Удаляем системные и неиспользуемые поля адреса
        $excludeFields = ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'];
        foreach($excludeFields as $field) {
            unset($arAddressFields[$field]);
        }
    ?>
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                <?php foreach($arRequisiteType as $id => $name): ?>
                    <option value="<?=$id?>"><?=$name?></option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="TITLE" placeholder="Название организации" required>
            <input type="text" name="INN" placeholder="ИНН">
            <input type="text" name="PHONE" placeholder="Телефон">
            <?php foreach($arAddressFields as $key => $arField): ?>
                <input type="text" name="ADDRESS[<?=$key?>]" 
                       placeholder="<?=$arField['title']?>" 
                       <?=$arField['isRequired'] ? 'required' : ''?>>
            <?php endforeach; ?>
            <input type="submit" value="Отправить">
        </form>
    <?php else: ?>
        <p>Нет доступных типов реквизитов.</p>
    <?php endif; ?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
    $(document).ready(function() {
        $('#form_to_crm').on('submit', function(el) {
            el.preventDefault();
            $.ajax({
                method: 'POST',
                dataType: 'json',
                url: 'form.php',
                data: $(this).serialize(),
                success: function(data) {
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
    from flask import Flask, render_template_string
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))

    PAGE = """
        {% if requisite_types %}
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                {% for id, name in requisite_types.items() %}
                    <option value="{{ id }}">{{ name }}</option>
                {% endfor %}
            </select>
            <input type="text" name="TITLE" placeholder="Название организации" required>
            <input type="text" name="INN" placeholder="ИНН">
            <input type="text" name="PHONE" placeholder="Телефон">
            {% for key, field in address_fields.items() %}
                <input type="text" name="ADDRESS[{{ key }}]"
                       placeholder="{{ field.title }}" {{ 'required' if field.isRequired else '' }}>
            {% endfor %}
            <input type="submit" value="Отправить">
        </form>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault();
                $.ajax({
                    method: 'POST', dataType: 'json', url: '/form',
                    data: $(this).serialize(),
                    success: function(data) { alert(data.message); }
                });
            });
        });
        </script>
        {% else %}
        <p>Нет доступных типов реквизитов.</p>
        {% endif %}
    """


    @app.route("/")
    def form_page():
        # Получаем список полей адреса и шаблонов реквизитов
        address_fields = client.crm.address.fields().result
        presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result

        requisite_types = {p["ID"]: p["NAME"] for p in presets}

        # Удаляем системные и неиспользуемые поля адреса
        for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
            address_fields.pop(f, None)

        return render_template_string(PAGE, requisite_types=requisite_types, address_fields=address_fields)
    ```

{% endlist %}

## 2\. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить компанию в CRM, создадим обработчик `form.php`.

### Подготавливаем данные

Получаем и очищаем данные из формы:

-  `REQ_TYPE` приводим к числу,

-  `TITLE`, `INN`, `PHONE` очищаем от HTML-тегов.

{% list tabs %}

- JS

    ```javascript
    const iRequisitePresetID = parseInt(req.body.REQ_TYPE, 10)
    const sTitle = String(req.body.TITLE ?? '')
    const sINN = String(req.body.INN ?? '')
    const sPhone = String(req.body.PHONE ?? '')
    ```

- PHP

    ```php
    $iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sINN = htmlspecialchars($_POST["INN"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    ```

- Python

    ```python
    i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
    s_title = request.form.get("TITLE", "")
    s_inn = request.form.get("INN", "")
    s_phone = request.form.get("PHONE", "")
    ```

{% endlist %}

Подготавливаем поля адреса и собираем их в массив `$arAddress`.

-  Значения полей из формы очищаем от HTML-тегов.

-  Добавляем тип адреса `TYPE_ID`. Получить типы адресов можно методом [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md). Укажем значение — `1`, то есть фактический адрес.

-  Добавляем идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type) `ENTITY_TYPE_ID`. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `8`, то есть реквизит.

{% list tabs %}

- JS

    ```javascript
    const arAddress = {}
    for (const [key, val] of Object.entries(req.body.ADDRESS ?? {})) {
        arAddress[key] = String(val)
    }
    arAddress.TYPE_ID = 1
    arAddress.ENTITY_TYPE_ID = 8
    ```

- PHP

    ```php
    $arAddress = [];
    foreach($_POST["ADDRESS"] as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    $arAddress['TYPE_ID'] = 1;
    $arAddress['ENTITY_TYPE_ID'] = 8;
    ```

- Python

    ```python
    ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                  if k.startswith("ADDRESS[")}
    ar_address["TYPE_ID"] = 1
    ar_address["ENTITY_TYPE_ID"] = 8
    ```

{% endlist %}

Система хранит телефон как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому его нужно привести к формату массива.

1. Добавляем телефон первым элементом `VALUE` в массив, а вторым значением указываем тип `VALUE_TYPE`, например, `WORK`.

2. Для пустого значения передаем пустой массив.

{% list tabs %}

- JS

    ```javascript
    const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
    ```

- PHP

    ```php
    $arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];
    ```

- Python

    ```python
    ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
    ```

{% endlist %}

### Добавляем компанию

Для создания компании выполним метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В объекте `fields` передаем поля:

-  `TITLE` — название компании.

-  `COMPANY_TYPE` — тип компании. Узнать типы компаний можно методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md), если использовать фильтр `filter` по полю `ENTITY_ID` со значением `COMPANY_TYPE`. В примере укажем значение `CUSTOMER`, так как заполняют форму только клиенты компании.

-  `PHONE` — телефон.

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
    const companyId = result.getData()?.result
    ```

- PHP

    ```php
    $companyId = $sb->getCRMScope()->company()->add([
        'TITLE' => $sTitle,
        'COMPANY_TYPE' => 'CUSTOMER', // Тип компании — клиент
        'PHONE' => $arPhone
    ])->getId();
    ```

- Python

    ```python
    company_id = client.crm.company.add(fields={
        "TITLE": s_title,
        "COMPANY_TYPE": "CUSTOMER",  # Тип компании — клиент
        "PHONE": ar_phone,
    }).result
    ```

{% endlist %}

В результате получим идентификатор новой компании `5`.

```json
{
	"result": 5
}
```

### Добавляем реквизиты в компанию

Для добавления реквизитов в компанию выполним метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В объекте `fields` передаем поля:

-  `ENTITY_TYPE_ID` — идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). В примере укажем значение `4`, то есть компания,

-  `ENTITY_ID` — идентификатор компании, который получили в предыдущем запросе,

-  `PRESET_ID` — идентификатор шаблона реквизитов, который получили из формы,

-  `ACTIVE` — активность реквизита `Y`,

-  `NAME` — название реквизита,

-  `RQ_INN` — ИНН компании.

{% list tabs %}

- JS

    ```javascript
    await $b24.actions.v2.call.make({
        method: 'crm.requisite.add',
        params: {
            fields: {
                ENTITY_TYPE_ID: 4,
                ENTITY_ID: companyId,
                PRESET_ID: iRequisitePresetID,
                ACTIVE: 'Y',
                NAME: sTitle,
                RQ_INN: sINN,
            }
        },
        requestId: 'requisite-add'
    })
    ```

- PHP

    ```php
    $sb->getCRMScope()->requisite()->add(
        entityId: $companyId,
        entityTypeId: 4,
        requisitePresetId: $iRequisitePresetID,
        requisiteName: $sTitle,
        fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
    );
    ```

- Python

    ```python
    client.crm.requisite.add(fields={
        "ENTITY_TYPE_ID": 4,
        "ENTITY_ID": company_id,
        "PRESET_ID": i_requisite_preset_id,
        "ACTIVE": "Y",
        "NAME": s_title,
        "RQ_INN": s_inn,
    })
    ```

{% endlist %}

В результате получим идентификатор реквизитов.

```php
{
    "result": 27
}
```

### Добавляем адрес для реквизита

Добавим адрес для реквизита методом [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md), если реквизит создался успешно. В `$arAddress` добавляем `ENTITY_ID` с `ID` реквизита из ответа предыдущего запроса. В объекте `fields` передаем массив `$arAddress` с полями адреса.

{% list tabs %}

- JS

    ```javascript
    if (requisiteId) {
        arAddress.ENTITY_ID = requisiteId
        await $b24.actions.v2.call.make({
            method: 'crm.address.add',
            params: { fields: arAddress },
            requestId: 'address-add'
        })
    }
    ```

- PHP

    ```php
    if (!empty($requisiteId)) {
        $arAddress['ENTITY_ID'] = $requisiteId;
        $sb->getCRMScope()->address()->add($arAddress);
    }
    ```

- Python

    ```python
    if requisite_id:
        ar_address["ENTITY_ID"] = requisite_id
        client.crm.address.add(fields=ar_address)
    ```

{% endlist %}

### Полный пример кода обработчика

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    export async function handler(req, res) {
        // Получаем и очищаем данные формы
        const iRequisitePresetID = parseInt(req.body.REQ_TYPE, 10)
        const sTitle = String(req.body.TITLE ?? '')
        const sINN = String(req.body.INN ?? '')
        const sPhone = String(req.body.PHONE ?? '')

        // Подготавливаем адрес
        const arAddress = {}
        for (const [key, val] of Object.entries(req.body.ADDRESS ?? {})) {
            arAddress[key] = String(val)
        }
        arAddress.TYPE_ID = 1 // Значение 1 — фактический адрес
        arAddress.ENTITY_TYPE_ID = 8 // Идентификатор типа объекта — 8, то есть реквизит

        // Форматируем телефон для Битрикс24 в формат crm_multifield
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []

        // Создаем компанию
        const result = await $b24.actions.v2.call.make({
            method: 'crm.company.add',
            params: { fields: { TITLE: sTitle, COMPANY_TYPE: 'CUSTOMER', PHONE: arPhone } },
            requestId: 'company-add'
        })

        const companyId = result.getData()?.result
        if (companyId) {
            // Добавляем реквизиты для новой компании
            const resultRequisite = await $b24.actions.v2.call.make({
                method: 'crm.requisite.add',
                params: {
                    fields: {
                        ENTITY_TYPE_ID: 4, // Идентификатор типа объекта — 4, то есть компания
                        ENTITY_ID: companyId,
                        PRESET_ID: iRequisitePresetID,
                        ACTIVE: 'Y',
                        NAME: sTitle,
                        RQ_INN: sINN,
                    }
                },
                requestId: 'requisite-add'
            })

            // Добавляем адрес, если реквизиты созданы успешно
            const requisiteId = resultRequisite.getData()?.result
            if (requisiteId) {
                arAddress.ENTITY_ID = requisiteId
                await $b24.actions.v2.call.make({
                    method: 'crm.address.add',
                    params: { fields: arAddress },
                    requestId: 'address-add'
                })
            }

            res.json({ message: 'Компания успешно добавлена' })
        } else {
            res.json({ message: 'Ошибка: ' + result.getErrorMessages().join('; ') })
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

    // Получаем и очищаем данные формы
    $iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sINN = htmlspecialchars($_POST["INN"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);

    // Подготавливаем адрес
    $arAddress = [];
    foreach($_POST["ADDRESS"] as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    $arAddress['TYPE_ID'] = 1; // Значение 1 — фактический адрес
    $arAddress['ENTITY_TYPE_ID'] = 8; // Идентификатор типа объекта — 8, то есть реквизит

    // Форматируем телефон для Битрикс24 в формат crm_multifield
    $arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];

    // Создаем компанию
    try {
        $companyId = $crm->company()->add([
            'TITLE' => $sTitle,
            'COMPANY_TYPE' => 'CUSTOMER', // Тип — клиент
            'PHONE' => $arPhone
        ])->getId();

        // Добавляем реквизиты для новой компании
        $requisiteId = $crm->requisite()->add(
            entityId: $companyId,
            entityTypeId: 4, // Идентификатор типа объекта — 4, то есть компания
            requisitePresetId: $iRequisitePresetID,
            requisiteName: $sTitle,
            fields: ['ACTIVE' => 'Y', 'RQ_INN' => $sINN]
        )->getId();

        // Добавляем адрес, если реквизиты созданы успешно
        if (!empty($requisiteId)) {
            $arAddress['ENTITY_ID'] = $requisiteId;
            $crm->address()->add($arAddress);
        }

        echo json_encode(['message' => 'Компания успешно добавлена']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Ошибка: ' . $e->getMessage()]);
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
        # Получаем и очищаем данные формы
        i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
        s_title = request.form.get("TITLE", "")
        s_inn = request.form.get("INN", "")
        s_phone = request.form.get("PHONE", "")

        # Подготавливаем адрес
        ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                      if k.startswith("ADDRESS[")}
        ar_address["TYPE_ID"] = 1  # Значение 1 — фактический адрес
        ar_address["ENTITY_TYPE_ID"] = 8  # Идентификатор типа объекта — 8, то есть реквизит

        # Форматируем телефон для Битрикс24 в формат crm_multifield
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []

        # Создаем компанию
        try:
            company_id = client.crm.company.add(fields={
                "TITLE": s_title,
                "COMPANY_TYPE": "CUSTOMER",  # Тип — клиент
                "PHONE": ar_phone,
            }).result

            # Добавляем реквизиты для новой компании
            requisite_id = client.crm.requisite.add(fields={
                "ENTITY_TYPE_ID": 4,  # Идентификатор типа объекта — 4, то есть компания
                "ENTITY_ID": company_id,
                "PRESET_ID": i_requisite_preset_id,
                "ACTIVE": "Y",
                "NAME": s_title,
                "RQ_INN": s_inn,
            }).result

            # Добавляем адрес, если реквизиты созданы успешно
            if requisite_id:
                ar_address["ENTITY_ID"] = requisite_id
                client.crm.address.add(fields=ar_address)

            return jsonify({"message": "Компания успешно добавлена"})
        except Exception as e:
            return jsonify({"message": f"Ошибка: {e}"})
    ```

{% endlist %}
