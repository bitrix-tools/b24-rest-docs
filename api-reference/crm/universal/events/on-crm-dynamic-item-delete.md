# Событие на удаление объекта CRM пользовательского типа onCrmDynamicItemDelete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: `любой пользователь`

Событие сработает на удаление элемента любого [пользовательского типа объектов](../user-defined-object-types/index.md) в CRM.


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Событие на удаление элемента с идентификатором `23`, принадлежащего смарт-процессу с `entityTypeId = 1220`:

```json
{
    "event": "ONCRMDYNAMICITEMDELETE",
    "event_handler_id": "6",
    "data": {
        "FIELDS": {
            "ID": "23",
            "ENTITY_TYPE_ID": "1220"
        }
    },
    "ts": "1723538149",
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

В данном случае — `ONCRMDYNAMICITEMDELETE`||
|| **event_handler_id**
[`integer`][1] | Идентификатор обработчика события ||
|| **data**
[`object`][1] | Объект, содержащий информацию об удаленном объекте пользовательского типа CRM.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`][1] | Объект содержащий информацию о полях удаленного объекта пользовательского типа CRM.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`][1] | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`][1] | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`][1] | Идентификатор удаленного объекта пользовательского типа CRM ||
|| **ENTITY_TYPE_ID**
[`integer`][1] | Идентификатор пользовательского типа CRM ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

{% note warning "События системных типов объектов" %}

Несмотря на то, что [универсальные методы CRM](../index.md) позволяют добавлять и модифицировать объекты таких стандартных типов, как сделки, лиды, контакты, компании и коммерческие предложения, событие `onCrmDynamicItemDelete` не будет срабатывать при удалении перечисленных объектов.

Для отслеживания удаленных сделок, лидов и т.д., вы можете воспользоваться специальными событиями:

- [{#T}](../../deals/events/on-crm-deal-delete.md)
- [{#T}](../../leads/events/on-crm-lead-delete.md)
- [{#T}](../../contacts/events/on-crm-contact-delete.md)
- [{#T}](../../companies/events/on-crm-company-delete.md)
- [{#T}](../../quote/events/on-crm-quote-delete.md)

При удалении новых счетов событие `onCrmDynamicItemDelete` сработает.

{% endnote %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](index.md)
- [{#T}](on-crm-dynamic-item-add.md)
- [{#T}](on-crm-dynamic-item-update.md)

[1]: ../../../data-types.md