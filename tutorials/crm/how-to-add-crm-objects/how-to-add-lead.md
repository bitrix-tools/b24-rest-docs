# Добавить лид через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны оба права — на добавление лидов и на чтение лидов
>
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом на добавление лидов
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом на чтение лидов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму, обработчик на вашем сервере создаст лид в CRM и вернет его идентификатор. В результате у вас будет два файла — страница с формой и обработчик на выбранном стеке — и отдельный скрипт для проверки результата.

Сценарий состоит из двух шагов.

1. Разместить форму на HTML-странице. Форма отправит данные в обработчик

2. Создать обработчик. Он проверит данные и создаст лид универсальным методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)

После этого проверим результат методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) по идентификатору из ответа второго шага: этот вызов только подтверждает создание и данные в CRM не меняет.

## Подготовим данные

Для выполнения примера нужны:

- [входящий вебхук](../../../local-integrations/local-webhooks.md) со scope `crm`. Обработчик работает на сервере: страница с формой вебхук не использует

- права у пользователя, от имени которого создан вебхук: на добавление лидов — для шага 2, на чтение лидов — для шага проверки

- классический режим CRM. В простом режиме лидов в CRM нет: при создании лида с заполненным именем система автоматически конвертирует его в сделку, а поле `STATUS_ID` принимает значение `CONVERTED`. Текущий режим возвращает метод [crm.settings.mode.get](../../../api-reference/crm/crm-settings-mode-get.md), а сценарий для обоих режимов разобран в туториале [Добавить дело в новый лид или сделку в зависимости от режима CRM](./how-to-add-objects-with-crm-mode.md)

- страница с формой и обработчик на одном домене и порте. В примере `handlerUrl` — относительный путь, поэтому запрос уходит на тот адрес, с которого открыта страница. Если открыть `form.html` с другого адреса или из файловой системы, обработчик данные не получит

- переменные окружения с данными вебхука. Задайте их в окружении процесса перед запуском, в код не вписывайте:

   - `B24_HOOK` — полный URL вебхука, для JS и PHP

   - `B24_DOMAIN` и `B24_WEBHOOK_TOKEN` — домен и `USER_ID/TOKEN` без `https://`, для Python

   Например, при локальном запуске:

   - Node.js — `B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' node handler.mjs`

   - PHP — `B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' php -S localhost:3000 -t public`

   - Python — `B24_DOMAIN='your-domain.bitrix24.ru' B24_WEBHOOK_TOKEN='1/TOKEN' python handler.py`

Если в вашем Битрикс24 для лидов настроены обязательные поля, их тоже нужно передать в `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — иначе метод вернет ошибку. Список полей с признаком `isRequired` вернет метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) с `entityTypeId` со значением `1`.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее. Для новых проектов берите 22 или новее: поддержка Node.js 18 и 20 сообществом завершена. [B24JsSDK](../../../sdk/b24jssdk/index.md) — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с [b24pysdk](../../../sdk/b24pysdk/index.md) нужен Python 3.9 или новее.

Для примеров с `bitrix24/b24phpsdk:"^3.3"` нужен PHP 8.4 или новее с расширениями `curl`, `intl` и `json`, а для проверки длины значений в примере — `mbstring`. Требования SDK и рекомендованную раскладку файлов смотрите на странице [B24PhpSDK](../../../sdk/b24phpsdk/index.md).

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с пятью полями:

- `NAME` — имя, обязательное поле формы

- `LAST_NAME` — фамилия

- `COMPANY_TITLE` — название компании

- `EMAIL` — электронная почта

- `PHONE` — телефон

Сохраните страницу в файл `form.html`. Где он должен лежать, зависит от обработчика:

- Node.js — в подпапке `public` того каталога, где лежит файл обработчика. Запускайте `node` из этого каталога: `express.static` ищет папку `public` относительно рабочего каталога процесса. Страница откроется по адресу `http://localhost:3000/form.html`

- Flask — в папке `static`. Страница откроется по адресу `http://localhost:3000/static/form.html`

- PHP — в публичном каталоге веб-сервера вместе с `form.php`. Каталог `vendor` держите выше публичного, чтобы он не был доступен из браузера. При локальном запуске `php -S localhost:3000 -t public` страница откроется по адресу `http://localhost:3000/form.html`

Адреса заработают после запуска из шага 2: в Node.js и Flask страницу отдает то же приложение, что принимает данные формы, в PHP — веб-сервер, на котором лежит `form.php`.

Форма отправляет данные в обработчик методом `POST` в формате `application/x-www-form-urlencoded`. Один и тот же код работает со всеми тремя вариантами обработчика: меняется только адрес в переменной `handlerUrl`.

```html
<form id="form_to_crm">
    <input type="text" name="NAME" placeholder="Имя" required>
    <input type="text" name="LAST_NAME" placeholder="Фамилия">
    <input type="text" name="COMPANY_TITLE" placeholder="Название компании">
    <input type="text" name="EMAIL" placeholder="Почта">
    <input type="text" name="PHONE" placeholder="Телефон">
    <input type="submit" value="Отправить">
</form>

<script>
    // Адрес обработчика: '/form' — для Node.js и Flask, 'form.php' — для PHP
    const handlerUrl = '/form';

    document.getElementById('form_to_crm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Отменяем стандартную отправку формы
        // Собираем поля формы в тело запроса
        const body = new URLSearchParams(new FormData(event.currentTarget));

        const response = await fetch(handlerUrl, { method: 'POST', body });
        // Обработчик отвечает JSON. Если пришло что-то другое, показываем общее сообщение
        const data = await response.json().catch(() => ({ message: 'Сервер вернул неожиданный ответ' }));

        // Показываем результат: идентификатор понадобится для проверки через REST
        alert(data.id ? data.message + '. ID: ' + data.id : data.message);
    });
</script>
```

Атрибут `required` проверяет обязательное поле только в браузере. Запрос можно отправить в обход формы, поэтому обработчик проверяет данные повторно.

## 2. Создаем обработчик формы

Обработчик принимает данные формы, проверяет их и добавляет лид методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В параметре `entityTypeId` передаем `1` — тип объекта «Лид», значения для остальных типов приведены в [справочнике типов объектов CRM](../../../api-reference/crm/data-types.md#object_type). В объекте `fields` передаем поля:

- `title` — название лида. Составляем его из имени, фамилии и названия компании

- `name` — имя

- `lastName` — фамилия

- `companyTitle` — название компании

- `fm` — массив мультиполей, в нем передаем телефон и электронную почту

Универсальные методы `crm.item.*` используют имена полей в camelCase. Они отличаются от имен в методах отдельных объектов: `title` вместо `TITLE`, `lastName` вместо `LAST_NAME`, а телефон и почта передаются одним массивом `fm` вместо отдельных полей `PHONE` и `EMAIL`.

Значения полей получаем из формы. Ниже разобрано каждое действие обработчика, полный код приведен в конце раздела.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

### Принимаем запрос и подключаем SDK

Обработчик принимает POST-запрос по адресу, который указан в переменной `handlerUrl` на странице с формой. С Битрикс24 работаем через входящий вебхук.

{% list tabs %}

- JS

    ```javascript
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const app = express()
    // Форма отправляет данные в формате application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))
    // Отдаем страницу с формой из папки public
    app.use(express.static('public'))

    // Шаблон для проверки адреса электронной почты
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    // Ограничение длины значений: форма публичная
    const maxLength = 100

    // Обработчик принимает данные формы по маршруту /form
    app.post('/form', async (req, res) => {
        // Тело обработчика — в следующих шагах
    })

    // Запуск: node handler.mjs
    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.3"
    // form.php и form.html лежат в публичном каталоге, vendor — выше него
    // Локальный запуск: php -S localhost:3000 -t public
    require_once __DIR__ . '/../vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    header('Content-Type: application/json; charset=utf-8');

    // Ограничение длины значений: форма публичная
    const MAX_LENGTH = 100;

    // Обработчик принимает только POST-запросы
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['message' => 'Метод не поддерживается']);
        exit;
    }

    $sb = ServiceBuilderFactory::createServiceBuilderFromWebhook(getenv('B24_HOOK'));
    ```

- Python

    ```python
    # pip install flask b24pysdk
    import os
    import re

    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # Страницу form.html кладем в папку static
    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],  # your-domain.bitrix24.ru
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],  # только user_id/token, без https://
    ))

    # Шаблон для проверки адреса электронной почты
    EMAIL_PATTERN = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")
    # Ограничение длины значений: форма публичная
    MAX_LENGTH = 100


    @app.route("/form", methods=["POST"])
    def handle_form():
        ...  # Тело обработчика — в следующих шагах


    # Запуск: python handler.py
    if __name__ == "__main__":
        app.run(port=3000)
    ```

- Go

    ```go
    // Путь вебхука — это секрет: он приходит из окружения, а не из кода, и на
    // публичную страницу с формой не попадает никогда. Клиент строится ОДИН раз
    // на портал и переиспользуется всеми запросами — он держит HTTP-клиент и
    // состояние авторизации, а http.Server зовёт обработчик из многих горутин.
    core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    mux := http.NewServeMux()
    // Страницу с формой отдаём отсюда же: тогда запрос формы уходит на тот
    // адрес, с которого она открыта, и настраивать статику не требуется.
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    	w.Header().Set("Content-Type", "text/html; charset=utf-8")
    	fmt.Fprint(w, formPage)
    })
    mux.HandleFunc("/form", func(w http.ResponseWriter, r *http.Request) {
    	if r.Method != http.MethodPost {
    		reply(w, http.StatusMethodNotAllowed, "Нужен POST", 0)
    		return
    	}
    	handleForm(w, r, core)
    })

    log.Println("форма и обработчик: http://localhost:3000/")
    if err := http.ListenAndServe(":3000", mux); err != nil {
    	log.Fatal(err)
    }
    ```

{% endlist %}

### Проверяем данные из формы

Данные приходят от анонимного посетителя, поэтому до вызова метода обработчик проверяет их:

- обращается к полям со значением по умолчанию: нужного ключа может не быть в запросе

- убирает пробелы по краям и не создает лид, если не заполнено имя

- проверяет формат электронной почты, чтобы не сохранить в CRM заведомо неверный адрес

- отклоняет слишком длинные значения: в публичную форму может прийти что угодно

В REST значения передаем в исходном виде. Не применяйте к ним `htmlspecialchars` и другие функции HTML-экранирования: они нужны при выводе данных на страницу, а в CRM из-за них вместо `Иванов & сын` попадет `Иванов &amp; сын`.

{% list tabs %}

- JS

    ```javascript
    // Получаем данные из формы
    const sName = String(req.body.NAME ?? '').trim()
    const sLastName = String(req.body.LAST_NAME ?? '').trim()
    const sCompanyTitle = String(req.body.COMPANY_TITLE ?? '').trim()
    const sPhone = String(req.body.PHONE ?? '').trim()
    const sEmail = String(req.body.EMAIL ?? '').trim()

    // Проверяем данные до вызова метода
    if (!sName) {
        res.status(400).json({ message: 'Заполните имя' })
        return
    }

    if (sEmail && !emailPattern.test(sEmail)) {
        res.status(400).json({ message: 'Проверьте адрес электронной почты' })
        return
    }

    if ([sName, sLastName, sCompanyTitle, sPhone, sEmail].some(value => value.length > maxLength)) {
        res.status(400).json({ message: 'Одно из полей слишком длинное' })
        return
    }
    ```

- PHP

    ```php
    // Получаем данные из формы
    $sName = trim((string)($_POST['NAME'] ?? ''));
    $sLastName = trim((string)($_POST['LAST_NAME'] ?? ''));
    $sCompanyTitle = trim((string)($_POST['COMPANY_TITLE'] ?? ''));
    $sPhone = trim((string)($_POST['PHONE'] ?? ''));
    $sEmail = trim((string)($_POST['EMAIL'] ?? ''));

    // Проверяем данные до вызова метода
    if ($sName === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Заполните имя']);
        exit;
    }

    if ($sEmail !== '' && !preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/u', $sEmail)) {
        http_response_code(400);
        echo json_encode(['message' => 'Проверьте адрес электронной почты']);
        exit;
    }

    foreach ([$sName, $sLastName, $sCompanyTitle, $sPhone, $sEmail] as $value) {
        if (mb_strlen($value) > MAX_LENGTH) {
            http_response_code(400);
            echo json_encode(['message' => 'Одно из полей слишком длинное']);
            exit;
        }
    }
    ```

- Python

    ```python
    # Получаем данные из формы
    s_name = request.form.get("NAME", "").strip()
    s_last_name = request.form.get("LAST_NAME", "").strip()
    s_company_title = request.form.get("COMPANY_TITLE", "").strip()
    s_phone = request.form.get("PHONE", "").strip()
    s_email = request.form.get("EMAIL", "").strip()

    # Проверяем данные до вызова метода
    if not s_name:
        return jsonify({"message": "Заполните имя"}), 400

    if s_email and not EMAIL_PATTERN.fullmatch(s_email):
        return jsonify({"message": "Проверьте адрес электронной почты"}), 400

    if any(len(value) > MAX_LENGTH for value in (s_name, s_last_name, s_company_title, s_phone, s_email)):
        return jsonify({"message": "Одно из полей слишком длинное"}), 400
    ```

- Go

    ```go
    // Данные приходят от анонимного посетителя, поэтому до вызова метода
    // обработчик их проверяет.
    if err := r.ParseForm(); err != nil {
    	reply(w, http.StatusBadRequest, "Не удалось разобрать форму", 0)
    	return
    }
    // r.PostFormValue возвращает пустую строку, если ключа нет вовсе, — по
    // отсутствующему полю падать нечему.
    name := strings.TrimSpace(r.PostFormValue("NAME"))
    lastName := strings.TrimSpace(r.PostFormValue("LAST_NAME"))
    companyTitle := strings.TrimSpace(r.PostFormValue("COMPANY_TITLE"))
    phone := strings.TrimSpace(r.PostFormValue("PHONE"))
    email := strings.TrimSpace(r.PostFormValue("EMAIL"))

    if name == "" {
    	reply(w, http.StatusBadRequest, "Заполните имя", 0)
    	return
    }
    if email != "" && !emailPattern.MatchString(email) {
    	reply(w, http.StatusBadRequest, "Проверьте адрес электронной почты", 0)
    	return
    }
    for _, value := range []string{name, lastName, companyTitle, phone, email} {
    	// Длина считается в РУНАХ, а не в байтах: в UTF-8 кириллическая буква
    	// занимает два байта, и len() отклонил бы вдвое более короткое имя.
    	if len([]rune(value)) > maxLength {
    		reply(w, http.StatusBadRequest, "Одно из полей слишком длинное", 0)
    		return
    	}
    }
    // В REST значения уходят в исходном виде: html.EscapeString и подобное
    // нужно при выводе на страницу, а в CRM из-за него вместо «Иванов & сын»
    // попадёт «Иванов &amp; сын».
    ```

{% endlist %}

### Собираем телефон и почту в мультиполя

Телефон и электронную почту метод принимает в поле `fm` — это массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У каждого объекта три ключа:

- `typeId` — тип мультиполя: `PHONE` для телефона, `EMAIL` для почты

- `valueType` — тип значения, например `WORK` — рабочий, `HOME` — домашний

- `value` — значение из формы

Если посетитель не заполнил поле, объект в массив не добавляем. Если не заполнено ни одно значение, передаем пустой массив.

В справочнике [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield) ключи мультиполя приведены в верхнем регистре — `TYPE_ID`, `VALUE_TYPE`, `VALUE`. Это формат методов отдельных объектов, например `crm.lead.add`. Универсальные методы `crm.item.*` принимают и возвращают те же ключи в camelCase.

{% list tabs %}

- JS

    ```javascript
    // Собираем телефон и почту в мультиполя
    const arFm = []

    if (sPhone) {
        arFm.push({ typeId: 'PHONE', valueType: 'WORK', value: sPhone })
    }

    if (sEmail) {
        arFm.push({ typeId: 'EMAIL', valueType: 'HOME', value: sEmail })
    }
    ```

- PHP

    ```php
    // Собираем телефон и почту в мультиполя
    $arFm = [];

    if ($sPhone !== '') {
        $arFm[] = ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $sPhone];
    }

    if ($sEmail !== '') {
        $arFm[] = ['typeId' => 'EMAIL', 'valueType' => 'HOME', 'value' => $sEmail];
    }
    ```

- Python

    ```python
    # Собираем телефон и почту в мультиполя
    ar_fm = []

    if s_phone:
        ar_fm.append({"typeId": "PHONE", "valueType": "WORK", "value": s_phone})

    if s_email:
        ar_fm.append({"typeId": "EMAIL", "valueType": "HOME", "value": s_email})
    ```

- Go

    ```go
    // Телефон и почта едут в поле fm — массив объектов crm_multifield.
    // Универсальные методы crm.item.* принимают ключи в camelCase, тогда как
    // crm.lead.add ждал бы те же ключи в ВЕРХНЕМ регистре.
    fm := make([]b24.Params, 0, 2)
    if phone != "" {
    	fm = append(fm, b24.Params{"typeId": "PHONE", "valueType": "WORK", "value": phone})
    }
    if email != "" {
    	fm = append(fm, b24.Params{"typeId": "EMAIL", "valueType": "HOME", "value": email})
    }
    ```

{% endlist %}

### Формируем название лида

Название собираем из имени и фамилии. Если посетитель указал название компании, добавляем его через тире — так менеджер увидит в списке лидов, от кого пришла заявка.

{% list tabs %}

- JS

    ```javascript
    // Формируем название лида из имени и фамилии
    let sTitle = 'С сайта: ' + `${sName} ${sLastName}`.trim()

    // Если есть название компании — добавляем его через тире после имени и фамилии

    if (sCompanyTitle) {
        sTitle += ' — ' + sCompanyTitle
    }
    ```

- PHP

    ```php
    // Формируем название лида из имени и фамилии
    $sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);

    // Если есть название компании — добавляем его через тире после имени и фамилии

    if ($sCompanyTitle !== '') {
        $sTitle .= ' — ' . $sCompanyTitle;
    }
    ```

- Python

    ```python
    # Формируем название лида из имени и фамилии
    s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()

    # Если есть название компании — добавляем его через тире после имени и фамилии

    if s_company_title:
        s_title += " — " + s_company_title
    ```

- Go

    ```go
    // Название собираем из имени и фамилии, а название компании добавляем через
    // тире — так менеджер видит в списке лидов, от кого пришла заявка.
    title := "С сайта: " + strings.TrimSpace(name+" "+lastName)
    if companyTitle != "" {
    	title += " — " + companyTitle
    }
    ```

{% endlist %}

### Создаем лид

Подготовленные значения передаем в `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Обработчик возвращает странице идентификатор созданного лида в поле `id`. Текст ошибки пишем в лог сервера, а посетителю возвращаем общее сообщение: так технические подробности не попадут на публичную страницу.

{% list tabs %}

- JS

    ```javascript
    // Отправляем данные в Битрикс24
    try {
        const response = await $b24.actions.v2.call.make({
            method: 'crm.item.add',
            params: {
                entityTypeId: 1, // Тип объекта CRM — лид
                fields: {
                    title: sTitle, // Название лида
                    name: sName, // Имя
                    lastName: sLastName, // Фамилия
                    companyTitle: sCompanyTitle, // Название компании
                    fm: arFm, // Телефон и почта
                }
            },
            requestId: 'lead-add'
        })

        // Проверяем результат и выводим сообщение
        if (!response.isSuccess) {
            // Подробности ошибки пишем в лог, посетителю их не показываем
            console.error(response.getErrorMessages().join('; '))
            res.status(502).json({ message: 'Не удалось создать лид, попробуйте позже' })
            return
        }

        const leadId = response.getData().result.item.id // Идентификатор созданного лида
        console.info('Создан лид с ID ' + leadId)
        res.json({ message: 'Лид создан', id: leadId })
    } catch (error) {
        // Сетевые ошибки и сбои SDK приходят исключением
        console.error(error)
        res.status(502).json({ message: 'Не удалось создать лид, попробуйте позже' })
    }
    ```

- PHP

    ```php
    // Отправляем данные в Битрикс24
    try {
        $result = $sb->getCRMScope()->item()->add(1, [ // 1 — тип объекта CRM «Лид»
            'title' => $sTitle, // Название лида
            'name' => $sName, // Имя
            'lastName' => $sLastName, // Фамилия
            'companyTitle' => $sCompanyTitle, // Название компании
            'fm' => $arFm, // Телефон и почта
        ]);

        $leadId = $result->item()->id; // Идентификатор созданного лида
        error_log('Создан лид с ID ' . $leadId);
        echo json_encode(['message' => 'Лид создан', 'id' => $leadId]);
    } catch (\Throwable $e) {
        // Подробности ошибки пишем в лог, посетителю их не показываем
        error_log($e->getMessage());
        http_response_code(502);
        echo json_encode(['message' => 'Не удалось создать лид, попробуйте позже']);
    }
    ```

- Python

    ```python
    # Отправляем данные в Битрикс24
    try:
        bitrix_response = client.crm.item.add(
            entity_type_id=1,  # Тип объекта CRM — лид
            fields={
                "title": s_title,  # Название лида
                "name": s_name,  # Имя
                "lastName": s_last_name,  # Фамилия
                "companyTitle": s_company_title,  # Название компании
                "fm": ar_fm,  # Телефон и почта
            },
        ).response
        lead_id = bitrix_response.result["item"]["id"]  # Идентификатор созданного лида
        app.logger.info("Создан лид с ID %s", lead_id)
        return jsonify({"message": "Лид создан", "id": lead_id})
    except (BitrixAPIError, BitrixSDKException) as error:
        # Подробности ошибки пишем в лог, посетителю их не показываем
        app.logger.error(error)
        return jsonify({"message": "Не удалось создать лид, попробуйте позже"}), 502
    ```

- Go

    ```go
    res, err := core.Call(r.Context(), "crm.item.add", b24.Params{
    	"entityTypeId": entityTypeLead,
    	"fields": b24.Params{
    		"title":        title,
    		"name":         name,
    		"lastName":     lastName,
    		"companyTitle": companyTitle,
    		"fm":           fm,
    	},
    }) // без WithIdempotent: повтор создал бы второй лид
    if err != nil {
    	// Подробности пишем в лог сервера, посетителю возвращаем общее
    	// сообщение: техническим деталям на публичной странице не место.
    	// Адрес вебхука в текст ошибки не попадёт — SDK вырезает его сам.
    	log.Println("crm.item.add:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    	return
    }

    // Метод заворачивает ответ в объект с ключом item.
    raw, ok := b24.Unwrap(res.Result, "item", "id")
    if !ok {
    	log.Println("нет item.id в ответе:", string(res.Result))
    	reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    	return
    }
    var leadID b24.ID
    if err := json.Unmarshal(raw, &leadID); err != nil {
    	log.Println("разбор идентификатора лида:", err)
    	reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    	return
    }

    log.Printf("создан лид %d", leadID)
    reply(w, http.StatusOK, "Лид создан", leadID)
    ```

{% endlist %}

Метод возвращает данные созданного лида в объекте `result.item`.

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 3465,
            "title": "С сайта: Иван Иванов — ООО Ромашка",
            "name": "Иван",
            "lastName": "Иванов",
            "companyTitle": "ООО Ромашка",
            "entityTypeId": 1
        }
    }
}
```

Обработчик возвращает странице `{ "message": "Лид создан", "id": 3465 }`. Идентификатор понадобится, чтобы открыть лид в интерфейсе или запросить его данные через REST.

### Полный пример кода обработчика

{% list tabs %}

- JS

    ```javascript
    // npm install express @bitrix24/b24jssdk
    import express from 'express'
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)

    const app = express()
    // Форма отправляет данные в формате application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }))
    // Отдаем страницу с формой из папки public
    app.use(express.static('public'))

    // Шаблон для проверки адреса электронной почты
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    // Ограничение длины значений: форма публичная
    const maxLength = 100

    // Обработчик принимает данные формы по маршруту /form
    app.post('/form', async (req, res) => {
        // Получаем данные из формы
        const sName = String(req.body.NAME ?? '').trim()
        const sLastName = String(req.body.LAST_NAME ?? '').trim()
        const sCompanyTitle = String(req.body.COMPANY_TITLE ?? '').trim()
        const sPhone = String(req.body.PHONE ?? '').trim()
        const sEmail = String(req.body.EMAIL ?? '').trim()

        // Проверяем данные до вызова метода
        if (!sName) {
            res.status(400).json({ message: 'Заполните имя' })
            return
        }

        if (sEmail && !emailPattern.test(sEmail)) {
            res.status(400).json({ message: 'Проверьте адрес электронной почты' })
            return
        }

        if ([sName, sLastName, sCompanyTitle, sPhone, sEmail].some(value => value.length > maxLength)) {
            res.status(400).json({ message: 'Одно из полей слишком длинное' })
            return
        }

        // Собираем телефон и почту в мультиполя
        const arFm = []

        if (sPhone) {
            arFm.push({ typeId: 'PHONE', valueType: 'WORK', value: sPhone })
        }

        if (sEmail) {
            arFm.push({ typeId: 'EMAIL', valueType: 'HOME', value: sEmail })
        }

        // Формируем название лида из имени и фамилии
        let sTitle = 'С сайта: ' + `${sName} ${sLastName}`.trim()
        // Если есть название компании — добавляем его через тире после имени и фамилии
        if (sCompanyTitle) {
            sTitle += ' — ' + sCompanyTitle
        }

        // Отправляем данные в Битрикс24
        try {
            const response = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 1, // Тип объекта CRM — лид
                    fields: {
                        title: sTitle, // Название лида
                        name: sName, // Имя
                        lastName: sLastName, // Фамилия
                        companyTitle: sCompanyTitle, // Название компании
                        fm: arFm, // Телефон и почта
                    }
                },
                requestId: 'lead-add'
            })

            // Проверяем результат и выводим сообщение
            if (!response.isSuccess) {
                // Подробности ошибки пишем в лог, посетителю их не показываем
                console.error(response.getErrorMessages().join('; '))
                res.status(502).json({ message: 'Не удалось создать лид, попробуйте позже' })
                return
            }

            const leadId = response.getData().result.item.id // Идентификатор созданного лида
            console.info('Создан лид с ID ' + leadId)
            res.json({ message: 'Лид создан', id: leadId })
        } catch (error) {
            // Сетевые ошибки и сбои SDK приходят исключением
            console.error(error)
            res.status(502).json({ message: 'Не удалось создать лид, попробуйте позже' })
        }
    })

    // Запуск: node handler.mjs
    app.listen(3000)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.3"
    // form.php и form.html лежат в публичном каталоге, vendor — выше него
    // Локальный запуск: php -S localhost:3000 -t public
    require_once __DIR__ . '/../vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    header('Content-Type: application/json; charset=utf-8');

    // Ограничение длины значений: форма публичная
    const MAX_LENGTH = 100;

    // Обработчик принимает только POST-запросы
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['message' => 'Метод не поддерживается']);
        exit;
    }

    $sb = ServiceBuilderFactory::createServiceBuilderFromWebhook(getenv('B24_HOOK'));

    // Получаем данные из формы
    $sName = trim((string)($_POST['NAME'] ?? ''));
    $sLastName = trim((string)($_POST['LAST_NAME'] ?? ''));
    $sCompanyTitle = trim((string)($_POST['COMPANY_TITLE'] ?? ''));
    $sPhone = trim((string)($_POST['PHONE'] ?? ''));
    $sEmail = trim((string)($_POST['EMAIL'] ?? ''));

    // Проверяем данные до вызова метода
    if ($sName === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Заполните имя']);
        exit;
    }

    if ($sEmail !== '' && !preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/u', $sEmail)) {
        http_response_code(400);
        echo json_encode(['message' => 'Проверьте адрес электронной почты']);
        exit;
    }

    foreach ([$sName, $sLastName, $sCompanyTitle, $sPhone, $sEmail] as $value) {
        if (mb_strlen($value) > MAX_LENGTH) {
            http_response_code(400);
            echo json_encode(['message' => 'Одно из полей слишком длинное']);
            exit;
        }
    }

    // Собираем телефон и почту в мультиполя
    $arFm = [];

    if ($sPhone !== '') {
        $arFm[] = ['typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => $sPhone];
    }

    if ($sEmail !== '') {
        $arFm[] = ['typeId' => 'EMAIL', 'valueType' => 'HOME', 'value' => $sEmail];
    }

    // Формируем название лида из имени и фамилии
    $sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
    // Если есть название компании — добавляем его через тире после имени и фамилии
    if ($sCompanyTitle !== '') {
        $sTitle .= ' — ' . $sCompanyTitle;
    }

    // Отправляем данные в Битрикс24
    try {
        $result = $sb->getCRMScope()->item()->add(1, [ // 1 — тип объекта CRM «Лид»
            'title' => $sTitle, // Название лида
            'name' => $sName, // Имя
            'lastName' => $sLastName, // Фамилия
            'companyTitle' => $sCompanyTitle, // Название компании
            'fm' => $arFm, // Телефон и почта
        ]);

        $leadId = $result->item()->id; // Идентификатор созданного лида
        error_log('Создан лид с ID ' . $leadId);
        echo json_encode(['message' => 'Лид создан', 'id' => $leadId]);
    } catch (\Throwable $e) {
        // Подробности ошибки пишем в лог, посетителю их не показываем
        error_log($e->getMessage());
        http_response_code(502);
        echo json_encode(['message' => 'Не удалось создать лид, попробуйте позже']);
    }
    ```

- Python

    ```python
    # pip install flask b24pysdk
    import os
    import re

    from flask import Flask, request, jsonify
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # Страницу form.html кладем в папку static
    app = Flask(__name__)

    client = Client(BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],  # your-domain.bitrix24.ru
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],  # только user_id/token, без https://
    ))

    # Шаблон для проверки адреса электронной почты
    EMAIL_PATTERN = re.compile(r"[^@\s]+@[^@\s]+\.[^@\s]+")
    # Ограничение длины значений: форма публичная
    MAX_LENGTH = 100


    @app.route("/form", methods=["POST"])
    def handle_form():
        # Получаем данные из формы
        s_name = request.form.get("NAME", "").strip()
        s_last_name = request.form.get("LAST_NAME", "").strip()
        s_company_title = request.form.get("COMPANY_TITLE", "").strip()
        s_phone = request.form.get("PHONE", "").strip()
        s_email = request.form.get("EMAIL", "").strip()

        # Проверяем данные до вызова метода
        if not s_name:
            return jsonify({"message": "Заполните имя"}), 400

        if s_email and not EMAIL_PATTERN.fullmatch(s_email):
            return jsonify({"message": "Проверьте адрес электронной почты"}), 400

        if any(len(value) > MAX_LENGTH for value in (s_name, s_last_name, s_company_title, s_phone, s_email)):
            return jsonify({"message": "Одно из полей слишком длинное"}), 400

        # Собираем телефон и почту в мультиполя
        ar_fm = []

        if s_phone:
            ar_fm.append({"typeId": "PHONE", "valueType": "WORK", "value": s_phone})

        if s_email:
            ar_fm.append({"typeId": "EMAIL", "valueType": "HOME", "value": s_email})

        # Формируем название лида из имени и фамилии
        s_title = "С сайта: " + f"{s_name} {s_last_name}".strip()
        # Если есть название компании — добавляем его через тире после имени и фамилии
        if s_company_title:
            s_title += " — " + s_company_title

        # Отправляем данные в Битрикс24
        try:
            bitrix_response = client.crm.item.add(
                entity_type_id=1,  # Тип объекта CRM — лид
                fields={
                    "title": s_title,  # Название лида
                    "name": s_name,  # Имя
                    "lastName": s_last_name,  # Фамилия
                    "companyTitle": s_company_title,  # Название компании
                    "fm": ar_fm,  # Телефон и почта
                },
            ).response
            lead_id = bitrix_response.result["item"]["id"]  # Идентификатор созданного лида
            app.logger.info("Создан лид с ID %s", lead_id)
            return jsonify({"message": "Лид создан", "id": lead_id})
        except (BitrixAPIError, BitrixSDKException) as error:
            # Подробности ошибки пишем в лог, посетителю их не показываем
            app.logger.error(error)
            return jsonify({"message": "Не удалось создать лид, попробуйте позже"}), 502


    # Запуск: python handler.py
    if __name__ == "__main__":
        app.run(port=3000)
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
    // Отдельный файл form.html не нужен: страницу с формой отдаёт та же программа,
    // открывайте http://localhost:3000/. Проверка результата — та же программа с
    // аргументом: go run . check 3465
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"net/http"
    	"os"
    	"regexp"
    	"strconv"
    	"strings"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // entityTypeLead — идентификатор типа объекта «лид» для универсальных методов
    // crm.item.*.
    const entityTypeLead = 1

    // Ограничение длины значений: форма публичная.
    const maxLength = 100

    // emailPattern — проверка адреса электронной почты.
    var emailPattern = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)

    func main() {
    	// Проверка результата: go run . check 3465
    	if len(os.Args) > 2 && os.Args[1] == "check" {
    		id, err := strconv.ParseInt(os.Args[2], 10, 64)
    		if err != nil {
    			log.Fatal("нужен числовой идентификатор лида")
    		}
    		if err := check(context.Background(), b24.ID(id)); err != nil {
    			log.Fatal(err)
    		}
    		return
    	}
    	// Путь вебхука — это секрет: он приходит из окружения, а не из кода, и на
    	// публичную страницу с формой не попадает никогда. Клиент строится ОДИН раз
    	// на портал и переиспользуется всеми запросами — он держит HTTP-клиент и
    	// состояние авторизации, а http.Server зовёт обработчик из многих горутин.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	mux := http.NewServeMux()
    	// Страницу с формой отдаём отсюда же: тогда запрос формы уходит на тот
    	// адрес, с которого она открыта, и настраивать статику не требуется.
    	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    		w.Header().Set("Content-Type", "text/html; charset=utf-8")
    		fmt.Fprint(w, formPage)
    	})
    	mux.HandleFunc("/form", func(w http.ResponseWriter, r *http.Request) {
    		if r.Method != http.MethodPost {
    			reply(w, http.StatusMethodNotAllowed, "Нужен POST", 0)
    			return
    		}
    		handleForm(w, r, core)
    	})

    	log.Println("форма и обработчик: http://localhost:3000/")
    	if err := http.ListenAndServe(":3000", mux); err != nil {
    		log.Fatal(err)
    	}
    }

    func handleForm(w http.ResponseWriter, r *http.Request, core *b24.Core) {
    	// Данные приходят от анонимного посетителя, поэтому до вызова метода
    	// обработчик их проверяет.
    	if err := r.ParseForm(); err != nil {
    		reply(w, http.StatusBadRequest, "Не удалось разобрать форму", 0)
    		return
    	}
    	// r.PostFormValue возвращает пустую строку, если ключа нет вовсе, — по
    	// отсутствующему полю падать нечему.
    	name := strings.TrimSpace(r.PostFormValue("NAME"))
    	lastName := strings.TrimSpace(r.PostFormValue("LAST_NAME"))
    	companyTitle := strings.TrimSpace(r.PostFormValue("COMPANY_TITLE"))
    	phone := strings.TrimSpace(r.PostFormValue("PHONE"))
    	email := strings.TrimSpace(r.PostFormValue("EMAIL"))

    	if name == "" {
    		reply(w, http.StatusBadRequest, "Заполните имя", 0)
    		return
    	}
    	if email != "" && !emailPattern.MatchString(email) {
    		reply(w, http.StatusBadRequest, "Проверьте адрес электронной почты", 0)
    		return
    	}
    	for _, value := range []string{name, lastName, companyTitle, phone, email} {
    		// Длина считается в РУНАХ, а не в байтах: в UTF-8 кириллическая буква
    		// занимает два байта, и len() отклонил бы вдвое более короткое имя.
    		if len([]rune(value)) > maxLength {
    			reply(w, http.StatusBadRequest, "Одно из полей слишком длинное", 0)
    			return
    		}
    	}
    	// В REST значения уходят в исходном виде: html.EscapeString и подобное
    	// нужно при выводе на страницу, а в CRM из-за него вместо «Иванов & сын»
    	// попадёт «Иванов &amp; сын».
    	// Телефон и почта едут в поле fm — массив объектов crm_multifield.
    	// Универсальные методы crm.item.* принимают ключи в camelCase, тогда как
    	// crm.lead.add ждал бы те же ключи в ВЕРХНЕМ регистре.
    	fm := make([]b24.Params, 0, 2)
    	if phone != "" {
    		fm = append(fm, b24.Params{"typeId": "PHONE", "valueType": "WORK", "value": phone})
    	}
    	if email != "" {
    		fm = append(fm, b24.Params{"typeId": "EMAIL", "valueType": "HOME", "value": email})
    	}
    	// Название собираем из имени и фамилии, а название компании добавляем через
    	// тире — так менеджер видит в списке лидов, от кого пришла заявка.
    	title := "С сайта: " + strings.TrimSpace(name+" "+lastName)
    	if companyTitle != "" {
    		title += " — " + companyTitle
    	}
    	res, err := core.Call(r.Context(), "crm.item.add", b24.Params{
    		"entityTypeId": entityTypeLead,
    		"fields": b24.Params{
    			"title":        title,
    			"name":         name,
    			"lastName":     lastName,
    			"companyTitle": companyTitle,
    			"fm":           fm,
    		},
    	}) // без WithIdempotent: повтор создал бы второй лид
    	if err != nil {
    		// Подробности пишем в лог сервера, посетителю возвращаем общее
    		// сообщение: техническим деталям на публичной странице не место.
    		// Адрес вебхука в текст ошибки не попадёт — SDK вырезает его сам.
    		log.Println("crm.item.add:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    		return
    	}

    	// Метод заворачивает ответ в объект с ключом item.
    	raw, ok := b24.Unwrap(res.Result, "item", "id")
    	if !ok {
    		log.Println("нет item.id в ответе:", string(res.Result))
    		reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    		return
    	}
    	var leadID b24.ID
    	if err := json.Unmarshal(raw, &leadID); err != nil {
    		log.Println("разбор идентификатора лида:", err)
    		reply(w, http.StatusBadGateway, "Не удалось создать лид, попробуйте позже", 0)
    		return
    	}

    	log.Printf("создан лид %d", leadID)
    	reply(w, http.StatusOK, "Лид создан", leadID)
    }

    // check показывает данные лида по идентификатору из ответа обработчика. Вызов
    // только читает — данные в CRM он не меняет.
    func check(ctx context.Context, leadID b24.ID) error {
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	res, err := core.Call(ctx, "crm.item.get", b24.Params{
    		"entityTypeId": entityTypeLead,
    		"id":           leadID,
    	}, b24.WithIdempotent()) // чтение: неоднозначный сбой сети можно повторить
    	if err != nil {
    		return fmt.Errorf("crm.item.get: %w", err)
    	}

    	var out struct {
    		Item struct {
    			ID           b24.ID `json:"id"`
    			Title        string `json:"title"`
    			Name         string `json:"name"`
    			LastName     string `json:"lastName"`
    			CompanyTitle string `json:"companyTitle"`
    			FM           []struct {
    				TypeID string `json:"typeId"`
    				Value  string `json:"value"`
    			} `json:"fm"`
    		} `json:"item"`
    	}
    	if err := json.Unmarshal(res.Result, &out); err != nil {
    		return fmt.Errorf("разбор лида: %w", err)
    	}

    	fmt.Printf("лид %d: %s\n", out.Item.ID, out.Item.Title)
    	for _, f := range out.Item.FM {
    		fmt.Printf("  %s: %s\n", f.TypeID, f.Value)
    	}
    	return nil
    }

    // reply отвечает странице тем же JSON, что и обработчики на других языках:
    // {"message": "...", "id": 3465}.
    func reply(w http.ResponseWriter, status int, message string, id b24.ID) {
    	w.Header().Set("Content-Type", "application/json; charset=utf-8")
    	w.WriteHeader(status)
    	body := map[string]any{"message": message}
    	if id != 0 {
    		body["id"] = id
    	}
    	_ = json.NewEncoder(w).Encode(body)
    }

    // formPage — та же форма, что в шаге 1, только отдаётся программой, а не
    // лежит отдельным файлом.
    const formPage = `<!doctype html>
    <meta charset="utf-8">
    <title>Заявка</title>
    <form method="post" action="/form">
      <p><label>Имя*<br><input name="NAME" required maxlength="100"></label></p>
      <p><label>Фамилия<br><input name="LAST_NAME" maxlength="100"></label></p>
      <p><label>Компания<br><input name="COMPANY_TITLE" maxlength="100"></label></p>
      <p><label>Телефон<br><input name="PHONE" type="tel" maxlength="100"></label></p>
      <p><label>Почта<br><input name="EMAIL" type="email" maxlength="100"></label></p>
      <p><button type="submit">Отправить</button></p>
    </form>`
    ```

{% endlist %}

## Проверим результат

1. Отправьте форму. В браузере появится сообщение вида «Лид создан. ID: 3465» — идентификатор понадобится на шаге 3

2. Откройте раздел CRM и перейдите в Лиды. Новый лид будет с названием «С сайта: Имя Фамилия», а если посетитель заполнил название компании — «С сайта: Имя Фамилия — Название компании»

3. Запросите данные лида методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md). Передайте `entityTypeId` со значением `1` и `id` из ответа обработчика

Проверку выполните отдельным скриптом: он не зависит от обработчика и подключается к Битрикс24 через тот же вебхук.

{% list tabs %}

- JS

    ```javascript
    // Сохраните в файл check.mjs в каталоге проекта рядом с node_modules
    // Запуск: B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' node check.mjs
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    const leadId = 3465 // Идентификатор из ответа обработчика

    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: { entityTypeId: 1, id: leadId },
        requestId: 'lead-get'
    })

    console.info(response.getData().result.item)
    ```

- PHP

    ```php
    <?php
    // Сохраните в файл check.php в корне проекта рядом с каталогом vendor
    // Запуск: B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' php check.php
    require_once __DIR__ . '/vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $sb = ServiceBuilderFactory::createServiceBuilderFromWebhook(getenv('B24_HOOK'));
    $leadId = 3465; // Идентификатор из ответа обработчика

    $result = $sb->getCRMScope()->item()->get(1, $leadId);

    print_r($result->item());
    ```

- Python

    ```python
    # Сохраните в файл check.py в каталоге проекта
    # Запуск: B24_DOMAIN='your-domain.bitrix24.ru' B24_WEBHOOK_TOKEN='1/TOKEN' python check.py
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(BitrixWebhook(
        domain=os.environ["B24_DOMAIN"],
        webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
    ))
    lead_id = 3465  # Идентификатор из ответа обработчика

    bitrix_response = client.crm.item.get(entity_type_id=1, bitrix_id=lead_id).response

    print(bitrix_response.result["item"])
    ```

- Go

    ```go
    core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    res, err := core.Call(ctx, "crm.item.get", b24.Params{
    	"entityTypeId": entityTypeLead,
    	"id":           leadID,
    }, b24.WithIdempotent()) // чтение: неоднозначный сбой сети можно повторить
    if err != nil {
    	return fmt.Errorf("crm.item.get: %w", err)
    }

    var out struct {
    	Item struct {
    		ID           b24.ID `json:"id"`
    		Title        string `json:"title"`
    		Name         string `json:"name"`
    		LastName     string `json:"lastName"`
    		CompanyTitle string `json:"companyTitle"`
    		FM           []struct {
    			TypeID string `json:"typeId"`
    			Value  string `json:"value"`
    		} `json:"fm"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор лида: %w", err)
    }

    fmt.Printf("лид %d: %s\n", out.Item.ID, out.Item.Title)
    for _, f := range out.Item.FM {
    	fmt.Printf("  %s: %s\n", f.TypeID, f.Value)
    }
    ```

{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 3465,
            "title": "С сайта: Иван Иванов — ООО Ромашка",
            "name": "Иван",
            "lastName": "Иванов",
            "companyTitle": "ООО Ромашка",
            "hasPhone": "Y",
            "hasEmail": "Y",
            "fm": [
                {
                    "id": 11658,
                    "valueType": "WORK",
                    "value": "+70000000000",
                    "typeId": "PHONE"
                },
                {
                    "id": 11659,
                    "valueType": "HOME",
                    "value": "ivan@example.com",
                    "typeId": "EMAIL"
                }
            ]
        }
    }
}
```

Значения `name`, `lastName` и `companyTitle` совпадают с полями формы. Телефон и почта возвращаются в массиве `fm` с теми типами `typeId` и `valueType`, которые передал обработчик. Флаги `hasPhone` и `hasEmail` показывают, что у лида есть заполненные телефон и почта — по ним видно, что мультиполя сохранились.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `ACCESS_DENIED` | У пользователя, от имени которого создан вебхук, нет нужного права: на добавление лидов — для шага 2, на чтение лидов — для шага проверки. Проверьте права в настройках CRM ||
|| `NOT_FOUND` | На шаге 2 — передан неверный `entityTypeId`, для лида нужно значение `1`. На шаге проверки — объекта с таким `id` нет: подставьте идентификатор из ответа обработчика ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля. Проверьте, что имена полей записаны в camelCase, а мультиполя переданы в `fm` ||
|| `100` | В множественное поле передано не итерируемое значение. Убедитесь, что `fm` — массив, даже если он пустой ||
|| `NO_AUTH_FOUND` | Неверный код вебхука. Проверьте значение переменной окружения с URL вебхука ||
|| `insufficient_scope` | У вебхука нет scope `crm`. Создайте вебхук заново и отметьте нужное право ||
|| `QUERY_LIMIT_EXCEEDED` | Превышен лимит на интенсивность запросов. Повторите вызов позже ||
|#

Заполненность обязательных полей метод проверяет сам и возвращает ошибку, если поле пустое. Текст такой ошибки ищите в логе обработчика: посетителю уходит только общее сообщение. Молча метод игнорирует другое — неизвестное имя поля: опечатка в `fields` не вызывает ошибку, значение не сохранится. Поэтому после первого запуска сверьте сохраненные данные методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md). Полный список ошибок метода приведен на странице [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

Обработчик выполняет один вызов, поэтому после исправления повторите отправку формы целиком — незавершенных записей в CRM не остается. Сообщения «Заполните имя», «Проверьте адрес электронной почты» и «Одно из полей слишком длинное» возвращает сам обработчик со статусом `400`, до обращения к Битрикс24.

Ошибки на участке между формой и обработчиком метод не возвращает — они видны в браузере.

#|
|| **Признак** | **Причина и действие** ||
|| Обработчик завершается сразу при запуске или отвечает ошибкой на первый же запрос | Не заданы переменные окружения с данными вебхука: `B24Hook.fromWebhookUrl` и `os.environ` завершают работу с ошибкой, а в PHP `getenv` вернет `false` и ошибку выбросит SDK. `fromWebhookUrl` также проверяет URL: протокол должен быть HTTPS, а идентификатор пользователя — числом ||
|| Страница открыта из файловой системы по адресу вида `file://` | Относительный путь из `handlerUrl` резолвить не к чему, запрос не уходит. Откройте страницу по адресу приложения из шага 1 ||
|| В консоли браузера ошибка CORS | В `handlerUrl` подставлен абсолютный адрес другого домена или порта. Браузер не даст странице прочитать ответ, но запрос выполнится и объект в CRM создастся — проверьте дубли. С относительным путем из примера этой ошибки не будет ||
|| В консоли браузера ошибка 404 | Неверный адрес в переменной `handlerUrl`. Для Node.js и Flask это `/form`, для PHP — `form.php` ||
|| Ответ `405` с сообщением «Метод не поддерживается» | Файл `form.php` открыт напрямую GET-запросом. Обработчик принимает только POST — отправляйте данные формой ||
|| Сообщение «Сервер вернул неожиданный ответ» | Обработчик ответил не JSON: упал до `header` или вернул страницу ошибки веб-сервера. Смотрите лог: `console.error` — в выводе Node.js, `error_log` — в логе PHP, `app.logger.error` — в выводе Flask ||
|#

## Что важно учитывать

- Каждая отправка формы создает новый лид. Если клиент обратится повторно, появятся дубли. Как их находить и связывать с имеющимися записями, описано в туториале [Добавить повторный лид](./how-to-add-repeat-lead.md)

- Вебхук дает доступ ко всей CRM. Вызывайте REST только с сервера и не передавайте URL вебхука в браузер

- Форму заполняют анонимные посетители. Длину значений обработчик из примера ограничивает, а защиту от автоматических отправок нужно добавить отдельно, например капчу

- При переходе на другой тип объекта CRM меняется не только `entityTypeId`: у каждого типа свой набор полей. Сверяйтесь с описанием параметра `fields` на странице [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)

- Встроенные серверы из примеров — `app.listen`, `app.run`, `php -S` — подходят для локальной проверки сценария. Публичную страницу размещайте на веб-сервере по HTTPS: форма собирает персональные данные клиента

- Сценарий использует универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Развитие метода [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) остановлено: он продолжает работать, но в новых интеграциях используйте `crm.item.add`

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-get.md)
- [{#T}](./how-to-add-repeat-lead.md)
- [{#T}](./how-to-add-lead-with-files.md)
- [{#T}](./how-to-add-contact.md)
- [{#T}](./how-to-add-company.md)
