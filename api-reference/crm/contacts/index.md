# Контакты в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Контакт — объект CRM, в котором хранятся данные клиентов — физических лиц. В карточке контакта хранятся телефоны, электронные адреса и идентификаторы мессенджеров, через которые можно связаться с клиентом прямо из Битрикс24.

{% note warning "" %}

Развитие методов `crm.contact.*`, `crm.contact.company.*`, `crm.contact.details.configuration.*` и `crm.contact.userfield.*` остановлено. Для новой разработки используйте методы контакта в [REST 3.0](../rest-v3/items/index.md) — таблица замен в разделе [Актуальная версия API](#actual-version).

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [контакты в Битрикс24](https://helpdesk.bitrix24.ru/open/5491741/)

## Актуальная версия API {#actual-version}

Методы контакта есть в [REST 3.0](../rest-v3/items/index.md) под теми же именами, например `crm.contact.add`, но вызываются по адресу `/rest/api/`. Методы `crm.contact.*` относятся к [предыдущей версии API](../previous-api.md), оставляйте их только в существующих интеграциях. Аналоги всех методов CRM собраны на странице [Переход на новые методы CRM](../migration.md).

#|
|| **Метод предыдущей версии** | **Аналог в REST 3.0** ||
|| `crm.contact.add` | [crm.contact.add](../rest-v3/items/crm-entity-add-rest-v3.md) ||
|| `crm.contact.update` | [crm.contact.update](../rest-v3/items/crm-entity-update-rest-v3.md) ||
|| `crm.contact.get` | [crm.contact.get](../rest-v3/items/crm-entity-get-rest-v3.md) ||
|| `crm.contact.list` | [crm.contact.list](../rest-v3/items/crm-entity-list-rest-v3.md) ||
|| `crm.contact.delete` | [crm.contact.delete](../rest-v3/items/crm-entity-delete-rest-v3.md) ||
|| `crm.contact.fields` | [crm.contact.field.list](../rest-v3/fields/crm-entity-field-list-rest-v3.md) ||
|| `crm.contact.company.*` | [crm.contact.get](../rest-v3/items/crm-entity-get-rest-v3.md) и [crm.contact.update](../rest-v3/items/crm-entity-update-rest-v3.md) с полем `companiesId`, [crm.contact.addfieldvalue](../rest-v3/items/crm-entity-add-field-value-rest-v3.md), [crm.contact.deletefieldvalue](../rest-v3/items/crm-entity-delete-field-value-rest-v3.md). Сделать компанию основной при добавлении, не перезаписывая список компаний, может только [crm.contact.company.add](./company/crm-contact-company-add.md) ||
|| `crm.contact.details.configuration.*` | [crm.contact.detailpagelayout.*](../rest-v3/detail-page-layout/index.md). У метода `crm.contact.details.configuration.reset` аналога нет ||
|| `crm.contact.userfield.*` | [crm.contact.field.custom.*](../rest-v3/fields/index.md). Поля типов «Список» `enumeration` и «Файл» `file` создает только [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) ||
|#

Имена полей различаются: `crm.contact.*` принимает и возвращает поля в формате `UPPER_CASE`, например `LAST_NAME`, а REST 3.0 — в формате `camelCase`, например `lastName`. Поля контакта в REST 3.0 описаны на странице [Поля контакта](../rest-v3/items/fields-contact.md).

## Как начать работу {#start}

Порядок для существующих интеграций на методах предыдущей версии. Для новой разработки используйте аналоги из раздела [Актуальная версия API](#actual-version).

1. Получите описание полей контакта методом [crm.contact.fields](./crm-contact-fields.md) — он вернет системные и пользовательские поля с их типами.
2. Создайте контакт методом [crm.contact.add](./crm-contact-add.md). Если `NAME` и `LAST_NAME` не заполнены, контакт создается с фамилией `Контакт #N`, где `N` — его идентификатор. Телефоны и почту передавайте множественными полями `PHONE` и `EMAIL` — это массивы объектов с ключами `VALUE` и `VALUE_TYPE`.
3. Свяжите контакт с компаниями группой методов [crm.contact.company.*](./company/index.md), если клиент представляет несколько компаний.
4. Найдите нужные контакты методом [crm.contact.list](./crm-contact-list.md): он принимает `filter`, `order` и `select`, а выдачу отдает страницами по 50 записей.
5. Ведите коммуникацию с клиентом в карточке контакта — делами [crm.activity.*](../timeline/activities/index.md) и записями таймлайна [crm.timeline.*](../timeline/index.md).
6. Подпишитесь на [события контакта](./events/index.md), чтобы получать уведомления об изменениях в приложение.

Пример данных контакта с телефоном и почтой:

```json
{
    "NAME": "Иван",
    "PHONE": [{"VALUE": "+79991234567", "VALUE_TYPE": "WORK"}],
    "EMAIL": [{"VALUE": "ivan@example.com", "VALUE_TYPE": "WORK"}]
}
```

## Связь контакта с другими объектами CRM

**Сделка, лид, смарт-процесс.** У любого объекта CRM, в котором доступно стандартное поле `Клиент`, есть связь с контактами. Связью управляют методы [сделок](../deals/index.md), [лидов](../leads/index.md) и [смарт-процессов в REST 3.0](../rest-v3/items/index.md): идентификаторы контактов передаются в поля привязки контактов этих объектов.

**Компания.** Один контакт может быть привязан к нескольким компаниям. Для управления этой связью используется группа методов [crm.contact.company.*](./company/index.md). Когда вы выбираете компанию в поле `Клиент` в сделках или смарт-процессах, все связанные с ней контакты подтягиваются в поле автоматически.

**Реквизиты.** Реквизиты — отдельный объект. Реквизиты контакта создают и изменяют методы REST 3.0 [crm.contact.requisite.*](../rest-v3/requisites/index.md), адреса контакта — [crm.contact.address.*](../rest-v3/addresses/index.md). В предыдущей версии API это методы [crm.requisite.*](../requisites/index.md) и [crm.address.*](../requisites/addresses/index.md), в них реквизит привязывается к контакту полями `ENTITY_TYPE_ID = 3` и `ENTITY_ID`. В карточке контакта реквизиты выводятся в поле `Реквизиты`. Подробнее — [Связи реквизитов с объектами CRM](../requisites/links/index.md).

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)

{% endnote %}

## Карточка контакта

Основная рабочая область контакта — вкладка «Общее» в карточке. Она состоит из двух частей:

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Пользовательскими полями контактов управляют методы группы [crm.contact.userfield.*](./userfield/index.md).

* правая, в ней располагается таймлайн контакта с делами и записями. Методы для работы с ними перечислены в шаге 5 раздела [Как начать работу](#start).

Параметрами карточки контакта можно управлять через группу методов [crm.contact.details.configuration.*](./custom-form/index.md).

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку контакта можно встроить приложение и работать с ним, не покидая карточку.

Есть два способа встроить приложение:

* использовать специальные [места встраивания](../../widgets/crm/index.md), например создать свою вкладку
* создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое загружается интерфейс вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода. Методы контактов проверяют права доступа к контактам, методы связи с компаниями — к контактам и компаниям. Свои личные настройки карточки читает и меняет любой пользователь, общие меняет пользователь с правом «Управление общим видом карточки» или «Разрешить изменять настройки» в CRM. Создавать, изменять и удалять пользовательские поля может пользователь с правом «Разрешить изменять настройки» в CRM. Подписаться на события может любой пользователь, для офлайн-событий нужны права администратора

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.contact.add](./crm-contact-add.md) | Создает новый контакт ||
    || [crm.contact.update](./crm-contact-update.md) | Обновляет существующий контакт ||
    || [crm.contact.get](./crm-contact-get.md) | Возвращает контакт по идентификатору ||
    || [crm.contact.list](./crm-contact-list.md) | Возвращает список контактов по фильтру ||
    || [crm.contact.delete](./crm-contact-delete.md) | Удаляет контакт ||
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
    || [crm.contact.userfield.get](./userfield/crm-contact-userfield-get.md) | Возвращает пользовательское поле контактов по идентификатору ||
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