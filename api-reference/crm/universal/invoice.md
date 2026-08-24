# Счета: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Счет — это финальный этап сделки. Он создается, когда все обсуждения завершены, а условия договора согласованы. Для одной сделки можно создать несколько счетов для разных товаров и услуг.

Счет можно сформировать по шаблону и отправить клиенту в виде документа. В карточке счета вы можете:

- управлять процессом продажи товара или услуги
- отслеживать этапы работы со счетом
- принимать онлайн-платежи

Счета — это отдельный тип объекта CRM с идентификатором `entityTypeId = 31`. Работайте с ними универсальными методами `crm.item.*` и передавайте `entityTypeId = 31` в каждом вызове.

{% note warning "" %}

Методы `crm.item.*` работают только со счетами нового типа `entityTypeId = 31`. Для счетов старого типа `entityTypeId = 5` они вернут ошибку `ENTITY_TYPE_NOT_SUPPORTED`.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Новые счета в CRM](https://helpdesk.bitrix24.ru/open/14795982/)

## Как начать работу

1. Получите список доступных полей счета методом [crm.item.fields](./crm-item-fields.md) с `entityTypeId = 31`.
2. Создайте счет методом [crm.item.add](./crm-item-add.md). Свяжите его со сделкой через `parentId2` и укажите клиента в полях `companyId` и `contactIds`.
3. Добавьте товарные позиции методами [crm.item.productrow.*](./product-rows/index.md) с `ownerType = SI`.
4. Создайте оплату методом [crm.item.payment.add](./payment/crm-item-payment-add.md) и получите ссылку для клиента методом [salescenter.payment.getPublicUrl](./payment/salescenter-payment-get-public-url.md).
5. Отслеживайте статус счета методами [crm.item.get](./crm-item-get.md) и [crm.item.list](./crm-item-list.md), меняйте его методом [crm.item.update](./crm-item-update.md).

## Связь счетов с другими объектами CRM

**Сделка.** Передавайте ID сделки в параметре `parentId2`, чтобы новый счет был связан со сделкой.

**Предложение.** Передавайте ID предложения в параметре `parentId7`, чтобы новый счет был связан с предложением.

**Клиент.** Поле в карточке счета, состоящее из связанных с ним компании и контактов. Все дела звонков, писем, чатов с контактом или компанией будут сохранены в карточке счета. Компания в поле одна, обращение к ней происходит через поле счета `companyId`. Контактов может быть указано несколько, взаимодействие с ними ведется через поле `contactIds`, передавайте в поле массив с ID контактов.

**Товары.** Добавление, изменение, удаление товарных позиций в счетах возможно через группу методов [crm.item.productrow.*](./product-rows/index.md).

**Оплаты.** Добавление, изменение, удаление документов оплаты в счетах возможно через группу методов [crm.item.payment.*](./payment/index.md).

**Реквизиты вашей компании.** Укажите ID вашей компании в поле `mycompanyId`, чтобы ее реквизиты автоматически использовались в документах. Получить ID вашей компании можно методом [crm.item.list](./crm-item-list.md): передайте `entityTypeId = 4` и фильтр `isMyCompany = Y`.

**Заказы интернет-магазина.** Заказ можно привязать к счету методами [crm.orderentity.*](./order-entity/index.md), передав `ownerTypeId = 31` и `ownerId` счета.

{% note tip "Пользовательская документация" %}

- [Как принимать оплату от клиентов и работать с чеками в Битрикс24](https://helpdesk.bitrix24.ru/open/18225080/)
- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как использовать реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/15987420/)

{% endnote %}

## Карточка счета

Основное рабочее пространство в счетах — это вкладка «Общее» карточки. Она состоит из двух частей:

- левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей счетов используйте группу методов [userfieldconfig.*](./userfieldconfig/index.md) с `entityId = CRM_SMART_INVOICE`.

- правая, в ней располагается таймлайн счета. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md).

Параметрами карточки счета можно управлять через группу методов [crm.item.details.configuration.*](./item-details-configuration/index.md).

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку счета можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку счета.

Есть два сценария встройки:

- Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
- Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается интерфейс вашего приложения

### Места встраивания новых счетов

- [`CRM_SMART_INVOICE_DETAIL_TAB`](../../widgets/crm/detail-tab.md) — вкладка в детальной карточке элемента CRM

- [`CRM_SMART_INVOICE_DETAIL_ACTIVITY`](../../widgets/crm/detail-activity.md) — кнопка над таймлайном карточки элемента

- [`CRM_SMART_INVOICE_DETAIL_TOOLBAR`](../../widgets/crm/detail-toolbar.md) — пункт выпадающего меню верхней кнопки карточки

- [`CRM_SMART_INVOICE_DOCUMENTGENERATOR_BUTTON`](../../widgets/crm/document-generator-button.md) — пункт выпадающего меню генератора документов

- [`CRM_SMART_INVOICE_LIST_MENU`](../../widgets/crm/list-menu.md) — пункт контекстного меню в списке элементов

- [`CRM_SMART_INVOICE_LIST_TOOLBAR`](../../widgets/crm/list-toolbar.md) — пункт выпадающего меню над списком элементов

- [`CRM_SMART_INVOICE_ACTIVITY_TIMELINE_MENU`](../../widgets/crm/activity-timeline-menu.md) — пункт контекстного меню дела в карточке элемента

- [`CRM_SMART_INVOICE_ROBOT_DESIGNER_TOOLBAR`](../../widgets/crm/robot-designer-toolbar.md) — пункт выпадающего меню верхней кнопки дизайнера роботов

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md), [`salescenter`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Основные

Идентификатор объекта CRM **entityTypeId** — `31`

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.item.add](./crm-item-add.md) | Создает новый элемент CRM ||
    || [crm.item.update](./crm-item-update.md) | Обновляет элемент ||
    || [crm.item.get](./crm-item-get.md) | Возвращает элемент по Id ||
    || [crm.item.list](./crm-item-list.md) | Возвращает список элементов по фильтру ||
    || [crm.item.delete](./crm-item-delete.md) | Удаляет элемент ||
    || [crm.item.fields](./crm-item-fields.md) | Возвращает поля элемента ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDynamicItemAdd](./events/on-crm-dynamic-item-add.md) | При создании счета вручную или методом [crm.item.add](./crm-item-add.md) ||
    || [onCrmDynamicItemUpdate](./events/on-crm-dynamic-item-update.md) | При изменении счета вручную или методом [crm.item.update](./crm-item-update.md) ||
    || [onCrmDynamicItemDelete](./events/on-crm-dynamic-item-delete.md) | При удалении счета вручную или методом [crm.item.delete](./crm-item-delete.md) ||
    |#

    Эти события приходят по элементам всех смарт-процессов и счетов. Чтобы отобрать события счетов, проверяйте в обработчике `data.FIELDS.ENTITY_TYPE_ID = 31`. Подробнее — в разделе [События элементов смарт-процессов](./events/index.md).

{% endlist %}

### Пользовательские поля

Идентификатор объекта CRM **entityId** — `CRM_SMART_INVOICE`

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [userfieldconfig.add](./userfieldconfig/userfieldconfig-add.md) | Создает пользовательское поле ||
    || [userfieldconfig.update](./userfieldconfig/userfieldconfig-update.md) | Изменяет настройки поля ||
    || [userfieldconfig.get](./userfieldconfig/userfieldconfig-get.md) | Возвращает настройки пользовательского поля по идентификатору ||
    || [userfieldconfig.getTypes](./userfieldconfig/userfieldconfig-get-types.md) | Возвращает набор доступных типов пользовательских полей для модуля ||
    || [userfieldconfig.list](./userfieldconfig/userfieldconfig-list.md) | Возвращает список настроек пользовательских полей ||
    || [userfieldconfig.delete](./userfieldconfig/userfieldconfig-delete.md) | Удаляет пользовательское поле ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmTypeUserFieldAdd](./userfieldconfig/events/on-crm-type-user-field-add.md) | При добавлении пользовательского поля счета ||
    || [onCrmTypeUserFieldUpdate](./userfieldconfig/events/on-crm-type-user-field-update.md) | При изменении настроек пользовательского поля счета ||
    || [onCrmTypeUserFieldDelete](./userfieldconfig/events/on-crm-type-user-field-delete.md) | При удалении пользовательского поля счета ||
    || [onCrmTypeUserFieldSetEnumValues](./userfieldconfig/events/on-crm-type-user-field-set-enum-values.md) | При изменении набора значений пользовательского поля списочного типа ||
    |#

{% endlist %}

### Товарные позиции

Идентификатор объекта CRM **ownerType** — `SI`

#|
|| **Метод** | **Описание** ||
|| [crm.item.productrow.add](./product-rows/crm-item-productrow-add.md) | Добавляет товарную позицию ||
|| [crm.item.productrow.update](./product-rows/crm-item-productrow-update.md) | Обновляет товарную позицию ||
|| [crm.item.productrow.get](./product-rows/crm-item-productrow-get.md) | Получает информацию о товарной позиции по id ||
|| [crm.item.productrow.set](./product-rows/crm-item-productrow-set.md) | Привязывает товарную позицию к объекту CRM ||
|| [crm.item.productrow.list](./product-rows/crm-item-productrow-list.md) | Получает список товарных позиций ||
|| [crm.item.productrow.getAvailableForPayment](./product-rows/crm-item-productrow-get-available-for-payment.md) | Получает список неоплаченных товаров ||
|| [crm.item.productrow.delete](./product-rows/crm-item-productrow-delete.md) | Удаляет товарную позицию ||
|| [crm.item.productrow.fields](./product-rows/crm-item-productrow-fields.md) | Получает список полей товарных позиций ||
|#

### Оплаты

Идентификатор объекта CRM **entityTypeId** — `31`

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.add](./payment/crm-item-payment-add.md) | Создает оплату для объекта CRM ||
|| [crm.item.payment.update](./payment/crm-item-payment-update.md) | Изменяет набор полей оплаты ||
|| [crm.item.payment.get](./payment/crm-item-payment-get.md) | Получает краткую информацию об оплате ||
|| [crm.item.payment.list](./payment/crm-item-payment-list.md) | Получает список оплат конкретного объекта CRM ||
|| [crm.item.payment.delete](./payment/crm-item-payment-delete.md) | Удаляет оплату   ||
|| [crm.item.payment.pay](./payment/crm-item-payment-pay.md) | Изменяет статус оплаты на «Оплачено» ||
|| [crm.item.payment.unpay](./payment/crm-item-payment-unpay.md) | Изменяет статус оплаты на «Не оплачено» ||
|| [salescenter.payment.getPublicUrl](./payment/salescenter-payment-get-public-url.md) | Генерирует публичную ссылку на оплату ||
|#

#### Товарные позиции в оплате

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.product.add](./payment/products-in-payment/crm-item-payment-product-add.md) | Добавляет товарную позицию в оплату ||
|| [crm.item.payment.product.list](./payment/products-in-payment/crm-item-payment-product-list.md) | Получает список товарных позиций в оплате  ||
|| [crm.item.payment.product.delete](./payment/products-in-payment/crm-item-payment-product-delete.md) | Удаляет товарную позицию из оплаты ||
|| [crm.item.payment.product.setQuantity](./payment/products-in-payment/crm-item-payment-product-set-quantity.md) | Изменяет количество товара в товарной позиции оплаты ||
|#

#### Доставка в оплате

#|
|| **Метод** | **Описание** ||
|| [crm.item.payment.delivery.add](./payment/delivery-in-payment/crm-item-payment-delivery-add.md) | Добавляет позицию доставки в оплату ||
|| [crm.item.payment.delivery.list](./payment/delivery-in-payment/crm-item-payment-delivery-list.md) | Получает список позиций доставки по конкретной оплате ||
|| [crm.item.payment.delivery.delete](./payment/delivery-in-payment/crm-item-payment-delivery-delete.md) | Удаляет позицию доставки из оплаты   ||
|| [crm.item.payment.delivery.setDelivery](./payment/delivery-in-payment/crm-item-payment-delivery-set-delivery.md) | Перепривязывает позицию доставки к другому документу доставки ||
|#

### Управление настройками карточки

Идентификатор объекта CRM **entityTypeId** — `31`

#|
|| **Метод** | **Описание** ||
|| [crm.item.details.configuration.get](./item-details-configuration/crm-item-details-configuration-get.md) | Получает параметры карточки элементов ||
|| [crm.item.details.configuration.set](./item-details-configuration/crm-item-details-configuration-set.md) | Устанавливает параметры карточки элементов ||
|| [crm.item.details.configuration.reset](./item-details-configuration/crm-item-details-configuration-reset.md) | Сбрасывает параметры карточки элементов ||
|| [crm.item.details.configuration.forceCommonScopeForAll](./item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) | Устанавливает общую карточку для всех пользователей ||
|#

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./payment/index.md)
- [{#T}](./product-rows/index.md)
