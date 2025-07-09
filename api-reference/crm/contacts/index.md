# Контакты в CRM: обзор методов

Контакт — объект CRM, в котором хранятся данные клиентов — физических лиц. В карточке контакта находятся телефоны, электронные адреса, идентификаторы мессенджеров в специальном формате, позволяющем использовать их для коммуникации с клиентом сразу через Битрикс. 

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [контакты в Битрикс24](https://helpdesk.bitrix24.ru/open/5491741/) 

## Связь контакта с другими объектами CRM

**Сделка, лид, смарт-процесс.** У любого объекта CRM, в котором доступно стандартное поле `Клиент`, есть связь с контактами. Изменение связи регулируется через группы методов [сделок](../deals/index.md), [лидов](../leads/index.md), [смарт-процессов](../universal/index.md). 

**Компания.** Один контакт может быть привязан к нескольким компаниям. Для управления этой связью используется группа методов [crm.contact.company.*](./company/index.md).  Когда вы выбираете компанию в поле `Клиент` в сделках или смарт-процессах, все связанные с ней контакты подтягиваются в поле автоматически. 

**Реквизиты.** Сами реквизиты это отдельный объект, для их создания или изменения используются методы группы [crm.requisite.*](../requisites/index.md) и [crm.address.*](../requisites/addresses/index.md). В карточке контакта они выводятся в поле `Реквизиты`. 

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Связи реквизитов с объектами CRM](../requisites/links/index.md)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)

{% endnote %}

## Карточка контакта

Основное рабочее пространство в контакте — это вкладка Общее его карточки. Она состоит из двух частей: 

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей контактов используется группа методов [crm.contact.userfield.*](./userfield/index.md)

* правая, в ней располагается таймлайн контакта.  В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки контакта можно управлять через группу методов [crm.contact.details.configuration.*](./custom-form/index.md). 

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку контакта можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку контакта.

Есть два сценария встройки:

* Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
* Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается интерфейс вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Основные

{% list tabs %}

- Методы
  
    #|
    || **Метод** | **Описание** ||
    || [crm.contact.add](./crm-contact-add.md) | Создает новый контакт ||
    || [crm.contact.update](./crm-contact-update.md) | Обновляет существующий контакт ||
    || [crm.contact.get](./crm-contact-get.md) | Возвращает контакт по идентификатору ||
    || [crm.contact.list](./crm-contact-list.md) | Возвращает список контактов по фильтру ||
    || [crm.contact.delete](./crm-contact-delete.md) | Удаляет контакт и все связанные с ним объекты ||
    || [crm.contact.fields](./crm-contact-fields.md) | Возвращает описание полей контакта, в том числе пользовательских ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmContactAdd](./events/on-crm-contact-add.md) | При создании контакта ||
    || [onCrmContactUpdate](./events/on-crm-contact-update.md) | При изменении контакта ||
    || [onCrmContactDelete](./events/on-crm-contact-delete.md) | При удалении контакта ||
    |#


{% endlist %}

### Компании

#|
|| **Метод** | **Описание** ||
|| [crm.contact.company.add](./company/crm-contact-company-add.md) | Добавляет компанию к указанному контакту ||
|| [crm.contact.company.items.get](./company/crm-contact-company-items-get.md) | Получает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.items.set](./company/crm-contact-company-items-set.md) | Устанавливает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.delete](./company/crm-contact-company-delete.md) | Удаляет компанию из указанного контакта ||
|| [crm.contact.company.items.delete](./company/crm-contact-company-items-delete.md) | Очищает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.fields](./company/crm-contact-company-fields.md) | Возвращает описание полей для связи контакт-компания ||
|#

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) | Создает пользовательское поле для контактов ||
    || [crm.contact.userfield.update](./userfield/crm-contact-userfield-update.md) | Изменяет существующее пользовательское поле контактов ||
    || [crm.contact.userfield.get](./userfield/crm-contact-userfield-get.md) | Возвращает пользовательское поле контактов по Id ||
    || [crm.contact.userfield.list](./userfield/crm-contact-userfield-list.md) | Возвращает список пользовательских полей контактов ||
    || [crm.contact.userfield.delete](./userfield/crm-contact-userfield-delete.md) | Удаляет пользовательское поле контактов ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmContactUserFieldAdd](./userfield/events/on-crm-contact-user-field-add.md) | При добавлении пользовательского поля ||
    || [onCrmContactUserFieldUpdate](./userfield/events/on-crm-contact-user-field-update.md) | При изменении пользовательского поля ||
    || [onCrmContactUserFieldDelete](./userfield/events/on-crm-contact-user-field-delete.md) | При удалении пользовательского поля ||
    || [onCrmContactUserFieldSetEnumValues](./userfield/events/on-crm-contact-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа ||
    |#

{% endlist %}

### Управление карточками контактов

#|
|| **Метод** | **Описание** ||
|| [crm.contact.details.configuration.get](./custom-form/crm-contact-details-configuration-get.md) | Получает настройки карточки контактов ||
|| [crm.contact.details.configuration.reset](./custom-form/crm-contact-details-configuration-reset.md) | Сбрасывает настройки карточки контактов ||
|| [crm.contact.details.configuration.set](./custom-form/crm-contact-details-configuration-set.md) | Устанавливает настройки карточки контактов ||
|| [crm.contact.details.configuration.forceCommonScopeForAll](./custom-form/crm-contact-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку контактов для всех пользователей ||
|#