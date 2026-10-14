# Событие о решении администратора по запросу метода с подтверждением onAppMethodConfirm

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONAPPMETHODCONFIRM` вызывается, когда администратор Битрикс24 разрешает или запрещает приложению вызов [метода с подтверждением](../../scopes/confirmation.md). Событие приходит только в то приложение, которое запросило разрешение.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md).

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONAPPMETHODCONFIRM",
    "event_handler_id": "15",
    "data": {
        "TOKEN": "fkp963yuv1ggkfbs5z3f5hy8lilm0iw6",
        "METHOD": "voximplant.user.get",
        "CONFIRMED": "1",
        "LANGUAGE_ID": "ru"
    },
    "ts": "1478790852",
    "auth": {
        "domain": "portal.bitrix24.ru",
        "client_endpoint": "https://portal.bitrix24.ru/rest/",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "member_id": "74ef8a46a75104de55d5d4a61b98ab6d",
        "application_token": "c289487163b58658eae5e8b42eaf11b8"
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
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Данные о решении администратора по методу.

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
|| **TOKEN***
[`string`](../../data-types.md) | Значение `access_token`, с которым приложение вызвало метод и запросило разрешение. Решение администратора сохраняется для этого токена ||
|| **METHOD***
[`string`](../../data-types.md) | Метод API, разрешение на использование которого было запрошено ||
|| **CONFIRMED***
[`string`](../../data-types.md) | Результат разрешения: `0` — запрещено, `1` — разрешено ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Язык Битрикс24 по умолчанию: `ru`, `en` и другие ||
|#

### Параметр auth {#auth}

#|
|| **Название**
`тип` | **Описание** ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токена ||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API Битрикс24 ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный идентификатор Битрикс24 ||
|| **application_token***
[`string`](../../data-types.md) | Токен приложения. Сравните его с токеном, сохраненным при установке, чтобы убедиться, что запрос пришел из Битрикс24. Подробнее — в статье [{#T}](../../events/safe-event-handlers.md) ||
|#

В отличие от [onAppInstall](./on-app-install.md), это событие отправляется без авторизации пользователя: ключей `access_token`, `refresh_token`, `expires_in`, `scope` и `status` в `auth` нет.

Если `CONFIRMED` равен `1`, повторите вызов метода с токеном из `data.TOKEN`, пока срок его действия не истек.

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](../../scopes/confirmation.md)
- [{#T}](../../events/safe-event-handlers.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
