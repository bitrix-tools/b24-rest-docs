# Добавить дело в новый лид или сделку в зависимости от режима CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод:
> -  создания лида — пользователи с правом создания лида,
> -  добавления дела в лид или сделку — пользователи с правом изменения лида или сделки в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму, его данные попадут в CRM. Вы сможете обработать заявку и позвонить клиенту.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик:

   -  примет и подготовит данные,

   -  создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add),

   -  проверит режим CRM,

   -  добавит дело с напоминанием о звонке в сделку или в лид.

## Режимы CRM

В Битрикс24 есть два режима работы CRM.

1. Простой режим — работает без лидов. Система автоматически конвертирует новый лид в сделку.

2. Классический режим — разделяет потенциальных и действующих клиентов. Лид остается в системе после создания.

В обработчике определим, в каком режиме работает CRM — простом или классическом — и в зависимости от этого привяжем напоминание о звонке к сделке или к лиду.

{% note tip "Пользовательская документация" %}

-  [Как выбрать режим работы CRM](https://helpdesk.bitrix24.ru/open/23440468/)

{% endnote %}

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с пятью полями:

-  `NAME` — имя клиента, обязательное поле,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — телефон,

-  `EMAIL` — электронная почта.

При отправке форма передает данные в обработчик.

{% list tabs %}

- JS

    ```html
    <form id="form_to_crm">
        <!-- Имя (обязательное поле) -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
        <!-- Название компании -->
        <input type="text" name="COMPANY_TITLE" placeholder="Название компании">
        <!-- Email -->
        <input type="text" name="EMAIL" placeholder="Почта">
        <!-- Телефон -->
        <input type="text" name="PHONE" placeholder="Телефон">
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <script>
        document.getElementById('form_to_crm').addEventListener('submit', async (el) => {
            el.preventDefault(); // Отменяем стандартную отправку формы
            // Собираем данные формы в JSON
            const formData = Object.fromEntries(new FormData(el.currentTarget).entries());
            // Отправляем данные на сервер (эндпоинт обработчика на Node.js)
            const response = await fetch('/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message); // Показываем результат
        });
    </script>
    ```

- PHP

    ```html
    <form id="form_to_crm" method="POST" action="form.php">
        <!-- Имя (обязательное поле) -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
        <!-- Название компании -->
        <input type="text" name="COMPANY_TITLE" placeholder="Название компании">
        <!-- Email -->
        <input type="text" name="EMAIL" placeholder="Почта">
        <!-- Телефон -->
        <input type="text" name="PHONE" placeholder="Телефон">
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <!-- Подключаем jQuery для AJAX-запроса -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault(); // Отменяем стандартную отправку формы
                var formData = $(this).serialize(); // Собираем данные формы
                // Отправляем данные на сервер
                $.ajax({
                    'method': 'POST',
                    'dataType': 'json',
                    'url': 'form.php', // Файл-обработчик
                    'data': formData,
                    success: function(data) {
                        alert(data.message); // Показываем результат
                    }
                });
            });
        });
    </script>
    ```

- Python

    ```html
    <form id="form_to_crm">
        <!-- Имя (обязательное поле) -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
        <!-- Название компании -->
        <input type="text" name="COMPANY_TITLE" placeholder="Название компании">
        <!-- Email -->
        <input type="text" name="EMAIL" placeholder="Почта">
        <!-- Телефон -->
        <input type="text" name="PHONE" placeholder="Телефон">
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <!-- Подключаем jQuery для AJAX-запроса -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault(); // Отменяем стандартную отправку формы
                var formData = $(this).serialize(); // Собираем данные формы
                // Отправляем данные на сервер (маршрут обработчика на Flask)
                $.ajax({
                    'method': 'POST',
                    'dataType': 'json',
                    'url': '/form', // Маршрут-обработчик
                    'data': formData,
                    success: function(data) {
                        alert(data.message); // Показываем результат
                    }
                });
            });
        });
    </script>
    ```

{% endlist %}

## 2. Создаем обработчик формы

Создадим обработчик, который будет:

-  принимать данные из формы,

-  создавать лид,

-  определять режим CRM,

-  добавлять дело с напоминанием о звонке в лид или сделку.

### Подготавливаем данные из формы

Получаем и очищаем от HTML-тегов данные из формы.

{% list tabs %}

- JS

    ```javascript
    // Получаем данные из формы
    const sName = String(req.body.NAME ?? '')
    const sLastName = String(req.body.LAST_NAME ?? '')
    const sCompanyTitle = String(req.body.COMPANY_TITLE ?? '')
    const sPhone = String(req.body.PHONE ?? '')
    const sEmail = String(req.body.EMAIL ?? '')
    ```

- PHP

    ```php
    // Получаем и очищаем данные из формы
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);
    ```

- Python

    ```python
    # Получаем данные из формы
    s_name = request.form.get("NAME", "")
    s_last_name = request.form.get("LAST_NAME", "")
    s_company_title = request.form.get("COMPANY_TITLE", "")
    s_phone = request.form.get("PHONE", "")
    s_email = request.form.get("EMAIL", "")
    ```

{% endlist %}

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% list tabs %}

- JS

    ```javascript
    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
    const arEmail = sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : []
    ```

- PHP

    ```php
    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();
    ```

- Python

    ```python
    # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
    ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []
    ```

{% endlist %}

Заголовок лида сформируем из имени и фамилии. Для компаний добавим в заголовок название компании.

{% list tabs %}

- JS

    ```javascript
    // Формируем заголовок лида из имени и фамилии
    let sTitle = 'С сайта: ' + `${sName} ${sLastName}`.trim()
    // Если есть название компании — добавляем его через тире после имени и фамилии
    if (sCompanyTitle) {
        sTitle += ' — ' + sCompanyTitle
    }
    ```

- PHP

    ```php
    // Формируем заголовок лида из имени и фамилии
    $sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
    // Если есть название компании — добавляем его через тире после имени и фамилии
    if (!empty($sCompanyTitle)) {
        $sTitle .= ' — ' . $sCompanyTitle;
    }
    ```

- Python

    ```python
    # Формируем заголовок лида из имени и фамилии
    s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()
    # Если есть название компании — добавляем его через тире после имени и фамилии
    if s_company_title:
        s_title += " — " + s_company_title
    ```

{% endlist %}

### Создаем лид и получаем данные лида

Последовательно выполним два метода: создадим лид и получим его данные.

Для добавления лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

-  `TITLE` — заголовок лида,

-  `NAME` — имя лида,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    const addLead = await $b24.actions.v2.call.make({
        method: 'crm.lead.add',
        params: {
            fields: {
                TITLE: sTitle, // Заголовок лида
                NAME: sName, // Имя
                LAST_NAME: sLastName, // Фамилия
                COMPANY_TITLE: sCompanyTitle, // Название компании
                PHONE: arPhone, // Телефон
                EMAIL: arEmail, // Email
            }
        },
        requestId: 'add-lead'
    })
    const leadId = addLead.getData().result
    ```

- PHP

    ```php
    $leadId = $sb->getCRMScope()->lead()->add([
        'TITLE' => $sTitle, // Заголовок лида
        'NAME' => $sName, // Имя
        'LAST_NAME' => $sLastName, // Фамилия
        'COMPANY_TITLE' => $sCompanyTitle, // Название компании
        'PHONE' => $arPhone, // Телефон
        'EMAIL' => $arEmail, // Email
    ])->getId();
    ```

- Python

    ```python
    lead_id = client.crm.lead.add(fields={
        "TITLE": s_title,  # Заголовок лида
        "NAME": s_name,  # Имя
        "LAST_NAME": s_last_name,  # Фамилия
        "COMPANY_TITLE": s_company_title,  # Название компании
        "PHONE": ar_phone,  # Телефон
        "EMAIL": ar_email,  # Email
    }).result
    ```

{% endlist %}

Для получения данных лида используем метод [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md). В параметр `ID` передаем идентификатор лида, полученный из результата метода [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% list tabs %}

- JS

    ```javascript
    const getLead = await $b24.actions.v2.call.make({
        method: 'crm.lead.get',
        params: { id: leadId }, // ID из результата выполнения метода crm.lead.add
        requestId: 'get-lead'
    })
    const leadStatus = getLead.getData().result.STATUS_ID
    ```

- PHP

    ```php
    $lead = $sb->getCRMScope()->lead()->get($leadId)->lead(); // ID из результата crm.lead.add
    $leadStatus = $lead->STATUS_ID;
    ```

- Python

    ```python
    lead = client.crm.lead.get(bitrix_id=lead_id).result  # ID из результата crm.lead.add
    lead_status = lead["STATUS_ID"]
    ```

{% endlist %}

В результате метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) вернет идентификатор нового лида, а метод [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md) — данные лида, включая поле `STATUS_ID`.

```json
{
    "result": {
        "ID": "22",
        "TITLE": "Иван Иванов",
        "HONORIFIC": null,
        "NAME": "Иван",
        "SECOND_NAME": null,
        "LAST_NAME": "Иванов",
        "COMPANY_TITLE": null,
        ...,
        "STATUS_ID": "CONVERTED",
        ...
    }
}
```

### Определяем режим CRM и создаем дело

Если система создала лид успешно, сохраним в переменные:

-  `$leadId` — идентификатор лида,

-  `$leadStatus` — статус лида `STATUS_ID`.

{% list tabs %}

- JS

    ```javascript
    const leadId = addLead.getData().result
    const leadStatus = getLead.getData().result.STATUS_ID
    // ...
    ```

- PHP

    ```php
    $leadId = $crm->lead()->add([/* ... */])->getId();
    $leadStatus = $crm->lead()->get($leadId)->lead()->STATUS_ID;
    // ...
    ```

- Python

    ```python
    lead_id = client.crm.lead.add(fields={...}).result
    lead_status = client.crm.lead.get(bitrix_id=lead_id).result["STATUS_ID"]
    # ...
    ```

{% endlist %}

#### Простой режим

В простом режиме при создании лида с заполненным именем система автоматически конвертирует его в сделку. Поле лида `STATUS_ID` принимает значение `CONVERTED`.

Проверяем значение переменной `$leadStatus`. Если значение равно `'CONVERTED'` — CRM работает в простом режиме и лид уже сконвертирован в сделку.

{% note warning "" %}

В классическом режиме новый лид тоже можно автоматически сконвертировать в сделку с помощью инструментов автоматизации.

Точно узнать режим работы CRM можно специальным методом [crm.settings.mode.get](../../../api-reference/crm/crm-settings-mode-get.md).

{% endnote %}

Чтобы получить идентификатор сделки, используем метод [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md). Укажем в `select` поле `ID`, а в фильтр `filter` передадим поле `LEAD_ID` с идентификатором лида из переменной `$leadId`.

{% list tabs %}

- JS

    ```javascript
    if (leadStatus === 'CONVERTED') {
        // Простой режим: ищем сделку, созданную из лида
        const resultDeal = await $b24.actions.v2.callList.make({
            method: 'crm.deal.list',
            params: { select: ['ID'], filter: { LEAD_ID: leadId } },
            requestId: 'deal-list'
        })
    ```

- PHP

    ```php
    if ($leadStatus == 'CONVERTED') {
        // Простой режим: ищем сделку, созданную из лида
        $deals = $sb->getCRMScope()->deal()->list(
            order: [],
            filter: ['LEAD_ID' => $leadId],
            select: ['ID']
        )->getDeals();
    ```

- Python

    ```python
    if lead_status == "CONVERTED":
        # Простой режим: ищем сделку, созданную из лида
        deals = client.crm.deal.list(
            filter={"LEAD_ID": lead_id}, select=["ID"],
        ).as_list().result
    ```

{% endlist %}

В результате получим идентификатор сделки.

```json
"result": [
    {
        "ID": "1811"
    }
],
```

Для добавления дела в сделку используем метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md). Передаем поля:

-  `ownerTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `2`, то есть сделка,

-  `ownerId` — идентификатор элемента CRM. Укажем идентификатор сделки, который получили в прошлом запросе,

-  `deadline` — крайний срок дела,

-  `title` — название дела,

-  `description` — описание дела.

{% list tabs %}

- JS

    ```javascript
    const deals = resultDeal.getData().result
    if (deals.length && deals[0].ID) {
        const dealId = deals[0].ID
        // Привязываем дело к сделке
        await $b24.actions.v2.call.make({
            method: 'crm.activity.todo.add',
            params: {
                ownerTypeId: 2, // тип объекта — сделка
                ownerId: dealId, // идентификатор сделки
                deadline: new Date(Date.now() + 3600 * 1000).toISOString(), // текущее время + 1 час
                title: 'Позвонить клиенту',
                description: 'Заполнил заявку на сайте',
            },
            requestId: 'todo-deal'
        })
    }
    ```

- PHP

    ```php
    if (!empty($deals)) {
        $dealId = $deals[0]->ID;
        // Привязываем дело к сделке — для crm.activity.todo.add в SDK нет обёртки, вызываем напрямую
        $sb->core->call('crm.activity.todo.add', [
            'ownerTypeId' => 2, // тип объекта — сделка
            'ownerId' => $dealId, // идентификатор сделки
            'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
            'title' => 'Позвонить клиенту',
            'description' => 'Заполнил заявку на сайте',
        ]);
    }
    ```

- Python

    ```python
    from datetime import datetime, timedelta

    if deals:
        deal_id = deals[0]["ID"]
        deadline = (datetime.now() + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")  # +1 час
        # Привязываем дело к сделке — метод crm.activity.todo.add вызываем напрямую
        token.call_method("crm.activity.todo.add", {
            "ownerTypeId": 2,  # тип объекта — сделка
            "ownerId": int(deal_id),  # идентификатор сделки
            "deadline": deadline,
            "title": "Позвонить клиенту",
            "description": "Заполнил заявку на сайте",
        })
    ```

{% endlist %}

#### Классический режим

В классическом режиме система не конвертирует лид, поэтому дело привязываем к созданному лиду.

Для добавления дела в лид используем метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md). Передаем поля:

-  `ownerTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `1`, то есть лид,

-  `ownerId` — идентификатор элемента CRM. Укажем идентификатор нового лида,

-  `deadline` — крайний срок дела,

-  `title` — название дела,

-  `description` — описание дела.

{% list tabs %}

- JS

    ```javascript
    // Классический режим: привязываем дело к лиду
    await $b24.actions.v2.call.make({
        method: 'crm.activity.todo.add',
        params: {
            ownerTypeId: 1, // тип объекта — лид
            ownerId: leadId, // идентификатор лида
            deadline: new Date(Date.now() + 3600 * 1000).toISOString(), // текущее время + 1 час
            title: 'Позвонить клиенту',
            description: 'Заполнил заявку на сайте',
        },
        requestId: 'todo-lead'
    })
    ```

- PHP

    ```php
    // Классический режим: привязываем дело к лиду
    $sb->core->call('crm.activity.todo.add', [
        'ownerTypeId' => 1, // тип объекта — лид
        'ownerId' => $leadId, // идентификатор лида
        'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
        'title' => 'Позвонить клиенту',
        'description' => 'Заполнил заявку на сайте',
    ]);
    ```

- Python

    ```python
    from datetime import datetime, timedelta

    deadline = (datetime.now() + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")  # +1 час
    # Классический режим: привязываем дело к лиду — метод crm.activity.todo.add вызываем напрямую
    token.call_method("crm.activity.todo.add", {
        "ownerTypeId": 1,  # тип объекта — лид
        "ownerId": lead_id,  # идентификатор лида
        "deadline": deadline,
        "title": "Позвонить клиенту",
        "description": "Заполнил заявку на сайте",
    })
    ```

{% endlist %}

## Полный пример кода обработчика

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const app = express()
    app.use(express.json())

    // Обработчик принимает данные формы по маршруту /form
    app.post('/form', async (req, res) => {
        // Получаем и очищаем данные из формы
        const sName = String(req.body.NAME ?? '')
        const sLastName = String(req.body.LAST_NAME ?? '')
        const sCompanyTitle = String(req.body.COMPANY_TITLE ?? '')
        const sPhone = String(req.body.PHONE ?? '')
        const sEmail = String(req.body.EMAIL ?? '')

        // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
        const arEmail = sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : []

        // Формируем заголовок лида из имени и фамилии
        let sTitle = 'С сайта: ' + `${sName} ${sLastName}`.trim()
        if (sCompanyTitle) {
            sTitle += ' — ' + sCompanyTitle
        }

        try {
            // Создаем лид
            const addLead = await $b24.actions.v2.call.make({
                method: 'crm.lead.add',
                params: {
                    fields: {
                        TITLE: sTitle, NAME: sName, LAST_NAME: sLastName,
                        COMPANY_TITLE: sCompanyTitle, PHONE: arPhone, EMAIL: arEmail,
                    }
                },
                requestId: 'add-lead'
            })
            const leadId = addLead.getData().result

            // Получаем данные лида
            const getLead = await $b24.actions.v2.call.make({
                method: 'crm.lead.get', params: { id: leadId }, requestId: 'get-lead'
            })
            const leadStatus = getLead.getData().result.STATUS_ID

            const deadline = new Date(Date.now() + 3600 * 1000).toISOString() // текущее время + 1 час

            if (leadStatus === 'CONVERTED') {
                // Простой режим: ищем сделку, созданную из лида
                const resultDeal = await $b24.actions.v2.callList.make({
                    method: 'crm.deal.list',
                    params: { select: ['ID'], filter: { LEAD_ID: leadId } },
                    requestId: 'deal-list'
                })
                const deals = resultDeal.getData().result
                if (deals.length && deals[0].ID) {
                    // Добавляем дело в сделку
                    await $b24.actions.v2.call.make({
                        method: 'crm.activity.todo.add',
                        params: {
                            ownerTypeId: 2, ownerId: deals[0].ID, deadline,
                            title: 'Позвонить клиенту', description: 'Заполнил заявку на сайте',
                        },
                        requestId: 'todo-deal'
                    })
                }
            } else {
                // Классический режим: добавляем дело в новый лид
                await $b24.actions.v2.call.make({
                    method: 'crm.activity.todo.add',
                    params: {
                        ownerTypeId: 1, ownerId: leadId, deadline,
                        title: 'Позвонить клиенту', description: 'Заполнил заявку на сайте',
                    },
                    requestId: 'todo-lead'
                })
            }

            res.json({ message: 'Дело добавлено в лид или сделку' })
        } catch (e) {
            res.json({ message: e.message })
        }
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

    // Получаем и очищаем данные из формы
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    // Формируем заголовок лида из имени и фамилии
    $sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
    if (!empty($sCompanyTitle)) {
        $sTitle .= ' — ' . $sCompanyTitle;
    }

    try {
        // Создаем лид
        $leadId = $crm->lead()->add([
            'TITLE' => $sTitle, 'NAME' => $sName, 'LAST_NAME' => $sLastName,
            'COMPANY_TITLE' => $sCompanyTitle, 'PHONE' => $arPhone, 'EMAIL' => $arEmail,
        ])->getId();

        // Получаем данные лида
        $leadStatus = $crm->lead()->get($leadId)->lead()->STATUS_ID;

        $deadline = date("Y-m-d H:i:s", time() + 3600); // текущее время + 1 час

        if ($leadStatus == 'CONVERTED') {
            // Простой режим: ищем сделку, созданную из лида
            $deals = $crm->deal()->list(order: [], filter: ['LEAD_ID' => $leadId], select: ['ID'])->getDeals();
            if (!empty($deals)) {
                // Добавляем дело в сделку — у crm.activity.todo.add нет обёртки, вызываем напрямую
                $sb->core->call('crm.activity.todo.add', [
                    'ownerTypeId' => 2, 'ownerId' => $deals[0]->ID, 'deadline' => $deadline,
                    'title' => 'Позвонить клиенту', 'description' => 'Заполнил заявку на сайте',
                ]);
            }
        } else {
            // Классический режим: добавляем дело в новый лид
            $sb->core->call('crm.activity.todo.add', [
                'ownerTypeId' => 1, 'ownerId' => $leadId, 'deadline' => $deadline,
                'title' => 'Позвонить клиенту', 'description' => 'Заполнил заявку на сайте',
            ]);
        }

        echo json_encode(['message' => 'Дело добавлено в лид или сделку']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => $e->getMessage()]);
    }
    ```

- Python

    ```python
    # pip install b24pysdk
    from datetime import datetime, timedelta
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    token = BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    )
    client = Client(token)


    @app.route("/form", methods=["POST"])
    def handle_form():
        # Получаем и очищаем данные из формы
        s_name = request.form.get("NAME", "")
        s_last_name = request.form.get("LAST_NAME", "")
        s_company_title = request.form.get("COMPANY_TITLE", "")
        s_phone = request.form.get("PHONE", "")
        s_email = request.form.get("EMAIL", "")

        # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
        ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []

        # Формируем заголовок лида из имени и фамилии
        s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()
        if s_company_title:
            s_title += " — " + s_company_title

        try:
            # Создаем лид
            lead_id = client.crm.lead.add(fields={
                "TITLE": s_title, "NAME": s_name, "LAST_NAME": s_last_name,
                "COMPANY_TITLE": s_company_title, "PHONE": ar_phone, "EMAIL": ar_email,
            }).result

            # Получаем данные лида
            lead_status = client.crm.lead.get(bitrix_id=lead_id).result["STATUS_ID"]

            deadline = (datetime.now() + timedelta(hours=1)).strftime("%Y-%m-%d %H:%M:%S")  # +1 час

            if lead_status == "CONVERTED":
                # Простой режим: ищем сделку, созданную из лида
                deals = client.crm.deal.list(filter={"LEAD_ID": lead_id}, select=["ID"]).as_list().result
                if deals:
                    # Добавляем дело в сделку (crm.activity.todo.add — вызываем напрямую)
                    token.call_method("crm.activity.todo.add", {
                        "ownerTypeId": 2, "ownerId": int(deals[0]["ID"]), "deadline": deadline,
                        "title": "Позвонить клиенту", "description": "Заполнил заявку на сайте",
                    })
            else:
                # Классический режим: добавляем дело в новый лид
                token.call_method("crm.activity.todo.add", {
                    "ownerTypeId": 1, "ownerId": lead_id, "deadline": deadline,
                    "title": "Позвонить клиенту", "description": "Заполнил заявку на сайте",
                })

            return jsonify({"message": "Дело добавлено в лид или сделку"})
        except Exception as e:
            return jsonify({"message": str(e)})
    ```

{% endlist %}
