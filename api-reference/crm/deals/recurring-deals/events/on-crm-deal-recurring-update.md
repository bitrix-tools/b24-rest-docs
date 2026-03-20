# Событие при изменении шаблона регулярной сделки onCrmDealRecurringUpdate

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMDEALRECURRINGUPDATE` сработает при обновлении шаблона регулярной сделки.


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMDEALRECURRINGUPDATE",
    "event_handler_id": "679",
    "data": {
        "FIELDS": {
            "ID": "9",
            "RECURRING_DEAL_ID": "6791"
        }
    },
    "ts": "1741092489",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
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
[`string`](../../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMDEALRECURRINGUPDATE`||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию об измененном шаблоне.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект содержащий информацию о полях измененного шаблона.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`](../../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор записи в таблице настроек регулярных сделок ||
|| **RECURRING_DEAL_ID**
[`integer`](../../../../data-types.md) | Идентификатор шаблона регулярной сделки ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./on-crm-deal-recurring-delete.md)
- [{#T}](./on-crm-deal-recurring-expose.md)
- [{#T}](./on-crm-deal-recurring-add.md)