# Добавить компанию с реквизитами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «Добавление|Импорт» компаний
>
> - [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — любой пользователь
> - [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — пользователь с правом на чтение контактов и компаний
> - [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) — пользователь с правом «Добавление|Импорт» компаний
> - [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) и [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) — пользователь с правом на добавление компании, которая владеет реквизитом

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных и реквизитов клиентов. Когда клиент заполняет форму, данные попадают в обработчик. Скрипт-обработчик создает объекты в CRM через REST API.

В результате сценария в CRM появятся три связанных объекта: компания, ее реквизит и адрес реквизита.

Настройка состоит из двух этапов.

1. Подготавливаем поля и размещаем веб-форму на странице. Состав полей формы берем из методов [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) и [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md)

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) и [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md)

Порядок вызовов задан связями объектов: реквизит создается для уже существующей компании, а адрес — для уже существующего реквизита.

## Что нужно до начала

- в Битрикс24 настроен хотя бы один шаблон реквизитов. Если шаблонов нет, метод [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) вернет пустой список и форму собрать не из чего

- вебхук создан от имени пользователя, у которого есть право «Добавление|Импорт» компаний

- есть сервер, который отдает страницу с формой и принимает данные формы методом `POST`. В примерах это Express для JS, PHP-скрипт, Flask для Python и `net/http` для Go

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

- Python

    ```python
    ar_address_fields = client.crm.address.fields().result
    ar_presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result
    ```

- PHP

    ```php
    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
    $arPresets = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();
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

    res, err = core.Call(ctx, "crm.requisite.preset.list", b24.Params{
    	"select": []string{"ID", "NAME"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.requisite.preset.list: %w", err)
    }

    // Идентификатор здесь приходит СТРОКОЙ ("1"), тогда как crm.enum.* отдает
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

- Python

    ```python
    for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
        ar_address_fields.pop(f, None)
    ```

- PHP

    ```php
    foreach (['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'] as $field) {
        unset($arAddressFields[$field]);
    }
    ```

- Go

    ```go
    // В форму берем только строковые и доступные на запись поля: TYPE_ID,
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

Создаем HTML-форму с полями:

-  `REQ_TYPE` — выпадающий список с шаблонами реквизитов из массива `$arPresets`. Обязательное поле

-  `TITLE` — название компании. Обязательное поле

-  `INN` — ИНН компании

-  `PHONE` — номер телефона

-  `ADDRESS` — поля для адреса создаются динамически из `$arAddressFields`. Если поле обязательное, добавляется атрибут `required`

Форма собирает данные и отправляет их методом `POST` в обработчик. Разметка формы — ниже, выпадающий список реквизитов и поля адреса подставляются из полученных данных.

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
                <option value="" disabled selected>Выберите тип реквизитов</option>
                ${options}
            </select>
            <input type="text" name="TITLE" placeholder="Название организации" required>
            <input type="text" name="INN" placeholder="ИНН">
            <input type="text" name="PHONE" placeholder="Телефон">
            ${addressInputs}
            <input type="submit" value="Отправить">
        </form>`
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
                <option value="" disabled selected>Выберите тип реквизитов</option>
                {options}
            </select>
            <input type="text" name="TITLE" placeholder="Название организации" required>
            <input type="text" name="INN" placeholder="ИНН">
            <input type="text" name="PHONE" placeholder="Телефон">
            {address_inputs}
            <input type="submit" value="Отправить">
        </form>"""
    ```

- PHP

    ```html
    <form id="form_to_crm">
        <select name="REQ_TYPE" required>
            <option value="" disabled selected>Выберите тип реквизитов</option>
            <?php foreach($arPresets as $preset):?>
                <option value="<?=$preset->ID?>"><?=$preset->NAME?></option>
            <?php endforeach;?>
        </select>
        <input type="text" name="TITLE" placeholder="Название организации" required>
        <input type="text" name="INN" placeholder="ИНН">
        <input type="text" name="PHONE" placeholder="Телефон">
        <?php if(is_array($arAddressFields)):?>
            <?php foreach($arAddressFields as $key=>$arField):?>
                <input type="text" name="ADDRESS[<?=$key?>]" placeholder="<?=$arField['title']?>" <?=($arField['isRequired'])?'required':'';?>>
            <?php endforeach;?>
        <?php endif;?>
        <input type="submit" value="Отправить">
    </form>
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
    <p><label>Название организации*<br><input name="TITLE" required></label></p>
    <p><label>ИНН<br><input name="INN"></label></p>
    <p><label>Телефон<br><input name="PHONE" type="tel"></label></p>`)
    // Поля адреса создаются динамически: их набор задает портал, а не код.
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

### Полный пример кода страницы с формой

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
            res.send('<p>Нет доступных типов реквизитов.</p>')
            return
        }

        // Удаляем системные и неиспользуемые поля адреса
        for (const f of ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID']) {
            delete arAddressFields[f]
        }

        // Собираем выпадающий список реквизитов и поля адреса
        const options = arPresets.map(p => `<option value="${p.ID}">${p.NAME}</option>`).join('')
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

- Python

    ```python
    # pip install b24pysdk flask
    import os

    from flask import Flask
    from markupsafe import escape
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],  # your-domain.bitrix24.ru
        webhook_token=os.environ["B24_TOKEN"],  # только user_id/token, без https://
    ))

    # Шаблон страницы: %(options)s и %(address_inputs)s подставляем из Python
    PAGE = """
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                %(options)s
            </select>
            <input type="text" name="TITLE" placeholder="Название организации" required>
            <input type="text" name="INN" placeholder="ИНН">
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
        ar_address_fields = client.crm.address.fields().result
        ar_presets = client.crm.requisite.preset.list(select=["ID", "NAME"]).result

        if not ar_presets:
            return EMPTY_PAGE

        # Удаляем системные и неиспользуемые поля адреса
        for f in ("TYPE_ID", "ENTITY_TYPE_ID", "ENTITY_ID", "COUNTRY_CODE", "ANCHOR_TYPE_ID", "ANCHOR_ID"):
            ar_address_fields.pop(f, None)

        # Собираем выпадающий список реквизитов и поля адреса
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

        return PAGE % {"options": options, "address_inputs": address_inputs}
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
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Получаем список полей адреса и шаблонов реквизитов
    $arAddressFields = $sb->getCRMScope()->address()->fields()->getFieldsDescription();
    $arPresets = $sb->getCRMScope()->requisitePreset()->list(
        order: [], filter: [], select: ["ID", "NAME"]
    )->getRequisitePresets();

    if(!empty($arPresets)):
        // Удаляем системные и неиспользуемые поля адреса
        $excludeFields = ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'];
        foreach($excludeFields as $field) {
            unset($arAddressFields[$field]);
        }
    ?>
        <form id="form_to_crm">
            <select name="REQ_TYPE" required>
                <option value="" disabled selected>Выберите тип реквизитов</option>
                <?php foreach($arPresets as $preset): ?>
                    <option value="<?=$preset->ID?>"><?=$preset->NAME?></option>
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
                url: 'form.php', // файл-обработчик из шага 2
                data: $(this).serialize(),
                success: function(data) {
                    alert(data.message);
                }
            });
        });
    });
    </script>
    ```

- Go

    ```go
    // Полный код страницы и обработчика — в примере ниже, в шаге 2: страницу
    // собирает и отдает та же программа, отдельного файла для формы нет.
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
    ```

{% endlist %}

## 2\. Создаем обработчик формы

Создаем файл, который принимает данные формы и сохраняет их в CRM. В примерах на PHP это `form.php`, в остальных — обработчик маршрута `/form`.

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

- Python

    ```python
    i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
    s_title = request.form.get("TITLE", "")
    s_inn = request.form.get("INN", "")
    s_phone = request.form.get("PHONE", "")
    ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                  if k.startswith("ADDRESS[")}
    ```

- PHP

    ```php
    $iRequisitePresetID = intval($_POST["REQ_TYPE"] ?? 0);
    $sTitle = htmlspecialchars($_POST["TITLE"] ?? '');
    $sINN = htmlspecialchars($_POST["INN"] ?? '');
    $sPhone = htmlspecialchars($_POST["PHONE"] ?? '');
    $arAddress = [];
    foreach (($_POST["ADDRESS"] ?? []) as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    ```

- Go

    ```go
    // Тип реквизитов приводим к числу, остальное чистим от HTML-тегов.
    // Именно ВЫРЕЗАЕМ теги, а не экранируем: экранирование нужно при выводе на
    // страницу, а в CRM из-за него вместо «Иванов & сын» попадет
    // «Иванов &amp; сын».
    presetID, _ := strconv.Atoi(r.PostFormValue("REQ_TYPE"))
    title := stripTags(r.PostFormValue("TITLE"))
    inn := stripTags(r.PostFormValue("INN"))
    phone := stripTags(r.PostFormValue("PHONE"))

    if presetID == 0 || title == "" {
    	reply(w, http.StatusBadRequest, "Заполните тип реквизитов и название", 0)
    	return
    }

    // Поля адреса пришли именами вида ADDRESS[CITY] — разбираем их обратно.
    address := b24.Params{}
    for key, values := range r.PostForm {
    	if inner, ok := addressKey(key); ok && len(values) > 0 && values[0] != "" {
    		address[inner] = stripTags(values[0])
    	}
    }
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

- Python

    ```python
    ar_address["TYPE_ID"] = 1
    ar_address["ENTITY_TYPE_ID"] = 8
    ```

- PHP

    ```php
    $arAddress['TYPE_ID'] = 1;
    $arAddress['ENTITY_TYPE_ID'] = 8;
    ```

- Go

    ```go
    // Тип адреса и тип владельца обработчик подставляет сам: в форме их нет.
    address["TYPE_ID"] = addressTypeActual
    address["ENTITY_TYPE_ID"] = typeRequisite
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

- Python

    ```python
    ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
    ```

- PHP

    ```php
    $arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];
    ```

- Go

    ```go
    // Телефон хранится мультиполем — списком объектов, даже когда номер один.
    // Строка БЕЗ ID добавляет значение; MultifieldAdd собирает ее за вас.
    phones := []map[string]any{}
    if phone != "" {
    	phones = append(phones, b24.MultifieldAdd(phone, "WORK"))
    }
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

- Python

    ```python
    i_company_id = client.crm.company.add(fields={
        "TITLE": s_title,
        "COMPANY_TYPE": "CUSTOMER",
        "PHONE": ar_phone,
    }).result
    ```

- PHP

    ```php
    $iCompanyID = $sb->getCRMScope()->company()->add([
        'TITLE' => $sTitle,
        'COMPANY_TYPE' => 'CUSTOMER',
        'PHONE' => $arPhone,
    ])->getId();
    ```

- Go

    ```go
    res, err := core.Call(ctx, "crm.company.add", b24.Params{
    	"fields": b24.Params{
    		"TITLE":        title,
    		"COMPANY_TYPE": "CUSTOMER",
    		"PHONE":        phones,
    	},
    }) // без WithIdempotent: повтор создал бы вторую компанию
    if err != nil {
    	// Подробности пишем в лог сервера, посетителю их не показываем.
    	log.Println("crm.company.add:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать компанию", 0)
    	return
    }

    // Обертки нет: result — сразу идентификатор новой компании.
    var companyID b24.ID
    if err := json.Unmarshal(res.Result, &companyID); err != nil {
    	log.Println("разбор идентификатора компании:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать компанию", 0)
    	return
    }
    ```

{% endlist %}

Если компания успешно создана, метод вернет ее идентификатор в `$iCompanyID`. Сохраните значение: оно понадобится реквизиту.

```json
{
    "result": 5
}
```

### Добавляем реквизиты в компанию

Чтобы добавить реквизиты, используем метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В него нужно передать следующие данные:

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `4` — компания

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

- Go

    ```go
    res, err = core.Call(ctx, "crm.requisite.add", b24.Params{
    	"fields": b24.Params{
    		"ENTITY_TYPE_ID": typeCompany,
    		"ENTITY_ID":      companyID,
    		"PRESET_ID":      presetID,
    		"ACTIVE":         "Y",
    		"NAME":           title,
    		"RQ_INN":         inn,
    	},
    })
    if err != nil {
    	// Компания уже создана, поэтому это не повод отвечать «ничего не вышло»:
    	// сообщаем, что реквизиты не добавились, и отдаем идентификатор.
    	log.Println("crm.requisite.add:", err)
    	reply(w, http.StatusOK, "Компания создана, реквизиты добавить не удалось", companyID)
    	return
    }
    var requisiteID b24.ID
    if err := json.Unmarshal(res.Result, &requisiteID); err != nil {
    	log.Println("разбор идентификатора реквизита:", err)
    	reply(w, http.StatusOK, "Компания создана, реквизиты добавить не удалось", companyID)
    	return
    }
    ```

{% endlist %}

Если реквизиты успешно добавлены, метод вернет идентификатор записи в `$iRequisiteID`.

```json
{
    "result": 27
}
```

{% note warning "" %}

Метод не проверяет, существует ли шаблон с переданным `PRESET_ID`. С несуществующим идентификатором реквизит создастся, но останется без полей шаблона. Берите `PRESET_ID` из ответа [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md), а не подставляйте произвольное число.

{% endnote %}

### Добавляем адрес для реквизита

1. Добавляем в массив `$arAddress` поле `ENTITY_ID` — идентификатор реквизита. Передаем `$iRequisiteID`, который получили при создании реквизита

   {% list tabs %}

   - JS

       ```javascript
       arAddress.ENTITY_ID = iRequisiteID
       ```

   - Python

       ```python
       ar_address["ENTITY_ID"] = i_requisite_id
       ```

   - PHP

       ```php
       $arAddress['ENTITY_ID'] = $iRequisiteID;
       ```

   - Go

       ```go
       address["ENTITY_ID"] = requisiteID
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

   - Python

       ```python
       b_address_added = client.crm.address.add(fields=ar_address).result
       ```

   - PHP

       ```php
       $bAddressAdded = $sb->getCRMScope()->address()->add($arAddress)->isSuccess();
       ```

   - Go

       ```go
       // Адрес привязывается к РЕКВИЗИТУ, а не к компании, поэтому ENTITY_ID
       // заполняется только сейчас — идентификатора реквизита раньше не было.
       if _, err := core.Call(ctx, "crm.address.add", b24.Params{"fields": address}); err != nil {
       	log.Println("crm.address.add:", err)
       	reply(w, http.StatusOK, "Компания и реквизиты созданы, адрес добавить не удалось", companyID)
       	return
       }
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
                res.json({ message: 'Ошибка: ' + companyResponse.getErrorMessages().join('; ') })
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

            res.json({ message: 'Компания успешно добавлена' })
        } catch (e) {
            res.json({ message: 'Ошибка: ' + e.message })
        }
    }

    // Подключаем обработчик к серверу из шага 1. Без express.json()
    // тело запроса не разберется и req.body будет пустым
    // app.use(express.json())
    // app.post('/form', handler)
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import os

    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],  # your-domain.bitrix24.ru
        webhook_token=os.environ["B24_TOKEN"],  # только user_id/token, без https://
    ))


    @app.route("/form", methods=["POST"])
    def handle_form():
        # Получаем и очищаем данные формы
        i_requisite_preset_id = int(request.form.get("REQ_TYPE", 0))
        s_title = request.form.get("TITLE", "")
        s_inn = request.form.get("INN", "")
        s_phone = request.form.get("PHONE", "")

        # Подготавливаем адрес
        ar_address = {k[len("ADDRESS["):-1]: v for k, v in request.form.to_dict().items()
                      if k.startswith("ADDRESS[")}
        ar_address["TYPE_ID"] = 1  # 1 — фактический адрес (crm.enum.addresstype)
        ar_address["ENTITY_TYPE_ID"] = 8  # 8 — реквизит (crm.enum.ownertype)

        # Форматируем телефон в формат crm_multifield
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

            return jsonify({"message": "Компания успешно добавлена"})
        except Exception as e:
            return jsonify({"message": f"Ошибка: {e}"})
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
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
    $crm = $sb->getCRMScope();

    // Получаем и очищаем данные формы
    $iRequisitePresetID = intval($_POST["REQ_TYPE"] ?? 0);
    $sTitle = htmlspecialchars($_POST["TITLE"] ?? '');
    $sINN = htmlspecialchars($_POST["INN"] ?? '');
    $sPhone = htmlspecialchars($_POST["PHONE"] ?? '');

    // Подготавливаем адрес
    $arAddress = [];
    foreach(($_POST["ADDRESS"] ?? []) as $key => $val) {
        $arAddress[$key] = htmlspecialchars($val);
    }
    $arAddress['TYPE_ID'] = 1; // 1 — фактический адрес (crm.enum.addresstype)
    $arAddress['ENTITY_TYPE_ID'] = 8; // 8 — реквизит (crm.enum.ownertype)

    // Форматируем телефон в формат crm_multifield
    $arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];

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

        echo json_encode(['message' => 'Компания успешно добавлена']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Ошибка: ' . $e->getMessage()]);
    }
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
    // Отдельный файл с формой не нужен: страницу собирает и отдает та же
    // программа — поля адреса и список шаблонов реквизитов она берет с портала.
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
    	typeCompany   = 4
    	typeRequisite = 8
    )

    // addressTypeActual — фактический адрес; полный список типов отдает
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
    	// на портал: http.Server зовет обработчик из многих горутин.
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

    	// В форму берем только строковые и доступные на запись поля: TYPE_ID,
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

    	// Идентификатор здесь приходит СТРОКОЙ ("1"), тогда как crm.enum.* отдает
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
    <p><label>Название организации*<br><input name="TITLE" required></label></p>
    <p><label>ИНН<br><input name="INN"></label></p>
    <p><label>Телефон<br><input name="PHONE" type="tel"></label></p>`)
    	// Поля адреса создаются динамически: их набор задает портал, а не код.
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
    	// страницу, а в CRM из-за него вместо «Иванов & сын» попадет
    	// «Иванов &amp; сын».
    	presetID, _ := strconv.Atoi(r.PostFormValue("REQ_TYPE"))
    	title := stripTags(r.PostFormValue("TITLE"))
    	inn := stripTags(r.PostFormValue("INN"))
    	phone := stripTags(r.PostFormValue("PHONE"))

    	if presetID == 0 || title == "" {
    		reply(w, http.StatusBadRequest, "Заполните тип реквизитов и название", 0)
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
    	// Строка БЕЗ ID добавляет значение; MultifieldAdd собирает ее за вас.
    	phones := []map[string]any{}
    	if phone != "" {
    		phones = append(phones, b24.MultifieldAdd(phone, "WORK"))
    	}
    	res, err := core.Call(ctx, "crm.company.add", b24.Params{
    		"fields": b24.Params{
    			"TITLE":        title,
    			"COMPANY_TYPE": "CUSTOMER",
    			"PHONE":        phones,
    		},
    	}) // без WithIdempotent: повтор создал бы вторую компанию
    	if err != nil {
    		// Подробности пишем в лог сервера, посетителю их не показываем.
    		log.Println("crm.company.add:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать компанию", 0)
    		return
    	}

    	// Обертки нет: result — сразу идентификатор новой компании.
    	var companyID b24.ID
    	if err := json.Unmarshal(res.Result, &companyID); err != nil {
    		log.Println("разбор идентификатора компании:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать компанию", 0)
    		return
    	}
    	res, err = core.Call(ctx, "crm.requisite.add", b24.Params{
    		"fields": b24.Params{
    			"ENTITY_TYPE_ID": typeCompany,
    			"ENTITY_ID":      companyID,
    			"PRESET_ID":      presetID,
    			"ACTIVE":         "Y",
    			"NAME":           title,
    			"RQ_INN":         inn,
    		},
    	})
    	if err != nil {
    		// Компания уже создана, поэтому это не повод отвечать «ничего не вышло»:
    		// сообщаем, что реквизиты не добавились, и отдаем идентификатор.
    		log.Println("crm.requisite.add:", err)
    		reply(w, http.StatusOK, "Компания создана, реквизиты добавить не удалось", companyID)
    		return
    	}
    	var requisiteID b24.ID
    	if err := json.Unmarshal(res.Result, &requisiteID); err != nil {
    		log.Println("разбор идентификатора реквизита:", err)
    		reply(w, http.StatusOK, "Компания создана, реквизиты добавить не удалось", companyID)
    		return
    	}
    	// Адрес привязывается к РЕКВИЗИТУ, а не к компании, поэтому ENTITY_ID
    	// заполняется только сейчас — идентификатора реквизита раньше не было.
    	if requisiteID != 0 {
    		address["ENTITY_ID"] = requisiteID
    		if _, err := core.Call(ctx, "crm.address.add", b24.Params{"fields": address}); err != nil {
    			log.Println("crm.address.add:", err)
    			reply(w, http.StatusOK, "Компания и реквизиты созданы, адрес добавить не удалось", companyID)
    			return
    		}
    	}
    	log.Printf("создана компания %d, реквизит %d", companyID, requisiteID)
    	reply(w, http.StatusOK, "Компания с реквизитами создана", companyID)
    }

    // tagPattern вырезает HTML-теги из значения формы.
    var tagPattern = regexp.MustCompile(`<[^>]*>`)

    func stripTags(s string) string {
    	return strings.TrimSpace(tagPattern.ReplaceAllString(s, ""))
    }

    // addressKey достает CITY из имени поля ADDRESS[CITY].
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

## Проверим результат

Откройте созданную компанию в Битрикс24. На вкладке «Реквизиты» отображается реквизит с ИНН и адресом из формы.

Через REST результат проверяют два метода:

-  [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md) с фильтром по `ENTITY_TYPE_ID`: `4` и `ENTITY_ID` — идентификатором созданной компании

-  [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md) с фильтром по `ENTITY_TYPE_ID`: `8` и `ENTITY_ID` — идентификатором созданного реквизита

{% list tabs %}

- JS

    ```javascript
    const requisites = (await $b24.actions.v2.call.make({
        method: 'crm.requisite.list',
        params: {
            filter: { ENTITY_TYPE_ID: 4, ENTITY_ID: iCompanyID },
            select: ['ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'NAME']
        },
        requestId: 'requisite-list'
    })).getData().result

    const addresses = (await $b24.actions.v2.call.make({
        method: 'crm.address.list',
        params: { filter: { ENTITY_TYPE_ID: 8, ENTITY_ID: iRequisiteID } },
        requestId: 'address-list'
    })).getData().result

    console.dir({ requisites, addresses })
    ```

- Python

    ```python
    requisites = client.crm.requisite.list(
        filter={"ENTITY_TYPE_ID": 4, "ENTITY_ID": i_company_id},
        select=["ID", "ENTITY_TYPE_ID", "ENTITY_ID", "NAME"],
    ).result

    addresses = client.crm.address.list(
        filter={"ENTITY_TYPE_ID": 8, "ENTITY_ID": i_requisite_id},
    ).result

    print(requisites)
    print(addresses)
    ```

- PHP

    ```php
    $requisites = $sb->getCRMScope()->requisite()->list(
        [],
        ['ENTITY_TYPE_ID' => 4, 'ENTITY_ID' => $iCompanyID],
        ['ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'NAME']
    )->getRequisites();

    $addresses = $sb->getCRMScope()->address()->list(
        [],
        ['ENTITY_TYPE_ID' => 8, 'ENTITY_ID' => $iRequisiteID],
        []
    )->getAddresses();

    print_r($requisites);
    print_r($addresses);
    ```

- Go

    ```go
    res, err := core.Call(ctx, "crm.requisite.list", b24.Params{
    	"filter": b24.Params{"ENTITY_TYPE_ID": 4, "ENTITY_ID": companyID},
    	"select": []string{"ID", "ENTITY_TYPE_ID", "ENTITY_ID", "NAME"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.requisite.list: %w", err)
    }
    log.Println("реквизиты компании:", string(res.Result))

    res, err = core.Call(ctx, "crm.address.list", b24.Params{
    	"filter": b24.Params{"ENTITY_TYPE_ID": 8, "ENTITY_ID": requisiteID},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.address.list: %w", err)
    }
    log.Println("адреса реквизита:", string(res.Result))
    ```

{% endlist %}

Сценарий выполнен, если [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md) вернул реквизит с `ID` из шага «Добавляем реквизиты в компанию», а [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md) — адрес с этим же `ENTITY_ID`.

```json
{
    "result": [
        {
            "ENTITY_TYPE_ID": "4",
            "ENTITY_ID": "5",
            "ID": "27",
            "NAME": "ООО Ромашка"
        }
    ],
    "total": 1
}
```

```json
{
    "result": [
        {
            "TYPE_ID": "1",
            "ENTITY_TYPE_ID": "8",
            "ENTITY_ID": "27",
            "ADDRESS_1": "Ленина 2",
            "CITY": "Тюмень",
            "POSTAL_CODE": "625003"
        }
    ],
    "total": 1
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
|| `Access denied.` | У пользователя нет права на добавление или импорт компаний. Проверьте, от имени какого пользователя создан вебхук ||
|#

Сценарий создает три объекта подряд, и ошибка на любом шаге оставляет предыдущие объекты в CRM. Повторяйте не весь обработчик, а тот шаг, который упал:

- ошибка в [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) — в CRM ничего не создано, можно повторить обработчик целиком

- ошибка в [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md) — компания уже создана. Повторный запуск обработчика создаст ее дубль, поэтому передайте существующий `ENTITY_ID`

- ошибка в [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) — компания и реквизит уже созданы. Добавьте адрес отдельным вызовом с `ENTITY_ID` существующего реквизита

## Что важно учитывать

- отдельного идентификатора у адреса нет: он опознается парой `ENTITY_TYPE_ID` и `ENTITY_ID` плюс `TYPE_ID`

- набор полей реквизита зависит от шаблона. У шаблона физического лица поля `RQ_INN` нет: значение сохранится и вернется в [crm.requisite.get](../../../api-reference/crm/requisites/universal/crm-requisite-get.md), но в карточке реквизита не отобразится. Состав полей шаблона возвращает метод [crm.requisite.preset.field.list](../../../api-reference/crm/requisites/presets/fields/crm-requisite-preset-field-list.md)

- повторная отправка формы с теми же данными создает новую компанию и новый реквизит. Дубликаты не отсеиваются

## Продолжите изучение

- [{#T}](../../../api-reference/crm/companies/crm-company-add.md)
- [{#T}](../../../api-reference/crm/requisites/universal/crm-requisite-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-fields.md)
- [{#T}](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md)
- [{#T}](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-list.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)
- [{#T}](how-to-add-contact-with-requisite.md)
