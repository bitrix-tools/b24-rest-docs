# Создать чат от лица чат-бота imbot.chat.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.chat.add` создаёт чат от лица чат-бота.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **TYPE**
[`unknown`](../../data-types.md) | `'CHAT'` | OPEN - открытый для вступления чат, CHAT – обычный чат по приглашениям, по умолчанию CHAT | ||
|| **TITLE**
[`unknown`](../../data-types.md) | `'Мой новый закрытый чат'` | Заголовок | ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | `'Очень важные события'` | Описание | ||
|| **COLOR**
[`unknown`](../../data-types.md) | `'PINK'` | Цвет для мобильного приложения - RED, GREEN, MINT, LIGHT_BLUE, DARK_BLUE, PURPLE, AQUA, PINK, LIME, BROWN, AZURE, KHAKI, SAND, MARENGO, GRAY, GRAPHITE | ||
|| **MESSAGE**
[`unknown`](../../data-types.md) | `'Добро пожаловать!'` | Первое приветственное сообщение в чате | ||
|| **USERS^*^**
[`unknown`](../../data-types.md) | `Array(1,2)` | Участники | ||
|| **AVATAR**
[`unknown`](../../data-types.md) | `'/* base64 image */'` | Аватар в base64 формате | ||
|| **ENTITY_TYPE**
[`unknown`](../../data-types.md) | `'CHAT'` | Идентификатор произвольной сущности (например CHAT, CRM, OPENLINES, CALL и тд), может быть использован для поиска чата и для легкого определения контекста в обработчиках событий ONIMBOTMESSAGEADD, ONIMBOTMESSAGEUPDATE, ONIMBOTMESSAGEDELETE | ||
|| **ENTITY_ID**
[`unknown`](../../data-types.md) | `13` | Числовой идентификатор сущности, может быть использован для поиска чата и для легкого определения контекста в обработчиках событий ONIMBOTMESSAGEADD, ONIMBOTMESSAGEUPDATE, ONIMBOTMESSAGEDELETE | ||
|| **OWNER_ID**
[`unknown`](../../data-types.md) | `39` | Идентификатор владельца. Можно не указывать, если вы создаете чат под нужным пользователем | ||
|| **BOT_ID**
[`unknown`](../../data-types.md) | `39` | Идентификатор бота, от которого идет запрос. Можно не указывать, если он всего один | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.chat.add',
        Array(
            'TYPE' => 'CHAT',
            'TITLE' => 'Мой новый закрытый чат',
            'DESCRIPTION' => 'Очень важные события',
            'COLOR' => 'PINK',
            'MESSAGE' => 'Добро пожаловать!',
            'USERS' => Array(1,2),
            'AVATAR' => '/* base64 image */',
            'ENTITY_TYPE' => 'CHAT',
            'ENTITY_ID' => 13,
            'OWNER_ID' => 39,
            'BOT_ID' => 39,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

Числовой идентификатор `CHAT_ID`.

## Ответ в случае ошибки

ошибка

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **USERS_EMPTY** | Не переданы участники чата. ||
|| **WRONG_REQUEST** | Что-то пошло не так. ||
|#