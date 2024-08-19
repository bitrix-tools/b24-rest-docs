
{% include notitle [Сноска об обязательных параметрах](required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **access_token**
[`string`](../api-reference/data-types.md) |  Токен авторизации [OAuth 2.0](../api-reference/oauth/) ||
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
- `F` — [бесплатное тиражное](../market/) приложение
- `S` — [подписное тиражное](../market/monetization/) приложение

||
|| **client_endpoint***
[`string`](../api-reference/data-types.md) | Общий путь для вызовов методов REST API для Битрикс24, на котором произошло событие ||
|| **member_id***
[`string`](../api-reference/data-types.md) | Идентификатор Битрикс24, на котором произошло событие ||
|| **refresh_token**
[`string`](../api-reference/data-types.md) | Токен продления авторизации [OAuth 2.0](../api-reference/oauth/) ||
|| **application_token***
[`string`](../api-reference/data-types.md) | Токен для безопасной обработки событий ||
|#

{% note alert "Обратите внимание!" %}

Необходимо учитывать, что токены авторизации не всегда передаются в обработчик события.

В случае, если хит, иницииализировавший срабатывание события, было невозможно привязать к конкретному пользователю Битрикс24, токены в обработчик не передаются. Обязательно проверяйте содержимое ключа `auth` в своем коде!

Мы рекомендуем хранить и использовать токены, полученные ранее при установке приложения, при использовании пользователями интерфейса приложения в виде встроек виджетов и так далее.

{% endnote %}
