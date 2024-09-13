# Блок пользователя USER

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

![Блок пользователя](./_images/user.png)

`USER` - вывод блока с аватаром и именем пользователя.

Поля **AVATAR** (аватар) и **LINK** (ссылка) не являются обязательными.

## Пример

{% list tabs %}

- JS

    ```js
    {
        USER: {
            NAME: "Иван Иванов",
            AVATAR: "https://files.shelenkov.com/bitrix/images/avatar.png",
            LINK: "https://shelenkov.com"
        }
    },
    ```

- PHP

    ```php
    Array(
        "USER" => Array(
            "NAME" => "Иван Иванов",
            "AVATAR" => "https://files.shelenkov.com/bitrix/images/avatar.png",
            "LINK" => "https://shelenkov.com/",
        )
    ),
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

Вместо ключа **LINK** можно использовать и ссылки на сущности:
- `CHAT_ID` - для указания ссылки на чат;
- `BOT_ID` - для указания ссылки на бота;
- `USER_ID` - для указания ссылки на пользователя.