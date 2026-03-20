# При создании чата OnSessionStart

> Scope: [`imopenlines`](../../../scopes/permissions.md) 
>
> Кто может подписаться: любой пользователь

Событие `OnSessionStart` срабатывает при создании чата.

[Подписаться](../../../events/event-bind.md) на событие можно только через приложение. Получить в обработчик можно только те события, которые предназначены для [коннектора](../../imconnector/index.md), который добавило приложение.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса

```php
[
    'event' => 'ONSESSIONSTART',
    'eventId' => 1,
    'data' => [
        'DATA' => [
            [
                'connector' => [
                    'connector_id' => 'livechat',
                    'line_id' => 128,
                    'chat_id' => 10585,
                    'user_id' => 1984,
                ],
                'chat' => [
                    'id' => 10585
                ],
                'user' => [
                    'id' => 128,
                    'name' => 'linename'
                ],
            ],
        ],
    ],
    'ts' => 1714649632,
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => 3600,
        'scope' => 'imopenlines',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix24.tech/rest/&#39;',
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.com/rest/&#39;',
        'member_id' => 'a223c6b3710f85df22e9377d6c4f7553',
        'refresh_token' => '4s386p3q0tr8dy89xvmt96234v3dljg8',
        'application_token' => '51856fefc120afa4b628cc82d3935cce',
    ],
]
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события ||
|| **eventId***
[`integer`](../../../data-types.md) | Идентификатор события ||
|| **data***
[`object`](../../../data-types.md) | Объект с [данными события](#data) ||
|| **ts***
[`integer`](../../../data-types.md) | timestamp отправки события из очереди событий ||
|| **auth***
[`object`](../../../data-types.md) | Объект с параметрами авторизации и данными о портале, на котором произошло событие ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DATA***
[`object`](../../../data-types.md) | Объект с [данными чата](#chat-params) ||
|#

#### Параметр DATA {#chat-params}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о коннекторе:
- `connector_id` — идентификатор коннектора
- `line_id` — идентификатор открытой линии
- `chat_id` — идентификатор чата
- `user_id` — идентификатор пользователя во внешней системе
||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате:
- `id` — идентификатор чата ||
|| **line***
[`object`](../../../data-types.md) | Объект с информацией об открытой линии:
- `id` — идентификатор открытой линии
- `name` — название открытой линии ||
|#

### Параметр auth

{% include notitle [Параметр auth](../../../../_includes/auth-params-in-events.md) %}
