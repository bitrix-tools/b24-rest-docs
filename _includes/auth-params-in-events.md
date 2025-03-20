
{% include notitle [Сноска об обязательных параметрах](required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **access_token**
[`string`](../api-reference/data-types.md) |  Токен авторизации [OAuth 2.0](../api-reference/oauth/index.md) ||
|| **expires_in**
[`integer`](../api-reference/data-types.md) | Время в секундах до истечения срока действия токена ||
|| **scope***
[`string`](../api-reference/data-types.md) | [Скоуп](../api-reference/scopes/permissions.md), в рамках которого произошло событие ||
|| **domain***
[`string`](../api-reference/data-types.mdd) | Адрес Битрикс24, на котором произошло событие ||
|| **server_endpoint***
[`string`](../api-reference/data-types.md) | Адрес сервера авторизации Битрикс24, необходимый для обновления токенов OAuth 2.0 ||
|| **status***
[`string`](../api-reference/data-types.md) | Статус приложения, подписавшегося на это событие:

- `L` — [локальное](../local-integrations/local-apps.md) приложение
- `F` — [бесплатное тиражное](../market/index.md) приложение
- `S` — [подписное тиражное](../market/monetization/index.md) приложение

||
|| **client_endpoint***
[`string`](../api-reference/data-types.md) | Общий путь для вызовов методов REST API для Битрикс24, на котором произошло событие ||
|| **member_id***
[`string`](../api-reference/data-types.md) | Идентификатор Битрикс24, на котором произошло событие ||
|| **refresh_token**
[`string`](../api-reference/data-types.md) | Токен продления авторизации [OAuth 2.0](../api-reference/oauth/index.md) ||
|| **application_token***
[`string`](../api-reference/data-types.md) | Токен для безопасной обработки событий ||
|#

{% note alert "" %}

Токены авторизации не всегда передаются в обработчик события. Если хит, инициировавший событие, не удалось привязать к конкретному пользователю Битрикс24, токены не передаются. Обязательно проверяйте содержимое ключа auth в коде.

Рекомендуем хранить токены, полученные ранее при установке приложения. Используйте их при работе с интерфейсом приложения в виде встроек, виджетов и так далее.

{% endnote %}
