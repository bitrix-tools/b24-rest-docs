# Добавить дело в новый лид или сделку в зависимости от режима CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «право на изменение лидов и сделок»
>
> - [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) — пользователь с правом на создание лидов
> - [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md) — пользователь с правом на чтение лидов
> - [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) — пользователь с правом на чтение сделок
> - [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) — пользователь с правом на редактирование элемента CRM, в который добавляется дело

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму, его данные попадут в CRM. Вы сможете обработать заявку и позвонить клиенту.

В результате сценария в CRM появится новый лид, а в таймлайне — дело с напоминанием о звонке. К какому объекту привязано дело, зависит от режима работы CRM: в простом режиме — к сделке, которая получилась из лида, в классическом — к самому лиду.

Настройка состоит из двух этапов:

1. Подготавливаем поля и размещаем форму на странице

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md), [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md), [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) и [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md)

## Режимы CRM

В Битрикс24 есть два режима работы CRM.

1. Простой режим — работает без лидов. Система автоматически конвертирует новый лид в сделку, а лид получает статус `CONVERTED`

2. Классический режим — разделяет потенциальных и действующих клиентов. Лид остается в системе со статусом `NEW`

Дело нужно привязать к тому объекту, который в CRM появился на самом деле. Поэтому в обработчике после создания лида проверяем его статус и по нему выбираем, куда добавить напоминание о звонке.

Узнать, какой режим настроен в Битрикс24, можно методом [crm.settings.mode.get](../../../api-reference/crm/crm-settings-mode-get.md). Он возвращает `1` для классического режима и `2` для простого. Но в сценарии мы опираемся не на эту настройку, а на статус конкретного лида: в классическом режиме лид тоже может сконвертироваться, если это делают роботы или другие инструменты автоматизации.

{% note tip "Пользовательская документация" %}

- [Как выбрать режим работы CRM](https://helpdesk.bitrix24.ru/open/23440468/)

{% endnote %}

## Что нужно до начала

- вебхук создан от имени пользователя с правом на создание лидов, на чтение сделок и на редактирование лидов и сделок

- есть сервер, который отдает страницу с формой и принимает данные формы методом `POST`. В примерах это Express для JS, PHP-скрипт и Flask для Python

- путь вебхука хранится в окружении, а не в коде страницы. Форма находится на публичной странице, и попадать в нее секрет не должен

- поле `NAME` в форме обязательное. В простом режиме система конвертирует в сделку лид с заполненным именем

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с пятью полями:

- `NAME` — имя клиента, обязательное поле

- `LAST_NAME` — фамилия

- `COMPANY_TITLE` — название компании

- `PHONE` — телефон

- `EMAIL` — электронная почта

Форма передает данные методом `POST` в обработчик.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

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

Обработчик принимает значения полей формы, создает лид, проверяет его статус и добавляет дело с напоминанием о звонке в лид или в сделку.

### Подготавливаем данные из формы

Читаем поля `NAME`, `LAST_NAME`, `COMPANY_TITLE`, `PHONE`, `EMAIL` и приводим их к строке. Если поле не заполнено, получаем пустую строку, а не `undefined` или `None`.

Форму заполняет посетитель сайта, поэтому значения нельзя считать безопасными. В примере на PHP их дополнительно пропускаем через `htmlspecialchars`. Если вы возвращаете эти значения обратно на страницу, экранируйте их и в остальных примерах.

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

Телефон и почту система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, записываем его в поле `VALUE`, а в поле `VALUE_TYPE` передаем [тип](../../../api-reference/crm/data-types.md#crm_multifield), например `WORK` для телефона и `HOME` для почты

2. Если значения нет, передаем пустой массив

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

- `TITLE` — заголовок лида из переменной `$sTitle`

- `NAME` — имя из поля формы `NAME`

- `LAST_NAME` — фамилия из поля формы `LAST_NAME`

- `COMPANY_TITLE` — название компании из поля формы `COMPANY_TITLE`

- `PHONE` — телефон в формате `crm_multifield` из переменной `$arPhone`

- `EMAIL` — почта в формате `crm_multifield` из переменной `$arEmail`

Метод вернет идентификатор нового лида — сохраняем его в переменную `$leadId`. Он нужен на следующих шагах: чтобы получить статус лида и чтобы найти сделку, если лид сконвертирован.

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
        "TITLE": "С сайта: Иван Иванов",
        "HONORIFIC": null,
        "NAME": "Иван",
        "SECOND_NAME": null,
        "LAST_NAME": "Иванов",
        "COMPANY_TITLE": null,
        "STATUS_ID": "CONVERTED"
    }
}
```

Ответ сокращен: метод возвращает все поля лида. Для сценария важно только `STATUS_ID`.

### Определяем, куда добавить дело

По значению переменной `$leadStatus` выбираем ветку сценария.

- `CONVERTED` — лид уже сконвертирован в сделку. Находим сделку и добавляем дело в нее

- любое другое значение, например `NEW` — лид остался лидом. Добавляем дело прямо в него

В обеих ветках дело добавляет метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md). Передаем поля:

- `ownerTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Значение зависит от ветки: `1` — лид, `2` — сделка

- `ownerId` — идентификатор элемента CRM. Зависит от ветки: идентификатор лида или сделки

- `deadline` — крайний срок дела. Передаем время в формате `2026-08-19 15:00:00` или `2026-08-19T15:00:00`, метод принимает оба

- `title` — название дела

- `description` — описание дела

#### Простой режим

Сам лид уже не нужен — дело добавим в сделку. Чтобы получить ее идентификатор, используем метод [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md). Укажем в `select` поле `ID`, а в фильтр `filter` передадим поле `LEAD_ID` с идентификатором лида из переменной `$leadId`.

{% list tabs %}

- JS

    ```javascript
    // Простой режим: ищем сделку, созданную из лида
    const resultDeal = await $b24.actions.v2.callList.make({
        method: 'crm.deal.list',
        params: { select: ['ID'], filter: { LEAD_ID: leadId } },
        requestId: 'deal-list'
    })
    const deals = resultDeal.getData().result
    ```

- PHP

    ```php
    // Простой режим: ищем сделку, созданную из лида
    $deals = $sb->getCRMScope()->deal()->list(
        order: [],
        filter: ['LEAD_ID' => $leadId],
        select: ['ID']
    )->getDeals();
    ```

- Python

    ```python
    # Простой режим: ищем сделку, созданную из лида
    deals = client.crm.deal.list(
        filter={"LEAD_ID": lead_id}, select=["ID"],
    ).as_list().result
    ```

{% endlist %}

В результате получим массив сделок. Из одного лида получается одна сделка, поэтому берем первый элемент.

```json
{
    "result": [
        {
            "ID": "1811"
        }
    ],
    "total": 1
}
```

Дело добавляем в сделку: в `ownerTypeId` передаем `2`, в `ownerId` — идентификатор сделки из переменной `$deals`.

{% list tabs %}

- JS

    ```javascript
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
        // Привязываем дело к сделке — для crm.activity.todo.add в SDK нет обертки, вызываем напрямую
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

Сделки нет, поэтому дело привязываем к самому лиду. Дополнительный запрос не нужен: идентификатор лида уже лежит в переменной `$leadId`.

Дело добавляем в лид: в `ownerTypeId` передаем `1`, в `ownerId` — идентификатор нового лида из переменной `$leadId`.

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

Метод вернет идентификатор созданного дела.

```json
{
    "result": {
        "id": 999
    }
}
```

### Полный пример кода обработчика

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
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'
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
                // Добавляем дело в сделку — у crm.activity.todo.add нет обертки, вызываем напрямую
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
    # pip install b24pysdk flask
    import os
    from datetime import datetime, timedelta
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    token = BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    )
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN' — только user_id и токен, без https://
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

## Проверим результат

Откройте созданный лид в Битрикс24. Если CRM работает в классическом режиме, в таймлайне лида появится дело «Позвонить клиенту» с крайним сроком через час. В простом режиме лид будет сконвертирован, а дело окажется в таймлайне сделки.

Через REST дела объекта проверяет метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром по владельцу: `OWNER_TYPE_ID` — `1` для лида и `2` для сделки, `OWNER_ID` — идентификатор объекта.

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.callList.make({
        method: 'crm.activity.list',
        params: {
            filter: { OWNER_TYPE_ID: 1, OWNER_ID: leadId },
            select: ['ID', 'SUBJECT', 'OWNER_TYPE_ID', 'OWNER_ID']
        },
        requestId: 'activity-list'
    })

    console.dir(checkResponse.getData().result)
    ```

- PHP

    ```php
    $activities = $sb->getCRMScope()->activity()->list(
        [],
        ['OWNER_TYPE_ID' => 1, 'OWNER_ID' => $leadId],
        ['ID', 'SUBJECT', 'OWNER_TYPE_ID', 'OWNER_ID'],
        0
    )->getActivities();
    ```

- Python

    ```python
    activities = client.crm.activity.list(
        filter={"OWNER_TYPE_ID": 1, "OWNER_ID": lead_id},
        select=["ID", "SUBJECT", "OWNER_TYPE_ID", "OWNER_ID"],
    ).response.result
    ```

{% endlist %}

Сценарий выполнен, если:

- метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) вернул идентификатор лида

- метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) вернул объект с идентификатором дела `id`

- в списке дел объекта есть дело с темой «Позвонить клиенту», а его `OWNER_TYPE_ID` и `OWNER_ID` указывают на лид или на сделку — в зависимости от того, по какой ветке пошел сценарий

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| Пустое значение `Access denied` | У пользователя нет прав на создание лидов. Проверьте, от имени какого пользователя создан вебхук ||
|| `ACCESS_DENIED` | У пользователя нет прав на редактирование объекта, в который добавляется дело. Право нужно и на лид, и на сделку ||
|| `100` | В [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) не переданы обязательные поля `ownerTypeId`, `ownerId` или `deadline` ||
|| `OWNER_NOT_FOUND` | Объект, указанный в `ownerId`, не найден. Чаще всего это значит, что в `ownerId` попал идентификатор лида, а в `ownerTypeId` — значение `2` ||
|| `WRONG_DATETIME_FORMAT` | Значение `deadline` не распознано как дата. Передавайте время в формате `2026-08-19 15:00:00` или `2026-08-19T15:00:00` ||
|#

Лид может создаться, а дело — не появиться там, где вы его ждете. Проверьте по порядку:

- [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md) вернул `STATUS_ID` со значением `NEW`, хотя CRM работает в простом режиме. Лид не сконвертирован — проверьте, что поле `NAME` заполнено

- статус равен `CONVERTED`, но [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) вернул пустой список. У пользователя вебхука нет прав на чтение сделок. Сделка создана, но в выборку не попала

- дело добавилось в лид, хотя вы ожидали его в сделке. Значит, на момент проверки лид еще не был сконвертирован

Повторяйте сценарий с того шага, который вернул ошибку. Получение лида и списка сделок ничего не создают, их можно выполнять сколько угодно раз. Если ошибку вернул [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md), лид не создан: исправьте `fields` и повторите только этот вызов. Если ошибку вернул [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md), лид уже существует — повторяйте только добавление дела, иначе получите дубликат лида.

## Что важно учитывать

- вебхуку нужны права сразу на два типа объектов. Ветку выбирает система, и заранее неизвестно, попадет дело в лид или в сделку

- у метода [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) нет типизированной обертки в B24PhpSDK и b24pysdk, поэтому его вызываем через ядро SDK

- повторная отправка формы с теми же данными каждый раз создает новый лид. Дубликаты не отсеиваются. Чтобы связывать повторные обращения, используйте сценарий [{#T}](./how-to-add-repeat-lead.md)

- напоминание о звонке можно настроить точнее: передайте в [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) параметр `pingOffsets`, например `[0, 15]` — уведомления придут за 15 минут до крайнего срока и в момент его наступления

## Продолжите изучение

- [{#T}](../../../api-reference/crm/leads/crm-lead-add.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-get.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md)
- [{#T}](../../../api-reference/crm/crm-settings-mode-get.md)
- [{#T}](../../../api-reference/crm/data-types.md)
