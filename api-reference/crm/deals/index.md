# Сделки в CRM: обзор методов

[Сделка](https://helpdesk.bitrix24.ru/open/5493461/) — одна из ключевых сущностей CRM, в ней:

* ведется диалог с клиентом: звонки, письма, чаты открытых линий 
* вы можете просмотреть историю работы: дела, записи таймлайна
* можно управлять процессом продажи товара или услуги, включая отслеживание этапов и прием онлайн-платежей

> Если вы уже знакомы с особенностями сделок, вы можете сразу перейти к [списку доступных методов и событий](#obzor-metodov)

## Связь сделок  с другими объектами CRM

**Клиент.** Поле в карточке сделки, состоящее из связанных с ней компании и контактов. Все дела звонков, писем, чатов с контактом или компанией будут сохранены в карточке активной сделки. Компания в поле одна, обращение к ней происходит напрямую через поле сделки `COMPANY_ID`. Контактов может быть указано несколько, взаимодействие с ними ведется через отдельную группу методов [crm.deal.contact.*](./contacts/index.md).

**Товары.** Добавление, изменение, удаление товарных позиций в сделках возможно через группу методов [crm.item.productrow.*](../universal/product-rows/index.md).

**Оплаты.** Добавление, изменение, удаление документов оплаты в сделках возможно через группу методов [crm.item.payment.*](../universal/payment/index.md).  

{% note tip "Пользовательские сценарии" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как принимать оплату от клиентов и работать с чеками в Битрикс24](https://helpdesk.bitrix24.ru/open/18225080/)

{% endnote %}

## Воронки и стадии сделок

Для сделок можно создавать различные воронки продаж и управлять ими через группу методов [crm.category.*](../universal/category/index.md) `entityTypeId` сделки = `2`.

В каждой воронке будут свои стадии. Ими можно управлять  через группу методов справочников CRM — [crm.status.*](../status/index.md). `ENTITY_ID` статусов сделок оригинальный у каждого направления — `DEAL_STAGE_xx`. 

Получить историю движения сделки по стадиям текущей воронки можно через метод [crm.stagehistory.list](../crm-stage-history-list.md). 

{% note tip "Пользовательские сценарии" %}

- [Воронки продаж: как в CRM разделить работу по отделам](https://helpdesk.bitrix24.ru/open/20732764/)

{% endnote %}

## Карточка сделки

Основное рабочее пространство в сделке — это вкладка Общее ее карточки. Она состоит из двух частей:

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие . Для создания, изменения, получения или удаления пользовательских полей сделок используется группа методов [crm.deal.userfield.*](./user-defined-fields/index.md)

* правая, в ней располагается таймлайн сделки. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки сделки можно управлять в зависимости от воронки через группу методов [crm.deal.details.configuration.*](./custom-form/index.md).

{% note tip "Пользовательские сценарии" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/16749348/)

{% endnote %}

## Виджеты

В карточку сделки можно встроить приложение. Благодаря встраиванию можно будет использовать  приложение и не покидать карточку сделки.

Есть два сценария встройки:

* Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
* Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается интерфейс вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Регулярные сделки

Автоматическое создание однотипных [регулярных сделок](https://helpdesk.bitrix24.ru/open/18453980/) по шаблонам. Для управлениям шаблонами используется группа методов [crm.deal.recurring.*](./recurring-deals/index.md).

## Обзор методов и событий

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.deal.add](./crm-deal-add.md) | Создает новую сделку ||
    || [crm.deal.update](./crm-deal-update.md) | Изменяет сделку ||
    || [crm.deal.get](./crm-deal-get.md) | Возвращает сделку по идентификатору ||
    || [crm.deal.list](./crm-deal-list.md) | Возвращает список сделок по фильтру ||
    || [crm.deal.delete](./crm-deal-delete.md) | Удаляет сделку и все связанные с ней объекты ||
    || [crm.deal.fields](./crm-deal-fields.md) | Возвращает описание полей сделки ||
    || [crm.deal.productrows.set](./crm-deal-productrows-set.md) | Добавляет товары в сделку ||
    || [crm.deal.productrows.get](./crm-deal-get.md) | Возвращает товары сделки ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealAdd](./events/on-crm-deal-add.md) | На создание сделки. ||
    || [onCrmDealUpdate](./events/on-crm-deal-update.md) | На изменение сделки. ||
    || [onCrmDealDelete](./events/on-crm-deal-delete.md) | На удаление сделки. ||
    || [onCrmDealUserFieldAdd](./events/on-crm-deal-user-field-add.md) | На добавление пользовательского поля. ||
    || [onCrmDealUserFieldUpdate](./events/on-crm-deal-user-field-update.md) | На изменение пользовательского поля. ||
    || [onCrmDealUserFieldDelete](./events/on-crm-deal-user-field-delete.md) | На удаление пользовательского поля. ||
    || [onCrmDealUserFieldSetEnumValues](./events/on-crm-deal-user-field-set-enum-values.md) | На изменение набора значений для пользовательского поля списочного типа. ||
    || [onCrmDealRecurringAdd](./events/on-crm-deal-recurring-add.md) | На создание новой регулярной сделки. ||
    || [onCrmDealRecurringUpdate](./events/on-crm-deal-recurring-update.md) | На изменение регулярной сделки. ||
    || [onCrmDealRecurringDelete](./events/on-crm-deal-recurring-delete.md) | На удаление регулярной сделки. ||
    || [onCrmDealRecurringExpose](./events/on-crm-deal-recurring-expose.md) | На создание новой сделки из регулярной сделки. ||
    |#

{% endlist %}
  
### Регулярные сделки

#|
|| **Метод** | **Описание** ||
|| [crm.deal.recurring.add](./recurring-deals/crm-deal-recurring-add.md) | Создание новой рекурентной сделки. ||
|| [crm.deal.recurring.fields](./recurring-deals/crm-deal-recurring-fields.md) | Просмотр списка полей шаблона регулярной сделки. ||
|| [crm.deal.recurring.expose](./recurring-deals/crm-deal-recurring-expose.md) | Создание новой сделки из шаблона. ||
|| [crm.deal.recurring.update](./recurring-deals/crm-deal-recurring-update.md) | Изменение существующей настройки для шаблона регулярной сделки. ||
|| [crm.deal.recurring.get](./recurring-deals/crm-deal-recurring-get.md) | Получение полей настройки шаблона регулярной сделки по Id. ||
|| [crm.deal.recurring.list](./recurring-deals/crm-deal-recurring-list.md) | Получение списка настроек шаблонов регулярных сделок. ||
|| [crm.deal.recurring.delete](./recurring-deals/crm-deal-recurring-delete.md) | Удаление существующей настройки для шаблона регулярной сделки. ||
|#

### Пользовательские поля

#|
|| **Метод** | **Описание** ||
|| [crm.deal.userfield.add](./user-defined-fields/crm-deal-userfield-add.md) | Создание нового пользовательского поля для сделок. ||
|| [crm.deal.userfield.update](./user-defined-fields/crm-deal-userfield-update.md) | Изменение существующего пользовательского поля сделок. ||
|| [crm.deal.userfield.get](./user-defined-fields/crm-deal-userfield-get.md) | Получение пользовательского поля сделок по Id. ||
|| [crm.deal.userfield.list](./user-defined-fields/crm-deal-userfield-list.md) | Получение списка пользовательских полей сделок. ||
|| [crm.deal.userfield.delete](./user-defined-fields/crm-deal-userfield-delete.md) | Удаление пользовательского поля сделок. ||
|#

### Контакты сделки

#|
|| **Метод** | **Описание** ||
|| [crm.deal.contact.add](./contacts/crm-deal-contact-add.md) | Добавление контакта к сделке. ||
|| [crm.deal.contact.items.set](./contacts/crm-deal-contact-items-set.md) | Добавление нескольких контактов к сделке. ||
|| [crm.deal.contact.fields](./contacts/crm-deal-contact-fields.md) | Просмотр полей для связи сделка-контакт. ||
|| [crm.deal.contact.items.get](./contacts/crm-deal-contact-items-get.md) | Набор контактов, связанных со сделкой. ||
|| [crm.deal.contact.delete](./contacts/crm-deal-contact-delete.md) | Удаление контакта из указанной сделки. ||
|| [crm.deal.contact.items.delete](./contacts/crm-deal-contact-items-delete.md) | Удаление набора контактов, связанных с указанной сделкой. ||
|#

### Управление карточками сделок

#|
|| **Метод** | **Описание** ||
|| [crm.deal.details.configuration.get](./custom-form/crm-deal-details-configuration-get.md) | Получает настройки карточки сделок ||
|| [crm.deal.details.configuration.reset](./custom-form/crm-deal-details-configuration-reset.md) | Сбрасывает настроек карточки сделок ||
|| [crm.deal.details.configuration.set](./custom-form/crm-deal-details-configuration-set.md) | Позволяет установить настройки карточки сделок ||
|| [crm.deal.details.configuration.forceCommonScopeForAll](./custom-form/crm-deal-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку сделок для всех пользователей ||
|#
