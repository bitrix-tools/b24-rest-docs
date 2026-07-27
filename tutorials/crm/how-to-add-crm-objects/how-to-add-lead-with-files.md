# Добавить лид с файлами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания лидов в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму и приложит файлы, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add).

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с полями:

-  `NAME` — имя, обязательное,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

Чтобы клиент мог загрузить файлы, добавим в форму поля:

-  `FILE` — для одного файла,

-  `FILES` — для добавления нескольких файлов.

При отправке форма передает данные в обработчик.

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
            // FormData сам соберёт текстовые поля и файлы (multipart/form-data)
            const formData = new FormData(el.currentTarget);
            // Content-Type не указываем — браузер выставит multipart с boundary
            const response = await fetch('/form', { method: 'POST', body: formData });
            const data = await response.json();
            alert(data.message);
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

{% endlist %}

## 2. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить лид в CRM, создадим обработчик.

### Подготавливаем данные из формы

Чтобы использовать данные из формы в методе создания лида, нужно их подготовить.

#### Очищаем от HTML-тегов

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

#### Подготавливаем файлы

Подготавливаем файлы для загрузки в Битрикс24. Для каждого файла нужно передать массив:

-  с именем файла,

-  строкой с кодировкой файла в Base64.

Чтобы закодировать файл, используем функцию [base64_encode](https://www.php.net/manual/en/function.base64-encode.php).

{% note tip "Документация" %}

-  [Как работать с файлами](../../../api-reference/files/index.md)

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

{% endlist %}

#### Форматируем телефон и почту

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

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

### Создаем лид

Для создания лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

-  `TITLE` — заголовок лида,

-  `NAME` — имя лида,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта,

-  `UF_CRM_LEAD_FILES` — пользовательское поле для добавления нескольких файлов,

-  `UF_CRM_LEAD_FILE` — пользовательское поле для файла.

Пользовательские поля `UF_CRM_*` нужно создать в Битрикс24 до создания лида. Добавьте их на портале вручную или методом [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md). В примере подставьте свои названия полей вместо `UF_CRM_LEAD_FILES` и `UF_CRM_LEAD_FILE`.

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

{% endlist %}

В результате получим идентификатор нового лида `5`.

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
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

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

- Python

    ```python
    # pip install b24pysdk
    import base64
    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client

    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain="your-domain.bitrix24.ru",
        webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
    ))


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

{% endlist %}
