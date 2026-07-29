# Связи реквизитов с объектами CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Связи сохраняют соответствие объекта CRM и реквизитов, которые используются в контексте этого объекта.

Например, есть счет на оплату. Для его печати требуются реквизиты компании-продавца (моей компании) и компании-покупателя (клиента). Так как у компании может быть несколько реквизитов, то не понятно, какие из них использовать для печати счета. Для указания нужных реквизитов и нужна связь.

Поля **REQUISITE_ID** и **BANK_DETAIL_ID** хранят идентификаторы реквизита и банковского реквизита соответственно, которые используются для компании-покупателя. Поля **MC_REQUISITE_ID** и **MC_BANK_DETAIL_ID** хранят аналогичные идентификаторы для компании-продавца. 

Если какой-то идентификатор имеет значение `0`, то он считается невыбранным. Могут быть не выбраны реквизиты компании-продавца или банковские реквизиты.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как использовать реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/27634120/)

## Как начать работу

1. Определите тип объекта CRM `ENTITY_TYPE_ID`
2. Получите идентификатор объекта `ENTITY_ID`
3. Найдите реквизит клиента методом [crm.requisite.list](../universal/crm-requisite-list.md)
4. Найдите банковский реквизит методом [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md)
5. Зарегистрируйте связь методом [crm.requisite.link.register](./crm-requisite-link-register.md)
6. Проверьте связь методом [crm.requisite.link.get](./crm-requisite-link-get.md) или [crm.requisite.link.list](./crm-requisite-link-list.md)

## Идентификаторы связи

- `ENTITY_TYPE_ID` — тип объекта CRM, для которого выбираются реквизиты. Значения можно получить методом [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)
- `ENTITY_ID` — идентификатор объекта CRM. Для сделок его возвращает [crm.deal.list](../../deals/crm-deal-list.md), для предложений — [crm.quote.list](../../quote/crm-quote-list.md), для новых счетов и динамических объектов — [crm.item.list](../../universal/crm-item-list.md)
- `REQUISITE_ID` и `MC_REQUISITE_ID` — идентификаторы реквизитов клиента и моей компании. Их можно получить методом [crm.requisite.list](../universal/crm-requisite-list.md)
- `BANK_DETAIL_ID` и `MC_BANK_DETAIL_ID` — идентификаторы банковских реквизитов клиента и моей компании. Их можно получить методом [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md)

## Поля связи реквизита с объектом CRM

Обязательные поля отмечены `*`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь.

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md) ||
|| **REQUISITE_ID***
[`integer`](../../../data-types.md) | Идентификатор реквизита клиента, выбранного для объекта.

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **BANK_DETAIL_ID***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита клиента, выбранного для объекта.

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|| **MC_REQUISITE_ID***
[`integer`](../../../data-types.md) | Идентификатор реквизита моей компании, выбранного для объекта.

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **MC_BANK_DETAIL_ID***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита моей компании, выбранного для объекта.

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.link.register](./crm-requisite-link-register.md) | Регистрирует связь реквизитов с объектом ||
|| [crm.requisite.link.get](./crm-requisite-link-get.md) | Возвращает связь реквизитов с объектом ||
|| [crm.requisite.link.list](./crm-requisite-link-list.md) | Возвращает список связей реквизитов по фильтру ||
|| [crm.requisite.link.unregister](./crm-requisite-link-unregister.md) | Удаляет связь реквизитов с объектом ||
|| [crm.requisite.link.fields](./crm-requisite-link-fields.md) | Возвращает формальное описание полей связи реквизитов ||
|#
