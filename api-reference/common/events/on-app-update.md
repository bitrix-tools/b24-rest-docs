# Событие после обновления приложения onAppUpdate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONAPPUPDATE` вызывается после установки новой версии приложения в Битрикс24. Обработчик получает текущую и предыдущую версии приложения и `application_token`.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md).

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONAPPUPDATE",
    "event_handler_id": "12",
    "data": {
        "VERSION": "3",
        "PREVIOUS_VERSION": "2",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1696527000",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "scope": "crm,user",
        "access_token": "lh8ze36o8ulgrljbyscr36c7ay5sinva",
        "refresh_token": "5f1ih5tsnsb11sc5heg3kp4ywqnjhd09",
        "expires_in": "3600",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
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
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Данные об обновлении приложения.

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
|| **VERSION***
[`string`](../../data-types.md) | Текущая установленная версия приложения ||
|| **PREVIOUS_VERSION***
[`string`](../../data-types.md) | Предыдущая версия до обновления ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Язык Битрикс24 по умолчанию: `ru`, `en` и другие ||
|#

### Параметр auth {#auth}

#|
|| **Название**
`тип` | **Описание** ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **scope**
[`string`](../../data-types.md) | Коды [прав](../../scopes/permissions.md), выданных приложению, через запятую ||
|| **access_token**
[`string`](../../data-types.md) | Токен авторизации OAuth 2.0 ||
|| **refresh_token**
[`string`](../../data-types.md) | Токен для продления авторизации OAuth 2.0 ||
|| **expires_in**
[`integer`](../../data-types.md) | Время жизни токена доступа в секундах ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токена ||
|| **status**
[`string`](../../data-types.md) | Статус приложения, подписавшегося на это событие:

- `L` — локальное приложение
- `F` — бесплатное тиражное приложение
- `S` — подписное тиражное приложение
||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API Битрикс24 ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный идентификатор Битрикс24 ||
|| **application_token***
[`string`](../../data-types.md) | Токен приложения. Сравните его с токеном, сохраненным при установке, чтобы убедиться, что запрос пришел из Битрикс24. Подробнее — в статье [{#T}](../../events/safe-event-handlers.md) ||
|#

Если событие удалось привязать к пользователю, в `auth` приходят `access_token`, `refresh_token`, `expires_in`, `scope` и `status`, [подробнее](../../events/index.md#auth).

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-app-user-ready.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-user-add.md)
- [{#T}](./on-app-uninstall.md)
