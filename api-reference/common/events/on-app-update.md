# Событие после обновления приложения OnAppUpdate

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnAppUpdate` вызывается после установки новой версии приложения в Битрикс24. Событие передает информацию о текущей и предыдущей версиях приложения, а также обновленный `application_token`. Подробнее читайте в статье [{#T}](../../events/safe-event-handlers.md).

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONAPPUPDATE",
    "data": {
        "VERSION": "2.1.0",
        "PREVIOUS_VERSION": "2.0.3",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1696527000",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "scope": "imbot",
        "access_token": "lh8ze36o8ulgrljbyscr36c7ay5sinva",
        "refresh_token": "5f1ih5tsnsb11sc5heg3kp4ywqnjhd09",
        "expires_in": 3600,
        "member_id": "d41d8cd98f00b204e9800998ecf8427e",
        "application_token": "c917d38f6bdb84e9d9e0bfe9d585be73"
    }
}
```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события. В данном случае — `ONAPPUPDATE` ||
|| **data***
[`object`](../../data-types.md) | Данные об обновлении приложения.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../data-types.md) | Дата и время отправки события из очереди ||
|| **auth***
[`object`](../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Установленный язык: `ru`, `en` и другие ||
|| **VERSION***
[`string`](../../data-types.md) | Текущая установленная версия приложения ||
|| **PREVIOUS_VERSION***
[`string`](../../data-types.md) | Предыдущая версия до обновления ||
|#

### Параметр auth {#auth}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **domain***
[`string`](../../data-types.md) | Адрес портала Битрикс24 ||
|| **scope***
[`string`](../../data-types.md) | Список прав, выданных приложению, через пробел ||
|| **access_token***
[`string`](../../data-types.md) | Токен авторизации OAuth 2.0 ||
|| **refresh_token***
[`string`](../../data-types.md) | Токен для продления авторизации OAuth 2.0 ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|| **status***
[`string`](/api-reference/data-types.html) | Статус приложения, подписавшегося на это событие:

- `L` — локальное приложение
- `F` — бесплатное тиражное приложение
- `S` — подписное тиражное приложение
||
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
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-user-add.md)
- [{#T}](./on-app-uninstall.md)
