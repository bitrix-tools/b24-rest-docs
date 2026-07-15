# Добавить контакт через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания контактов в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных клиентов. Когда клиент заполнит форму, его данные попадут в CRM и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст контакт методом [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

## 1. Создаем веб-форму

Создадим на странице сайта веб-форму с четырьмя полями:

-  `NAME` — имя контакта, обязательное,

-  `LAST_NAME` — фамилия,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

При отправке форма передает данные в обработчик.

{% list tabs %}

- JS

    ```html
    <form id="form_to_crm">
        <!-- Имя, обязательное поле -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
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
        <!-- Имя, обязательное поле -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
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
        <!-- Имя, обязательное поле -->
        <input type="text" name="NAME" placeholder="Имя" required>
        <!-- Фамилия -->
        <input type="text" name="LAST_NAME" placeholder="Фамилия">
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

Чтобы обработать значения из полей формы и добавить контакт в CRM, создадим обработчик.

Для добавления компании используем метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передаем поля:

-  `NAME` — имя контакта,

-  `LAST_NAME` — фамилия,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

Значения полей получаем из формы. Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

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
        // Получаем и очищаем данные из формы
        const sName = String(req.body.NAME ?? '')
        const sLastName = String(req.body.LAST_NAME ?? '')
        const sPhone = String(req.body.PHONE ?? '')
        const sEmail = String(req.body.EMAIL ?? '')

        // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        const arPhone = sPhone ? [{ VALUE: sPhone, VALUE_TYPE: 'WORK' }] : []
        const arEmail = sEmail ? [{ VALUE: sEmail, VALUE_TYPE: 'HOME' }] : []

        // Отправляем данные в Битрикс24
        const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.add',
            params: {
                fields: {
                    NAME: sName, // Имя
                    LAST_NAME: sLastName, // Фамилия
                    PHONE: arPhone, // Телефон
                    EMAIL: arEmail, // Email
                }
            },
            requestId: 'contact-add'
        })

        // Проверяем результат и выводим сообщение
        if (response.isSuccess && response.getData()?.result) {
            res.json({ message: 'Contact add' })
        } else {
            res.json({ message: 'Contact not added: ' + response.getErrorMessages().join('; ') })
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
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    // Форматируем телефон и почту для Битрикс24 в формат crm_multifield
    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    // Отправляем данные в Битрикс24
    try {
        $contactId = $sb->getCRMScope()->contact()->add([
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
        ])->getId();

        echo json_encode(['message' => 'Contact add']);
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Contact not added: ' . $e->getMessage()]);
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
        s_name = request.form.get("NAME", "")
        s_last_name = request.form.get("LAST_NAME", "")
        s_phone = request.form.get("PHONE", "")
        s_email = request.form.get("EMAIL", "")

        # Форматируем телефон и почту для Битрикс24 в формат crm_multifield
        ar_phone = [{"VALUE": s_phone, "VALUE_TYPE": "WORK"}] if s_phone else []
        ar_email = [{"VALUE": s_email, "VALUE_TYPE": "HOME"}] if s_email else []

        # Отправляем данные в Битрикс24
        try:
            client.crm.contact.add(fields={
                "NAME": s_name,  # Имя
                "LAST_NAME": s_last_name,  # Фамилия
                "PHONE": ar_phone,  # Телефон
                "EMAIL": ar_email,  # Email
            })
            return jsonify({"message": "Contact add"})
        except Exception as e:
            return jsonify({"message": f"Contact not added: {e}"})
    ```

{% endlist %}
