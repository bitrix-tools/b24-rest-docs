# Добавить компанию через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны оба права — на добавление компаний и на чтение компаний
>
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом на добавление компаний
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом на чтение компаний

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На сайте можно разместить форму для сбора данных клиентов. Когда клиент заполнит форму, обработчик на вашем сервере создаст компанию в CRM и вернет ее идентификатор. В результате у вас будет два файла — страница с формой и обработчик на выбранном стеке — и отдельный скрипт для проверки результата.

Сценарий состоит из двух шагов.

1. Разместить форму на HTML-странице. Форма отправит данные в обработчик

2. Создать обработчик. Он проверит данные и создаст компанию универсальным методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)

После этого проверим результат методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) по идентификатору из ответа второго шага: этот вызов только подтверждает создание и данные в CRM не меняет.

## Подготовим данные

Для выполнения примера нужны:

- [входящий вебхук](../../../local-integrations/local-webhooks.md) со scope `crm`. Обработчик работает на сервере: страница с формой вебхук не использует

- права у пользователя, от имени которого создан вебхук: на добавление компаний — для шага 2, на чтение компаний — для шага проверки

- страница с формой и обработчик на одном домене и порте. В примере `handlerUrl` — относительный путь, поэтому запрос уходит на тот адрес, с которого открыта страница. Если открыть `form.html` с другого адреса или из файловой системы, обработчик данные не получит

- переменные окружения с данными вебхука. Задайте их в окружении процесса перед запуском, в код не вписывайте:

   - `B24_HOOK` — полный URL вебхука, для JS и PHP

   - `B24_DOMAIN` и `B24_WEBHOOK_TOKEN` — домен и `USER_ID/TOKEN` без `https://`, для Python

   Например, при локальном запуске:

   - Node.js — `B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' node handler.mjs`

   - PHP — `B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' php -S localhost:3000 -t public`

   - Python — `B24_DOMAIN='your-domain.bitrix24.ru' B24_WEBHOOK_TOKEN='1/TOKEN' python handler.py`

- тип компании, который будет присвоен новой записи. В примере это `CUSTOMER` — клиент, значение из справочника по умолчанию. Если справочник типов компаний в вашем Битрикс24 изменили, доступные значения вернет метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром `{ ENTITY_ID: "COMPANY_TYPE" }`: в `typeId` передают `STATUS_ID` из ответа, а не название типа

Если в вашем Битрикс24 для компаний настроены обязательные поля, их тоже нужно передать в `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — иначе метод вернет ошибку. Список полей с признаком `isRequired` вернет метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) с `entityTypeId` со значением `4`.

Для серверных JS-примеров с `B24Hook` нужен Node.js 18, 20, 22 или новее. Для новых проектов берите 22 или новее: поддержка Node.js 18 и 20 сообществом завершена. [B24JsSDK](../../../sdk/b24jssdk/index.md) — ES module: сохраните код в файле `.mjs` или добавьте `"type": "module"` в `package.json`.

Для примеров с [b24pysdk](../../../sdk/b24pysdk/index.md) нужен Python 3.9 или новее.

Для примеров с `bitrix24/b24phpsdk:"^3.3"` нужен PHP 8.4 или новее с расширениями `curl`, `intl` и `json`, а для проверки длины значений в примере — `mbstring`. Требования SDK и рекомендованную раскладку файлов смотрите на странице [B24PhpSDK](../../../sdk/b24phpsdk/index.md).

## 1. Создаем веб-форму

Создадим на странице сайта веб-форму с тремя полями:

- `TITLE` — название компании, обязательное поле формы

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
    <input type="text" name="TITLE" placeholder="Название компании" required>
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

Обработчик принимает данные формы, проверяет их и добавляет компанию методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). В параметре `entityTypeId` передаем `4` — тип объекта «Компания», значения для остальных типов приведены в [справочнике типов объектов CRM](../../../api-reference/crm/data-types.md#object_type). В объекте `fields` передаем поля:

- `title` — название компании

- `typeId` — тип компании. Указываем `CUSTOMER` — клиент, так как форму заполняют клиенты

- `fm` — массив мультиполей, в нем передаем телефон и электронную почту

Универсальные методы `crm.item.*` используют имена полей в camelCase. Они отличаются от имен в методах отдельных объектов: `title` вместо `TITLE`, `typeId` вместо `COMPANY_TYPE`, а телефон и почта передаются одним массивом `fm` вместо отдельных полей `PHONE` и `EMAIL`.

Значения полей `title` и `fm` получаем из формы, `typeId` задаем в коде. Ниже разобрано каждое действие обработчика, полный код приведен в конце раздела.

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
{% endlist %}

### Проверяем данные из формы

Данные приходят от анонимного посетителя, поэтому до вызова метода обработчик проверяет их:

- обращается к полям со значением по умолчанию: нужного ключа может не быть в запросе

- убирает пробелы по краям и не создает компанию, если не заполнено название

- проверяет формат электронной почты, чтобы не сохранить в CRM заведомо неверный адрес

- отклоняет слишком длинные значения: в публичную форму может прийти что угодно

В REST значения передаем в исходном виде. Не применяйте к ним `htmlspecialchars` и другие функции HTML-экранирования: они нужны при выводе данных на страницу, а в CRM из-за них вместо `ООО «Ромашка» & Ко` попадет `ООО «Ромашка» &amp; Ко`.

{% list tabs %}

- JS

    ```javascript
    // Получаем данные из формы
    const sTitle = String(req.body.TITLE ?? '').trim()
    const sPhone = String(req.body.PHONE ?? '').trim()
    const sEmail = String(req.body.EMAIL ?? '').trim()

    // Проверяем данные до вызова метода
    if (!sTitle) {
        res.status(400).json({ message: 'Заполните название компании' })
        return
    }

    if (sEmail && !emailPattern.test(sEmail)) {
        res.status(400).json({ message: 'Проверьте адрес электронной почты' })
        return
    }

    if ([sTitle, sPhone, sEmail].some(value => value.length > maxLength)) {
        res.status(400).json({ message: 'Одно из полей слишком длинное' })
        return
    }
    ```

- Python

    ```python
    # Получаем данные из формы
    s_title = request.form.get("TITLE", "").strip()
    s_phone = request.form.get("PHONE", "").strip()
    s_email = request.form.get("EMAIL", "").strip()

    # Проверяем данные до вызова метода
    if not s_title:
        return jsonify({"message": "Заполните название компании"}), 400

    if s_email and not EMAIL_PATTERN.fullmatch(s_email):
        return jsonify({"message": "Проверьте адрес электронной почты"}), 400

    if any(len(value) > MAX_LENGTH for value in (s_title, s_phone, s_email)):
        return jsonify({"message": "Одно из полей слишком длинное"}), 400
    ```


- PHP

    ```php
    // Получаем данные из формы
    $sTitle = trim((string)($_POST['TITLE'] ?? ''));
    $sPhone = trim((string)($_POST['PHONE'] ?? ''));
    $sEmail = trim((string)($_POST['EMAIL'] ?? ''));

    // Проверяем данные до вызова метода
    if ($sTitle === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Заполните название компании']);
        exit;
    }

    if ($sEmail !== '' && !preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/u', $sEmail)) {
        http_response_code(400);
        echo json_encode(['message' => 'Проверьте адрес электронной почты']);
        exit;
    }

    foreach ([$sTitle, $sPhone, $sEmail] as $value) {
        if (mb_strlen($value) > MAX_LENGTH) {
            http_response_code(400);
            echo json_encode(['message' => 'Одно из полей слишком длинное']);
            exit;
        }
    }
    ```
{% endlist %}

### Собираем телефон и почту в мультиполя

Телефон и электронную почту метод принимает в поле `fm` — это массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У каждого объекта три ключа:

- `typeId` — тип мультиполя: `PHONE` для телефона, `EMAIL` для почты

- `valueType` — тип значения, например `WORK` — рабочий, `HOME` — домашний

- `value` — значение из формы

Если посетитель не заполнил поле, объект в массив не добавляем. Если не заполнено ни одно значение, передаем пустой массив.

В справочнике [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield) ключи мультиполя приведены в верхнем регистре — `TYPE_ID`, `VALUE_TYPE`, `VALUE`. Это формат методов отдельных объектов, например `crm.company.add`. Универсальные методы `crm.item.*` принимают и возвращают те же ключи в camelCase.

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

- Python

    ```python
    # Собираем телефон и почту в мультиполя
    ar_fm = []

    if s_phone:
        ar_fm.append({"typeId": "PHONE", "valueType": "WORK", "value": s_phone})

    if s_email:
        ar_fm.append({"typeId": "EMAIL", "valueType": "HOME", "value": s_email})
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
{% endlist %}

### Создаем компанию

Подготовленные значения передаем в `fields` метода [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Текст ошибки пишем в лог сервера, а посетителю возвращаем общее сообщение: так технические подробности не попадут на публичную страницу.

{% list tabs %}

- JS

    ```javascript
    // Отправляем данные в Битрикс24
    try {
        const response = await $b24.actions.v2.call.make({
            method: 'crm.item.add',
            params: {
                entityTypeId: 4, // Тип объекта CRM — компания
                fields: {
                    title: sTitle, // Название компании
                    typeId: 'CUSTOMER', // Тип компании — клиент
                    fm: arFm, // Телефон и почта
                }
            },
            requestId: 'company-add'
        })

        // Проверяем результат и выводим сообщение
        if (!response.isSuccess) {
            // Подробности ошибки пишем в лог, посетителю их не показываем
            console.error(response.getErrorMessages().join('; '))
            res.status(502).json({ message: 'Не удалось создать компанию, попробуйте позже' })
            return
        }

        const companyId = response.getData().result.item.id // Идентификатор созданной компании
        console.info('Создана компания с ID ' + companyId)
        res.json({ message: 'Компания создана', id: companyId })
    } catch (error) {
        // Сетевые ошибки и сбои SDK приходят исключением
        console.error(error)
        res.status(502).json({ message: 'Не удалось создать компанию, попробуйте позже' })
    }
    ```

- Python

    ```python
    # Отправляем данные в Битрикс24
    try:
        bitrix_response = client.crm.item.add(
            entity_type_id=4,  # Тип объекта CRM — компания
            fields={
                "title": s_title,  # Название компании
                "typeId": "CUSTOMER",  # Тип компании — клиент
                "fm": ar_fm,  # Телефон и почта
            },
        ).response
        company_id = bitrix_response.result["item"]["id"]  # Идентификатор созданной компании
        app.logger.info("Создана компания с ID %s", company_id)
        return jsonify({"message": "Компания создана", "id": company_id})
    except (BitrixAPIError, BitrixSDKException) as error:
        # Подробности ошибки пишем в лог, посетителю их не показываем
        app.logger.error(error)
        return jsonify({"message": "Не удалось создать компанию, попробуйте позже"}), 502
    ```


- PHP

    ```php
    // Отправляем данные в Битрикс24
    try {
        $result = $sb->getCRMScope()->item()->add(4, [ // 4 — тип объекта CRM «Компания»
            'title' => $sTitle, // Название компании
            'typeId' => 'CUSTOMER', // Тип компании — клиент
            'fm' => $arFm, // Телефон и почта
        ]);

        $companyId = $result->item()->id; // Идентификатор созданной компании
        error_log('Создана компания с ID ' . $companyId);
        echo json_encode(['message' => 'Компания создана', 'id' => $companyId]);
    } catch (\Throwable $e) {
        // Подробности ошибки пишем в лог, посетителю их не показываем
        error_log($e->getMessage());
        http_response_code(502);
        echo json_encode(['message' => 'Не удалось создать компанию, попробуйте позже']);
    }
    ```
{% endlist %}

Метод возвращает данные созданной компании в объекте `result.item`.

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 2921,
            "title": "ООО Ромашка",
            "typeId": "CUSTOMER",
            "entityTypeId": 4
        }
    }
}
```

Обработчик возвращает странице `{ "message": "Компания создана", "id": 2921 }`. Идентификатор понадобится, чтобы открыть компанию в интерфейсе или запросить ее данные через REST.

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
        const sTitle = String(req.body.TITLE ?? '').trim()
        const sPhone = String(req.body.PHONE ?? '').trim()
        const sEmail = String(req.body.EMAIL ?? '').trim()

        // Проверяем данные до вызова метода
        if (!sTitle) {
            res.status(400).json({ message: 'Заполните название компании' })
            return
        }

        if (sEmail && !emailPattern.test(sEmail)) {
            res.status(400).json({ message: 'Проверьте адрес электронной почты' })
            return
        }

        if ([sTitle, sPhone, sEmail].some(value => value.length > maxLength)) {
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

        // Отправляем данные в Битрикс24
        try {
            const response = await $b24.actions.v2.call.make({
                method: 'crm.item.add',
                params: {
                    entityTypeId: 4, // Тип объекта CRM — компания
                    fields: {
                        title: sTitle, // Название компании
                        typeId: 'CUSTOMER', // Тип компании — клиент
                        fm: arFm, // Телефон и почта
                    }
                },
                requestId: 'company-add'
            })

            // Проверяем результат и выводим сообщение
            if (!response.isSuccess) {
                // Подробности ошибки пишем в лог, посетителю их не показываем
                console.error(response.getErrorMessages().join('; '))
                res.status(502).json({ message: 'Не удалось создать компанию, попробуйте позже' })
                return
            }

            const companyId = response.getData().result.item.id // Идентификатор созданной компании
            console.info('Создана компания с ID ' + companyId)
            res.json({ message: 'Компания создана', id: companyId })
        } catch (error) {
            // Сетевые ошибки и сбои SDK приходят исключением
            console.error(error)
            res.status(502).json({ message: 'Не удалось создать компанию, попробуйте позже' })
        }
    })

    // Запуск: node handler.mjs
    app.listen(3000)
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
        s_title = request.form.get("TITLE", "").strip()
        s_phone = request.form.get("PHONE", "").strip()
        s_email = request.form.get("EMAIL", "").strip()

        # Проверяем данные до вызова метода
        if not s_title:
            return jsonify({"message": "Заполните название компании"}), 400

        if s_email and not EMAIL_PATTERN.fullmatch(s_email):
            return jsonify({"message": "Проверьте адрес электронной почты"}), 400

        if any(len(value) > MAX_LENGTH for value in (s_title, s_phone, s_email)):
            return jsonify({"message": "Одно из полей слишком длинное"}), 400

        # Собираем телефон и почту в мультиполя
        ar_fm = []

        if s_phone:
            ar_fm.append({"typeId": "PHONE", "valueType": "WORK", "value": s_phone})

        if s_email:
            ar_fm.append({"typeId": "EMAIL", "valueType": "HOME", "value": s_email})

        # Отправляем данные в Битрикс24
        try:
            bitrix_response = client.crm.item.add(
                entity_type_id=4,  # Тип объекта CRM — компания
                fields={
                    "title": s_title,  # Название компании
                    "typeId": "CUSTOMER",  # Тип компании — клиент
                    "fm": ar_fm,  # Телефон и почта
                },
            ).response
            company_id = bitrix_response.result["item"]["id"]  # Идентификатор созданной компании
            app.logger.info("Создана компания с ID %s", company_id)
            return jsonify({"message": "Компания создана", "id": company_id})
        except (BitrixAPIError, BitrixSDKException) as error:
            # Подробности ошибки пишем в лог, посетителю их не показываем
            app.logger.error(error)
            return jsonify({"message": "Не удалось создать компанию, попробуйте позже"}), 502


    # Запуск: python handler.py
    if __name__ == "__main__":
        app.run(port=3000)
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
    $sTitle = trim((string)($_POST['TITLE'] ?? ''));
    $sPhone = trim((string)($_POST['PHONE'] ?? ''));
    $sEmail = trim((string)($_POST['EMAIL'] ?? ''));

    // Проверяем данные до вызова метода
    if ($sTitle === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Заполните название компании']);
        exit;
    }

    if ($sEmail !== '' && !preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/u', $sEmail)) {
        http_response_code(400);
        echo json_encode(['message' => 'Проверьте адрес электронной почты']);
        exit;
    }

    foreach ([$sTitle, $sPhone, $sEmail] as $value) {
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

    // Отправляем данные в Битрикс24
    try {
        $result = $sb->getCRMScope()->item()->add(4, [ // 4 — тип объекта CRM «Компания»
            'title' => $sTitle, // Название компании
            'typeId' => 'CUSTOMER', // Тип компании — клиент
            'fm' => $arFm, // Телефон и почта
        ]);

        $companyId = $result->item()->id; // Идентификатор созданной компании
        error_log('Создана компания с ID ' . $companyId);
        echo json_encode(['message' => 'Компания создана', 'id' => $companyId]);
    } catch (\Throwable $e) {
        // Подробности ошибки пишем в лог, посетителю их не показываем
        error_log($e->getMessage());
        http_response_code(502);
        echo json_encode(['message' => 'Не удалось создать компанию, попробуйте позже']);
    }
    ```
{% endlist %}

## Проверим результат

1. Отправьте форму. В браузере появится сообщение вида «Компания создана. ID: 2921» — идентификатор понадобится на шаге 3

2. Откройте раздел CRM и перейдите в Компании. Новая компания будет с названием из формы и типом «Клиент»

3. Запросите данные компании методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md). Передайте `entityTypeId` со значением `4` и `id` из ответа обработчика

Проверку выполните отдельным скриптом: он не зависит от обработчика и подключается к Битрикс24 через тот же вебхук.

{% list tabs %}

- JS

    ```javascript
    // Сохраните в файл check.mjs в каталоге проекта рядом с node_modules
    // Запуск: B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' node check.mjs
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    const companyId = 2921 // Идентификатор из ответа обработчика

    const response = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: { entityTypeId: 4, id: companyId },
        requestId: 'company-get'
    })

    console.info(response.getData().result.item)
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
    company_id = 2921  # Идентификатор из ответа обработчика

    bitrix_response = client.crm.item.get(entity_type_id=4, bitrix_id=company_id).response

    print(bitrix_response.result["item"])
    ```


- PHP

    ```php
    <?php
    // Сохраните в файл check.php в корне проекта рядом с каталогом vendor
    // Запуск: B24_HOOK='https://your-domain.bitrix24.ru/rest/1/TOKEN/' php check.php
    require_once __DIR__ . '/vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;

    $sb = ServiceBuilderFactory::createServiceBuilderFromWebhook(getenv('B24_HOOK'));
    $companyId = 2921; // Идентификатор из ответа обработчика

    $result = $sb->getCRMScope()->item()->get(4, $companyId);

    print_r($result->item());
    ```
{% endlist %}

Сокращенный ответ:

```json
{
    "result": {
        "item": {
            "id": 2921,
            "title": "ООО Ромашка",
            "typeId": "CUSTOMER",
            "hasPhone": "Y",
            "hasEmail": "Y",
            "fm": [
                {
                    "id": 3401,
                    "valueType": "WORK",
                    "value": "+70000000000",
                    "typeId": "PHONE"
                },
                {
                    "id": 3402,
                    "valueType": "HOME",
                    "value": "info@example.com",
                    "typeId": "EMAIL"
                }
            ]
        }
    }
}
```

Значение `title` совпадает с полем формы, в `typeId` возвращается `CUSTOMER`. Телефон и почта возвращаются в массиве `fm` с теми типами `typeId` и `valueType`, которые передал обработчик. Флаги `hasPhone` и `hasEmail` показывают, что у компании есть заполненные телефон и почта — по ним видно, что мультиполя сохранились.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `ACCESS_DENIED` | У пользователя, от имени которого создан вебхук, нет нужного права: на добавление компаний — для шага 2, на чтение компаний — для шага проверки. Проверьте права в настройках CRM ||
|| `NOT_FOUND` | На шаге 2 — передан неверный `entityTypeId`, для компании нужно значение `4`. На шаге проверки — объекта с таким `id` нет: подставьте идентификатор из ответа обработчика ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля. Проверьте адрес электронной почты и значение `typeId`, а также что имена полей записаны в camelCase, а мультиполя переданы в `fm` ||
|| `100` | В множественное поле передано не итерируемое значение. Убедитесь, что `fm` — массив, даже если он пустой ||
|| `NO_AUTH_FOUND` | Неверный код вебхука. Проверьте значение переменной окружения с URL вебхука ||
|| `insufficient_scope` | У вебхука нет scope `crm`. Создайте вебхук заново и отметьте нужное право ||
|| `QUERY_LIMIT_EXCEEDED` | Превышен лимит на интенсивность запросов. Повторите вызов позже ||
|#

Заполненность обязательных полей метод проверяет сам и возвращает ошибку, если поле пустое. Текст такой ошибки ищите в логе обработчика: посетителю уходит только общее сообщение. Молча метод игнорирует другое — неизвестное имя поля: опечатка в `fields` не вызывает ошибку, значение не сохранится. Поэтому после первого запуска сверьте сохраненные данные методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md). Полный список ошибок метода приведен на странице [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md).

Обработчик выполняет один вызов, поэтому после исправления повторите отправку формы целиком — незавершенных записей в CRM не остается. Сообщения «Заполните название компании», «Проверьте адрес электронной почты» и «Одно из полей слишком длинное» возвращает сам обработчик со статусом `400`, до обращения к Битрикс24.

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

- Каждая отправка формы создает новую компанию. Если клиент обратится повторно, появятся дубли. Найти совпадения по телефону и почте до создания записи можно методом [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md), пример такой проверки разобран в туториале [Добавить повторный лид](./how-to-add-repeat-lead.md)

- Вебхук дает доступ ко всей CRM. Вызывайте REST только с сервера и не передавайте URL вебхука в браузер

- Форму заполняют анонимные посетители. Длину значений обработчик из примера ограничивает, а защиту от автоматических отправок нужно добавить отдельно, например капчу

- При переходе на другой тип объекта CRM меняется не только `entityTypeId`: у каждого типа свой набор полей. Сверяйтесь с описанием параметра `fields` на странице [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)

- Встроенные серверы из примеров — `app.listen`, `app.run`, `php -S` — подходят для локальной проверки сценария. Публичную страницу размещайте на веб-сервере по HTTPS: форма собирает персональные данные клиента

- Сценарий использует универсальный метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md). Развитие метода [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) остановлено: он продолжает работать, но в новых интеграциях используйте `crm.item.add`

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-get.md)
- [{#T}](../../../api-reference/crm/status/crm-status-list.md)
- [{#T}](./how-to-add-company-with-requisite.md)
- [{#T}](./how-to-add-lead.md)
- [{#T}](./how-to-add-contact.md)
- [{#T}](./how-to-add-deal-with-choice-of-requisite.md)
