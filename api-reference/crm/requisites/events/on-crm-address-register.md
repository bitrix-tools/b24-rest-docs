# Событие при регистрации адреса onCrmAddressRegister

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие `onCrmAddressRegister` вызывается при регистрации адреса.


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
[
    'event' => 'onCrmAddressRegister',
    'data' => [
        'FIELDS' => [
            'TYPE_ID' => 1,
            'ENTITY_TYPE_ID' => 8,
            'ENTITY_ID' => 1,
            'ANCHOR_ID' => 17192,
            'ANCHOR_TYPE_ID' => 3,
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
[`string`](../../../data-types.md) | Символьный код события. В данном случае это `onCrmAddressRegister`||
|| **data***
[`array`](../../../data-types.md) | Массив с данными зарегистрированного адреса ||
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
[`array`](../../../data-types.md) | Массив с полями зарегистрированного адреса ||
|#

### Параметр FIELDS[]

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» возвращает метод [crm.enum.addresstype](../../auxiliary/enum/crm-enum-address-type.md)
||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов возвращает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

Адреса могут быть привязаны только к Реквизитам (а реквизиты уже к компаниям либо контактам) или Лидам. Для обратной совместимости оставлена возможность связывать Адреса с Контактами или Компаниями. Но эта связь возможна только на некоторых старых порталах, где специально техподдержкой был включен старый режим работы с адресами 
||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительского объекта ||
|| **ANCHOR_ID***
[`integer`](../../../data-types.md) | Идентификатор основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

В этом поле содержится идентификатор родительского объекта реквизита (компании или контакта), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор лида
||
|| **ANCHOR_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

Идентификаторы типов объектов возвращает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

В этом поле содержится идентификатор типа родительского объекта реквизита (компания или контакт), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор типа лид
||
|#

### Параметр auth[]

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./on-crm-address-unregister.md)
- [{#T}](./on-crm-requisite-add.md)
- [{#T}](./on-crm-requisite-update.md)
- [{#T}](./on-crm-requisite-delete.md)
- [{#T}](./on-crm-requisite-user-field-add.md)
- [{#T}](./on-crm-requisite-user-field-set-enum-values.md)
- [{#T}](./on-crm-requisite-user-field-update.md)
- [{#T}](./on-crm-requisite-user-field-delete.md)
- [{#T}](./on-crm-bank-detail-add.md)
- [{#T}](./on-crm-bank-detail-update.md)
- [{#T}](./on-crm-bank-detail-delete.md)
