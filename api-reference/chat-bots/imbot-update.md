# Изменить чат-бот imbot.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- не для всех параметров есть пример в таблице
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`imbot`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.update` обновляет данные бота.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **BOT_ID^*^**
[`unknown`](../data-types.md) | `39` | Идентификатор чат-бота, которого нужно изменить | ||
|| **CLIENT_ID**
[`unknown`](../data-types.md) | `''` | строковый идентификатор чат-бота, используется только в режиме Вебхуков | ||
|| **FIELDS^*^**
[`unknown`](../data-types.md) | | Данные для обновления | ||
|| **CODE**
[`unknown`](../data-types.md) | `'newbot'` | Строковой идентификатор чат-бота, уникальный в рамках вашего приложения | ||
|| **EVENT_...^*^**
[`unknown`](../data-types.md) | `'http://www.hazz/chatApi/event.php'` | Ссылка на обработчик событий, поступивших от сервера. Обработчики событий:
- `EVENT_HANDLER` - ссылка на обработчик события отправки сообщения чат-боту.
или
- `EVENT_MESSAGE_ADD` - ссылка на обработчик события отправки сообщения чат-боту.
- `EVENT_WELCOME_MESSAGE` - ссылка на обработчик события открытия диалога с чат-ботом или приглашения его в групповой чат.
- `EVENT_BOT_DELETE` - ссылка на обработчик события удаления чат-бота со стороны клиента.
 | ||
|| **PROPERTIES^*^**
[`unknown`](../data-types.md) | | Обязательное при обновлении данных бота | ||
|| **NAME**
[`unknown`](../data-types.md) | `'UpdatedBot'` | Имя чат-бота | ||
|| **LAST_NAME**
[`unknown`](../data-types.md) | `''` | Фамилия чат-бота | ||
|| **COLOR**
[`unknown`](../data-types.md) | `'MINT'` | Цвет чат-бота для мобильного приложения RED, GREEN, MINT, LIGHT_BLUE, DARK_BLUE, PURPLE, AQUA, PINK, LIME, BROWN, AZURE, KHAKI, SAND, MARENGO, GRAY, GRAPHITE | ||
|| **EMAIL**
[`unknown`](../data-types.md) | `'test2@test.ru'` | E-mail для связи | ||
|| **PERSONAL_BIRTHDAY**
[`unknown`](../data-types.md) | `'2016-03-12'` | День рождения в формате YYYY-mm-dd | ||
|| **WORK_POSITION**
[`unknown`](../data-types.md) | `'Мой второй бот'` | Занимаемая должность, используется как описание чат-бота | ||
|| **PERSONAL_WWW**
[`unknown`](../data-types.md) | `'http://test2.ru'` | Ссылка на сайт | ||
|| **PERSONAL_GENDER**
[`unknown`](../data-types.md) | `'M'` | Пол бота, допустимые значения M - мужской, F - женский, пусто, если не требуется указывать | ||
|| **PERSONAL_PHOTO**
[`unknown`](../data-types.md) | `'/* base64 image */'` | Аватар чат-бота - base64 | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

{% note warning "" %}

Метод **imbot.update** больше не поддерживает изменение полей `TYPE` и `OPENLINE` (im 17.5.10).

{% endnote %}

## Примеры

{% include [Пояснение о restCommand](./_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.update',
        Array(
            'BOT_ID' => 39,
            'CLIENT_ID' => '',
            'FIELDS' => Array(
                'CODE' => 'newbot',
                'EVENT_HANDLER' => 'http://www.hazz/chatApi/event.php',
                'PROPERTIES' => Array(
                    'NAME' => 'UpdatedBot',
                    'LAST_NAME' => '',
                    'COLOR' => 'MINT',
                    'EMAIL' => 'test2@test.ru',
                    'PERSONAL_BIRTHDAY' => '2016-03-12',
                    'WORK_POSITION' => 'Мой второй бот',
                    'PERSONAL_WWW' => 'http://test2.ru',
                    'PERSONAL_GENDER' => 'M',
                    'PERSONAL_PHOTO' => '/* base64 image */',
                )
            )
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

`true`

## Ответ в случае ошибки

ошибка

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **BOT_ID_ERROR** | Чат-бот не найден. ||
|| **APP_ID_ERROR** | Чат-бот не принадлежит этому приложению, работать можно только с чат-ботами, установленными в рамках приложения. ||
|| **EVENT_MESSAGE_ADD_ERROR** | Ссылка обработчик события невалидная или не указана. ||
|| **EVENT_WELCOME_MESSAGE_ERROR** | Ссылка обработчик события невалидная или не указана. ||
|| **EVENT_BOT_DELETE_ERROR** | Ссылка обработчик события невалидная или не указана. ||
|| **NAME_ERROR** | Не указано одно из обязательных полей **NAME** или **LAST_NAME** чат-бота. ||
|| **WRONG_REQUEST** | Что-то пошло не так. ||
|#

## Обработчики событий

Если вам требуется обрабатывать события с помощью разных обработчиков, то вместо `EVENT_HANDLER` вы можете задать каждый обработчик индивидуально:

```php
'EVENT_MESSAGE_ADD' => 'http://www.hazz/chatApi/event.php', // Ссылка на обработчик события отправки сообщения чат-боту
'EVENT_WELCOME_MESSAGE' => 'http://www.hazz/chatApi/event.php', // Ссылка на обработчик события открытия диалога с чат-ботом или приглашения его в групповой чат
'EVENT_BOT_DELETE' => 'http://www.hazz/chatApi/event.php', // Ссылка на обработчик события удаления чат-бота со стороны клиента
'EVENT_MESSAGE_UPDATE' => 'http://www.hazz/chatApi/event.php', // Ссылка на обработчик события подписки на события изменения
'EVENT_MESSAGE_DELETE' => 'http://www.hazz/chatApi/event.php', // Ссылка на обработчик события подписки на события удаления сообщений
```

## Ссылки по теме

[Rest API - События установки и обновления](./events/index.md)
