# Событие при добавлении пользователя onUserAdd

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onUserAdd` вызывается при добавлении пользователя в Битрикс24. Событие срабатывает не после приглашения, а после того, как пользователь зайдет на портал и зарегистрируется до конца.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
{
    "event": "ONUSERADD",
    "data": {
        "ID": 123,
        "ACTIVE": "Y",
        "EMAIL": "user@example.ru",
        "NAME": "Иван",
        "LAST_NAME": "Иванов",
        "PERSONAL_GENDER": "M",
        "PERSONAL_BIRTHDAY": "1990-01-01",
        "UF_DEPARTMENT": [1, 2],
        "DATE_REGISTER": "2024-04-05T10:00:00+03:00",
        "WORK_POSITION": "Разработчик",
        "UF_EMPLOYMENT_DATE": "2024-04-05"
    },
    "ts": "1466439714",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/", 
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/", 
        "member_id": "a223c6b3710f85df22e9377d6c4f7553"
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
|| **data***
[`array`](../../data-types.md) | Данные добавленного пользователя.

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
|| **ID***
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **ACTIVE***
[`string`](../../data-types.md) | Флаг активности.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **EMAIL**
[`string`](../../data-types.md) | Email пользователя ||
|| **NAME**
[`string`](../../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **PERSONAL_GENDER**
[`string`](../../data-types.md) | Пол: `M` — мужской, `F` — женский ||
|| **PERSONAL_BIRTHDAY**
[`string`](../../data-types.md) | Дата рождения в формате `YYYY-MM-DD` ||
|| **UF_DEPARTMENT**
[`array`](../../data-types.md)\|[`null`](../../data-types.md) | Массив `ID` подразделений. Может отсутствовать для пользователей Экстранет ||
|| **DATE_REGISTER***
[`string`](../../data-types.md) | Дата регистрации в формате `ISO 8601` ||
|| **WORK_POSITION**
[`string`](../../data-types.md) | Должность пользователя ||
|| **UF_EMPLOYMENT_DATE**
[`string`](../../data-types.md) | Дата приема на работу в формате `YYYY-MM-DD` ||
|#

{% note info "" %}

Некоторые поля могут отсутствовать или иметь значение `null`, если у приложения нет доступа к ним.

{% endnote %}

### Параметр auth {#auth}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token***
[`string`](../../data-types.md) |  Токен для обращения к API ||
|| **expires_in***
[`integer`](../../data-types.md) | Время в секундах до истечения срока действия токена ||
|| **scope***
[`string`](../../data-types.md) | [Скоуп](../../scopes/permissions.md), в рамках которого произошло событие ||
|| **domain***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|| **status***
[`string`](../../data-types.md) | Статус приложения, подписавшегося на это событие:

- `L` — [локальное](../../../local-integrations/local-apps.md) приложение
- `F` — [бесплатное тиражное](../../../market/index.md) приложение
- `S` — [подписное тиражное](../../../market/monetization/index.md) приложение

||
|| **client_endpoint***
[`string`](../../data-types.md) | Общий путь для вызовов методов API для Битрикс24, на котором произошло событие ||
|| **member_id***
[`string`](../../data-types.md) | Идентификатор Битрикс24, на котором произошло событие ||
|| **refresh_token***
[`string`](../../data-types.md) | Токен продления авторизации [OAuth 2.0](../../../settings/oauth/index.md) ||
|| **application_token***
[`string`](../../data-types.md) | Токен для безопасной обработки событий ||
|#

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-app-uninstall.md)