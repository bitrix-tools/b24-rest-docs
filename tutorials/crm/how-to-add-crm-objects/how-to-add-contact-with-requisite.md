# Добавить контакт с реквизитами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания контактов в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных и реквизитов клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместим форму на PHP-странице. В коде страницы получим список шаблонов реквизитов и поля адреса для формы. Данные формы отправим в обработчик.

2. Создадим файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст контакт с реквизитами.

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

   - Go

       ```go
       res, err := core.Call(ctx, "crm.address.fields", nil, b24.WithIdempotent())
       if err != nil {
       	return fmt.Errorf("crm.address.fields: %w", err)
       }

       // Ответ — не список, а объект «имя поля -> описание», поэтому карта.
       var addressFields map[string]struct {
       	Type       string `json:"type"`
       	Title      string `json:"title"`
       	IsReadOnly bool   `json:"isReadOnly"`
       }
       if err := json.Unmarshal(res.Result, &addressFields); err != nil {
       	return fmt.Errorf("разбор полей адреса: %w", err)
       }

       // В форму берём только строковые и доступные на запись поля: TYPE_ID,
       // ENTITY_ID и ENTITY_TYPE_ID тоже придут в этом ответе, но их обработчик
       // подставляет сам. Ключи карты в Go неупорядочены — сортируем, иначе поля
       // формы будут прыгать от запуска к запуску.
       var addressNames []string
       for name, f := range addressFields {
       	if f.Type == "string" && !f.IsReadOnly {
       		addressNames = append(addressNames, name)
       	}
       }
       sort.Strings(addressNames)
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

   - Go

       ```go
       res, err = core.Call(ctx, "crm.requisite.preset.list", b24.Params{
       	"select": []string{"ID", "NAME"},
       }, b24.WithIdempotent())
       if err != nil {
       	return fmt.Errorf("crm.requisite.preset.list: %w", err)
       }

       // Идентификатор здесь приходит СТРОКОЙ ("1"), тогда как crm.enum.* отдаёт
       // числа. b24.ID разбирает оба написания.
       var presets []struct {
       	ID   b24.ID `json:"ID"`
       	Name string `json:"NAME"`
       }
       if err := json.Unmarshal(res.Result, &presets); err != nil {
       	return fmt.Errorf("разбор шаблонов реквизитов: %w", err)
       }
       if len(presets) == 0 {
       	return fmt.Errorf("на портале нет шаблонов реквизитов")
       }
       ```

   {% endlist %}

Добавим на страницу сайта веб-форму с полями:

-  `REQ_TYPE` — выпадающий список с типом реквизитов из массива `arRequisiteType`, обязательное,

-  `NAME` — имя контакта, обязательное,

-  `LAST_NAME` — фамилия,

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
                <input type="text" name="NAME" placeholder="Имя" required>
                <input type="text" name="LAST_NAME" placeholder="Фамилия">
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

    if (!empty($arPresets)):
        $arRequisiteType = [];
        foreach ($arPresets as $preset) {
            $arRequisiteType[$preset->ID] = $preset->NAME;
        }

        // Удаляем системные и неиспользуемые поля адреса
        $excludeFields = ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'];
        foreach ($excludeFields as $field) {
            unset($arAddressFields[$field]);
        }
    ?>
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                <?php foreach ($arRequisiteType as $id => $name): ?>
                    <option value="<?=$id?>"><?=$name?></option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="NAME" placeholder="Имя" required>
            <input type="text" name="LAST_NAME" placeholder="Фамилия">
            <input type="text" name="PHONE" placeholder="Телефон">
            <?php foreach ($arAddressFields as $key => $arField): ?>
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
    from flask import Flask
    from markupsafe import escape
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))

    # Шаблон страницы: %(options)s и %(address_inputs)s подставляем из Python
    PAGE = """
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                %(options)s
            </select>
            <input type="text" name="NAME" placeholder="Имя" required>
            <input type="text" name="LAST_NAME" placeholder="Фамилия">
            <input type="text" name="PHONE" placeholder="Телефон">
            %(address_inputs)s
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
    """

    EMPTY_PAGE = "<p>Нет доступных типов реквизитов.</p>"


    @app.route("/")
    def form_page():
        # Получаем список полей адреса и шаблонов реквизитов
        address_fields = client.crm.address.fields().result
        presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result

        requisite_types = {p["ID"]: p["NAME"] for p in presets}
        if not requisite_types:
            return EMPTY_PAGE

        # Удаляем системные и неиспользуемые поля адреса
        for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
            address_fields.pop(f, None)

        # Собираем выпадающий список реквизитов и поля адреса
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

        return PAGE % {"options": options, "address_inputs": address_inputs}
    ```

- Go

    ```go
    	var form strings.Builder
    	form.WriteString(`<!doctype html>
    <meta charset="utf-8">
    <title>Заявка</title>
    <form method="post" action="/form">
    <p><label>Тип реквизитов*<br><select name="REQ_TYPE" required>`)
    	for _, p := range presets {
    		fmt.Fprintf(&form, `<option value="%d">%s</option>`, p.ID, html.EscapeString(p.Name))
    	}
    	form.WriteString(`</select></label></p>
    <p><label>Имя*<br><input name="NAME" required></label></p>
    <p><label>Фамилия<br><input name="LAST_NAME"></label></p>
    <p><label>Телефон<br><input name="PHONE" type="tel"></label></p>`)
    	// Поля адреса создаются динамически: их набор задаёт портал, а не код.
    	// Имена вида ADDRESS[CITY] — обработчик разбирает их обратно.
    	for _, name := range addressNames {
    		fmt.Fprintf(&form, "<p><label>%s<br><input name=\"ADDRESS[%s]\"></label></p>\n",
    			html.EscapeString(addressFields[name].Title), name)
    	}
    	form.WriteString(`<p><button type="submit">Отправить</button></p>
    </form>`)
    	page := form.String()
    ```

{% endlist %}

## 2\. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить контакт в CRM, создадим обработчик `form.php`.

### Подготавливаем данные

Получаем и очищаем данные из формы:

-  `REQ_TYPE` приводим к числу,

-  `NAME`, `LAST_NAME`, `PHONE` очищаем от HTML-тегов.

{% list tabs %}

- JS

    ```javascript
    const iRequisitePresetID = parseInt(req.body.REQ_TYPE, 10)
    const sName = String(req.body.NAME ?? '')
    const sLastName = String(req.body.LAST_NAME ?? '')
    const sPhone = String(req.body.PHONE ?? '')
    ```

- PHP

    ```php
    $iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    ```

- Python

    ```python
    i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
    s_name = request.form.get("NAME", "")
    s_last_name = request.form.get("LAST_NAME", "")
    s_phone = request.form.get("PHONE", "")
    ```

- Go

    ```go
    // Тип реквизитов приводим к числу, остальное чистим от HTML-тегов.
    // Именно ВЫРЕЗАЕМ теги, а не экранируем: экранирование нужно при выводе на
    // страницу, а в CRM из-за него вместо «Иванов & сын» попадёт
    // «Иванов &amp; сын».
    presetID, _ := strconv.Atoi(r.PostFormValue("REQ_TYPE"))
    name := stripTags(r.PostFormValue("NAME"))
    lastName := stripTags(r.PostFormValue("LAST_NAME"))
    phone := stripTags(r.PostFormValue("PHONE"))

    if presetID == 0 || name == "" {
    	reply(w, http.StatusBadRequest, "Заполните тип реквизитов и имя", 0)
    	return
    }
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

- Go

    ```go
    // Поля адреса пришли именами вида ADDRESS[CITY] — разбираем их обратно.
    address := b24.Params{}
    for key, values := range r.PostForm {
    	if inner, ok := addressKey(key); ok && len(values) > 0 && values[0] != "" {
    		address[inner] = stripTags(values[0])
    	}
    }
    // Тип адреса и тип владельца обработчик подставляет сам: в форме их нет.
    address["TYPE_ID"] = addressTypeActual
    address["ENTITY_TYPE_ID"] = typeRequisite
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

- Go

    ```go
    // Телефон хранится мультиполем — списком объектов, даже когда номер один.
    // Строка БЕЗ ID добавляет значение; MultifieldAdd собирает её за вас.
    phones := []map[string]any{}
    if phone != "" {
    	phones = append(phones, b24.MultifieldAdd(phone, "WORK"))
    }
    ```

{% endlist %}

### Добавляем контакт

Для создания контакта выполним метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передаем поля:

-  `NAME` — имя контакта,

-  `LAST_NAME` — фамилия,

-  `PHONE` — телефон.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    const result = await $b24.actions.v2.call.make({
        method: 'crm.contact.add',
        params: { fields: { NAME: sName, LAST_NAME: sLastName, PHONE: arPhone } },
        requestId: 'contact-add'
    })
    const contactId = result.getData()?.result
    ```

- PHP

    ```php
    $contactId = $sb->getCRMScope()->contact()->add([
        'NAME' => $sName,
        'LAST_NAME' => $sLastName,
        'PHONE' => $arPhone
    ])->getId();
    ```

- Python

    ```python
    contact_id = client.crm.contact.add(fields={
        "NAME": s_name,
        "LAST_NAME": s_last_name,
        "PHONE": ar_phone,
    }).result
    ```

- Go

    ```go
    res, err := core.Call(ctx, "crm.contact.add", b24.Params{
    	"fields": b24.Params{
    		"NAME":      name,
    		"LAST_NAME": lastName,
    		"PHONE":     phones,
    	},
    }) // без WithIdempotent: повтор создал бы второй контакт
    if err != nil {
    	// Подробности пишем в лог сервера, посетителю их не показываем.
    	log.Println("crm.contact.add:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать контакт", 0)
    	return
    }

    // Обёртки нет: result — сразу идентификатор нового контакта.
    var contactID b24.ID
    if err := json.Unmarshal(res.Result, &contactID); err != nil {
    	log.Println("разбор идентификатора контакта:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать контакт", 0)
    	return
    }
    ```

{% endlist %}

В результате получим идентификатор нового контакта, например, `23`.

```json
{
	"result": 23
}
```

### Добавляем реквизиты в контакт

Для добавления реквизитов в контакт выполним метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В объекте `fields` передаем поля:

-  `ENTITY_TYPE_ID` — идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). В примере укажем значение `3`, то есть контакт,

-  `ENTITY_ID` — идентификатор контакта, который получили в предыдущем запросе,

-  `PRESET_ID` — идентификатор шаблона реквизитов, который получили из формы,

-  `ACTIVE` — активность реквизита `Y`,

-  `NAME` — название реквизита, например, объединим имя и фамилию контакта,

{% list tabs %}

- JS

    ```javascript
    await $b24.actions.v2.call.make({
        method: 'crm.requisite.add',
        params: {
            fields: {
                ENTITY_TYPE_ID: 3,
                ENTITY_ID: contactId,
                PRESET_ID: iRequisitePresetID,
                ACTIVE: 'Y',
                NAME: [sName, sLastName].join(' '),
            }
        },
        requestId: 'requisite-add'
    })
    ```

- PHP

    ```php
    $sb->getCRMScope()->requisite()->add(
        entityId: $contactId,
        entityTypeId: 3,
        requisitePresetId: $iRequisitePresetID,
        requisiteName: implode(' ', [$sName, $sLastName]),
        fields: ['ACTIVE' => 'Y']
    );
    ```

- Python

    ```python
    client.crm.requisite.add(fields={
        "ENTITY_TYPE_ID": 3,
        "ENTITY_ID": contact_id,
        "PRESET_ID": i_requisite_preset_id,
        "ACTIVE": "Y",
        "NAME": " ".join([s_name, s_last_name]),
    })
    ```

- Go

    ```go
    res, err = core.Call(ctx, "crm.requisite.add", b24.Params{
    	"fields": b24.Params{
    		"ENTITY_TYPE_ID": typeContact,
    		"ENTITY_ID":      contactID,
    		"PRESET_ID":      presetID,
    		"ACTIVE":         "Y",
    		"NAME":           strings.TrimSpace(name + " " + lastName),
    	},
    })
    if err != nil {
    	// Контакт уже создан, поэтому это не повод отвечать «ничего не вышло»:
    	// сообщаем, что реквизиты не добавились, и отдаём идентификатор.
    	log.Println("crm.requisite.add:", err)
    	reply(w, http.StatusOK, "Контакт создан, реквизиты добавить не удалось", contactID)
    	return
    }
    var requisiteID b24.ID
    if err := json.Unmarshal(res.Result, &requisiteID); err != nil {
    	log.Println("разбор идентификатора реквизита:", err)
    	reply(w, http.StatusOK, "Контакт создан, реквизиты добавить не удалось", contactID)
    	return
    }
    ```

{% endlist %}

В результате получим идентификатор реквизитов.

```php
{
    "result": 34
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

- Go

    ```go
    // Адрес привязывается к РЕКВИЗИТУ, а не к контакту, поэтому ENTITY_ID
    // заполняется только сейчас — идентификатора реквизита раньше не было.
    if requisiteID != 0 {
    	address["ENTITY_ID"] = requisiteID
    	if _, err := core.Call(ctx, "crm.address.add", b24.Params{"fields": address}); err != nil {
    		log.Println("crm.address.add:", err)
    		reply(w, http.StatusOK, "Контакт и реквизиты созданы, адрес добавить не удалось", contactID)
    		return
    	}
    }
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
        const sName = String(req.body.NAME ?? '')
        const sLastName = String(req.body.LAST_NAME ?? '')
        const sPhone = String(req.body.PHONE ?? '')

        // Подготавливаем адрес
        const arAddress = {}
        for (const [key, val] of Object.entries(req.body.ADDRESS ?? {})) {
            arAddress[key] = String(val)
        }
        arAddress.TYPE_ID = 1 // Фактический адрес
        arAddress.ENTITY_TYPE_ID = 8 // Тип объекта — реквизит

        // Форматируем телефон для Битрикс24
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []

        // Создаем контакт
        const result = await $b24.actions.v2.call.make({
            method: 'crm.contact.add',
            params: { fields: { NAME: sName, LAST_NAME: sLastName, PHONE: arPhone } },
            requestId: 'contact-add'
        })

        const contactId = result.getData()?.result
        if (contactId) {
            // Добавляем реквизиты для нового контакта
            const resultRequisite = await $b24.actions.v2.call.make({
                method: 'crm.requisite.add',
                params: {
                    fields: {
                        ENTITY_TYPE_ID: 3, // Тип объекта — контакт
                        ENTITY_ID: contactId,
                        PRESET_ID: iRequisitePresetID,
                        ACTIVE: 'Y',
                        NAME: [sName, sLastName].join(' '),
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

            res.json({ message: 'Контакт успешно добавлен' })
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

    // Получаем и очищаем данные формы
    $iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);

    // Подготавливаем адрес
    $arAddress = [];
    foreach ($_POST["ADDRESS"] as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    $arAddress['TYPE_ID'] = 1; // Фактический адрес
    $arAddress['ENTITY_TYPE_ID'] = 8; // Тип объекта — реквизит

    // Форматируем телефон для Битрикс24
    $arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];

    // Создаем контакт
    try {
        $contactId = $sb->getCRMScope()->contact()->add([
            'NAME' => $sName,
            'LAST_NAME' => $sLastName,
            'PHONE' => $arPhone
        ])->getId();

        // Добавляем реквизиты для нового контакта
        $requisiteId = $sb->getCRMScope()->requisite()->add(
            entityId: $contactId,
            entityTypeId: 3, // Тип объекта — контакт
            requisitePresetId: $iRequisitePresetID,
            requisiteName: implode(' ', [$sName, $sLastName]),
            fields: ['ACTIVE' => 'Y']
        )->getId();

        // Добавляем адрес, если реквизиты созданы успешно
        if (!empty($requisiteId)) {
            $arAddress['ENTITY_ID'] = $requisiteId;
            $sb->getCRMScope()->address()->add($arAddress);
        }

        echo json_encode(['message' => 'Контакт успешно добавлен']);
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
        s_name = request.form.get("NAME", "")
        s_last_name = request.form.get("LAST_NAME", "")
        s_phone = request.form.get("PHONE", "")

        # Подготавливаем адрес
        ar_address = {key: val for key, val in request.form.to_dict().items()
                      if key.startswith("ADDRESS[")}
        ar_address = {k[len("ADDRESS["):-1]: v for k, v in ar_address.items()}
        ar_address["TYPE_ID"] = 1  # Фактический адрес
        ar_address["ENTITY_TYPE_ID"] = 8  # Тип объекта — реквизит

        # Форматируем телефон для Битрикс24
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []

        # Создаем контакт
        try:
            contact_id = client.crm.contact.add(fields={
                "NAME": s_name,
                "LAST_NAME": s_last_name,
                "PHONE": ar_phone,
            }).result

            # Добавляем реквизиты для нового контакта
            requisite_id = client.crm.requisite.add(fields={
                "ENTITY_TYPE_ID": 3,  # Тип объекта — контакт
                "ENTITY_ID": contact_id,
                "PRESET_ID": i_requisite_preset_id,
                "ACTIVE": "Y",
                "NAME": " ".join([s_name, s_last_name]),
            }).result

            # Добавляем адрес, если реквизиты созданы успешно
            if requisite_id:
                ar_address["ENTITY_ID"] = requisite_id
                client.crm.address.add(fields=ar_address)

            return jsonify({"message": "Контакт успешно добавлен"})
        except Exception as e:
            return jsonify({"message": f"Ошибка: {e}"})
    ```

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Отдельный файл с формой не нужен: страницу собирает и отдаёт та же
    // программа — поля адреса и список шаблонов реквизитов она берёт с портала.
    // Открывайте http://localhost:3000/
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"html"
    	"log"
    	"net/http"
    	"os"
    	"regexp"
    	"sort"
    	"strconv"
    	"strings"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // Идентификаторы типов объектов CRM из crm.enum.ownertype.
    const (
    	typeContact   = 3
    	typeRequisite = 8
    )

    // addressTypeActual — фактический адрес; полный список типов отдаёт
    // crm.enum.addresstype.
    const addressTypeActual = 1

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет: он приходит из окружения, а не из кода, и на
    	// публичную страницу с формой не попадает никогда. Клиент строится ОДИН раз
    	// на портал: http.Server зовёт обработчик из многих горутин.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- собираем форму из настроек портала
    	res, err := core.Call(ctx, "crm.address.fields", nil, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.address.fields: %w", err)
    	}

    	// Ответ — не список, а объект «имя поля -> описание», поэтому карта.
    	var addressFields map[string]struct {
    		Type       string `json:"type"`
    		Title      string `json:"title"`
    		IsReadOnly bool   `json:"isReadOnly"`
    	}
    	if err := json.Unmarshal(res.Result, &addressFields); err != nil {
    		return fmt.Errorf("разбор полей адреса: %w", err)
    	}

    	// В форму берём только строковые и доступные на запись поля: TYPE_ID,
    	// ENTITY_ID и ENTITY_TYPE_ID тоже придут в этом ответе, но их обработчик
    	// подставляет сам. Ключи карты в Go неупорядочены — сортируем, иначе поля
    	// формы будут прыгать от запуска к запуску.
    	var addressNames []string
    	for name, f := range addressFields {
    		if f.Type == "string" && !f.IsReadOnly {
    			addressNames = append(addressNames, name)
    		}
    	}
    	sort.Strings(addressNames)
    	res, err = core.Call(ctx, "crm.requisite.preset.list", b24.Params{
    		"select": []string{"ID", "NAME"},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.requisite.preset.list: %w", err)
    	}

    	// Идентификатор здесь приходит СТРОКОЙ ("1"), тогда как crm.enum.* отдаёт
    	// числа. b24.ID разбирает оба написания.
    	var presets []struct {
    		ID   b24.ID `json:"ID"`
    		Name string `json:"NAME"`
    	}
    	if err := json.Unmarshal(res.Result, &presets); err != nil {
    		return fmt.Errorf("разбор шаблонов реквизитов: %w", err)
    	}
    	if len(presets) == 0 {
    		return fmt.Errorf("на портале нет шаблонов реквизитов")
    	}
    	// --- страница с формой
    	var form strings.Builder
    	form.WriteString(`<!doctype html>
    <meta charset="utf-8">
    <title>Заявка</title>
    <form method="post" action="/form">
    <p><label>Тип реквизитов*<br><select name="REQ_TYPE" required>`)
    	for _, p := range presets {
    		fmt.Fprintf(&form, `<option value="%d">%s</option>`, p.ID, html.EscapeString(p.Name))
    	}
    	form.WriteString(`</select></label></p>
    <p><label>Имя*<br><input name="NAME" required></label></p>
    <p><label>Фамилия<br><input name="LAST_NAME"></label></p>
    <p><label>Телефон<br><input name="PHONE" type="tel"></label></p>`)
    	// Поля адреса создаются динамически: их набор задаёт портал, а не код.
    	// Имена вида ADDRESS[CITY] — обработчик разбирает их обратно.
    	for _, name := range addressNames {
    		fmt.Fprintf(&form, "<p><label>%s<br><input name=\"ADDRESS[%s]\"></label></p>\n",
    			html.EscapeString(addressFields[name].Title), name)
    	}
    	form.WriteString(`<p><button type="submit">Отправить</button></p>
    </form>`)
    	page := form.String()
    	mux := http.NewServeMux()
    	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    		w.Header().Set("Content-Type", "text/html; charset=utf-8")
    		fmt.Fprint(w, page)
    	})
    	mux.HandleFunc("/form", func(w http.ResponseWriter, r *http.Request) {
    		if r.Method != http.MethodPost {
    			reply(w, http.StatusMethodNotAllowed, "Нужен POST", 0)
    			return
    		}
    		handleForm(w, r, core)
    	})

    	log.Println("форма и обработчик: http://localhost:3000/")
    	return http.ListenAndServe(":3000", mux)
    }

    func handleForm(w http.ResponseWriter, r *http.Request, core *b24.Core) {
    	ctx := r.Context()
    	if err := r.ParseForm(); err != nil {
    		reply(w, http.StatusBadRequest, "Не удалось разобрать форму", 0)
    		return
    	}
    	// Тип реквизитов приводим к числу, остальное чистим от HTML-тегов.
    	// Именно ВЫРЕЗАЕМ теги, а не экранируем: экранирование нужно при выводе на
    	// страницу, а в CRM из-за него вместо «Иванов & сын» попадёт
    	// «Иванов &amp; сын».
    	presetID, _ := strconv.Atoi(r.PostFormValue("REQ_TYPE"))
    	name := stripTags(r.PostFormValue("NAME"))
    	lastName := stripTags(r.PostFormValue("LAST_NAME"))
    	phone := stripTags(r.PostFormValue("PHONE"))

    	if presetID == 0 || name == "" {
    		reply(w, http.StatusBadRequest, "Заполните тип реквизитов и имя", 0)
    		return
    	}
    	// Поля адреса пришли именами вида ADDRESS[CITY] — разбираем их обратно.
    	address := b24.Params{}
    	for key, values := range r.PostForm {
    		if inner, ok := addressKey(key); ok && len(values) > 0 && values[0] != "" {
    			address[inner] = stripTags(values[0])
    		}
    	}
    	// Тип адреса и тип владельца обработчик подставляет сам: в форме их нет.
    	address["TYPE_ID"] = addressTypeActual
    	address["ENTITY_TYPE_ID"] = typeRequisite
    	// Телефон хранится мультиполем — списком объектов, даже когда номер один.
    	// Строка БЕЗ ID добавляет значение; MultifieldAdd собирает её за вас.
    	phones := []map[string]any{}
    	if phone != "" {
    		phones = append(phones, b24.MultifieldAdd(phone, "WORK"))
    	}
    	res, err := core.Call(ctx, "crm.contact.add", b24.Params{
    		"fields": b24.Params{
    			"NAME":      name,
    			"LAST_NAME": lastName,
    			"PHONE":     phones,
    		},
    	}) // без WithIdempotent: повтор создал бы второй контакт
    	if err != nil {
    		// Подробности пишем в лог сервера, посетителю их не показываем.
    		log.Println("crm.contact.add:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать контакт", 0)
    		return
    	}

    	// Обёртки нет: result — сразу идентификатор нового контакта.
    	var contactID b24.ID
    	if err := json.Unmarshal(res.Result, &contactID); err != nil {
    		log.Println("разбор идентификатора контакта:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать контакт", 0)
    		return
    	}
    	res, err = core.Call(ctx, "crm.requisite.add", b24.Params{
    		"fields": b24.Params{
    			"ENTITY_TYPE_ID": typeContact,
    			"ENTITY_ID":      contactID,
    			"PRESET_ID":      presetID,
    			"ACTIVE":         "Y",
    			"NAME":           strings.TrimSpace(name + " " + lastName),
    		},
    	})
    	if err != nil {
    		// Контакт уже создан, поэтому это не повод отвечать «ничего не вышло»:
    		// сообщаем, что реквизиты не добавились, и отдаём идентификатор.
    		log.Println("crm.requisite.add:", err)
    		reply(w, http.StatusOK, "Контакт создан, реквизиты добавить не удалось", contactID)
    		return
    	}
    	var requisiteID b24.ID
    	if err := json.Unmarshal(res.Result, &requisiteID); err != nil {
    		log.Println("разбор идентификатора реквизита:", err)
    		reply(w, http.StatusOK, "Контакт создан, реквизиты добавить не удалось", contactID)
    		return
    	}
    	// Адрес привязывается к РЕКВИЗИТУ, а не к контакту, поэтому ENTITY_ID
    	// заполняется только сейчас — идентификатора реквизита раньше не было.
    	if requisiteID != 0 {
    		address["ENTITY_ID"] = requisiteID
    		if _, err := core.Call(ctx, "crm.address.add", b24.Params{"fields": address}); err != nil {
    			log.Println("crm.address.add:", err)
    			reply(w, http.StatusOK, "Контакт и реквизиты созданы, адрес добавить не удалось", contactID)
    			return
    		}
    	}
    	log.Printf("создан контакт %d, реквизит %d", contactID, requisiteID)
    	reply(w, http.StatusOK, "Контакт с реквизитами создан", contactID)
    }

    // tagPattern вырезает HTML-теги из значения формы.
    var tagPattern = regexp.MustCompile(`<[^>]*>`)

    func stripTags(s string) string {
    	return strings.TrimSpace(tagPattern.ReplaceAllString(s, ""))
    }

    // addressKey достаёт CITY из имени поля ADDRESS[CITY].
    func addressKey(key string) (string, bool) {
    	if strings.HasPrefix(key, "ADDRESS[") && strings.HasSuffix(key, "]") {
    		return key[len("ADDRESS[") : len(key)-1], true
    	}
    	return "", false
    }

    // reply отвечает странице тем же JSON, что и обработчики на других языках.
    func reply(w http.ResponseWriter, status int, message string, id b24.ID) {
    	w.Header().Set("Content-Type", "application/json; charset=utf-8")
    	w.WriteHeader(status)
    	body := map[string]any{"message": message}
    	if id != 0 {
    		body["id"] = id
    	}
    	_ = json.NewEncoder(w).Encode(body)
    }
    ```

{% endlist %}
