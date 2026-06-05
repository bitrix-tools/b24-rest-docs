# Обновить бота imbot.v2.Bot.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imbot`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: владелец зарегистрированного бота

Метод `imbot.v2.Bot.update` обновляет свойства бота.

## Параметры метода

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **botId***
[`integer`](../../../../data-types.md) | ID бота ||
|| **botToken**
[`string`](../../../../data-types.md) | Уникальный токен авторизации бота. Обязателен при авторизации через вебхук, не нужен для OAuth.

Передавайте тот же botToken, который был указан при регистрации чат-бота ||
|| **fields***
[`object`](../../../../data-types.md) | Обновляемые поля. Структура объекта описана [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`Тип` | **Описание** ||
|| **properties**
[`object`](../../../../data-types.md) | Свойства профиля бота. Описание параметров — [ниже](#properties) ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Скрытый бот. Допустимые значения: `true`, `false` ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Поддержка реакций. Допустимые значения: `true`, `false` ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Поддержка Открытых линий. Допустимые значения: `true`, `false` ||
|| **backgroundId**
[`string`](../../../../data-types.md) | Фон чата бота. Передайте `null` для сброса на фон пользователя. Доступные значения — в [таблице фонов](./bot-register.md#backgrounds). Невалидное значение нормализуется в `null` ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий: `fetch` или `webhook` ||
|| **webhookUrl**
[`string`](../../../../data-types.md) | URL обработчика событий (применяется при `eventMode = webhook`) ||
|| **botToken**
[`string`](../../../../data-types.md) | Новый `botToken` для ротации токена бота. Авторизация запроса выполняется **старым** токеном, переданным на верхнем уровне в параметре `botToken`. Пустая строка или строка из пробелов игнорируется. Максимальная длина — 40 символов.

Подробнее — в разделе [Ротация botToken](#token-rotation) ||
|#

### Параметр properties {#properties}

#|
|| **Название**
`Тип` | **Описание** ||
|| **name**
[`string`](../../../../data-types.md) | Имя бота ||
|| **lastName**
[`string`](../../../../data-types.md) | Фамилия бота ||
|| **workPosition**
[`string`](../../../../data-types.md) | Должность бота (отображается в профиле) ||
|| **color**
[`string`](../../../../data-types.md) | Цвет аватара, [доступные цвета](../chats/chat-add.md#available-colors). 
Если указан некорректно — игнорируется ||
|| **gender**
[`string`](../../../../data-types.md) | Пол. Допустимые значения: `M`, `F` ||
|| **avatar**
[`file`](../../../../data-types.md) | Аватар. Передавайте строку Base64 без префикса `data:*/*;base64,`.

Как подготовить данные: [Как загружать файлы](../../../../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64) ||
|#

## Ротация botToken {#token-rotation}

Передача `fields.botToken` заменяет текущий токен бота на новый. Авторизация запроса выполняется **старым** токеном на верхнем уровне; новый токен передается в `fields.botToken`.

После успешной ротации:

- Все подписки бота на события `ONIMBOTV2*` перепривязываются к новому `APPLICATION_TOKEN`, если бот работает в режиме `webhook`.
- Старый токен **мгновенно** теряет доступ к боту — последующие запросы с ним вернут ошибку `BOT_OWNERSHIP_ERROR`.

При коллизии (новый токен уже привязан к другому боту) возвращается обобщенная ошибка `BOT_TOKEN_ROTATION_FAILED` без указания причины, чтобы не раскрывать существование чужих токенов.

## Управление подписками на события {#event-subscriptions}

При вызове `Bot.update` подписки бота на события `ONIMBOTV2*` приводятся к актуальному состоянию автоматически:

#|
|| **Изменение** | **Поведение** ||
|| `webhookUrl` меняется (режим остается `webhook`) | Старые восемь подписок на прежний URL **удаляются**, на новый URL создаются восемь новых. Прежний URL перестает получать события ||
|| `eventMode`: `webhook` → `fetch` | Все восемь подписок бота **удаляются**. После перехода события доступны только через [imbot.v2.Event.get](../events/event-get.md) ||
|| `eventMode`: `fetch` → `webhook` | Создаются восемь подписок на указанный `webhookUrl`. Если ранее остались «легаси»-подписки на другой URL — они также удаляются перед созданием новых ||
|| Прочие поля `properties`, `isHidden` и другие | Подписки не изменяются ||
|#

{% note info "" %}

**OAuth-приложения с несколькими ботами:** если одно приложение зарегистрировало нескольких ботов под общим `clientId`, автоматическая очистка подписок при смене `webhookUrl` или `eventMode` пропускается, чтобы не затронуть подписки соседних ботов. Webhook-авторизованные боты с собственным `botToken` такого ограничения не имеют — у каждого из них собственный синтетический `APPLICATION_TOKEN`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","fields":{"properties":{"name":"Updated Bot"},"isHidden":true}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Bot.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"fields":{"properties":{"name":"Updated Bot"},"isHidden":true},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Bot.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Bot.update', {
        botId: 456,
        fields: {
          properties: { name: 'Updated Bot' },
          isHidden: true,
        },
      });

      const { result } = response.getData();
      console.log('result:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Bot.update',
                [
                    'botId' => 456,
                    'fields' => [
                        'properties' => ['name' => 'Updated Bot'],
                        'isHidden' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'result: '. print_r($result, true);
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error: '. $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Bot.update',
        {
            botId: 456,
            fields: {
                properties: { name: 'Updated Bot' },
                isHidden: true,
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Bot.update',
        [
            'botId' => 456,
            'fields' => [
                'properties' => ['name' => 'Updated Bot'],
                'isHidden' => true,
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: '. $result['error_description'];
    } else {
        echo 'Success';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "bot": {
            "id": 456,
            "code": "support_bot",
            "type": "bot",
            "isHidden": true,
            "isSupportOpenline": false,
            "isReactionsEnabled": true,
            "backgroundId": null,
            "language": "ru",
            "moduleId": "rest",
            "eventMode": "fetch",
            "countMessage": 150,
            "countCommand": 3,
            "countChat": 12,
            "countUser": 45
        },
        "users": [
            {
                "id": 456,
                "active": true,
                "name": "Updated Bot",
                "bot": true,
                "type": "bot"
            }
        ]
    },
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Результат обновления ||
|| **result.bot**
[`Bot`](../../entities.md#bot) | Обновленный объект бота в расширенном формате [(подробное описание)](#bot-object) ||
|| **result.users**
[`User[]`](../../entities.md#user) | Массив связанных пользователей [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта Bot {#bot-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор бота ||
|| **code**
[`string`](../../../../data-types.md) | Символьный код бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип бота ||
|| **isHidden**
[`boolean`](../../../../data-types.md) | Бот скрыт от списка контактов ||
|| **isSupportOpenline**
[`boolean`](../../../../data-types.md) | Бот поддерживает открытые линии ||
|| **isReactionsEnabled**
[`boolean`](../../../../data-types.md) | Для сообщений бота включены реакции ||
|| **backgroundId**
[`string|null`](../../../../data-types.md) | ID фона чата или `null` ||
|| **language**
[`string`](../../../../data-types.md) | Язык бота ||
|| **moduleId**
[`string`](../../../../data-types.md) | Идентификатор модуля ||
|| **eventMode**
[`string`](../../../../data-types.md) | Режим доставки событий: `webhook` или `fetch` ||
|| **countMessage**
[`integer`](../../../../data-types.md) | Количество сообщений, отправленных ботом ||
|| **countCommand**
[`integer`](../../../../data-types.md) | Количество зарегистрированных команд ||
|| **countChat**
[`integer`](../../../../data-types.md) | Количество чатов бота ||
|| **countUser**
[`integer`](../../../../data-types.md) | Количество пользователей, взаимодействовавших с ботом ||
|#

### Поля объекта User {#user-object}

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../../../data-types.md) | Имя и фамилия пользователя ||
|| **bot**
[`boolean`](../../../../data-types.md) | Признак пользователя-бота ||
|| **type**
[`string`](../../../../data-types.md) | Тип пользователя ||
|#

Полное описание всех полей объектов — на странице [Объекты и поля](../../entities.md)

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "BOT_NOT_FOUND",
    "error_description": "Bot not found"
}
```

{% include notitle [Обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Bot token is not specified | Не указан `botToken`. Обязателен при авторизации через вебхук ||
|| `BOT_ID_REQUIRED` | Bot ID is required | Не указан `botId` ||
|| `BOT_NOT_FOUND` | Bot not found | Бот не найден ||
|| `BOT_OWNERSHIP_ERROR` | Bot is registered by another application | Бот зарегистрирован другим приложением ||
|| `BOT_INVALID_EVENT_MODE` | Invalid event mode | Невалидный режим доставки событий ||
|| `BOT_INVALID_CALLBACK` | Invalid callback URL | Невалидный URL обработчика ||
|| `BOT_AVATAR_INCORRECT_TYPE` | Avatar must be an image | Аватар должен быть изображением (`image/*`) ||
|| `BOT_AVATAR_INCORRECT_SIZE` | Avatar exceeds maximum size | Размер аватара превышает максимум (5000×5000 px) ||
|| `BOT_TOKEN_ROTATION_FAILED` | Bot token rotation failed | Ротация `botToken` не выполнена. Обобщенный код ошибки — причина не раскрывается, чтобы не подтверждать существование чужих токенов ||
|#

{% include [Системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../change-log.md)
- [{#T}](./bot-register.md)
- [{#T}](./bot-get.md)
- [{#T}](./bot-list.md)
- [{#T}](./bot-unregister.md)
