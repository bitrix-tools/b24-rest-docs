# Блок пользователя USER

Блок `USER` выводит карточку пользователя внутри вложения: имя, аватар и ссылку для перехода.

![Блок пользователя](./_images/user.png)

## Параметры блока

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../../../data-types.md) | Имя, которое отображается в блоке ||
|| **AVATAR**
[`string`](../../../../data-types.md) | URL аватара. Допускаются абсолютные URL (`http://`, `https://`) и относительные пути от корня Битрикс ||
|| **LINK**
[`string`](../../../../data-types.md) | URL перехода по клику на блок. Для навигации внутри мессенджера предпочтительно использовать `USER_ID`, `CHAT_ID`, `BOT_ID` ||
|| **USER_ID**
[`integer`](../../../../data-types.md) | Ссылка на пользователя Битрикс ||
|| **CHAT_ID**
[`integer`](../../../../data-types.md) | Ссылка на чат Битрикс ||
|| **BOT_ID**
[`integer`](../../../../data-types.md) | Ссылка на чат-бота Битрикс ||
|| **NETWORK_ID**
[`string`](../../../../data-types.md) | Ссылка на сетевого пользователя Bitrix24 Network ||
|| **AVATAR_TYPE**
[`string`](../../../../data-types.md) | Тип отображения аватара. Допустимые значения: `USER`, `CHAT`, `BOT` ||
|#

## Пример

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    {
        USER: {
            NAME: 'Иван Иванов',
            AVATAR: 'https://files.shelenkov.com/bitrix/images/avatar.png',
            LINK: 'https://shelenkov.com'
        }
    }
    ```

- PHP

    ```php
    [
        'USER' => [
            'NAME' => 'Иван Иванов',
            'AVATAR' => 'https://files.shelenkov.com/bitrix/images/avatar.png',
            'LINK' => 'https://shelenkov.com'
        ]
    ]
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./links.md)
- [{#T}](./grid.md)
