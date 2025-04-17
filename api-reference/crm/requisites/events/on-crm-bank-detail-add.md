# Событие при добавлении банковского реквизита onCrmBankDetailAdd

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `onCrmBankDetailAdd` вызывается при добавлении банковского реквизита.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
[
    'event' => 'onCrmBankDetailAdd',
    'data' => [
        'FIELDS' => [
            'ID' => 357,
        ],
    ],
    'ts' => '1466439714',
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => '3600',
        'scope' => 'crm',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix.info/rest/',
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.com/rest/',
        'member_id' => 'a223c6b3710f85df22e9377d6c4f7553',
        'refresh_token' => '4s386p3q0tr8dy89xvmt96234v3dljg8',
        'application_token' => '51856fefc120afa4b628cc82d3935cce',
    ],
]
```

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события. В данном случае это `onCrmBankDetailAdd`||
|| **data***
[`array`](../../../data-types.md) | Массив с данными добавленного банковского реквизита ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`array`](../../../data-types.md) | Параметры авторизации и данные о портале, на котором произошло событие ||
|#

### Параметр data[]

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **FIELDS***
[`array`](../../../data-types.md) | Массив с полями добавленного банковского реквизита ||
|#

### Параметр FIELDS[]

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор добавленного банковского реквизита. Создается автоматически и уникален в рамках портала ||
|#

### Параметр auth[]

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-crm-address-register.md)
- [{#T}](./on-crm-address-unregister.md)
- [{#T}](./on-crm-requisite-add.md)
- [{#T}](./on-crm-requisite-update.md)
- [{#T}](./on-crm-requisite-delete.md)
- [{#T}](./on-crm-requisite-user-field-add.md)
- [{#T}](./on-crm-requisite-user-field-set-enum-values.md)
- [{#T}](./on-crm-requisite-user-field-update.md)
- [{#T}](./on-crm-requisite-user-field-delete.md)
- [{#T}](./on-crm-bank-detail-update.md)
- [{#T}](./on-crm-bank-detail-delete.md)
