# Привязка свойств заказа в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Привязка свойства определяет, в каком сценарии поле заказа будет показано покупателю при оформлении. Вы можете связывать свойства с платежными системами, службами доставки, лендингами и торговыми платформами.

Каждая привязка задается набором полей:

- `entityType` — тип объекта привязки 
- `entityId` — идентификатор объекта выбранного типа
- `propertyId` — идентификатор свойства заказа

> Быстрый переход: [все методы](#all-methods)

## Как начать работу с привязкой свойства

1. Получите `propertyId` методом [sale.property.list](../property/sale-property-list.md).
2. Определите тип объекта в `entityType`:
   - `P` — платежная система
   - `D` — доставка
   - `L` — лендинг
   - `T` — торговая платформа
3. Подберите идентификатор объекта в `entityId` для выбранного типа.
4. Проверьте доступные поля привязки методом [sale.propertyRelation.getFields](./sale-property-relation-get-fields.md).
5. Создайте привязку методом [sale.propertyRelation.add](./sale-property-relation-add.md).
6. Проверьте актуальные привязки методом [sale.propertyRelation.list](./sale-property-relation-list.md).
7. Удалите ненужные привязки методом [sale.propertyRelation.deleteByFilter](./sale-property-relation-delete-by-filter.md).

## Связь с другими объектами

**Свойства заказа.** Привязка применяется к конкретному свойству заказа по полю `propertyId`. Работа со свойствами заказа выполняется в разделе [sale.property.*](../property/index.md).

**Платежные системы.** Если `entityType` равен `P`, в `entityId` передается идентификатор платежной системы. Получить его можно методом [sale.paysystem.list](../../pay-system/sale-pay-system-list.md).

**Службы доставки.** Для `entityType = D` укажите в `entityId` идентификатор службы доставки, который возвращает метод [sale.delivery.getlist](../delivery/delivery/sale-delivery-get-list.md).

**Источники заказов.** При типе `T` в `entityId` используется идентификатор торговой платформы. Список источников заказов доступен методом [sale.tradePlatform.list](../trade-platform/sale-trade-platform-list.md).

**Лендинги.** Для привязки с `entityType = L` нужен идентификатор лендинга в `entityId`. Идентификатор можно получить методом [landing.landing.getList](../../landing/page/methods/landing-landing-get-list.md).

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [sale.propertyRelation.add](./sale-property-relation-add.md) | Добавляет привязку свойства ||
|| [sale.propertyRelation.list](./sale-property-relation-list.md) | Получает список привязок свойства ||
|| [sale.propertyRelation.deleteByFilter](./sale-property-relation-delete-by-filter.md) | Удаляет привязку свойства ||
|| [sale.propertyRelation.getFields](./sale-property-relation-get-fields.md) | Возвращает поля привязки свойства ||
|#
