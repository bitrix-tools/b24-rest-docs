# Событие при удалении приложения onAppUninstall

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onAppUninstall` вызывается при удалении приложения.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
{
    "event": "ONAPPUNINSTALL",
    "data": {
        "LANGUAGE_ID" => "ru",
        "CLEAN": 1
    },
    "ts": "1466439714",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/", 
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
[`string`](../../data-types.md) | Символьный код события — `ONAPPUNINSTAL` ||
|| **data***
[`array`](../../data-types.md) | Данные об удаленном приложении.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../../data-types.md) | Дата и время отправки события из очереди ||
|| **auth***
[`array`](../../data-types.md) | Данные авторизации и портала.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LANGUAGE_ID***
[`string`](../../data-types.md) | Установленный язык: `ru`, `en` и другие ||
|| **CLEAN***
[`integer`](../../data-types.md) | Значение опции «Очистить данные приложения», который задается пользователем при удалении приложения. Значения: `1` или `0` ||
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

{% note warning "" %}

При удалении приложения удаляются все права на доступ приложения к API. Поэтому, несмотря на то, что обработчику события будут переданы авторизационные данные, он уже не может использовать API от имени удаленного приложения.

{% endnote %}

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-user-add.md)