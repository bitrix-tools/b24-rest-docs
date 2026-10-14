# Событие при добавлении пользователя onUserAdd

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../../scopes/permissions.md), [`user_brief`](../../scopes/permissions.md) или [`user_basic`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONUSERADD` вызывается при добавлении пользователя в Битрикс24. Событие срабатывает не после приглашения, а после того, как пользователь зайдет в Битрикс24 и завершит регистрацию. Для пользователей внешних типов, например почтовых пользователей и ботов, событие не отправляется.

Подписаться на событие можно через [исходящий вебхук](../../../local-integrations/local-webhooks.md) или из приложения методом [event.bind](../../events/event-bind.md). В исходящий вебхук токены OAuth 2.0 не передаются.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md).

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONUSERADD",
    "event_handler_id": "16",
    "data": {
        "ID": "123",
        "ACTIVE": "1",
        "EMAIL": "user@example.ru",
        "NAME": "Иван",
        "LAST_NAME": "Иванов",
        "PERSONAL_GENDER": "M",
        "PERSONAL_BIRTHDAY": "1990-01-01T03:00:00+03:00",
        "UF_DEPARTMENT": ["1", "2"],
        "DATE_REGISTER": "2024-04-05T03:00:00+03:00",
        "WORK_POSITION": "Разработчик",
        "UF_EMPLOYMENT_DATE": "2024-04-05T03:00:00+03:00"
    },
    "ts": "1466439714",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "user",
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события — `ONUSERADD` ||
|| **event_handler_id**
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Данные добавленного пользователя.

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
|| **ID***
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **ACTIVE***
[`string`](../../data-types.md) | Активен ли пользователь.

Возможные значения:

- `1` — активен
- `0` — не активен

Событие вызывается при первом входе пользователя, поэтому на практике приходит `1`
||
|| **EMAIL**
[`string`](../../data-types.md) | Email пользователя ||
|| **NAME**
[`string`](../../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **PERSONAL_GENDER**
[`string`](../../data-types.md) | Пол: `M` — мужской, `F` — женский ||
|| **PERSONAL_BIRTHDAY**
[`string`](../../data-types.md) | Дата рождения в формате ISO 8601, например `1990-01-01T03:00:00+03:00` ||
|| **UF_DEPARTMENT**
[`array`](../../data-types.md) | Массив `ID` подразделений. Может отсутствовать для пользователей экстранета ||
|| **DATE_REGISTER***
[`string`](../../data-types.md) | Дата регистрации в формате ISO 8601 ||
|| **WORK_POSITION**
[`string`](../../data-types.md) | Должность пользователя ||
|| **UF_EMPLOYMENT_DATE**
[`string`](../../data-types.md) | Дата приема на работу в формате ISO 8601 ||
|#

{% note info "" %}

В таблице перечислены основные поля. Состав зависит от прав приложения:

- со scope `user` приходят стандартные поля пользователя, пользовательские поля `UF_USR_*` не передаются
- с `user_basic` или `user_brief` приходит сокращенный набор полей, а вместе с `user.userfield` — еще и пользовательские поля `UF_USR_*`

Поля, к которым у приложения нет доступа, и поля без значения не передаются. Описание полей — в статье [{#T}](../../user/user-fields.md).

{% endnote %}

### Параметр auth {#auth}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token**
[`string`](../../data-types.md) | Токен для обращения к API ||
|| **expires_in**
[`integer`](../../data-types.md) | Время в секундах до истечения срока действия токена ||
|| **scope**
[`string`](../../data-types.md) | Коды [прав](../../scopes/permissions.md), выданных приложению, через запятую ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации для обновления токена ||
|| **status**
[`string`](../../data-types.md) | Статус приложения, подписавшегося на это событие:

- `L` — [локальное](../../../local-integrations/local-apps.md) приложение
- `F` — [бесплатное тиражное](../../../market/index.md) приложение
- `S` — [подписное тиражное](../../../market/monetization/index.md) приложение

||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API для Битрикс24, на котором произошло событие ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный идентификатор Битрикс24 ||
|| **application_token***
[`string`](../../data-types.md) | Токен приложения. Сравните его с токеном, сохраненным при установке приложения, или с токеном из настроек исходящего вебхука, чтобы убедиться, что запрос пришел из Битрикс24. Подробнее — в статье [{#T}](../../events/safe-event-handlers.md) ||
|#

Если событие удалось привязать к пользователю, в `auth` приходят `access_token`, `expires_in`, `scope` и `status`, [подробнее](../../events/index.md#auth).

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](../../user/user-get.md)
- [{#T}](../../user/user-fields.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-app-uninstall.md)
