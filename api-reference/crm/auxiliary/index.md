# Обзор вспомогательных методов

К вспомогательным группам методов относятся множественные поля, перечисления и ставки НДС. 

> Быстрый переход: [все методы и события](#all-methods) 

## Множественные поля

Метод [crm.multifield.fields](./multifield/crm-multifield-fields.md) возвращает информацию о структуре множественных полей, таких как номер телефона или e-mail. Чтобы заполнить поле значением [с типом](../data-types.md#crm_multifield), передавайте данные по той структуре, которую вернул метод. 
Пример передачи данных для заполнения номера телефона с типом мобильный:

```js
PHONE: [
            { 
                VALUE: "555888",
                VALUE_TYPE: "MOBILE",
            },
        ] ,
```

{% note tip "Частые кейсы и сценарии" %}

- [Как изменить номера телефонов и e-mail на примере контакта](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [Создать новый лид crm.lead.add](../leads/crm-lead-add.md)

{% endnote %}

## Перечисления

Группа методов перечислений [crm.enum.*](./enum/index.md) возвращает информацию о названии и идентификаторе объектов CRM. Например метод [crm.enum.ownertype](./enum/crm-enum-owner-type.md) возвращает идентификаторы смарт-процессов, а метод [crm.enum.addresstype](./enum/crm-enum-address-type.md) — идентификаторы типов адресов: юридический, физический, адрес доставки. 

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить комментарий в таймлайн смарт-процесса](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md)
- [Как получить адрес клиента из CRM](../../../tutorials/crm/how-to-get-lists/how-to-get-address.md)

{% endnote %}

## Ставки НДС 

Группа методов [catalog.vat.*](../../catalog/vat/index.md) управляет ставками НДС. Методы позволяют [создавать](../../catalog/vat/catalog-vat-add.md), [удалять](../../catalog/vat/catalog-vat-delete.md), [изменять](../../catalog/vat/catalog-vat-update.md) и [получать](../../catalog/vat/catalog-vat-list.md) значения ставок. 

Чтобы задать НДС товара в сделке или другом объекте CRM, используйте параметр `taxRate` группы методов  [crm.item.productrow.*](../universal/product-rows/index.md). 

Чтобы задать НДС товара или услуги в торговом каталоге, используйте параметр `vatId` групп методов [catalog.product.*](../../catalog/product/index.md). 

## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Множественные поля

#|
|| **Метод** | **Описание** ||
|| [crm.multifield.fields](./multifield/crm-multifield-fields.md) | Возвращает описание множественных полей ||
|#

### Перечисления

#|
|| **Метод** | **Описание** ||
|| [crm.enum.fields](./enum/crm-enum-fields.md) | Возвращает описание полей перечисления ||
|| [crm.enum.ownertype](./enum/crm-enum-owner-type.md) | Возвращает типы объектов в CRM ||
|| [crm.enum.getorderownertypes](./enum/crm-enum-get-order-owner-types.md) | Возвращает идентификаторы типов объектов, к которым доступна привязка заказа ||
|| [crm.enum.addresstype](./enum/crm-enum-address-type.md) | Возвращает типы адресов ||
|| [crm.enum.settings.mode](./enum/crm-enum-settings-mode.md) | Возвращает описание режимов работы CRM ||
|| [crm.enum.activitytype](./enum/outdated/crm-enum-activity-type.md) | Возвращает элементы перечисления «Типы дел» ||
|| [crm.enum.activitypriority](./enum/outdated/crm-enum-activity-priority.md) | Возвращает элементы перечисления «Приоритеты дел» ||
|| [crm.enum.activitydirection](./enum/outdated/crm-enum-activity-direction.md) | Возвращает элементы перечисления «Направление активности», для писем и звонков||
|| [crm.enum.activitynotifytype](./enum/outdated/crm-enum-activity-notify-type.md) | Возвращает элементы перечисления «Тип уведомления о начале активности», для встреч и звонков ||
|| [crm.enum.activitystatus](./enum/outdated/crm-enum-activity-status.md) | Возвращает элементы перечисления «Статус» ||
|| [crm.enum.contenttype](./enum/outdated/crm-enum-content-type.md) Возвращает элементы перечисления «Тип описания» ||
|#