# Добавить компанию через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания компаний в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст компанию методом [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

## 1. Создаем веб-форму

Создадим на странице сайта веб-форму с тремя полями:

-  `TITLE` — название компании, обязательное,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

При отправке форма передает данные в обработчик.

{% list tabs %}

- JS

    ```html
    <form id="form_to_crm">
        <!-- Название компании (обязательное поле) -->
        <input type="text" name="TITLE" placeholder="Название компании" required>
        <!-- Электронная почта -->
        <input type="text" name="EMAIL" placeholder="Почта">
        <!-- Телефон -->
        <input type="text" name="PHONE" placeholder="Телефон">
        <!-- Кнопка отправки -->
        <input type="submit" value="Отправить">
    </form>

    <script>
        document.getElementById('form_to_crm').addEventListener('submit', async (el) => {
            el.preventDefault(); // Отменяем стандартную отправку
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
        <!-- Название компании (обязательное поле) -->
        <input type="text" name="TITLE" placeholder="Название компании" required>
        <!-- Электронная почта -->
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
            // Отправка формы без перезагрузки страницы
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault(); // Отменяем стандартную отправку
                // Получаем данные формы
                var formData = $(this).serialize();
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
        <!-- Название компании (обязательное поле) -->
        <input type="text" name="TITLE" placeholder="Название компании" required>
        <!-- Электронная почта -->
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
            // Отправка формы без перезагрузки страницы
            $('#form_to_crm').on('submit', function(el) {
                el.preventDefault(); // Отменяем стандартную отправку
                // Получаем данные формы
                var formData = $(this).serialize();
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

Чтобы обработать значения из полей формы и добавить компанию в CRM, создадим обработчик.

Для добавления компании используем метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В объекте `fields` передаем поля:

-  `TITLE` — название компании,

-  `COMPANY_TYPE` — тип компании. Указываем `CUSTOMER`, так как заполняют форму только клиенты компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

Значения полей `TITLE`, `PHONE`, `EMAIL` получаем из формы. Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

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
        // Получаем данные из формы
        const sTitle = String(req.body.TITLE ?? '')
        const sPhone = String(req.body.PHONE ?? '')
        const sEmail = String(req.body.EMAIL ?? '')

        // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
        const arEmail = sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : []

        // Отправляем данные в Битрикс24
        const response = await $b24.actions.v2.call.make({
            method: 'crm.company.add',
            params: {
                fields: {
                    TITLE: sTitle, // Название компании
                    COMPANY_TYPE: 'CUSTOMER', // Тип компании — клиент
                    PHONE: arPhone, // Телефон
                    EMAIL: arEmail, // Почта
                }
            },
            requestId: 'company-add'
        })

        // Возвращаем результат
        if (response.isSuccess && response.getData()?.result) {
            res.json({ message: 'Company added' })
        } else {
            res.json({ message: 'Company not added: ' + response.getErrorMessages().join('; ') })
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

    // Получаем данные из формы
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    // Отправляем данные в Битрикс24
    try {
        $companyId = $sb->getCRMScope()->company()->add([
            "TITLE" => $sTitle, // Название компании
            "COMPANY_TYPE" => 'CUSTOMER', // Тип компании — клиент
            "PHONE" => $arPhone, // Телефон
            "EMAIL" => $arEmail, // Почта
        ])->getId();

        echo json_encode(['message' => 'Company added']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Company not added: ' . $e->getMessage()]);
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
        # Получаем данные из формы
        s_title = request.form.get("TITLE", "")
        s_phone = request.form.get("PHONE", "")
        s_email = request.form.get("EMAIL", "")

        # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
        ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []

        # Отправляем данные в Битрикс24
        try:
            client.crm.company.add(fields={
                "TITLE": s_title,  # Название компании
                "COMPANY_TYPE": "CUSTOMER",  # Тип компании — клиент
                "PHONE": ar_phone,  # Телефон
                "EMAIL": ar_email,  # Почта
            })
            return jsonify({"message": "Company added"})
        except Exception as e:
            return jsonify({"message": f"Company not added: {e}"})
    ```

{% endlist %}
