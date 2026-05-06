# Добавить открытую линию imopenlines.config.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.config.add` добавляет новую открытую линию.

Чтобы пользователи могли писать в открытую линию, установите настройки коннектора методом [imconnector.connector.data.set](../imconnector/imconnector-connector-data-set.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **PARAMS**
[`object`](../../data-types.md) | Объект с настройками открытой линии [(подробное описание)](#params) ||
|#

### Параметр PARAMS {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **LINE_NAME**
[`string`](../../data-types.md) | Название открытой линии ||
|| **ACTIVE**
[`char`](../../data-types.md) | Активность линии. Возможные значения:
- `Y` — линия активна
- `N` — линия неактивна ||
|| **QUEUE**
[`array`](../../data-types.md) | Очередь операторов. Передается массив объектов с полями `ENTITY_TYPE` и `ENTITY_ID`.

Возможные значения:
- `ENTITY_TYPE` — пользователь `user` или подразделение `department`
- `ENTITY_ID` — идентификатор объекта выбранного типа. Для `user` указывается `ID` пользователя, для `department` — `ID` подразделения

Пример:
```js
[
    {
        "ENTITY_TYPE":"user",
        "ENTITY_ID":"1"
    },
    {
        "ENTITY_TYPE":"department",
        "ENTITY_ID":"10"
    }
]
```
||
|| **QUEUE_TYPE**
[`string`](../../data-types.md) | Режим распределения обращений. Возможные значения:
- `evenly` — равномерно распределять обращения между операторами
- `strictly` — направлять обращения строго по порядку очереди
- `all` — направлять обращение всем операторам очереди ||
|| **QUEUE_TIME**
[`integer`](../../data-types.md) | Время в секундах до перехода обращения к следующему оператору ||
|| **NO_ANSWER_TIME**
[`integer`](../../data-types.md) | Время в секундах до срабатывания сценария без ответа ||
|| **WELCOME_MESSAGE**
[`char`](../../data-types.md) | Отправлять приветственное сообщение. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_MESSAGE_TEXT**
[`string`](../../data-types.md) | Текст приветственного сообщения ||
|| **WORKTIME_ENABLE**
[`char`](../../data-types.md) | Учитывать рабочее время линии. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WORKTIME_FROM**
[`string`](../../data-types.md) | Начало рабочего времени в формате `HH:MM` ||
|| **WORKTIME_TO**
[`string`](../../data-types.md) | Окончание рабочего времени в формате `HH:MM` ||
|| **WORKTIME_TIMEZONE**
[`string`](../../data-types.md) | Часовой пояс, например `Europe/Kaliningrad` ||
|| **CRM**
[`char`](../../data-types.md) | Искать клиента в CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_CREATE**
[`string`](../../data-types.md) | Что создавать в CRM для нового клиента ||
|| **VOTE_MESSAGE**
[`char`](../../data-types.md) | Запрашивать оценку качества обслуживания. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LANGUAGE_ID**
[`string`](../../data-types.md) | Язык линии, например `ru` ||
|| **CRM_CREATE_SECOND**
[`string`](../../data-types.md) | Дополнительный режим создания элемента CRM ||
|| **CRM_CREATE_THIRD**
[`char`](../../data-types.md) | Создавать третий элемент CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_CHAT_TRACKER**
[`char`](../../data-types.md) | Включить чат-трекер для CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_FORWARD**
[`char`](../../data-types.md) | Переводить обращение на ответственного по CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_TRANSFER_CHANGE**
[`char`](../../data-types.md) | Менять ответственного в CRM при переводе диалога. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_SOURCE**
[`string`](../../data-types.md) | Источник для создаваемого элемента CRM ||
|| **MAX_CHAT**
[`integer`](../../data-types.md) | Максимальное число одновременных диалогов у оператора ||
|| **TYPE_MAX_CHAT**
[`string`](../../data-types.md) | Тип ограничения `MAX_CHAT`. Возможные значения:
- `answered` — учитывать только диалоги, в которых оператор уже ответил
- `answered_new` — учитывать диалоги с ответом и новые диалоги
- `closed` — учитывать закрытые диалоги ||
|| **CATEGORY_ENABLE**
[`char`](../../data-types.md) | Включить категории. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CATEGORY_ID**
[`integer`](../../data-types.md) | Идентификатор категории ||
|| **SESSION_PRIORITY**
[`integer`](../../data-types.md) | Приоритет сессии в очереди ||
|| **WELCOME_BOT_ENABLE**
[`char`](../../data-types.md) | Включить чат-бота приветствия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_BOT_JOIN**
[`string`](../../data-types.md) | Когда подключать бота. Возможные значения:
- `first` — подключать бота только в начале диалога
- `always` — подключать бота в каждом диалоге ||
|| **WELCOME_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота ||
|| **WELCOME_BOT_TIME**
[`integer`](../../data-types.md) | Через сколько секунд переводить диалог от бота в очередь ||
|| **WELCOME_BOT_LEFT**
[`string`](../../data-types.md) | Когда отключать бота. Возможные значения:
- `queue` — отключать бота при переводе в очередь операторов
- `close` — отключать бота при закрытии диалога ||
|| **CHECK_AVAILABLE**
[`char`](../../data-types.md) | Проверять доступность оператора при распределении. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WATCH_TYPING**
[`char`](../../data-types.md) | Показывать индикатор набора текста. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SEND_WELCOME_EACH_SESSION**
[`char`](../../data-types.md) | Отправлять приветствие в каждой сессии. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **OPERATOR_DATA**
[`string`](../../data-types.md) | Формат данных об операторе. Возможные значения:
- `profile` — показывать профиль оператора
- `queue` — показывать данные оператора из очереди
- `hide` — скрывать данные оператора ||
|| **DEFAULT_OPERATOR_DATA**
[`object`](../../data-types.md) | Данные оператора по умолчанию. Возможные поля:
- `NAME` — имя оператора
- `AVATAR` — ссылка на аватар оператора
- `AVATAR_ID` — идентификатор файла аватара ||
|| **NO_ANSWER_RULE**
[`string`](../../data-types.md) | Сценарий, если оператор не ответил. Возможные значения:
- `none` — не выполнять сценарий
- `text` — отправить текстовое сообщение ||
|| **NO_ANSWER_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы для сценария без ответа ||
|| **NO_ANSWER_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота для сценария без ответа ||
|| **NO_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст для сценария без ответа ||
|| **WORKTIME_DAYOFF**
[`array`](../../data-types.md) | Выходные дни. Возможные значения элементов:
- `MO` — понедельник
- `TU` — вторник
- `WE` — среда
- `TH` — четверг
- `FR` — пятница
- `SA` — суббота
- `SU` — воскресенье ||
|| **WORKTIME_HOLIDAYS**
[`string`](../../data-types.md) | Праздничные дни в формате строки, перечисленные через запятую `DD.MM,DD.MM` ||
|| **WORKTIME_DAYOFF_RULE**
[`string`](../../data-types.md) | Сценарий в нерабочее время. Возможные значения:
- `none` — не выполнять сценарий
- `text` — отправить текстовое сообщение ||
|| **WORKTIME_DAYOFF_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы для нерабочего времени ||
|| **WORKTIME_DAYOFF_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота для нерабочего времени ||
|| **WORKTIME_DAYOFF_TEXT**
[`string`](../../data-types.md) | Текст сообщения в нерабочее время ||
|| **CLOSE_RULE**
[`string`](../../data-types.md) | Сценарий при закрытии. Возможные значения:
- `none` — не выполнять сценарий
- `text` — отправить текстовое сообщение ||
|| **CLOSE_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы при закрытии ||
|| **CLOSE_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота при закрытии ||
|| **CLOSE_TEXT**
[`string`](../../data-types.md) | Текст сообщения при закрытии ||
|| **VOTE_TIME_LIMIT**
[`integer`](../../data-types.md) | Лимит времени на голосование ||
|| **VOTE_CLOSING_DELAY**
[`char`](../../data-types.md) | Закрывать сессию сразу после оценки. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_BEFORE_FINISH**
[`char`](../../data-types.md) | Запрашивать оценку до завершения. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_MESSAGE_1_TEXT**
[`string`](../../data-types.md) | Текст запроса оценки в виджете ||
|| **VOTE_MESSAGE_1_LIKE**
[`string`](../../data-types.md) | Текст после положительной оценки в виджете ||
|| **VOTE_MESSAGE_1_DISLIKE**
[`string`](../../data-types.md) | Текст после отрицательной оценки в виджете ||
|| **VOTE_MESSAGE_2_TEXT**
[`string`](../../data-types.md) | Текст запроса оценки в внешних каналах ||
|| **VOTE_MESSAGE_2_LIKE**
[`string`](../../data-types.md) | Текст после положительной оценки в внешних каналах ||
|| **VOTE_MESSAGE_2_DISLIKE**
[`string`](../../data-types.md) | Текст после отрицательной оценки в внешних каналах ||
|| **AUTO_CLOSE_RULE**
[`string`](../../data-types.md) | Сценарий автозакрытия. Возможные значения:
- `none` — не выполнять сценарий
- `text` — отправить текстовое сообщение ||
|| **FULL_CLOSE_TIME**
[`integer`](../../data-types.md) | Время полного закрытия после ручного закрытия ||
|| **AUTO_CLOSE_TIME**
[`integer`](../../data-types.md) | Время до автозакрытия ||
|| **AUTO_CLOSE_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы для автозакрытия ||
|| **AUTO_CLOSE_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота для автозакрытия ||
|| **AUTO_CLOSE_TEXT**
[`string`](../../data-types.md) | Текст при автозакрытии ||
|| **AUTO_EXPIRE_TIME**
[`integer`](../../data-types.md) | Срок жизни автоматически закрытой сессии ||
|| **TEMPORARY**
[`char`](../../data-types.md) | Создать временную линию. Возможные значения:
- `Y` — создать временную линию
- `N` — создать постоянную линию ||
|| **QUICK_ANSWERS_IBLOCK_ID**
[`integer`](../../data-types.md) | Идентификатор инфоблока быстрых ответов ||
|| **KPI_FIRST_ANSWER_TIME**
[`integer`](../../data-types.md) | Контроль времени первого ответа ||
|| **KPI_FIRST_ANSWER_ALERT**
[`char`](../../data-types.md) | Включить уведомление о первом ответе. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **KPI_FIRST_ANSWER_LIST**
[`array`](../../data-types.md) | Список получателей уведомления о первом ответе ||
|| **KPI_FIRST_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст уведомления о первом ответе ||
|| **KPI_FURTHER_ANSWER_TIME**
[`integer`](../../data-types.md) | Контроль времени последующих ответов ||
|| **KPI_FURTHER_ANSWER_ALERT**
[`char`](../../data-types.md) | Включить уведомление о последующих ответах. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **KPI_FURTHER_ANSWER_LIST**
[`array`](../../data-types.md) | Список получателей уведомления о последующих ответах ||
|| **KPI_FURTHER_ANSWER_TEXT**
[`string`](../../data-types.md) | Текст уведомления о последующих ответах ||
|| **KPI_CHECK_OPERATOR_ACTIVITY**
[`char`](../../data-types.md) | Контролировать активность оператора. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **USE_WELCOME_FORM**
[`char`](../../data-types.md) | Использовать приветственную CRM-форму. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор приветственной CRM-формы ||
|| **WELCOME_FORM_DELAY**
[`char`](../../data-types.md) | Показывать форму с задержкой. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CONFIRM_CLOSE**
[`char`](../../data-types.md) | Запрашивать подтверждение закрытия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IGNORE_WELCOME_FORM_RESPONSIBLE**
[`char`](../../data-types.md) | Игнорировать ответственного в приветственной форме. Возможные значения:
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
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "CRM": "Y",
          "CRM_CREATE": "deal",
          "CRM_SOURCE": "openline_web",
          "CRM_FORWARD": "Y",
          "MAX_CHAT": 4,
          "TYPE_MAX_CHAT": "answered_new",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad",
          "WORKTIME_DAYOFF": [
            "SA",
            "SU"
          ],
          "WORKTIME_DAYOFF_RULE": "text",
          "WORKTIME_DAYOFF_TEXT": "Сейчас линия не работает. Напишите, и мы ответим в рабочее время"
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "CRM": "Y",
          "CRM_CREATE": "deal",
          "CRM_SOURCE": "openline_web",
          "CRM_FORWARD": "Y",
          "MAX_CHAT": 4,
          "TYPE_MAX_CHAT": "answered_new",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad",
          "WORKTIME_DAYOFF": [
            "SA",
            "SU"
          ],
          "WORKTIME_DAYOFF_RULE": "text",
          "WORKTIME_DAYOFF_TEXT": "Сейчас линия не работает. Напишите, и мы ответим в рабочее время"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.config.add',
            {
                PARAMS: {
                    LINE_NAME: 'Линия поддержки интернет-магазина',
                    QUEUE: [
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '1'
                        },
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '15'
                        },
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '23'
                        }
                    ],
                    QUEUE_TYPE: 'strictly',
                    QUEUE_TIME: 45,
                    NO_ANSWER_TIME: 120,
                    WELCOME_MESSAGE: 'Y',
                    WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                    CRM: 'Y',
                    CRM_CREATE: 'deal',
                    CRM_SOURCE: 'openline_web',
                    CRM_FORWARD: 'Y',
                    MAX_CHAT: 4,
                    TYPE_MAX_CHAT: 'answered_new',
                    WORKTIME_ENABLE: 'Y',
                    WORKTIME_FROM: '09:00',
                    WORKTIME_TO: '21:00',
                    WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
                    WORKTIME_DAYOFF: ['SA', 'SU'],
                    WORKTIME_DAYOFF_RULE: 'text',
                    WORKTIME_DAYOFF_TEXT: 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время'
                }
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
                'imopenlines.config.add',
                [
                    'PARAMS' => [
                        'LINE_NAME' => 'Линия поддержки интернет-магазина',
                        'QUEUE' => [
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '1',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '15',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '23',
                            ],
                        ],
                        'QUEUE_TYPE' => 'strictly',
                        'QUEUE_TIME' => 45,
                        'NO_ANSWER_TIME' => 120,
                        'WELCOME_MESSAGE' => 'Y',
                        'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                        'CRM' => 'Y',
                        'CRM_CREATE' => 'deal',
                        'CRM_SOURCE' => 'openline_web',
                        'CRM_FORWARD' => 'Y',
                        'MAX_CHAT' => 4,
                        'TYPE_MAX_CHAT' => 'answered_new',
                        'WORKTIME_ENABLE' => 'Y',
                        'WORKTIME_FROM' => '09:00',
                        'WORKTIME_TO' => '21:00',
                        'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
                        'WORKTIME_DAYOFF' => ['SA', 'SU'],
                        'WORKTIME_DAYOFF_RULE' => 'text',
                        'WORKTIME_DAYOFF_TEXT' => 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время',
                    ],
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
        'imopenlines.config.add',
        {
            PARAMS: {
                LINE_NAME: 'Линия поддержки интернет-магазина',
                QUEUE: [
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '1'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '15'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '23'
                    }
                ],
                QUEUE_TYPE: 'strictly',
                QUEUE_TIME: 45,
                NO_ANSWER_TIME: 120,
                WELCOME_MESSAGE: 'Y',
                WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                CRM: 'Y',
                CRM_CREATE: 'deal',
                CRM_SOURCE: 'openline_web',
                CRM_FORWARD: 'Y',
                MAX_CHAT: 4,
                TYPE_MAX_CHAT: 'answered_new',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '09:00',
                WORKTIME_TO: '21:00',
                WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
                WORKTIME_DAYOFF: ['SA', 'SU'],
                WORKTIME_DAYOFF_RULE: 'text',
                WORKTIME_DAYOFF_TEXT: 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время'
            }
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
        'imopenlines.config.add',
        [
            'PARAMS' => [
                'LINE_NAME' => 'Линия поддержки интернет-магазина',
                'QUEUE' => [
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '1',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '15',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '23',
                    ],
                ],
                'QUEUE_TYPE' => 'strictly',
                'QUEUE_TIME' => 45,
                'NO_ANSWER_TIME' => 120,
                'WELCOME_MESSAGE' => 'Y',
                'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                'CRM' => 'Y',
                'CRM_CREATE' => 'deal',
                'CRM_SOURCE' => 'openline_web',
                'CRM_FORWARD' => 'Y',
                'MAX_CHAT' => 4,
                'TYPE_MAX_CHAT' => 'answered_new',
                'WORKTIME_ENABLE' => 'Y',
                'WORKTIME_FROM' => '09:00',
                'WORKTIME_TO' => '21:00',
                'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
                'WORKTIME_DAYOFF' => ['SA', 'SU'],
                'WORKTIME_DAYOFF_RULE' => 'text',
                'WORKTIME_DAYOFF_TEXT' => 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время',
            ],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 15,
    "time": {
        "start": 1741688359.737944,
        "finish": 1741688360.028349,
        "duration": 0.2904050350189209,
        "processing": 0.16270899772644043,
        "date_start": "2025-03-11T10:25:59+03:00",
        "date_finish": "2025-03-11T10:26:00+03:00",
        "operating_reset_at": 1741688960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданной открытой линии ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
