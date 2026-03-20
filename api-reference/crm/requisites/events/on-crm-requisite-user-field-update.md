# Событие при изменении пользовательского поля реквизита onCrmRequisiteUserFieldUpdate

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `onCrmRequisiteUserFieldUpdate` вызывается при изменении пользовательского поля реквизита.


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
[
    'event' => 'onCrmRequisiteUserFieldUpdate',
    'data' => [
        'FIELDS' => [
            'ID' => 235,
            'ENTITY_ID' => 'CRM_REQUISITE',
            'FIELD_NAME' => 'NEWTECH_v1_STRING'
        ],
    ],
    'ts' => '1466439714',
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => '3600',
        'scope' => 'crm',
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

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события. В данном случае это `onCrmRequisiteUserFieldUpdate`||
|| **data***
[`array`](../../../data-types.md) | Массив с данными измененного пользовательского поля реквизита ||
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
[`array`](../../../data-types.md) | Массив с полями измененного пользовательского поля реквизита ||
|#

### Параметр FIELDS[]

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор измененного пользовательского поля реквизита ||
|| **ENTITY_ID***
[`string`](../../../data-types.md) | Символьный идентификатор объекта, для которого изменено поле ||
|| **FIELD_NAME***
[`string`](../../../data-types.md) | Символьный код измененного пользовательского поля ||
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
- [{#T}](./on-crm-requisite-user-field-delete.md)
- [{#T}](./on-crm-bank-detail-add.md)
- [{#T}](./on-crm-bank-detail-update.md)
- [{#T}](./on-crm-bank-detail-delete.md)