# Событие на удаление пользовательского типа CRM onCrmTypeDelete

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие срабатывает при удалении [пользовательского типа CRM](../../user-defined-object-types/index.md).


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMTYPEDELETE",
    "event_handler_id": "9",
    "data": {
        "FIELDS": {
            "ID": "45"
        }
    },
    "ts": "1723546073",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`][1] | Символьный код события.

В данном случае — `ONCRMTYPEDELETE`||
|| **event_handler_id**
[`integer`][1] | Идентификатор обработчика события ||
|| **data**
[`object`][1] | Объект, содержащий информацию об удаленном пользовательском типе CRM.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`][1] | Объект содержащий информацию о полях удаленного пользовательского типа CRM.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`][1] | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`][1] | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#


### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`][1] | Идентификатор удаленного пользовательского типа CRM (первичный ключ, а не идентификатор типа) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](index.md)
- [{#T}](on-crm-type-add.md)
- [{#T}](on-crm-type-update.md)

[1]: ../../../../data-types.md