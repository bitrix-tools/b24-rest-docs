# Перечисления: обзор методов

Методы перечислений возвращают информацию о значениях типов: тип адреса, тип дела, тип объекта и другие.

> Быстрый переход: [все методы](#all-methods) 

## Как работать с методами перечислений

Определите, какие данные вам нужны, и выберите метод перечисления. Например, вам надо получить все юридические адреса контакта:

1. используйте метод [crm.enum.addresstype](./crm-enum-address-type.md), чтобы узнать идентификатор типа для юридического адреса

2. используйте полученный идентификатор в параметре `TYPE_ID` фильтра в методе [crm.address.list](../../requisites/addresses/crm-address-list.md)

## Связь методов перечислений с объектами CRM

**Объект CRM.** Метод [crm.enum.ownertype](./crm-enum-owner-type.md) возвращает идентификаторы типов объектов. `ID` типа объекта используйте в значении параметра `entityTypeId` методов [crm.item.*](../../universal/index.md), [crm.activity.*](../../timeline/activities/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как прикрепить задачу к смарт-процессу](../../../../tutorials/tasks/how-to-connect-task-to-spa.md)

{% endnote %}

**Заказ.** Метод [crm.enum.getorderownertypes](./crm-enum-get-order-owner-types.md) возвращает типы объектов, к которым можно добавить связь с заказом. `id` типа объекта используйте в значении параметра `ownerTypeId` методов [crm.orderentity.*](../../universal/order-entity/crm-order-entity-add.md).

**Тип описания.** Метод [crm.enum.contenttype](./outdated/crm-enum-content-type.md) возвращает типы описаний. `ID` типа описания используйте в значении параметра `DESCRIPTION_TYPE` методов [crm.activity.*](../../timeline/activities/index.md).

**Дело.** Метод [crm.enum.activitytype](./outdated/crm-enum-activity-type.md) возвращает типы дел. `ID` типа дела используйте в значении параметра `TYPE_ID` методов [crm.activity.*](../../timeline/activities/index.md).

**Статус.** Метод [crm.enum.activitystatus](./outdated/crm-enum-activity-status.md) возвращает типы статусов дел. `ID` статуса дела используйте в значении параметра `STATUS` методов [crm.activity.*](../../timeline/activities/index.md).

**Приоритет.** Метод [crm.enum.activitypriority](./outdated/crm-enum-activity-priority.md) возвращает типы приоритета дел. `ID` приоритета используйте в значении параметра `PRIORITY` методов [crm.activity.*](../../timeline/activities/index.md).

**Направление.** Метод [crm.enum.activitydirection](./outdated/crm-enum-activity-direction.md) возвращает типы направлений дел. `ID` направления используйте в значении параметра `DIRECTION` методов [crm.activity.*](../../timeline/activities/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как отправить e-mail клиенту](../../../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)

{% endnote %}

**Уведомление.** Метод [crm.enum.activitynotifytype](./outdated/crm-enum-activity-notify-type.md) возвращает типы уведомлений для дел. `ID` типа уведомления используйте в значении параметра `NOTIFY_TYPE` методов [crm.activity.*](../../timeline/activities/index.md).

**Адрес.** Метод [crm.enum.addresstype](./crm-enum-address-type.md) возвращает типы адресов. `ID` типа адреса используйте в значении параметра `TYPE_ID`  методов [crm.address.*](../../requisites/addresses/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как получить адрес клиента из CRM](../../../../tutorials/crm/how-to-get-lists/how-to-get-address.md)

{% endnote %}

**Режим работы CRM.** Метод [crm.enum.settings.mode](./crm-enum-settings-mode.md) возвращает тип CRM. Используйте метод для расшифровки значения `ID` типа, которое возвращает метод [crm.settings.mode.get](../../crm-settings-mode-get.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.enum.fields](./crm-enum-fields.md) | Возвращает описание полей элементов перечислений ||
|| [crm.enum.ownertype](./crm-enum-owner-type.md) | Возвращает типы объектов в CRM ||
|| [crm.enum.getorderownertypes](./crm-enum-get-order-owner-types.md) | Возвращает идентификаторы типов объектов, к которым доступна привязка заказа ||
|| [crm.enum.addresstype](./crm-enum-address-type.md) | Возвращает типы адресов ||
|| [crm.enum.settings.mode](./crm-enum-settings-mode.md) | Возвращает описание режимов работы CRM ||
|| [crm.enum.activitytype](./outdated/crm-enum-activity-type.md) | Возвращает элементы перечисления «Типы дел» ||
|| [crm.enum.activitypriority](./outdated/crm-enum-activity-priority.md) | Возвращает элементы перечисления «Приоритеты дел» ||
|| [crm.enum.contenttype](./outdated/crm-enum-content-type.md) | Возвращает элементы перечисления «Тип описания» ||
|| [crm.enum.activitydirection](./outdated/crm-enum-activity-direction.md) | Возвращает элементы перечисления «Направление активности», для писем и звонков||
|| [crm.enum.activitynotifytype](./outdated/crm-enum-activity-notify-type.md) | Возвращает элементы перечисления «Тип уведомления о начале активности», для встреч и звонков ||
|| [crm.enum.activitystatus](./outdated/crm-enum-activity-status.md) | Возвращает элементы перечисления «Статус» ||
|#
