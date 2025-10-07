# Событие при оплате приложения onAppPayment

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `onAppPayment` вызывается при оплате приложения.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
{
    "event": "ONAPPPAYMENT",
    "data": {
        "CODE": "bitrix.gds_company",
        "VERSION": 1,
        "STATUS": "S",
        "PAYMENT_EXPIRED": "N",
        "DAYS": 28,
        "LANGUAGE_ID" => "ru",
    },
    "ts": "1466439714",
    "auth": {
        "domain": "some-domain.bitrix24.ru",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/", 
        "client_endpoint": "https://some-domain.bitrix24.ru/rest/", 
    }
}

```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события — `ONAPPPAYMENT` ||
|| **data***
[`array`](../../data-types.md) | Данные о платеже.

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
|| **CODE***
[`string`](../../data-types.md) | Код приложения ||
|| **VERSION***
[`integer`](../../data-types.md) | Установленная версия приложения ||
|| **STATUS***
[`string`](../../data-types.md) | Статус приложения. Возможные значения:
- `F` (Free) — бесплатное
- `D` (Demo) — демо-версия
- `T` (Trial) — триальная версия, ограниченная по времени
- `P` (Paid) — оплаченное приложение ||
|| **PAYMENT_EXPIRED***
[`string`](../../data-types.md) | [Y\|N] Флаг, который показывает, истек ли оплаченный период или период триального использования ||
|| **DAY***
[`integer`](../../data-types.md) | Количество дней, оставшееся до конца оплаченного периода или периода триального использования ||
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
|#

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](../system/app-info.md)
- [{#T}](./on-app-install.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-user-add.md)
- [{#T}](./on-app-uninstall.md)