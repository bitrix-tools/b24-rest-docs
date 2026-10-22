# Единицы измерения в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У каждого товара есть единица измерения: вес, количество, объем и так далее. В Битрикс24 доступны популярные варианты, но вы можете добавить свои.

Чтобы установить основную единицу измерения, укажите в параметре `isDefault` значение `Y`. Тогда при создании нового товара она будет автоматически выбрана в карточке.

У единицы измерения есть уникальный числовой `code`, название `measureTitle` и условное обозначение `symbol`. Поле `isDefault` показывает, выбрана ли она по умолчанию. Состав объекта приведен в [типе `catalog_measure`](../data-types.md#catalog_measure), а свойства полей возвращает [catalog.measure.getFields](./catalog-measure-get-fields.md).

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация:
> - [Как добавить и настроить единицы измерения в CRM](https://helpdesk.bitrix24.ru/open/5488453/)
> - [Единицы измерения в услугах](https://helpdesk.bitrix24.ru/open/17277938/)

## Как начать работу

1. Получите доступные поля и их свойства методом [catalog.measure.getFields](./catalog-measure-get-fields.md)
2. Найдите существующую единицу методом [catalog.measure.list](./catalog-measure-list.md) или создайте свою методом [catalog.measure.add](./catalog-measure-add.md), указав `code` и `measureTitle`
3. Получите ее `id` из ответа метода добавления или списка и передайте его в [catalog.measure.get](./catalog-measure-get.md) для проверки данных
4. При необходимости измените единицу методом [catalog.measure.update](./catalog-measure-update.md) или удалите методом [catalog.measure.delete](./catalog-measure-delete.md)

## Единицы измерения в REST 3.0

В [REST 3.0](../../rest-v3.md) для единиц измерения есть методы добавления, изменения, получения, удаления и методы получения схемы полей `catalog.measure.field.list` и `catalog.measure.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Особенности методов новой версии:

- поле `isDefault` принимает и возвращает `true` или `false`, значения `Y` и `N` не поддерживаются
- единица по умолчанию может быть только одна. Чтобы сменить ее, сначала передайте `isDefault: false` текущей единице методом [catalog.measure.update](./catalog-measure-update-rest-v3.md), затем `isDefault: true` новой
- пустые строковые поля приходят пустой строкой, а не `null`

## Коэффициент единицы измерения

Если вы продаете товар дробно или упаковками, укажите в карточке товара коэффициент единицы измерения. Примеры:

- для ткани установите коэффициент 0.1, чтобы покупатели могли заказывать с шагом 0,1 метра, например, 3,6 метра
- для напитков в упаковках по 6 бутылок используйте коэффициент 6: 1 единица — это 6 бутылок, 3 единицы — 18 бутылок

Просмотреть коэффициенты единицы измерения можно с помощью методов [catalog.ratio.*](../ratio/index.md).

## Связь единиц измерения с другими объектами

**Товары.** Создавайте и редактируйте товары, используя следующие группы методов:

- [catalog.product.*](../product/index.md) — для простых товаров
- [catalog.product.service.*](../product/service/index.md) — для услуг
- [catalog.product.sku.*](../product/sku/index.md) — для головных товаров у товаров с вариациями
- [catalog.product.offer.*](../product/offer/index.md) — для вариаций товаров

## Обзор методов и событий {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом чтения каталога или просмотра складов. Для добавления, обновления и удаления также нужно право изменения единиц измерения

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [catalog.measure.add](./catalog-measure-add.md) | Добавляет единицу измерения ||
    || [catalog.measure.add](./catalog-measure-add-rest-v3.md) | Добавляет единицу измерения v 3.0 ||
    || [catalog.measure.update](./catalog-measure-update.md) | Обновляет единицу измерения ||
    || [catalog.measure.update](./catalog-measure-update-rest-v3.md) | Обновляет единицу измерения v 3.0 ||
    || [catalog.measure.get](./catalog-measure-get.md) | Возвращает информацию о единице измерения по ее идентификатору ||
    || [catalog.measure.get](./catalog-measure-get-rest-v3.md) | Возвращает информацию о единице измерения по ее идентификатору v 3.0 ||
    || [catalog.measure.list](./catalog-measure-list.md) | Возвращает список единиц измерения ||
    || [catalog.measure.list](./catalog-measure-list-rest-v3.md) | Возвращает список единиц измерения v 3.0 ||
    || [catalog.measure.delete](./catalog-measure-delete.md) | Удаляет единицу измерения ||
    || [catalog.measure.delete](./catalog-measure-delete-rest-v3.md) | Удаляет единицу измерения v 3.0 ||
    || [catalog.measure.getFields](./catalog-measure-get-fields.md) | Возвращает доступные поля единиц измерения ||
    || [catalog.measure.field.list](./catalog-measure-field-list.md) | Возвращает список полей единицы измерения v 3.0 ||
    || [catalog.measure.field.get](./catalog-measure-field-get.md) | Возвращает описание поля единицы измерения ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [CATALOG.MEASURE.ON.ADD](./events/catalog-measure-on-add.md) | При добавлении единицы измерения ||
    || [CATALOG.MEASURE.ON.UPDATE](./events/catalog-measure-on-update.md) | При обновлении единицы измерения ||
    || [CATALOG.MEASURE.ON.DELETE](./events/catalog-measure-on-delete.md) | При удалении единицы измерения ||
    |#

{% endlist %}
