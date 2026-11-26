# Событие при установке значений списочного пользовательского поля компаний onCrmCompanyUserFieldSetEnumValues

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь, для офлайн-событий нужны права администратора

Событие `ONCRMCOMPANYUSERFIELDSETENUMVALUES` срабатывает после установки значений списочного пользовательского поля компаний. Событие приходит, даже если набор значений не изменился.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md).

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMCOMPANYUSERFIELDSETENUMVALUES",
    "event_handler_id": "745",
    "data": {
        "FIELDS": {
            "ID": "6981",
            "ENTITY_ID": "CRM_COMPANY",
            "FIELD_NAME": "UF_CRM_1743165600"
        }
    },
    "ts": "1743165610",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "crm",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "L",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../../data-types.md) | Символьный код события.

В данном случае — `ONCRMCOMPANYUSERFIELDSETENUMVALUES` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию о пользовательском поле, для которого установлены значения списка.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект, содержащий свойства пользовательского поля списочного типа.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) в формате Unix timestamp ||
|| **auth**
[`object`](../../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, в котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`userFieldEntityId`](../../../data-types.md#object_type) | Тип объекта CRM, к которому привязано пользовательское поле.

В данном случае — `CRM_COMPANY` ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Код пользовательского поля, для которого установили набор значений ||
|#

Сами значения списка в событии не передаются. Получить их можно методом [crm.company.userfield.get](../crm-company-userfield-get.md) с `ID` из события.

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-crm-company-user-field-add.md)
- [{#T}](./on-crm-company-user-field-update.md)
- [{#T}](./on-crm-company-user-field-delete.md)
