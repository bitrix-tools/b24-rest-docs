# Как подключить СМС-провайдера к Битрикс24

> Scope: [`messageservice`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужны права администратора для регистрации провайдера
>
> - [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) — администратор
> - [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) — отправитель сообщения или администратор

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

СМС-провайдер связывает Битрикс24 с внешним сервисом отправки сообщений. После регистрации провайдера пользователи смогут отправлять сообщения из карточки CRM, роботов и бизнес-процессов. Обработчик приложения передаст сообщение внешнему сервису, а после подтверждения доставки обновит его статус в Битрикс24.

Канал доставки не обязательно должен быть СМС. Провайдер может передавать сообщение в любой сервис, который определяет получателя по номеру телефона.

{% note info "" %}

Подробный разбор сценария смотрите в уроке [Интеграция с СМС](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=266&LESSON_ID=25566).

{% endnote %}

Приложение регистрирует провайдера методом [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) и передает URL обработчика в `HANDLER`. После отправки сообщения Битрикс24 вызывает этот URL. Обработчик получает номер, текст и `message_id`, передает сообщение внешнему сервису, а после подтверждения доставки приложение вызывает [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md).

Сценарий состоит из четырех шагов.

1. Зарегистрируйте провайдера методом [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md)
2. Примите сообщение в обработчике `HANDLER`, отправьте его внешнему сервису и сохраните `message_id`
3. Отправьте тестовое сообщение из карточки CRM и проверьте вызов обработчика
4. Обновите статус доставки методом [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md)

Порядок важен: Битрикс24 вызывает `HANDLER` только после регистрации провайдера, а `MESSAGE_ID` для обновления статуса появляется в запросе к обработчику.

## Подготовьте данные {#start}

Создайте [приложение](../../settings/app-installation/index.md) или [локальное приложение](../../settings/app-installation/local-apps/index.md) со scope [`messageservice`](../../api-reference/scopes/permissions.md). Сохраните данные авторизации после установки и разместите обработчик на внешнем сервере. Для примера обработчика нужен PHP с расширением cURL и доступ к API внешнего сервиса отправки сообщений.

Подготовьте значения, которые нужно заменить своими:

#|
|| **Значение** | **Откуда взять** ||
|| `HANDLER_URL` | Публичный HTTPS-адрес файла `handler.php`, например `https://provider.example/api/handler.php?key=YOUR_SECRET` ||
|| `HANDLER_SECRET` | Придумайте длинный случайный секрет для `key` в URL обработчика ||
|| `PROVIDER_API_URL` | Адрес метода отправки сообщений во внешнем сервисе ||
|| `PROVIDER_API_TOKEN` | Токен доступа к API внешнего сервиса ||
|| `MESSAGE_ID_LOG` | Путь к файлу для хранения `message_id` вне каталога веб-сервера, доступному для записи PHP ||
|#

Передайте `HANDLER_URL` в параметре `HANDLER`. Секрет из URL сохраните на сервере приложения в переменной окружения `HANDLER_SECRET`. Остальные значения также сохраните в переменных окружения PHP.

Методы [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) и [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) работают только в контексте установленного приложения. Вызывайте их из интерфейса приложения через JS SDK или на сервере приложения с OAuth-токеном. Входящий вебхук для этого сценария не подходит: методы вернут ошибку `Application context required`.

Если приложение с интерфейсом выполняет настройку в мастере установки, завершите установку по правилам страницы [Завершение установки приложений](../../settings/app-installation/installation-finish.md).

{% note warning "" %}

URL обработчика из параметра `HANDLER` должен быть доступен из внешней сети. Не используйте `localhost`, адреса локальной сети и самоподписные SSL-сертификаты. Не публикуйте секреты в репозитории и не выводите полный URL обработчика в логи.

{% endnote %}

## 1. Зарегистрируйте провайдера {#register}

Зарегистрируйте провайдера методом [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md). Передайте четыре основных параметра:

- `CODE` — символьный код провайдера. Код отличает провайдера текущего приложения от других провайдеров в Битрикс24. Допустимые символы: `a-z`, `A-Z`, `0-9`, `.`, `-`, `_`
- `TYPE` — тип провайдера. Для СМС-провайдера передайте значение `SMS`
- `HANDLER` — URL обработчика приложения
- `NAME` — название провайдера, которое пользователи увидят в интерфейсе Битрикс24

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'messageservice.sender.add',
        {
            CODE: 'provider1',
            TYPE: 'SMS',
            HANDLER: 'https://provider.example/api/handler.php?key=YOUR_SECRET',
            NAME: 'СМС-провайдер'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- Python

    ```python
    import requests

    rest_url = "https://your-domain.bitrix24.com/rest/messageservice.sender.add"
    payload = {
        "CODE": "provider1",
        "TYPE": "SMS",
        "HANDLER": "https://provider.example/api/handler.php?key=YOUR_SECRET",
        "NAME": "СМС-провайдер",
        "auth": "put_access_token_here",
    }

    response = requests.post(rest_url, json=payload, timeout=30)
    response.raise_for_status()

    result = response.json()
    if "error" in result:
        raise RuntimeError(f"{result['error']}: {result.get('error_description', '')}")

    print(result["result"])
    ```


- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'messageservice.sender.add',
        [
            'CODE' => 'provider1',
            'TYPE' => 'SMS',
            'HANDLER' => 'https://provider.example/api/handler.php?key=YOUR_SECRET',
            'NAME' => 'СМС-провайдер',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```
{% endlist %}

Если провайдер успешно зарегистрирован, метод вернет `true`.

```json
{
    "result": true,
    "time": {
        "start": 1742895600,
        "finish": 1742895600.845505,
        "duration": 0.8455052375793457,
        "processing": 0,
        "date_start": "2025-03-25T10:00:00+03:00",
        "date_finish": "2025-03-25T10:00:00+03:00",
        "operating_reset_at": 1742896200,
        "operating": 0
    }
}
```

Если нужно изменить URL обработчика, название или описание провайдера, вызовите [messageservice.sender.update](../../api-reference/messageservice/messageservice-sender-update.md). Код уже зарегистрированного провайдера можно получить методом [messageservice.sender.list](../../api-reference/messageservice/messageservice-sender-list.md).

## 2. Примите сообщение в обработчике {#handler}

Когда пользователь или автоматизация отправляет сообщение, Битрикс24 вызывает URL из параметра `HANDLER`. Разместите по этому адресу обработчик, который принимает данные сообщения и сведения о сценарии отправки.

Основные поля, которые нужны приложению для отправки сообщения во внешний сервис:

- `message_to` — номер телефона получателя
- `message_body` — текст сообщения
- `message_id` — внешний идентификатор сообщения. Сохраните его, если будете обновлять статус доставки
- `module_id` — инструмент, из которого отправлено сообщение: `crm` для карточки CRM или `bizproc` для бизнес-процесса и робота CRM
- `bindings` — привязки к объектам CRM. Поле приходит, если `module_id=crm`
- `workflow_id`, `document_id`, `document_type` — данные бизнес-процесса. Поля приходят, если `module_id=bizproc`

Если сообщение отправлено из карточки контакта CRM, данные после разбора POST-запроса могут выглядеть так:

```json
{
    "module_id": "crm",
    "bindings": [
        {
            "OWNER_TYPE_ID": 3,
            "OWNER_ID": 123
        }
    ],
    "properties": {
        "phone_number": "+79990000000",
        "message_text": "Ваш код подтверждения: 1234"
    },
    "type": "SMS",
    "code": "provider1",
    "message_id": "65575980fa531ac284c2ee68f81ebebd",
    "message_to": "+79990000000",
    "message_body": "Ваш код подтверждения: 1234",
    "ts": 1742895600
}
```

Битрикс24 отправляет обработчику POST-запрос. В PHP значения доступны в `$_POST`. Разместите следующий код в `handler.php` по адресу, указанному в `HANDLER`. Пример предполагает, что внешний сервис принимает JSON с полями `to`, `text`, `client_message_id` и токен в заголовке `Authorization`. Названия полей, адрес и способ авторизации замените по документации выбранного сервиса.

```php
<?php
$secret = getenv('HANDLER_SECRET');
$providerUrl = getenv('PROVIDER_API_URL');
$providerToken = getenv('PROVIDER_API_TOKEN');
$messageIdLog = getenv('MESSAGE_ID_LOG');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

if (!$secret || !hash_equals($secret, (string)($_GET['key'] ?? ''))) {
    http_response_code(403);
    exit;
}

$messageTo = trim((string)($_POST['message_to'] ?? ''));
$messageBody = (string)($_POST['message_body'] ?? '');
$messageId = (string)($_POST['message_id'] ?? '');
$senderCode = (string)($_POST['code'] ?? '');

if ($messageTo === '' || $messageBody === '' || $messageId === ''
    || strpbrk($messageId, "\r\n") !== false || $senderCode !== 'provider1') {
    http_response_code(400);
    exit;
}

if (!$providerUrl || !$providerToken || !$messageIdLog) {
    http_response_code(500);
    exit;
}

$payload = json_encode([
    'to' => $messageTo,
    'text' => $messageBody,
    'client_message_id' => $messageId,
], JSON_THROW_ON_ERROR);

$request = curl_init($providerUrl);
curl_setopt_array($request, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $providerToken,
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);

$providerResponse = curl_exec($request);
$providerStatus = curl_getinfo($request, CURLINFO_RESPONSE_CODE);
curl_close($request);

if ($providerResponse === false || $providerStatus < 200 || $providerStatus >= 300) {
    error_log('Provider request failed for message_id=' . $messageId);
    http_response_code(502);
    exit;
}

if (file_put_contents($messageIdLog, $messageId . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    exit;
}

http_response_code(200);
```

Переменная `MESSAGE_ID_LOG` должна указывать на доступный для записи файл вне каталога веб-сервера. Обработчик записывает только `message_id`, без номера, текста и токена. В рабочем приложении сохраните идентификатор вместе с ответом внешнего сервиса в своем хранилище: он понадобится, когда сервис сообщит о доставке. Ответ `200` означает, что внешний сервис принял запрос, но сам по себе не подтверждает доставку получателю.

Полный список полей обработчика смотрите в описании метода [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md#handler).

## 3. Отправьте тестовое сообщение

После регистрации провайдера и размещения обработчика отправьте тестовое сообщение из интерфейса Битрикс24.

1. Откройте карточку CRM с телефоном клиента
2. Нажмите **СМС/WhatsApp**
3. Проверьте, что в списке доступен провайдер из вашего приложения
4. Введите текст сообщения и отправьте его
5. Проверьте, что обработчик получил запрос и сохранил `message_id`

Провайдер должен быть доступен и в автоматизации. Откройте настройки роботов CRM, добавьте робота **Отправить СМС** и проверьте список провайдеров. Для приложения это тот же сценарий: Битрикс24 отправит данные сообщения в обработчик из параметра `HANDLER`.

## 4. Обновите статус доставки {#status}

Когда внешний сервис подтвердит доставку, приложение может показать ее статус в Битрикс24. Возьмите `message_id`, сохраненный обработчиком, и передайте в метод [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) параметры:

- `CODE` — код провайдера
- `MESSAGE_ID` — `message_id` из файла `MESSAGE_ID_LOG` или хранилища приложения. Значение `65575980fa531ac284c2ee68f81ebebd` ниже — пример; замените его идентификатором своего сообщения
- `STATUS` — новый статус доставки, например `delivered`

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'messageservice.message.status.update',
        {
            CODE: 'provider1',
            MESSAGE_ID: '65575980fa531ac284c2ee68f81ebebd',
            STATUS: 'delivered'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- Python

    ```python
    import requests

    rest_url = "https://your-domain.bitrix24.com/rest/messageservice.message.status.update"
    payload = {
        "CODE": "provider1",
        "MESSAGE_ID": "65575980fa531ac284c2ee68f81ebebd",
        "STATUS": "delivered",
        "auth": "put_access_token_here",
    }

    response = requests.post(rest_url, json=payload, timeout=30)
    response.raise_for_status()

    result = response.json()
    if "error" in result:
        raise RuntimeError(f"{result['error']}: {result.get('error_description', '')}")

    print(result["result"])
    ```


- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'messageservice.message.status.update',
        [
            'CODE' => 'provider1',
            'MESSAGE_ID' => '65575980fa531ac284c2ee68f81ebebd',
            'STATUS' => 'delivered',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```
{% endlist %}

Если статус успешно обновлен, метод вернет `true`.

```json
{
    "result": true,
    "time": {
        "start": 1742895600,
        "finish": 1742895600.425581,
        "duration": 0.4255819320678711,
        "processing": 0,
        "date_start": "2025-03-25T10:00:00+03:00",
        "date_finish": "2025-03-25T10:00:00+03:00",
        "operating_reset_at": 1742896200,
        "operating": 0
    }
}
```

Метод поддерживает статусы:

- `queued` — сообщение поставлено в очередь на отправку
- `sent` — сообщение отправлено провайдером
- `delivered` — сообщение доставлено получателю
- `undelivered` — сообщение не доставлено получателю
- `failed` — возникла ошибка отправки или обработки сообщения у провайдера

## Проверим результат

1. Проверьте, что метод [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) вернул `result: true`, а провайдер `provider1` появился в списке отправителей в карточке CRM
2. Отправьте сообщение из карточки CRM. Обработчик должен ответить `200`, а в файле `MESSAGE_ID_LOG` появится его `message_id`. Убедитесь, что внешний сервис принял сообщение с тем же идентификатором
3. После подтверждения доставки вызовите [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) с сохраненным `MESSAGE_ID` и статусом `delivered`. Ответ `result: true` подтверждает, что Битрикс24 принял обновление

Статус доставки должен отобразиться у сообщения в карточке CRM.

## Ошибки и диагностика

Если сообщение не отправлено или статус не обновился, проверьте шаг, на котором остановился сценарий:

- провайдер отсутствует в списке — проверьте результат `messageservice.sender.add`, scope `messageservice`, права администратора и URL `HANDLER`; после исправления повторите регистрацию
- `messageservice.sender.add` возвращает `ERROR_SENDER_ALREADY_INSTALLED` — провайдер с таким `CODE` уже зарегистрирован; проверьте его методом [messageservice.sender.list](../../api-reference/messageservice/messageservice-sender-list.md), а URL измените методом [messageservice.sender.update](../../api-reference/messageservice/messageservice-sender-update.md)
- обработчик отвечает `403` — проверьте совпадение секрета в URL `HANDLER` и переменной `HANDLER_SECRET`; затем повторите отправку сообщения
- обработчик отвечает `400` — проверьте наличие `message_to`, `message_body`, `message_id` и кода провайдера `provider1` во входящем POST-запросе; затем повторите отправку
- обработчик отвечает `502` — проверьте адрес, токен и формат запроса к внешнему сервису; после исправления отправьте новое тестовое сообщение
- обработчик отвечает `500` — проверьте переменные окружения и права записи в `MESSAGE_ID_LOG`; затем отправьте новое сообщение
- `messageservice.message.status.update` возвращает `ERROR_MESSAGE_NOT_FOUND` — передайте `message_id` именно из текущего запроса к `HANDLER` и проверьте код провайдера `CODE`; повторите обновление статуса
- метод возвращает `ERROR_MESSAGE_STATUS_INCORRECT` — передайте одно из поддерживаемых значений `STATUS`; повторите обновление статуса
- метод возвращает `Application context required` — вызовите его с OAuth-авторизацией установленного приложения, а не через входящий вебхук

## Что важно учитывать

- Битрикс24 передает сообщение обработчику асинхронно. Успешная отправка из интерфейса и ответ `200` обработчика не доказывают доставку получателю: статус `delivered` передавайте только после подтверждения внешнего сервиса
- При повторной доставке запроса внешний сервис может получить сообщение повторно. Если он поддерживает ключ идемпотентности, используйте для него `message_id`
- Секрет в URL `HANDLER` дает доступ к обработчику. Не записывайте URL с параметром `key` в логи и замените секрет при утечке
- Если приложение обслуживает несколько Битрикс24, связывайте запрос с конкретной установкой приложения

## Продолжите изучение

- [messageservice.sender.list](../../api-reference/messageservice/messageservice-sender-list.md) — получить коды зарегистрированных провайдеров
- [messageservice.sender.update](../../api-reference/messageservice/messageservice-sender-update.md) — изменить URL обработчика
- [Безопасность в обработчиках](../../api-reference/events/safe-event-handlers.md) — проверять токен приложения во входящих запросах
