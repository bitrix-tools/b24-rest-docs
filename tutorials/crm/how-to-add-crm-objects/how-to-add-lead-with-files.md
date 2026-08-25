# Добавить лид с файлами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «администратор CRM». Оно требуется один раз, чтобы создать пользовательские поля для файлов
>
> - [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) — администратор CRM
> - [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) — пользователь с правом на создание лидов
> - [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md) — пользователь с правом на чтение лидов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму и приложит файлы, его данные попадут в CRM, и вы сможете обработать заявку.

В результате сценария в CRM появится новый лид. В карточке лида будут заполнены имя, фамилия, название компании, телефон и почта, а в пользовательских полях типа «файл» — вложения, которые клиент приложил к форме.

Настройка состоит из двух этапов:

1. Подготавливаем поля и размещаем форму на странице

2. Создаем файл-обработчик. Он примет и подготовит данные, закодирует файлы в Base64 и создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md)

## Что нужно до начала

- в лидах созданы два пользовательских поля типа «файл»: одно для одного файла и одно с признаком «множественное» для нескольких. Создайте их в Битрикс24 вручную или методом [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) с параметрами `USER_TYPE_ID`: `file` и `MULTIPLE`: `Y` для множественного поля

- вебхук создан от имени пользователя с правом на создание лидов

- есть сервер, который отдает страницу с формой и принимает данные формы методом `POST` в формате `multipart/form-data`. В примерах это Express с пакетом `multer` для JS, PHP-скрипт и Flask для Python

- путь вебхука хранится в окружении, а не в коде страницы. Форма находится на публичной странице, и попадать в нее секрет не должен

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с полями:

- `NAME` — имя, обязательное поле

- `LAST_NAME` — фамилия

- `COMPANY_TITLE` — название компании

- `EMAIL` — электронная почта

- `PHONE` — телефон

Чтобы клиент мог загрузить файлы, добавим в форму поля:

- `FILE` — для одного файла

- `FILES` — для нескольких файлов

Форма передает данные методом `POST` в обработчик. Атрибут `enctype="multipart/form-data"` обязателен: без него браузер отправит только имена файлов, а не их содержимое.

### Полный пример кода страницы с формой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```html
    <form id="form_to_crm" enctype="multipart/form-data">
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
        <!-- Поле для одного файла -->
        <input type="file" name="FILE">
        <!-- Поле для нескольких файлов -->
        <input type="file" name="FILES" multiple>
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <script>
        document.getElementById('form_to_crm').addEventListener('submit', async (el) => {
            el.preventDefault();
            // FormData сам соберет текстовые поля и файлы (multipart/form-data)
            const formData = new FormData(el.currentTarget);
            // Content-Type не указываем — браузер выставит multipart с boundary
            const response = await fetch('/form', { method: 'POST', body: formData });
            const data = await response.json();
            alert(data.message);
        });
    </script>
    ```

- Python

    ```html
    <form id="form_to_crm" enctype="multipart/form-data">
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
        <!-- Поле для одного файла -->
        <input type="file" name="FILE">
        <!-- Поле для нескольких файлов -->
        <input type="file" name="FILES" multiple>
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <!-- Подключаем jQuery для AJAX-запроса -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault();
                var formData = new FormData(this); // Собираем данные формы с файлами
                $.ajax({
                    method: 'POST',
                    url: '/form', // маршрут обработчика на Flask
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function(data) {
                        alert(data.message);
                    },
                    error: function() {
                        alert('Ошибка при отправке формы');
                    }
                });
            });
        });
    </script>
    ```


- PHP

    ```html
    <form id="form_to_crm" method="POST" action="form.php" enctype="multipart/form-data">
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
        <!-- Поле для одного файла -->
        <input type="file" name="FILE">
        <!-- Поле для нескольких файлов -->
        <input type="file" name="FILES" multiple>
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <!-- Подключаем jQuery для AJAX-запроса -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault();
                var formData = new FormData(this); // Собираем данные формы с файлами
                $.ajax({
                    method: 'POST',
                    url: 'form.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function(data) {
                        alert(data.message);
                    },
                    error: function() {
                        alert('Ошибка при отправке формы');
                    }
                });
            });
        });
    </script>
    ```
{% endlist %}

## 2. Создаем обработчик формы

Обработчик принимает значения полей формы, готовит их к передаче в метод и добавляет лид в CRM.

### Подготавливаем данные из формы

#### Получаем значения полей

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

- Python

    ```python
    # Получаем данные из формы
    s_name = request.form.get("NAME", "")
    s_last_name = request.form.get("LAST_NAME", "")
    s_company_title = request.form.get("COMPANY_TITLE", "")
    s_phone = request.form.get("PHONE", "")
    s_email = request.form.get("EMAIL", "")
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
{% endlist %}

#### Подготавливаем файлы

Метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) принимает файл как объект с ключом `fileData`. В ключе — массив из двух элементов:

- имя файла

- содержимое файла, закодированное в Base64

В поле для одного файла передаем такой объект, в поле для нескольких файлов — массив таких объектов. Чтобы закодировать файл, используем функцию `base64_encode` в PHP, метод `Buffer.toString('base64')` в JS и модуль `base64` в Python.

{% note tip "Документация" %}

- [Как работать с файлами](../../../api-reference/files/index.md)

- [Как выбрать формат передачи файла](../../../api-reference/files/how-to-upload-files.md#formats)

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    // Создаем переменные для массивов с файлами
    const arFiles = []
    let arSingleFile = []

    // Обрабатываем поле FILES с несколькими файлами (multer хранит их в req.files)
    for (const file of req.files?.FILES ?? []) {
        arFiles.push({
            fileData: [
                file.originalname, // название файла
                file.buffer.toString('base64'), // контент файла, закодированный в base64
            ]
        })
    }

    // Обрабатываем поле FILE с одним файлом
    const single = req.files?.FILE?.[0]
    if (single) {
        arSingleFile = {
            fileData: [
                single.originalname, // название файла
                single.buffer.toString('base64'), // контент файла, закодированный в base64
            ]
        }
    }
    ```

- Python

    ```python
    import base64

    # Создаем переменные для массивов с файлами
    ar_files = []
    ar_single_file = []

    # Обрабатываем поле FILES с несколькими файлами
    for file in request.files.getlist("FILES"):
        if file and file.filename:
            ar_files.append({
                "fileData": [
                    file.filename,  # название файла
                    base64.b64encode(file.read()).decode(),  # контент файла, закодированный в base64
                ]
            })

    # Обрабатываем поле FILE с одним файлом
    single = request.files.get("FILE")
    if single and single.filename:
        ar_single_file = {
            "fileData": [
                single.filename,  # название файла
                base64.b64encode(single.read()).decode(),  # контент файла, закодированный в base64
            ]
        }
    ```


- PHP

    ```php
    // Создаем переменные для массивов с файлами
    $arFiles = [];
    $arSingleFile = [];

    // Обрабатываем поле FILES с несколькими файлами
    if(!empty($_FILES['FILES']['tmp_name'])) {
        foreach($_FILES['FILES']['tmp_name'] as $key => $tmpName) {
            if(!empty($tmpName)) {
                $arFiles[] = [
                    'fileData' => [
                        $_FILES['FILES']['name'][$key], // название файла
                        base64_encode(file_get_contents($tmpName)) // контент файла, закодированный в base64 
                    ]
                ];
            }
        }
    }

    // Обрабатываем поле FILE с одним файлом
    if(!empty($_FILES['FILE']['tmp_name'])) {
        $arSingleFile = [
            'fileData' => [
                $_FILES['FILE']['name'], // название файла
                base64_encode(file_get_contents($_FILES['FILE']['tmp_name'])) // контент файла, закодированный в base64 
            ]
        ];
    }
    ```
{% endlist %}

#### Форматируем телефон и почту

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

- Python

    ```python
    # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
    ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []
    ```


- PHP

    ```php
    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();
    ```
{% endlist %}

#### Формируем заголовок лида

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

- Python

    ```python
    # Формируем заголовок лида из имени и фамилии
    s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()
    # Если есть название компании — добавляем его через тире после имени и фамилии
    if s_company_title:
        s_title += " — " + s_company_title
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
{% endlist %}

### Создаем лид

Для создания лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

- `TITLE` — заголовок лида из переменной `$sTitle`

- `NAME` — имя из поля формы `NAME`

- `LAST_NAME` — фамилия из поля формы `LAST_NAME`

- `COMPANY_TITLE` — название компании из поля формы `COMPANY_TITLE`

- `PHONE` — телефон в формате `crm_multifield` из переменной `$arPhone`

- `EMAIL` — почта в формате `crm_multifield` из переменной `$arEmail`

- `UF_CRM_LEAD_FILES` — пользовательское поле для нескольких файлов, массив объектов `fileData` из переменной `$arFiles`

- `UF_CRM_LEAD_FILE` — пользовательское поле для одного файла, объект `fileData` из переменной `$arSingleFile`

Битрикс24 присваивает пользовательским полям имена вида `UF_CRM_1711610801`, поэтому вместо `UF_CRM_LEAD_FILES` и `UF_CRM_LEAD_FILE` подставьте свои. Посмотреть их можно методом [crm.lead.userfield.list](../../../api-reference/crm/leads/userfield/crm-lead-userfield-list.md).

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

{% list tabs %}

- JS

    ```javascript
    await $b24.actions.v2.call.make({
        method: 'crm.lead.add',
        params: {
            fields: {
                TITLE: sTitle, // Заголовок лида
                NAME: sName, // Имя
                LAST_NAME: sLastName, // Фамилия
                COMPANY_TITLE: sCompanyTitle, // Название компании
                PHONE: arPhone, // Телефон
                EMAIL: arEmail, // Email
                UF_CRM_LEAD_FILES: arFiles, // Поле для добавления нескольких файлов
                UF_CRM_LEAD_FILE: arSingleFile, // Поле для файла
            }
        },
        requestId: 'lead-add'
    })
    ```

- Python

    ```python
    client.crm.lead.add(fields={
        "TITLE": s_title,  # Заголовок лида
        "NAME": s_name,  # Имя
        "LAST_NAME": s_last_name,  # Фамилия
        "COMPANY_TITLE": s_company_title,  # Название компании
        "PHONE": ar_phone,  # Телефон
        "EMAIL": ar_email,  # Email
        "UF_CRM_LEAD_FILES": ar_files,  # Поле для добавления нескольких файлов
        "UF_CRM_LEAD_FILE": ar_single_file,  # Поле для файла
    })
    ```


- PHP

    ```php
    $sb->getCRMScope()->lead()->add([
        'TITLE' => $sTitle, // Заголовок лида
        'NAME' => $sName, // Имя
        'LAST_NAME' => $sLastName, // Фамилия
        'COMPANY_TITLE' => $sCompanyTitle, // Название компании
        'PHONE' => $arPhone, // Телефон
        'EMAIL' => $arEmail, // Email
        'UF_CRM_LEAD_FILES' => $arFiles, // Поле для добавления нескольких файлов
        'UF_CRM_LEAD_FILE' => $arSingleFile, // Поле для файла
    ]);
    ```
{% endlist %}

Если лид создан успешно, метод вернет его идентификатор. Сохраните это значение: по нему можно открыть лид и проверить результат.

```json
{
    "result": 5
}
```

### Полный пример кода обработчика

{% list tabs %}

- JS

    ```javascript
    import express from 'express'
    import multer from 'multer'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const app = express()
    // multer хранит файлы в памяти — доступны как Buffer в req.files
    const upload = multer({ storage: multer.memoryStorage() })

    // Обработчик принимает данные формы (multipart) по маршруту /form
    app.post('/form', upload.fields([{ name: 'FILE' }, { name: 'FILES' }]), async (req, res) => {
        // Получаем и очищаем данные из формы
        const sName = String(req.body.NAME ?? '')
        const sLastName = String(req.body.LAST_NAME ?? '')
        const sCompanyTitle = String(req.body.COMPANY_TITLE ?? '')
        const sPhone = String(req.body.PHONE ?? '')
        const sEmail = String(req.body.EMAIL ?? '')

        // Создаем переменные для массивов с файлами
        const arFiles = []
        let arSingleFile = []

        // Обрабатываем поле FILES с несколькими файлами
        for (const file of req.files?.FILES ?? []) {
            arFiles.push({
                fileData: [
                    file.originalname, // название файла
                    file.buffer.toString('base64'), // контент файла, закодированный в base64
                ]
            })
        }

        // Обрабатываем поле FILE с одним файлом
        const single = req.files?.FILE?.[0]
        if (single) {
            arSingleFile = {
                fileData: [
                    single.originalname, // название файла
                    single.buffer.toString('base64'), // контент файла, закодированный в base64
                ]
            }
        }

        // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
        const arEmail = sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : []

        // Формируем заголовок лида из имени и фамилии
        let sTitle = 'С сайта: ' + `${sName} ${sLastName}`.trim()
        if (sCompanyTitle) {
            sTitle += ' — ' + sCompanyTitle
        }

        // Отправляем данные в Битрикс24
        const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.add',
            params: {
                fields: {
                    TITLE: sTitle, // Заголовок лида
                    NAME: sName, // Имя
                    LAST_NAME: sLastName, // Фамилия
                    COMPANY_TITLE: sCompanyTitle, // Название компании
                    PHONE: arPhone, // Телефон
                    EMAIL: arEmail, // Email
                    UF_CRM_LEAD_FILES: arFiles, // Поле для добавления нескольких файлов
                    UF_CRM_LEAD_FILE: arSingleFile, // Поле для файла
                }
            },
            requestId: 'lead-add'
        })

        // Проверяем результат и выводим сообщение
        if (response.isSuccess && response.getData()?.result) {
            res.json({ message: 'Лид добавлен успешно' })
        } else {
            res.json({ message: 'Лид не добавлен: ' + response.getErrorMessages().join('; ') })
        }
    })

    app.listen(3000)
    ```

- Python

    ```python
    # pip install b24pysdk flask
    import base64
    import os
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token=os.environ["B24_HOOK_TOKEN"],
    ))
    # B24_HOOK_TOKEN = 'USER_ID/TOKEN' — только user_id и токен, без https://


    @app.route("/form", methods=["POST"])
    def handle_form():
        # Получаем данные из формы
        s_name = request.form.get("NAME", "")
        s_last_name = request.form.get("LAST_NAME", "")
        s_company_title = request.form.get("COMPANY_TITLE", "")
        s_phone = request.form.get("PHONE", "")
        s_email = request.form.get("EMAIL", "")

        # Создаем переменные для массивов с файлами
        ar_files = []
        ar_single_file = []

        # Обрабатываем поле FILES с несколькими файлами
        for file in request.files.getlist("FILES"):
            if file and file.filename:
                ar_files.append({
                    "fileData": [
                        file.filename,  # название файла
                        base64.b64encode(file.read()).decode(),  # контент файла, закодированный в base64
                    ]
                })

        # Обрабатываем поле FILE с одним файлом
        single = request.files.get("FILE")
        if single and single.filename:
            ar_single_file = {
                "fileData": [
                    single.filename,  # название файла
                    base64.b64encode(single.read()).decode(),  # контент файла, закодированный в base64
                ]
            }

        # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
        ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []

        # Формируем заголовок лида из имени и фамилии
        s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()
        if s_company_title:
            s_title += " — " + s_company_title

        # Отправляем данные в Битрикс24
        try:
            client.crm.lead.add(fields={
                "TITLE": s_title,  # Заголовок лида
                "NAME": s_name,  # Имя
                "LAST_NAME": s_last_name,  # Фамилия
                "COMPANY_TITLE": s_company_title,  # Название компании
                "PHONE": ar_phone,  # Телефон
                "EMAIL": ar_email,  # Email
                "UF_CRM_LEAD_FILES": ar_files,  # Поле для добавления нескольких файлов
                "UF_CRM_LEAD_FILE": ar_single_file,  # Поле для файла
            })
            return jsonify({"message": "Лид добавлен успешно"})
        except Exception as e:
            return jsonify({"message": f"Лид не добавлен: {e}"})
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook(getenv('B24_HOOK'));
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Получаем и очищаем данные из формы
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    // Создаем переменные для массивов с файлами
    $arFiles = [];
    $arSingleFile = [];

    // Обрабатываем поле FILES с несколькими файлами
    if (!empty($_FILES['FILES']['tmp_name'])) {
        foreach ($_FILES['FILES']['tmp_name'] as $key => $tmpName) {
            if (!empty($tmpName)) {
                $arFiles[] = [
                    'fileData' => [
                        $_FILES['FILES']['name'][$key], // название файла
                        base64_encode(file_get_contents($tmpName)) // контент файла, закодированный в base64
                    ]
                ];
            }
        }
    }

    // Обрабатываем поле FILE с одним файлом
    if (!empty($_FILES['FILE']['tmp_name'])) {
        $arSingleFile = [
            'fileData' => [
                $_FILES['FILE']['name'], // название файла
                base64_encode(file_get_contents($_FILES['FILE']['tmp_name'])) // контент файла, закодированный в base64
            ]
        ];
    }

    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    // Формируем заголовок лида из имени и фамилии
    $sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
    if (!empty($sCompanyTitle)) {
        $sTitle .= ' — ' . $sCompanyTitle;
    }

    // Отправляем данные в Битрикс24
    try {
        $sb->getCRMScope()->lead()->add([
            'TITLE' => $sTitle, // Заголовок лида
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'COMPANY_TITLE' => $sCompanyTitle, // Название компании
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
            'UF_CRM_LEAD_FILES' => $arFiles, // Поле для добавления нескольких файлов
            'UF_CRM_LEAD_FILE' => $arSingleFile, // Поле для файла
        ]);

        echo json_encode(['message' => 'Лид добавлен успешно']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Лид не добавлен: ' . $e->getMessage()]);
    }
    ```
{% endlist %}

## Проверим результат

Откройте созданный лид в Битрикс24. В карточке лида пользовательские поля для файлов показывают вложения ссылками — файлы можно скачать.

Через REST лид проверяет метод [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md) с идентификатором из ответа предыдущего шага.

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'crm.lead.get',
        params: { id: 5 },
        requestId: 'lead-get'
    })

    console.dir(checkResponse.getData().result)
    ```

- Python

    ```python
    lead = client.crm.lead.get(bitrix_id=5).result
    ```


- PHP

    ```php
    $lead = $sb->getCRMScope()->lead()->get(5)->lead();
    ```
{% endlist %}

Сценарий выполнен, если в ответе:

- `TITLE` начинается с `С сайта:` — лид пришел из формы

- `PHONE` и `EMAIL` совпадают с тем, что отправила форма

- поля `UF_CRM_LEAD_FILE` и `UF_CRM_LEAD_FILES` заполнены. Метод возвращает в них не саму строку Base64, а данные загруженного файла: `id`, `showUrl` и `downloadUrl`. В одиночном поле это один объект, во множественном — массив объектов

```json
{
    "result": {
        "ID": "5",
        "TITLE": "С сайта: Иван Иванов",
        "UF_CRM_LEAD_FILE": {
            "id": 37375,
            "showUrl": "/bitrix/components/bitrix/crm.lead.show/show_file.php?ownerId=5&fieldName=UF_CRM_LEAD_FILE&dynamic=Y&fileId=37375",
            "downloadUrl": "/bitrix/components/bitrix/crm.lead.show/show_file.php?auth=&ownerId=5&fieldName=UF_CRM_LEAD_FILE&dynamic=Y&fileId=37375"
        },
        "UF_CRM_LEAD_FILES": [
            {
                "id": 37377,
                "showUrl": "/bitrix/components/bitrix/crm.lead.show/show_file.php?ownerId=5&fieldName=UF_CRM_LEAD_FILES&dynamic=Y&fileId=37377",
                "downloadUrl": "/bitrix/components/bitrix/crm.lead.show/show_file.php?auth=&ownerId=5&fieldName=UF_CRM_LEAD_FILES&dynamic=Y&fileId=37377"
            }
        ]
    }
}
```

Если клиент не приложил файлы, множественное поле вернется пустым массивом, а одиночное вообще не попадет в ответ. Это тоже верный результат.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| Пустое значение `Access denied` | У пользователя нет прав на создание лидов. Проверьте, от имени какого пользователя создан вебхук ||
|#

Лид может создаться без ошибки, но без файлов. Метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) не сообщает о проблемах с файлами: он пропускает и незнакомое имя поля, и значение в неподходящем формате. Проверьте по порядку:

- имя пользовательского поля в коде не совпадает с именем в Битрикс24. Незнакомое поле метод игнорирует, лид создастся без ошибки

- в форме нет атрибута `enctype="multipart/form-data"`. Тогда браузер отправит только имена файлов, и обработчик не получит содержимое

- в обработчике на JS не подключен `multer` или в нем не перечислены поля `FILE` и `FILES`. Без него `req.files` останется пустым

- в одиночное поле передан массив объектов `fileData`. Такое значение метод не сохранит вовсе — в одиночное поле нужно передавать один объект

- запрос превысил ограничение по размеру. Строка Base64 примерно на треть длиннее исходного файла — сверяйтесь с размером строки, а не файла. Подробнее читайте в статье [Как загрузить файл](../../../api-reference/files/how-to-upload-files.md)

Получение списка полей и получение лида ничего не создают, их можно выполнять сколько угодно раз. Если ошибку вернул [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md), лид не создан: исправьте `fields` и повторите только этот вызов.

## Что важно учитывать

- поле для нескольких файлов должно быть создано с признаком «множественное». Обратная подстановка безопасна: один объект `fileData` во множественном поле сохранится как массив из одного файла

- повторная отправка формы с теми же данными каждый раз создает новый лид. Дубликаты не отсеиваются. Чтобы связывать повторные обращения, используйте сценарий [{#T}](./how-to-add-repeat-lead.md)

- файлы попадают в запрос целиком, поэтому большие вложения увеличивают время ответа обработчика. Если файлов много, передавайте их отдельными запросами

## Продолжите изучение

- [{#T}](../../../api-reference/crm/leads/crm-lead-add.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-get.md)
- [{#T}](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md)
- [{#T}](../../../api-reference/files/index.md)
- [{#T}](../../../api-reference/files/how-to-upload-files.md)
- [{#T}](../../../api-reference/crm/data-types.md)
