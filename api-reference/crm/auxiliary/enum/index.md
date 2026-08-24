# Перечисления: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы перечислений возвращают информацию о значениях типов: тип адреса, тип дела, тип объекта и другие.

> Быстрый переход: [все методы](#all-methods)

## Как работать с методами перечислений

Методы перечислений вызывают без параметров. В ответе приходит массив элементов с полями `ID`, `NAME`, `SYMBOL_CODE` и `SYMBOL_CODE_SHORT` — их описание возвращает метод [crm.enum.fields](./crm-enum-fields.md). У метода [crm.enum.getorderownertypes](./crm-enum-get-order-owner-types.md) формат другой: поля `id`, `name`, `code` и `attribute`.

Полученный идентификатор подставляйте в параметр метода, для которого запрашивали перечисление.

Определите, какие данные вам нужны, и выберите метод перечисления. Например, вам надо получить все юридические адреса контакта:

1. используйте метод [crm.enum.addresstype](./crm-enum-address-type.md), чтобы узнать идентификатор типа для юридического адреса

2. используйте полученный идентификатор в параметре `TYPE_ID` фильтра в методе [crm.address.list](../../requisites/addresses/crm-address-list.md)

## Связь методов перечислений с объектами CRM

**Объект CRM.** Метод [crm.enum.ownertype](./crm-enum-owner-type.md) возвращает идентификаторы типов объектов. `ID` типа объекта используйте в значении параметра `entityTypeId` методов [crm.item.*](../../universal/index.md), [crm.activity.*](../../timeline/activities/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как прикрепить задачу к смарт-процессу](../../../../tutorials/tasks/how-to-connect-task-to-spa.md)

{% endnote %}

**Заказ.** Метод [crm.enum.getorderownertypes](./crm-enum-get-order-owner-types.md) возвращает типы объектов, к которым можно добавить связь с заказом. `id` типа объекта используйте в значении параметра `ownerTypeId` методов [crm.orderentity.*](../../universal/order-entity/crm-order-entity-add.md).

**Адрес.** Метод [crm.enum.addresstype](./crm-enum-address-type.md) возвращает типы адресов. `ID` типа адреса используйте в значении параметра `TYPE_ID` методов [crm.address.*](../../requisites/addresses/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как получить адрес клиента из CRM](../../../../tutorials/crm/how-to-get-lists/how-to-get-address.md)

{% endnote %}

**Режим работы CRM.** Метод [crm.enum.settings.mode](./crm-enum-settings-mode.md) возвращает список режимов работы CRM. Используйте его, чтобы расшифровать значение `ID`, которое вернул метод [crm.settings.mode.get](../../crm-settings-mode-get.md).

### Перечисления дел

Перечисления дел устарели и не развиваются. Актуальные типы, статусы и направления дел описывает раздел [Дела CRM](../../timeline/activities/index.md).

Группа методов `crm.activity.*` использует значения этих перечислений:

- **Дело.** Метод [crm.enum.activitytype](./outdated/crm-enum-activity-type.md) возвращает типы дел для параметра `TYPE_ID`
- **Статус.** Метод [crm.enum.activitystatus](./outdated/crm-enum-activity-status.md) возвращает статусы дел для параметра `STATUS`
- **Приоритет.** Метод [crm.enum.activitypriority](./outdated/crm-enum-activity-priority.md) возвращает приоритеты дел для параметра `PRIORITY`
- **Направление.** Метод [crm.enum.activitydirection](./outdated/crm-enum-activity-direction.md) возвращает направления дел для параметра `DIRECTION`
- **Уведомление.** Метод [crm.enum.activitynotifytype](./outdated/crm-enum-activity-notify-type.md) возвращает типы уведомлений для параметра `NOTIFY_TYPE`
- **Тип описания.** Метод [crm.enum.contenttype](./outdated/crm-enum-content-type.md) возвращает типы описаний для параметра `DESCRIPTION_TYPE`

{% note tip "Частые кейсы и сценарии" %}

- [Как отправить e-mail клиенту](../../../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.enum.fields](./crm-enum-fields.md) | Возвращает описание полей элементов перечислений ||
|| [crm.enum.getorderownertypes](./crm-enum-get-order-owner-types.md) | Возвращает идентификаторы типов объектов, к которым доступна привязка заказа ||
|| [crm.enum.ownertype](./crm-enum-owner-type.md) | Возвращает типы объектов в CRM ||
|| [crm.enum.addresstype](./crm-enum-address-type.md) | Возвращает типы адресов ||
|| [crm.enum.settings.mode](./crm-enum-settings-mode.md) | Возвращает описание режимов работы CRM ||
|#

### Устаревшие методы

Методы ниже не развиваются.

#|
|| **Метод** | **Описание** ||
|| [crm.enum.activitytype](./outdated/crm-enum-activity-type.md) | Возвращает элементы перечисления «Типы дел» ||
|| [crm.enum.activitydirection](./outdated/crm-enum-activity-direction.md) | Возвращает элементы перечисления «Направление активности» для писем и звонков ||
|| [crm.enum.activitypriority](./outdated/crm-enum-activity-priority.md) | Возвращает элементы перечисления «Приоритеты дел» ||
|| [crm.enum.activitynotifytype](./outdated/crm-enum-activity-notify-type.md) | Возвращает элементы перечисления «Тип уведомления о начале активности» для встреч и звонков ||
|| [crm.enum.contenttype](./outdated/crm-enum-content-type.md) | Возвращает элементы перечисления «Тип описания» ||
|| [crm.enum.activitystatus](./outdated/crm-enum-activity-status.md) | Возвращает элементы перечисления «Статус» ||
|#
