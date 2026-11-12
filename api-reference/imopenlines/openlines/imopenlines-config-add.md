# Добавить открытую линию imopenlines.config.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения открытых линий

Метод `imopenlines.config.add` добавляет новую открытую линию.

Чтобы пользователи могли писать в открытую линию, установите настройки коннектора методом [imconnector.connector.data.set](../imconnector/imconnector-connector-data-set.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **PARAMS**
[`object`](../../data-types.md) | Объект с настройками открытой линии [(подробное описание)](#params). Если не передан, линия создается с настройками по умолчанию ||
|#

### Параметр PARAMS {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **LINE_NAME**
[`string`](../../data-types.md) | Название открытой линии, не более 255 символов. Если не передано, название формируется автоматически ||
|| **ACTIVE**
[`char`](../../data-types.md) | Активность линии. Возможные значения:
- `Y` — линия активна
- `N` — линия неактивна

По умолчанию `Y` ||
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

Если передано подразделение, в очередь попадают его сотрудники. Если параметр не передан, очередь остается пустой ||
|| **QUEUE_TYPE**
[`string`](../../data-types.md) | Режим распределения обращений. Возможные значения:
- `evenly` — равномерно распределять обращения между операторами
- `strictly` — направлять обращения строго по порядку очереди
- `all` — направлять обращение всем операторам очереди

По умолчанию `all`. Значение не из списка метод заменяет на `all`. Если тариф Битрикс24 не позволяет режим `all`, линия получает `evenly` ||
|| **QUEUE_TIME**
[`integer`](../../data-types.md) | Время в секундах до перехода обращения к следующему оператору. По умолчанию `60` ||
|| **NO_ANSWER_TIME**
[`integer`](../../data-types.md) | Время в секундах до срабатывания сценария без ответа. По умолчанию `60` ||
|| **WELCOME_MESSAGE**
[`char`](../../data-types.md) | Отправлять приветственное сообщение. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_MESSAGE_TEXT**
[`string`](../../data-types.md) | Текст приветственного сообщения ||
|| **WORKTIME_ENABLE**
[`char`](../../data-types.md) | Учитывать рабочее время линии. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`. Если тариф Битрикс24 не позволяет настраивать рабочее время, метод сохраняет `N` ||
|| **WORKTIME_FROM**
[`string`](../../data-types.md) | Начало рабочего времени: часы и минуты через точку, например `9` или `9.30`. Значение больше `23.30` метод заменяет на `23.30`.

Передавайте вместе с `WORKTIME_TO`. Если одно из значений в другом формате, например `09:00`, метод сохраняет время с `9` до `18.30` ||
|| **WORKTIME_TO**
[`string`](../../data-types.md) | Окончание рабочего времени в том же формате, например `18` или `18.30`. Если значение не больше `WORKTIME_FROM`, метод сдвигает окончание на час после начала ||
|| **WORKTIME_TIMEZONE**
[`string`](../../data-types.md) | Часовой пояс, например `Europe/Kaliningrad` ||
|| **CRM**
[`char`](../../data-types.md) | Искать клиента в CRM. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CRM_CREATE**
[`string`](../../data-types.md) | Что создавать в CRM для нового клиента. Возможные значения:
- `lead` — лид
- `deal` — сделку
- `none` — ничего не создавать

По умолчанию `lead`. Значение не из списка метод заменяет на `lead` ||
|| **VOTE_MESSAGE**
[`char`](../../data-types.md) | Запрашивать оценку качества обслуживания. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LANGUAGE_ID**
[`string`](../../data-types.md) | Язык линии, например `ru`. Метод сохраняет первые два символа ||
|| **CRM_CREATE_SECOND**
[`string`](../../data-types.md) | Идентификатор воронки, в которой создается сделка, если `CRM_CREATE` = `deal`. Получить идентификаторы воронок можно методом [crm.category.list](../../crm/universal/category/crm-category-list.md) с `entityTypeId` = `2`. Если не передан, сделка создается в общей воронке ||
|| **CRM_CREATE_THIRD**
[`char`](../../data-types.md) | Правило для сделок, если `CRM_CREATE` = `deal`. Возможные значения:
- `Y` — правило по умолчанию
- `N` — создавать новую сделку для каждого обращения

По умолчанию `Y` ||
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
[`string`](../../data-types.md) | Источник для создаваемого элемента CRM. Возможные значения:
- `create` — создать для линии отдельный источник по каждому каналу
- идентификатор `STATUS_ID` источника из справочника CRM. Получить список источников можно методом [crm.status.list](../../crm/status/crm-status-list.md) с фильтром `ENTITY_ID` = `SOURCE`

По умолчанию `create`. Если источника с переданным идентификатором нет, линия работает как с `create` ||
|| **MAX_CHAT**
[`integer`](../../data-types.md) | Максимальное число одновременных диалогов у оператора. `0` — без ограничения. По умолчанию `0` ||
|| **TYPE_MAX_CHAT**
[`string`](../../data-types.md) | Тип ограничения `MAX_CHAT`. Возможные значения:
- `answered` — учитывать только диалоги, в которых оператор уже ответил
- `answered_new` — учитывать диалоги с ответом и новые диалоги
- `closed` — учитывать закрытые диалоги

По умолчанию `answered`. Значение не из списка метод заменяет на `answered_new` ||
|| **CATEGORY_ENABLE**
[`char`](../../data-types.md) | Включить категории. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **CATEGORY_ID**
[`integer`](../../data-types.md) | Идентификатор категории. Метод сохраняет значение, только если `CATEGORY_ENABLE` = `Y` ||
|| **SESSION_PRIORITY**
[`integer`](../../data-types.md) | Приоритет сессии в очереди, от `0` до `86400`. По умолчанию `0` ||
|| **WELCOME_BOT_ENABLE**
[`char`](../../data-types.md) | Включить чат-бота приветствия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **WELCOME_BOT_JOIN**
[`string`](../../data-types.md) | Когда подключать бота. Возможные значения:
- `first` — подключать бота только в начале диалога
- `always` — подключать бота в каждом диалоге ||
|| **WELCOME_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Метод сохраняет значение, только если `WELCOME_BOT_ENABLE` = `Y` ||
|| **WELCOME_BOT_TIME**
[`integer`](../../data-types.md) | Через сколько секунд переводить диалог от бота в очередь. По умолчанию `600` ||
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
|| **SHOW_NOTIFICATION_REDIRECT**
[`char`](../../data-types.md) | Показывать в диалоге уведомление, когда обращение переходит к оператору, который начал рабочий день. Возможные значения: `Y` или `N`. По умолчанию значение не задано, уведомление не показывается ||
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
[`array`](../../data-types.md) | Выходные дни. Значения не из списка метод пропускает. Возможные значения элементов:
- `MO` — понедельник
- `TU` — вторник
- `WE` — среда
- `TH` — четверг
- `FR` — пятница
- `SA` — суббота
- `SU` — воскресенье ||
|| **WORKTIME_HOLIDAYS**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) | Праздничные дни в формате `D.MM`: строка через запятую, например `1.01,7.01`, или массив строк. Если формат неверный, метод сохраняет пустой список ||
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
- `text` — отправить текстовое сообщение

По умолчанию `text` ||
|| **CLOSE_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы при закрытии ||
|| **CLOSE_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота при закрытии ||
|| **CLOSE_TEXT**
[`string`](../../data-types.md) | Текст сообщения при закрытии ||
|| **VOTE_TIME_LIMIT**
[`integer`](../../data-types.md) | Лимит времени на голосование. `0` — без ограничения ||
|| **VOTE_CLOSING_DELAY**
[`char`](../../data-types.md) | Закрывать сессию сразу после оценки. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_BEFORE_FINISH**
[`char`](../../data-types.md) | Запрашивать оценку до завершения. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **VOTE_MESSAGE_1_TEXT**
[`string`](../../data-types.md) | Текст запроса оценки в виджете, не более 100 символов ||
|| **VOTE_MESSAGE_1_LIKE**
[`string`](../../data-types.md) | Текст после положительной оценки в виджете, не более 100 символов ||
|| **VOTE_MESSAGE_1_DISLIKE**
[`string`](../../data-types.md) | Текст после отрицательной оценки в виджете, не более 100 символов ||
|| **VOTE_MESSAGE_2_TEXT**
[`string`](../../data-types.md) | Текст запроса оценки во внешних каналах ||
|| **VOTE_MESSAGE_2_LIKE**
[`string`](../../data-types.md) | Текст после положительной оценки во внешних каналах ||
|| **VOTE_MESSAGE_2_DISLIKE**
[`string`](../../data-types.md) | Текст после отрицательной оценки во внешних каналах ||
|| **AUTO_CLOSE_RULE**
[`string`](../../data-types.md) | Сценарий автозакрытия. Возможные значения:
- `none` — не выполнять сценарий
- `text` — отправить текстовое сообщение ||
|| **FULL_CLOSE_TIME**
[`integer`](../../data-types.md) | Время в минутах до полного закрытия диалога после ручного закрытия. По умолчанию `10` ||
|| **AUTO_CLOSE_TIME**
[`integer`](../../data-types.md) | Время в секундах до автозакрытия диалога. По умолчанию `14400` ||
|| **AUTO_CLOSE_FORM_ID**
[`integer`](../../data-types.md) | Идентификатор CRM-формы для автозакрытия ||
|| **AUTO_CLOSE_BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота для автозакрытия ||
|| **AUTO_CLOSE_TEXT**
[`string`](../../data-types.md) | Текст при автозакрытии ||
|| **AUTO_EXPIRE_TIME**
[`integer`](../../data-types.md) | Срок жизни автоматически закрытой сессии в секундах. По умолчанию `86400` ||
|| **TEMPORARY**
[`char`](../../data-types.md) | Создать временную линию. Возможные значения:
- `Y` — создать временную линию. Битрикс24 удалит ее через 8 часов
- `N` — создать постоянную линию

По умолчанию `N` ||
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
|| **AGREEMENT_MESSAGE**
[`char`](../../data-types.md) | Показывать предупреждение о сборе персональных данных. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`. Если передано `Y`, укажите соглашение в `AGREEMENT_ID`, иначе метод вернет `false` ||
|| **AGREEMENT_ID**
[`integer`](../../data-types.md) | Идентификатор соглашения об обработке персональных данных ||
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
          "CRM_SOURCE": "create",
          "CRM_FORWARD": "Y",
          "MAX_CHAT": 4,
          "TYPE_MAX_CHAT": "answered_new",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "9",
          "WORKTIME_TO": "21",
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
          "CRM_SOURCE": "create",
          "CRM_FORWARD": "Y",
          "MAX_CHAT": 4,
          "TYPE_MAX_CHAT": "answered_new",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "9",
          "WORKTIME_TO": "21",
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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'imopenlines.config.add',
        params: {
          PARAMS: {
            LINE_NAME: 'Линия поддержки интернет-магазина',
            QUEUE: [
              { ENTITY_TYPE: 'user', ENTITY_ID: '1' },
              { ENTITY_TYPE: 'user', ENTITY_ID: '15' },
              { ENTITY_TYPE: 'user', ENTITY_ID: '23' },
            ],
            QUEUE_TYPE: 'strictly',
            QUEUE_TIME: 45,
            NO_ANSWER_TIME: 120,
            WELCOME_MESSAGE: 'Y',
            WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
            CRM: 'Y',
            CRM_CREATE: 'deal',
            CRM_SOURCE: 'create',
            CRM_FORWARD: 'Y',
            MAX_CHAT: 4,
            TYPE_MAX_CHAT: 'answered_new',
            WORKTIME_ENABLE: 'Y',
            WORKTIME_FROM: '9',
            WORKTIME_TO: '21',
            WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
            WORKTIME_DAYOFF: ['SA', 'SU'],
            WORKTIME_DAYOFF_RULE: 'text',
            WORKTIME_DAYOFF_TEXT: 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created open line ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addOpenlinesConfig() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.config.add',
            params: {
              PARAMS: {
                LINE_NAME: 'Линия поддержки интернет-магазина',
                QUEUE: [
                  { ENTITY_TYPE: 'user', ENTITY_ID: '1' },
                  { ENTITY_TYPE: 'user', ENTITY_ID: '15' },
                  { ENTITY_TYPE: 'user', ENTITY_ID: '23' },
                ],
                QUEUE_TYPE: 'strictly',
                QUEUE_TIME: 45,
                NO_ANSWER_TIME: 120,
                WELCOME_MESSAGE: 'Y',
                WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                CRM: 'Y',
                CRM_CREATE: 'deal',
                CRM_SOURCE: 'create',
                CRM_FORWARD: 'Y',
                MAX_CHAT: 4,
                TYPE_MAX_CHAT: 'answered_new',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '9',
                WORKTIME_TO: '21',
                WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
                WORKTIME_DAYOFF: ['SA', 'SU'],
                WORKTIME_DAYOFF_RULE: 'text',
                WORKTIME_DAYOFF_TEXT: 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created open line ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addOpenlinesConfig)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imopenlines.config.add(
            params={
                "LINE_NAME": "Линия поддержки интернет-магазина",
                "QUEUE": [
                    {
                        "ENTITY_TYPE": "user",
                        "ENTITY_ID": "1",
                    },
                    {
                        "ENTITY_TYPE": "user",
                        "ENTITY_ID": "15",
                    },
                    {
                        "ENTITY_TYPE": "user",
                        "ENTITY_ID": "23",
                    },
                ],
                "QUEUE_TYPE": "strictly",
                "QUEUE_TIME": 45,
                "NO_ANSWER_TIME": 120,
                "WELCOME_MESSAGE": "Y",
                "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
                "CRM": "Y",
                "CRM_CREATE": "deal",
                "CRM_SOURCE": "create",
                "CRM_FORWARD": "Y",
                "MAX_CHAT": 4,
                "TYPE_MAX_CHAT": "answered_new",
                "WORKTIME_ENABLE": "Y",
                "WORKTIME_FROM": "9",
                "WORKTIME_TO": "21",
                "WORKTIME_TIMEZONE": "Europe/Kaliningrad",
                "WORKTIME_DAYOFF": [
                    "SA",
                    "SU",
                ],
                "WORKTIME_DAYOFF_RULE": "text",
                "WORKTIME_DAYOFF_TEXT": "Сейчас линия не работает. Напишите, и мы ответим в рабочее время",
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                        'CRM_SOURCE' => 'create',
                        'CRM_FORWARD' => 'Y',
                        'MAX_CHAT' => 4,
                        'TYPE_MAX_CHAT' => 'answered_new',
                        'WORKTIME_ENABLE' => 'Y',
                        'WORKTIME_FROM' => '9',
                        'WORKTIME_TO' => '21',
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
                CRM_SOURCE: 'create',
                CRM_FORWARD: 'Y',
                MAX_CHAT: 4,
                TYPE_MAX_CHAT: 'answered_new',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '9',
                WORKTIME_TO: '21',
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
                'CRM_SOURCE' => 'create',
                'CRM_FORWARD' => 'Y',
                'MAX_CHAT' => 4,
                'TYPE_MAX_CHAT' => 'answered_new',
                'WORKTIME_ENABLE' => 'Y',
                'WORKTIME_FROM' => '9',
                'WORKTIME_TO' => '21',
                'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
                'WORKTIME_DAYOFF' => ['SA', 'SU'],
                'WORKTIME_DAYOFF_RULE' => 'text',
                'WORKTIME_DAYOFF_TEXT' => 'Сейчас линия не работает. Напишите, и мы ответим в рабочее время',
            ],
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "imopenlines.config.add", b24.Params{
    	"PARAMS": b24.Params{
    		"LINE_NAME": "Линия поддержки интернет-магазина",
    		"QUEUE": []b24.Params{
    			{
    				"ENTITY_TYPE": "user",
    				"ENTITY_ID":   "1",
    			},
    			{
    				"ENTITY_TYPE": "user",
    				"ENTITY_ID":   "15",
    			},
    			{
    				"ENTITY_TYPE": "user",
    				"ENTITY_ID":   "23",
    			},
    		},
    		"QUEUE_TYPE":           "strictly",
    		"QUEUE_TIME":           45,
    		"NO_ANSWER_TIME":       120,
    		"WELCOME_MESSAGE":      "Y",
    		"WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
    		"CRM":                  "Y",
    		"CRM_CREATE":           "deal",
    		"CRM_SOURCE":           "create",
    		"CRM_FORWARD":          "Y",
    		"MAX_CHAT":             4,
    		"TYPE_MAX_CHAT":        "answered_new",
    		"WORKTIME_ENABLE":      "Y",
    		"WORKTIME_FROM":        "9",
    		"WORKTIME_TO":          "21",
    		"WORKTIME_TIMEZONE":    "Europe/Kaliningrad",
    		"WORKTIME_DAYOFF":      []string{"SA", "SU"},
    		"WORKTIME_DAYOFF_RULE": "text",
    		"WORKTIME_DAYOFF_TEXT": "Сейчас линия не работает. Напишите, и мы ответим в рабочее время",
    	},
    })
    if err != nil {
    	return fmt.Errorf("imopenlines.config.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
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
[`integer`](../../data-types.md) \| [`boolean`](../../data-types.md) | Идентификатор созданной открытой линии.

Метод возвращает `false`, если линию не удалось сохранить, например, при `AGREEMENT_MESSAGE` = `Y` без доступного соглашения в `AGREEMENT_ID` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "CONFIG_WRONG_USER_PERMISSION",
    "error_description": "Permission denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `CONFIG_WRONG_USER_PERMISSION` | Permission denied | Недостаточно прав для создания открытой линии ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}


## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
