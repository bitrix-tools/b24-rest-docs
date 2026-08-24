# Коммерческие предложения в CRM: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коммерческое предложение — объект CRM, в котором можно формировать печатные документы и отправлять их клиенту перед сделкой. У предложения есть тема, стадия, сумма в валюте, список товарных позиций и клиент — компания и контакты.

{% note warning "" %}

Развитие методов работы с предложениями `crm.quote.*` остановлено. Для новой разработки используйте универсальные методы `crm.item.*` с `entityTypeId = 7`. Методы пользовательских полей `crm.quote.userfield.*` продолжают работать.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [коммерческие предложения в Битрикс24](https://helpdesk.bitrix24.ru/open/17614102/)

## Актуальная версия API

Предложение — один из типов объектов CRM, поэтому им управляют [универсальные методы](../universal/index.md) `crm.item.*` с `entityTypeId = 7`. Методы `crm.quote.*` остаются только для поддержки существующих интеграций.

#|
|| **Если вам нужно** | **Открывайте метод** ||
|| Создать предложение | [crm.item.add](../universal/crm-item-add.md) ||
|| Изменить предложение | [crm.item.update](../universal/crm-item-update.md) ||
|| Получить предложение по идентификатору | [crm.item.get](../universal/crm-item-get.md) ||
|| Получить список предложений по фильтру | [crm.item.list](../universal/crm-item-list.md) ||
|| Удалить предложение | [crm.item.delete](../universal/crm-item-delete.md) ||
|| Получить описание полей предложения | [crm.item.fields](../universal/crm-item-fields.md) ||
|| Управлять товарными позициями предложения | [crm.item.productrow.*](../universal/product-rows/index.md) с `ownerType = Q` ||
|| Заменить весь набор контактов предложения | [crm.item.update](../universal/crm-item-update.md) с полем `contactIds` ||
|#

В универсальных методах имена полей записываются в `camelCase`: `TITLE` превращается в `title`, `ASSIGNED_BY_ID` — в `assignedById`. Правила преобразования пользовательских полей описаны в разделе [Универсальные методы CRM](../universal/index.md).

Часть полей в универсальных методах называется иначе: стадия предложения `STATUS_ID` приходит в поле `stageId`, а множественное поле `CONTACT_IDS` — в поле `contactIds`. Точный состав полей для предложения возвращает метод [crm.item.fields](../universal/crm-item-fields.md) с `entityTypeId = 7`.

## Как начать работу

1. Получите описание полей предложения методом [crm.quote.fields](./crm-quote-fields.md) — он вернет системные и пользовательские поля с их типами
2. Узнайте доступные стадии методом [crm.status.list](../status/crm-status-list.md) с фильтром `ENTITY_ID = QUOTE_STATUS`, а список валют — методом [crm.currency.list](../currency/crm-currency-list.md)
3. Создайте предложение методом [crm.quote.add](./crm-quote-add.md): передайте тему `TITLE`, стадию `STATUS_ID`, компанию клиента `COMPANY_ID` или контакты `CONTACT_IDS` и вашу компанию `MYCOMPANY_ID`
4. Добавьте товарные позиции методом [crm.quote.productrows.set](./crm-quote-product-rows-set.md), проверить их состав можно методом [crm.quote.productrows.get](./crm-quote-product-rows-get.md)
5. Подпишитесь на [события предложений](./events/index.md), чтобы получать уведомления об изменениях в приложение

## Связь предложений с другими объектами CRM

**Клиент.** Компания и контакты, которым адресовано предложение. Компания в предложении одна, ее идентификатор передается в поле `COMPANY_ID`. Контактов может быть несколько, их идентификаторы передаются массивом в множественном поле `CONTACT_IDS`. Найти нужные идентификаторы можно методами [crm.company.list](../companies/crm-company-list.md) и [crm.contact.list](../contacts/crm-contact-list.md). Читать и менять контакты уже созданного предложения по одному удобнее группой методов [crm.quote.contact.*](./contacts/index.md): поле `CONTACT_IDS` в выдаче [crm.quote.get](./crm-quote-get.md) и [crm.quote.list](./crm-quote-list.md) не возвращается.

**Сделка.** Предложение может быть создано на основании сделки и наоборот. Идентификатор сделки хранится в поле предложения `DEAL_ID`, его можно передать в методы [crm.quote.add](./crm-quote-add.md) и [crm.quote.update](./crm-quote-update.md).

**Лид.** Если предложение выставлено по лиду, его идентификатор хранится в поле `LEAD_ID`. Поле заполняется автоматически при конвертации лида и доступно для изменения теми же методами.

**Счет.** Счет связывается с предложением универсальным методом [crm.item.add](../universal/crm-item-add.md): передайте `entityTypeId = 31` и идентификатор предложения в поле `parentId7`.

**Товары.** Товарные позиции предложения создает и обновляет метод [crm.quote.productrows.set](./crm-quote-product-rows-set.md), возвращает — [crm.quote.productrows.get](./crm-quote-product-rows-get.md). Идентификатор товара для позиции можно получить методом [catalog.product.list](../../catalog/product/catalog-product-list.md).

**Реквизиты.** Реквизиты покупателя подтягиваются в форму предложения из связанных с ним контакта или компании. Реквизиты продавца берутся из компании, указанной в поле `MYCOMPANY_ID`. Явно указать пару реквизитов покупателя и продавца можно методом [crm.requisite.link.register](../requisites/links/crm-requisite-link-register.md), передав `ENTITY_TYPE_ID = 7` и идентификатор предложения в `ENTITY_ID`.

{% note tip "Пользовательская документация" %}

- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как использовать реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/15987420/)

{% endnote %}

## Карточка предложения

Основное рабочее пространство предложения — вкладка *Общее* его карточки. Она состоит из двух частей:

- левая, в ней располагаются поля с информацией. Если системных полей недостаточно, добавьте собственные пользовательские поля группой методов [crm.quote.userfield.*](./user-field/index.md). Они хранят информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Имя такого поля начинается с префикса `UF_CRM_`, и по этому имени поле передается в [crm.quote.add](./crm-quote-add.md) и возвращается в [crm.quote.get](./crm-quote-get.md)

- правая, в ней располагается таймлайн предложения. Дела CRM в нем создает, изменяет и удаляет группа методов [crm.activity.*](../timeline/activities/index.md) — предложение указывается в них парой `OWNER_TYPE_ID = 7` и `OWNER_ID`. Записями таймлайна управляет группа методов [crm.timeline.*](../timeline/index.md), в них предложение указывается парой `ENTITY_TYPE = quote` и `ENTITY_ID`

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку коммерческого предложения можно встроить приложение и работать с ним, не покидая карточку. Есть два сценария встройки:

- занять специальное [место встраивания](../../widgets/crm/index.md) — например, создать свою вкладку в карточке
- создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое загружается контент вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода — методы предложений проверяют права доступа к коммерческим предложениям, а создание, изменение и удаление пользовательских полей доступно только администратору CRM

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.quote.add](./crm-quote-add.md) | Создает новое коммерческое предложение ||
    || [crm.quote.update](./crm-quote-update.md) | Изменяет существующее предложение ||
    || [crm.quote.get](./crm-quote-get.md) | Возвращает коммерческое предложение по идентификатору ||
    || [crm.quote.list](./crm-quote-list.md) | Возвращает список предложений по фильтру ||
    || [crm.quote.delete](./crm-quote-delete.md) | Удаляет коммерческое предложение ||
    || [crm.quote.fields](./crm-quote-fields.md) | Возвращает описание полей коммерческого предложения ||
    || [crm.quote.productrows.get](./crm-quote-product-rows-get.md) | Возвращает товарные позиции предложения ||
    || [crm.quote.productrows.set](./crm-quote-product-rows-set.md) | Создает или обновляет товарные позиции предложения ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmQuoteAdd](./events/on-crm-quote-add.md) | При создании предложения вручную или методом [crm.quote.add](./crm-quote-add.md) ||
    || [onCrmQuoteUpdate](./events/on-crm-quote-update.md) | При обновлении предложения вручную или методом [crm.quote.update](./crm-quote-update.md) ||
    || [onCrmQuoteDelete](./events/on-crm-quote-delete.md) | При удалении предложения вручную или методом [crm.quote.delete](./crm-quote-delete.md) ||
    |#

{% endlist %}

### Контакты

#|
|| **Метод** | **Описание** ||
|| [crm.quote.contact.add](./contacts/crm-quote-contact-add.md) | Связывает один контакт с предложением ||
|| [crm.quote.contact.delete](./contacts/crm-quote-contact-delete.md) | Убирает один контакт из предложения ||
|| [crm.quote.contact.items.get](./contacts/crm-quote-contact-items-get.md) | Возвращает набор контактов, связанных с предложением ||
|| [crm.quote.contact.items.set](./contacts/crm-quote-contact-items-set.md) | Заменяет набор контактов предложения на переданный ||
|| [crm.quote.contact.items.delete](./contacts/crm-quote-contact-items-delete.md) | Убирает из предложения все контакты ||
|| [crm.quote.contact.fields](./contacts/crm-quote-contact-fields.md) | Возвращает описание полей связи предложения с контактом ||
|#

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.quote.userfield.add](./user-field/crm-quote-user-field-add.md) | Создает новое пользовательское поле для предложений ||
    || [crm.quote.userfield.update](./user-field/crm-quote-user-field-update.md) | Обновляет существующее пользовательское поле предложений ||
    || [crm.quote.userfield.get](./user-field/crm-quote-user-field-get.md) | Возвращает пользовательское поле предложений по идентификатору ||
    || [crm.quote.userfield.list](./user-field/crm-quote-user-field-list.md) | Возвращает список пользовательских полей предложений по фильтру ||
    || [crm.quote.userfield.delete](./user-field/crm-quote-user-field-delete.md) | Удаляет пользовательское поле предложений ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmQuoteUserFieldAdd](./user-field/events/on-crm-quote-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.quote.userfield.add](./user-field/crm-quote-user-field-add.md) ||
    || [onCrmQuoteUserFieldUpdate](./user-field/events/on-crm-quote-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.quote.userfield.update](./user-field/crm-quote-user-field-update.md) ||
    || [onCrmQuoteUserFieldDelete](./user-field/events/on-crm-quote-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.quote.userfield.delete](./user-field/crm-quote-user-field-delete.md) ||
    || [onCrmQuoteUserFieldSetEnumValues](./user-field/events/on-crm-quote-user-field-set-enum-values.md) | При изменении набора значений пользовательского поля списочного типа вручную или методом [crm.quote.userfield.update](./user-field/crm-quote-user-field-update.md) ||
    |#

{% endlist %}
