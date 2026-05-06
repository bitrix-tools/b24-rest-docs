# Множественные поля: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Множественные поля используют для телефонов, email-адресов и другой контактной информации в лидах, контактах и компаниях.

> Быстрый переход: [все методы](#all-methods)

## Связь множественных полей с объектами CRM

**Лид, контакт, компания.** Контактные данные в этих объектах хранятся в множественных полях. Чтобы корректно заполнить такие поля в методах CRM, сначала получите их описание через [crm.multifield.fields](./crm-multifield-fields.md).

**Типы значений.** Для каждого поля используйте допустимые значения `VALUE_TYPE`, чтобы корректно передать контактные данные.

## Как применять множественные поля

1. Получите структуру и допустимые типы значений методом [crm.multifield.fields](./crm-multifield-fields.md).
2. Подготовьте значение поля в формате [crm_multifield](../../data-types.md#crm_multifield).
3. Передайте подготовленные данные в метод создания или обновления нужного объекта CRM.
4. Проверьте сохраненные данные методом чтения объекта.

## Где использовать множественные поля

**Лиды.** Для записи и чтения контактных данных используйте методы [crm.lead.add](../../leads/crm-lead-add.md), [crm.lead.update](../../leads/crm-lead-update.md), [crm.lead.get](../../leads/crm-lead-get.md).

**Контакты.** Для записи и чтения контактных данных используйте методы [crm.contact.add](../../contacts/crm-contact-add.md), [crm.contact.update](../../contacts/crm-contact-update.md), [crm.contact.get](../../contacts/crm-contact-get.md).

**Компании.** Для записи и чтения контактных данных используйте методы [crm.company.add](../../companies/crm-company-add.md), [crm.company.update](../../companies/crm-company-update.md), [crm.company.get](../../companies/crm-company-get.md).

## Пример структуры значения

```js
PHONE: [
    {
        VALUE: "555888",
        VALUE_TYPE: "MOBILE"
    }
],
EMAIL: [
    {
        VALUE: "client@example.ru",
        VALUE_TYPE: "WORK"
    }
]
```

Для быстрых сценариев обычно используют `PHONE` с `VALUE_TYPE: MOBILE` или `WORK`, а для `EMAIL` — `WORK` или `HOME`.
Полный набор допустимых значений смотрите в [crm.multifield.fields](./crm-multifield-fields.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как изменить номера телефонов и email на примере контакта](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [Как создать новый лид](../../leads/crm-lead-add.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.multifield.fields](./crm-multifield-fields.md) | Возвращает описание множественных полей ||
|#
