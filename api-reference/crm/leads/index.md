# Лиды в CRM: обзор методов

[Список всех методов раздела](#obzor-metodov)

Лид — начальная точки воронки продаж. В его карточке собрана информация о заинтересованности клиента в продукте или услуге: заполнения CRM-форм, электронные письма, звонки и чаты с с клиентом. 

Основная цель работы с лидами — определить, насколько они перспективны, и перевести их в сделки для дальнейшей продажи товара или услуги.

[Что такое лид и как с ним работать в CRM](https://helpdesk.bitrix24.ru/open/1357950/)

## Связь лидов с другими объектами CRM

**Товары.** Добавление, изменение, удаление товарных позиций в сделках возможно через группу методов [crm.item.productrow.*](../universal/product-rows/index.md).

**Сделка.** Связь появляется после конвертации лида в успешный.

**Клиент.** Поле в карточке лида, состоящее из связанных с ним компании и контактов. Поле доступно в форме повторного лида. Если повторные лиды отключены, связывающее поле появляется после создания компании или контакта на основании лида. Компания в лиде одна, обращение к ней через REST происходит напрямую через поле COMPANY_ID.  Контактов может быть указано несколько, взаимодействие с ними ведется через отдельную группу методов [crm.lead.contact.*](./management-communication/index.md).  

[Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
[Как сконвертировать лид](https://helpdesk.bitrix24.ru/open/1484389/)
[Повторные лиды и сделки](https://helpdesk.bitrix24.ru/open/17707848/)
[Сделки в CRM: обзор методов](../deals/index.md)

## Карточка лида

Основное рабочее пространство в лиде — это вкладка Общее ее карточки. Она состоит из двух частей: 

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей лидов через REST API используется группа методов [crm.lead.userfield.*](./userfield/index.md)

* правая, в ней располагается таймлайн сделки. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки сделки можно управлять в зависимости от воронки через группу методов [crm.lead.details.configuration.*](./custom-form/index.md).

[Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
[Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
[Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
[Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/16749348/)

## Виджеты

В карточку лида можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку лида.

Есть два сценария встройки: 
*  Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
*  Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается контент вашего приложения

[Механизм встройки виджетов](../../widgets/index.md)
[Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

## Особенности

Лиды в CRM могут отсутствовать  — так происходит если активирован простой режим работы CRM.  

Конвертировать лид при помощи REST API невозможно. Можно только сменить стадию на успешную без создания новых сущностей.

Перечень событий лидов, на которые можно подписаться, — [onCrmLead*](./events/index.md).

[Режимы работы CRM](https://helpdesk.bitrix24.ru/open/17611420/)
[Как сконвертировать лид](https://helpdesk.bitrix24.ru/open/1484389/)
[Концепция и преимущества обработки событий](../../../api-reference/events/index.md)

## Обзор методов

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.lead.add](./crm-lead-add.md) | Создает новый лид ||
|| [crm.lead.update](./crm-lead-update.md) | Изменяет лид ||
|| [crm.lead.get](./crm-lead-get.md) | Возвращает лид по идентификатору ||
|| [crm.lead.list](./crm-lead-list.md) | Возвращает список лидов по фильтру ||
|| [crm.lead.delete](./crm-lead-delete.md) | Удаляет лид и все связанные с ним объекты ||
|| [crm.lead.fields](./crm-lead-fields.md) | Возвращает описание полей лида ||
|| [crm.lead.productrows.set](./crm-lead-productrows-set.md) | Добавляет товары в лид ||
|| [crm.lead.productrows.get](./crm-lead-get.md) | Возвращает товары лида ||
|#

## Связь между лидами и контактами

#|
|| **Метод** | **Описание** ||
|| [crm.lead.contact.add](./management-communication/crm-lead-contact-add.md) | Добавляет привязку контакта к указанному лиду ||
|| [crm.lead.contact.delete](./management-communication/crm-lead-contact-delete.md) | Удаляет привязку контакта к указанному лиду ||
|| [crm.lead.contact.items.get](./management-communication/crm-lead-contact-items-get.md) | Получает список связанных с лидом контактов ||
|| [crm.lead.contact.items.set](./management-communication/crm-lead-contact-items-set.md) | Прикрепляет список контактов к указанному лиду ||
|| [crm.lead.contact.items.delete](./management-communication/crm-lead-contact-items-delete.md) | Удаляет список контактов у лида ||
|| [crm.lead.contact.fields](./management-communication/crm-lead-contact-fields.md) | Получает описание полей для связи лид-контакт, используемых методами семейства `crm.lead.contact.*` ||
|#

## Пользователськие поля

#|
|| **Метод** | **Описание** ||
|| [crm.lead.userfield.add](./userfield/crm-lead-userfield-add.md) | Добавление поля. ||
|| [crm.lead.userfield.update](./userfield/crm-lead-userfield-update.md) | Изменение поля. ||
|| [crm.lead.userfield.get](./userfield/crm-lead-userfield-get.md) | Получение поля по коду. ||
|| [crm.lead.userfield.list](./userfield/crm-lead-userfield-list.md) | Получение списка полей. ||
|| [crm.lead.userfield.delete](./userfield/crm-lead-userfield-delete.md) | Удаление поля ||
|#

## Управление карточками лидов 

#|
|| **Метод** | **Описание** ||
|| [crm.lead.details.configuration.get](./custom-form/crm-lead-details-configuration-get.md) | Получает параметры настройки карточки лидов ||
|| [crm.lead.details.configuration.reset](./custom-form/crm-lead-details-configuration-reset.md) | Сбрасывает настройки карточки лидов ||
|| [crm.lead.details.configuration.set](./custom-form/crm-lead-details-configuration-set.md) | Устанавливает настройки карточки лидов ||
|| [crm.lead.details.configuration.forceCommonScopeForAll](./custom-form/crm-lead-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку лидов для всех пользователей ||
|#

