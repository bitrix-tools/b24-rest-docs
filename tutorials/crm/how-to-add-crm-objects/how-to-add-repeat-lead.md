# Добавить повторный лид

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на чтение лидов, контактов, компаний и правом на создание лидов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Когда клиент заполняет форму на сайте, его данные передаются в обработчик. Скрипт ищет в CRM совпадения по телефону или электронной почте среди лидов, контактов и компаний. Если совпадения найдены, лид помечается как повторный и привязывается к имеющейся записи. Такой подход помогает избежать дублей и повышает эффективность работы менеджеров.

{% note info "" %}

В Битрикс24 должен быть включен режим работы с повторными лидами. Подробнее читайте в статье [Повторные лиды и сделки](https://helpdesk.bitrix24.ru/open/17707848/).

{% endnote %}

Настройка состоит из двух этапов:

1. Подготавливаем поля и размещаем форму на странице.

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md), [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md), [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

## 1\. Создаем веб-форму

Создаем HTML-форму с полями:

- `NAME` — имя клиента, обязательное поле,

- `LAST_NAME` — фамилия,

- `PHONE` — телефон,

- `EMAIL` — электронная почта.

Форма передает данные методом `POST` в обработчик.

{% list tabs %}

- JS

    ```html
    <form id="form_to_crm">
        <input type="text" name="NAME" placeholder="Name" required>
        <input type="text" name="LAST_NAME" placeholder="Last name">
        <input type="text" name="PHONE" placeholder="Phone">
        <input type="text" name="EMAIL" placeholder="E-mail">
        <input type="submit" value="Submit">
    </form>

    <script>
        document.getElementById('form_to_crm').addEventListener('submit', async (el) => {
            el.preventDefault();
            const formData = Object.fromEntries(new FormData(el.currentTarget).entries());
            const response = await fetch('/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);
        });
    </script>
    ```

- PHP

    ```html
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

    <form id="form_to_crm">
        <input type="text" name="NAME" placeholder="Name" required>
        <input type="text" name="LAST_NAME" placeholder="Last name">
        <input type="text" name="PHONE" placeholder="Phone">
        <input type="text" name="EMAIL" placeholder="E-mail">
        <input type="submit" value="Submit">
    </form>
    ```

- Python

    ```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
    $(document).ready(function() {
        $('#form_to_crm').on( 'submit', function(el) {//event submit form
            el.preventDefault();//the default action of the event will not be triggered
            var formData = $(this).serialize();
            $.ajax({
                'method': 'POST',
                'dataType': 'json',
                'url': '/form', // маршрут обработчика на Flask
                'data': formData,
                success: function(data){//success callback
                    alert(data.message);
                }
            });
        });
    });
    </script>

    <form id="form_to_crm">
        <input type="text" name="NAME" placeholder="Name" required>
        <input type="text" name="LAST_NAME" placeholder="Last name">
        <input type="text" name="PHONE" placeholder="Phone">
        <input type="text" name="EMAIL" placeholder="E-mail">
        <input type="submit" value="Submit">
    </form>
    ```

{% endlist %}

## 2\. Создаем обработчик формы

Создаем обработчик. Он будет обрабатывать данные, проверять дубликаты и создавать лид.

### Получаем данные из формы

Получаем и безопасно обрабатываем данные из полей `NAME`, `LAST_NAME`, `PHONE`, `EMAIL`, чтобы избежать XSS-атак.

{% list tabs %}

- JS

    ```javascript
    const sName = String(req.body.NAME ?? '')
    const sLastName = String(req.body.LAST_NAME ?? '')
    const sPhone = String(req.body.PHONE ?? '')
    const sEmail = String(req.body.EMAIL ?? '')
    ```

- PHP

    ```php
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);
    ```

- Python

    ```python
    s_name = request.form.get("NAME", "")
    s_last_name = request.form.get("LAST_NAME", "")
    s_phone = request.form.get("PHONE", "")
    s_email = request.form.get("EMAIL", "")
    ```

{% endlist %}

Формируем массив `$arFields` с данными нового лида.

{% list tabs %}

- JS

    ```javascript
    const arFields = {
        TITLE: 'From the site: ' + [sName, sLastName].join(' '),
        NAME: sName || 'Empty name',
        LAST_NAME: sLastName,
        PHONE: sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'HOME' }] : [],
        EMAIL: sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : [],
    }
    ```

- PHP

    ```php
    $arFields = [
        'TITLE' => 'From the site: ' . implode(' ', [$sName, $sLastName]),
        'NAME' => (!empty($sName)) ? $sName : 'Empty name',
        'LAST_NAME' => $sLastName,
        'PHONE' => (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'HOME')) : array(),
        'EMAIL' => (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array()
    ];
    ```

- Python

    ```python
    ar_fields = {
        "TITLE": "From the site: " + " ".join([s_name, s_last_name]),
        "NAME": s_name or "Empty name",
        "LAST_NAME": s_last_name,
        "PHONE": [{"VALUE": s_phone, "VALUE_TYPE": "HOME"}] if s_phone else [],
        "EMAIL": [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else [],
    }
    ```

{% endlist %}

Заголовок лида формируем как `From the site: Имя Фамилия`.

Система хранит телефон и электронную почту как массивы объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому формируем массивы `PHONE` и `EMAIL` с помощью значений `$sPhone` и `$sEmail`.

- В поля `VALUE` записываем `$sPhone` и `$sEmail`.

- В поля `VALUE_TYPE` передаем [типы](../../../api-reference/crm/data-types.md#crm_multifield), например, `HOME`.

Если в переменных `$sPhone` и `$sEmail` нет значений, указываем пустые массивы.

### Ищем дубликаты лидов

Чтобы найти повторяющиеся лиды по телефону и электронной почте, используем метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) дважды. В него нужно передать следующие данные:

- `entity_type` — тип объекта. Передаем `LEAD` — лид.

- `type` — тип коммуникации. При первом вызове указываем `PHONE`, при втором — `EMAIL`.

- `values` — массив значений для поиска. Передаем значение телефона `$sPhone`, который получили из формы.

Поиск по телефону,  `"type" => "PHONE"`.

{% list tabs %}

- JS

    ```javascript
    if (sPhone) {
        const resultDuplicate = await $b24.actions.v2.call.make({
            method: 'crm.duplicate.findbycomm',
            params: { entity_type: 'LEAD', type: 'PHONE', values: [sPhone] },
            requestId: 'dup-phone'
        })
        const found = resultDuplicate.getData()?.result?.LEAD
        if (found) arLeadDuplicate = arLeadDuplicate.concat(found)
    }
    ```

- PHP

    ```php
    if (!empty($sPhone)) {
        $result = $sb->getCRMScope()->duplicate()->findByPhone(
            [$sPhone],
            \Bitrix24\SDK\Services\CRM\Duplicates\Service\EntityType::Lead
        )->getCoreResponse()->getResponseData()->getResult();
        if (!empty($result['LEAD'])) {
            $arLeadDuplicate = array_merge($arLeadDuplicate, $result['LEAD']);
        }
    }
    ```

- Python

    ```python
    if s_phone:
        result_duplicate = client.crm.duplicate.findbycomm(
            type="PHONE", values=[s_phone], entity_type="LEAD",
        ).result
        if result_duplicate.get("LEAD"):
            ar_lead_duplicate += result_duplicate["LEAD"]
    ```

{% endlist %}

Поиск дубликатов по электронной почте, `"type" => "EMAIL"`.

{% list tabs %}

- JS

    ```javascript
    if (sEmail) {
        const resultDuplicate = await $b24.actions.v2.call.make({
            method: 'crm.duplicate.findbycomm',
            params: { entity_type: 'LEAD', type: 'EMAIL', values: [sEmail] },
            requestId: 'dup-email'
        })
        const found = resultDuplicate.getData()?.result?.LEAD
        if (found) arLeadDuplicate = arLeadDuplicate.concat(found)
    }
    ```

- PHP

    ```php
    if (!empty($sEmail)) {
        $result = $sb->getCRMScope()->duplicate()->findByEmail(
            [$sEmail],
            \Bitrix24\SDK\Services\CRM\Duplicates\Service\EntityType::Lead
        )->getCoreResponse()->getResponseData()->getResult();
        if (!empty($result['LEAD'])) {
            $arLeadDuplicate = array_merge($arLeadDuplicate, $result['LEAD']);
        }
    }
    ```

- Python

    ```python
    if s_email:
        result_duplicate = client.crm.duplicate.findbycomm(
            type="EMAIL", values=[s_email], entity_type="LEAD",
        ).result
        if result_duplicate.get("LEAD"):
            ar_lead_duplicate += result_duplicate["LEAD"]
    ```

{% endlist %}

Идентификаторы найденных дубликатов объединяем в массиве `$arLeadDuplicate`.

### Обрабатываем дубликаты

Если дубликаты найдены, вызываем метод [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md).

1. Применяем фильтр по идентификатору и статусу `CONVERTED`.

2. Выбираем поля: `ID`, `COMPANY_ID,` `CONTACT_ID`.

3. Сохраняем результат в массиве `$arDuplicateLead`.

4. Заполняем поля `COMPANY_ID` и `CONTACT_ID` в массиве `$arFields` значениями из `$arDuplicateLead`.

{% list tabs %}

- JS

    ```javascript
    if (arLeadDuplicate.length) {
        const duplicateLead = await $b24.actions.v2.callList.make({
            method: 'crm.lead.list',
            params: {
                filter: { '=ID': arLeadDuplicate, STATUS_ID: 'CONVERTED' },
                select: ['ID', 'COMPANY_ID', 'CONTACT_ID']
            },
            requestId: 'dup-lead-list'
        })
        const arDuplicateLead = duplicateLead.getData()?.result ?? []
        const company = arDuplicateLead.map(r => r.COMPANY_ID).find(v => v > 0)
        const contact = arDuplicateLead.map(r => r.CONTACT_ID).find(v => v > 0)
        if (company) arFields.COMPANY_ID = company
        if (contact) arFields.CONTACT_ID = contact
    }
    ```

- PHP

    ```php
    if (!empty($arLeadDuplicate)) {
        $arDuplicateLead = [];
        foreach ($sb->getCRMScope()->lead()->batch->list(
            order: [],
            filter: ['=ID' => $arLeadDuplicate, 'STATUS_ID' => 'CONVERTED'],
            select: ['ID', 'COMPANY_ID', 'CONTACT_ID']
        ) as $lead) {
            $arDuplicateLead[] = $lead;
        }

        foreach ($arDuplicateLead as $lead) {
            if ($lead->COMPANY_ID > 0 && empty($arFields['COMPANY_ID'])) {
                $arFields['COMPANY_ID'] = $lead->COMPANY_ID;
            }
            if ($lead->CONTACT_ID > 0 && empty($arFields['CONTACT_ID'])) {
                $arFields['CONTACT_ID'] = $lead->CONTACT_ID;
            }
        }
    }
    ```

- Python

    ```python
    if ar_lead_duplicate:
        ar_duplicate_lead = client.crm.lead.list(
            filter={"=ID": ar_lead_duplicate, "STATUS_ID": "CONVERTED"},
            select=["ID", "COMPANY_ID", "CONTACT_ID"],
        ).as_list().result

        company = next((r["COMPANY_ID"] for r in ar_duplicate_lead if int(r["COMPANY_ID"] or 0) > 0), None)
        contact = next((r["CONTACT_ID"] for r in ar_duplicate_lead if int(r["CONTACT_ID"] or 0) > 0), None)
        if company:
            ar_fields["COMPANY_ID"] = company
        if contact:
            ar_fields["CONTACT_ID"] = contact
    ```

{% endlist %}

### Добавляем новый лид

Чтобы добавить лид, используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В него передаем массив `$arFields`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    await $b24.actions.v2.call.make({
        method: 'crm.lead.add',
        params: { fields: arFields },
        requestId: 'repeat-lead-add'
    })
    ```

- PHP

    ```php
    $sb->getCRMScope()->lead()->add($arFields);
    ```

- Python

    ```python
    client.crm.lead.add(fields=ar_fields)
    ```

{% endlist %}

Если лид создан успешно, метод вернет его идентификатор. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

```json
{
    "result": 3289,
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
        const sName = String(req.body.NAME ?? '')
        const sLastName = String(req.body.LAST_NAME ?? '')
        const sPhone = String(req.body.PHONE ?? '')
        const sEmail = String(req.body.EMAIL ?? '')

        const arFields = {
            TITLE: sName || 'Empty name',
            LAST_NAME: sLastName,
            PHONE: sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'HOME' }] : [],
            EMAIL: sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : [],
        }

        let arLeadDuplicate = []
        if (sPhone) { // поиск дубликатов по телефону
            const r = await $b24.actions.v2.call.make({
                method: 'crm.duplicate.findbycomm',
                params: { entity_type: 'LEAD', type: 'PHONE', values: [sPhone] },
                requestId: 'dup-phone'
            })
            const found = r.getData()?.result?.LEAD
            if (found) arLeadDuplicate = arLeadDuplicate.concat(found)
        }

        if (sEmail) { // поиск дубликатов по email
            const r = await $b24.actions.v2.call.make({
                method: 'crm.duplicate.findbycomm',
                params: { entity_type: 'LEAD', type: 'EMAIL', values: [sEmail] },
                requestId: 'dup-email'
            })
            const found = r.getData()?.result?.LEAD
            if (found) arLeadDuplicate = arLeadDuplicate.concat(found)
        }

        if (arLeadDuplicate.length) { // получение дубликата лида с полями связанных контакта и компании
            const duplicateLead = await $b24.actions.v2.callList.make({
                method: 'crm.lead.list',
                params: {
                    filter: { '=ID': arLeadDuplicate, STATUS_ID: 'CONVERTED' },
                    select: ['ID', 'COMPANY_ID', 'CONTACT_ID']
                },
                requestId: 'dup-lead-list'
            })
            const arDuplicateLead = duplicateLead.getData()?.result ?? []
            const company = arDuplicateLead.map(r => r.COMPANY_ID).find(v => v > 0)
            const contact = arDuplicateLead.map(r => r.CONTACT_ID).find(v => v > 0)
            if (company) arFields.COMPANY_ID = company
            if (contact) arFields.CONTACT_ID = contact
        }

        const result = await $b24.actions.v2.call.make({ // создание повторного лида
            method: 'crm.lead.add',
            params: { fields: arFields },
            requestId: 'repeat-lead-add'
        })

        if (result.isSuccess && result.getData()?.result) {
            res.json({ message: 'Lead add' })
        } else {
            res.json({ message: 'Lead not added: ' + result.getErrorMessages().join('; ') })
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
    use Bitrix24\SDK\Services\CRM\Duplicates\Service\EntityType;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    $arFields = [
        'TITLE' => (!empty($sName)) ? $sName : 'Empty name',
        'LAST_NAME' => $sLastName,
        'PHONE' => (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'HOME')) : array(),
        'EMAIL' => (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array()
    ];

    $arLeadDuplicate = [];
    if (!empty($sPhone)) { // поиск дубликатов по телефону
        $r = $sb->getCRMScope()->duplicate()->findByPhone([$sPhone], EntityType::Lead)
            ->getCoreResponse()->getResponseData()->getResult();
        if (!empty($r['LEAD'])) {
            $arLeadDuplicate = array_merge($arLeadDuplicate, $r['LEAD']);
        }
    }

    if (!empty($sEmail)) { // поиск дубликатов по email
        $r = $sb->getCRMScope()->duplicate()->findByEmail([$sEmail], EntityType::Lead)
            ->getCoreResponse()->getResponseData()->getResult();
        if (!empty($r['LEAD'])) {
            $arLeadDuplicate = array_merge($arLeadDuplicate, $r['LEAD']);
        }
    }

    if (!empty($arLeadDuplicate)) { // получение дубликата лида с полями связанных контакта и компании
        foreach ($sb->getCRMScope()->lead()->batch->list(
            order: [],
            filter: ['=ID' => $arLeadDuplicate, 'STATUS_ID' => 'CONVERTED'],
            select: ['ID', 'COMPANY_ID', 'CONTACT_ID']
        ) as $lead) {
            if ($lead->COMPANY_ID > 0 && empty($arFields['COMPANY_ID'])) {
                $arFields['COMPANY_ID'] = $lead->COMPANY_ID;
            }
            if ($lead->CONTACT_ID > 0 && empty($arFields['CONTACT_ID'])) {
                $arFields['CONTACT_ID'] = $lead->CONTACT_ID;
            }
        }
    }

    try {
        $sb->getCRMScope()->lead()->add($arFields); // создание повторного лида
        echo json_encode(['message' => 'Lead add']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Lead not added: ' . $e->getMessage()]);
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


    @app.route("/form", methods=["POST"])
    def handle_form():
        s_name = request.form.get("NAME", "")
        s_last_name = request.form.get("LAST_NAME", "")
        s_phone = request.form.get("PHONE", "")
        s_email = request.form.get("EMAIL", "")

        ar_fields = {
            "TITLE": s_name or "Empty name",
            "LAST_NAME": s_last_name,
            "PHONE": [{"VALUE": s_phone, "VALUE_TYPE": "HOME"}] if s_phone else [],
            "EMAIL": [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else [],
        }

        ar_lead_duplicate = []
        if s_phone:  # поиск дубликатов по телефону
            r = client.crm.duplicate.findbycomm(type="PHONE", values=[s_phone], entity_type="LEAD").result
            if r.get("LEAD"):
                ar_lead_duplicate += r["LEAD"]

        if s_email:  # поиск дубликатов по email
            r = client.crm.duplicate.findbycomm(type="EMAIL", values=[s_email], entity_type="LEAD").result
            if r.get("LEAD"):
                ar_lead_duplicate += r["LEAD"]

        if ar_lead_duplicate:  # получение дубликата лида с полями связанных контакта и компании
            ar_duplicate_lead = client.crm.lead.list(
                filter={"=ID": ar_lead_duplicate, "STATUS_ID": "CONVERTED"},
                select=["ID", "COMPANY_ID", "CONTACT_ID"],
            ).as_list().result
            company = next((r["COMPANY_ID"] for r in ar_duplicate_lead if int(r["COMPANY_ID"] or 0) > 0), None)
            contact = next((r["CONTACT_ID"] for r in ar_duplicate_lead if int(r["CONTACT_ID"] or 0) > 0), None)
            if company:
                ar_fields["COMPANY_ID"] = company
            if contact:
                ar_fields["CONTACT_ID"] = contact

        try:
            client.crm.lead.add(fields=ar_fields)  # создание повторного лида
            return jsonify({"message": "Lead add"})
        except Exception as e:
            return jsonify({"message": f"Lead not added: {e}"})
    ```

{% endlist %}

## Продолжите изучение 

- [{#T}](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-list.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-add.md)

