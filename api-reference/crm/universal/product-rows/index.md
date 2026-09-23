# Товарные позиции в объектах CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товарные позиции — это строки с товарами или услугами в карточке CRM. В них хранится состав продажи: название, цена, количество, скидки и налоги. По этим данным CRM рассчитывает итоговую сумму лида, сделки, предложения, счета или смарт-процесса. Полный состав позиции описан в объекте [crm_item_product_row](../../data-types.md#crm_item_product_row).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить товары в карточку CRM](https://helpdesk.bitrix24.ru/open/27964692/)

## Привязка товарной позиции к объекту CRM

Каждая товарная позиция принадлежит объекту CRM. Чтобы добавить, заменить или получить товарные позиции, укажите `ownerType` и `ownerId`. Например, для сделки с ID `13142` передайте `ownerType: "D"` и `ownerId: 13142`. Идентификатор объекта можно получить методом [crm.item.list](../crm-item-list.md) или из ответа метода [crm.item.add](../crm-item-add.md).

Товарные позиции есть не у всех объектов CRM. Методы раздела работают с такими типами:

#|
|| **Объект CRM** | **Код `ownerType`** ||
|| Лид | `L` ||
|| Сделка | `D` ||
|| Предложение | `Q` ||
|| Счет (новый) | `SI` ||
|| Смарт-процесс | `T` и шестнадцатеричный идентификатор типа. Например, для типа с `entityTypeId: 128` код — `T80` ||
|#

Полный список кодов — в справочнике [типов объектов CRM](../../data-types.md#object_type).

Остальные типы объектов CRM методы раздела не обслуживают, но ведут себя на них по-разному:

- у контактов и компаний товарных позиций не бывает. Методы [crm.item.productrow.list](./crm-item-productrow-list.md) и [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) вернут для них пустой результат, а методы записи — ошибку
- старые счета с кодом `I` не поддерживаются вовсе. Методы записи и [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) вернут ошибку `ENTITY_TYPE_NOT_SUPPORTED`, а [crm.item.productrow.list](./crm-item-productrow-list.md) — ошибку `ACCESS_DENIED`

Для новых интеграций со счетами используйте методы раздела [Счета](../invoice.md).

## Порядок работы с товарными позициями

1. Получите описание полей товарной позиции методом [crm.item.productrow.fields](./crm-item-productrow-fields.md). Метод поможет понять, какие значения можно передавать при добавлении и изменении позиции.
2. Добавьте одну товарную позицию методом [crm.item.productrow.add](./crm-item-productrow-add.md) или сохраните сразу весь набор методом [crm.item.productrow.set](./crm-item-productrow-set.md).
3. Получите товарные позиции объекта CRM методом [crm.item.productrow.list](./crm-item-productrow-list.md). Если нужна одна позиция, передайте ее идентификатор в метод [crm.item.productrow.get](./crm-item-productrow-get.md).
4. Измените товарную позицию методом [crm.item.productrow.update](./crm-item-productrow-update.md) или удалите ее методом [crm.item.productrow.delete](./crm-item-productrow-delete.md), если позиция больше не нужна в объекте CRM.

## Ограничения и особенности

- Методы [crm.item.productrow.*](#all-methods) — актуальный способ работать с товарными позициями. Развитие методов `crm.deal.productrows.*`, `crm.lead.productrows.*` и `crm.quote.productrows.*` остановлено. В новых интеграциях используйте методы этого раздела.
- Доступ к товарным позициям зависит от доступа к объекту CRM, в котором они находятся. Если пользователь не может открыть сделку, счет или смарт-процесс, он не получит и не изменит их товарные позиции. Исключение — метод [crm.item.productrow.fields](./crm-item-productrow-fields.md): он только описывает поля и не требует прав на объекты CRM.
- У товарной позиции нет своего поля валюты. Цены хранятся в валюте того объекта CRM, которому позиция принадлежит.
- Длина текстовых полей товарной позиции ограничена. Максимальные значения — в статье [{#T}](../../field-length-limits.md).

## Связь с другими объектами

Товарные позиции связаны с объектами CRM, каталогом товаров и оплатами.

**Объекты CRM.** Товарная позиция не существует сама по себе — она всегда принадлежит лиду, сделке, предложению, счету или смарт-процессу. Эту связь задает пара полей `ownerType` и `ownerId`, которую принимают методы [crm.item.productrow.add](./crm-item-productrow-add.md), [crm.item.productrow.set](./crm-item-productrow-set.md), [crm.item.productrow.list](./crm-item-productrow-list.md) и [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md).

**Каталог товаров.** Позиция может ссылаться на товар торгового каталога — тогда из каталога берутся название и единица измерения. Эту связь задает поле `productId` в методах [crm.item.productrow.add](./crm-item-productrow-add.md), [crm.item.productrow.update](./crm-item-productrow-update.md) и [crm.item.productrow.set](./crm-item-productrow-set.md). Сами товары каталога получают методы раздела [Торговый каталог](../../../catalog/index.md).

**Оплаты.** По товарным позициям объекта CRM клиенту выставляют оплату. Метод [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) выбирает позиции, которые в оплаты еще не попали, а дальше с ними работают методы разделов [Оплаты и доставки](../payment/index.md) и [Товарные позиции в оплате](../payment/products-in-payment/index.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.item.productrow.add](./crm-item-productrow-add.md) | Добавляет товарную позицию ||
|| [crm.item.productrow.update](./crm-item-productrow-update.md) | Обновляет товарную позицию ||
|| [crm.item.productrow.get](./crm-item-productrow-get.md) | Получает информацию о товарной позиции ||
|| [crm.item.productrow.list](./crm-item-productrow-list.md) | Получает список товарных позиций ||
|| [crm.item.productrow.delete](./crm-item-productrow-delete.md) | Удаляет товарную позицию ||
|| [crm.item.productrow.set](./crm-item-productrow-set.md) | Сохраняет набор товарных позиций объекта CRM ||
|| [crm.item.productrow.getAvailableForPayment](./crm-item-productrow-get-available-for-payment.md) | Получает товарные позиции без выставленной оплаты ||
|| [crm.item.productrow.fields](./crm-item-productrow-fields.md) | Получает описание полей товарных позиций ||
|#

## Продолжите изучение

- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-product-binding.md)
- [{#T}](../payment/index.md)
- [{#T}](../payment/products-in-payment/index.md)
- [{#T}](../invoice.md)
- [{#T}](../index.md)
