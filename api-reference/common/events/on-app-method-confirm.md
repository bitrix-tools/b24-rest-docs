# Событие при получении разрешения на использование методов onAppMethodConfirm

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onAppMethodConfirm` вызывается при получении [решения администратора](../../scopes/confirmation.md) портала на использование методов.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
{
    "event" => "ONAPPMETHODCONFIRM",
    "data": {
        "TOKEN" => "fkp963yuv1ggkfbs5z3f5hy8lilm0iw6",
        "METHOD" => "voximplant.user.get",
        "CONFIRMED" => "1",
        "LANGUAGE_ID" => "ru"
    },
    "ts": "1478790852",
    "auth": {
        "domain" => "portal.bitrix24.ru",
        "client_endpoint" => "https://portal.bitrix24.ru/rest/",
        "server_andpoint" => "https://oauth.bitrix24.tech/rest/",
        "member_id" => "74ef8a46a75104de55d5d4a61b98ab6d",
        "application_token" => "c289487163b58658eae5e8b42eaf11b8"
    }
}

```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события — `ONAPPMETHODCONFIRM` ||
|| **data***
[`array`](../../data-types.md) | Данные о разрешенных методах.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../data-types.md) | Дата и время отправки события ||
|| **auth***
[`array`](../../data-types.md) | Данные авторизации и портала.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TOKEN***
[`string`](../../data-types.md) | Авторизационный токен, с которым было запрошено разрешение ||
|| **METHOD***
[`string`](../../data-types.md) | Метод API, разрешение на использование которого было запрошено ||
|| **CONFIRMED***
[`string`](../../data-types.md) | Результат разрешения: `0` — запрещено, `1` — разрешено ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Установленный язык: `ru`, `en` и другие ||
|#

### Параметр auth {#auth}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **domain***
[`string`](../../data-types.md) | Адрес портала Битрикс24 ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токена||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API портала ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный идентификатор портала ||
|| **application_token***
[`string`](../../data-types.md) | Токен для безопасной обработки событий ||
|#

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-user-add.md)
- [{#T}](./on-app-uninstall.md)