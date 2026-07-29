# Как вызывать методы чат-бота 2.0 и обновлять токен авторизации

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы чат-ботов `imbot.v2` вызываются так же, как остальные методы REST API, но способ авторизации меняет состав параметров запроса и определяет, нужно ли обновлять токен доступа. Правила ниже относятся только к `imbot.v2`: вызов устаревших методов `imbot.*` описан на странице [Как вызывать методы устаревших чат-ботов](./outdated/send-command.md).

Чтобы вызывать методы от имени бота, зарегистрируйте бота методом [imbot.v2.Bot.register](./chat-bots-v2/imbot.v2/bots/bot-register.md). Для OAuth-сценария приложение должно быть установлено в Битрикс24: первую пару токенов Битрикс24 выдает при установке. Как получить и сохранить эту пару, описано в [сценариях установки приложений](../../settings/app-installation/index.md).

Параметры, ответы и коды ошибок отдельных методов описаны на страницах методов раздела [Чат-боты 2.0](./chat-bots-v2/index.md). Если сообщения нужно отправлять не от имени бота, а от имени пользователя, используйте методы `im.*` раздела [Чаты](../chats/index.md) — авторизация в них устроена иначе, `botToken` не участвует.

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять методы: владелец зарегистрированного бота — приложение или вебхук, от имени которого бот был зарегистрирован. Исключения: [imbot.v2.Bot.register](./chat-bots-v2/imbot.v2/bots/bot-register.md) — авторизованный пользователь, [imbot.v2.Revision.get](./chat-bots-v2/imbot.v2/revision-get.md) — любой пользователь

## Какие токены участвуют в вызове {#tokens}

В вызовах бота встречаются четыре разных токена. Обновлять нужно только `access_token`.

#|
|| **Токен** | **Где передается** | **Откуда берется** | **Срок жизни** ||
|| Код вебхука — в схемах URL обозначен как `{webhook_token}` | В пути запроса: `/rest/{user_id}/{webhook_token}/{method}`, где `{user_id}` — ID пользователя, создавшего вебхук | Создается в интерфейсе Битрикс24 при настройке [входящего вебхука](../../local-integrations/local-webhooks.md) | Действует, пока вебхук не удален ||
|| `botToken` | Параметром запроса вместе с `botId` | Задается вами в `fields.botToken` при регистрации бота методом [imbot.v2.Bot.register](./chat-bots-v2/imbot.v2/bots/bot-register.md) | Действует, пока вы не измените его методом [imbot.v2.Bot.update](./chat-bots-v2/imbot.v2/bots/bot-update.md) ||
|| `access_token` | Параметром `auth` | Выдается [сервером OAuth](../../settings/oauth/index.md) при установке приложения и заново — при каждом [обновлении пары токенов](#refresh). Приложение с интерфейсом получает готовый токен в параметре `AUTH_ID` при каждом открытии — это [упрощенный вариант получения токенов](../../settings/oauth/simple-way.md) | Один час ||
|| `refresh_token` | Не передается в вызовах методов — только в запросе на обновление пары токенов | Выдается сервером OAuth вместе с `access_token` | 180 дней ||
|#

`botToken` — это не токен OAuth, он не истекает и не участвует в обновлении авторизации. Он идентифицирует бота при webhook-вызове: по нему Битрикс24 определяет владельца бота вместо `client_id` приложения.

## Как выбрать способ авторизации {#auth-modes}

#|
|| **Критерий** | **Входящий вебхук** | **OAuth** ||
|| Когда применять | Локальная интеграция, AI-агент, тестирование в одном Битрикс24 | Приложение из Маркета или внутреннее приложение, работающее в нескольких Битрикс24 ||
|| Формат запроса | `POST https://{portal}/rest/{user_id}/{webhook_token}/{method}` | `POST https://{portal}/rest/{method}` с параметром `auth`. Токен можно передать и в query-строке — `?auth={access_token}`, и в теле запроса ||
|| Параметр `botToken` | Обязателен для всех методов `imbot.v2`, кроме [imbot.v2.Revision.get](./chat-bots-v2/imbot.v2/revision-get.md). В [imbot.v2.Bot.register](./chat-bots-v2/imbot.v2/bots/bot-register.md) передается внутри `fields.botToken`, в остальных методах — верхнеуровневым параметром | Не нужен: бот привязан к приложению через `client_id` ||
|| Обновление токена | Не требуется | Требуется, когда истек `access_token` ||
|#

Вызовы через входящий вебхук выполняются только по протоколу HTTPS: при обращении по HTTP вернется ошибка `INVALID_REQUEST` с описанием `Https required`. Такие вызовы выполняются с правами пользователя, создавшего вебхук, и в рамках выбранного для вебхука scope.

Развернутое описание обоих способов — в разделе [Авторизация](./chat-bots-v2/index.md#auth).

## Базовый вызов метода {#basic-call}

Ниже — вызов метода [imbot.v2.Chat.Message.send](./chat-bots-v2/imbot.v2/messages/chat-message-send.md) в двух вкладках cURL, по одной на способ авторизации, и через готовую обертку PHP CRest.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat5","fields":{"message":"Введите строку поиска"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"botId":456,"dialogId":"chat5","fields":{"message":"Введите строку поиска"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'imbot.v2.Chat.Message.send',
      [
          'botId' => 456,
          // 'botToken' => 'my_bot_token', // только при webhook-авторизации
          'dialogId' => 'chat5',
          'fields' => [
              'message' => 'Введите строку поиска',
          ],
      ]
  );

  if (!empty($result['error'])) {
      echo 'Error: ' . $result['error_description'];
  } else {
      echo 'Message ID: ' . $result['result']['id'];
  }
  ```

{% endlist %}

`botId` возвращает метод [imbot.v2.Bot.register](./chat-bots-v2/imbot.v2/bots/bot-register.md) при регистрации бота. Формат `dialogId` — `chat{chatId}` для групповых чатов и `{userId}` для личных, подробнее: [Формат dialogId](./chat-bots-v2/index.md#dialog-id).

Примеры того же вызова на JS, PHP и BX24.js — в разделе «Примеры кода» на странице метода [imbot.v2.Chat.Message.send](./chat-bots-v2/imbot.v2/messages/chat-message-send.md).

{% note warning "" %}

Готовые обертки не подставляют `botToken` автоматически — при webhook-авторизации добавляйте его в параметры вызова сами.

{% endnote %}

### Что возвращает вызов {#response}

Ответ любого метода состоит из блока `result` с данными метода и служебного блока `time` со временем выполнения запроса. Для `imbot.v2.Chat.Message.send` блок `result` выглядит так:

```json
{
    "result": {
        "id": 789,
        "uuidMap": {}
    }
}
```

Состав `result` у каждого метода свой и описан в разделе «Возвращаемые данные» на его странице.

## Ошибки авторизации {#auth-errors}

#|
|| **Код** | **Причина** | **Что делать** ||
|| `BOT_TOKEN_NOT_SPECIFIED` | Webhook-вызов без параметра `botToken` | Передать `botToken`, заданный при регистрации бота ||
|| `BOT_OWNERSHIP_ERROR` | Бот с указанным `botId` принадлежит другому приложению или был зарегистрирован с другим `botToken` | Вызывать методы бота из того же приложения, которое его зарегистрировало, либо передавать тот же `botToken`, что был указан при регистрации ||
|| `expired_token` | Истек `access_token` | Обновить пару токенов и повторить запрос, порядок описан в разделе [Обновление OAuth-токена](#refresh) ||
|| `NO_AUTH_FOUND` | Неверный `access_token` или код вебхука | Проверить данные авторизации ||
|| `insufficient_scope` | У токена нет прав `imbot` | Добавить scope `imbot` в настройки приложения или вебхука и получить авторизацию заново ||
|#

Системные ошибки `expired_token` и `NO_AUTH_FOUND` возвращаются со статусом `401`, `insufficient_scope` — со статусом `403`. Полный список: [Коды ошибок](../../error-codes.md).

## Обновление OAuth-токена {#refresh}

Раздел относится только к OAuth-сценарию.

### Когда обновлять токен {#when-to-refresh}

Обновляйте токен по факту ошибки, а не по расписанию:

1. Вызовите метод с сохраненным `access_token`.
2. Если вернулась ошибка `expired_token` со статусом `401` — запросите новую пару токенов по сохраненному `refresh_token`.
3. Сохраните новую пару токенов на своей стороне: вместе с `access_token` сервер возвращает новое значение `refresh_token`, дальше используйте его.
4. Повторите исходный запрос с новым `access_token`.

Если сервер авторизации не вернул новую пару, значит истек сам `refresh_token` или приложение удалено с Битрикс24. Восстановить авторизацию запросом уже нельзя — приложение нужно установить заново и сохранить выданные при установке токены.

{% note alert "" %}

Не обновляйте токен превентивно — перед каждым вызовом, раз в час или по расписанию. Это создает лишнюю нагрузку на сервер авторизации, из-за которой приложение может быть заблокировано автоматикой. Подробнее: [Автоматическое продление токенов OAuth 2.0](../../settings/oauth/auto-renewal.md)

{% endnote %}

### Чем обновлять токен {#refresh-tools}

Готовые обертки берут обновление на себя:

- [PHP CRest](../../sdk/crest-php-sdk/index.md) — набор PHP-файлов для своего веб-сервера, нужен модуль cURL. Продлевает токены автоматически и хранит их сам
- [b24phpsdk](../../sdk/b24phpsdk/index.md) — Composer-пакет с типизированными сервисами, нужен PHP 8.2 и выше. Обновляет истекший `access_token` и сообщает об этом событием `AuthTokenRenewedEvent`, сохранение новой пары реализует разработчик
- [b24jssdk](../../sdk/b24jssdk/index.md) — библиотека для JavaScript, подключается через npm. Обновляет пару при ошибке `expired_token`, сохранение новой пары реализует разработчик

Функция `restAuth` ниже нужна, когда вы вызываете REST API собственным кодом без обертки.

### Функция restAuth {#rest-auth}

Функция обменивает сохраненный `refresh_token` на новую пару токенов. Константы `CLIENT_ID` и `CLIENT_SECRET` — это код и секретный ключ приложения из партнерского кабинета или из карточки локального приложения в Битрикс24.

Обновление выполняется GET-запросом к серверу авторизации с четырьмя параметрами в query-строке: `grant_type=refresh_token`, `client_id`, `client_secret` и `refresh_token`. Адрес сервера зависит от региона лицензии и возвращается в поле `domain` ответа на запрос токенов. Если приложение работает в нескольких регионах, берите хост из поля `domain`, а не из константы.

```php
const OAUTH_SERVER = 'https://oauth.bitrix24.tech/oauth/token/';
const CLIENT_ID = '**put_your_client_id_here**';
const CLIENT_SECRET = '**put_your_client_secret_here**';

/**
 * Refresh OAuth token pair.
 *
 * @param array $auth Saved authorization data with refresh_token
 *
 * @return array|false New token pair or false if refresh failed
 */
function restAuth(array $auth)
{
    if (!CLIENT_ID || !CLIENT_SECRET || empty($auth['refresh_token']))
    {
        return false;
    }

    $queryData = http_build_query(
        [
            'grant_type' => 'refresh_token',
            'client_id' => CLIENT_ID,
            'client_secret' => CLIENT_SECRET,
            'refresh_token' => $auth['refresh_token'],
        ]
    );

    $curl = curl_init();

    curl_setopt_array(
        $curl,
        [
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => OAUTH_SERVER . '?' . $queryData,
        ]
    );

    $result = curl_exec($curl);
    curl_close($curl);

    $tokens = json_decode($result, true);

    return empty($tokens['access_token']) ? false : $tokens;
}
```

Сервер возвращает JSON, из которого нужно сохранить четыре поля:

- `access_token` — новый токен доступа для параметра `auth`
- `refresh_token` — новое значение, старое больше не используйте
- `expires_in` — время жизни `access_token` в секундах
- `domain` — домен сервера авторизации для следующего обновления

Полный состав ответа сервера авторизации описан на странице [Автоматическое продление токенов OAuth 2.0](../../settings/oauth/auto-renewal.md).

### Как использовать restAuth {#rest-auth-usage}

`callRest` в примере — ваша функция вызова метода, которая подставляет `access_token` в параметр `auth`.

```php
$params = [
    'botId' => 456,
    'dialogId' => 'chat5',
    'fields' => ['message' => 'Введите строку поиска'],
];

$result = callRest('imbot.v2.Chat.Message.send', $params, $auth['access_token']);

if (($result['error'] ?? '') === 'expired_token')
{
    $newAuth = restAuth($auth);

    if ($newAuth === false)
    {
        // refresh_token истек или приложение удалено — нужна повторная установка приложения
        error_log('Token refresh failed');
    }
    else
    {
        $auth = $newAuth;
        saveAuth($auth); // сохраните новую пару токенов в своем хранилище
        $result = callRest('imbot.v2.Chat.Message.send', $params, $auth['access_token']);
    }
}
```

## Хранение секретов {#secrets}

Секретами считайте код вебхука вместе с его URL, `CLIENT_SECRET`, `refresh_token` и `botToken`:

- храните их только на своем сервере — код вебхука дает полный доступ к REST API в рамках своего scope и не требует отдельного подтверждения
- не передавайте их в браузер, ссылки и журналы приложения
- не сохраняйте их в репозитории — выносите в переменные окружения или защищенное хранилище

Общие правила безопасности интеграции — [Рекомендации по безопасности](../../settings/cloud-and-on-premise/security-recommendations.md).

## Частые источники путаницы {#pitfalls}

Два места, где похожие названия означают разные вещи:

- в `fields.*` вложены параметры, описывающие содержимое — текст сообщения, свойства бота, настройки команды. Идентификаторы и служебные параметры вроде `botId`, `dialogId`, `botToken`, `offset` передаются верхним уровнем запроса
- `eventMode` бота не связан со способом авторизации: бот с webhook-авторизацией может работать в режиме `fetch`, а бот приложения с OAuth — в режиме `webhook`. Сами режимы доставки событий описаны в разделе [Режимы доставки событий](./chat-bots-v2/index.md#event-modes)

## Продолжите изучение

- [{#T}](./chat-bots-v2/quick-start.md) — первый бот от регистрации до ответа на сообщение
- [{#T}](./chat-bots-v2/index.md) — все методы раздела, типы ботов, лимиты и формат `dialogId`
- [{#T}](./chat-bots-v2/imbot.v2/bots/bot-register.md) — где задается `botToken` и выбирается `eventMode`
- [{#T}](./chat-bots-v2/imbot.v2/messages/chat-message-send.md) — параметры, ответ и коды ошибок метода из примеров
- [{#T}](../../settings/oauth/auto-renewal.md) — полный цикл работы с токенами OAuth
- [Как вызывать методы устаревших чат-ботов](./outdated/send-command.md) — только для интеграций на устаревших методах `imbot.*`
