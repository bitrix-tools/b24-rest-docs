# Получить открытую линию по идентификатору imopenlines.config.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.config.get` получает настройки открытой линии по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Получить идентификатор открытой линии можно при [создании открытой линии](./imopenlines-config-add.md) или методом [получения списка открытых линий](./imopenlines-config-list-get.md) ||
|| **WITH_QUEUE**
[`char`](../../data-types.md) | Возвращать данные очереди операторов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_OFFLINE**
[`char`](../../data-types.md) | Возвращать офлайн-операторов в очереди. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "WITH_QUEUE": "Y",
        "SHOW_OFFLINE": "Y"
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "WITH_QUEUE": "Y",
        "SHOW_OFFLINE": "Y",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.config.get',
            {
                CONFIG_ID: 15,
                WITH_QUEUE: 'Y',
                SHOW_OFFLINE: 'Y'
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.get',
                [
                    'CONFIG_ID' => 15,
                    'WITH_QUEUE' => 'Y',
                    'SHOW_OFFLINE' => 'Y',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.config.get',
        {
            CONFIG_ID: 15,
            WITH_QUEUE: 'Y',
            SHOW_OFFLINE: 'Y'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.config.get',
        [
            'CONFIG_ID' => 15,
            'WITH_QUEUE' => 'Y',
            'SHOW_OFFLINE' => 'Y',
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "22",
        "ACTIVE": "Y",
        "LINE_NAME": "Документация Битрикс24",
        "CRM": "N",
        "CRM_CREATE": "lead",
        "CRM_CREATE_SECOND": "0",
        "CRM_CREATE_THIRD": "Y",
        "CRM_FORWARD": "Y",
        "CRM_CHAT_TRACKER": "N",
        "CRM_TRANSFER_CHANGE": "Y",
        "CRM_SOURCE": "create",
        "QUEUE_TIME": "60",
        "NO_ANSWER_TIME": "60",
        "QUEUE_TYPE": "evenly",
        "CHECK_AVAILABLE": "Y",
        "WATCH_TYPING": "N",
        "WELCOME_BOT_ENABLE": "Y",
        "WELCOME_MESSAGE": "N",
        "WELCOME_MESSAGE_TEXT": "Добро пожаловать в открытую линию [b]«Документация Битрикс24»[/b][br]Вам ответит первый освободившийся оператор.",
        "VOTE_MESSAGE": "Y",
        "VOTE_TIME_LIMIT": "0",
        "VOTE_BEFORE_FINISH": "Y",
        "VOTE_CLOSING_DELAY": "Y",
        "VOTE_MESSAGE_1_TEXT": "Пожалуйста, оцените качество обслуживания.",
        "VOTE_MESSAGE_1_LIKE": "Спасибо за оценку!",
        "VOTE_MESSAGE_1_DISLIKE": "Очень жаль, что мы не смогли помочь вам, мы постараемся стать лучше.",
        "VOTE_MESSAGE_2_TEXT": "Пожалуйста, оцените качество обслуживания.\r\n\r\nОтправьте: 1 - хорошо, 0 - плохо",
        "VOTE_MESSAGE_2_LIKE": "Спасибо за оценку!",
        "VOTE_MESSAGE_2_DISLIKE": "Очень жаль, что мы не смогли помочь вам, мы постараемся стать лучше.",
        "AGREEMENT_MESSAGE": "N",
        "AGREEMENT_ID": "0",
        "CATEGORY_ENABLE": "N",
        "CATEGORY_ID": "0",
        "WELCOME_BOT_JOIN": "always",
        "WELCOME_BOT_ID": "597",
        "WELCOME_BOT_TIME": "180",
        "WELCOME_BOT_LEFT": "close",
        "NO_ANSWER_RULE": "text",
        "NO_ANSWER_FORM_ID": "0",
        "NO_ANSWER_BOT_ID": "0",
        "NO_ANSWER_TEXT": "К сожалению, в данный момент мы не можем вам ответить, мы обязательно с вами свяжемся.",
        "WORKTIME_ENABLE": "Y",
        "WORKTIME_FROM": "0",
        "WORKTIME_TO": "23.59",
        "WORKTIME_TIMEZONE": "Europe/Kaliningrad",
        "WORKTIME_HOLIDAYS": [
            ""
        ],
        "WORKTIME_DAYOFF": [
            ""
        ],
        "WORKTIME_DAYOFF_RULE": "text",
        "WORKTIME_DAYOFF_FORM_ID": "0",
        "WORKTIME_DAYOFF_BOT_ID": "0",
        "WORKTIME_DAYOFF_TEXT": "К сожалению, в данный момент мы не можем вам ответить.[br][br]Напишите свой вопрос и мы обязательно свяжемся с вами в рабочее время.",
        "CLOSE_RULE": "text",
        "CLOSE_FORM_ID": "0",
        "CLOSE_BOT_ID": "0",
        "CLOSE_TEXT": "Спасибо, что обратились к нам, пожалуйста, оцените качество обслуживания.",
        "FULL_CLOSE_TIME": "0",
        "AUTO_CLOSE_RULE": "none",
        "AUTO_CLOSE_FORM_ID": "0",
        "AUTO_CLOSE_BOT_ID": "0",
        "AUTO_CLOSE_TIME": "3600",
        "AUTO_CLOSE_TEXT": "",
        "AUTO_EXPIRE_TIME": "86400",
        "DATE_CREATE": {},
        "DATE_MODIFY": {},
        "MODIFY_USER_ID": "27",
        "TEMPORARY": "N",
        "XML_ID": null,
        "LANGUAGE_ID": "ru",
        "QUICK_ANSWERS_IBLOCK_ID": "181",
        "SESSION_PRIORITY": "0",
        "TYPE_MAX_CHAT": "answered_new",
        "MAX_CHAT": "0",
        "OPERATOR_DATA": "profile",
        "DEFAULT_OPERATOR_DATA": [],
        "KPI_FIRST_ANSWER_TIME": "0",
        "KPI_FIRST_ANSWER_ALERT": "N",
        "KPI_FIRST_ANSWER_LIST": null,
        "KPI_FIRST_ANSWER_TEXT": "Сотрудник #OPERATOR# превысил допустимое время ответа клиенту на первое сообщение. Диалог №#DIALOG#.",
        "KPI_FURTHER_ANSWER_TIME": "0",
        "KPI_FURTHER_ANSWER_ALERT": "N",
        "KPI_FURTHER_ANSWER_LIST": null,
        "KPI_FURTHER_ANSWER_TEXT": "Сотрудник #OPERATOR# превысил допустимое время ответа клиенту на сообщение. Диалог №#DIALOG#.",
        "KPI_CHECK_OPERATOR_ACTIVITY": "N",
        "SEND_NOTIFICATION_EMPTY_QUEUE": "N",
        "USE_WELCOME_FORM": "N",
        "WELCOME_FORM_ID": "111",
        "WELCOME_FORM_DELAY": "Y",
        "SEND_WELCOME_EACH_SESSION": "Y",
        "CONFIRM_CLOSE": "Y",
        "IGNORE_WELCOME_FORM_RESPONSIBLE": "N",
        "QUEUE": [
            "27",
            "103"
        ],
        "QUEUE_FULL": {
            "27": {
                "ID": "245",
                "SORT": "0",
                "USER_ID": "27",
                "DEPARTMENT_ID": "0",
                "USER_NAME": null,
                "USER_WORK_POSITION": null,
                "USER_AVATAR": null,
                "USER_AVATAR_ID": "0"
            },
            "103": {
                "ID": "251",
                "SORT": "1",
                "USER_ID": "103",
                "DEPARTMENT_ID": "0",
                "USER_NAME": null,
                "USER_WORK_POSITION": null,
                "USER_AVATAR": null,
                "USER_AVATAR_ID": "0"
            }
        },
        "QUEUE_USERS_FIELDS": {
            "27": {
                "USER_NAME": null,
                "USER_WORK_POSITION": null,
                "USER_AVATAR": null,
                "USER_AVATAR_ID": "0"
            },
            "103": {
                "USER_NAME": null,
                "USER_WORK_POSITION": null,
                "USER_AVATAR": null,
                "USER_AVATAR_ID": "0"
            }
        },
        "QUEUE_ONLINE": "Y"
    },
    "time": {
        "start": 1773663905,
        "finish": 1773663905.742784,
        "duration": 0.7427840232849121,
        "processing": 0,
        "date_start": "2026-03-16T15:25:05+03:00",
        "date_finish": "2026-03-16T15:25:05+03:00",
        "operating_reset_at": 1773664505,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Значение результата. Возможные значения:
- `object` — объект с настройками открытой линии [(подробное описание)](#result)
- `false` — линия с указанным `CONFIG_ID` не существует ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор открытой линии ||
|| **LINE_NAME**
[`string`](../../data-types.md) | Название открытой линии ||
|| **ACTIVE**
[`string`](../../data-types.md) | Признак активности линии. Возможные значения:
- `Y` — линия активна
- `N` — линия неактивна ||
|| **CRM**
[`string`](../../data-types.md) | Признак работы с CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_CREATE**
[`string`](../../data-types.md) | Сценарий создания элемента CRM ||
|| **CRM_CREATE_SECOND**
[`string`](../../data-types.md) | Дополнительный режим создания элемента CRM ||
|| **CRM_CREATE_THIRD**
[`string`](../../data-types.md) | Дополнительный режим создания элемента CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_FORWARD**
[`string`](../../data-types.md) | Признак перенаправления в CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_CHAT_TRACKER**
[`string`](../../data-types.md) | Признак отправки диалога в трекер CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_TRANSFER_CHANGE**
[`string`](../../data-types.md) | Признак смены ответственного при переводе. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_SOURCE**
[`string`](../../data-types.md) | Режим работы с источником в CRM ||
|| **QUEUE_TYPE**
[`string`](../../data-types.md) | Режим распределения обращений ||
|| **QUEUE_TIME**
[`string`](../../data-types.md) | Время перехода обращения к следующему оператору ||
|| **NO_ANSWER_TIME**
[`string`](../../data-types.md) | Время до срабатывания сценария без ответа ||
|| **CHECK_AVAILABLE**
[`string`](../../data-types.md) | Проверять доступность операторов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WATCH_TYPING**
[`string`](../../data-types.md) | Показывать набор текста оператором. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_BOT_ENABLE**
[`string`](../../data-types.md) | Признак использования приветственного бота. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_MESSAGE**
[`string`](../../data-types.md) | Признак приветственного сообщения. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_MESSAGE_TEXT**
[`string`](../../data-types.md) | Текст приветственного сообщения ||
|| **VOTE_MESSAGE**
[`string`](../../data-types.md) | Признак запроса оценки. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_TIME_LIMIT**
[`string`](../../data-types.md) | Ограничение времени для оценки ||
|| **VOTE_BEFORE_FINISH**
[`string`](../../data-types.md) | Запрашивать оценку до завершения диалога. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_CLOSING_DELAY**
[`string`](../../data-types.md) | Использовать задержку закрытия после оценки. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_MESSAGE_1_TEXT**
[`string`](../../data-types.md) | Текст первого сценария оценки ||
|| **VOTE_MESSAGE_1_LIKE**
[`string`](../../data-types.md) | Текст при положительной оценке по первому сценарию ||
|| **VOTE_MESSAGE_1_DISLIKE**
[`string`](../../data-types.md) | Текст при отрицательной оценке по первому сценарию ||
|| **VOTE_MESSAGE_2_TEXT**
[`string`](../../data-types.md) | Текст второго сценария оценки ||
|| **VOTE_MESSAGE_2_LIKE**
[`string`](../../data-types.md) | Текст при положительной оценке по второму сценарию ||
|| **VOTE_MESSAGE_2_DISLIKE**
[`string`](../../data-types.md) | Текст при отрицательной оценке по второму сценарию ||
|| **AGREEMENT_MESSAGE**
[`string`](../../data-types.md) | Признак вывода сообщения о согласии. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **AGREEMENT_ID**
[`string`](../../data-types.md) | Идентификатор согласия ||
|| **CATEGORY_ENABLE**
[`string`](../../data-types.md) | Признак использования категорий. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CATEGORY_ID**
[`string`](../../data-types.md) | Идентификатор категории ||
|| **WELCOME_BOT_JOIN**
[`string`](../../data-types.md) | Режим подключения приветственного бота ||
|| **WELCOME_BOT_ID**
[`string`](../../data-types.md) | Идентификатор приветственного бота ||
|| **WELCOME_BOT_TIME**
[`string`](../../data-types.md) | Время ожидания подключения приветственного бота ||
|| **WELCOME_BOT_LEFT**
[`string`](../../data-types.md) | Режим отключения приветственного бота ||
|| **NO_ANSWER_RULE**
[`string`](../../data-types.md) | Сценарий при отсутствии ответа оператора ||
|| **NO_ANSWER_FORM_ID**
[`string`](../../data-types.md) | Идентификатор формы сценария отсутствия ответа ||
|| **NO_ANSWER_BOT_ID**
[`string`](../../data-types.md) | Идентификатор бота сценария отсутствия ответа ||
|| **NO_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст сообщения при отсутствии ответа ||
|| **WORKTIME_ENABLE**
[`string`](../../data-types.md) | Признак учета рабочего времени. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WORKTIME_FROM**
[`string`](../../data-types.md) | Начало рабочего времени ||
|| **WORKTIME_TO**
[`string`](../../data-types.md) | Конец рабочего времени ||
|| **WORKTIME_TIMEZONE**
[`string`](../../data-types.md) | Часовой пояс рабочего времени ||
|| **WORKTIME_HOLIDAYS**
[`array`](../../data-types.md) | Массив праздничных дней ||
|| **WORKTIME_DAYOFF**
[`array`](../../data-types.md) | Массив выходных дней ||
|| **WORKTIME_DAYOFF_RULE**
[`string`](../../data-types.md) | Сценарий обработки обращений в нерабочее время ||
|| **WORKTIME_DAYOFF_FORM_ID**
[`string`](../../data-types.md) | Идентификатор формы сценария нерабочего времени ||
|| **WORKTIME_DAYOFF_BOT_ID**
[`string`](../../data-types.md) | Идентификатор бота сценария нерабочего времени ||
|| **WORKTIME_DAYOFF_TEXT**
[`string`](../../data-types.md) | Текст сообщения в нерабочее время ||
|| **CLOSE_RULE**
[`string`](../../data-types.md) | Сценарий закрытия диалога ||
|| **CLOSE_FORM_ID**
[`string`](../../data-types.md) | Идентификатор формы закрытия ||
|| **CLOSE_BOT_ID**
[`string`](../../data-types.md) | Идентификатор бота закрытия ||
|| **CLOSE_TEXT**
[`string`](../../data-types.md) | Текст сообщения при закрытии ||
|| **FULL_CLOSE_TIME**
[`string`](../../data-types.md) | Время полного закрытия сессии ||
|| **AUTO_CLOSE_RULE**
[`string`](../../data-types.md) | Сценарий автозакрытия ||
|| **AUTO_CLOSE_FORM_ID**
[`string`](../../data-types.md) | Идентификатор формы автозакрытия ||
|| **AUTO_CLOSE_BOT_ID**
[`string`](../../data-types.md) | Идентификатор бота автозакрытия ||
|| **AUTO_CLOSE_TIME**
[`string`](../../data-types.md) | Время до автозакрытия ||
|| **AUTO_CLOSE_TEXT**
[`string`](../../data-types.md) | Текст автозакрытия ||
|| **AUTO_EXPIRE_TIME**
[`string`](../../data-types.md) | Время истечения активности ||
|| **DATE_CREATE**
[`object`](../../data-types.md) | Дата создания настройки в сериализованном виде ||
|| **DATE_MODIFY**
[`object`](../../data-types.md) | Дата изменения настройки в сериализованном виде ||
|| **MODIFY_USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, изменившего настройки ||
|| **TEMPORARY**
[`string`](../../data-types.md) | Признак временной линии. Возможные значения:
- `Y` — временная линия
- `N` — постоянная линия ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор. Возможные значения:
- `string` — внешний идентификатор задан
- `null` — внешний идентификатор не задан ||
|| **LANGUAGE_ID**
[`string`](../../data-types.md) | Язык линии ||
|| **QUICK_ANSWERS_IBLOCK_ID**
[`string`](../../data-types.md) | Идентификатор инфоблока быстрых ответов ||
|| **SESSION_PRIORITY**
[`string`](../../data-types.md) | Приоритет сессии ||
|| **TYPE_MAX_CHAT**
[`string`](../../data-types.md) | Режим ограничения активных диалогов на оператора ||
|| **MAX_CHAT**
[`string`](../../data-types.md) | Максимум активных диалогов на оператора ||
|| **OPERATOR_DATA**
[`string`](../../data-types.md) | Режим отображения данных оператора ||
|| **QUEUE**
[`array`](../../data-types.md) | Идентификаторы операторов в очереди ||
|| **QUEUE_FULL**
[`object`](../../data-types.md) | Данные элементов очереди. Ключ объекта — идентификатор пользователя, значение — очередь [(подробное описание)](#result-queue-full-item) ||
|| **QUEUE_USERS_FIELDS**
[`object`](../../data-types.md) | Поля пользователей очереди. Ключ объекта — идентификатор пользователя, значение — описание пользователя [(подробное описание)](#result-queue-users-fields-item) ||
|| **QUEUE_ONLINE**
[`string`](../../data-types.md) | Признак проверки онлайна операторов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **DEFAULT_OPERATOR_DATA**
[`array`](../../data-types.md) | Набор полей отображения оператора по умолчанию ||
|| **KPI_FIRST_ANSWER_TIME**
[`string`](../../data-types.md) | Норматив времени первого ответа ||
|| **KPI_FIRST_ANSWER_ALERT**
[`string`](../../data-types.md) | Признак уведомления о просрочке первого ответа. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **KPI_FIRST_ANSWER_LIST**
[`array`](../../data-types.md) | Список получателей уведомлений о первом ответе. Возможные значения:
- `array` — список получателей задан
- `null` — список получателей не задан ||
|| **KPI_FIRST_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст уведомления о просрочке первого ответа ||
|| **KPI_FURTHER_ANSWER_TIME**
[`string`](../../data-types.md) | Норматив времени последующих ответов ||
|| **KPI_FURTHER_ANSWER_ALERT**
[`string`](../../data-types.md) | Признак уведомления о просрочке последующих ответов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **KPI_FURTHER_ANSWER_LIST**
[`array`](../../data-types.md) | Список получателей уведомлений о последующих ответах. Возможные значения:
- `array` — список получателей задан
- `null` — список получателей не задан ||
|| **KPI_FURTHER_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст уведомления о просрочке последующих ответов ||
|| **KPI_CHECK_OPERATOR_ACTIVITY**
[`string`](../../data-types.md) | Признак контроля активности оператора. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SEND_NOTIFICATION_EMPTY_QUEUE**
[`string`](../../data-types.md) | Признак уведомлений о пустой очереди. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **USE_WELCOME_FORM**
[`string`](../../data-types.md) | Признак использования приветственной формы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_FORM_ID**
[`string`](../../data-types.md) | Идентификатор приветственной формы ||
|| **WELCOME_FORM_DELAY**
[`string`](../../data-types.md) | Признак задержки показа приветственной формы. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SEND_WELCOME_EACH_SESSION**
[`string`](../../data-types.md) | Показывать приветствие в каждой сессии. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CONFIRM_CLOSE**
[`string`](../../data-types.md) | Требовать подтверждение закрытия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IGNORE_WELCOME_FORM_RESPONSIBLE**
[`string`](../../data-types.md) | Игнорировать ответственного в приветственной форме. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

#### Объект QUEUE_FULL {#result-queue-full-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор записи элемента очереди ||
|| **SORT**
[`string`](../../data-types.md) | Позиция в очереди ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор пользователя ||
|| **DEPARTMENT_ID**
[`string`](../../data-types.md) | Идентификатор подразделения ||
|| **USER_NAME**
[`string`](../../data-types.md) | Имя пользователя. Возможные значения:
- `string` — имя пользователя задано
- `null` — имя пользователя не задано ||
|| **USER_WORK_POSITION**
[`string`](../../data-types.md) | Должность пользователя. Возможные значения:
- `string` — должность задана
- `null` — должность не задана ||
|| **USER_AVATAR**
[`string`](../../data-types.md) | Ссылка на аватар. Возможные значения:
- `string` — ссылка на аватар задана
- `null` — аватар не задан ||
|| **USER_AVATAR_ID**
[`string`](../../data-types.md) | Идентификатор файла аватара ||
|#

#### Объект QUEUE_USERS_FIELDS {#result-queue-users-fields-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_NAME**
[`string`](../../data-types.md) | Имя пользователя. Возможные значения:
- `string` — имя пользователя задано
- `null` — имя пользователя не задано ||
|| **USER_WORK_POSITION**
[`string`](../../data-types.md) | Должность пользователя. Возможные значения:
- `string` — должность задана
- `null` — должность не задана ||
|| **USER_AVATAR**
[`string`](../../data-types.md) | Ссылка на аватар. Возможные значения:
- `string` — ссылка на аватар задана
- `null` — аватар не задан ||
|| **USER_AVATAR_ID**
[`string`](../../data-types.md) | Идентификатор файла аватара ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CONFIG_ID_EMPTY",
    "error_description": "Config ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CONFIG_ID_EMPTY` | Config ID can't be empty | Параметр `CONFIG_ID` не передан или передан некорректно ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
