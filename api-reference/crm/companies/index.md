# Компании в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Компания — объект CRM, в котором хранятся данные клиентов — юридических лиц. В карточке компании находятся:

- телефоны, электронные адреса, идентификаторы мессенджеров в специальном формате. Они позволяют связываться с клиентом напрямую из Битрикс24
- данные реквизитов, с которыми формируются счета, договоры и любые другие виды печатных документов по шаблонам

{% note warning "Развитие методов остановлено" %}

Развитие [основных методов компании](#all-methods) и методов настройки карточки [crm.company.details.configuration.*](./custom-form/index.md) остановлено. Для новой разработки используйте универсальные методы [crm.item.*](../universal/index.md) — таблица замен в разделе [Актуальная версия API](#actual-version).

Методы [crm.company.contact.*](./contacts/index.md) и [crm.company.userfield.*](./userfields/index.md) остаются актуальными.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [компании в Битрикс24](https://helpdesk.bitrix24.ru/open/5493389/)

## Актуальная версия API {#actual-version}

Базовые методы компании и методы настроек ее карточки заменены универсальными методами CRM. Универсальный метод работает с разными типами объектов CRM и получает тип в параметре `entityTypeId`. Для компании `entityTypeId` равен `4`.

#|
|| **Устаревший метод** | **Актуальная замена** ||
|| `crm.company.add` | [crm.item.add](../universal/crm-item-add.md) ||
|| `crm.company.update` | [crm.item.update](../universal/crm-item-update.md) ||
|| `crm.company.get` | [crm.item.get](../universal/crm-item-get.md) ||
|| `crm.company.list` | [crm.item.list](../universal/crm-item-list.md) ||
|| `crm.company.delete` | [crm.item.delete](../universal/crm-item-delete.md) ||
|| `crm.company.fields` | [crm.item.fields](../universal/crm-item-fields.md) ||
|| `crm.company.details.configuration.get` | [crm.item.details.configuration.get](../universal/item-details-configuration/crm-item-details-configuration-get.md) ||
|| `crm.company.details.configuration.set` | [crm.item.details.configuration.set](../universal/item-details-configuration/crm-item-details-configuration-set.md) ||
|| `crm.company.details.configuration.reset` | [crm.item.details.configuration.reset](../universal/item-details-configuration/crm-item-details-configuration-reset.md) ||
|| `crm.company.details.configuration.forceCommonScopeForAll` | [crm.item.details.configuration.forceCommonScopeForAll](../universal/item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) ||
|#

Устаревшие методы продолжают работать — переписывать существующие интеграции не обязательно.

## Как начать работу

1. Получите описание полей компании методом [crm.item.fields](../universal/crm-item-fields.md) с `entityTypeId: 4`. Он вернет системные и пользовательские поля, их типы и обязательность
2. Создайте компанию методом [crm.item.add](../universal/crm-item-add.md) или найдите нужную методом [crm.item.list](../universal/crm-item-list.md). В обоих методах тоже передайте `entityTypeId: 4`
3. Свяжите компанию с контактами группой методов [crm.company.contact.*](./contacts/index.md), а с реквизитами — методами [crm.requisite.*](../requisites/index.md)
4. Подпишитесь на [события компании](./events/index.md), если приложение должно реагировать на изменения

## Связь компании с другими объектами CRM

**Сделка, лид, смарт-процесс.** У любого объекта CRM, в котором доступно стандартное поле `Клиент`, есть связь с компанией. Связь хранится в поле `COMPANY_ID`, в универсальных методах — в поле `companyId`. Изменяйте ее группами методов [сделок](../deals/index.md), [лидов](../leads/index.md) и [смарт-процессов](../universal/index.md).

**Контакт.** К одной компании может быть привязано несколько контактов. Этой связью управляет группа методов [crm.company.contact.*](./contacts/index.md). Когда сотрудник выбирает компанию в поле `Клиент` сделки или смарт-процесса, Битрикс24 может подставить в поле связанные с ней контакты.

**Реквизиты.** Реквизиты — отдельный объект CRM. Создавайте и изменяйте их методами групп [crm.requisite.*](../requisites/index.md) и [crm.address.*](../requisites/addresses/index.md). В карточке компании реквизиты выводятся в поле `Реквизиты`.

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Связи реквизитов с объектами CRM](../requisites/links/index.md)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)

{% endnote %}

## Карточка компании

Основное рабочее пространство в компании — это вкладка «Общее» ее карточки. Она состоит из двух частей:

- левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей компаний используется группа методов [crm.company.userfield.*](./userfields/index.md)

- правая, в ней располагается таймлайн компании. Делами CRM в таймлайне управляет группа методов [crm.activity.*](../timeline/activities/index.md), записями таймлайна — группа методов [crm.timeline.*](../timeline/index.md). Оба набора методов создают, изменяют, фильтруют и удаляют свои объекты

Параметрами карточки компании можно управлять группой методов [crm.item.details.configuration.*](../universal/item-details-configuration/index.md) с `entityTypeId: 4`.

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку компании можно встроить приложение. Тогда сотрудник работает с приложением, не покидая карточку.

Есть два сценария встройки:

- использовать специальные [места встраивания](../../widgets/crm/index.md). Например, создать свою вкладку
- создать пользовательское поле, в которое будет загружаться интерфейс вашего приложения. Пример для лида описан в туториале [Как встроить виджет в лид в виде пользовательского поля](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md)

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## События компании

Приложение может реагировать на изменения компаний практически в реальном времени. События раздела разбиты на две группы:

- [события компаний](./events/index.md) — создание, обновление и удаление компании
- [события пользовательских полей компаний](./userfields/events/index.md) — создание, обновление и удаление поля, а также изменение набора значений списочного поля

Подписаться на события можно через исходящий вебхук или приложение и метод [event.bind](../../events/event-bind.md).

## Формат ответа {#response}

Методы раздела возвращают результат в поле `result`, а время выполнения запроса — в поле [`time`](../../data-types.md#time). Что приходит в `result`, зависит от метода:

- [crm.company.add](./crm-company-add.md) — идентификатор созданной компании
- [crm.company.update](./crm-company-update.md) и [crm.company.delete](./crm-company-delete.md) — `true`
- [crm.company.get](./crm-company-get.md) — объект компании. Имена полей записаны в верхнем регистре, например `TITLE`
- [crm.company.list](./crm-company-list.md) — массив компаний, не больше 50 за запрос. Рядом с `result` приходит `total` — сколько компаний найдено. Если есть следующая страница, приходит и `next` — позиция, с которой ее запросить

Универсальные методы отвечают иначе: [crm.item.get](../universal/crm-item-get.md) и [crm.item.add](../universal/crm-item-add.md) возвращают объект в `result.item`, [crm.item.list](../universal/crm-item-list.md) — массив в `result.items`. Имена полей в них по умолчанию записаны в camelCase, например `title`.

Если вызов не удался, вместо `result` в ответе приходят поля `error` и `error_description`. У многих ошибок основных методов компании код `error` пустой, а причину описывает только текст, например `Not found`. Поэтому проверяйте наличие ключа `error` или HTTP-статус ответа, а не значение кода.

В пакетном запросе [batch](../../../settings/how-to-call-rest-api/batch.md) ошибки команд приходят со статусом `200`. Как их распознать, описано в статье [Коды ошибок](../../../error-codes.md), там же перечислены общие ошибки REST API. Ошибки конкретного метода описаны на его странице.

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
    || [crm.company.delete](./crm-company-delete.md) | Удаляет компанию ||
    || [crm.company.fields](./crm-company-fields.md) | Возвращает описание полей компании ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmCompanyAdd](./events/on-crm-company-add.md) | При создании компании вручную или методом [crm.company.add](./crm-company-add.md) ||
    || [onCrmCompanyUpdate](./events/on-crm-company-update.md) | При обновлении компании вручную или методом [crm.company.update](./crm-company-update.md) ||
    || [onCrmCompanyDelete](./events/on-crm-company-delete.md) | При удалении компании вручную или методом [crm.company.delete](./crm-company-delete.md) ||
    |#

{% endlist %}

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) | Создает новое пользовательское поле для компаний ||
    || [crm.company.userfield.update](./userfields/crm-company-userfield-update.md) | Обновляет существующее пользовательское поле компаний ||
    || [crm.company.userfield.get](./userfields/crm-company-userfield-get.md) | Возвращает пользовательское поле компаний по идентификатору ||
    || [crm.company.userfield.list](./userfields/crm-company-userfield-list.md) | Возвращает список пользовательских полей компаний по фильтру ||
    || [crm.company.userfield.delete](./userfields/crm-company-userfield-delete.md) | Удаляет пользовательское поле компаний ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmCompanyUserFieldAdd](./userfields/events/on-crm-company-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) ||
    || [onCrmCompanyUserFieldUpdate](./userfields/events/on-crm-company-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.company.userfield.update](./userfields/crm-company-userfield-update.md) ||
    || [onCrmCompanyUserFieldDelete](./userfields/events/on-crm-company-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.company.userfield.delete](./userfields/crm-company-userfield-delete.md) ||
    || [onCrmCompanyUserFieldSetEnumValues](./userfields/events/on-crm-company-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа вручную или методами [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) и [crm.company.userfield.update](./userfields/crm-company-userfield-update.md) ||
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
