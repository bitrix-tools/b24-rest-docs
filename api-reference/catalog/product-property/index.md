# Свойства товаров и вариаций: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

У товаров и вариаций есть свойства: цвет, размер, материал, бренд и другие. Они помогают покупателям находить и выбирать товары на сайте.

Свойства можно сделать общими для всех товаров или привязать к разделам каталога. Например, свойство «Бренд» может быть доступно во всех товарах, а свойство «Материал» — только в разделе «Одежда».

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Свойства товаров и вариаций](https://helpdesk.bitrix24.ru/open/13274510/)

## Типы свойств

Для каждого свойства задается тип: Строка, Список, Число, Привязка к сотруднику и другие. Полный перечень типов свойств описан в параметре `fields` метода [catalog.productProperty.add](./catalog-product-property-add.md). Для работы со значениями свойств типа Список можно использовать методы [catalog.productPropertyEnum.*](../product-property-enum/index.md).

{% note warning "" %}

Тип можно изменить методом [catalog.productProperty.update](./catalog-product-property-update.md), но делайте это только у свойства без значений: сохраненные значения не преобразуются под новый тип.

{% endnote %}

## Связь свойств товаров с другими объектами

**Торговый каталог.** Свойства товаров должны быть привязаны к конкретному торговому каталогу. Получить идентификаторы доступных торговых каталогов можно с помощью метода [catalog.catalog.list](../catalog/catalog-catalog-list.md).

**Валюты.** В свойстве типа Деньги указывают число и валюту. Работать с валютами можно через методы [crm.currency.*](../../crm/currency/index.md).

**Пользователь.** В свойстве товара или вариации можно задать привязку к сотруднику. Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**CRM.** Свойство типа Привязка к элементам CRM связывает товары с объектами CRM: [лидами](../../crm/leads/index.md), [сделками](../../crm/deals/index.md), [смарт-процессами](../../crm/universal/index.md), [контактами](../../crm/contacts/index.md) и [компаниями](../../crm/companies/index.md). В товарах это свойство отображается в виде ссылки на объект CRM.

**Универсальные списки.** Товары можно связать с элементами списков через свойство Привязка к элементам в виде списка. Работать со списками можно с помощью методов [list.*](../../lists/index.md).

**Файлы.** Свойство типа Файл позволяет загружать и хранить файлы в товаре. Файлы не получают идентификаторы в модуле Диск, поэтому методы Диска не применимы. Подробнее читайте в статье [Как загрузить файлы](../../files/how-to-upload-files.md).

{% note tip "Пользовательская документация" %}

- [Свойства товаров](https://helpdesk.bitrix24.ru/open/5488473/)

{% endnote %}

## Как начать работу

1. Получите идентификатор торгового каталога методом [catalog.catalog.list](../catalog/catalog-catalog-list.md)
2. Создайте свойство методом [catalog.productProperty.add](./catalog-product-property-add.md) или [catalog.product.property.add](./catalog-product-property-add-rest-v3.md)
3. Если свойство должно быть доступно только в определенных разделах, настройте привязку методами [catalog.productPropertySection.*](../product-property-section/index.md)
4. Если свойство имеет тип Список, добавьте значения методами [catalog.productPropertyEnum.*](../product-property-enum/index.md)
5. Используйте код свойства в методах товаров, услуг, головных товаров или вариаций

## Ограничения и особенности

- Свойства создаются только в торговом каталоге. Если передать инфоблок, который не является каталогом, метод `catalog.productProperty.add` вернет ошибку, а `catalog.productProperty.list` — пустой список
- В `catalog.productProperty.update` поле `iblockId` обязательно, даже если меняется только название. В `catalog.product.property.update` его передавать нельзя
- Удаление свойства удаляет его значения у всех товаров и вариаций. Отменить удаление нельзя
- В методах `catalog.productProperty.*` флаги свойства передаются строками `Y` или `N`, в методах REST 3.0 — значениями `true` или `false`

## Свойства в REST 3.0

В [REST 3.0](../../rest-v3.md) свойства добавляют, изменяют, получают и удаляют методы [catalog.product.property.add](./catalog-product-property-add-rest-v3.md), [catalog.product.property.update](./catalog-product-property-update-rest-v3.md), [catalog.product.property.get](./catalog-product-property-get-rest-v3.md), [catalog.product.property.list](./catalog-product-property-list-rest-v3.md) и [catalog.product.property.delete](./catalog-product-property-delete-rest-v3.md). Описание полей свойства возвращают методы `catalog.product.property.field.list` и `catalog.product.property.field.get`, а список типов свойств — метод [catalog.product.property.type.list](./catalog-product-property-type-list.md). Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Методы REST 3.0 отличаются от прежних:

- флаги `active`, `multiple`, `searchable`, `filtrable`, `isRequired` и `withDescription` передаются и возвращаются значениями `true` или `false`, а не строками `Y` и `N`
- методы добавления и изменения возвращают все поля свойства
- метод `catalog.product.property.update` не принимает `iblockId`: каталог свойства после создания изменить нельзя, метод ответит ошибкой
- тип `BoolEnum` для свойства-флажка можно задать только при создании свойства

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - пользователь с правом на просмотр каталога — для `catalog.productProperty.get`, `catalog.productProperty.list`, `catalog.productProperty.getFields`, `catalog.product.property.get` и `catalog.product.property.list`
> - пользователь с правом на просмотр каталога и правом на изменение инфоблока каталога — для добавления, изменения и удаления свойств
> - любой пользователь — для `catalog.product.property.field.*`, `catalog.product.property.type.list` и `catalog.product.property.type.field.*`

#|
|| **Метод** | **Описание** ||
|| [catalog.productProperty.add](./catalog-product-property-add.md) | Добавляет свойство товаров или вариаций ||
|| [catalog.product.property.add](./catalog-product-property-add-rest-v3.md) | Добавляет свойство товаров или вариаций v 3.0 ||
|| [catalog.productProperty.update](./catalog-product-property-update.md) | Обновляет поля свойства товаров или вариаций ||
|| [catalog.product.property.update](./catalog-product-property-update-rest-v3.md) | Обновляет поля свойства товаров или вариаций v 3.0 ||
|| [catalog.productProperty.get](./catalog-product-property-get.md) | Возвращает значения полей свойства товаров или вариаций ||
|| [catalog.product.property.get](./catalog-product-property-get-rest-v3.md) | Возвращает значения полей свойства товаров или вариаций v 3.0 ||
|| [catalog.productProperty.list](./catalog-product-property-list.md) | Возвращает список свойств товаров или вариаций ||
|| [catalog.product.property.list](./catalog-product-property-list-rest-v3.md) | Возвращает список свойств товаров или вариаций v 3.0 ||
|| [catalog.productProperty.delete](./catalog-product-property-delete.md) | Удаляет свойство товаров или вариаций ||
|| [catalog.product.property.delete](./catalog-product-property-delete-rest-v3.md) | Удаляет свойство товаров или вариаций v 3.0 ||
|| [catalog.productProperty.getFields](./catalog-product-property-get-fields.md) | Возвращает поля свойства товаров или вариаций ||
|| [catalog.product.property.field.list](./catalog-product-property-field-list.md) | Возвращает список полей свойства товара v 3.0 ||
|| [catalog.product.property.field.get](./catalog-product-property-field-get.md) | Возвращает описание поля свойства товара ||
|| [catalog.product.property.type.list](./catalog-product-property-type-list.md) | Возвращает список типов свойств товаров ||
|| [catalog.product.property.type.field.list](./catalog-product-property-type-field-list.md) | Возвращает список полей типа свойства товара ||
|| [catalog.product.property.type.field.get](./catalog-product-property-type-field-get.md) | Возвращает описание поля типа свойства товара ||
|#
