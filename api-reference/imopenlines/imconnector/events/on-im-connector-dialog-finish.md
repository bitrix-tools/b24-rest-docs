# При закрытии диалога OnImConnectorDialogFinish

> Scope: [`imconnector`](../../../scopes/permissions.md) 
>
> Кто может подписаться: любой пользователь

Событие срабатывает при закрытии диалога.

## Что получает обработчик

Данные передаются в виде POST-запроса

```php
[
    'event' => 'ONIMCONNECTORDIALOGFINISH',
    'eventId' => 1,
    'data' => [
        'CONNECTOR' => 'newcustomconnector',
        'LINE' => '105'
        'DATA' => [
            [
                'connector' => [
                    'connector_id' => 'newcustomconnector',
                    'line_id' => 105,
                    'chat_id' => 8,
                    'user_id' => 0,
                ],
                'session' => [
                    'id' => 3282,
                    'closed' => Y,
                    'parent_id' => 0,
                    'close_term' => 10,
                ],
                'chat' => [
                    'id' => 8
                ],
                'user' => [
                    'id' => 0
                ],
            ],
        ],
    ],
    'ts' => 1714649632,
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => 3600,
        'scope' => 'imconnector',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix.info/rest/&#39;',
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
|| **CONNECTOR***
[`string`](../../../data-types.md) | Идентификатор коннектора ||
|| **LINE***
[`integer`](../../../data-types.md) | Идентификатор открытой линии ||
|| **DATA***
[`object`](../../../data-types.md) | Объект с [данными диалога](#dialog-params) ||
|#

#### Параметр DATA {#dialog-params}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **connector***
[`object`](../../../data-types.md) | Объект с информацией о дополнительных настройках:
- `connector_id` — идентификатор коннектора
- `line_id` — идентификатор открытой линии
- `chat_id` — идентификатор чата
- `user_id` — идентификатор пользователя во внешней системе
||
|| **session***
[`object`](../../../data-types.md) | Объект с информацией о сессии:
- `id` —  идентификатор сессии
- `closed` — отметка о закрытие диалога. `Y` — диалог закрыт
- `parent_id` — идентификатор предыдущей сессии
- `close_term` — количество минут до закрытия сессии ||
|| **chat***
[`object`](../../../data-types.md) | Объект с информацией о чате:
- `id` — идентификатор чата ||
|| **user***
[`object`](../../../data-types.md) | Объект с информацией о пользователе:
- `id` — идентификатор пользователя во внешней системе ||
|#

### Параметр auth

{% include notitle [Параметр auth](../../../../_includes/auth-params-in-events.md) %}
