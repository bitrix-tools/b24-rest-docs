# Типы данных и структура объектов в REST API Интернет-магазина

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- таблица sale_order, в описании **clients** нужна ссылка для метода crm.ordercontactcompany.list (сам метод еще не описан, только поставлена задача разработчикам на получение информации)

{% endnote %}

{% endif %}

Базовые типы данных перечислены в отдельной [статье](../data-types.md).

В этой статье рассмотрим типы данных и структуру объектов, характерные именно для Интернет-магазина.

## Типы данных

#|
|| **Тип** | **Описания и значения** ||
|| [`sale_order`](#sale_order) | Целочисленный идентификатор заказа (например, `1`). Получить идентификаторы заказов можно с помощью метода [sale.order.list](./order/sale-order-list.md) ||
|| [`sale_basket_item`](#sale_basket_item) | Целочисленный идентификатор корзины (например, `1`). Получить идентификаторы корзин можно с помощью метода [sale.basketItem.list](./basket-item/sale-basket-item-list.md) ||
|| [`sale_order_shipment`](#sale_order_shipment) | Целочисленный идентификатор отгрузки (например, `1`). Получить идентификаторы отгрузок можно с помощью метода [sale.shipment.list](./shipment/sale-shipment-list.md) ||
|| [`sale_order_shipment_item`](#sale_order_shipment_item) | Целочисленный идентификатор элемента табличной части отгрузки (например, `1`). Получить идентификаторы элементов табличной части отгрузки можно с помощью метода [sale.shipmentitem.list](./shipment-item/sale-shipment-item-list.md) ||
|| [`sale_payment_item_shipment`](#sale_payment_item_shipment) | Целочисленный идентификатор привязки оплаты к отгрузке (например, `1`). Получить идентификаторы привязок оплат к отгрузкам можно с помощью метода [sale.paymentitemshipment.list](./payment-item-shipment/sale-payment-item-shipment-list.md) ||
|| [`sale_payment_item_basket`](#sale_payment_item_basket) | Целочисленный идентификатор привязки элемента корзины к оплате (например, `1`). Получить идентификаторы привязок оплат к отгрузкам можно с помощью метода [sale.paymentitembasket.list](./payment-item-basket/sale-payment-item-basket-list.md) ||
|| [`sale_status`](#sale_status) | Символьный идентификатор статуса (например, `DN`). Получить идентификаторы статусов можно с помощью метода [sale.status.list](./status/sale-status-list.md) ||
|| [`sale_status_lang`](#sale_status_lang) | Объект, содержащий информацию о локализации статуса. Получить список объектов локализаций статусов можно с помощью метода [sale.statuslang.list](./status-lang/sale-status-lang-list.md) ||
|| [`sale_lang`](#sale_lang) | Символьный идентификатор языка (например, `ru`). Получить идентификаторы языка можно с помощью метода [sale.statuslang.getlistlangs](./status-lang/sale-status-lang-get-list-langs.md) ||
|| [`sale_person_type`](#sale_person_type) | Целочисленный идентификатор типа плательщика (например, `1`). Получить идентификаторы типов плательщиков можно с помощью метода [sale.persontype.list](./person-type/sale-person-type-list.md) ||
|| [`sale_order_property`](#sale_order_property) | Целочисленный идентификатор свойства заказа (например, `1`). Получить идентификатор свойств заказа можно с помощью метода [sale.property.list](./property/sale-property-list.md) ||
|| [`sale_shipment_property`](#sale_shipment_property) | Целочисленный идентификатор свойства отгрузки (например, `1`). Получить идентификатор свойств заказа можно с помощью метода [sale.shipmentproperty.list](./shipment-property/sale-shipment-property-list.md) ||
|| [`sale_shipment_property_value`](#sale_shipment_property_value) | Целочисленный идентификатор значения свойства отгрузки (например, `1`). Получить идентификатор значения свойства заказа можно с помощью метода [sale.shipmentpropertyvalue.list](./shipment-property-value/sale-shipment-property-value-list.md) ||
|| [`sale_order_property_group`](#sale_order_property_group) | Целочисленный идентификатор группы свойств (например, `1`). Получить идентификаторы типов групп свойств можно с помощью метода [sale.propertygroup.list](./property-group/sale-property-group-list.md) ||
|| [`sale_order_property_value`](#sale_order_property_value) | Целочисленный идентификатор значения свойства заказа (например, `1`). Получить идентификатор значения свойства заказа можно с помощью метода [sale.propertyvalue.list](./property-value/sale-property-value-list.md) ||
|| [`sale_order_property_variant`](#sale_order_property_variant) | Целочисленный идентификатор варианта значения свойства (например, `1`). Получить идентификаторы типов групп свойств можно с помощью метода [sale.propertyvariant.list](./property-variant/sale-property-variant-list.md) ||
|| [`sale_order_property_relation`](#sale_order_property_relation) | Объект, содержащий информацию о привязке свойства. Получить список объектов привязки свойства можно с помощью метода [sale.propertyRelation.list](./property-relation/sale-property-relation-list.md) ||
|| [`sale_order_trade_platform`](#sale_order_trade_platform) | Целочисленный идентификатор источника заказов (например, `1`). Получить идентификаторы источников заказов можно с помощью метода [sale.tradePlatform.list](./trade-platform/sale-trade-platform-list.md) ||
|| [`sale_order_trade_binding`](#sale_order_trade_binding) | Целочисленный идентификатор привязки источников заказов к заказам (например, `1`). Получить идентификаторы привязок можно с помощью метода [sale.tradeBinding.list](./trade-binding/sale-trade-binding-list.md) ||
|| [`sale_order_payment`](#sale_order_payment) | Целочисленный идентификатор оплаты (например, `1`). Получить идентификаторы оплат можно с помощью метода [sale.payment.list](./payment/sale-payment-list.md) ||
|| [`sale_business_value_person_domain`](#sale_business_value_person_domain) | Объект, содержащий информацию о соответствии между типом плательщика и физ. или юр. лицом. Получить список объектов соответствий можно с помощью метода  [sale.businessValuePersonDomain.list](./business-value-person-domain/sale-business-value-person-domain-list.md) ||
|| [`sale_delivery_handler`](#sale_delivery_handler) | Объект обработчика службы доставки. 
Обработчик службы доставки — это шаблон, по которому в дальнейшем создаются конкретные службы доставки.
Получить идентификаторы обработчиков служб доставки можно с помощью метода [sale.delivery.handler.list](./delivery/handler/sale-delivery-handler-list.md) ||
|| [`sale_delivery_service`](#sale_delivery_service) | Объект службы доставки. Получить идентификаторы служб доставки  можно с помощью метода [sale.delivery.getlist](./delivery/delivery/sale-delivery-get-list.md) ||
|| [`sale_delivery_extra_service`](#sale_delivery_extra_service) | Объект дополнительной услуги службы доставки. Получить идентификаторы услуг службы доставки  можно с помощью метода  [sale.delivery.extra.service.get](./delivery/extra-service/sale-delivery-extra-service-get.md) ||
|| [`sale_paysystem_handler`](#sale_paysystem_handler) | Объект обработчика платежной системы. Получить идентификаторы обработчиков платежных систем можно с помощью метода  [sale.paysystem.handler.list](../pay-system/sale-pay-system-handler-list.md) ||
|| [`sale_paysystem`](#sale_paysystem) | Объект платежной системы. Получить идентификаторы платежных систем можно с помощью метода  [sale.paysystem.list](../pay-system/sale-pay-system-list.md) ||
|| [`sale_cashbox_handler`](#sale_cashbox_handler) | Объект обработчика кассы. Получить идентификаторы обработчиков кассы можно с помощью метода  [sale.cashbox.handler.list](./cashbox/sale-cashbox-handler-list.md) ||
|| [`sale_cashbox`](#sale_cashbox) | Объект кассы. Получить идентификаторы кассы можно с помощью метода  [sale.cashbox.list](./cashbox/sale-cashbox-list.md) ||
|#

## Структура объектов

### sale_order_shipment_item

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор элемента табличной части отгрузки ||
|| **orderDeliveryId**
[`sale_order_shipment.id`](#sale_order_shipment) | Идентификатор отгрузки ||
|| **basketId**
[`sale_basket_item.id`](#sale_basket_item) | Идентификатор корзины ||
|| **quantity**
[`float`](../data-types.md) | Количество товара ||
|| **reservedQuantity**
[`float`](../data-types.md) | Зарезервированное количество товара ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущей товарной позиции доставки с аналогичной позицией во внешней системе ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата добавления элемента табличной части отгрузки ||
|#

### sale_payment_item_shipment

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор элемента табличной части отгрузки ||
|| **shipmentId**
[`sale_order_shipment.id`](#sale_order_shipment) | Идентификатор отгрузки ||
|| **paymentId**
[`sale_order_payment.id`](#sale_order_payment) | Идентификатор оплаты ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор записи ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата добавления привязки оплаты к отгрузке ||
|#


### sale_payment_item_basket

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор привязки элемента корзины к оплате ||
|| **paymentId**
[`sale_order_payment.id`](#sale_order_payment) | Идентификатор оплаты ||
|| **basketId**
[`sale_basket_item.id`](#sale_basket_item) | Идентификатор элемента корзины ||
|| **quantity**
[`double`](../data-types.md) | Количество товара ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор записи ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата добавления привязки элемента корзины к оплате ||
|#

### sale_order_shipment

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор отгрузки ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата создания отгрузки ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **accountNumber**
[`string`](../data-types.md) | Системный номер отгрузки ||
|| **allowDelivery**
[`string`](../data-types.md) | Признак разрешения доставки.

Возможные значения:
- `Y` — да (доставка разрешена)
- `N` — нет (доставка не разрешена) ||
|| **dateAllowDelivery**
[`datetime`](../data-types.md) | Дата изменения флага разрешения доставки ||
|| **empAllowDeliveryId**
[`user.id`](../data-types.md) | Пользователь, который изменил значение флага разрешения доставки ||
|| **deducted**
 [`string`](../data-types.md) | Признак того, является ли отгрузка отгруженной.

Возможные значения:
- `Y` — да (отгружена)
- `N` — нет (не отгружена) ||
|| **dateDeducted**
[`datetime`](../data-types.md) | Дата изменения флага отгруженности отгрузки ||
|| **empDeductedId**
[`user.id`](../data-types.md) | Пользователь, который изменил значение флага отгруженности ||
|| **reasonUndoDeducted** 
[`string`](../data-types.md) | Устаревшее свойство ||
|| **system**
[`string`](../data-types.md) | Признак того, является ли отгрузка системной.

Значение всегда `N`. Системную отгрузку не видно через REST и не с ней не предполагается работа напрямую.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **deliveryId**
[`sale_delivery_service.id`](#sale_delivery_service) | Идентификатор службы доставки ||
|| **deliveryName**
[`string`](../data-types.md) | Название службы доставки ||
|| **deliveryXmlId**
[`string`](../data-types.md) | Внешний идентификатор службы доставки ||
|| **statusId** 
[`sale_status.id`](#sale_status) | Идентификатор статуса доставки ||
|| **statusXmlId** 
[`string`](../data-types.md) | Внешний идентификатор статуса доставки ||
|| **canceled** 
[`string`](../data-types.md) | Устаревший. Необходимо использовать статус отгрузки.

Признак того, является ли отгрузка отмененной.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **dateCanceled**
[`datetime`](../data-types.md) | Устаревший.

Дата и время отмены отгрузки ||
|| **empCanceledId** 
[`user.id`](../data-types.md) | Устаревший.

Пользователь, который изменил значение флага отмененности отгрузки (`canceled`) ||
|| **marked** 
[`string`](../data-types.md) | Флаг маркировки. Признак того, является ли отгрузка отмеченной как проблемная.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **dateMarked**
[`datetime`](../data-types.md) | Дата изменения флага маркировки ||
|| **reasonMarked** 
[`string`](../data-types.md) | Причина, по которой отгрузка была отмечена флагом маркировки ||
|| **empMarkedId** 
[`user.id`](../data-types.md) | Пользователь, который выставил флаг маркировки в значение `Y` ||
|| **deliveryDocDate**
[`datetime`](../data-types.md) | Дата документа отгрузки || 
|| **deliveryDocNum** 
[`string`](../data-types.md) | Номер документа отгрузки ||
|| **trackingNumber** 
[`string`](../data-types.md) | Идентификатор отправления ||
|| **trackingDescription**
[`string`](../data-types.md) | Описание статуса отправления ||
|| **trackingLastCheck**
[`datetime`](../data-types.md) | Время последней проверки статуса отправления ||
|| **trackingStatus** 
[`string`](../data-types.md) | Статус отправления ||
|| **currency** 
[`string`](../data-types.md) | Валюта отгрузки ||
|| **customPriceDelivery** 
[`string`](../data-types.md) | Признак кастомной стоимости доставки.

К примеру, служба доставки автоматически рассчитала стоимость в 500 рублей, но менеджер вручную выставил стоимость в 200 рублей. В этом случае, признак кастомной стоимости доставки будет автоматически выставлен в значение `Y`.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **basePriceDelivery** 
[`double`](../data-types.md) | Базовая стоимость доставки (без скидок/наценок). ||
|| **priceDelivery** 
[`double`](../data-types.md) | Стоимость доставки ||
|| **discountPrice** 
[`double`](../data-types.md) | Скидка на доставку ||
|| **comments** 
[`string`](../data-types.md) | Комментарий менеджера ||
|| **companyId** 
[`integer`](../data-types.md) | Идентификатор компании из модуля «Интернет-магазин». Не используется в облачной версии ||
|| **responsibleId** 
[`user.id`](../data-types.md) | Идентификатор пользователя, ответственного за отгрузку ||
|| **dateResponsibleId** 
[`datetime`](../data-types.md) | Дата изменения ответственного за отгрузку ||
|| **empResponsibleId** 
[`user.id`](../data-types.md) | Пользователь, который назначил ответственного ||
|| **xmlId** 
[`string`](../data-types.md) | Внешний идентификатор отгрузки.

Можно использовать для синхронизации отгрузки с внешней системой ||
|| **externalDelivery** 
[`string`](../data-types.md) | Признак того, является ли отгрузка загруженной из внешней системы (например, 1С)

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **id1c** 
[`string`](../data-types.md) | Идентификатор отгрузки в 1С ||
|| **updated1c** 
[`string`](../data-types.md) | Признак того, что данная отгрузка была синхронизирована (обновлена) с 1С ||
|| **version1c** 
[`string`](../data-types.md) | Версия 1С (если отгрузка была обновлена из 1С) ||
|| **shipmentItems** 
[`sale_order_shipment_item[]`](#sale_order_shipment_item) | Массив, содержащий элементы табличной части отгрузки ||
|#

### sale_status

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Символьный идентификатор статуса ||
|| **type**
[`string`](../data-types.md) | Тип статуса:
- `O` — статус заказа
- `D` — статус доставки
||
|| **notify**
[`string`](../data-types.md) | Индикатор необходимости отправки почтового уведомления пользователю при переходе сущности (заказ или доставка) в этот статус:
- `Y` — оповещать
- `N` — не оповещать
||
|| **color**
[`string`](../data-types.md) | HEX код цвета статуса (например, `#FF0000`) ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор статуса ||
|#

### sale_status_lang

#|
|| **Значение**
`тип` | **Описание** ||
|| **statusId**
[`sale_status.id`](#sale_status) | Символьный идентификатор статуса ||
|| **lid**
[`sale_lang.lid`](#sale_lang) | Идентификатор языка ||
|| **name**
[`string`](../data-types.md) | Название статуса ||
|| **description**
[`string`](../data-types.md) | Описание статуса ||
|#

### sale_lang

#|
|| **Значение**
`тип` | **Описание** ||
|| **active**
[`string`](../data-types.md) | Индикатор активности языка
- `Y` — активен
- `N` — неактивен ||
|| **lid**
[`string`](../data-types.md) | Символьный идентификатор языка ||
|| **name**
[`string`](../data-types.md) | Название языка ||
|#

### sale_order_property

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор свойства заказа ||
|| **personTypeId**
[`sale_person_type.id`](#sale_person_type) | Идентификатор типа плательщика ||
|| **propsGroupId**
[`sale_order_property_group.id`](#sale_order_property_group) | Идентификатор группы свойств ||
|| **name**
[`string`](../data-types.md) | Название свойства заказа ||
|| **type**
[`string`](../data-types.md) | Тип свойства заказа.

Возможные значения:
- `STRING` 
- `Y/N` 
- `NUMBER` 
- `ENUM` 
- `FILE` 
- `DATE` 
- `LOCATION` 
- `ADDRESS` ||
|| **code**
[`string`](../data-types.md) | Символьный код свойства заказа ||
|| **active**
[`string`](../data-types.md) | Индикатор активности свойства заказа.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **util**
[`string`](../data-types.md) | Индикатор того, является ли свойство заказа служебным. Служебные свойства заказа не отображаются в публичной части.

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **userProps**
[`string`](../data-types.md) | Индикатор того, входит ли свойство заказа в профиль покупателя.

Возможные значения:
- `Y` — да
- `N` — нет  ||
|| **isFiltered**
[`string`](../data-types.md) | Индикатор того, доступно ли свойство заказа в фильтре на странице списка заказов.

Возможные значения:
- `Y` — да
- `N` — нет  ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **description**
[`string`](../data-types.md) | Описание свойства заказа ||
|| **required**
[`string`](../data-types.md) | Индикатор обязательности заполнения значения свойства заказа.

Возможные значения:
- `Y` — да
- `N` — нет  ||

|| **multiple**
[`string`](../data-types.md) | Индикатор того, является ли свойство заказа множественным. Для множественных свойств возможно указать несколько значений.

Возможные значения:
- `Y` — да
- `N` — нет || 
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор свойства заказа ||
|| **defaultValue**
[`string`\|`number`\|`string[]`\|`number[]`](../data-types.md) | Дефолтное значение свойства заказа. 

Для множественных свойств заказа (`multiple`) поддерживается передача массива значений ||
|| **settings**
[`object`](../data-types.md) | См. описание параметра `settings` метода [sale.property.add](./property/sale-property-add.md) ||
|| **isProfileName**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве названия профиля пользователя.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isPayer**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве имени плательщика.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isEmail**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве e-mail (например, при регистрации нового пользователя при оформлении заказа).

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isPhone**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве номера телефона.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isZip**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве почтового индекса.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isAddress**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `STRING` ||
|| **isLocation**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве местоположения покупателя для расчета стоимости доставки.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `LOCATION` ||
|| **isLocation4tax**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве местоположения покупателя для определения ставок налогов.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `LOCATION` ||
|| **inputFieldLocation**
[`string`](../data-types.md) | Устаревшее поле. Не используется.

Актуально только для свойств заказа типа `LOCATION` ||
|| **isAddressFrom**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса покупателя откуда необходимо забрать заказ для расчета стоимости доставки.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `ADDRESS` ||
|| **isAddressTo**
[`string`](../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса покупателя куда необходимо доставить заказ  для расчета стоимости доставки.

Возможные значения:
- `Y` — да
- `N` — нет 

Актуально только для свойств заказа типа `ADDRESS` ||
|#

### sale_shipment_property

См. описание [sale_order_property](#sale_order_property).

### sale_shipment_property_value

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор значения свойства ||
|| **name**
[`string`](../data-types.md) | Название свойства ||
|| **shipmentId**
[`sale_order_shipment.id`](#sale_order_shipment) | Идентификатор отгрузки ||
|| **code**
[`string`](../data-types.md) | Символьный код свойства ||
|| **value**
[`string`](../data-types.md)
[`sale_order_property_value_file_value`](#sale_order_property_value_file_value) | Значение свойства ||
|| **shipmentPropsId**
[`sale_shipment_property.id`](#sale_shipment_property) | Идентификатор свойства ||
|| **shipmentPropsXmlId**
[`string`](../data-types.md) | Внешний идентификатор свойства отгрузки ||
|#

### sale_order_property_value

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор значения свойства ||
|| **name**
[`string`](../data-types.md) | Название свойства ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **code**
[`string`](../data-types.md) | Символьный код свойства ||
|| **value**
[`string`](../data-types.md)
[`sale_order_property_value_file_value`](#sale_order_property_value_file_value) | Значение свойства ||
|| **orderPropsId**
[`sale_order_property.id`](#sale_order_property) | Идентификатор свойства ||
|| **orderPropsXmlId**
[`string`](../data-types.md) | Внешний идентификатор свойства заказа ||
|#

### sale_order_property_value_file_value

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор файла ||
|| **contentType**
[`string`](../data-types.md) | MIME тип файла ||
|| **description**
[`string`](../data-types.md) | Описание файла ||
|| **externalId**
[`string`](../data-types.md) | Внешний идентификатор файла ||
|| **fileName**
[`string`](../data-types.md) | Название файла ||
|| **fileSize**
[`integer`](../data-types.md) | Размер файла в байтах ||
|| **moduleId**
[`string`](../data-types.md) | Принадлежность к модулю ||
|| **originalName**
[`string`](../data-types.md) | Оригинальное название файла ||
|| **src**
[`string`](../data-types.md) | Полный путь к файлу на сервере ||
|| **subdir**
[`string`](../data-types.md) | Подкаталог в котором находится файл на диске ||
|| **timestampX**
[`string`](../data-types.md) | Дата изменения записи файла ||
|| **versionOriginalId**
[`string`](../data-types.md) | Версия файла ||
|| **width**
[`string`](../data-types.md) | Ширина изображения в пикселях (актуально только для файлов изображений) ||
|| **height**
[`string`](../data-types.md) | Высота изображения в пикселях (актуально только для файлов изображений) ||
|#

### sale_order_property_variant

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор варианта значения свойства ||
|| **name**
[`string`](../data-types.md) | Название варианта значения свойства ||
|| **value**
[`string`](../data-types.md) | Код варианта значения свойства ||
|| **orderPropsId**
[`sale_order_property.id`](#sale_order_property) | Идентификатор свойства ||
|| **description**
[`string`](../data-types.md) | Описание варианта значения свойства ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|#

### sale_order_property_group

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор группы свойств ||
|| **name**
[`string`](../data-types.md) | Название группы свойств ||
|| **personTypeId**
[`sale_person_type.id`](#sale_person_type) | Идентификатор типа плательщика ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|#

### sale_order_property_relation

#|
|| **Значение**
`тип` | **Описание** ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор сущности ||
|| **entityType**
[`string`](../data-types.md) | Тип сущности:

- `P` — платежная система
- `D` — доставка
- `L` — лендинг
- `T` — источник заказа ||
|| **propertyId**
[`sale_order_property.id`](#sale_order_property) | Идентификатор свойства ||
|#

### sale_person_type

#|
|| **Значение**
`тип` | **Описание** ||
|| **id** 
[`integer`](../data-types.md) | Идентификатор типа плательщика ||
|| **name**
[`string`](../data-types.md) | Название типа плательщика ||
|| **code**
[`string`](../data-types.md) | Код типа плательщика ||
|| **sort**
[`string`](../data-types.md) | Сортировка ||
|| **active**
[`string`](../data-types.md) | Индикатор активности типа плательщика: 
- `Y` — активен
- `N` — неактивен
||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего типа плательщика с аналогичной позицией во внешней системе ||
|#

### sale_business_value_person_domain

#|
|| **Значение**
`тип` | **Описание** ||
|| **personTypeId**
[`sale_person_type.id`](#sale_person_type) | Идентификатор типа плательщика ||
|| **domain**
[`string`](../data-types.md) | Значение, которому соответствует тип плательщика: физическое лицо или юридическое лицо. 

- `I` — физическое лицо
- `E` — юридическое лицо 

Эта опция нужна для работы механизма бизнес-смыслов||
|#

### sale_order

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор заказа ||
|| **lid**
[`string`](../data-types.md) | Идентификатор сайта, на котором будет использоваться данный тип плательщика. Имеет постоянное значение `s1` ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата создания заказа ||
|| **dateUpdate**
[`datetime`](../data-types.md) | Дата обновления заказа ||
|| **personTypeId**
[`sale_person_type.id`](#sale_person_type) | Идентификатор типа плательщика ||
|| **personTypeXmlId**
[`string`](../data-types.md) | Внешний идентификатор типа плательщика ||
|| **statusId**
[`sale_status.id`](#sale_status) | Идентификатор статуса ||
|| **empStatusId**
[`user.id`](../data-types.md) | Идентификатор пользователя, изменившего статус заказа ||
|| **dateStatus**
[`datetime`](../data-types.md) | Дата изменения статуса ||
|| **marked**
[`string`](../data-types.md) | Флаг маркировки. Признак того, является ли отгрузка отмеченной как проблемная. Значение `Y` ставится автоматически, если при сохранении произошла ошибка.
- `Y` — да
- `N` — нет
||
|| **dateMarked**
[`datetime`](../data-types.md) | Дата маркировки заказа ||
|| **empMarkedId**
[`user.id`](../data-types.md) | Идентификатор пользователя, поставившего маркировку ||
|| **reasonMarked**
[`string`](../data-types.md) | Причина, по которой заказ был промаркирован ||
|| **price**
[`double`](../data-types.md) | Цена ||
|| **discountValue**
[`double`](../data-types.md) | Значение скидки ||
|| **taxValue**
[`double`](../data-types.md) | Ставка налога на заказ ||
|| **userDescription**
[`string`](../data-types.md) | Комментарий покупателя к заказу ||
|| **additionalInfo**
[`string`](../data-types.md) | Устаревший. Дополнительная информация ||
|| **comments**
[`string`](../data-types.md) | Комментарий менеджера к заказу ||
|| **responsibleId**
[`user.id`](../data-types.md) | Идентификатор пользователя, ответственного за заказ ||
|| **recurringId**
[`integer`](../data-types.md) | Идентификатор продления подписки ||
|| **lockedBy**
[`user.id`](../data-types.md) | Актуально только для коробочной версии. 

Идентификатор пользователя, заблокировавшего заказ. Заказ блокируется в административной панели, когда пользователь открывает детальную карточку заказа
 ||
|| **dateLock**
[`datetime`](../data-types.md) | Дата блокировки ||
|| **recountFlag**
[`string`](../data-types.md) | Устаревший. Флаг пересчёта:
- `Y` — да
- `N` — нет 
||
|| **affiliateId**
[`integer`](../data-types.md) | Актуально только для коробочной версии. Идентификатор аффилиата ||
|| **updated1c**
[`string`](../data-types.md) | Обновлен ли заказ через 1С:
- `Y` — да
- `N` — нет 
||
|| **orderTopic**
[`string`](../data-types.md) | Устаревший. Тема заказа ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор ||
|| **statusXmlId**
[`string`](../data-types.md) | Внешний идентификатор статуса ||
|| **id1c**
[`string`](../data-types.md) | Идентификатор в 1С ||
|| **version**
[`integer`](../data-types.md) | Версия документа ||
|| **version1c**
[`string`](../data-types.md) | Версия в 1С ||
|| **externalOrder**
[`string`](../data-types.md) | Заказ из внешней системы или нет
- `Y` — да
- `N` — нет 
||
|| **canceled**
[`string`](../data-types.md) | Был ли отменен заказ:
- `Y` — да
- `N` — нет 
||
|| **dateCanceled**
[`datetime`](../data-types.md) | Дата отмены ||
|| **empCanceledId**
[`user.id`](../data-types.md) | Идентификатор пользователя, отменившего заказ ||
|| **reasonCanceled**
[`string`](../data-types.md) | Причина отмены ||
|| **userId**
[`user.id`](../data-types.md) | Идентификатор клиента ||
|| **currency**
[`string`](../data-types.md) | Валюта. Список валют можно получить через метод [crm.currency.list](../crm/currency/crm-currency-list.md) ||
|| **accountNumber**
[`string`](../data-types.md) | Номер заказа ||
|| **payed**
[`string`](../data-types.md) | Заказ оплачен:
- `Y` — да
- `N` — нет 
||
|| **deducted**
[`string`](../data-types.md) | Устаревший. Отгружен ли заказ:
- `Y` — да
- `N` — нет 
||
|| **basketItems**
[`sale_basket_item[]`](#sale_basket_item) | Элементы корзины заказа ||
|| **clients**
[`sale_order_crm_client[]`](#sale_order_crm_client)
Массив из контактов и компаний заказа модуля CRM | Массив объектов, содержащий информацию о привязках заказа к клиентам модуля CRM||
|| **payments**
[`sale_order_payment[]`](#sale_order_payment) | Оплаты заказа ||
|| **shipments**
[`sale_order_shipment[]`](#sale_order_shipment) | Отгрузки заказа ||
|| **propertyValues**
[`sale_order_property[]`](#sale_order_property) | Свойства заказа ||
|| **requisiteLink**
Массив из связей реквизитов модуля CRM | Связи реквизитов с заказом. Список связей реквизитов с CRM сущностями можно получить через метод [crm.requisite.link.list](../crm/requisites/links/crm-requisite-link-list.md), где для заказа [entity_type_id = 14](../crm/data-types.md) ||
|| **tradeBindings**
[`sale_order_trade_binding[]`](#sale_order_trade_binding) | Источники заказа ||
|#

### sale_order_crm_client

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор привязки ||
|| **entityId**
[`integer`](../data-types.md) | Идентификатор объекта CRM ||
|| **entityTypeId**
[`integer`](../data-types.md) | Идентификатор [`типа объекта CRM`](../crm/data-types.md#object_type) ||
|| **isPrimary**
[`string`](../data-types.md) | Индикатор того, является ли клиент главным.

Возможные значения:
- `Y` - да
- `N` - нет ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **roleId**
[`integer`](../data-types.md) | Устаревшее ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|#

### sale_order_payment

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор оплаты ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **paySystemXmlId**
[`string`](../data-types.md) | Внешний идентификатор платежной системы ||
|| **paySystemIsCash**
[`string`](../data-types.md) | Является ли платежная система наличным расчетом:
- `Y` — да
- `N` — нет 
||
|| **accountNumber**
[`string`](../data-types.md) | Системный номер оплаты ||
|| **paid**
[`string`](../data-types.md) | Внесена ли оплата:
- `Y` — да
- `N` — нет 
||
|| **datePaid**
[`datetime`](../data-types.md) | Дата оплаты ||
|| **empPaidId**
[`user.id`](../data-types.md) | Пользователь, который внес оплату ||
|| **paySystemId**
[`sale_paysystem.id`](#sale_paysystem) | Идентификатор платежной системы ||
|| **psStatus**
[`string`](../data-types.md) | Статус транзакции платежной системы — успешно ли оплачен заказ (для платежных систем, которые позволяют автоматически получать данные по проведенным через них заказам):
- `Y` — да
- `N` — нет 
||
|| **psStatusCode**
[`string`](../data-types.md) | Код статуса транзакции платежной системы ||
|| **psStatusDescription**
[`string`](../data-types.md) | Описание статуса транзакции платежной системы ||
|| **psStatusMessage**
[`string`](../data-types.md) | Сообщение статуса транзакции платежной системы ||
|| **psSum**
[`double`](../data-types.md) | Сумма транзакции платежной системы ||
|| **psCurrency**
[`string`](../data-types.md) | Валюта платежной системы ||
|| **psResponseDate**
[`datetime`](../data-types.md) | Дата ответа платежной системы ||
|| **payVoucherNum**
[`string`](../data-types.md) | Номер платежного документа ||
|| **payVoucherDate**
[`date`](../data-types.md) | Дата платежного документа ||
|| **datePayBefore**
[`datetime`](../data-types.md) | Дата, по которой необходимо оплатить счет (в магазине не используется) ||
|| **dateBill**
[`datetime`](../data-types.md) | Дата выставления счета ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор ||
|| **sum**
[`double`](../data-types.md) | Сумма оплаты ||
|| **currency**
[`string`](../data-types.md) | Валюта оплаты ||
|| **paySystemName**
[`string`](../data-types.md) | Наименование платежной системы ||
|| **companyId**
[`integer`](../data-types.md) | Идентификатор компании, которая будет принимать оплату ||
|| **payReturnNum**
[`string`](../data-types.md) | Номер документа возврата ||
|| **priceCod**
[`double`](../data-types.md) | Стоимость оплаты при доставке (используется, например, для наложенного платежа) ||
|| **payReturnDate**
[`date`](../data-types.md) | Дата документа возврата ||
|| **empReturnId**
[`user.id`](../data-types.md) | Идентификатор пользователя, который выполнил возврат ||
|| **payReturnComment**
[`string`](../data-types.md) | Комментарий к возврату ||
|| **responsibleId**
[`user.id`](../data-types.md) | Идентификатор пользователя, ответственного за оплату ||
|| **empResponsibleId**
[`user.id`](../data-types.md) | Идентификатор пользователя, назначившего ответственного ||
|| **dateResponsibleId**
[`datetime`](../data-types.md) | Дата назначения ответственного ||
|| **isReturn**
[`string`](../data-types.md) | Выполнялся ли возврат:
- `Y` — да
- `N` — нет 
||
|| **comments**
[`string`](../data-types.md) | Комментарии к оплате ||
|| **updated1c**
[`string`](../data-types.md) | Была ли оплата обновлена через 1С:
- `Y` — да
- `N` — нет 
||
|| **id1c**
[`string`](../data-types.md) | Идентификатор в 1С ||
|| **version1c**
[`string`](../data-types.md) | Версия документа оплаты от 1С ||
|| **externalPayment**
[`string`](../data-types.md) | Является ли оплата внешней:
- `Y` — да
- `N` — нет 
||
|| **psInvoiceId**
[`string`](../data-types.md) | Идентификатор оплаты в платежной системе ||
|| **marked**
[`string`](../data-types.md) | Флаг маркировки. Признак того, является ли оплата отмеченной как проблемная:
- `Y` — да
- `N` — нет 
||
|| **reasonMarked**
[`string`](../data-types.md) | Причина маркировки ||
|| **dateMarked**
[`datetime`](../data-types.md) | Дата маркировки заказа ||
|| **empMarkedId**
[`user.id`](../data-types.md) | Идентификатор пользователя, промаркировавшего оплату ||
|#

### sale_basket_item

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор элемента корзины ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **sort**
[`integer`](../data-types.md) | Положение в списке позиций заказа ||
|| **productId**
[`integer`](../data-types.md) | Идентификатор товара. Для товаров, отсутствующих на сайте, равен нулю ||
|| **price**
[`double`](../data-types.md) | Цена товара с учетом скидок и наценок ||
|| **customPrice**
[`string`](../data-types.md) | Указана ли цена вручную:
- `Y` — да
- `N` — нет 
||
|| **currency**
[`string`](../data-types.md) | Валюта цены. Должна совпадать с валютой заказа. Список валют можно получить методом [crm.currency.list](../crm/currency/crm-currency-list.md), подробную информацию о валюте — методом [crm.currency.get](../crm/currency/crm-currency-get.md) ||
|| **quantity**
[`double`](../data-types.md) | Количество ||
|| **xmlId**
[`string`](../data-types.md) | Внешний код позиции корзины.
Если не указывать, то сгенерируется автоматически.
Используется для синхронизации с внешними системами (например, 1С)
 ||
|| **dateInsert**
[`datetime`](../data-types.md) | Дата добавления элемента корзины ||
|| **dateUpdate**
[`datetime`](../data-types.md) | Дата обновления элемента корзины ||
|| **properties**
[`sale_basket_item_property[]`](#sale_basket_item_property) | Свойства элемента корзины ||
|| **name**
[`string`](../data-types.md) | Название товара ||
|| **basePrice**
[`double`](../data-types.md) | Цена товара без учета скидок и наценок

Всегда должно выполняться правило: `basePrice = price + discountPrice`
 ||
|| **discountPrice**
[`double`](../data-types.md) | Величина итоговой скидки/наценки. Для наценки значение отрицательное
 ||
|| **weight**
[`double`](../data-types.md) | Вес в груммах. 
Для коробочных версий единица изменения веса указывается в настройках модуля Интернет-магазин (sale)
 ||
|| **dimensions**
[`string`](../data-types.md) | Размеры товара в миллиметрах.

Поле либо пустое, либо содержит сериализованный массив с ключами:
- `WIDTH` — ширина
- `HEIGHT` — высота
- `LENGTH` — длина
 ||
|| **measureCode**
[`string`](../data-types.md) | Код единицы измерения ||
|| **measureName**
[`string`](../data-types.md) | Название единицы измерения ||
|| **canBuy**
[`string`](../data-types.md) | Доступен ли товар к покупке:
- `Y` — да
- `N` — нет 
||
|| **vatRate**
[`double`](../data-types.md) | Величина налога в процентах. Может быть равна `null` («Без НДС» — в случае, когда используются ставки НДС) ||
|| **vatIncluded**
[`string`](../data-types.md) | Включен ли налог в цену:
- `Y` — да
- `N` — нет 
 ||
|| **barcodeMulti**
[`string`](../data-types.md) | Поле доступно только при включенном складском учете. Является ли штрихкод уникальным:
- `Y` — да
- `N` — нет 

Имеет смысл только для включенного складского учета. Для товаров из каталога категорически не рекомендуется заполнять это поле вручную
||
|| **type**
[`integer`](../data-types.md) | Тип позиции. Не соответствует типу товара в каталоге. Возможные значения:
- `1` — комплект
- `2` — услуга
- `null` — любой другой

Категорически не рекомендуется задавать самостоятельно
 ||
|| **catalogXmlId**
[`string`](../data-types.md) | Внешний идентификатор каталога.

Используется для синхронизации с внешними системами (например, 1С)
 ||
|| **productXmlId**
[`string`](../data-types.md) | Внешний идентификатор товара.

Используется для синхронизации с внешними системами (например, 1С) ||
|| **reservations**
[`sale_basket_item_reservation[]`](#sale_basket_item_reservation) | Резервы элемента корзины ||
|#

### sale_basket_item_property
#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор свойства элемента корзины ||
|| **basketId**
[`sale_basket_item.id`](#sale_basket_item) | Идентификатор элемента корзины ||
|| **name**
[`string`](../data-types.md) | Название свойства ||
|| **value**
[`string`](../data-types.md) | Значение свойства ||
|| **code**
[`string`](../data-types.md) | Код свойства ||
|| **sort**
[`integer`](../data-types.md) | Порядок сортировки ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор ||
|#

### sale_order_trade_platform
#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор источника заказа ||
|| **code**
[`string`](../data-types.md) | Код источника заказа ||
|| **active**
[`string`](../data-types.md) | Активен ли источник заказа

- `Y` — да
- `N` — нет ||
|| **name**
[`string`](../data-types.md) | Название источника заказа ||
|| **description**
[`string`](../data-types.md) | Описание источника заказа ||
|| **settings**
[`string`](../data-types.md) | Настройки источника заказа в сериализованном виде ||
|| **catalogSectionTabClassName**
[`string`](../data-types.md) | Класс для обработки закладки в настройках раздела каталога ||
|| **class**
[`string`](../data-types.md) | Класс источника заказа ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор ||
|#

### sale_order_trade_binding

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор привязки ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор привязки ||
|| **externalOrderId**
[`string`](../data-types.md) | Номер заказа во внешней системе ||
|| **orderId**
[`sale_order.id`](#sale_order) | Идентификатор заказа ||
|| **tradingPlatformId**
[`sale_order_trade_platform.id`](#sale_order_trade_platform) | Идентификатор источника заказа ||
|| **tradingPlatformXmlId**
[`string`](../data-types.md) | Внешний идентификатор источника заказа ||
|| **params**
[`string`](../data-types.md) | Параметры в сериализованном виде ||
|#

### sale_basket_item_reservation

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор резерва ||
|| **basketId**
[`sale_basket_item.id`](#sale_basket_item) | Идентификатор элемента корзины резерва ||
|| **storeId**
[`integer`](../data-types.md) | Идентификатор склада ||
|| **quantity**
[`double`](../data-types.md) | Количество ||
|| **dateReserve**
[`datetime`](../data-types.md) | Дата резервирования ||
|| **dateReserveEnd**
[`datetime`](../data-types.md) | Дата окончания резервирования ||
|| **reservedBy**
[`user.id`](../data-types.md) | Идентификатор пользователя, добавившего резерв ||
|#

### sale_delivery_handler

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор обработчика службы доставки.

Получить идентификаторы обработчиков служб доставки можно с помощью метода [sale.delivery.handler.list](./delivery/handler/sale-delivery-handler-list.md)  ||
|| **NAME**
[`string`](../data-types.md) | Название обработчика службы доставки ||
|| **CODE**
[`string`](../data-types.md) | Символьный код обработчика службы доставки ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание обработчика службы доставки ||
|| **SETTINGS**
[`sale_delivery_handler_settings`](#sale_delivery_handler_settings) | Объект, содержащий информацию о настройках службы доставки ||
|| **PROFILES**
[`sale_delivery_handler_profile[]`](#sale_delivery_handler_profile) | Массив, содержащий список объектов профилей доставки ||
|#

### sale_delivery_handler_settings

#|
|| **Значение**
`тип` | **Описание** ||
|| **CALCULATE_URL**
[`string`](../data-types.md) | URL для расчёта стоимости доставки.

На данный URL приходят данные о посылке (что доставить, куда и как), стоимость доставки которой нужно рассчитать в ответе.

Формат запроса и ответа детально описан в документации по вебхуку [Расчет стоимости доставки](./delivery/webhooks/calculate.md)
 ||
|| **CREATE_DELIVERY_REQUEST_URL**
[`string`](../data-types.md) | URL для создания заказа на доставку.

На данный URL приходят данные о посылке (что доставить, куда и как), заказ на которую нужно оформить в службе доставки.

Формат запроса и ответа детально описан в документации по вебхуку [Создание заказа на доставку](./delivery/webhooks/create-delivery-request.md)
 ||
|| **CANCEL_DELIVERY_REQUEST_URL**
[`string`](../data-types.md) | URL для отмены заказа на доставку.

На данный URL приходят данные о посылке (что доставить, куда и как), заказ на которую нужно отменить в службе доставки.

Формат запроса и ответа детально описан в документации по вебхуку [Отмена заказа на доставку](./delivery/webhooks/cancel-delivery-request.md) ||
|| **HAS_CALLBACK_TRACKING_SUPPORT**
[`string`](../data-types.md) | Индикатор того, будет ли служба доставки присылать оповещения о статусе заказа на доставку (см. метод [sale.delivery.request.sendmessage](./delivery/delivery-request/sale-delivery-request-send-message.md)). 

В случае, если поддержка событий указана, то в интерфейсе менеджера при заказе доставки будет создано дело на доставку, в которое могут транслироваться изменения, связанные с текущим статусом доставки.

Возможные значения:

`Y` — есть поддержка
`N` — нет поддержки ||
|| **CONFIG**
[`sale_delivery_handler_settings_config_item[]`](#sale_delivery_handler_settings_config_item) | Массив объектов с доступными настройками для службы доставки, создаваемой с использованием данного обработчика ||
|#

### sale_delivery_handler_settings_config_item

#|
|| **Значение**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../data-types.md) | Тип поля настройки. 

Возможные значения:

`STRING` — строка
`Y/N` — чекбокс (да / нет)
`NUMBER` — число
`ENUM` — список
`DATE` — дата
`LOCATION` — местоположение ||
|| **CODE**
[`string`](../data-types.md) | Символьный код настройки ||
|| **NAME**
[`string`](../data-types.md) | Название настройки ||
|| **OPTIONS**
[`object`](../data-types.md) | Список опций для выбора. Объект в формате `ключ=значение`. Где `ключ` — код опции, а `значение` — опции.

Пример:

```
{
    "Option1Code": "Option1Value",
    "Option2Code": "Option2Value",
    "Option3Code": "Option3Value"
}
```

Параметр актуален только для настройки типа `ENUM` ||
|#

### sale_delivery_handler_profile

#|
|| **Значение**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название профиля обработчика службы доставки ||
|| **CODE**
[`string`](../data-types.md) | Символьный код профиля обработчика службы доставки ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание профиля обработчика службы доставки ||
|#

### sale_delivery_service

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор службы доставки.

Получить идентификаторы служб доставки можно с помощью метода [sale.delivery.getlist](./delivery/delivery/sale-delivery-get-list.md) ||
|| **PARENT_ID**
[`integer`](../data-types.md) | Идентификатор родительской службы доставки.

Получить идентификаторы служб доставки можно с помощью метода [sale.delivery.getlist](./delivery/delivery/sale-delivery-get-list.md) ||
|| **NAME**
[`string`](../data-types.md) | Название службы доставки ||
|| **CURRENCY**
[`string`](../data-types.md) | Символьный код валюты службы доставки ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание службы доставки ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|| **ACTIVE**
[`string`](../data-types.md) | Индикатор активности службы доставки.

Возможные значения:

`Y` — активна
`N` — неактивна ||
|#

### sale_delivery_config_value_item

#|
|| **Значение**
`тип` | **Описание** ||
|| **CODE**
[`string`](../data-types.md) | Символьный код настройки ||
|| **VALUE**
[`any`](../data-types.md) | Значение настройки ||
|#

### sale_delivery_extra_service

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор дополнительной услуги службы доставки.

Получить идентификаторы услуг службы доставки  можно с помощью метода  [sale.delivery.extra.service.get](./delivery/extra-service/sale-delivery-extra-service-get.md)  ||
|| **TYPE**
[`string`](../data-types.md) | Тип услуги. 

Возможные значения:

`enum` — список (выбор опции из заранее сформированного списка)
`checkbox` — единичная услуга (например, доставка до двери)
`quantity` — количественная услуга (например, требуемое количество грузчиков) ||
|| **NAME**
[`string`](../data-types.md) | Название услуги ||
|| **ACTIVE**
[`string`](../data-types.md) | Индикатор активности услуги.

Возможные значения:
`Y` — активна
`N` — неактивна ||
|| **CODE**
[`string`](../data-types.md) | Символьный код услуги ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание услуги ||
|| **PRICE**
[`double`](../data-types.md) | Поле актуально только для услуг типа **единичная услуга** (`checkbox`) и **количественная услуга** (`quantity`) ||
|| **ITEMS**
[`sale_delivery_extra_service_enum_item[]`](#sale_delivery_extra_service_enum_item) | Список доступных для выбора опций.

Поле актуально только для услуг типа **список** (`enum`) ||
|#

### sale_delivery_extra_service_enum_item

#|
|| **Значение**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../data-types.md) | Название опции списка ||
|| **CODE**
[`string`](../data-types.md) | Символьный код опции списка ||
|| **PRICE**
[`double`](../data-types.md) | Стоимость услуги при выборе данной опции в валюте службы доставки ||
|#

### sale_paysystem_handler

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор обработчика платежной системы ||
|| **NAME**
[`string`](../data-types.md) | Название обработчика ||
|| **CODE**
[`string`](../data-types.md) | Код обработчика ||
|| **SORT**
[`string`](../data-types.md) | Сортировка ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки обработчика. Структура сооветствует указанной при добавлении обработчика через [sale.paysystem.handler.add](../pay-system/sale-pay-system-handler-add.md) в параметре `SETTINGS` ||
|#

### sale_paysystem

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор платежной системы ||
|| **NAME**
[`string`](../data-types.md) | Название платежной системы ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание платежной системы ||
|| **XML_ID**
[`string`](../data-types.md) | Символьный код ||
|| **PERSON_TYPE_ID**
[`sale_person_type.id`](#sale_person_type) | Идентификатор типа плательщика ||
|| **ACTION_FILE**
[`string`](../data-types.md) | Для платежных систем REST это код REST-обработчика, указанный при добавлении обработчика методом [sale.paysystem.handler.add](../pay-system/sale-pay-system-handler-add.md).

Для системных платежных систем это код системного обработчика платежной системы
||
|| **ACTIVE**
[`string`](../data-types.md) | Активна ли платежная система. Доступные значения: 
- `Y` — да
- `N` — нет 
||
|| **ENTITY_REGISTRY_TYPE**
[`string`](../data-types.md) | Привязка платежной системы:
- `ORDER` — значение для заказов магазина, сделок, смарт-процессов
- `CRM_INVOICE` — значение для счетов CRM
- `CRM_QUOTE` — значение для коммерческих предложений CRM
||
|| **NEW_WINDOW**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Открывать в новом окне». Доступные значения: 
- `Y` — да
- `N` — нет 
||
|| **ALLOW_EDIT_PAYMENT**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Разрешить автопересчет оплаты». Доступные значения: 
- `Y` — да
- `N` — нет
||
|| **AUTO_CHANGE_1C**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Разрешить автоматическое изменение оплаты при импорте из 1С». Доступные значения: 
- `Y` — да
- `N` — нет
||
|| **CAN_PRINT_CHECK**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Разрешить печать чеков». Доступные значения: 
- `Y` — да
- `N` — нет
||
|| **ENCODING**
[`string`](../data-types.md) | Настройка «Кодировка». Доступные значения: `windows-1251`, `utf-8`, `iso-8859-1`. 

Для REST-обработчиков не используется ||
|| **IS_CASH**
[`string`](../data-types.md) | Тип оплаты. Возможные значения: 
- `N` — безналичный 
- `Y` — наличный 
- `A` — эквайринговая операция ||
|| **PSA_NAME**
[`string`](../data-types.md) | Заголовок платежной системы ||
|| **PS_MODE**
[`string`](../data-types.md) | Режим работы платежной системы для обработчиков, поддерживающих несколько режимов работы ||
|| **SORT**
[`string`](../data-types.md) | Сортировка ||
|| **TARIFF**
[`string`](../data-types.md) | Не используется ||
|#

### sale_cashbox_handler

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор обработчика кассы ||
|| **NAME**
[`string`](../data-types.md) | Название обработчика ||
|| **CODE**
[`string`](../data-types.md) | Код обработчика ||
|| **SORT**
[`string`](../data-types.md) | Сортировка ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки обработчика. Структура сооветствует указанной при добавлении обработчика через [sale.cashbox.handler.add](./cashbox/sale-cashbox-handler-add.md) в параметре `SETTINGS` ||
|#

### sale_cashbox

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор обработчика платежной системы ||
|| **NAME**
[`string`](../data-types.md) | Название кассы ||
|| **ENABLED**
[`string`](../data-types.md) | Доступность кассы. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **ACTIVE**
[`string`](../data-types.md) | Активность кассы. Возможные значения: 
- `Y` — да
- `N` — нет ||
|| **OFD**
[`string`](../data-types.md) | Код обработчика ОФД. Доступные обработчики ОФД: 
- `bx_firstofd` — Первый ОФД 
- `bx_platformaofd` — Платформа ОФД 
- `bx_yarusofd` — ОФД ЯРУС
- `bx_taxcomofd` — Такском ОФД 
- `bx_ofdruofd` — OFD.RU 
- `bx_tenzorofd` — Тензор ОФД 
- `bx_conturofd` — Контур ОФД ||
|| **EMAIL**
[`string`](../data-types.md) | Адрес электронной почты, на который будут отправляться уведомления в случае возникновения ошибок при печати чеков ||
|| **KKM_ID**
[`string`](../data-types.md) | Марка ККМ ||
|| **SORT**
[`string`](../data-types.md) | Сортировка ||
|| **USE_OFFLINE**
[`string`](../data-types.md) | Используется ли касса офлайн. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Объекты, используемые в ответах

### rest_field_description

#|
|| **Значение**
`тип` | **Описание** ||
|| **isImmutable**
[`boolean`](../data-types.md) | Индикатор возможности изменения значения поля после создания. 

Если у поля выставлен данный индикатор, то при создании сущности можно указать значение поля, но изменить его при обновлении не получится ||
|| **isReadOnly**
[`boolean`](../data-types.md) | Индикатор «только чтение». 

Если у поля выставлен данный индикатор, то в операциях добавления и обновления сущности передавать значение поля не нужно. Значение формируется автоматически и предназначено только для чтения ||
|| **isRequired**
[`boolean`](../data-types.md) | Индикатор обязательности поля для операций добавления или обновления ||
|| **type**
[`string`](../data-types.md) | Тип данных значений поля. Возможные значения: 
- `integer`
- `double`
- `string`
- `char`
- `list`
- `text`
- `file`
- `date`
- `datetime`
- `datatype`
- `productproperty`
||
|#