# Получить список открытых линий imopenlines.config.list.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.config.list.get` получает список открытых линий.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PARAMS**
[`object`](../../data-types.md) | Параметры выборки [(подробное описание)](#params)
||
|| **OPTIONS**
[`object`](../../data-types.md) | Дополнительные опции [(подробное описание)](#options) ||
|#

### Параметр PARAMS {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит [список полей](#result), которые необходимо выбрать.

Можно указывать поля из таблицы [Элемент массива result](#result). Поля `QUEUE`, `QUEUE_USERS_FIELDS`, `CONFIG_QUEUE` возвращаются только через `OPTIONS` ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки списка открытых линий в формате `{"field_1": "value_1", ... "field_N": "value_N"}`

Направление сортировки может принимать значения: 

- `asc` — по возрастанию
- `desc` — по убыванию

Для `field_N` используйте поля из таблицы [Элемент массива result](#result). Поля `QUEUE`, `QUEUE_USERS_FIELDS`, `CONFIG_QUEUE` не поддерживаются в `order`

||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации списка открытых линий в формате `{"field_1": "value_1", ... "field_N": "value_N"}`

Для `field_N` используйте поля из таблицы [Элемент массива result](#result). Поля `QUEUE`, `QUEUE_USERS_FIELDS`, `CONFIG_QUEUE` не поддерживаются в `filter` ||
|| **limit**
[`integer`](../../data-types.md) | Количество элементов на страницу. По умолчанию: `50`. Максимальное значение: `200` ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для постраничной выборки. По умолчанию: `0` ||
|#

### Параметр OPTIONS {#options}

#|
|| **Название**
`тип` | **Описание** ||
|| **QUEUE**
[`char`](../../data-types.md) | Возвращать очередь операторов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CONFIG_QUEUE**
[`char`](../../data-types.md) | Возвращать очередь линии. Каждый элемент очереди содержит `ENTITY_TYPE` и `ENTITY_ID`. Возможные значения:
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
          "select": ["ID", "LINE_NAME", "ACTIVE"],
          "order": {"ID": "ASC"},
          "filter": {"ACTIVE": "Y"},
          "limit": 50,
          "offset": 0
        },
        "OPTIONS": {
          "QUEUE": "Y",
          "CONFIG_QUEUE": "Y"
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.list.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PARAMS": {
          "select": ["ID", "LINE_NAME", "ACTIVE"],
          "order": {"ID": "ASC"},
          "filter": {"ACTIVE": "Y"},
          "limit": 50,
          "offset": 0
        },
        "OPTIONS": {
          "QUEUE": "Y",
          "CONFIG_QUEUE": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.list.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.config.list.get',
            {
                PARAMS: {
                    select: ['ID', 'LINE_NAME', 'ACTIVE'],
                    order: { ID: 'ASC' },
                    filter: { ACTIVE: 'Y' },
                    limit: 50,
                    offset: 0
                },
                OPTIONS: {
                    QUEUE: 'Y',
                    CONFIG_QUEUE: 'Y'
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
                'imopenlines.config.list.get',
                [
                    'PARAMS' => [
                        'select' => ['ID', 'LINE_NAME', 'ACTIVE'],
                        'order' => ['ID' => 'ASC'],
                        'filter' => ['ACTIVE' => 'Y'],
                        'limit' => 50,
                        'offset' => 0,
                    ],
                    'OPTIONS' => [
                        'QUEUE' => 'Y',
                        'CONFIG_QUEUE' => 'Y',
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
        'imopenlines.config.list.get',
        {
            PARAMS: {
                select: ['ID', 'LINE_NAME', 'ACTIVE'],
                order: { ID: 'ASC' },
                filter: { ACTIVE: 'Y' },
                limit: 50,
                offset: 0
            },
            OPTIONS: {
                QUEUE: 'Y',
                CONFIG_QUEUE: 'Y'
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
        'imopenlines.config.list.get',
        [
            'PARAMS' => [
                'select' => ['ID', 'LINE_NAME', 'ACTIVE'],
                'order' => ['ID' => 'ASC'],
                'filter' => ['ACTIVE' => 'Y'],
                'limit' => 50,
                'offset' => 0,
            ],
            'OPTIONS' => [
                'QUEUE' => 'Y',
                'CONFIG_QUEUE' => 'Y',
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
    "result": [
        {
            "ID": "15",
            "LINE_NAME": "Линия поддержки VIP",
            "ACTIVE": "Y",
            "QUEUE": [101, 205],
            "QUEUE_USERS_FIELDS": {
                "101": {
                    "USER_NAME": "Иван Петров",
                    "USER_WORK_POSITION": "Оператор",
                    "USER_AVATAR": "https://example.bitrix24.ru/upload/main/a1b/avatar.jpg",
                    "USER_AVATAR_ID": 312
                },
                "205": {
                    "USER_NAME": "Анна Смирнова",
                    "USER_WORK_POSITION": null,
                    "USER_AVATAR": "",
                    "USER_AVATAR_ID": null
                }
            },
            "CONFIG_QUEUE": [
                {
                    "ENTITY_ID": "10",
                    "ENTITY_TYPE": "department"
                }
            ]
        },
        {
            "ID": "16",
            "LINE_NAME": "Линия продаж",
            "ACTIVE": "Y",
            "QUEUE": [101],
            "QUEUE_USERS_FIELDS": {
                "101": {
                    "USER_NAME": "Иван Петров",
                    "USER_WORK_POSITION": "Оператор",
                    "USER_AVATAR": "https://example.bitrix24.ru/upload/main/a1b/avatar.jpg",
                    "USER_AVATAR_ID": 312
                }
            },
            "CONFIG_QUEUE": []
        }
    ],
    "time": {
        "start": 1741688574.50636,
        "finish": 1741688574.701981,
        "duration": 0.19562101364135742,
        "processing": 0.09473705291748047,
        "date_start": "2025-03-11T10:29:34+03:00",
        "date_finish": "2025-03-11T10:29:34+03:00",
        "operating_reset_at": 1741689174,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список открытых линий [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

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
[`array`](../../data-types.md) | Идентификаторы операторов в очереди. 

Поле возвращается при `OPTIONS.QUEUE = "Y"` ||
|| **QUEUE_USERS_FIELDS**
[`object`](../../data-types.md) | Дополнительные поля пользователей очереди. Ключ — идентификатором пользовател, значение — описание полей очереди [(подробное описание)](#queue-users-fields-item). 

Поле возвращается при `OPTIONS.QUEUE = "Y"`  ||
|| **CONFIG_QUEUE**
[`array`](../../data-types.md) | Упорядоченный список объектов очереди линии [(подробное описание)](#config-queue-item-fields).

Поле возвращается при `OPTIONS.CONFIG_QUEUE = "Y"`  ||
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

#### Объект QUEUE_USERS_FIELDS {#queue-users-fields-item}

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

#### Объект CONFIG_QUEUE {#config-queue-item-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта в очереди ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта в очереди ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_FORMAT",
    "error_description": "A wrong format for the PARAMS field 'filter' is passed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `INVALID_FORMAT` | A wrong format for the PARAMS field 'select' is passed | Поле `PARAMS.select` передано не массивом ||
|| `400` | `INVALID_FORMAT` | A wrong format for the PARAMS field 'order' is passed | Поле `PARAMS.order` передано в неверном формате ||
|| `400` | `INVALID_FORMAT` | A wrong format for the PARAMS field 'filter' is passed | Поле `PARAMS.filter` передано в неверном формате ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
