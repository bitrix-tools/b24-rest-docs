# Компании в CRM: обзор методов

Компания — объект CRM, в котором хранятся данные клиентов  — юридических лиц. В карточке компании находятся: 
* телефоны, электронные адреса, идентификаторы мессенджеров  в специальном формате. Они позволяют связываться с клиентом напрямую из Битрикс. 
* данные реквизитов, с которыми формируются счета, договоры и любые другие виды печатных документов по шаблонам. 

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [компании в Битрикс24](https://helpdesk.bitrix24.ru/open/5493389/) 

## Связь компании с другими объектами CRM

**Сделка, лид, смарт-процесс.** У любого объекта CRM, в котором доступно стандартное поле `Клиент`,  есть связь с компанией. Изменение связи регулируется через группы методов [сделок](../deals/index.md), [лидов](../leads/index.md), [смарт-процессов](../universal/index.md), поле `COMPANY_ID`.

**Контакт.** К одной компании может быть привязано несколько контактов. Для управления этой связью используется группа методов [crm.company.contact.*](./contacts/index.md). Когда вы выбираете компанию в поле `Клиент` сделок, смарт-процессов, все связанные с ней контакты подтягиваются в поле автоматически. 

**Реквизиты.** Сами реквизиты это отдельный объект, для их создания или изменения используются методы группы [crm.requisite.*](../requisites/index.md) и [crm.address.*](../requisites/addresses/index.md). В карточке компании они выводятся в поле `Реквизиты`. 

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Связи реквизитов с объектами CRM](../requisites/links/index.md)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)

{% endnote %}

## Карточка компании

Основное рабочее пространство в компании — это вкладка Общее ее карточки. Она состоит из двух частей: 

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей компаний используется группа методов [crm.company.userfield.*](./userfields/index.md)

* правая, в ней располагается таймлайн контакта.  В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки компании можно управлять через группу методов [crm.company.details.configuration.*](./custom-form/index.md). 

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку компании можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку компании.

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
    || [crm.company.add](./crm-company-add.md) | Создает новую компанию ||
    || [crm.company.update](./crm-company-update.md) | Обновляет существующую компанию ||
    || [crm.company.get](./crm-company-get.md) | Возвращает компанию по идентификатору ||
    || [crm.company.list](./crm-company-list.md) | Возвращает список компаний по фильтру ||
    || [crm.company.delete](./crm-company-delete.md) | Удаляет компанию и все связанные с ней объекты ||
    || [crm.company.fields](./crm-company-fields.md) | Возвращает описание полей компании ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmCompanyAdd](./events/on-crm-company-add.md) | при создании компании ||
    || [onCrmCompanyUpdate](./events/on-crm-company-update.md) | при обновлении компании ||
    || [onCrmCompanyDelete](./events/on-crm-company-delete.md) | при удалении компании ||
    |#

{% endlist %}

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) | Создаёт новое пользовательское поле для компаний ||
    || [crm.company.userfield.update](./userfields/crm-company-userfield-update.md) | Обновляет существующее пользовательское поле компаний ||
    || [crm.company.userfield.get](./userfields/crm-company-userfield-get.md) | Возвращает пользовательское поле компаний по идентификатору ||
    || [crm.company.userfield.list](./userfields/crm-company-userfield-list.md) | Возвращает список пользовательских полей компаний по фильтру ||
    || [crm.company.userfield.delete](./userfields/crm-company-userfield-delete.md) | Удаляет пользовательское поле компаний ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmCompanyUserFieldAdd](./userfields/events/on-crm-company-user-field-add.md) | при добавлении пользовательского поля ||
    || [onCrmCompanyUserFieldUpdate](./userfields/events/on-crm-company-user-field-update.md) | при изменении пользовательского поля ||
    || [onCrmCompanyUserFieldDelete](./userfields/events/on-crm-company-user-field-delete.md) | при удалении пользовательского поля ||
    || [onCrmCompanyUserFieldSetEnumValues](./userfields/events/on-crm-company-user-field-set-enum-values.md) | при изменении набора значений для пользовательского поля списочного типа ||
    |#

{% endlist %}

### Контакты

#|
|| **Метод** | **Описание** ||
|| [crm.company.contact.add](./contacts/crm-company-contact-add.md) | Добавляет контакт к указанной компании ||
|| [crm.company.contact.items.get](./contacts/crm-company-contact-items-get.md) | Возвращает набор контактов, связанных с указанной компанией ||
|| [crm.company.contact.items.set](./contacts/crm-company-contact-items-set.md) | Устанавливает набор контактов, связанных с указанной компанией ||
|| [crm.company.contact.delete](./contacts/crm-company-contact-delete.md) | Удаляет контакт из указанной компании ||
|| [crm.company.contact.items.delete](./contacts/crm-company-contact-items-delete.md) | Очищает набор контактов, связанных с указанной компанией ||
|| [crm.company.contact.fields](./contacts/crm-company-contact-fields.md) | Возвращает описание полей для связи компания-контакт ||
|#

### Управление карточками компаний

#|
|| **Метод** | **Описание** ||
|| [crm.company.details.configuration.get](./custom-form/crm-company-details-configuration-get.md) | Получает настройки карточки компаний ||
|| [crm.company.details.configuration.reset](./custom-form/crm-company-details-configuration-reset.md) | Сбрасывает настройки карточки компаний ||
|| [crm.company.details.configuration.set](./custom-form/crm-company-details-configuration-set.md) | Устанавливает настройки карточки компаний ||
|| [crm.company.details.configuration.forceCommonScopeForAll](./custom-form/crm-company-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку компаний для всех пользователей ||
|#
