# Множественные поля: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Множественные поля используют для телефонов, e-mail и другой контактной информации в лидах, контактах и компаниях.

> Быстрый переход: [все методы](#all-methods)

## Как заполнить множественное поле

1. Получите состав полей и их характеристики методом [crm.multifield.fields](./crm-multifield-fields.md)

2. Выберите допустимое значение `VALUE_TYPE` по описанию типа [crm_multifield](../../data-types.md#crm_multifield)

3. Передайте массив значений в поле объекта CRM методом создания или обновления

4. Проверьте сохраненные данные методом чтения объекта

## Связь множественных полей с объектами CRM

Контактные данные лида, контакта и компании хранятся в множественных полях `PHONE`, `EMAIL`, `WEB` и `IM`. Значение каждого поля — массив объектов [crm_multifield](../../data-types.md#crm_multifield).

**Лид.** Записывайте и читайте контактные данные методами [crm.lead.add](../../leads/crm-lead-add.md), [crm.lead.update](../../leads/crm-lead-update.md), [crm.lead.get](../../leads/crm-lead-get.md).

**Контакт.** Записывайте и читайте контактные данные методами [crm.contact.add](../../contacts/crm-contact-add.md), [crm.contact.update](../../contacts/crm-contact-update.md), [crm.contact.get](../../contacts/crm-contact-get.md).

**Компания.** Записывайте и читайте контактные данные методами [crm.company.add](../../companies/crm-company-add.md), [crm.company.update](../../companies/crm-company-update.md), [crm.company.get](../../companies/crm-company-get.md).

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

Чаще всего в `PHONE` передают `VALUE_TYPE` со значением `MOBILE` или `WORK`, а в `EMAIL` — `WORK` или `HOME`. Полный набор допустимых значений `VALUE_TYPE` для телефона, почты, сайта и мессенджера смотрите в описании типа [crm_multifield](../../data-types.md#crm_multifield).

{% note tip "Частые кейсы и сценарии" %}

- [Как изменить или удалить номера телефонов и email](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [Создать новый лид crm.lead.add](../../leads/crm-lead-add.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.multifield.fields](./crm-multifield-fields.md) | Возвращает описание множественных полей ||
|#
