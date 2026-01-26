# Событие после успешной установки приложения OnAppInstall

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `OnAppInstall` вызывается сразу после успешной установки приложения на Битрикс24. В обработчик передается `application_token`, который важно сохранить. Подробнее читайте в статье [{#T}](../../events/safe-event-handlers.md).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
array(
    'event' => 'ONAPPINSTALL',
    'data' => array(
        'VERSION' => '1.0.0',
        'ACTIVE' => 'Y',
        'INSTALLED' => 'Y',
        'LANGUAGE_ID' => 'ru'
    ),
    'ts' => '1696527000',
    'auth' => array(
        'domain' => 'some-domain.bitrix24.ru',
        'server_endpoint' => 'https://oauth.bitrix24.tech/rest/',   
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.ru/rest/',   
        'member_id' => 'a223c6b3710f85df22e9377d6c4f7553',
        'application_token' => '51856fefc120afa4b628cc82d3935cce',        
    ),
)
```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события. В данном случае — `ONAPPINSTALL` ||
|| **data***
[`object`](../../data-types.md) | Данные об установленном приложении.

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
[`integer`](../../data-types.md) | Версия установленного приложения ||
|| **ACTIVE***
[`string`](../../data-types.md) | Статус активности приложения. 

Возможные значения:
`Y` — активно
`N` — неактивно ||
|| **INSTALLED***
[`string`](../../data-types.md) | Готово ли приложение к использованию. 

Возможные значения: 
`Y` — готово
`N` — не установлено полностью ||
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
|| **status***
[`string`](../../data-types.md) | Статус приложения, подписавшегося на это событие:

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

{% note warning "" %}

 Обработчик данного события можно установить в установочном скрипте приложения, который указывается в карточке версии в отдельном поле.

{% endnote %}

## Продолжите изучение

- [{#T}](../../events/index.md)
- [{#T}](../../events/event-bind.md)
- [{#T}](./on-app-payment.md)
- [{#T}](./on-app-method-confirm.md)
- [{#T}](./on-user-add.md)
- [{#T}](./on-app-uninstall.md)