# Событие на удаление дела типа «Комментарий» onCrmTimelineCommentDelete

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие срабатывает на удаление дела типа «Комментарий» в таймлайне CRM. 

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
array(
    'event' => 'onCrmTimelineCommentDelete',
    'data' => array(
        'ID' => 999,
    ),
    'ts' => '1466439714',
    'auth' => array(
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
    ),
)
```

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события. В нашем случае это `onCrmTimelineCommentDelete`||
|| **data***
`array` | Массив с данными удаленного элемента ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth***
[`array`](../../../data-types.md) | Параметры авторизации и данные о портале, на котором произошло событие ||
|#

### Параметр data[]

{% include notitle [Сноска о параметрах](../../../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../../data-types.md) | `ID` со значением идентификатора удаленного комментария ||
|#

### Параметр auth[]

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./on-Crm-Timeline-Comment-Add.md)
- [{#T}](./on-Crm-Timeline-Comment-Update.md)