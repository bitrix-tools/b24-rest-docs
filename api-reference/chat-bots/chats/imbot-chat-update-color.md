# Изменить цвет чата imbot.chat.updateColor

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.chat.updateColor` обновляет цвет чата.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID**
[`unknown`](../../data-types.md) | `13` | Идентификатор чата | ||
|| **COLOR**
[`unknown`](../../data-types.md) | `'MINT'` | Цвет чата для мобильного приложения - RED, GREEN, MINT, LIGHT_BLUE, DARK_BLUE, PURPLE, AQUA, PINK, LIME, BROWN, AZURE, KHAKI, SAND, MARENGO, GRAY, GRAPHITE | ||
|| **BOT_ID**
[`unknown`](../../data-types.md) | `39` | Идентификатор чат-бота, от которого идет запрос. Можно не указывать, если чат-бот всего один | ||
|#

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.chat.updateColor',
        Array(
            'CHAT_ID' => 13,
            'COLOR' => 'MINT',
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

`true`

## Ответ в случае ошибки

ошибка

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **CHAT_ID_EMPTY** | Не передан идентификатор чата. ||
|| **WRONG_COLOR** | Цвет не входит в список доступных цветов. ||
|| **WRONG_REQUEST** | Цвет уже установлен или указанный чат не существует. ||
|#


