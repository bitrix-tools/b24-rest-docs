# Вспомогательные объекты: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Вспомогательные методы возвращают справочные данные, которые нужны для работы с основными объектами CRM: структуру множественных полей и значения перечислений — идентификаторы типов объектов, адресов и дел. Собственных данных эти методы не изменяют.

Вспомогательные методы разделены на две группы: [множественные поля](./multifield/index.md) и [перечисления](./enum/index.md).

> Быстрый переход: [все методы](#all-methods)

## Множественные поля

Множественные поля хранят контактные данные лидов, контактов и компаний: телефоны, e-mail, мессенджеры. Значение такого поля — массив объектов [crm_multifield](../data-types.md#crm_multifield). Метод [crm.multifield.fields](./multifield/crm-multifield-fields.md) возвращает состав и характеристики полей этого объекта.

В каких методах передавать значение и какие типы значений допустимы — в подразделе [Множественные поля](./multifield/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как изменить или удалить номера телефонов и email](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [Создать новый лид crm.lead.add](../leads/crm-lead-add.md)

{% endnote %}

## Перечисления

Перечисления — это справочники идентификаторов, которые CRM использует в параметрах других методов. Группа методов [crm.enum.*](./enum/index.md) возвращает пары «идентификатор — название». Например, метод [crm.enum.ownertype](./enum/crm-enum-owner-type.md) возвращает идентификаторы типов объектов CRM и смарт-процессов для параметра `entityTypeId`, а метод [crm.enum.addresstype](./enum/crm-enum-address-type.md) — идентификаторы типов адресов: юридический, фактический, адрес доставки.

Какой идентификатор в каком параметре использовать — в подразделе [Перечисления](./enum/index.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить комментарий в таймлайн смарт-процесса](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md)
- [Как получить адрес клиента из CRM](../../../tutorials/crm/how-to-get-lists/how-to-get-address.md)

{% endnote %}

## Где взять ставки НДС

Ставками НДС управляет группа методов [catalog.vat.*](../../catalog/vat/index.md) Торгового каталога. У этой группы свой scope `catalog`, поэтому в таблицы методов ниже она не входит.

Идентификатор ставки, который вернули методы `catalog.vat.*`, передавайте:

- в параметре `taxRate` группы методов [crm.item.productrow.*](../universal/product-rows/index.md) — чтобы задать НДС товара в сделке или другом объекте CRM
- в параметре `vatId` группы методов [catalog.product.*](../../catalog/product/index.md) — чтобы задать НДС товара или услуги в торговом каталоге

## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

### Множественные поля

#|
|| **Метод** | **Описание** ||
|| [crm.multifield.fields](./multifield/crm-multifield-fields.md) | Возвращает описание множественных полей ||
|#

### Перечисления

#|
|| **Метод** | **Описание** ||
|| [crm.enum.fields](./enum/crm-enum-fields.md) | Возвращает описание полей элементов перечислений ||
|| [crm.enum.getorderownertypes](./enum/crm-enum-get-order-owner-types.md) | Возвращает идентификаторы типов объектов, к которым доступна привязка заказа ||
|| [crm.enum.ownertype](./enum/crm-enum-owner-type.md) | Возвращает типы объектов в CRM ||
|| [crm.enum.addresstype](./enum/crm-enum-address-type.md) | Возвращает типы адресов ||
|| [crm.enum.settings.mode](./enum/crm-enum-settings-mode.md) | Возвращает описание режимов работы CRM ||
|#

### Устаревшие перечисления

Методы ниже не развиваются. Перечисления дел получайте в разделе [Дела CRM](../timeline/activities/index.md).

#|
|| **Метод** | **Описание** ||
|| [crm.enum.activitytype](./enum/outdated/crm-enum-activity-type.md) | Возвращает элементы перечисления «Типы дел» ||
|| [crm.enum.activitypriority](./enum/outdated/crm-enum-activity-priority.md) | Возвращает элементы перечисления «Приоритеты дел» ||
|| [crm.enum.activitydirection](./enum/outdated/crm-enum-activity-direction.md) | Возвращает элементы перечисления «Направление активности» для писем и звонков ||
|| [crm.enum.activitynotifytype](./enum/outdated/crm-enum-activity-notify-type.md) | Возвращает элементы перечисления «Тип уведомления о начале активности» для встреч и звонков ||
|| [crm.enum.activitystatus](./enum/outdated/crm-enum-activity-status.md) | Возвращает элементы перечисления «Статус» ||
|| [crm.enum.contenttype](./enum/outdated/crm-enum-content-type.md) | Возвращает элементы перечисления «Тип описания» ||
|#
