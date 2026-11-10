# Методы CRM предыдущей версии API: обзор

Методы предыдущей версии API вызываются по адресу `/rest/` и сохранены для поддержки существующих интеграций. Для новой разработки предназначены методы CRM в REST 3.0, они описаны в [обзоре CRM](./index.md). Методы обеих версий можно вызывать из одной интеграции.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все разделы и методы](#all-methods)

## Универсальные методы и методы объектов

В предыдущей версии с элементами CRM работают два набора методов:

- универсальные методы [crm.item.*](./universal/index.md) — одни методы для всех типов, тип объекта передается в параметре `entityTypeId`. Имена полей пишутся в `camelCase`, например `assignedById`
- методы объектов `crm.deal.*`, `crm.lead.*`, `crm.contact.*`, `crm.company.*`, `crm.quote.*` — отдельный набор для каждого типа. Имена полей пишутся в верхнем регистре, например `ASSIGNED_BY_ID`

Типы смарт-процессов создают и настраивают методы [crm.type.*](./universal/user-defined-object-types/index.md). Их аналогов в REST 3.0 нет, поэтому они нужны и интеграциям на REST 3.0.

Аналоги методов в REST 3.0, их ограничения и отличия версий описаны на странице [Переход на новые методы CRM](./migration.md).

## Обзор разделов и методов {#all-methods}

> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Справочные материалы

#|
|| **Статья** | **Описание** ||
|| [Типы данных и структура объектов в REST API CRM](./data-types.md) | Что такое `entityTypeId`, какие бывают идентификаторы и как устроены объекты CRM ||
|| [Поля основных объектов CRM](./main-entities-fields.md) | Поля ключевых объектов CRM в одном месте ||
|| [Ограничения длины полей CRM](./field-length-limits.md) | Максимальная длина стандартных полей CRM и способ получить лимиты пользовательских полей ||
|#

### Объекты CRM

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Универсальные методы CRM](./universal/index.md) | Для работы с объектами CRM и смарт-процессами через `entityTypeId` | [crm.item.add](./universal/crm-item-add.md), [crm.item.update](./universal/crm-item-update.md), [crm.item.list](./universal/crm-item-list.md)

[Все методы раздела](./universal/index.md) ||
|| [Сделки](./deals/index.md) | Для работы со сделками, их карточками и связями с контактами | [crm.deal.add](./deals/crm-deal-add.md), [crm.deal.update](./deals/crm-deal-update.md), [crm.deal.list](./deals/crm-deal-list.md)

[Все методы раздела](./deals/index.md) ||
|| [Лиды](./leads/index.md) | Для работы с лидами, их карточками и связями с контактами | [crm.lead.add](./leads/crm-lead-add.md), [crm.lead.update](./leads/crm-lead-update.md), [crm.lead.list](./leads/crm-lead-list.md)

[Все методы раздела](./leads/index.md) ||
|| [Контакты](./contacts/index.md) | Для работы с контактами, их карточками и связями с компаниями | [crm.contact.add](./contacts/crm-contact-add.md), [crm.contact.update](./contacts/crm-contact-update.md), [crm.contact.list](./contacts/crm-contact-list.md)

[Все методы раздела](./contacts/index.md) ||
|| [Компании](./companies/index.md) | Для работы с компаниями, их карточками и связями с контактами | [crm.company.add](./companies/crm-company-add.md), [crm.company.update](./companies/crm-company-update.md), [crm.company.list](./companies/crm-company-list.md)

[Все методы раздела](./companies/index.md) ||
|| [Коммерческие предложения](./quote/index.md) | Для работы с коммерческими предложениями и товарными позициями | [crm.quote.add](./quote/crm-quote-add.md), [crm.quote.update](./quote/crm-quote-update.md), [crm.quote.list](./quote/crm-quote-list.md)

[Все методы раздела](./quote/index.md) ||
|#

### Настройки и справочники

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Реквизиты](./requisites/index.md) | Для работы с реквизитами, адресами и банковскими данными CRM | [crm.requisite.add](./requisites/universal/crm-requisite-add.md), [crm.requisite.update](./requisites/universal/crm-requisite-update.md), [crm.requisite.list](./requisites/universal/crm-requisite-list.md)

[Все методы раздела](./requisites/index.md) ||
|| [Справочники](./status/index.md) | Для управления системными списками CRM: стадиями, источниками, типами | [crm.status.add](./status/crm-status-add.md), [crm.status.update](./status/crm-status-update.md), [crm.status.list](./status/crm-status-list.md)

[Все методы раздела](./status/index.md) ||
|| [Вспомогательные объекты](./auxiliary/index.md) | Для работы с перечислениями, множественными полями и другими служебными объектами CRM | [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md)

[Все методы раздела](./auxiliary/index.md) ||
|#

### Отдельные методы

#|
|| **Метод** | **Описание** ||
|| [crm.settings.mode.get](./crm-settings-mode-get.md) | Возвращает текущий режим работы CRM ||
|#
