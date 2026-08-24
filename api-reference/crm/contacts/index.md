# Контакты в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Контакт — объект CRM, в котором хранятся данные клиентов — физических лиц. В карточке контакта находятся телефоны, электронные адреса, идентификаторы мессенджеров в специальном формате, позволяющем использовать их для коммуникации с клиентом сразу через Битрикс24.

{% note warning "" %}

Развитие методов `crm.contact.*` и `crm.contact.details.configuration.*` остановлено. Для новой разработки используйте универсальные методы `crm.item.*` с `entityTypeId = 3`. Методы связи с компаниями `crm.contact.company.*` и пользовательских полей `crm.contact.userfield.*` продолжают работать.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [контакты в Битрикс24](https://helpdesk.bitrix24.ru/open/5491741/)

## Актуальная версия API

Контакт — один из типов объектов CRM, поэтому им управляют [универсальные методы](../universal/index.md) `crm.item.*` с `entityTypeId = 3`. Методы `crm.contact.*` продолжают работать, оставляйте их только в существующих интеграциях.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.contact.add` | [crm.item.add](../universal/crm-item-add.md) ||
|| `crm.contact.update` | [crm.item.update](../universal/crm-item-update.md) ||
|| `crm.contact.get` | [crm.item.get](../universal/crm-item-get.md) ||
|| `crm.contact.list` | [crm.item.list](../universal/crm-item-list.md) ||
|| `crm.contact.delete` | [crm.item.delete](../universal/crm-item-delete.md) ||
|| `crm.contact.fields` | [crm.item.fields](../universal/crm-item-fields.md) ||
|| `crm.contact.details.configuration.*` | [crm.item.details.configuration.*](../universal/item-details-configuration/index.md) ||
|#

У групп методов [crm.contact.company.*](./company/index.md) и [crm.contact.userfield.*](./userfield/index.md) замены нет, они актуальны.

Имена полей в двух группах методов различаются: `crm.contact.*` принимает и возвращает поля в формате `UPPER_CASE`, например `LAST_NAME`, а `crm.item.*` — в формате `camelCase`, например `lastName`. Точный состав полей возвращает метод [crm.item.fields](../universal/crm-item-fields.md) с `entityTypeId = 3`.

## Как начать работу

1. Получите описание полей контакта методом [crm.contact.fields](./crm-contact-fields.md) — он вернет системные и пользовательские поля с их типами.
2. Создайте контакт методом [crm.contact.add](./crm-contact-add.md). Заполните `NAME` или `LAST_NAME`: если оба поля пустые, метод вернет ошибку. Телефоны и почту передавайте множественными полями `PHONE` и `EMAIL` — это массивы объектов с ключами `VALUE` и `VALUE_TYPE`.
3. Свяжите контакт с компаниями группой методов [crm.contact.company.*](./company/index.md), если клиент представляет несколько компаний.
4. Найдите нужные контакты методом [crm.contact.list](./crm-contact-list.md): он принимает `filter`, `order` и `select`, а выдачу отдает страницами по 50 записей.
5. Ведите коммуникацию с клиентом в карточке контакта — делами [crm.activity.*](../timeline/activities/index.md) и записями таймлайна [crm.timeline.*](../timeline/index.md).
6. Подпишитесь на [события контакта](./events/index.md), чтобы получать уведомления об изменениях в приложение.

## Связь контакта с другими объектами CRM

**Сделка, лид, смарт-процесс.** У любого объекта CRM, в котором доступно стандартное поле `Клиент`, есть связь с контактами. Изменение связи регулируется через группы методов [сделок](../deals/index.md), [лидов](../leads/index.md), [смарт-процессов](../universal/index.md).

**Компания.** Один контакт может быть привязан к нескольким компаниям. Для управления этой связью используется группа методов [crm.contact.company.*](./company/index.md). Когда вы выбираете компанию в поле `Клиент` в сделках или смарт-процессах, все связанные с ней контакты подтягиваются в поле автоматически.

**Реквизиты.** Сами реквизиты это отдельный объект, для их создания или изменения используются методы группы [crm.requisite.*](../requisites/index.md) и [crm.address.*](../requisites/addresses/index.md). В карточке контакта они выводятся в поле `Реквизиты`.

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Связи реквизитов с объектами CRM](../requisites/links/index.md)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)

{% endnote %}

## Карточка контакта

Основное рабочее пространство в контакте — это вкладка Общее его карточки. Она состоит из двух частей:

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей контактов используется группа методов [crm.contact.userfield.*](./userfield/index.md)

* правая, в ней располагается таймлайн контакта. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки контакта можно управлять через группу методов [crm.contact.details.configuration.*](./custom-form/index.md).

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку контакта можно встроить приложение и работать с ним, не покидая карточку.

Есть два сценария встройки:

* использовать специальные [места встраивания](../../widgets/crm/index.md), например создать свою вкладку
* создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое загружается интерфейс вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода — методы контактов и связи с компаниями проверяют права доступа к контактам, а создание, изменение и удаление пользовательских полей доступно только администратору CRM. Подписаться на события может любой пользователь

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
|| [crm.contact.company.delete](./company/crm-contact-company-delete.md) | Удаляет компанию из указанного контакта ||
|| [crm.contact.company.items.get](./company/crm-contact-company-items-get.md) | Возвращает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.items.set](./company/crm-contact-company-items-set.md) | Устанавливает набор компаний, связанных с указанным контактом ||
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
|| [crm.contact.details.configuration.get](./custom-form/crm-contact-details-configuration-get.md) | Возвращает настройки карточки контакта ||
|| [crm.contact.details.configuration.set](./custom-form/crm-contact-details-configuration-set.md) | Устанавливает настройки карточки контакта ||
|| [crm.contact.details.configuration.reset](./custom-form/crm-contact-details-configuration-reset.md) | Сбрасывает настройки карточки контакта ||
|| [crm.contact.details.configuration.forceCommonScopeForAll](./custom-form/crm-contact-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку контакта для всех пользователей ||
|#