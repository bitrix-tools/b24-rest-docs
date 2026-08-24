# При изменении пользовательского поля смарт-процесса, нового счета или документа onCrmTypeUserFieldUpdate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCRMTYPEUSERFIELDUPDATE` сработает при изменении настроек пользовательского поля смарт-процесса, нового счета или документа на подпись. Событие приходит и при изменении поля в интерфейсе, и при вызове метода [userfieldconfig.update](../userfieldconfig-update.md).

Если у поля списочного типа `enumeration` изменился еще и набор значений, обработчик получит два события: `onCrmTypeUserFieldUpdate` и [onCrmTypeUserFieldSetEnumValues](./on-crm-type-user-field-set-enum-values.md). Когда меняется только набор значений, приходит одно событие `onCrmTypeUserFieldSetEnumValues`. Разбор всех случаев — в разделе [Какие события приходят вместе](./index.md#pairs).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "ONCRMTYPEUSERFIELDUPDATE",
    "event_handler_id": "713",
    "data": {
        "FIELDS": {
            "ID": "6977",
            "ENTITY_ID": "CRM_13",
            "FIELD_NAME": "UF_CRM_13_1742999523"
        }
    },
    "ts": "1743003117",
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

В данном случае — `ONCRMTYPEUSERFIELDUPDATE` ||
|| **event_handler_id**
[`integer`](../../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../../data-types.md) | Объект, содержащий информацию об измененном пользовательском поле.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS**
[`object`](../../../../data-types.md) | Объект, содержащий идентификаторы измененного пользовательского поля.

Структура описана [ниже](#fields) ||
|| **ts**
[`timestamp`](../../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../../events/index.md) ||
|| **auth**
[`object`](../../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор измененного пользовательского поля.

Передайте его вместе с `moduleId = crm` в метод [userfieldconfig.get](../userfieldconfig-get.md), чтобы получить новые настройки поля ||
|| **ENTITY_ID**
[`string`](../../../../data-types.md) | Идентификатор объекта, к которому относится пользовательское поле: `CRM_{id}` для смарт-процесса, `CRM_SMART_INVOICE` для нового счета, `CRM_SMART_DOCUMENT` для документа на подпись.

В формате `CRM_{id}` используется ключ `id` из результата метода [crm.type.list](../../user-defined-object-types/crm-type-list.md), а не `entityTypeId`.

Значения описаны в разделе [Для каких объектов срабатывают события](./index.md#objects) ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Символьный код измененного пользовательского поля, например `UF_CRM_13_1742999523` ||
|#

Событие не передает, какие именно настройки изменились, и не содержит значений до и после изменения. Новые настройки вернет метод [userfieldconfig.get](../userfieldconfig-get.md). Методу нужен scope `userfieldconfig` в дополнение к scope `crm`, с которым приложение подписывается на событие.

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../../events/index.md)
- [{#T}](../../../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-crm-type-user-field-add.md)
- [{#T}](./on-crm-type-user-field-delete.md)
- [{#T}](./on-crm-type-user-field-set-enum-values.md)
