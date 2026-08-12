# Лиды в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Лид — начальная точка воронки продаж. В его карточке собрана информация о заинтересованности клиента в продукте или услуге: заполнения CRM-форм, электронные письма, звонки и чаты с клиентом.

Основная цель работы с лидами — определить, насколько они перспективны, и перевести их в сделки для дальнейшей продажи товара или услуги.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [лиды в Битрикс24](https://helpdesk.bitrix24.ru/open/1357950/)

## Актуальная версия API

Развитие методов `crm.lead.*` и `crm.lead.details.configuration.*` остановлено. Для новой разработки используйте универсальные методы [crm.item.*](../universal/index.md) и передавайте в них `entityTypeId: 1` — это идентификатор типа объекта «Лид». Методы `crm.lead.*` продолжают работать, оставляйте их только в существующих интеграциях.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.lead.add` | [crm.item.add](../universal/crm-item-add.md) ||
|| `crm.lead.update` | [crm.item.update](../universal/crm-item-update.md) ||
|| `crm.lead.get` | [crm.item.get](../universal/crm-item-get.md) ||
|| `crm.lead.list` | [crm.item.list](../universal/crm-item-list.md) ||
|| `crm.lead.delete` | [crm.item.delete](../universal/crm-item-delete.md) ||
|| `crm.lead.fields` | [crm.item.fields](../universal/crm-item-fields.md) ||
|| `crm.lead.productrows.*` | [crm.item.productrow.*](../universal/product-rows/index.md) ||
|| `crm.lead.details.configuration.*` | [crm.item.details.configuration.*](../universal/item-details-configuration/index.md) ||
|#

У групп методов [crm.lead.contact.*](./management-communication/index.md) и [crm.lead.userfield.*](./userfield/index.md) замены нет, они актуальны.

Имена полей в двух группах методов различаются: `crm.lead.*` принимает и возвращает поля в формате `UPPER_CASE`, например `STATUS_ID`, а `crm.item.*` — в формате `camelCase`, например `statusId`.

## Как начать работу

1. Получите список полей лида методом [crm.lead.fields](./crm-lead-fields.md). Он вернет системные и пользовательские поля с их типами и названиями.
2. Создайте лид методом [crm.lead.add](./crm-lead-add.md). Обязательных полей у лида нет, но без заполненного `TITLE` его будет трудно найти в списке.
3. Добавьте в лид товарные позиции методом [crm.lead.productrows.set](./crm-lead-productrows-set.md), если обращение клиента касается конкретных товаров.
4. Свяжите лид с контактами методами [crm.lead.contact.*](./management-communication/index.md), если клиент уже есть в базе.
5. Ведите лид по стадиям методом [crm.lead.update](./crm-lead-update.md), меняя поле `STATUS_ID`. Список стадий возвращает метод [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=STATUS`.
6. Подпишитесь на [события лида](./events/index.md), чтобы получать уведомления об изменениях в реальном времени.

## Связь лидов с другими объектами CRM

**Товары.** Товарные позиции лида задает метод [crm.lead.productrows.set](./crm-lead-productrows-set.md) и возвращает [crm.lead.productrows.get](./crm-lead-productrows-get.md). Универсальная замена этих методов — группа [crm.item.productrow.*](../universal/product-rows/index.md) с параметром `ownerType: L`.

**Сделка.** Связь появляется после конвертации лида в успешный.

**Клиент.** Поле в карточке лида, состоящее из связанных с ним компании и контактов. Поле доступно в форме повторного лида. Если повторные лиды отключены, связывающее поле появляется после создания компании или контакта на основании лида. Компания в лиде одна, обращение к ней происходит напрямую через поле `COMPANY_ID`. Контактов может быть указано несколько, взаимодействие с ними ведется через отдельную группу методов [crm.lead.contact.*](./management-communication/index.md).

{% note tip "Пользовательская документация" %}

- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как сконвертировать лид](https://helpdesk.bitrix24.ru/open/1484389/)
- [Повторные лиды и сделки](https://helpdesk.bitrix24.ru/open/17707848/)
- [Сделки в CRM: обзор методов](../deals/index.md)

{% endnote %}

## Карточка лида

Основное рабочее пространство в лиде — это вкладка «Общее» его карточки. Она состоит из двух частей:

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей лидов используется группа методов [crm.lead.userfield.*](./userfield/index.md)

* правая, в ней располагается таймлайн лида. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Составом секций и полей карточки лида управляет группа методов [crm.lead.details.configuration.*](./custom-form/index.md). Настройки задаются отдельно для карточки простого лида и карточки повторного лида.

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку лида можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку лида.

Есть два сценария встройки:

* использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
* создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружаться контент вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Особенности

**Лид может не сохраниться как лид.** В Битрикс24 есть два режима работы CRM. В классическом режиме лид остается в системе после создания. В простом режиме лидов нет: созданный лид система сразу конвертирует в сделку, и получить его методом [crm.lead.get](./crm-lead-get.md) уже не выйдет. Проверяйте режим методом [crm.settings.mode.get](../crm-settings-mode-get.md) до того, как строить сценарий на лидах.

**Конвертация недоступна в REST.** Отдельного метода конвертации лида в контакт, компанию или сделку нет. Через API можно только перевести лид на успешную стадию методом [crm.lead.update](./crm-lead-update.md) — новые объекты при этом не создаются, их придется создавать отдельными вызовами [crm.contact.add](../contacts/crm-contact-add.md), [crm.company.add](../companies/crm-company-add.md) и [crm.deal.add](../deals/crm-deal-add.md).

**Повторный лид определяется системой.** Признак повторного лида `IS_RETURN_CUSTOMER` доступен только на чтение: он выставляется в `Y` автоматически, когда у лида заполнено поле `CONTACT_ID` или `COMPANY_ID`. Напрямую передать `IS_RETURN_CUSTOMER` в [crm.lead.add](./crm-lead-add.md) или [crm.lead.update](./crm-lead-update.md) нельзя — значение будет пересчитано.

{% note tip "Пользовательская документация" %}

- [Режимы работы CRM](https://helpdesk.bitrix24.ru/open/17611420/)
- [Как сконвертировать лид](https://helpdesk.bitrix24.ru/open/1484389/)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.lead.add](./crm-lead-add.md) | Создает новый лид ||
    || [crm.lead.update](./crm-lead-update.md) | Изменяет лид ||
    || [crm.lead.get](./crm-lead-get.md) | Возвращает лид по идентификатору ||
    || [crm.lead.list](./crm-lead-list.md) | Возвращает список лидов по фильтру ||
    || [crm.lead.delete](./crm-lead-delete.md) | Удаляет лид и все связанные с ним объекты ||
    || [crm.lead.productrows.set](./crm-lead-productrows-set.md) | Устанавливает список товаров лида ||
    || [crm.lead.productrows.get](./crm-lead-productrows-get.md) | Возвращает товары лида ||
    || [crm.lead.fields](./crm-lead-fields.md) | Возвращает описание полей лида ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmLeadAdd](./events/on-crm-lead-add.md) | При добавлении лида вручную или методом [crm.lead.add](./crm-lead-add.md) ||
    || [onCrmLeadUpdate](./events/on-crm-lead-update.md) | При изменении лида вручную или методом [crm.lead.update](./crm-lead-update.md) ||
    || [onCrmLeadDelete](./events/on-crm-lead-delete.md) | При удалении лида вручную или методом [crm.lead.delete](./crm-lead-delete.md) ||
    |#

{% endlist %}

### Связь между лидами и контактами

#|
|| **Метод** | **Описание** ||
|| [crm.lead.contact.add](./management-communication/crm-lead-contact-add.md) | Добавляет привязку контакта к указанному лиду ||
|| [crm.lead.contact.delete](./management-communication/crm-lead-contact-delete.md) | Удаляет привязку контакта к указанному лиду ||
|| [crm.lead.contact.items.get](./management-communication/crm-lead-contact-items-get.md) | Получает список связанных с лидом контактов ||
|| [crm.lead.contact.items.set](./management-communication/crm-lead-contact-items-set.md) | Прикрепляет список контактов к указанному лиду ||
|| [crm.lead.contact.items.delete](./management-communication/crm-lead-contact-items-delete.md) | Удаляет список контактов у лида ||
|| [crm.lead.contact.fields](./management-communication/crm-lead-contact-fields.md) | Получает описание полей для связи лид-контакт, используемых методами семейства `crm.lead.contact.*` ||
|#

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.lead.userfield.add](./userfield/crm-lead-userfield-add.md) | Создает новое поле ||
    || [crm.lead.userfield.update](./userfield/crm-lead-userfield-update.md) | Изменяет поле ||
    || [crm.lead.userfield.get](./userfield/crm-lead-userfield-get.md) | Возвращает поле по коду ||
    || [crm.lead.userfield.list](./userfield/crm-lead-userfield-list.md) | Возвращает список полей ||
    || [crm.lead.userfield.delete](./userfield/crm-lead-userfield-delete.md) | Удаляет поле ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmLeadUserFieldAdd](./userfield/events/on-crm-lead-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.lead.userfield.add](./userfield/crm-lead-userfield-add.md) ||
    || [onCrmLeadUserFieldUpdate](./userfield/events/on-crm-lead-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.lead.userfield.update](./userfield/crm-lead-userfield-update.md) ||
    || [onCrmLeadUserFieldDelete](./userfield/events/on-crm-lead-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.lead.userfield.delete](./userfield/crm-lead-userfield-delete.md) ||
    || [onCrmLeadUserFieldSetEnumValues](./userfield/events/on-crm-lead-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа вручную или методом [crm.lead.userfield.update](./userfield/crm-lead-userfield-update.md) ||
    |#

{% endlist %}

### Управление карточками лидов

#|
|| **Метод** | **Описание** ||
|| [crm.lead.details.configuration.set](./custom-form/crm-lead-details-configuration-set.md) | Устанавливает настройки карточки лидов ||
|| [crm.lead.details.configuration.get](./custom-form/crm-lead-details-configuration-get.md) | Получает параметры настройки карточки лидов ||
|| [crm.lead.details.configuration.reset](./custom-form/crm-lead-details-configuration-reset.md) | Сбрасывает настройки карточки лидов ||
|| [crm.lead.details.configuration.forceCommonScopeForAll](./custom-form/crm-lead-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку лидов для всех пользователей ||
|#
