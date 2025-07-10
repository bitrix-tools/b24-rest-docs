# Смарт-процессы: обзор методов

Смарт-процесс — это универсальный объект CRM, который можно настроить с учетом потребностей компании. Для каждого смарт-процесса Битрикс24 создает отдельный раздел в CRM. В разделе можно настроить воронки и стадии, роботов, поля, связи с другими объектами Битрикс24.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Смарт-процессы в CRM](https://helpdesk.bitrix24.ru/open/18913880/)

## Порядок работы со смарт-процессом

1. Создайте и настройте смарт-процесс — методы [crm.type.*](./index.md).
2. Настройте воронки и стадии — [crm.category.*](../category/index.md) для воронок и [crm.status.*](../../status/index.md) для стадий.
3. Добавьте пользовательские поля — [userfieldconfig.*](../userfieldconfig/userfieldconfig/index.md).
4. Настройте вид карточки элемента — [crm.item.details.configuration.*](../item-details-configuration/index.md).
5. Создайте первые элементы внутри смарт-процесса — [crm.item.*](../index.md).

Смарт-процесс можно перенести из раздела CRM в раздел Автоматизация через [цифровые рабочие места](../../automated-solution/index.md).

## Связь с другими объектами

**Объекты CRM.** Смарт-процесс можно [связать](./crm-type-add.md#relations) с лидами, сделками и другими объектами CRM. Связанный объект будет доступен через поле `parentId{ID}`, где `{ID}` — числовой идентификатор объекта CRM.

**Клиент.** Поле в карточке смарт-процесса, которое состоит из связанных с ним компании и контактов. Компания в поле одна, изменяйте связанную компанию через поле `companyId`. Контактов в поле «Клиент» может быть несколько. Взаимодействие с контактами ведется через поле `contactIds` — передавайте в поле массив с ID контактов. Включите поле опцией `isClientEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

**Реквизиты вашей компании.** Укажите ID вашей компании в поле `mycompanyId`, чтобы ее реквизиты автоматически использовались в документах. Получить ID вашей компании можно методом [crm.item.list](../crm-item-list.md) для объекта компаний с фильтром по полю `isMyCompany`. Включите поле опцией `isMycompanyEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

**Товары.** Чтобы добавить, изменить или удалить товарные позиции в смарт-процессе используйте методы [crm.item.productrow.*](../product-rows/index.md). Включите вкладку с товарами и поле «Сумма и валюта» опцией `isLinkWithProductsEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

**Пользователи.** Смарт-процесс имеет привязку к пользователям по числовым идентификаторам в полях:
- `createdBy` — кем создан,
- `updatedBy` — кем обновлен,
- `movedBy` — кто изменил стадию,
- `assignedById` — ответственный за элемент,
- `observers` — наблюдатели. Включите поле опцией `isObserversEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

Получить идентификатор и данные пользователя можно с помощью метода [user.get](../../../user/user-get.md).

**Документы.** Чтобы создать документ по шаблону, загрузить новый шаблон для смарт-процесса или настроить нумератор для документов, используйте методы [crm.documentgenerator.*](../../document-generator/index.md). Включите работу с документами в смарт-процессе опцией `isDocumentsEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

**Задачи.** Элементы смарт-процесса можно привязывать к задачам. Для работы с задачами используйте методы [tasks.task.*](../../../tasks/index.md). Чтобы возможность связи была доступна, включите и настройте опцию `isUseInUserfieldEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

**События календаря.** Элементы смарт-процесса можно привязывать к событиям календаря. Для работы с календарем используйте методы [calendar.event.*](../../../calendar/calendar-event/index.md). Чтобы возможность связи была доступна, включите и настройте опцию `isUseInUserfieldEnabled` в методе [crm.type.add](./crm-type-add.md) или [crm.type.update](./crm-type-update.md).

{% note tip "Пользовательская документация" %}

- [Как прикрепить задачу к смарт-процессу](../../../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [Как создать пользовательское поле в смарт-процессе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)
- [Как добавить комментарий в таймлайн смарт-процесса](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md)
- [Как создать новую воронку со стадиями в смарт-процессе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)  

{% endnote %}

## Карточка элемента смарт-процесса

Основное рабочее пространство в смарт-процессе — вкладка «Общее» карточки. Она состоит из двух частей:

- левая, в ней располагаются поля с информацией. Если системных полей недостаточно, можно создать собственные пользовательские поля. Поля позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей смарт-процесса используйте группу методов [userfieldconfig.*](../userfieldconfig/userfieldconfig/index.md).

- правая, в ней располагается таймлайн смарт-процесса. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../../timeline/activities/index), и записи таймлайна — группа методов [crm.timeline.*](../../timeline/index).

Параметрами карточки смарт-процесса можно управлять через группу методов [crm.item.details.configuration.*](../item-details-configuration/index.md).

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку смарт-процесса можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку элемента.

Есть два сценария встройки:

- использовать специальные [места встраивания](../../../widgets/crm/index.md). Например, через создание своей вкладки.
  
- создать [пользовательское поле](../../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в котором будет загружаться интерфейс вашего приложения.
  
### Места встраивания смарт-процессов

Вместо `XXX` укажите числовой идентификатор конкретного смарт-процесса, например `CRM_DYNAMIC_183_DOCUMENTGENERATOR_BUTTON`.

- [`CRM_DYNAMIC_XXX_DETAIL_TAB`](../../../widgets/crm/detail-tab.md) — вкладка в детальной карточке элемента CRM

- [`CRM_DYNAMIC_XXX_DETAIL_ACTIVITY`](../../../widgets/crm/detail-activity.md) — кнопка над таймлайном карточки элемента

- [`CRM_DYNAMIC_XXX_DETAIL_TOOLBAR`](../../../widgets/crm/detail-toolbar.md) — пункт выпадающего меню верхней кнопки карточки

- [`CRM_DYNAMIC_XXX_DOCUMENTGENERATOR_BUTTON`](../../../widgets/crm/document-generator-button.md) — пункт выпадающего меню генератора документов

- [`CRM_DYNAMIC_XXX_LIST_MENU`](../../../widgets/crm/index.md) — пункт контекстного меню в списке элементов

- [`CRM_DYNAMIC_XXX_LIST_TOOLBAR`](../../../widgets/crm/list-toolbar.md) — пункт выпадающего меню над списком элементов

- [`CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU`](../../../widgets/crm/activity-timeline-menu.md) — пункт контекстного меню дела в карточке элемента

- [`CRM_DYNAMIC_XXX_ROBOT_DESIGNER_TOOLBAR`](../../../widgets/crm/robot-designer-toolbar.md) — пункт выпадающего меню верхней кнопки дизайнера роботов

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Идентификаторы смарт-процессов {#id}

У каждого смарт-процесса есть четыре типа идентификаторов. Используйте идентификаторы, чтобы применить метод к определенному смарт-процессу.

1. Числовой идентификатор типа `130`. Получить можно методом [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) `ID` или [crm.type.list](./crm-type-list.md) `entityTypeId`.

1. Символьный код типа `DYNAMIC_130` — [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) `SYMBOL_CODE`.

2. Краткий символьный код типа `T82` — [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) `SYMBOL_CODE_SHORT`.

3. Тип объекта пользовательского поля `CRM_13` — [crm.type.list](./crm-type-list.md). `id` из результата метода подставьте в формулу `CRM_ + {ID}`.

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Смарт-процессы

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.type.add](./crm-type-add.md) | Создает новый смарт-процесс ||
    || [crm.type.update](./crm-type-update.md) | Обновляет смарт-процесс ||
    || [crm.type.get](./crm-type-get.md) | Возвращает смарт-процесс по id ||
    || [crm.type.getByEntityTypeId](./crm-type-get-by-entity-type-id.md) | Возвращает смарт-процесс по entityTypeId ||
    || [crm.type.list](./crm-type-list.md) | Возвращает список смарт-процессов ||
    || [crm.type.delete](./crm-type-delete.md) | Удаляет смарт-процесс ||
    || [crm.type.fields](./crm-type-fields.md) | Возвращает поля смарт-процесса ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmTypeAdd](../events/type/on-crm-type-add.md) | При создании смарт-процесса ||
    || [onCrmTypeUpdate](../events/type/on-crm-type-update.md) | При обновлении смарт-процесса ||
    || [onCrmTypeDelete](../events/type/on-crm-type-delete.md) | При удалении смарт-процесса ||
    |#

{% endlist %}

### Элементы

Идентификатор объекта CRM **entityTypeId** — [числовой идентификатор типа](#id), например `128`.

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.item.add](../crm-item-add.md) | Создает новый элемент ||
    || [crm.item.update](../crm-item-update.md) | Обновляет элемент ||
    || [crm.item.get](../crm-item-get.md) | Возвращает элемент по Id ||
    || [crm.item.list](../crm-item-list.md) | Возвращает список элементов по фильтру ||
    || [crm.item.delete](../crm-item-delete.md) | Удаляет элемент ||
    || [crm.item.fields](../crm-item-fields.md) | Возвращает поля элемента ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDynamicItemAdd](../events/on-crm-dynamic-item-add.md) | При создании элемента смарт-процесса ||
    || [onCrmDynamicItemDelete](../events/on-crm-dynamic-item-delete.md) | При удалении элемента смарт-процесса ||
    || [onCrmDynamicItemUpdate](../events/on-crm-dynamic-item-update.md) | При изменении элемента смарт-процесса ||
    |#

{% endlist %}

### Воронки

Идентификатор объекта CRM **entityTypeId** — [числовой идентификатор типа](#id), например `128`.

#|
|| **Метод** | **Описание** ||
|| [crm.category.add](../category/crm-category-add.md) | Создает новую воронку ||
|| [crm.category.update](../category/crm-category-update.md) | Обновляет воронку ||
|| [crm.category.get](../category/crm-category-get.md) | Возвращает воронку по Id ||
|| [crm.category.list](../category/crm-category-list.md) | Возвращает список воронок ||
|| [crm.category.delete](../category/crm-category-delete.md) | Удаляет воронку ||
|| [crm.category.fields](../category/crm-category-fields.md) | Возвращает поля воронки ||
|#

### Пользовательские поля

Идентификатор объекта CRM **entityId** — [тип объекта пользовательского поля](#id), например `CRM_1`.

#|
|| **Метод** | **Описание** ||
|| [userfieldconfig.add](../userfieldconfig/userfieldconfig/userfieldconfig-add.md) | Создает пользовательское поле ||
|| [userfieldconfig.update](../userfieldconfig/userfieldconfig/userfieldconfig-update.md) | Изменяет настройки поля ||
|| [userfieldconfig.get](../userfieldconfig/userfieldconfig/userfieldconfig-get.md) | Возвращает настройки пользовательского поля по идентификатору ||
|| [userfieldconfig.getTypes](../userfieldconfig/userfieldconfig/userfieldconfig-get-types.md) | Возвращает набор доступных типов пользовательских полей для модуля ||
|| [userfieldconfig.list](../userfieldconfig/userfieldconfig/userfieldconfig-list.md) | Возвращает список настроек пользовательских полей ||
|| [userfieldconfig.delete](../userfieldconfig/userfieldconfig/userfieldconfig-delete.md) | Удаляет пользовательское поле ||
|#

### Управление настройками карточки

Идентификатор объекта CRM **entityTypeId** — [числовой идентификатор типа](#id), например `128`.

#|
|| **Метод** | **Описание** ||
|| [crm.item.details.configuration.forceCommonScopeForAll](../item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) | Устанавливает общую карточку для всех пользователей ||
|| [crm.item.details.configuration.get](../item-details-configuration/crm-item-details-configuration-get.md) | Получает параметры карточки элементов ||
|| [crm.item.details.configuration.reset](../item-details-configuration/crm-item-details-configuration-reset.md) | Сбрасывает параметры карточки элементов ||
|| [crm.item.details.configuration.set](../item-details-configuration/crm-item-details-configuration-set.md) | Устанавливает параметры карточки элементов ||
|#

### Товарные позиции

Идентификатор объекта CRM **ownerType** — [краткий символьный код типа](#id), например `T80`.

#|
|| **Метод** | **Описание** ||
|| [crm.item.productrow.add](../product-rows/crm-item-productrow-add.md) | Добавляет товарную позицию ||
|| [crm.item.productrow.update](../product-rows/crm-item-productrow-update.md) | Обновляет товарную позицию ||
|| [crm.item.productrow.get](../product-rows/crm-item-productrow-get.md) | Получает информацию о товарной позиции по id ||
|| [crm.item.productrow.set](../product-rows/crm-item-productrow-set.md) | Привязывает товарную позицию к объекту CRM ||
|| [crm.item.productrow.list](../product-rows/crm-item-productrow-list.md) | Получает список товарных позиций ||
|| [crm.item.productrow.getAvailableForPayment](../product-rows/crm-item-productrow-get-available-for-payment.md) | Получает список неоплаченных товаров ||
|| [crm.item.productrow.delete](../product-rows/crm-item-productrow-delete.md) | Удаляет товарную позицию ||
|| [crm.item.productrow.fields](../product-rows/crm-item-productrow-fields.md) | Получает список полей товарных позиций ||
|#