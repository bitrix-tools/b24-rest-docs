# Создать чат im.chat.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.add` создаёт чат.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **TYPE**
[`unknown`](../data-types.md) | `CHAT` | Тип чата OPEN \| CHAT (OPEN - открытый для вступления чат, CHAT - обычный чат по приглашениям, по-умолчанию CHAT) | 18 ||
|| **TITLE**
[`unknown`](../data-types.md) | `Мой новый закрытый чат` | Заголовок чата | 18 ||
|| **DESCRIPTION**
[`unknown`](../data-types.md) | `Очень важный чат` | Описание чата | 18 ||
|| **COLOR**
[`unknown`](../data-types.md) | `PINK` | Цвет чата для мобильного приложения: RED, GREEN, MINT, LIGHT_BLUE, DARK_BLUE, PURPLE, AQUA, PINK, LIME, BROWN, AZURE, KHAKI, SAND, MARENGO, GRAY, GRAPHITE | 18 ||
|| **MESSAGE**
[`unknown`](../data-types.md) | `Добро пожаловать в чат` | Первое приветственное сообщение в чате | 18 ||
|| **USERS^*^**
[`unknown`](../data-types.md) | `Array(1,2)` | Участники чата | 18 ||
|| **AVATAR**
[`unknown`](../data-types.md) | `base64 image` | Аватар чата в base64 формате | 18 ||
|| **ENTITY_TYPE**
[`unknown`](../data-types.md) | `CHAT` | Идентификатор сущности, может быть использован для поиска по этому полю и для легкого определения контекста в обработчиках событий [ONIMBOTMESSAGEADD](../chat-bots/messages/events/on-imbot-message-add.md), [ONIMBOTMESSAGEUPDATE](../chat-bots/messages/events/on-imbot-message-update.md), [ONIMBOTMESSAGEDELETE](../chat-bots/messages/events/on-imbot-message-delete.md) | 18 ||
|| **ENTITY_ID**
[`unknown`](../data-types.md) | `13` | Числовой идентификатор сущности, может быть использован для поиска чата и для легкого определения контекста в обработчиках событий  [ONIMBOTMESSAGEADD](../chat-bots/messages/events/on-imbot-message-add.md), [ONIMBOTMESSAGEUPDATE](../chat-bots/messages/events/on-imbot-message-update.md), [ONIMBOTMESSAGEDELETE](../chat-bots/messages/events/on-imbot-message-delete.md) | 18 ||
|| **OWNER_ID**
[`unknown`](../data-types.md) | `39` | Идентификатор владельца чата. Можно не указывать, владельцем будет тот, от кого идёт запрос. | 18 ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](./_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.chat.add',
        Array(
            'TYPE' => 'CHAT',
            'TITLE' => 'Мой новый закрытый чат',
            'DESCRIPTION' => 'Очень важный чат',
            'COLOR' => 'PINK',
            'MESSAGE' => 'Добро пожаловать в чат',
            'USERS' => Array(1,2),
            'AVATAR' => 'base64 image',
            'ENTITY_TYPE' => 'CHAT',
            'ENTITY_ID' => 13,
            'OWNER_ID' => 39,
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": 123
}
```

## Ответ в случае ошибки

```json
{
    "error": "USERS_EMPTY",
    "error_description": "Не переданы участники чата"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **USERS_EMPTY** | Не переданы участники чата ||
|| **WRONG_REQUEST** | Что-то пошло не так ||
|#