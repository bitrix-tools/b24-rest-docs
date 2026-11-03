# Товарные позиции в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Товарные позиции — строки с товарами и услугами в карточке элемента CRM: название, цена, количество, скидка и налог. По позициям CRM рассчитывает сумму элемента, если ее не задали вручную. Методы `crm.<тип>.productrow.*` добавляют, изменяют, заменяют и удаляют позиции одного элемента и возвращают неоплаченный остаток для выставления оплаты.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить товары в карточку CRM](https://helpdesk.bitrix24.ru/open/27964692/)

## Типы объектов с товарными позициями

Тип объекта задает сегмент `<тип>` в имени метода: `crm.deal.productrow.add` работает с позициями сделок, `crm.smartprocess1038.productrow.add` — с позициями смарт-процесса с `entityTypeId = 1038`.

#|
|| **Тип объекта** | **Сегмент в имени метода** ||
|| Сделка | `deal` ||
|| Лид | `lead` ||
|| Предложение | `quote` ||
|| Счет | `smartinvoice` ||
|| Документ CRM | `smartdocument` ||
|| Смарт-процесс | `smartprocess<entityTypeId>`, например `smartprocess1038` ||
|#

У контактов, компаний и моей компании товарных позиций нет. У смарт-процесса методы появляются, только если в настройках типа включена привязка товаров каталога, — без нее вызов отвечает ошибкой «Метод не найден». Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имена методов пишутся в нижнем регистре: `crm.deal.productrow.getavailableforpayment`.

## Связь с другими объектами

Товарная позиция связана с элементом CRM и товаром каталога.

**Элемент CRM.** Позиция принадлежит одному элементу — его идентификатор хранится в поле `ownerId`. Элемент задается при добавлении позиции и потом не меняется. Методы `list`, `replace` и `getavailableforpayment` работают с позициями одного элемента: `ownerId` обязателен. Позиции нельзя передать в `fields` метода [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) — сначала создайте элемент, потом добавьте позиции. Право на просмотр элемента дает право читать его позиции, право на изменение — менять их.

**Каталог товаров.** Поле `productId` ссылается на товар каталога. Если при добавлении не передать `productName`, название берется из каталога. Позицию можно создать и без товара каталога — тогда `productId` равен `0`, а название передается в `productName`. Товары возвращает метод [catalog.product.list](../../../catalog/product/catalog-product-list-rest-v3.md), единицы измерения — [catalog.measure.list](../../../catalog/measure/catalog-measure-list-rest-v3.md).

**Оплаты.** Метод [crm.<тип>.productrow.getavailableforpayment](./crm-entity-product-row-get-available-for-payment-rest-v3.md) возвращает позиции с остатком, который еще не попал в оплаты. Оплаты создают методы группы [crm.item.payment.*](../../universal/payment/index.md).

## Поля товарной позиции {#fields}

Имена полей пишутся в camelCase. Поля возвращаются в ответе, только если их перечислить в `select`, иначе у позиции приходит только `id`.

#|
|| **Поле**
`тип` | **Описание** | **Изменяемое** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор товарной позиции | Нет ||
|| **ownerId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, которому принадлежит позиция | Только при добавлении ||
|| **ownerTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта элемента, например `2` — сделка, `1038` — смарт-процесс с таким `entityTypeId` | Нет ||
|| **productId**
[`integer`](../../../data-types.md) | Идентификатор товара каталога. `0` — позиция без товара каталога | Да ||
|| **productName**
[`string`](../../../data-types.md) | Название позиции | Да ||
|| **price**
[`double`](../../../data-types.md) | Цена за единицу с учетом скидки и налога | Да ||
|| **quantity**
[`double`](../../../data-types.md) | Количество | Да ||
|| **discountTypeId**
[`integer`](../../../data-types.md) | Тип скидки: `1` — в деньгах, `2` — в процентах | Да ||
|| **discountRate**
[`double`](../../../data-types.md) | Скидка в процентах | Да ||
|| **discountSum**
[`double`](../../../data-types.md) | Сумма скидки на единицу товара | Да ||
|| **taxRate**
[`double`](../../../data-types.md) | Ставка налога в процентах. `null` — позиция без налога | Да ||
|| **taxIncluded**
[`boolean`](../../../data-types.md) | `true` — налог включен в цену, `false` — начисляется сверх цены | Да ||
|| **measureCode**
[`integer`](../../../data-types.md) | Код единицы измерения, например `796` — штука | Да ||
|| **measureName**
[`string`](../../../data-types.md) | Название единицы измерения | Да ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок позиции в списке | Да ||
|| **productTypeId**
[`integer`](../../../data-types.md) | Тип товара каталога: `1` — простой товар, `2` — комплект, `3` — товар с вариациями, `4` — вариация, `5` — вариация без товара, `6` — товар с вариациями без вариаций, `7` — услуга | Нет ||
|#

Фильтровать список можно по `ownerId`, `id` и `productId`, сортировать — по `sort` и `id`.

Описание полей с признаками `editable`, `filterable`, `sortable` возвращают методы `crm.<тип>.productrow.field.list` и `crm.<тип>.productrow.field.get`. Они устроены как остальные методы полей REST 3.0: `field.list` принимает `select` со списком признаков, `field.get` — еще и `name` с именем поля, например `{"name":"price"}`.

## Добавить или заменить позиции

Позиции элемента можно менять двумя способами:

- по одной: [crm.<тип>.productrow.add](./crm-entity-product-row-add-rest-v3.md), [crm.<тип>.productrow.update](./crm-entity-product-row-update-rest-v3.md) и [crm.<тип>.productrow.delete](./crm-entity-product-row-delete-rest-v3.md). Идентификаторы остальных позиций не меняются
- всем набором: [crm.<тип>.productrow.replace](./crm-entity-product-row-replace-rest-v3.md) записывает переданный набор вместо текущего. Позиции, которых нет в наборе, удаляются, а измененные позиции получают новые идентификаторы. Пустой набор удаляет все позиции

## Как начать работу

1. Определите тип объекта и получите идентификатор элемента методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) или создайте элемент методом [crm.<тип>.add](../items/crm-entity-add-rest-v3.md)
2. Найдите товары в каталоге методом [catalog.product.list](../../../catalog/product/catalog-product-list-rest-v3.md). Если позиция без товара каталога, этот шаг не нужен
3. Добавьте позиции методом [crm.<тип>.productrow.add](./crm-entity-product-row-add-rest-v3.md) или задайте весь состав одним вызовом [crm.<тип>.productrow.replace](./crm-entity-product-row-replace-rest-v3.md)
4. Проверьте позиции методом [crm.<тип>.productrow.list](./crm-entity-product-row-list-rest-v3.md) и сумму элемента методом [crm.<тип>.get](../items/crm-entity-get-rest-v3.md) с полем `opportunity` в `select`

## Методы предыдущей версии

Товарные позиции по адресу `/rest/` работают методами [crm.item.productrow.*](../../universal/product-rows/index.md). Они используют поля в верхнем регистре и тип объекта в параметре `ownerType`, например `D` для сделки. Методы REST 3.0 задают тип объекта в имени метода, а поля пишутся в camelCase.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.productrow.add](./crm-entity-product-row-add-rest-v3.md) | Добавляет товарную позицию в элемент ||
|| [crm.<тип>.productrow.update](./crm-entity-product-row-update-rest-v3.md) | Изменяет товарную позицию ||
|| [crm.<тип>.productrow.get](./crm-entity-product-row-get-rest-v3.md) | Возвращает товарную позицию по идентификатору ||
|| [crm.<тип>.productrow.list](./crm-entity-product-row-list-rest-v3.md) | Возвращает товарные позиции элемента ||
|| [crm.<тип>.productrow.delete](./crm-entity-product-row-delete-rest-v3.md) | Удаляет товарную позицию ||
|| [crm.<тип>.productrow.replace](./crm-entity-product-row-replace-rest-v3.md) | Заменяет все товарные позиции элемента ||
|| [crm.<тип>.productrow.getavailableforpayment](./crm-entity-product-row-get-available-for-payment-rest-v3.md) | Возвращает позиции, которые еще не попали в оплаты ||
|| `crm.<тип>.productrow.field.list` | Возвращает описание полей товарной позиции ||
|| `crm.<тип>.productrow.field.get` | Возвращает описание поля товарной позиции по имени ||
|#
