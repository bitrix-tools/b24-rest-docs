# Событие при создании системного пользователя приложения ONAPPUSERREADY

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONAPPUSERREADY` вызывается после успешного завершения установки приложения, когда Битрикс24 создал или повторно активировал [системного пользователя](../../../settings/system-user.md) приложения. Локальным приложениям событие не отправляется.

Обработчик переносится вместе с конфигурацией приложения.

Оба события, `ONAPPUSERREADY` и [`ONAPPINSTALL`](./on-app-install.md), вызываются при завершении установки, в том числе после вызова `installFinish`. Отличий два: обработчик `ONAPPUSERREADY` регистрируется автоматически для любого приложения с URL установки, а в `data` события передается долгоживущая авторизация системного пользователя. Если приложению нужна работа без участия сотрудника, опирайтесь на событие `ONAPPUSERREADY`.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONAPPUSERREADY",
    "event_handler_id": "17",
    "data": {
        "access_token": "s1a2b3c4d5e6f70890abcdef1234567890abcd",
        "refresh_token": "r1a2b3c4d5e6f70890abcdef1234567890abcd",
        "expires_in": "3600",
        "scope": "crm,user,task",
        "domain": "oauth.bitrix24.tech",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        "user_id": "512",
        "client_id": "app.573ad8a0346747.09223434",
        "status": "S",
        "date_finish": "1767139200",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1756890123",
    "auth": {
        "access_token": "u9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4",
        "refresh_token": "q9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4",
        "expires_in": "3600",
        "scope": "crm,user,task",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        "user_id": "1",
        "status": "S",
        "application_token": "0f1e2d3c4b5a69788796a5b4c3d2e1f0"
    }
}
```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события.

В данном случае — `ONAPPUSERREADY` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Объект с параметрами авторизации системного пользователя.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../data-types.md) | Дата и время отправки события из очереди ||
|| **auth***
[`object`](../../data-types.md) | Объект с параметрами авторизации и данными о Битрикс24, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token***
[`string`](../../data-types.md) | Токен доступа системного пользователя ||
|| **refresh_token***
[`string`](../../data-types.md) | Токен для продления авторизации системного пользователя ||
|| **expires_in***
[`integer`](../../data-types.md) | Время жизни токена доступа в секундах ||
|| **scope***
[`string`](../../data-types.md) | Список прав, выданных приложению ||
|| **domain***
[`string`](../../data-types.md) | Домен сервера авторизации ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токенов OAuth 2.0 ||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API Битрикс24 ||
|| **member_id***
[`string`](../../data-types.md) | Идентификатор Битрикс24 ||
|| **user_id***
[`integer`](../../data-types.md) | Идентификатор системного пользователя в Битрикс24 ||
|| **client_id***
[`string`](../../data-types.md) | Идентификатор приложения ||
|| **status***
[`string`](../../data-types.md) | Статус приложения.

Возможные значения:

- `F` — бесплатное тиражное приложение
- `S` — подписное тиражное приложение
||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Язык Битрикс24 по умолчанию: `ru`, `en` и другие ||
|| **date_finish**
[`timestamp`](../../data-types.md) | Дата и время окончания подписки, если они известны Битрикс24 ||
|#

{% note info "" %}

Поле `APP_ID` в `data` не передается. Приложение определяет себя по `client_id` и `member_id`.

{% endnote %}

### Параметр auth {#auth}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token**
[`string`](../../data-types.md) | Токен для обращения к API ||
|| **refresh_token**
[`string`](../../data-types.md) | Токен для продления авторизации OAuth 2.0 ||
|| **expires_in**
[`integer`](../../data-types.md) | Время жизни токена доступа в секундах ||
|| **scope**
[`string`](../../data-types.md) | Коды [прав](../../scopes/permissions.md), выданных приложению, через запятую ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токена ||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API Битрикс24 ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный идентификатор Битрикс24 ||
|| **user_id***
[`integer`](../../data-types.md) | Идентификатор сотрудника, который установил приложение ||
|| **status**
[`string`](../../data-types.md) | Статус приложения.

Возможные значения:

- `F` — бесплатное тиражное приложение
- `S` — подписное тиражное приложение
||
|| **application_token***
[`string`](../../data-types.md) | Токен приложения. Сравните его с токеном, сохраненным при установке, чтобы убедиться, что запрос пришел из Битрикс24. Подробнее — в статье [{#T}](../../events/safe-event-handlers.md) ||
|#

## Как обработать событие

1. Проверьте `auth.application_token`
2. Сохраните `data.refresh_token`, `data.member_id` и `data.client_endpoint`
3. Обновляйте токен доступа обычным OAuth-обновлением по сохраненному `refresh_token`
4. Выполняйте фоновые вызовы методов API Битрикс24 под авторизацией системного пользователя

Пример обработчика:

```php
$data = $_POST['data'] ?? [];
$auth = $_POST['auth'] ?? [];

if (($auth['application_token'] ?? '') !== $storedApplicationToken) {
    http_response_code(403);
    exit;
}

saveSystemUserAuth(
    memberId: $data['member_id'],
    domain: $data['client_endpoint'],
    userId: (int)$data['user_id'],
    accessToken: $data['access_token'],
    refreshToken: $data['refresh_token'],
    expiresIn: (int)$data['expires_in'],
);
```

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](../../../settings/system-user.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-uninstall.md)
