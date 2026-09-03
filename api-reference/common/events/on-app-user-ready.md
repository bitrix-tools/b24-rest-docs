# Событие создания системного пользователя приложения ONAPPUSERREADY

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: обработчик приложения регистрируется автоматически

Событие `ONAPPUSERREADY` вызывается после успешного завершения установки приложения, когда Битрикс24 создал или повторно активировал [системного пользователя](../../../settings/system-user.md) приложения.

Обработчик события регистрируется автоматически на URL обработчика приложения, который используется для установки. Обработчик переносится вместе с конфигурацией приложения.

В отличие от [`ONAPPINSTALL`](./on-app-install.md), событие `ONAPPUSERREADY` приходит при немедленном и отложенном завершении установки приложения и передает долгоживущую авторизацию системного пользователя. Если приложению нужна работа без участия сотрудника, опирайтесь на событие `ONAPPUSERREADY`.

## Что получает обработчик

Данные передаются POST-запросом в формате form-encoded {.b24-info}

```json
{
    "event": "ONAPPUSERREADY",
    "event_handler_id": "17",
    "data": {
        "access_token": "s1a2b3c4d5e6f70890abcdef1234567890abcd",
        "refresh_token": "r1a2b3c4d5e6f70890abcdef1234567890abcd",
        "expires_in": "3600",
        "scope": "crm,user,task",
        "domain": "oauth.bitrix.info",
        "server_endpoint": "https://oauth.bitrix.info/rest/",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        "user_id": "512",
        "client_id": "app.573ad8a0346747.09223434",
        "status": "L",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1756890123",
    "auth": {
        "access_token": "u9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4",
        "refresh_token": "q9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4",
        "expires_in": "3600",
        "scope": "crm,user,task",
        "domain": "oauth.bitrix.info",
        "server_endpoint": "https://oauth.bitrix.info/rest/",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a1b2c3d4e5f60718293a4b5c6d7e8f90",
        "user_id": "1",
        "status": "L",
        "application_token": "0f1e2d3c4b5a69788796a5b4c3d2e1f0"
    }
}
```

{% note info "" %}

В `data` передается авторизация системного пользователя, а в `auth` — авторизация сотрудника, который установил приложение, и `application_token` для проверки события.

{% endnote %}

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
[`timestamp`](../../data-types.md) | Дата и время отправки события из [очереди событий](../../events/index.md) ||
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

- `L` — локальное приложение
- `S`, `T`, `D`, `P` — варианты тиражного приложения
||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Язык Битрикс24 на момент установки приложения ||
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
|| **access_token***
[`string`](../../data-types.md) | Токен для обращения к API ||
|| **refresh_token***
[`string`](../../data-types.md) | Токен для продления авторизации OAuth 2.0 ||
|| **expires_in***
[`integer`](../../data-types.md) | Время жизни токена доступа в секундах ||
|| **scope***
[`string`](../../data-types.md) | Список прав, выданных приложению ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API Битрикс24 ||
|| **member_id***
[`string`](../../data-types.md) | Идентификатор Битрикс24, на котором произошло событие ||
|| **user_id***
[`integer`](../../data-types.md) | Идентификатор сотрудника, который установил приложение ||
|| **status***
[`string`](../../data-types.md) | Статус приложения.

Возможные значения:

- `L` — локальное приложение
- `S`, `T`, `D`, `P` — варианты тиражного приложения
||
|| **application_token***
[`string`](../../data-types.md) | Токен для безопасной обработки событий ||
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
- [{#T}](../../../settings/system-user.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-uninstall.md)
