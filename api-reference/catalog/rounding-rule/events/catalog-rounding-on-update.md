# Событие при изменении правила округления цен CATALOG.ROUNDING.ON.UPDATE

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие происходит при обновлении правила округления цен.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
[
    'event' => 'CATALOG.ROUNDING.ON.UPDATE',    
    'event_handler_id' => 1,
    'data' => [
        'FIELDS' => [
            'ID' => 1,
        ],
    ],
    'ts' => 1714649632,
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => 3600,
        'scope' => 'catalog',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix24.tech/rest/',
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.com/rest/',
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
[`string`](../../data-types.md) | Символьный код события ||
|| **event_handler_id***
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Объект с данными события.

Структура описана [ниже](#data) ||
|| **ts***
[`integer`](../../data-types.md) | Timestamp отправки события из очереди событий ||
|| **auth***
[`object`](../../data-types.md) | Объект с параметрами авторизации и данными о портале, на котором произошло событие ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект со свойствами правила округления цен.

Структура описана [ниже](#fields) ||
|#

### Параметр FIELDS {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`catalog_rounding_rule.id`](../../data-types.md#catalog_rounding_rule) | Идентификатор правила округления цен. Получить все поля правила округления цен по его идентификатору можно с помощью метода [catalog.roundingRule.get](../catalog-rounding-rule-get.md) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./catalog-rounding-on-add.md)
- [{#T}](./catalog-rounding-on-delete.md)