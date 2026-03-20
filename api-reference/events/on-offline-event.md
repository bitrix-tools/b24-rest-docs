# Событие изменения очереди onOfflineEvent

> Кто может подписаться: любой пользователь

Событие `onOfflineEvent` уведомляет о появлении новых офлайн событий с некоторой периодичностью.

Приложение может подписаться на события двух видов.

- Обычные: событие вызывает внешний URL и выполняется действие, определяемое этим адресом.
- Офлайн: вместо вызова внешнего URL происходит локальное сохранение событий на портале, откуда потом можно забрать события методами [event.offline.*](./index.md#all-methods).

У события `onOfflineEvent` по факту локального сохранения вычисляется необходимость отправки уведомления, и затем оно отправляется как обычное событие на внешний URL.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
{
  "event": "ONOFFLINEEVENT",
  "data": {
    "type": "add",
    "event": "onTaskAdd",
    "handler": "https://example.ru/handler.php", 
    "minTimeout": 5
  },
  "ts": "1466439714",
  "auth": {
    "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
    "expires_in": "3600",
    "scope": "task",
    "domain": "some-domain.bitrix24.ru",
    "server_endpoint": "https://oauth.bitrix24.tech/rest/", 
    "status": "F",
    "client_endpoint": "https://some-domain.bitrix24.ru/rest/", 
    "member_id": "a223c6b3710f85df22e9377d6c4f7553",
    "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
    "application_token": "51856fefc120afa4b628cc82d3935cce"
  }
}

```

## Параметры запроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../data-types.md) | Символьный код события — `ONOFFLINEEVENT` ||
|| **data***
[`array`](../data-types.md) | Данные о событии в очереди.

Структура описана [ниже](#data) ||
|| **ts***
[`timestamp`](../data-types.md) | Дата и время отправки события ||
|| **auth***
[`array`](../data-types.md) | Данные авторизации и портала.

Структура описана [ниже](#auth) ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип изменения: `add`, `remove`, `update` ||
|| **event***
[`string`](../data-types.md) | Имя события. Например, `onTaskAdd` ||
|| **handler***
[`string`](../data-types.md) | URL обработчика события ||
|| **minTimeout**
[`integer`](../data-types.md) | Минимальная задержка перед отправкой события в секундах. Используется для группировки событий. По умолчанию 1 сек. Если значения параметра:
- равно `0`, вне зависимости от количества добавленных в офлайн очередь событий отправится только одно событие на адрес обработчика в рамках одного хита
- больше `0`, при первом срабатывании отправляет одно событие. Далее делается пауза минимум на время таймаута до отправки следующего события
  
Поле `minTimeout` появляется только, если событие добавлено в очередь с задержкой ||
|#

### Параметр auth {#auth}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token***
[`string`](../data-types.md) |  Токен для обращения к API ||
|| **expires_in***
[`integer`](../data-types.md) | Время в секундах до истечения срока действия токена ||
|| **scope***
[`string`](../data-types.md) | [Скоуп](../scopes/permissions.md), в рамках которого произошло событие ||
|| **domain***
[`string`](../data-types.md) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|| **status***
[`string`](../data-types.md) | Статус приложения, подписавшегося на это событие:

- `L` — [локальное](../../local-integrations/local-apps.md) приложение
- `F` — [бесплатное тиражное](../../market/index.md) приложение
- `S` — [подписное тиражное](../../market/monetization/index.md) приложение

||
|| **client_endpoint***
[`string`](../data-types.md) | Общий путь для вызовов методов API для Битрикс24, на котором произошло событие ||
|| **member_id***
[`string`](../data-types.md) | Идентификатор Битрикс24, на котором произошло событие ||
|| **refresh_token***
[`string`](../data-types.md) | Токен продления авторизации [OAuth 2.0](../../settings/oauth/index.md) ||
|| **application_token***
[`string`](../data-types.md) | Токен для безопасной обработки событий ||
|#

offline_event — приложение не всегда в состоянии принимать события. Оно может скрываться за фаерволлами, жить во внутренней сети и так далее. В этом случае используется механизм офлайн-событий, когда приложение подписывается на события, но не указывает URL обработчика.

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)