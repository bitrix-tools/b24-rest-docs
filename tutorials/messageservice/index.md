# Как подключить СМС-провайдера к Битрикс24

> Scope: [`messageservice`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: администратор управляет провайдерами. Отправитель сообщения или администратор обновляет статус доставки.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

СМС-провайдер связывает Битрикс24 с внешним сервисом отправки сообщений. После регистрации провайдера пользователи смогут отправлять сообщения из карточки CRM, роботов и бизнес-процессов.

Канал доставки не обязательно должен быть СМС. Провайдер может передавать сообщение в любой сервис, который определяет получателя по номеру телефона.

{% note info "" %}

Подробный разбор сценария смотрите в уроке [Интеграция с СМС](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=266&LESSON_ID=25566).

{% endnote %}

## Как работает интеграция {#workflow}

В сценарии участвуют три стороны:

- Битрикс24 — показывает провайдера в интерфейсе и передает данные сообщения приложению
- приложение-провайдер — принимает запрос от Битрикс24 и связывает его с внешним сервисом отправки
- внешний сервис — отправляет сообщение получателю

Перед отправкой код приложения регистрирует провайдера методом [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md). В запросе он передает `HANDLER` — URL обработчика на сервере приложения. Этот URL заранее готовит разработчик приложения: обработчик должен быть доступен из интернета и принимать запросы от Битрикс24.

Когда пользователь или робот отправляет сообщение, Битрикс24 вызывает `HANDLER` и передает приложению номер получателя, текст сообщения и служебные данные. Приложение отправляет сообщение во внешний сервис, а затем может передать в Битрикс24 статус доставки.

В сценарии будем использовать методы:

1. [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) — зарегистрируем СМС-провайдера
2. [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) — обновим статус доставки сообщения

Дальше разберем этот сценарий по шагам: подготовим приложение, зарегистрируем провайдера, проверим отправку из Битрикс24 и настроим обработку статусов.

## 1. Подготавливаем приложение {#start}

Для проверки сценария создадим [приложение](../../settings/app-installation/index.md) или [локальное приложение](../../settings/app-installation/local-apps/index.md). Приложению нужен scope [`messageservice`](../../api-reference/scopes/permissions.md), сохраненные данные авторизации после установки и обработчик на внешнем сервере.

Методы [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md) и [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) работают только в контексте установленного приложения. Вызывайте их из интерфейса приложения через JS SDK или на сервере приложения с OAuth-токеном. Входящий вебхук для этого сценария не подходит: методы вернут ошибку `Application context required`.

Если приложение с интерфейсом выполняет настройку в мастере установки, завершите установку по правилам страницы [Завершение установки приложений](../../settings/app-installation/installation-finish.md).

{% note info "" %}

URL обработчика из параметра `HANDLER` должен быть доступен из внешней сети. Не используйте `localhost`, адреса локальной сети и самоподписные SSL-сертификаты.

{% endnote %}

## 2. Регистрируем провайдера {#register}

Провайдер регистрируется методом [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md). В запросе приложению нужно передать четыре основных параметра:

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
            HANDLER: 'https://provider.example/api/handler',
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'messageservice.sender.add',
        [
            'CODE' => 'provider1',
            'TYPE' => 'SMS',
            'HANDLER' => 'https://provider.example/api/handler',
            'NAME' => 'СМС-провайдер',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    ```python
    import requests

    rest_url = "https://your-domain.bitrix24.com/rest/messageservice.sender.add"
    payload = {
        "CODE": "provider1",
        "TYPE": "SMS",
        "HANDLER": "https://provider.example/api/handler",
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

## 3. Проверяем отправку из Битрикс24

После регистрации провайдера отправьте тестовое сообщение из интерфейса Битрикс24.

1. Откройте карточку CRM с телефоном клиента
2. Нажмите **СМС/WhatsApp**
3. Проверьте, что в списке доступен провайдер из вашего приложения
4. Введите текст сообщения и отправьте его
5. Проверьте, что обработчик получил запрос

Провайдер должен быть доступен и в автоматизации. Откройте настройки роботов CRM, добавьте робота **Отправить СМС** и проверьте список провайдеров. Для приложения это тот же сценарий: Битрикс24 отправит данные сообщения в обработчик из параметра `HANDLER`.

## 4. Обрабатываем запрос Битрикс24 {#handler}

Когда пользователь или автоматизация отправляет сообщение, Битрикс24 вызывает URL из параметра `HANDLER`. Обработчик получает данные сообщения и сведения о сценарии, из которого оно отправлено.

Основные поля, которые нужны приложению для отправки сообщения во внешний сервис:

- `message_to` — номер телефона получателя
- `message_body` — текст сообщения
- `message_id` — внешний идентификатор сообщения. Сохраните его, если будете обновлять статус доставки
- `module_id` — инструмент, из которого отправлено сообщение: `crm` для карточки CRM или `bizproc` для бизнес-процесса и робота CRM
- `bindings` — привязки к объектам CRM. Поле приходит, если `module_id=crm`
- `workflow_id`, `document_id`, `document_type` — данные бизнес-процесса. Поля приходят, если `module_id=bizproc`

Если сообщение отправлено из карточки контакта CRM, входящие данные могут выглядеть так:

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

Полный список полей обработчика смотрите в описании метода [messageservice.sender.add](../../api-reference/messageservice/messageservice-sender-add.md#handler).

## 5. Обновляем статус доставки {#status}

Если внешний сервис возвращает результат доставки, приложение может показать его в Битрикс24. Для этого сохраните `message_id` из запроса к обработчику и передайте в метод [messageservice.message.status.update](../../api-reference/messageservice/messageservice-message-status-update.md) параметры:

- `CODE` — код провайдера
- `MESSAGE_ID` — сохраненный `message_id`
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
