# Множественные поля: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В множественных полях CRM хранит телефоны, e-mail, сайты и мессенджеры лидов, контактов и компаний. В одном поле может быть несколько значений — например, рабочий и мобильный телефон контакта. У каждого значения свой подтип: `WORK`, `MOBILE` и другие.

> Быстрый переход: [все методы](#all-methods)

## Как заполнить множественное поле

1. Получите описание полей `ID`, `TYPE_ID`, `VALUE` и `VALUE_TYPE` методом [crm.multifield.fields](./crm-multifield-fields.md): тип данных, название и признак «только для чтения»

2. Выберите допустимое значение `VALUE_TYPE` по [таблице значений](./crm-multifield-fields.md#value-type): оно зависит от `TYPE_ID`

3. Передайте значения в поле объекта CRM методом создания или обновления

4. Чтобы изменить сохраненный номер или адрес, передайте новое значение вместе с идентификатором старого — его возвращает метод чтения. В устаревших методах идентификатор указывают полем `ID` внутри элемента, а в методе [crm.item.update](../../universal/crm-item-update.md) — ключом элемента в объекте `fm`, как в [примере](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md#fm-format)

5. Проверьте сохраненные данные методом чтения объекта

{% note warning "" %}

Без идентификатора метод не заменит старое значение, а сохранит новое рядом. Повторы он не добавляет: если в поле `PHONE` уже есть этот номер с подтипом `WORK`, второй такой же не появится.

{% endnote %}

Права на запись проверяет тот метод, которым вы создаете или обновляете объект. Сколько символов можно передать в значении, описано в статье [Ограничения длины полей CRM](../../field-length-limits.md#related-data), а как часто можно вызывать методы — в статье [Лимиты REST API](../../../../settings/performance/limits.md).

## Связь множественных полей с объектами CRM

Как передавать контактные данные, зависит от методов: универсальных или устаревших.

**Универсальные методы.** Методы [crm.item.add](../../universal/crm-item-add.md), [crm.item.update](../../universal/crm-item-update.md) и [crm.item.get](../../universal/crm-item-get.md) работают с контактными данными в поле `fm`. При создании в него передают массив объектов с ключами `typeId`, `valueType` и `value`, например `{"typeId": "PHONE", "valueType": "WORK", "value": "+79001234567"}`. В ответе чтения у каждого значения есть еще `id`.

**Устаревшие методы.** Развитие методов лидов, контактов и компаний остановлено. Они принимают и возвращают контактные данные в полях `PHONE`, `EMAIL`, `WEB` и `IM`. Значение каждого поля — массив объектов [crm_multifield](../../data-types.md#crm_multifield). Методы для каждого объекта:

- лид — [crm.lead.add](../../leads/crm-lead-add.md), [crm.lead.update](../../leads/crm-lead-update.md), [crm.lead.get](../../leads/crm-lead-get.md)
- контакт — [crm.contact.add](../../contacts/crm-contact-add.md), [crm.contact.update](../../contacts/crm-contact-update.md), [crm.contact.get](../../contacts/crm-contact-get.md)
- компания — [crm.company.add](../../companies/crm-company-add.md), [crm.company.update](../../companies/crm-company-update.md), [crm.company.get](../../companies/crm-company-get.md)

## Пример структуры значения

Так телефон и e-mail передают в устаревших методах:

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

Чаще всего в `PHONE` передают `VALUE_TYPE` со значением `MOBILE` или `WORK`, а в `EMAIL` — `WORK` или `HOME`. Полный список значений `VALUE_TYPE` для телефона, почты, сайта и мессенджера — в описании метода [crm.multifield.fields](./crm-multifield-fields.md#value-type).

{% note tip "Частые кейсы и сценарии" %}

- [Как изменить или удалить номера телефонов и email](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [Как добавить лид через веб-форму](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-lead.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на чтение лидов, сделок или других объектов CRM, в том числе в цифровых рабочих местах

#|
|| **Метод** | **Описание** ||
|| [crm.multifield.fields](./crm-multifield-fields.md) | Возвращает описание множественных полей ||
|#
